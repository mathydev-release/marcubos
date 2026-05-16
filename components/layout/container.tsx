import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-page", {
  variants: {
    size: {
      sm: "max-w-[var(--container-sm)]",
      md: "max-w-[var(--container-md)]",
      lg: "max-w-[var(--container-lg)]",
      xl: "max-w-[var(--container-xl)]",
      "2xl": "max-w-[var(--container-2xl)]",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

type ContainerProps = React.ComponentProps<"div"> &
  VariantProps<typeof containerVariants>;

export function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  );
}
