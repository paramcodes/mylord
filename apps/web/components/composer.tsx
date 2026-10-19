"use client";

import { useState, type KeyboardEvent } from "react";

export type ComposerProps = {
  onSend: (body: string) => void;
};

export function Composer({ onSend }: ComposerProps) {
  const [value, setValue] = useState("");

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
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message..."
        rows={1}
        className="w-full resize-none rounded border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none"
      />
    </div>
  );
}
