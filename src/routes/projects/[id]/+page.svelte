<script lang="ts">
    import {
        ChevronRight,
        History,
        RotateCcw,
        CircleCheck,
        Clock,
        TriangleAlert,
        Files,
    } from "lucide-svelte";

    const phases = [
        { name: "QUOTATION", status: "completed" },
        { name: "DESIGN", status: "completed" },
        { name: "MANUFACTURING", status: "active" },
        { name: "QUALITY CHECK", status: "pending" },
        { name: "DISPATCH", status: "pending" },
    ];

    const columns = [
        {
            title: "RAW PROCUREMENT",
            id: "02",
            tasks: [
                {
                    title: "S136 Steel Block Sourcing",
                    priority: "MEDIUM PRIORITY",
                    sub: "Verification of heat-treatment certification for 500x500 base blocks.",
                    date: "Oct 24",
                    color: "#f39c12",
                },
                {
                    title: "Ejector Pins Inventory",
                    priority: "SCHEDULED",
                    sub: "Check stock levels for 8mm standard pins and order custom sleeves.",
                    alert: "Missing Stock",
                    color: "#4ecdc4",
                },
            ],
        },
        {
            title: "CNC & EDM",
            id: "01",
            tasks: [
                {
                    title: "Cavity Roughing A-Side",
                    priority: "CRITICAL PATH",
                    sub: "Progress: 85% • Est. 4.5h left",
                    machine: "Machine #CNC-04",
                    color: "#e74c3c",
                },
            ],
        },
        {
            title: "BENCH WORK",
            id: "00",
            empty: "NO ACTIVE TASKS",
        },
        {
            title: "VALIDATION",
            empty: "Awaiting CNC completion to start first-article inspection.",
        },
    ];
</script>

<svelte:head>
    <title>Project Overview | TechMould ERP</title>
</svelte:head>

