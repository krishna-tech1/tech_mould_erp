<script lang="ts">
    import {
        LayoutGrid,
        CircleCheck,
        Zap,
        TriangleAlert,
        ArrowUpRight,
        ArrowDownRight,
        Ellipsis,
        ExternalLink,
        Funnel,
        Download,
    } from "lucide-svelte";
    import { fade } from "svelte/transition";

    let currentFilter: "REAL-TIME" | "WEEKLY" | "MONTHLY" = $state("REAL-TIME");

    const operationsData = {
        "REAL-TIME": {
            stats: [
                { label: "TOTAL ACTIVE PROJECTS", value: "42", trend: "+2", trendSub: "since morning", icon: LayoutGrid, color: "#654dcf" },
                { label: "ON-TRACK MILESTONES", value: "89%", trend: "+2.4%", trendSub: "efficiency gain", icon: CircleCheck, color: "#4ecdc4" },
                { label: "RESOURCE UTILIZATION %", value: "94.2%", trend: "", trendSub: "", icon: Zap, color: "#654dcf", isProgress: true },
                { label: "ACTIVE BOTTLENECKS", value: "04", trend: "+1", trendSub: "needs attention", icon: TriangleAlert, color: "#f39c12" },
            ],
            chartPath: "M0,250 L200,200 L400,160 L600,120 L800,80 L1000,50",
            chartArea: "M0,250 L200,200 L400,160 L600,120 L800,80 L1000,50 L1000,300 L0,300",
            bottlenecks: [
                { name: "Zeta Plate #09", type: "Material Delay", severity: "CRITICAL", stage: "CNC Milling", owner: "Marcus Chen", time: "8 Days", action: "Escalate" },
                { name: "Gamma Flow Unit", type: "Resource Conflict", severity: "MEDIUM", stage: "Mold Assembly", owner: "Sarah Jenkins", time: "2 Days", action: "View Resolution" },
                { name: "Delta Shield V2", type: "Pending Approval", severity: "LOW", stage: "Design Sign-off", owner: "James Wilson", time: "14 Hours", action: "View Resolution" },
            ]
        },
        "WEEKLY": {
            stats: [
                { label: "TOTAL ACTIVE PROJECTS", value: "38", trend: "+5", trendSub: "vs last week", icon: LayoutGrid, color: "#654dcf" },
                { label: "ON-TRACK MILESTONES", value: "82%", trend: "-3%", trendSub: "slight delay", icon: CircleCheck, color: "#f39c12" },
                { label: "RESOURCE UTILIZATION %", value: "88.5%", trend: "", trendSub: "", icon: Zap, color: "#654dcf", isProgress: true },
                { label: "ACTIVE BOTTLENECKS", value: "07", trend: "+2", trendSub: "above average", icon: TriangleAlert, color: "#e74c3c" },
            ],
            chartPath: "M0,200 L200,220 L400,180 L600,210 L800,140 L1000,100",
            chartArea: "M0,200 L200,220 L400,180 L600,210 L800,140 L1000,100 L1000,300 L0,300",
            bottlenecks: [
                { name: "Alpha Core X", type: "QC Failure", severity: "CRITICAL", stage: "Validation", owner: "Robert Fox", time: "3 Days", action: "Escalate" },
                { name: "Sigma Rail #4", type: "Tooling Wear", severity: "LOW", stage: "CNC Roughing", owner: "Jane Doe", time: "5 Days", action: "View Resolution" },
            ]
        },
        "MONTHLY": {
            stats: [
                { label: "TOTAL ACTIVE PROJECTS", value: "112", trend: "+12%", trendSub: "vs last month", icon: LayoutGrid, color: "#654dcf" },
                { label: "ON-TRACK MILESTONES", value: "91%", trend: "+5%", trendSub: "record efficiency", icon: CircleCheck, color: "#4ecdc4" },
                { label: "RESOURCE UTILIZATION %", value: "82.1%", trend: "", trendSub: "", icon: Zap, color: "#654dcf", isProgress: true },
                { label: "ACTIVE BOTTLENECKS", value: "12", trend: "-4", trendSub: "improving", icon: TriangleAlert, color: "#4ecdc4" },
            ],
            chartPath: "M0,280 L200,240 L400,200 L600,150 L800,100 L1000,80",
            chartArea: "M0,280 L200,240 L400,200 L600,150 L800,100 L1000,80 L1000,300 L0,300",
            bottlenecks: [
                { name: "Batch #A7", type: "Multiple Issues", severity: "MEDIUM", stage: "Production", owner: "Team Alpha", time: "12 Days", action: "View Resolution" },
            ]
        }
    };

    const currentStats = $derived(operationsData[currentFilter].stats);
    const currentBottlenecks = $derived(operationsData[currentFilter].bottlenecks);
    const currentPath = $derived(operationsData[currentFilter].chartPath);
    const currentArea = $derived(operationsData[currentFilter].chartArea);

    const resources = [
        { name: "Alpha Mould #202", hours: "1,240 hrs", percent: 85 },
        { name: "Beta Cast G-9", hours: "650 hrs", percent: 45 },
        { name: "Omega Shell Revision", hours: "740 hrs", percent: 55 },
        { name: "Titanium Tooling V2", hours: "410 hrs", percent: 30 },
    ];

    const distribution = [
        { label: "Production", value: "45%", color: "#654dcf" },
        { label: "Design", value: "30%", color: "#4ecdc4" },
        { label: "Quotation", value: "15%", color: "#f39c12" },
        { label: "QC", value: "10%", color: "#bdc3c7" },
    ];
