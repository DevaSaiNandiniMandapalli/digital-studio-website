import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { FloatingActions } from './components/FloatingActions';
import { Hero } from './sections/Hero';
import { Intro } from './sections/Intro';
import { Portfolio } from './sections/Portfolio';
import { Services } from './sections/Services';
import { Process } from './sections/Process';
import { Pricing } from './sections/Pricing';
import { About } from './sections/About';
import { WhyUs } from './sections/WhyUs';
import { Faq } from './sections/Faq';
import { Contact } from './sections/Contact';
import { FinalCta } from './sections/FinalCta';

export default function App() {
  return (
    <div className="relative min-h-screen bg-canvas">
      <a
        href="#main"
        className="sr-only z-[70] bg-accent px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Intro />
        <Portfolio />
        <Services />
        <Process />
        <Pricing />
        <About />
        <WhyUs />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
