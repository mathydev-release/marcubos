"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { CalendarDays, Crown, MessageCircle, Sparkles, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type RecentWinnerCardProps = Readonly<{
  username: string;
  avatarInitials: string;
  prizeWon: string;
  prizeImageUrl: string;
  prizeImageAlt?: string;
  dateWon: string;
  winnerComment: string;
  isLargePrize?: boolean;
  className?: string;
}>;

export function RecentWinnerCard({
  username,
  avatarInitials,
  prizeWon,
  prizeImageUrl,
  prizeImageAlt = prizeWon,
  dateWon,
  winnerComment,
  isLargePrize = false,
  className,
}: RecentWinnerCardProps) {
  return (
    <m.article
      className={cn("group relative h-full", className)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-cyan-400/28 via-fuchsia-500/20 to-transparent opacity-60 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
      <Card className="relative h-full border-cyan-400/15 bg-[#071431]/84 p-0 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-colors duration-300 group-hover:border-cyan-300/35">
        <CardContent className="flex h-full flex-col gap-4 p-3">
          <div className="relative overflow-hidden rounded-lg border border-cyan-400/15 bg-[#020b1d]">
            <div className="relative aspect-[16/10]">
              <Image
                src={prizeImageUrl}
                alt={prizeImageAlt}
                fill
                sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
                className="object-cover object-center brightness-[0.74] saturate-[0.9] transition duration-500 group-hover:scale-[1.05] group-hover:brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-cyan-500/7 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020b1d]/84 via-[#020b1d]/10 to-transparent" />
              <div className="absolute -right-8 -top-8 size-28 rounded-full bg-fuchsia-500/18 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute -bottom-10 left-5 size-32 rounded-full bg-cyan-400/18 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />

              {isLargePrize ? (
                <Badge className="absolute left-3 top-3 border-fuchsia-300/30 bg-fuchsia-500/16 text-fuchsia-100 shadow-[0_0_24px_rgba(217,70,239,0.2)] backdrop-blur">
                  <Crown className="size-3.5 fill-fuchsia-300/35 text-fuchsia-200" aria-hidden="true" />
                  Big win
                </Badge>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative grid size-11 shrink-0 place-items-center rounded-full border border-cyan-300/30 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.45),rgba(37,99,235,0.18)_42%,rgba(217,70,239,0.2))] text-sm font-black text-white shadow-[0_0_24px_rgba(34,211,238,0.18)]">
              <span>{avatarInitials}</span>
              <span className="absolute -bottom-0.5 -right-0.5 grid size-5 place-items-center rounded-full border border-[#071431] bg-cyan-400 text-[#020b1d]">
                <Trophy className="size-3" aria-hidden="true" />
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-black text-white">
                {username}
              </h3>
              <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-cyan-100/65">
                <CalendarDays className="size-3.5 text-cyan-300" aria-hidden="true" />
                {dateWon}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-cyan-400/15 bg-[#020b1d]/56 p-3">
            <div className="mb-1 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-cyan-100/55">
              <Sparkles className="size-3.5 text-fuchsia-300" aria-hidden="true" />
              Prize won
            </div>
            <p className="text-lg font-black leading-tight text-cyan-100">
              {prizeWon}
            </p>
          </div>

          <div className="mt-auto rounded-lg border border-fuchsia-300/15 bg-fuchsia-500/8 p-3">
            <div className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-fuchsia-200/70">
              <MessageCircle className="size-3.5 text-fuchsia-300" aria-hidden="true" />
              Winner comment
            </div>
            <p className="text-sm font-medium leading-6 text-cyan-50/78">
              &quot;{winnerComment}&quot;
            </p>
          </div>
        </CardContent>
      </Card>
    </m.article>
  );
}
