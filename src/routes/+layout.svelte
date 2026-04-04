<script lang="ts">
    import "../app.css";
    import { onMount } from "svelte";
    import { goto, invalidateAll } from "$app/navigation";
    import { page } from "$app/state";
    import { fade, scale, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import {
        LayoutGrid,
        Activity,
        Banknote,
        Network,
        Palette,
        Users,
        MessageSquareText,
        ClipboardList,
        Database,
        ChartColumn,
        ShieldCheck,
        History,
        Menu,
        ChevronLeft,
        Search,
        Bell,
        Settings,
        Plus,
        LogOut,
        CircleAlert,
        CircleCheck,
        FolderOpen,
        Headphones,
    } from "lucide-svelte";
    import CreateProjectModal from "$lib/components/CreateProjectModal.svelte";

    const allNavItems = [
        { name: "Dashboard", role: "all", icon: LayoutGrid, href: "/" },
        {
            name: "Approvals",
            role: "exec",
            icon: CircleCheck,
            href: "/approvals",
        },
        {
            name: "Operations & Analytics",
            role: "admin",
            icon: Activity,
            href: "/operations",
        },
        {
            name: "Inquiry & Quotation",
            role: "admin",
            icon: Banknote,
            href: "/inquiry",
        },
        {
            name: "Projects & Workflow",
            role: "exec",
            icon: Network,
            href: "/projects",
        },
        {
            name: "Design & Revision",
            role: "admin",
            icon: Palette,
            href: "/design",
        },
        { name: "Clients", role: "exec", icon: Users, href: "/clients" },
        {
            name: "Communication",
            role: "exec",
            icon: MessageSquareText,
            href: "/communication",
        },
        {
            name: "Task Management",
            role: "admin",
            icon: ClipboardList,
            href: "/tasks",
        },
        {
            name: "Data Management",
            role: "admin",
            icon: Database,
            href: "/data",
        },
        { name: "Reports", role: "exec", icon: ChartColumn, href: "/reports" },
        {
            name: "Role Management",
            role: "admin",
            icon: ShieldCheck,
            href: "/roles",
        },
        { name: "Audit Log", role: "admin", icon: History, href: "/audit" },

        // Client Specific
        {
            name: "My Project",
            role: "client",
            icon: FolderOpen,
            href: "/my-projects",
        },
        {
            name: "Client Approvals",
            role: "client",
            icon: CircleCheck,
            href: "/client-approvals",
        },
        {
            name: "Quotations",
            role: "client",
            icon: Banknote,
            href: "/quotations",
        },
        {
            name: "Design & Files",
            role: "client",
            icon: Palette,
            href: "/files",
        },
        {
            name: "Client Chat",
            role: "client",
            icon: MessageSquareText,
            href: "/chat",
        },
        { name: "History", role: "client", icon: History, href: "/history" },
    ];

    let userRole = $state("");
    let isCollapsed = $state(false);
    let showLogoutModal = $state(false);
    let showCreateProjectModal = $state(false);
    let { children } = $props();

    const navItems = $derived.by(() => {
        if (!userRole) return [];
        if (userRole === "admin")
            return allNavItems.filter((item) =>
                ["all", "exec", "admin"].includes(item.role),
            );
        if (userRole === "management")
            return allNavItems.filter((item) =>
                ["all", "exec"].includes(item.role),
            );
        if (userRole === "client") {
            return [
                { name: "Dashboard", icon: LayoutGrid, href: "/" },
                { name: "My Project", icon: FolderOpen, href: "/my-projects" },
                {
                    name: "Approvals",
                    icon: CircleCheck,
                    href: "/client-approvals",
                },
                { name: "Quotations", icon: Banknote, href: "/quotations" },
                { name: "Design & Files", icon: Palette, href: "/files" },
                {
                    name: "Communication",
                    icon: MessageSquareText,
                    href: "/chat",
                },
                { name: "History", icon: History, href: "/history" },
            ];
        }
        return allNavItems.filter((item) => item.role === "all");
    });

    function toggleSidebar() {
        isCollapsed = !isCollapsed;
    }
    function confirmLogout() {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userRole");
        window.location.href = "/login";
    }

    const isLoginPage = $derived(
        page.url.pathname === "/login" || page.url.pathname === "/login/",
    );
    let isCheckingAuth = $state(true);

    onMount(() => {
        const isAuth = localStorage.getItem("isAuthenticated") === "true";
        userRole = localStorage.getItem("userRole") || "";
        if (!isAuth && !isLoginPage) goto("/login");
        else if (isAuth && isLoginPage) goto("/");
        isCheckingAuth = false;
    });
</script>

<svelte:head>
    <title
        >TechMould | {userRole === "client"
            ? "Client Portal"
            : "ERP System"}</title
    >
</svelte:head>

{#if isCheckingAuth}
    <div class="loading-state"><div class="spinner"></div></div>
{:else if isLoginPage}
    {@render children()}
{:else}
    <div class="layout" class:client-layout={userRole === "client"}>
        <!-- Sidebar with Premium Backdrop -->
        <aside class="sidebar {isCollapsed ? 'collapsed' : ''}">
            <div class="sidebar-header">
                <div class="logo">
                    <div class="logo-icon scale-up">TM</div>
                    {#if !isCollapsed}
                        <div class="logo-text" in:fade={{ delay: 100 }}>
                            <strong>TechMould</strong>
                            <span class="role-badge"
                                >{userRole === "client"
                                    ? "CLIENT"
                                    : "ERP " + userRole?.toUpperCase()}</span
                            >
                        </div>
                    {/if}
                </div>
                <button class="toggle-btn" onclick={toggleSidebar}
                    ><ChevronLeft size={18} /></button
                >
            </div>

            <nav class="nav-menu">
                {#each navItems as item}
                    {@const isActive = page.url.pathname === item.href}
                    <a
                        href={item.href}
                        class="nav-item {isActive ? 'active' : ''}"
                    >
                        <span class="icon" class:pulse={isActive}>
                            <item.icon
                                size={20}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                        </span>
                        {#if !isCollapsed}<span class="name">{item.name}</span
                            >{/if}
                    </a>
                {/each}
                {#if userRole === "client"}
                    <div class="nav-divider"></div>
                    <a href="/settings" class="nav-item"
                        ><span class="icon"><Settings size={20} /></span
                        >{#if !isCollapsed}<span class="name">Settings</span
                            >{/if}</a
                    >
                    <a href="/support" class="nav-item"
                        ><span class="icon"><Headphones size={20} /></span
                        >{#if !isCollapsed}<span class="name">Support</span
                            >{/if}</a
                    >
                {/if}
            </nav>

            <div class="sidebar-bottom">
                {#if userRole !== "client" && !isCollapsed}
                    <div class="storage-container">
                        <div class="storage-stats">
                            <span>DATA VAULT</span><span class="percent"
                                >71%</span
                            >
                        </div>
                        <div class="progress-track">
                            <div class="bar" style="width: 71%"></div>
                        </div>
                        <span class="detail">14.2 GB of 20 GB used</span>
                    </div>
                {/if}
            </div>
        </aside>

        <div class="main-container">
            <!-- Glass Header -->
            <header class="header glass">
                <div class="header-left">
                    {#if isCollapsed}
                        <button class="menu-btn" onclick={toggleSidebar}
                            ><Menu size={20} /></button
                        >
                    {/if}
                    <div class="search-engine">
                        <Search size={18} class="search-icon" />
                        <input
                            type="text"
                            placeholder={userRole === "client"
                                ? "Find projects, files or chats..."
                                : "Global search..."}
                        />
                        <span class="kb-hint">TM</span>
                    </div>
                </div>

                <div class="header-actions">
                    {#if userRole !== "client"}
                        <div class="action-buttons">
                            <button class="btn-ghost">Inquiry</button>
                            <button
                                class="btn-premium"
                                onclick={() => (showCreateProjectModal = true)}
                            >
                                <Plus size={18} />
                                New Project
                            </button>
                        </div>
                    {/if}

                    <div class="utility-icons">
                        <button class="icon-nav"
                            ><Bell size={20} /><span class="dot"></span></button
                        >
                        <button
                            class="icon-nav logout"
                            onclick={() => (showLogoutModal = true)}
                            ><LogOut size={20} /></button
                        >
                    </div>

                    <div class="user-block">
                        <div class="user-meta">
                            <span class="user-name"
                                >{userRole === "client"
                                    ? "Alex Rivera"
                                    : "Admin Manager"}</span
                            >
                            <span class="user-tier"
                                >{userRole === "client"
                                    ? "Premium Client"
                                    : "Executive " +
                                      userRole?.toUpperCase()}</span
                            >
                        </div>
                    </div>
                </div>
            </header>

            <main class="content">
                <div class="content-wrapper" in:fade={{ duration: 400 }}>
                    {@render children()}
                </div>
            </main>
        </div>
    </div>

    <!-- UI Improved Logout Modal -->
    {#if showLogoutModal}
        <div class="modal-overlay" transition:fade={{ duration: 200 }}>
            <div
                class="modal-card"
                transition:fly={{ y: 20, duration: 400, easing: cubicOut }}
            >
                <div class="modal-icon warning"><CircleAlert size={32} /></div>
                <h3>Terminate Session</h3>
                <p>
                    You are about to sign out of the TechMould portal. Your
                    active session will be securely closed.
                </p>
                <div class="modal-footer">
                    <button
                        class="btn-cancel"
                        onclick={() => (showLogoutModal = false)}
                        >Keep Exploring</button
                    >
                    <button class="btn-danger" onclick={confirmLogout}
                        >Sign Out Now</button
                    >
                </div>
            </div>
        </div>
    {/if}

    <CreateProjectModal
        bind:show={showCreateProjectModal}
        onCreated={() => invalidateAll()}
    />
{/if}

<style>
    /* Premium Root Styles */
    :global(:root) {
        --primary: #654dcf;
        --primary-light: #f5f3ff;
        --secondary: #4ecdc4;
        --text-base: #1e293b;
        --text-dim: #64748b;
        --bg-main: #f8fafc;
        --border-soft: #f1f5f9;
        --shadow-soft: 0 4px 12px rgba(0, 0, 0, 0.03);
        --glass-bg: rgba(255, 255, 255, 0.8);
        --glass-border: rgba(255, 255, 255, 0.18);
    }

    .layout {
        display: flex;
        height: 100vh;
        overflow: hidden;
        background: var(--bg-main);
        font-family: "Inter", sans-serif;
    }
    .client-layout {
        background: #ffffff;
    }

    /* Sidebar Refinement */
    .sidebar {
        width: 280px;
        min-width: 280px;
        flex-shrink: 0;
        background: #ffffff;
        border-right: 1px solid var(--border-soft);
        display: flex;
        flex-direction: column;
        padding: 32px 0;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 100;
        overflow-x: hidden;
    }

    .sidebar.collapsed {
        width: 0;
        min-width: 0;
        flex-basis: 0;
        padding: 0;
        border-right: none;
        opacity: 0;
        pointer-events: none;
    }

    .sidebar-bottom {
        padding: 0 20px;
        margin-top: auto;
    }

    .storage-container {
        background: #f8fafc;
        border-radius: 16px;
        padding: 20px;
        border: 1px solid var(--border-soft);
    }
    .storage-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }
    .storage-stats span {
        font-size: 10px;
        font-weight: 800;
        color: #94a3b8;
        letter-spacing: 0.5px;
    }
    .storage-stats .percent {
        color: var(--primary);
    }
    .progress-track {
        height: 6px;
        background: #e2e8f0;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    .progress-track .bar {
        height: 100%;
        background: var(--primary);
        border-radius: 10px;
        transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .storage-container .detail {
        display: block;
        font-size: 10px;
        font-weight: 700;
        color: #64748b;
    }

    .sidebar-header {
        padding: 0 32px;
        margin-bottom: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .logo-icon {
        background: var(--primary);
        color: white;
        min-width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(101, 77, 207, 0.2);
    }

    .logo-text {
        white-space: nowrap;
        overflow: hidden;
    }
    .logo-text strong {
        display: block;
        font-size: 18px;
        color: var(--text-base);
        line-height: 1.1;
    }
    .role-badge {
        font-size: 10px;
        font-weight: 800;
        color: var(--primary);
        letter-spacing: 1px;
    }

    .nav-menu {
        flex: 1;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 14px 18px;
        border-radius: 14px;
        color: var(--text-dim);
        text-decoration: none;
        font-weight: 600;
        font-size: 14.5px;
        transition: all 0.3s ease;
        white-space: nowrap;
        overflow: hidden;
    }

    .nav-item:hover {
        background: #f8fafc;
        color: var(--primary);
        transform: translateX(4px);
    }
    .nav-item.active {
        background: var(--primary-light);
        color: var(--primary);
    }

    .nav-divider {
        height: 1px;
        background: var(--border-soft);
        margin: 24px 0;
    }

    /* Main Container & Glass Header */
    .main-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .header {
        height: 90px;
        padding: 0 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-soft);
        z-index: 50;
    }

    .header.glass {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }

    .search-engine {
        background: #f1f5f9;
        border-radius: 14px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        gap: 14px;
        width: 380px;
        border: 1px solid transparent;
        transition: all 0.2s;
    }

    .search-engine:focus-within {
        background: white;
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(101, 77, 207, 0.08);
    }

    .search-engine input {
        border: none;
        background: transparent;
        padding: 14px 0;
        font-size: 14px;
        color: var(--text-base);
        outline: none;
        width: 100%;
    }
    .kb-hint {
        font-size: 10px;
        font-weight: 700;
        color: #94a3b8;
        background: white;
        padding: 4px 8px;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 32px;
    }

    .action-buttons {
        display: flex;
        gap: 14px;
    }
    .btn-premium {
        background: var(--primary);
        color: white;
        padding: 14px 24px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 20px rgba(101, 77, 207, 0.2);
        transition: all 0.2s;
    }
    .btn-premium:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(101, 77, 207, 0.3);
    }

    .utility-icons {
        display: flex;
        gap: 16px;
        border-right: 1px solid var(--border-soft);
        padding-right: 32px;
    }
    .icon-nav {
        position: relative;
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-dim);
        transition: all 0.2s;
    }
    .icon-nav:hover {
        background: #f8fafc;
        color: var(--primary);
    }
    .icon-nav .dot {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 8px;
        height: 8px;
        background: #ef4444;
        border-radius: 50%;
        border: 2px solid white;
    }

    .user-block {
        display: flex;
        align-items: center;
        gap: 18px;
    }
    .user-meta {
        text-align: right;
    }
    .user-name {
        display: block;
        font-weight: 700;
        font-size: 15px;
        color: var(--text-base);
    }
    .user-tier {
        font-size: 11px;
        font-weight: 600;
        color: var(--text-dim);
    }

    .content {
        flex: 1;
        overflow-y: auto;
        padding: 48px;
    }

    /* Modal Redesign */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    }
    .modal-card {
        background: white;
        width: 440px;
        padding: 56px 48px;
        border-radius: 32px;
        text-align: center;
        box-shadow: 0 40px 100px rgba(0, 0, 0, 0.2);
    }
    .modal-icon.warning {
        background: #fff1f2;
        color: #e11d48;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 32px;
    }
    .modal-card h3 {
        font-size: 24px;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 16px;
    }
    .modal-card p {
        font-size: 15px;
        color: #64748b;
        line-height: 1.6;
        margin-bottom: 40px;
    }

    .modal-footer {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .btn-danger {
        background: #e11d48;
        color: white;
        padding: 16px;
        border-radius: 14px;
        font-weight: 700;
        font-size: 15px;
        box-shadow: 0 10px 20px rgba(225, 29, 72, 0.2);
    }
    .btn-cancel {
        background: #f1f5f9;
        color: #475569;
        padding: 16px;
        border-radius: 14px;
        font-weight: 700;
        font-size: 15px;
    }

    .loading-state {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
    }
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f1f5f9;
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* Micro-Animations */
    .scale-up:hover {
        transform: scale(1.05);
    }
    .pulse {
        animation: pulse-soft 2s infinite;
    }
    @keyframes pulse-soft {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
        100% {
            opacity: 1;
        }
    }
</style>
