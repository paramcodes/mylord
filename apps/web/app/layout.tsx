import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { AppDataProvider } from "@/components/app-data-provider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { isDemoMode } from "@/lib/demo-mode";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "MyLord",
  description: "MyLord web",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const demo = isDemoMode();
  const app = (
    <AppDataProvider demo={demo}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AppDataProvider>
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {demo ? (
          app
        ) : (
          <ClerkProvider>
            <ConvexClientProvider>{app}</ConvexClientProvider>
          </ClerkProvider>
        )}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
