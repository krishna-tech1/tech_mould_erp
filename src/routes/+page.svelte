<script lang="ts">
    import { fade, fly, scale } from "svelte/transition";
    import { onMount } from "svelte";
    import { 
        Plus, 
        Download, 
        TrendingUp, 
        ChevronRight,
        FileText,
        ClipboardList,
        MessageSquare,
        LayoutGrid,
        Bot,
        Sparkles,
        CheckCircle2,
        BarChart3,
        Calendar,
        UserPlus,
        Layers,
        History,
        AlertTriangle,
        Clock,
        Check
    } from "lucide-svelte";
    import CreateProjectModal from "$lib/components/CreateProjectModal.svelte";

    let userRole = $state("");
    let currentFilter: "DAILY" | "WEEKLY" | "MONTHLY" = $state("DAILY");
    let showCreateProjectModal = $state(false);

    const dashboardData = {
        DAILY: {
            stats: [
                { label: "TOTAL INQUIRIES", value: "1,284", pill: "+12%", type: "trend", color: "#10b981", bg: "#f0fdf4" },
                { label: "ACTIVE PROJECTS", value: "42", pill: "Stable", type: "check", color: "#10b981", bg: "#f0fdf4" },
                { label: "PENDING APPROVALS", value: "18", pill: "Urgent", type: "clock", color: "#d97706", bg: "#fffbeb" },
                { label: "DELAYED TASKS", value: "07", pill: "Alert", type: "alert", color: "#ef4444", bg: "#fef2f2" },
            ],
            chart: [
                { label: "JAN", p: 40, i: 60 }, { label: "FEB", p: 55, i: 45 }, { label: "MAR", p: 70, i: 85 },
                { label: "APR", p: 45, i: 70 }, { label: "MAY", p: 85, i: 55 }, { label: "JUN", p: 65, i: 40 },
            ],
            chartLabels: { title: "Production & Inquiry Trends", sub: "Volume tracking across the last 6 months" }
        },
        WEEKLY: {
            stats: [
                { label: "TOTAL INQUIRIES", value: "312", pill: "+15%", type: "trend", color: "#10b981", bg: "#f0fdf4" },
                { label: "ACTIVE PROJECTS", value: "42", pill: "+2", type: "trend", color: "#10b981", bg: "#f0fdf4" },
                { label: "PENDING APPROVALS", value: "12", pill: "Urgent", type: "clock", color: "#ef4444", bg: "#fef2f2" },
                { label: "DELAYED TASKS", value: "05", pill: "Improving", type: "trend", color: "#10b981", bg: "#f0fdf4" },
            ],
            chart: [
                { label: "MON", p: 65, i: 75 }, { label: "TUE", p: 42, i: 58 }, { label: "WED", p: 88, i: 62 },
                { label: "THU", p: 75, i: 95 }, { label: "FRI", p: 92, i: 80 }, { label: "SAT", p: 45, i: 35 },
            ],
            chartLabels: { title: "Resource Output", sub: "Weekly volume" }
        },
        MONTHLY: {
            stats: [
                { label: "TOTAL INQUIRIES", value: "1,284", pill: "+12%", type: "trend", color: "#10b981", bg: "#f0fdf4" },
                { label: "ACTIVE PROJECTS", value: "42", pill: "Stable", type: "check", color: "#10b981", bg: "#f0fdf4" },
                { label: "PENDING APPROVALS", value: "18", pill: "Urgent", type: "clock", color: "#ef4444", bg: "#fef2f2" },
                { label: "DELAYED TASKS", value: "07", pill: "Alert", type: "alert", color: "#ef4444", bg: "#fef2f2" },
            ],
            chart: [
                { label: "JAN", p: 33, i: 45 }, { label: "FEB", p: 42, i: 38 }, { label: "MAR", p: 54, i: 62 },
                { label: "APR", p: 45, i: 52 }, { label: "MAY", p: 58, i: 48 }, { label: "JUN", p: 66, i: 60 },
            ],
            chartLabels: { title: "Performance Overview", sub: "Monthly tracking" }
        }
    };

    const currentStats = $derived(dashboardData[currentFilter].stats);
    const currentChart = $derived(dashboardData[currentFilter].chart);
    const currentLabels = $derived(dashboardData[currentFilter].chartLabels);

    const bottlenecks = [
        { type: "MATERIAL SHORTAGE", title: "Precision Die #A882", status: "High Risk", detail: "Pending supplier confirmation for steel grade X12." },
        { type: "QA DELAY", title: "Toyota B-Pillar Batch", status: "Critical", detail: "inspection #4 maintenance." },
        { type: "CLIENT SIGN-OFF", title: "Aerospace Project V2", status: "Medium", detail: "CAD approval pending." },
    ];

    const recentActivities = [
        { title: "New Quotation Generated", desc: "Marcus Chen created a quote for ", bold: "Global Auto Co.", time: "Just now", icon: FileText, color: "#f5f3ff", iconColor: "#654dcf" },
        { title: "Design Phase Completed", desc: "Project Mould-X-88 passed initial design review.", bold: "", time: "24 minutes ago", icon: CheckCircle2, color: "#ecfdf5", iconColor: "#10b981" },
        { title: "New Client Registered", desc: "Stellar Dynamics added to the client database.", bold: "", time: "1 hour ago", icon: UserPlus, color: "#fffbeb", iconColor: "#d97706" },
        { title: "Inquiry Received", desc: "Urgent inquiry from ", bold: "MedTech Solutions", time: "3 hours ago", icon: Layers, color: "#eff6ff", iconColor: "#3b82f6" }
    ];

    const upcomingDeadlines = [
        { month: "OCT", day: "28", title: "Client Submission", project: "Automotive Trim Mold V4", badge: "2 DAYS" },
        { month: "NOV", day: "02", title: "Final Tooling Phase", project: "Aerospace Valve Casting", badge: "1 WEEK" },
        { month: "NOV", day: "15", title: "Quarterly Review", project: "Management Meeting - Q4", badge: "3 WEEKS" }
    ];

    onMount(() => {
        userRole = localStorage.getItem("userRole") || "";
    });
