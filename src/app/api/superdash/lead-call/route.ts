import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Forward to external API for Medibuddy demo agent
    const response = await fetch("https://api.skalix.ai/api/superdash/lead-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "origin": "https://www.skalix.ai",
        "referer": "https://www.skalix.ai/",
      },
      body: JSON.stringify({ name, email, phone }),
    });

    const data = await response.json();
    return NextResponse.json({ ...data, agent: "Medibuddy Demo" }, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
