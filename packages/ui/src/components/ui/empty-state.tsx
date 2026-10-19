import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-6 text-center text-sm text-foreground/60",
        className,
      )}
    >
      <p className="font-medium text-foreground/80">{title}</p>
      {description ? <p>{description}</p> : null}
      {children}
    </div>
  );
}
