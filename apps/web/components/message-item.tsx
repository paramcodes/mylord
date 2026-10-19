"use client";

import { cn } from "@/lib/utils";

export type Message = {
  id: string;
  author: string;
  body: string;
  createdAt: number;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function MessageItem({ message }: { message: Message }) {
  return (
    <div className="flex gap-3 py-2">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold">
        {initials(message.author)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold">{message.author}</span>
          <span className="text-xs text-foreground/50">{formatTime(message.createdAt)}</span>
        </div>
        <div className="text-sm text-foreground/80 break-words">{message.body}</div>
      </div>
    </div>
  );
}
