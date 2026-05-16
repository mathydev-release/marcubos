import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stackVariants = cva("flex flex-col", {
  variants: {
    gap: {
      xs: "gap-2",
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: {
    gap: "md",
  },
});

type StackProps = React.ComponentProps<"div"> &
  VariantProps<typeof stackVariants>;

export function Stack({ className, gap, ...props }: StackProps) {
  return (
    <div
      data-slot="stack"
      className={cn(stackVariants({ gap }), className)}
      {...props}
    />
  );
}
