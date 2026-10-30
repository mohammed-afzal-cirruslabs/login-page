/**
 * @ecom/api — Express entry point.
 * Reads config from environment (never from code).
 * All routes are registered in src/routes/.
 */
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { pino } from 'pino'
import pinoHttp from 'pino-http'

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
app.use(pinoHttp({ logger: log }))

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() })
})

// ─── Routes (registered here as features are built) ───────────────────────────
// import { authRouter }     from './routes/auth'
// import { productsRouter } from './routes/products'
// app.use('/api/v1/auth',     authRouter)
// app.use('/api/v1/products', productsRouter)

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// ─── Error handler ────────────────────────────────────────────────────────────
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    log.error({ err }, 'Unhandled error')
    res.status(500).json({ error: 'Internal server error' })
  },
)

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT ?? 4000)
app.listen(PORT, () => {
  log.info({ port: PORT }, 'API server started')
})

export { app }
