"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trophy,
  Users,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const drawDate = new Date("2026-06-18T20:00:00+03:00").getTime();

const trustItems = [
  { label: "Secure checkout", value: "Stripe ready", icon: ShieldCheck },
  { label: "Verified draws", value: "Logged results", icon: Trophy },
  { label: "Members waiting", value: "12.8k", icon: Users },
] as const;

const countdownLabels = ["Days", "Hours", "Minutes", "Seconds"] as const;

type CountdownValue = Readonly<{
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}>;

function getCountdown(): CountdownValue {
  const distance = Math.max(drawDate - Date.now(), 0);
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

function CountdownTimer() {
  const [countdown, setCountdown] = React.useState<CountdownValue>(getCountdown);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const values = [
    countdown.days,
    countdown.hours,
    countdown.minutes,
    countdown.seconds,
  ];

  return (
    <div className="grid grid-cols-4 gap-2" aria-label="Giveaway countdown">
      {values.map((value, index) => (
        <div
          key={countdownLabels[index]}
          className="rounded-lg border border-border/80 bg-background/55 p-2 text-center backdrop-blur"
        >
          <div
            className="font-mono text-lg font-semibold text-foreground sm:text-xl"
            suppressHydrationWarning
          >
            {value}
          </div>
          <div className="mt-1 truncate text-[0.62rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {countdownLabels[index]}
          </div>
        </div>
      ))}
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Image
        src="/hero-car.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,13,35,0.98)_0%,rgba(3,18,48,0.94)_42%,rgba(3,18,48,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,10,28,0.86)_0%,rgba(3,18,48,0.42)_42%,rgba(2,10,28,0.94)_100%)]" />
      <div
        className="absolute inset-[-12%] opacity-55 mix-blend-screen blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 42% 46%, rgba(0, 194, 255, 0.16), transparent 38%), radial-gradient(ellipse at 62% 38%, rgba(33, 97, 255, 0.14), transparent 34%), radial-gradient(ellipse at 34% 68%, rgba(14, 165, 233, 0.1), transparent 32%)",
        }}
      />
      <m.div
        className="absolute bottom-[-35%] left-[-45%] h-[58%] w-[62%] -rotate-[24deg] bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.0),rgba(34,211,238,0.16),rgba(59,130,246,0.12),rgba(34,211,238,0.0),transparent)] blur-3xl"
        animate={{
          opacity: [0, 0.55, 0.55, 0],
          x: ["0%", "145%", "255%", "330%"],
          y: ["0%", "-45%", "-82%", "-112%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.16, 0.78, 1],
        }}
      />
      <m.div
        className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-cyan-400/18 via-blue-600/12 to-transparent blur-3xl"
        animate={{ opacity: [0.45, 0.75, 0.45], y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(6,182,212,0.08)_45%,transparent_64%)]" />
      <div className="absolute inset-0 bg-[#020b1d]/28" />
    </div>
  );
}

