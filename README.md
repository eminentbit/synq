# Trueconvos

A React + TypeScript landing page for a semantic matching platform that uses LLM embeddings to connect users based on their interests and thinking styles. Built with Vite, TailwindCSS, and integrated with Zoho Contacts API for waitlist management.

## Features

- **Semantic Vector Matching** - Find your intellectual twin through AI-powered matching
- **Waitlist Integration** - Automatic contact creation in Zoho Contacts
- **Serverless Backend** - Vercel serverless functions for API handling
- **Modern Stack** - React 19, TypeScript 6, Vite 8, TailwindCSS 4
- **React Compiler** - Enabled for automatic optimization

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Zoho Contacts Integration

The waitlist form automatically adds signups to Zoho Contacts via serverless API.

### Step 1: Register Your App

1. Go to [Zoho API Console](https://api-console.zoho.com/)
2. Click "Add Client" → Choose "Server-based Applications"
3. Fill in:
   - **Client Name**: Trueconvos Waitlist
   - **Homepage URL**: Your app URL (e.g., `http://localhost:5173`)
   - **Authorized Redirect URIs**: `http://localhost:5173/oauth/callback`
4. Copy your **Client ID** and **Client Secret**

### Step 2: Generate Refresh Token

**Option A: Use the helper script** (easiest)
```bash
node scripts/generate-zoho-token.js
```

**Option B: Manual process**

1. Generate authorization URL (replace `CLIENT_ID`):
```
https://accounts.zoho.com/oauth/v2/auth?scope=ZohoContacts.contactapi.CREATE&client_id=CLIENT_ID&response_type=code&access_type=offline&redirect_uri=http://localhost:5173/oauth/callback
```

2. Open in browser, authorize, and copy the `code` from redirect URL (valid 60 seconds)

3. Exchange code for refresh token:
```bash
curl -X POST https://accounts.zoho.com/oauth/v2/token \
  -d "code=YOUR_CODE" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=http://localhost:5173/oauth/callback" \
  -d "grant_type=authorization_code"
```

4. Save the `refresh_token` from the response

### Step 3: Configure Environment Variables

**Local Development:**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_client_secret
ZOHO_REFRESH_TOKEN=your_refresh_token
```

**Vercel Deployment:**
1. Go to Vercel project settings → Environment Variables
2. Add all three variables for Production, Preview, and Development

### Step 4: Test Locally (Optional)

```bash
# Install Vercel CLI
npm i -g vercel

# Run dev server with serverless functions
vercel dev

# Test the API
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### API Endpoint

**Endpoint:** `/api/waitlist`
- **Method:** POST
- **Payload:** `{ "email": "user@example.com" }`
- **Success:** `{ "success": true, "message": "Successfully added to waitlist" }`
- **Error:** `{ "error": "Error message", "details": "..." }`

### Troubleshooting

**"Missing Zoho OAuth credentials"**
- Check all three environment variables are set
- For Vercel, add them in project settings

**"Failed to get access token"**
- Refresh token may be expired/revoked
- Generate new token using helper script

**"Failed to add contact to Zoho"**
- Verify Zoho Contacts is enabled in your account
- Check OAuth scope includes `ZohoContacts.contactapi.CREATE`
- Check [Zoho API status](https://status.zoho.com)

## Deployment

### Vercel (Recommended)

1. Push repository to GitHub
2. Connect to Vercel
3. Add environment variables in project settings
4. Deploy automatically on push

The `vercel.json` config ensures serverless functions work correctly.

## Tech Stack

- **React 19** with TypeScript 6
- **Vite 8** for build tooling
- **TailwindCSS 4** for styling
- **React Compiler** for automatic optimization
- **Vercel** for serverless functions and hosting
- **Zoho Contacts API** for waitlist management

## Security

- OAuth credentials are server-side only (never exposed to frontend)
- `.env` files are git-ignored
- Refresh tokens don't expire but can be revoked
- Access tokens regenerate on-demand and expire after 1 hour
