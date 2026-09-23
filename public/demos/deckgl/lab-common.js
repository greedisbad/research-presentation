(function () {
  const $ = id => document.getElementById(id);
  const state = {running:true, frames:0, fps:0, submits:0, staticInits:0, angle:0, changes:0, samples:0, lastHash:null, lastSecond:performance.now()};
  const data = [
    {position:[0,0,0], name:'台风 · 海燕', speed:1},
    {position:[230,115,0], name:'台风 · 云雀', speed:.72},
    {position:[-235,-125,0], name:'台风 · 白鹿', speed:1.28}
  ];

  function buildIconUrl() {
    const c=document.createElement('canvas'); c.width=c.height=96;
    const x=c.getContext('2d'); x.clearRect(0,0,96,96);
    const g=x.createRadialGradient(48,48,4,48,48,43); g.addColorStop(0,'#effffb'); g.addColorStop(.2,'#55f3c5'); g.addColorStop(1,'#087b6e');
    x.fillStyle=g; x.beginPath(); x.arc(48,48,38,0,Math.PI*2); x.fill();
    x.strokeStyle='#031014'; x.lineWidth=7; x.lineCap='round';
    for(let i=0;i<3;i++){x.save();x.translate(48,48);x.rotate(i*Math.PI*2/3);x.beginPath();x.arc(0,0,24,-.2,1.55);x.stroke();x.restore()}
    x.fillStyle='#ffbd59'; x.beginPath(); x.moveTo(48,2); x.lineTo(58,22); x.lineTo(43,18); x.closePath(); x.fill();
    x.fillStyle='#031014';x.beginPath();x.arc(48,48,7,0,Math.PI*2);x.fill();
    return c.toDataURL('image/png');
  }
  const ICON_URL=buildIconUrl();

  class CountingScatterplotLayer extends deck.ScatterplotLayer {
    initializeState(){ state.staticInits++; super.initializeState(); }
  }
  CountingScatterplotLayer.layerName='CountingScatterplotLayer';
  CountingScatterplotLayer.componentName='CountingScatterplotLayer';
  function staticLayer() { return new CountingScatterplotLayer({id:'static-radar-reference',data:[{position:[0,0,0]}],getPosition:d=>d.position,getRadius:310,radiusUnits:'pixels',stroked:true,filled:false,getLineColor:[58,130,119,75],lineWidthUnits:'pixels',getLineWidth:1,parameters:{depthTest:false}}); }
  function iconProps() { return {data,getIcon:()=>({url:ICON_URL,width:96,height:96,mask:false}),getPosition:d=>d.position,getSize:88,sizeUnits:'pixels',pickable:true,billboard:true,parameters:{depthTest:false}}; }
  function shell() {
    document.body.insertAdjacentHTML('afterbegin',`<canvas id="deck-canvas"></canvas><div class="topbar"><div class="brand"><div class="mark">◒</div><div><div class="eyebrow">Aviation Weather Lab · Deck.gl 9.1.12</div><h1>${document.body.dataset.title}</h1></div></div><div class="route">${document.body.dataset.route}</div></div><section class="panel"><div class="metrics"><div class="metric"><small>FPS</small><b id="fps">0</b></div><div class="metric"><small>角度</small><b id="angle">0°</b></div><div class="metric"><small>图层提交</small><b id="submits">0</b></div><div class="metric"><small>静态层初始化</small><b id="static-inits">0</b></div><div class="metric"><small>像素变化</small><b id="pixel-changes">0/0</b></div><div class="metric"><small>帧</small><b data-testid="frame-count" id="frames">0</b></div></div><div class="status" id="pixel-status"><i></i><span>正在建立像素基线…</span></div><div class="controls"><button id="toggle">暂停</button><button id="step">单步 +6°</button><a class="nav" href="index.html">全部路线</a></div></section><aside class="hint"><strong>自动证据</strong><br>程序对中心图标区域执行 WebGL readPixels，并比较连续采样的哈希。点击任一图标还能验证 picking 未受动画影响。</aside><div class="toast" id="toast"></div><div class="error" id="error"></div>`);
  }
  function makeDeck(layers,onClick) {
    const canvas=$('deck-canvas');
    return new deck.Deck({canvas,glOptions:{preserveDrawingBuffer:true},views:[new deck.OrthographicView({id:'main'})],initialViewState:{target:[0,0,0],zoom:0},controller:true,layers,onClick:info=>{if(info.object){const t=$('toast');t.textContent=`PICK OK · ${info.object.name||'静态参照'}`;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1200)}onClick?.(info)},onError:e=>fail(e)});
  }
  function sample(deckgl) {
    try {
      const gl=deckgl.getCanvas().getContext('webgl2'); const size=90, px=new Uint8Array(size*size*4);
      const sampleX=Number(document.body.dataset.sampleX||0)*(devicePixelRatio||1);
      gl.readPixels(Math.floor(gl.drawingBufferWidth/2+sampleX-size/2),Math.floor(gl.drawingBufferHeight/2-size/2),size,size,gl.RGBA,gl.UNSIGNED_BYTE,px);
      let hash=2166136261; for(let i=0;i<px.length;i+=8){hash^=px[i]+px[i+1]*3+px[i+2]*7+px[i+3]*11;hash=Math.imul(hash,16777619)}
      if(state.lastHash!==null && hash!==state.lastHash) state.changes++;
      state.lastHash=hash; state.samples++;
      const ok=state.changes>=2, el=$('pixel-status'); el.className='status '+(ok?'ok':''); el.querySelector('span').textContent=ok?'旋转已检测 · 像素持续变化':'正在采集帧间像素差异…';
      const picked=deckgl.pickObject({x:innerWidth/2+Number(document.body.dataset.sampleX||0),y:innerHeight/2,radius:24}); document.body.dataset.autoPick=Boolean(picked).toString();
    } catch(e) { $('pixel-status').querySelector('span').textContent='像素读取受限，请人工观察'; }
  }
  function tick(deckgl, callback) {
    state.frames++; const now=performance.now(); callback?.(now);
    if(now-state.lastSecond>=1000){state.fps=state.frames-Number(document.body.dataset.lastFrames||0);document.body.dataset.lastFrames=state.frames;state.lastSecond=now;sample(deckgl)}
    $('fps').textContent=state.fps; $('angle').textContent=`${(state.angle%360).toFixed(1)}°`; $('submits').textContent=state.submits; $('static-inits').textContent=state.staticInits; $('pixel-changes').textContent=`${state.changes}/${Math.max(0,state.samples-1)}`; $('frames').textContent=state.frames;
  }
  function controls(step) {$('toggle').onclick=()=>{state.running=!state.running;$('toggle').textContent=state.running?'暂停':'继续';document.body.dataset.paused=(!state.running).toString()};$('step').onclick=()=>step(6)}
  function fail(e){const el=$('error');el.style.display='grid';el.textContent=`Deck.gl 运行错误\n${e?.stack||e}`;document.body.dataset.error=String(e)}
  shell(); window.Lab={state,data,iconProps,staticLayer,makeDeck,tick,controls,fail};
})();
