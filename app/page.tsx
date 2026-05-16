import { FeaturedGiveawaysSection, LiveDrawBanner } from "@/components/giveaway";
import { HeroSection } from "@/components/home/hero-section";
import { AppShell, Navbar } from "@/components/layout";

export default function Home() {
  return (
    <AppShell>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LiveDrawBanner />
        <FeaturedGiveawaysSection />
      </main>
    </AppShell>
  );
}
