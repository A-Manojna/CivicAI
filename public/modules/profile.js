/* Profile / Personalization Module */
CivicAI.register('profile', {
  states: ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'],
  render() {
    const p = CivicAI.load('profile', {});
    const journey = CivicAI.load('journey_progress', [false,false,false,false,false]);
    const docs = CivicAI.load('doc_checks', {});
    const jDone = journey.filter(Boolean).length;
    const dDone = Object.values(docs).filter(Boolean).length;
    let opts = this.states.map(s => `<option value="${s}" ${p.state===s?'selected':''}>${s}</option>`).join('');
    return `<div class="section-title"><h1>👤 Your Profile</h1><p>Manage your preferences and track progress</p></div>
    <div class="grid grid-2" style="align-items:start">
      <div class="glass-card profile-card">
        <div class="profile-avatar">👤</div>
        <h3 style="text-align:center">${p.name||'Citizen'}</h3>
        <p style="text-align:center;color:var(--text-secondary);font-size:13px">${p.state||'India'}</p>
        <div class="profile-stats">
          <div class="stat-item"><div class="stat-val">${jDone}/5</div><div class="stat-label">Journey Steps</div></div>
          <div class="stat-item"><div class="stat-val">${dDone}</div><div class="stat-label">Docs Checked</div></div>
          <div class="stat-item"><div class="stat-val">${p.age||'--'}</div><div class="stat-label">Age</div></div>
        </div>
        <div style="margin-top:20px">
          <div class="form-group"><label class="form-label">Your Name</label><input class="form-input" id="p-name" value="${p.name||''}" placeholder="Enter your name"></div>
          <div class="form-group"><label class="form-label">Voter ID (EPIC Number)</label><input class="form-input" id="p-voterid" value="${p.voterid||''}" placeholder="e.g. ABC1234567" style="text-transform:uppercase"></div>
          <div class="form-group"><label class="form-label">Age</label><input class="form-input" type="number" id="p-age" value="${p.age||''}" placeholder="Your age"></div>
          <div class="form-group"><label class="form-label">State / UT</label><select class="form-select" id="p-state"><option value="">Select</option>${opts}</select></div>
          <div class="form-group"><label class="form-label">Preferred Language</label>
            <select class="form-select" id="p-lang"><option value="en" ${p.lang==='en'?'selected':''}>English</option><option value="hi" ${p.lang==='hi'?'selected':''}>Hindi</option><option value="te" ${p.lang==='te'?'selected':''}>Telugu</option></select></div>
          <button class="btn btn-primary" onclick="CivicAI.modules.profile.saveProfile()" style="width:100%">Save Profile</button>
        </div>
      </div>
      <div>
        <div class="glass-card" style="margin-bottom:16px">
          <h3>📊 Your Progress Overview</h3>
          <div style="margin-top:16px">
            <p style="font-size:14px;margin-bottom:6px">Voting Journey</p>
            <div class="progress-bar"><div class="progress-fill" style="width:${jDone/5*100}%"></div></div>
            <p class="progress-text">${jDone} of 5 steps completed</p>
          </div>
          <div style="margin-top:16px">
            <p style="font-size:14px;margin-bottom:6px">Documents Checklist</p>
            <div class="progress-bar"><div class="progress-fill" style="width:${dDone/19*100}%"></div></div>
            <p class="progress-text">${dDone} items checked</p>
          </div>
        </div>
        <div class="glass-card">
          <h3>⚙️ Settings</h3>
          <div style="margin-top:16px">
            <button class="btn btn-danger" onclick="CivicAI.modules.profile.resetProgress()" style="width:100%">🗑️ Reset All Progress</button>
            <p style="font-size:12px;color:var(--text-secondary);margin-top:8px;text-align:center">This will clear your journey progress, document checks, and chat history</p>
          </div>
        </div>
      </div>
    </div>`;
  },
  init() {},
  saveProfile() {
    if (!CivicAI.modules.auth.requireLogin('save your profile preferences')) return;
    const profile = CivicAI.load('profile', {});
    profile.name = document.getElementById('p-name').value;
    profile.voterid = document.getElementById('p-voterid').value.toUpperCase();
    profile.age = document.getElementById('p-age').value;
    profile.state = document.getElementById('p-state').value;
    profile.lang = document.getElementById('p-lang').value;
    CivicAI.save('profile', profile);
    CivicAI.loadTab('profile');
  },
  resetProgress() {
    CivicAI.showModal('Are you sure you want to reset all progress?', () => {
      CivicAI.save('journey_progress', [false,false,false,false,false]);
      CivicAI.save('doc_checks', {});
      CivicAI.save('journey_started', false);
      if (CivicAI.modules.assistant) CivicAI.modules.assistant.messages = [];
      CivicAI.loadTab('profile');
    });
  }
});
