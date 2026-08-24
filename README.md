# Interactly

Twilio and Freshsales integration work — voice/SMS automation and CRM-backed contact management, built with Node.js.

## Modules

### 📞 Twilio — Automated Interview IVR (`/Twilio`)

An outbound call IVR system: places a call, plays an audio message, and captures a single-digit response.

- Press **1** → confirmation message + SMS with a personalized interview link
- Any other key → goodbye message

**Endpoints:**
| Route | Purpose |
|---|---|
| `POST /voice` | Handles inbound call logic, plays audio, gathers digit input |
| `POST /gather` | Processes the collected digit, triggers SMS or rejection |

**Twilio features used:** outbound voice calls, DTMF gather (IVR), SMS messaging, webhooks (via ngrok tunnel for local dev)

### 👥 Freshsales — Contact Sync API (`/freshsales-nodejs`)

An Express API for contact management with dual storage backend support — routes each request to either a CRM (Freshsales) or a MySQL-compatible database via a `data_store` parameter.

**Endpoints:**
| Route | Purpose |
|---|---|
| `POST /createContact` | Create a contact (first name, last name, email, mobile) |
| `POST /getContact` | Retrieve contact by ID |
| `POST /updateContact` | Update email/mobile |
| `POST /deleteContact` | Delete a contact |

## Tech Stack

Node.js, Express, Twilio SDK, MySQL

## Setup

Each module has its own `package.json` and `.env` (gitignored — not committed).

```bash
git clone https://github.com/SaurabhGarg6174/Interactly.git

# Twilio IVR
cd Interactly/Twilio
npm install
# add .env with Twilio credentials, phone numbers, audio/interview link URLs
node twilioIVR.js

# Freshsales contact sync
cd ../freshsales-nodejs
npm install
# add .env with CRM/DB credentials
node index.js
```
