<script lang="ts">
    import { fade, fly, scale } from "svelte/transition";
    import { 
        Plus, 
        Send, 
        Smile, 
        Paperclip, 
        FileText, 
        FileDigit,
        MoreVertical,
        Search,
        Bot,
        Circle,
        Shield
    } from "lucide-svelte";

    let projects = $state([
        { id: 1, name: "High-Precision Injector", status: "LIVE", snippet: "Alex; Design v4 is ready for...", time: "2 min ago", active: true },
        { id: 2, name: "Automotive Chassis ...", status: "Closed", snippet: "Support; Shipping update for...", time: "Yesterday", active: false },
        { id: 3, name: "Medical Grade Casing", status: "Draft", snippet: "You; Question about the...", time: "3 days ago", active: false }
    ]);

    let messages = $state([
        { 
            id: 1, 
            sender: "Alex Chen", 
            role: "PM", 
            time: "10:42 AM", 
            type: "other",
            text: "Hello Alex, I've just uploaded the revised 3D schematics for the High-Precision Injector (v4). We've tightened the tolerances on the nozzle assembly to 0.005mm as requested. Please review the attached files.",
            attachment: { name: "Technical_Specs_v4.pdf", size: "2.4 MB", type: "pdf" },
            pfp: "https://i.pravatar.cc/150?u=alex"
        },
        { 
            id: 2, 
            sender: "You", 
            time: "10:45 AM", 
            type: "me",
            text: "Thanks Alex. The tighter tolerances look perfect on first glance. I'll have our manufacturing team verify the tooling requirements by EOD. Can Sarah confirm the material density requirements for the outer casing?"
        },
        { 
            id: 3, 
            sender: "Sarah Miller", 
            role: "Lead Eng", 
            time: "11:05 AM", 
            type: "other",
            text: "Yes, for the outer casing we are aiming for 1.25g/cm³. I've included the material datasheet below for your verification.",
            attachment: { name: "Material_Data_Sheet.xlsx", size: "1.1 MB", type: "excel" },
            pfp: "https://i.pravatar.cc/150?u=sarah"
        }
    ]);

    let newMessage = $state("");
</script>

<svelte:head>
    <title>Chat | TechMould Communication Hub</title>
</svelte:head>

