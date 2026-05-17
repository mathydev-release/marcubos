import { FeaturedGiveawaysSection, LiveDrawBanner } from "@/components/giveaway";
import { HeroSection } from "@/components/home/hero-section";
import { AppShell, Footer, Navbar } from "@/components/layout";
import { RecentWinnersSection } from "@/components/winners";

export default function Home() {
  return (
    <AppShell>
      <Navbar />
      <main className="custom-scrollbar mt-[58px] h-[calc(100dvh-58px)] overflow-y-auto overflow-x-hidden">
        <HeroSection />
        <LiveDrawBanner />
        <FeaturedGiveawaysSection />
        <RecentWinnersSection />
        <Footer />
      </main>
    </AppShell>
  );
}
