"use client";

import { useState } from "react";
import { EmptyState, Skeleton } from "@mylord/ui";
import { AnimatePresence, motion } from "framer-motion";

import { useAppData } from "@/lib/app-data";

export type Channel = {
  id: string;
  name: string;
  type: "text" | "voice";
  serverId?: string;
};

export function ChannelList() {
  const { channels, activeChannelId, selectChannel, createChannel, unread, loading } = useAppData();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const create = () => {
    if (!name.trim()) return;
    createChannel(name);
    setName("");
    setOpen(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-3">
        <span className="text-sm font-semibold">Channels</span>
        <button
          type="button"
          className="rounded bg-magenta-600 px-2 py-1 text-xs text-white"
          onClick={() => setOpen(true)}
        >
          +
        </button>
      </div>
      <ul className="flex-1 overflow-auto px-2">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="mb-1 h-6 w-full" />)
          : channels.length === 0
            ? <EmptyState title="No channels" />
            : channels.map((ch) => {
                const badge = unread[ch.id];
                return (
                  <li
                    key={ch.id}
                    data-testid="channel-item"
                    data-channel={ch.name}
                    onClick={() => selectChannel(ch.id)}
                    className={`rounded px-2 py-1 text-sm hover:bg-magenta-50 ${activeChannelId === ch.id ? "bg-magenta-100 font-semibold" : ""}`}
                  >
                    # {ch.name}
                    {badge && badge.count > 0 && (
                      <span className="ml-2 rounded-full bg-magenta-600 px-1.5 text-xs text-white">
                        {badge.mentions ? `@${badge.mentions}` : badge.count}
                      </span>
                    )}
                  </li>
                );
              })}
      </ul>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="w-80 rounded bg-white p-4 shadow"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15 }}
            >
              <h2 className="mb-2 text-sm font-semibold">Create channel</h2>
              <input
                className="w-full rounded border border-magenta-200 px-2 py-1 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="channel name"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" className="text-sm" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded bg-magenta-600 px-3 py-1 text-sm text-white"
                  onClick={create}
                >
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
