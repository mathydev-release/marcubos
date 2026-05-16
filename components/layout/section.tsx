import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("relative", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-8 md:py-10",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

type SectionProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants>;

export function Section({ className, spacing, ...props }: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ spacing }), className)}
      {...props}
    />
  );
}
