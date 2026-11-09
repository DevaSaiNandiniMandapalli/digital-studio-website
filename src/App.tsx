import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { Hero } from './sections/Hero';
import { Metrics } from './sections/Metrics';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Portfolio } from './sections/Portfolio';
import { Pricing } from './sections/Pricing';
import { Faq } from './sections/Faq';
import { Process } from './sections/Process';
import { WhyUs } from './sections/WhyUs';
import { Contact } from './sections/Contact';
import { FinalCta } from './sections/FinalCta';

export default function App() {
  return (
    <div className="relative min-h-screen bg-canvas">
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-accent px-4 py-2 text-sm font-semibold text-[#04101f] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Metrics />
        <About />
        <Services />
        <Portfolio />
        <WhyUs />
        <Process />
        <Pricing />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
