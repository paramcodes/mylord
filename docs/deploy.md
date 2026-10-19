# Deploy

## Clerk production instance

1. Create a production instance in the Clerk dashboard.
2. Copy `pk_live_` / `sk_live_` keys into Vercel env (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`).
3. Register the production webhook endpoint `https://<domain>/api/webhooks/clerk` and set `CLERK_WEBHOOK_SECRET`.
4. Set `NEXT_PUBLIC_APP_URL` to the production origin (used by middleware `authorizedParties`).
5. Configure sign-in/sign-up URLs (`CLERK_SIGN_IN_URL`, `CLERK_SIGN_UP_URL`) if overriding defaults.
6. Set `NEXT_PUBLIC_CONVEX_URL` to the deployed Convex URL (`bun run deploy:convex` deploys the `packages/convex` functions to prod).

## Demo mode is local-only

- `DEMO_MODE=1` and `NEXT_PUBLIC_DEMO_MODE=1` bypass Clerk and Convex and serve the in-memory seed. It exists for local development and media capture.
- Never set either flag on a deployed environment. A demo build has no user accounts, no persistence, and no live data — it serves the seed in place of the Clerk + Convex path.
- The two flags are read differently, and both matter:
  - `NEXT_PUBLIC_DEMO_MODE` is inlined into the server build when it is set at build time, so a demo build stays a demo build even after the variable is removed from the runtime environment.
  - `DEMO_MODE` is read from the server environment at runtime, so a deployed environment that sets it switches to the demo path.
  - The middleware evaluates the flag at module scope, so its decision is fixed when the edge bundle loads (issue #66).
