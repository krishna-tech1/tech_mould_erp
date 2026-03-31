<script lang="ts">
    import type { PageProps } from "./$types";
    import { enhance } from "$app/forms";
    import logo from "$lib/assets/logo.png";

    import {
        Mail,
        Lock,
        ArrowRight,
        Briefcase,
        CircleUser,
        Users,
        CircleCheck,
        Eye,
        EyeOff,
    } from "lucide-svelte";

    let { form }: PageProps = $props();
    let activeRole = $state("admin");
    let email = $state("");
    let password = $state("");
    let showPassword = $state(false);
    let isLoading = $state(false);
    let errorMessage = $state("");

    const roles = [
        { id: "admin", label: "Management", icon: Briefcase },
        { id: "employee", label: "Employees", icon: CircleUser },
        { id: "client", label: "Clients", icon: Users },
    ];
</script>

<svelte:head>
    <title>Login | TechMould ERP</title>
</svelte:head>

<div class="login-page">
    <div class="split-layout">
        <!-- Left Side - Branded Area -->
        <div class="brand-panel">
            <div class="brand-content">
                <div class="brand-text-logo">
                    <span class="the">THE</span>
                    <span class="tech-mould">TECH MOULD</span>
                </div>

                <div class="hero-text">
                    <h1>Enterprise Resource Planning</h1>
                    <p>We Offers Best Quality Die Casting Products</p>
                </div>

                <div class="feature-list">
                    <div class="feature-item">
                        <span class="f-icon"><CircleCheck size={18} /></span>
                        <span>Real-time Financial Tracking & Auditing</span>
                    </div>
                    <div class="feature-item">
                        <span class="f-icon"><CircleCheck size={18} /></span>
                        <span>Automated Manufacturing Pipelines</span>
                    </div>
                    <div class="feature-item">
                        <span class="f-icon"><CircleCheck size={18} /></span>
                        <span>Secure Client Data Warehousing</span>
                    </div>
                </div>
            </div>

            <div class="brand-footer">
                <span
                    >&copy; {new Date().getFullYear()} TechMould Systems. All rights
                    reserved.</span
                >
            </div>

            <!-- Decoration elements -->
            <div class="glass-orb orb-1"></div>
            <div class="glass-orb orb-2"></div>
        </div>

        <!-- Right Side - Login Form -->
        <div class="form-panel">
            <div class="form-wrapper">
                <img
                    src={logo}
                    alt="TechMould Logo"
                    class="form-logo"
                    onerror={(e) => (e.target.style.display = "none")}
                />

                <div class="form-header">
                    <h2>Welcome Back</h2>
                    <p>Please select your portal and enter your credentials.</p>
                </div>

                <!-- Role Selector -->
                <div class="role-tabs">
                    {#each roles as role}
                        <button
                            class="role-tab {activeRole === role.id
                                ? 'active'
                                : ''}"
                            onclick={() => (activeRole = role.id)}
                        >
                            <role.icon size={16} />
                            <span>{role.label}</span>
                        </button>
                    {/each}
                </div>

                <!-- Login Form -->
                <form
                    class="login-form"
                    method="POST"
                    action="?/login"
                    use:enhance={() => {
                        isLoading = true;
                        return async ({ update }) => {
                            isLoading = false;
                            await update();
                        };
                    }}
                >
                    {#if errorMessage || form?.error}
                        <div class="error-banner">
                            {errorMessage || form?.error}
                        </div>
                    {/if}

                    <div class="input-group">
                        <label for="email">Work Email</label>
                        <div class="input-wrapper">
                            <span class="input-icon"><Mail size={18} /></span>
                            <input
                                type="email"
                                id="email"
                                placeholder="name@company.com"
                                name="email"
                                bind:value={email}
                                required
                            />
                        </div>
                    </div>

                    <div class="input-group">
                        <div class="label-row">
                            <label for="password">Password</label>
                        </div>
                        <div class="input-wrapper">
                            <span class="input-icon"><Lock size={18} /></span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="••••••••"
                                name="password"
                                bind:value={password}
                                required
                            />
                            <button
                                type="button"
                                class="eye-btn"
                                onclick={() => (showPassword = !showPassword)}
                                aria-label="Toggle password visibility"
                            >
                                {#if showPassword}
                                    <EyeOff size={18} />
                                {:else}
                                    <Eye size={18} />
                                {/if}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="btn-submit"
                        disabled={isLoading}
                    >
                        {#if isLoading}
                            <div class="spinner"></div>
                        {:else}
                            Sign In
                            <ArrowRight size={18} />
                        {/if}
                    </button>

                    <input type="hidden" name="role" value={activeRole} />
                </form>

                {#if activeRole === "client"}
                    <div class="client-note">
                        <p>New client? <a href="#">Request portal access</a></p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Helvetica,
            Arial,
            sans-serif;
    }

    .login-page {
        height: 100vh;
        width: 100vw;
        background: white;
        overflow: hidden;
    }

    .split-layout {
        display: flex;
        height: 100%;
    }

    /* Left Panel (Branding) */
    .brand-panel {
        flex: 1;
        background: linear-gradient(135deg, #443399 0%, #654dcf 100%);
        color: white;
        padding: 64px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
        max-width: 55%;
    }

    .brand-content {
        position: relative;
        z-index: 10;
        max-width: 560px;
    }

    .brand-text-logo {
        display: flex;
        flex-direction: column;
        margin-bottom: 60px;
        letter-spacing: -1px;
        line-height: 1;
    }

    .brand-text-logo .the {
        font-size: 20px;
        font-weight: 800;
        color: #4ecdc4;
        letter-spacing: 4px;
        margin-bottom: 4px;
    }

    .brand-text-logo .tech-mould {
        font-size: 48px;
        font-weight: 900;
        color: white;
        text-transform: uppercase;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .hero-text h1 {
        font-size: 40px;
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 24px;
        letter-spacing: -1px;
    }

    .hero-text p {
        font-size: 16px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 48px;
    }

    .feature-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .feature-item {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        font-weight: 600;
    }

    .f-icon {
        display: flex;
        align-items: center;
        color: #4ecdc4;
    }

    .brand-footer {
        position: relative;
        z-index: 10;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 500;
    }

    /* Orbs */
    .glass-orb {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(
            135deg,
            rgba(78, 205, 196, 0.4) 0%,
            rgba(101, 77, 207, 0) 100%
        );
        backdrop-filter: blur(40px);
        z-index: 1;
    }

    .orb-1 {
        width: 600px;
        height: 600px;
        top: -200px;
        right: -200px;
    }

    .orb-2 {
        width: 400px;
        height: 400px;
        bottom: -100px;
        left: -150px;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0) 100%
        );
    }

    /* Right Panel (Form) */
    .form-panel {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fc;
    }

    .form-wrapper {
        width: 100%;
        max-width: 440px;
        padding: 48px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
        border: 1px solid rgba(0, 0, 0, 0.02);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form-logo {
        height: 48px;
        object-fit: contain;
        margin-bottom: 24px;
    }

    .form-header {
        text-align: center;
        margin-bottom: 32px;
    }

    .form-header h2 {
        font-size: 28px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 8px;
        letter-spacing: -0.5px;
    }

    .form-header p {
        font-size: 14px;
        color: #718096;
    }

    .role-tabs {
        display: flex;
        width: 100%;
        gap: 8px;
        background: #f1f3f7;
        padding: 6px;
        border-radius: 12px;
        margin-bottom: 32px;
    }

    .role-tab {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 12px 0;
        border-radius: 8px;
        border: none;
        background: transparent;
        color: #a0aec0;
        font-size: 11px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.2s;
    }

    .role-tab:hover {
        color: #4a5568;
    }

    .role-tab.active {
        background: white;
        color: var(--primary);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .error-banner {
        background: #fff5f5;
        color: #e53e3e;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #fed7d7;
        font-size: 13px;
        font-weight: 600;
        text-align: center;
    }

    .login-form {
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 20px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .label-row {
        display: flex;
        align-items: center;
    }

    label {
        font-size: 12px;
        font-weight: 800;
        color: #4a5568;
    }

    .forgot-link {
        font-size: 11px;
        font-weight: 700;
        color: var(--primary);
        text-decoration: none;
    }

    .forgot-link:hover {
        text-decoration: underline;
    }

    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
    }

    .input-icon {
        position: absolute;
        left: 16px;
        display: flex;
        align-items: center;
        color: #a0aec0;
        transition: color 0.2s;
        pointer-events: none;
    }

    .input-wrapper:focus-within .input-icon {
        color: var(--primary);
    }

    input[type="email"],
    input[type="password"],
    input[type="text"] {
        width: 100%;
        flex: 1;
        padding: 14px 44px 14px 44px; /* padding-right 44px for the eye icon */
        border-radius: 10px;
        border: 1px solid #edf2f7;
        font-size: 14px;
        font-weight: 600;
        color: #1a1a1a;
        transition: all 0.2s;
        background: #f8f9fc;
        box-sizing: border-box;
        margin: 0;
    }

    input:focus {
        outline: none;
        border-color: var(--primary);
        background: white;
        box-shadow: 0 0 0 3px rgba(101, 77, 207, 0.1);
    }

    /* Removed options-row/remember-me rules since they are no longer needed */

    .eye-btn {
        position: absolute;
        right: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;
        color: #a0aec0;
        padding: 0;
        transition: color 0.2s;
    }

    .eye-btn:hover {
        color: var(--primary);
    }

    .eye-btn:focus {
        outline: none;
    }

    .btn-submit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        width: 100%;
        padding: 16px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.2s;
        margin-top: 12px;
    }

    .btn-submit:hover:not(:disabled) {
        background: #543eb3;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(101, 77, 207, 0.2);
    }

    .btn-submit:active:not(:disabled) {
        transform: translateY(1px);
    }

    .btn-submit:disabled {
        opacity: 0.8;
        cursor: not-allowed;
    }

    .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .client-note {
        text-align: center;
        margin-top: 24px;
        font-size: 13px;
        color: #718096;
        font-weight: 600;
    }

    .client-note a {
        color: var(--primary);
        text-decoration: none;
        font-weight: 700;
    }

    .client-note a:hover {
        text-decoration: underline;
    }

    /* Responsive Adjustments */
    @media (max-width: 900px) {
        .split-layout {
            flex-direction: column;
        }
        .brand-panel {
            max-width: 100%;
            padding: 40px;
        }
        .form-panel {
            padding: 40px 20px;
        }
    }
</style>
