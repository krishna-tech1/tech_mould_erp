<script lang="ts">
    import type { PageData } from "./$types";
    import { deserialize, enhance } from "$app/forms";
    import {
        ShieldCheck,
        ChevronDown,
        History,
        Plus,
        Download,
        ArrowRight,
        Users,
        Key,
        Lock,
        Eye,
        PenLine,
        Trash2,
        UserPlus,
        ShieldAlert,
        Check,
        X
    } from "lucide-svelte";
    import { fade, slide, scale } from "svelte/transition";
    import CreateUserModal from "$lib/components/CreateUserModal.svelte";
    import CreateRoleModal from "$lib/components/CreateRoleModal.svelte";

    let { data }: { data: PageData } = $props();

    let showCreateUserModal = $state(false);
    let showCreateRoleModal = $state(false);
    let showMatrix = $state(false);
    let selectedRoleId = $state(0);
    let updateMessage = $state("");
    let rolePermissionsMatrix = $state<Record<number, boolean[]>>({});
    let originalRolePermissionsMatrix = $state<Record<number, boolean[]>>({});
    let hasUnsavedChanges = $state(false);
    let isSavingChanges = $state(false);

    const permissionIdByIndex = $derived.by(() => {
        const map: Record<number, number> = {};
        for (const p of data.permissions) {
            const name = p.name.toUpperCase();
            if (name === "VIEW") map[0] = p.id;
            if (name === "EDIT") map[1] = p.id;
            if (name === "DELETE") map[2] = p.id;
        }
        return map;
    });

    const permissionIndexById = $derived.by(() => {
        const map: Record<number, number> = {};
        for (const p of data.permissions) {
            const name = p.name.toUpperCase();
            if (name === "VIEW") map[p.id] = 0;
            if (name === "EDIT") map[p.id] = 1;
            if (name === "DELETE") map[p.id] = 2;
        }
        return map;
    });

    function clonePermissionsMatrix(matrix: Record<number, boolean[]>): Record<number, boolean[]> {
        const cloned: Record<number, boolean[]> = {};
        for (const [moduleId, row] of Object.entries(matrix)) {
            cloned[Number(moduleId)] = Array.isArray(row) ? [...row] : [false, false, false];
        }
        return cloned;
    }

    $effect(() => {
        if (!selectedRoleId && data.roles.length > 0) {
            selectedRoleId = data.roles.find(r => r.name === "Admin")?.id || data.roles[0].id;
        }

        if (Object.keys(rolePermissionsMatrix).length === 0 && data.permissionsMatrix) {
            rolePermissionsMatrix = clonePermissionsMatrix(data.permissionsMatrix as Record<number, boolean[]>);
            originalRolePermissionsMatrix = clonePermissionsMatrix(data.permissionsMatrix as Record<number, boolean[]>);
            hasUnsavedChanges = false;
        }
    });

    // Derive the selected role object
    const selectedRole = $derived(data.roles.find(r => r.id === selectedRoleId));

    function matrixToKeys(matrix: Record<number, boolean[]>) {
        const keys: string[] = [];
        for (const module of data.modules) {
            const row = matrix[module.id] ?? [false, false, false];
            for (const permIndex of [0, 1, 2]) {
                const permissionId = getPermissionId(permIndex);
                if (!permissionId) continue;
                if (row[permIndex]) {
                    keys.push(`${module.id}:${permissionId}`);
                }
            }
        }
        return keys.sort();
    }

    function matchesExpectedPermissions(current: Record<number, boolean[]>, expected: Record<number, boolean[]>) {
        const a = matrixToKeys(current);
        const b = matrixToKeys(expected);
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i += 1) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    async function fetchRolePermissionsMatrix(roleId: number) {
        const formData = new FormData();
        formData.append("roleId", roleId.toString());

        const response = await fetch("?/getRolePermissions", {
            method: "POST",
            body: formData,
            headers: {
                accept: "application/json",
                "x-sveltekit-action": "true",
            },
        });

        const result = deserialize(await response.text()) as any;
        if (result.type === "success") {
            const payload = result.data as {
                permissionsMatrix?: Record<number, boolean[]>;
            };
            return payload.permissionsMatrix ?? null;
        }
        return null;
    }
    
    // Handle role selection change
    async function onRoleChange(newRoleId: number) {
        if (newRoleId === selectedRoleId) return;
        if (hasUnsavedChanges) {
            updateMessage = "Save or discard changes before switching roles.";
            return;
        }

        selectedRoleId = newRoleId;
        updateMessage = "";

        try {
            const matrix = await fetchRolePermissionsMatrix(selectedRoleId);
            if (matrix) {
                rolePermissionsMatrix = matrix;
                originalRolePermissionsMatrix = clonePermissionsMatrix(matrix);
                hasUnsavedChanges = false;
            } else {
                updateMessage = "Failed to load role permissions";
            }
        } catch (error) {
            console.error("Error loading role permissions:", error);
            updateMessage = "Failed to load role permissions";
        }
    }

    // Handle permission checkbox change
    function onPermissionChange(moduleId: number, permissionId: number, isChecked: boolean) {
        if (!selectedRole) return;
        if (updateMessage.toLowerCase().includes("success") || updateMessage.toLowerCase().includes("failed")) {
            updateMessage = "";
        }

        const permissionIndex = permissionIndexById[permissionId] ?? -1;
        if (permissionIndex < 0) return;

        const nextRow = [...(rolePermissionsMatrix[moduleId] ?? [false, false, false])];
        nextRow[permissionIndex] = isChecked;
        rolePermissionsMatrix = {
            ...rolePermissionsMatrix,
            [moduleId]: nextRow,
        };
        hasUnsavedChanges = true;
    }

    async function saveRolePermissions() {
        if (!selectedRole || !hasUnsavedChanges) return;
        isSavingChanges = true;
        updateMessage = "Saving changes...";
        const expectedMatrix = clonePermissionsMatrix(rolePermissionsMatrix);

        const permissionPairs: Array<{ moduleId: number; permissionId: number }> = [];
        for (const module of data.modules) {
            const row = rolePermissionsMatrix[module.id] ?? [false, false, false];
            for (const permIndex of [0, 1, 2]) {
                const permissionId = getPermissionId(permIndex);
                if (!permissionId) continue;
                if (row[permIndex]) {
                    permissionPairs.push({ moduleId: module.id, permissionId });
                }
            }
        }

        try {
            let saveSuccessful = false;
            let saveMessage = "Permissions saved successfully";
            let saveError = "Failed to save changes";

            const direct = await trySaveViaJsonEndpoint(selectedRole.id, permissionPairs);

            if (direct.response.ok && direct.payload?.success) {
                saveSuccessful = true;
                saveMessage = direct.payload.message || saveMessage;
            } else {
                const fallback = await trySaveViaAction(selectedRole.id, permissionPairs);
                if (fallback.ok) {
                    saveSuccessful = true;
                    saveMessage = fallback.message || saveMessage;
                } else {
                    saveError =
                        fallback.error ||
                        direct.payload?.error ||
                        (direct.raw ? `Save failed (${direct.response.status})` : "Failed to save changes");
                }
            }

            if (saveSuccessful) {
                hasUnsavedChanges = false;
                originalRolePermissionsMatrix = clonePermissionsMatrix(rolePermissionsMatrix);
                updateMessage = saveMessage;

                // Background refresh to keep UI in sync with server truth without blocking confirmation.
                fetchRolePermissionsMatrix(selectedRole.id)
                    .then((freshMatrix) => {
                        if (freshMatrix) {
                            rolePermissionsMatrix = freshMatrix;
                            originalRolePermissionsMatrix = clonePermissionsMatrix(freshMatrix);
                        }
                    })
                    .catch((error) => {
                        console.error("Background matrix refresh failed:", error);
                    });
            } else {
                // If response parsing fails but DB was updated, show success based on persisted state.
                const verifiedMatrix = await fetchRolePermissionsMatrix(selectedRole.id);
                if (verifiedMatrix && matchesExpectedPermissions(verifiedMatrix, expectedMatrix)) {
                    rolePermissionsMatrix = verifiedMatrix;
                    originalRolePermissionsMatrix = clonePermissionsMatrix(verifiedMatrix);
                    hasUnsavedChanges = false;
                    updateMessage = "Permissions saved successfully";
                } else {
                    updateMessage = saveError;
                }
            }
        } catch (error) {
            console.error("Error saving role permissions:", error);
            updateMessage = "Failed to save changes. Please retry.";
        } finally {
            isSavingChanges = false;
        }
    }

    function discardChanges() {
        rolePermissionsMatrix = clonePermissionsMatrix(originalRolePermissionsMatrix);
        hasUnsavedChanges = false;
        updateMessage = "Unsaved changes discarded";
    }

    // Helper to check if a permission is granted
    function hasPermission(moduleId: number, permissionIndex: number): boolean {
        if (!selectedRole) return false;
        const matrix = rolePermissionsMatrix;
        const row = matrix[moduleId] ?? [false, false, false];
        return Boolean(row[permissionIndex]);
    }

    function getPermissionId(permissionIndex: number): number | undefined {
        return permissionIdByIndex[permissionIndex];
    }

    async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit, timeoutMs = 15000) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            return await fetch(input, {
                ...init,
                signal: controller.signal,
            });
        } finally {
            clearTimeout(timer);
        }
    }

    async function trySaveViaJsonEndpoint(roleId: number, permissionPairs: Array<{ moduleId: number; permissionId: number }>) {
        const response = await fetch("/roles/save-permissions", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({
                roleId,
                permissions: permissionPairs,
            }),
        });

        const raw = await response.text();
        let payload: { success?: boolean; message?: string; error?: string } | null = null;
        try {
            payload = JSON.parse(raw) as { success?: boolean; message?: string; error?: string };
        } catch {
            payload = null;
        }

        return { response, payload, raw };
    }

    async function trySaveViaAction(roleId: number, permissionPairs: Array<{ moduleId: number; permissionId: number }>) {
        const formData = new FormData();
        formData.append("roleId", roleId.toString());
        formData.append("permissions", JSON.stringify(permissionPairs));

        const response = await fetch("?/saveRolePermissions", {
            method: "POST",
            body: formData,
            headers: {
                accept: "application/json",
                "x-sveltekit-action": "true",
            },
        });

        const result = deserialize(await response.text()) as any;
        if (result.type === "success") {
            const payload = result.data as { success?: boolean; message?: string; error?: string };
            return { ok: Boolean(payload.success), message: payload.message, error: payload.error };
        }

        if (result.type === "failure") {
            const payload = result.data as { error?: string };
            return { ok: false, error: payload.error || "Failed to save changes" };
        }

        return { ok: false, error: "Failed to save changes" };
    }
