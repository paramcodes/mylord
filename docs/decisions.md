# Decisions

## Convex vs hand-rolled backend
- Chose Convex for reactive queries, transactional mutations, and built-in realtime. Avoids building WebSocket infra and pagination by hand.

## shadcn/Radix vs HeroUI
- Chose shadcn over Radix + Tailwind for copy-paste ownership, no runtime dependency lock-in, and easy magenta token theming. HeroUI's opinionated styling harder to align with custom tokens.

## Tailwind v4
- CSS-first config; tokens live in CSS, not JS config. Simpler theming.

## Bun + Turborepo
- Fast installs/builds; workspaces + catalog for shared dep versions.

## Ultracite (oxlint + oxfmt)
- Rust-based speed; replaces ESLint/Prettier for lint+format.

## Clerk
- Managed auth with webhooks for Convex sync; avoids custom auth flows.

## Testing split
- bun test for unit/component, convex-test for functions, Playwright for e2e flows.
