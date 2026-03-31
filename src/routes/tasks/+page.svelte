<script lang="ts">
    import {
        CircleCheck,
        EllipsisVertical,
        Plus,
        Funnel,
        ExternalLink,
        Clock,
        Download,
        CircleAlert,
        ChevronRight,
        Search,
        Activity,
    } from "lucide-svelte";

    const stats = [
        { label: "TOTAL TASKS", value: "142", trend: "+12%", color: "#4ecdc4" },
        {
            label: "AVG. EFFICIENCY",
            value: "94%",
            trend: "+2.4",
            color: "#4ecdc4",
        },
        { label: "LOGGED HOURS", value: "1,208", sub: "this week" },
    ];

    const kanban = [
        {
            title: "TO DO",
            count: 14,
            color: "#654dcf",
            cards: [
                {
                    title: "API Integration Architecture",
                    project: "CloudCore ERP",
                    priority: "HIGH PRIORITY",
                    date: "Oct 24",
                    pColor: "#f39c12",
                },
                {
                    title: "Security Audit Report",
                    project: "FinGuard Ops",
                    priority: "MEDIUM",
                    date: "Oct 28",
                    pColor: "#edf2f7",
                },
            ],
        },
        {
            title: "IN PROGRESS",
            count: "08",
            color: "#654dcf",
            cards: [
                {
                    title: "UI Redesign Phase 2",
                    project: "TechMould Internal",
                    priority: "HIGH PRIORITY",
                    active: true,
                    pColor: "#f39c12",
                },
            ],
        },
        {
            title: "REVIEW",
            count: "05",
            color: "#f39c12",
            cards: [
                {
                    title: "QA Database Migration",
                    project: "DataStreamer",
                    priority: "MEDIUM",
                    status: "Pending",
                    pColor: "#edf2f7",
                },
            ],
        },
        {
            title: "COMPLETED",
            count: 92,
            color: "#4ecdc4",
            cards: [
                {
                    title: "Module Test Plan",
                    sub: "Completed 3h ago",
                    archived: true,
                },
            ],
        },
    ];

    const employees = [
        {
            name: "Elena Rodriguez",
            role: "Senior Architect",
            project: "CloudCore ERP",
            hours: 38,
            total: 40,
            eff: "96.2%",
            status: "ONLINE",
            sColor: "#e8fdfa",
            sTextColor: "#4ecdc4",
        },
        {
            name: "Marcus Chen",
            role: "Lead Developer",
            project: "FinGuard Ops",
            hours: 42,
            total: 40,
            eff: "92.5%",
            status: "IN MEETING",
            sColor: "#fff5e6",
            sTextColor: "#f39c12",
        },
        {
            name: "Sarah Jenkins",
            role: "UI/UX Designer",
            project: "TechMould Redesign",
            hours: 12,
            total: 40,
            eff: "88.0%",
            status: "AWAY",
            sColor: "#f1f3f7",
            sTextColor: "#a0aec0",
        },
    ];
</script>

<svelte:head>
    <title>Task Management | TechMould ERP</title>
</svelte:head>

