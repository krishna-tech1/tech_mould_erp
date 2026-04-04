<script lang="ts">
    import { fade, fly, scale } from "svelte/transition";
    import { 
        FileText, 
        FileDigit, 
        FileImage, 
        FileSpreadsheet, 
        Download, 
        Share2, 
        History, 
        MoreVertical, 
        LayoutGrid, 
        List,
        History as HistoryIcon,
        ChevronRight
    } from "lucide-svelte";

    let assets = $state([
        { name: "Electrical_Specs_Phase_2.pdf", version: "v3", date: "Oct 24, 2023", uploader: "Sarah Jenkins", icon: FileText },
        { name: "North_Elevation_Draft.png", version: "v1", date: "Oct 22, 2023", uploader: "Marcus Chen", icon: FileImage },
        { name: "Material_Schedule_B.xlsx", version: "v5", date: "Oct 20, 2023", uploader: "Sarah Jenkins", icon: FileSpreadsheet }
    ]);

    let selectedFile = $state({
        name: "Main_Floor_Plan_Final.dwg",
        tag: "ARCHITECTURE",
        size: "14.2 MB",
        uploader: "Sarah K.",
        timeAgo: "2h ago"
    });

    let history = [
        { version: "Version 4 (Current)", desc: "Structural adjustments to the west wing staircase per city code.", time: "TODAY, 3:45 PM", uploader: "SARAH K." },
        { version: "Version 3", desc: "Initial floor plan layout for second floor approved by client.", time: "OCT 24, 2023", uploader: "SARAH K." },
        { version: "Version 2", desc: "Core wall placement and utility shaft alignment draft.", time: "OCT 20, 2023", uploader: "SARAH K." }
    ];
</script>

<svelte:head>
    <title>Design & Files | TechMould Client Portal</title>
</svelte:head>

