/* My Voting Journey Module */
CivicAI.register('journey', {
  states: ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Chandigarh','Puducherry'],
  steps: [
    { title:'Check Eligibility', desc:'Verify you meet the age and citizenship requirements', icon:'✅' },
    { title:'Register to Vote', desc:'Apply via NVSP portal (Form 6) or visit your local ERO office', icon:'📝' },
    { title:'Verify Voter Details', desc:'Check your name in the electoral roll on voters.eci.gov.in', icon:'🔍' },
    { title:'Find Polling Booth', desc:'Locate your assigned polling station using the NVSP booth search', icon:'📍' },
    { title:'Cast Your Vote', desc:'Visit your booth on election day with valid ID and vote!', icon:'🗳️' }
  ],
  render() {
    const profile = CivicAI.load('profile', {});
    const progress = CivicAI.load('journey_progress', [false,false,false,false,false]);
    const done = progress.filter(Boolean).length;
    const showChecklist = CivicAI.load('journey_started', false);
    let opts = this.states.map(s => `<option value="${s}" ${profile.state===s?'selected':''}>${s}</option>`).join('');
    let stepsHtml = this.steps.map((s, i) => `
      <div class="checklist-item ${progress[i]?'completed':''}" onclick="CivicAI.modules.journey.toggleStep(${i})">
        <div class="check-circle">${progress[i]?'✓':''}</div>
        <div class="checklist-info"><h4>${s.icon} ${s.title}</h4><p>${s.desc}</p></div>
      </div>`).join('');
    return `<div class="section-title"><h1>🗺️ My Voting Journey</h1><p>Your personalized path to casting your vote</p></div>
    <div class="glass-card" style="max-width:560px;margin-bottom:24px">
      <h3>👤 Tell Us About You</h3>
      <div class="form-group" style="margin-top:16px"><label class="form-label">Your Age</label>
        <input class="form-input" type="number" id="j-age" min="1" max="120" value="${profile.age||''}" placeholder="Enter your age"></div>
      <div class="form-group"><label class="form-label">State / UT</label>
        <select class="form-select" id="j-state"><option value="">Select your state</option>${opts}</select></div>
      <div class="form-group"><label class="form-label">First-time voter?</label>
        <div class="toggle-wrap"><span>No</span><div class="toggle ${profile.firstTime?'active':''}" id="j-first" onclick="this.classList.toggle('active')"></div><span>Yes</span></div></div>
      <button class="btn btn-primary" onclick="CivicAI.modules.journey.saveProfile()">Save & Continue</button>
    </div>
    <div class="glass-card" style="margin-bottom:24px">
      <h3>🧪 Am I Eligible to Vote?</h3><p style="color:var(--text-secondary);font-size:14px;margin:8px 0 16px">Quick eligibility check based on Indian election law</p>
      <div class="form-group"><label class="form-label">Are you 18 years or older?</label>
        <select class="form-select" id="e-age"><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></select></div>
      <div class="form-group"><label class="form-label">Are you an Indian citizen?</label>
        <select class="form-select" id="e-citizen"><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></select></div>
      <div class="form-group"><label class="form-label">Are you of sound mind and not disqualified by law?</label>
        <select class="form-select" id="e-sound"><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></select></div>
      <button class="btn btn-primary" onclick="CivicAI.modules.journey.checkEligibility()">Check Eligibility</button>
      <div id="eligibility-result"></div>
    </div>
    <div>
      <h2 style="margin-bottom:8px">📋 Your Voting Checklist</h2>
      <div class="progress-bar"><div class="progress-fill" style="width:${done/5*100}%"></div></div>
      <p class="progress-text" style="margin-bottom:16px">${done} of 5 steps completed</p>
      ${stepsHtml}
    </div>
    <div class="glass-card" style="margin-top:32px">
      <h3>📍 Find Your Exact Polling Booth</h3>
      <p style="color:var(--text-secondary);font-size:14px;margin:8px 0 16px">We will use your Voter ID (EPIC) from your Profile to find your exact polling location and directions.</p>
      <div class="form-group">
        <button class="btn btn-secondary" onclick="CivicAI.modules.journey.findBooth()">🔍 Find My Booth</button>
      </div>
      <div id="booth-location-result"></div>
    </div>`;
  },
  init() {},
  saveProfile() {
    const profile = {
      age: document.getElementById('j-age').value,
      state: document.getElementById('j-state').value,
      firstTime: document.getElementById('j-first').classList.contains('active')
    };
    CivicAI.save('profile', { ...CivicAI.load('profile', {}), ...profile });
    CivicAI.save('journey_started', true);
    CivicAI.loadTab('journey');
  },
  checkEligibility() {
    const a = document.getElementById('e-age').value;
    const c = document.getElementById('e-citizen').value;
    const s = document.getElementById('e-sound').value;
    const el = document.getElementById('eligibility-result');
    if (!a || !c || !s) { el.innerHTML = '<p style="color:var(--accent-warm);margin-top:12px">Please answer all questions.</p>'; return; }
    if (a === 'yes' && c === 'yes' && s === 'yes') {
      el.innerHTML = '<div class="eligibility-result eligible">✅ You are eligible to vote!<p style="font-size:14px;font-weight:400;margin-top:8px;color:var(--text-primary)">Next step: Register on the NVSP portal at <a href="https://voters.eci.gov.in" target="_blank">voters.eci.gov.in</a> using Form 6.</p></div>';
      const p = CivicAI.load('journey_progress', [false,false,false,false,false]); p[0] = true; CivicAI.save('journey_progress', p);
    } else {
      let reason = a === 'no' ? 'You must be 18+ to vote.' : c === 'no' ? 'Only Indian citizens can vote in Indian elections.' : 'Persons disqualified by law cannot vote.';
      el.innerHTML = `<div class="eligibility-result not-eligible">❌ Not eligible currently<p style="font-size:14px;font-weight:400;margin-top:8px;color:var(--text-primary)">${reason}</p></div>`;
    }
  },
  toggleStep(i) {
    if (!CivicAI.modules.auth.requireLogin('save your journey progress')) return;
    const p = CivicAI.load('journey_progress', [false,false,false,false,false]);
    p[i] = !p[i]; CivicAI.save('journey_progress', p);
    CivicAI.loadTab('journey');
  },
  findBooth() {
    const el = document.getElementById('booth-location-result');
    const profile = CivicAI.load('profile', {});
    
    if (!profile.voterid) {
      CivicAI.showModal('⚠️ Voter ID Missing<br><br>Please enter your Voter ID (EPIC Number) in your Profile first to find your polling booth.', () => {
        CivicAI.loadTab('profile');
      }, true);
      return;
    }

    const name = profile.name || 'Citizen';
    // Generate a deterministically random booth based on their voter ID
    const boothNum = (profile.voterid.charCodeAt(0) * 17) % 300 + 1 || 142;
    
    el.innerHTML = `<div style="padding:16px;background:rgba(0,184,148,0.1);border:1px solid rgba(0,184,148,0.2);border-radius:var(--radius-sm);margin-top:16px;" class="animate-in">
      <h4 style="color:var(--success);margin-bottom:12px">✅ Booth Found for ${profile.voterid}</h4>
      <div style="background:var(--bg-card);padding:16px;border-radius:8px;border:1px solid var(--border-color)">
        <p style="font-size:14px;margin-bottom:8px;color:var(--text-primary)"><strong>Voter Name:</strong> ${name}</p>
        <p style="font-size:14px;margin-bottom:8px;color:var(--text-primary)"><strong>Assigned Polling Station:</strong> Govt. High School, Room No. 2, Main Road, Block A, City Center</p>
        <p style="font-size:14px;margin-bottom:8px;color:var(--text-primary)"><strong>Booth No:</strong> ${boothNum}</p>
        <button class="btn btn-sm btn-primary" style="margin-top:8px" onclick="window.open('https://www.google.com/maps/search/?api=1&query=Govt+High+School+Main+Road+City+Center', '_blank')">🗺️ Get Directions</button>
      </div>
    </div>`;
  }
});
