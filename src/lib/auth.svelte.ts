export function createAuth() {
    let isAuthenticated = $state(false);
    let userRole = $state("");

    return {
        get isAuthenticated() { return isAuthenticated; },
        set isAuthenticated(v) { isAuthenticated = v; },
        get userRole() { return userRole; },
        set userRole(v) { userRole = v; }
    };
}

export const auth = createAuth();
