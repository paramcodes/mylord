import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { RootLayout } from "@/components/root-layout";
import { isDemoMode } from "@/lib/demo-mode";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  if (!isDemoMode()) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");
  }
  return <RootLayout>{children}</RootLayout>;
}
