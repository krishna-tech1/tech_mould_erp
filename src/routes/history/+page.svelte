<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import {
        FileText,
        Eye,
        Download,
        Search,
        ArrowUpRight,
        FileSpreadsheet,
        ChartColumn,
        Clock,
        Settings,
        Plus,
        Sparkles,
    } from "lucide-svelte";

    let pastProjects = $state([
        {
            name: "Aerospace Turbine Hub-V4",
            id: "TM-2023-089",
            completed: "Oct 12, 2023",
            type: "Injection Molding",
            outcome: "Delivered",
        },
        {
            name: "Aerospace Turbine Hub-V4",
            id: "TM-2023-089",
            completed: "Oct 12, 2023",
            type: "Injection Molding",
            outcome: "Delivered",
        },
        {
            name: "Aerospace Turbine Hub-V4",
            id: "TM-2023-089",
            completed: "Oct 12, 2023",
            type: "Injection Molding",
            outcome: "Delivered",
        },
    ]);

    let archivedQuotes = $state([
        {
            name: "Custom Valve Assembly",
            id: "Q-88219",
            date: "Expired on Nov 30, 2023",
            amount: "$12,450.00",
        },
        {
            name: "Optical Housing Prototype",
            id: "Q-87802",
            date: "Closed on Sep 14, 2023",
            amount: "$4,800.00",
        },
    ]);

    let activities = $state([
        {
            title: "Final drawing approved",
            meta: "Project: Aerospace Turbine • 2h ago",
            type: "dot",
        },
        {
            title: "New quotation generated",
            meta: "Project: Valve Assembly • Yesterday",
            type: "plus",
        },
        {
            title: "Material specification updated",
            meta: "Medical Enclosure • 3 days ago",
            type: "plus",
        },
        {
            title: "Account settings changed",
            meta: "Security Update • Jan 10",
            type: "settings",
        },
    ]);

    let recentFiles = $state([
        { name: "Invoice_TM-2023.pdf", size: "2.4 MB", date: "Oct 15, 2023" },
        { name: "Invoice_TM-2023.pdf", size: "2.4 MB", date: "Oct 15, 2023" },
        { name: "Invoice_TM-2023.pdf", size: "2.4 MB", date: "Oct 15, 2023" },
    ]);
</script>

<svelte:head>
    <title>Archive & History | TechMould Client Portal</title>
</svelte:head>

