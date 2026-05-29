# 🚀 Secure GUI For n8n ChatBot (Hosted on Railway)

A secure, mobile-responsive AI chatbot interface designed to be embedded seamlessly inside corporate platforms (like Google Sites). This architecture forces user authentication via Google Identity Services (GIS) and routes traffic through a secure Node.js proxy server hosted on **Railway.app** to completely protect private AI automation endpoints (n8n Cloud).

---

## ✨ Features

* **🔐 Google Identity Verification:** Complete sign-in wall that forces corporate/user authentication before initializing the agent interface.
* **🛡️ Railway Reverse Proxy:** A production backend Node.js server running on Railway that handles all JWT token validations securely, completely shielding your private n8n webhook endpoints from public exposure.
* **📱 Ultra-Responsive Mobile UI/UX:** A modern, mobile-first design system featuring fluid kinetic scroll transitions, an auto-expanding chat input window for long prompts, and mobile viewport optimizations.
* **⚙️ Core Markdown Engine:** Automatically parses complex responses from the LLM, translating `**bolding**` and markdown links `[Text](URL)` into beautifully styled, clickable HTML elements opening securely in new tabs.
* **🤖 Context-Aware Personalization:** Securely maps the user's authentic Google account name and email directly to the downstream AI workflow execution layout.

---

## 🏗️ Architecture Blueprint

The portal relies on a decoupled, secure triple-tier pipeline:

1.  **Frontend (Client/Google Site Iframe):** Handles user login layouts and updates the chat UI layout dynamically using standard vanilla JavaScript.
2.  **Proxy Server (Railway Application Layer):** Validates incoming client signatures via Google Auth Libraries, signs permissions, blocks malicious cross-origin requests, and appends user identity properties before forwarding requests.
3.  **Automation Engine (n8n Cloud Workflow):** Executes advanced AI agent behaviors, processes historical vector databases, and surfaces calculations natively over direct REST parameters.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom Design System properties), Vanilla JavaScript (ES6+).
* **Backend Hosting:** Node.js, Express.js, hosted on **Railway.app**.
* **AI Orchestration:** n8n Cloud (Advanced AI Agent Node, Window Buffer Memory, LLM chains).

---

## 🚀 Railway Deployment & Environment Variables

This project is optimized for a zero-downtime, continuous deployment workflow directly on **Railway**.

### 1. Railway Environment Setup
Instead of using a local `.env` file in production, navigate to the **Variables** tab in your Railway service dashboard and inject the following configuration parameters:

| Variable Name | Description |
| :--- | :--- |
| `PORT` | Set to `8080` (Railway automatically binds this container port to their public web gateway). |
| `GOOGLE_CLIENT_ID` | Your active Google OAuth 2.0 / GSI Client ID credentials token string. |
| `N8N_WEBHOOK_URL` | Your private, unexposed n8n Production webhook URL endpoint. |

### 2. Local Setup & Testing
To run the server locally before pushing adjustments upstream to Railway:
```bash
# Clone the repository
git clone [https://github.com/Estatedev25/n8n-Chat-Bot-UI.git](https://github.com/Estatedev25/n8n-Chat-Bot-UI.git)
cd n8n-Chat-Bot-UI

# Install dependencies
npm install

# Run the local development server
npm start
