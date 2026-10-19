import Link from "next/link";

export function DemoAuthCard({ mode }: { mode: "sign-in" | "sign-up" }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div
        data-testid="demo-auth-card"
        className="w-full max-w-sm rounded-lg border border-foreground/10 p-6 text-center"
      >
        <h1 className="text-lg font-semibold">
          {mode === "sign-in" ? "Sign in" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          Demo mode is on, so authentication is bypassed. No Clerk or Convex credentials are
          required.
        </p>
        <Link
          href="/"
          className="mt-5 inline-block rounded bg-magenta-600 px-4 py-2 text-sm font-medium text-white"
        >
          Open the app
        </Link>
      </div>
    </main>
  );
}
