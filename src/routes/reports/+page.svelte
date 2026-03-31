<script lang="ts">
    import {
        Clock,
        DollarSign,
        TriangleAlert,
        Activity,
        ChevronDown,
        FileText,
        Download,
        Funnel,
        ChevronLeft,
        ChevronRight,
        Calendar,
    } from "lucide-svelte";

    const stats = [
        {
            label: "TOTAL HOURS LOGGED",
            value: "2,480h",
            trend: "+12%",
            color: "#654dcf",
            icon: Clock,
        },
        {
            label: "BILLABLE RATIO",
            value: "85% / 15%",
            subLeft: "BILLABLE",
            subRight: "INTERNAL",
            color: "#4ecdc4",
            icon: DollarSign,
        },
        {
            label: "OVERTIME HOURS",
            value: "142h",
            note: "Requires review for Q3 budget",
            color: "#f39c12",
            icon: TriangleAlert,
        },
        {
            label: "ACTIVE TRACKERS",
            value: "24",
            status: "online",
            avatars: true,
            color: "#4ecdc4",
            icon: Activity,
        },
    ];

    const projectHours = [
        { name: "Mould Design Framework", hours: "840h", percent: 95 },
        { name: "Supply Chain ERP Core", hours: "612h", percent: 70 },
        { name: "Quality Control Mobile App", hours: "420h", percent: 50 },
        { name: "Client Onboarding UI", hours: "210h", percent: 25 },
    ];

    const logs = [
        {
            name: "Elena S. Rodriguez",
            project: "Mould Design Framework",
            category: "CAD DESIGN",
            hours: "7.5h",
            status: "BILLABLE",
            date: "Oct 24, 2023",
        },
        {
            name: "Marcus Bennett",
            project: "Supply Chain ERP Core",
            category: "API DEV",
            hours: "8.2h",
            status: "BILLABLE",
            date: "Oct 24, 2023",
        },
        {
            name: "Janice Lowe",
            project: "Internal Admin Tools",
            category: "MAINTENANCE",
            hours: "2.0h",
            status: "NON-BILLABLE",
            date: "Oct 23, 2023",
        },
        {
            name: "Tobias Hoffmann",
            project: "Mould Design Framework",
            category: "PROTOTYPING",
            hours: "10.5h",
            status: "BILLABLE",
            date: "Oct 23, 2023",
        },
    ];
</script>

<svelte:head>
    <title>Time Tracking Reports | TechMould ERP</title>
</svelte:head>

