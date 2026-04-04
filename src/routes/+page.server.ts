import type { PageServerLoad } from "./$types";
import { getProjectsForUi } from "$lib/server/projects";

export const load: PageServerLoad = async () => {
    const projects = await getProjectsForUi();
    return { projects };
};
