<script module>
    // Simple arrow right icon for diff purely since ArrowRight causes conflicts if imported together when not handled
    import { ArrowRight as ArrowRightIcon } from "lucide-svelte";
</script>

<script lang="ts">
    import {
        Calendar,
        ChevronDown,
        Download,
        Search,
        Funnel,
        ChevronLeft,
        ChevronRight,
        CircleAlert,
        Activity,
        FileBraces,
        GitCommitHorizontal,
    } from "lucide-svelte";

    import sarah from "$lib/assets/sarah.png";
    import david from "$lib/assets/david.png";
    import elena from "$lib/assets/elena.png";

    const logs = [
        {
            id: 1,
            date: "Oct 31, 2023",
            time: "08:42:12 AM",
            name: "Sarah Connor",
            role: "System Admin",
            avatar: sarah,
            action: "ROLE UPDATED",
            actionColor: "#4ecdc4",
            targetRole: "Senior Developer",
            changesType: "diff",
            changesBefore: "Project: Delete",
            changesAfter: "Project: Archive",
            ip: "192.168.1.42",
            expanded: false,
        },
        {
            id: 2,
            date: "Oct 31, 2023",
            time: "08:15:04 AM",
            name: "Marcus Vance",
            role: "Security Lead",
            avatar: david,
            action: "PERMISSION REVOKED",
            actionColor: "#f39c12",
            targetRole: "External Auditor",
            changesType: "text",
            changesText: "Revoked All: Financial Reports",
            changesTextColor: "#e53e3e",
            ip: "10.0.4.18",
            expanded: true, // Show expanded view for this row
            diffData: `{
  "role_id": "ext-auditor-99",
  "changes": [
    {
      "permission": "financial_reports.view",
      "before": true,
      "after": false,
      "reason": "Contract Expiry"
    },
    {
      "permission": "financial_reports.export",
      "before": true,
      "after": false
    }
  ],
  "manual_override": true
}`,
            summaryText:
                "User access to Financial Data has been completely restricted due to regular security audit cycle.",
        },
        {
            id: 3,
            date: "Oct 30, 2023",
            time: "04:30:55 PM",
            name: "Julien Rossi",
            role: "Global Admin",
            avatar: david,
            action: "SUCCESS",
            actionColor: "#4ecdc4",
            targetRole: "Inventory Manager",
            changesType: "diff",
            changesBefore: "Warehouse: Read",
            changesAfter: "Warehouse: Write",
            ip: "172.16.254.1",
            expanded: false,
        },
        {
            id: 4,
            date: "Oct 30, 2023",
            time: "11:12:01 AM",
            name: "Elena Rodriguez",
            role: "HR Director",
            avatar: elena,
            action: "USER INVITED",
            actionColor: "#f39c12",
            targetRole: "New Onboarding",
            changesType: "text",
            changesText: "Initial set: Employee_Self_Service, Payroll_View",
            changesTextColor: "#1a1a1a",
            ip: "192.168.1.112",
            expanded: false,
        },
    ];
</script>

<svelte:head>
    <title>Audit Log | TechMould ERP</title>
</svelte:head>

