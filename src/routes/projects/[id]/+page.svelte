<script lang="ts">
    import type { PageData } from "./$types";
    import {
        ChevronRight,
        History,
        RotateCcw,
        CircleCheck,
        Clock,
        TriangleAlert,
        Files,
    } from "lucide-svelte";

    let { data }: { data: PageData } = $props();
    const project = $derived(data.project);

    type Task = {
        title: string;
        priority: string;
        sub: string;
        color: string;
        machine?: string;
        date?: string;
        alert?: string;
    };

    type WorkflowColumn = {
        title: string;
        id?: string;
        tasks?: Task[];
        empty?: string;
    };

    const fmtDate = (d: Date) =>
        new Date(d).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });

    const fmtBudget = (v: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(v);

    const phases = $derived(data.phases ?? []);

    const columns = $derived((data.columns ?? []) as WorkflowColumn[]);
    const auditLogs = $derived(data.auditLogs ?? []);

    let progressDraft = $state(0);

    $effect(() => {
        progressDraft = project.progressPercent;
    });
</script>

<svelte:head>
    <title>{project.title} | Project Overview</title>
</svelte:head>

<div class="overview-page">
    <!-- Breadcrumb and Summary Header -->
    <div class="overview-header">
        <div class="header-main">
            <div class="breadcrumb">
                <a href="/projects" class="link">PROJECTS</a>
                <ChevronRight size={14} />
                <span class="active">{project.code}</span>
            </div>
            <h2>{project.title}</h2>
            <p class="subtitle">
                Client: {project.clientName} | Category: {project.category} |
                Priority: {project.priority}
            </p>
        </div>
        <div class="header-actions">
            <a class="btn-ghost" href="#audit-log"><History size={16} /> Audit Log</a>
            <form method="POST" action="?/triggerRework">
                <button class="btn-danger-ghost" type="submit"
                    ><RotateCcw size={16} /> Trigger Rework</button
                >
            </form>
        </div>
    </div>

    <section class="progress-panel">
        <div class="progress-left">
            <h3>Update Work Completion</h3>
            <p>
                Save progress here. Workflow process stages update automatically
                based on this percentage.
            </p>
        </div>
        <form class="progress-form" method="POST" action="?/updateProgress">
            <input type="range" min="0" max="100" name="progress" bind:value={progressDraft} />
            <div class="progress-controls">
                <span>{progressDraft}%</span>
                <button class="btn-report" type="submit">Save Progress</button>
            </div>
        </form>
    </section>

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
                <span class="value">{project.progressPercent}%</span>
            </div>
            <div class="divider"></div>
            <div class="f-stat">
                <span class="label">PROJECT STATUS</span>
                <span class="value">{project.status}</span>
            </div>
            <div class="divider"></div>
            <div class="f-stat">
                <span class="label">TOTAL BUDGET SPENT</span>
                <span class="value">{fmtBudget(project.budgetUsd)}</span>
            </div>
            <button class="btn-report">Full Project Report</button>
        </div>

        <div class="countdown-card">
            <span class="c-label">DELIVERY WINDOW</span>
            <span class="c-value">{fmtDate(project.startDate)} - {fmtDate(project.dueDate)}</span>
            <span class="c-sub">{project.description || "No detailed description provided."}</span>
        </div>
    </div>

    <section class="audit-panel" id="audit-log">
        <h3>Audit Timeline</h3>
        {#if auditLogs.length === 0}
            <p class="audit-empty">No audit events yet.</p>
        {:else}
            <div class="audit-list">
                {#each auditLogs as log}
                    <article class="audit-item">
                        <div class="audit-meta">
                            <strong>{log.eventType}</strong>
                            <span>{log.at}</span>
                        </div>
                        <p>{log.message}</p>
                        <small>by {log.actor}</small>
                    </article>
                {/each}
            </div>
        {/if}
    </section>
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

    .progress-panel {
        background: white;
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
    }

    .progress-left h3 {
        font-size: 15px;
        font-weight: 800;
        margin-bottom: 4px;
    }

    .progress-left p {
        font-size: 12px;
        color: #64748b;
    }

    .progress-form {
        min-width: 360px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .progress-form input[type="range"] {
        width: 100%;
    }

    .progress-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: 800;
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

    .audit-panel {
        background: white;
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 20px;
    }

    .audit-panel h3 {
        font-size: 16px;
        font-weight: 800;
        margin-bottom: 12px;
    }

    .audit-empty {
        color: #64748b;
        font-size: 12px;
    }

    .audit-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .audit-item {
        border: 1px solid #eef2f7;
        border-radius: 10px;
        padding: 10px 12px;
    }

    .audit-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
    }

    .audit-item strong {
        font-size: 11px;
        color: #334155;
    }

    .audit-item span {
        font-size: 11px;
        color: #94a3b8;
    }

    .audit-item p {
        font-size: 12px;
        color: #334155;
        margin: 0;
    }

    .audit-item small {
        color: #94a3b8;
        font-size: 11px;
    }
</style>
