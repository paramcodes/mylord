# Stack & Tooling

## Runtime & package management
- Bun 1.3.0 (`packageManager`).
- Turborepo monorepo with workspaces `apps/*` and `packages/*`.

## Frontend
- Next.js 16, App Router, TypeScript.
- Tailwind CSS v4 (`@tailwindcss/postcss`).
- shadcn/ui over Radix primitives.
- next-themes for dark/light.

## Backend
- Convex: realtime database, queries/mutations/actions.
- Clerk: auth (middleware, providers, webhooks → Convex user sync).

## UI package
- `packages/ui`: magenta design tokens, shared primitives (Button, Input, Avatar, Badge, Sidebar, Panel, ScrollArea).

## Quality tooling
- Ultracite: oxlint + oxfmt.
- TypeScript via tsgo/tsc.
- Tests: bun test (unit/component), convex-test (Convex functions), Playwright (e2e).
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
