import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { pushLeadToZoho } from "@/lib/zoho";

function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.name || !body.email || !body.phone) {
    return NextResponse.json({ error: "Name, email and phone are required." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    // No DB configured (e.g. local preview) — accept but log only.
    console.log("[enquiry:dev-mode]", body);
    return NextResponse.json({ success: true, id: "dev-mode" });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("enquiries")
    .insert({
      enquiry_type: body.enquiry_type ?? "general",
      product_id: body.product_id ?? null,
      vertical_id: body.vertical_id ?? null,
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company ?? null,
      message: body.message ?? null,
      metadata: body.metadata ?? {},
      source_page: body.source_page ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Push to Zoho CRM (non-blocking failure — enquiry is already saved)
  try {
    const crmLeadId = await pushLeadToZoho(data);
    await supabase
      .from("enquiries")
      .update({ status: "synced", crm_lead_id: crmLeadId })
      .eq("id", data.id);
  } catch (err) {
    console.error("Zoho CRM sync failed:", err);
    await supabase.from("enquiries").update({ status: "failed" }).eq("id", data.id);
  }

  return NextResponse.json({ success: true, id: data.id });
}
