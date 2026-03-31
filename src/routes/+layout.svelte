<script lang="ts">
    import "../app.css";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
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
        BarChart3,
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
    } from "lucide-svelte";

    const navItems = [
        { name: "Dashboard", icon: LayoutGrid, href: "/" },
        { name: "Operations & Analytics", icon: Activity, href: "/operations" },
        { name: "Inquiry & Quotation", icon: Banknote, href: "/inquiry" },
        { name: "Projects & Workflow", icon: Network, href: "/projects" },
        { name: "Design & Revision", icon: Palette, href: "/design" },
        { name: "Clients", icon: Users, href: "/clients" },
        {
            name: "Communication",
            icon: MessageSquareText,
            href: "/communication",
        },
        { name: "Task Management", icon: ClipboardList, href: "/tasks" },
        { name: "Data Management", icon: Database, href: "/data" },
        { name: "Reports", icon: BarChart3, href: "/reports" },
        { name: "Role Management", icon: ShieldCheck, href: "/roles" },
        { name: "Audit Log", icon: History, href: "/audit" },
    ];

    let isCollapsed = $state(false);
    let showLogoutModal = $state(false);
    let { children } = $props();

    function toggleSidebar() {
        isCollapsed = !isCollapsed;
    }

    function confirmLogout() {
        localStorage.removeItem("isAuthenticated");
        window.location.href = "/login";
    }

    const isLoginPage = $derived(
        page.url.pathname === "/login" || page.url.pathname === "/login/",
    );
    let isCheckingAuth = $state(true);

    onMount(() => {
        const isAuth = localStorage.getItem("isAuthenticated") === "true";

        if (!isAuth && !isLoginPage) {
            goto("/login");
        } else if (isAuth && isLoginPage) {
            goto("/");
        }

        // Always clear the loading state so the destination page properly renders
        isCheckingAuth = false;
    });
</script>

