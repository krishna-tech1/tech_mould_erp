<script lang="ts">
    import {
        CircleCheck,
        Plus,
        Funnel,
        Download,
        Search,
        Activity,
        Clock,
        MoreHorizontal,
        AlertCircle,
        Users
    } from "lucide-svelte";
    import { fade, slide, scale } from "svelte/transition";
    import CreateTaskModal from "$lib/components/CreateTaskModal.svelte";

    let showCreateTaskModal = $state(false);
    let searchQuery = $state("");
    let priorityFilter = $state("All Priorities");

    const stats = [
        { label: "TOTAL TASKS", value: "142", trend: "+12%", color: "#4ecdc4" },
        { label: "COMPLETION RATE", value: "88%", trend: "+5%", color: "#4ecdc4" },
        { label: "PENDING REVIEW", value: "05", trend: "", color: "#f39c12" },
        { label: "OVERDUE", value: "02", trend: "Critical", color: "#e74c3c" },
    ];

    let kanbanCols = $state([
        {
            title: "To Do",
            id: "todo",
            color: "#654dcf",
            cards: [
                { id: "T-101", title: "API Integration Architecture", project: "CloudCore ERP", priority: "HIGH", date: "Oct 24", members: 2 },
                { id: "T-102", title: "Security Audit Report", project: "FinGuard Ops", priority: "MEDIUM", date: "Oct 28", members: 1 },
            ]
        },
        {
            title: "In Progress",
            id: "doing",
            color: "#654dcf",
            cards: [
                { id: "T-201", title: "UI Redesign Phase 2", project: "TechMould Internal", priority: "HIGH", active: true, members: 3 },
            ]
        },
        {
            title: "Testing",
            id: "testing",
            color: "#f39c12",
            cards: [
                { id: "T-301", title: "QA Database Migration", project: "DataStreamer", priority: "MEDIUM", date: "Oct 21", members: 1 },
            ]
        },
        {
            title: "Done",
            id: "done",
            color: "#4ecdc4",
            cards: [
                { id: "T-401", title: "Module Test Plan", project: "DataStreamer", priority: "LOW", done: true, members: 2 },
            ]
        }
    ]);

    const filteredKanban = $derived(
        kanbanCols.map(col => ({
            ...col,
            cards: col.cards.filter(card => {
                const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                     card.project.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesPriority = priorityFilter === "All Priorities" || card.priority === priorityFilter.toUpperCase();
                return matchesSearch && matchesPriority;
            })
        }))
    );

    const priorityOptions = ["All Priorities", "High", "Medium", "Low", "Urgent"];
</script>

<svelte:head>
    <title>Task Management | TechMould ERP</title>
</svelte:head>

