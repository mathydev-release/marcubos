"use client";

import * as React from "react";
import { m, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";

type RevealProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
}: RevealProps) {
  return (
    <m.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </m.div>
  );
}
