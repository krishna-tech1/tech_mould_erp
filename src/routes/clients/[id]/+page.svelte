<script lang="ts">
    import {
        CircleCheck,
        MapPin,
        User,
        Calendar,
        PenLine,
        Send,
        Download,
        Plus,
        Clock,
        DollarSign,
        EllipsisVertical,
    } from "lucide-svelte";

    const activities = [
        {
            text: 'New project "Warehouse Automation phase 2" initiated.',
            time: "2 hours ago",
            by: "By Sarah Jenkins",
            color: "#654dcf",
        },
        {
            text: "Invoice #4401 marked as paid.",
            time: "Yesterday",
            by: "System Automated",
            color: "#cbd5e0",
        },
        {
            text: "Client uploaded 4 technical drawings.",
            time: "3 days ago",
            by: "Portal Upload",
            color: "#cbd5e0",
        },
    ];

    const projects = [
        {
            name: "Custom Injection Mold A2",
            id: "PRJ-882",
            status: "IN DESIGN",
            progress: 65,
            color: "#654dcf",
        },
        {
            name: "Steel Casting Prototype",
            id: "PRJ-904",
            status: "PRODUCTION",
            progress: 20,
            color: "#654dcf",
        },
    ];

    const proposals = [
        {
            title: "Cloud Migration Q4",
            client: "Aura Logistics",
            value: "$45,000",
            status: "Draft",
        },
        {
            title: "UX Redesign",
            client: "Nexus Media",
            value: "$12,800",
            status: "Sent",
            sent: true,
        },
    ];

    const revenueData = [40, 30, 60, 45, 80, 50]; // Simple bar data
</script>

<svelte:head>
    <title>Client Profile | TechMould ERP</title>
</svelte:head>

