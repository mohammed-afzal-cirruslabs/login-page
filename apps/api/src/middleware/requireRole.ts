/**
 * requireRole — RBAC middleware.
 * Reads the role claim set by authenticate() and returns 403
 * if the caller's role is not in the allowed set.
 *
 * Usage:
 *   router.delete('/admin/users/:id',
 *     authenticate,
 *     requireRole('ADMIN'),
 *     handler)
 */
import type { NextFunction, Request, Response } from 'express'

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      // authenticate() must run first
      res.status(401).json({ error: 'Unauthenticated' })
      return
    }
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'Forbidden',
        detail: `Required role: ${allowedRoles.join(' | ')}`,
      })
      return
    }
    next()
  }
}
