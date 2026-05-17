"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import {
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type FooterIcon = React.ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}>;

type FooterLink = Readonly<{
  label: string;
  href: string;
  icon?: FooterIcon;
}>;

type Collaborator = Readonly<{
  name: string;
  src: string;
  width: number;
  height: number;
  imageClassName?: string;
  badgeClassName?: string;
}>;

const collaborators: Collaborator[] = [
  {
    name: "Auto DE",
    src: "/collaborators/autode.png",
    width: 461,
    height: 461,
  },
  {
    name: "Fane Amanet",
    src: "/collaborators/fane_amanet.png",
    width: 300,
    height: 148,
    imageClassName: "opacity-90 brightness-[1.9] contrast-100",
  },
  {
    name: "Flo Auto Lease",
    src: "/collaborators/floautolease.png",
    width: 600,
    height: 399,
  },
  {
    name: "PAT",
    src: "/collaborators/pat.png",
    width: 600,
    height: 180,
  },
  {
    name: "Zeus Amanet",
    src: "/collaborators/zeus_amanet.png",
    width: 240,
    height: 240,
  },
];

const paymentApps: Collaborator[] = [
  {
    name: "Apple Pay",
    src: "/paymethod/apay.png",
    width: 350,
    height: 144,
  },
  {
    name: "Google Pay",
    src: "/paymethod/gpay.png",
    width: 512,
    height: 269,
  },
  {
    name: "Skrill",
    src: "/paymethod/skrill.png",
    width: 1280,
    height: 462,
  },
  {
    name: "Visa",
    src: "/paymethod/visa.png",
    width: 350,
    height: 150,
  },
];

const legalLinks: FooterLink[] = [
  { label: "Terms and Conditions", href: "/terms", icon: FileText },
  { label: "Privacy Policy", href: "/privacy", icon: LockKeyhole },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: InstagramLogo },
  { label: "Facebook", href: "#", icon: FacebookLogo },
  { label: "YouTube", href: "#", icon: YouTubeLogo },
  { label: "TikTok", href: "#", icon: TikTokLogo },
];

const partnerLogos: Collaborator[] = [
  {
    name: "ONJN",
    src: "/partners/onjn.png",
    width: 250,
    height: 164,
    imageClassName: "max-h-[115%] max-w-[115%]",
  },
  {
    name: "Joc Responsabil",
    src: "/partners/jocresp.png",
    width: 523,
    height: 600,
  },
  {
    name: "18+",
    src: "/partners/18.png",
    width: 600,
    height: 600,
  },
];

function InstagramLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.2 8.4V6.9c0-.7.5-.9 1-.9h2V2.6l-2.8-.1c-3.1 0-4.8 1.9-4.8 5.2v.7H6.8v3.8h2.8V22h4.2v-9.8h3.1l.5-3.8h-3.2Z" />
    </svg>
  );
}

function YouTubeLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="6.5" width="18" height="11" rx="3" />
      <path d="m10.5 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M15.4 3c.4 2.4 1.8 4 4.1 4.4v3.7a7.7 7.7 0 0 1-4-1.2v5.7c0 3.6-2.4 5.9-5.8 5.9A5.5 5.5 0 0 1 4 16c0-3.3 2.5-5.6 5.8-5.6.4 0 .8 0 1.1.1v3.9a3.2 3.2 0 0 0-1.2-.2c-1.1 0-1.9.7-1.9 1.8s.8 1.8 1.9 1.8 1.9-.6 1.9-2.1V3h3.8Z" />
    </svg>
  );
}

function PartnerLogoBadge({
  name,
  src,
  width,
  height,
  imageClassName,
  badgeClassName,
}: Collaborator) {
  return (
    <m.div
      whileHover={{ y: -2, scale: 1.04 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "grid size-14 place-items-center overflow-hidden rounded-full border border-cyan-100/30 bg-[#06162d] p-1.5",
        badgeClassName
      )}
    >
      <Image
        src={src}
        alt={name}
        width={width}
        height={height}
        sizes="56px"
        className={cn("max-h-full max-w-full object-contain", imageClassName)}
      />
    </m.div>
  );
}

function CollaboratorCard({
  name,
  src,
  width,
  height,
  imageClassName,
}: Collaborator) {
  return (
    <m.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.18 }}
      className="group flex h-20 min-w-[8.5rem] items-center justify-center rounded-md border border-[#102745] bg-[#06162d] px-4 transition-colors hover:border-cyan-300/30 hover:bg-[#071d38]"
    >
      <Image
        src={src}
        alt={name}
        width={width}
        height={height}
        sizes="(min-width: 1280px) 150px, (min-width: 640px) 30vw, 45vw"
        className={cn(
          "max-h-14 w-auto max-w-full object-contain opacity-70 grayscale invert brightness-125 contrast-90 transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 group-hover:brightness-100 group-hover:contrast-100",
          imageClassName
        )}
      />
    </m.div>
  );
}

