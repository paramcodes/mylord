"use client";

import { useState } from "react";
import { ServerList } from "@/components/server-list";
import { ChannelList } from "@/components/channel-list";

export function RootLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="hidden md:flex">
        <ServerList />
      </div>
      <aside className="hidden w-60 shrink-0 border-r border-foreground/10 bg-foreground/5 md:block">
        <ChannelList />
      </aside>
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
        </div>
        {children}
      </main>
      <aside className="hidden w-60 shrink-0 border-l border-foreground/10 bg-foreground/5 lg:block">
        Members
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="flex h-full w-72 flex-col bg-background shadow-xl">
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
          </div>
          <button
            type="button"
            aria-label="Close drawer backdrop"
            onClick={() => setDrawerOpen(false)}
            className="flex-1 bg-black/40"
          />
        </div>
      )}
    </div>
  );
}
