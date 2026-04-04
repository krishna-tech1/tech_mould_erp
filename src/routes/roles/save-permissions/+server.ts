import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { rolePermissions } from "$lib/server/schema";

function getDbErrorMessage(error: unknown): string {
    const msg = error instanceof Error ? error.message.toLowerCase() : "";

    if (msg.includes("password authentication failed") || msg.includes("28p01")) {
        return "Database authentication failed. Update DATABASE_URL credentials in your local environment.";
    }

    return "Database connection failed. Verify PostgreSQL is running and DATABASE_URL points to your local database.";
}

export async function POST({ request }) {
    let payload: unknown;

    try {
        payload = await request.json();
    } catch {
        return json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const body = payload as {
        roleId?: unknown;
        permissions?: unknown;
    };

    const roleId = Number(body.roleId);
    const rawPermissions = Array.isArray(body.permissions) ? body.permissions : [];

    if (!Number.isInteger(roleId) || roleId <= 0) {
        return json({ success: false, error: "Invalid role ID" }, { status: 400 });
    }

    const permissionPairs = rawPermissions
        .filter((item): item is { moduleId: number; permissionId: number } => {
            if (!item || typeof item !== "object") return false;
            const candidate = item as { moduleId?: unknown; permissionId?: unknown };
            return Number.isInteger(candidate.moduleId) && Number.isInteger(candidate.permissionId);
        })
        .map((item) => ({
            moduleId: item.moduleId,
            permissionId: item.permissionId,
        }));

    try {
        await db.transaction(async (tx) => {
            await tx.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId));

            if (permissionPairs.length > 0) {
                await tx
                    .insert(rolePermissions)
                    .values(
                        permissionPairs.map((pair) => ({
                            roleId,
                            moduleId: pair.moduleId,
                            permissionId: pair.permissionId,
                        })),
                    )
                    .onConflictDoNothing();
            }
        });

        return json({ success: true, message: "Permissions saved successfully" });
    } catch (error) {
        console.error("Error saving role permissions:", error);
        return json({ success: false, error: getDbErrorMessage(error) }, { status: 503 });
    }
}
