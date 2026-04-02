import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const role = data.get("role") as string;

        // Expanded Tiered Credential System
        const validCredentials = [
            {
                email: "admin@techmould.com",
                password: "admin",
                role: "admin"
            },
            {
                email: "management@techmould.com",
                password: "manager123",
                role: "management"
            },
            {
                email: "employee@techmould.com",
                password: "emp",
                role: "employee"
            },
            {
                email: "client@techmould.com",
                password: "client",
                role: "client"
            }
        ];

        // Find match across email, password, and specific portal selection
        const userFound = validCredentials.find(
            u => u.email === email && u.password === password && u.role === role
        );

        if (userFound) {
            // Set session cookie
            cookies.set("session", "authenticated_session_token", {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: import.meta.env.PROD,
            });
            
            throw redirect(303, "/");
        } else {
            return fail(401, {
                email,
                error: "Authentication failed. Please verify your portal selection and credentials."
            });
        }
    },
};
