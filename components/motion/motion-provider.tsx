"use client";

import * as React from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { luxuryTransition } from "@/lib/motion";

type MotionProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={luxuryTransition}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
