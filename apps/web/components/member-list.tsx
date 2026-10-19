export type Member = {
  id: string;
  name: string;
  status: "online" | "idle" | "offline";
};

const STATUS_COLOR: Record<Member["status"], string> = {
  online: "bg-emerald-500",
  idle: "bg-amber-500",
  offline: "bg-foreground/30",
};

const STATUS_LABEL: Record<Member["status"], string> = {
  online: "Online",
  idle: "Idle",
  offline: "Offline",
};

export function MemberList({ members }: { members: Member[] }) {
  return (
    <aside className="w-60 shrink-0 border-l border-foreground/10 bg-foreground/5 flex flex-col">
      <header className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-foreground/60">
        Members — {members.length}
      </header>
      <ul className="flex-1 overflow-auto px-2 py-1 space-y-1">
        {members.map((m) => (
          <li
            key={m.id}
            className="flex items-center gap-2 rounded px-2 py-1 text-sm"
            data-status={m.status}
          >
            <span
              className={`h-2 w-2 rounded-full ${STATUS_COLOR[m.status]}`}
              aria-label={STATUS_LABEL[m.status]}
              role="img"
            />
            <span className="truncate">{m.name}</span>
            <span className="ml-auto text-xs text-foreground/40">
              {STATUS_LABEL[m.status]}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
