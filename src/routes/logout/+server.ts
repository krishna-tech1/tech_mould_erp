import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { sessions } from "$lib/server/schema";
import { eq } from "drizzle-orm";

export async function GET({ cookies }) {
    const token = cookies.get("session");

    if (token) {
        await db.delete(sessions).where(eq(sessions.token, token));
    }

    cookies.delete("session", { path: "/" });
    throw redirect(303, "/login");
}
