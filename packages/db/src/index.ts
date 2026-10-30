/**
 * @ecom/db — re-exports the Prisma client as a singleton.
 *
 * In development, the global object is used to prevent hot-reload from
 * creating a new client on every module evaluation (Next.js fast-refresh).
 * In production, a fresh client is created once per process.
 */
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Re-export Prisma types so callers don't need to import @prisma/client directly.
export * from '@prisma/client'