function PaymentAppCard({
  name,
  src,
  width,
  height,
  imageClassName,
}: Collaborator) {
  return (
    <m.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.18 }}
      className="group flex h-20 min-w-[8.5rem] items-center justify-center rounded-md border border-[#102745] bg-[#06162d] px-4 transition-colors hover:border-cyan-300/30 hover:bg-[#071d38]"
    >
      <Image
        src={src}
        alt={name}
        width={width}
        height={height}
        sizes="(min-width: 1280px) 150px, (min-width: 640px) 30vw, 45vw"
        className={cn(
          "max-h-14 w-auto max-w-full object-contain opacity-70 grayscale invert brightness-125 contrast-90 transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 group-hover:brightness-100 group-hover:contrast-100",
          imageClassName
        )}
      />
    </m.div>
  );
}

export function Footer({ className }: Readonly<{ className?: string }>) {
  return (
    <m.footer
      className={cn("relative overflow-hidden bg-[#010817] text-white", className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container className="relative py-10 md:py-12">
        <div className="mx-auto max-w-7xl">
          <section aria-labelledby="footer-collaborators" className="pb-8 pt-2">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="footer-collaborators"
                  className="text-2xl font-black uppercase tracking-tight text-white"
                >
                  Collaborators
                </h2>
              </div>
              <p className="max-w-md text-sm font-medium leading-6 text-cyan-100/62">
                Trusted local partners supporting prizes, vehicle sourcing, and
                giveaway operations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {collaborators.map((partner) => (
                <CollaboratorCard key={partner.name} {...partner} />
              ))}
            </div>
          </section>

          <Separator className="h-px bg-[#33435c]" />

          <section aria-labelledby="footer-payment-apps" className="py-8">
            <h2 id="footer-payment-apps" className="sr-only">
              Payment methods
            </h2>
            <div className="mx-auto grid max-w-4xl grid-cols-2 justify-center gap-3 sm:grid-cols-4">
              {paymentApps.map((app) => (
                <PaymentAppCard key={app.name} {...app} />
              ))}
            </div>
          </section>

          <Separator className="h-px bg-[#33435c]" />

          <div className="grid gap-8 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-100/72">
                Follow us on:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <m.div
                    key={item.label}
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Link
                      href={item.href}
                      className="grid size-11 place-items-center rounded-md border border-[#102745] bg-[#06162d] text-cyan-300 transition-colors hover:border-cyan-300/30 hover:text-cyan-100"
                      aria-label={item.label}
                    >
                      <item.icon className="size-5" aria-hidden="true" />
                    </Link>
                  </m.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <span className="max-w-16 text-xs font-semibold leading-tight text-cyan-100/70">
                  Official partner
                </span>
                <div className="h-10 w-px bg-[#33435c]" />
                {partnerLogos.map((partner) => (
                  <PartnerLogoBadge key={partner.name} {...partner} />
                ))}
              </div>
            </div>
          </div>

          <Separator className="h-px bg-[#33435c]" />

          <section className="space-y-4 py-8 text-sm leading-7 text-cyan-100/72">
            <h2 className="text-2xl font-black text-white">
              MARK&apos;S RAFFLE - Premium Giveaways in Romania
            </h2>
            <p>
              Welcome to MARK&apos;S RAFFLE, a premium giveaway platform built
              for people who want a transparent, modern way to enter draws for
              cars, cash prizes, phones, and luxury rewards. The experience is
              designed around secure payments, clear prize information, visible
              ticket progress, and winner results that are easy to follow.
            </p>
            <p>
              The platform is growing into a complete digital draw destination,
              with carefully selected prizes, trusted local partners, responsive
              mobile-first design, and a dark casino-inspired interface. Our goal
              is to make every giveaway feel polished, fair, and exciting from
              the first ticket to the final winner announcement.
            </p>
          </section>

          <Separator className="h-px bg-[#33435c]" />

          <div className="space-y-3 py-6 text-center text-sm leading-6 text-cyan-100/72">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {legalLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group inline-flex items-center gap-2 rounded-md bg-[#06162d] px-4 py-3 text-xs font-bold text-cyan-100/78 transition-colors hover:text-white"
                >
                  {item.icon ? (
                    <item.icon
                      className="size-3.5 text-cyan-300 group-hover:text-fuchsia-300"
                      aria-hidden={true}
					  //aria-hidden="true"
                    />
                  ) : null}
                  {item.label}
                </Link>
              ))}
              <Link
                href="mailto:support@marksraffle.example"
                className="inline-flex items-center gap-2 rounded-md bg-[#06162d] px-4 py-3 text-xs font-bold text-cyan-100/78 transition-colors hover:text-white"
              >
                <Mail className="size-3.5 text-cyan-300" aria-hidden="true" />
                support@marksraffle.example
              </Link>
            </div>

            <p>
              Warning: Giveaways and paid draws may involve risk. Play responsibly
              and only enter draws you understand.
            </p>
            <p>
              MARK&apos;S RAFFLE company registration, licensing, and physical
              address details will be added before launch.
            </p>
            <p className="flex items-center justify-center gap-2 text-cyan-100/62">
              <ShieldCheck className="size-4 text-emerald-300" aria-hidden="true" />
              <span>&copy; 2026 MARK&apos;S RAFFLE. All rights reserved.</span>
            </p>
            <div className="flex justify-center pt-1">
              <BrandLogo className="w-[150px] sm:w-[170px]" />
            </div>
          </div>
        </div>
      </Container>
    </m.footer>
  );
}
