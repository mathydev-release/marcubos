"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const liveDrawDate = new Date("2026-05-20T18:00:00+03:00").getTime();

type CountdownValue = Readonly<{
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}>;

function getCountdown(): CountdownValue {
  const distance = Math.max(liveDrawDate - Date.now(), 0);
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

export function LiveDrawBanner() {
  const [countdown, setCountdown] = React.useState<CountdownValue>(getCountdown);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const items = [
    ["Days", countdown.days],
    ["Hours", countdown.hours],
    ["Min", countdown.minutes],
    ["Sec", countdown.seconds],
  ] as const;

  return (
    <section className="bg-[#020b1d] px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-xl bg-[linear-gradient(100deg,#0a47a8_0%,#0875d1_46%,#15b7e8_100%)] px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-tight text-emerald-300">
            Next live draw start in:
          </p>
          <p className="mt-1 text-base font-black text-white">
            20th May 2026 @ 6:00 PM
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {items.map(([label, value]) => (
            <div
              key={label}
              className="min-w-14 rounded-md bg-[#020b1d] px-3 py-3 text-center text-white"
            >
              <div
                className="font-mono text-xl font-black leading-none"
                suppressHydrationWarning
              >
                {value}
              </div>
              <div className="mt-2 text-[0.68rem] font-semibold text-white/85">
                {label}
              </div>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          className="h-11 rounded-full !bg-white px-6 font-black !text-[#052352] hover:!bg-cyan-100"
          asChild
        >
          <Link href="/draw-results">Check our recently Live Draws</Link>
        </Button>
      </div>
    </section>
  );
}
