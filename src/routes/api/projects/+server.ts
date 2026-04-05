import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { projectAuditLogs, projectDetails, projectPhases, projects, projectTasks } from "$lib/server/schema";

function normalizeStatus(priority: string): "HEALTHY" | "AT RISK" | "DELAYED" {
    if (priority === "Critical") return "AT RISK";
    return "HEALTHY";
}

function toBudgetInt(value: string): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) return 0;
    return Math.round(parsed);
}

function makeProjectCode() {
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `PX-${Date.now().toString().slice(-6)}-${suffix}`;
}

export async function POST({ request }) {
    let payload: unknown;

    try {
        payload = await request.json();
    } catch {
        return json({ success: false, error: "Invalid request payload" }, { status: 400 });
    }

    const body = payload as {
        title?: string;
        client?: string;
        startDate?: string;
        endDate?: string;
        budget?: string;
        description?: string;
        category?: string;
        priority?: string;
    };

    const title = String(body.title ?? "").trim();
    const client = String(body.client ?? "").trim();
    const startDateText = String(body.startDate ?? "").trim();
    const endDateText = String(body.endDate ?? "").trim();
    const description = String(body.description ?? "").trim();
    const category = String(body.category ?? "Manufacturing").trim() || "Manufacturing";
    const priority = String(body.priority ?? "Medium").trim() || "Medium";
    const budgetUsd = toBudgetInt(String(body.budget ?? "0"));

    if (!title || !client || !startDateText || !endDateText) {
        return json({ success: false, error: "Title, client, start date and due date are required" }, { status: 400 });
    }

    const startDate = new Date(startDateText);
    const dueDate = new Date(endDateText);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(dueDate.getTime())) {
        return json({ success: false, error: "Invalid start or due date" }, { status: 400 });
    }

    if (startDate > dueDate) {
        return json({ success: false, error: "Due date must be after start date" }, { status: 400 });
    }

    try {
        const inserted = await db.transaction(async (tx) => {
            const code = makeProjectCode();
            const [project] = await tx
                .insert(projects)
                .values({
                    code,
                    title,
                    description,
                    clientName: client,
                    category,
                    priority,
                    status: normalizeStatus(priority),
                    budgetUsd,
                    progressPercent: 0,
                    startDate,
                    dueDate,
                })
                .returning();

            await tx.insert(projectDetails).values({
                projectId: project.id,
                description,
            });

            await tx.insert(projectPhases).values([
                { projectId: project.id, name: "QUOTATION", position: 1, status: "completed" },
                { projectId: project.id, name: "DESIGN", position: 2, status: "active" },
                { projectId: project.id, name: "MANUFACTURING", position: 3, status: "pending" },
                { projectId: project.id, name: "QUALITY CHECK", position: 4, status: "pending" },
                { projectId: project.id, name: "DISPATCH", position: 5, status: "pending" },
            ]);

            await tx.insert(projectTasks).values([
                {
                    projectId: project.id,
                    lane: "RAW PROCUREMENT",
                    title: `Source materials for ${title}`,
                    priority: "SCHEDULED",
                    description: description || "Procurement checklist and vendor confirmation.",
                    color: "#4ecdc4",
                    dueDate: startDate,
                    position: 1,
                },
                {
                    projectId: project.id,
                    lane: "CNC & EDM",
                    title: `Machining setup for ${title}`,
                    priority: "CRITICAL PATH",
                    description: "Initial CNC setup and machine plan creation.",
                    color: "#e74c3c",
                    machine: "Machine #CNC-01",
                    position: 1,
                },
            ]);

            await tx.insert(projectAuditLogs).values({
                projectId: project.id,
                eventType: "PROJECT_CREATED",
                message: `Project ${title} (${code}) was created`,
                actor: "admin",
            });

            return project;
        });

        return json({
            success: true,
            message: "Project created successfully",
            project: {
                id: inserted.id,
                code: inserted.code,
                title: inserted.title,
            },
        });
    } catch (error) {
        console.error("Error creating project:", error);
        return json({ success: false, error: "Failed to create project" }, { status: 500 });
    }
}
