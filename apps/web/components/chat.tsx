"use client";

import { useOptimistic, useState, useTransition } from "react";

import { Composer } from "./composer";
import { MessageItem, type Message } from "./message-item";
import { MessageList } from "./message-list";

export type ChatProps = {
  initialMessages?: Message[];
  currentAuthor: string;
  onSend: (body: string) => Promise<Message>;
};

export function Chat({ initialMessages = [], currentAuthor, onSend }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isPending, startTransition] = useTransition();
  const [optimistic, addOptimistic] = useOptimistic<Message[], string>(
    messages,
    (state, body) => [
      ...state,
      {
        id: `optimistic-${Date.now()}`,
        author: currentAuthor,
        body,
        createdAt: Date.now(),
      },
    ],
  );

  const handleSend = (body: string) => {
    startTransition(async () => {
      addOptimistic(body);
      const confirmed = await onSend(body);
      setMessages((prev) => [...prev, confirmed]);
    });
  };

  return (
    <div className="flex h-full flex-col">
      <MessageList messages={optimistic} />
      <Composer onSend={handleSend} />
      {isPending ? <span className="sr-only">sending</span> : null}
    </div>
  );
}
