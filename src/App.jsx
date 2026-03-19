import { useState } from "react";
import DATA from "./data.json";

const { scanDate, windowLabel, events: EVENTS, newsletters: NEWSLETTERS, posts: POSTS, pushes: PUSHES } = DATA;

const GC={"Whiteout Survival":"#1a8cff","Evony":"#e8820c","State of Survival":"#4caf50","King Shot":"#b455e6","Rise of Kingdoms":"#e84c4c","Last War: Survival":"#4ca6e8","Tiles Survive":"#8bc34a","ALL GAMES":"#eab308","Albion Online":"#16a34a","Last Asylum: Plague":"#dc2626","Dragon Traveler":"#f472b6","The Grand Mafia":"#78716c","The Tower: Idle Defense":"#06b6d4"};
const SC={"VERY HIGH":"#ef4444","HIGH":"#f97316","MEDIUM":"#eab308","LOW":"#22c55e"};
const SD={"VERY HIGH":"🔴","HIGH":"🟠","MEDIUM":"🟡","LOW":"🟢"};
const CHC={"Discord":"#5865F2","Instagram":"#E1306C","Facebook":"#4267B2","X (Twitter)":"#1DA1F2"};
const TC={"Pre-Event Reminder":"#22c55e","Spending Window":"#f97316","Event Ending":"#ef4444"};
const TABS=[{id:"events",label:"📡 Event Intelligence"},{id:"newsletter",label:"📧 Newsletter Plan"},{id:"social",label:"📱 Social Calendar"},{id:"push",label:"🔔 Push Notifications"},{id:"overview",label:"📋 Week Overview"}];

