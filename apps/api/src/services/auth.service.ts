/**
 * AuthService — all auth business logic lives here.
 * Controllers stay thin; this is where the rules are.
 */
import crypto from 'crypto'

import { prisma } from '@ecom/db'
import bcrypt from 'bcryptjs'

import { sendEmail, verificationEmailHtml, passwordResetEmailHtml } from '../lib/email.js'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt.js'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
const BCRYPT_ROUNDS = 12

// ─── Register ────────────────────────────────────────────────────────────────

export async function register(email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw Object.assign(new Error('Email already registered'), { status: 409 })
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)
  const verifyToken  = crypto.randomBytes(32).toString('hex')
  const verifyExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 h

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      emailVerificationToken: verifyToken,
      emailVerificationExpiry: verifyExpiry,
    },
    select: { id: true, email: true, role: true },
  })

  const link = `${APP_URL}/verify-email?token=${verifyToken}`
  await sendEmail({
    to: email,
    subject: 'Verify your EcomStore email',
    html: verificationEmailHtml(link),
  })

  return user
}

// ─── Verify email ─────────────────────────────────────────────────────────────

export async function verifyEmail(token: string) {
  const user = await prisma.user.findFirst({
    where: {
      emailVerificationToken: token,
      emailVerificationExpiry: { gt: new Date() },
    },
  })
  if (!user) {
    throw Object.assign(new Error('Invalid or expired verification token'), { status: 400 })
  }
  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpiry: null,
    },
  })
}

// ─── Login ────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  // Constant-time comparison even when user doesn't exist — prevents timing attacks
  const hash = user?.passwordHash ?? '$2b$12$invalidhashpadding000000000000000000000000000000000000'
  const match = await bcrypt.compare(password, hash)

  if (!user || !match) {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 })
  }
  if (!user.emailVerified) {
    throw Object.assign(new Error('Email not verified'), { status: 403 })
  }

  const accessToken  = signAccessToken({ sub: user.id, email: user.email, role: user.role })
  const refreshToken = signRefreshToken(user.id)

  return { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role } }
}

// ─── Refresh ──────────────────────────────────────────────────────────────────

export async function refresh(refreshToken: string) {
  let payload
  try {
    payload = verifyRefreshToken(refreshToken)
  } catch {
    throw Object.assign(new Error('Invalid or expired refresh token'), { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, role: true },
  })
  if (!user) {
    throw Object.assign(new Error('User not found'), { status: 401 })
  }

  const accessToken     = signAccessToken({ sub: user.id, email: user.email, role: user.role })
  const newRefreshToken = signRefreshToken(user.id)
  return { accessToken, refreshToken: newRefreshToken }
}

// ─── Forgot password ──────────────────────────────────────────────────────────

export async function forgotPassword(email: string) {
  // Always return without error to avoid leaking whether the email exists
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return

  const resetToken  = crypto.randomBytes(32).toString('hex')
  const resetExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 h

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordResetToken: resetToken, passwordResetExpiry: resetExpiry },
  })

  const link = `${APP_URL}/reset-password?token=${resetToken}`
  await sendEmail({
    to: email,
    subject: 'Reset your EcomStore password',
    html: passwordResetEmailHtml(link),
  })
}

// ─── Reset password ───────────────────────────────────────────────────────────

export async function resetPassword(token: string, newPassword: string) {
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
      passwordResetExpiry: { gt: new Date() },
    },
  })
  if (!user) {
    throw Object.assign(new Error('Invalid or expired reset token'), { status: 400 })
  }

  const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS)
  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
      passwordResetToken: null,
      passwordResetExpiry: null,
    },
  })
}
