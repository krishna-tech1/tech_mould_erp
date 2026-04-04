<script lang="ts">
    import Modal from "./Modal.svelte";
    import { enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    import { 
        ShieldCheck, 
        Briefcase, 
        Settings, 
        User, 
        Check, 
        Loader2,
        ShieldPlus,
        Plus
    } from "lucide-svelte";
    import { fade, scale } from "svelte/transition";

    let { show = $bindable(false) } = $props();

    let isSubmitting = $state(false);
    let isSuccess = $state(false);
    let error = $state("");

    let formData = $state({
        loginSide: "Management",
        roleName: ""
    });

    function handleSubmit() {
        error = "";
        isSubmitting = true;
    }
</script>

<Modal bind:show title="Architect New System Role">
    {#if isSuccess}
        <div class="success-screen" in:scale={{ duration: 400, start: 0.8 }}>
            <div class="success-icon">
                <Check size={32} color="white" />
            </div>
            <h3>Role Protocol Defined!</h3>
            <p>
                <strong>{formData.roleName}</strong> has been registered under the <strong>{formData.loginSide}</strong> portal.
            </p>
        </div>
    {:else}
        <form 
            action="?/createRole"
            method="POST"
            use:enhance={() => {
                handleSubmit();
                return async ({ result }) => {
                    if (result.type === 'success') {
                        await invalidateAll();
                        isSubmitting = false;
                        isSuccess = true;
                        setTimeout(() => {
                            if (isSuccess) {
                                show = false;
                                setTimeout(() => {
                                    isSuccess = false;
                                    formData = {
                                        loginSide: "Management",
                                        roleName: ""
                                    };
                                    error = "";
                                }, 300);
                            }
                        }, 2000);
                    } else if (result.type === 'failure') {
                        isSubmitting = false;
                        error = typeof result.data?.error === 'string'
                            ? result.data.error
                            : 'Failed to create role';
                    }
                };
            }}
            class="role-form"
        >
            <p class="form-desc">
                Define a new permission group to categorize system access for specific team departments.
            </p>

            {#if error}
                <div class="error-message" transition:scale={{ duration: 200 }}>
                    {error}
                </div>
            {/if}

            <div class="form-section">
                <!-- Login Type Sector -->
                <div class="input-group">
                    <label>
                        <Settings size={14} /> Portal Assignment
                    </label>
                    <div class="radio-cards">
                        <label class="radio-card {formData.loginSide === 'Management' ? 'active' : ''}">
                            <input type="radio" name="loginSide" value="Management" bind:group={formData.loginSide} />
                            <div class="radio-content">
                                <ShieldCheck size={20} />
                                <div class="text">
                                    <strong>Management</strong>
                                    <span>Full Admin Access</span>
                                </div>
                            </div>
                        </label>
                        <label class="radio-card {formData.loginSide === 'Employee' ? 'active' : ''}">
                            <input type="radio" name="loginSide" value="Employee" bind:group={formData.loginSide} />
                            <div class="radio-content">
                                <User size={20} />
                                <div class="text">
                                    <strong>Employee</strong>
                                    <span>Task-specific Access</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Role Taxonomy -->
                <div class="input-group">
                    <label for="roleName">
                        <Briefcase size={14} /> New Role Name
                    </label>
                    <input 
                        type="text" 
                        id="roleName" 
                        name="roleName"
                        bind:value={formData.roleName} 
                        placeholder="e.g. Senior Logistics Coordinator"
                        required 
                    />
                    <span class="hint">Ensure the role name is unique and descriptive.</span>
                </div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn-cancel" onclick={() => show = false} disabled={isSubmitting}>Cancel</button>
                <button type="submit" class="btn-submit" disabled={isSubmitting || !formData.roleName}>
                    {#if isSubmitting}
                        <Loader2 size={18} class="spinner" />
                        Initializing...
                    {:else}
                        <Plus size={16} /> Create Role
                    {/if}
                </button>
            </div>
        </form>
    {/if}
</Modal>

<style>
    .role-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .form-desc {
        font-size: 14px;
        color: #718096;
        line-height: 1.6;
        font-weight: 500;
    }

    .form-section {
        display: flex;
        flex-direction: column;
        gap: 28px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .input-group label {
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
        display: flex;
        align-items: center;
        gap: 8px;
        text-transform: uppercase;
        letter-spacing: 0.8px;
    }

    /* Radio Cards */
    .radio-cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .radio-card {
        cursor: pointer;
        position: relative;
    }

    .radio-card input {
        position: absolute;
        opacity: 0;
    }

    .radio-content {
        background: #f8fafc;
        border: 2px solid #edf2f7;
        padding: 16px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 14px;
        transition: all 0.2s;
        color: #718096;
    }

    .radio-card.active .radio-content {
        border-color: var(--primary);
        background: var(--primary-light);
        color: var(--primary);
    }

    .radio-content .text {
        display: flex;
        flex-direction: column;
    }

    .radio-content strong {
        font-size: 14px;
        font-weight: 800;
    }

    .radio-content span {
        font-size: 11px;
        font-weight: 600;
        opacity: 0.8;
    }

    /* Text Input */
    input[type="text"] {
        background: white;
        border: 1px solid var(--border);
        padding: 14px 16px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        font-family: inherit;
        transition: all 0.2s;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
    }

    input[type="text"]:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(101, 77, 207, 0.1);
        outline: none;
    }

    .hint {
        font-size: 11px;
        color: #a0aec0;
        font-weight: 600;
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding-top: 24px;
        border-top: 1px solid #f1f5f9;
        margin-top: 8px;
    }

    .btn-cancel, .btn-submit {
        padding: 12px 28px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 700;
        transition: all 0.2s;
    }

    .btn-cancel {
        color: #718096;
        background: #f1f5f9;
    }

    .btn-submit {
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 12px rgba(101, 77, 207, 0.2);
    }

    .btn-submit:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(101, 77, 207, 0.25);
    }

    .btn-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        box-shadow: none;
    }

    :global(.spinner) {
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
        box-shadow: 0 8px 16px rgba(78, 205, 196, 0.2);
    }

    .success-screen h3 {
        font-size: 24px;
        font-weight: 800;
        margin-bottom: 12px;
    }

    .success-screen p {
        color: #718096;
        font-size: 15px;
        font-weight: 600;
        line-height: 1.6;
    }

    .error-message {
        background: #fee;
        border: 1px solid #fcc;
        color: #c33;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
    }
</style>
