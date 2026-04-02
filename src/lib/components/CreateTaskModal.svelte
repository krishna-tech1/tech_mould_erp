<script lang="ts">
    import Modal from "./Modal.svelte";
    import { 
        ClipboardList, 
        User, 
        AlertCircle, 
        Calendar, 
        Tag, 
        Check, 
        Loader2,
        AlignLeft
    } from "lucide-svelte";
    import { fade, scale } from "svelte/transition";

    let { show = $bindable(false) } = $props();

    let isSubmitting = $state(false);
    let isSuccess = $state(false);

    let formData = $state({
        title: "",
        assignedTo: "",
        priority: "MEDIUM",
        dueDate: new Date().toISOString().split('T')[0],
        category: "Design",
        description: ""
    });

    const categories = ["Design", "Tooling", "Production", "QC", "Logistics"];
    const priorities = [
        { id: "LOW", label: "Low", color: "#a0aec0" },
        { id: "MEDIUM", label: "Medium", color: "#4a5568" },
        { id: "HIGH", label: "High", color: "#f39c12" },
        { id: "URGENT", label: "Urgent", color: "#e74c3c" }
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
                setTimeout(() => {
                    isSuccess = false;
                    formData = {
                        title: "",
                        assignedTo: "",
                        priority: "MEDIUM",
                        dueDate: new Date().toISOString().split('T')[0],
                        category: "Design",
                        description: ""
                    };
                }, 300);
            }
        }, 2000);
    }
</script>

<Modal bind:show title="Assign New Task">
    {#if isSuccess}
        <div class="success-screen" in:scale={{ duration: 400, start: 0.8 }}>
            <div class="success-icon">
                <Check size={32} color="white" />
            </div>
            <h3>Task Assigned!</h3>
            <p>
                <strong>{formData.title}</strong> has been assigned to <strong>{formData.assignedTo}</strong>.
            </p>
        </div>
    {:else}
        <form onsubmit={handleSubmit} class="task-form">
            <div class="form-section">
                <!-- Task Title -->
                <div class="input-group full">
                    <label for="title">
                        <ClipboardList size={14} /> Task Title
                    </label>
                    <input 
                        type="text" 
                        id="title" 
                        bind:value={formData.title} 
                        placeholder="e.g. Mold Design Revision #402"
                        required 
                    />
                </div>

                <div class="form-grid">
                    <div class="input-group">
                        <label for="assignee">
                            <User size={14} /> Assigned To
                        </label>
                        <input 
                            type="text" 
                            id="assignee" 
                            bind:value={formData.assignedTo} 
                            placeholder="e.g. Marcus Chen"
                            required 
                        />
                    </div>
                    <div class="input-group">
                        <label for="due">
                            <Calendar size={14} /> Due Date
                        </label>
                        <input 
                            type="date" 
                            id="due" 
                            bind:value={formData.dueDate} 
                            required 
                        />
                    </div>
                </div>

                <div class="form-grid">
                    <div class="input-group">
                        <label for="category">
                            <Tag size={14} /> Task Category
                        </label>
                        <select id="category" bind:value={formData.category}>
                            {#each categories as cat}
                                <option value={cat}>{cat}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="input-group">
                        <label>Priority Level</label>
                        <div class="priority-selector">
                            {#each priorities as p}
                                <button 
                                    type="button"
                                    class="priority-btn {formData.priority === p.id ? 'active' : ''}"
                                    onclick={() => formData.priority = p.id}
                                    style="--btn-color: {p.color}"
                                >
                                    {p.label}
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>

                <div class="input-group full">
                    <label for="description">
                        <AlignLeft size={14} /> Task Description
                    </label>
                    <textarea 
                        id="description" 
                        bind:value={formData.description} 
                        placeholder="Detail the specific requirements or steps for this task..."
                        rows="4"
                    ></textarea>
                </div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn-cancel" onclick={() => show = false}>Cancel</button>
                <button type="submit" class="btn-submit" disabled={isSubmitting}>
                    {#if isSubmitting}
                        <Loader2 size={18} class="spinner" />
                        Assigning...
                    {:else}
                        Assign Task
                    {/if}
                </button>
            </div>
        </form>
    {/if}
</Modal>

<style>
    .task-form {
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
    .input-group select,
    .input-group textarea {
        background: #f8fafc;
        border: 1px solid var(--border);
        padding: 12px 16px;
        border-radius: 10px;
        font-size: 14px;
        font-family: inherit;
        transition: all 0.2s;
    }

    .input-group textarea {
        resize: none;
    }

    .input-group input:focus, 
    .input-group select:focus,
    .input-group textarea:focus {
        background: white;
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(101, 77, 207, 0.1);
        outline: none;
    }

    /* Priority Selector */
    .priority-selector {
        display: flex;
        gap: 8px;
        background: #f8fafc;
        padding: 4px;
        border-radius: 10px;
        border: 1px solid var(--border);
    }

    .priority-btn {
        flex: 1;
        padding: 8px 4px;
        font-size: 11px;
        font-weight: 800;
        border-radius: 6px;
        transition: all 0.2s;
        color: #64748b;
        text-transform: uppercase;
    }

    .priority-btn.active {
        background: white;
        color: var(--btn-color);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
    }

    .success-screen strong {
        color: var(--primary);
    }
</style>
