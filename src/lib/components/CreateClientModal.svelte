<script lang="ts">
    import Modal from "./Modal.svelte";
    import { User, Building2, Mail, Calendar, Briefcase, Check, Loader2 } from "lucide-svelte";
    import { fade, scale } from "svelte/transition";

    let { show = $bindable(false) } = $props();

    let isSubmitting = $state(false);
    let isSuccess = $state(false);

    let formData = $state({
        name: "",
        organization: "",
        email: "",
        clientSince: new Date().toISOString().split('T')[0],
        industry: "Manufacturing",
        status: "ACTIVE"
    });

    const industries = [
        "Manufacturing",
        "Automotive",
        "Aerospace",
        "SaaS / Fintech",
        "Renewable Energy",
        "Medical Devices"
    ];

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        isSubmitting = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        isSubmitting = false;
        isSuccess = true;

        // Reset and close after success
        setTimeout(() => {
            if (isSuccess) {
                show = false;
                // Reset state after modal closes
                setTimeout(() => {
                    isSuccess = false;
                    formData = {
                        name: "",
                        organization: "",
                        email: "",
                        clientSince: new Date().toISOString().split('T')[0],
                        industry: "Manufacturing",
                        status: "ACTIVE"
                    };
                }, 300);
            }
        }, 2000);
    }
</script>

<Modal bind:show title="Register New Client">
    {#if isSuccess}
        <div class="success-screen" in:scale={{ duration: 400, start: 0.8 }}>
            <div class="success-icon">
                <Check size={32} color="white" />
            </div>
            <h3>Client Registered!</h3>
            <p>
                <strong>{formData.name}</strong> from <strong>{formData.organization}</strong> 
                has been added to your corporate database.
            </p>
        </div>
    {:else}
        <form onsubmit={handleSubmit} class="client-form">
            <div class="form-section">
                <!-- Client Details -->
                <div class="input-group full">
                    <label for="name">
                        <User size={14} /> Full Name
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        bind:value={formData.name} 
                        placeholder="e.g. John Doe"
                        required 
                    />
                </div>

                <div class="form-grid">
                    <div class="input-group">
                        <label for="organization">
                            <Building2 size={14} /> Organization
                        </label>
                        <input 
                            type="text" 
                            id="organization" 
                            bind:value={formData.organization} 
                            placeholder="e.g. Apex Logistics"
                            required 
                        />
                    </div>
                    <div class="input-group">
                        <label for="email">
                            <Mail size={14} /> Email Address
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            bind:value={formData.email} 
                            placeholder="client@company.com"
                            required 
                        />
                    </div>
                </div>

                <div class="form-grid">
                    <div class="input-group">
                        <label for="since">
                            <Calendar size={14} /> Client Since
                        </label>
                        <input 
                            type="date" 
                            id="since" 
                            bind:value={formData.clientSince} 
                            required 
                        />
                    </div>
                    <div class="input-group">
                        <label for="industry">
                            <Briefcase size={14} /> Industry
                        </label>
                        <select id="industry" bind:value={formData.industry}>
                            {#each industries as industry}
                                <option value={industry}>{industry}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div class="input-group full">
                    <span class="section-label">Account Status</span>
                    <div class="status-options">
                        <label class="status-option {formData.status === 'ACTIVE' ? 'active' : ''}">
                            <input type="radio" value="ACTIVE" bind:group={formData.status} />
                            Active
                        </label>
                        <label class="status-option {formData.status === 'REVIEW' ? 'active' : ''}">
                            <input type="radio" value="REVIEW" bind:group={formData.status} />
                            Review
                        </label>
                        <label class="status-option {formData.status === 'INACTIVE' ? 'active' : ''}">
                            <input type="radio" value="INACTIVE" bind:group={formData.status} />
                            Inactive
                        </label>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn-cancel" onclick={() => show = false}>Cancel</button>
                <button type="submit" class="btn-submit" disabled={isSubmitting}>
                    {#if isSubmitting}
                        <Loader2 size={18} class="spinner" />
                        Processing...
                    {:else}
                        Create Client Profile
                    {/if}
                </button>
            </div>
        </form>
    {/if}
</Modal>

<style>
    .client-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .form-section {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .input-group label,
    .section-label {
        font-size: 11px;
        font-weight: 700;
        color: var(--text-sub);
        display: flex;
        align-items: center;
        gap: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .section-label {
        margin-bottom: 8px;
    }

    .input-group input, 
    .input-group select {
        background: #f8fafc;
        border: 1px solid var(--border);
        padding: 12px 16px;
        border-radius: 10px;
        font-size: 14px;
        font-family: inherit;
        transition: all 0.2s;
    }

    .input-group input:focus, 
    .input-group select:focus {
        background: white;
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(101, 77, 207, 0.1);
        outline: none;
    }

    /* Status Options */
    .status-options {
        display: flex;
        gap: 12px;
        background: #f8fafc;
        padding: 6px;
        border-radius: 12px;
        border: 1px solid var(--border);
    }

    .status-option {
        flex: 1;
        text-align: center;
        padding: 10px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        color: var(--text-sub);
    }

    .status-option input {
        display: none;
    }

    .status-option.active {
        background: white;
        color: var(--primary);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding-top: 20px;
        border-top: 1px solid var(--border);
    }

    .btn-cancel, .btn-submit {
        padding: 12px 24px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 700;
        transition: all 0.2s;
    }

    .btn-cancel {
        background: #f1f5f9;
        color: #64748b;
    }

    .btn-cancel:hover {
        background: #e2e8f0;
    }

    .btn-submit {
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 180px;
        justify-content: center;
    }

    .btn-submit:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(101, 77, 207, 0.2);
    }

    .btn-submit:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    /* Success Screen */
    .success-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 40px 20px;
    }

    .success-icon {
        width: 64px;
        height: 64px;
        background: #4ecdc4;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid #ccf5f1;
        margin-bottom: 24px;
        animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes bounce-in {
        from { transform: scale(0); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }

    .success-screen h3 {
        font-size: 24px;
        font-weight: 800;
        margin-bottom: 12px;
        color: #1a1a1a;
    }

    .success-screen p {
        color: var(--text-sub);
        font-size: 15px;
        line-height: 1.6;
    }

    .success-screen strong {
        color: var(--primary);
    }
</style>
