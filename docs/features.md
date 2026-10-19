# Features

## Auth
- Sign-in / sign-up via Clerk; protected routes; user sync to Convex.
- Demo mode replaces the Clerk screens with a demo card and skips the auth redirect.

## Servers
- Server list rail; create server modal; member list panel.

## Channels
- Channel list per server; create channel modal.

## Messaging
- Virtualized message list; composer (Enter to send, Shift+Enter newline) plus a Send button; edit and delete on messages authored by the current user, with an `(edited)` marker.
- The Convex path is not optimistic: the mutation is awaited and the reactive query re-renders. The demo path updates local state immediately.

## Presence & typing
- Member list with online / idle / offline dots; typing indicator; unread counts and mention badges in the channel list.
- `presence-tracker.tsx` sends an "online" heartbeat every 30 seconds. `setPresence` also accepts `"away"`, but nothing sends it (issue #65).
- Unread counts are queried for the active channel only, and no client code calls `reads:markRead`, so the counts do not reset.

## Polish
- Motion transitions (framer-motion); skeletons + empty states.
- `sonner`'s `Toaster` is mounted in the root layout, but no component calls `toast()`.

## Responsive
- Mobile drawer collapse for sidebars.

## Demo mode
- `DEMO_MODE=1` and `NEXT_PUBLIC_DEMO_MODE=1` run the app against an in-memory seed instead of Clerk + Convex. See `docs/architecture.md`.
- Local development and media capture only. Production runs on Clerk + Convex.

## End-to-end tests
- `apps/web/e2e` — Playwright specs for auth (`auth.spec.ts`), navigation (`nav.spec.ts`), sending (`send.spec.ts`), and edit/delete (`edit-delete.spec.ts`).
- `apps/web/playwright.config.ts` starts the dev server with `DEMO_MODE=1` and `NEXT_PUBLIC_DEMO_MODE=1`, so the suite runs offline with no credentials.
- Run with `cd apps/web && bun run test:e2e`. It is not part of `bun run test` — turbo's `test` task covers `packages/ui` and `packages/convex`.
