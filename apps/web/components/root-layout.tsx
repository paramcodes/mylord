import { ServerList } from "@/components/server-list";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <ServerList />
      <aside className="w-60 shrink-0 border-r border-foreground/10 bg-foreground/5">
        Channels
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
      <aside className="w-60 shrink-0 border-l border-foreground/10 bg-foreground/5">
        Members
      </aside>
    </div>
  );
}
