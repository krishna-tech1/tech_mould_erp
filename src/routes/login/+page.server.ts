import crypto from "node:crypto";
import { db } from "$lib/server/db";
import { sessions } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

const SESSION_DAYS = 7;

function createSessionToken() {
    return crypto.randomBytes(24).toString("hex");
}

function getSessionExpiry() {
    const d = new Date();
    d.setDate(d.getDate() + SESSION_DAYS);
    return d;
}

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = String(data.get("email") ?? "")
            .trim()
            .toLowerCase();
        const password = String(data.get("password") ?? "");

        /* 
        --- Disabled Temporarily ---
        if (!email || !password) {
            return fail(400, {
                email,
                error: "Email and password are required",
            });
        }

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        if (!user) return fail(401, { email, error: "Invalid credentials" });

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return fail(401, { email, error: "Invalid credentials" });

        const token = createSessionToken();
        const expiresAt = getSessionExpiry();

        await db.insert(sessions).values({
            token,
            userId: user.id,
            expiresAt,
        });

        cookies.set("session", token, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            expires: expiresAt,
        });
        */

        throw redirect(303, "/");
    },

    logout: async ({ cookies }) => {
        const token = cookies.get("session");

        if (token) {
            await db.delete(sessions).where(eq(sessions.token, token));
        }

        cookies.delete("session", { path: "/" });
        throw redirect(303, "/login");
    },
};
