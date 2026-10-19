"use client";

import { Composer } from "./composer";
import type { Message } from "./message-item";
import { MessageList } from "./message-list";
import { TypingIndicators } from "./typing-indicators";

export type ChatProps = {
  messages: Message[];
  currentAuthor: string;
  typingNames: string[];
  onSend: (body: string) => void;
  onEdit?: (id: string, body: string) => void;
  onDelete?: (id: string) => void;
};

export function Chat({
  messages,
  currentAuthor,
  typingNames,
  onSend,
  onEdit,
  onDelete,
}: ChatProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <MessageList
        messages={messages}
        currentAuthor={currentAuthor}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <TypingIndicators names={typingNames} />
      <Composer onSend={onSend} />
    </div>
  );
}
