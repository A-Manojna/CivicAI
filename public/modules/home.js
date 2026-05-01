/* Home Module - Dashboard + Flashcards */
CivicAI.register('home', {
  flashcards: [
    { q: 'What is the minimum voting age in India?', a: '18 years. You must be 18 on or before the qualifying date set by the Election Commission.' },
    { q: 'What is an EVM?', a: 'Electronic Voting Machine — a portable device used in Indian elections to record votes electronically instead of paper ballots.' },
    { q: 'What does VVPAT stand for?', a: 'Voter Verifiable Paper Audit Trail — a slip is printed showing your vote, visible for 7 seconds, then drops into a sealed box.' },
    { q: 'What is EPIC?', a: 'Electors Photo Identity Card — commonly known as Voter ID card, issued by the Election Commission of India.' },
    { q: 'What is NOTA?', a: 'None Of The Above — an option on the EVM allowing voters to reject all candidates officially.' },
    { q: 'Who conducts elections in India?', a: 'The Election Commission of India (ECI), an autonomous constitutional body established under Article 324.' },
    { q: 'What is the NVSP portal?', a: 'National Voter Service Portal (voters.eci.gov.in) — used for voter registration, corrections, and booth search.' },
    { q: 'What is Form 6?', a: 'Form 6 is the application form for new voter registration, available online through the NVSP portal.' },
    { q: 'What is the Model Code of Conduct?', a: 'A set of guidelines issued by ECI for political parties and candidates during elections to ensure free and fair polls.' },
    { q: 'What is indelible ink?', a: 'A semi-permanent dye applied to the left index finger after voting to prevent duplicate voting. It lasts about 72 hours.' },
    { q: 'What are Lok Sabha elections?', a: 'General elections to choose 543 members of the lower house of Indian Parliament, held every 5 years.' },
    { q: 'What is a constituency?', a: 'A geographical area represented by a single elected member in Parliament or State Assembly.' },
    { q: 'Can NRIs vote in India?', a: 'Yes! NRIs can vote in person at their registered constituency. They need a valid Indian passport.' },
    { q: 'What is a polling booth?', a: 'The designated location where you go to cast your vote on election day. Each booth serves a specific area.' },
    { q: 'What is a bye-election?', a: 'An election held to fill a vacancy caused by death, resignation, or disqualification of a sitting member.' },
    { q: 'What documents can I use as voter ID at the booth?', a: 'EPIC, Aadhaar, Passport, Driving License, PAN Card, and other government photo IDs are accepted.' },
    { q: 'What is delimitation?', a: 'The process of redrawing boundaries of constituencies based on the latest census data to ensure equal representation.' },
    { q: 'How many phases can a general election have?', a: 'General elections are often held in multiple phases (up to 7) across different states due to security and logistical requirements.' },
    { q: 'What is a postal ballot?', a: 'A method allowing certain voters (armed forces, government on duty, disabled, senior citizens 80+) to vote by mail.' },
    { q: 'What happens if EVM malfunctions?', a: 'The presiding officer replaces it with a reserve EVM. Your vote on the faulty machine is not counted, and you can revote.' }
  ],
  fcIndex: 0,
  fcFlipped: false,
  render() {
    const name = CivicAI.load('profile', {}).name || 'Citizen';
    const journey = CivicAI.load('journey_progress', [false,false,false,false,false]);
    const done = journey.filter(Boolean).length;
    return `
    <div class="hero">
      <h1>${CivicAI.getGreeting()}, <span class="gradient-text">${name}!</span></h1>
      <p>Your personal guide to understanding and participating in Indian elections. Let's make your vote count! 🇮🇳</p>
    </div>
    
    <!-- BigQuery Insights Dashboard -->
    <div class="glass-card" style="margin-bottom: 24px; border-left: 4px solid var(--accent); position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; right: -10px; opacity: 0.05; font-size: 100px;">📊</div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
        <div>
          <h3 style="display: flex; align-items: center; gap: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            Community Insights
          </h3>
        </div>
        <span class="badge badge-success" style="animation: pulse 2s infinite;">Live</span>
      </div>
      <div class="grid grid-3" style="gap: 12px;">
        <div style="background: var(--bg-track); padding: 12px; border-radius: 8px;">
          <div style="font-size: 24px; font-weight: 700; color: var(--primary-light);">85%</div>
          <div style="font-size: 12px; color: var(--text-secondary);">Users completed 3/5 steps</div>
        </div>
        <div style="background: var(--bg-track); padding: 12px; border-radius: 8px;">
          <div style="font-size: 18px; font-weight: 700; color: var(--danger); line-height: 32px;">Registration</div>
          <div style="font-size: 12px; color: var(--text-secondary);">Most common missing step</div>
        </div>
        <div style="background: var(--bg-track); padding: 12px; border-radius: 8px;">
          <div style="font-size: 24px; font-weight: 700; color: var(--success);">10,492</div>
          <div style="font-size: 12px; color: var(--text-secondary);">Citizens preparing to vote</div>
        </div>
      </div>
    </div>
    <div class="grid grid-3">
      <div class="glass-card action-card" onclick="CivicAI.navigateTo('journey')">
        <span class="action-icon">🗺️</span><h3>Start My Voting Journey</h3><p>Personalized step-by-step guide</p>
      </div>
      <div class="glass-card action-card" onclick="CivicAI.navigateTo('assistant')">
        <span class="action-icon">🤖</span><h3>Ask AI Assistant</h3><p>Get answers instantly</p>
      </div>
      <div class="glass-card action-card" onclick="CivicAI.navigateTo('timeline')">
        <span class="action-icon">⏰</span><h3>View Timeline</h3><p>Important election dates</p>
      </div>
      <div class="glass-card action-card" onclick="CivicAI.navigateTo('simulate')">
        <span class="action-icon">🗳️</span><h3>Vote Simulation</h3><p>Practice on a mock EVM</p>
      </div>
      <div class="glass-card action-card" onclick="CivicAI.navigateTo('about')">
        <span class="action-icon">📚</span><h3>Learn About Elections</h3><p>Simple & detailed modes</p>
      </div>
      <div class="glass-card action-card" onclick="document.getElementById('flashcard-section').scrollIntoView({behavior:'smooth'})">
        <span class="action-icon">🧠</span><h3>Flashcards</h3><p>Quick revision cards</p>
      </div>
    </div>
    ${done > 0 ? '<div class="glass-card" style="margin-top:24px"><h3>📊 Your Journey Progress</h3><div class="progress-bar"><div class="progress-fill" style="width:' + (done/5*100) + '%"></div></div><p class="progress-text">' + done + ' of 5 steps completed</p></div>' : ''}
    <div id="flashcard-section" style="margin-top:40px">
      <div class="section-title"><h2>🧠 Flashcards — Quick Learning</h2><p>Click a card to reveal the answer. Tap Next to continue.</p></div>
      <div class="flashcard-container">
        <div class="flashcard" id="flashcard" onclick="CivicAI.modules.home.flipCard()">
          <div class="flashcard-face flashcard-front">
            <span class="badge badge-primary" id="fc-cat">Election Basics</span>
            <h3 id="fc-question">${this.flashcards[0].q}</h3>
            <p style="margin-top:12px;font-size:13px;color:var(--text-secondary)">Click to reveal answer</p>
          </div>
          <div class="flashcard-face flashcard-back">
            <span class="badge badge-success">Answer</span>
            <p id="fc-answer" style="margin-top:8px">${this.flashcards[0].a}</p>
          </div>
        </div>
      </div>
      <div class="flashcard-nav">
        <button class="btn btn-ghost btn-sm" onclick="CivicAI.modules.home.prevCard()">← Previous</button>
        <span class="flashcard-progress" id="fc-progress">1 / ${this.flashcards.length}</span>
        <button class="btn btn-primary btn-sm" onclick="CivicAI.modules.home.nextCard()">Next →</button>
      </div>
    </div>`;
  },
  init() { this.fcIndex = 0; this.fcFlipped = false; },
  flipCard() {
    this.fcFlipped = !this.fcFlipped;
    document.getElementById('flashcard').classList.toggle('flipped', this.fcFlipped);
  },
  updateCard() {
    this.fcFlipped = false;
    document.getElementById('flashcard').classList.remove('flipped');
    document.getElementById('fc-question').textContent = this.flashcards[this.fcIndex].q;
    document.getElementById('fc-answer').textContent = this.flashcards[this.fcIndex].a;
    document.getElementById('fc-progress').textContent = (this.fcIndex + 1) + ' / ' + this.flashcards.length;
  },
  nextCard() { this.fcIndex = (this.fcIndex + 1) % this.flashcards.length; this.updateCard(); },
  prevCard() { this.fcIndex = (this.fcIndex - 1 + this.flashcards.length) % this.flashcards.length; this.updateCard(); }
});
