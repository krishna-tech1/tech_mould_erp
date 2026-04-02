<script lang="ts">
    import Modal from "./Modal.svelte";
    import { 
        User, 
        Mail, 
        Briefcase, 
        ShieldCheck, 
        Key, 
        Check, 
        Loader2,
        RefreshCw
    } from "lucide-svelte";
    import { fade, scale } from "svelte/transition";

    let { show = $bindable(false) } = $props();

    let isSubmitting = $state(false);
    let isSuccess = $state(false);
    let generatedPassword = $state("");

    let formData = $state({
        name: "",
        email: "",
        position: "",
        role: "Employee"
    });

    const roles = ["Management", "Project Leader", "Team Leader", "Employee"];

    function generateCredentials() {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < 12; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        generatedPassword = password;
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (!generatedPassword) {
            alert("Please generate credentials first.");
            return;
        }
        isSubmitting = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        isSubmitting = false;
        isSuccess = true;

        // Reset and close after success
        setTimeout(() => {
            if (isSuccess) {
                show = false;
                setTimeout(() => {
                    isSuccess = false;
                    generatedPassword = "";
                    formData = {
                        name: "",
                        email: "",
                        position: "",
                        role: "Employee"
                    };
                }, 300);
            }
        }, 3000);
    }
</script>

<Modal bind:show title="Onboard New System User">
    {#if isSuccess}
        <div class="success-screen" in:scale={{ duration: 400, start: 0.8 }}>
            <div class="success-icon">
                <Check size={32} color="white" />
            </div>
            <h3>User Onboarded!</h3>
            <p>
                <strong>{formData.name}</strong> has been assigned the <strong>{formData.role}</strong> role.
                Access credentials have been sent to their email.
            </p>
            <div class="pass-box">
                <span class="label">TEMP PASSWORD</span>
                <code>{generatedPassword}</code>
            </div>
        </div>
    {:else}
        <form onsubmit={handleSubmit} class="user-form">
            <div class="form-section">
                <!-- User Identity -->
                <div class="input-group full">
                    <label for="name">
                        <User size={14} /> Full Name
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        bind:value={formData.name} 
                        placeholder="e.g. Robert Fox"
                        required 
                    />
                </div>

                <div class="input-group full">
                    <label for="email">
                        <Mail size={14} /> Corporate Email ID
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        bind:value={formData.email} 
                        placeholder="robert@techmould.com"
                        required 
                    />
                </div>

                <div class="form-grid">
                    <div class="input-group">
                        <label for="position">
                            <Briefcase size={14} /> Position
                        </label>
                        <input 
                            type="text" 
                            id="position" 
                            bind:value={formData.position} 
                            placeholder="e.g. Senior Designer"
                            required 
                        />
                    </div>
                    <div class="input-group">
                        <label for="role">
                            <ShieldCheck size={14} /> Access Role
                        </label>
                        <select id="role" bind:value={formData.role}>
                            {#each roles as role}
                                <option value={role}>{role}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <!-- Credentials Section -->
                <div class="credential-section">
                    <div class="cred-left">
                        <span class="cred-label">SYSTEM CREDENTIALS</span>
                        {#if generatedPassword}
                            <code in:fade>{generatedPassword}</code>
                        {:else}
                            <span class="placeholder-text">Not generated yet</span>
                        {/if}
                    </div>
                    <button type="button" class="btn-generate" onclick={generateCredentials}>
                        <RefreshCw size={14} class={generatedPassword ? 'active' : ''} />
                        {generatedPassword ? 'Regenerate' : 'Generate'}
                    </button>
                </div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn-cancel" onclick={() => show = false}>Cancel</button>
                <button type="submit" class="btn-submit" disabled={isSubmitting || !generatedPassword}>
                    {#if isSubmitting}
                        <Loader2 size={18} class="spinner" />
                        Provisioning...
                    {:else}
                        Create User
                    {/if}
                </button>
            </div>
        </form>
    {/if}
</Modal>

<style>
    .user-form {
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

    .input-group label {
        font-size: 11px;
        font-weight: 700;
        color: var(--text-sub);
        display: flex;
        align-items: center;
        gap: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
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

    /* Credentials Section */
    .credential-section {
        background: #f1f5f9;
        padding: 16px;
        border-radius: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #e2e8f0;
    }

    .cred-left {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .cred-label {
        font-size: 10px;
        font-weight: 800;
        color: #64748b;
        letter-spacing: 0.5px;
    }

    .credential-section code {
        font-size: 14px;
        font-family: 'JetBrains Mono', monospace;
        color: var(--primary);
        font-weight: 700;
    }

    .placeholder-text {
        font-size: 12px;
        color: #94a3b8;
        font-style: italic;
    }

    .btn-generate {
        background: white;
        border: 1px solid #e2e8f0;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        color: #475569;
        transition: all 0.2s;
    }

    .btn-generate:hover {
        border-color: var(--primary);
        color: var(--primary);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    }

    .btn-generate :global(svg.active) {
        stroke-width: 3;
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

    .btn-submit {
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .btn-submit:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(101, 77, 207, 0.2);
    }

    .btn-submit:disabled {
        opacity: 0.5;
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
    }

    .success-screen h3 {
        font-size: 24px;
        font-weight: 800;
        margin-bottom: 12px;
    }

    .success-screen p {
        color: var(--text-sub);
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 24px;
    }

    .pass-box {
        background: #f8fafc;
        border: 1px dashed #cbd5e0;
        padding: 16px 32px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .pass-box .label {
        font-size: 10px;
        font-weight: 800;
        color: #94a3b8;
    }

    .pass-box code {
        font-size: 18px;
        color: var(--primary);
        letter-spacing: 1px;
    }
</style>
