<script lang="ts">
    import {
        Phone,
        Video,
        Info,
        Plus,
        Smile,
        Mic,
        Send,
        Paperclip,
        Calendar,
        FileText,
        Download,
        Search,
        ChevronDown,
        Pin,
    } from "lucide-svelte";

    import sarah from "$lib/assets/sarah.png";
    import david from "$lib/assets/david.png";
    import elena from "$lib/assets/elena.png";
    import apexLogo from "$lib/assets/apex-logo.png";

    // State for active conversation
    let selectedId = $state(1);

    const conversations = [
        {
            id: 1,
            name: "Sarah Jenkins",
            role: "Account Executive",
            company: "Global Logistics Corp",
            msg: "Typing...",
            time: "10:45 AM",
            unread: true,
            img: sarah,
        },
        {
            id: 2,
            name: "David Miller",
            role: "Lead Engineer",
            company: "Nexus Automotive",
            msg: "The quarterly report looks great...",
            time: "Yesterday",
            unread: false,
            img: david,
        },
        {
            id: 3,
            name: "Apex Manufacturing",
            role: "Production Hub",
            company: "Apex Group",
            msg: "Sent a file: PO-88201.pdf",
            time: "Mon",
            unread: false,
            img: apexLogo,
        },
        {
            id: 4,
            name: "Elena Rodriguez",
            role: "Procurement Manager",
            company: "SpaceX",
            msg: "Confirmed. See you on Wednes...",
            time: "Oct 12",
            unread: false,
            img: elena,
        },
    ];

    const chatData = {
        1: {
            messages: [
                { type: "divider", text: "OCTOBER 15, 2023" },
                {
                    type: "incoming",
                    text: "Hello team, we've reviewed the latest mould designs for the Project Omega chassis. Could you clarify the lead time for the first 500 units?",
                    time: "10:32 AM",
                },
                {
                    type: "outgoing",
                    text: "Good morning Sarah! Based on our current capacity, we can deliver the first batch in 14 business days. I'll attach the formal schedule for your review.",
                    time: "10:35 AM",
                },
                {
                    type: "outgoing",
                    file: "Project_Omega_Phase1_Schedule.pdf",
                    size: "2.4 MB",
                    time: "10:35 AM",
                },
            ],
            projects: [
                { name: "Project Omega", progress: 82 },
                { name: "Mould Alpha-7", status: "Planned" },
            ],
            files: [
                { name: "Spec_Sheet_v4.pdf" },
                { name: "render_omega_01.png" },
            ],
        },
        2: {
            messages: [
                { type: "divider", text: "YESTERDAY" },
                {
                    type: "incoming",
                    text: "Hey! Just finished the stress tests for the new engine block. The results are within 2% of the simulation. Looks stable.",
                    time: "2:15 PM",
                },
                {
                    type: "outgoing",
                    text: "That's fantastic news David. Should we move forward with the material selection or do you want one more round of validation?",
                    time: "2:30 PM",
                },
                {
                    type: "incoming",
                    text: "The quarterly report looks great, let's proceed with the validation first.",
                    time: "3:00 PM",
                },
            ],
            projects: [
                { name: "Engine V8 Block", progress: 45 },
                { name: "Piston Rev-3", status: "Active" },
            ],
            files: [
                { name: "Stress_Test_Report.pdf" },
                { name: "Cad_Model_Final.stp" },
            ],
        },
        3: {
            messages: [
                { type: "divider", text: "MONDAY" },
                {
                    type: "incoming",
                    text: "Please find the signed Purchase Order for the upcoming batch. We need these by the end of next month.",
                    time: "9:00 AM",
                },
                {
                    type: "incoming",
                    file: "PO-88201.pdf",
                    size: "1.1 MB",
                    time: "9:02 AM",
                },
                {
                    type: "outgoing",
                    text: "Received. Our production team has already added it to the schedule. We'll update the portal by EOD.",
                    time: "11:45 AM",
                },
            ],
            projects: [{ name: "Batch 801 Order", progress: 10 }],
            files: [
                { name: "PO-88201.pdf" },
                { name: "Shipping_Label_V1.pdf" },
            ],
        },
        4: {
            messages: [
                { type: "divider", text: "OCTOBER 12" },
                {
                    type: "incoming",
                    text: "We're planning a visit to the facility next Wednesday. Is the team available for a quick workshop?",
                    time: "4:20 PM",
                },
                {
                    type: "outgoing",
                    text: "Confirmed. See you on Wednesday! We'll prepare the workshop area and the current prototypes.",
                    time: "5:10 PM",
                },
            ],
            projects: [{ name: "Starship Internal Valve", progress: 95 }],
            files: [{ name: "Visit_Agenda.docx" }],
        },
    };

    const currentChat = $derived(chatData[selectedId]);
    const currentUser = $derived(
        conversations.find((c) => c.id === selectedId),
    );
