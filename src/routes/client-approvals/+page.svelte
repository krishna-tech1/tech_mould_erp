<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import {
        CircleCheck,
        User,
        Calendar,
        Filter,
        Download,
        ChevronLeft,
        ChevronRight,
        Sparkles,
    } from "lucide-svelte";

    let approvals = $state([
        {
            project: "Quantum-V Chassis",
            stage: "Initial Prototype Approval",
            desc: "The initial mold prototype for the Quantum-V base chassis is ready for functional verification. All tolerances are within the +/- 0.05mm range as specified in Section 4.2 of the technical brief. Material used: Grade 5 Titanium Alloy.",
            user: "Marcus Thorne",
            date: "Oct 24, 2023",
            timeAgo: "2h ago",
        },
        {
            project: "Quantum-V Chassis",
            stage: "Initial Prototype Approval",
            desc: "The initial mold prototype for the Quantum-V base chassis is ready for functional verification. All tolerances are within the +/- 0.05mm range as specified in Section 4.2 of the technical brief. Material used: Grade 5 Titanium Alloy.",
            user: "Marcus Thorne",
            date: "Oct 24, 2023",
            timeAgo: "2h ago",
        },
        {
            project: "Quantum-V Chassis",
            stage: "Initial Prototype Approval",
            desc: "The initial mold prototype for the Quantum-V base chassis is ready for functional verification. All tolerances are within the +/- 0.05mm range as specified in Section 4.2 of the technical brief. Material used: Grade 5 Titanium Alloy.",
            user: "Marcus Thorne",
            date: "Oct 24, 2023",
            timeAgo: "2h ago",
        },
    ]);
</script>

<svelte:head>
    <title>Approvals | TechMould Client Portal</title>
</svelte:head>

<div class="client-approvals-page" in:fade>
    <!-- Pending Badge -->
    <div class="pending-overview">
        <div class="badge-spark">
            <Sparkles size={14} /> ACTION REQUIRED: 4 PENDING
        </div>
    </div>

    <!-- Header Section -->
    <div class="page-header">
        <div class="header-left">
            <h1>Executive Approvals</h1>
            <p>
                Review and authorize project stages, materials, and technical
                drawings for your ongoing TechMould manufacturing projects.
            </p>
        </div>
        <div class="header-right">
            <button class="btn-util"
                ><Filter size={16} /> Filter Portfolio</button
            >
            <button class="btn-util"><Download size={16} /> Export Logs</button>
        </div>
    </div>

    <!-- Approvals List -->
    <div class="approvals-stack">
        {#each approvals as app, i}
            <div
                class="approval-card glass-hover"
                in:fly={{ y: 30, delay: i * 150 }}
            >
                <div class="card-left">
                    <div class="card-info">
                        <h2>Project: {app.project}</h2>
                        <span class="stage-tag"
                            >STAGE: {app.stage.toUpperCase()}</span
                        >
                        <p class="desc">{app.desc}</p>
                    </div>

                    <div class="card-meta">
                        <div class="meta-item">
                            <User size={14} /> <span>{app.user}</span>
                        </div>
                        <div class="meta-item">
                            <Calendar size={14} /> <span>{app.date}</span>
                        </div>
                    </div>
                </div>

                <div class="card-right">
                    <div class="time-stamp">Submitted {app.timeAgo}</div>
                    <div class="action-flex">
                        <button class="btn-approve">Authorize Stage</button>
                        <button class="btn-request">Request Information</button>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <!-- Footer Stats & Pagination -->
    <div class="page-footer">
        <div class="footer-stats">
            <div class="stat">
                <strong>94.8%</strong><span>Approval Velocity</span>
            </div>
            <div class="stat">
                <strong>1.22d</strong><span>Latency Avg</span>
            </div>
        </div>

        <div class="pagination">
            <button class="page-btn"><ChevronLeft size={16} /></button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn"><ChevronRight size={16} /></button>
        </div>
    </div>
</div>

<style>
    .client-approvals-page {
        display: flex;
        flex-direction: column;
        gap: 32px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .badge-spark {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #654dcf10;
        color: #654dcf;
        padding: 10px 20px;
        border-radius: 40px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.8px;
        border: 1px solid #654dcf20;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .header-left h1 {
        font-size: 32px;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 8px;
    }
    .header-left p {
        font-size: 15px;
        color: #64748b;
        line-height: 1.6;
        max-width: 580px;
    }
    .header-right {
        display: flex;
        gap: 16px;
    }

    .btn-util {
        display: flex;
        align-items: center;
        gap: 8px;
        background: white;
        border: 1px solid #f1f5f9;
        padding: 12px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 700;
        color: #475569;
        transition: all 0.2s;
    }
    .btn-util:hover {
        border-color: #654dcf;
        color: #654dcf;
    }

    .approvals-stack {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    .approval-card {
        background: white;
        border: 1px solid #f1f5f9;
        border-radius: 32px;
        padding: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glass-hover:hover {
        transform: translateY(-4px);
        border-color: #654dcf;
        box-shadow: 0 20px 40px rgba(101, 77, 207, 0.05);
    }

    .card-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .card-info h2 {
        font-size: 22px;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 10px;
    }
    .stage-tag {
        font-size: 12px;
        font-weight: 900;
        color: #654dcf;
        letter-spacing: 1px;
        display: block;
        margin-bottom: 16px;
    }
    .desc {
        font-size: 15px;
        color: #475569;
        line-height: 1.7;
        max-width: 600px;
    }
    .card-meta {
        display: flex;
        gap: 32px;
    }
    .meta-item {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #654dcf;
        font-size: 14px;
        font-weight: 700;
    }

    .card-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 32px;
    }
    .time-stamp {
        background: #f8fafc;
        color: #94a3b8;
        padding: 8px 18px;
        border-radius: 40px;
        font-size: 11px;
        font-weight: 700;
    }

    .action-flex {
        display: flex;
        gap: 14px;
    }
    .btn-approve {
        background: #654dcf;
        color: white;
        padding: 18px 48px;
        border-radius: 14px;
        font-size: 14px;
        font-weight: 800;
        box-shadow: 0 10px 20px rgba(101, 77, 207, 0.2);
        transition: all 0.3s;
    }
    .btn-approve:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 30px rgba(101, 77, 207, 0.3);
    }
    .btn-request {
        background: white;
        color: #0f172a;
        border: 1px solid #e2e8f0;
        padding: 18px 24px;
        border-radius: 14px;
        font-size: 14px;
        font-weight: 800;
    }

    .page-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 48px;
        border-top: 1px solid #f1f5f9;
    }
    .footer-stats {
        display: flex;
        gap: 48px;
    }
    .stat {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .stat strong {
        font-size: 22px;
        font-weight: 800;
        color: #0f172a;
    }
    .stat span {
        font-size: 13px;
        font-weight: 700;
        color: #94a3b8;
    }

    .pagination {
        display: flex;
        gap: 10px;
    }
    .page-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 700;
        color: #64748b;
    }
    .page-btn.active {
        background: #654dcf;
        color: white;
        border-color: #654dcf;
    }
</style>
