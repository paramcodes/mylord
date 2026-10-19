# Architecture

## Monorepo layout
- `apps/web` — Next.js App Router frontend.
- `packages/ui` — shared design system + magenta tokens.
- `packages/convex` — Convex schema, queries, mutations.
- `packages/config` — shared tsconfig + lint/format presets.

## Routes
- `/` — served by `apps/web/app/(protected)/page.tsx`, which renders `ChatView` + `PresenceTracker`. It is the only page for `/`; the old `apps/web/app/page.tsx` stub was deleted.
- `app/(protected)/layout.tsx` guards `/`: an unauthenticated request is redirected to `/sign-in` (skipped in demo mode).
- `/sign-in`, `/sign-up` — Clerk's `SignIn` / `SignUp`, or a demo card in demo mode.
- Public routes, per the middleware's `isPublicRoute` matcher: `/sign-in(.*)`, `/sign-up(.*)`, `/api/webhooks(.*)`. `/` is not public.

## Data façade
- `apps/web/lib/app-data.ts` defines the `AppData` contract, the `AppDataContextProvider`, and the `useAppData()` hook.
- Components read through `useAppData()` only. `useQuery` / `useMutation` are called by `convex-app-data-provider.tsx` alone.
- `apps/web/components/app-data-provider.tsx` picks the backend at the component boundary: it renders either `demo-app-data-provider.tsx` or `convex-app-data-provider.tsx`. The choice is a whole-component swap, not a conditional hook call, so hook order stays stable across the switch.
- `AppData.mode` reports which backend is live: `"demo"` or `"convex"`.

## Demo mode
- `apps/web/lib/demo-mode.ts` exposes `isDemoMode()`. It reads `DEMO_MODE` (server) and `NEXT_PUBLIC_DEMO_MODE` (client); either set to `"1"` enables demo mode.
- When on: the middleware passes requests through (`demoMiddleware`), the root layout skips `ClerkProvider` and `ConvexClientProvider`, the protected layout skips the `auth()` redirect, and `/sign-in` + `/sign-up` render `demo-auth-card.tsx` instead of Clerk's components.
- Data comes from `apps/web/lib/demo-seed.ts` — an in-memory seed held in React state. Sending, editing, deleting, and creating servers or channels mutate that state.
- Purpose: local development and media capture. Production runs on Clerk + Convex.

## Real-time architecture
- Production path: Convex reactive queries — clients subscribe via `useQuery`, and Convex pushes updates over WebSocket when underlying data changes.
- Mutations are transactional; the Convex provider does no optimistic update — it awaits the mutation and lets the reactive query re-render.
- This path has not been exercised against a live Convex deployment in this repo. Only the demo path has been exercised end to end, by the Playwright suite in `apps/web/e2e`.
- Known gaps on the Convex path: there is no query for the user's servers, so the server rail is only populated by `servers:createServer`; the `messages` table stores `authorId` but no author name, so `Message.author` resolves to an empty string. Tracked in issue #63.

## Auth (Clerk)
- Clerk middleware guards routes; sign-in/sign-up pages under `app/sign-in`, `app/sign-up`.
- Protected layout under `app/(protected)`.
- User sync: Clerk webhook (`app/api/webhooks/clerk/route.ts`) → `users:syncUser` upserts the `users` table; `user.deleted` → `users:deleteUser`.
- The Convex provider also calls `users:syncUser` on sign-in to obtain a Convex user id.

## Data layer
- Convex schema — 8 tables: `users`, `servers`, `channels`, `messages`, `members`, `presence`, `typing`, `reads`.
- Indexes by server, by channel, by created_at, and the composite `by_channel_created_at` used for paginated message queries.
- Function references are string-based, not `api`-imported: `"messages:send"`, `"queries:paginatedMessages"`, `"typing:setTyping"`, `"presence:setPresence"`, `"queries:listChannels"`, `"servers:createServer"`, `"channels:createChannel"`, `"users:syncUser"`, `"reads:unreadCounts"`.
