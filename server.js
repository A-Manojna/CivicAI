require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const admin = require('firebase-admin');

// Initialize Firebase Admin
try {
  const serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("🔥 Firebase Admin Initialized");
} catch (e) {
  console.error("Failed to initialize Firebase Admin:", e);
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Serve static files FIRST with proper MIME types
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Gemini Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, history, mode } = req.body;
    
    // Select model and system instructions based on mode
    const systemInstruction = mode === 'detailed'
      ? "You are CivicAI, an expert Indian Election Assistant. Provide detailed, comprehensive, and legally accurate explanations about the Indian electoral process, EVMs, VVPAT, registration, and political history. Use bullet points and clear formatting."
      : "You are CivicAI, a friendly Indian Election Assistant. Explain concepts very simply, like you are talking to a beginner or first-time voter. Avoid complex legal jargon. Keep responses concise and easy to understand.";

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemInstruction,
    });

    const chat = model.startChat({
      history: history || []
    });

    const result = await chat.sendMessage(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Chat API Error:", error);
    if (error.status === 429) {
      res.status(429).json({ error: "rate_limit", message: "The AI is a bit busy right now. Please wait a moment and try again! ⏳" });
    } else {
      res.status(500).json({ error: "Failed to generate response" });
    }
  }
});

// SPA fallback - ONLY for non-file requests
app.get('*', (req, res) => {
  // Don't serve index.html for file requests
  if (req.path.includes('.')) {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🗳️  CivicAI is running on port ${PORT}`);
});
