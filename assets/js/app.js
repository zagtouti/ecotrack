// ── THEME
function applyTheme(theme){
  document.documentElement.dataset.theme=theme;
  const label=document.getElementById('theme-label');
  if(label) label.textContent=theme==='dark'?'Dark':'Light';
  localStorage.setItem('livraly-theme',theme);
}

function initTheme(){
  const saved=localStorage.getItem('livraly-theme');
  const preferred=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  applyTheme(saved||preferred);
}

function toggleTheme(){
  const current=document.documentElement.dataset.theme==='dark'?'dark':'light';
  applyTheme(current==='dark'?'light':'dark');
}

// ── NAV
function go(id,btn){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('on'));
  document.getElementById('v-'+id).classList.add('on');
  document.querySelectorAll('.tab').forEach(b=>b.classList.remove('on'));
  if(btn) btn.classList.add('on');
  document.querySelectorAll('.side-link').forEach(b=>b.classList.remove('on'));
  const side=document.querySelector(`.side-link[onclick*="'${id}'"]`);
  if(side) side.classList.add('on');
  closeAvatarMenu();
  closeHistory();
  if(!['reception','dispatch','livraison'].includes(id)){closeScan();}
  if(id!=='dispatch') hideLiv();
  document.getElementById('main').scrollTop=0;
}

function toggleHistory(){
  document.getElementById('history-sidebar').classList.toggle('open');
}

function closeHistory(){
  const side=document.getElementById('history-sidebar');
  if(side) side.classList.remove('open');
}

// ── FILTERS
function setF(btn){
  const bar=btn.closest('.fbar');
  bar.querySelectorAll('.fp').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  // show enc banner if non-enc or livres selected
  const id=btn.id;
  const banner=document.getElementById('enc-banner');
  if(banner) banner.style.display=(id==='fp-non-enc'||id==='fp-livres')?'block':'none';
}

function setF2(fpId){
  const fp=document.getElementById('fp-'+fpId);
  if(fp) setF(fp);
}

// ── SCAN
function toggleScan(){
  if(scanOpen) closeScan(); else openScan(null);
}

function openScan(ctx){
  scanOpen=true;
  document.getElementById('scanbar').classList.add('open');
  const pill=document.getElementById('scan-pill-btn');
  pill.classList.add('live');
  const sf=document.getElementById('scan-for');
  const sv=document.getElementById('scan-for-val');
  if(ctx){sf.style.display='flex';sv.textContent=ctx;}
  else{sf.style.display='none';}
  setTimeout(()=>document.getElementById('scan-input').focus(),250);
}

function closeScan(){
  scanOpen=false;
  document.getElementById('scanbar').classList.remove('open');
  document.getElementById('scan-pill-btn').classList.remove('live');
}

function handleScan(e){
  if(e.key!=='Enter') return;
  const v=e.target.value.trim(); if(!v) return;
  e.target.value='';
  sTot++;
  const ok=Math.random()>0.12;
  if(ok){
    sOk++;
    document.getElementById('cnt-ok').textContent=sOk;
    toast('ok','✓ '+v+' — validé');
  } else {
    sErr++;
    document.getElementById('cnt-err').textContent=sErr;
    toast('err','✗ '+v+' — introuvable');
    addErr(v);
  }
  document.getElementById('cnt-tot').textContent=sTot;
}

function addErr(code){
  const list=document.getElementById('err-list');
  if(!list) return;
  if(list.querySelector('.empty')) list.innerHTML='';
  const cnt=document.getElementById('err-count');
  const n=list.children.length+1;
  if(cnt) cnt.textContent=n+' erreur'+(n>1?'s':'');
  const row=document.createElement('div');
  row.className='prow-item';
  row.innerHTML=`<div class="prow-ico" style="background:var(--danger2)"><svg viewBox="0 0 24 24" style="stroke:var(--danger)"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div><div class="prow-info"><div class="prow-code">${code}</div><div class="prow-reason">Code introuvable dans le système</div></div>`;
  list.appendChild(row);
}

// ── LIVREUR PANEL
function showLiv(type){
  const panel=document.getElementById('liv-panel');
  const title=document.getElementById('lp-title');
  const list=document.getElementById('lp-list');
  panel.classList.add('open');
  livData=type==='livreurs'?livreurs:stations;
  title.textContent=type==='livreurs'?'Livreurs':'Stations';
  renderLiv(livData);
}

