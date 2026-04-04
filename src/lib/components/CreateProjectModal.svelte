<script lang="ts">
    import Modal from "./Modal.svelte";
    import {
        Type,
        User,
        Calendar,
        DollarSign,
        AlignLeft,
        Plus,
        Check,
        Loader2,
    } from "lucide-svelte";
    import { fade } from "svelte/transition";

    let {
        show = $bindable(false),
        onCreated,
    }: {
        show?: boolean;
        onCreated?: () => void | Promise<void>;
    } = $props();

    let loading = $state(false);
    let success = $state(false);
    let errorMessage = $state("");

    let formData = $state({
        title: "",
        client: "",
        startDate: "",
        endDate: "",
        budget: "",
        description: "",
        category: "Manufacturing",
        priority: "Medium",
    });

    const categories = [
        "Manufacturing",
        "R&D",
        "PDC Tools",
        "PDC Casting Components",
        "Inquiry",
    ];

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        loading = true;
        errorMessage = "";

        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const payload = (await response.json()) as {
                success?: boolean;
                error?: string;
            };

            if (!response.ok || !payload.success) {
                errorMessage = payload.error || "Failed to create project";
                return;
            }

            success = true;
            await onCreated?.();

            setTimeout(() => {
                success = false;
                show = false;
                formData = {
                    title: "",
                    client: "",
                    startDate: "",
                    endDate: "",
                    budget: "",
                    description: "",
                    category: "Manufacturing",
                    priority: "Medium",
                };
            }, 900);
        } catch (error) {
            console.error("Error creating project:", error);
            errorMessage = "Failed to create project";
        } finally {
            loading = false;
        }
    }
</script>

<Modal bind:show title="Create New Project">
    {#if success}
        <div class="success-screen" transition:fade>
            <div class="success-icon-box">
                <Check size={32} color="white" />
            </div>
            <h3>Project Created!</h3>
            <p>
                <strong>{formData.title}</strong> has been successfully added to
                your project list.
            </p>
        </div>
    {:else}
        <form onsubmit={handleSubmit} class="project-form">
            {#if errorMessage}
                <div class="error-banner">{errorMessage}</div>
            {/if}
            <div class="form-grid">
                <!-- Project Title -->
                <div class="form-group col-full">
                    <label for="p-title">
                        <Type size={16} />
                        <span>Project Title</span>
                    </label>
                    <input
                        id="p-title"
                        type="text"
                        placeholder="e.g. Precision Mold-X Case v2"
                        bind:value={formData.title}
                        required
                    />
                </div>

                <!-- Client -->
                <div class="form-group col-full">
                    <label for="p-client">
                        <User size={16} />
                        <span>Client / Organization</span>
                    </label>
                    <input
                        id="p-client"
                        type="text"
                        placeholder="Select or enter client name"
                        bind:value={formData.client}
                        required
                    />
                </div>

                <!-- Timeline - Start -->
                <div class="form-group">
                    <label for="p-start">
                        <Calendar size={16} />
                        <span>Start Date</span>
                    </label>
                    <input
                        id="p-start"
                        type="date"
                        bind:value={formData.startDate}
                        required
                    />
                </div>

                <!-- Timeline - End -->
                <div class="form-group">
                    <label for="p-end">
                        <Calendar size={16} />
                        <span>Due Date</span>
                    </label>
                    <input
                        id="p-end"
                        type="date"
                        bind:value={formData.endDate}
                        required
                    />
                </div>

                <!-- Budget -->
                <div class="form-group">
                    <label for="p-budget">
                        <DollarSign size={16} />
                        <span>Estimated Budget</span>
                    </label>
                    <div class="input-wrapper-prefix">
                        <span class="prefix">$</span>
                        <input
                            id="p-budget"
                            type="number"
                            placeholder="0.00"
                            bind:value={formData.budget}
                            required
                        />
                    </div>
                </div>

                <!-- Category -->
                <div class="form-group">
                    <label for="p-category">
                        <span>Project Category</span>
                    </label>
                    <select id="p-category" bind:value={formData.category}>
                        {#each categories as cat}
                            <option value={cat}>{cat}</option>
                        {/each}
                    </select>
                </div>

                <!-- Priority -->
                <div class="form-group">
                    <label for="p-priority">
                        <span>Priority Level</span>
                    </label>
                    <select id="p-priority" bind:value={formData.priority}>
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>

                <!-- Description -->
                <div class="form-group col-full">
                    <label for="p-desc">
                        <AlignLeft size={16} />
                        <span>Project Description</span>
                    </label>
                    <textarea
                        id="p-desc"
                        rows="3"
                        placeholder="Describe the scope, materials, and objectives..."
                        bind:value={formData.description}
                    ></textarea>
                </div>
            </div>

            <div class="form-actions">
                <button
                    type="button"
                    class="btn-secondary"
                    onclick={() => (show = false)}
                >
                    Cancel
                </button>
                <button type="submit" class="btn-primary" disabled={loading}>
                    {#if loading}
                        <span class="spinner"><Loader2 size={18} /></span>
                        <span>Processing...</span>
                    {:else}
                        <Plus size={18} />
                        <span>Create Project</span>
                    {/if}
                </button>
            </div>
        </form>
    {/if}
</Modal>

<style>
    .project-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .error-banner {
        background: #ffeded;
        border: 1px solid #fecaca;
        color: #b91c1c;
        padding: 10px 12px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 700;
    }

    .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .col-full {
        grid-column: span 2;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .form-group label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 700;
        color: #475569;
        margin-left: 2px;
    }

    .form-group label :global(svg) {
        color: #94a3b8;
    }

    input,
    select,
    textarea {
        width: 100%;
        padding: 12px 16px;
        border-radius: 12px;
        border: 1.5px solid #e2e8f0;
        background: #f8fafc;
        font-family: inherit;
        font-size: 14px;
        color: #0f172a;
        transition: all 0.2s;
        outline: none;
    }

    input:focus,
    select:focus,
    textarea:focus {
        border-color: var(--primary);
        background: #ffffff;
        box-shadow: 0 0 0 4px rgba(101, 77, 207, 0.1);
    }

    input::placeholder,
    textarea::placeholder {
        color: #94a3b8;
    }

    .input-wrapper-prefix {
        position: relative;
        display: flex;
        align-items: center;
    }

    .prefix {
        position: absolute;
        left: 16px;
        color: #64748b;
        font-weight: 700;
        font-size: 14px;
        pointer-events: none;
    }

    .input-wrapper-prefix input {
        padding-left: 32px;
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 12px;
        padding-top: 12px;
        border-top: 1px solid #f1f5f9;
        margin-top: 10px;
    }

    .btn-secondary {
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
        color: #64748b;
        background: #f1f5f9;
        transition: all 0.2s;
    }

    .btn-secondary:hover {
        background: #e2e8f0;
        color: #0f172a;
    }

    .btn-primary {
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
        color: white;
        background: var(--primary);
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(101, 77, 207, 0.25);
    }

    .btn-primary:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        box-shadow: none;
    }

    .spinner {
        display: flex;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    /* Success Screen */
    .success-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 40px 0;
    }

    .success-icon-box {
        width: 64px;
        height: 64px;
        background: #10b981;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
        animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes bounce-in {
        from {
            transform: scale(0);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .success-screen h3 {
        font-size: 24px;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 12px;
    }

    .success-screen p {
        font-size: 15px;
        color: #64748b;
        max-width: 300px;
        line-height: 1.6;
    }

    .success-screen strong {
        color: #0f172a;
    }
</style>