<div class="archive-history-page" in:fade>
    <!-- Page Header -->
    <header class="page-header">
        <h1>Archive & History</h1>
        <p>
            Comprehensive record of all past interactions, project deliveries,
            and financial documents.
        </p>
    </header>

    <div class="workspace-grid">
        <!-- Main Content Column -->
        <div class="main-column">
            <!-- Past Projects Card -->
            <div class="card projects-card" in:fly={{ y: 10 }}>
                <div class="card-header">
                    <h2>Past Projects</h2>
                    <button class="btn-export"
                        >Export CSV <span class="arrow">▲</span></button
                    >
                </div>
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>PROJECT NAME</th>
                                <th>COMPLETED</th>
                                <th>TYPE</th>
                                <th>OUTCOME</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each pastProjects as p}
                                <tr>
                                    <td>
                                        <div class="p-name">
                                            <strong>{p.name}</strong>
                                            <span>ID: {p.id}</span>
                                        </div>
                                    </td>
                                    <td>{p.completed}</td>
                                    <td>{p.type}</td>
                                    <td
                                        ><span class="outcome-pill delivered"
                                            >{p.outcome}</span
                                        ></td
                                    >
                                    <td
                                        ><button class="action-btn"
                                            ><Eye size={18} /></button
                                        ></td
                                    >
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Archived Quotations -->
            <div class="archived-quotations-section">
                <h2>Archived Quotations</h2>
                <div class="quotes-grid">
                    {#each archivedQuotes as q}
                        <div
                            class="quote-mini-card"
                            in:fly={{ y: 10, delay: 50 }}
                        >
                            <div class="q-top">
                                <div class="q-icon-wrap">
                                    <FileText size={18} color="#654dcf" />
                                </div>
                                <span class="q-id">{q.id}</span>
                            </div>
                            <h3>{q.name}</h3>
                            <span class="q-date">{q.date}</span>
                            <div class="q-footer">
                                <strong>{q.amount}</strong>
                                <button class="re-quote-btn">Re-quote</button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Recovery Callout -->
            <div class="recovery-card" in:fly={{ y: 10, delay: 100 }}>
                <div class="recovery-content">
                    <h2>Looking for something specific?</h2>
                    <p>
                        Our advanced deep-search indexing allows you to find
                        technical specifications within archived CAD metadata or
                        specific clauses in past quotations from years ago.
                    </p>
                    <button class="btn-recovery">Request Data Recovery</button>
                </div>
                <div class="recovery-decor">
                    <Search size={140} color="rgba(255,255,255,0.1)" />
                    <div class="decor-line"></div>
                </div>
            </div>
        </div>

        <!-- Sidebar Column -->
        <aside class="sidebar-column">
            <!-- Activity Logs -->
            <div class="card activity-card" in:fly={{ x: 10, delay: 150 }}>
                <h2>Activity Logs</h2>
                <div class="timeline">
                    {#each activities as act, i}
                        <div class="timeline-item">
                            <div class="t-indicator">
                                {#if act.type === "dot"}
                                    <div class="t-dot"></div>
                                {:else if act.type === "plus"}
                                    <Plus
                                        size={10}
                                        color="#cbd5e1"
                                        strokeWidth={3}
                                    />
                                {:else}
                                    <Settings
                                        size={10}
                                        color="#cbd5e1"
                                        strokeWidth={3}
                                    />
                                {/if}
                                {#if i < activities.length - 1}<div
                                        class="t-line"
                                    ></div>{/if}
                            </div>
                            <div class="t-info">
                                <strong>{act.title}</strong>
                                <span>{act.meta}</span>
                            </div>
                        </div>
                    {/each}
                </div>
                <button class="btn-load">Load More Activities</button>
            </div>

            <!-- Recent Files -->
            <div class="card files-card" in:fly={{ x: 10, delay: 200 }}>
                <h2>Recent Files</h2>
                <div class="file-list">
                    {#each recentFiles as file}
                        <div class="file-item">
                            <div class="f-icon">
                                <FileSpreadsheet size={16} color="#f97316" />
                            </div>
                            <div class="f-info">
                                <strong>{file.name}</strong>
                                <span>{file.size} • {file.date}</span>
                            </div>
                            <button class="f-dl"><Download size={16} /></button>
                        </div>
                    {/each}
                </div>

                <div class="arc-storage">
                    <div class="arc-head">
                        <strong>ARCHIVED STORAGE</strong>
                        <span>View full project documentation archive</span>
                    </div>
                    <button class="btn-open-vault">Open Vault</button>
                </div>
            </div>

            <!-- Historical Spend -->
            <div class="card spend-card" in:fly={{ x: 10, delay: 250 }}>
                <div class="s-icon-wrap">
                    <Sparkles size={20} color="#654dcf" />
                </div>
                <div class="s-content">
                    <span class="s-lbl">Historical Spend</span>
                    <div class="s-main">
                        <strong>$248,500</strong>
                    </div>
                    <span class="s-sub">Total across 14 projects</span>
                </div>
                <div class="s-footer">
                    <div class="success-rate">
                        <div class="dot-p"></div>
                        <span>85% Delivery Success Rate</span>
                    </div>
                </div>
            </div>
        </aside>
    </div>
</div>

<style>
    .archive-history-page {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    .page-header h1 {
        font-size: 24px;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 8px;
    }
    .page-header p {
        font-size: 14px;
        color: #64748b;
        font-weight: 500;
    }

    .workspace-grid {
        display: grid;
        grid-template-columns: 1fr 340px;
        gap: 32px;
        align-items: start;
    }

    .card {
        background: white;
        border: 1px solid #f1f5f9;
        border-radius: 24px;
        padding: 32px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
    }
    .card h2 {
        font-size: 15px;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 24px;
    }

    /* Projects Table */
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }
    .card-header h2 {
        margin-bottom: 0;
    }
    .btn-export {
        color: #654dcf;
        font-size: 11px;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 6px;
        letter-spacing: 0.5px;
    }
    .btn-export .arrow {
        font-size: 10px;
    }

    .table-wrap {
        overflow-x: auto;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th {
        text-align: left;
        font-size: 10px;
        font-weight: 800;
        color: #94a3b8;
        letter-spacing: 1px;
        padding: 12px 16px;
        border-bottom: 1px solid #f8fafc;
    }
    td {
        padding: 20px 16px;
        font-size: 13px;
        color: #475569;
        border-bottom: 1px solid #f8fafc;
        vertical-align: middle;
    }

    .p-name strong {
        display: block;
        font-size: 14px;
        color: #1e293b;
        margin-bottom: 2px;
    }
    .p-name span {
        display: block;
        font-size: 11px;
        color: #cbd5e1;
        font-weight: 600;
    }

    .outcome-pill {
        font-size: 10px;
        font-weight: 800;
        padding: 4px 14px;
        border-radius: 40px;
    }
    .outcome-pill.delivered {
        background: #e0f2fe;
        color: #0369a1;
    }

    .action-btn {
        color: #cbd5e1;
        transition: color 0.2s;
    }
    .action-btn:hover {
        color: #654dcf;
    }

    /* Archived Quotations */
    .archived-quotations-section h2 {
        font-size: 15px;
        font-weight: 800;
        color: #0f172a;
        margin: 40px 0 24px;
    }
    .quotes-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
    }
    .quote-mini-card {
        background: white;
        border: 1px solid #f1f5f9;
        border-radius: 20px;
        padding: 32px;
        transition: all 0.2s;
        position: relative;
    }
    .q-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .q-icon-wrap {
        width: 44px;
        height: 44px;
        background: #f5f3ff;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .q-id {
        font-size: 10px;
        font-weight: 800;
        color: #94a3b8;
        letter-spacing: 0.5px;
    }
    .quote-mini-card h3 {
        font-size: 14px;
        font-weight: 800;
        color: #1e293b;
        margin-bottom: 8px;
    }
    .q-date {
        font-size: 11px;
        color: #94a3b8;
        font-weight: 600;
        display: block;
        margin-bottom: 24px;
    }
    .q-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .q-footer strong {
        font-size: 18px;
        color: #654dcf;
        font-weight: 800;
    }
    .re-quote-btn {
        color: #654dcf;
        font-size: 12px;
        font-weight: 800;
        text-decoration: none;
    }

    /* Recovery Card */
    .recovery-card {
        background: #654dcf;
        border-radius: 32px;
        padding: 64px 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        margin-top: 48px;
        position: relative;
        overflow: hidden;
    }
    .recovery-content {
        position: relative;
        z-index: 2;
        max-width: 520px;
    }
    .recovery-content h2 {
        font-size: 28px;
        font-weight: 800;
        margin-bottom: 16px;
        color: white;
    }
    .recovery-content p {
        font-size: 15px;
        opacity: 0.85;
        line-height: 1.7;
        margin-bottom: 40px;
    }
    .btn-recovery {
        background: white;
        color: #654dcf;
        padding: 16px 32px;
        border-radius: 12px;
        font-weight: 800;
        font-size: 14px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    .recovery-decor {
        position: absolute;
        right: 20px;
        bottom: -20px;
        z-index: 1;
    }

    /* Timeline Section */
    .timeline {
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-bottom: 40px;
        padding-left: 4px;
    }
    .timeline-item {
        position: relative;
        display: flex;
        gap: 24px;
    }
    .t-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 14px;
        padding-top: 6px;
    }
    .t-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #654dcf;
        box-shadow: 0 0 0 4px rgba(101, 77, 207, 0.1);
    }
    .t-line {
        position: absolute;
        left: 6px;
        top: 22px;
        bottom: -38px;
        width: 2px;
        background: #f1f5f9;
    }
    .t-info strong {
        display: block;
        font-size: 14px;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 4px;
    }
    .t-info span {
        font-size: 11px;
        color: #94a3b8;
        font-weight: 600;
    }
    .btn-load {
        width: 100%;
        height: 50px;
        border: 1px solid #f1f5f9;
        background: #f8fafc;
        color: #64748b;
        border-radius: 14px;
        font-size: 13px;
        font-weight: 800;
        transition: all 0.2s;
    }
    .btn-load:hover {
        background: #f1f5f9;
        color: #1e293b;
    }

    /* File Section */
    .file-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 40px;
    }
    .file-item {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .f-icon {
        width: 40px;
        height: 40px;
        background: #fff7ed;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .f-info {
        flex: 1;
    }
    .f-info strong {
        display: block;
        font-size: 14px;
        color: #1e293b;
        font-weight: 800;
        margin-bottom: 2px;
    }
    .f-info span {
        font-size: 10px;
        color: #94a3b8;
        font-weight: 700;
        text-transform: uppercase;
    }
    .f-dl {
        color: #cbd5e1;
        transition: color 0.2s;
    }
    .f-dl:hover {
        color: #654dcf;
    }

    .arc-storage {
        background: #654dcf;
        border-radius: 20px;
        padding: 40px 32px;
        color: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 24px;
        position: relative;
        overflow: hidden;
        background-image: linear-gradient(135deg, #654dcf 0%, #4f39b1 100%);
    }
    .arc-head strong {
        display: block;
        font-size: 11px;
        letter-spacing: 1.5px;
        margin-bottom: 6px;
    }
    .arc-head span {
        font-size: 10px;
        opacity: 0.7;
        font-weight: 600;
    }
    .btn-open-vault {
        background: white;
        color: #654dcf;
        width: 100%;
        height: 44px;
        border-radius: 40px;
        font-size: 11px;
        font-weight: 900;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* Spend Card */
    .s-icon-wrap {
        width: 48px;
        height: 48px;
        background: #f5f3ff;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .s-content .s-lbl {
        font-size: 12px;
        font-weight: 800;
        color: #94a3b8;
        letter-spacing: 0.5px;
    }
    .s-content strong {
        font-size: 32px;
        color: #0f172a;
        font-weight: 800;
        display: block;
        margin: 4px 0;
    }
    .s-sub {
        font-size: 12px;
        color: #64748b;
        font-weight: 700;
    }
    .s-footer {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #f8fafc;
    }
    .success-rate {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 11px;
        font-weight: 800;
        color: #475569;
    }
    .dot-p {
        width: 8px;
        height: 8px;
        background: #654dcf;
        border-radius: 50%;
    }
</style>