<div class="audit-page">
    <!-- Header Section -->
    <div class="page-top">
        <div class="title-area">
            <span class="version-tag">SECURITY & COMPLIANCE - V 2.4.0</span>
            <h1>Audit Log: Permission Changes</h1>
            <p>
                Monitor all administrative actions and authorization lifecycle
                events within the ERP ecosystem.
            </p>
        </div>
        <div class="actions-area">
            <button class="btn-dropdown">
                <Calendar size={16} />
                Oct 24, 2023 - Oct 31, 2023
                <ChevronDown size={14} />
            </button>
            <button class="btn-primary">
                <Download size={16} /> Export
            </button>
        </div>
    </div>

    <!-- Search & Filter Bar -->
    <div class="search-bar">
        <div class="search-input">
            <Search size={18} class="s-icon" />
            <input
                type="text"
                placeholder="Filter by user, role, or specific permission change..."
            />
        </div>
        <div class="filter-actions">
            <button class="action-dropdown">
                All Actions <ChevronDown size={14} />
            </button>
            <button class="btn-icon">
                <Funnel size={16} />
            </button>
        </div>
    </div>

    <!-- Main Table -->
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>TIMESTAMP</th>
                    <th>USER</th>
                    <th>ACTION</th>
                    <th>TARGET ROLE</th>
                    <th>CHANGES</th>
                    <th class="text-right">IP ADDRESS</th>
                </tr>
            </thead>
            <tbody>
                {#each logs as log}
                    <tr class="log-row {log.expanded ? 'is-expanded' : ''}">
                        <td class="col-time">
                            <strong>{log.date}</strong>
                            <span>{log.time}</span>
                        </td>
                        <td>
                            <div class="user-cell">
                                <img
                                    src={log.avatar}
                                    alt={log.name}
                                    class="avatar"
                                />
                                <div class="u-info">
                                    <strong>{log.name}</strong>
                                    <span>{log.role}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span
                                class="action-badge"
                                style="color: {log.actionColor}; background: {log.actionColor}20;"
                            >
                                {log.action}
                            </span>
                        </td>
                        <td class="role-cell">
                            <strong>{log.targetRole}</strong>
                        </td>
                        <td class="changes-cell">
                            {#if log.changesType === "diff"}
                                <div class="diff-view">
                                    <span class="diff-removed"
                                        >{log.changesBefore}</span
                                    >
                                    <ArrowRightIcon
                                        size={12}
                                        class="diff-arrow"
                                    />
                                    <span class="diff-added"
                                        >{log.changesAfter}</span
                                    >
                                </div>
                            {:else}
                                <strong
                                    style="color: {log.changesTextColor}; font-size: 11px;"
                                    >{log.changesText}</strong
                                >
                            {/if}

                            <button class="btn-compare">
                                <GitCommitHorizontal size={14} /> Compare Versions
                            </button>
                        </td>
                        <td class="col-ip text-right">
                            {log.ip}
                        </td>
                    </tr>

                    <!-- Expanded Details Section -->
                    {#if log.expanded}
                        <tr class="expanded-row">
                            <td colspan="6">
                                <div class="expanded-content">
                                    <!-- Left: JSON Diff -->
                                    <div class="diff-panel">
                                        <div class="panel-header">
                                            <FileBraces size={14} /> TECHNICAL DIFF
                                            (JSON)
                                        </div>
                                        <pre
                                            class="json-code">{log.diffData}</pre>
                                    </div>

                                    <!-- Right: Summary -->
                                    <div class="summary-panel">
                                        <div class="panel-header">
                                            <Activity size={14} /> SUMMARY
                                        </div>
                                        <div class="summary-body">
                                            <div class="warning-text">
                                                <CircleAlert
                                                    size={14}
                                                    color="#e53e3e"
                                                />
                                                <p>
                                                    {@html (log.summaryText || "").replace(
                                                        "Financial Data",
                                                        "<strong>Financial Data</strong>",
                                                    )}
                                                </p>
                                            </div>
                                            <span class="override-badge"
                                                >MANUAL OVERRIDE</span
                                            >
                                            <button class="btn-full-report"
                                                >FULL AUDIT REPORT</button
                                            >
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>

        <!-- Footer / Pagination -->
        <div class="table-footer">
            <span class="showing-text">Showing 1 to 4 of 128 results</span>
            <div class="pagination">
                <button class="pg-btn"><ChevronLeft size={16} /></button>
                <button class="pg-btn"><ChevronRight size={16} /></button>
            </div>
        </div>
    </div>
</div>

<style>
    .audit-page {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .page-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .version-tag {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
        display: block;
    }

    .title-area h1 {
        font-size: 24px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 8px;
        line-height: 1.2;
    }

    .title-area p {
        font-size: 13px;
        color: #718096;
        max-width: 600px;
        line-height: 1.5;
    }

    .actions-area {
        display: flex;
        gap: 12px;
    }

    .btn-dropdown,
    .btn-primary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 700;
        border: none;
        cursor: pointer;
    }

    .btn-dropdown {
        background: white;
        border: 1px solid var(--border);
        color: #4a5568;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    }

    .btn-primary {
        background: var(--primary);
        color: white;
    }

    /* Search Bar */
    .search-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f8f9fc;
        padding: 8px 12px 8px 16px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.02);
    }

    .search-input {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }

    .search-input input {
        border: none;
        background: none;
        width: 100%;
        font-size: 13px;
        color: #1a1a1a;
        outline: none;
        padding: 8px 0;
    }

    .search-input input::placeholder {
        color: #a0aec0;
        font-weight: 500;
    }

    :global(.s-icon) {
        color: #a0aec0;
    }

    .filter-actions {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .action-dropdown {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: white;
        border: 1px solid var(--border);
        border-radius: 6px;
        font-size: 12px;
        font-weight: 700;
        color: #4a5568;
        cursor: pointer;
    }

    .btn-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: white;
        border: 1px solid var(--border);
        border-radius: 6px;
        color: #4a5568;
        cursor: pointer;
    }

    /* Table Container */
    .table-container {
        background: white;
        border: 1px solid rgba(0, 0, 0, 0.04);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.01);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }

    th {
        padding: 16px 24px;
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        border-bottom: 1px solid #edf2f7;
        letter-spacing: 0.5px;
    }

    .text-right {
        text-align: right;
    }

    .log-row td {
        padding: 24px;
        border-bottom: 1px solid #edf2f7;
        vertical-align: middle;
    }

    .log-row.is-expanded td {
        border-bottom: none;
        position: relative;
    }

    .log-row.is-expanded::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 4px;
        background: var(--primary);
    }

    .col-time {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .col-time strong {
        font-size: 12px;
        font-weight: 800;
        color: #1a1a1a;
    }
    .col-time span {
        font-size: 11px;
        font-weight: 600;
        color: #a0aec0;
    }

    .user-cell {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        object-fit: cover;
        background: #e2e8f0;
    }

    .u-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .u-info strong {
        font-size: 13px;
        font-weight: 800;
        color: #1a1a1a;
    }
    .u-info span {
        font-size: 11px;
        font-weight: 600;
        color: #718096;
    }

    .action-badge {
        padding: 4px 10px;
        border-radius: 100px;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.5px;
    }

    .role-cell strong {
        font-size: 12px;
        font-weight: 800;
        color: #1a1a1a;
    }

    .changes-cell {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }

    .diff-view {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        font-weight: 800;
    }

    .diff-removed {
        color: #e53e3e;
        text-decoration: line-through;
        background: #fff5f5;
        padding: 2px 6px;
        border-radius: 4px;
    }
    .diff-added {
        color: #4ecdc4;
        background: #e8fdfa;
        padding: 2px 6px;
        border-radius: 4px;
    }
    :global(.diff-arrow) {
        color: #a0aec0;
    }

    .btn-compare {
        display: flex;
        align-items: center;
        gap: 6px;
        background: white;
        border: 1px solid var(--primary);
        color: var(--primary);
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
    }

    .btn-compare:hover {
        background: var(--primary);
        color: white;
    }

    .col-ip {
        font-size: 11px;
        font-weight: 700;
        color: #a0aec0;
        font-family: monospace;
    }

    /* Expanded Row Design */
    .expanded-row td {
        padding: 0 24px 24px 24px;
        background: linear-gradient(180deg, white 0%, #fdfdff 100%);
        border-bottom: 2px solid var(--primary);
    }

    .expanded-content {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 32px;
        padding-top: 24px;
        border-top: 1px dashed #e1e4ed;
    }

    .panel-header {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 16px;
    }

    .json-code {
        background: #f1f3f7;
        padding: 16px;
        border-radius: 8px;
        font-family: Consolas, Monaco, "Courier New", monospace;
        font-size: 12px;
        color: #4a5568;
        line-height: 1.5;
        white-space: pre-wrap;
        margin: 0;
    }

    .summary-body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .warning-text {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 13px;
        line-height: 1.6;
        color: #4a5568;
    }

    .warning-text p {
        margin: 0;
    }

    .override-badge {
        background: #fff3e0;
        color: #e67e22;
        padding: 4px 10px;
        border-radius: 40px;
        font-size: 10px;
        font-weight: 800;
    }

    .btn-full-report {
        background: transparent;
        border: 1px solid var(--primary);
        color: var(--primary);
        width: 100%;
        padding: 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.2s;
        margin-top: 8px;
    }

    .btn-full-report:hover {
        background: var(--primary);
        color: white;
    }

    /* Footer */
    .table-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        border-top: 1px solid #edf2f7;
    }

    .showing-text {
        font-size: 12px;
        font-weight: 700;
        color: #718096;
    }

    .pagination {
        display: flex;
        gap: 8px;
    }

    .pg-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: white;
        border: 1px solid #edf2f7;
        color: #a0aec0;
        border-radius: 6px;
        cursor: pointer;
    }

    .pg-btn:hover {
        background: #f8f9fc;
        color: #4a5568;
    }
</style>
