"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  AppDataContextProvider,
  type AppData,
  type Channel,
  type Member,
  type Message,
  type Server,
} from "@/lib/app-data";

export function ConvexAppDataProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [convexUserId, setConvexUserId] = useState<string | null>(null);
  const [servers, setServers] = useState<Server[]>([]);
  const [activeServerId, setActiveServerId] = useState<string | null>(null);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);

  const syncUser = useMutation("users:syncUser" as any);
  const createServerMutation = useMutation("servers:createServer" as any);
  const createChannelMutation = useMutation("channels:createChannel" as any);
  const sendMutation = useMutation("messages:send" as any);
  const editMutation = useMutation("messages:edit" as any);
  const removeMutation = useMutation("messages:remove" as any);
  const setTypingMutation = useMutation("typing:setTyping" as any);
  const setPresenceMutation = useMutation("presence:setPresence" as any);

  useEffect(() => {
    const clerkId = user?.id;
    if (!clerkId) return;
    let active = true;
    syncUser({ clerkId, name: user?.firstName ?? undefined })
      .then((id: string) => {
        if (active) setConvexUserId(id);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [user?.id, user?.firstName, syncUser]);

  const channelsQuery = useQuery(
    "queries:listChannels" as any,
    activeServerId ? ({ serverId: activeServerId } as any) : "skip",
  );
  const messagesQuery = useQuery(
    "queries:paginatedMessages" as any,
    activeChannelId
      ? ({ channelId: activeChannelId, paginationOpts: { numItems: 100, cursor: null } } as any)
      : "skip",
  );
  const presenceQuery = useQuery(
    "presence:listPresence" as any,
    activeServerId ? ({ serverId: activeServerId } as any) : "skip",
  );
  const typingQuery = useQuery(
    "typing:listTyping" as any,
    activeChannelId ? ({ channelId: activeChannelId } as any) : "skip",
  );
  const unreadQuery = useQuery(
    "reads:unreadCounts" as any,
    convexUserId && activeChannelId
      ? ({ userId: convexUserId, channelIds: [activeChannelId] } as any)
      : "skip",
  );

  const selectServer = useCallback((id: string) => {
    setActiveServerId(id);
    setActiveChannelId(null);
  }, []);

  const selectChannel = useCallback((id: string) => {
    setActiveChannelId(id);
  }, []);

  const sendMessage = useCallback(
    (body: string) => {
      const trimmed = body.trim();
      if (!trimmed || !convexUserId || !activeChannelId) return;
      sendMutation({ channelId: activeChannelId, authorId: convexUserId, body: trimmed }).catch(
        () => {},
      );
    },
    [convexUserId, activeChannelId, sendMutation],
  );

  const editMessage = useCallback(
    (id: string, body: string) => {
      if (!convexUserId) return;
      editMutation({ messageId: id, authorId: convexUserId, body: body.trim() }).catch(() => {});
    },
    [convexUserId, editMutation],
  );

  const deleteMessage = useCallback(
    (id: string) => {
      if (!convexUserId) return;
      removeMutation({ messageId: id, authorId: convexUserId }).catch(() => {});
    },
    [convexUserId, removeMutation],
  );

  const createServer = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed || !convexUserId) return;
      createServerMutation({ name: trimmed, ownerId: convexUserId })
        .then((id: string) => {
          setServers((prev) => [...prev, { id, name: trimmed }]);
        })
        .catch(() => {});
    },
    [convexUserId, createServerMutation],
  );

  const createChannel = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed || !activeServerId) return;
      createChannelMutation({ serverId: activeServerId, name: trimmed, type: "text" }).catch(
        () => {},
      );
    },
    [activeServerId, createChannelMutation],
  );

  const setTyping = useCallback(() => {
    if (!convexUserId || !activeChannelId) return;
    setTypingMutation({ userId: convexUserId, channelId: activeChannelId }).catch(() => {});
  }, [convexUserId, activeChannelId, setTypingMutation]);

  const setPresence = useCallback(
    (status: "online" | "away") => {
      if (!convexUserId) return;
      setPresenceMutation({
        userId: convexUserId,
        serverId: activeServerId ?? undefined,
        status,
      }).catch(() => {});
    },
    [convexUserId, activeServerId, setPresenceMutation],
  );

  const value = useMemo<AppData>(() => {
    const channels: Channel[] = ((channelsQuery ?? []) as any[]).map((c) => ({
      id: c._id,
      name: c.name,
      type: c.type,
      serverId: c.serverId,
    }));
    const messages: Message[] = [...((messagesQuery?.page ?? []) as any[])]
      .reverse()
      .map((m) => ({
        id: m._id,
        author: m.authorName ?? m.author ?? "",
        body: m.body,
        createdAt: m.createdAt ?? m._creationTime,
        editedAt: m.editedAt,
      }));
    const members: Member[] = ((presenceQuery ?? []) as any[]).map((p) => ({
      id: p.userId,
      name: p.userId === convexUserId ? (user?.firstName ?? "You") : p.userId,
      status: p.status === "online" ? "online" : "idle",
    }));
    const typingNames = ((typingQuery ?? []) as any[])
      .filter((t) => t.userId !== convexUserId)
      .map((t) => t.userId);
    const unread: Record<string, { count: number; mentions: number }> = {};
    for (const row of (unreadQuery ?? []) as any[]) {
      unread[row.channelId] = { count: row.count, mentions: row.mentions };
    }
    return {
      mode: "convex",
      currentUser: {
        id: convexUserId ?? user?.id ?? "",
        name: user?.firstName ?? "You",
      },
      servers,
      channels,
      members,
      messages,
      typingNames,
      unread,
      loading:
        (activeServerId !== null && channelsQuery === undefined) ||
        (activeChannelId !== null && messagesQuery === undefined),
      activeServerId,
      activeChannelId,
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
    servers,
    channelsQuery,
    messagesQuery,
    presenceQuery,
    typingQuery,
    unreadQuery,
    convexUserId,
    user?.id,
    user?.firstName,
    activeServerId,
    activeChannelId,
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