<div class="profile-page">
    <div class="profile-banner">PROFILE DETAIL</div>

    <!-- Header Card -->
    <div class="card header-card">
        <div class="card-top">
            <div class="profile-main">
                <div class="logo-box">
                    <img src="/admin-face.jpg" alt="Logo" class="logo-img" />
                </div>
                <div class="profile-text">
                    <div class="name-row">
                        <h1>Apex Logistics Inc.</h1>
                        <CircleCheck size={20} color="#4ecdc4" fill="#e8fdfa" />
                    </div>
                    <div class="meta-row">
                        <span
                            ><MapPin size={14} /> Seattle, WA - Enterprise Tier</span
                        >
                    </div>
                    <div class="details-row">
                        <div class="d-item">
                            <span class="label">RELATIONSHIP MGR.</span>
                            <span class="val">Sarah Jenkins</span>
                        </div>
                        <div class="d-item">
                            <span class="label">CLIENT SINCE</span>
                            <span class="val">Oct 2018</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action-buttons">
                <button class="btn-outline"
                    ><PenLine size={16} /> Edit Profile</button
                >
                <button class="btn-primary"
                    ><Send size={16} /> Send Message</button
                >
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs">
            <button class="tab active">Overview</button>
            <button class="tab">Projects</button>
            <button class="tab">Documents</button>
            <button class="tab">Communication</button>
            <button class="tab">Financials</button>
        </div>
    </div>

    <div class="profile-grid">
        <!-- Left Column -->
        <div class="content-left">
            <!-- Recent Activity -->
            <div class="card section-card">
                <h3>Recent Activity</h3>
                <div class="activity-timeline">
                    {#each activities as act}
                        <div class="activity-item">
                            <div
                                class="dot"
                                style="background: {act.color}"
                            ></div>
                            <div class="act-content">
                                <strong>{act.text}</strong>
                                <span class="act-meta"
                                    >{act.time} • {act.by}</span
                                >
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Ongoing Projects -->
            <div class="section-header-row">
                <h3>Ongoing Projects</h3>
                <button class="view-all">View All Projects</button>
            </div>
            <div class="projects-row">
                {#each projects as p}
                    <div class="card p-card">
                        <div class="p-header">
                            <span
                                class="p-status {p.status
                                    .toLowerCase()
                                    .replace(' ', '-')}">{p.status}</span
                            >
                            <span class="p-id">ID: {p.id}</span>
                        </div>
                        <h4>{p.name}</h4>
                        <div class="progress-info">
                            <span>Progress</span>
                            <span>{p.progress}%</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div
                                class="progress-bar-fill"
                                style="width: {p.progress}%; background: {p.color}"
                            ></div>
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Bottom Grid: Proposals & Revenue -->
            <div class="bottom-split">
                <div class="card proposal-card">
                    <div class="split-header">
                        <h3>Active Proposals</h3>
                        <button class="view-all">View All</button>
                    </div>
                    <div class="prop-list">
                        {#each proposals as prop}
                            <div class="prop-item">
                                <div class="prop-info">
                                    <strong>{prop.title}</strong>
                                    <span>{prop.client}</span>
                                </div>
                                <div class="prop-value">
                                    <strong>{prop.value}</strong>
                                    <span
                                        class="status-text {prop.sent
                                            ? 'sent'
                                            : ''}">{prop.status}</span
                                    >
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>

                <div class="card revenue-card">
                    <h3>Revenue Breakdown</h3>
                    <div class="chart-container">
                        <div class="bars">
                            {#each revenueData as val}
                                <div class="bar-col">
                                    <div
                                        class="bar"
                                        style="height: {val}%; background: {val ===
                                        80
                                            ? '#654dcf'
                                            : '#e9e5ff'}"
                                    ></div>
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div class="chart-footer">
                        <span>Monthly growth</span>
                        <span class="growth">+12.4%</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Sidebar -->
        <div class="content-right">
            <!-- Account Health -->
            <div class="card health-card">
                <h3>Account Health</h3>
                <div class="health-gauge">
                    <div class="gauge-box">
                        <svg viewBox="0 0 36 36" class="circular-chart purple">
                            <path
                                class="circle-bg"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                class="circle"
                                stroke-dasharray="92, 100"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="20.35" class="percentage">9.2</text>
                        </svg>
                    </div>
                    <div class="health-text">
                        <span class="health-label">EXCELLENT</span>
                        <p>High satisfaction and prompt payments.</p>
                    </div>
                </div>
                <div class="health-stats">
                    <div class="h-stat">
                        <span>Inquiry Velocity</span>
                        <strong>High</strong>
                    </div>
                    <div class="h-stat">
                        <span>Avg. Project Value</span>
                        <strong>$124k</strong>
                    </div>
                </div>
            </div>

            <!-- Key Contacts -->
            <div class="card contacts-card">
                <h3>Key Contacts</h3>
                <div class="contact-list">
                    <div class="contact-item">
                        <div class="c-avatar purple">MS</div>
                        <div class="c-info">
                            <strong>Marcus Sterling</strong>
                            <span>Chief Operations Officer</span>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="c-avatar blue">LB</div>
                        <div class="c-info">
                            <strong>Linda Blanchard</strong>
                            <span>Procurement Lead</span>
                        </div>
                    </div>
                </div>
                <button class="btn-add-contact">Add Contact</button>
            </div>

            <!-- Report Card -->
            <div class="card report-promo-card">
                <h4>Project Health Report</h4>
                <p>
                    View deep analytics on Nexus Media's project efficiency and
                    resource allocation for Q3.
                </p>
                <button class="btn-download"
                    >Download PDF <Download size={14} /></button
                >
            </div>
        </div>
    </div>
</div>

<style>
    .profile-page {
        display: flex;
        flex-direction: column;
        gap: 24px;
        background: #f8f9fc;
        margin: -24px;
        padding: 24px;
        height: calc(100vh - 64px);
        overflow-y: auto;
    }

    .profile-banner {
        font-size: 10px;
        font-weight: 800;
        color: var(--primary);
        background: #f0edff;
        padding: 4px 12px;
        border-radius: 4px;
        display: inline-block;
        width: fit-content;
    }

    .card {
        background: white;
        border-radius: 12px;
        padding: 24px;
        border: 1px solid rgba(0, 0, 0, 0.03);
    }

    /* Header Card */
    .header-card {
        padding-bottom: 0;
    }

    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 32px;
    }

    .profile-main {
        display: flex;
        gap: 24px;
    }

    .logo-box {
        width: 64px;
        height: 64px;
        background: #1a1a1a;
        border-radius: 8px;
        padding: 12px;
    }

    .logo-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .name-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 4px;
    }

    .name-row h1 {
        font-size: 24px;
        font-weight: 800;
    }

    .meta-row {
        font-size: 13px;
        color: #718096;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .details-row {
        display: flex;
        gap: 40px;
    }
    .d-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .d-item .label {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        letter-spacing: 0.5px;
    }
    .d-item .val {
        font-size: 13px;
        font-weight: 800;
        color: #1a1a1a;
    }

    .action-buttons {
        display: flex;
        gap: 12px;
    }
    .btn-outline,
    .btn-primary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
    }
    .btn-outline {
        background: #f7fafc;
        border: 1px solid #edf2f7;
        color: #1a1a1a;
    }
    .btn-primary {
        background: var(--primary);
        color: white;
    }

    .tabs {
        display: flex;
        gap: 32px;
    }
    .tab {
        padding: 16px 0;
        font-size: 13px;
        font-weight: 700;
        color: #a0aec0;
        border-bottom: 3px solid transparent;
        transition: all 0.2s;
    }
    .tab.active {
        color: var(--primary);
        border-color: var(--primary);
    }

    /* Grid Layout */
    .profile-grid {
        display: grid;
        grid-template-columns: 1fr 320px;
        gap: 32px;
    }

    .content-left {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    h3 {
        font-size: 15px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 20px;
    }

    /* Activity Timeline */
    .activity-timeline {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    .activity-item {
        display: flex;
        gap: 16px;
        align-items: flex-start;
    }
    .activity-item .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-top: 6px;
    }
    .act-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .act-content strong {
        font-size: 13px;
        font-weight: 700;
        color: #1a1a1a;
    }
    .act-meta {
        font-size: 11px;
        color: #a0aec0;
        font-weight: 600;
    }

    .section-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: -12px;
    }
    .view-all {
        font-size: 11px;
        font-weight: 700;
        color: var(--primary);
    }

    /* Projects Row */
    .projects-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    .p-card {
        border: none;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
    }
    .p-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    .p-status {
        font-size: 10px;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 4px;
    }
    .p-status.in-design {
        background: #f0edff;
        color: var(--primary);
    }
    .p-status.production {
        background: #e8fdfa;
        color: #4ecdc4;
    }
    .p-id {
        font-size: 11px;
        font-weight: 700;
        color: #cbd5e0;
    }
    .p-card h4 {
        font-size: 14px;
        font-weight: 800;
        margin-bottom: 16px;
    }

    .progress-info {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 800;
        margin-bottom: 8px;
    }
    .progress-bar-bg {
        height: 6px;
        background: #f0f4f8;
        border-radius: 3px;
    }
    .progress-bar-fill {
        height: 100%;
        border-radius: 3px;
    }

    /* Bottom Split */
    .bottom-split {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
    }
    .split-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .prop-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .prop-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .prop-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .prop-info strong {
        font-size: 13px;
        font-weight: 700;
    }
    .prop-info span {
        font-size: 11px;
        color: #a0aec0;
    }
    .prop-value {
        text-align: right;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .prop-value strong {
        font-size: 13px;
        font-weight: 800;
    }
    .status-text {
        font-size: 10px;
        font-weight: 800;
        color: #f39c12;
    }
    .status-text.sent {
        color: #4ecdc4;
    }

    /* Revenue Chart */
    .chart-container {
        height: 120px;
        display: flex;
        align-items: flex-end;
        margin-bottom: 16px;
    }
    .bars {
        display: flex;
        align-items: flex-end;
        gap: 12px;
        width: 100%;
        height: 100%;
    }
    .bar-col {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: flex-end;
    }
    .bar {
        width: 100%;
        border-radius: 4px 4px 0 0;
    }

    .chart-footer {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 700;
        color: #a0aec0;
    }
    .growth {
        color: #4ecdc4;
        font-weight: 800;
    }

    /* Right Sidebar */
    .content-right {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    /* Health Card */
    .health-gauge {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 1px solid #f7fafc;
    }
    .gauge-box {
        width: 64px;
        height: 64px;
    }
    .circular-chart {
        display: block;
        margin: 10px auto;
        max-width: 80%;
        max-height: 250px;
    }
    .circle-bg {
        fill: none;
        stroke: #f0f4f8;
        stroke-width: 3.8;
    }
    .circle {
        fill: none;
        stroke-width: 3.8;
        stroke-linecap: round;
        transition: stroke-dasharray 0.3s ease;
    }
    .circular-chart.purple .circle {
        stroke: #4ecdc4;
    }
    .percentage {
        fill: #1a1a1a;
        font-family: "Outfit";
        font-size: 10px;
        font-weight: 800;
        text-anchor: middle;
    }

    .health-label {
        font-size: 11px;
        font-weight: 800;
        color: #4ecdc4;
    }
    .health-text p {
        font-size: 12px;
        color: #718096;
        line-height: 1.4;
        margin-top: 4px;
    }

    .health-stats {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .h-stat {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
    .h-stat span {
        color: #a0aec0;
        font-weight: 600;
    }
    .h-stat strong {
        color: #1a1a1a;
        font-weight: 800;
    }

    /* Contacts Card */
    .contact-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 24px;
    }
    .contact-item {
        display: flex;
        gap: 12px;
        align-items: center;
    }
    .c-avatar {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 800;
    }
    .c-avatar.purple {
        background: #f0edff;
        color: var(--primary);
    }
    .c-avatar.blue {
        background: #e0f2fe;
        color: #0ea5e9;
    }
    .c-info {
        display: flex;
        flex-direction: column;
    }
    .c-info strong {
        font-size: 13px;
        font-weight: 700;
        color: #1a1a1a;
    }
    .c-info span {
        font-size: 11px;
        color: #a0aec0;
    }

    .btn-add-contact {
        width: 100%;
        padding: 12px;
        border: 1px solid #edf2f7;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 700;
        color: #1a1a1a;
    }

    /* Report Card */
    .report-promo-card {
        background: var(--primary);
        color: white;
        border: none;
    }
    .report-promo-card h4 {
        font-size: 14px;
        font-weight: 800;
        margin-bottom: 12px;
    }
    .report-promo-card p {
        font-size: 11px;
        opacity: 0.8;
        line-height: 1.6;
        margin-bottom: 24px;
    }
    .btn-download {
        background: white;
        color: var(--primary);
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        font-weight: 800;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
</style>
