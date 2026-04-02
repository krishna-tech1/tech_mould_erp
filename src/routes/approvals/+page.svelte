<script lang="ts">
    import { 
        CheckCircle2, 
        XCircle, 
        Clock, 
        FileText, 
        Palette, 
        ArrowRightLeft, 
        TrendingUp,
        AlertCircle,
        User,
        MessageSquare,
        MoreVertical
    } from "lucide-svelte";
    import { fade, fly, slide } from "svelte/transition";

    let quotations = $state([
        {
            id: "Q-8829",
            client: "Global Logistics",
            amount: "$42,500.00",
            terms: "Standard Terms",
            note: ""
        },
        {
            id: "Q-8831",
            client: "TechFlow Systems",
            amount: "$112,000.00",
            terms: "Enterprise Tier",
            note: ""
        }
    ]);

    let designs = $state([
        {
            id: "Mould-V4",
            name: "Mould-V4 Refinement",
            designer: "Sarah K.",
            feedback: "",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400"
        }
    ]);

    let transitions = $state([
        {
            project: "Crimson Sky",
            from: "Prototyping",
            to: "Manufacturing",
            flag: "System flag: Inventory levels for high-grade resin are below threshold for this transition.",
            auth: ""
        }
    ]);
</script>

<svelte:head>
    <title>Approvals Hub | TechMould ERP</title>
</svelte:head>

