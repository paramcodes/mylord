# Request / Data Flow

## Auth flow
1. User signs in via Clerk.
2. Clerk webhook fires → `users:syncUser` upserts the user.
3. Middleware redirects unauthenticated users to sign-in.

In demo mode there is no Clerk: the webhook never fires, the middleware passes requests through, and `/sign-in` + `/sign-up` render a demo card instead of Clerk's components.

## Sending a message
1. Composer calls `useAppData().sendMessage(body)`.
2. The active provider writes the message — Convex: mutation `"messages:send"`; demo: local seed state.
3. Convex broadcasts the change to subscribed `useQuery` clients; the demo provider re-renders from local state.
4. Message list re-renders; scrolls to bottom when the message count changes.

## Editing and deleting a message
1. `MessageItem` renders the edit and delete actions for the current author's messages only.
2. `useAppData().editMessage(id, body)` → mutation `"messages:edit"`; `deleteMessage(id)` → mutation `"messages:remove"`.
3. The Convex mutations reject a `messageId` whose `authorId` does not match the caller.

## Reading messages
1. `ChatView` passes `data.messages` to `Chat`, which renders `MessageList`.
2. Convex path: query `"queries:paginatedMessages"` with `paginationOpts { numItems: 100, cursor: null }`, ordered by the `by_channel_created_at` index, then reversed to oldest-first.
3. One page is fetched. There is no infinite scroll and no load-more control.

## Server/channel navigation
1. Server rail selects the active server through `selectServer`. The Convex provider clears the active channel; the demo provider selects that server's first channel.
2. Channel sidebar lists channels for the active server — Convex: `"queries:listChannels"` (index `by_server`); demo: filtered from the seed.
3. Selecting a channel swaps the active channel → the message query rebinds.

## Presence and typing
1. `PresenceTracker` calls `setPresence("online")` on mount and every 30 seconds → mutation `"presence:setPresence"`.
2. The composer calls `setTyping()` on every keystroke → mutation `"typing:setTyping"`.
3. The provider subscribes to `"presence:listPresence"` (60s cutoff) and `"typing:listTyping"` (5s cutoff) and exposes their results as `members` and `typingNames`.
4. `MemberList` renders a status dot per member; `TypingIndicators` renders "X is typing…" and hides itself when nobody is typing.
