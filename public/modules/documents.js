/* Documents & Checklist Module */
CivicAI.register('documents', {
  render() {
    const checked = CivicAI.load('doc_checks', {});
    const mkCheck = (id, label) => `<label class="doc-check"><input type="checkbox" ${checked[id]?'checked':''} onchange="CivicAI.modules.documents.toggle('${id}')"><span>${label}</span></label>`;
    return `<div class="section-title"><h1>📋 Documents & Checklist</h1><p>Everything you need to prepare for voting day</p></div>
    <div class="doc-section"><h3>🪪 Accepted ID Proofs at Polling Booth</h3><p style="color:var(--text-secondary);font-size:13px;margin-bottom:12px">You need ANY ONE of the following valid photo IDs</p>
      ${mkCheck('epic','EPIC — Electors Photo Identity Card (Voter ID)')}
      ${mkCheck('aadhaar','Aadhaar Card')}
      ${mkCheck('passport','Indian Passport')}
      ${mkCheck('dl','Driving License')}
      ${mkCheck('pan','PAN Card')}
      ${mkCheck('smart','Smart Card issued by RGI under NPR')}
      ${mkCheck('mnrega','MNREGA Job Card')}
      ${mkCheck('bank','Bank / Post Office Passbook with Photograph')}
      ${mkCheck('govt','Photo ID issued by Central / State Government')}
      ${mkCheck('mla','Photo Identity Card issued to MPs / MLAs / MLCs')}
    </div>
    <div class="doc-section"><h3>📝 Documents for New Voter Registration (Form 6)</h3>
      ${mkCheck('age_proof','Age Proof — Birth certificate, Class 10 marksheet, or Passport')}
      ${mkCheck('address_proof','Address Proof — Aadhaar, Passport, Utility bill, or Bank statement')}
      ${mkCheck('photo','Recent Passport-size Photograph')}
      ${mkCheck('form6','Filled Form 6 (available on voters.eci.gov.in)')}
    </div>
    <div class="doc-section"><h3>🗳️ Voting Day Preparation Checklist</h3>
      ${mkCheck('verify_name','Verify your name in the voter list on NVSP portal')}
      ${mkCheck('find_booth','Know your polling booth number and address')}
      ${mkCheck('carry_id','Keep your photo ID ready to carry')}
      ${mkCheck('polling_hours','Note polling hours (typically 7 AM – 6 PM)')}
      ${mkCheck('voter_slip','Collect your voter slip (if distributed in your area)')}
    </div>
    <div class="doc-section"><h3>✅ Do's and Don'ts on Voting Day</h3>
    <div class="do-dont-grid">
      <div class="do-card"><h4>✅ DO's</h4><ul>
        <li>Carry a valid photo ID</li><li>Reach the booth early to avoid queues</li><li>Verify your details before entering the booth</li>
        <li>Check the VVPAT slip after pressing the EVM button</li><li>Wait for the beep to confirm your vote</li>
        <li>Get your finger marked with indelible ink</li><li>Maintain queue discipline</li><li>Report any irregularities to the Presiding Officer</li>
      </ul></div>
      <div class="dont-card"><h4>❌ DON'Ts</h4><ul>
        <li>Don't take photos or videos inside the booth</li><li>Don't carry your phone into the voting compartment</li>
        <li>Don't discuss your vote choice inside the polling station</li><li>Don't campaign or influence others near the booth (100m radius)</li>
        <li>Don't carry any weapons to the polling station</li><li>Don't wear party symbols or carry party flags</li>
        <li>Don't try to vote more than once (serious criminal offense)</li><li>Don't panic — polling officers are there to help</li>
      </ul></div>
    </div></div>`;
  },
  init() {},
  toggle(id) {
    if (!CivicAI.modules.auth.requireLogin('save your document checklist')) return;
    const c = CivicAI.load('doc_checks', {});
    c[id] = !c[id];
    CivicAI.save('doc_checks', c);
    CivicAI.loadTab('documents');
  }
});
