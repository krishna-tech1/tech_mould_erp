<script lang="ts">
    const stats = [
        {
            label: "TOTAL INQUIRIES",
            value: "1,284",
            trend: "+12%",
            trendColor: "#55efc4",
        },
        {
            label: "ACTIVE PROJECTS",
            value: "42",
            trend: "Stable",
            trendColor: "#636e72",
        },
        {
            label: "PENDING APPROVALS",
            value: "18",
            trend: "Urgent",
            trendColor: "#ff7675",
            badge: "Urgent",
        },
        {
            label: "DELAYED TASKS",
            value: "07",
            trend: "Alert",
            trendColor: "#ff7675",
            badge: "Alert",
        },
    ];

    const bottlenecks = [
        {
            type: "MATERIAL SHORTAGE",
            title: "Precision Die #A882",
            status: "High Risk",
            sub: "Pending supplier confirmation for steel grade X73.",
        },
        {
            type: "QA DELAY",
            title: "Toyota B-Pillar Batch",
            status: "Critical",
            sub: "Inspection station #4 maintenance overflow.",
        },
        {
            type: "CLIENT SIGN-OFF",
            title: "Aerospace Project V2",
            status: "Medium Risk",
            sub: "Awaiting CAD approval since Oct 24th.",
        },
    ];
</script>

<svelte:head>
    <title>Admin Dashboard | TechMould ERP</title>
</svelte:head>

<div class="dashboard-header">
    <div class="header-text">
        <h1>Overview Dashboard</h1>
        <p>Real-time performance metrics and active production pipelines.</p>
    </div>
    <div class="time-filters">
        <button class="filter-btn active">DAILY</button>
        <button class="filter-btn">WEEKLY</button>
        <button class="filter-btn">MONTHLY</button>
    </div>
</div>

