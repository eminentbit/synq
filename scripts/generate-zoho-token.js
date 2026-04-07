#!/usr/bin/env node

/**
 * Helper script to generate Zoho OAuth refresh token
 * Run: node scripts/generate-zoho-token.js
 */

import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log("=== Zoho OAuth Refresh Token Generator ===\n");

  const clientId = await question("Enter your Client ID: ");
  const clientSecret = await question("Enter your Client Secret: ");
  const redirectUri = await question(
    "Enter your Redirect URI (e.g., http://localhost:5173/oauth/callback): "
  );

  console.log("\n1. Open this URL in your browser to authorize:\n");
  const authUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoContacts.contactapi.CREATE&client_id=${clientId}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(redirectUri)}`;
  console.log(authUrl);

  console.log("\n2. After authorizing, you'll be redirected to your redirect URI.");
  console.log(
    "   Copy the 'code' parameter from the URL (you have 60 seconds!).\n"
  );

  const code = await question("Enter the authorization code: ");

  console.log("\n3. Exchanging code for tokens...\n");

  try {
    const tokenUrl = "https://accounts.zoho.com/oauth/v2/token";
    const params = new URLSearchParams({
      code: code.trim(),
      client_id: clientId.trim(),
      client_secret: clientSecret.trim(),
      redirect_uri: redirectUri.trim(),
      grant_type: "authorization_code",
    });

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    const data = await response.json();

    console.log("✅ Success! Here are your credentials:\n");
    console.log("Add these to your .env.local file:\n");
    console.log(`ZOHO_CLIENT_ID=${clientId}`);
    console.log(`ZOHO_CLIENT_SECRET=${clientSecret}`);
    console.log(`ZOHO_REFRESH_TOKEN=${data.refresh_token}`);
    console.log("\n⚠️  Keep these credentials secure and never commit them!\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    rl.close();
  }
}

main();
