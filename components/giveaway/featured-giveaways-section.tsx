import { Container } from "@/components/layout/container";
import { GiveawayCard } from "@/components/giveaway/giveaway-card";

const giveaways = [
  {
    title: "BMW Seria 5 530e xDrive Aut.",
    prizeImageUrl: "/bmwg30_1.png",
    href: "/giveaway/gt-coupe",
    ticketPrice: "EUR 8.50",
    originalTicketPrice: "EUR 9.99",
    targetDate: "2026-06-18T20:00:00+03:00",
    entrantsCount: 720,
    maxEntrants: 1000,
  },
  {
    title: "IPHONE 17 PRO MAX",
    prizeImageUrl: "/iPhone17.png",
    href: "/giveaway/iphone-bundle",
    ticketPrice: "EUR 2.50",
    originalTicketPrice: "EUR 3.00",
    targetDate: "2026-06-12T20:00:00+03:00",
    entrantsCount: 436,
    maxEntrants: 650,
  },
  {
    title: "EUR 3,000 CASH PRIZE",
    prizeImageUrl: "/3000_bonus_draw.png",
    href: "/giveaway/cash-prize",
    ticketPrice: "EUR 5.00",
    targetDate: "2026-06-08T20:00:00+03:00",
    entrantsCount: 812,
    maxEntrants: 900,
  },
];

export function FeaturedGiveawaysSection() {
  return (
    <section id="giveaways" className="bg-[#020b1d] py-16 md:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
              Live draws
            </p>
            <h2 className="mt-2 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
              <span className="text-cyan-300">JUST</span> LAUNCHED
            </h2>
          </div>
          <a
            href="/#giveaways"
            className="hidden rounded-md border border-cyan-400/25 px-4 py-2 text-sm font-semibold text-cyan-200 transition-colors hover:bg-cyan-400/10 sm:inline-flex"
          >
            View all
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {giveaways.map((giveaway) => (
            <GiveawayCard key={giveaway.href} showCountdown={false} {...giveaway} />
          ))}
        </div>
      </Container>
    </section>
  );
}
