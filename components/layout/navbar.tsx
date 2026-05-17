"use client";

import * as React from "react";
import Link from "next/link";
import {
  Banknote,
  Car,
  ChevronDown,
  ChevronRight,
  Gift,
  Home,
  Info,
  MessageCircle,
  Smartphone,
  UserRoundCheck,
  X,
} from "lucide-react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Cars", href: "/#cars", icon: Car },
  { label: "Cash", href: "/#cash", icon: Banknote },
  { label: "Phones", href: "/#phones", icon: Smartphone },
  { label: "Winners", href: "/winners", icon: UserRoundCheck },
  { label: "Giveaways", href: "/#giveaways", icon: Gift },
] as const;

const drawerTabs = [
  { label: "Cars", href: "/#cars", icon: Car },
  { label: "Cash", href: "/#cash", icon: Banknote },
  { label: "Phones", href: "/#phones", icon: Smartphone },
] as const;

const featureCards = [
  {
    label: "Winners",
    href: "/winners",
    description: "See the latest verified winners",
    icon: UserRoundCheck,
    className: "from-[#7220b6] via-[#a31899] to-[#ef2e9e]",
  },
  {
    label: "Giveaways",
    href: "/#giveaways",
    description: "Enter premium active draws",
    icon: Gift,
    className: "from-[#153d9f] via-[#1b75d8] to-[#00c7ff]",
  },
] as const;

const closesSoonCards = [
  {
    title: "GT Coupe Final Call",
    meta: "Car draw closes in 5h",
    href: "/#cars",
    icon: Car,
    image: "/hero-car.jpg",
    className: "from-[#6717b6] to-[#d3198d]",
  },
  {
    title: "Phone Vault",
    meta: "Last tickets available",
    href: "/#phones",
    icon: Smartphone,
    image: undefined,
    className: "from-[#0e7fd4] to-[#0bd1ff]",
  },
  {
    title: "Cash Rush",
    meta: "EUR 10,000 closing soon",
    href: "/#cash",
    icon: Banknote,
    image: undefined,
    className: "from-[#066a58] to-[#22d3a6]",
  },
] as const;

type NavbarProps = Readonly<{
  className?: string;
}>;

