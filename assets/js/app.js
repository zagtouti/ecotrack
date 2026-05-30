function getLivList(type){
  if(type==='livreurs'&&typeof livreurs!=='undefined') return livreurs;
  if(type==='stations'&&typeof stations!=='undefined') return stations;
  return [];
}

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
  livData=getLivList(type);
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

function toggleGlobalSearch(e){
  if(e) e.stopPropagation();
  const wrap=document.getElementById('global-search');
  const input=document.getElementById('gsearch');
  if(!wrap||!input) return;
  const opening=!wrap.classList.contains('open');
  wrap.classList.toggle('open',opening);
  if(opening) setTimeout(()=>input.focus(),80);
}

function closeGlobalSearch(){
  const wrap=document.getElementById('global-search');
  const input=document.getElementById('gsearch');
  if(!wrap||!input||input.value.trim()) return;
  wrap.classList.remove('open');
}

function submitGlobalSearch(input){
  const value=input.value.trim();
  if(!value) return;
  toast('ok','Recherche: '+value);
  input.value='';
  closeGlobalSearch();
}

const globalSearchInput=document.getElementById('gsearch');
if(globalSearchInput){
  globalSearchInput.addEventListener('keydown',e=>{
    if(e.key==='Enter') submitGlobalSearch(e.target);
    if(e.key==='Escape'){
      e.target.value='';
      closeGlobalSearch();
    }
  });
  globalSearchInput.addEventListener('blur',()=>setTimeout(closeGlobalSearch,120));
}

document.addEventListener('click',e=>{
  const wrap=document.getElementById('global-search');
  if(wrap&&!wrap.contains(e.target)) closeGlobalSearch();
});

function gsearch(e){
  if(e.key==='Enter') submitGlobalSearch(e.target);
}

// ══════════════════════════════════════════
//  SETTINGS OVERLAY
// ══════════════════════════════════════════

let soCurrentSlide = 0;

function openSettings() {
  document.getElementById('settings-overlay').classList.add('open');
  soGo(0, document.getElementById('so-t0'));
  renderSoLivreurs();
  renderSoExpediteurs();
  // sync theme toggle
  const isDark = document.documentElement.dataset.theme === 'dark';
  const btn = document.getElementById('settings-theme-btn');
  if (btn) btn.classList.toggle('on', isDark);
}

function closeSettings() {
  document.getElementById('settings-overlay').classList.remove('open');
}

function soGo(idx, btn) {
  soCurrentSlide = idx;
  document.getElementById('so-slides').style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.so-tab').forEach(t => t.classList.remove('on'));
  btn.classList.add('on');
}

function settingsToggleTheme(btn) {
  btn.classList.toggle('on');
  const isDark = btn.classList.contains('on');
  applyTheme(isDark ? 'dark' : 'light');
}

// ── Livreur list data
const soLivreurs = [
  { name: 'Chadli Rafik',     phone: '0770 11 22 33', type: 'city',  active: true  },
  { name: 'Maamer Youssef',   phone: '0661 44 55 66', type: 'navet', active: true  },
  { name: 'Rachid Boukert',   phone: '0550 77 88 99', type: 'city',  active: true  },
  { name: 'Amine Benali',     phone: '0797 10 20 30', type: 'navet', active: true  },
  { name: 'Samir Hadj',       phone: '0660 40 50 60', type: 'city',  active: true  },
  { name: 'Bilal Cherif',     phone: '0551 70 80 90', type: 'city',  active: false },
  { name: 'Karim Lazreg',     phone: '0770 21 31 41', type: 'navet', active: false },
  { name: 'Hicham Zeboudj',   phone: '0661 51 61 71', type: 'city',  active: false },
];

let soLivFilter = 'actif';

function soLivF(filter, btn) {
  soLivFilter = filter;
  document.querySelectorAll('.so-slide:first-child .fp').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  renderSoLivreurs();
}

