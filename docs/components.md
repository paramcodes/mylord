# UI Components & Magenta Tokens

## Location
- `packages/ui/src/components` — shared primitives.
- `packages/ui/src/styles` — global CSS + tokens.
- `packages/ui/src/lib` — utilities (cn, etc.).
- `apps/web/components` — app-specific components.

## Primitives
- Button, Input, Avatar, Badge (shadcn over Radix).
- Layout: Sidebar, Panel, ScrollArea.
- Feedback: Skeleton, EmptyState.

## Magenta tokens
- The magenta scale is defined as Tailwind v4 `@theme` variables (`--color-magenta-50` … `--color-magenta-950`, HSL) in `packages/ui/src/styles/globals.css`. The app imports its own copy of the same scale from `apps/web/app/globals.css` — the `packages/ui` stylesheet is exported as `@mylord/ui/styles` but is not imported anywhere.
- Light and dark `--background` / `--foreground` live in `apps/web/app/globals.css`, toggled by next-themes on the `class` attribute.

## App components
| Component | Test id | Notes |
| --- | --- | --- |
| `app-data-provider.tsx` | — | Picks the demo or Convex provider. |
| `convex-app-data-provider.tsx` | — | The only component that calls `useQuery` / `useMutation`. |
| `demo-app-data-provider.tsx` | — | Holds the in-memory seed in React state. |
| `demo-auth-card.tsx` | `demo-auth-card` | Shown on `/sign-in` and `/sign-up` in demo mode. |
| `convex-client-provider.tsx` | — | `ConvexReactClient` built from `NEXT_PUBLIC_CONVEX_URL`. |
| `theme-provider.tsx` | — | next-themes wrapper; `attribute="class"`. |
| `root-layout.tsx` | — | Server rail, channel sidebar, member panel, mobile drawer. |
| `chat-view.tsx` | `channel-header` | Channel header plus the `Chat` container. |
| `chat.tsx` | — | Message list, typing indicator, composer. |
| `composer.tsx` | `composer-input`, `composer-send` | Enter sends, Shift+Enter adds a newline. |
| `message-list.tsx` | — | Virtualized; scrolls to bottom on new messages. |
| `message-item.tsx` | `message-item`, `message-edit`, `message-delete`, `message-edit-input`, `message-edit-save`, `message-edit-cancel` | Edit and delete render for the current author's messages only. |
| `server-list.tsx` | `server-item` | Rail plus create-server modal. |
| `channel-list.tsx` | `channel-item` | List plus create-channel modal; unread badge. |
| `member-list.tsx` | `member-item` | Status dot per member. |
| `typing-indicators.tsx` | `typing-indicator` | Renders nothing when nobody is typing. |
| `presence-tracker.tsx` | — | 30-second online heartbeat; renders nothing. |

## Test hooks
- `data-testid` values above are the stable handles for the Playwright specs in `apps/web/e2e`. Every value except `message-edit-cancel` is selected by a spec.
- Additional attributes on those elements: `data-message-id` and `data-author` on `message-item`, `data-channel` on `channel-item` and `channel-header`, `data-server` on `server-item`, `data-status` on `member-item`. The specs select on `data-message-id` and `data-status` only.

## Usage
- Apps import from `packages/ui`; extend with app-specific components in `apps/web/components`.
