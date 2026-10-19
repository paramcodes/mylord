"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ServerList } from "@/components/server-list";
import { ChannelList } from "@/components/channel-list";

export function RootLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [channelOpen, setChannelOpen] = useState(true);
  const [memberOpen, setMemberOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="hidden md:flex">
        <ServerList />
      </div>
      <AnimatePresence initial={false}>
        {channelOpen && (
          <motion.aside
            key="channel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden shrink-0 overflow-hidden border-r border-foreground/10 bg-foreground/5 md:block"
          >
            <div className="w-60">
              <ChannelList />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <main className="flex-1 overflow-auto">
        <div className="flex items-center gap-2 border-b border-foreground/10 p-2 md:hidden">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setDrawerOpen(true)}
            className="rounded border border-foreground/20 px-2 py-1 text-sm"
          >
            ☰
          </button>
          <span className="text-sm font-semibold">Channels</span>
          <button
            type="button"
            aria-label="Toggle channel sidebar"
            onClick={() => setChannelOpen((v) => !v)}
            className="ml-auto rounded border border-foreground/20 px-2 py-1 text-xs"
          >
            {channelOpen ? "Hide" : "Show"}
          </button>
        </div>
        {children}
      </main>
      <AnimatePresence initial={false}>
        {memberOpen && (
          <motion.aside
            key="member"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden shrink-0 overflow-hidden border-l border-foreground/10 bg-foreground/5 lg:block"
          >
            <div className="w-60 p-3 text-sm">Members</div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex md:hidden"
          >
            <motion.div
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex h-full w-72 flex-col bg-background shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-foreground/10 p-2">
                <span className="text-sm font-semibold">Navigation</span>
                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded border border-foreground/20 px-2 py-1 text-sm"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-1 overflow-hidden">
                <ServerList />
                <div className="flex-1 border-l border-foreground/10">
                  <ChannelList />
                </div>
              </div>
            </motion.div>
            <motion.button
              type="button"
              aria-label="Close drawer backdrop"
              onClick={() => setDrawerOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 bg-black/40"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
