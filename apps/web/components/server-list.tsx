"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Server = { id: string; name: string };

export function ServerList() {
  const [servers, setServers] = useState<Server[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  function create() {
    if (!name.trim()) return;
    setServers((s) => [...s, { id: crypto.randomUUID(), name: name.trim() }]);
    setName("");
    setOpen(false);
  }

  return (
    <aside className="flex w-16 shrink-0 flex-col items-center gap-2 border-r border-foreground/10 bg-foreground/5 py-2">
      {servers.map((s) => (
        <div
          key={s.id}
          title={s.name}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-xs font-bold"
        >
          {s.name.slice(0, 2).toUpperCase()}
        </div>
      ))}
      <button
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
              <button onClick={() => setOpen(false)} className="text-sm">
                Cancel
              </button>
              <button onClick={create} className="text-sm font-medium">
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
