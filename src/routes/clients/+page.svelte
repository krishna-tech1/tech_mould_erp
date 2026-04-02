<script lang="ts">
    import {
        Users,
        FileSpreadsheet,
        DollarSign,
        ShieldCheck,
        Funnel,
        Plus,
        EllipsisVertical,
        ChevronLeft,
        ChevronRight,
        ChevronDown,
        Search
    } from "lucide-svelte";
    import { fade, slide } from "svelte/transition";
    import CreateClientModal from "$lib/components/CreateClientModal.svelte";

    let showCreateClientModal = $state(false);
    let searchQuery = $state("");
    let statusFilter = $state("All Status");

    const stats = [
        { label: "ACTIVE CLIENTS", value: "1,284", trend: "+12%", color: "#654dcf", icon: Users },
        { label: "INQUIRIES PENDING", value: "24", trend: "", color: "#f39c12", icon: FileSpreadsheet },
        { label: "TOTAL LIFETIME VALUE", value: "$4.2M", trend: "+8%", color: "#4ecdc4", icon: DollarSign },
        { label: "RETENTION RATE", value: "98%", trend: "", color: "#654dcf", icon: ShieldCheck },
    ];

    const allClients = [
        { name: "Apex Logistics", email: "client_2041@apex.com", industry: "Global Supply Chain", status: "ACTIVE", projects: 4, revenue: "$450,200", joined: "Oct 2023" },
        { name: "NovaTech Solutions", email: "contact@novatech.io", industry: "SaaS / Fintech", status: "REVIEW", projects: 2, revenue: "$12,000", joined: "Nov 2023" },
        { name: "EcoMedia Group", email: "billing@ecomedia.org", industry: "Renewable Energy", status: "ACTIVE", projects: 6, revenue: "$892,150", joined: "Jan 2023" },
        { name: "Stellar Dynamics", email: "info@stellar.com", industry: "Aerospace", status: "ACTIVE", projects: 1, revenue: "$125,000", joined: "Dec 2023" },
        { name: "Precision Gear Co", email: "orders@pgear.com", industry: "Manufacturing", status: "INACTIVE", projects: 0, revenue: "$45,000", joined: "Feb 2023" },
    ];

    const filteredClients = $derived(
        allClients.filter(c => {
            const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 c.industry.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "All Status" || c.status === statusFilter.toUpperCase();
            return matchesSearch && matchesStatus;
        })
    );

    const statusOptions = ["All Status", "Active", "Review", "Inactive"];
</script>

<svelte:head>
    <title>Client Management | TechMould ERP</title>
</svelte:head>

