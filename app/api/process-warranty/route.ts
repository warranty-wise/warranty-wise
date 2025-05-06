import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
    const { text } = await req.json()

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that extracts warranty information from text. Please extract the following information: product_name, product_type, warranty_period, purchase_date, expiration_date, product_manufacturer, product_serial_number, coverage, status, can_renew." 
                    + "Return the information in JSON format, specifically for the dates, format it so that it is a Date object in typescript, but can still be parsed by JSON."
                },
                {
                    role: "user",
                    content: text
                }
            ],
        })

        const result = completion.choices[0].message.content ?? '{}'
        return NextResponse.json(JSON.parse(result))
    } catch (error) {
        console.error('OpenAI API error:', error)
        return NextResponse.json({ error: 'Failed to process warranty information' }, { status: 500 })
    }
}