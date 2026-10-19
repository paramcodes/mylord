# Request / Data Flow

## Auth flow
1. User signs in via Clerk.
2. Clerk webhook fires → Convex mutation upserts user.
3. Middleware redirects unauthenticated users to sign-in.

## Sending a message
1. Composer calls Convex mutation `sendMessage`.
2. Mutation writes to `messages` table (with channel/server refs).
3. Convex broadcasts change to subscribed `useQuery` clients.
4. Message list re-renders; scroll-to-bottom on new own message.

## Reading messages
1. Channel view subscribes to paginated messages query.
2. Convex returns page ordered by `created_at`.
3. Infinite scroll loads older pages.

## Server/channel navigation
1. Server rail selects active server.
2. Channel sidebar lists channels for server (indexed query).
3. Selecting channel swaps active channel → message subscription rebinds.