export default function App(){
  const[tab,setTab]=useState("events");
  const[fw,setFw]=useState("ALL");
  const[fg,setFg]=useState("ALL");
  const weeks=[...new Set(EVENTS.map(e=>e.week))];
  const games=[...new Set(EVENTS.map(e=>e.game))];
  const fe=EVENTS.filter(e=>(fw==="ALL"||e.week===fw)&&(fg==="ALL"||e.game===fg));

  const s={
    root:{fontFamily:"-apple-system,'Segoe UI',sans-serif",background:"#09090b",color:"#e4e4e7",minHeight:"100vh"},
    hdr:{background:"linear-gradient(135deg,#09090b,#18181b)",borderBottom:"1px solid #27272a",padding:"18px 22px 14px"},
    tag:{fontSize:"10px",fontWeight:800,letterSpacing:"2px",color:"#fbbf24",background:"#fbbf2412",padding:"3px 8px",borderRadius:"3px",border:"1px solid #fbbf2425"},
    h1:{fontSize:"20px",fontWeight:800,margin:"6px 0 2px",color:"#fafafa"},
    sub:{fontSize:"11px",color:"#52525b",margin:0},
    tabs:{display:"flex",gap:"2px",padding:"0 22px",background:"#09090b",borderBottom:"1px solid #27272a",overflowX:"auto"},
    tabBtn:a=>({padding:"9px 14px",fontSize:"11px",fontWeight:600,border:"none",borderBottom:a?"2px solid #fbbf24":"2px solid transparent",background:"transparent",color:a?"#fbbf24":"#71717a",cursor:"pointer",whiteSpace:"nowrap"}),
    filt:{display:"flex",gap:"8px",padding:"10px 22px",borderBottom:"1px solid #27272a",alignItems:"center",flexWrap:"wrap"},
    sel:{padding:"4px 8px",fontSize:"11px",borderRadius:"5px",border:"1px solid #27272a",background:"#18181b",color:"#e4e4e7",cursor:"pointer"},
    cnt:{padding:"14px 22px",overflowX:"auto"},
    th:{padding:"8px 10px",fontSize:"10px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#64748b",textAlign:"left",borderBottom:"1px solid #27272a",whiteSpace:"nowrap",position:"sticky",top:0,background:"#18181b",zIndex:1},
    td:{padding:"8px 10px",fontSize:"11px",color:"#d4d4d8",borderBottom:"1px solid #1e1e24",verticalAlign:"top",lineHeight:"1.5"},
    link:{fontSize:"10px",color:"#3b82f6",textDecoration:"underline",cursor:"pointer"},
  };

  const Pill=({c,children})=><span style={{fontSize:"10px",fontWeight:700,padding:"2px 7px",borderRadius:"4px",color:c,background:`${c}15`,border:`1px solid ${c}25`,whiteSpace:"nowrap",display:"inline-block"}}>{children}</span>;
  const GamePill=({g})=><Pill c={GC[g]||"#71717a"}>{g}</Pill>;
  const SigPill=({v})=><span style={{fontSize:"10px",fontWeight:700,color:SC[v]||"#71717a"}}>{SD[v]} {v}</span>;
  const StatPill=({v})=><Pill c={v==="TO DO"?"#ef4444":v==="PLANNED"?"#3b82f6":v==="PREDICTED"?"#a78bfa":v==="MONITOR"?"#22c55e":"#71717a"}>{v}</Pill>;
  const ChPill=({ch})=><Pill c={CHC[ch]||"#71717a"}>{ch}</Pill>;
  const TrigPill=({t})=><Pill c={TC[t]||"#71717a"}>{t==="Pre-Event Reminder"?"🟢":t==="Spending Window"?"🟠":"🔴"} {t}</Pill>;

  const Table=({cols,children})=>(<div style={{overflowX:"auto",borderRadius:"8px",border:"1px solid #27272a"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:"900px"}}><thead><tr>{cols.map((c,i)=><th key={i} style={{...s.th,minWidth:c.w||"auto"}}>{c.label}</th>)}</tr></thead><tbody>{children}</tbody></table></div>);
  const Td=({children,w,...rest})=><td style={{...s.td,maxWidth:w||"none",...rest}}>{children}</td>;

  return(
    <div style={s.root}>
      <div style={s.hdr}>
        <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"4px"}}><span style={s.tag}>PACKSIFY INTERNAL</span><span style={{fontSize:"10px",color:"#52525b",letterSpacing:"1px"}}>EVENT INTELLIGENCE SYSTEM</span></div>
        <h1 style={s.h1}>Event Campaign Dashboard</h1>
        <p style={s.sub}>{windowLabel} · Scan: {scanDate} · {EVENTS.length} events · {games.length} games · {NEWSLETTERS.length} newsletters · {POSTS.length} posts · {PUSHES.length} pushes</p>
      </div>
      <div style={s.tabs}>{TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={s.tabBtn(tab===t.id)}>{t.label}</button>)}</div>
      <div style={s.filt}>
        <select value={fw} onChange={e=>setFw(e.target.value)} style={s.sel}><option value="ALL">All Weeks</option>{weeks.map(w=><option key={w} value={w}>{w}</option>)}</select>
        <select value={fg} onChange={e=>setFg(e.target.value)} style={s.sel}><option value="ALL">All Games</option>{games.map(g=><option key={g} value={g}>{g}</option>)}</select>
        <span style={{marginLeft:"auto",fontSize:"10px",color:"#52525b"}}>{tab==="events"?`${fe.length} events`:tab==="newsletter"?`${NEWSLETTERS.filter(n=>fg==="ALL"||n.game===fg).length} emails`:tab==="social"?`${POSTS.length} posts`:tab==="push"?`${PUSHES.filter(p=>(fw==="ALL"||p.week===fw)&&(fg==="ALL"||p.game===fg)).length} notifs`:"overview"}</span>
      </div>
      <div style={s.cnt}>

        {/* EVENTS */}
        {tab==="events"&&<Table cols={[{label:"Week",w:"55px"},{label:"Game",w:"120px"},{label:"Event Name",w:"180px"},{label:"Description + Whale Impact",w:"300px"},{label:"Start",w:"65px"},{label:"End",w:"65px"},{label:"Signal",w:"85px"},{label:"Priority"},{label:"Status"},{label:"Blog Topic (Source of Truth)",w:"280px"},{label:"Source",w:"120px"}]}>{fe.map((e,i)=><tr key={i} style={{background:i%2===0?"transparent":"#ffffff04"}}><Td><strong style={{color:"#94a3b8"}}>{e.week}</strong><br/><span style={{fontSize:"10px",color:"#52525b"}}>{e.dates}</span></Td><Td><GamePill g={e.game}/></Td><Td><strong style={{color:"#fafafa",fontSize:"12px"}}>{e.name}</strong></Td><Td w="300px">{e.desc}</Td><Td><span style={{fontWeight:600,color:"#94a3b8"}}>{e.start}</span></Td><Td><span style={{fontWeight:600,color:"#94a3b8"}}>{e.end}</span></Td><Td><SigPill v={e.signal}/></Td><Td><span style={{fontWeight:600,color:e.priority==="HIGH"?"#f97316":"#94a3b8"}}>{e.priority}</span></Td><Td><StatPill v={e.status}/></Td><Td w="280px" style={{fontStyle:"italic",color:"#94a3b8",fontSize:"11px"}}>📝 {e.blog}</Td><Td>{e.source?<a href={e.source} target="_blank" rel="noopener noreferrer" style={s.link}>{e.sourceLabel} ↗</a>:<span style={{color:"#52525b"}}>{e.sourceLabel}</span>}</Td></tr>)}</Table>}

        {/* NEWSLETTER */}
        {tab==="newsletter"&&<Table cols={[{label:"Send Date",w:"90px"},{label:"Game",w:"110px"},{label:"Segment",w:"140px"},{label:"Query / Filter",w:"180px"},{label:"Size",w:"50px"},{label:"Creator",w:"55px"},{label:"Subject Line",w:"220px"},{label:"Preheader",w:"240px"},{label:"Content (blog-aligned)",w:"260px"},{label:"Webflow Links",w:"180px"},{label:"Goal",w:"180px"},{label:"CTA",w:"180px"}]}>{NEWSLETTERS.filter(n=>fg==="ALL"||n.game===fg).map((n,i)=><tr key={i} style={{background:i%2===0?"transparent":"#ffffff04"}}><Td><strong style={{color:"#fafafa"}}>{n.date}</strong></Td><Td><GamePill g={n.game}/></Td><Td><span style={{color:"#fbbf24",fontWeight:600,fontSize:"11px"}}>{n.segment}</span></Td><Td style={{fontSize:"10px",color:"#71717a"}}>{n.query}</Td><Td style={{textAlign:"center"}}><strong style={{color:"#3b82f6"}}>{n.size}</strong></Td><Td>{n.creator}</Td><Td><strong style={{color:"#fafafa",fontSize:"12px"}}>📧 {n.subject}</strong></Td><Td style={{fontStyle:"italic",color:"#a1a1aa"}}>{n.preheader}</Td><Td>{n.content}</Td><Td style={{fontSize:"10px",color:"#3b82f6"}}>{n.webflow}</Td><Td>{n.goal}</Td><Td style={{fontWeight:600,color:"#fbbf24",fontSize:"11px"}}>{n.cta}</Td></tr>)}</Table>}

        {/* SOCIAL — Track column REMOVED */}
        {tab==="social"&&<Table cols={[{label:"Post ID",w:"55px"},{label:"Day",w:"85px"},{label:"Channel",w:"90px"},{label:"Post Title",w:"180px"},{label:"Format",w:"110px"},{label:"Draft Copy Preview",w:"380px"},{label:"CTA / Link",w:"130px"},{label:"Publish Notes",w:"220px"},{label:"Status"}]}>{POSTS.map((p,i)=><tr key={i} style={{background:i%2===0?"transparent":"#ffffff04"}}><Td><strong style={{color:"#94a3b8"}}>{p.id}</strong></Td><Td><strong style={{color:"#fafafa",fontSize:"11px"}}>{p.day}</strong></Td><Td><ChPill ch={p.channel}/></Td><Td><strong style={{color:"#e4e4e7"}}>{p.title}</strong></Td><Td style={{color:"#a1a1aa"}}>{p.format}</Td><Td w="380px" style={{fontSize:"11px"}}>{p.copy}</Td><Td style={{color:"#3b82f6",fontSize:"10px"}}>{p.cta}</Td><Td style={{fontSize:"10px",color:"#71717a"}}>{p.notes}</Td><Td><StatPill v={p.status}/></Td></tr>)}</Table>}

        {/* PUSH */}
        {tab==="push"&&<Table cols={[{label:"Week",w:"50px"},{label:"Game",w:"110px"},{label:"Event",w:"150px"},{label:"Trigger",w:"120px"},{label:"Timing",w:"140px"},{label:"Segment",w:"160px"},{label:"Title",w:"170px"},{label:"Body (ICP + blog aligned)",w:"300px"},{label:"CTA",w:"150px"},{label:"Source Blog",w:"140px"}]}>{PUSHES.filter(p=>fw==="ALL"||p.week===fw).filter(p=>fg==="ALL"||p.game===fg).map((p,i)=><tr key={i} style={{background:i%2===0?"transparent":"#ffffff04"}}><Td><strong style={{color:"#94a3b8"}}>{p.week}</strong></Td><Td><GamePill g={p.game}/></Td><Td style={{color:"#e4e4e7",fontWeight:600}}>{p.event}</Td><Td><TrigPill t={p.trigger}/></Td><Td style={{fontSize:"10px",color:"#a1a1aa"}}>{p.timing}</Td><Td style={{fontSize:"10px",color:"#fbbf24"}}>{p.segment}</Td><Td><strong style={{color:"#fafafa"}}>🔔 {p.title}</strong></Td><Td w="300px">{p.body}</Td><Td style={{fontWeight:600,color:"#fbbf24",fontSize:"11px"}}>{p.cta}</Td><Td style={{fontSize:"10px",color:"#71717a"}}>{p.blog}</Td></tr>)}</Table>}

        {/* OVERVIEW */}
        {tab==="overview"&&weeks.map(w=>{
          const we=EVENTS.filter(e=>e.week===w);
          const hi=we.filter(e=>e.signal==="VERY HIGH"||e.signal==="HIGH").length;
          const puCount=PUSHES.filter(p=>p.week===w).length;
          return(<div key={w} style={{background:"#18181b",border:"1px solid #27272a",borderRadius:"8px",padding:"14px 18px",marginBottom:"12px"}}><div style={{display:"flex",alignItems:"baseline",gap:"10px",marginBottom:"10px"}}><span style={{fontSize:"16px",fontWeight:800,color:"#fafafa"}}>{w}</span><span style={{fontSize:"12px",color:"#71717a"}}>{we[0]?.dates}</span></div><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"6px",marginBottom:"12px"}}>{[{n:we.length,l:"Events",c:"#fafafa"},{n:hi,l:"High Priority",c:"#f97316"},{n:NEWSLETTERS.filter(n=>n.date&&((w==="W12"&&n.date.includes("Mar 2"))||(w==="W13"&&(n.date.includes("Mar 26")||n.date.includes("Mar 28")||n.date.includes("Mar 31")))||(w==="W14"&&n.date.includes("Apr")&&parseInt(n.date.split(" ")[1])<9)||(w==="W15"&&n.date.includes("Apr")&&parseInt(n.date.split(" ")[1])>=9))).length||0,l:"Newsletters",c:"#3b82f6"},{n:puCount,l:"Push Notifs",c:"#fbbf24"}].map((x,i)=><div key={i} style={{textAlign:"center",padding:"8px",background:"#09090b",borderRadius:"6px"}}><div style={{fontSize:"18px",fontWeight:800,color:x.c}}>{x.n}</div><div style={{fontSize:"9px",color:"#52525b",fontWeight:600}}>{x.l}</div></div>)}</div>{we.map((e,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"8px",padding:"4px 0",borderTop:i?"1px solid #27272a":"none"}}><GamePill g={e.game}/><span style={{fontSize:"11px",color:"#d4d4d8",flex:1}}>{e.name}</span><SigPill v={e.signal}/></div>)}</div>);
        })}
      </div>
      <div style={{padding:"14px 22px",borderTop:"1px solid #27272a",marginTop:"8px"}}><div style={{fontSize:"9px",color:"#3f3f46",lineHeight:1.6}}><strong style={{color:"#52525b"}}>Games:</strong> WoS · Evony · SoS · King Shot · RoK · Last War · Tiles Survive · Albion Online · Last Asylum · Dragon Traveler · The Grand Mafia · The Tower<br/><strong style={{color:"#52525b"}}>Principles:</strong> Blog = source of truth. Whale-only framing. Peer-to-peer tone. Packsify = safest, smartest, never cheapest. No discount framing. No identity exposure.<br/><strong style={{color:"#52525b"}}>Update:</strong> Replace data.json only. App.jsx stays unchanged. Push to GitHub → Vercel auto-deploys.</div></div>
    </div>
  );
}