function DrawerVisual({
  icon: Icon,
  image,
}: Readonly<{
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  image?: string;
}>) {
  if (image) {
    return (
      <span
        className="absolute inset-y-0 right-0 w-36 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <span className="absolute -bottom-5 right-4 grid size-24 rotate-[-8deg] place-items-center rounded-full bg-white/15 shadow-[0_18px_45px_rgba(0,0,0,0.3)] backdrop-blur">
      <Icon className="size-12 text-white drop-shadow-lg" aria-hidden />
    </span>
  );
}

export function Navbar({ className }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = React.useState("Cars");
  const [closesSoonOpen, setClosesSoonOpen] = React.useState(true);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-[#071431] text-white shadow-[0_2px_18px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      <div className="relative flex h-[58px] items-center justify-between px-4">
        <div className="flex min-w-0 flex-1 items-center gap-5">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <button
              type="button"
              className="grid size-9 shrink-0 place-items-center rounded-sm text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="flex flex-col gap-[3px]" aria-hidden="true">
                <span className="h-0.5 w-5 rounded-full bg-current" />
                <span className="h-0.5 w-5 rounded-full bg-current" />
                <span className="h-0.5 w-5 rounded-full bg-current" />
              </span>
            </button>

            <SheetContent
              side="left"
              showCloseButton={false}
              className="w-[min(22.5rem,100vw)] border-r-0 border-[#183666] bg-[#071431] p-0 text-white duration-300"
              style={{
                width: "min(22.5rem, 100vw)",
                maxWidth: "min(22.5rem, 100vw)",
              }}
            >
              <SheetHeader className="border-b border-cyan-400/40 bg-[#12385f] p-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation menu
                </SheetDescription>
                <div className="grid h-14 grid-cols-[3.5rem_1fr_1fr_1fr] items-stretch">
                  <button
                    type="button"
                    className="grid place-items-center text-white transition-colors hover:bg-white/10"
                    aria-label="Close navigation menu"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="size-6" aria-hidden="true" />
                  </button>
                  {drawerTabs.map((item) => (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => setActiveDrawerTab(item.label)}
                      className="relative flex flex-col items-center justify-center gap-1 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      <item.icon className="size-5" aria-hidden="true" />
                      {item.label}
                      {activeDrawerTab === item.label ? (
                        <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-cyan-400" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </SheetHeader>

              <div className="custom-scrollbar h-[calc(100dvh-3.5rem)] overflow-y-auto bg-[#071d3a] pb-8">
                <div className="space-y-3 p-4">
                  {featureCards.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "relative block min-h-24 overflow-hidden rounded-lg bg-gradient-to-br p-4 shadow-[0_14px_28px_rgba(0,0,0,0.28)]",
                          item.className
                        )}
                      >
                        <DrawerVisual icon={item.icon} />
                        <span className="relative z-10 block text-lg font-black text-white">
                          {item.label}
                        </span>
                        <span className="relative z-10 mt-1 block max-w-[11rem] text-xs font-semibold leading-5 text-white/90">
                          {item.description}
                        </span>
                        <span className="absolute right-4 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-md bg-pink-500 text-white shadow-lg">
                          <ChevronRight className="size-5" aria-hidden="true" />
                        </span>
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <div className="mt-1 bg-[#10365e]">
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3 text-white/75">
                      <Gift className="size-5" aria-hidden="true" />
                      <span className="text-sm font-medium">Closes Soon</span>
                    </div>
                    <button
                      type="button"
                      className="grid size-7 place-items-center rounded-md bg-white/8 text-white"
                      aria-label="Collapse Closes Soon"
                      aria-expanded={closesSoonOpen}
                      onClick={() => setClosesSoonOpen((open) => !open)}
                    >
                      <ChevronDown
                        className={cn(
                          "size-5 transition-transform",
                          closesSoonOpen ? "rotate-0" : "-rotate-90"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>

                {closesSoonOpen ? (
                  <div className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-white">Closing draws</h2>
                    <Link
                      href="/#giveaways"
                      className="text-xs font-semibold text-cyan-300 underline-offset-4 hover:underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View all
                    </Link>
                  </div>

                  {closesSoonCards.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "relative flex min-h-24 overflow-hidden rounded-md bg-gradient-to-r p-3 shadow-[0_12px_28px_rgba(0,0,0,0.24)]",
                          item.className
                        )}
                      >
                        <DrawerVisual icon={item.icon} image={item.image} />
                        <span className="absolute inset-0 bg-gradient-to-r from-black/24 via-black/8 to-transparent" />
                        <span className="relative z-10 max-w-[12.5rem]">
                          <span className="mb-1 inline-flex items-center gap-1 rounded-sm bg-cyan-300 px-1.5 py-0.5 text-[0.62rem] font-black uppercase text-[#071431]">
                            Closing
                          </span>
                          <span className="block text-sm font-black text-white">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-xs font-semibold leading-5 text-white/90">
                            {item.meta}
                          </span>
                        </span>
                      </Link>
                    </SheetClose>
                  ))}
                  </div>
                ) : null}

                <div className="mt-4 border-t border-white/10 p-4">
                  <div className="grid gap-2">
                    <SheetClose asChild>
                      <Link
                        href="/#online-chat"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <MessageCircle className="size-5 text-cyan-300" />
                        Online Chat
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <Info className="size-5 text-cyan-300" />
                        About Us
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <nav className="hidden min-w-0 items-stretch gap-0 2xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex h-[58px] items-center gap-2 px-2.5 text-sm font-semibold text-white outline-none transition-colors hover:text-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-400 2xl:px-3.5"
              >
                <span className="absolute inset-x-1 bottom-0 h-1 rounded-t-full bg-cyan-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                <item.icon
                  className="relative size-5 text-white transition-colors group-hover:text-cyan-300"
                  aria-hidden="true"
                />
                <span className="relative">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <Link
          href="/"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="MARK'S RAFFLE home"
        >
          <BrandLogo className="w-[120px] sm:w-[144px]" />
        </Link>

        <div className="flex flex-1 items-center justify-end gap-5">
          <Button
            variant="outline"
            size="lg"
            className="hidden h-10 min-w-[76px] rounded-md border-cyan-400 bg-transparent px-4 text-sm font-medium text-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200 sm:inline-flex"
            asChild
          >
            <Link href="/login">Log in</Link>
          </Button>
          <Button
            size="lg"
            className="h-10 min-w-[86px] rounded-md !bg-[#c02ca0] px-4 text-sm font-semibold !text-white hover:!bg-[#d539b4] focus-visible:!ring-[#d539b4]/50"
            asChild
          >
            <Link href="/register">Register</Link>
          </Button>
          <Link
            href="/"
            className="hidden text-sm font-bold text-white transition-colors hover:text-cyan-200 sm:block"
            aria-label="Language English"
          >
            RO
          </Link>
        </div>
      </div>
    </header>
  );
}