<div class="tasks-page">
    <!-- Stats Section -->
    <div class="stats-row">
        {#each stats as stat}
            <div class="stat-card">
                <span class="label">{stat.label}</span>
                <div class="val-row">
                    <span class="value">{stat.value}</span>
                    {#if stat.trend}
                        <span class="trend" style="color: {stat.color}"
                            >{stat.trend}</span
                        >
                    {:else if stat.sub}
                        <span class="sub">{stat.sub}</span>
                    {/if}
                </div>
            </div>
        {/each}
        <div class="card system-health-card">
            <span class="label">SYSTEM HEALTH</span>
            <div class="val-row">
                <span class="value">Stable</span>
                <div class="status-dot"></div>
            </div>
        </div>
    </div>

    <!-- Kanban Section -->
    <div class="kanban-section">
        <div class="section-header">
            <h2>Project Kanban</h2>
            <div class="header-actions">
                <button class="btn-filters"><Funnel size={14} /> Filters</button
                >
                <button class="btn-primary">New Task</button>
                <button class="btn-link">View All</button>
            </div>
        </div>

        <div class="kanban-grid">
            {#each kanban as col}
                <div class="kanban-col">
                    <div class="col-header">
                        <h3>{col.title}</h3>
                        <span
                            class="count"
                            style="background: {col.color}15; color: {col.color}"
                            >{col.count}</span
                        >
                    </div>

                    <div class="card-list">
                        {#each col.cards as card}
                            <div
                                class="task-card {card.archived
                                    ? 'archived'
                                    : ''}"
                            >
                                {#if card.priority}
                                    <span
                                        class="priority"
                                        style="background: {card.pColor ===
                                        '#edf2f7'
                                            ? '#f1f3f7'
                                            : '#fff5e6'}; color: {card.pColor ===
                                        '#edf2f7'
                                            ? '#718096'
                                            : '#f39c12'}">{card.priority}</span
                                    >
                                {/if}

                                <div class="task-body">
                                    <h4>{card.title}</h4>
                                    {#if card.project}
                                        <p>Project: {card.project}</p>
                                    {:else if card.sub}
                                        <p class="sub-text">{card.sub}</p>
                                    {/if}
                                </div>

                                <div class="task-footer">
                                    {#if card.date}
                                        <div class="avatars">
                                            <div class="avatar"></div>
                                            <div class="avatar"></div>
                                        </div>
                                        <span class="footer-meta"
                                            ><Clock size={12} />
                                            {card.date}</span
                                        >
                                    {:else if card.active}
                                        <div class="avatars">
                                            <div class="avatar"></div>
                                            <div class="avatar"></div>
                                        </div>
                                        <span class="footer-meta active"
                                            ><div class="dot pulse"></div>
                                            Active</span
                                        >
                                    {:else if card.status}
                                        <div class="avatar"></div>
                                        <span class="footer-meta pending"
                                            ><Activity size={12} />
                                            {card.status}</span
                                        >
                                    {:else if card.archived}
                                        <CircleCheck
                                            size={16}
                                            color="#4ecdc4"
                                        />
                                        <span class="archived-label"
                                            >ARCHIVED</span
                                        >
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Performance Section -->
    <div class="performance-section">
        <div class="section-header">
            <div class="title-group">
                <h2>Employee Performance</h2>
                <p>Live metrics from active work cycles.</p>
            </div>
            <button class="download-link"
                >Download Report <Download size={14} /></button
            >
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>EMPLOYEE NAME</th>
                        <th>ACTIVE PROJECT</th>
                        <th>HOURS LOGGED</th>
                        <th>EFFICIENCY</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {#each employees as emp}
                        <tr>
                            <td>
                                <div class="emp-cell">
                                    <div class="emp-avatar"></div>
                                    <div class="emp-text">
                                        <strong>{emp.name}</strong>
                                        <span>{emp.role}</span>
                                    </div>
                                </div>
                            </td>
                            <td
                                ><span class="project-val">{emp.project}</span
                                ></td
                            >
                            <td>
                                <div class="hours-cell">
                                    <div class="hours-text">
                                        <span>{emp.hours}h / {emp.total}h</span>
                                        <span
                                            class="percent"
                                            style="color: #654dcf"
                                            >{Math.round(
                                                (emp.hours / emp.total) * 100,
                                            )}%</span
                                        >
                                    </div>
                                    <div class="progress-bg">
                                        <div
                                            class="progress-fill"
                                            style="width: {Math.min(
                                                100,
                                                (emp.hours / emp.total) * 100,
                                            )}%"
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td class="eff-val">{emp.eff}</td>
                            <td>
                                <span
                                    class="status-pill"
                                    style="background: {emp.sColor}; color: {emp.sTextColor}"
                                >
                                    {emp.status}
                                </span>
                            </td>
                            <td
                                ><button class="action-btn"
                                    ><ExternalLink size={16} /></button
                                ></td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>

<style>
    .tasks-page {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    /* Stats Row */
    .stats-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    .stat-card,
    .system-health-card {
        background: white;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.02);
    }

    .system-health-card {
        background: var(--primary);
        color: white;
    }

    .label {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        letter-spacing: 0.5px;
    }
    .system-health-card .label {
        color: rgba(255, 255, 255, 0.7);
    }

    .val-row {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        margin-top: 8px;
    }
    .value {
        font-size: 24px;
        font-weight: 800;
        color: #1a1a1a;
    }
    .system-health-card .value {
        color: white;
    }

    .trend {
        font-size: 12px;
        font-weight: 800;
        padding-bottom: 4px;
    }
    .sub {
        font-size: 12px;
        color: #a0aec0;
        font-weight: 700;
        padding-bottom: 4px;
    }

    .status-dot {
        width: 10px;
        height: 10px;
        background: #4ecdc4;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.4);
        margin-bottom: 8px;
    }

    /* Kanban Section */
    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 24px;
    }
    .section-header h2 {
        font-size: 16px;
        font-weight: 800;
        color: #1a1a1a;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .btn-filters {
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid #edf2f7;
        border-radius: 8px;
        padding: 10px 16px;
        font-size: 13px;
        font-weight: 700;
        color: #4a5568;
    }
    .btn-primary {
        background: var(--primary);
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
    }
    .btn-link {
        font-size: 12px;
        font-weight: 700;
        color: var(--primary);
    }

    .kanban-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    .col-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    .col-header h3 {
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
    }
    .count {
        font-size: 10px;
        font-weight: 800;
        padding: 2px 8px;
        border-radius: 100px;
    }

    .card-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-height: 200px;
    }

    .task-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.02);
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .priority {
        font-size: 8px;
        font-weight: 800;
        padding: 3px 8px;
        border-radius: 4px;
        width: fit-content;
    }

    .task-body h4 {
        font-size: 13px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 4px;
    }
    .task-body p {
        font-size: 10px;
        font-weight: 700;
        color: #a0aec0;
    }
    .task-body p.sub-text {
        color: #cbd5e0;
    }

    .task-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 4px;
    }
    .avatars {
        display: flex;
        align-items: center;
    }
    .avatar {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #e2e8f0;
        border: 1.5px solid white;
        margin-left: -6px;
    }
    .avatar:first-child {
        margin-left: 0;
    }

    .footer-meta {
        font-size: 10px;
        font-weight: 700;
        color: #cbd5e0;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .footer-meta.active {
        color: var(--primary);
    }
    .footer-meta.pending {
        color: #f39c12;
    }

    .dot.pulse {
        width: 6px;
        height: 6px;
        background: var(--primary);
        border-radius: 50%;
        animation: dotPulse 1.5s infinite ease-out;
    }
    @keyframes dotPulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(2.5);
            opacity: 0;
        }
    }

    .archived {
        background: #fdfdfd;
        border-style: dashed;
    }
    .archived-label {
        font-size: 10px;
        font-weight: 800;
        color: #4ecdc4;
    }

    /* Performance Section */
    .title-group h2 {
        margin-bottom: 4px;
    }
    .title-group p {
        font-size: 13px;
        color: #a0aec0;
        font-weight: 600;
    }
    .download-link {
        font-size: 12px;
        font-weight: 700;
        color: var(--primary);
        display: flex;
        align-items: center;
        gap: 8px;
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
        border-bottom: 1px solid #f7fafc;
    }
    td {
        padding: 16px 24px;
        border-bottom: 1px solid #f7fafc;
    }

    .emp-cell {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .emp-avatar {
        width: 32px;
        height: 32px;
        background: #4a5568;
        border-radius: 8px;
    }
    .emp-text {
        display: flex;
        flex-direction: column;
    }
    .emp-text strong {
        font-size: 13px;
        font-weight: 800;
        color: #1a1a1a;
    }
    .emp-text span {
        font-size: 11px;
        color: #a0aec0;
        font-weight: 600;
    }

    .project-val {
        font-size: 12px;
        font-weight: 700;
        color: #4a5568;
    }

    .hours-cell {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 160px;
    }
    .hours-text {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
    }
    .progress-bg {
        height: 4px;
        background: #f1f3f7;
        border-radius: 2px;
    }
    .progress-fill {
        height: 100%;
        background: var(--primary);
        border-radius: 2px;
    }

    .eff-val {
        font-size: 13px;
        font-weight: 800;
        color: #4ecdc4;
    }

    .status-pill {
        padding: 4px 12px;
        border-radius: 100px;
        font-size: 10px;
        font-weight: 800;
    }
    .action-btn {
        color: #cbd5e0;
    }
</style>