function renderLiv(data){
  const list=document.getElementById('lp-list');
  list.innerHTML='';
  data.forEach((name,i)=>{
    const cnt=Math.floor(Math.random()*20)+1;
    const init=name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const row=document.createElement('div');
    row.className='lp-row'+(i===0?' sel':'');
    row.innerHTML=`<div class="lp-ava">${init}</div><span class="lp-name">${name}</span><span class="lp-cnt">${cnt}</span>`;
    row.onclick=()=>{
      document.querySelectorAll('.lp-row').forEach(r=>r.classList.remove('sel'));
      row.classList.add('sel');
      openScan(name);
    };
    list.appendChild(row);
  });
  if(data.length>0) openScan(data[0]);
}

function filterLiv(q){
  const filtered=livData.filter(n=>n.toLowerCase().includes(q.toLowerCase()));
  renderLiv(filtered);
}

function hideLiv(){
  document.getElementById('liv-panel').classList.remove('open');
}

// ── CAISSE DRAWER
function toggleCaisse(){
  const d=document.getElementById('caisse-drawer');
  const o=document.getElementById('caisse-overlay');
  const isOpen=d.classList.contains('open');
  d.classList.toggle('open',!isOpen);
  o.classList.toggle('open',!isOpen);
}
function closeCaisse(){
  document.getElementById('caisse-drawer').classList.remove('open');
  document.getElementById('caisse-overlay').classList.remove('open');
}

// ── AVATAR / ADMIN
function toggleAvatarMenu(){
  document.getElementById('avatar-menu').classList.toggle('open');
}
function closeAvatarMenu(){
  const menu=document.getElementById('avatar-menu');
  if(menu) menu.classList.remove('open');
}
function openAdminSettings(){
  go('parametres',null);
  closeAvatarMenu();
}

// ── LIVREUR DESK
function selectLivreur(btn,name,cash){
  document.querySelectorAll('.desk-person').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('desk-livreur-name').textContent=name;
  document.getElementById('cash-expected').textContent=cash;
  const input=document.getElementById('money-received');
  if(input) input.value=cash.replace(/\s/g,'');
  openScan(name);
}
function receiveMoney(){
  const expected=parseInt(document.getElementById('cash-expected').textContent.replace(/\s/g,''),10)||0;
  const received=parseInt(document.getElementById('money-received').value,10)||0;
  const name=document.getElementById('desk-livreur-name').textContent;
  if(received>=expected){
    toast('ok',`Paiement complet reçu · ${name}`);
    return;
  }
  const debt=expected-received;
  toast('err',`Paiement court: dette privée admin créée (${debt.toLocaleString('fr-FR')} DA)`);
}

// ── FINANCE TABS
function finTab(btn,id){
  document.querySelectorAll('.fin-tab').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  ['fin-exp','fin-trans','fin-liv','fin-dep'].forEach(s=>{
    const el=document.getElementById(s);
    if(el) el.style.display=s===id?'block':'none';
  });
}

// ── TOAST
function toast(type,msg){
  const el=document.createElement('div');
  el.className=`toast toast-${type==='ok'?'ok':'err'}`;
  el.innerHTML=`<svg viewBox="0 0 24 24">${type==='ok'?'<polyline points="20 6 9 17 4 12"/>':'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'}</svg>${msg}`;
  document.getElementById('toasts').appendChild(el);
  setTimeout(()=>el.style.opacity='0',2200);
  setTimeout(()=>el.remove(),2500);
}

// ── GLOBAL SEARCH
initTheme();

document.getElementById('gsearch').addEventListener('keydown',e=>{
  if(e.key==='Enter'&&e.target.value.trim()){
    toast('ok','Recherche: '+e.target.value.trim());
    e.target.value='';
  }
});

function gsearch(e){
  if(e.key==='Enter'&&e.target.value.trim()){
    toast('ok','Recherche: '+e.target.value.trim());
    e.target.value='';
  }
}

// init dispatch panel
document.querySelector('[onclick*="showLiv(\'livreurs\')"]').dispatchEvent(new Event(''));
