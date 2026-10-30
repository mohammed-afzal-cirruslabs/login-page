# EcomStore — Amazon-scale e-commerce platform

> Monorepo scaffold — S-3. Design tokens approved in S-2. Stories S-4+ build the product.

## Repository layout

```
ecom/
├── apps/
│   ├── web/          Next.js 14 App Router (storefront)
│   └── api/          Node/Express REST API
├── packages/
│   ├── db/           Prisma schema + migrations (PostgreSQL)
│   ├── ui/           Shared React component library
│   └── config/       ESLint, TypeScript, Tailwind, Prettier configs
├── .github/
│   └── workflows/
│       └── ci.yml    Lint → type-check → test → build
├── docker-compose.yml  Local postgres:16 + redis:7
└── design-tokens.json  (from S-2, on design/direction branch)
```

## Prerequisites

| Tool | Version |
|------|---------|
| Node | ≥ 20 |
| npm  | ≥ 10 |
| Docker + Compose v2 | any recent |

## Quick start

```bash
# 1. Copy env file and fill in values
cp .env.example .env

# 2. Start backing services
docker compose up -d

# 3. Install all workspace dependencies
npm ci

# 4. Generate Prisma client
cd packages/db && npm run db:generate && cd ../..

# 5. Run first migration (dev)
cd packages/db && npm run db:migrate:dev && cd ../..

# 6. Start everything in dev mode
npm run dev
```

Apps will be available at:
- **Web** → http://localhost:3000
- **API** → http://localhost:4000
- **Prisma Studio** → `npm run db:studio` → http://localhost:5555

## CI gates (all required on every PR to main)

| Gate | Command | What it checks |
|------|---------|---------------|
| Lint | `npm run lint` | ESLint (strict TS rules) + Prettier |
| Type-check | `npm run type-check` | TypeScript strict mode across all workspaces |
| Unit tests | `npm run test` | Vitest across all workspaces |
| Build | `npm run build` | Turbo build — Next.js + API compile |

## Branch protection (main)

- ✅ Require pull request before merging
- ✅ Require 1 approving review
- ✅ Require all CI checks to pass
- ✅ Dismiss stale reviews on new push
- ✅ No force-push, no deletion

## Environment variables

Copy `.env.example` → `.env` and fill in every value.  
**Never commit `.env` or any file containing a real secret.**

## Design system

Tokens live in `design-tokens.json` (S-2).  
CSS variables are generated in `packages/ui/src/styles/globals.css`.  
Tailwind theme extension is in `packages/config/tailwind.js`.  
All components read tokens only — no literal colour or pixel values inside components.
