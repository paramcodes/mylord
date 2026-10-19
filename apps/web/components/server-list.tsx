"use client";

import { useState } from "react";
import { EmptyState, Skeleton } from "@mylord/ui";
import { AnimatePresence, motion } from "framer-motion";

import { useAppData } from "@/lib/app-data";

export type Server = {
  id: string;
  name: string;
};

export function ServerList() {
  const { servers, activeServerId, selectServer, createServer, loading } = useAppData();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  function create() {
    if (!name.trim()) return;
    createServer(name);
    setName("");
    setOpen(false);
  }

  return (
    <aside className="flex w-16 shrink-0 flex-col items-center gap-2 border-r border-foreground/10 bg-foreground/5 py-2">
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-full" />
        ))
      ) : servers.length === 0 ? (
        <EmptyState
          title="No servers"
          description="Create one to get started"
          className="w-16 p-1 text-xs"
        />
      ) : (
        servers.map((s) => (
          <button
            key={s.id}
            type="button"
            data-testid="server-item"
            data-server={s.name}
            title={s.name}
            onClick={() => selectServer(s.id)}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${activeServerId === s.id ? "bg-magenta-600 text-white" : "bg-foreground/10"}`}
          >
            {s.name.slice(0, 2).toUpperCase()}
          </button>
        ))
      )}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-foreground/20 text-lg"
        aria-label="Create server"
      >
        +
      </button>
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
              className="w-80 rounded-lg bg-background p-4 shadow-xl"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15 }}
            >
              <h2 className="mb-3 text-sm font-semibold">Create Server</h2>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Server name"
                className="w-full rounded border border-foreground/20 bg-transparent px-2 py-1 text-sm"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" className="text-sm" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button type="button" className="text-sm font-medium" onClick={create}>
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
