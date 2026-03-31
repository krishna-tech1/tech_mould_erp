<script lang="ts">
    import {
        Search,
        LayoutGrid,
        List,
        RotateCcw,
        Activity,
        Database,
        Archive,
        Share2,
        TriangleAlert,
        DatabaseZap,
        Network,
        FileCodeCorner,
        Calendar,
        EllipsisVertical,
        X,
        FileText,
        Users,
        FolderKanban,
        Lightbulb,
    } from "lucide-svelte";

    let isSearching = $state(false);
    let searchQuery = $state("");

    const recentSearches = [
        "Q3 Logistics",
        "Acme Corp Billing",
        "Project Phoenix",
    ];

    const assets = [
        {
            title: "Q3 Revenue Projection",
            desc: "Compiled market data and internal sales forecasting for the upcoming...",
            badges: ["ARCHIVE"],
            icon: DatabaseZap,
            color: "#654dcf",
            avatars: true,
        },
        {
            title: "Client Schema V4.2",
            desc: "Master architecture for global client data normalization and cross-platform sync capabilities.",
            badges: ["ARCHIVE", "CRITICAL"],
            icon: Network,
            color: "#4ecdc4",
            stats: { size: "1.2 GB", modified: "2d ago" },
            critical: true,
        },
        {
            title: "Legacy Workflow Engine",
            desc: "Old procedural automation logic used in version 1.0 modules.",
            badges: ["ARCHIVE"],
            icon: Share2,
            color: "#f39c12",
            warning: "Legacy Format",
        },
        {
            title: "Compliance Logs 2023",
            desc: "Validated audit trails for international shipping standards.",
            badges: ["ARCHIVE"],
            icon: FileCodeCorner,
            color: "#718096",
            subId: "ID: TM-LOG-0092",
        },
    ];

    const searchResults = {
        projects: [
            {
                id: "ERP-2024-QX",
                title: "Annual Quarterly Revenue Audit",
                status: "IN PROGRESS",
                update: "UPDATED 2H AGO",
                color: "#4ecdc4",
            },
            {
                id: "SALES-882",
                title: "New Market Revenue Projection",
                status: "PLANNING",
                update: "UPDATED 1D AGO",
                color: "#f39c12",
            },
        ],
        clients: [
            {
                name: "Astra Global Logistics",
                sub: "Tier 1 Partner • Shipping",
                contact: "Sarah Jenkins",
                amount: "$245,000",
                date: "MAY 14, 2024",
                initials: "AG",
            },
            {
                name: "Revenue Quest Consultants",
                sub: "Strategic Advisor • Finance",
                contact: "Michael Chen",
                amount: "$12,400",
                date: "JUN 02, 2024",
                initials: "RQ",
            },
        ],
        files: [
            {
                name: "2024_Revenue_For...",
                size: "12.4 MB",
                date: "APR 12",
                color: "#e74c3c",
            },
            {
                name: "Quarterly_Ledger...",
                size: "4.1 MB",
                date: "2D AGO",
                color: "#4ecdc4",
            },
            {
                name: "Q3_Revenue_Strate...",
                size: "28.9 MB",
                date: "TODAY",
                color: "#f39c12",
            },
        ],
    };

    const handleSearch = () => {
        if (searchQuery.trim()) isSearching = true;
    };

    const closeSearch = () => {
        isSearching = false;
        searchQuery = "";
    };
</script>

<svelte:head>
    <title>Data Management | TechMould ERP</title>
</svelte:head>

