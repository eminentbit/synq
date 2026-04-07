import type { VercelRequest, VercelResponse } from "@vercel/node";

interface ContactData {
  email: string;
  firstName?: string;
  lastName?: string;
}

async function getZohoAccessToken(): Promise<string> {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Zoho OAuth credentials in environment variables");
  }

  const tokenUrl = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;

  const response = await fetch(tokenUrl, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function addContactToZoho(
  accessToken: string,
  contactData: ContactData,
): Promise<void> {
  const { email, firstName, lastName } = contactData;

  const payload = {
    contacts: [
      {
        emails: [
          {
            is_primary: true,
            email_id: email,
          },
        ],
        ...(firstName && { first_name: firstName }),
        ...(lastName && { last_name: lastName }),
        notes: `Joined waitlist from Trueconvos landing page on ${new Date().toISOString()}`,
      },
    ],
  };

  const response = await fetch(
    "https://contacts.zoho.com/api/v1/accounts/self/contacts?source=Trueconvos",
    {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to add contact to Zoho: ${errorText}`);
  }

  const result = await response.json();
  console.log("Contact added successfully:", result);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, firstName, lastName } = req.body as ContactData;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Get Zoho access token
    const accessToken = await getZohoAccessToken();

    // Add contact to Zoho
    await addContactToZoho(accessToken, { email, firstName, lastName });

    return res.status(200).json({
      success: true,
      message: "Successfully added to waitlist",
    });
  } catch (error) {
    console.error("Error adding contact to waitlist:", error);
    return res.status(500).json({
      error: "Failed to add to waitlist",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