function renderSoLivreurs() {
  const list = document.getElementById('so-liv-list');
  if (!list) return;
  const filtered = soLivreurs.filter(l => soLivFilter === 'actif' ? l.active : !l.active);
  document.getElementById('so-liv-actif-cnt').textContent = soLivreurs.filter(l => l.active).length;
  document.getElementById('so-liv-off-cnt').textContent = soLivreurs.filter(l => !l.active).length;
  const colors = ['#08795f','#1d4ed8','#d97706','#c92a2a','#7c3aed','#0891b2'];
  list.innerHTML = filtered.map((l, i) => {
    const init = l.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    const color = colors[i % colors.length];
    return `<div class="so-person-row">
      <div class="so-ava" style="background:${color}">${init}</div>
      <div class="so-person-info">
        <div class="so-person-name">${l.name}</div>
        <div class="so-person-sub">
          <span>${l.phone}</span>
          <span class="so-badge ${l.type==='navet'?'so-badge-navet':'so-badge-city'}">${l.type==='navet'?'Navet':'Ville'}</span>
          <span class="so-badge ${l.active?'so-badge-on':'so-badge-off'}">${l.active?'Actif':'Désactivé'}</span>
        </div>
      </div>
      <div class="so-person-actions">
        <button class="btn btn-sm" onclick="toast('ok','${l.name} — fiche ouverte')">${l.active?'Voir':'Réactiver'}</button>
        ${l.active?`<button class="btn btn-sm btn-danger" onclick="toast('err','${l.name} désactivé')">Désactiver</button>`:''}
      </div>
    </div>`;
  }).join('');
  if (!filtered.length) list.innerHTML = `<div class="empty"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg><div class="empty-t">Aucun livreur dans cette catégorie</div></div>`;
}

// ── Expéditeur list data
const soExpediteurs = [
  { name: 'Fatima Hadj',       phone: '0770 93 84 75', gmail: 'fatima@gmail.com',  address: 'Bir Djir, Oran',      billing: 'cod'     },
  { name: 'ShopDz Store',      phone: '0661 12 34 56', gmail: 'shop@shopdz.dz',    address: 'Oran Centre',         billing: 'prepaye' },
  { name: 'Hamza Guerrab',     phone: '0550 56 78 90', gmail: 'hamza@gmail.com',   address: 'Sidi Bel Abbès',      billing: 'mixte'   },
  { name: 'Leila Boutique',    phone: '0797 22 33 44', gmail: 'leila@boutique.dz', address: 'Tlemcen',             billing: 'cod'     },
  { name: 'Brahim Kaci',       phone: '0660 55 66 77', gmail: 'brahim@gmail.com',  address: 'Mostaganem',          billing: 'prepaye' },
];

