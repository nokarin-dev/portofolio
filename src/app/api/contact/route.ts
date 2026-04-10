import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    const { name, email, message } = await req.json()

    await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: "nokarinn1@gmail.com",
        subject: `New message from ${name}`,
        html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `,
    })

    return NextResponse.json({ ok: true })
}