</script>

<svelte:head>
    <title>Role Management | TechMould ERP</title>
</svelte:head>

<div class="roles-page">
    {#if data.dbError}
        <div class="db-error-banner" role="alert">
            <strong>Database connection issue:</strong> {data.dbError}
        </div>
    {/if}

    <div class="page-header">
        <div class="header-left">
            <h1>Role Management</h1>
            <p>Define system access levels and individual user permissions.</p>
        </div>
        <div class="header-actions">
            <button class="btn-ghost" onclick={() => alert("Exporting log...")}>Export Logs</button>
            <button 
                class="btn-matrix-toggle {showMatrix ? 'active' : ''}" 
                onclick={() => showMatrix = !showMatrix}
            >
                {#if showMatrix}
                    <X size={16} /> Close Matrix
                {:else}
                    <ShieldAlert size={16} /> Permissions Matrix
                {/if}
            </button>
            <button class="btn-primary" onclick={() => showCreateRoleModal = true}>Create New Role</button>
        </div>
    </div>

    <div class="main-layout {showMatrix ? 'grid-mode' : 'single-mode'}">
        <section class="users-section card">
            <div class="section-top">
                <div class="title-row">
                    <h3>Active Users</h3>
                    <button
                        class="btn-new-user"
                        onclick={() => (showCreateUserModal = true)}
                    >
                        <UserPlus size={14} />
                        New User
                    </button>
                </div>
            </div>
            <div class="user-list">
                <div class="list-header">
                    <span>USER IDENTIFICATION</span>
                    <span>ASSIGNED ROLE</span>
                </div>
                {#each data.activeUsers as user}
                    <div class="user-row" transition:slide>
                        <div class="user-info">
                            <div class="text">
                                <strong>{user.name}</strong>
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <div class="role-display" class:role-admin={user.role === 'Admin'} class:role-mgmt={user.role === 'Management'}>
                            {user.role || 'Unassigned'}
                        </div>
                    </div>
                {/each}
            </div>
        </section>

        {#if showMatrix}
            <section class="matrix-panel card" in:fade={{ duration: 400 }}>
                <div class="matrix-header">
                    <div class="m-title">
                        <h3>Role Architecture</h3>
                        <div class="role-config-box">
                            <ShieldCheck size={16} color="var(--primary)" />
                            <select onchange={(e) => onRoleChange(parseInt(e.currentTarget.value))} value={selectedRoleId}>
                                {#each data.roles as role}
                                    <option value={role.id}>{role.name}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <span class="editing-badge">{selectedRole?.name === 'Admin' ? 'FULL PRIVILEGE' : 'RESTRICTED PRIVILEGE'}</span>
                </div>

                {#if updateMessage}
                    <div class="update-message" transition:slide>
                        {updateMessage}
                    </div>
                {/if}

                <div class="matrix-table">
                    <table>
                        <thead>
                            <tr>
                                <th>MODULE</th>
                                <th>VIEW</th>
                                <th>EDIT</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each data.modules as module}
                                <tr>
                                    <td>
                                        <div class="module-cell">
                                            <strong>{module.name}</strong>
                                            <p>{module.description}</p>
                                        </div>
                                    </td>
                                    {#each [0, 1, 2] as permIndex}
                                        <td>
                                            <label class="checkbox-container">
                                                <input 
                                                    type="checkbox" 
                                                    checked={hasPermission(module.id, permIndex)}
                                                    disabled={!getPermissionId(permIndex) || isSavingChanges}
                                                    onchange={(e) => getPermissionId(permIndex) && onPermissionChange(module.id, getPermissionId(permIndex)!, e.currentTarget.checked)}
                                                />
                                                <span class="checkmark"></span>
                                            </label>
                                        </td>
                                    {/each}
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <div class="matrix-footer">
                    {#if isSavingChanges || updateMessage}
                        <span class="save-feedback" class:success={updateMessage.toLowerCase().includes("success") && !isSavingChanges} class:error={updateMessage.toLowerCase().includes("failed") && !isSavingChanges}>
                            {isSavingChanges ? "Saving changes..." : updateMessage}
                        </span>
                    {/if}
                    <button class="btn-cancel" onclick={discardChanges} disabled={!hasUnsavedChanges || isSavingChanges}>Discard</button>
                    <button class="btn-primary" onclick={saveRolePermissions} disabled={!hasUnsavedChanges || isSavingChanges}>
                        {isSavingChanges ? "Saving..." : "Save Changes"}
                    </button>
                    <button class="btn-cancel" onclick={() => showMatrix = false}>Close Matrix</button>
                </div>
            </section>
        {/if}
    </div>

    <div class="stats-section">
        <div class="section-top">
            <h3>Role Hierarchy Overview</h3>
        </div>
        <div class="stats-grid">
            <div class="stat-card card" style="background: white; color: #1a1a1a">
                <div class="stat-header">
                    <div class="icon-box" style="background: #654dcf15; color: #654dcf">
                        <ShieldCheck size={18} />
                    </div>
                    <span class="stat-label" style="color: #a0aec0">
                        S-TIER ACCESS
                    </span>
                </div>
                <div class="stat-body">
                    <span class="count">{data.roles.filter(r => r.name === 'Admin').length}</span>
                    <h4>Executive Admin</h4>
                    <p style="color: #718096">
                        Primary system controllers with full root override and financial management.
                    </p>
                </div>
            </div>

            <div class="stat-card card" style="background: white; color: #1a1a1a">
                <div class="stat-header">
                    <div class="icon-box" style="background: #4ecdc415; color: #4ecdc4">
                        <Users size={18} />
                    </div>
                    <span class="stat-label" style="color: #a0aec0">
                        RESTRICTED ACCESS
                    </span>
                </div>
                <div class="stat-body">
                    <span class="count">{data.roles.filter(r => r.name !== 'Admin').length}</span>
                    <h4>Management Layer</h4>
                    <p style="color: #718096">
                        Strategic observers with project, client, and reporting privileges only.
                    </p>
                </div>
            </div>

            <div class="stat-card card" style="background: #654dcf; color: white">
                <div class="stat-header">
                    <div class="icon-box" style="background: #65 4dcf40; color: white">
                        <History size={18} />
                    </div>
                    <span class="stat-label" style="color: rgba(255,255,255,0.6)">
                        AUDIT LOGS
                    </span>
                </div>
                <div class="stat-body">
                    <span class="count">{data.activeUsers.length}</span>
                    <h4>Active Users</h4>
                    <p style="color: rgba(255,255,255,0.7)">
                        Total users in the system with assigned roles and permissions.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <CreateUserModal bind:show={showCreateUserModal} />
    <CreateRoleModal bind:show={showCreateRoleModal} />
</div>

<style>
    .roles-page {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 20px;
    }

    .header-left h1 {
        font-size: 28px;
        font-weight: 800;
        margin-bottom: 4px;
    }

    .header-left p {
        color: var(--text-sub);
        font-size: 14px;
    }

    .header-actions {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .btn-ghost {
        font-size: 13px;
        font-weight: 700;
        color: #718096;
        padding: 10px 20px;
        background: #f1f5f9;
        border-radius: 10px;
    }

    .btn-matrix-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        background: white;
        border: 1px solid var(--border);
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 700;
        color: #4a5568;
        transition: all 0.2s;
    }

    .btn-matrix-toggle.active {
        background: var(--primary-light);
        border-color: var(--primary);
        color: var(--primary);
        box-shadow: 0 4px 12px rgba(101, 77, 207, 0.1);
    }

    .btn-primary {
        background: var(--primary);
        color: white;
        padding: 10px 24px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 700;
    }

    .main-layout {
        display: grid;
        gap: 32px;
        transition: all 0.4s ease;
    }

    .single-mode {
        grid-template-columns: 1fr;
    }

    .grid-mode {
        grid-template-columns: 1fr 1.8fr;
    }

    .card {
        background: white;
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 32px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
    }

    .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .title-row h3 {
        font-size: 18px;
        font-weight: 800;
    }

    .btn-new-user {
        display: flex;
        align-items: center;
        gap: 6px;
        background: #f0edff;
        color: var(--primary);
        font-size: 11px;
        font-weight: 800;
        padding: 8px 14px;
        border-radius: 8px;
    }

    .list-header {
        display: flex;
        justify-content: space-between;
        padding: 0 8px 12px;
        font-size: 10px;
        font-weight: 800;
        color: #cbd5e0;
        letter-spacing: 0.5px;
    }

    .user-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 8px;
        border-bottom: 1px solid #f1f5f9;
        transition: background 0.2s;
    }

    .user-row:hover {
        background: #fcfdfe;
    }

    .text strong {
        font-size: 14px;
        font-weight: 800;
        display: block;
    }

    .text span {
        font-size: 11px;
        color: #a0aec0;
        font-weight: 600;
    }

    .role-display {
        font-size: 12px;
        font-weight: 800;
        color: var(--primary);
        background: #f0edff;
        padding: 4px 12px;
        border-radius: 6px;
    }

    .role-admin {
        background: #fff5e6;
        color: #e67e22;
    }

    .role-mgmt {
        background: #e6fffa;
        color: #319795;
    }

    .matrix-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 32px;
    }

    .m-title h3 {
        font-size: 16px;
        font-weight: 800;
        color: #718096;
        margin-bottom: 12px;
    }

    .role-config-box {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #f8fafc;
        border: 1px solid var(--border);
        padding: 10px 16px;
        border-radius: 12px;
    }

    .role-config-box select {
        border: none;
        background: transparent;
        font-size: 14px;
        font-weight: 700;
        color: var(--primary);
        outline: none;
        cursor: pointer;
    }

    .editing-badge {
        font-size: 9px;
        font-weight: 800;
        color: #4ecdc4;
        background: #e8fdfa;
        padding: 4px 10px;
        border-radius: 6px;
    }

    .matrix-table table {
        width: 100%;
        border-collapse: collapse;
    }

    .matrix-table th {
        text-align: left;
        padding: 12px;
        font-size: 10px;
        font-weight: 800;
        color: #cbd5e0;
        border-bottom: 1px solid #f1f5f9;
    }

    .matrix-table td {
        padding: 20px 12px;
        border-bottom: 1px solid #f1f5f9;
    }

    .module-cell strong {
        font-size: 14px;
        font-weight: 800;
        display: block;
        margin-bottom: 2px;
    }

    .module-cell p {
        font-size: 11px;
        color: #a0aec0;
        font-weight: 600;
    }

    .checkbox-container {
        display: block;
        position: relative;
        padding-left: 20px;
        cursor: pointer;
    }

    .checkbox-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: -10px;
        left: 0;
        height: 20px;
        width: 20px;
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 6px;
        transition: all 0.2s;
    }

    .checkbox-container:hover input ~ .checkmark {
        border-color: var(--primary);
    }

    .checkbox-container input:checked ~ .checkmark {
        background: var(--primary);
        border-color: var(--primary);
        box-shadow: 0 2px 8px rgba(101, 77, 207, 0.2);
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
        left: 6px;
        top: 2px;
        width: 4px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    .checkbox-container input:checked ~ .checkmark:after {
        display: block;
    }

    .matrix-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 24px;
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid #f1f5f9;
    }

    .save-feedback {
        margin-right: auto;
        font-size: 12px;
        font-weight: 700;
        color: #6b7280;
    }

    .save-feedback.success {
        color: #15803d;
    }

    .save-feedback.error {
        color: #b91c1c;
    }

    .btn-cancel {
        font-size: 13px;
        font-weight: 700;
        color: #a0aec0;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
    }

    .stat-card {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .stat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .icon-box {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .stat-label {
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.5px;
    }

    .count {
        font-size: 32px;
        font-weight: 800;
    }

    .stat-body h4 {
        font-size: 15px;
        font-weight: 800;
        margin-bottom: 4px;
    }

    .stat-body p {
        font-size: 12px;
        font-weight: 600;
        line-height: 1.6;
    }

    .update-message {
        background: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 13px;
        font-weight: 600;
    }
</style>
