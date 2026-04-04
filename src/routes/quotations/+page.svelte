<script lang="ts">
    import { fade, fly, scale } from "svelte/transition";
    import { 
        Plus, 
        Filter, 
        ChevronRight, 
        CheckCircle2, 
        XCircle, 
        Clock, 
        FileText,
        Info,
        ShieldCheck,
        MessageSquare
    } from "lucide-svelte";

    let quotations = $state([
        { id: "#QT-88219", name: "High-Precision Turbine Housing", status: "PENDING", amount: "$14,250.00", date: "Oct 24, 2023", active: true },
        { id: "#QT-88104", name: "Industrial Fan Blade V3", status: "APPROVED", amount: "$8,900.00", date: "Oct 18, 2023", active: false },
        { id: "#QT-87955", name: "Custom Engine Bracket", status: "REJECTED", amount: "$4,120.00", date: "Oct 12, 2023", active: false },
        { id: "#QT-87912", name: "Conveyor Belt Guide Rails", status: "PENDING", amount: "$12,400.00", date: "Oct 05, 2023", active: false }
    ]);

    let selectedQuotation = $state({
        id: "#QT-88219",
        project: "High-Precision Turbine Housing",
        breakdown: [
            { label: "Material Cost (Grade 5 Titanium)", value: "$5,400.00" },
            { label: "Production (CNC Machining & QA)", value: "$6,800.00" },
            { label: "Logistics (Express Air Cargo)", value: "$1,150.00" },
            { label: "Tax (Standard 15%)", value: "$900.00" }
        ],
        total: "$14,250.00",
        validity: "15 days"
    });

    function getStatusClass(status: string) {
        return status.toLowerCase();
    }
</script>

<svelte:head>
    <title>Quotations | TechMould Client Portal</title>
</svelte:head>

