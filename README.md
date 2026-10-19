# Mylord

Discord clone ("Magenta"), built as a Turborepo monorepo.

## Stack

- Turborepo + Bun (package manager `bun@1.3.0`)
- Next.js 16 (App Router) · Convex · Clerk
- Tailwind v4 · shadcn/Radix · magenta design tokens
- Ultracite (oxlint + oxfmt) · tsgo/tsc · bun test + Playwright
- Lefthook (pre-commit lint+format+typecheck; pre-push tests+build)

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

## Orchestration

- Coordinator plans and spawns subagents; never implements directly.
- One subagent per issue, one worktree at `/home/param/Work/mylord-wt/<item>`.
- Branch from `origin/main`; never from a stale local branch.
- Squash-merge via PR; reconciler fast-forwards local `main`.
- Queue tracked in `todos.md`; item marked `[x]` only after PR merges.
- Gates run in order: `bun install` → `bun run typecheck` → `bun run test` → `bun run lint` → `bun run build`.
- Conventional commits; keep diffs under ~5000 tokens (lockfiles excluded).
- No comments in code unless technically required.
```