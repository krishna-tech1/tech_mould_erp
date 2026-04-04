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
        ChevronRight,
        Filter,
        Download,
        History,
        Clock
    } from "lucide-svelte";
    import { fade, slide, scale, fly } from "svelte/transition";

    let isSearching = $state(false);
    let searchQuery = $state("");
    let viewMode = $state("grid"); // 'grid' or 'list'

    const recentSearches = [
        "Q3 Logistics Revenue",
        "Apex Master Schema",
        "Legacy Workflow V1",
        "Data Audit 2023"
    ];

    const assets = [
        {
            title: "Q3 Revenue Projection",
            desc: "Compiled market data and internal sales forecasting for the upcoming quarter.",
            badges: ["ARCHIVE"],
            icon: DatabaseZap,
            color: "#654dcf",
            size: "420 MB",
            modified: "2h ago"
        },
        {
            title: "Client Schema V4.2",
            desc: "Master architecture for global client data normalization and sync capabilities.",
            badges: ["ARCHIVE", "CRITICAL"],
            icon: Network,
            color: "#4ecdc4",
            size: "1.2 GB",
            modified: "2d ago",
            critical: true
        },
        {
            title: "Legacy Workflow Engine",
            desc: "Old procedural automation logic used in version 1.0 modules.",
            badges: ["DEPRECATED"],
            icon: RotateCcw,
            color: "#f39c12",
            size: "85 MB",
            modified: "1y ago"
        },
        {
            title: "Compliance Logs 2023",
            desc: "Validated audit trails for international shipping and quality standards.",
            badges: ["SECURE"],
            icon: FileCodeCorner,
            color: "#718096",
            size: "3.4 GB",
            modified: "5d ago"
        }
    ];

    const searchResults = {
        projects: [
            { id: "PX-400", title: "Quarterly Revenue Audit", status: "Active", code: "ERP-2024", update: "2h ago", color: "#4ecdc4" },
            { id: "PX-521", title: "Revenue Stream Analysis", status: "Review", code: "AN-992", update: "1d ago", color: "#f39c12" },
        ],
        clients: [
            { name: "Astra Global Logistics", industry: "Shipping", revenue: "$245,000", initial: "AG" },
            { name: "Revenue Quest Ltd", industry: "Finance", revenue: "$12,400", initial: "RQ" },
        ],
        files: [
            { name: "2024_Revenue_Forecast.pdf", size: "12.4 MB", date: "Apr 12", type: "PDF", color: "#e74c3c" },
            { name: "Q3_Revenue_Strategy.pptx", size: "28.9 MB", date: "Today", type: "PPTX", color: "#f39c12" },
        ]
    };

    function startSearch() {
        if (searchQuery.trim()) isSearching = true;
    }

    function resetSearch() {
        isSearching = false;
        searchQuery = "";
    }
</script>

<svelte:head>
    <title>Data Management | TechMould ERP</title>
</svelte:head>

