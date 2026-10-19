"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useMutation } from "convex/react";

export type ComposerProps = {
  onSend: (body: string) => void;
  channelId?: string;
  userId?: string;
};

export function Composer({ onSend, channelId, userId }: ComposerProps) {
  const [value, setValue] = useState("");
  const setTyping = useMutation("typing:setTyping" as any);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notifyTyping = () => {
    if (!channelId || !userId) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setTyping({ userId, channelId } as any).catch(() => {});
    }, 300);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed) {
        onSend(trimmed);
        setValue("");
      }
    }
  };

  return (
    <div className="border-t border-foreground/10 p-2">
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          notifyTyping();
        }}
        onKeyDown={handleKeyDown}
        placeholder="Message..."
        rows={1}
        className="w-full resize-none rounded border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none"
      />
    </div>
  );
}
