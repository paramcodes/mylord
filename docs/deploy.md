# Deploy

## Clerk production instance

1. Create a production instance in the Clerk dashboard.
2. Copy `pk_live_` / `sk_live_` keys into Vercel env (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`).
3. Register the production webhook endpoint `https://<domain>/api/webhooks/clerk` and set `CLERK_WEBHOOK_SECRET`.
4. Set `NEXT_PUBLIC_APP_URL` to the production origin (used by middleware `authorizedParties`).
5. Configure sign-in/sign-up URLs (`CLERK_SIGN_IN_URL`, `CLERK_SIGN_UP_URL`) if overriding defaults.
