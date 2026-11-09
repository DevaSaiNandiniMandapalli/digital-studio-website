import { priceFaqs } from '../data/pricing';
import { Accordion } from '../components/Accordion';
import { Reveal } from '../components/Reveal';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { whatsappMessage } from '../data/site';

export function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden border-t border-line bg-canvas py-20 md:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="eyebrow">Questions</span>
            <h2 className="h2 mt-4">Everything you might be wondering.</h2>
            <p className="lede mt-4">
              Clear answers about scope, timelines, hosting and upgrades. If your question is not
              here, ask directly — we reply personally.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              <a href="#contact" className="btn btn-primary">
                Ask your question
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={whatsappMessage('Hi! I have a question about your website packages.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <MessageCircle className="size-4" />
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <Accordion items={priceFaqs} />
        </Reveal>
      </div>
    </section>
  );
}
