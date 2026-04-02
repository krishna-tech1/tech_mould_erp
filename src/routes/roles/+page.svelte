<script lang="ts">
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

    let showCreateUserModal = $state(false);
    let showCreateRoleModal = $state(false);
    let showMatrix = $state(false);
    let selectedRole = $state("Admin");

    // Tiered Roles System
    const roles = ["Admin", "Management", "Project Leader", "Team Leader", "Employee"];

    const activeUsers = [
        {
            name: "Alexander Sterling",
            email: "a.sterling@techmould.com",
            role: "Admin",
        },
        {
            name: "Nora Vivaldi",
            email: "n.vivaldi@techmould.com",
            role: "Project Leader",
        },
        {
            name: "Kenji Tanaka",
            email: "k.tanaka@techmould.com",
            role: "Team Leader",
        },
        {
            name: "Isabella Rossi",
            email: "i.rossi@techmould.com",
            role: "Employee",
        },
    ];

    const permissions = [
        {
            module: "Dashboard",
            desc: "Main overview of system metrics and real-time performance tracking.",
        },
        {
            module: "Operations & Analytics",
            desc: "Statistical breakdown of workshop operations and shop-floor efficiency.",
        },
        {
            module: "Inquiry & Quotation",
            desc: "Lead generation, pipeline management, and client price estimation.",
        },
        {
            module: "Projects & Workflow",
            desc: "Live manufacturing project tracking and milestone management.",
        },
        {
            module: "Design & Revision",
            desc: "Technical CAD drawings, visual assets, and design version control.",
        },
        {
            module: "Clients",
            desc: "Master database of corporate stakeholders, history, and records.",
        },
        {
            module: "Communication",
            desc: "Internal messaging hub and team collaboration center for leads.",
        },
        {
            module: "Task Management",
            desc: "Interactive Kanban board for itemized team tasks and priorities.",
        },
        {
            module: "Data Management",
            desc: "System-wide data archival, discovery, and secure file discovery.",
        },
        {
            module: "Reports",
            desc: "Consolidated financial audits and productivity data exports.",
        },
        {
            module: "Role Management",
            desc: "Access control, security protocols, and module visibility settings.",
        },
        {
            module: "Audit Log",
            desc: "Immutable record of all historical system activities for forensics.",
        },
    ];

    // Reactive Permission Check logic
    function isAllowed(moduleName: string, type: 'view' | 'edit' | 'delete', currentRole: string) {
        if (currentRole === 'Admin') return true;
        
        if (currentRole === 'Management') {
            const managementPages = ['Dashboard', 'Projects & Workflow', 'Clients', 'Reports'];
            if (managementPages.includes(moduleName)) {
                if (type === 'view') return true;
                if (type === 'edit') return true; 
                if (type === 'delete') return moduleName === 'Projects & Workflow';
            }
            return false;
        }

        if (type === 'view') return true;
        return false;
    }

    const stats = [
        {
            count: 1,
            title: "Executive Admin",
            desc: "Primary system controllers with full root override and financial management.",
            label: "S-TIER ACCESS",
            icon: ShieldCheck,
            color: "#654dcf",
        },
        {
            count: 5,
            title: "Management Layer",
            desc: "Strategic observers with project, client, and reporting privileges only.",
            label: "RESTRICTED ACCESS",
            icon: Users,
            color: "#4ecdc4",
        },
        {
            count: 142,
            title: "Security Events",
            desc: "Recorded in the last 30 days. Security protocol: Access reviewed by admin.",
            label: "AUDIT LOGS",
            icon: History,
            color: "white",
            bg: "#654dcf",
            dark: true,
        },
    ];
</script>

<svelte:head>
    <title>Role Management | TechMould ERP</title>
</svelte:head>

<div class="roles-page">
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
                {#each activeUsers as user}
                    <div class="user-row" transition:slide>
                        <div class="user-info">
                            <div class="text">
                                <strong>{user.name}</strong>
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <div class="role-display" class:role-admin={user.role === 'Admin'} class:role-mgmt={user.role === 'Management'}>
                            {user.role}
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
                            <select bind:value={selectedRole}>
                                {#each roles as role}
                                    <option value={role}>{role}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <span class="editing-badge">{selectedRole === 'Admin' ? 'FULL PRIVILEGE' : 'RESTRICTED PRIVILEGE'}</span>
                </div>

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
                            {#each permissions as perm}
                                <tr class={selectedRole === 'Management' && ['Dashboard', 'Projects & Workflow', 'Clients', 'Reports'].includes(perm.module) ? 'highlight-row' : ''}>
                                    <td>
                                        <div class="module-cell">
                                            <strong>{perm.module}</strong>
                                            <p>{perm.desc}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <label class="checkbox-container">
                                            <input type="checkbox" checked={isAllowed(perm.module, 'view', selectedRole)} />
                                            <span class="checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <label class="checkbox-container">
                                            <input type="checkbox" checked={isAllowed(perm.module, 'edit', selectedRole)} />
                                            <span class="checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <label class="checkbox-container">
                                            <input type="checkbox" checked={isAllowed(perm.module, 'delete', selectedRole)} />
                                            <span class="checkmark"></span>
                                        </label>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <div class="matrix-footer">
                    <button class="btn-cancel" onclick={() => showMatrix = false}>Discard</button>
                    <button class="btn-save" onclick={() => alert('Permissions updated for ' + selectedRole)}>
                        <Check size={16} /> Update Role Matrix
                    </button>
                </div>
            </section>
        {/if}
    </div>

    <div class="stats-section">
        <div class="section-top">
            <h3>Role Hierarchy Overview</h3>
        </div>
        <div class="stats-grid">
            {#each stats as stat}
                <div
                    class="stat-card card"
                    style="background: {stat.bg || 'white'}; color: {stat.dark ? 'white' : '#1a1a1a'}"
                >
                    <div class="stat-header">
                        <div
                            class="icon-box"
                            style="background: {stat.color}{stat.dark ? '40' : '15'}; color: {stat.color}"
                        >
                            <stat.icon size={18} />
                        </div>
                        <span class="stat-label" style="color: {stat.dark ? 'rgba(255,255,255,0.6)' : '#a0aec0'}">
                            {stat.label}
                        </span>
                    </div>
                    <div class="stat-body">
                        <span class="count">{stat.count}</span>
                        <h4>{stat.title}</h4>
                        <p style="color: {stat.dark ? 'rgba(255,255,255,0.7)' : '#718096'}">
                            {stat.desc}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <CreateUserModal bind:show={showCreateUserModal} />
    <CreateRoleModal bind:show={showCreateRoleModal} />
</div>

<style>
    .roles-page {
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding-bottom: 60px;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
    }

    .header-left h1 {
        font-size: 26px;
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

    .highlight-row {
        background: #f0f3ff50;
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

    .btn-cancel {
        font-size: 13px;
        font-weight: 700;
        color: #a0aec0;
    }

    .btn-save {
        background: var(--primary);
        color: white;
        padding: 12px 24px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
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
</style>
