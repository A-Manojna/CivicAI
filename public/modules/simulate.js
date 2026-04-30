/* Vote Simulation Module - Realistic Indian EVM */
CivicAI.register('simulate', {
  candidates: [
    { name:'Candidate First', nameHi:'उम्मीदवार पहला', party:'Party A', symbol:'&' },
    { name:'Candidate Second', nameHi:'उम्मीदवार दूसरा', party:'Party B', symbol:'Ō' },
    { name:'Candidate Third', nameHi:'उम्मीदवार तीसरा', party:'Party C', symbol:'Ψ' },
    { name:'Candidate Fourth', nameHi:'उम्मीदवार चौथा', party:'Party D', symbol:'ω' },
    { name:'Candidate Fifth', nameHi:'उम्मीदवार पांचवा', party:'Party E', symbol:'Â' },
    { name:'Candidate Sixth', nameHi:'उम्मीदवार छटा', party:'Party F', symbol:'δ' },
    { name:'Candidate Seven', nameHi:'उम्मीदवार सातवां', party:'Independent', symbol:'ϑ' },
    { name:'Candidate Eight', nameHi:'उम्मीदवार आठवां', party:'Independent', symbol:'η' },
    { name:'NOTA', nameHi:'इनमें से कोई नहीं', party:'None Of The Above', symbol:'✕' }
  ],
  selected: -1,
  step: 0,
  voted: false,
  stepsGuide: [
    { title:'Arrive at Polling Booth', desc:'Reach your assigned polling station during polling hours (7 AM - 6 PM).' },
    { title:'Identity Verification', desc:'Show your Voter ID (EPIC) or valid photo ID to the Polling Officer.' },
    { title:'Receive Slip & Ink Mark', desc:'Indelible ink is applied to your left index finger. You receive a voter slip.' },
    { title:'Enter Voting Compartment', desc:'Proceed to the EVM booth alone — no one else is allowed inside.' },
    { title:'Cast Your Vote on EVM', desc:'Press the green button next to your chosen candidate. A beep confirms the vote.' },
    { title:'Exit the Booth', desc:'Leave quietly. You may ask for a Voter Turnout Slip as proof.' }
  ],
  render() {
    let ballotRows = this.candidates.map((c, i) => `
      <div class="evm-row ${this.selected===i?'selected-row':''}">
        <div class="candidate-num">${i+1}</div>
        <div class="candidate-info">
          <div>
            <div class="candidate-name">${i+1} ${c.name}</div>
            <div class="candidate-party">${i+1} ${c.nameHi}</div>
          </div>
          <span class="candidate-symbol">${c.symbol}</span>
          <span class="evm-arrow">◀</span>
        </div>
      </div>`).join('');
    let buttonCells = this.candidates.map((c, i) => `
      <div class="evm-btn-cell">
        <button class="evm-btn ${this.selected===i?'selected':''}" id="evm-btn-${i}" 
          onclick="CivicAI.modules.simulate.selectCandidate(${i})" ${this.voted?'disabled':''}></button>
      </div>`).join('');
    let stepsHtml = this.stepsGuide.map((s, i) => `
      <div class="checklist-item" style="cursor:default">
        <div class="check-circle" style="background:${i<=this.step?'var(--success)':'transparent'};border-color:${i<=this.step?'var(--success)':'rgba(255,255,255,0.2)'};color:#fff;font-size:12px">${i<=this.step?'✓':i+1}</div>
        <div class="checklist-info"><h4>${s.title}</h4><p>${s.desc}</p></div>
      </div>`).join('');
    return `<div class="section-title"><h1>🗳️ Vote Simulation</h1><p>Experience how voting works on an Indian EVM</p></div>
    <div class="grid grid-2" style="align-items:start">
      <div>
        <h3 style="margin-bottom:16px">📋 Voting Steps Guide</h3>
        ${stepsHtml}
        <div style="margin-top:12px;display:flex;gap:8px">
          <button class="btn btn-ghost btn-sm" onclick="CivicAI.modules.simulate.prevStep()" ${this.step<=0?'disabled':''}>← Previous</button>
          <button class="btn btn-primary btn-sm" onclick="CivicAI.modules.simulate.nextStep()" ${this.step>=5?'disabled':''}>Next Step →</button>
        </div>
      </div>
      <div>
        <div class="evm-status-bar">
          <div class="evm-ready-light ${!this.voted?'on':''}"></div>
          <span class="evm-status-text">${this.voted?'Vote Recorded ✓':'Ready'}</span>
        </div>
        <div class="evm-wrapper">
          <div class="evm-ballot">
            <div class="evm-ballot-header">
              <span>00066 Voting Device</span>
            </div>
            <div class="evm-ballot-serial">N0 00001</div>
            ${ballotRows}
          </div>
          <div class="evm-button-panel">
            <div class="panel-header">Ballot Unit</div>
            ${buttonCells}
          </div>
        </div>
        <div class="evm-confirm" style="margin-top:16px">
          <button class="btn ${this.selected>=0&&!this.voted?'btn-success':'btn-ghost'}" onclick="CivicAI.modules.simulate.castVote()" ${this.selected<0||this.voted?'disabled':''}>CAST VOTE</button>
        </div>
        <div class="vvpat-slip ${this.voted?'show':''}" id="vvpat">
          <p style="font-size:12px;color:#666">— VVPAT Slip —</p>
          <div class="slip-name">${this.voted&&this.selected>=0?this.candidates[this.selected].symbol+' '+this.candidates[this.selected].name:''}</div>
          <div class="slip-party">${this.voted&&this.selected>=0?this.candidates[this.selected].party:''}</div>
          <p style="font-size:11px;color:#888;margin-top:8px">Serial: DEMO-${Math.floor(Math.random()*9000)+1000}</p>
        </div>
        ${this.voted?'<div style="text-align:center;margin-top:12px"><button class="btn btn-secondary" onclick="CivicAI.modules.simulate.reset()">🔄 Try Again</button></div>':''}
      </div>
    </div>
    <div class="glass-card" style="margin-top:32px">
      <h3>⚠️ Common Mistakes to Avoid</h3>
      <ul style="color:var(--text-secondary);font-size:14px;line-height:2;padding-left:20px;margin-top:12px">
        <li>Never take a photo or video inside the voting compartment — it's illegal</li>
        <li>Don't press multiple buttons — only the first press counts</li>
        <li>Don't leave without checking the VVPAT slip (visible for 7 seconds)</li>
        <li>Don't share whom you voted for inside the polling station</li>
        <li>Don't carry any electronic device into the voting compartment</li>
        <li>Don't forget your voter ID — you need valid photo ID to vote</li>
      </ul>
    </div>`;
  },
  init() {},
  selectCandidate(i) {
    if (this.voted) return;
    this.selected = i;
    CivicAI.loadTab('simulate');
  },
  castVote() {
    if (this.selected < 0 || this.voted) return;
    this.voted = true;
    this.step = 5;
    CivicAI.loadTab('simulate');
  },
  reset() { this.selected = -1; this.step = 0; this.voted = false; CivicAI.loadTab('simulate'); },
  nextStep() { if (this.step < 5) { this.step++; CivicAI.loadTab('simulate'); } },
  prevStep() { if (this.step > 0) { this.step--; CivicAI.loadTab('simulate'); } }
});