function renderSoExpediteurs() {
  const list = document.getElementById('so-exp-list');
  if (!list) return;
  const colors = ['#d97706','#7c3aed','#0891b2','#c92a2a','#15803d'];
  const billingLabel = { cod: ['so-badge-cod','COD'], prepaye: ['so-badge-prepaye','Prépayé'], mixte: ['so-badge-mixte','Mixte'] };
  list.innerHTML = soExpediteurs.map((e, i) => {
    const init = e.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    const [bc, bl] = billingLabel[e.billing];
    return `<div class="so-person-row">
      <div class="so-ava" style="background:${colors[i % colors.length]}">${init}</div>
      <div class="so-person-info">
        <div class="so-person-name">${e.name}</div>
        <div class="so-person-sub">
          <span>${e.phone}</span>
          <span>${e.gmail}</span>
          <span>${e.address}</span>
          <span class="so-badge ${bc}">${bl}</span>
        </div>
      </div>
      <div class="so-person-actions">
        <button class="btn btn-sm" onclick="openExpInterface('${e.name}')">Interface</button>
        <button class="btn btn-sm" onclick="toast('ok','${e.name} — fiche ouverte')">Modifier</button>
      </div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════
//  NEW LIVREUR OVERLAY
// ══════════════════════════════════════════

let nloType = 'city';

const wilayas = [
  'Adrar','Chlef','Laghouat','Oum el Bouaghi','Batna','Béjaïa','Biskra','Béchar',
  'Blida','Bouira','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger',
  'Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma',
  'Constantine','Médéa','Mostaganem','M\'Sila','Mascara','Ouargla','Oran','El Bayadh',
  'Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf','Tissemsilt','El Oued',
  'Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent',
  'Ghardaïa','Relizane'
];

function openNewLiv() {
  document.getElementById('nlo-step1').style.display = 'block';
  document.getElementById('nlo-step2').style.display = 'none';
  document.getElementById('nlo-step-pill').textContent = 'Étape 1 / 2 — Informations';
  document.getElementById('new-liv-overlay').classList.add('open');
}

function closeNewLiv() {
  document.getElementById('new-liv-overlay').classList.remove('open');
}

function selectLivType(type) {
  nloType = type;
  document.getElementById('nlo-btn-city').classList.toggle('on', type === 'city');
  document.getElementById('nlo-btn-navet').classList.toggle('on', type === 'navet');
}

function nloNext() {
  const name = document.getElementById('nlo-name').value.trim();
  const phone = document.getElementById('nlo-phone').value.trim();
  if (!name || !phone) { toast('err', 'Remplissez le nom et le téléphone'); return; }
  document.getElementById('nlo-step1').style.display = 'none';
  document.getElementById('nlo-step2').style.display = 'block';
  document.getElementById('nlo-step-pill').textContent = 'Étape 2 / 2 — Tarification par wilaya';
  buildWilayaGrid();
}

function nloBack() {
  document.getElementById('nlo-step1').style.display = 'block';
  document.getElementById('nlo-step2').style.display = 'none';
  document.getElementById('nlo-step-pill').textContent = 'Étape 1 / 2 — Informations';
}

function buildWilayaGrid() {
  const grid = document.getElementById('wilaya-grid');
  const defaultAmt = nloType === 'city' ? 150 : 280;
  grid.innerHTML = wilayas.map((w, i) => `
    <div class="wilaya-row">
      <span class="wilaya-name">${w}</span>
      <input class="wilaya-input" value="${defaultAmt}" type="number" min="0" id="w${i}">
      <span class="wilaya-unit">DA</span>
    </div>`).join('');
}

function saveLivreur() {
  const name = document.getElementById('nlo-name').value.trim();
  soLivreurs.unshift({ name: name || 'Nouveau livreur', phone: document.getElementById('nlo-phone').value, type: nloType, active: true });
  closeNewLiv();
  renderSoLivreurs();
  toast('ok', `Livreur "${name}" créé avec succès ✓`);
}

// ══════════════════════════════════════════
//  NEW EXPÉDITEUR OVERLAY
// ══════════════════════════════════════════

let neoBilling = 'cod';

function openNewExp() {
  document.getElementById('new-exp-overlay').classList.add('open');
}

function closeNewExp() {
  document.getElementById('new-exp-overlay').classList.remove('open');
}

function selectExpBilling(type) {
  neoBilling = type;
  ['cod','prepaye','mixte'].forEach(t => {
    document.getElementById(`neo-btn-${t}`).classList.toggle('on', t === type);
  });
}

function saveExpediteur() {
  const name = document.getElementById('neo-name').value.trim();
  if (!name) { toast('err', 'Remplissez le nom'); return; }
  soExpediteurs.unshift({
    name,
    phone: document.getElementById('neo-phone').value,
    gmail: document.getElementById('neo-gmail').value,
    address: document.getElementById('neo-address').value,
    billing: neoBilling
  });
  closeNewExp();
  renderSoExpediteurs();
  toast('ok', `Expéditeur "${name}" créé avec succès ✓`);
}

// ══════════════════════════════════════════
//  EXPÉDITEUR INTERFACE
// ══════════════════════════════════════════

function openExpInterface(name) {
  closeSettings();
  const overlay = document.getElementById('exp-overlay');
  overlay.classList.add('open');
  expGo('exp-dash', document.getElementById('exp-tab-dash'));
  // update greeting name if provided
  if (name) {
    const t = overlay.querySelector('.pg-title');
    if (t) t.textContent = `Bonjour, ${name} 👋`;
  }
}

function closeExpInterface() {
  document.getElementById('exp-overlay').classList.remove('open');
}

function expGo(id, btn) {
  document.querySelectorAll('.exp-view').forEach(v => v.classList.remove('on'));
  const view = document.getElementById(id);
  if (view) view.classList.add('on');
  document.querySelectorAll('.exp-nav .tab').forEach(t => {
    t.classList.remove('on');
    // restore create button style
    if (t.id === 'exp-tab-create') {
      t.style.background = 'var(--accent)';
      t.style.color = '#fff';
    }
  });
  if (btn) {
    btn.classList.add('on');
    if (btn.id === 'exp-tab-create') {
      btn.style.background = 'var(--accent3)';
    }
  }
  document.querySelector('.exp-main').scrollTop = 0;
}

// ── Colis form helpers
function resetColisForm() {
  ['colis-dest-nom','colis-dest-tel','colis-commune','colis-adresse','colis-produit','colis-notes'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  const cod = document.getElementById('colis-cod'); if (cod) cod.value = '';
  const qte = document.getElementById('colis-qte'); if (qte) qte.value = '1';
  const wilaya = document.getElementById('colis-wilaya'); if (wilaya) wilaya.value = '';
  const frag = document.getElementById('colis-fragile-toggle'); if (frag) frag.classList.remove('on');
  toast('ok', 'Formulaire réinitialisé');
}

function submitColis() {
  const nom = document.getElementById('colis-dest-nom').value.trim();
  const tel = document.getElementById('colis-dest-tel').value.trim();
  const wilaya = document.getElementById('colis-wilaya').value;
  if (!nom || !tel || !wilaya) { toast('err', 'Nom, téléphone et wilaya sont obligatoires'); return; }
  toast('ok', `Colis pour ${nom} soumis avec succès ✓`);
  resetColisForm();
  expGo('exp-colis', document.getElementById('exp-tab-colis'));
}

// ── Keyboard: Escape closes overlays
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeSettings();
    closeNewLiv();
    closeNewExp();
    closeExpInterface();
  }
});

