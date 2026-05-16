"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Clock3, Ticket, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CountdownValue = Readonly<{
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}>;

export type GiveawayCardProps = Readonly<{
  title: string;
  prizeImageUrl: string;
  prizeImageAlt?: string;
  href: string;
  ticketPrice: string;
  originalTicketPrice?: string;
  targetDate: string;
  entrantsCount: number;
  maxEntrants: number;
  badge?: string;
  showCountdown?: boolean;
  className?: string;
}>;

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 100);
}

function getCountdown(targetDate: string): CountdownValue {
  const targetTime = new Date(targetDate).getTime();
  const distance = Number.isFinite(targetTime)
    ? Math.max(targetTime - Date.now(), 0)
    : 0;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function GiveawayCountdown({ targetDate }: Readonly<{ targetDate: string }>) {
  const [countdown, setCountdown] = React.useState<CountdownValue>(() =>
    getCountdown(targetDate)
  );

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-1.5" aria-label="Giveaway countdown">
      {[
        ["D", countdown.days],
        ["H", countdown.hours],
        ["M", countdown.minutes],
        ["S", countdown.seconds],
      ].map(([label, value]) => (
        <div
          key={label}
          className="rounded-md border border-cyan-400/15 bg-[#020b1d]/70 px-2 py-2 text-center"
        >
          <div
            className="font-mono text-sm font-bold text-cyan-100"
            suppressHydrationWarning
          >
            {value}
          </div>
          <div className="mt-0.5 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-cyan-300/70">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function GiveawayCard({
  title,
  prizeImageUrl,
  prizeImageAlt = title,
  href,
  ticketPrice,
  originalTicketPrice,
  targetDate,
  entrantsCount,
  maxEntrants,
  badge = "Just launched",
  showCountdown = true,
  className,
}: GiveawayCardProps) {
  const progress = clampProgress((entrantsCount / maxEntrants) * 100);

  return (
    <m.article
      className={cn("group relative h-full", className)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-cyan-400/35 via-blue-600/16 to-transparent opacity-70 blur-sm transition-opacity group-hover:opacity-100" />
      <Card className="relative h-full border-cyan-400/15 bg-[#071431]/88 p-0 shadow-[0_22px_70px_rgba(0,0,0,0.36)] backdrop-blur-xl transition-colors group-hover:border-cyan-300/35">
        <CardContent className="flex h-full flex-col gap-4 p-3">
          <Link
            href={href}
            className="relative block overflow-hidden rounded-lg border border-cyan-400/15 bg-[#020b1d] outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={prizeImageUrl}
                alt={prizeImageAlt}
                fill
                sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
                className="object-cover object-center brightness-[0.78] saturate-[0.86] transition duration-500 group-hover:scale-[1.04] group-hover:brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-cyan-500/7 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020b1d]/78 via-transparent to-[#020b1d]/12" />
              <Badge className="absolute bottom-3 left-3 border-cyan-300/25 bg-cyan-400/15 text-cyan-200 backdrop-blur">
                <Ticket className="size-3.5" aria-hidden="true" />
                {badge}
              </Badge>
            </div>
          </Link>

          <div className="space-y-3">
            <Link
              href={href}
              className="block text-base font-black leading-snug text-white outline-none transition-colors hover:text-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {title}
            </Link>

            <div className="grid grid-cols-[1fr_auto] items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-cyan-100/80">
                <Users className="size-4 text-cyan-300" aria-hidden="true" />
                <span>{formatCount(entrantsCount)} entrants</span>
              </div>
              {showCountdown ? (
                <div className="flex items-center gap-1 text-xs font-semibold text-yellow-300">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  Ends soon
                </div>
              ) : null}
            </div>

            {showCountdown ? (
              <GiveawayCountdown targetDate={targetDate} />
            ) : null}

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-100/65">Tickets sold</span>
                <span className="font-mono font-bold text-cyan-100">
                  {progress.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#020b1d]">
                <m.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 rounded-lg border border-cyan-400/15 bg-[#020b1d]/56 p-3">
            <div>
              <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-cyan-100/55">
                Ticket price
              </div>
              <div className="mt-1 flex items-end gap-2">
                {originalTicketPrice ? (
                  <span className="font-mono text-sm font-semibold text-cyan-100/45 line-through decoration-red-400/80 decoration-2">
                    {originalTicketPrice}
                  </span>
                ) : null}
                <span className="font-mono text-2xl font-black text-cyan-200">
                  {ticketPrice}
                </span>
              </div>
            </div>

            <Button
              size="lg"
              className="!bg-cyan-400 !text-[#020b1d] hover:!bg-cyan-300 focus-visible:!ring-cyan-300/50"
              asChild
            >
              <Link href={href}>
                Enter
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </m.article>
  );
}
