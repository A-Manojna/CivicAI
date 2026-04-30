/* CivicAI - App Router & Core */
const CivicAI = {
  currentTab: 'home',
  modules: {},
  register(name, mod) { this.modules[name] = mod; },
  init() {
    // Restore theme
    if (this.load('theme', 'dark') === 'light') {
      document.body.classList.add('light-mode');
    }
    this.loadTab(localStorage.getItem('civicai_tab') || 'home');
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => this.loadTab(btn.dataset.tab));
    });
  },
  loadTab(tab) {
    this.currentTab = tab;
    localStorage.setItem('civicai_tab', tab);
    document.querySelectorAll('.nav-item,.mob-nav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    const mod = this.modules[tab];
    const el = document.getElementById('main-content');
    if (mod) {
      el.innerHTML = mod.render();
      el.classList.remove('animate-in');
      void el.offsetWidth;
      el.classList.add('animate-in');
      if (mod.init) mod.init();
    }
  },
  // LocalStorage helpers
  save(key, val) { 
    localStorage.setItem('civicai_' + key, JSON.stringify(val)); 
    if (CivicAI.modules.auth && CivicAI.modules.auth.syncLocalToCloud) {
      CivicAI.modules.auth.syncLocalToCloud(key, val);
    }
  },
  load(key, def) {
    try { const v = localStorage.getItem('civicai_' + key); return v ? JSON.parse(v) : def; }
    catch { return def; }
  },
  getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  },
  navigateTo(tab) { this.loadTab(tab); },
  // Theme toggle
  toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    this.save('theme', isLight ? 'light' : 'dark');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = isLight ? '🌙' : '☀️';
  },
  // Confirmation modal
  showModal(message, onConfirm, isAlert = false) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const buttons = isAlert 
      ? `<div style="width:100%;text-align:center"><button class="btn btn-primary" id="modal-confirm" style="padding:8px 24px;">Okay</button></div>`
      : `<button class="btn btn-ghost" id="modal-cancel">Cancel</button><button class="btn btn-danger" id="modal-confirm">Yes, Reset</button>`;
      
    overlay.innerHTML = `<div class="modal-box">
      <p style="margin-bottom:20px">${message}</p>
      <div class="modal-actions" style="display:flex;gap:12px;justify-content:flex-end">
        ${buttons}
      </div>
    </div>`;
    document.body.appendChild(overlay);
    if (!isAlert) overlay.querySelector('#modal-cancel').onclick = () => overlay.remove();
    overlay.querySelector('#modal-confirm').onclick = () => { overlay.remove(); if(onConfirm) onConfirm(); };
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }
};
document.addEventListener('DOMContentLoaded', () => CivicAI.init());
