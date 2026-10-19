# UI Components & Magenta Tokens

## Location
- `packages/ui/src/components` — shared primitives.
- `packages/ui/src/styles` — global CSS + tokens.
- `packages/ui/src/lib` — utilities (cn, etc.).

## Primitives
- Button, Input, Avatar, Badge (shadcn over Radix).
- Layout: Sidebar, Panel, ScrollArea.

## Magenta tokens
- Defined as CSS variables (HSL) in `packages/ui` globals.
- Tailwind v4 consumes tokens via `@theme`/CSS var mapping.
- Dark/light variants via next-themes class strategy.

## Usage
- Apps import from `packages/ui`; extend with app-specific components in `apps/web/components`.
