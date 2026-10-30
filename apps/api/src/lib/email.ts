/**
 * Email sender — uses Resend when RESEND_API_KEY is set,
 * falls back to Nodemailer SMTP otherwise.
 * Never logs email content; only logs recipient and subject.
 */
import nodemailer from 'nodemailer'
import { pino } from 'pino'

const log = pino({ level: process.env.LOG_LEVEL ?? 'info' })

interface SendOptions {
  to: string
  subject: string
  html: string
}

async function sendViaResend(opts: SendOptions): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? 'noreply@example.com',
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend error ${res.status}: ${body}`)
  }
}

async function sendViaSmtp(opts: SendOptions): Promise<void> {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'localhost',
    port: Number(process.env.SMTP_PORT ?? 1025),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  })
  await transport.sendMail({
    from: process.env.EMAIL_FROM ?? 'noreply@example.com',
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  })
}

export async function sendEmail(opts: SendOptions): Promise<void> {
  log.info({ to: opts.to, subject: opts.subject }, 'Sending email')
  if (process.env.RESEND_API_KEY) {
    await sendViaResend(opts)
  } else {
    await sendViaSmtp(opts)
  }
}

export function verificationEmailHtml(link: string): string {
  return `
    <p>Thanks for signing up! Verify your email address by clicking the link below.</p>
    <p><a href="${link}">Verify email</a></p>
    <p>This link expires in 24 hours. If you did not sign up, ignore this email.</p>
  `
}

export function passwordResetEmailHtml(link: string): string {
  return `
    <p>You requested a password reset. Click the link below to set a new password.</p>
    <p><a href="${link}">Reset password</a></p>
    <p>This link expires in 1 hour. If you did not request this, ignore this email.</p>
  `
}
