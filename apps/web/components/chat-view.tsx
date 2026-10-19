"use client";

import { useAppData } from "@/lib/app-data";
import { Chat } from "./chat";

export function ChatView() {
  const data = useAppData();
  const channel = data.channels.find((c) => c.id === data.activeChannelId);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header
        data-testid="channel-header"
        data-channel={channel?.name ?? ""}
        className="flex items-center gap-3 border-b border-foreground/10 px-4 py-2"
      >
        <h1 className="text-sm font-semibold"># {channel?.name ?? "no channel"}</h1>
        <span className="text-xs text-foreground/50">{data.members.length} members</span>
      </header>
      <Chat
        messages={data.messages}
        currentAuthor={data.currentUser.name}
        typingNames={data.typingNames}
        onSend={data.sendMessage}
        onEdit={data.editMessage}
        onDelete={data.deleteMessage}
      />
    </div>
  );
}
