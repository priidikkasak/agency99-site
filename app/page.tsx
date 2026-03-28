import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { StatementBlock } from '@/components/StatementBlock';
import { ValuePillars } from '@/components/ValuePillars';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import { Pricing } from '@/components/Pricing';
import { Process } from '@/components/Process';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ValuePillars />
        <StatementBlock />
        <Services />
        <Portfolio />
        <Pricing />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