<div class="approvals-page">
    <!-- Header -->
    <div class="page-header">
        <div class="header-left">
            <h1>Approvals Hub</h1>
            <p>Review and authorize pending business requests across all departments.</p>
        </div>
        <div class="header-right">
            <div class="summary-badge">
                <Clock size={14} />
                <span>4 PENDING TASKS</span>
            </div>
        </div>
    </div>

    <!-- Main Grid -->
    <div class="approvals-grid">
        
        <!-- Quotations Column -->
        <div class="approval-column">
            <div class="column-header">
                <h3>Quotations</h3>
                <span class="count-pill">2 PENDING</span>
            </div>
            
            <div class="cards-stack">
                {#each quotations as q}
                    <div class="approval-card card" in:fly={{ y: 20 }}>
                        <div class="card-top">
                            <div class="q-info">
                                <strong>{q.id} {q.client}</strong>
                                <span>{q.amount} • {q.terms}</span>
                            </div>
                            <FileText size={18} color="#cbd5e0" />
                        </div>

                        <div class="input-field">
                            <label>Internal Comment</label>
                            <input type="text" placeholder="Add optional note..." bind:value={q.note} />
                        </div>

                        <div class="card-actions">
                            <button class="btn-approve">Approve</button>
                            <button class="btn-reject">Reject</button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Design Column -->
        <div class="approval-column">
            <div class="column-header">
                <h3>Design</h3>
                <span class="count-pill">1 PENDING</span>
            </div>

            <div class="cards-stack">
                {#each designs as d}
                    <div class="approval-card card" in:fly={{ y: 20, delay: 100 }}>
                        <div class="design-preview">
                            <img src={d.image} alt={d.name} />
                            <div class="preview-overlay">
                                <Palette size={20} />
                            </div>
                        </div>
                        
                        <div class="card-content">
                            <div class="d-title">
                                <strong>{d.name}</strong>
                                <span>Lead Designer: {d.designer}</span>
                            </div>

                            <div class="input-field">
                                <label>Review Feedback</label>
                                <textarea placeholder="Describe changes needed or praise..." bind:value={d.feedback}></textarea>
                            </div>

                            <div class="card-actions">
                                <button class="btn-approve">Approve</button>
                                <button class="btn-reject">Reject</button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Stage Transitions Column -->
        <div class="approval-column">
            <div class="column-header">
                <h3>Stage Transitions</h3>
                <span class="count-pill">1 PENDING</span>
            </div>

            <div class="cards-stack">
                {#each transitions as t}
                    <div class="transition-card card" in:fly={{ y: 20, delay: 200 }}>
                        <div class="t-top">
                            <div class="t-title">
                                <strong>Project: {t.project}</strong>
                                <span class="path">{t.from} <ArrowRightLeft size={12} /> {t.to}</span>
                            </div>
                            <AlertCircle size={20} color="#f6ad55" />
                        </div>

                        <div class="flag-box">
                            <p>{t.flag}</p>
                        </div>

                        <div class="input-field">
                            <label>Override Authorization</label>
                            <input type="text" placeholder="Manager ID or Comment..." bind:value={t.auth} />
                        </div>

                        <div class="card-actions">
                            <button class="btn-proceed">Proceed</button>
                            <button class="btn-hold">Hold</button>
                        </div>
                    </div>
                {/each}

                <!-- Efficiency Stat -->
                <div class="stat-card" in:fly={{ y: 20, delay: 300 }}>
                    <div class="stat-header">
                        <TrendingUp size={18} />
                        <span>Approval Efficiency</span>
                    </div>
                    <div class="stat-body">
                        <span class="value">1.4 Days</span>
                        <p>Average decision time this week, <strong>12% faster</strong> than last period.</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<style>
    .approvals-page {
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding-bottom: 40px;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-left h1 {
        font-size: 26px;
        font-weight: 800;
        margin-bottom: 4px;
    }

    .header-left p {
        font-size: 14px;
        color: #718096;
    }

    .summary-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #f0edff;
        color: var(--primary);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.5px;
    }

    /* Grid System */
    .approvals-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 32px;
        align-items: start;
    }

    .approval-column {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .column-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4px;
    }

    .column-header h3 {
        font-size: 18px;
        font-weight: 800;
        color: #1a202c;
    }

    .count-pill {
        background: #f0edff;
        color: var(--primary);
        font-size: 10px;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 6px;
        letter-spacing: 0.5px;
    }

    .cards-stack {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    /* Card Styling */
    .card {
        background: white;
        border: 1px solid #edf2f7;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.04);
    }

    .approval-card {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .q-info strong {
        display: block;
        font-size: 15px;
        color: #2d3748;
    }

    .q-info span {
        font-size: 12px;
        color: #718096;
        font-weight: 500;
    }

    .input-field {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .input-field label {
        font-size: 11px;
        font-weight: 700;
        color: #a0aec0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .input-field input, .input-field textarea {
        background: #f4f7fa;
        border: 1px solid transparent;
        padding: 12px 16px;
        border-radius: 10px;
        font-size: 13px;
        font-family: inherit;
        color: #4a5568;
        outline: none;
        transition: all 0.2s;
    }

    .input-field textarea {
        min-height: 80px;
        resize: vertical;
    }

    .input-field input:focus, .input-field textarea:focus {
        background: white;
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(101, 77, 207, 0.1);
    }

    .card-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .btn-approve, .btn-reject, .btn-proceed, .btn-hold {
        padding: 12px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 800;
        transition: all 0.2s;
    }

    .btn-approve, .btn-proceed {
        background: #009c5b;
        color: white;
    }

    .btn-approve:hover, .btn-proceed:hover {
        background: #00814b;
        box-shadow: 0 4px 12px rgba(0, 156, 91, 0.2);
    }

    .btn-reject, .btn-hold {
        background: #ffe4e4;
        color: #e53e3e;
    }

    .btn-reject:hover, .btn-hold:hover {
        background: #fed7d7;
    }

    /* Design Specific */
    .design-preview {
        height: 180px;
        position: relative;
    }

    .design-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .preview-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        opacity: 0;
        transition: opacity 0.2s;
    }

    .design-preview:hover .preview-overlay {
        opacity: 1;
    }

    .card-content {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .d-title strong {
        display: block;
        font-size: 15px;
        color: #2d3748;
    }

    .d-title span {
        font-size: 12px;
        color: #718096;
        font-weight: 500;
    }

    /* Transition Specific */
    .transition-card {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border-left: 4px solid #f6ad55;
    }

    .t-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .path {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #718096;
        font-weight: 600;
        margin-top: 4px;
    }

    .flag-box {
        background: #fffaf0;
        border: 1px solid #fbd38d;
        padding: 12px;
        border-radius: 10px;
    }

    .flag-box p {
        font-size: 12px;
        color: #9c4221;
        line-height: 1.5;
        font-weight: 500;
    }

    /* Stat Card */
    .stat-card {
        background: #e6fffa;
        border: 1px solid #b2f5ea;
        border-radius: 16px;
        padding: 24px;
    }

    .stat-header {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #2c7a7b;
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 20px;
    }

    .stat-body .value {
        font-size: 32px;
        font-weight: 800;
        color: #234e52;
        display: block;
        margin-bottom: 8px;
    }

    .stat-body p {
        font-size: 12px;
        color: #285e61;
        line-height: 1.6;
        font-weight: 500;
    }

    .stat-body strong {
        color: #2c7a7b;
    }

    /* Responsive */
    @media (max-width: 1200px) {
        .approvals-grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 800px) {
        .approvals-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
