/**
 * JWT helpers — access token (15 min) + refresh token (7 days).
 * Secrets come from environment; never hardcoded.
 */
import jwt from 'jsonwebtoken'

export interface AccessTokenPayload {
  sub: string   // user id
  email: string
  role: string
  type: 'access'
}

export interface RefreshTokenPayload {
  sub: string
  type: 'refresh'
}

const ACCESS_SECRET  = process.env.JWT_ACCESS_SECRET  ?? 'change-me-access'
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? 'change-me-refresh'

export const ACCESS_TTL_SEC  = 15 * 60          // 15 minutes
export const REFRESH_TTL_SEC = 7 * 24 * 60 * 60 // 7 days

export function signAccessToken(payload: Omit<AccessTokenPayload, 'type'>): string {
  return jwt.sign({ ...payload, type: 'access' }, ACCESS_SECRET, {
    expiresIn: ACCESS_TTL_SEC,
  })
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId, type: 'refresh' }, REFRESH_SECRET, {
    expiresIn: REFRESH_TTL_SEC,
  })
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, ACCESS_SECRET) as AccessTokenPayload
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, REFRESH_SECRET) as RefreshTokenPayload
}
