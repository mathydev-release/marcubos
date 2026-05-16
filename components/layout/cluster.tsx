import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const clusterVariants = cva("flex flex-wrap items-center", {
  variants: {
    gap: {
      xs: "gap-2",
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      between: "justify-between",
      end: "justify-end",
    },
  },
  defaultVariants: {
    gap: "md",
    justify: "start",
  },
});

type ClusterProps = React.ComponentProps<"div"> &
  VariantProps<typeof clusterVariants>;

export function Cluster({ className, gap, justify, ...props }: ClusterProps) {
  return (
    <div
      data-slot="cluster"
      className={cn(clusterVariants({ gap, justify }), className)}
      {...props}
    />
  );
}
