/**
 * authenticate — verifies the Bearer JWT on the request.
 * Attaches req.user = { id, email, role } on success.
 * Returns 401 if the token is missing or invalid.
 */
import type { NextFunction, Request, Response } from 'express'

import { verifyAccessToken } from '../lib/jwt.js'

export interface AuthUser {
  id: string
  email: string
  role: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or malformed Authorization header' })
    return
  }
  const token = header.slice(7)
  try {
    const payload = verifyAccessToken(token)
    req.user = { id: payload.sub, email: payload.email, role: payload.role }
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired access token' })
  }
}
