# Discord Clone (Magenta) — Multi-Phase Plan

Stack: Turborepo + Bun · Next.js 16 · Convex · Clerk · Tailwind v4 · shadcn/Radix · Ultracite (oxlint+oxfmt) · tsgo/tsc · bun test + Playwright · Lefthook

Each commit target: <5000 tokens diff. Group by phase; do not mix concerns.

## Phase 0 — Repo bootstrap
- C0.1: Init git, root package.json (bun workspaces), turborepo config, .gitignore
- C0.2: Add packages/config (tsconfig base, ultracite presets, oxlint config)
- C0.3: Lefthook config (pre-commit lint+format+typecheck; pre-push tests+build) + husky removal note
- C0.4: GitHub Actions CI (oxfmt --check, oxlint, tsgo, bun test)
- C0.5: README + AGENTS.md (commands, conventions)

## Phase 1 — Monorepo scaffolding
- C1.1: Create apps/web (Next.js 16, App Router, TS) skeleton
- C1.2: Create packages/ui (shadcn init, Radix, Tailwind v4, magenta tokens)
- C1.3: Create packages/convex (convex init, schema stub)
- C1.4: Wire turborepo pipeline (build, typecheck, lint, test, dev)
- C1.5: Wire catalog deps + shared tsconfig extends

## Phase 2 — Design system (magenta)
- C2.1: Define magenta color scale (HSL vars) in packages/ui globals.css
- C2.2: Theme provider (next-themes) + dark/light tokens
- C2.3: Base primitives (Button, Input, Avatar, Badge) via shadcn
- C2.4: Layout primitives (Sidebar, Panel, ScrollArea)
- C2.5: Typography + spacing tokens + Storybook/preview (optional)

## Phase 3 — Auth
- C3.1: Clerk setup (env, middleware, providers)
- C3.2: Sign-in / sign-up routes + protected layout
- C3.3: User sync to Convex (webhook + mutation)
- C3.4: Auth guards + redirect logic

## Phase 4 — Convex schema + core data
- C4.1: Schema: users, servers, channels, messages, members
- C4.2: Indexes (by server, channel, created_at)
- C4.3: CRUD mutations for servers/channels
- C4.4: Message mutations (send, edit, delete)
- C4.5: Queries (list channels, paginated messages)

## Phase 5 — App shell (Discord layout)
- C5.1: Root layout: server rail + channel sidebar + main + member list
- C5.2: Server list component + create server modal
- C5.3: Channel list + create channel modal
- C5.4: Member list panel
- C5.5: Responsive collapse (mobile drawer)

## Phase 6 — Messaging UI
- C6.1: Message list with virtualization (react-virtuoso or tanstack-virtual)
- C6.2: Message item (avatar, name, timestamp, content, attachments placeholder)
- C6.3: Composer (textarea, send on Enter, shift+Enter newline)
- C6.4: Optimistic send + Convex mutation
- C6.5: Realtime subscription (useQuery) + scroll-to-bottom
- C6.6: Edit/delete message UI + permissions

## Phase 7 — Presence & typing
- C7.1: Presence tracking (Convex presence or custom)
- C7.2: Online/idle/offline indicators
- C7.3: Typing indicators (debounced mutation + subscription)
- C7.4: Unread counts + mention badges

## Phase 8 — Polish & motion
- C8.1: Install motion; message slide-in + fade
- C8.2: Modal/dialog animations
- C8.3: Sidebar collapse transitions
- C8.4: Toast notifications (sonner)
- C8.5: Loading skeletons + empty states

## Phase 9 — Testing
- C9.1: bun test setup in packages/ui (component tests)
- C9.2: bun test for convex functions (convex-test)
- C9.3: Playwright e2e: auth flow
- C9.4: Playwright e2e: send message flow
- C9.5: Playwright e2e: channel navigation

## Phase 10 — Deploy
- C10.1: Vercel project config + env
- C10.2: Convex production deploy + env
- C10.3: Clerk production instance
- C10.4: Domain + analytics (optional)

## Commit discipline
- One concern per commit; keep diffs <5000 tokens.
- Run `bun run check` (oxfmt, oxlint, tsgo, tests) before each commit.
- Lefthook enforces pre-commit; pre-push runs tests+build.
- No comments in code unless requested.
