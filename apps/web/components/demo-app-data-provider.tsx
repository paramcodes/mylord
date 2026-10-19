"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";

import { AppDataContextProvider, type AppData, type Message } from "@/lib/app-data";
import { createDemoState, DEMO_CURRENT_USER, type DemoState } from "@/lib/demo-seed";

export function DemoAppDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(createDemoState);

  const selectServer = useCallback((id: string) => {
    setState((prev) => {
      const first = prev.channels.find((c) => c.serverId === id);
      return {
        ...prev,
        activeServerId: id,
        activeChannelId: first ? first.id : prev.activeChannelId,
      };
    });
  }, []);

  const selectChannel = useCallback((id: string) => {
    setState((prev) => ({ ...prev, activeChannelId: id }));
  }, []);

  const sendMessage = useCallback((body: string) => {
    const trimmed = body.trim();
    if (!trimmed) return;
    setState((prev) => {
      if (!prev.activeChannelId) return prev;
      const message = {
        id: `m-${prev.messageCounter}`,
        channelId: prev.activeChannelId,
        author: DEMO_CURRENT_USER.name,
        body: trimmed,
        createdAt: Date.now(),
      };
      return {
        ...prev,
        messages: [...prev.messages, message],
        messageCounter: prev.messageCounter + 1,
        typing: prev.typing.filter((t) => t.id !== DEMO_CURRENT_USER.id),
      };
    });
  }, []);

  const editMessage = useCallback((id: string, body: string) => {
    setState((prev) => ({
      ...prev,
      messages: prev.messages.map((m) =>
        m.id === id ? { ...m, body: body.trim(), editedAt: Date.now() } : m,
      ),
    }));
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id),
    }));
  }, []);

  const createServer = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setState((prev) => ({
      ...prev,
      servers: [...prev.servers, { id: `srv-${prev.serverCounter}`, name: trimmed }],
      serverCounter: prev.serverCounter + 1,
    }));
  }, []);

  const createChannel = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setState((prev) => {
      const channel = {
        id: `ch-${prev.channelCounter}`,
        name: trimmed,
        type: "text" as const,
        serverId: prev.activeServerId,
      };
      return {
        ...prev,
        channels: [...prev.channels, channel],
        channelCounter: prev.channelCounter + 1,
        activeChannelId: channel.id,
      };
    });
  }, []);

  const setTyping = useCallback(() => {
    setState((prev) => {
      if (!prev.activeChannelId) return prev;
      return {
        ...prev,
        typing: [
          ...prev.typing.filter((t) => t.id !== DEMO_CURRENT_USER.id),
          {
            id: DEMO_CURRENT_USER.id,
            name: DEMO_CURRENT_USER.name,
            channelId: prev.activeChannelId,
          },
        ],
      };
    });
  }, []);

  const setPresence = useCallback((status: "online" | "away") => {
    setState((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.id === DEMO_CURRENT_USER.id
          ? { ...m, status: status === "online" ? ("online" as const) : ("idle" as const) }
          : m,
      ),
    }));
  }, []);

  const value = useMemo<AppData>(() => {
    const channels = state.channels.filter((c) => c.serverId === state.activeServerId);
    const messages: Message[] = state.messages
      .filter((m) => m.channelId === state.activeChannelId)
      .map((m) => ({
        id: m.id,
        author: m.author,
        body: m.body,
        createdAt: m.createdAt,
        editedAt: m.editedAt,
      }));
    const typingNames = state.typing
      .filter((t) => t.channelId === state.activeChannelId && t.id !== DEMO_CURRENT_USER.id)
      .map((t) => t.name);
    return {
      mode: "demo",
      currentUser: DEMO_CURRENT_USER,
      servers: state.servers,
      channels,
      members: state.members,
      messages,
      typingNames,
      unread: state.unread,
      loading: false,
      activeServerId: state.activeServerId,
      activeChannelId: state.activeChannelId,
      selectServer,
      selectChannel,
      sendMessage,
      editMessage,
      deleteMessage,
      createServer,
      createChannel,
      setTyping,
      setPresence,
    };
  }, [
    state,
    selectServer,
    selectChannel,
    sendMessage,
    editMessage,
    deleteMessage,
    createServer,
    createChannel,
    setTyping,
    setPresence,
  ]);

  return <AppDataContextProvider value={value}>{children}</AppDataContextProvider>;
}
