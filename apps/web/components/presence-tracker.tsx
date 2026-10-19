"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";

export function PresenceTracker({
  userId,
  serverId,
}: {
  userId: string;
  serverId?: string;
}) {
  const setPresence = useMutation("presence:setPresence" as any);
  useEffect(() => {
    if (!userId) return;
    const beat = () =>
      setPresence({ userId, serverId, status: "online" } as any).catch(() => {});
    beat();
    const id = setInterval(beat, 30000);
    const onVis = () => {
      if (document.visibilityState === "hidden")
        setPresence({ userId, serverId, status: "away" } as any).catch(() => {});
      else beat();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [userId, serverId, setPresence]);
  return null;
}