</script>

<svelte:head>
    <title>{userRole === 'client' ? 'Alex | Premium Hub' : 'Overview Dashboard | TechMould'}</title>
</svelte:head>

<div class="page-container" in:fade>
    {#if userRole === 'client'}
        <div class="client-grid" in:fade={{duration: 600}}>
            
            <!-- Executive Hero -->
            <div class="client-hero">
                <div class="hero-left">
                    <div class="badge-spark"><Sparkles size={14} /> PREMIUM PARTNER</div>
                    <h1>Welcome, Alex Rivera</h1>
                    <p>Track your high-precision manufacturing pipeline in real-time.</p>
                </div>
                <div class="hero-actions">
                    <a href="/history" class="btn-secondary"><Download size={18} /> Performance Audit</a>
                    <button class="btn-primary-glow" onclick={() => showCreateProjectModal = true}>
                        <Plus size={18} /> New Manufacturing Request
                    </button>
                </div>
            </div>

            <!-- Enhanced Metric Widgets -->
            <div class="metric-ribbon">
                <div class="metric-card widget-glow" in:fly={{y: 20, delay: 100}}>
                    <div class="m-top"><span class="m-label">ACTIVE PROJECTS</span><div class="m-icon purple"><Bot size={24} /></div></div>
                    <div class="m-value">12</div>
                    <div class="m-trend green"><TrendingUp size={14} /> +8.2% <span class="t-sub">momentum</span></div>
                </div>

                <div class="metric-card widget-glow" in:fly={{y: 20, delay: 200}}>
                    <div class="m-top"><span class="m-label">PENDING APPROVALS</span><div class="m-icon amber"><ClipboardList size={24} /></div></div>
                    <div class="m-value">04</div>
                    <div class="m-progress"><div class="m-bar" style="width: 55%"></div></div>
                    <div class="m-subtext">2 Critical Action Items</div>
                </div>

                <div class="metric-card widget-glow" in:fly={{y: 20, delay: 300}}>
                    <div class="m-top"><span class="m-label">COMPLETED UNITS</span><div class="m-icon teal"><CheckCircle2 size={24} /></div></div>
                    <div class="m-value">89</div>
                    <div class="m-avatars">
                        {#each Array(3) as _, i}<div class="m-pfp" style="background-image: url('https://i.pravatar.cc/150?u={i+1}')"></div>{/each}
                        <div class="m-more">+12</div>
                    </div>
                </div>
            </div>

            <div class="client-body">
                <div class="feed-section card-premium">
                    <div class="header-compact"><h2>Production Stream</h2><a href="/history" class="btn-text">Audit History <ChevronRight size={16} /></a></div>
                    <div class="event-stack">
                        <div class="event-item blue-mode">
                            <div class="e-icon"><FileText size={20} /></div>
                            <div class="e-content">
                                <div class="e-meta"><h3>Blueprint Uploaded</h3><span class="e-time">2h ago</span></div>
                                <p>Sarah K. uploaded <span class="bold-highlight">Housing_V4_Optimized.dwg</span> to Aerospace Initiative.</p>
                                <div class="e-chips"><span class="c">Zenon Case</span><span class="c">R&D</span></div>
                            </div>
                        </div>
                        <div class="event-item gold-mode">
                            <div class="e-icon"><ClipboardList size={20} /></div>
                            <div class="e-content">
                                <div class="e-meta"><h3>Action Required</h3><span class="e-time">5h ago</span></div>
                                <p>Material certification for <span class="bold-highlight">Titanium Batch X-2</span> awaiting executive signature.</p>
                                <a href="/client-approvals" class="action-link">Authorize Module <ChevronRight size={14} /></a>
                            </div>
                        </div>
                        <div class="event-item pulse-mode">
                            <div class="e-icon"><MessageSquare size={20} /></div>
                            <div class="e-content">
                                <div class="e-meta"><h3>Team Update</h3><span class="e-time">Yesterday</span></div>
                                <p>Quality Control finalized the stress-test protocols for the automotive housing unit.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tools-section">
                    <div class="tools-header"><h2>Strategic Tools</h2></div>
                    <div class="tools-grid">
                        <a href="/files" class="tool-btn item-hover">
                            <div class="t-inner"><FileText size={20} /> <span>Asset Vault</span></div>
                            <ChevronRight size={18} />
                        </a>
                        <a href="/client-approvals" class="tool-btn item-hover">
                            <div class="t-inner"><ClipboardList size={20} /> <span>Sign-Off Portal</span></div>
                            <ChevronRight size={18} />
                        </a>
                        <a href="/my-projects" class="tool-btn item-hover">
                            <div class="t-inner"><LayoutGrid size={20} /> <span>Project Matrix</span></div>
                            <ChevronRight size={18} />
                        </a>
                    </div>
                </div>
            </div>

            <CreateProjectModal bind:show={showCreateProjectModal} />
        </div>
    {:else}
        <!-- ERP OPERATIONS :: ADMIN MODE :: EXACT MATCH -->
        <div class="admin-grid" in:fade>
            <div class="admin-header-main">
                <div class="h-text">
                    <h1>Overview Dashboard</h1>
                    <p>Real-time performance metrics and active production pipelines.</p>
                </div>
                <div class="h-filters">
                    <div class="filter-pill-container">
                        {#each (['DAILY', 'WEEKLY', 'MONTHLY'] as const) as f}
                            <button class="chip {currentFilter === f ? 'active' : ''}" onclick={() => currentFilter = f}>{f}</button>
                        {/each}
                    </div>
                </div>
            </div>

            <div class="stats-row">
                {#each currentStats as s}
                    <div class="stat-card {s.label === 'DELAYED TASKS' ? 'alert-value' : ''}">
                        <span class="s-label">{s.label}</span>
                        <div class="s-main">
                            <strong class="s-val">{s.value}</strong>
                            <div class="s-pill" style="background: {s.bg}; color: {s.color}">
                                {#if s.type === 'trend'}<TrendingUp size={12} /> 
                                {:else if s.type === 'check'}<Check size={12} />
                                {:else if s.type === 'clock'}<Clock size={12} />
                                {:else}<AlertTriangle size={12} />{/if}
                                <span>{s.pill}</span>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            <div class="admin-body">
                <div class="a-left">
                    <div class="chart-container-premium card">
                        <div class="chart-header">
                            <div class="ch-text"><h3>{currentLabels.title}</h3><span>{currentLabels.sub}</span></div>
                            <div class="ch-legend"><span class="leg"><span class="dot p"></span> PROJECTS</span><span class="leg"><span class="dot i"></span> INQUIRIES</span></div>
                        </div>
                        <div class="chart-v">
                            <div class="y-axis">{#each [120, 100, 75, 50, 25, 0] as y}<span>{y}</span>{/each}</div>
                            <div class="bars-container">
                                <div class="guide-lines">{#each Array(6) as _}<div class="line"></div>{/each}</div>
                                <div class="bars-wrapper">
                                    {#each currentChart as b}
                                        <div class="bar-pair">
                                            <div class="p-wrap"><div class="b-prod" style="height: {b.p}%"></div><div class="b-inq" style="height: {b.i}%"></div></div>
                                            <span class="b-label">{b.label}</span>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Activity Section -->
                    <div class="card activity-matrix-card">
                        <h2>Recent Activity</h2>
                        <div class="activity-scroll">
                            {#each recentActivities as act}
                                <div class="activity-row">
                                    <div class="act-icon-box" style="background: {act.color}; color: {act.iconColor}">
                                        <act.icon size={18} />
                                    </div>
                                    <div class="act-content">
                                        <div class="act-header">
                                            <strong>{act.title}</strong>
                                        </div>
                                        <p>{act.desc} <span class="bold-highlight-indigo">{act.bold}</span></p>
                                        <span class="act-time">{act.time}</span>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>

                <div class="a-right">
                    <!-- Bottlenecks -->
                    <div class="efficiency-card card">
                        <div class="ef-header"><span>⚡</span><h3>Bottlenecks</h3></div>
                        <div class="ef-list">
                            {#each bottlenecks as b}
                                <div class="ef-item {b.status.toLowerCase().replace(' ', '-')}">
                                    <div class="ef-top"><span class="ef-tag">{b.type}</span><span class="ef-stat">{b.status}</span></div>
                                    <p class="ef-t">{b.title}</p><p class="ef-d">{b.detail}</p>
                                </div>
                            {/each}
                        </div>
                        <button class="btn-all">VIEW ALL ALERTS</button>
                    </div>

                    <!-- Upcoming Deadlines -->
                    <div class="card deadlines-card">
                        <div class="d-header">
                            <h3>Upcoming Deadlines</h3>
                            <Calendar size={18} color="#94a3b8" />
                        </div>
                        <div class="d-list">
                            {#each upcomingDeadlines as d}
                                <div class="d-item">
                                    <div class="d-cal">
                                        <span class="d-month">{d.month}</span>
                                        <span class="d-day">{d.day}</span>
                                    </div>
                                    <div class="d-info">
                                        <strong>{d.title}</strong>
                                        <span>{d.project}</span>
                                    </div>
                                    <div class="d-badge">{d.badge}</div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Report Generator -->
                    <div class="report-card">
                        <h3>Need a Report?</h3>
                        <p>Generate a custom project performance audit for the board members in seconds.</p>
                        <button class="btn-generate">Generate now</button>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .page-container { min-height: 100vh; padding: 20px; }
    .client-grid { display: flex; flex-direction: column; gap: 48px; }
    .client-hero { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 24px; border-bottom: 1px solid var(--border-soft); }
    .badge-spark { display: inline-flex; align-items: center; gap: 8px; background: #654dcf10; color: var(--primary); padding: 8px 16px; border-radius: 40px; font-size: 11px; font-weight: 800; letter-spacing: 0.5px; border: 1px solid #654dcf20; margin-bottom: 20px; }
    .hero-left h1 { font-size: 36px; font-weight: 800; color: var(--text-base); margin-bottom: 8px; }
    .hero-left p { font-size: 16px; color: var(--text-dim); }
    .hero-actions { display: flex; gap: 16px; }
    .btn-secondary { background: white; border: 1px solid var(--border-soft); padding: 16px 24px; border-radius: 14px; color: var(--text-base); font-weight: 700; display: flex; align-items: center; gap: 12px; text-decoration: none; }
    .btn-primary-glow { background: var(--primary); color: white; padding: 16px 32px; border-radius: 14px; font-weight: 800; border: none; display: flex; align-items: center; gap: 12px; box-shadow: 0 10px 30px rgba(101, 77, 207, 0.3); transition: all 0.3s; }

    .metric-ribbon { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .metric-card { background: white; border-radius: 28px; padding: 36px; border: 1px solid var(--border-soft); position: relative; transition: all 0.3s; }
    .m-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .m-label { font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; }
    .m-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
    .m-icon.purple { background: #f5f3ff; color: #8b5cf6; }
    .m-icon.amber { background: #fffbeb; color: #d97706; }
    .m-icon.teal { background: #f0fdfa; color: #0d9488; }
    .m-value { font-size: 64px; font-weight: 800; color: var(--text-base); line-height: 1; }
    .m-trend { font-size: 13px; font-weight: 800; display: flex; align-items: center; gap: 6px; margin-top: 24px; }
    .m-trend.green { color: #10b981; }
    .m-progress { height: 8px; background: #f1f5f9; border-radius: 10px; margin: 28px 0 12px; overflow: hidden; }
    .m-bar { height: 100%; background: linear-gradient(90deg, #f59e0b, #fbbf24); border-radius: 10px; }
    .m-subtext { font-size: 12px; font-weight: 700; color: #94a3b8; }
    .m-avatars { display: flex; align-items: center; margin-top: 28px; }
    .m-pfp { width: 38px; height: 38px; border-radius: 50%; border: 3px solid white; background-size: cover; margin-left: -12px; }
    .m-more { width: 38px; height: 38px; border-radius: 50%; border: 3px solid white; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; margin-left: -12px; }

    .client-body { display: grid; grid-template-columns: 1.8fr 1fr; gap: 40px; }
    .header-compact { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .btn-text { background: none; border: none; color: var(--primary); font-weight: 800; font-size: 14px; display: flex; align-items: center; gap: 6px; text-decoration: none; }
    .card-premium { background: white; border-radius: 32px; padding: 40px; border: 1px solid var(--border-soft); }
    .event-item { background: #f8fafc; border-radius: 24px; padding: 32px; display: flex; gap: 28px; border: 1px solid transparent; transition: all 0.3s; margin-bottom: 20px; }
    .e-icon { width: 56px; height: 56px; border-radius: 16px; background: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(0,0,0,0.04); }
    .blue-mode .e-icon { color: #3b82f6; }
    .gold-mode .e-icon { color: #f59e0b; }
    .pulse-mode .e-icon { color: #8b5cf6; }
    .e-meta { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .e-meta h3 { font-size: 17px; font-weight: 800; color: var(--text-base); }
    .e-time { font-size: 12px; font-weight: 600; color: #94a3b8; }
    .e-content p { font-size: 15px; color: #64748b; line-height: 1.6; margin-bottom: 16px; }
    .bold-highlight { font-weight: 800; color: var(--text-base); }
    .bold-highlight-indigo { font-weight: 800; color: #6366f1; }
    .e-chips { display: flex; gap: 10px; }
    .c { background: white; padding: 6px 14px; border-radius: 10px; font-size: 11px; font-weight: 800; color: #64748b; border: 1px solid var(--border-soft); }
    .action-link { background: none; border: none; color: var(--primary); font-weight: 800; font-size: 13px; display: flex; align-items: center; gap: 6px; text-decoration: none; }

    /* Admin Redesign */
    .admin-grid { display: flex; flex-direction: column; gap: 40px; }
    .admin-header-main { display: flex; justify-content: space-between; align-items: flex-end; }
    .h-text h1 { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
    .h-text p { font-size: 14px; color: #64748b; font-weight: 500; }
    
    .filter-pill-container { background: #f1f5f9; padding: 4px; border-radius: 12px; display: flex; gap: 4px; }
    .chip { padding: 10px 20px; border-radius: 8px; font-size: 11px; font-weight: 800; color: #94a3b8; border: none; transition: all 0.2s; cursor: pointer; }
    .chip.active { background: white; color: #1e293b; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }

    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .stat-card { background: white; border: 1px solid #f1f5f9; border-radius: 16px; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.01); transition: all 0.3s; }
    .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.04); }
    .s-label { font-size: 10px; font-weight: 800; color: #94a3b8; letter-spacing: 0.5px; opacity: 0.8; margin-bottom: 20px; display: block; }
    .s-main { display: flex; justify-content: space-between; align-items: center; }
    .s-val { font-size: 32px; font-weight: 800; color: #0f172a; }
    .alert-value .s-val { color: #ef4444; }
    
    .s-pill { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 40px; font-size: 11px; font-weight: 800; }

    .admin-body { display: grid; grid-template-columns: 1.8fr 1fr; gap: 40px; margin-top: 32px; }
    .a-left { display: flex; flex-direction: column; gap: 40px; }
    .a-right { display: flex; flex-direction: column; gap: 40px; }

    .chart-container-premium { padding: 40px; }
    .chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .ch-text h3 { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
    .ch-text span { font-size: 12px; color: #64748b; font-weight: 600; }
    .ch-legend { display: flex; gap: 20px; align-items: center; }
    .leg { display: flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 900; color: #1e293b; letter-spacing: 0.5px; }
    .dot { width: 12px; height: 12px; border-radius: 50%; }
    .dot.p { background: #654dcf; }
    .dot.i { background: #4ecdc4; }
    
    .chart-v { display: flex; height: 350px; gap: 24px; margin-top: 48px; }
    .y-axis { display: flex; flex-direction: column; justify-content: space-between; font-size: 12px; color: #0f172a; font-weight: 800; width: 30px; }
    .bars-container { flex: 1; position: relative; }
    .guide-lines { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; }
    .line { height: 1px; background: #f1f5f9; }
    .bars-wrapper { position: relative; height: 100%; display: flex; justify-content: space-between; align-items: flex-end; padding: 0 40px; }
    .bar-pair { display: flex; flex-direction: column; align-items: center; width: 12%; height: 100%; }
    .p-wrap { display: flex; align-items: flex-end; gap: 6px; height: 100%; flex: 1; margin-bottom: 16px; }
    .p-wrap div { width: 12px; border-radius: 4px 4px 0 0; }
    .b-prod { background: #654dcf; }
    .b-inq { background: #4ecdc4; }
    .b-label { font-size: 11px; font-weight: 800; color: #0f172a; }

    .activity-matrix-card { padding: 32px; }
    .activity-row { display: flex; gap: 20px; padding: 24px 0; border-bottom: 1px solid #f8fafc; }
    .act-icon-box { min-width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .act-header strong { font-size: 15px; color: #0f172a; }
    .act-content p { font-size: 13px; color: #64748b; margin: 4px 0; }
    .act-time { font-size: 11px; color: #cbd5e1; font-weight: 700; }

    .efficiency-card h3 { display: inline-flex; align-items: center; gap: 12px; font-size: 20px; font-weight: 800; }
    .ef-header { margin-bottom: 32px; }
    .ef-header span { color: #f59e0b; font-size: 24px; }
    .ef-item { border-left: 4px solid transparent; padding: 24px; background: white; margin-bottom: 16px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.01); border: 1px solid #f1f5f9; }
    .ef-item.high-risk { border-left-color: #f59e0b; }
    .ef-item.critical { border-left-color: #ef4444; }
    .ef-item.medium { border-left-color: #3b82f6; }
    .ef-tag { font-size: 11px; font-weight: 900; background: #fffbeb; color: #d97706; padding: 4px 10px; border-radius: 40px; }
    .ef-stat { float: right; font-size: 10px; font-weight: 800; color: #94a3b8; }
    .ef-t { font-size: 15px; font-weight: 800; color: #0f172a; margin: 12px 0 4px; }
    .ef-d { font-size: 12px; color: #64748b; line-height: 1.5; }
    .btn-all { width: 100%; color: #654dcf; font-weight: 900; background: none; border: none; padding: 12px; font-size: 12px; letter-spacing: 1px; cursor: pointer; border-radius: 12px; transition: background 0.2s; }
    .btn-all:hover { background: #f5f3ff; }

    .deadlines-card { padding: 32px; }
    .d-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .d-list { display: flex; flex-direction: column; gap: 24px; }
    .d-item { display: flex; align-items: center; gap: 16px; }
    .d-cal { width: 50px; height: 54px; border: 1px solid #f1f5f9; border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; background: white; }
    .d-month { background: #f8fafc; color: #94a3b8; font-size: 9px; font-weight: 900; text-align: center; padding: 4px 0; border-bottom: 1px solid #f1f5f9; }
    .d-day { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 900; color: #1e293b; }
    .d-info { flex: 1; }
    .d-info strong { display: block; font-size: 14px; color: #0f172a; }
    .d-info span { font-size: 11px; color: #94a3b8; font-weight: 600; }
    .d-badge { background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 900; color: #475569; }

    .report-card { background: #654dcf; border-radius: 20px; padding: 32px; color: white; }
    .report-card h3 { font-size: 20px; font-weight: 800; margin-bottom: 12px; }
    .report-card p { font-size: 14px; opacity: 0.85; line-height: 1.6; margin-bottom: 28px; }
    .btn-generate { background: white; color: #654dcf; width: 100%; padding: 14px; border-radius: 12px; font-weight: 800; font-size: 14px; border: none; }
</style>
