export function TypingIndicators({ names }: { names: string[] }) {
  if (names.length === 0) return null;
  return (
    <div data-testid="typing-indicator" className="px-4 py-1 text-xs text-foreground/60">
      {names.length === 1 ? `${names[0]} is typing…` : `${names.length} people are typing…`}
    </div>
  );
}
