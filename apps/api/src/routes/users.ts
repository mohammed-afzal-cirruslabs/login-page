/**
 * Users router — address CRUD for the authenticated user.
 *
 * GET    /api/users/me/addresses
 * POST   /api/users/me/addresses
 * PUT    /api/users/me/addresses/:id
 * DELETE /api/users/me/addresses/:id
 */
import { Router } from 'express'
import { z } from 'zod'

import { authenticate } from '../middleware/authenticate.js'
import * as addressService from '../services/address.service.js'

export const usersRouter = Router()

// All routes require authentication
usersRouter.use(authenticate)

const addressSchema = z.object({
  label:     z.string().max(64).optional(),
  line1:     z.string().min(1).max(255),
  line2:     z.string().max(255).optional(),
  city:      z.string().min(1).max(100),
  state:     z.string().min(1).max(100),
  postcode:  z.string().min(1).max(20),
  country:   z.string().length(2).toUpperCase(), // ISO 3166-1 alpha-2
  isDefault: z.boolean().optional(),
})

const addressUpdateSchema = addressSchema.partial()

// ─── GET /api/users/me/addresses ─────────────────────────────────────────────

usersRouter.get('/me/addresses', async (req, res, next) => {
  try {
    const addresses = await addressService.listAddresses(req.user!.id)
    res.json({ addresses })
  } catch (err) {
    next(err)
  }
})

// ─── POST /api/users/me/addresses ────────────────────────────────────────────

usersRouter.post('/me/addresses', async (req, res, next) => {
  const parsed = addressSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(422).json({ error: 'Validation failed', issues: parsed.error.issues })
    return
  }
  try {
    const address = await addressService.createAddress(req.user!.id, parsed.data)
    res.status(201).json({ address })
  } catch (err) {
    next(err)
  }
})

// ─── PUT /api/users/me/addresses/:id ─────────────────────────────────────────

usersRouter.put('/me/addresses/:id', async (req, res, next) => {
  const parsed = addressUpdateSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(422).json({ error: 'Validation failed', issues: parsed.error.issues })
    return
  }
  try {
    const address = await addressService.updateAddress(
      req.user!.id,
      req.params['id']!,
      parsed.data,
    )
    res.json({ address })
  } catch (err) {
    next(err)
  }
})

// ─── DELETE /api/users/me/addresses/:id ──────────────────────────────────────

usersRouter.delete('/me/addresses/:id', async (req, res, next) => {
  try {
    await addressService.deleteAddress(req.user!.id, req.params['id']!)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})
