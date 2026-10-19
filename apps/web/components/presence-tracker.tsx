"use client";

import { useEffect } from "react";

import { useAppData } from "@/lib/app-data";

export function PresenceTracker() {
  const { currentUser, setPresence } = useAppData();

  useEffect(() => {
    if (!currentUser.id) return;
    const beat = () => setPresence("online");
    beat();
    const id = setInterval(beat, 30000);
    return () => clearInterval(id);
  }, [currentUser.id, setPresence]);

  return null;
}
