"use client";

import { useState, type KeyboardEvent } from "react";

import { useAppData } from "@/lib/app-data";

export type ComposerProps = {
  onSend: (body: string) => void;
};

export function Composer({ onSend }: ComposerProps) {
  const { setTyping } = useAppData();
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-foreground/10 p-2">
      <div className="flex items-end gap-2">
        <textarea
          data-testid="composer-input"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setTyping();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
          rows={1}
          className="w-full resize-none rounded border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none"
        />
        <button
          type="button"
          data-testid="composer-send"
          onClick={submit}
          disabled={!value.trim()}
          className="rounded bg-magenta-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}
