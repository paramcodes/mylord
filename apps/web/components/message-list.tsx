"use client";

import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { MessageItem, type Message } from "./message-item";
import { EmptyState, Skeleton } from "@mylord/ui";

export type MessageListProps = {
  messages: Message[];
  loading?: boolean;
  currentAuthor?: string;
  onEdit?: (id: string, body: string) => void;
  onDelete?: (id: string) => void;
};

export function MessageList({
  messages,
  loading = false,
  currentAuthor,
  onEdit,
  onDelete,
}: MessageListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 8,
  });

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  if (loading) {
    return (
      <div className="flex-1 space-y-2 overflow-auto px-4 py-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <EmptyState title="No messages yet" description="Start the conversation" className="flex-1" />
    );
  }

  return (
    <div ref={parentRef} className="flex-1 overflow-auto px-4 py-2">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const m = messages[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
              className="py-2"
            >
              <MessageItem
                message={m}
                currentAuthor={currentAuthor}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
