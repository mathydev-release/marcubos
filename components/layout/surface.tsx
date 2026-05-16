import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const surfaceVariants = cva("rounded-lg border", {
  variants: {
    tone: {
      default: "border-border bg-card text-card-foreground",
      glass: "glass-panel premium-border text-card-foreground",
      subtle: "border-border/70 bg-muted/45 text-card-foreground",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-5 md:p-6",
    },
  },
  defaultVariants: {
    tone: "default",
    padding: "md",
  },
});

type SurfaceProps = React.ComponentProps<"div"> &
  VariantProps<typeof surfaceVariants>;

export function Surface({ className, tone, padding, ...props }: SurfaceProps) {
  return (
    <div
      data-slot="surface"
      className={cn(surfaceVariants({ tone, padding }), className)}
      {...props}
    />
  );
}
