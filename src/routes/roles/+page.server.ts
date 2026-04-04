import { db } from "$lib/server/db";
import {
    roles,
    modules,
    permissions,
    rolePermissions,
    users,
    userRoles,
} from "$lib/server/schema";
import { and, eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

function getDbErrorMessage(error: unknown): string {
    const msg = error instanceof Error ? error.message.toLowerCase() : "";
    const errWithCause = error as {
        cause?: { code?: string; constraint_name?: string; detail?: string };
    };
    const causeCode = errWithCause?.cause?.code;
    const constraint = errWithCause?.cause?.constraint_name;

    if (causeCode === "23505" || constraint === "roles_name_unique") {
        return "Role name already exists. Please choose a different role name.";
    }

    if (
        msg.includes("password authentication failed") ||
        msg.includes("28p01")
    ) {
        return "Database authentication failed. Update DATABASE_URL credentials in your local environment.";
    }
    return "Database connection failed. Verify PostgreSQL is running and DATABASE_URL points to your local database.";
}

export const load: PageServerLoad = async () => {
    try {
        // Get all roles
        const allRoles = await db.select().from(roles);

        // Get all modules
        const allModules = await db.select().from(modules);

        // Get all permissions
        const allPermissions = await db.select().from(permissions);
        const permissionIndexById = new Map<number, number>();
        allPermissions.forEach((p) => {
            const name = p.name.toUpperCase();
            if (name === "VIEW") permissionIndexById.set(p.id, 0);
            if (name === "EDIT") permissionIndexById.set(p.id, 1);
            if (name === "DELETE") permissionIndexById.set(p.id, 2);
        });

        // Get active users with their roles
        const activeUsers = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                role: roles.name,
            })
            .from(users)
            .leftJoin(userRoles, eq(users.id, userRoles.userId))
            .leftJoin(roles, eq(userRoles.roleId, roles.id));

        // Get permissions matrix for Admin role (default selected)
        const adminRole = await db
            .select()
            .from(roles)
            .where(eq(roles.name, "Admin"))
            .limit(1);

        let permissionsMatrix: Record<number, boolean[]> = {};

        if (adminRole.length > 0) {
            const adminPermissions = await db
                .select()
                .from(rolePermissions)
                .where(eq(rolePermissions.roleId, adminRole[0].id));

            // Create a matrix: moduleId -> [isViewChecked, isEditChecked, isDeleteChecked]
            allModules.forEach((module: (typeof allModules)[number]) => {
                permissionsMatrix[module.id] = [false, false, false];

                adminPermissions.forEach(
                    (rp: (typeof adminPermissions)[number]) => {
                        if (rp.moduleId === module.id) {
                            const permIndex = permissionIndexById.get(
                                rp.permissionId,
                            );
                            if (permIndex !== undefined) {
                                permissionsMatrix[module.id][permIndex] = true;
                            }
                        }
                    },
                );
            });
        }

        return {
            roles: allRoles,
            modules: allModules,
            permissions: allPermissions,
            activeUsers,
            permissionsMatrix,
            selectedRole: adminRole[0],
            dbError: null,
        };
    } catch (error) {
        console.error("Error loading roles data:", error);
        return {
            roles: [],
            modules: [],
            permissions: [],
            activeUsers: [],
            permissionsMatrix: {},
            selectedRole: null,
            dbError: getDbErrorMessage(error),
        };
    }
};

