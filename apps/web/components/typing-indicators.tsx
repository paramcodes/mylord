"use client";

import { useQuery } from "convex/react";

export function TypingIndicators({ channelId, currentUserId }: { channelId?: string; currentUserId?: string }) {
  const rows = useQuery(
    "typing:listTyping" as any,
    channelId ? ({ channelId } as any) : "skip",
  );
  if (!rows || rows.length === 0) return null;
  const others = (rows as any[]).filter((r) => r.userId !== currentUserId);
  if (others.length === 0) return null;
  return (
    <div className="px-4 py-1 text-xs text-foreground/60">
      {others.length === 1 ? "Someone is typing…" : `${others.length} people are typing…`}
    </div>
  );
}