<div class="data-page">
    {#if !isSearching}
        <!-- MAIN VIEW -->
        <div class="hero-section" in:fade>
            <div class="header-content">
                <h1>Enterprise Data Asset Management</h1>
                <p>Search across your entire corporate archive, projects, and client history with real-time indexing.</p>
            </div>

            <div class="main-search-bar">
                <Search size={22} class="s-icon" />
                <input 
                    type="text" 
                    placeholder="Search by ID, Name, Keyword..." 
                    bind:value={searchQuery}
                    onkeydown={e => e.key === 'Enter' && startSearch()}
                />
                <button class="search-trigger" onclick={startSearch}>Search Database</button>
            </div>

            <div class="quick-history">
                <span class="label">RECENT QUERIES</span>
                <div class="tags">
                    {#each recentSearches as tag}
                        <button class="tag" onclick={() => { searchQuery = tag; startSearch(); }}>
                            <History size={12} /> {tag}
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <div class="content-section">
            <div class="section-header">
                <div class="left">
                    <h2>Managed Data Assets</h2>
                    <span class="count">{assets.length} Assets Registered</span>
                </div>
                <div class="view-controls">
                    <button class={viewMode === 'grid' ? 'active' : ''} onclick={() => viewMode = 'grid'}><LayoutGrid size={16} /></button>
                    <button class={viewMode === 'list' ? 'active' : ''} onclick={() => viewMode = 'list'}><List size={16} /></button>
                </div>
            </div>

            <div class="asset-grid {viewMode}">
                {#each assets as asset}
                    <div class="asset-card" in:fly={{ y: 20, duration: 400 }}>
                        <div class="card-glow" style="background: {asset.color}"></div>
                        <div class="card-header">
                            <div class="icon-box" style="background: {asset.color}15; color: {asset.color}">
                                <asset.icon size={20} />
                            </div>
                            <div class="badge-row">
                                {#each asset.badges as badge}
                                    <span class="badge {badge.toLowerCase()}">{badge}</span>
                                {/each}
                            </div>
                        </div>

                        <div class="card-body">
                            <h3>{asset.title}</h3>
                            <p>{asset.desc}</p>
                        </div>

                        <div class="card-footer">
                            <div class="meta">
                                <span><Database size={12} /> {asset.size}</span>
                                <span><Clock size={12} /> {asset.modified}</span>
                            </div>
                            <button class="action-btn" title="Expand Archive"><ChevronRight size={16} /></button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

    {:else}
        <!-- SEARCH RESULTS VIEW -->
        <div class="results-page" in:fade>
            <header class="results-header">
                <div class="top-nav">
                    <div class="search-field">
                        <Search size={18} />
                        <input type="text" bind:value={searchQuery} onkeydown={e => e.key === 'Enter' && startSearch()} />
                    </div>
                    <button class="close-btn" onclick={resetSearch}><X size={20} /></button>
                </div>
                <div class="results-info">
                    <p>Found 124 matches for <strong>"{searchQuery}"</strong></p>
                    <div class="result-filters">
                        <button class="filter-btn active">All Results</button>
                        <button class="filter-btn">Projects</button>
                        <button class="filter-btn">Clients</button>
                        <button class="filter-btn">Documents</button>
                    </div>
                </div>
            </header>

            <div class="results-grid">
                <!-- Sidebar -->
                <aside class="results-sidebar">
                    <div class="sidebar-block">
                        <h4>REFINE BY STATUS</h4>
                        <div class="check-group">
                            <label><input type="checkbox" checked /> Active Support</label>
                            <label><input type="checkbox" /> Archival Only</label>
                            <label><input type="checkbox" /> Deprecated</label>
                        </div>
                    </div>

                    <div class="pro-tip">
                        <div class="tip-title">
                            <Lightbulb size={16} />
                            <span>Pro Tip</span>
                        </div>
                        <p>You can use <strong>[ ]</strong> brackets to specify exact project ID matching in the search bar.</p>
                    </div>
                </aside>

                <!-- Search Content -->
                <main class="results-content">
                    <!-- Projects -->
                    <section class="result-section">
                        <div class="sec-head">
                            <h3><FolderKanban size={18} /> Related Projects</h3>
                            <button class="link">View All</button>
                        </div>
                        <div class="project-list">
                            {#each searchResults.projects as p}
                                <div class="project-item">
                                    <div class="p-info">
                                        <div class="p-title-row">
                                            <strong>{p.code}</strong>
                                            <span class="p-status" style="background: {p.color}15; color: {p.color}">{p.status}</span>
                                        </div>
                                        <h4>{p.title}</h4>
                                    </div>
                                    <div class="p-meta">
                                        <span>Update {p.update}</span>
                                        <button class="arrow"><ChevronRight size={16} /></button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </section>

                    <!-- Clients -->
                    <section class="result-section">
                        <div class="sec-head">
                            <h3><Users size={18} /> Matched Stakeholders</h3>
                            <button class="link">View All</button>
                        </div>
                        <div class="client-list">
                            {#each searchResults.clients as c}
                                <div class="client-item">
                                    <div class="avatar-box">{c.initial}</div>
                                    <div class="c-info">
                                        <strong>{c.name}</strong>
                                        <span>{c.industry}</span>
                                    </div>
                                    <div class="c-val">{c.revenue}</div>
                                    <button class="option-btn"><EllipsisVertical size={16} /></button>
                                </div>
                            {/each}
                        </div>
                    </section>

                    <!-- Files -->
                    <section class="result-section">
                        <div class="sec-head">
                            <h3><FileText size={18} /> Document Matches</h3>
                            <button class="link">View All</button>
                        </div>
                        <div class="file-grid">
                            {#each searchResults.files as f}
                                <div class="file-item">
                                    <div class="file-icon" style="color: {f.color}">
                                        <FileText size={24} />
                                    </div>
                                    <div class="f-info">
                                        <strong>{f.name}</strong>
                                        <span>{f.size} • {f.date}</span>
                                    </div>
                                    <button class="dl-btn"><Download size={14} /></button>
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
        min-height: 80vh;
    }

    /* HERO SECTION */
    .hero-section {
        background: #fafbff;
        border: 1px solid var(--border);
        border-radius: 24px;
        padding: 64px 40px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
        margin-bottom: 40px;
    }

    .header-content h1 {
        font-size: 32px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 12px;
    }

    .header-content p {
        font-size: 16px;
        color: var(--text-sub);
        max-width: 600px;
    }

    .main-search-bar {
        background: white;
        border: 1px dashed var(--primary);
        padding: 8px;
        border-radius: 16px;
        width: 100%;
        max-width: 800px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 12px 32px rgba(101, 77, 207, 0.08);
    }

    .main-search-bar .s-icon {
        color: #a0aec0;
        margin-left: 16px;
    }

    .main-search-bar input {
        border: none;
        outline: none;
        flex: 1;
        font-size: 16px;
        font-weight: 600;
        padding: 12px;
    }

    .search-trigger {
        background: var(--primary);
        color: white;
        padding: 14px 28px;
        border-radius: 10px;
        font-weight: 700;
        transition: all 0.2s;
    }

    .search-trigger:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(101, 77, 207, 0.2);
    }

    .quick-history {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .quick-history .label {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        letter-spacing: 1px;
    }

    .tags {
        display: flex;
        gap: 8px;
    }

    .tag {
        font-size: 12px;
        font-weight: 700;
        color: var(--primary);
        background: white;
        border: 1px solid var(--border);
        padding: 6px 14px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
    }

    .tag:hover {
        border-color: var(--primary);
        background: var(--primary-light);
    }

    /* CONTENT SECTION */
    .content-section {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .section-header h2 {
        font-size: 18px;
        font-weight: 800;
    }

    .section-header .count {
        font-size: 12px;
        color: var(--text-sub);
        font-weight: 600;
    }

    .view-controls {
        display: flex;
        background: #f1f5f9;
        padding: 4px;
        border-radius: 10px;
        gap: 4px;
    }

    .view-controls button {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        color: #718096;
        transition: all 0.2s;
    }

    .view-controls button.active {
        background: white;
        color: var(--primary);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    /* ASSET GRID */
    .asset-grid.grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
    }

    .asset-card {
        background: white;
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s;
    }

    .asset-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
        border-color: var(--primary-light);
    }

    .card-glow {
        position: absolute;
        top: -100px;
        right: -100px;
        width: 200px;
        height: 200px;
        filter: blur(80px);
        opacity: 0.03;
        pointer-events: none;
    }

    .asset-card .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .icon-box {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .badge-row {
        display: flex;
        gap: 6px;
    }

    .badge {
        font-size: 9px;
        font-weight: 800;
        padding: 3px 8px;
        border-radius: 4px;
        text-transform: uppercase;
    }

    .badge.archive { background: #f1f5f9; color: #64748b; }
    .badge.critical { background: #fee2e2; color: #ef4444; }
    .badge.deprecated { background: #fff7ed; color: #f97316; }
    .badge.secure { background: #ecfdf5; color: #10b981; }

    .asset-card h3 {
        font-size: 16px;
        font-weight: 800;
        margin-bottom: 8px;
    }

    .asset-card p {
        font-size: 13px;
        color: var(--text-sub);
        line-height: 1.5;
    }

    .asset-card .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        padding-top: 16px;
        border-top: 1px solid #f8fafc;
    }

    .meta {
        font-size: 11px;
        font-weight: 700;
        color: #a0aec0;
        display: flex;
        gap: 12px;
    }

    .meta span {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .action-btn {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #718096;
        transition: all 0.2s;
    }

    .asset-card:hover .action-btn {
        background: var(--primary);
        color: white;
    }

    /* SEARCH RESULTS PAGE */
    .results-page {
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin: -24px;
        padding: 32px;
        background: #fdfdfe;
    }

    .results-header {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .top-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .search-field {
        background: white;
        border: 1px solid var(--border);
        padding: 0 20px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        max-width: 600px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    }
    .search-field input {
        border: none;
        outline: none;
        flex: 1;
        font-size: 14px;
        font-weight: 600;
    }
    .close-btn {
        color: #a0aec0;
        transition: color 0.2s;
    }
    .close-btn:hover { color: #1a1a1a; }

    .results-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .results-info p {
        font-size: 15px;
        color: #4a5568;
    }
    .results-info strong { color: var(--primary); }

    .result-filters {
        display: flex;
        gap: 8px;
    }
    .filter-btn {
        padding: 8px 16px;
        font-size: 12px;
        font-weight: 700;
        border-radius: 50px;
        background: white;
        border: 1px solid var(--border);
        color: #718096;
        transition: all 0.2s;
    }
    .filter-btn.active {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
    }

    .results-grid {
        display: grid;
        grid-template-columns: 260px 1fr;
        gap: 40px;
    }

    /* Sidebar */
    .sidebar-block {
        margin-bottom: 32px;
    }
    .sidebar-block h4 {
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
        letter-spacing: 1px;
        margin-bottom: 16px;
    }
    .check-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .check-group label {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
    }
    .check-group input { accent-color: var(--primary); }

    .pro-tip {
        background: #f5f3ff;
        padding: 20px;
        border-radius: 16px;
        border-left: 4px solid var(--primary);
    }
    .tip-title {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--primary);
        margin-bottom: 10px;
        font-weight: 800;
        font-size: 14px;
    }
    .pro-tip p {
        font-size: 12px;
        color: #6d719a;
        line-height: 1.5;
    }

    /* Content Area */
    .results-content {
        display: flex;
        flex-direction: column;
        gap: 48px;
    }

    .sec-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .sec-head h3 {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 15px;
        font-weight: 800;
    }
    .sec-head .link {
        font-size: 11px;
        font-weight: 800;
        color: var(--primary);
        text-transform: uppercase;
    }

    /* Project List */
    .project-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
    .project-item {
        background: white;
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        transition: all 0.2s;
    }
    .project-item:hover {
        border-color: var(--primary-light);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    }
    .p-title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }
    .p-title-row strong { font-size: 11px; color: #a0aec0; }
    .p-status { font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; }
    .project-item h4 { font-size: 15px; font-weight: 800; }
    .p-meta { display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #718096; font-weight: 600; }
    .p-meta .arrow { color: #a0aec0; }

    /* Client List */
    .client-list { display: flex; flex-direction: column; gap: 12px; }
    .client-item {
        background: white;
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 12px 20px;
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .avatar-box {
        width: 40px;
        height: 40px;
        background: #f1f3f7;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        color: var(--primary);
    }
    .c-info { flex: 1; display: flex; flex-direction: column; }
    .c-info strong { font-size: 14px; font-weight: 800; }
    .c-info span { font-size: 12px; color: #a0aec0; font-weight: 600; }
    .c-val { font-weight: 800; color: #1a1a1a; font-size: 14px; }
    .option-btn { color: #a0aec0; }

    /* File Grid */
    .file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
    }
    .file-item {
        background: white;
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 16px;
        transition: all 0.2s;
    }
    .file-item:hover {
        border-color: var(--primary-light);
        background: #fafbff;
    }
    .f-info { flex: 1; display: flex; flex-direction: column; }
    .f-info strong { font-size: 13px; font-weight: 800; color: #1a1a1a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; }
    .f-info span { font-size: 11px; color: #a0aec0; font-weight: 700; }
    .dl-btn { color: #a0aec0; }
    .dl-btn:hover { color: var(--primary); }
</style>
