// Re-export the Prisma client singleton so every app imports from @ecommerce/db
// rather than instantiating its own client (which would exhaust the connection pool).

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Re-export every generated type so callers don't need @prisma/client directly
export * from "@prisma/client";
