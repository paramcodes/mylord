import * as React from "react"

import { cn } from "@/lib/utils"

function Sidebar({ className, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="sidebar"
      className={cn("flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground", className)}
      {...props}
    />
  )
}

export { Sidebar }
