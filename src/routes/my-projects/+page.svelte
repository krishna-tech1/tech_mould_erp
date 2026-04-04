<script lang="ts">
    import { fade, fly, scale } from "svelte/transition";
    import { 
        Plus, 
        Clock, 
        Calendar, 
        CheckCircle2, 
        Search,
        LayoutGrid,
        ListFilter,
        ArrowUpRight,
        Activity
    } from "lucide-svelte";
    import CreateProjectModal from "$lib/components/CreateProjectModal.svelte";

    let showCreateProjectModal = $state(false);
    let searchFilter = $state("");

    const projects = [
        {
            id: "#TM-4920",
            name: "Project Aeris: Lightweight Casting",
            status: "IN PROGRESS",
            statusColor: "#654dcf",
            desc: "Optimizing the structural integrity of the wing-tip connectors for the next-gen UAV prototypes using high-density titanium alloy.",
            metricLabel: "Production Status",
            percent: 68,
            deadline: "Oct 24, 2024",
            teamSize: 7,
            layout: "large"
        },
        {
            name: "Lumina Optics: Housing",
            status: "ON HOLD",
            statusColor: "#64748b",
            desc: "Waiting for client feedback on the second revision of the thermal dissipation heat sinks and cooling unit.",
            metricLabel: "Approval Phase",
            percent: 25,
            actionLabel: "Action Required",
            layout: "medium"
        },
        {
            name: "Titan Frameworks",
            status: "COMPLETED",
            statusColor: "#10b981",
            desc: "Full production batch delivered. Quality assurance reports archived and available for download.",
            metricLabel: "Final Quality",
            percent: 100,
            actionLabel: "Delivered",
            layout: "small"
        },
        {
            name: "Helios Solar Arrays",
            status: "IN PROGRESS",
            statusColor: "#654dcf",
            desc: "Custom injection molding for reinforced panel mounts. Phase 2: Material integrity testing.",
            metricLabel: "Current Progress",
            percent: 42,
            deadline: "Nov 12, 2024",
            layout: "small"
        },
        {
            name: "Vesta Bio-Housing",
            status: "IN PROGRESS",
            statusColor: "#654dcf",
            desc: "Medical-grade silicone molding for biocompatible ventilation housings for critical care units.",
            metricLabel: "Current Progress",
            percent: 12,
            deadline: "Dec 05, 2024",
            layout: "small"
        }
    ];

    function getStatusClass(status: string) {
        return status.toLowerCase().replace(" ", "-");
    }
</script>

<svelte:head>
    <title>Project Matrix | TechMould Client</title>
</svelte:head>