<div class="tasks-page">
    <!-- Page Header -->
    <div class="page-header">
        <div class="header-left">
            <h1>Task Management <span class="badge">LIVE</span></h1>
            <p>Coordinate workflows and monitor team efficiency.</p>
        </div>
        <div class="header-actions">
            <div class="search-box">
                <Search size={16} />
                <input type="text" placeholder="Search tasks or projects..." bind:value={searchQuery} />
            </div>
            <div class="filter-dropdown">
                <Funnel size={14} />
                <select bind:value={priorityFilter}>
                    {#each priorityOptions as opt}
                        <option value={opt}>{opt}</option>
                    {/each}
                </select>
            </div>
            <button class="btn-primary" onclick={() => showCreateTaskModal = true}>
                <Plus size={18} />
                New Task
            </button>
        </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
        {#each stats as stat}
            <div class="stat-card">
                <span class="stat-label">{stat.label}</span>
                <div class="stat-main">
                    <span class="stat-value">{stat.value}</span>
                    {#if stat.trend}
                        <span class="stat-trend" style="color: {stat.color}">{stat.trend}</span>
                    {/if}
                </div>
                <div class="stat-progress">
                    <div class="progress-bar" style="background: {stat.color}20">
                        <div class="progress-fill" style="width: 70%; background: {stat.color}"></div>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <!-- Kanban Board -->
    <div class="kanban-board">
        {#each filteredKanban as col}
            <div class="kanban-column" in:fade={{ duration: 400 }}>
                <div class="column-header">
                    <div class="left">
                        <div class="dot" style="background: {col.color}"></div>
                        <h3>{col.title}</h3>
                        <span class="count">{col.cards.length}</span>
                    </div>
                </div>

                <div class="task-list">
                    {#each col.cards as task (task.id)}
                        <div 
                            class="task-card {task.priority.toLowerCase()}" 
                            transition:scale={{ duration: 200, start: 0.95 }}
                        >
                            <div class="task-header">
                                <span class="priority-tag">{task.priority}</span>
                                <button class="more-btn"><MoreHorizontal size={14} /></button>
                            </div>
                            
                            <div class="task-content">
                                <h4>{task.title}</h4>
                                <span class="project-name">{task.project}</span>
                            </div>

                            <div class="task-footer">
                                <div class="members">
                                    {#each Array(task.members) as _, i}
                                        <div class="member-avatar" style="z-index: {10 - i}"></div>
                                    {/each}
                                </div>
                                
                                <div class="task-meta">
                                    {#if task.active}
                                        <span class="active-status">
                                            <div class="pulse-dot"></div>
                                            Active
                                        </span>
                                    {:else if task.done}
                                        <span class="done-status"><CircleCheck size={14} /> Done</span>
                                    {:else}
                                        <span class="date-status"><Clock size={12} /> {task.date}</span>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                    
                    {#if col.cards.length === 0}
                        <div class="empty-state">
                            <p>No tasks found</p>
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <CreateTaskModal bind:show={showCreateTaskModal} />
</div>

<style>
    .tasks-page {
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding-bottom: 40px;
    }

    /* Header */
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
    }

    .header-left h1 {
        font-size: 24px;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .badge {
        font-size: 10px;
        background: #e8fdfa;
        color: #4ecdc4;
        padding: 4px 10px;
        border-radius: 100px;
        letter-spacing: 0.5px;
    }

    .header-left p {
        font-size: 14px;
        color: var(--text-sub);
        margin-top: 4px;
    }

    .header-actions {
        display: flex;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;
    }

    .search-box {
        display: flex;
        align-items: center;
        gap: 10px;
        background: white;
        border: 1px solid var(--border);
        padding: 10px 16px;
        border-radius: 12px;
        width: 300px;
        max-width: 100%;
        transition: all 0.3s;
    }

    .search-box:focus-within {
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(101, 77, 207, 0.1);
    }

    .search-box input {
        border: none;
        outline: none;
        font-size: 13px;
        width: 100%;
        background: transparent;
    }

    .filter-dropdown {
        display: flex;
        align-items: center;
        gap: 8px;
        background: white;
        border: 1px solid var(--border);
        padding: 10px 14px;
        border-radius: 12px;
        color: #a0aec0;
    }

    .filter-dropdown select {
        border: none;
        outline: none;
        font-size: 13px;
        font-weight: 700;
        color: var(--text-main);
        cursor: pointer;
    }

    .btn-primary {
        background: var(--primary);
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s;
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(101, 77, 207, 0.2);
    }

    /* Stats Grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
    }

    .stat-card {
        background: white;
        padding: 24px;
        border-radius: 16px;
        border: 1px solid rgba(0, 0, 0, 0.02);
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .stat-label {
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
        text-transform: uppercase;
        letter-spacing: 0.8px;
    }

    .stat-main {
        display: flex;
        align-items: baseline;
        gap: 12px;
    }

    .stat-value {
        font-size: 32px;
        font-weight: 800;
        color: #1a1a1a;
    }

    .stat-trend {
        font-size: 12px;
        font-weight: 700;
    }

    .stat-progress {
        margin-top: 12px;
    }

    .progress-bar {
        height: 6px;
        border-radius: 100px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        border-radius: 100px;
    }

    /* Kanban Board */
    .kanban-board {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        align-items: start;
    }

    .kanban-column {
        background: #f8fafc;
        border-radius: 20px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-height: 500px;
    }

    .column-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 8px;
    }

    .column-header .left {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .column-header .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .column-header h3 {
        font-size: 14px;
        font-weight: 800;
        color: #4a5568;
    }

    .column-header .count {
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
        background: white;
        padding: 2px 8px;
        border-radius: 100px;
    }

    .task-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    /* Task Card */
    .task-card {
        background: white;
        border-radius: 16px;
        padding: 16px;
        border: 1px solid rgba(0, 0, 0, 0.02);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .task-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
    }

    .task-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }

    .priority-tag {
        font-size: 9px;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .task-card.high .priority-tag { background: #fff5e6; color: #f39c12; }
    .task-card.medium .priority-tag { background: #f1f5f9; color: #64748b; }
    .task-card.low .priority-tag { background: #e8fdfa; color: #4ecdc4; }

    .more-btn {
        color: #a0aec0;
    }

    .task-content h4 {
        font-size: 14px;
        font-weight: 800;
        color: #1a1a1a;
        line-height: 1.4;
        margin-bottom: 4px;
    }

    .project-name {
        font-size: 11px;
        font-weight: 700;
        color: #a0aec0;
    }

    .task-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid #f1f5f9;
    }

    .members {
        display: flex;
        align-items: center;
    }

    .member-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #e2e8f0;
        border: 2px solid white;
        margin-left: -8px;
    }

    .member-avatar:first-child { margin-left: 0; }

    .task-meta {
        font-size: 11px;
        font-weight: 700;
    }

    .active-status {
        color: var(--primary);
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .pulse-dot {
        width: 6px;
        height: 6px;
        background: var(--primary);
        border-radius: 50%;
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
        100% { transform: scale(1); opacity: 1; }
    }

    .done-status { color: #4ecdc4; display: flex; align-items: center; gap: 4px; }
    .date-status { color: #a0aec0; display: flex; align-items: center; gap: 4px; }

    .empty-state {
        text-align: center;
        padding: 24px;
        color: #cbd5e0;
        font-size: 13px;
        font-weight: 600;
        border: 2px dashed #edf2f7;
        border-radius: 12px;
    }
</style>
