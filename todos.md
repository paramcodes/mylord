# Queue — items move to [x] only after PR merges

## Phase 0 — Repo bootstrap
- [ ] C0.1 Init git, root package.json, turborepo, .gitignore
- [ ] C0.2 packages/config
- [ ] C0.3 Lefthook config
- [ ] C0.4 GitHub Actions CI
- [ ] C0.5 README + AGENTS.md

## Phase 1 — Monorepo scaffolding
- [ ] C1.1 apps/web skeleton
- [ ] C1.2 packages/ui
- [ ] C1.3 packages/convex
- [ ] C1.4 turborepo pipeline
- [ ] C1.5 catalog deps

## Phase 2 — Design system (magenta)
- [ ] C2.1 magenta color scale
- [ ] C2.2 theme provider
- [ ] C2.3 base primitives
- [ ] C2.4 layout primitives
- [ ] C2.5 typography/spacing

## Phase 3 — Auth
- [ ] C3.1 Clerk setup
- [ ] C3.2 sign-in/sign-up routes
- [ ] C3.3 user sync to Convex
- [ ] C3.4 auth guards

## Phase 4 — Convex schema + core data
- [ ] C4.1 schema
- [ ] C4.2 indexes
- [ ] C4.3 server/channel CRUD
- [ ] C4.4 message mutations
- [ ] C4.5 queries

## Phase 5 — App shell
- [ ] C5.1 root layout
- [ ] C5.2 server list
- [ ] C5.3 channel list
- [ ] C5.4 member list
- [ ] C5.5 responsive collapse

## Phase 6 — Messaging UI
- [x] C6.1 virtualized message list
- [x] C6.2 message item
- [x] C6.3 composer
- [x] C6.4 optimistic send
- [x] C6.5 realtime subscription
- [x] C6.6 edit/delete

## Phase 7 — Presence & typing
- [x] C7.1 presence tracking
- [x] C7.2 online indicators
- [x] C7.3 typing indicators
- [x] C7.4 unread/mentions

## Phase 8 — Polish & motion
- [x] C8.1 motion install + message transitions
- [x] C8.2 modal animations
- [x] C8.3 sidebar transitions
- [x] C8.4 toasts
- [x] C8.5 skeletons/empty states

## Phase 9 — Testing
- [x] C9.1 ui component tests
- [x] C9.2 convex function tests
- [x] C9.3 e2e auth
- [x] C9.4 e2e send message
- [x] C9.5 e2e channel nav

## Phase 10 — Deploy
- [x] C10.1 Vercel config
- [x] C10.2 Convex prod deploy
- [x] C10.3 Clerk prod
- [x] C10.4 domain + analytics
