import { Reveal } from '../components/Reveal';

const reasons = [
  {
    index: '01',
    title: 'Design that is actually custom',
    copy: 'Every layout is designed for your business and content. Nothing is pulled from a template library.',
  },
  {
    index: '02',
    title: 'Built for speed and search',
    copy: 'Lightweight, well-structured builds with clean markup, sensible images and metadata that search engines understand.',
  },
  {
    index: '03',
    title: 'Mobile-first, then everything else',
    copy: 'Most of your visitors arrive on a phone. We design for that screen first and scale the experience upward.',
  },
  {
    index: '04',
    title: 'Plain pricing, no surprises',
    copy: 'Package prices start at ₹2,999 and scope is confirmed in writing. Additions are quoted before work begins.',
  },
  {
    index: '05',
    title: 'Direct communication',
    copy: 'You speak with the person building your website — by WhatsApp, phone or email. No account managers in between.',
  },
  {
    index: '06',
    title: 'Launched, not just delivered',
    copy: 'We deploy, connect your domain, check every link and hand over a website that is ready for customers.',
  },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-canvas py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">Why work with us</span>
              <h2 className="h2 mt-5">
                Reasons to <span className="text-blue">choose</span> the studio.
              </h2>
              <p className="lede mt-4">
                Not promises about being the best — just the way we work, and why clients stay with
                us.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
              {reasons.map((reason, i) => (
                <Reveal key={reason.index} delay={i * 0.05} className="bg-canvas">
                  <div className="group h-full bg-canvas px-0 py-6 transition-colors duration-500 sm:px-6">
                    <span className="font-display text-[0.68rem] tracking-[0.16em] text-accent">
                      {reason.index}
                    </span>
                    <h3 className="mt-3 font-display text-[0.98rem] leading-snug font-medium tracking-[-0.02em]">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-mute">{reason.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
