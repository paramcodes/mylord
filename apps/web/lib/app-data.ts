"use client";

import { createContext, createElement, useContext, type ReactNode } from "react";

import type { Channel } from "@/components/channel-list";
import type { Member } from "@/components/member-list";
import type { Message } from "@/components/message-item";
import type { Server } from "@/components/server-list";

export type { Channel, Member, Message, Server };

export type CurrentUser = {
  id: string;
  name: string;
};

export type UnreadCounts = {
  count: number;
  mentions: number;
};

export type AppData = {
  mode: "demo" | "convex";
  currentUser: CurrentUser;
  servers: Server[];
  channels: Channel[];
  members: Member[];
  messages: Message[];
  typingNames: string[];
  unread: Record<string, UnreadCounts>;
  loading: boolean;
  activeServerId: string | null;
  activeChannelId: string | null;
  selectServer: (id: string) => void;
  selectChannel: (id: string) => void;
  sendMessage: (body: string) => void;
  editMessage: (id: string, body: string) => void;
  deleteMessage: (id: string) => void;
  createServer: (name: string) => void;
  createChannel: (name: string) => void;
  setTyping: () => void;
  setPresence: (status: "online" | "away") => void;
};

const AppDataContext = createContext<AppData | null>(null);

export function AppDataContextProvider({
  value,
  children,
}: {
  value: AppData;
  children: ReactNode;
}) {
  return createElement(AppDataContext.Provider, { value }, children);
}

export function useAppData(): AppData {
  const value = useContext(AppDataContext);
  if (!value) throw new Error("useAppData must be used inside an AppData provider");
  return value;
}
