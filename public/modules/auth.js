// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbkHUU8dElOUADmguVw1ZtBkELR4wpOL8",
  authDomain: "civicai-7007b.firebaseapp.com",
  projectId: "civicai-7007b",
  storageBucket: "civicai-7007b.firebasestorage.app",
  messagingSenderId: "167876127264",
  appId: "1:167876127264:web:94e0d9087ac9e307af6a45",
  measurementId: "G-9ZEJB2PZMC"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

CivicAI.register('auth', {
  user: null,

  init() {
    // Listen for auth state changes
    auth.onAuthStateChanged(user => {
      this.user = user;
      const btn = document.getElementById('login-btn');
      if (user) {
        if (btn) {
          btn.textContent = "Logout";
          btn.onclick = () => this.logout();
          btn.className = "btn btn-ghost";
        }
        // Load cloud data into CivicAI local cache
        this.syncCloudToLocal(user.uid);
      } else {
        if (btn) {
          btn.textContent = "Login / Register";
          btn.onclick = () => this.showLoginModal();
          btn.className = "btn btn-primary";
        }
      }
    });
  },

  render() {
    return ''; // Auth has no full page render, it's a modal
  },

  showLoginModal() {
    CivicAI.showModal(`
      <div style="text-align:left">
        <h3 style="margin-bottom:16px">Login to CivicAI</h3>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px">Save your progress, get personalized election info, and safely store your documents.</p>
        
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" id="auth-email" class="form-input" placeholder="you@example.com">
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" id="auth-password" class="form-input" placeholder="••••••••">
        </div>
        
        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="btn btn-primary" onclick="CivicAI.modules.auth.login()" style="flex:1">Login</button>
          <button class="btn btn-secondary" onclick="CivicAI.modules.auth.register()" style="flex:1">Register</button>
        </div>
        <div id="auth-error" style="color:var(--danger);font-size:13px;margin-top:12px;display:none"></div>
      </div>
    `, null, true);
    
    // Hide the default "Okay" button from showModal because we have custom buttons in the content
    setTimeout(() => {
      const modalBtn = document.getElementById('modal-confirm');
      if (modalBtn) modalBtn.style.display = 'none';
    }, 10);
  },

  closeModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) overlay.remove();
  },

  showError(msg) {
    const el = document.getElementById('auth-error');
    if (el) {
      el.textContent = msg;
      el.style.display = 'block';
    } else {
      alert(msg);
    }
  },

  async login() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.closeModal();
    } catch (error) {
      this.showError(error.message);
    }
  },

  async register() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      this.closeModal();
      
      // Initialize an empty profile in Firestore
      await db.collection('users').doc(auth.currentUser.uid).set({
        profile: CivicAI.load('profile', {}),
        journey_progress: CivicAI.load('journey_progress', [false,false,false,false,false]),
        doc_checks: CivicAI.load('doc_checks', {}),
        journey_started: CivicAI.load('journey_started', false)
      });
    } catch (error) {
      this.showError(error.message);
    }
  },

  async logout() {
    await auth.signOut();
    // Reset local cache to defaults
    localStorage.removeItem('civicai_profile');
    localStorage.removeItem('civicai_journey_progress');
    localStorage.removeItem('civicai_doc_checks');
    localStorage.removeItem('civicai_journey_started');
    CivicAI.loadTab('home');
  },

  // Database Syncing Logic
  async syncCloudToLocal(uid) {
    try {
      const doc = await db.collection('users').doc(uid).get();
      if (doc.exists) {
        const data = doc.data();
        if (data.profile) localStorage.setItem('civicai_profile', JSON.stringify(data.profile));
        if (data.journey_progress) localStorage.setItem('civicai_journey_progress', JSON.stringify(data.journey_progress));
        if (data.doc_checks) localStorage.setItem('civicai_doc_checks', JSON.stringify(data.doc_checks));
        if (data.journey_started !== undefined) localStorage.setItem('civicai_journey_started', JSON.stringify(data.journey_started));
        
        // Refresh current tab
        CivicAI.loadTab(document.querySelector('.nav-item.active').dataset.tab);
      }
    } catch (e) {
      console.error("Error syncing cloud data", e);
    }
  },

  // Called whenever CivicAI.save is triggered
  async syncLocalToCloud(key, val) {
    if (this.user) {
      try {
        await db.collection('users').doc(this.user.uid).set({
          [key.replace('civicai_', '')]: val
        }, { merge: true });
      } catch (e) {
        console.error("Error saving to cloud", e);
      }
    }
  },

  // Check if user is logged in, show modal if not
  requireLogin(actionDescription) {
    if (this.user) return true;
    CivicAI.showModal('⚠️ Login Required<br><br>Please log in or register to ' + actionDescription + '.', () => {
      this.showLoginModal();
    }, true);
    return false;
  }
});