function FeaturedGiveawayCard() {
  const progress = 72;

  return (
    <m.div
      className="relative mx-auto w-full max-w-md md:ml-auto md:mr-0 md:translate-x-12 lg:max-w-[35rem] lg:translate-x-24 xl:translate-x-36 2xl:translate-x-44"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-cyan-400/45 via-blue-600/20 to-transparent opacity-80 blur-sm" />
      <Card className="relative border-cyan-400/20 bg-[#071431]/88 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <CardHeader className="gap-3">
          <div className="flex items-center justify-between gap-3">
            <Badge className="border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
              Featured draw
            </Badge>
            <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Clock3 className="size-3.5 text-yellow-300" aria-hidden="true" />
              Ends soon
            </div>
          </div>
          <CardTitle className="text-2xl text-foreground">
             GT Coupe 2026 + EUR 10,000
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-cyan-400/15 bg-[linear-gradient(135deg,#0b2a55,#020b1d)]">
            <m.div
              className="absolute inset-x-8 top-4 z-10 h-24 rounded-full bg-cyan-400/18 blur-3xl"
              animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.96, 1.04, 0.96] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Image
              src="/masinatest.png"
              alt="Featured giveaway car"
              fill
              sizes="(min-width: 768px) 440px, 100vw"
              className="object-cover object-center brightness-[0.72] contrast-[1.08] saturate-[0.82]"
            />
            <div className="absolute inset-0 bg-cyan-500/7 mix-blend-color" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(34,211,238,0.1),transparent_48%),linear-gradient(180deg,rgba(2,11,29,0.02)_0%,rgba(2,11,29,0.24)_100%)]" />
            <div className="absolute right-3 top-3 rounded-lg border border-cyan-400/15 bg-[#020b1d]/75 px-3 py-2 backdrop-blur">
              <div className="text-xs text-muted-foreground">Prize value</div>
              <div className="font-mono text-sm font-semibold text-foreground">
                EUR 84,900
              </div>
            </div>
          </div>

          <CountdownTimer />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tickets sold</span>
              <span className="font-medium text-foreground">{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <m.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-cyan-400/15 bg-[#020b1d]/56 p-3">
            <div>
              <div className="text-xs text-muted-foreground">Entry from</div>
              <div className="flex items-end gap-2">
                <span className="font-mono text-sm font-semibold text-muted-foreground line-through decoration-red-400/80 decoration-2">
                  EUR 9.99
                </span>
                <span className="font-mono text-xl font-semibold text-cyan-200">
                  EUR 8.50
                </span>
              </div>
              <div className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-emerald-300">
                Limited discount
              </div>
            </div>
            <Button
              size="lg"
              className="!bg-cyan-400 !text-[#020b1d] hover:!bg-cyan-300 focus-visible:!ring-cyan-300/50"
              asChild
            >
              <Link href="/giveaway/featured">
                Enter now
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <AnimatedBackground />
      <Container className="grid min-h-[calc(100dvh-4rem)] items-center gap-10 py-12 md:grid-cols-[0.95fr_1.05fr] md:py-16 lg:gap-14">
        <div className="flex flex-col items-start">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className="mb-5 border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300 shadow-[0_0_24px_rgba(52,211,153,0.12)]">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Premium draws. Real prizes. Transparent winners.
            </Badge>
          </m.div>

          <h1 className="max-w-3xl font-heading text-5xl font-semibold leading-[0.95] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
            Win luxury prizes with a draw experience built to feel elite.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Enter premium giveaways for cars, cash, and phones with secure
            checkout, live ticket progress, and winner results designed for
            trust from the first tap.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              className="h-12 border-cyan-400/30 !bg-cyan-400 px-5 text-base !text-[#020b1d] shadow-[0_0_34px_rgba(34,211,238,0.28)] hover:!bg-cyan-300 focus-visible:!ring-cyan-300/50"
              asChild
            >
              <Link href="/#giveaways">
                <Ticket className="size-4" aria-hidden="true" />
                Browse giveaways
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 border-cyan-400/25 bg-[#071431]/70 px-5 text-base text-cyan-100 hover:bg-cyan-400/10"
              asChild
            >
              <Link href="/winners">
                See winners
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="mt-9 grid w-full gap-3 sm:grid-cols-3 lg:max-w-2xl">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-cyan-400/15 bg-[#071431]/60 p-3 backdrop-blur"
              >
                <div className="mb-2 flex items-center gap-2 text-cyan-300">
                  <item.icon className="size-4" aria-hidden="true" />
                  <span className="text-xs font-medium uppercase tracking-[0.14em]">
                    {item.value}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-cyan-300" aria-hidden="true" />
            No payment details stored on-platform.
          </div>
        </div>

        <m.div className={cn("relative w-full md:justify-self-end")}>
          <FeaturedGiveawayCard />
        </m.div>
      </Container>
    </section>
  );
}
