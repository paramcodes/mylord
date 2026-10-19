"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { MessageItem, type Message } from "./message-item";

export type MessageListProps = {
  messages?: Message[];
  channelId?: string;
  currentAuthor?: string;
  onEdit?: (id: string, body: string) => void;
  onDelete?: (id: string) => void;
};

export function MessageList({ messages: messagesProp, channelId, currentAuthor, onEdit, onDelete }: MessageListProps) {
  const queryMessages = useQuery(
    "queries:paginatedMessages" as any,
    channelId ? ({ channelId, paginationOpts: { numItems: 100, cursor: null } } as any) : "skip",
  );

  const messages: Message[] =
    messagesProp ??
    (queryMessages?.page ?? []).map((m: any) => ({
      id: m._id,
      author: m.authorName ?? m.author ?? "",
      body: m.body,
      createdAt: m.createdAt ?? m._creationTime,
      editedAt: m.editedAt,
    }));

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
              <MessageItem message={m} currentAuthor={currentAuthor} onEdit={onEdit} onDelete={onDelete} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