<div class="reports-page">
    <!-- Header -->
    <div class="page-header">
        <div class="header-left">
            <h1>Time Tracking Reports</h1>
            <p>
                Analyze resource allocation, productivity trends, and billing
                efficiency across all active enterprise projects.
            </p>
        </div>
        <div class="header-actions">
            <button class="btn-dropdown">
                <Calendar size={16} /> Last 30 Days <ChevronDown size={14} />
            </button>
            <button class="btn-outline">CSV</button>
            <button class="btn-primary"><Download size={16} /> PDF</button>
        </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
        {#each stats as stat}
            <div class="stat-card">
                <div class="s-header">
                    <span class="s-label">{stat.label}</span>
                    <div class="s-icon" style="color: {stat.color}">
                        <stat.icon size={18} />
                    </div>
                </div>
                <div class="s-body">
                    <div class="val-row">
                        <span class="value">{stat.value}</span>
                        {#if stat.trend}
                            <span class="trend" style="color: {stat.color}"
                                >{stat.trend}</span
                            >
                        {/if}
                    </div>
                    <div class="s-footer">
                        {#if stat.subLeft}
                            <div class="sub-row">
                                <span>{stat.subLeft}</span>
                                <span>{stat.subRight}</span>
                            </div>
                        {:else if stat.note}
                            <div class="note-row">
                                <span
                                    class="dot"
                                    style="background: {stat.color}"
                                ></span>
                                {stat.note}
                            </div>
                        {:else if stat.avatars}
                            <div class="avatars-row">
                                <div class="avatars">
                                    <div class="avatar"></div>
                                    <div class="avatar"></div>
                                    <div class="avatar"></div>
                                </div>
                                <span class="plus">+21</span>
                            </div>
                        {/if}
                    </div>
                </div>
                {#if stat.label === "TOTAL HOURS LOGGED"}
                    <div class="progress-line">
                        <div
                            class="fill"
                            style="width: 70%; background: {stat.color}"
                        ></div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <!-- Charts Section -->
    <div class="charts-grid">
        <!-- Weekly Trend -->
        <div class="card chart-card">
            <div class="chart-header">
                <h3>Weekly Productivity Trend</h3>
                <div class="legend">
                    <div class="l-item">
                        <span class="dot purple"></span> BILLABLE
                    </div>
                    <div class="l-item">
                        <span class="dot teal"></span> PROJECTED
                    </div>
                </div>
            </div>
            <div class="chart-content">
                <svg viewBox="0 0 400 150" class="trend-svg">
                    <!-- Billable Path -->
                    <path
                        d="M0,120 C50,110 80,130 120,100 C160,70 200,90 240,60 C280,30 320,110 360,90 C400,70 440,90 480,50"
                        fill="none"
                        stroke="#654dcf"
                        stroke-width="4"
                        stroke-linecap="round"
                    />
                    <!-- Projected Path -->
                    <path
                        d="M0,130 C50,125 100,115 150,110 C200,105 250,95 300,90 C350,85 400,60 450,110"
                        fill="none"
                        stroke="#4ecdc4"
                        stroke-width="3"
                        stroke-dasharray="5,5"
                        stroke-linecap="round"
                    />
                </svg>
                <div class="x-axis">
                    <span>MON</span><span>TUE</span><span>WED</span><span
                        >THU</span
                    ><span>FRI</span><span>SAT</span><span>SUN</span>
                </div>
            </div>
        </div>

        <!-- Hours by Project -->
        <div class="card chart-card">
            <div class="chart-header">
                <h3>Hours by Project</h3>
            </div>
            <div class="project-bars">
                {#each projectHours as proj}
                    <div class="proj-bar-item">
                        <div class="bar-info">
                            <span class="name">{proj.name}</span>
                            <span class="val">{proj.hours}</span>
                        </div>
                        <div class="bar-bg">
                            <div
                                class="bar-fill"
                                style="width: {proj.percent}%"
                            ></div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <!-- Detailed Logs -->
    <div class="logs-section">
        <div class="section-header">
            <h3>Detailed Time Logs</h3>
            <button class="btn-filter-side"
                ><Funnel size={14} /> FILTER BY EMPLOYEE</button
            >
        </div>
        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>EMPLOYEE NAME</th>
                        <th>PROJECT NAME</th>
                        <th>TASK CATEGORY</th>
                        <th>LOGGED HOURS</th>
                        <th>BILLABLE STATUS</th>
                        <th>DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {#each logs as log}
                        <tr>
                            <td>
                                <div class="emp-cell">
                                    <div class="avatar"></div>
                                    {log.name}
                                </div>
                            </td>
                            <td class="proj-name">{log.project}</td>
                            <td>
                                <span class="category-badge"
                                    >{log.category}</span
                                >
                            </td>
                            <td class="hours-val">{log.hours}</td>
                            <td>
                                <span
                                    class="status-pill {log.status
                                        .toLowerCase()
                                        .replace('-', '')}"
                                >
                                    {log.status}
                                </span>
                            </td>
                            <td class="date-val">{log.date}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="pagination">
            <span class="showing">Showing 1 To 4 Of 128 Results</span>
            <div class="pg-controls">
                <button class="pg-btn"><ChevronLeft size={16} /></button>
                <button class="pg-btn"><ChevronRight size={16} /></button>
            </div>
        </div>
    </div>
</div>

<style>
    .reports-page {
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
        color: #1a1a1a;
        margin-bottom: 4px;
    }
    .header-left p {
        font-size: 14px;
        color: var(--text-sub);
    }

    .header-actions {
        display: flex;
        gap: 12px;
    }
    .btn-dropdown,
    .btn-outline,
    .btn-primary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
    }
    .btn-dropdown {
        background: white;
        border: 1px solid var(--border);
        color: #1a1a1a;
    }
    .btn-outline {
        background: #f7fafc;
        border: 1px solid #edf2f7;
        color: #4a5568;
    }
    .btn-primary {
        background: white;
        border: 1px solid var(--primary);
        color: var(--primary);
    }

    /* Stats Grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }
    .stat-card {
        background: white;
        border-radius: 12px;
        padding: 24px;
        border: 1px solid rgba(0, 0, 0, 0.02);
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
    }
    .s-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    .s-label {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        letter-spacing: 0.5px;
    }

    .val-row {
        display: flex;
        align-items: flex-end;
        gap: 8px;
    }
    .value {
        font-size: 24px;
        font-weight: 800;
        color: #1a1a1a;
    }
    .trend {
        font-size: 11px;
        font-weight: 800;
        padding-bottom: 4px;
    }

    .s-footer {
        margin-top: 12px;
    }
    .sub-row {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        font-weight: 800;
        color: #cbd5e0;
    }

    .note-row {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 10px;
        font-weight: 800;
        color: #1a1a1a;
        opacity: 0.8;
    }
    .note-row .dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
    }

    .avatars-row {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .avatars {
        display: flex;
    }
    .avatar {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #e2e8f0;
        border: 2px solid white;
        margin-left: -8px;
    }
    .avatar:first-child {
        margin-left: 0;
    }
    .plus {
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
    }

    .progress-line {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: #f0f4f8;
    }
    .progress-line .fill {
        height: 100%;
        border-radius: 0 100px 100px 0;
    }

    /* Charts */
    .charts-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
    }
    .chart-card {
        padding: 32px;
        height: 320px;
        display: flex;
        flex-direction: column;
    }
    .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
    }
    .chart-header h3 {
        font-size: 15px;
        font-weight: 800;
        color: #1a1a1a;
    }

    .legend {
        display: flex;
        gap: 24px;
    }
    .l-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
    }
    .l-item .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }
    .dot.purple {
        background: #654dcf;
    }
    .dot.teal {
        background: #4ecdc4;
    }

    .chart-content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .trend-svg {
        width: 100%;
        height: 100%;
    }
    .x-axis {
        display: flex;
        justify-content: space-between;
        padding-top: 16px;
        border-top: 1px solid #f7fafc;
    }
    .x-axis span {
        font-size: 10px;
        font-weight: 800;
        color: #cbd5e0;
    }

    .project-bars {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    .proj-bar-item {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .bar-info {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-weight: 700;
        color: #4a5568;
    }
    .bar-bg {
        height: 6px;
        background: #f0f4f8;
        border-radius: 3px;
    }
    .bar-fill {
        height: 100%;
        background: var(--primary);
        border-radius: 3px;
    }

    /* Logs Table */
    .logs-section {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    .logs-section .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logs-section h3 {
        font-size: 16px;
        font-weight: 800;
    }
    .btn-filter-side {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        font-weight: 800;
        color: #1a1a1a;
        opacity: 0.6;
    }

    .table-card {
        background: white;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.02);
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
        border-bottom: 2px solid #f7fafc;
    }
    td {
        padding: 16px 24px;
        font-size: 13px;
        border-bottom: 1px solid #f7fafc;
    }

    .emp-cell {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 700;
        color: #1a1a1a;
    }
    .emp-cell .avatar {
        width: 28px;
        height: 28px;
        border-radius: 6px;
    }

    .proj-name {
        font-weight: 600;
        color: #718096;
    }
    .category-badge {
        background: #f1f3f7;
        color: #4a5568;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 800;
    }
    .hours-val {
        font-weight: 800;
        color: #1a1a1a;
    }

    .status-pill {
        padding: 4px 12px;
        border-radius: 100px;
        font-size: 10px;
        font-weight: 800;
    }
    .status-pill.billable {
        background: #e8fdfa;
        color: #4ecdc4;
    }
    .status-pill.nonbillable {
        background: #f1f3f7;
        color: #a0aec0;
    }

    .date-val {
        color: #a0aec0;
        font-weight: 700;
        font-size: 12px;
    }

    .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }
    .showing {
        font-size: 11px;
        font-weight: 800;
        color: #cbd5e0;
    }
    .pg-controls {
        display: flex;
        gap: 8px;
    }
    .pg-btn {
        width: 32px;
        height: 32px;
        border: 1px solid #edf2f7;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #a0aec0;
    }
</style>
