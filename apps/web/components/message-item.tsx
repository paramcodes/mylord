"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export type Message = {
  id: string;
  author: string;
  body: string;
  createdAt: number;
  editedAt?: number;
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
  return new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export type MessageItemProps = {
  message: Message;
  currentAuthor?: string;
  onEdit?: (id: string, body: string) => void;
  onDelete?: (id: string) => void;
};

export function MessageItem({ message, currentAuthor, onEdit, onDelete }: MessageItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(message.body);
  const canModify = !!currentAuthor && currentAuthor === message.author;

  return (
    <motion.div
      data-testid="message-item"
      data-author={message.author}
      className="group flex gap-3 py-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold">
        {initials(message.author)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold">{message.author}</span>
          <span className="text-xs text-foreground/50">{formatTime(message.createdAt)}</span>
          {message.editedAt ? <span className="text-xs text-foreground/40">(edited)</span> : null}
        </div>
        {editing ? (
          <div className="mt-1 flex flex-col gap-2">
            <textarea
              data-testid="message-edit-input"
              aria-label="Edit message"
              className="w-full rounded border border-foreground/20 bg-transparent p-2 text-sm"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                type="button"
                data-testid="message-edit-save"
                aria-label="Save message"
                className="text-xs text-foreground/70 hover:text-foreground"
                onClick={() => {
                  onEdit?.(message.id, draft);
                  setEditing(false);
                }}
              >
                save
              </button>
              <button
                type="button"
                data-testid="message-edit-cancel"
                aria-label="Cancel edit"
                className="text-xs text-foreground/70 hover:text-foreground"
                onClick={() => {
                  setDraft(message.body);
                  setEditing(false);
                }}
              >
                cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-foreground/80 break-words">{message.body}</div>
        )}
      </div>
      {canModify && !editing ? (
        <div className="flex shrink-0 items-start gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            data-testid="message-edit"
            aria-label="Edit message"
            className="text-xs text-foreground/60 hover:text-foreground"
            onClick={() => setEditing(true)}
          >
            edit
          </button>
          <button
            type="button"
            data-testid="message-delete"
            aria-label="Delete message"
            className="text-xs text-foreground/60 hover:text-foreground"
            onClick={() => onDelete?.(message.id)}
          >
            delete
          </button>
        </div>
      ) : null}
    </motion.div>
  );
}
