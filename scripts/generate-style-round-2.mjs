import { cpSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'

const target = resolve(import.meta.dirname, '../prototypes/style-round-2')
mkdirSync(target, { recursive: true })

// Full fixed-stage base from frontend-slides viewport-base.css. Each output is standalone.
const viewportBase = `/* ===========================================
   FIXED 16:9 STAGE: MANDATORY BASE STYLES
   Include this ENTIRE file in every presentation.
   Slides are authored at 1920×1080 and scaled as a whole.
   =========================================== */
/* 1. Lock the browser viewport */
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
    background: var(--stage-bg, #000);
}
/* 2. Full-window deck viewport */
.deck-viewport {
    position: fixed;
    inset: 0;
    overflow: hidden;
    background: var(--stage-bg, #000);
}
/* 3. Fixed 16:9 design canvas.
   JavaScript sets transform: translate(...) scale(...). */
.deck-stage {
    position: absolute;
    left: 0;
    top: 0;
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    transform-origin: 0 0;
    background: var(--slide-bg, #fff);
}
/* 4. Slides stack inside the fixed stage.
   Content must be laid out at 1920×1080, not reflowed per device. */
.slide {
    position: absolute;
    inset: 0;
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    display: block;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    background: var(--slide-bg, #fff);
}
.slide.active,
.slide.visible {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
    z-index: 1;
}
/* 5. Keep media inside authored slide bounds */
img,
video,
canvas,
svg {
    max-width: 100%;
    max-height: 100%;
}
/* 6. Presentation chrome stays outside the slide design system */
.deck-controls {
    position: fixed;
    left: 50%;
    bottom: 22px;
    transform: translateX(-50%);
    z-index: 1000;
}
/* 7. Print one fixed-size slide per page */
@media print {
    html,
    body {
        width: 1920px;
        height: auto;
        overflow: visible;
        background: #fff;
    }
    .deck-viewport {
        position: static;
        overflow: visible;
        background: #fff;
    }
    .deck-stage {
        position: static;
        width: auto;
        height: auto;
        transform: none !important;
        background: none;
    }
    .slide {
        position: relative;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        width: 1920px;
        height: 1080px;
        break-after: page;
        page-break-after: always;
    }
    .slide:last-child {
        break-after: auto;
        page-break-after: auto;
    }
    .deck-controls {
        display: none !important;
    }
}
/* 8. Reduced motion */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.2s !important;
    }
}`

const image = 'wps-client.png'
cpSync(resolve(import.meta.dirname, '../assets/cases/wps/history-2026-05/2026-05-24-japan-progress.png'), join(target, image))

const styles = [
  {
    slug: 'flight-ops', name: '航班运行看板', caption: '航班状态、任务牌与琥珀色告警；最贴近航空工作场景。',
    colors: ['#101f2b', '#e9a845'],
    css: `:root{--stage-bg:#07121b;--slide-bg:#0b1d28;--ink:#f3f1e8;--muted:#a8b6ba;--accent:#ffc266;--panel:#152c38;--line:#49616b;--display:"Barlow Condensed","Noto Sans SC",sans-serif;--body:"Noto Sans SC",sans-serif;--mono:"IBM Plex Mono",monospace}
    .slide{background:radial-gradient(circle at 83% 82%,#204758 0,transparent 41%),repeating-linear-gradient(90deg,transparent 0 119px,#ffffff08 119px 120px),var(--slide-bg)}
    .chrome{border:1px solid var(--line);background:#0b1c27dd;padding:18px 28px;letter-spacing:.13em}.chrome:before{content:"● LIVE";color:#8ce0ba;margin-right:32px}.title{font-weight:900;font-stretch:condensed;letter-spacing:-.045em;text-transform:uppercase}.slide-1 .title{max-width:1220px}.slide-1 .joke-main{border-left:14px solid var(--accent);background:var(--panel)}.joke-stack>div{border:1px solid var(--line);background:#183541}.joke-stack>div:before{content:"STATUS /";color:var(--accent);font:700 18px var(--mono);display:block;margin-bottom:16px}.slide-2 .project-layout{grid-template-columns:.83fr 1.17fr}.fact{border-left:6px solid var(--accent);background:var(--panel);padding:25px}.fact small{color:var(--accent)}.visual{border:1px solid var(--line);background:#07131a;padding:14px}.candidate{border-top:5px solid var(--accent);background:#15303d}.candidate small{color:var(--accent)}.equation{color:var(--accent)}.page-mark{color:var(--accent);font:900 102px var(--display);opacity:.75}`,
  },
  {
    slug: 'swiss-grid', name: '瑞士网格', caption: '纸白、消防红与极度清晰的编号；远距离阅读最稳。',
    colors: ['#f4f3ee', '#d31e21'],
    css: `:root{--stage-bg:#222;--slide-bg:#f4f3ee;--ink:#101010;--muted:#555;--accent:#d31e21;--panel:#e7e5df;--line:#111;--display:"Archivo Black","Noto Sans SC",sans-serif;--body:"Noto Sans SC",sans-serif;--mono:"IBM Plex Mono",monospace}
    .slide{background:linear-gradient(90deg,transparent 0 150px,#111 150px 153px,transparent 153px),var(--slide-bg);padding-left:185px}.chrome{border-bottom:3px solid var(--ink);padding:0 0 18px}.chrome span:first-child{color:var(--accent)}.title{font-weight:950;letter-spacing:-.07em}.slide-1 .title{font-size:92px;max-width:1640px}.slide-1 .joke-main{background:var(--accent);color:#fff;padding:46px}.joke-stack>div{border-top:3px solid #111;border-bottom:1px solid #111;background:transparent}.joke-stack>div:last-child{background:var(--panel)}.slide-2 .project-layout{grid-template-columns:.9fr 1.1fr}.fact{border-top:3px solid var(--ink);padding:18px 0}.fact small{color:var(--accent)}.visual{border:3px solid var(--ink);padding:8px;background:#fff}.candidate{border-top:3px solid var(--ink);background:transparent}.candidate:nth-child(1){background:var(--accent);color:#fff}.candidate:nth-child(1) small,.candidate:nth-child(1) p{color:#fff}.candidate small{color:var(--accent)}.equation{border-bottom:8px solid var(--accent);padding-bottom:15px}.page-mark{font:900 160px var(--display);color:var(--accent);opacity:.12;right:75px;top:115px}`,
  },
  {
    slug: 'documentary', name: '电影纪录片', caption: '暗场、字幕条与大幅画面；适合用案例推进故事。',
    colors: ['#131716', '#e0ad58'],
    css: `:root{--stage-bg:#050606;--slide-bg:#141716;--ink:#f8f1e3;--muted:#bbb8ad;--accent:#e6b763;--panel:#252824;--line:#777567;--display:"Noto Serif SC",serif;--body:"Noto Sans SC",sans-serif;--mono:"IBM Plex Mono",monospace}
    .slide{background:linear-gradient(180deg,#0009,transparent 30%,#0009),radial-gradient(circle at 73% 36%,#54615255,transparent 47%),var(--slide-bg)}.slide:before,.slide:after{content:"";position:absolute;left:0;right:0;height:75px;background:#050606;z-index:0}.slide:before{top:0}.slide:after{bottom:0}.slide>*{position:relative;z-index:1}.chrome{border-top:1px solid #817b6b;padding-top:14px;color:var(--accent)}.title{font-family:var(--display);font-weight:900;line-height:1.23;text-shadow:0 12px 30px #0009}.slide-1 .title{font-size:95px}.slide-1 .joke-grid{height:520px}.slide-1 .joke-main{background:#000a;border-left:5px solid var(--accent)}.joke-stack>div{background:#171a17;border-bottom:1px solid var(--accent);font-family:var(--display)}.slide-2 .project-layout{grid-template-columns:.75fr 1.25fr;height:520px}.slide-2 .visual{transform:rotate(-1deg);box-shadow:25px 25px 0 #0008;border:8px solid #e8dfcd}.fact{background:#0008;border-left:3px solid var(--accent);padding:18px;min-height:0;flex:1}.fact small,.candidate small{color:var(--accent)}.candidate{background:#222621;border:1px solid #726c5a;height:200px}.candidate h3{font-family:var(--display)}.equation{font-family:var(--display);color:var(--accent)}.footer-line{display:none}.page-mark{font:700 90px var(--display);color:var(--accent);opacity:.25}`,
  },
  {
    slug: 'zine-collage', name: '拼贴杂志', caption: '荧光纸色、剪贴边缘与错位标签；舞台气氛最活泼。',
    colors: ['#f7e33d', '#f23b64'],
    css: `:root{--stage-bg:#31252b;--slide-bg:#f5e943;--ink:#191717;--muted:#493b3d;--accent:#ef2b5b;--panel:#fff1cc;--line:#1e191b;--display:"Archivo Black","Noto Sans SC",sans-serif;--body:"Noto Sans SC",sans-serif;--mono:"IBM Plex Mono",monospace}
    .slide{background:radial-gradient(circle at 88% 10%,#f38573 0 7%,transparent 7.2%),repeating-linear-gradient(-8deg,transparent 0 100px,#0000000e 101px 103px),var(--slide-bg)}.chrome{background:var(--ink);color:#fff;padding:17px 22px;transform:rotate(-1deg);width:fit-content}.title{font-weight:1000;letter-spacing:-.07em;text-shadow:8px 8px 0 #fff}.slide-1 .title{font-size:110px}.slide-1 .joke-main{background:#fff7e7;border:5px solid var(--ink);box-shadow:15px 15px 0 var(--accent);transform:rotate(-1deg)}.joke-stack>div{background:var(--panel);border:4px solid var(--ink);box-shadow:8px 8px 0 #171717}.joke-stack>div:nth-child(2){transform:rotate(2deg);background:#f8a8b5}.fact{background:#fff5d0;border:3px solid var(--ink);box-shadow:8px 8px 0 var(--accent);padding:20px;transform:rotate(-.4deg)}.fact small,.candidate small{color:var(--accent)}.visual{border:7px solid var(--ink);transform:rotate(1deg);background:#fff;padding:8px}.candidate{background:var(--panel);border:3px solid var(--ink);box-shadow:7px 7px 0 var(--accent)}.candidate:nth-child(even){transform:rotate(1deg)}.equation{background:var(--accent);color:#fff;padding:12px 20px;width:fit-content}.page-mark{color:var(--accent);font:900 120px var(--display);opacity:.35}`,
  },
  {
    slug: 'quiet-keynote', name: '极简发布会', caption: '暖灰、超大文字与单个强调色；留白最多、节奏最从容。',
    colors: ['#e6e3dc', '#2e6357'],
    css: `:root{--stage-bg:#1b2623;--slide-bg:#e6e3dc;--ink:#1a2825;--muted:#64716c;--accent:#2e6659;--panel:#f3f0e9;--line:#9ba9a2;--display:"Noto Serif SC",serif;--body:"Noto Sans SC",sans-serif;--mono:"IBM Plex Mono",monospace}
    .slide{background:radial-gradient(ellipse at 93% 92%,#b3c7bb 0,transparent 40%),var(--slide-bg)}.chrome{font-size:15px;letter-spacing:.25em;color:var(--accent)}.title{font-family:var(--display);font-weight:850;letter-spacing:-.07em}.slide-1 .title{font-size:110px;max-width:1370px}.slide-1 .joke-main{background:transparent;border-top:2px solid var(--accent);border-bottom:2px solid var(--accent);padding:32px 0}.slide-1 .joke-main strong{font-size:43px;line-height:1.58}.joke-stack>div{background:transparent;border-bottom:1px solid var(--line);padding:12px 5px;font-family:var(--display);font-size:24px}.slide-2 .project-layout{grid-template-columns:.76fr 1.24fr}.fact{padding:15px 0;border-bottom:1px solid var(--line)}.fact small,.candidate small{color:var(--accent)}.visual{border:1px solid var(--line);padding:8px;background:#f8f7f2;box-shadow:18px 18px 0 #c5cfc6}.candidate{border-top:2px solid var(--accent);background:transparent;padding:15px}.candidate h3{font-family:var(--display)}.equation{font-family:var(--display);font-weight:700;color:var(--accent)}.page-mark{font:500 130px var(--display);color:var(--accent);opacity:.12}`,
  },
  {
    slug: 'retro-terminal', name: '复古终端', caption: '磷光屏、命令行层级与低饱和网格；技术宅但不炫技。',
    colors: ['#0b1710', '#a5e08c'],
    css: `:root{--stage-bg:#030804;--slide-bg:#0b1710;--ink:#d8eccb;--muted:#95ab8d;--accent:#b4eb86;--panel:#102219;--line:#557960;--display:"Noto Sans SC",sans-serif;--body:"Noto Sans SC",sans-serif;--mono:"IBM Plex Mono",monospace}
    .slide{background:repeating-linear-gradient(0deg,#0000 0 4px,#0004 4px 5px),repeating-linear-gradient(90deg,transparent 0 79px,#b4eb8610 79px 80px),var(--slide-bg);text-shadow:0 0 18px #b4eb8633}.slide:after{content:"";position:absolute;inset:30px;border:1px solid #6faa6b66;pointer-events:none}.chrome{border-bottom:1px dashed var(--accent);padding-bottom:15px;color:var(--accent);font-family:var(--mono)}.chrome:before{content:"wang@research:~$ ";color:#e0c995}.title{font-weight:900;letter-spacing:-.035em}.slide-1 .title{font-size:105px}.slide-1 .joke-main{background:#14271b;border:1px solid var(--accent);box-shadow:0 0 36px #b4eb8622}.joke-main:before{content:"$ cat ai_work_conditions.txt";display:block;font:600 19px var(--mono);color:var(--accent);margin-bottom:16px}.joke-stack>div{border:1px dashed var(--line);background:#112219;font-family:var(--mono);font-size:25px}.joke-stack>div:before{content:"> ";color:var(--accent)}.fact{border-left:2px solid var(--accent);padding:17px;background:#10231a}.fact small,.candidate small{color:var(--accent)}.visual{border:1px solid var(--accent);padding:12px;background:#060e09;box-shadow:0 0 30px #b4eb8622}.candidate{border:1px solid var(--line);background:#10231a}.candidate h3{font-family:var(--mono);font-size:27px}.equation{font:700 31px var(--mono);color:var(--accent)}.page-mark{font:700 105px var(--mono);color:var(--accent);opacity:.22}`,
  },
]

const commonCSS = `
/* === CONTENT AND GRID === */
*{box-sizing:border-box}h1,h2,h3,p,blockquote,figure{margin:0}.slide{color:var(--ink);padding:76px 90px 70px;font-family:var(--body)}.chrome{position:relative;display:flex;gap:36px;align-items:center;font:700 18px var(--mono);letter-spacing:.08em;margin-bottom:38px;z-index:2}.chrome span:last-child{margin-left:auto}.title{position:relative;font:900 86px/1.12 var(--display);margin:0 0 42px;max-width:1710px;z-index:2}.page-mark{position:absolute;right:90px;top:56px;pointer-events:none;z-index:0}.joke-grid{position:relative;display:grid;grid-template-columns:1.2fr .8fr;gap:34px;height:575px;z-index:2}.joke-main{padding:36px 42px;display:flex;flex-direction:column;justify-content:center;min-width:0}.joke-main strong{font:850 40px/1.58 var(--display)}.joke-stack{display:grid;grid-template-rows:repeat(3,1fr);gap:14px}.joke-stack>div{padding:18px 22px;font:850 28px/1.28 var(--body);display:flex;flex-direction:column;justify-content:center}.joke-stack small{display:block;color:var(--muted);font:650 15px var(--body);margin-top:8px}.credit{position:absolute;bottom:38px;left:90px;font:600 15px var(--body);color:var(--muted)}.project-layout{display:grid;grid-template-columns:.88fr 1.12fr;gap:45px;height:595px;position:relative;z-index:2}.facts{display:flex;flex-direction:column;gap:14px}.fact{min-height:160px;display:flex;flex-direction:column;justify-content:center;gap:8px}.fact small{font:800 18px var(--mono);letter-spacing:.12em}.fact strong{font:800 30px/1.35 var(--body)}.visual{height:100%;min-height:0;overflow:hidden;display:flex;flex-direction:column;gap:10px}.visual img{width:100%;height:calc(100% - 38px);max-height:none;object-fit:contain}.visual figcaption{font:600 17px var(--body);color:var(--muted)}.equation{position:relative;font:850 34px/1.3 var(--display);margin:-11px 0 28px;z-index:2}.candidate-grid{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;z-index:2}.candidate{height:222px;padding:22px 26px;overflow:hidden}.candidate small{display:block;font:800 17px var(--mono);margin-bottom:13px}.candidate h3{font:850 31px/1.2 var(--body);margin-bottom:11px}.candidate p{font:600 20px/1.4 var(--body);color:var(--muted)}.footer-line{position:absolute;left:90px;right:90px;bottom:42px;display:flex;justify-content:space-between;border-top:1px solid var(--line);padding-top:12px;font:700 15px var(--mono);color:var(--muted)}
/* === NAVIGATION, MOTION, ACCESSIBILITY === */
.deck-controls{display:flex;align-items:center;gap:12px;background:#090b0bdc;color:#fff;padding:8px 12px;border:1px solid #ffffff66;box-shadow:0 10px 30px #0007}.deck-controls button{font:800 20px var(--mono);color:#fff;background:none;border:0;cursor:pointer;padding:8px 13px}.deck-controls button:hover,.deck-controls button:focus-visible{background:#ffffff2a}.deck-controls span{font:800 15px var(--mono);min-width:70px;text-align:center}.reveal{opacity:0;transform:translateY(24px);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1)}.visible .reveal{opacity:1;transform:none}.visible .reveal:nth-child(2){transition-delay:.08s}.visible .reveal:nth-child(3){transition-delay:.16s}.visible .reveal:nth-child(4){transition-delay:.24s}@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none}}`

const pages = `
<!-- === SLIDE 01: OPENING HOOK === -->
<section class="slide slide-1 active"><span class="page-mark" aria-hidden="true">01</span><div class="chrome reveal"><span>AI / RESEARCH PRACTICE</span><span>开场</span><span>01 / 03</span></div><h1 class="title reveal">AI 过上了打工人梦想中的生活</h1><div class="joke-grid reveal"><div class="joke-main"><strong>上级必须指令明确。<br>工作出错，领导全权负责。<br>钱到位再上班。<br>而且骂它也得花钱。</strong></div><div class="joke-stack"><div>“用户彻底怒了”<small>AI 的内心戏</small></div><div>“我去吃饭，测完告诉我”<small>反向安排上级</small></div><div>任务做完后，自己玩起了 Wordle<small>工作流跑偏</small></div></div></div><span class="credit">梗句拟态排版 · 非原帖截图</span></section>
<!-- === SLIDE 02: WPS PROJECT === -->
<section class="slide slide-2"><span class="page-mark" aria-hidden="true">02</span><div class="chrome reveal"><span>AI / RESEARCH PRACTICE</span><span>WPS / 项目</span><span>02 / 03</span></div><h2 class="title reveal">我想做一个 WPS AI 插件，但没有现成答案</h2><div class="project-layout reveal"><div class="facts"><div class="fact"><small>目标</small><strong>让 AI 在 Word / Excel / PPT 中动手</strong></div><div class="fact"><small>难点</small><strong>Agent 循环、模型连接、文档操作与布局</strong></div><div class="fact"><small>现实</small><strong>资料分散，WPS 与 Office 不能直接画等号</strong></div></div><figure class="visual"><img src="${image}" alt="WPS 客户端中的 AI 插件任务窗格"><figcaption>WPS 客户端中的 AI 插件任务窗格 · 2026 年 5 月</figcaption></figure></div><div class="footer-line"><span>找 / 读 / 试 / 验</span><span>真实项目画面</span></div></section>
<!-- === SLIDE 03: CANDIDATE POOL === -->
<section class="slide slide-3"><span class="page-mark" aria-hidden="true">03</span><div class="chrome reveal"><span>AI / RESEARCH PRACTICE</span><span>WPS / 搜索</span><span>03 / 03</span></div><h2 class="title reveal">候选池不是 AI 凭空生成的</h2><p class="equation reveal">人的先验线索 ＋ AI 的扩展检索 ＝ 候选池</p><div class="candidate-grid reveal"><article class="candidate"><small>我提供的线索</small><h3>PageAgent</h3><p>浏览器内 Agent Loop 与工具调用</p></article><article class="candidate"><small>扩展发现</small><h3>PPTAgent</h3><p>内容规划、编辑与质量检查</p></article><article class="candidate"><small>扩展发现</small><h3>PptxGenJS</h3><p>生成可编辑 PPTX</p></article><article class="candidate"><small>扩展发现</small><h3>html-ppt-skill</h3><p>主题、Design Tokens 与布局样例</p></article><article class="candidate"><small>扩展发现</small><h3>slidev-ppt-agent</h3><p>研究、预览和复核的多阶段管线</p></article><article class="candidate"><small>扩展发现</small><h3>Mck-ppt-design-skill</h3><p>布局模板、字符预算与质量门禁</p></article></div><div class="footer-line"><span>研究记录：11 个候选项目 · 此处展示 6 个代表</span><span>证据 / 候选</span></div></section>`

const controller = `
/* === FIXED-STAGE PRESENTATION CONTROLLER === */
class PreviewDeck {
  constructor(){this.slides=[...document.querySelectorAll('.slide')];this.stage=document.getElementById('deckStage');this.i=0;this.lastWheel=0;this.scale();addEventListener('resize',()=>this.scale());addEventListener('hashchange',()=>{const n=Number(location.hash.match(/^#p([1-3])$/)?.[1]||1)-1;if(n!==this.i)this.show(n)});document.getElementById('prev').onclick=()=>this.show(this.i-1);document.getElementById('next').onclick=()=>this.show(this.i+1);addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();this.show(this.i+1)}if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();this.show(this.i-1)}if(e.key==='Home')this.show(0);if(e.key==='End')this.show(this.slides.length-1)});addEventListener('wheel',e=>{if(Math.abs(e.deltaY)<12||Date.now()-this.lastWheel<600)return;this.lastWheel=Date.now();this.show(this.i+(e.deltaY>0?1:-1))},{passive:true});let x=0;addEventListener('touchstart',e=>x=e.touches[0].clientX,{passive:true});addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-x;if(Math.abs(d)>60)this.show(this.i+(d<0?1:-1))},{passive:true});this.show(Number(location.hash.match(/^#p([1-3])$/)?.[1]||1)-1)}
  scale(){const s=Math.min(innerWidth/1920,innerHeight/1080);this.stage.style.transform='translate('+((innerWidth-1920*s)/2)+'px,'+((innerHeight-1080*s)/2)+'px) scale('+s+')'}
  show(n){this.i=Math.max(0,Math.min(n,this.slides.length-1));this.slides.forEach((slide,j)=>{slide.classList.toggle('active',j===this.i);slide.classList.toggle('visible',j===this.i);slide.setAttribute('aria-hidden',String(j!==this.i))});document.getElementById('count').textContent=String(this.i+1).padStart(2,'0')+' / 03';location.hash='p'+(this.i+1)}
}
new PreviewDeck();`

for (const [index, style] of styles.entries()) {
  const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AI 辅助技术调研实践 · ${style.name}</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow+Condensed:wght@700;900&family=IBM+Plex+Mono:wght@500;700&family=Noto+Sans+SC:wght@400;600;700;900&family=Noto+Serif+SC:wght@600;900&display=swap"><style>${viewportBase}\n${commonCSS}\n/* === STYLE ${index + 1}: ${style.name} === */\n${style.css}</style></head><body><div class="deck-viewport"><main class="deck-stage" id="deckStage">${pages}</main></div><nav class="deck-controls" aria-label="演示导航"><button id="prev" aria-label="上一页">←</button><span id="count">01 / 03</span><button id="next" aria-label="下一页">→</button></nav><script>${controller}</script></body></html>`
  writeFileSync(join(target, `${style.slug}.html`), html)
}

const swatches = styles.map((style, i) => `<a class="card" href="${style.slug}.html"><div class="thumb" style="background:${style.colors[0]}"><iframe src="${style.slug}.html#p1" title="${style.name}首屏" loading="lazy" tabindex="-1"></iframe></div><div class="card-meta"><span class="index">${String(i + 1).padStart(2, '0')}</span><h2>${style.name}</h2><p>${style.caption}</p><span class="colors"><i style="background:${style.colors[0]}"></i><i style="background:${style.colors[1]}"></i></span><strong>打开 3 页试稿 ↗</strong></div></a>`).join('')
const index = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AI 辅助技术调研实践 · 第二轮风格选择</title><style>*{box-sizing:border-box}body{margin:0;background:#171916;color:#f2efe7;font-family:"Noto Sans SC","PingFang SC",sans-serif;padding:46px 4vw 90px}header{max-width:1600px;margin:0 auto 36px;border-bottom:1px solid #788275;padding-bottom:30px}.eyebrow{color:#e8b66c;letter-spacing:.18em;font:700 14px monospace}h1{font-size:clamp(36px,5vw,72px);letter-spacing:-.06em;margin:18px 0 10px}header p{font-size:19px;line-height:1.65;color:#b9c0b8;margin:0;max-width:970px}.grid{max-width:1600px;margin:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:26px}.card{min-width:0;background:#242923;color:inherit;border:1px solid #59625a;text-decoration:none;display:grid;grid-template-columns:1fr .85fr;overflow:hidden;min-height:310px;transition:transform .25s,border-color .25s}.card:hover{transform:translateY(-4px);border-color:#e8b66c}.thumb{height:100%;min-height:310px;position:relative;overflow:hidden}.thumb iframe{position:absolute;top:0;left:0;width:1920px;height:1080px;border:0;transform:scale(.22);transform-origin:0 0;pointer-events:none}.card-meta{padding:24px;display:flex;flex-direction:column}.index{font:800 14px monospace;color:#e8b66c}.card h2{font-size:31px;margin:10px 0 13px}.card p{color:#b5bcb2;font-size:16px;line-height:1.55;margin:0}.card strong{font-size:16px;margin-top:auto;color:#f5ca88}.colors{display:flex;gap:8px;margin:22px 0}.colors i{width:24px;height:24px;border:1px solid #ffffff6b;border-radius:50%}.back{max-width:1600px;margin:36px auto 0}.back a{color:#e8b66c;text-decoration:none}.back a:hover{text-decoration:underline}@media(max-width:1100px){.grid{grid-template-columns:1fr}}@media(max-width:650px){body{padding:25px}.card{grid-template-columns:1fr}.thumb{height:225px;min-height:225px}.thumb iframe{transform:scale(.15)}.card-meta{min-height:230px}}</style></head><body><header><div class="eyebrow">STYLE STUDY / ROUND 02</div><h1>同样的前三页，六种视觉语言。</h1><p>每套都使用相同的笑话开场、WPS 真机画面和六个参考项目。点击后用方向键、空格、滚轮或触屏滑动看三页；这只是视觉试稿，不会改动正式演示。</p></header><main class="grid">${swatches}</main><div class="back"><a href="../html-styles/editorial.html">↖ 返回已选的“编辑部研究报告”旧版样稿</a> · <a href="/">打开当前 24 页正式演示</a></div></body></html>`
writeFileSync(join(target, 'index.html'), index)
console.log(`Wrote ${styles.length} three-page styles and index to ${target}`)
