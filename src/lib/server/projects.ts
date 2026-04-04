import { db } from "$lib/server/db";
import { projectAuditLogs, projectDetails, projectPhases, projects, projectTasks } from "$lib/server/schema";
import { asc, desc, eq } from "drizzle-orm";

const PHASE_NAMES = ["QUOTATION", "DESIGN", "MANUFACTURING", "QUALITY CHECK", "DISPATCH"];

export type UiProject = {
    name: string;
    id: string;
    category: string;
    client: string;
    status: "HEALTHY" | "AT RISK" | "DELAYED";
    start: string;
    due: string;
    budget: string;
    progress: number;
    color: string;
    team: string[];
};

export type ProjectDetail = {
    code: string;
    title: string;
    clientName: string;
    category: string;
    priority: string;
    status: "HEALTHY" | "AT RISK" | "DELAYED";
    budgetUsd: number;
    progressPercent: number;
    startDate: Date;
    dueDate: Date;
    description: string;
};

export type ProjectPhase = {
    name: string;
    status: "completed" | "active" | "pending";
};

export type ProjectWorkflowTask = {
    title: string;
    priority: string;
    sub: string;
    color: string;
    machine?: string;
    date?: string;
    alert?: string;
};

export type ProjectWorkflowColumn = {
    title: string;
    id?: string;
    tasks?: ProjectWorkflowTask[];
    empty?: string;
};

export type ProjectAuditEntry = {
    eventType: string;
    message: string;
    actor: string;
    at: string;
};

