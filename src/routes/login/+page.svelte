<script lang="ts">
    import type { PageProps } from "./$types";
    import { enhance } from "$app/forms";
    import logo from "$lib/assets/logo.png";
    import { auth } from "$lib/auth.svelte";

    import {
        Mail,
        Lock,
        ArrowRight,
        CircleCheck,
        Eye,
        EyeOff
    } from "lucide-svelte";
    import { fade } from "svelte/transition";

    let { form }: PageProps = $props();
    let email = $state("");
    let password = $state("");
    let showPassword = $state(false);
    let isLoading = $state(false);
    let errorMessage = $state("");


</script>

<svelte:head>
    <title>Login | TechMould ERP</title>
</svelte:head>

<div class="login-page">
    <div class="split-layout">
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
            <div class="glass-orb orb-1"></div>
            <div class="glass-orb orb-2"></div>
        </div>

        <div class="form-panel">
            <div class="form-wrapper">
                <img
                    src={logo}
                    alt="TechMould Logo"
                    class="form-logo"
                    onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />

                <div class="form-header">
                    <h2>Login Portal</h2>
                    <p>Enter your credentials to access your account.</p>
                </div>




                <form
                    class="login-form"
                    method="POST"
                    action="?/login"
                    use:enhance={() => {
                        isLoading = true;
                        return async ({ result, update }) => {
                            isLoading = false;
                            if (result.type === "redirect") {
                                // Determine role based on email since server-side detection is currently disabled
                                const finalRole = email.toLowerCase().includes('client') ? 'client' : 'admin';
                                
                                // Update secure storage and shared reactive state
                                localStorage.setItem("isAuthenticated", "true");
                                localStorage.setItem("userRole", finalRole);
                                auth.isAuthenticated = true;
                                auth.userRole = finalRole;
                                
                                // FORCE A FULL RELOAD to ensure all layouts properly re-render with the new role
                                window.location.href = result.location;
                            } else {
                                await update();
                            }
                        };
                    }}
                >
                    {#if errorMessage || form?.error}
                        <div class="error-banner" in:fade>
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


                </form>


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

    .orb-1 { width: 600px; height: 600px; top: -200px; right: -200px; }
    .orb-2 { width: 400px; height: 400px; bottom: -100px; left: -150px; background: rgba(255,255,255,0.05); }

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
        box-shadow: 0 40px 100px rgba(0,0,0,0.05);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form-logo { height: 48px; margin-bottom: 24px; }

    .form-header { text-align: center; margin-bottom: 32px; }
    .form-header h2 { font-size: 28px; font-weight: 800; color: #1a1a1a; margin-bottom: 8px; }
    .form-header p { font-size: 14px; color: #718096; }



    .error-banner {
        background: #fff5f5;
        color: #e53e3e;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #fed7d7;
        font-size: 13px;
        font-weight: 600;
        text-align: center;
        width: 100%;
        margin-bottom: 20px;
    }

    .login-form { display: flex; width: 100%; flex-direction: column; gap: 20px; }
    .input-group { display: flex; flex-direction: column; gap: 8px; }
    label { font-size: 12px; font-weight: 800; color: #4a5568; }

    .input-wrapper { position: relative; display: flex; align-items: center; width: 100%; }
    .input-icon { position: absolute; left: 16px; color: #a0aec0; transition: color 0.2s; }
    .input-wrapper:focus-within .input-icon { color: var(--primary); }

    input {
        width: 100%;
        padding: 14px 44px;
        border-radius: 10px;
        border: 1px solid #edf2f7;
        font-size: 14px;
        font-weight: 600;
        color: #1a1a1a;
        background: #f8f9fc;
        box-sizing: border-box;
    }

    input:focus { outline: none; border-color: var(--primary); background: white; }

    .eye-btn { position: absolute; right: 16px; background: transparent; cursor: pointer; color: #a0aec0; }

    .btn-submit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        width: 100%;
        padding: 16px;
        background: var(--primary);
        color: white;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.2s;
        margin-top: 12px;
    }

    .btn-submit:hover:not(:disabled) { background: #543eb3; transform: translateY(-1px); }
    .spinner { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }


</style>
