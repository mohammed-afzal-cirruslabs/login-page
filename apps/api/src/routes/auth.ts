/**
 * Auth router — POST /api/auth/*
 *
 * Endpoints:
 *   POST   /api/auth/register
 *   GET    /api/auth/verify-email?token=
 *   POST   /api/auth/login
 *   POST   /api/auth/refresh
 *   POST   /api/auth/logout
 *   POST   /api/auth/forgot-password
 *   POST   /api/auth/reset-password
 */
import { Router } from 'express'
import { z } from 'zod'

import * as authService from '../services/auth.service.js'

export const authRouter = Router()

const REFRESH_COOKIE = 'refresh_token'
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  path: '/api/auth',
}

// ─── Validation schemas ───────────────────────────────────────────────────────

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const forgotSchema = z.object({
  email: z.string().email(),
})

const resetSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(128),
})

// ─── POST /api/auth/register ──────────────────────────────────────────────────

authRouter.post('/register', async (req, res, next) => {
  const parsed = registerSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(422).json({ error: 'Validation failed', issues: parsed.error.issues })
    return
  }
  try {
    const user = await authService.register(parsed.data.email, parsed.data.password)
    res.status(201).json({
      message: 'Registration successful. Check your email to verify your account.',
      user,
    })
  } catch (err) {
    next(err)
  }
})

// ─── GET /api/auth/verify-email?token= ───────────────────────────────────────

authRouter.get('/verify-email', async (req, res, next) => {
  const token = req.query['token']
  if (typeof token !== 'string' || !token) {
    res.status(400).json({ error: 'Missing token query parameter' })
    return
  }
  try {
    await authService.verifyEmail(token)
    res.json({ message: 'Email verified successfully' })
  } catch (err) {
    next(err)
  }
})

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

authRouter.post('/login', async (req, res, next) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(422).json({ error: 'Validation failed', issues: parsed.error.issues })
    return
  }
  try {
    const { accessToken, refreshToken, user } = await authService.login(
      parsed.data.email,
      parsed.data.password,
    )
    res.cookie(REFRESH_COOKIE, refreshToken, COOKIE_OPTS)
    res.json({ accessToken, user })
  } catch (err) {
    next(err)
  }
})

// ─── POST /api/auth/refresh ───────────────────────────────────────────────────

authRouter.post('/refresh', async (req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const token = req.cookies?.[REFRESH_COOKIE] as string | undefined
  if (!token) {
    res.status(401).json({ error: 'No refresh token cookie' })
    return
  }
  try {
    const { accessToken, refreshToken } = await authService.refresh(token)
    res.cookie(REFRESH_COOKIE, refreshToken, COOKIE_OPTS)
    res.json({ accessToken })
  } catch (err) {
    next(err)
  }
})

// ─── POST /api/auth/logout ────────────────────────────────────────────────────

authRouter.post('/logout', (_req, res) => {
  res.clearCookie(REFRESH_COOKIE, { path: '/api/auth' })
  res.json({ message: 'Logged out' })
})

// ─── POST /api/auth/forgot-password ──────────────────────────────────────────

authRouter.post('/forgot-password', async (req, res, next) => {
  const parsed = forgotSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(422).json({ error: 'Validation failed', issues: parsed.error.issues })
    return
  }
  try {
    await authService.forgotPassword(parsed.data.email)
    // Always 200 — never reveal whether the email exists
    res.json({ message: 'If that email is registered you will receive a reset link shortly.' })
  } catch (err) {
    next(err)
  }
})

// ─── POST /api/auth/reset-password ───────────────────────────────────────────

authRouter.post('/reset-password', async (req, res, next) => {
  const parsed = resetSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(422).json({ error: 'Validation failed', issues: parsed.error.issues })
    return
  }
  try {
    await authService.resetPassword(parsed.data.token, parsed.data.password)
    res.json({ message: 'Password reset successfully. You can now log in.' })
  } catch (err) {
    next(err)
  }
})