<div class="overview-page">
    <!-- Breadcrumb and Summary Header -->
    <div class="overview-header">
        <div class="header-main">
            <div class="breadcrumb">
                <a href="/projects" class="link">PROJECTS</a>
                <ChevronRight size={14} />
                <span class="active">PRECISION MOLD ALPHA-09</span>
            </div>
            <h2>Precision Mold Alpha-09</h2>
            <p class="subtitle">
                Industrial Grade Injection Mold - Client: GlobalTech
                Manufacturing
            </p>
        </div>
        <div class="header-actions">
            <button class="btn-ghost"><History size={16} /> Audit Log</button>
            <button class="btn-danger-ghost"
                ><RotateCcw size={16} /> Trigger Rework</button
            >
        </div>
    </div>

    <!-- Stepper -->
    <div class="stepper-container">
        <div class="stepper">
            {#each phases as phase, i}
                <div class="step {phase.status}">
                    <div class="step-line {i === 0 ? 'hidden' : ''}"></div>
                    <div class="step-marker">
                        {#if phase.status === "completed"}
                            <CircleCheck
                                size={18}
                                fill="#654dcf"
                                color="white"
                            />
                        {:else if phase.status === "active"}
                            <div class="dot active">
                                <div class="pulse"></div>
                            </div>
                        {:else}
                            <div class="dot pending"></div>
                        {/if}
                    </div>
                    <span class="step-name">{phase.name}</span>
                </div>
            {/each}
        </div>
    </div>

    <!-- Workflow Columns -->
    <div class="workflow-grid">
        {#each columns as col}
            <div class="workflow-col">
                <div class="col-header">
                    <span class="dot-accent"></span>
                    <h3>{col.title}</h3>
                    {#if col.id}
                        <span class="col-count">{col.id}</span>
                    {/if}
                </div>

                <div class="task-list">
                    {#if col.tasks}
                        {#each col.tasks as task}
                            <div class="task-card">
                                <span
                                    class="priority"
                                    style="background: {task.color}15; color: {task.color}"
                                    >{task.priority}</span
                                >
                                <h4>{task.title}</h4>
                                <p>{task.sub}</p>

                                <div class="task-footer">
                                    {#if task.machine}
                                        <div class="machine-tag">
                                            <span class="dot"></span>
                                            {task.machine}
                                        </div>
                                    {:else if task.date}
                                        <div class="avatars">
                                            <div class="avatar"></div>
                                            <div class="avatar"></div>
                                        </div>
                                        <span class="date">📅 {task.date}</span>
                                    {/if}

                                    {#if task.alert}
                                        <span class="alert-text"
                                            >{task.alert}</span
                                        >
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    {:else}
                        <div class="empty-col">
                            {#if col.title === "BENCH WORK"}
                                <div class="empty-icon">
                                    <Files size={32} />
                                </div>
                            {/if}
                            <p>{col.empty}</p>
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <!-- Footer Info -->
    <div class="overview-footer">
        <div class="footer-stats">
            <div class="f-stat">
                <span class="label">CYCLE TIME EFFICIENCY</span>
                <span class="value">94.2 %</span>
            </div>
            <div class="divider"></div>
            <div class="f-stat">
                <span class="label">RESOURCES ACTIVE</span>
                <span class="value">06 <span class="sub">/08</span></span>
            </div>
            <div class="divider"></div>
            <div class="f-stat">
                <span class="label">TOTAL BUDGET SPENT</span>
                <span class="value">42 k</span>
            </div>
            <button class="btn-report">Full Project Report</button>
        </div>

        <div class="countdown-card">
            <span class="c-label">DELIVERY COUNTDOWN</span>
            <span class="c-value">12 Days</span>
            <span class="c-sub">Remaining until dispatch deadline.</span>
        </div>
    </div>
</div>

<style>
    .overview-page {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .overview-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
        margin-bottom: 20px;
    }

    .breadcrumb .link {
        color: #a0aec0;
    }
    .breadcrumb .active {
        color: var(--primary);
    }

    .header-main h2 {
        font-size: 24px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 4px;
    }

    .subtitle {
        font-size: 14px;
        color: var(--text-sub);
    }

    .header-actions {
        display: flex;
        gap: 12px;
    }

    .btn-ghost,
    .btn-danger-ghost {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 700;
        border: 1px solid var(--border);
        background: white;
    }

    .btn-danger-ghost {
        background: #fff5f5;
        color: #e53e3e;
        border: 1px solid #fed7d7;
    }

    /* Stepper */
    .stepper-container {
        padding: 0 40px;
    }

    .stepper {
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    .step {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        gap: 12px;
    }

    .step-line {
        position: absolute;
        width: 100%;
        height: 3px;
        background: #edf2f7;
        top: 9px;
        right: 50%;
        z-index: 1;
    }

    .step.completed .step-line,
    .step.active .step-line {
        background: var(--primary);
    }

    .step-marker {
        position: relative;
        z-index: 2;
        background: white;
    }

    .dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #edf2f7;
    }

    .dot.active {
        background: var(--primary);
        width: 12px;
        height: 12px;
        outline: 4px solid #e9e5ff;
    }

    .pulse {
        position: absolute;
        top: -6px;
        left: -6px;
        right: -6px;
        bottom: -6px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        opacity: 0.3;
    }

    .step-name {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
    }

    .step.active .step-name {
        color: var(--primary);
    }
    .step.completed .step-name {
        color: #4ecdc4;
    }

    /* Workflow Columns */
    .workflow-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin-top: 10px;
    }

    .col-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 24px;
    }

    .dot-accent {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #f39c12;
    }

    .workflow-col:nth-child(2) .dot-accent {
        background: var(--primary);
    }
    .workflow-col:nth-child(3) .dot-accent {
        background: #cbd5e0;
    }
    .workflow-col:nth-child(4) .dot-accent {
        background: #4ecdc4;
    }

    .col-header h3 {
        font-size: 13px;
        font-weight: 800;
        color: #4a5568;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .col-count {
        background: #edf2f7;
        color: #4a5568;
        font-size: 10px;
        font-weight: 800;
        padding: 2px 6px;
        border-radius: 100px;
    }

    .task-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-height: 200px;
    }

    .task-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid var(--border);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    }

    .priority {
        font-size: 9px;
        font-weight: 800;
        padding: 4px 8px;
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 12px;
    }

    .task-card h4 {
        font-size: 13px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 8px;
    }

    .task-card p {
        font-size: 11px;
        color: var(--text-sub);
        line-height: 1.5;
        margin-bottom: 16px;
    }

    .task-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 12px;
        border-top: 1px solid #f7fafc;
    }

    .machine-tag {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 10px;
        font-weight: 800;
        color: var(--primary);
    }

    .machine-tag .dot {
        width: 6px;
        height: 6px;
        background: var(--primary);
    }

    .date {
        font-size: 10px;
        font-weight: 700;
        color: #a0aec0;
    }

    .alert-text {
        font-size: 10px;
        font-weight: 800;
        color: #e53e3e;
    }

    .empty-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2px dashed #edf2f7;
        border-radius: 12px;
        flex: 1;
        color: #cbd5e0;
        text-align: center;
        padding: 20px;
    }

    .empty-icon {
        color: #e2e8f0;
        margin-bottom: 10px;
    }
    .empty-col p {
        font-size: 11px;
        font-weight: 700;
        width: 140px;
    }

    /* Footer */
    .overview-footer {
        display: flex;
        gap: 20px;
        align-items: stretch;
    }

    .footer-stats {
        flex: 1;
        background: white;
        padding: 20px 32px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 40px;
        border: 1px solid var(--border);
    }

    .f-stat {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .f-stat .label {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
    }
    .f-stat .value {
        font-size: 18px;
        font-weight: 800;
        color: #1a1a1a;
    }
    .f-stat .sub {
        font-size: 12px;
        color: #a0aec0;
    }

    .divider {
        width: 1px;
        height: 32px;
        background: #edf2f7;
    }

    .btn-report {
        margin-left: auto;
        background: var(--primary);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
    }

    .countdown-card {
        width: 280px;
        background: var(--primary);
        color: white;
        padding: 24px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .c-label {
        font-size: 10px;
        font-weight: 800;
        opacity: 0.8;
    }
    .c-value {
        font-size: 24px;
        font-weight: 800;
        margin: 4px 0;
    }
    .c-sub {
        font-size: 11px;
        opacity: 0.8;
    }
</style>
