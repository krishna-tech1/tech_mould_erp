<script lang="ts">
    import { fade, scale } from "svelte/transition";
    import { X } from "lucide-svelte";
    
    let { show = $bindable(false), title, children } = $props();

    function close() {
        show = false;
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            close();
        }
    }
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if show}
    <!-- Backdrop -->
    <div 
        class="modal-backdrop" 
        onmousedown={close} 
        transition:fade={{ duration: 200 }}
        role="presentation"
    >
        <!-- Modal Content -->
        <div 
            class="modal-container" 
            onmousedown={(e) => e.stopPropagation()}
            transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}
            role="dialog"
            aria-modal="true"
            tabindex="-1"
        >
            <div class="modal-header">
                <h2>{title}</h2>
                <button class="close-btn" onclick={close} aria-label="Close">
                    <X size={20} />
                </button>
            </div>
            
            <div class="modal-body">
                {@render children()}
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 23, 42, 0.45);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 24px;
    }

    .modal-container {
        background: white;
        border-radius: 20px;
        width: 100%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        animation: modal-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes modal-in {
        from { transform: translateY(10px) scale(0.98); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 32px;
        border-bottom: 1px solid #f1f5f9;
        position: sticky;
        top: 0;
        background: white;
        z-index: 10;
    }

    .modal-header h2 {
        font-size: 20px;
        font-weight: 800;
        color: #0f172a;
        letter-spacing: -0.02em;
    }

    .close-btn {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #64748b;
        background: #f8fafc;
        transition: all 0.2s;
    }

    .close-btn:hover {
        background: #f1f5f9;
        color: #0f172a;
        transform: rotate(90deg);
    }

    .modal-body {
        padding: 32px;
    }

    /* Custom scrollbar for modal */
    .modal-container::-webkit-scrollbar {
        width: 6px;
    }
    .modal-container::-webkit-scrollbar-track {
        background: transparent;
    }
    .modal-container::-webkit-scrollbar-thumb {
        background: #e2e8f0;
        border-radius: 10px;
    }
</style>