<div class="asset-hub" in:fade>
    <!-- Technical Highlights -->
    <div class="highlights-engine">
        <div class="h-card hl-gradient" in:fly={{ y: 20 }}>
            <div class="h-top">
                <div class="h-box"><FileDigit size={20} color="white" /></div>
                <div class="h-pill">LATEST V4.2</div>
            </div>
            <div class="h-info">
                <h3>Main_Floor_Plan_Final.dwg</h3>
                <p>AutoCAD Structural • 5 stakeholders synced</p>
            </div>
            <div class="h-preview-box">
                <FileDigit size={40} color="rgba(255,255,255,0.4)" />
            </div>
        </div>

        <div class="h-card hl-outline" in:fly={{ y: 20, delay: 150 }}>
            <div class="h-top">
                <div class="h-box ghost"><FileText size={20} color="#654dcf" /></div>
                <div class="h-pill alt">TECHNICAL SPEC</div>
            </div>
            <div class="h-info">
                <h3>Precision_Mould_Specs.pdf</h3>
                <p>Material Compliance • Verified by SARAH K.</p>
            </div>
            <div class="h-preview-box white-glow">
                <FileText size={40} color="#cbd5e1" />
            </div>
        </div>
    </div>

    <!-- Assets Workspace -->
    <div class="workspace-grid">
        <div class="list-column">
            <div class="list-header">
                <h2>Technical Asset Repository</h2>
                <div class="filter-controls">
                    <button class="f-btn"><LayoutGrid size={16} /></button>
                    <button class="f-btn active"><List size={16} /></button>
                </div>
            </div>

            <div class="asset-stack">
                {#each assets as asset}
                    <div class="asset-row item-glow" in:fly={{ x: -20 }}>
                        <div class="icon-wrap"><asset.icon size={20} /></div>
                        <div class="details">
                            <h3>{asset.name}</h3>
                            <span>RELEASE {asset.version.toUpperCase()} • {asset.date}</span>
                        </div>
                        <div class="uploader">
                            <strong>{asset.uploader}</strong>
                            <span class="u-tag">DESIGN LEAD</span>
                        </div>
                        <button class="btn-context"><MoreVertical size={16} /></button>
                    </div>
                {/each}
            </div>
        </div>

        <div class="preview-column">
            <div class="hero-card card-premium" in:scale={{ start: 0.9 }}>
                <div class="hero-visual">
                    <div class="hero-backdrop"></div>
                    <FileDigit size={80} color="white" />
                </div>
                <div class="hero-content">
                    <h1>{selectedFile.name}</h1>
                    <div class="chips-flex">
                        <span class="chip-tech">{selectedFile.tag}</span>
                        <span class="chip-size">{selectedFile.size}</span>
                    </div>
                    <div class="btn-stack">
                        <button class="btn-p-bold"><Download size={18} /> Download Package</button>
                        <button class="btn-p-outline"><Share2 size={18} /> Provision Access</button>
                    </div>
                </div>
            </div>

            <div class="history-card card-premium" in:fly={{ y: 20, delay: 200 }}>
                <div class="hist-head">
                    <HistoryIcon size={18} color="#654dcf" />
                    <h3>Version Timeline</h3>
                </div>
                <div class="timeline-stack">
                    {#each history as h, i}
                        <div class="time-item {i === 0 ? 'active' : ''}">
                            <div class="time-line-box">
                                <div class="t-dot"></div>
                                {#if i < history.length - 1}<div class="t-line"></div>{/if}
                            </div>
                            <div class="t-txt">
                                <strong>{h.version}</strong>
                                <p>{h.desc}</p>
                                <span class="t-meta">{h.time} • Design Team</span>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .asset-hub { display: flex; flex-direction: column; gap: 48px; }

    .highlights-engine { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px; }
    .h-card { border-radius: 28px; padding: 32px; border: 1px solid #f1f5f9; position: relative; overflow: hidden; transition: all 0.3s; }
    .hl-gradient { background: #654dcf; color: white; border: none; box-shadow: 0 16px 32px rgba(101, 77, 207, 0.2); }
    .hl-outline { background: white; }
    
    .h-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .h-box { width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; }
    .h-box.ghost { background: #f5f3ff; }
    .h-pill { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 6px; background: rgba(255,255,255,0.15); }
    .h-pill.alt { background: #f5f3ff; color: #654dcf; }

    .h-info h3 { font-size: 16px; font-weight: 800; margin-bottom: 4px; }
    .h-info p { font-size: 12px; opacity: 0.7; font-weight: 600; }
    .hl-outline .h-info h3 { color: #0f172a; }

    .h-preview-box { height: 110px; background: rgba(0,0,0,0.1); border-radius: 16px; margin-top: 24px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
    .white-glow { background: #f8fafc; border: 1px dashed #e2e8f0; }

    .workspace-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 40px; }
    .list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .list-header h2 { font-size: 20px; font-weight: 800; color: #0f172a; }

    .filter-controls { display: flex; gap: 8px; }
    .f-btn { background: white; border: 1px solid #f1f5f9; color: #94a3b8; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .f-btn.active { background: #f5f3ff; color: #654dcf; border-color: #654dcf30; }

    .asset-stack { display: flex; flex-direction: column; gap: 14px; }
    .asset-row { background: white; border: 1px solid #f1f5f9; border-radius: 20px; padding: 24px 32px; display: flex; align-items: center; gap: 24px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    .item-glow:hover { transform: translateX(8px); border-color: #654dcf; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }

    .icon-wrap { width: 48px; height: 48px; border-radius: 14px; background: #f8fafc; color: #64748b; display: flex; align-items: center; justify-content: center; }
    .details h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
    .details span { font-size: 11px; font-weight: 700; color: #94a3b8; }

    .uploader { text-align: right; }
    .uploader strong { display: block; font-size: 14px; font-weight: 800; color: #1e293b; }
    .uploader .u-tag { font-size: 10px; font-weight: 700; color: #cbd5e1; }

    .card-premium { background: white; border: 1px solid #f1f5f9; border-radius: 32px; padding: 48px; }
    .hero-card { display: flex; flex-direction: column; gap: 32px; text-align: center; }
    .hero-visual { position: relative; width: 140px; height: 180px; margin: 0 auto; display: flex; align-items: center; justify-content: center; }
    .hero-backdrop { position: absolute; inset: 0; background: #3b82f6; border-radius: 16px; transform: rotate(-4deg); z-index: 1; box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2); }
    .hero-visual :global(svg) { position: relative; z-index: 2; }

    .hero-content h1 { font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
    .chips-flex { display: flex; justify-content: center; gap: 10px; margin-bottom: 32px; }
    .chip-tech { background: #ecfdf5; color: #059669; padding: 6px 14px; border-radius: 10px; font-size: 10px; font-weight: 800; }
    .chip-size { background: #f8fafc; color: #64748b; padding: 6px 14px; border-radius: 10px; font-size: 10px; font-weight: 800; }

    .btn-p-bold { background: #654dcf; color: white; width: 100%; padding: 18px; border-radius: 14px; font-weight: 800; font-size: 14px; border: none; margin-bottom: 12px; box-shadow: 0 8px 24px rgba(101, 77, 207, 0.2); transition: all 0.3s; }
    .btn-p-bold:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(101, 77, 207, 0.3); }

    .btn-p-outline { background: white; color: #1e293b; border: 1px solid #e2e8f0; width: 100%; padding: 18px; border-radius: 14px; font-weight: 800; transition: all 0.2s; }
    .btn-p-outline:hover { background: #f8fafc; }

    .hist-head { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
    .timeline-stack { display: flex; flex-direction: column; gap: 32px; }
    .time-item { display: flex; gap: 20px; }
    .time-line-box { display: flex; flex-direction: column; align-items: center; padding-top: 6px; }
    .t-dot { width: 12px; height: 12px; border-radius: 50%; background: #e2e8f0; border: 3px solid white; box-shadow: 0 0 0 1px #e2e8f0; }
    .t-line { width: 2px; flex: 1; background: #f1f5f9; margin-top: 8px; }
    .time-item.active .t-dot { background: #654dcf; box-shadow: 0 0 0 4px rgba(101, 77, 207, 0.1); }
    .time-item.active .t-line { background: #654dcf; opacity: 0.1; }
    .t-txt p { font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 12px; }
    .t-meta { font-size: 11px; font-weight: 700; color: #cbd5e1; }
</style>
