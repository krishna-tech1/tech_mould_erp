import type { Handle } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { sessions, users } from "$lib/server/schema";
import { and, eq, gt } from "drizzle-orm";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.user = null;

    const token = event.cookies.get("session");
    if (!token) return resolve(event);

    const [row] = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
        })
        .from(sessions)
        .innerJoin(users, eq(users.id, sessions.userId))
        .where(
            and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())),
        )
        .limit(1);

    if (row) {
        event.locals.user = {
            id: row.id,
            name: row.name,
            email: row.email,
            role: row.role,
        };
    } else {
        event.cookies.delete("session", { path: "/" });
    }

    return resolve(event);
};
