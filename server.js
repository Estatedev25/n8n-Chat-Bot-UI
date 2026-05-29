const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static frontend from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Environment Variables injected securely by Railway
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const N8N_CHAT_WEBHOOK = process.env.N8N_CHAT_WEBHOOK;
const googleClient = new OAuth2Client(CLIENT_ID);

// 1. Initial Identity Verification Route
app.post('/api/auth-verify', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    res.json({ status: 'authenticated', email: payload.email });
  } catch (error) {
    res.status(401).send('Invalid Google Token');
  }
});

// 2. Chat Proxy Route
app.post('/api/chat-proxy', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).send('Missing token');
    const token = authHeader.split(' ')[1];
    
    const ticket = await googleClient.verifyIdToken({ idToken: token, audience: CLIENT_ID });
    const payload = ticket.getPayload();
    
    const enrichedBody = {
      ...req.body,
      userEmail: payload.email,
      userName: payload.name,
      sessionId: payload.sub 
    };

    const n8nResponse = await fetch(N8N_CHAT_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enrichedBody)
    });

    const responseData = await n8nResponse.json();
    res.json(responseData);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(403).send('Authentication or routing failed');
  }
});

// Railway dynamically assigns a port via environment variables
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));