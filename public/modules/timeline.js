/* Timeline Module - Smart Timeline Generator */
CivicAI.register('timeline', {
  states: ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'],
  selectedState: '',
  getData(state) {
    // Representative Indian election timeline data
    const base = {
      type: 'Lok Sabha General Election 2026',
      phases: [
        { name:'Notification & Nominations Open', date:'2026-03-15', desc:'Election Commission issues notification. Candidates can file nominations.' },
        { name:'Last Date for Nominations', date:'2026-03-22', desc:'Final date to submit nomination papers to the Returning Officer.' },
        { name:'Scrutiny of Nominations', date:'2026-03-24', desc:'Returning Officer verifies validity of all nomination papers.' },
        { name:'Last Date for Withdrawal', date:'2026-03-27', desc:'Candidates can withdraw their nomination until this date.' },
        { name:'Campaign Period Ends', date:'2026-04-17', desc:'All campaigning must stop 48 hours before polling day.' },
        { name:'Polling Day', date:'2026-04-19', desc:'Voting takes place from 7:00 AM to 6:00 PM at your assigned booth.' },
        { name:'Counting Day', date:'2026-04-25', desc:'EVMs are opened and votes counted in the presence of candidates\' agents.' },
        { name:'Results Declaration', date:'2026-04-25', desc:'Results announced constituency by constituency throughout the day.' },
        { name:'Government Formation', date:'2026-05-10', desc:'The party/coalition with majority (272+ seats) is invited to form government.' }
      ]
    };
    // Slight variations by region
    const phaseOffset = Math.abs(state.charCodeAt(0) % 5);
    return {
      type: base.type + (phaseOffset > 2 ? ' — Phase ' + (phaseOffset - 1) : ' — Phase 1'),
      milestones: base.phases.map((p, i) => {
        const d = new Date(p.date);
        d.setDate(d.getDate() + (phaseOffset > 2 ? phaseOffset * 5 : 0));
        const today = new Date();
        const diffDays = Math.ceil((d - today) / (1000*60*60*24));
        let status = diffDays < 0 ? 'past' : diffDays === 0 ? 'current' : 'future';
        return { ...p, dateObj: d, dateStr: d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}), diffDays, status };
      })
    };
  },
  render() {
    const profile = CivicAI.load('profile', {});
    this.selectedState = this.selectedState || profile.state || '';
    let opts = this.states.map(s => `<option value="${s}" ${this.selectedState===s?'selected':''}>${s}</option>`).join('');
    let timelineHtml = '';
    if (this.selectedState) {
      const data = this.getData(this.selectedState);
      timelineHtml = `<div style="margin:20px 0"><span class="badge badge-primary">${data.type}</span><span class="badge badge-warn" style="margin-left:8px">${this.selectedState}</span></div><div class="timeline">`;
      data.milestones.forEach(m => {
        let countdown = '';
        if (m.status === 'future') countdown = `<div class="countdown">📅 ${m.diffDays} days from now</div>`;
        else if (m.status === 'current') countdown = `<div class="countdown" style="color:var(--accent-warm)">⚡ TODAY</div>`;
        else countdown = `<div class="countdown" style="color:var(--text-secondary)">✓ Completed</div>`;
        timelineHtml += `<div class="timeline-item ${m.status}"><div class="timeline-dot"></div><div class="timeline-card"><h4>${m.name}</h4><p>${m.dateStr} — ${m.desc}</p>${countdown}</div></div>`;
      });
      timelineHtml += '</div>';
    }
    let knowCityHtml = '';
    if (this.selectedState) {
      // Mocked specific details based on state selection for "KNOW YOUR CITY"
      let lastElection = "May 2024 (Lok Sabha)";
      let ruling = "NDA Coalition";
      let cm = "Determined by State";
      let nextElection = "2029 (Expected)";
      
      if(this.selectedState === 'Telangana') {
        lastElection = "November 2023 (Assembly), May 2024 (Lok Sabha)"; ruling = "Indian National Congress (INC)"; cm = "A. Revanth Reddy"; nextElection = "Late 2028 (Assembly)";
      } else if (this.selectedState === 'Andhra Pradesh') {
        lastElection = "May 2024 (Assembly & Lok Sabha)"; ruling = "TDP-JSP-BJP (NDA)"; cm = "N. Chandrababu Naidu"; nextElection = "May 2029 (Assembly)";
      } else if (this.selectedState === 'Maharashtra') {
        lastElection = "November 2024 (Assembly)"; ruling = "Mahayuti Alliance"; cm = "Determined by Alliance"; nextElection = "2029 (Assembly)";
      } else if (this.selectedState === 'Delhi') {
        lastElection = "February 2020 (Assembly)"; ruling = "Aam Aadmi Party (AAP)"; cm = "Atishi Marlena"; nextElection = "Early 2025 (Assembly)";
      }

      knowCityHtml = `<div class="glass-card" style="margin-bottom:24px;background:rgba(0,184,148,0.05);border-left:4px solid var(--success)">
        <h3 style="color:var(--success);margin-bottom:16px">🏙️ KNOW YOUR STATE: ${this.selectedState.toUpperCase()}</h3>
        <div class="grid grid-2">
          <div><p style="font-size:14px;color:var(--text-secondary)">Last Elections</p><p style="font-weight:600">${lastElection}</p></div>
          <div><p style="font-size:14px;color:var(--text-secondary)">Currently in Power</p><p style="font-weight:600">${ruling}</p></div>
          <div style="margin-top:12px"><p style="font-size:14px;color:var(--text-secondary)">Chief Minister</p><p style="font-weight:600">${cm}</p></div>
          <div style="margin-top:12px"><p style="font-size:14px;color:var(--text-secondary)">Next Upcoming Elections</p><p style="font-weight:600;color:var(--accent-warm)">${nextElection}</p></div>
        </div>
      </div>`;
    }

    return `<div class="section-title"><h1>⏰ Election Timeline</h1><p>Track important dates and deadlines for your state</p></div>
    <div class="glass-card" style="max-width:400px;margin-bottom:24px">
      <div class="form-group"><label class="form-label">Select Your State / UT</label>
        <select class="form-select" id="tl-state" onchange="CivicAI.modules.timeline.changeState(this.value)"><option value="">Choose state...</option>${opts}</select></div>
    </div>
    ${knowCityHtml}
    ${this.selectedState ? timelineHtml : '<div class="glass-card" style="text-align:center;padding:48px"><p style="font-size:48px;margin-bottom:16px">📅</p><h3>Select a state to view the election timeline</h3><p style="color:var(--text-secondary);margin-top:8px">Dates shown are representative of a typical Indian general election cycle</p></div>'}`;
  },
  init() {},
  changeState(val) { this.selectedState = val; CivicAI.loadTab('timeline'); }
});
