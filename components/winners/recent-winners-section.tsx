import { Container } from "@/components/layout/container";
import { RecentWinnerCard } from "@/components/winners/recent-winner-card";

const recentWinners = [
  {
    username: "Alex M.",
    avatarInitials: "AM",
    prizeWon: "Mercedes-Benz AMG GT Coupe",
    prizeImageUrl: "/amg_gt1.png",
    dateWon: "12 May 2026",
    winnerComment: "I only had 18 tickets and still cannot believe the car is mine.",
    isLargePrize: true,
  },
  {
    username: "Roxana V.",
    avatarInitials: "RV",
    prizeWon: "iPhone 17 Pro Max",
    prizeImageUrl: "/iPhone17.png",
    dateWon: "9 May 2026",
    winnerComment: "The draw felt transparent from start to finish. Super clean experience.",
  },
  {
    username: "Darius C.",
    avatarInitials: "DC",
    prizeWon: "EUR 3,000 Cash Prize",
    prizeImageUrl: "/3000_bonus_draw.png",
    dateWon: "6 May 2026",
    winnerComment: "Best surprise of the month. The confirmation came through fast.",
    isLargePrize: true,
  },
  {
    username: "Mihai T.",
    avatarInitials: "MT",
    prizeWon: "BMW Seria 5 530e xDrive",
    prizeImageUrl: "/bmwg30_1.png",
    dateWon: "2 May 2026",
    winnerComment: "I joined for fun and ended up with a serious prize. Unreal.",
  },
] as const;

export function RecentWinnersSection() {
  return (
    <section id="recent-winners" className="relative overflow-hidden bg-[#020b1d] py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,0.1),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(217,70,239,0.12),transparent_30%)]" />
      <Container className="relative">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-fuchsia-300">
              Verified payouts
            </p>
            <h2 className="mt-2 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
              Recent <span className="text-cyan-300">Winners</span>
            </h2>
          </div>
          <div className="max-w-md text-sm font-medium leading-6 text-cyan-100/62">
            Fresh wins from completed draws, shown with prize details and winner reactions.
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {recentWinners.map((winner) => (
            <RecentWinnerCard key={`${winner.username}-${winner.prizeWon}`} {...winner} />
          ))}
        </div>
      </Container>
    </section>
  );
}