</script>

<svelte:head>
    <title>Operations Dashboard | TechMould ERP</title>
</svelte:head>

<div class="dashboard-header">
    <div class="header-text">
        <h1>Operations Dashboard</h1>
        <p>Real-time oversight for TechMould tooling and production cycles.</p>
    </div>
    <div class="time-filters">
        <button 
            class="filter-btn {currentFilter === 'REAL-TIME' ? 'active' : ''}" 
            onclick={() => (currentFilter = 'REAL-TIME')}
        >REAL TIME</button>
        <button 
            class="filter-btn {currentFilter === 'WEEKLY' ? 'active' : ''}" 
            onclick={() => (currentFilter = 'WEEKLY')}
        >WEEKLY</button>
        <button 
            class="filter-btn {currentFilter === 'MONTHLY' ? 'active' : ''}" 
            onclick={() => (currentFilter = 'MONTHLY')}
        >MONTHLY</button>
    </div>
</div>

<!-- Stats Grid -->
<div class="stats-grid">
    {#each currentStats as stat}
        <div class="stat-card" transition:fade={{ duration: 200 }}>
            <div class="stat-header">
                <span class="stat-label">{stat.label}</span>
                <stat.icon size={18} style="color: {stat.color}" />
            </div>
            <div class="stat-main">
                <span class="stat-value">{stat.value}</span>
            </div>
            <div class="stat-footer">
                {#if stat.isProgress}
                    <div class="mini-progress-bar">
                        <div
                            class="mini-progress"
                            style="width: {stat.value}"
                        ></div>
                    </div>
                {:else}
                    <span
                        class="stat-trend {stat.trend.includes('+') ? 'up' : ''}"
                    >
                        {stat.trend}
                    </span>
                    <span class="trend-sub">{stat.trendSub}</span>
                {/if}
            </div>
        </div>
    {/each}
</div>

<div class="dashboard-grid">
    <!-- Line Chart Card -->
    <div class="card chart-card">
        <div class="card-header">
            <div class="header-left">
                <h3>Project Progress Trend</h3>
            </div>
            <div class="legend">
                <span class="legend-item"
                    ><span class="dot purple"></span> MILESTONES</span
                >
                <span class="legend-item"
                    ><span class="dot teal"></span> BUDGET</span
                >
            </div>
        </div>
        <div class="line-chart-container">
            <div class="y-axis-labels">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
            </div>
            <div class="chart-content">
                <svg viewBox="0 0 1000 300" class="line-svg">
                    <!-- Grid lines -->
                    <line x1="0" y1="0" x2="1000" y2="0" stroke="#f0f1f4" />
                    <line x1="0" y1="75" x2="1000" y2="75" stroke="#f0f1f4" />
                    <line x1="0" y1="150" x2="1000" y2="150" stroke="#f0f1f4" />
                    <line x1="0" y1="225" x2="1000" y2="225" stroke="#f0f1f4" />

                    <!-- Path for Milestones -->
                    <path
                        d={currentPath}
                        fill="none"
                        stroke="#654dcf"
                        stroke-width="3"
                        class="trend-path"
                    />
                    <!-- Area/Glow for path -->
                    <path
                        d={currentArea}
                        fill="url(#grad-purple)"
                        style="opacity: 0.1"
                        class="trend-area"
                    />

                    <!-- Path for Budget -->
                    <path
                        d="M0,240 L250,220 L500,210 L750,195 L1000,180"
                        fill="none"
                        stroke="#4ecdc4"
                        stroke-width="2"
                        stroke-dasharray="5,5"
                    />

                    <defs>
                        <linearGradient
                            id="grad-purple"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                style="stop-color:#654dcf;stop-opacity:1"
                            />
                            <stop
                                offset="100%"
                                style="stop-color:#654dcf;stop-opacity:0"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    </div>

    <!-- Status Distribution Card -->
    <div class="card distribution-card">
        <div class="card-header">
            <h3>Status Distribution</h3>
        </div>
        <div class="donut-container">
            <div class="donut-chart">
                <svg viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#f0f1f4"
                        stroke-width="12"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#654dcf"
                        stroke-width="12"
                        stroke-dasharray="251.2"
                        stroke-dashoffset="113"
                    />
                    <!-- 55% space left -->
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#4ecdc4"
                        stroke-width="12"
                        stroke-dasharray="75.3 175.9"
                        stroke-dashoffset="-138.2"
                    />
                    <!-- 30% -->
                </svg>
                <div class="donut-center">
                    <span class="total">112</span>
                    <span class="label">TOTAL</span>
                </div>
            </div>
            <div class="distribution-list">
                {#each distribution as item}
                    <div class="dist-item">
                        <span class="dot" style="background: {item.color}"
                        ></span>
                        <span class="label">{item.label}</span>
                        <span class="value">{item.value}</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<!-- Bottleneck Analysis Table -->
<div class="card table-card">
    <div class="card-header">
        <h3>Active Bottlenecks Analysis</h3>
        <div class="header-actions">
            <button class="icon-btn-gray"><Funnel size={16} /></button>
            <button class="icon-btn-gray"><Download size={16} /></button>
        </div>
    </div>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>PROJECT NAME</th>
                    <th>BOTTLENECK TYPE</th>
                    <th>SEVERITY</th>
                    <th>IMPACTED STAGE</th>
                    <th>OWNER</th>
                    <th>TIME IN STATE</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {#each currentBottlenecks as b}
                    <tr transition:fade={{ duration: 200 }}>
                        <td class="bold">{b.name}</td>
                        <td>{b.type}</td>
                        <td>
                            <span class="badge {b.severity.toLowerCase()}"
                                >{b.severity}</span
                            >
                        </td>
                        <td>{b.stage}</td>
                        <td>{b.owner}</td>
                        <td
                            class="time {b.severity === 'CRITICAL'
                                ? 'critical'
                                : ''}">{b.time}</td
                        >
                        <td>
                            <button
                                class="action-btn {b.action === 'Escalate'
                                    ? 'primary'
                                    : 'outline'}"
                            >
                                {b.action}
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<div class="bottom-grid">
    <!-- Resource Allocation -->
    <div class="card resource-card">
        <div class="card-header">
            <h3>Resource Allocation (Hours)</h3>
        </div>
        <div class="resource-list">
            {#each resources as r}
                <div class="resource-item">
                    <div class="r-info">
                        <span class="r-name">{r.name}</span>
                        <span class="r-hours">{r.hours}</span>
                    </div>
                    <div class="progress-bar-full">
                        <div class="progress" style="width: {r.percent}%"></div>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Recent Activity -->
    <div class="card activity-card">
        <div class="card-header">
            <h3>Recent Activity</h3>
            <button class="view-all-btn">VIEW ALL</button>
        </div>
        <div class="activity-list">
            <div class="activity-item">
                <div class="act-icon green">📁</div>
                <div class="act-content">
                    <p><strong>Final CAD Uploaded</strong></p>
                    <p>Alpha Mould Project • 2h ago</p>
                </div>
            </div>
            <div class="activity-item">
                <div class="act-icon orange">🔄</div>
                <div class="act-content">
                    <p><strong>Status changed to 'Production'</strong></p>
                    <p>Beta Cast G-9 • 5h ago</p>
                </div>
            </div>
            <div class="activity-item">
                <div class="act-icon purple">💬</div>
                <div class="act-content">
                    <p><strong>New comment on revision cycle</strong></p>
                    <p>Titanium Tooling • Yesterday</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Risk Watchlist -->
    <div class="card risk-card">
        <div class="card-header">
            <h3>Risk Watchlist</h3>
        </div>
        <div class="risk-list">
            <div class="risk-item critical">
                <div class="risk-indicator">!</div>
                <div class="risk-content">
                    <span class="risk-tag">CRITICAL</span>
                    <p class="risk-title">Zeta Plate #09</p>
                    <p class="risk-sub">Material shipment delayed by 8 days.</p>
                </div>
            </div>
            <div class="risk-item warning">
                <div class="risk-indicator">⚠</div>
                <div class="risk-content">
                    <span class="risk-tag">WARNING</span>
                    <p class="risk-title">Gamma Flow Unit</p>
                    <p class="risk-sub">Resource allocation at 98% capacity.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
    }

    .header-text h1 {
        font-size: 24px;
        font-weight: 700;
    }

    .header-text p {
        color: var(--text-sub);
        font-size: 14px;
    }

    .time-filters {
        display: flex;
        background: #e1e4ed;
        padding: 4px;
        border-radius: 8px;
        gap: 4px;
    }

    .filter-btn {
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
        color: var(--text-sub);
    }

    .filter-btn.active {
        background: white;
        color: var(--primary);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    }

    /* Stats cards */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin-bottom: 32px;
    }

    .stat-card {
        background: white;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.03);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
        border-color: var(--primary-light);
    }

    .stat-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
    }

    .stat-label {
        font-size: 10px;
        font-weight: 700;
        color: var(--text-sub);
        letter-spacing: 0.5px;
    }

    .stat-value {
        font-size: 28px;
        font-weight: 700;
    }

    .stat-footer {
        margin-top: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .mini-progress-bar {
        width: 100%;
        height: 6px;
        background: #f0f1f4;
        border-radius: 3px;
    }

    .mini-progress {
        height: 100%;
        background: var(--primary);
        border-radius: 3px;
    }

    .stat-trend {
        font-size: 11px;
        font-weight: 700;
        color: #e74c3c;
    }

    .stat-trend.up {
        color: #4ecdc4;
    }

    .trend-sub {
        font-size: 11px;
        color: var(--text-sub);
    }

    /* Grid layouts */
    .dashboard-grid {
        display: flex;
        gap: 24px;
        margin-bottom: 32px;
    }

    .chart-card {
        flex: 2;
    }

    .distribution-card {
        flex: 1;
    }

    .card {
        background: white;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.03);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .card-header h3 {
        font-size: 16px;
        font-weight: 700;
    }

    .legend {
        display: flex;
        gap: 16px;
    }

    .legend-item {
        font-size: 10px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--text-sub);
    }

    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .dot.purple {
        background: var(--primary);
    }
    .dot.teal {
        background: #4ecdc4;
    }

    /* Line Chart */
    .line-chart-container {
        display: flex;
        gap: 16px;
        height: 250px;
    }

    .y-axis-labels {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 10px;
        font-weight: 700;
        color: var(--text-sub);
        padding-bottom: 20px;
    }

    .chart-content {
        flex: 1;
        position: relative;
    }

    .line-svg {
        width: 100%;
        height: 100%;
        overflow: visible;
    }

    .trend-path, .trend-area {
        transition: d 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Donut Chart */
    .donut-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }

    .donut-chart {
        width: 160px;
        height: 160px;
        position: relative;
    }

    .donut-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 1.1;
    }

    .donut-center .total {
        font-size: 24px;
        font-weight: 700;
    }

    .donut-center .label {
        font-size: 10px;
        font-weight: 700;
        color: var(--text-sub);
    }

    .distribution-list {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .dist-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .dist-item .label {
        flex: 1;
        font-size: 11px;
        color: var(--text-sub);
    }

    .dist-item .value {
        font-size: 11px;
        font-weight: 700;
    }

    /* Table styles */
    .table-card {
        margin-bottom: 32px;
    }

    .table-container {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }

    th {
        padding: 12px 16px;
        font-size: 10px;
        font-weight: 700;
        color: var(--text-sub);
        border-bottom: 1px solid var(--border);
    }

    td {
        padding: 16px;
        font-size: 13px;
        border-bottom: 1px solid var(--border);
    }

    td.bold {
        font-weight: 700;
    }

    td.time.critical {
        color: #e74c3c;
        font-weight: 700;
    }

    .badge {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 9px;
        font-weight: 700;
    }

    .badge.critical {
        background: #ffeded;
        color: #e74c3c;
        line-height: 1.5;
        border: 1px solid rgba(231, 76, 60, 0.2);
    }
    .badge.medium {
        background: #fff5e6;
        color: #f39c12;
    }
    .badge.low {
        background: #f4f7fa;
        color: var(--text-sub);
    }

    .action-btn {
        padding: 6px 14px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
    }

    .action-btn.primary {
        background: var(--primary);
        color: white;
    }

    .action-btn.outline {
        border: 1px solid var(--primary);
        color: var(--primary);
    }

    /* Bottom Grid */
    .bottom-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1.2fr;
        gap: 24px;
    }

    .resource-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .r-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
    }

    .r-name {
        font-size: 12px;
        font-weight: 500;
    }
    .r-hours {
        font-size: 11px;
        color: var(--text-sub);
    }

    .progress-bar-full {
        height: 6px;
        background: #f0f1f4;
        border-radius: 3px;
    }

    .progress-bar-full .progress {
        height: 100%;
        background: var(--primary);
        border-radius: 3px;
    }

    /* Activity icon styles */
    .act-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }

    .act-icon.green {
        background: #e8f8f5;
        color: #4ecdc4;
    }
    .act-icon.orange {
        background: #fef5e7;
        color: #f39c12;
    }
    .act-icon.purple {
        background: #f4f1fd;
        color: var(--primary);
    }

    /* Risk Watchlist */
    .risk-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .risk-item {
        display: flex;
        gap: 12px;
        padding: 16px;
        border-radius: 8px;
    }

    .risk-item.critical {
        background: #fff5f5;
        border: 1px solid #fed7d7;
    }
    .risk-item.warning {
        background: #fffaf0;
        border: 1px solid #fef3c7;
    }

    .risk-indicator {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
    }

    .risk-item.critical .risk-indicator {
        color: #e74c3c;
    }
    .risk-item.warning .risk-indicator {
        color: #f39c12;
    }

    .risk-tag {
        font-size: 9px;
        font-weight: 800;
        margin-bottom: 4px;
        display: block;
    }

    .risk-title {
        font-weight: 700;
        font-size: 13px;
    }
    .risk-sub {
        font-size: 11px;
        color: var(--text-sub);
    }

    .view-all-btn {
        font-size: 10px;
        font-weight: 800;
        color: var(--primary);
    }
</style>
