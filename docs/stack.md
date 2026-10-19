# Stack & Tooling

## Runtime & package management
- Bun 1.3.0 (`packageManager`).
- Turborepo monorepo with workspaces `apps/*` and `packages/*`.

## Frontend
- Next.js 16, App Router, TypeScript.
- Tailwind CSS v4 (`@tailwindcss/postcss`).
- shadcn/ui over Radix primitives.
- next-themes for dark/light.
- framer-motion for transitions, `@tanstack/react-virtual` for the message list, sonner for toasts.

## Backend
- Convex: realtime database, queries and mutations. No actions are defined.
- Clerk: auth (middleware, providers, webhooks → Convex user sync).
- The Convex path is the production path. It has not been exercised against a live deployment in this repo.

## UI package
- `packages/ui`: magenta design tokens, shared primitives (Button, Input, Avatar, Badge, Sidebar, Panel, ScrollArea, Skeleton, EmptyState).

## Quality tooling
- Formatting uses Ultracite's `oxfmt`; the pre-commit hook runs `oxfmt --check` and `oxlint` via `bunx`. The `lint` gate itself is ESLint (`apps/web/eslint.config.mjs`).
- TypeScript via `tsc --noEmit`, per package.
- Tests: bun test (unit/component) and convex-test (Convex functions). Playwright drives the e2e flows separately, against the demo-mode build: `cd apps/web && bun run test:e2e`.
- Lefthook: pre-commit lint+format+typecheck; pre-push tests+build.

## Commands
```sh
bun install
bun run dev          # turbo dev
bun run build        # turbo build
bun run typecheck    # turbo typecheck
bun run lint         # turbo lint
bun run format       # oxfmt . && bun run lint
bun run test         # turbo test
```
