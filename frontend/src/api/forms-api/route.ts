import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Idempotency-Key",
  "Access-Control-Max-Age": "86400",
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handle POST request
export async function POST(request: NextRequest) {
  try {
    console.log("Form API request received");

    const secret = process.env.LEAD_SECRET;
    if (!secret) {
      console.error("LEAD_SECRET is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500, headers: corsHeaders }
      );
    }

    // Parse request body
    let parsed: Record<string, unknown> = {};
    try {
      parsed = await request.json();
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Extract formId and remove it from the body
    const formId = parsed.formId;
    if (!formId) {
      return NextResponse.json(
        { error: "formId is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (Object.prototype.hasOwnProperty.call(parsed, "formId")) {
      delete parsed.formId;
    }

    const sanitizedBody = JSON.stringify(parsed);
    const ts = Math.floor(Date.now() / 1000).toString();

    // Create HMAC signature
    const sig = crypto
      .createHmac("sha256", secret)
      .update(`${ts}.${sanitizedBody}`)
      .digest("hex");

    // Get idempotency key from headers
    const idem = request.headers.get("idempotency-key") || "";

    console.log("Sanitized body:", sanitizedBody);
    console.log("Form ID:", formId);

    const laravelUrl = `${process.env.LARAVEL_BASE_URL}/api/site/${process.env.LEADS_SITE_ID}/form/${formId}/submit`;
    console.log("Laravel URL:", laravelUrl);

    // Forward request to Laravel backend
    const resp = await fetch(laravelUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Timestamp": ts,
        "X-Signature": sig,
        "X-Partner": "nextjs",
        "Idempotency-Key": idem,
      },
      body: sanitizedBody,
    });

    const text = await resp.text();

    console.log(idem, resp);
    // Try to parse as JSON, otherwise return as text
    let responseData;
    try {
      responseData = JSON.parse(text);
    } catch {
      responseData = text;
    }

    console.log(responseData);

    return NextResponse.json(responseData, {
      status: resp.status,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Form API error:", error);
    return NextResponse.json(
      { error: "Upstream request failed" },
      { status: 500, headers: corsHeaders }
    );
  }
}
