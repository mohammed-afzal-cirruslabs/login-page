/**
 * @ecom/api — Express entry point.
 * Reads config from environment (never from code).
 * All routes are registered in src/routes/.
 */
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { pino } from 'pino'
import pinoHttp from 'pino-http'

import { authRouter } from './routes/auth.js'
import { usersRouter } from './routes/users.js'

const log = pino({ level: process.env.LOG_LEVEL ?? 'info' })

const app = express()

// ─── Security & middleware ────────────────────────────────────────────────────
app.use(helmet())
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    credentials: true,
  }),
)
app.use(compression())
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(pinoHttp({ logger: log }))

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() })
})

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',  authRouter)
app.use('/api/users', usersRouter)

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// ─── Error handler ────────────────────────────────────────────────────────────
app.use(
  (
    err: Error & { status?: number },
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    const status = err.status ?? 500
    if (status >= 500) {
      log.error({ err }, 'Unhandled error')
    }
    res.status(status).json({ error: err.message ?? 'Internal server error' })
  },
)

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT ?? 4000)
app.listen(PORT, () => {
  log.info({ port: PORT }, 'API server started')
})

export { app }