<div class="projects-matrix" in:fade>
    <!-- Premium Filter Bar -->
    <div class="matrix-header">
        <div class="header-info">
            <h1>Manufacturing Pipeline</h1>
            <p>Real-time lifecycle monitoring of your high-precision project portfolio.</p>
        </div>
        <div class="header-controls">
            <div class="input-glow">
                <Search size={16} />
                <input bind:value={searchFilter} placeholder="Search matrix..." />
            </div>
            <button class="btn-primary-bold" onclick={() => showCreateProjectModal = true}>
                <Plus size={18} /> Add Initiative
            </button>
        </div>
    </div>

    <!-- Tiered Grid System -->
    <div class="grid-engine">
        <div class="priority-row">
            {#each projects.filter(p => p.layout !== 'small') as p, i}
                <div class="card-p {p.layout} card-hover" in:fly={{ y: 30, delay: i * 150 }}>
                    <div class="p-body">
                        <div class="p-top">
                            <span class="p-badge {getStatusClass(p.status)}">{p.status}</span>
                            {#if p.id}<span class="p-id">{p.id}</span>{/if}
                        </div>
                        
                        <div class="p-content">
                            <h3>{p.name}</h3>
                            <p>{p.desc}</p>
                        </div>

                        <div class="p-metrics">
                            <div class="m-vals">
                                <span>{p.metricLabel}</span>
                                <span class="v">{p.percent}%</span>
                            </div>
                            <div class="m-track"><div class="m-fill" style="width: {p.percent}%; background: {p.statusColor}"></div></div>
                        </div>

                        {#if p.actionLabel}
                            <div class="p-footer">
                                <div class="f-action">
                                    <Activity size={14} />
                                    <span>{p.actionLabel}</span>
                                </div>
                                <div class="f-team">
                                   <div class="avatars-mini">
                                       <div class="a-pfp" style="background-image: url('https://i.pravatar.cc/150?u=a')"></div>
                                       <div class="a-pfp" style="background-image: url('https://i.pravatar.cc/150?u=b')"></div>
                                   </div>
                                </div>
                            </div>
                        {/if}
                    </div>

                    {#if p.layout === 'large'}
                        <div class="p-sidebar">
                            <div class="s-block">
                                <span class="s-label">EXPIRATION / DEADLINE</span>
                                <div class="s-val"><Calendar size={14} /> {p.deadline}</div>
                            </div>
                            <div class="s-block">
                                <span class="s-label">DEDICATED TEAM</span>
                                <div class="s-team">
                                    <div class="a-pfp" style="background-image: url('https://i.pravatar.cc/150?u=1')"></div>
                                    <div class="a-pfp" style="background-image: url('https://i.pravatar.cc/150?u=2')"></div>
                                    <div class="a-pfp" style="background-image: url('https://i.pravatar.cc/150?u=3')"></div>
                                    <div class="a-more">+{(p.teamSize ?? 3) - 3}</div>
                                </div>
                            </div>
                            <button class="btn-log-action">Live Production Log <ArrowUpRight size={14} /></button>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        <div class="standard-row">
            {#each projects.filter(p => p.layout === 'small') as p, i}
                <div class="card-p small card-hover" in:fly={{ y: 30, delay: 300 + (i * 100) }}>
                    <div class="p-body">
                        <span class="p-badge {getStatusClass(p.status)}">{p.status}</span>
                        <h3>{p.name}</h3>
                        <p class="desc-compact">{p.desc}</p>
                        
                        <div class="p-metrics">
                            <div class="m-vals"><span>{p.metricLabel}</span><span class="v">{p.percent}%</span></div>
                            <div class="m-track"><div class="m-fill" style="width: {p.percent}%; background: {p.statusColor}"></div></div>
                        </div>

                        <div class="p-footer-mini">
                            <div class="f-date"><Calendar size={14} /> {p.deadline || 'Completed'}</div>
                            <div class="avatars-mini">
                                <div class="a-pfp" style="background-image: url('https://i.pravatar.cc/150?u=x')"></div>
                                <div class="a-pfp" style="background-image: url('https://i.pravatar.cc/150?u=y')"></div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <CreateProjectModal bind:show={showCreateProjectModal} />
</div>

<style>
    .projects-matrix { display: flex; flex-direction: column; gap: 48px; }

    .matrix-header { display: flex; justify-content: space-between; align-items: center; }
    .header-info h1 { font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
    .header-info p { color: #64748b; font-size: 15px; }

    .header-controls { display: flex; gap: 16px; }
    .input-glow { background: #f1f5f9; border-radius: 12px; padding: 0 16px; display: flex; align-items: center; gap: 12px; width: 280px; border: 1px solid transparent; transition: all 0.2s; }
    .input-glow:focus-within { background: white; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(101, 77, 207, 0.08); }
    .input-glow input { border: none; background: transparent; padding: 12px 0; font-size: 14px; outline: none; width: 100%; color: #0f172a; }

    .btn-primary-bold { background: var(--primary); color: white; padding: 12px 24px; border-radius: 12px; font-weight: 800; font-size: 14px; border: none; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 20px rgba(101, 77, 207, 0.2); }

    .grid-engine { display: flex; flex-direction: column; gap: 32px; }
    .priority-row { display: grid; grid-template-columns: 1.6fr 1fr; gap: 32px; }
    .standard-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }

    .card-p { background: white; border-radius: 32px; border: 1px solid #f1f5f9; display: flex; overflow: hidden; position: relative; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    .card-hover:hover { transform: translateY(-8px); border-color: var(--primary); box-shadow: 0 30px 60px rgba(0,0,0,0.06); }

    .p-body { flex: 1; padding: 40px; display: flex; flex-direction: column; gap: 24px; }
    .p-top { display: flex; justify-content: space-between; align-items: center; }
    .p-badge { padding: 6px 14px; border-radius: 10px; font-size: 11px; font-weight: 800; letter-spacing: 0.5px; }
    .p-badge.in-progress { background: #f5f3ff; color: #654dcf; }
    .p-badge.on-hold { background: #f8fafc; color: #64748b; }
    .p-badge.completed { background: #ecfdf5; color: #10b981; }
    .p-id { font-size: 13px; font-weight: 700; color: #cbd5e1; }

    .p-content h3 { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
    .p-content p { font-size: 15px; color: #64748b; line-height: 1.6; }
    .card-p.small .p-content h3 { font-size: 19px; }
    .desc-compact { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-clamp: 2; overflow: hidden; margin-bottom: 20px; }

    .m-vals { display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; color: #94a3b8; margin-bottom: 14px; }
    .m-vals .v { color: #0f172a; }
    .m-track { height: 10px; background: #f1f5f9; border-radius: 20px; overflow: hidden; }
    .m-fill { height: 100%; border-radius: 20px; transition: width 1s cubic-bezier(0.16, 1, 0.3, 1); }

    .p-footer, .p-footer-mini { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 32px; border-top: 1px solid #f8fafc; }
    .p-footer-mini { border-top: none; padding-top: 0; }
    .f-action, .f-date { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #475569; }

    .avatars-mini { display: flex; align-items: center; }
    .a-pfp { width: 34px; height: 34px; border-radius: 50%; border: 3px solid white; background-size: cover; margin-left: -12px; }
    .a-pfp:first-child { margin-left: 0; }
    .a-more { width: 34px; height: 34px; border-radius: 50%; border: 3px solid white; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; margin-left: -12px; }

    /* Large Card Sidebar */
    .p-sidebar { width: 280px; background: #fbfbfc; border-left: 1px solid #f1f5f9; padding: 40px; display: flex; flex-direction: column; gap: 40px; }
    .s-block .s-label { display: block; font-size: 10px; font-weight: 800; color: #94a3b8; letter-spacing: 1.5px; margin-bottom: 16px; }
    .s-val { display: flex; align-items: center; gap: 12px; font-size: 16px; font-weight: 800; color: #1e293b; }
    .s-team { display: flex; align-items: center; }

    .btn-log-action { width: 100%; margin-top: auto; background: white; border: 1px solid #e2e8f0; padding: 16px; border-radius: 16px; font-weight: 800; font-size: 14px; color: #1e293b; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
    .btn-log-action:hover { background: #f8fafc; border-color: var(--primary); color: var(--primary); }

    @media (max-width: 1300px) {
        .priority-row, .standard-row { grid-template-columns: 1fr; }
        .card-p.large { flex-direction: column; }
        .p-sidebar { width: 100%; border-left: none; border-top: 1px solid #f1f5f9; }
    }
</style>
