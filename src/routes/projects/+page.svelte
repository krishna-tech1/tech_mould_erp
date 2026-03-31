<script lang="ts">
    import {
        Calendar,
        ChevronDown,
        Search,
        Ellipsis,
        ChevronLeft,
        ChevronRight,
        ArrowUpRight,
    } from "lucide-svelte";

    const stats = [
        {
            label: "TOTAL BUDGET",
            value: "$4.2M",
            trend: "↑ 12%",
            trendColor: "#4ecdc4",
        },
        {
            label: "HEALTHY PROJECTS",
            value: "28",
            sub: "/ 32",
            trend: "",
            color: "#1a1a1a",
        },
        {
            label: "AT RISK",
            value: "3",
            trend: "Warning",
            trendColor: "#f39c12",
        },
        {
            label: "DELAYED",
            value: "1",
            trend: "Critical",
            trendColor: "#e74c3c",
        },
    ];

    const projects = [
        {
            name: "Precision Mold-X Case",
            id: "#PX-400",
            client: "Tesla Giga Lab",
            status: "HEALTHY",
            start: "Oct 12, 2023",
            due: "Dec 15, 2023",
            budget: "$245,000",
            progress: 75,
            color: "#654dcf",
            team: ["/admin-face.jpg", "/admin-face.jpg"], // Placeholders
        },
        {
            name: "Aluminum Housing V2",
            id: "#PX-389",
            client: "SpaceX",
            status: "AT RISK",
            start: "Sep 01, 2023",
            due: "Nov 20, 2023",
            budget: "$1.2M",
            progress: 42,
            color: "#f39c12",
            team: ["/admin-face.jpg", "/admin-face.jpg", "+2"],
        },
        {
            name: "Bio-Med Valve Prototypes",
            id: "#PX-312",
            client: "Medtronic",
            status: "DELAYED",
            start: "Aug 15, 2023",
            due: "Oct 30, 2023",
            budget: "$89,000",
            progress: 15,
            color: "#e74c3c",
            team: ["/admin-face.jpg"],
        },
        {
            name: "Turbo Fan Assemblies",
            id: "#PX-412",
            client: "Rolls-Royce",
            status: "HEALTHY",
            start: "Nov 01, 2023",
            due: "Feb 28, 2024",
            budget: "$560,000",
            progress: 5,
            color: "#654dcf",
            team: ["/admin-face.jpg", "/admin-face.jpg"],
        },
    ];
</script>

<svelte:head>
    <title>Projects | TechMould ERP</title>
</svelte:head>