<!-- Stats Grid -->
<div class="stats-grid">
    {#each stats as stat}
        <div class="stat-card">
            <div class="stat-label">
                {stat.label}
            </div>
            <div class="stat-main">
                <span class="stat-value">{stat.value}</span>
                <span
                    class="stat-trend"
                    style="background: {stat.trendColor}20; color: {stat.trendColor}"
                >
                    {stat.trend}
                </span>
            </div>
        </div>
    {/each}
</div>

<div class="dashboard-body">
    <!-- Left Side: Trends and Activity -->
    <div class="main-body">
        <!-- Trends Card -->
        <div class="card trends-card">
            <div class="card-header">
                <div class="header-left">
                    <h3>Production & Inquiry Trends</h3>
                    <span>Volume tracking across the last 6 months</span>
                </div>
                <div class="legend">
                    <span class="legend-item"
                        ><span class="dot purple"></span> PROJECTS</span
                    >
                    <span class="legend-item"
                        ><span class="dot teal"></span> INQUIRIES</span
                    >
                </div>
            </div>
            <div class="chart-container">
                <!-- Y Axis -->
                <div class="y-axis">
                    <span>120</span>
                    <span>100</span>
                    <span>80</span>
                    <span>60</span>
                    <span>40</span>
                    <span>20</span>
                    <span></span>
                </div>

                <div class="chart-box">
                    <div class="grid-lines">
                        <div class="grid-line"></div>
                        <div class="grid-line"></div>
                        <div class="grid-line"></div>
                        <div class="grid-line"></div>
                        <div class="grid-line"></div>
                        <div class="grid-line"></div>
                    </div>
                    <div class="bars">
                        <!-- JAN -->
                        <div class="bar-group">
                            <div class="bar-pair">
                                <div
                                    class="bar purple"
                                    style="height: 33%"
                                ></div>
                                <div class="bar teal" style="height: 45%"></div>
                            </div>
                            <span class="month-label">JAN</span>
                        </div>
                        <!-- FEB -->
                        <div class="bar-group">
                            <div class="bar-pair">
                                <div
                                    class="bar purple"
                                    style="height: 42%"
                                ></div>
                                <div class="bar teal" style="height: 38%"></div>
                            </div>
                            <span class="month-label">FEB</span>
                        </div>
                        <!-- MAR -->
                        <div class="bar-group">
                            <div class="bar-pair">
                                <div
                                    class="bar purple"
                                    style="height: 54%"
                                ></div>
                                <div class="bar teal" style="height: 62%"></div>
                            </div>
                            <span class="month-label">MAR</span>
                        </div>
                        <!-- APR -->
                        <div class="bar-group">
                            <div class="bar-pair">
                                <div
                                    class="bar purple"
                                    style="height: 45%"
                                ></div>
                                <div class="bar teal" style="height: 52%"></div>
                            </div>
                            <span class="month-label">APR</span>
                        </div>
                        <!-- MAY -->
                        <div class="bar-group">
                            <div class="bar-pair">
                                <div
                                    class="bar purple"
                                    style="height: 58%"
                                ></div>
                                <div class="bar teal" style="height: 48%"></div>
                            </div>
                            <span class="month-label">MAY</span>
                        </div>
                        <!-- JUN -->
                        <div class="bar-group">
                            <div class="bar-pair">
                                <div
                                    class="bar purple"
                                    style="height: 66%"
                                ></div>
                                <div class="bar teal" style="height: 60%"></div>
                            </div>
                            <span class="month-label">JUN</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="card activity-card">
            <div class="card-header">
                <h3>Recent Activity</h3>
            </div>
            <div class="activity-list">
                <div class="activity-item">
                    <div class="act-icon purple">📄</div>
                    <div class="act-content">
                        <p><strong>New Quotation Generated</strong></p>
                        <p>
                            Marcus Chen created a quote for <span class="link"
                                >Global Auto Co.</span
                            >
                        </p>
                        <span class="time">Just now</span>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="act-icon teal">✅</div>
                    <div class="act-content">
                        <p><strong>Design Phase Completed</strong></p>
                        <p>Project Mould-X-89 passed initial design review.</p>
                        <span class="time">24 minutes ago</span>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="act-icon orange">👤</div>
                    <div class="act-content">
                        <p><strong>New Client Registered</strong></p>
                        <p>Stellar Dynamics added to the client database.</p>
                        <span class="time">1 hour ago</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Right Side: Bottlenecks and Calendar -->
    <div class="side-body">
        <!-- Bottlenecks Card -->
        <div class="card bottlenecks-card">
            <div class="card-header">
                <span class="icon">⚡</span>
                <h3>Bottlenecks</h3>
            </div>
            <div class="bottleneck-list">
                {#each bottlenecks as item}
                    <div class="bottleneck-item">
                        <div class="b-header">
                            <span class="b-type">{item.type}</span>
                            <span
                                class="b-status {item.status
                                    .toLowerCase()
                                    .replace(' ', '-')}">{item.status}</span
                            >
                        </div>
                        <p class="b-title">{item.title}</p>
                        <p class="b-sub">{item.sub}</p>
                    </div>
                {/each}
            </div>
            <button class="view-all">VIEW ALL ALERTS</button>
        </div>

        <!-- Need a Report -->
        <div class="report-card">
            <h3>Need a Report?</h3>
            <p>
                Generate a custom project performance audit for the board
                members in seconds.
            </p>
            <button class="btn-report">Generate now</button>
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
        margin-bottom: 4px;
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
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
        color: var(--text-sub);
    }

    .filter-btn.active {
        background: white;
        color: black;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transform: scale(1.02);
    }

    .filter-btn:not(.active):hover {
        background: rgba(255, 255, 255, 0.5);
        color: black;
    }

    /* Stats Grid */
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
    }

    .stat-label {
        font-size: 10px;
        font-weight: 700;
        color: var(--text-sub);
        margin-bottom: 12px;
    }

    .stat-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .stat-value {
        font-size: 32px;
        font-weight: 700;
    }

    .stat-trend {
        font-size: 11px;
        font-weight: 700;
        padding: 4px 8px;
        border-radius: 6px;
    }

    /* Dashboard Body */
    .dashboard-body {
        display: flex;
        gap: 32px;
    }

    .main-body {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .side-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 32px;
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

    .header-left span {
        font-size: 12px;
        color: var(--text-sub);
    }

    .legend {
        display: flex;
        gap: 16px;
        font-size: 10px;
        font-weight: 700;
        color: var(--text-sub);
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 2px;
    }

    .dot.purple {
        background: var(--primary);
    }
    .dot.teal {
        background: #4ecdc4;
    }

    /* Chart Styles */
    .chart-container {
        display: flex;
        gap: 16px;
        height: 300px;
        margin-top: 20px;
    }

    .y-axis {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100% - 30px);
        font-size: 11px;
        font-weight: 700;
        color: var(--text-sub);
        padding-bottom: 5px;
        width: 25px;
        text-align: right;
    }

    .chart-box {
        flex: 1;
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .grid-lines {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: none;
    }

    .grid-line {
        height: 1px;
        background: rgba(0, 0, 0, 0.05);
        width: 100%;
    }

    .bars {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 10px;
        margin-bottom: 30px;
        z-index: 1;
    }

    .bar-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 14%;
        height: 100%;
        justify-content: flex-end;
    }

    .bar-pair {
        display: flex;
        align-items: flex-end;
        width: 100%;
        height: 100%;
        justify-content: center;
    }

    .bar {
        width: 45%;
        min-width: 20px;
        transition: height 0.5s ease;
    }

    .bar.purple {
        background: var(--primary);
        z-index: 2;
    }

    .bar.teal {
        background: #4ecdc4;
        margin-left: -5px; /* Slight overlap as per img */
        z-index: 1;
    }

    .month-label {
        position: absolute;
        bottom: 0;
        font-size: 11px;
        font-weight: 700;
        color: var(--text-sub);
        margin-top: 10px;
    }

    /* Activity List */
    .activity-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .activity-item {
        display: flex;
        gap: 16px;
    }

    .act-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
    }

    .act-icon.purple {
        background: rgba(101, 77, 207, 0.1);
        color: var(--primary);
    }
    .act-icon.teal {
        background: rgba(78, 205, 196, 0.1);
        color: #4ecdc4;
    }
    .act-icon.orange {
        background: rgba(255, 165, 0, 0.1);
        color: orange;
    }

    .act-content p {
        font-size: 13px;
        color: var(--text-main);
    }

    .act-content .time {
        font-size: 11px;
        color: var(--text-sub);
    }

    .act-content .link {
        color: var(--primary);
        font-weight: 600;
        text-decoration: underline;
    }

    /* Bottleneck Styles */
    .bottleneck-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .bottleneck-item {
        background: #fdfdfe;
        padding: 16px;
        border: 1px solid var(--border);
        border-radius: 8px;
    }

    .b-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
    }

    .b-type {
        font-size: 10px;
        font-weight: 700;
        color: #e67e22;
    }

    .b-status {
        font-size: 9px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 4px;
        background: #fee;
        color: #e74c3c;
    }

    .b-status.high-risk {
        background: #fee;
        color: #e74c3c;
    }
    .b-status.critical {
        background: #ffeded;
        color: #c0392b;
    }
    .b-status.medium-risk {
        background: #fff5e6;
        color: #d35400;
    }

    .b-title {
        font-weight: 700;
        font-size: 13px;
        margin-bottom: 4px;
    }

    .b-sub {
        font-size: 11px;
        color: var(--text-sub);
    }

    .view-all {
        width: 100%;
        margin-top: 16px;
        font-size: 11px;
        font-weight: 700;
        color: var(--primary);
        text-align: center;
        padding: 8px;
        border-radius: 6px;
    }

    .view-all:hover {
        background: var(--primary-light);
        text-decoration: underline;
    }

    /* Report Card */
    .report-card {
        background: var(--primary);
        color: white;
        padding: 32px;
        border-radius: 12px;
        text-align: center;
    }

    .report-card h3 {
        font-size: 18px;
        margin-bottom: 12px;
    }

    .report-card p {
        font-size: 12px;
        opacity: 0.8;
        margin-bottom: 24px;
    }

    .btn-report {
        background: white;
        color: var(--primary);
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 14px;
    }

    .btn-report:hover {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px) scale(1.02);
    }

    .btn-report:active {
        transform: translateY(0) scale(0.98);
    }
</style>
