import { db } from "$lib/server/db";
import { projectAuditLogs, projects } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getProjectWorkspaceByCode } from "$lib/server/projects";

function normalizeCode(raw: string) {
    return raw.replace(/^#/, "").trim();
}

export const load: PageServerLoad = async ({ params }) => {
    const code = normalizeCode(params.id);
    const workspace = await getProjectWorkspaceByCode(code);

    if (!workspace) {
        throw error(404, "Project not found");
    }

    return workspace;
};

export const actions: Actions = {
    triggerRework: async ({ params }) => {
        const code = normalizeCode(params.id);

        const row = await db
            .select({ id: projects.id, title: projects.title, progressPercent: projects.progressPercent })
            .from(projects)
            .where(eq(projects.code, code))
            .limit(1);

        const project = row[0];
        if (!project) return fail(404, { error: "Project not found" });

        const adjustedProgress = Math.max(0, (project.progressPercent ?? 0) - 10);

        await db.transaction(async (tx) => {
            await tx
                .update(projects)
                .set({
                    status: "AT RISK",
                    progressPercent: adjustedProgress,
                })
                .where(eq(projects.id, project.id));

            await tx.insert(projectAuditLogs).values({
                projectId: project.id,
                eventType: "REWORK_TRIGGERED",
                message: `Rework triggered for ${project.title}. Progress adjusted to ${adjustedProgress}%`,
                actor: "admin",
            });
        });

        return { success: true, message: "Rework triggered and project updated" };
    },

    updateProgress: async ({ params, request }) => {
        const code = normalizeCode(params.id);
        const formData = await request.formData();
        const progressRaw = Number(String(formData.get("progress") ?? "0"));
        const progress = Math.max(0, Math.min(100, Math.round(progressRaw)));

        const row = await db
            .select({ id: projects.id, title: projects.title })
            .from(projects)
            .where(eq(projects.code, code))
            .limit(1);

        const project = row[0];
        if (!project) return fail(404, { error: "Project not found" });

        await db.transaction(async (tx) => {
            await tx
                .update(projects)
                .set({ progressPercent: progress })
                .where(eq(projects.id, project.id));

            await tx.insert(projectAuditLogs).values({
                projectId: project.id,
                eventType: "PROGRESS_UPDATED",
                message: `Progress updated to ${progress}% for ${project.title}`,
                actor: "admin",
            });
        });

        return { success: true, message: "Progress updated successfully" };
    },
};
