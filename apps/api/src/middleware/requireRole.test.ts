/**
 * requireRole middleware — unit tests.
 */
import express from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'

import { requireRole } from './requireRole.js'

function buildApp(role: string | undefined) {
  const app = express()
  app.use((req, _res, next) => {
    if (role) req.user = { id: 'u1', email: 'a@b.com', role }
    next()
  })
  app.get('/admin', requireRole('ADMIN'), (_req, res) => res.json({ ok: true }))
  app.get('/seller', requireRole('SELLER', 'ADMIN'), (_req, res) => res.json({ ok: true }))
  return app
}

describe('requireRole', () => {
  it('allows ADMIN to access /admin', async () => {
    const res = await request(buildApp('ADMIN')).get('/admin')
    expect(res.status).toBe(200)
  })

  it('returns 403 for BUYER accessing /admin', async () => {
    const res = await request(buildApp('BUYER')).get('/admin')
    expect(res.status).toBe(403)
  })

  it('allows SELLER to access /seller', async () => {
    const res = await request(buildApp('SELLER')).get('/seller')
    expect(res.status).toBe(200)
  })

  it('allows ADMIN to access /seller', async () => {
    const res = await request(buildApp('ADMIN')).get('/seller')
    expect(res.status).toBe(200)
  })

  it('returns 401 when req.user is not set', async () => {
    const res = await request(buildApp(undefined)).get('/admin')
    expect(res.status).toBe(401)
  })
})