<div class="clients-page">
    <!-- Header -->
    <div class="page-header">
        <div class="header-left">
            <h1>Client Management <span class="badge">{filteredClients.length}</span></h1>
            <p>Manage corporate relationships and project history.</p>
        </div>
        <div class="header-actions">
            <div class="search-box">
                <Search size={16} />
                <input type="text" placeholder="Search by name, email, or industry..." bind:value={searchQuery} />
            </div>
            <div class="filter-dropdown">
                <span class="label">STATUS</span>
                <select bind:value={statusFilter}>
                    {#each statusOptions as opt}
                        <option value={opt}>{opt}</option>
                    {/each}
                </select>
            </div>
            <button class="btn-primary" onclick={() => showCreateClientModal = true}>
                <Plus size={18} /> 
                New Client
            </button>
        </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
        {#each stats as stat}
            <div class="stat-card">
                <div class="stat-top">
                    <div
                        class="icon-box"
                        style="background: {stat.color}15; color: {stat.color}"
                    >
                        <stat.icon size={18} />
                    </div>
                    {#if stat.trend}
                        <span class="trend-badge">{stat.trend}</span>
                    {/if}
                </div>
                <div class="stat-info">
                    <span class="stat-value">{stat.value}</span>
                    <span class="stat-label">{stat.label}</span>
                </div>
            </div>
        {/each}
    </div>

    <!-- Table Container -->
    <div class="table-card">
        <div class="card-header">
            <h2>Active Partnerships</h2>
            <div class="header-tools">
                <span class="results-count">Showing {filteredClients.length} results</span>
            </div>
        </div>

        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>CLIENT NAME</th>
                        <th>INDUSTRY</th>
                        <th>STATUS</th>
                        <th>PROJECTS</th>
                        <th>REVENUE (YTD)</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {#each filteredClients as client}
                        <tr transition:fade={{ duration: 200 }}>
                            <td>
                                <div class="client-cell">
                                    <span class="client-name">{client.name}</span>
                                    <span class="client-email">{client.email}</span>
                                </div>
                            </td>
                            <td class="industry-cell">{client.industry}</td>
                            <td>
                                <span class="status-pill {client.status.toLowerCase()}">
                                    <span class="dot"></span>
                                    {client.status}
                                </span>
                            </td>
                            <td class="center-text">{client.projects}</td>
                            <td class="revenue-cell">{client.revenue}</td>
                            <td>
                                <button class="action-btn" title="Client Options">
                                    <EllipsisVertical size={16} />
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <div class="pagination-bar">
            <span class="showing">End of results</span>
            <div class="page-controls">
                <button class="arrow-btn" disabled><ChevronLeft size={16} /></button>
                <button class="arrow-btn" disabled><ChevronRight size={16} /></button>
            </div>
        </div>
    </div>

    <CreateClientModal bind:show={showCreateClientModal} />
</div>

<style>
    .clients-page {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }

    .header-left h1 {
        font-size: 24px;
        font-weight: 800;
        color: #1a1a1a;
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    .badge {
        font-size: 10px;
        background: var(--primary-light);
        color: var(--primary);
        padding: 2px 8px;
        border-radius: 100px;
        font-weight: 800;
    }

    .header-left p {
        font-size: 14px;
        color: var(--text-sub);
        margin-top: 4px;
    }

    .header-actions {
        display: flex;
        gap: 12px;
    }

    .btn-filters,
    .btn-primary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
    }

    .header-actions {
        display: flex;
        gap: 16px;
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
        width: 320px;
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
        font-family: inherit;
    }

    .filter-dropdown {
        display: flex;
        align-items: center;
        gap: 10px;
        background: white;
        border: 1px solid var(--border);
        padding: 10px 16px;
        border-radius: 12px;
    }

    .filter-dropdown .label {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        letter-spacing: 0.5px;
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
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 700;
        background: var(--primary);
        color: white;
        transition: all 0.2s;
        white-space: nowrap;
    }

    .btn-primary:active {
        transform: scale(0.98);
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
    }

    .stat-card {
        background: white;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.02);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .stat-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .icon-box {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .trend-badge {
        background: #e8fdfa;
        color: #4ecdc4;
        font-size: 10px;
        font-weight: 800;
        padding: 4px 8px;
        border-radius: 4px;
    }

    .stat-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .stat-value {
        font-size: 28px;
        font-weight: 800;
        color: #1a1a1a;
    }

    .stat-label {
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Table Container */
    .table-card {
        background: white;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.02);
        display: flex;
        flex-direction: column;
    }

    .card-header {
        padding: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .card-header h2 {
        font-size: 16px;
        font-weight: 800;
    }

    .sort-dropdown {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .sort-label {
        font-size: 12px;
        color: #a0aec0;
        font-weight: 700;
    }
    .sort-btn {
        font-size: 12px;
        font-weight: 800;
        color: #1a1a1a;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .table-wrapper {
        overflow-x: auto;
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
        border-bottom: 2px solid #f7fafc;
    }

    td {
        padding: 20px 24px;
        font-size: 13px;
        border-bottom: 1px solid #f7fafc;
    }

    .client-cell {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .client-name {
        font-weight: 800;
        color: #1a1a1a;
    }
    .client-email {
        font-size: 11px;
        color: #a0aec0;
        font-weight: 600;
    }

    .industry-cell {
        font-weight: 700;
        color: #4a5568;
    }

    .status-pill {
        padding: 6px 12px;
        border-radius: 100px;
        font-size: 10px;
        font-weight: 800;
    }

    .status-pill.active {
        background: #e8fdfa;
        color: #4ecdc4;
    }
    .status-pill.review {
        background: #fff5e6;
        color: #f39c12;
    }

    .center {
        font-weight: 800;
        color: #1a1a1a;
    }
    .revenue-cell {
        font-weight: 800;
        color: #1a1a1a;
    }

    .action-btn {
        color: #a0aec0;
    }

    .pagination-bar {
        padding: 20px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .showing {
        font-size: 12px;
        font-weight: 700;
        color: #a0aec0;
    }

    .page-controls {
        display: flex;
        gap: 8px;
    }

    .arrow-btn {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #edf2f7;
        color: #a0aec0;
    }
</style>
