// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const prompt = `
// You are a SaaS cost optimization analyst.

// Tool: ${body.tool}
// Plan: ${body.plan}
// Spend: $${body.spend}
// Seats: ${body.seats}

// Savings: $${body.savings}/month
// Recommendation: ${body.recommendation}
// Reason: ${body.reason}

// Write ~100 word summary.
// `;

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4o-mini",
//         messages: [
//           { role: "user", content: prompt }
//         ],
//         max_tokens: 200,
//       }),
//     });

//     const data = await response.json();

//     return NextResponse.json({
//       summary: data.choices?.[0]?.message?.content || null,
//     });

//   } catch {
//     return NextResponse.json({ summary: null });
//   }
// }
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, savings } = body;

    console.log("📧 Email:", email);
    console.log("💰 Savings:", savings);

    // TEMP success response
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}