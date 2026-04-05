import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, url }) => {
    const isLoginPage = url.pathname === "/login" || url.pathname === "/login/";

    if (!locals.user && !isLoginPage) {
        throw redirect(303, "/login");
    }

    if (locals.user && isLoginPage) {
        throw redirect(303, "/");
    }

    return {
        user: locals.user,
    };
};
