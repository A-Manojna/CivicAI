/* AI Assistant Module - Conversational Q&A */
CivicAI.register('assistant', {
  messages: [],
  lang: 'en',
  mode: 'simple', // 'simple' or 'detailed'
  render() {
    let msgs = this.messages.map(m => `<div class="chat-bubble ${m.type}">${m.text.replace(/\n/g,'<br>')}</div>`).join('');
    const journey = CivicAI.load('journey_progress', [false,false,false,false,false]);
    const nextStep = journey.indexOf(false);
    
    let dynamicPrompts = [
      { q: "How do I register to vote?", label: "How do I register?" },
      { q: "What documents do I need for Voter ID?", label: "What ID do I need?" },
      { q: "How does the EVM work?", label: "How does EVM work?" },
      { q: "What is NOTA?", label: "What is NOTA?" },
      { q: "How do I find my polling booth?", label: "Find my booth" }
    ];
    
    if (nextStep === 1) dynamicPrompts[0] = { q: "How do I fill Form 6 on NVSP?", label: "Form 6 Help" };
    if (nextStep === 2) dynamicPrompts[1] = { q: "How do I check my name in electoral roll?", label: "Check electoral roll" };
    if (nextStep === 3) dynamicPrompts[4] = { q: "What if I can't find my booth online?", label: "Lost booth?" };

    const promptsHtml = dynamicPrompts.map((p, i) => 
      `<button class="suggested-prompt" style="animation: slideUp 0.4s ease forwards; opacity: 0; animation-delay: ${i * 0.08}s;" onclick="CivicAI.modules.assistant.askSuggestion('${p.q}')">${p.label}</button>`
    ).join('');

    return `<div class="section-title"><h1>🤖 AI Election Assistant</h1><p>Ask me anything about Indian elections</p></div>
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;align-items:center;justify-content:space-between">
      <div style="display:flex;gap:12px;align-items:center">
        <div class="toggle-wrap"><span>🇬🇧 EN</span>
          <div class="toggle ${this.lang==='hi'?'active':''}" id="lang-toggle" onclick="CivicAI.modules.assistant.cycleLang()"></div>
          <span id="lang-label">${this.lang==='hi'?'🇮🇳 हिंदी':this.lang==='te'?'🇮🇳 తెలుగు':'🇮🇳 HI/TE'}</span>
        </div>
        <span class="badge badge-primary">Language: ${this.lang==='hi'?'Hindi':this.lang==='te'?'Telugu':'English'}</span>
      </div>
      
      <div style="display:flex;gap:12px;align-items:center;background:var(--bg-card);padding:4px;border-radius:20px;border:1px solid var(--border-color)">
        <button class="btn btn-sm ${this.mode==='simple'?'btn-primary':'btn-ghost'}" onclick="CivicAI.modules.assistant.setMode('simple')" style="border-radius:16px;padding:4px 12px">Simple Mode</button>
        <button class="btn btn-sm ${this.mode==='detailed'?'btn-primary':'btn-ghost'}" onclick="CivicAI.modules.assistant.setMode('detailed')" style="border-radius:16px;padding:4px 12px">Detailed Mode</button>
      </div>
    </div>
    <div class="chat-container">
      <div class="chat-header"><h3>💬 Chat with CivicAI</h3><span class="badge badge-success">Online</span></div>
      <div class="chat-messages" id="chat-msgs">${msgs || '<div class="chat-bubble ai">Namaste! 🙏 I\'m CivicAI, your election assistant. Ask me anything about Indian elections, voter registration, EVM, or your voting rights!</div>'}</div>
      <div class="suggested-prompts" id="suggestions">
        ${promptsHtml}
      </div>
      <div class="chat-input-wrap">
        <input class="chat-input" id="chat-input" placeholder="Type your question..." onkeydown="if(event.key==='Enter')CivicAI.modules.assistant.send()">
        <button class="chat-send" onclick="CivicAI.modules.assistant.send()">Send</button>
      </div>
    </div>`;
  },
  init() {
    setTimeout(() => { const el = document.getElementById('chat-msgs'); if(el) el.scrollTop = el.scrollHeight; }, 100);
  },
  cycleLang() {
    this.lang = this.lang==='en'?'hi':this.lang==='hi'?'te':'en';
    CivicAI.loadTab('assistant');
  },
  setMode(mode) {
    this.mode = mode;
    CivicAI.loadTab('assistant');
  },
  askSuggestion(q) { document.getElementById('chat-input').value = q; this.send(); },
  async send() {
    const input = document.getElementById('chat-input');
    const q = input.value.trim();
    if (!q) return;
    
    // Check if user is authenticated (Optional per requirement, but let's encourage it)
    if (!CivicAI.modules.auth.user && this.messages.length > 2) {
      if(!CivicAI.modules.auth.requireLogin('continue chatting with CivicAI')) return;
    }

    this.messages.push({ type:'user', text:q });
    this.messages.push({ type:'ai', text:'<span class="typing">Thinking...</span>', id: 'loading-msg' });
    CivicAI.loadTab('assistant');

    try {
      // Build history for Gemini - exclude the current user msg and loading msg
      // History must be prior completed pairs only
      const priorMessages = this.messages
        .filter(m => m.id !== 'loading-msg' && m.type !== 'system')
        .slice(0, -1); // exclude the current user message we just pushed

      // Gemini history must start with 'user' and alternate. Build clean pairs.
      const history = [];
      for (let i = 0; i < priorMessages.length - 1; i += 2) {
        const u = priorMessages[i];
        const a = priorMessages[i + 1];
        if (u && a && u.type === 'user' && a.type === 'ai') {
          history.push({ role: 'user', parts: [{ text: u.text }] });
          history.push({ role: 'model', parts: [{ text: a.text.replace(/<[^>]+>/g, '') }] }); // strip HTML tags
        }
      }

      let finalPrompt = q;
      if (this.lang === 'hi') finalPrompt += ' (Please answer in Hindi)';
      if (this.lang === 'te') finalPrompt += ' (Please answer in Telugu)';

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt, history, mode: this.mode })
      });
      
      const data = await res.json();
      
      // Replace loading message
      this.messages.pop(); 
      if (data.response) {
        // Simple markdown parsing for bold and bullets
        let formatted = data.response
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        this.messages.push({ type:'ai', text:formatted });
      } else if (data.error === 'rate_limit') {
        this.messages.push({ type:'ai', text: '⏳ ' + data.message });
      } else {
        throw new Error(data.error || "Failed to parse");
      }
    } catch (e) {
      this.messages.pop();
      this.messages.push({ type:'ai', text:"Sorry, I'm having trouble connecting to my brain right now. Please try again later." });
      console.error(e);
    }
    CivicAI.loadTab('assistant');
  }
});
