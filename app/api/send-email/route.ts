import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, savings } = body;

    console.log("Sending email to:", email);
    console.log("Savings:", savings);

    // 🔥 TEMP: no real email yet
    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}