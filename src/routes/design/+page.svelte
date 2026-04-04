<script lang="ts">
    import {
        Upload,
        Share2,
        FileText,
        User,
        Calendar,
        Clock,
        CircleCheck,
        XCircle,
        ChevronRight,
        Search,
        BarChart3,
        Box,
    } from "lucide-svelte";

    const revisions = [
        {
            version: "v2.3",
            label: "(Current)",
            date: "TODAY",
            note: "Core wall thickness adjustment & cooling line rework.",
            owner: "Julian Thorne",
            status: "PENDING",
            statusColor: "#654dcf",
            active: true,
        },
        {
            version: "v2.2",
            label: "",
            date: "OCT 20",
            note: "Secondary cavity alignment updates.",
            owner: "Sarah Chen",
            status: "APPROVED",
            statusColor: "#4ecdc4",
        },
        {
            version: "v2.1",
            label: "",
            date: "OCT 15",
            note: "Initial injection nozzle placement test.",
            owner: "Julian Thorne",
            status: "REJECTED",
            statusColor: "#e74c3c",
        },
        {
            version: "v1.0",
            label: "",
            date: "SEP 28",
            note: "Base blueprint architecture.",
            owner: "Marcus V.",
            status: "ARCHIVED",
            statusColor: "#4ecdc4",
        },
    ];

    const specs = [
        "Core wall thickness increased by 0.5mm to address thermal expansion concerns reported during simulation stress tests.",
        "Revised venting channels to prevent air trapping in the secondary cavity quadrants.",
        "Surface finish updated to SPI-A2 for high-gloss requirements on the final plastic component.",
    ];
</script>

<svelte:head>
    <title>Design & Revision | TechMould ERP</title>
</svelte:head>

