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
    } from "lucide-svelte";

    const activeUsers = [
        {
            name: "Johnnathan Doe",
            email: "j.doe@techmould.com",
            role: "Project Manager",
        },
        {
            name: "Sarah Chen",
            email: "s.chen@techmould.com",
            role: "Lead Designer",
        },
        {
            name: "Marcus Knight",
            email: "m.knight@techmould.com",
            role: "Sales Executive",
        },
    ];

    const permissions = [
        {
            module: "Inquiries & Quotations",
            desc: "Lead pipeline management",
            view: true,
            edit: true,
            delete: false,
        },
        {
            module: "Project Execution",
            desc: "Active manufacturing projects",
            view: true,
            edit: true,
            delete: true,
        },
        {
            module: "Financial Reports",
            desc: "Revenue and cost analysis",
            view: true,
            edit: false,
            delete: false,
        },
        {
            module: "Client Database",
            desc: "Master records of customers",
            view: true,
            edit: true,
            delete: false,
        },
    ];

    const stats = [
        {
            count: 12,
            title: "Administrators",
            desc: "Full system access including financial settings and user management.",
            label: "ACTIVE USERS",
            icon: ShieldCheck,
            color: "#654dcf",
        },
        {
            count: 48,
            title: "Managers & Leads",
            desc: "Access to projects and operational workflows. Restricted financials.",
            label: "ACTIVE USERS",
            icon: Users,
            color: "#4ecdc4",
        },
        {
            count: 142,
            title: "Permission Changes",
            desc: "Recorded in the last 30 days. Security protocol: Regular review recommended.",
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
    <!-- Header -->
    <div class="page-header">
        <div class="header-left">
            <h1>Role Management</h1>
            <p>Define system access levels and individual user permissions.</p>
        </div>
        <div class="header-actions">
            <button class="btn-ghost">Export Logs</button>
            <button class="btn-primary">Create New Role</button>
        </div>
    </div>

    <div class="main-grid">
        <!-- Active Users Column -->
        <section class="users-section">
            <div class="section-top">
                <h3>Active Users</h3>
            </div>
            <div class="user-list">
                <div class="list-header">
                    <span>USER</span>
                    <span>CURRENT ROLE</span>
                </div>
                {#each activeUsers as user}
                    <div class="user-row">
                        <div class="user-info">
                            <div class="text">
                                <strong>{user.name}</strong>
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <button class="role-selector">
                            {user.role}
                            <ChevronDown size={14} />
                        </button>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Permissions Matrix Panel -->
        <section class="card matrix-panel">
            <div class="matrix-header">
                <div class="m-title">
                    <h3>
                        Permissions Matrix: <span class="role-name"
                            >Project Manager</span
                        >
                    </h3>
                </div>
                <span class="custom-badge">CUSTOM SET</span>
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
                            <tr>
                                <td>
                                    <div class="module-cell">
                                        <strong>{perm.module}</strong>
                                        <p>{perm.desc}</p>
                                    </div>
                                </td>
                                <td>
                                    <label class="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={perm.view}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                </td>
                                <td>
                                    <label class="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={perm.edit}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                </td>
                                <td>
                                    <label class="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={perm.delete}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

            <div class="matrix-footer">
                <button class="btn-link">Reset to Default</button>
                <button class="btn-save">Save Matrix</button>
            </div>
        </section>
    </div>

    <!-- Role Overview Stats -->
    <div class="stats-section">
        <div class="section-top">
            <h3>Role Overview & Statistics</h3>
        </div>
        <div class="stats-grid">
            {#each stats as stat}
                <div
                    class="stat-card"
                    style="background: {stat.bg || 'white'}; color: {stat.dark
                        ? 'white'
                        : '#1a1a1a'}"
                >
                    <div class="stat-header">
                        <div
                            class="icon-box"
                            style="background: {stat.color}{stat.dark
                                ? '40'
                                : '15'}; color: {stat.color}"
                        >
                            <stat.icon size={18} />
                        </div>
                        <span
                            class="stat-label"
                            style="color: {stat.dark
                                ? 'rgba(255,255,255,0.6)'
                                : '#a0aec0'}">{stat.label}</span
                        >
                    </div>
                    <div class="stat-body">
                        <span class="count">{stat.count}</span>
                        <h4>{stat.title}</h4>
                        <p
                            style="color: {stat.dark
                                ? 'rgba(255,255,255,0.7)'
                                : '#718096'}"
                        >
                            {stat.desc}
                        </p>
                    </div>
                    {#if stat.dark}
                        <button class="view-history"
                            >VIEW HISTORY <ArrowRight size={14} /></button
                        >
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .roles-page {
        display: flex;
        flex-direction: column;
        gap: 48px;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header-left h1 {
        font-size: 24px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 4px;
    }
    .header-left p {
        font-size: 14px;
        color: var(--text-sub);
    }

    .header-actions {
        display: flex;
        gap: 16px;
    }
    .btn-ghost {
        font-size: 13px;
        font-weight: 700;
        color: #a0aec0;
        background: #f8f9fc;
        padding: 10px 20px;
        border-radius: 8px;
    }
    .btn-primary {
        background: var(--primary);
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
    }

    .main-grid {
        display: grid;
        grid-template-columns: 1fr 1.6fr;
        gap: 40px;
        align-items: start;
    }

    /* Active Users */
    .section-top h3 {
        font-size: 16px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 24px;
    }

    .list-header {
        display: flex;
        justify-content: space-between;
        padding: 0 10px 12px;
        font-size: 10px;
        font-weight: 800;
        color: #cbd5e0;
        letter-spacing: 0.5px;
    }

    .user-list {
        display: flex;
        flex-direction: column;
    }
    .user-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 12px;
        border-bottom: 1px solid #f7fafc;
    }
    .user-info {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .text {
        display: flex;
        flex-direction: column;
    }
    .text strong {
        font-size: 13px;
        font-weight: 800;
    }
    .text span {
        font-size: 11px;
        color: #a0aec0;
        font-weight: 600;
    }

    .role-selector {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        font-weight: 700;
        color: var(--primary);
    }

    /* Permissions Matrix */
    .matrix-panel {
        padding: 32px;
        border: 1px solid rgba(0, 0, 0, 0.02);
    }
    .matrix-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
    }
    .m-title h3 {
        font-size: 14px;
        font-weight: 800;
        color: #a0aec0;
    }
    .role-name {
        color: var(--primary);
    }
    .custom-badge {
        font-size: 9px;
        font-weight: 800;
        color: #4ecdc4;
        background: #e8fdfa;
        padding: 4px 10px;
        border-radius: 4px;
    }

    .matrix-table table {
        width: 100%;
        border-collapse: collapse;
    }
    .matrix-table th {
        text-align: left;
        padding: 12px 16px;
        font-size: 10px;
        font-weight: 800;
        color: #cbd5e0;
        border-bottom: 1px solid #f7fafc;
    }
    .matrix-table td {
        padding: 24px 16px;
        border-bottom: 1px solid #f7fafc;
    }

    .module-cell strong {
        font-size: 13px;
        font-weight: 800;
        color: #1a1a1a;
        display: block;
        margin-bottom: 4px;
    }
    .module-cell p {
        font-size: 11px;
        color: #a0aec0;
        font-weight: 600;
    }

    /* Custom Checkbox */
    .checkbox-container {
        display: block;
        position: relative;
        padding-left: 20px;
        cursor: pointer;
        font-size: 18px;
        user-select: none;
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
        background-color: white;
        border: 2px solid #e1e4ed;
        border-radius: 6px;
        transition: all 0.2s;
    }
    .checkbox-container:hover input ~ .checkmark {
        border-color: var(--primary);
    }
    .checkbox-container input:checked ~ .checkmark {
        background-color: var(--primary);
        border-color: var(--primary);
    }
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    .checkbox-container input:checked ~ .checkmark:after {
        display: block;
    }
    .checkbox-container .checkmark:after {
        left: 6px;
        top: 2px;
        width: 4px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    .matrix-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 32px;
        margin-top: 32px;
    }
    .btn-link {
        font-size: 12px;
        font-weight: 700;
        color: #a0aec0;
    }
    .btn-save {
        background: var(--primary);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
    }

    /* Stats Section */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }
    .stat-card {
        padding: 32px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.02);
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
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .stat-label {
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.5px;
    }

    .stat-body {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .stat-body .count {
        font-size: 28px;
        font-weight: 800;
    }
    .stat-body h4 {
        font-size: 14px;
        font-weight: 800;
    }
    .stat-body p {
        font-size: 11px;
        font-weight: 600;
        line-height: 1.6;
    }

    .view-history {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        font-weight: 800;
        color: white;
        margin-top: auto;
    }
</style>
