<script lang="ts">
    import {
        Search,
        ChevronDown,
        Plus,
        Send,
        RefreshCcw,
        XCircle,
        ChevronRight,
        CircleStop,
        Clock,
        CircleCheck,
        Check,
    } from "lucide-svelte";

    let inquiries = $state([
        {
            id: "Q-88218",
            client: "Nexus Automotive Systems",
            req: "Custom Engine Block Mold - Rev A",
            date: "Oct 24, 2023",
            status: "PENDING",
            estimate: "$12,450.00",
            color: "#f39c12",
            active: false,
        },
        {
            id: "Q-88219",
            client: "Quantum Medical Corp",
            req: "High-Precision Surgical Casing",
            date: "Oct 22, 2023",
            status: "IN",
            estimate: "$48,200.00",
            color: "#654dcf",
            active: true,
        },
        {
            id: "Q-88220",
            client: "AeroSpace Dynamics",
            req: "Turbine Blade Casting Pattern",
            date: "Oct 20, 2023",
            status: "QUOTED",
            estimate: "$84,100.00",
            color: "#4ecdc4",
            active: false,
        },
        {
            id: "Q-88221",
            client: "Global Robotics Ltd",
            req: "Armature Housing Mold v3",
            date: "Oct 18, 2023",
            status: "APPROVED",
            estimate: "$15,900.00",
            color: "#4ecdc4",
            active: false,
        },
    ]);

    const steps = ["DISCOVERY", "ESTIMATION", "REVIEW", "FINALIZED"];
    let currentStep = "ESTIMATION";

    const lineItems = [
        { name: "Tooling & Die Design", value: "$12,500.00" },
        { name: "Material Sourcing", value: "$18,200.00" },
        { name: "Production (1200 units)", value: "$15,500.00" },
    ];
</script>

<svelte:head>
    <title>Inquiry & Quotation | TechMould ERP</title>
</svelte:head>

