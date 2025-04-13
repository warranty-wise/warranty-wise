// app/api/chat/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages,
            }),
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "No response";

        return NextResponse.json({ reply });
    } catch (error) {
        console.error("OpenAI error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