<div class="data-page">
    {#if !isSearching}
        <!-- Main Archival View -->
        <div class="page-header">
            <div class="header-left">
                <h1>Data Management</h1>
                <p>
                    Oversee enterprise assets and manage structural archival
                    processes.
                </p>
            </div>
            <div class="view-toggle">
                <button class="active"><LayoutGrid size={16} /> Grid</button>
                <button><List size={16} /> List</button>
            </div>
        </div>

        <div class="search-section">
            <h2>What are you looking for?</h2>
            <div class="search-bar-container">
                <div class="search-input-wrapper">
                    <Search size={18} class="search-icon" />
                    <input
                        type="text"
                        placeholder="Search projects, clients..."
                        bind:value={searchQuery}
                        onkeydown={(e) => e.key === "Enter" && handleSearch()}
                    />
                </div>
                <button class="btn-search" onclick={handleSearch}>Search</button
                >
            </div>
            <div class="recent-searches">
                <span class="label">RECENT SEARCHES:</span>
                {#each recentSearches as item}
                    <button
                        class="recent-tag"
                        onclick={() => {
                            searchQuery = item;
                            handleSearch();
                        }}>{item}</button
                    >
                {/each}
            </div>
        </div>

        <div class="assets-grid">
            {#each assets as asset}
                <div class="card asset-card">
                    <div class="card-header">
                        <div
                            class="icon-box"
                            style="background: {asset.color}15; color: {asset.color}"
                        >
                            <asset.icon size={18} />
                        </div>
                        <div class="badges">
                            {#each asset.badges as b}
                                <span class="badge {b.toLowerCase()}">{b}</span>
                            {/each}
                        </div>
                    </div>
                    <div class="card-body">
                        <h3>{asset.title}</h3>
                        <p>{asset.desc}</p>
                        {#if asset.stats}
                            <div class="asset-stats">
                                <span
                                    ><Database size={12} />
                                    {asset.stats.size}</span
                                >
                                <span
                                    ><Calendar size={12} /> Modified {asset
                                        .stats.modified}</span
                                >
                            </div>
                        {/if}
                    </div>
                    <div class="card-footer">
                        <button class="btn-reuse"
                            ><RotateCcw size={14} /> Reuse</button
                        >
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <!-- Searching View -->
        <div class="results-layout">
            <div class="results-header">
                <div class="search-bar-fixed">
                    <Search size={18} class="s-icon" />
                    <input type="text" bind:value={searchQuery} />
                </div>
                <div class="header-bottom">
                    <div class="recent-mini">
                        <span class="label">RECENT SEARCHES:</span>
                        {#each recentSearches as item}
                            <button class="recent-tag">{item}</button>
                        {/each}
                    </div>
                    <button class="btn-close" onclick={closeSearch}
                        ><X size={20} /></button
                    >
                </div>
            </div>

            <div class="main-split">
                <!-- Sidebar Filters -->
                <aside class="filters-sidebar">
                    <h3>SEARCH FILTERS</h3>
                    <div class="filter-list">
                        <label class="filter-item">
                            <input type="checkbox" checked />
                            <span class="f-label">All Results</span>
                            <span class="f-count">124</span>
                        </label>
                        <label class="filter-item">
                            <input type="checkbox" />
                            <span class="f-label">Projects</span>
                            <span class="f-count">12</span>
                        </label>
                        <label class="filter-item">
                            <input type="checkbox" />
                            <span class="f-label">Clients</span>
                            <span class="f-count">45</span>
                        </label>
                        <label class="filter-item">
                            <input type="checkbox" />
                            <span class="f-label">Files & Media</span>
                            <span class="f-count">67</span>
                        </label>
                    </div>

                    <div class="card tip-card">
                        <div class="tip-header">
                            <Lightbulb size={16} color="#654dcf" />
                            <h4>Advanced Tip</h4>
                        </div>
                        <p>
                            Use <span class="code">type:invoice</span> to narrow
                            down documents specifically by their categorized type.
                        </p>
                    </div>
                </aside>

                <!-- Results Content -->
                <main class="results-main">
                    <!-- Projects -->
                    <section class="result-section">
                        <div class="section-top">
                            <h3><FolderKanban size={16} /> Projects</h3>
                            <button class="view-all">VIEW ALL PROJECTS</button>
                        </div>
                        <div class="project-results">
                            {#each searchResults.projects as p}
                                <div class="card p-result-card">
                                    <div class="p-top">
                                        <strong>{p.id}</strong>
                                        <span
                                            class="p-status"
                                            style="background: {p.color}15; color: {p.color}"
                                            >{p.status}</span
                                        >
                                    </div>
                                    <h4>
                                        Annual <span class="highlight"
                                            >Quarterly Revenue</span
                                        > Audit
                                    </h4>
                                    <p>
                                        Project focused on reconciling the <span
                                            class="highlight">revenue</span
                                        > streams from international logistics hubs
                                        for...
                                    </p>
                                    <div class="p-footer">
                                        <div class="avatars">
                                            <div class="avatar"></div>
                                            <div class="avatar"></div>
                                        </div>
                                        <span class="update">{p.update}</span>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </section>

                    <!-- Clients -->
                    <section class="result-section">
                        <div class="section-top">
                            <h3><Users size={16} /> Clients & Stakeholders</h3>
                            <button class="view-all">View All Client</button>
                        </div>
                        <div class="table-card">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ENTITY NAME</th>
                                        <th>CONTACT</th>
                                        <th>LAST TRANSACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each searchResults.clients as c}
                                        <tr>
                                            <td>
                                                <div class="entity-cell">
                                                    <div class="initials">
                                                        {c.initials}
                                                    </div>
                                                    <div class="entity-text">
                                                        <strong>{c.name}</strong
                                                        >
                                                        <span>{c.sub}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                ><span class="contact-name"
                                                    >{c.contact}</span
                                                ></td
                                            >
                                            <td>
                                                <div class="trans-cell">
                                                    <strong>{c.amount}</strong>
                                                    <span>{c.date}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <!-- Files -->
                    <section class="result-section">
                        <div class="section-top">
                            <h3><FileText size={16} /> Documents & Files</h3>
                            <button class="view-all">View All Files</button>
                        </div>
                        <div class="files-grid">
                            {#each searchResults.files as f}
                                <div class="file-card">
                                    <div class="file-preview">
                                        <div class="skeleton"></div>
                                    </div>
                                    <div class="file-info-bar">
                                        <FileText size={14} color={f.color} />
                                        <div class="f-text">
                                            <strong
                                                >2024_<span class="highlight"
                                                    >Revenue</span
                                                >_For...</strong
                                            >
                                            <span
                                                >{f.size} • EDITED {f.date}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    {/if}
</div>

<style>
    .data-page {
        display: flex;
        flex-direction: column;
        gap: 48px;
    }

    /* Reuse shared styles */
    .card {
        background: white;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.02);
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
    }
    .header-left p {
        font-size: 14px;
        color: #718096;
    }

    .view-toggle {
        background: #f1f3f7;
        padding: 4px;
        border-radius: 8px;
        display: flex;
        gap: 4px;
    }
    .view-toggle button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        font-size: 12px;
        font-weight: 700;
        border-radius: 6px;
        color: #718096;
    }
    .view-toggle button.active {
        background: white;
        color: #1a1a1a;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .search-section {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
    }
    .search-section h2 {
        font-size: 24px;
        font-weight: 800;
        color: #1a1a1a;
    }

    .search-bar-container {
        display: flex;
        gap: 12px;
    }
    .search-input-wrapper {
        flex: 1;
        background: white;
        border: 1px solid #edf2f7;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 0 16px;
    }
    .search-icon {
        color: #a0aec0;
    }
    input {
        flex: 1;
        border: none;
        padding: 16px;
        font-size: 14px;
        font-weight: 600;
        color: #1a1a1a;
    }
    input:focus {
        outline: none;
    }
    .btn-search {
        background: var(--primary);
        color: white;
        padding: 0 32px;
        border-radius: 10px;
        font-weight: 700;
    }

    .recent-searches,
    .recent-mini {
        display: flex;
        align-items: center;
        gap: 12px;
        justify-content: center;
    }
    .label {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        letter-spacing: 0.5px;
    }
    .recent-tag {
        font-size: 11px;
        font-weight: 800;
        color: var(--primary);
    }

    .assets-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 24px;
    }
    .asset-card {
        display: flex;
        flex-direction: column;
        padding: 24px;
        gap: 20px;
    }
    .card-header {
        display: flex;
        justify-content: space-between;
    }
    .icon-box {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .badge {
        font-size: 9px;
        font-weight: 800;
        padding: 2px 8px;
        border-radius: 4px;
        background: #f1f3f7;
    }
    .card-body h3 {
        font-size: 15px;
        font-weight: 800;
        margin-bottom: 8px;
    }
    .card-body p {
        font-size: 12px;
        color: #718096;
        line-height: 1.5;
        font-weight: 600;
    }
    .asset-stats {
        display: flex;
        gap: 16px;
        margin-top: 16px;
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
    }
    .btn-reuse {
        background: var(--primary);
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        width: fit-content;
        margin-top: auto;
    }

    /* Results View */
    .results-layout {
        display: flex;
        flex-direction: column;
        gap: 32px;
        background: #f8f9fc;
        margin: -24px;
        padding: 24px;
        min-height: calc(100vh - 64px);
    }

    .results-header {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .search-bar-fixed {
        background: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        padding: 0 24px;
        border: 1px solid #edf2f7;
    }
    .search-bar-fixed input {
        font-size: 16px;
    }
    .header-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
    }
    .btn-close {
        color: #a0aec0;
    }

    .main-split {
        display: grid;
        grid-template-columns: 240px 1fr;
        gap: 32px;
    }

    .filters-sidebar h3 {
        font-size: 12px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 24px;
    }
    .filter-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 32px;
    }
    .filter-item {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
    }
    .filter-item input {
        width: 16px;
        height: 16px;
        accent-color: var(--primary);
    }
    .f-label {
        font-size: 13px;
        font-weight: 700;
        color: #4a5568;
        flex: 1;
    }
    .f-count {
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
    }

    .tip-card {
        background: #f0edff;
        border: none;
        padding: 20px;
    }
    .tip-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
    }
    .tip-header h4 {
        font-size: 13px;
        font-weight: 800;
        color: var(--primary);
    }
    .tip-card p {
        font-size: 11px;
        font-weight: 600;
        color: #718096;
        line-height: 1.6;
    }
    .code {
        background: white;
        padding: 2px 4px;
        border-radius: 4px;
        font-family: monospace;
        color: var(--primary);
        font-weight: 800;
    }

    .results-main {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }
    .section-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .section-top h3 {
        font-size: 14px;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #1a1a1a;
    }
    .view-all {
        font-size: 11px;
        font-weight: 800;
        color: var(--primary);
    }

    .project-results {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    .p-result-card {
        padding: 24px;
        border-left: 4px solid var(--primary);
    }
    .p-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
    }
    .p-top strong {
        font-size: 12px;
        color: #a0aec0;
        font-weight: 800;
    }
    .p-status {
        font-size: 9px;
        font-weight: 800;
        padding: 2px 8px;
        border-radius: 4px;
    }
    .p-result-card h4 {
        font-size: 14px;
        font-weight: 800;
        margin-bottom: 8px;
    }
    .p-result-card p {
        font-size: 12px;
        color: #718096;
        line-height: 1.5;
        margin-bottom: 20px;
    }
    .highlight {
        background: #f0edff;
        color: var(--primary);
        font-weight: 800;
    }
    .p-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .avatars {
        display: flex;
    }
    .avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #e2e8f0;
        border: 2px solid white;
        margin-left: -8px;
    }
    .avatar:first-child {
        margin-left: 0;
    }
    .update {
        font-size: 10px;
        font-weight: 800;
        color: #cbd5e0;
    }

    .table-card {
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
    .entity-cell {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .initials {
        width: 36px;
        height: 36px;
        background: #f0edff;
        color: var(--primary);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 800;
    }
    .entity-text {
        display: flex;
        flex-direction: column;
    }
    .entity-text strong {
        font-size: 13px;
        font-weight: 800;
    }
    .entity-text span {
        font-size: 11px;
        color: #a0aec0;
        font-weight: 700;
    }
    .contact-name {
        font-size: 13px;
        font-weight: 700;
        color: #4a5568;
    }
    .trans-cell {
        display: flex;
        flex-direction: column;
        text-align: right;
    }
    .trans-cell strong {
        font-size: 13px;
        font-weight: 800;
    }
    .trans-cell span {
        font-size: 10px;
        color: #cbd5e0;
        font-weight: 800;
    }

    .files-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
    .file-card {
        background: white;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.02);
        overflow: hidden;
    }
    .file-preview {
        height: 100px;
        background: #1a1a1a;
        padding: 10px;
    }
    .skeleton {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }
    .file-info-bar {
        padding: 16px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }
    .f-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    .f-text strong {
        font-size: 12px;
        font-weight: 800;
    }
    .f-text span {
        font-size: 10px;
        color: #a0aec0;
        font-weight: 800;
    }
</style>
