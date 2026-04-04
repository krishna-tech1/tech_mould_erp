<script lang="ts">
    import type { PageData } from "./$types";
    import {
        Calendar,
        ChevronDown,
        Search,
        Ellipsis,
        ChevronLeft,
        ChevronRight,
        ArrowUpRight,
        Plus,
    } from "lucide-svelte";
    import { fade, slide } from "svelte/transition";
    import { invalidateAll } from "$app/navigation";
    import CreateProjectModal from "$lib/components/CreateProjectModal.svelte";

    let { data }: { data: PageData } = $props();

    let showCreateProjectModal = $state(false);
    let searchQuery = $state("");
    let statusFilter = $state("All Status");
    let categoryFilter = $state("All Categories");

    const allProjects = $derived(data.projects ?? []);

    const stats = $derived.by(() => {
        const totalBudget = allProjects.reduce((sum, p) => {
            const amount = Number((p.budget || "").replace(/[^\d.-]/g, ""));
            return sum + (Number.isFinite(amount) ? amount : 0);
        }, 0);
        const healthyCount = allProjects.filter((p) => p.status === "HEALTHY").length;
        const riskCount = allProjects.filter((p) => p.status === "AT RISK").length;
        const delayedCount = allProjects.filter((p) => p.status === "DELAYED").length;

        return [
            {
                label: "TOTAL BUDGET",
                value: new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    maximumFractionDigits: 1,
                }).format(totalBudget),
                trend: "LIVE",
                trendColor: "#4ecdc4",
            },
            {
                label: "HEALTHY PROJECTS",
                value: String(healthyCount),
                sub: `/ ${allProjects.length}`,
                trend: "",
                color: "#1a1a1a",
            },
            { label: "AT RISK", value: String(riskCount), trend: "Warning", trendColor: "#f39c12" },
            { label: "DELAYED", value: String(delayedCount), trend: "Critical", trendColor: "#e74c3c" },
        ];
    });

    const filteredProjects = $derived(
        allProjects.filter((p) => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 p.client.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "All Status" || p.status === statusFilter.toUpperCase();
            const matchesCategory = categoryFilter === "All Categories" || p.category === categoryFilter;
            
            return matchesSearch && matchesStatus && matchesCategory;
        })
    );

    const statusOptions = ["All Status", "Healthy", "At Risk", "Delayed"];
    const categoryOptions = ["All Categories", "Manufacturing", "R&D", "PDC Tools", "PDC Casting Components"];
</script>

<svelte:head>
    <title>Projects | TechMould ERP</title>
</svelte:head>

<div class="projects-page">
    <!-- Header -->
    <div class="page-header">
        <div class="header-left">
            <h1>Projects <span class="badge">{filteredProjects.length} ACTIVE</span></h1>
            <p>Manage and track your ongoing manufacturing projects.</p>
        </div>
        <div class="header-actions-row">
            <div class="search-box">
                <Search size={16} />
                <input type="text" placeholder="Search projects..." bind:value={searchQuery} />
            </div>
            <div class="header-filters">
                <div class="filter-group">
                    <div class="filter-item">
                        <span class="label">STATUS</span>
                        <select bind:value={statusFilter}>
                            {#each statusOptions as opt}
                                <option value={opt}>{opt}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="divider"></div>
                    <div class="filter-item">
                        <span class="label">CATEGORY</span>
                        <select bind:value={categoryFilter}>
                            {#each categoryOptions as opt}
                                <option value={opt}>{opt}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
            <button class="btn-new-project" onclick={() => (showCreateProjectModal = true)}>
                <Plus size={16} />
                <span>New Project</span>
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
                {#each filteredProjects as p (p.id)}
                    <tr transition:fade={{ duration: 200 }}>
                        <td>
                            <div class="project-cell">
                                <a href={`/projects/${p.id.replace("#", "")}`} class="project-name"
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
                            <a href={`/projects/${p.id.replace("#", "")}`} class="action-btn" aria-label={`View ${p.name} details`}>
                                <span class="action-label">View</span>
                            </a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="pagination-footer">
        <span class="showing-text">Showing {filteredProjects.length} of {allProjects.length} projects</span>
        <div class="pagination-controls">
            <button class="arrow-btn"><ChevronLeft size={16} /></button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <button class="arrow-btn"><ChevronRight size={16} /></button>
        </div>
    </div>
    <CreateProjectModal bind:show={showCreateProjectModal} onCreated={() => invalidateAll()} />
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

    .header-actions-row {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .search-box {
        display: flex;
        align-items: center;
        gap: 10px;
        background: white;
        border: 1px solid var(--border);
        padding: 8px 16px;
        border-radius: 10px;
        width: 300px;
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
        font-family: inherit;
    }

    .search-box :global(svg) {
        color: #a0aec0;
    }

    .btn-new-project {
        background: var(--primary);
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 12px rgba(101, 77, 207, 0.2);
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
        padding: 4px 12px;
        font-size: 13px;
        font-weight: 600;
        color: var(--text-main);
    }

    .filter-item select {
        border: none;
        outline: none;
        background: transparent;
        font-family: inherit;
        font-size: 13px;
        font-weight: 700;
        color: var(--text-main);
        cursor: pointer;
    }

    .filter-item .label {
        color: #a0aec0;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.5px;
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
        transition: background 0.2s;
    }

    tr:hover td {
        background: #fcfdfe;
    }

    tr:hover .project-name {
        color: var(--primary);
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
        min-width: 56px;
        height: 32px;
        padding: 0 12px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f7fafc;
        color: #64748b;
        font-size: 11px;
        font-weight: 800;
    }

    .action-btn:hover {
        background: #efe9ff;
        color: var(--primary);
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