<div class="quotations-page" in:fade>
    <!-- Page Header -->
    <div class="quo-header">
        <h1>Recent Quotations</h1>
        <div class="quo-filters">
            <div class="filter-group">
                <button class="status-btn active">All Status</button>
            </div>
            <button class="btn-filter"><Filter size={16} /> Filter</button>
        </div>
    </div>

    <div class="quo-workspace">
        <!-- Scrollable Quotation List -->
        <div class="quo-list">
            {#each quotations as q, i}
                <div class="quo-card" class:active={q.active} in:fly={{ y: 20, delay: i * 100 }}>
                    <div class="card-left">
                        <span class="q-id">{q.id}</span>
                        <h3>{q.name}</h3>
                        <div class="card-meta">
                            <div class="meta-item"><span class="label">AMOUNT</span><span>{q.amount}</span></div>
                            <div class="meta-item"><span class="label">DATE ISSUED</span><span>{q.date}</span></div>
                        </div>
                    </div>
                    <div class="card-right">
                        <span class="q-status {getStatusClass(q.status)}">{q.status}</span>
                        <button class="view-link">View details <ChevronRight size={14} /></button>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Sticky Summary Column -->
        <div class="quo-detail-column">
            <div class="summary-card card-premium" in:fly={{ x: 20 }}>
                <div class="summary-header">
                    <div class="s-head-icon"><FileText size={18} color="#654dcf" /></div>
                    <span class="label">QUOTATION DETAIL</span>
                </div>

                <div class="summary-info">
                    <h2>{selectedQuotation.id} Summary</h2>
                    <span class="project-hint">Project: {selectedQuotation.project}</span>
                </div>

                <div class="cost-breakdown">
                    <h4>Cost Breakdown</h4>
                    {#each selectedQuotation.breakdown as b}
                        <div class="br-row">
                            <span>{b.label}</span>
                            <strong>{b.value}</strong>
                        </div>
                    {/each}
                </div>

                <div class="total-row">
                    <span>Total Amount</span>
                    <strong class="total-v">{selectedQuotation.total}</strong>
                </div>

                <div class="validity-box">
                    <Info size={18} color="#64748b" />
                    <p>This quotation is valid for {selectedQuotation.validity}. Prices include standard quality certification and 12-month manufacturing warranty.</p>
                </div>

                <div class="summary-actions">
                    <button class="btn-approve">
                        <CheckCircle2 size={18} /> Approve Quotation
                    </button>
                    <button class="btn-revision">
                        <XCircle size={18} /> Request Revision
                    </button>
                </div>
            </div>

            <!-- Help Banner -->
            <div class="help-banner" in:fly={{ y: 20, delay: 300 }}>
                <div class="h-text">
                    <strong>Need help with this quote?</strong>
                    <span>Talk to your account executive</span>
                </div>
                <button class="btn-contact">Contact Us</button>
            </div>
        </div>
    </div>
</div>

<style>
    .quotations-page { display: flex; flex-direction: column; gap: 32px; }

    .quo-header { display: flex; justify-content: space-between; align-items: center; }
    .quo-header h1 { font-size: 24px; font-weight: 800; color: #0f172a; }

    .quo-filters { display: flex; gap: 16px; }
    .status-btn { background: #f1f5f9; padding: 10px 24px; border-radius: 40px; font-size: 13px; font-weight: 800; color: #475569; }
    .status-btn.active { background: #1e1e1e; color: white; }
    .btn-filter { background: #654dcf; color: white; padding: 10px 24px; border-radius: 40px; font-size: 13px; font-weight: 800; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(101, 77, 207, 0.2); }

    .quo-workspace { display: grid; grid-template-columns: 1fr 420px; gap: 40px; align-items: start; }

    .quo-list { display: flex; flex-direction: column; gap: 20px; }
    .quo-card { background: white; border: 1px solid #f1f5f9; border-radius: 24px; padding: 40px; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
    .quo-card.active { border-color: #654dcf30; box-shadow: 0 20px 40px rgba(101, 77, 207, 0.04); background: rgba(101, 77, 207, 0.01); }
    .quo-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.03); }

    .card-left .q-id { font-size: 11px; font-weight: 800; color: #654dcf; letter-spacing: 0.5px; display: block; margin-bottom: 8px; }
    .card-left h3 { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 24px; }
    .card-meta { display: flex; gap: 32px; }
    .meta-item .label { display: block; font-size: 10px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; margin-bottom: 6px; }
    .meta-item span { font-size: 15px; font-weight: 800; color: #1e293b; }

    .card-right { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 40px; }
    .q-status { font-size: 11px; font-weight: 900; padding: 6px 14px; border-radius: 10px; letter-spacing: 0.5px; }
    .q-status.pending { background: #fffbeb; color: #d97706; }
    .q-status.approved { background: #ecfdf5; color: #10b981; }
    .q-status.rejected { background: #fef2f2; color: #ef4444; }

    .view-link { color: #654dcf; font-size: 14px; font-weight: 800; display: flex; align-items: center; gap: 6px; }

    /* Summary Card Styles */
    .summary-card { background: white; border: 1px solid #f1f5f9; border-radius: 32px; padding: 48px; box-shadow: 0 40px 100px rgba(0,0,0,0.03); }
    .summary-header { display: flex; align-items: center; gap: 14px; margin-bottom: 32px; }
    .s-head-icon { width: 36px; height: 36px; background: #f5f3ff; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
    .summary-header .label { font-size: 11px; font-weight: 800; color: #654dcf; letter-spacing: 1.5px; }

    .summary-info h2 { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
    .project-hint { font-size: 13px; font-weight: 600; color: #64748b; display: block; margin-bottom: 48px; }

    .cost-breakdown h4 { font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 24px; }
    .br-row { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 14px; }
    .br-row span { color: #64748b; font-weight: 600; }
    .br-row strong { color: #1e293b; font-weight: 800; }

    .total-row { display: flex; justify-content: space-between; align-items: baseline; margin-top: 32px; padding-top: 32px; border-top: 1px solid #f8fafc; }
    .total-row span { font-size: 16px; font-weight: 800; color: #0f172a; }
    .total-v { font-size: 28px; font-weight: 800; color: #654dcf; }

    .validity-box { background: #f8fafc; padding: 24px; border-radius: 16px; display: flex; gap: 16px; margin: 40px 0; border: 1px solid #f1f5f9; }
    .validity-box p { font-size: 13px; color: #64748b; line-height: 1.6; font-weight: 600; }

    .summary-actions { display: flex; flex-direction: column; gap: 12px; }
    .btn-approve { background: #654dcf; color: white; width: 100%; padding: 18px; border-radius: 14px; font-weight: 800; font-size: 15px; border: none; display: flex; align-items: center; justify-content: center; gap: 12px; box-shadow: 0 10px 20px rgba(101, 77, 207, 0.2); transition: all 0.3s; }
    .btn-approve:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(101, 77, 207, 0.3); }

    .btn-revision { background: white; color: #1e293b; border: 1px solid #e2e8f0; width: 100%; padding: 18px; border-radius: 14px; font-weight: 800; font-size: 15px; display: flex; align-items: center; justify-content: center; gap: 12px; transition: all 0.2s; }
    .btn-revision:hover { background: #f8fafc; }

    .help-banner { background: #654dcf; margin-top: 24px; border-radius: 20px; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center; color: white; box-shadow: 0 20px 40px rgba(101, 77, 207, 0.2); }
    .h-text strong { display: block; font-size: 15px; margin-bottom: 2px; }
    .h-text span { font-size: 12px; opacity: 0.8; font-weight: 600; }
    .btn-contact { background: rgba(255,255,255,0.2); color: white; border: none; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 0.2s; }
    .btn-contact:hover { background: rgba(255,255,255,0.3); }

    @media (max-width: 1200px) {
        .quo-workspace { grid-template-columns: 1fr; }
    }
</style>