function formatDate(value: Date): string {
    return value.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

function money(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

function statusColor(status: UiProject["status"]) {
    if (status === "HEALTHY") return "#654dcf";
    if (status === "AT RISK") return "#f39c12";
    return "#e74c3c";
}

function clampPercent(value: number): number {
    return Math.max(0, Math.min(100, Math.round(value)));
}

function deriveProgress(existingProgress: number | null | undefined, startDate: Date, dueDate: Date): number {
    const existing = clampPercent(existingProgress ?? 0);
    if (existing > 0) return existing;

    const now = Date.now();
    const start = startDate.getTime();
    const due = dueDate.getTime();

    if (now <= start) return 0;
    if (now >= due) return 100;
    const ratio = (now - start) / Math.max(1, due - start);
    return clampPercent(ratio * 100);
}

function deriveStatus(input: { dueDate: Date; progressPercent: number; priority: string }): UiProject["status"] {
    const now = Date.now();
    const due = input.dueDate.getTime();
    const progress = clampPercent(input.progressPercent);

    if (progress >= 100) return "HEALTHY";
    if (now > due) return "DELAYED";

    const daysToDue = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    if (input.priority === "Critical" && progress < 60) return "AT RISK";
    if (daysToDue <= 14 && progress < 80) return "AT RISK";
    return "HEALTHY";
}

function derivePhaseStatuses(progressPercent: number): Array<"completed" | "active" | "pending"> {
    const p = clampPercent(progressPercent);

    if (p >= 100) return ["completed", "completed", "completed", "completed", "completed"];
    if (p >= 70) return ["completed", "completed", "completed", "completed", "active"];
    if (p >= 45) return ["completed", "completed", "completed", "active", "pending"];
    if (p >= 20) return ["completed", "completed", "active", "pending", "pending"];
    return ["completed", "active", "pending", "pending", "pending"];
}

async function syncProjectAutomation(projectRow: {
    id: number;
    dueDate: Date;
    startDate: Date;
    priority: string;
    progressPercent: number | null;
    status: string;
}) {
    const nextProgress = deriveProgress(projectRow.progressPercent, projectRow.startDate, projectRow.dueDate);
    const nextStatus = deriveStatus({
        dueDate: projectRow.dueDate,
        progressPercent: nextProgress,
        priority: projectRow.priority,
    });

    if (nextProgress !== (projectRow.progressPercent ?? 0) || nextStatus !== projectRow.status) {
        await db
            .update(projects)
            .set({
                progressPercent: nextProgress,
                status: nextStatus,
            })
            .where(eq(projects.id, projectRow.id));
    }

    const phaseRows = await db
        .select({ id: projectPhases.id, position: projectPhases.position, status: projectPhases.status })
        .from(projectPhases)
        .where(eq(projectPhases.projectId, projectRow.id))
        .orderBy(asc(projectPhases.position));

    const targetStatuses = derivePhaseStatuses(nextProgress);

    if (phaseRows.length === 0) {
        await db.insert(projectPhases).values(
            PHASE_NAMES.map((name, idx) => ({
                projectId: projectRow.id,
                name,
                position: idx + 1,
                status: targetStatuses[idx],
            })),
        );
        return { nextProgress, nextStatus };
    }

    for (const row of phaseRows) {
        const idx = Math.max(0, Math.min(4, row.position - 1));
        const desired = targetStatuses[idx];
        if (row.status !== desired) {
            await db.update(projectPhases).set({ status: desired }).where(eq(projectPhases.id, row.id));
        }
    }

    return { nextProgress, nextStatus };
}

export async function getProjectsForUi(): Promise<UiProject[]> {
    const rows = await db
        .select({
            id: projects.id,
            code: projects.code,
            title: projects.title,
            category: projects.category,
            clientName: projects.clientName,
            priority: projects.priority,
            status: projects.status,
            startDate: projects.startDate,
            dueDate: projects.dueDate,
            budgetUsd: projects.budgetUsd,
            progressPercent: projects.progressPercent,
            description: projectDetails.description,
        })
        .from(projects)
        .leftJoin(projectDetails, eq(projectDetails.projectId, projects.id))
        .orderBy(desc(projects.createdAt));

    const output: UiProject[] = [];
    for (const row of rows) {
        const automated = await syncProjectAutomation({
            id: row.id,
            dueDate: row.dueDate,
            startDate: row.startDate,
            priority: row.priority,
            progressPercent: row.progressPercent,
            status: row.status,
        });

        output.push({
            name: row.title,
            id: `#${row.code}`,
            category: row.category,
            client: row.clientName,
            status: automated.nextStatus,
            start: formatDate(row.startDate),
            due: formatDate(row.dueDate),
            budget: money(row.budgetUsd),
            progress: automated.nextProgress,
            color: statusColor(automated.nextStatus),
            team: ["/admin-face.jpg"],
        } satisfies UiProject);
    }

    return output;
}

export async function getProjectDetailByCode(code: string): Promise<ProjectDetail | null> {
    const rows = await db
        .select({
            id: projects.id,
            code: projects.code,
            title: projects.title,
            clientName: projects.clientName,
            category: projects.category,
            priority: projects.priority,
            status: projects.status,
            budgetUsd: projects.budgetUsd,
            progressPercent: projects.progressPercent,
            startDate: projects.startDate,
            dueDate: projects.dueDate,
            description: projectDetails.description,
        })
        .from(projects)
        .leftJoin(projectDetails, eq(projectDetails.projectId, projects.id))
        .where(eq(projects.code, code))
        .limit(1);

    const row = rows[0];
    if (!row) return null;

    const automated = await syncProjectAutomation({
        id: row.id,
        dueDate: row.dueDate,
        startDate: row.startDate,
        priority: row.priority,
        progressPercent: row.progressPercent,
        status: row.status,
    });

    return {
        code: row.code,
        title: row.title,
        clientName: row.clientName,
        category: row.category,
        priority: row.priority,
        status: automated.nextStatus,
        budgetUsd: row.budgetUsd,
        progressPercent: automated.nextProgress,
        startDate: row.startDate,
        dueDate: row.dueDate,
        description: row.description ?? "",
    };
}

export async function getProjectWorkspaceByCode(code: string): Promise<{
    project: ProjectDetail;
    phases: ProjectPhase[];
    columns: ProjectWorkflowColumn[];
    auditLogs: ProjectAuditEntry[];
} | null> {
    const project = await getProjectDetailByCode(code);
    if (!project) return null;

    const phaseRows = await db
        .select({ name: projectPhases.name, status: projectPhases.status, position: projectPhases.position })
        .from(projectPhases)
        .innerJoin(projects, eq(projects.id, projectPhases.projectId))
        .where(eq(projects.code, code))
        .orderBy(asc(projectPhases.position));

    const taskRows = await db
        .select({
            lane: projectTasks.lane,
            title: projectTasks.title,
            priority: projectTasks.priority,
            description: projectTasks.description,
            color: projectTasks.color,
            dueDate: projectTasks.dueDate,
            machine: projectTasks.machine,
            alert: projectTasks.alert,
            position: projectTasks.position,
        })
        .from(projectTasks)
        .innerJoin(projects, eq(projects.id, projectTasks.projectId))
        .where(eq(projects.code, code))
        .orderBy(asc(projectTasks.position));

    const phases: ProjectPhase[] =
        phaseRows.length > 0
            ? phaseRows.map((row) => ({
                  name: row.name,
                  status:
                      row.status === "completed" || row.status === "active"
                          ? row.status
                          : "pending",
              }))
            : [
                  { name: "QUOTATION", status: "completed" },
                  { name: "DESIGN", status: "active" },
                  { name: "MANUFACTURING", status: "pending" },
                  { name: "QUALITY CHECK", status: "pending" },
                  { name: "DISPATCH", status: "pending" },
              ];

    const defaultLanes = ["RAW PROCUREMENT", "CNC & EDM", "BENCH WORK", "VALIDATION"];
    const columns: ProjectWorkflowColumn[] = defaultLanes.map((lane) => {
        const tasksForLane = taskRows
            .filter((t) => t.lane === lane)
            .map((t) => {
                const overdue = t.dueDate ? t.dueDate.getTime() < Date.now() : false;
                const dynamicAlert = t.alert ?? (overdue ? "Overdue" : undefined);

                return {
                    title: t.title,
                    priority: t.priority,
                    sub: t.description,
                    color: t.color,
                    machine: t.machine ?? undefined,
                    date: t.dueDate ? formatDate(t.dueDate) : undefined,
                    alert: dynamicAlert,
                };
            });

        return {
            title: lane,
            id: tasksForLane.length.toString().padStart(2, "0"),
            tasks: tasksForLane.length > 0 ? tasksForLane : undefined,
            empty: tasksForLane.length === 0 ? "NO ACTIVE TASKS" : undefined,
        };
    });

    const logs = await db
        .select({
            eventType: projectAuditLogs.eventType,
            message: projectAuditLogs.message,
            actor: projectAuditLogs.actor,
            createdAt: projectAuditLogs.createdAt,
        })
        .from(projectAuditLogs)
        .innerJoin(projects, eq(projects.id, projectAuditLogs.projectId))
        .where(eq(projects.code, code))
        .orderBy(desc(projectAuditLogs.createdAt));

    const auditLogs: ProjectAuditEntry[] = logs.map((log) => ({
        eventType: log.eventType,
        message: log.message,
        actor: log.actor,
        at: log.createdAt
            ? new Date(log.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
              })
            : "unknown",
    }));

    return { project, phases, columns, auditLogs };
}
