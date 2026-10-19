import { ServerList } from "@/components/server-list";
import { ChannelList } from "@/components/channel-list";
import { MemberList } from "./member-list";

const MOCK_MEMBERS = [
  { id: "1", name: "alice", status: "online" as const },
  { id: "2", name: "bob", status: "idle" as const },
  { id: "3", name: "carol", status: "offline" as const },
];

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <ServerList />
      <aside className="w-60 shrink-0 border-r border-foreground/10 bg-foreground/5">
        <ChannelList />
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
      <MemberList members={MOCK_MEMBERS} />
    </div>
  );
}