<div class="design-page">
    <!-- Header -->
    <div class="page-header">
        <div class="header-left">
            <div class="breadcrumb">
                <a href="/projects" class="link">PROJECTS</a>
                <ChevronRight size={14} />
                <span class="active">INDUSTRIAL MOLD PX-400</span>
            </div>
            <h1>Design & Revision</h1>
            <p>
                Review the latest blueprint iterations, manage technical
                specifications, and oversee the version control for precision
                engineering components.
            </p>
        </div>
        <div class="header-actions">
            <button class="btn-outline"
                ><Share2 size={16} /> Share Design</button
            >
            <button class="btn-primary"
                ><Upload size={16} /> Upload New Design</button
            >
        </div>
    </div>

    <!-- Drag and Drop Area -->
    <div class="upload-zone">
        <div class="zone-content">
            <div class="upload-icon">
                <Upload size={20} color="#654dcf" />
            </div>
            <h3>Drag and drop engineering files here</h3>
            <p>Support for .STP, .DWG, .PDF up to 500MB</p>
        </div>
    </div>

    <div class="main-layout">
        <!-- Left Column: Current Design -->
        <div class="design-details">
            <div class="card current-file-card">
                <div class="file-display">
                    <div class="file-preview-placeholder"></div>
                    <div class="file-info-main">
                        <div class="title-row">
                            <h3>MOLD- PX400- MAIN- V2.3.dwg</h3>
                            <span class="badge-latest">LATEST</span>
                        </div>
                        <div class="file-stats">
                            <div class="stat">
                                <FileText size={14} /> Size: 42.8 MB
                            </div>
                            <div class="stat">
                                <User size={14} /> Owner: Julian Thorne
                            </div>
                            <div class="stat">
                                <Calendar size={14} /> Modified: Oct 24, 2023
                            </div>
                            <div class="stat">
                                <Clock size={14} /> Time: 14:22 GMT
                            </div>
                        </div>
                    </div>
                    <div class="file-actions">
                        <button class="btn-approve">Approved</button>
                        <button class="btn-reject">Reject</button>
                    </div>
                </div>

                <div class="divider"></div>

                <div class="specs-section">
                    <div class="specs-header">
                        <h3>Design Specifications & Notes</h3>
                        <button class="edit-btn">Edit Notes</button>
                    </div>
                    <div class="specs-list">
                        {#each specs as spec, i}
                            <div class="spec-item">
                                <span class="num">0{i + 1}.</span>
                                <p>{spec}</p>
                            </div>
                        {/each}
                    </div>
                    <div class="review-status">
                        <div class="avatars">
                            <div class="avatar"></div>
                            <div class="avatar"></div>
                            <div class="avatar-plus">+4</div>
                        </div>
                        <span class="status-text"
                            >REVIEWED BY ENGINEERING TEAM</span
                        >
                    </div>
                </div>
            </div>

            <div class="bottom-cols">
                <div class="analysis-card">
                    <div class="icon-box purple"><BarChart3 size={18} /></div>
                    <h3>Simulated Stress Profile</h3>
                    <p>
                        Latest FEA analysis shows 98.4% structural integrity
                        under max pressure.
                    </p>
                    <a href="/reports" class="link">View Analysis Report →</a>
                </div>
                <div class="analysis-card">
                    <div class="icon-box blue"><Box size={18} /></div>
                    <h3>Material Compatibility</h3>
                    <p>
                        Current mold design optimized for P20 Tool Steel with
                        hard chrome plating.
                    </p>
                    <a href="/inventory" class="link">Check Inventory →</a>
                </div>
            </div>
        </div>

        <!-- Right Column: Timeline -->
        <aside class="timeline-side">
            <div class="card timeline-card">
                <div class="card-header">
                    <h3>Version Timeline</h3>
                    <span class="rev-badge">5 REVISIONS</span>
                </div>
                <div class="timeline-list">
                    {#each revisions as rev}
                        <div class="timeline-item {rev.active ? 'active' : ''}">
                            <div class="rev-header">
                                <div
                                    class="dot"
                                    style="background: {rev.statusColor}"
                                ></div>
                                <span class="version"
                                    ><strong>{rev.version}</strong>
                                    {rev.label}</span
                                >
                                <span class="date">{rev.date}</span>
                            </div>
                            <p class="note">{rev.note}</p>
                            <div class="rev-footer">
                                <span class="owner">{rev.owner}</span>
                                <span
                                    class="status"
                                    style="background: {rev.statusColor}15; color: {rev.statusColor}"
                                    >{rev.status}</span
                                >
                            </div>
                        </div>
                    {/each}
                </div>
                <button class="btn-history">View Complete History</button>
            </div>
        </aside>
    </div>
</div>

<style>
    .design-page {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    /* Header */
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
        margin-bottom: 20px;
    }

    .breadcrumb .link {
        color: #a0aec0;
    }
    .breadcrumb .active {
        color: var(--primary);
    }

    .header-left h1 {
        font-size: 24px;
        font-weight: 800;
        color: #1a1a1a;
    }

    .header-left p {
        font-size: 14px;
        color: var(--text-sub);
        max-width: 600px;
    }

    .header-actions {
        display: flex;
        gap: 12px;
    }

    .btn-outline,
    .btn-primary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
    }

    .btn-outline {
        background: white;
        border: 1px solid var(--border);
        color: var(--primary);
    }

    .btn-primary {
        background: var(--primary);
        color: white;
    }

    /* Upload Zone */
    .upload-zone {
        background: white;
        border: 2px dashed #e2e8f0;
        border-radius: 12px;
        padding: 40px;
        text-align: center;
        transition: all 0.2s;
    }

    .upload-zone:hover {
        border-color: var(--primary);
        background: #f8faff;
    }

    .zone-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .upload-icon {
        width: 44px;
        height: 44px;
        background: #f0edff;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
    }

    .zone-content h3 {
        font-size: 15px;
        font-weight: 800;
    }
    .zone-content p {
        font-size: 12px;
        color: #a0aec0;
        font-weight: 600;
    }

    /* Main Layout */
    .main-layout {
        display: flex;
        gap: 32px;
    }

    .design-details {
        flex: 3;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .timeline-side {
        flex: 1.2;
    }

    .card {
        background: white;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.03);
        padding: 24px;
    }

    /* Current File Card */
    .file-display {
        display: flex;
        gap: 24px;
        align-items: center;
    }

    .file-preview-placeholder {
        width: 110px;
        height: 110px;
        background: #f1f3f7;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
    }

    .file-preview-placeholder::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            45deg,
            transparent 40%,
            rgba(0, 0, 0, 0.02) 50%,
            transparent 60%
        );
        background-size: 200% 200%;
        animation: placeholderShimmer 3s infinite linear;
    }

    @keyframes placeholderShimmer {
        0% {
            background-position: 150% 150%;
        }
        100% {
            background-position: -50% -50%;
        }
    }

    .file-info-main {
        flex: 1;
    }

    .title-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
    }

    .title-row h3 {
        font-size: 16px;
        font-weight: 800;
    }

    .badge-latest {
        background: #e8fdfa;
        color: #4ecdc4;
        font-size: 10px;
        font-weight: 800;
        padding: 2px 8px;
        border-radius: 4px;
    }

    .file-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .stat {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        font-weight: 600;
        color: #718096;
    }

    .file-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .btn-approve,
    .btn-reject {
        width: 120px;
        padding: 10px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 700;
        color: white;
    }

    .btn-approve {
        background: #00b894;
    }
    .btn-reject {
        background: #d63031;
    }

    .divider {
        height: 1px;
        background: #edf2f7;
        margin: 24px 0;
    }

    /* Specs */
    .specs-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .specs-header h3 {
        font-size: 14px;
        font-weight: 800;
    }
    .edit-btn {
        color: var(--primary);
        font-size: 12px;
        font-weight: 700;
    }

    .specs-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
    }

    .spec-item {
        display: flex;
        gap: 12px;
    }

    .spec-item .num {
        font-size: 12px;
        font-weight: 800;
        color: var(--primary);
    }

    .spec-item p {
        font-size: 12px;
        font-weight: 600;
        color: #4a5568;
        line-height: 1.5;
    }

    .review-status {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .avatars {
        display: flex;
        align-items: center;
    }

    .avatar,
    .avatar-plus {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #edf2f7;
        border: 2px solid white;
        margin-left: -8px;
    }

    .avatar:first-child {
        margin-left: 0;
    }

    .avatar-plus {
        background: #e9e5ff;
        color: var(--primary);
        font-size: 8px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .status-text {
        font-size: 10px;
        font-weight: 800;
        color: #cbd5e0;
        letter-spacing: 0.5px;
    }

    /* Bottom Cards */
    .bottom-cols {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
    }

    .analysis-card {
        background: #f7fafc;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.02);
    }

    .icon-box {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
    }

    .icon-box.purple {
        background: #e9e5ff;
        color: var(--primary);
    }
    .icon-box.blue {
        background: #e0f2fe;
        color: #0ea5e9;
    }

    .analysis-card h3 {
        font-size: 14px;
        font-weight: 800;
        margin-bottom: 8px;
    }
    .analysis-card p {
        font-size: 11px;
        font-weight: 600;
        color: #718096;
        margin-bottom: 16px;
        line-height: 1.5;
    }
    .analysis-card .link {
        font-size: 11px;
        font-weight: 700;
        color: var(--primary);
    }

    /* Timeline */
    .timeline-card .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .rev-badge {
        background: #f1f3f7;
        color: #4a5568;
        font-size: 10px;
        font-weight: 800;
        padding: 2px 8px;
        border-radius: 4px;
    }

    .timeline-list {
        display: flex;
        flex-direction: column;
        gap: 32px;
        position: relative;
        padding-left: 8px;
    }

    .timeline-list::before {
        content: "";
        position: absolute;
        left: 10px;
        top: 10px;
        bottom: 10px;
        width: 1px;
        background: #edf2f7;
    }

    .timeline-item {
        position: relative;
        padding-left: 24px;
    }

    .rev-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
    }

    .timeline-item .dot {
        position: absolute;
        left: 6px;
        top: 4px;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        border: 2px solid white;
        z-index: 2;
    }

    .timeline-item.active .dot {
        outline: 2px solid #e9e5ff;
    }

    .version {
        font-size: 13px;
        color: #4a5568;
    }
    .date {
        margin-left: auto;
        font-size: 10px;
        font-weight: 800;
        color: #cbd5e0;
    }

    .note {
        font-size: 11px;
        font-weight: 600;
        color: #718096;
        line-height: 1.5;
        margin-bottom: 12px;
    }

    .rev-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .owner {
        font-size: 11px;
        font-weight: 800;
        color: #1a1a1a;
    }
    .status {
        font-size: 9px;
        font-weight: 800;
        padding: 2px 8px;
        border-radius: 4px;
    }

    .btn-history {
        width: 100%;
        margin-top: 32px;
        padding: 12px;
        border: 1px solid #edf2f7;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 700;
        color: var(--primary);
    }
</style>
