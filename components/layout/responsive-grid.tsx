import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gridVariants = cva("grid", {
  variants: {
    columns: {
      auto: "grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))]",
      two: "grid-cols-1 md:grid-cols-2",
      three: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
      four: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
    },
    gap: {
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: {
    columns: "auto",
    gap: "lg",
  },
});

type ResponsiveGridProps = React.ComponentProps<"div"> &
  VariantProps<typeof gridVariants>;

export function ResponsiveGrid({
  className,
  columns,
  gap,
  ...props
}: ResponsiveGridProps) {
  return (
    <div
      data-slot="responsive-grid"
      className={cn(gridVariants({ columns, gap }), className)}
      {...props}
    />
  );
}