<div class="inquiry-page">
    <div class="main-table-side">
        <div class="header-section">
            <div class="header-text">
                <h1>Inquiry & Quotation</h1>
                <p>Manage incoming requests and generate project estimates.</p>
            </div>
        </div>

        <!-- Tabs & Actions -->
        <div class="tabs-bar">
            <div class="tabs">
                <button class="tab-pill active">All Inquiries (42)</button>
                <button class="tab-pill">Pending (12)</button>
                <button class="tab-pill">Quoted (18)</button>
                <button class="tab-pill">Approved (12)</button>
            </div>
            <button class="bulk-btn">
                <span>Bulk Actions</span>
                <ChevronDown size={16} />
            </button>
        </div>

        <!-- Table -->
        <div class="table-wrapper">
            <table class="inquiry-table">
                <thead>
                    <tr>
                        <th style="width: 50px;"
                            ><input type="checkbox" class="custom-check" /></th
                        >
                        <th>CLIENT & REQUIREMENT</th>
                        <th>RECEIVED DATE</th>
                        <th>STATUS</th>
                        <th>ESTIMATE</th>
                    </tr>
                </thead>
                <tbody>
                    {#each inquiries as item}
                        <tr class="table-row {item.active ? 'active-row' : ''}">
                            <td class="check-cell"
                                ><input
                                    type="checkbox"
                                    bind:checked={item.active}
                                    class="custom-check"
                                /></td
                            >
                            <td>
                                <div class="client-cell">
                                    <div
                                        class="client-icon-box"
                                        style="background: {item.color}15; color: {item.color}"
                                    >
                                        💼
                                    </div>
                                    <div class="client-info">
                                        <span class="client-name"
                                            >{item.client}</span
                                        >
                                        <span class="client-req"
                                            >{item.req}</span
                                        >
                                    </div>
                                </div>
                            </td>
                            <td class="date-cell">{item.date}</td>
                            <td class="status-cell">
                                <span
                                    class="status-pill {item.status.toLowerCase()}"
                                    >{item.status}</span
                                >
                            </td>
                            <td class="estimate-cell">{item.estimate}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>

    <!-- Side Details Panel -->
    <aside class="details-side">
        <div class="side-header">
            <span class="label">INQUIRY DETAILS</span>
            <span class="id-badge">ID: Q-88219</span>
        </div>

        <div class="side-main">
            <h2>High-Precision Surgical Casing</h2>
            <p class="subtitle">Quantum Medical Corp • Sarah Jenkins (CTO)</p>

            <!-- Progress bar -->
            <div class="progress-section">
                <div class="step-labels">
                    <span class="active">DISCOVERY</span>
                    <span class="active">ESTIMATION</span>
                    <span>REVIEW</span>
                    <span>FINALIZED</span>
                </div>
                <div class="stepper-bar">
                    <div class="fill-line" style="width: 50%;"></div>
                    <div class="step-dot" style="left: 0%;"></div>
                    <div class="step-dot active" style="left: 50%;">
                        <div class="outer-pulse"></div>
                    </div>
                    <div class="step-dot" style="left: 100%;"></div>
                </div>
            </div>

            <!-- White Card Content -->
            <div class="detail-card">
                <div class="details-form">
                    <div class="form-row">
                        <div class="form-group">
                            <p id="label">Material Grade</p>
                            <div class="val-box">Medical Grade T6-Alu</div>
                        </div>
                        <div class="form-group">
                            <p id="label">Unit Quantity</p>
                            <div class="val-box">1200</div>
                        </div>
                    </div>

                    <div class="form-group">
                        <p id="label">Process Specification</p>
                        <div class="spec-box">
                            Ultra-thin wall injection molding with high-gloss
                            surface finish. Requires Class 100 cleanroom
                            production.
                        </div>
                    </div>
                </div>

                <div class="breakdown-section">
                    <h3>Line Item Breakdown</h3>
                    {#each lineItems as line}
                        <div class="line-row">
                            <span>{line.name}</span>
                            <span class="price">{line.value}</span>
                        </div>
                    {/each}
                    <div class="total-row">
                        <span>Total Quotation</span>
                        <span class="total-price">$46,200.00</span>
                    </div>
                </div>
            </div>

            <!-- Actions moved inside Scroll -->
            <div class="side-actions-inner">
                <button class="btn-primary-full">
                    <Send size={18} />
                    Send Official Quotation
                </button>
                <p class="footer-msg">Internal Approval Required to Convert</p>
                <button class="btn-convert">Convert to Project</button>

                <div class="footer-links">
                    <button class="link-btn"
                        ><RefreshCcw size={14} /> Revision History</button
                    >
                    <button class="link-btn danger"
                        ><XCircle size={14} /> Reject Inquiry</button
                    >
                </div>
            </div>
        </div>
    </aside>
</div>

<style>
    .inquiry-page {
        display: flex;
        gap: 24px;
        height: 100%;
    }

    .main-table-side {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0; /* Prevents overflow */
        overflow-x: hidden;
    }

    .header-section {
        margin-bottom: 32px;
    }

    .header-section h1 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 8px;
    }

    .header-section p {
        color: var(--text-sub);
        font-size: 14px;
    }

    /* Tabs Section */
    .tabs-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
    }

    .tabs {
        display: flex;
        gap: 12px;
    }

    .tab-pill {
        padding: 10px 20px;
        font-size: 13px;
        font-weight: 600;
        border-radius: 100px;
        color: var(--text-sub);
        transition: all 0.2s;
    }

    .tab-pill.active {
        background: #f0edff;
        color: var(--primary);
    }

    .bulk-btn {
        background: var(--primary);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    /* Modern Table styles */
    .table-wrapper {
        overflow-x: auto;
    }

    .inquiry-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 16px; /* Row spacing */
        margin-top: -16px;
    }

    th {
        padding: 16px;
        text-align: left;
        font-size: 12px;
        font-weight: 700;
        color: var(--text-sub);
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }

    .table-row {
        background: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        border-radius: 8px;
        transition: all 0.2s;
    }

    .active-row {
        outline: 2px solid var(--primary);
        background: #ffffff;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    td {
        padding: 24px 16px;
        font-size: 14px;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
    }

    td:first-child {
        border-left: 1px solid transparent;
        border-radius: 8px 0 0 8px;
        position: relative;
    }

    .active-row td:first-child::after {
        content: "";
        position: absolute;
        left: 4px;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 30px;
        background: var(--primary);
        border-radius: 100px;
    }

    td:last-child {
        border-right: 1px solid transparent;
        border-radius: 0 8px 8px 0;
    }

    .check-cell {
        padding-left: 20px;
    }

    .custom-check {
        width: 18px;
        height: 18px;
        accent-color: var(--primary);
        cursor: pointer;
    }

    .client-cell {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .client-icon-box {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    .client-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .client-name {
        font-weight: 700;
        font-size: 14px;
        color: #1a1a1a;
    }

    .client-req {
        font-size: 12px;
        color: var(--text-sub);
        white-space: pre-line;
    }

    .date-cell {
        color: #4a4a4a;
        font-weight: 500;
    }

    .status-pill {
        padding: 6px 16px;
        border-radius: 100px;
        font-size: 11px;
        font-weight: 800;
        display: inline-block;
    }

    .status-pill.pending {
        background: #fff5e6;
        color: #f39c12;
    }
    .status-pill.in {
        background: #f0edff;
        color: var(--primary);
    }
    .status-pill.quoted {
        background: #e8fdfa;
        color: #4ecdc4;
    }
    .status-pill.approved {
        background: #e8fdfa;
        color: #4ecdc4;
    }

    .estimate-cell {
        font-weight: 800;
        color: #1a1a1a;
    }

    /* Details Panel */
    .details-side {
        width: 420px;
        background: #f8f9fc;
        border-left: 1px solid var(--border);
        display: flex;
        flex-direction: column;
        border-radius: 0 12px 12px 0;
    }

    .side-header {
        padding: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .side-header .label {
        font-size: 11px;
        font-weight: 800;
        color: var(--text-sub);
        letter-spacing: 0.5px;
    }

    .id-badge {
        background: #e9e5ff;
        color: var(--primary);
        padding: 4px 12px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 800;
    }

    .side-main {
        padding: 0 24px 24px 24px;
        flex: 1;
        overflow-y: auto;
    }

    .side-main h2 {
        font-size: 20px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 6px;
    }

    .subtitle {
        font-size: 13px;
        color: var(--text-sub);
        margin-bottom: 40px;
    }

    /* Stepper */
    .progress-section {
        margin-bottom: 32px;
    }

    .step-labels {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
    }

    .step-labels span {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
    }

    .step-labels span.active {
        color: var(--primary);
    }

    .stepper-bar {
        position: relative;
        height: 4px;
        background: #edf2f7;
        border-radius: 2px;
    }

    .fill-line {
        position: absolute;
        height: 100%;
        background: var(--primary);
        border-radius: 2px;
    }

    .step-dot {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #a0aec0;
        background: white;
        border: 2px solid #edf2f7;
        z-index: 2;
    }

    .step-dot.active {
        width: 10px;
        height: 10px;
        border-color: var(--primary);
        z-index: 3;
    }

    .outer-pulse {
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        opacity: 0.2;
    }

    /* Detail Card */
    .detail-card {
        background: white;
        padding: 32px 24px;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
    }

    .details-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 30px;
        border-bottom: 1px solid #f1f3f7;
        padding-bottom: 30px;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    #label {
        display: block;
        font-size: 11px;
        font-weight: 800;
        color: #4a5568;
        margin-bottom: 8px;
    }

    .val-box {
        background: #f7fafc;
        padding: 12px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 700;
        color: #1a202c;
    }

    .spec-box {
        background: #f7fafc;
        padding: 16px;
        border-radius: 6px;
        font-size: 13px;
        line-height: 1.6;
        color: #1a202c;
    }

    /* Breakdown */
    .breakdown-section h3 {
        font-size: 14px;
        font-weight: 800;
        margin-bottom: 20px;
    }

    .line-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 13px;
        font-weight: 500;
        color: #4a5568;
    }

    .line-row .price {
        color: #1a202c;
        font-weight: 700;
    }

    .total-row {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
        border-top: 1px solid #f1f3f7;
        padding-top: 20px;
        font-size: 14px;
        font-weight: 800;
    }

    .total-price {
        color: var(--primary);
        font-size: 18px;
    }

    /* Actions Inside Scroll */
    .side-actions-inner {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding-bottom: 24px;
    }

    .btn-primary-full {
        background: var(--primary);
        color: white;
        padding: 16px;
        border-radius: 10px;
        font-weight: 800;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        transition: all 0.2s;
    }

    .footer-msg {
        text-align: center;
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
    }

    .btn-convert {
        background: #b7a6ff;
        color: white;
        padding: 16px;
        border-radius: 10px;
        font-weight: 800;
        font-size: 14px;
        text-align: center;
        transition: all 0.2s;
    }

    .footer-links {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
    }

    .link-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        font-weight: 800;
        color: #4a5568;
    }

    .link-btn.danger {
        color: #e53e3e;
    }

    /* Footer */
    .side-footer {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
</style>