export const actions: Actions = {
    createRole: async ({ request }) => {
        const formData = await request.formData();
        const roleName = String(formData.get("roleName") ?? "").trim();

        if (!roleName) {
            return fail(400, {
                error: "Role name and portal assignment are required",
            });
        }

        try {
            // Insert new role
            const newRole = await db
                .insert(roles)
                .values({
                    name: roleName,
                    description: `${roleName} role`,
                })
                .returning();

            if (!newRole || newRole.length === 0) {
                return fail(500, { error: "Failed to create role" });
            }

            return {
                success: true,
                role: newRole[0],
                message: `Role "${roleName}" created successfully`,
            };
        } catch (error) {
            console.error("Error creating role:", error);
            return fail(503, {
                error: getDbErrorMessage(error),
            });
        }
    },

    getRolePermissions: async ({ request }) => {
        const formData = await request.formData();
        const roleId = parseInt(String(formData.get("roleId") ?? "0"));

        if (!roleId || roleId <= 0) {
            return fail(400, { error: "Invalid role ID" });
        }

        try {
            const allModules = await db.select().from(modules);
            const rolePerms = await db
                .select()
                .from(rolePermissions)
                .where(eq(rolePermissions.roleId, roleId));

            const allPermissions = await db.select().from(permissions);
            const permissionIndexById = new Map<number, number>();
            allPermissions.forEach((p) => {
                const name = p.name.toUpperCase();
                if (name === "VIEW") permissionIndexById.set(p.id, 0);
                if (name === "EDIT") permissionIndexById.set(p.id, 1);
                if (name === "DELETE") permissionIndexById.set(p.id, 2);
            });

            // Build permissions matrix
            let permissionsMatrix: Record<number, boolean[]> = {};
            allModules.forEach((module: (typeof allModules)[number]) => {
                permissionsMatrix[module.id] = [false, false, false];

                rolePerms.forEach((rp: (typeof rolePerms)[number]) => {
                    if (rp.moduleId === module.id) {
                        const permIndex = permissionIndexById.get(
                            rp.permissionId,
                        );
                        if (permIndex !== undefined) {
                            permissionsMatrix[module.id][permIndex] = true;
                        }
                    }
                });
            });

            return {
                success: true,
                permissionsMatrix,
                modules: allModules,
                permissions: allPermissions,
            };
        } catch (error) {
            console.error("Error fetching role permissions:", error);
            return fail(503, { error: getDbErrorMessage(error) });
        }
    },

    updatePermission: async ({ request }) => {
        const formData = await request.formData();
        const roleId = parseInt(String(formData.get("roleId") ?? "0"));
        const moduleId = parseInt(String(formData.get("moduleId") ?? "0"));
        const permissionId = parseInt(
            String(formData.get("permissionId") ?? "0"),
        );
        const isChecked = formData.get("isChecked") === "true";

        if (!roleId || !moduleId || !permissionId) {
            return fail(400, { error: "Invalid parameters" });
        }

        try {
            if (isChecked) {
                // Add permission
                await db
                    .insert(rolePermissions)
                    .values({
                        roleId,
                        moduleId,
                        permissionId,
                    })
                    .onConflictDoNothing();
            } else {
                // Remove permission
                await db
                    .delete(rolePermissions)
                    .where(
                        and(
                            eq(rolePermissions.roleId, roleId),
                            eq(rolePermissions.moduleId, moduleId),
                            eq(rolePermissions.permissionId, permissionId),
                        ),
                    );
            }

            return { success: true };
        } catch (error) {
            console.error("Error updating permission:", error);
            return fail(503, { error: getDbErrorMessage(error) });
        }
    },

    saveRolePermissions: async ({ request }) => {
        const formData = await request.formData();
        const roleId = parseInt(String(formData.get("roleId") ?? "0"));
        const permissionsJson = String(formData.get("permissions") ?? "[]");

        if (!roleId || roleId <= 0) {
            return fail(400, { error: "Invalid role ID" });
        }

        let permissionPairs: Array<{ moduleId: number; permissionId: number }> =
            [];
        try {
            const parsed = JSON.parse(permissionsJson) as unknown;
            if (!Array.isArray(parsed)) {
                return fail(400, { error: "Invalid permissions payload" });
            }

            permissionPairs = parsed
                .filter(
                    (
                        item,
                    ): item is { moduleId: number; permissionId: number } => {
                        if (!item || typeof item !== "object") return false;
                        const candidate = item as {
                            moduleId?: unknown;
                            permissionId?: unknown;
                        };
                        return (
                            Number.isInteger(candidate.moduleId) &&
                            Number.isInteger(candidate.permissionId)
                        );
                    },
                )
                .map((item) => ({
                    moduleId: item.moduleId,
                    permissionId: item.permissionId,
                }));
        } catch {
            return fail(400, { error: "Invalid permissions payload" });
        }

        try {
            await db.transaction(async (tx) => {
                await tx
                    .delete(rolePermissions)
                    .where(eq(rolePermissions.roleId, roleId));

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

            return {
                success: true,
                message: "Permissions saved successfully",
            };
        } catch (error) {
            console.error("Error saving role permissions:", error);
            return fail(503, { error: getDbErrorMessage(error) });
        }
    },

    deleteRole: async ({ request }) => {
        const formData = await request.formData();
        const roleId = parseInt(String(formData.get("roleId") ?? "0"));

        if (!roleId || roleId <= 0) {
            return fail(400, { error: "Invalid role ID" });
        }

        // Prevent deletion of system roles
        const role = await db.select().from(roles).where(eq(roles.id, roleId));
        if (
            role.length > 0 &&
            ["Admin", "Management", "Client"].includes(role[0].name)
        ) {
            return fail(403, {
                error: "Cannot delete system roles",
            });
        }

        try {
            await db.delete(roles).where(eq(roles.id, roleId));
            return { success: true, message: "Role deleted successfully" };
        } catch (error) {
            console.error("Error deleting role:", error);
            return fail(503, { error: getDbErrorMessage(error) });
        }
    },
};
