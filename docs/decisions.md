# Decisions

## Convex vs hand-rolled backend
- Chose Convex for reactive queries, transactional mutations, and built-in realtime. Avoids building WebSocket infra and pagination by hand.
- The Convex path has not been run against a live deployment in this repo, so the reactive behaviour is unverified here.

## shadcn/Radix vs HeroUI
- Chose shadcn over Radix + Tailwind for copy-paste ownership, no runtime dependency lock-in, and easy magenta token theming. HeroUI's opinionated styling harder to align with custom tokens.

## Tailwind v4
- CSS-first config; tokens live in CSS, not JS config. Simpler theming.

## Bun + Turborepo
- Fast installs/builds; workspaces + catalog for shared dep versions.

## Ultracite (oxlint + oxfmt)
- Rust-based speed; replaces ESLint/Prettier for lint+format.
- Current state: `oxfmt` formats and `oxlint` runs in the pre-commit hook; the `lint` gate is still ESLint in `apps/web`.

## Clerk
- Managed auth with webhooks for Convex sync; avoids custom auth flows.

## Data façade
- Components read from a single `useAppData()` contract. Only the Convex provider touches `useQuery` / `useMutation`, so a different backend can be swapped in without touching components.

## Provider selection at the component boundary
- The demo/Convex choice is a whole-component swap in `app-data-provider.tsx`, not a conditional hook call, so React hook order stays stable across the switch.

## Demo mode
- An in-memory seed behind the same façade, enabled by `DEMO_MODE` / `NEXT_PUBLIC_DEMO_MODE`. Local development and media capture run with no Clerk or Convex credentials. Production uses Clerk + Convex.

## Testing split
- bun test for unit/component, convex-test for functions, Playwright for e2e flows. The Playwright suite runs against the demo-mode build, so it needs no credentials and no network.