<div class="projects-page">
    <!-- Header -->
    <div class="page-header">
        <div class="header-left">
            <h1>Projects <span class="badge">32 ACTIVE</span></h1>
            <p>Manage and track your ongoing manufacturing projects.</p>
        </div>
        <div class="header-filters">
            <div class="filter-group">
                <div class="filter-item">
                    <Calendar size={14} />
                    <span>Last 30 Days</span>
                    <ChevronDown size={14} />
                </div>
                <div class="divider"></div>
                <div class="filter-item">
                    <span class="label">STATUS</span>
                    <span>All Status</span>
                    <ChevronDown size={14} />
                </div>
                <div class="divider"></div>
                <div class="filter-item">
                    <span class="label">CATEGORY</span>
                    <span>All Categories</span>
                    <ChevronDown size={14} />
                </div>
            </div>
        </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
        {#each stats as stat}
            <div class="stat-card">
                <span class="stat-label">{stat.label}</span>
                <div class="stat-main">
                    <span class="stat-value">{stat.value}</span>
                    {#if stat.sub}
                        <span class="stat-sub">{stat.sub}</span>
                    {/if}
                    {#if stat.trend}
                        <span
                            class="stat-trend"
                            style="color: {stat.trendColor}">{stat.trend}</span
                        >
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <!-- Projects Table -->
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>PROJECT & ID</th>
                    <th>CLIENT</th>
                    <th>HEALTH STATUS</th>
                    <th>TIMELINE</th>
                    <th>BUDGET</th>
                    <th>PROGRESS</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {#each projects as p}
                    <tr>
                        <td>
                            <div class="project-cell">
                                <a href="/projects/PX-400" class="project-name"
                                    >{p.name}</a
                                >
                                <span class="project-id">{p.id}</span>
                            </div>
                        </td>
                        <td>{p.client}</td>
                        <td>
                            <span
                                class="status-badge {p.status
                                    .toLowerCase()
                                    .replace(' ', '-')}"
                            >
                                <span class="dot"></span>
                                {p.status}
                            </span>
                        </td>
                        <td>
                            <div class="timeline-cell">
                                <span>Start: <strong>{p.start}</strong></span>
                                <span>Due: <strong>{p.due}</strong></span>
                            </div>
                        </td>
                        <td class="bold">{p.budget}</td>
                        <td>
                            <div class="progress-cell">
                                <div class="progress-info">
                                    <span>{p.progress}%</span>
                                    <div class="team-avatars">
                                        {#each p.team as member}
                                            {#if member.startsWith("/")}
                                                <div class="avatar">
                                                    <div
                                                        class="img-placeholder"
                                                    ></div>
                                                </div>
                                            {:else}
                                                <div class="avatar-count">
                                                    {member}
                                                </div>
                                            {/if}
                                        {/each}
                                    </div>
                                </div>
                                <div class="progress-bar-bg">
                                    <div
                                        class="progress-bar-fill"
                                        style="width: {p.progress}%; background: {p.color}"
                                    ></div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <button class="action-btn">
                                <div class="circle-dots"></div>
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="pagination-footer">
        <span class="showing-text">Showing 4 of 32 projects</span>
        <div class="pagination-controls">
            <button class="arrow-btn"><ChevronLeft size={16} /></button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <button class="arrow-btn"><ChevronRight size={16} /></button>
        </div>
    </div>
</div>

<style>
    .projects-page {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-left h1 {
        font-size: 24px;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .badge {
        background: #eef1f5;
        color: var(--primary);
        font-size: 11px;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 6px;
    }

    .header-left p {
        color: var(--text-sub);
        font-size: 14px;
        margin-top: 4px;
    }

    /* Filters */
    .header-filters {
        background: white;
        padding: 8px;
        border-radius: 10px;
        border: 1px solid var(--border);
    }

    .filter-group {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .filter-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        color: var(--text-main);
    }

    .filter-item .label {
        color: #a0aec0;
        font-size: 11px;
        font-weight: 700;
    }

    .divider {
        width: 1px;
        height: 24px;
        background: #edf2f7;
    }

    /* Stats Grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    .stat-card {
        background: white;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.03);
    }

    .stat-label {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        letter-spacing: 0.5px;
        margin-bottom: 12px;
        display: block;
    }

    .stat-main {
        display: flex;
        align-items: baseline;
        gap: 6px;
    }

    .stat-value {
        font-size: 28px;
        font-weight: 800;
        color: #1a1a1a;
    }

    .stat-sub {
        font-size: 16px;
        font-weight: 600;
        color: #a0aec0;
    }

    .stat-trend {
        margin-left: auto;
        font-size: 12px;
        font-weight: 700;
    }

    /* Table */
    .table-container {
        background: white;
        border-radius: 12px;
        border: 1px solid var(--border);
        overflow: hidden;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th {
        padding: 16px 24px;
        text-align: left;
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 1px solid var(--border);
    }

    td {
        padding: 20px 24px;
        font-size: 13px;
        border-bottom: 1px solid var(--border);
    }

    .project-cell {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .project-name {
        font-weight: 800;
        color: #1a1a1a;
    }

    .project-id {
        font-size: 11px;
        color: var(--primary);
        font-weight: 700;
    }

    /* Status Badges */
    .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 100px;
        font-size: 10px;
        font-weight: 800;
    }

    .status-badge .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }

    .status-badge.healthy {
        background: #e8fdfa;
        color: #4ecdc4;
    }
    .status-badge.healthy .dot {
        background: #4ecdc4;
    }

    .status-badge.at-risk {
        background: #fff5e6;
        color: #f39c12;
    }
    .status-badge.at-risk .dot {
        background: #f39c12;
    }

    .status-badge.delayed {
        background: #ffeded;
        color: #e74c3c;
    }
    .status-badge.delayed .dot {
        background: #e74c3c;
    }

    .timeline-cell {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 12px;
    }

    .timeline-cell strong {
        color: #1a1a1a;
    }

    .bold {
        font-weight: 800;
        color: #1a1a1a;
    }

    /* Progress Cell */
    .progress-cell {
        width: 140px;
    }

    .progress-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        font-size: 11px;
        font-weight: 800;
    }

    .team-avatars {
        display: flex;
        align-items: center;
    }

    .avatar,
    .avatar-count {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        margin-left: -6px;
        font-size: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #edf2f7;
    }

    .avatar:first-child {
        margin-left: 0;
    }
    .img-placeholder {
        background: #cbd5e0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .avatar-count {
        background: #e9e5ff;
        color: var(--primary);
        font-weight: 800;
    }

    .progress-bar-bg {
        width: 100%;
        height: 6px;
        background: #edf2f7;
        border-radius: 3px;
    }

    .progress-bar-fill {
        height: 100%;
        border-radius: 3px;
    }

    /* Actions */
    .action-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f7fafc;
        color: #a0aec0;
    }

    .circle-dots {
        width: 4px;
        height: 4px;
        background: currentColor;
        border-radius: 50%;
        box-shadow:
            6px 0 currentColor,
            -6px 0 currentColor;
    }

    /* Pagination */
    .pagination-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        padding: 16px 24px;
        border-radius: 12px;
        border: 1px solid var(--border);
    }

    .showing-text {
        font-size: 13px;
        font-weight: 700;
        color: #a0aec0;
    }

    .pagination-controls {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .page-btn,
    .arrow-btn {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 700;
        color: #4a5568;
        transition: all 0.2s;
    }

    .page-btn.active {
        background: var(--primary);
        color: white;
    }

    .arrow-btn {
        color: #a0aec0;
    }

    .page-btn:hover:not(.active),
    .arrow-btn:hover {
        background: #f7fafc;
    }
</style>
