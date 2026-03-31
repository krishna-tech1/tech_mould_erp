import bcrypt from "bcrypt";
import { db } from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const role = data.get("role") as string;

        if (role !== "admin")
            return fail(401, {
                email,
                error: "Only the Admin portal is currently accessible.",
            });

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (!user) return fail(401, { email, error: "Invalid credentials" });

        if (user.role !== role)
            return fail(403, { email, error: "Not authorized" });

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return fail(401, { email, error: "Invalid credentials" });

        cookies.set("session", user.id.toString(), {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        throw redirect(303, "/");
    },
};
