/* About Elections Module - Learning Mode */
CivicAI.register('about', {
  detailed: false,
  sections: [
    {
      title: '🏛️ What Are Elections?',
      simple: 'Elections are like choosing a class monitor — but for the whole country! Citizens pick leaders by voting. Each person gets one vote, and the candidate with the most votes wins. In India, elections decide who runs the government at every level: village, city, state, and national.',
      detail: '<p>Elections are a formal process by which citizens of India choose their representatives to govern at various levels — Panchayat (village), Municipality (city), Vidhan Sabha (state), and Lok Sabha (national). India is the world\'s largest democracy with over 900 million eligible voters.</p><ul><li><b>Lok Sabha</b> — 543 seats, elected every 5 years, chooses the Prime Minister</li><li><b>Rajya Sabha</b> — 245 seats, elected by state legislatures (indirect election)</li><li><b>Vidhan Sabha</b> — State Legislative Assembly, size varies by state</li><li><b>Panchayat/Municipal</b> — Local self-government elections</li></ul><p>The entire process is governed by the Election Commission of India (ECI), established under Article 324 of the Constitution.</p>'
    },
    {
      title: '🗳️ Why Does Voting Matter?',
      simple: 'Your vote is your superpower! It decides who makes laws about your school fees, roads, hospitals, and safety. If you don\'t vote, someone else decides your future. Every single vote counts — many elections in India have been won by just a few votes!',
      detail: '<p>Voting is the cornerstone of democracy. Here\'s why every vote matters:</p><ul><li><b>Representation</b> — Your elected MP/MLA speaks for your area in Parliament/Assembly</li><li><b>Accountability</b> — Voting lets you hold leaders accountable; remove non-performing representatives</li><li><b>Policy Impact</b> — Elected leaders decide budgets, education policy, healthcare, infrastructure</li><li><b>Constitutional Right</b> — Article 326 guarantees universal adult suffrage to every citizen 18+</li><li><b>Historical significance</b> — Many elections have been decided by margins as small as 1-5 votes</li></ul><p>In the 2024 General Elections, voter turnout was approximately 65.8%. Your participation can make the difference!</p>'
    },
    {
      title: '📋 How Voting Works: Before, During & After',
      simple: '<p><b>Before Voting Day:</b> Register on the NVSP portal → Get your Voter ID (EPIC) → Check your name in the voter list → Find your polling booth</p><p><b>On Voting Day:</b> Go to your booth → Show your ID → Get your finger inked → Press the button on the EVM → Check the VVPAT slip → Done!</p><p><b>After Voting:</b> Votes are counted on a separate day → Results are announced → The party/coalition with majority forms the government</p>',
      detail: '<p><b>Pre-Election Phase:</b></p><ul><li>Election Commission announces election schedule and Model Code of Conduct kicks in</li><li>Candidates file nominations; scrutiny and withdrawal period follows</li><li>Voter rolls are updated; citizens can register via Form 6 on NVSP</li><li>EVMs and VVPATs are prepared, tested, and sealed</li></ul><p><b>Election Day Process:</b></p><ul><li>Polling hours: typically 7:00 AM to 6:00 PM</li><li>Voter arrives at assigned booth with valid photo ID</li><li>Identity verified by Polling Officer; finger marked with indelible ink</li><li>Voter enters booth, presses EVM button for chosen candidate</li><li>VVPAT prints a slip visible for 7 seconds for verification</li><li>One beep confirms the vote is recorded</li></ul><p><b>Post-Election:</b></p><ul><li>EVMs sealed and stored securely until counting day</li><li>Counting done publicly with candidates\' agents present</li><li>Results declared constituency by constituency</li><li>Party/coalition with 272+ Lok Sabha seats forms government</li></ul>'
    },
    {
      title: '🏗️ Types of Elections in India',
      simple: 'India has 4 main types of elections: <b>Lok Sabha</b> (choosing the PM and national leaders), <b>Vidhan Sabha</b> (choosing state leaders like CM), <b>Local Body</b> (village/city leaders), and <b>Rajya Sabha</b> (state reps to Parliament, but you don\'t directly vote for this one!).',
      detail: '<ul><li><b>General Elections (Lok Sabha)</b> — Held every 5 years across all 543 constituencies. Uses First-Past-The-Post system. The leader of the majority party/coalition becomes PM.</li><li><b>State Assembly Elections (Vidhan Sabha)</b> — Each state holds its own elections for the legislative assembly. The majority leader becomes Chief Minister.</li><li><b>Local Body Elections</b> — Panchayati Raj (rural) and Municipal Corporation/Council (urban). Governed by State Election Commissions.</li><li><b>Rajya Sabha Elections</b> — Members elected by state MLAs using Single Transferable Vote system. 1/3 members retire every 2 years.</li><li><b>Bye-Elections</b> — Held to fill vacancies due to death, resignation, or disqualification of a sitting member.</li><li><b>Presidential & Vice-Presidential Elections</b> — Indirect elections by an electoral college of MPs and MLAs.</li></ul>'
    },
    {
      title: '📖 Key Terms Glossary',
      simple: '<ul><li><b>EVM</b> — Electronic Voting Machine</li><li><b>VVPAT</b> — Paper slip that confirms your vote</li><li><b>EPIC</b> — Your Voter ID card</li><li><b>NOTA</b> — "None Of The Above" button on EVM</li><li><b>ECI</b> — Election Commission of India</li><li><b>NVSP</b> — Website to register and check voter details</li><li><b>MCC</b> — Model Code of Conduct (rules during elections)</li><li><b>Constituency</b> — Your voting area</li></ul>',
      detail: '<ul><li><b>EVM (Electronic Voting Machine)</b> — Introduced in 1982, used nationwide since 2004. Battery-operated, tamper-proof, stores up to 2,000 votes.</li><li><b>VVPAT</b> — Mandatory since 2019 Supreme Court order. 5 VVPATs per constituency are cross-verified with EVM count.</li><li><b>EPIC</b> — Electors Photo Identity Card issued by ECI. Contains photo, name, father\'s name, address, constituency, and unique ID number.</li><li><b>NOTA</b> — Introduced in 2013 after Supreme Court ruling. If NOTA gets maximum votes, the next highest candidate still wins.</li><li><b>ECI</b> — Constitutional body under Article 324. Consists of Chief Election Commissioner + 2 Election Commissioners.</li><li><b>NVSP (voters.eci.gov.in)</b> — One-stop portal for Form 6, voter list search, booth search, and complaint filing.</li><li><b>Model Code of Conduct</b> — Guidelines for parties during elections: no govt announcements, no hate speech, no bribery.</li><li><b>Delimitation</b> — Redrawing constituency boundaries based on census. Last done based on 2001 census.</li><li><b>First-Past-The-Post</b> — The candidate with most votes wins, regardless of whether they get 50%+ votes.</li></ul>'
    }
  ],
  render() {
    let html = `<div class="section-title"><h1>📚 About Indian Elections</h1><p>Learn how democracy works in the world's largest democracy</p></div>
    <div class="toggle-wrap" style="margin-bottom:24px">
      <span>Simple Mode</span>
      <div class="toggle ${this.detailed ? 'active' : ''}" id="about-toggle" onclick="CivicAI.modules.about.toggleMode()"></div>
      <span>Detailed Mode</span>
    </div>`;
    this.sections.forEach((s, i) => {
      html += `<div class="accordion-item">
        <button class="accordion-header" onclick="CivicAI.modules.about.toggleAccordion(${i})" id="acc-h-${i}">
          <span>${s.title}</span><span class="arrow">▼</span>
        </button>
        <div class="accordion-body" id="acc-b-${i}">${this.detailed ? s.detail : s.simple}</div>
      </div>`;
    });
    return html;
  },
  init() {},
  toggleMode() {
    this.detailed = !this.detailed;
    CivicAI.loadTab('about');
  },
  toggleAccordion(i) {
    const h = document.getElementById('acc-h-' + i);
    const b = document.getElementById('acc-b-' + i);
    h.classList.toggle('open');
    b.classList.toggle('open');
  }
});
