import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "MyLord",
  description: "MyLord web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <ConvexClientProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
            </ThemeProvider>
            <Toaster />
            <Analytics />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
