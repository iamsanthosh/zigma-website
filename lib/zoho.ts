type EnquiryRecord = {
  id: string;
  enquiry_type: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  message?: string | null;
};

/**
 * Pushes a lead to Zoho CRM. Requires the following env vars:
 * ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_ACCOUNTS_URL (e.g. https://accounts.zoho.in)
 * Returns the Zoho Lead ID on success.
 */
export async function pushLeadToZoho(enquiry: EnquiryRecord): Promise<string> {
  const accountsUrl = process.env.ZOHO_ACCOUNTS_URL ?? "https://accounts.zoho.in";
  const crmUrl = process.env.ZOHO_CRM_API_URL ?? "https://www.zohoapis.in";

  if (!process.env.ZOHO_REFRESH_TOKEN) {
    throw new Error("Zoho CRM is not configured (missing ZOHO_REFRESH_TOKEN)");
  }

  const tokenRes = await fetch(`${accountsUrl}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      grant_type: "refresh_token",
    }),
  });

  if (!tokenRes.ok) {
    throw new Error(`Zoho token request failed: ${tokenRes.status}`);
  }

  const { access_token } = await tokenRes.json();

  const leadRes = await fetch(`${crmUrl}/crm/v3/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          Last_Name: enquiry.name,
          Email: enquiry.email,
          Phone: enquiry.phone,
          Company: enquiry.company || "Website Lead",
          Lead_Source: "Website",
          Description: enquiry.message ?? "",
          Lead_Status: enquiry.enquiry_type,
        },
      ],
    }),
  });

  if (!leadRes.ok) {
    throw new Error(`Zoho lead creation failed: ${leadRes.status}`);
  }

  const result = await leadRes.json();
  return result?.data?.[0]?.details?.id ?? "";
}
