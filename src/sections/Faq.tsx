import { ArrowUpRight } from 'lucide-react';
import { Accordion } from '../components/Accordion';
import { Reveal } from '../components/Reveal';
import { whatsappMessage } from '../data/site';

const faqs = [
  {
    q: 'What kind of businesses do you work with?',
    a: 'Restaurants and cafes, hotels and resorts, juice centres and food businesses, retail and clothing stores, e-commerce brands, agriculture and farming businesses, startups, educational institutions, healthcare practices, real estate, personal brands and corporate companies. If your business needs a professional online presence, we can help.',
  },
  {
    q: 'How long does a website take to build?',
    a: 'A single-page Starter website is typically ready in 5–7 days, a Professional site in 10–14 days and a Premium build in 18–25 days — measured from the day content and requirements are confirmed. Custom platforms are scheduled individually after a written scope.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. The studio is based in Hyderabad and works with clients across India and worldwide. Projects are handled remotely with scheduled calls, WhatsApp updates and shared design previews.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Your business details, logo if you have one, images, service or menu information and contact details. If some of that does not exist yet, we advise on what to prepare and can work with placeholder content during design.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Yes. Redesign is one of our core services. We review what currently works, keep the content and SEO value worth keeping, and rebuild the design, structure and mobile experience around your business.',
  },
  {
    q: 'Do you handle domain and hosting?',
    a: 'We help you choose and connect a domain and hosting, and we handle deployment. Domain registration and premium hosting are billed at actual cost and are separate from the package price.',
  },
  {
    q: 'What happens after the website launches?',
    a: 'You receive the finished website plus a short walkthrough. Content updates, small design changes, backups and dependency updates are available as an ongoing maintenance arrangement if you want them.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden border-t border-line bg-surface py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">Questions</span>
              <h2 className="h2 mt-5">
                Everything else <br className="hidden md:block" />
                you might ask.
              </h2>
              <p className="lede mt-4">
                Straight answers about scope, timelines, hosting and working together.
              </p>
              <a
                href={whatsappMessage('Hi! I have a question about a website project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[0.74rem] font-medium tracking-[0.1em] text-ink uppercase transition-colors hover:text-accent"
              >
                Ask your question
                <ArrowUpRight className="size-3.5" />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
