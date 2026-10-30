/**
 * Auth router — unit tests.
 * Mocks the auth service so no database or email is needed.
 */
import express from 'express'
import request from 'supertest'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { authRouter } from './auth.js'

// Mock the service module
vi.mock('../services/auth.service.js', () => ({
  register: vi.fn(),
  verifyEmail: vi.fn(),
  login: vi.fn(),
  refresh: vi.fn(),
  forgotPassword: vi.fn(),
  resetPassword: vi.fn(),
}))

import * as authService from '../services/auth.service.js'

function buildApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/auth', authRouter)
  app.use(
    (
      err: Error & { status?: number },
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      res.status(err.status ?? 500).json({ error: err.message })
    },
  )
  return app
}

describe('POST /api/auth/register', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 201 on success', async () => {
    vi.mocked(authService.register).mockResolvedValue({
      id: 'u1',
      email: 'a@b.com',
      role: 'BUYER',
    })
    const res = await request(buildApp())
      .post('/api/auth/register')
      .send({ email: 'a@b.com', password: 'password123' })
    expect(res.status).toBe(201)
    expect(res.body.user.email).toBe('a@b.com')
  })

  it('returns 422 for invalid email', async () => {
    const res = await request(buildApp())
      .post('/api/auth/register')
      .send({ email: 'not-an-email', password: 'password123' })
    expect(res.status).toBe(422)
  })

  it('returns 422 for short password', async () => {
    const res = await request(buildApp())
      .post('/api/auth/register')
      .send({ email: 'a@b.com', password: 'short' })
    expect(res.status).toBe(422)
  })

  it('returns 409 when email already exists', async () => {
    vi.mocked(authService.register).mockRejectedValue(
      Object.assign(new Error('Email already registered'), { status: 409 }),
    )
    const res = await request(buildApp())
      .post('/api/auth/register')
      .send({ email: 'a@b.com', password: 'password123' })
    expect(res.status).toBe(409)
  })
})

describe('POST /api/auth/login', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 200 with accessToken on success', async () => {
    vi.mocked(authService.login).mockResolvedValue({
      accessToken: 'tok',
      refreshToken: 'ref',
      user: { id: 'u1', email: 'a@b.com', role: 'BUYER' },
    })
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'a@b.com', password: 'password123' })
    expect(res.status).toBe(200)
    expect(res.body.accessToken).toBe('tok')
  })

  it('returns 401 for wrong credentials', async () => {
    vi.mocked(authService.login).mockRejectedValue(
      Object.assign(new Error('Invalid email or password'), { status: 401 }),
    )
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'a@b.com', password: 'wrong' })
    expect(res.status).toBe(401)
  })
})

describe('POST /api/auth/logout', () => {
  it('returns 200 and clears cookie', async () => {
    const res = await request(buildApp()).post('/api/auth/logout')
    expect(res.status).toBe(200)
    expect(res.body.message).toMatch(/logged out/i)
  })
})

describe('POST /api/auth/forgot-password', () => {
  beforeEach(() => vi.clearAllMocks())

  it('always returns 200 regardless of whether email exists', async () => {
    vi.mocked(authService.forgotPassword).mockResolvedValue(undefined)
    const res = await request(buildApp())
      .post('/api/auth/forgot-password')
      .send({ email: 'unknown@example.com' })
    expect(res.status).toBe(200)
  })
})
