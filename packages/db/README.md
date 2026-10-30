# @ecommerce/db

Prisma schema, migrations and client singleton for the e-commerce platform.

## Prerequisites

- PostgreSQL 15+
- Node 20+, pnpm 9+

## Setup

```bash
# 1. Copy env file and fill in your DATABASE_URL
cp .env.example .env

# 2. Install dependencies (from repo root)
pnpm install

# 3. Run migrations against your local database
pnpm --filter @ecommerce/db migrate:dev

# 4. (Optional) Seed development data
pnpm --filter @ecommerce/db db:seed

# 5. Regenerate the Prisma client after schema changes
pnpm --filter @ecommerce/db generate
```

## Schema overview

| Table | Purpose |
|---|---|
| `users` | Buyers, sellers and admins |
| `addresses` | Shipping / billing addresses per user |
| `categories` | Self-referential category tree |
| `products` | Seller listings with price, stock, status |
| `product_images` | Ordered image gallery per product |
| `variants` | SKU-level size/colour options with price delta |
| `cart_items` | Per-user shopping cart (one row per variant) |
| `orders` | Placed orders with totals and Stripe intent ID |
| `order_items` | Line items snapshotting unit price at purchase time |
| `payments` | Stripe payment record per order |
| `reviews` | 1–5 star reviews, one per user per product |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |

## Migrations

Migrations live in `prisma/migrations/`. Each folder is named
`YYYYMMDDHHMMSS_<slug>` and contains a `migration.sql` that Prisma applies
exactly once, in order.

To create a new migration after editing `schema.prisma`:

```bash
pnpm --filter @ecommerce/db migrate:dev --name <slug>
```

In CI / production, run:

```bash
pnpm --filter @ecommerce/db migrate:deploy
```
