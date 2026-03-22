import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { ValuePillars } from '@/components/ValuePillars';
import { Services } from '@/components/Services';
import { Pricing } from '@/components/Pricing';
import { Process } from '@/components/Process';
import { TechStack } from '@/components/TechStack';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ValuePillars />
        <Services />
        <Pricing />
        <Process />
        <TechStack />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
