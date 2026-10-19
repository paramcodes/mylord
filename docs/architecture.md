# Architecture

## Monorepo layout
- `apps/web` — Next.js App Router frontend.
- `packages/ui` — shared design system + magenta tokens.
- `packages/convex` — Convex schema, queries, mutations, actions.
- `packages/config` — shared tsconfig + lint/format presets.

## Real-time architecture
- Convex provides reactive queries: clients subscribe via `useQuery`, and Convex pushes updates over WebSocket when underlying data changes.
- Mutations are transactional; optimistic updates handled client-side where needed.

## Auth (Clerk)
- Clerk middleware guards routes; sign-in/sign-up pages under `app/sign-in`, `app/sign-up`.
- Protected layout under `app/(protected)`.
- User sync: Clerk webhook → Convex mutation upserts `users` table.

## Data layer
- Convex schema: users, servers, channels, messages, members.
- Indexes by server, channel, created_at for paginated message queries.