<div class="chat-portal" in:fade>
    <!-- Left Sidebar: Active Projects -->
    <aside class="chat-sidebar">
        <div class="sidebar-head">
            <span class="l-label">ACTIVE PROJECTS</span>
        </div>
        <div class="project-list">
            {#each projects as p}
                <button class="project-item" class:active={p.active}>
                    <div class="p-info">
                        <div class="p-title">
                            <h3>{p.name}</h3>
                            <span class="p-status {p.status.toLowerCase()}">{p.status}</span>
                        </div>
                        <p class="p-snippet">{p.snippet}</p>
                        <div class="p-meta">
                            <span>{p.time}</span>
                            {#if p.active}<div class="active-dot"></div>{/if}
                        </div>
                    </div>
                </button>
            {/each}
        </div>
    </aside>

    <!-- Main Chat Window -->
    <main class="chat-window">
        <!-- Chat Header -->
        <header class="chat-header glass">
            <div class="h-left">
                <div class="h-icon"><Bot size={20} color="#654dcf" /></div>
                <div class="h-info">
                    <h2>High-Precision Injector</h2>
                    <div class="h-team">
                        <Circle size={8} fill="#10b981" color="#10b981" />
                        <span>Alex Chen (PM), Sarah Miller (Lead Eng)</span>
                    </div>
                </div>
            </div>
            <button class="btn-more"><MoreVertical size={20} /></button>
        </header>

        <!-- Message Stream -->
        <div class="message-stream">
            <div class="date-divider"><span>TODAY</span></div>

            {#each messages as m}
                <div class="msg-row {m.type}" in:fly={{ y: 10, duration: 400 }}>
                    {#if m.type === 'other'}
                        <div class="avatar" style="background-image: url('{m.pfp}')"></div>
                    {/if}
                    
                    <div class="msg-content">
                        {#if m.type === 'other'}
                            <div class="msg-meta">
                                <strong>{m.sender}</strong>
                                <span>{m.time}</span>
                            </div>
                        {:else}
                            <div class="msg-meta me">
                                <span>{m.time}</span>
                                <strong>{m.sender}</strong>
                            </div>
                        {/if}

                        <div class="bubble">
                            <p>{m.text}</p>
                            {#if m.attachment}
                                <div class="attachment-card">
                                    <div class="a-icon">
                                        {#if m.attachment.type === 'pdf'}
                                            <FileText size={18} color="#f97316" />
                                        {:else}
                                            <FileDigit size={18} color="#3b82f6" />
                                        {/if}
                                    </div>
                                    <div class="a-info">
                                        <strong>{m.attachment.name}</strong>
                                        <span>{m.attachment.size}</span>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Chat Input Footer -->
        <footer class="chat-footer">
            <div class="input-container">
                <button class="icon-btn action"><Plus size={22} /></button>
                <input type="text" placeholder="Type your message..." bind:value={newMessage} />
                <div class="input-actions">
                    <button class="icon-btn"><Smile size={22} /></button>
                    <button class="send-btn" class:active={newMessage.length > 0} in:scale>
                        <Send size={18} />
                    </button>
                </div>
            </div>
            <div class="security-hint">
                <Shield size={12} strokeWidth={3} />
                <span>Messages are encrypted and visible only to authorized project members.</span>
            </div>
        </footer>
    </main>
</div>

<style>
    .chat-portal {
        display: flex;
        height: calc(100vh - 130px); /* Maximized vertical real-estate */
        background: white;
        border-radius: 32px;
        overflow: hidden;
        border: 1px solid #f1f5f9;
        box-shadow: 0 40px 100px rgba(0,0,0,0.03);
    }

    /* Sidebar Styles */
    .chat-sidebar {
        width: 320px;
        border-right: 1px solid #f1f5f9;
        background: #fbfbfc;
        display: flex;
        flex-direction: column;
    }

    .sidebar-head {
        padding: 32px;
        border-bottom: 1px solid #f1f5f9;
    }

    .sidebar-head .l-label {
        font-size: 11px;
        font-weight: 800;
        color: #94a3b8;
        letter-spacing: 1.5px;
    }

    .project-list {
        flex: 1;
        overflow-y: auto;
    }

    .project-item {
        width: 100%;
        padding: 24px 32px;
        text-align: left;
        border-bottom: 1px solid #f1f5f9;
        transition: all 0.2s;
        cursor: pointer;
    }

    .project-item:hover { background: #f8fafc; }
    .project-item.active { background: white; box-shadow: inset 4px 0 0 #654dcf; }

    .p-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .p-title h3 { font-size: 15px; font-weight: 800; color: #1e293b; }
    .p-status { font-size: 9px; font-weight: 900; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.5px; }
    .p-status.live { background: #f5f3ff; color: #654dcf; }
    .p-status.closed { background: #f1f5f9; color: #94a3b8; }
    .p-status.draft { background: #fef2f2; color: #ef4444; }

    .p-snippet { font-size: 13px; color: #64748b; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .p-meta { display: flex; justify-content: space-between; align-items: center; }
    .p-meta span { font-size: 11px; font-weight: 600; color: #cbd5e1; }
    .active-dot { width: 8px; height: 8px; background: #654dcf; border-radius: 50%; }

    /* Main Window Styles */
    .chat-window {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #f1f0f7; /* Very light purple backdrop from image */
        position: relative;
    }

    .chat-header {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(0,0,0,0.05);
        z-index: 10;
    }

    .h-left { display: flex; align-items: center; gap: 16px; }
    .h-icon { width: 44px; height: 44px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
    .h-info h2 { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 2px; }
    .h-team { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: #64748b; }

    .btn-more { color: #cbd5e1; }

    .message-stream {
        flex: 1;
        overflow-y: auto;
        padding: 40px;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .date-divider {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    .date-divider span {
        background: rgba(255,255,255,0.6);
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 10px;
        font-weight: 800;
        color: #94a3b8;
        letter-spacing: 1px;
    }

    .msg-row { display: flex; gap: 16px; max-width: 85%; }
    .msg-row.me { align-self: flex-end; flex-direction: row-reverse; }

    .avatar { width: 48px; height: 48px; border-radius: 12px; background-size: cover; border: 3px solid white; flex-shrink: 0; }

    .msg-content { display: flex; flex-direction: column; gap: 8px; }
    .msg-meta { display: flex; align-items: center; gap: 12px; font-size: 12px; }
    .msg-meta strong { font-weight: 800; color: #1e293b; }
    .msg-meta span { font-weight: 600; color: #94a3b8; }
    .msg-meta.me { justify-content: flex-end; }

    .bubble {
        background: white;
        padding: 20px 24px;
        border-radius: 24px;
        border-top-left-radius: 4px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.02);
    }

    .me .bubble {
        background: #654dcf;
        color: white;
        border-radius: 24px;
        border-top-right-radius: 4px;
        border-top-left-radius: 24px;
        box-shadow: 0 10px 30px rgba(101, 77, 207, 0.2);
    }

    .bubble p { font-size: 14.5px; line-height: 1.6; }

    .attachment-card {
        margin-top: 16px;
        background: #f8fafc;
        border: 1px solid #edf2f7;
        border-radius: 16px;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .attachment-card:hover { border-color: #654dcf; background: #ffffff; }
    .a-icon { width: 36px; height: 36px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
    .a-info strong { display: block; font-size: 13px; font-weight: 800; color: #1e293b; }
    .a-info span { font-size: 11px; font-weight: 600; color: #94a3b8; }

    .chat-footer {
        padding: 32px 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }

    .input-container {
        width: 100%;
        max-width: 1000px;
        background: white;
        border-radius: 24px;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.05);
    }

    .input-container input {
        flex: 1;
        border: none;
        padding: 12px;
        font-size: 14px;
        font-weight: 600;
        outline: none;
        color: #1e293b;
    }

    .icon-btn {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
        transition: all 0.2s;
    }

    .icon-btn:hover { background: #f1f5f9; color: #654dcf; }
    .icon-btn.action { background: #f1f5f9; color: #64748b; }

    .input-actions { display: flex; align-items: center; gap: 8px; }

    .send-btn {
        width: 44px;
        height: 44px;
        background: #f1f5f9;
        color: #cbd5e1;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .send-btn.active { background: #654dcf; color: white; box-shadow: 0 8px 16px rgba(101, 77, 207, 0.2); }

    .security-hint {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        font-weight: 700;
        color: #94a3b8;
    }
</style>
