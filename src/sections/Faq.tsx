import { priceFaqs } from '../data/pricing';
import { Accordion } from '../components/Accordion';
import { Reveal } from '../components/Reveal';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { whatsappMessage } from '../data/site';

export function Faq() {
  return (
    <section id="faq" className="relative bg-paper-2 py-20 text-ink md:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow mb-5 text-ink/45">Questions</p>
            <h2 className="text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1]">
              Everything you might be <span className="font-serif italic">wondering</span>.
            </h2>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-ink/55">
              Clear answers about scope, timelines, hosting and upgrades. If your question is not
              here, ask us directly — we reply personally.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              <a href="#contact" className="btn btn-dark">
                Ask your question
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={whatsappMessage('Hi! I have a question about your website packages.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark"
              >
                <MessageCircle className="size-4" />
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <Accordion items={priceFaqs} tone="dark" />
        </Reveal>
      </div>
    </section>
  );
}
