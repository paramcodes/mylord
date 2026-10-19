"use client";

import type { ReactNode } from "react";

import { ConvexAppDataProvider } from "@/components/convex-app-data-provider";
import { DemoAppDataProvider } from "@/components/demo-app-data-provider";

export function AppDataProvider({ demo, children }: { demo: boolean; children: ReactNode }) {
  if (demo) return <DemoAppDataProvider>{children}</DemoAppDataProvider>;
  return <ConvexAppDataProvider>{children}</ConvexAppDataProvider>;
}