{#if isCheckingAuth}
    <div class="loading-state">
        <div class="spinner"></div>
    </div>
{:else if isLoginPage}
    {@render children()}
{:else}
    <div class="layout">
        <!-- Sidebar -->
        <aside class="sidebar {isCollapsed ? 'collapsed' : ''}">
            <div class="sidebar-header">
                <div class="logo">
                    <div class="logo-icon">TM</div>
                    {#if !isCollapsed}
                        <div class="logo-text">
                            <strong>TechMould</strong>
                            <span>ERP ADMIN</span>
                        </div>
                    {/if}
                </div>
                <button class="toggle-btn" onclick={toggleSidebar}>
                    <ChevronLeft size={20} />
                </button>
            </div>

            <nav class="nav-menu">
                {#each navItems as item}
                    {@const isActive = page.url.pathname === item.href}
                    <a
                        href={item.href}
                        class="nav-item {isActive ? 'active' : ''}"
                    >
                        <span class="icon">
                            <item.icon size={20} strokeWidth={2} />
                        </span>
                        {#if !isCollapsed}
                            <span class="name">{item.name}</span>
                        {/if}
                    </a>
                {/each}
            </nav>

            <div class="sidebar-bottom">
                {#if !isCollapsed}
                    <div class="storage-card">
                        <div class="storage-info">
                            <span>STORAGE USED</span>
                            <span class="percent">71%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: 71%"></div>
                        </div>
                        <span class="storage-detail">14.2 GB of 20 GB used</span
                        >
                    </div>
                {:else}
                    <div class="storage-mini">
                        <Database size={16} />
                    </div>
                {/if}
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="main-container">
            <!-- Header -->
            <header class="header">
                <div class="header-left">
                    {#if isCollapsed}
                        <button class="menu-btn" onclick={toggleSidebar}>
                            <Menu size={20} />
                        </button>
                    {/if}

                    <div class="search-bar">
                        <Search size={18} class="search-icon" />
                        <input
                            type="text"
                            placeholder="Search projects, clients, or inquiries..."
                        />
                    </div>
                </div>

                <div class="header-actions">
                    <button class="btn-light">Inquiry</button>
                    <button class="btn-primary">
                        <Plus size={18} />
                        Project
                    </button>
                    <div class="icon-group">
                        <button class="icon-btn"><Bell size={20} /></button>
                        <button class="icon-btn"><Settings size={20} /></button>
                        <button
                            class="icon-btn logout-btn"
                            onclick={() => (showLogoutModal = true)}
                            title="Log Out"><LogOut size={20} /></button
                        >
                    </div>
                    <div class="profile">
                        <div class="pfp"></div>
                        <div class="profile-info">
                            <span class="profile-name">Alex Rivers</span>
                            <span class="profile-role">Admin Manager</span>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main class="content">
                {@render children()}
            </main>
        </div>
    </div>

    <!-- Logout Confirmation Modal -->
    {#if showLogoutModal}
        <div class="modal-backdrop">
            <div class="logout-modal">
                <div class="modal-icon-box">
                    <CircleAlert size={24} color="#f39c12" />
                </div>
                <h3>Log Out</h3>
                <p>
                    Are you sure you want to log out of the Admin ERP dashboard?
                    You will need your credentials to access it again.
                </p>
                <div class="modal-actions">
                    <button
                        class="btn-cancel"
                        onclick={() => (showLogoutModal = false)}>Cancel</button
                    >
                    <button class="btn-danger" onclick={confirmLogout}
                        >Log Out</button
                    >
                </div>
            </div>
        </div>
    {/if}
{/if}

<style>
    .layout {
        display: flex;
        height: 100vh;
        overflow: hidden;
    }

    .sidebar {
        width: 260px;
        background: var(--bg-sidebar);
        border-right: 1px solid var(--border);
        display: flex;
        flex-direction: column;
        padding: 24px 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        z-index: 100;
        overflow: hidden;
    }

    .sidebar.collapsed {
        width: 0;
        padding-left: 0;
        padding-right: 0;
        border-right: none;
    }

    .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        margin-bottom: 32px;
        height: 40px;
    }

    .sidebar.collapsed .sidebar-header {
        padding: 0;
        justify-content: center;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        overflow: hidden;
    }

    .logo-icon {
        background: var(--primary);
        color: white;
        min-width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border-radius: 6px;
        font-size: 14px;
        flex-shrink: 0;
    }

    .logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
        white-space: nowrap;
    }

    .logo-text strong {
        font-size: 16px;
        color: #1a1a1a;
    }

    .logo-text span {
        font-size: 10px;
        color: var(--text-sub);
        letter-spacing: 0.5px;
    }

    .toggle-btn {
        color: var(--text-sub);
        padding: 4px;
        border-radius: 4px;
        transition: background 0.2s;
    }

    .toggle-btn:hover {
        background: #f1f2f6;
        color: var(--primary);
        transform: scale(1.1);
    }

    .toggle-btn:active {
        transform: scale(0.95);
    }

    .sidebar.collapsed .toggle-btn {
        position: absolute;
        bottom: -40px; /* Hidden or adjusted for collapsed state if needed */
        display: none;
    }

    /* Optional: Hover to show toggle when collapsed or keep a toggle button elsewhere */
    .sidebar.collapsed .logo {
        margin-bottom: 0;
    }

    /* Redefine toggle button for collapsed state */
    .sidebar.collapsed .sidebar-header {
        flex-direction: column;
        gap: 20px;
        height: auto;
    }

    .nav-menu {
        flex: 1;
        overflow-y: auto;
        padding: 0 12px;
    }

    .nav-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        margin-bottom: 4px;
        border-radius: 8px;
        color: var(--text-sub);
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
        text-align: left;
        white-space: nowrap;
    }

    .sidebar.collapsed .nav-item {
        justify-content: center;
        padding: 12px 0;
    }

    .nav-item:hover {
        background: var(--primary-light);
        color: var(--primary);
        padding-left: 14px; /* subtle shift right */
    }

    .nav-item.active {
        background: var(--primary);
        color: white;
        box-shadow: 0 4px 12px rgba(101, 77, 207, 0.2);
    }

    .nav-item:active {
        transform: scale(0.98);
    }

    .sidebar-bottom {
        padding: 0 12px;
        margin-top: 20px;
    }

    .storage-card {
        background: #f8f9fc;
        padding: 16px;
        border-radius: 12px;
    }

    .storage-mini {
        display: flex;
        justify-content: center;
        color: var(--text-sub);
        padding: 12px 0;
    }

    .storage-info {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        font-weight: 700;
        color: var(--text-sub);
        margin-bottom: 8px;
    }

    .progress-bar {
        height: 6px;
        background: #e1e4ed;
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 8px;
    }

    .progress {
        height: 100%;
        background: var(--primary);
    }

    .storage-detail {
        font-size: 10px;
        color: var(--text-sub);
    }

    /* Header & Main */
    .main-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .header {
        height: 70px;
        background: var(--white);
        border-bottom: 1px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 32px;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .menu-btn {
        color: var(--text-sub);
        padding: 8px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
        background: #f4f7fa;
    }

    .menu-btn:hover {
        background: #eef1f5;
    }

    .search-bar {
        background: #f4f7fa;
        border-radius: 8px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        width: 400px;
    }

    .search-bar :global(.search-icon) {
        color: var(--text-sub);
    }

    .search-bar input {
        border: none;
        background: none;
        padding: 10px 0;
        width: 100%;
        outline: none;
        font-size: 14px;
        height: 100%;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .btn-light {
        background: #f1f2f6;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
    }

    .btn-primary {
        background: var(--primary);
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .icon-group {
        display: flex;
        gap: 15px;
        border-right: 1px solid var(--border);
        padding-right: 20px;
        color: var(--text-sub);
    }

    .icon-btn {
        display: flex;
        align-items: center;
    }

    .profile {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .pfp {
        width: 40px;
        height: 40px;
        background: #000;
        border-radius: 50%;
    }

    .profile-info {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
    }

    .profile-name {
        font-weight: 600;
        font-size: 14px;
    }

    .profile-role {
        font-size: 11px;
        color: var(--text-sub);
    }

    .content {
        flex: 1;
        overflow-y: auto;
        padding: 32px;
    }

    /* Custom scrollbar */
    nav::-webkit-scrollbar {
        width: 4px;
    }
    nav::-webkit-scrollbar-thumb {
        background: var(--border);
        border-radius: 2px;
    }

    /* Logout Modal */
    .logout-btn {
        color: #e53e3e;
        transition: color 0.2s;
    }
    .logout-btn:hover {
        color: #c53030;
    }

    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }

    .logout-modal {
        background: white;
        width: 360px;
        border-radius: 12px;
        padding: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .modal-icon-box {
        width: 56px;
        height: 56px;
        background: #fff5e6;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }

    .logout-modal h3 {
        font-size: 20px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 12px;
    }

    .logout-modal p {
        font-size: 13px;
        color: #718096;
        line-height: 1.6;
        margin-bottom: 32px;
        font-weight: 500;
    }

    .modal-actions {
        display: flex;
        width: 100%;
        gap: 12px;
    }

    .btn-cancel {
        flex: 1;
        padding: 12px;
        background: #f1f3f7;
        color: #4a5568;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
        transition: background 0.2s;
    }

    .btn-cancel:hover {
        background: #e2e8f0;
    }

    .btn-danger {
        flex: 1;
        padding: 12px;
        background: #e53e3e;
        color: white;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
        transition: background 0.2s;
    }

    .btn-danger:hover {
        background: #c53030;
    }

    /* Full Screen Loading Guard */
    .loading-state {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background: white;
    }
    .spinner {
        width: 28px;
        height: 28px;
        border: 3px solid #edf2f7;
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin-global 0.8s linear infinite;
    }
    @keyframes spin-global {
        to {
            transform: rotate(360deg);
        }
    }
</style>
