import * as React from "react";
import { cn } from "@/lib/utils";

export function AppShell({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell"
      className={cn(
        "relative isolate flex h-dvh flex-col overflow-hidden bg-background text-foreground",
        className
      )}
      {...props}
    />
  );
}