</script>

<svelte:head>
    <title>Communication | TechMould ERP</title>
</svelte:head>

<div class="comm-page">
    <!-- Left Column: Messages List -->
    <aside class="msg-list-side">
        <div class="list-header">
            <div class="title-row">
                <h2>MESSAGES</h2>
                <span class="badge-new">12 New</span>
            </div>
        </div>

        <div class="chat-list">
            {#each conversations as chat}
                <button
                    class="chat-item {selectedId === chat.id ? 'active' : ''}"
                    onclick={() => (selectedId = chat.id)}
                >
                    <div class="avatar-box">
                        <div class="avatar">
                            <img
                                src={chat.img}
                                alt={chat.name}
                                class="avatar-img"
                            />
                        </div>
                        {#if chat.unread}
                            <div class="online-indicator"></div>
                        {/if}
                    </div>
                    <div class="chat-info">
                        <div class="chat-top">
                            <span class="name">{chat.name}</span>
                            <span class="time">{chat.time}</span>
                        </div>
                        <p
                            class="last-msg {chat.msg === 'Typing...'
                                ? 'typing'
                                : ''}"
                        >
                            {chat.msg}
                        </p>
                    </div>
                </button>
            {/each}
        </div>
    </aside>

    <!-- Center Column: Chat Window -->
    <main class="chat-center">
        <header class="chat-header">
            <div class="active-user">
                <div class="avatar small">
                    <img
                        src={currentUser?.img}
                        alt={currentUser?.name}
                        class="avatar-img"
                    />
                </div>
                <div class="user-text">
                    <h3>{currentUser?.name}</h3>
                    <span>{currentUser?.role}</span>
                </div>
            </div>
            <div class="header-tools">
                <button class="tool-btn"><Phone size={18} /></button>
                <button class="tool-btn"><Video size={18} /></button>
                <button class="tool-btn"><Info size={18} /></button>
            </div>
        </header>

        <div class="messages-area">
            {#each currentChat.messages as msg}
                {#if msg.type === "divider"}
                    <div class="date-divider"><span>{msg.text}</span></div>
                {:else if msg.type === "incoming"}
                    <div class="msg-incoming">
                        <div class="avatar mini">
                            <img
                                src={currentUser?.img || sarah}
                                alt="user"
                                class="avatar-img"
                            />
                        </div>
                        <div class="bubble-container">
                            <div class="bubble">{msg.text}</div>
                            <span class="time">{msg.time}</span>
                        </div>
                    </div>
                {:else if msg.type === "outgoing"}
                    {#if msg.file}
                        <div class="msg-outgoing">
                            <div class="bubble-container">
                                <div class="file-bubble">
                                    <div class="file-icon">
                                        <FileText size={20} />
                                    </div>
                                    <div class="file-info">
                                        <span class="filename">{msg.file}</span>
                                        <span class="filesize">{msg.size}</span>
                                    </div>
                                    <button class="download-btn"
                                        ><Download size={16} /></button
                                    >
                                </div>
                                <span class="time">{msg.time} • Read</span>
                            </div>
                        </div>
                    {:else}
                        <div class="msg-outgoing">
                            <div class="bubble-container">
                                <div class="bubble purple">{msg.text}</div>
                                <span class="time">{msg.time} • Read</span>
                            </div>
                        </div>
                    {/if}
                {/if}
            {/each}

            <!-- Skeleton Typing Indicator -->
            {#if currentUser?.msg === "Typing..."}
                <div class="msg-incoming">
                    <div class="avatar mini">
                        <img
                            src={currentUser?.img}
                            alt="typing"
                            class="avatar-img"
                        />
                    </div>
                    <div class="typing-bubble">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            {/if}
        </div>

        <footer class="chat-footer">
            <div class="input-container">
                <div class="input-actions">
                    <button class="action-icon"><Plus size={18} /></button>
                    <button class="action-icon"><Smile size={18} /></button>
                </div>
                <input type="text" placeholder="Type your message..." />
                <div class="input-actions">
                    <button class="action-icon"><Mic size={18} /></button>
                    <button class="send-btn"
                        ><Send size={18} color="white" /></button
                    >
                </div>
            </div>
            <div class="shortcut-bar">
                <button class="shortcut"
                    ><Paperclip size={14} /> Attach File</button
                >
                <button class="shortcut"
                    ><Calendar size={14} /> Schedule Meeting</button
                >
                <button class="shortcut"
                    ><FileText size={14} /> Insert Template</button
                >
            </div>
        </footer>
    </main>

    <!-- Right Column: Client Profile -->
    <aside class="profile-preview-side">
        <div class="side-header">
            <h3>CLIENT PROFILE</h3>
        </div>
        <div class="profile-main">
            <div class="avatar-lg">
                <img
                    src={currentUser?.img}
                    alt="Profile"
                    class="avatar-img-lg"
                />
            </div>
            <h3>{currentUser?.name}</h3>
            <span class="company">{currentUser?.company}</span>
        </div>

        <div class="profile-section">
            <h4>ACTIVE PROJECTS</h4>
            <div class="proj-list">
                {#each currentChat.projects as proj}
                    <div class="proj-item">
                        <span class="p-name">{proj.name}</span>
                        {#if proj.progress}
                            <span class="p-val">{proj.progress}%</span>
                        {:else}
                            <span class="p-status">{proj.status}</span>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>

        <div class="profile-section">
            <h4>SHARED FILES</h4>
            <div class="file-list">
                {#each currentChat.files as file}
                    <div class="file-item">
                        <FileText size={14} />
                        <span>{file.name}</span>
                    </div>
                {/each}
            </div>
        </div>
    </aside>
</div>

<style>
    .comm-page {
        display: flex;
        height: calc(100vh - 100px);
        margin: -24px;
        background: white;
    }

    /* List Side */
    .msg-list-side {
        width: 320px;
        border-right: 1px solid #f1f3f7;
        display: flex;
        flex-direction: column;
    }

    .list-header {
        padding: 24px;
        border-bottom: 1px solid #f1f3f7;
    }

    .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title-row h2 {
        font-size: 11px;
        font-weight: 800;
        color: #1a1a1a;
        letter-spacing: 0.5px;
    }
    .badge-new {
        background: #654dcf;
        color: white;
        font-size: 10px;
        font-weight: 800;
        padding: 2px 8px;
        border-radius: 100px;
    }

    .chat-list {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }

    .chat-item {
        display: flex;
        gap: 16px;
        padding: 20px 24px;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
        background: transparent;
        border-left: 3px solid transparent;
        text-align: left;
        width: 100%;
    }

    .chat-item:hover {
        background: #f8f9fc;
    }
    .chat-item.active {
        background: #f8f9fc;
        border-left-color: #654dcf;
    }

    .avatar-box {
        position: relative;
    }
    .avatar {
        width: 44px;
        height: 44px;
        background: #e2e8f0;
        border-radius: 8px;
        overflow: hidden;
    }
    .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .online-indicator {
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 10px;
        height: 10px;
        background: #4ecdc4;
        border: 2px solid white;
        border-radius: 50%;
    }

    .chat-info {
        flex: 1;
    }
    .chat-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
    }
    .chat-top .name {
        font-size: 13px;
        font-weight: 800;
        color: #1a1a1a;
    }
    .chat-top .time {
        font-size: 10px;
        font-weight: 700;
        color: #a0aec0;
    }
    .last-msg {
        font-size: 11px;
        font-weight: 600;
        color: #718096;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px;
    }
    .last-msg.typing {
        color: #654dcf;
        font-style: italic;
    }

    /* Chat Center */
    .chat-center {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #f8f9fc;
        border-right: 1px solid #f1f3f7;
    }

    .chat-header {
        background: white;
        padding: 16px 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f1f3f7;
        height: 72px;
    }

    .active-user {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .avatar.small {
        width: 36px;
        height: 36px;
    }
    .user-text h3 {
        font-size: 14px;
        font-weight: 800;
    }
    .user-text span {
        font-size: 11px;
        color: #a0aec0;
        font-weight: 600;
    }

    .header-tools {
        display: flex;
        gap: 12px;
    }
    .tool-btn {
        color: #a0aec0;
        padding: 6px;
    }

    .messages-area {
        flex: 1;
        overflow-y: auto;
        padding: 32px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .date-divider {
        text-align: center;
        position: relative;
        margin: 16px 0;
    }
    .date-divider::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 1px;
        background: #edf2f7;
        z-index: 1;
    }
    .date-divider span {
        background: #f8f9fc;
        padding: 0 16px;
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        position: relative;
        z-index: 2;
    }

    .msg-incoming,
    .msg-outgoing {
        display: flex;
        gap: 12px;
        align-items: flex-end;
    }
    .msg-outgoing {
        justify-content: flex-end;
    }
    .avatar.mini {
        width: 28px;
        height: 28px;
        border-radius: 6px;
    }

    .bubble-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-width: 480px;
    }
    .bubble {
        background: white;
        padding: 14px 18px;
        border-radius: 12px 12px 12px 0;
        font-size: 13px;
        font-weight: 600;
        line-height: 1.5;
        color: #1a1a1a;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
    }
    .bubble.purple {
        background: #654dcf;
        color: white;
        border-radius: 12px 12px 0 12px;
    }
    .time {
        font-size: 9px;
        font-weight: 800;
        color: #a0aec0;
    }
    .msg-outgoing .time {
        text-align: right;
    }

    /* File Bubble */
    .file-bubble {
        background: #654dcf;
        color: white;
        padding: 16px;
        border-radius: 12px 12px 0 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        width: 320px;
    }
    .file-icon {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .file-info {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .filename {
        font-size: 11px;
        font-weight: 800;
    }
    .filesize {
        font-size: 10px;
        opacity: 0.7;
        font-weight: 700;
    }

    /* Typing */
    .typing-bubble {
        background: white;
        padding: 12px 16px;
        border-radius: 12px 12px 12px 0;
        display: flex;
        gap: 4px;
        align-items: center;
    }
    .typing-bubble span {
        width: 5px;
        height: 5px;
        background: #cbd5e0;
        border-radius: 50%;
        animation: typingDots 1.4s infinite ease-in-out;
    }
    .typing-bubble span:nth-child(2) {
        animation-delay: 0.2s;
    }
    .typing-bubble span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes typingDots {
        0%,
        60%,
        100% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-4px);
        }
    }

    /* Chat Footer */
    .chat-footer {
        background: white;
        padding: 24px 32px;
        border-top: 1px solid #f1f3f7;
    }
    .input-container {
        background: #f4f7fa;
        border-radius: 12px;
        display: flex;
        align-items: center;
        padding: 8px 16px;
        margin-bottom: 20px;
    }
    input {
        flex: 1;
        background: transparent;
        border: none;
        padding: 12px;
        font-size: 13px;
        font-weight: 600;
        color: #1a1a1a;
    }
    input:focus {
        outline: none;
    }
    .input-actions {
        display: flex;
        gap: 8px;
    }
    .action-icon {
        color: #a0aec0;
        padding: 8px;
    }
    .send-btn {
        background: #654dcf;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
    }

    .shortcut-bar {
        display: flex;
        gap: 24px;
    }
    .shortcut {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
        transition: all 0.2s;
    }
    .shortcut:hover {
        color: #654dcf;
    }

    /* Profile Preview Side */
    .profile-preview-side {
        width: 280px;
        background: white;
        display: flex;
        flex-direction: column;
        padding: 32px;
    }

    .side-header h3 {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        letter-spacing: 0.5px;
        margin-bottom: 40px;
    }

    .profile-main {
        text-align: center;
        margin-bottom: 48px;
    }
    .avatar-lg {
        width: 80px;
        height: 80px;
        background: #edf2f7;
        border-radius: 50%;
        margin: 0 auto 16px;
        overflow: hidden;
    }
    .avatar-img-lg {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .profile-main h3 {
        font-size: 16px;
        font-weight: 800;
        margin-bottom: 4px;
    }
    .company {
        font-size: 12px;
        color: #a0aec0;
        font-weight: 700;
    }

    .profile-section {
        margin-bottom: 32px;
    }
    .profile-section h4 {
        font-size: 10px;
        font-weight: 800;
        color: #a0aec0;
        margin-bottom: 16px;
    }

    .proj-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .proj-item {
        background: #f8f9fc;
        padding: 12px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .p-name {
        font-size: 11px;
        font-weight: 800;
    }
    .p-val {
        font-size: 11px;
        font-weight: 800;
        color: #654dcf;
    }
    .p-status {
        font-size: 11px;
        font-weight: 800;
        color: #a0aec0;
    }

    .file-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .file-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 11px;
        font-weight: 700;
        color: #1a1a1a;
    }
</style>
