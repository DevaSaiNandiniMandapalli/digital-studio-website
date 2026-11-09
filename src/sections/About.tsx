import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const values = [
  {
    n: '01',
    title: 'Designed Around Your Business',
    body: 'Every website is designed according to your brand, industry and audience — never from a recycled template.',
  },
  {
    n: '02',
    title: 'Built for Every Screen',
    body: 'Your customers get a seamless experience on phones, tablets and desktops, with layouts tested at real device widths.',
  },
  {
    n: '03',
    title: 'Focused on Real Results',
    body: 'Clear messaging, fast performance and contact-focused design help convert visitors into enquiries.',
  },
];

const industries = [
  'Restaurants & Cafes',
  'Hotels & Resorts',
  'Juice Centres & Food',
  'Retail & Clothing',
  'E-commerce',
  'Agriculture & Farming',
  'Startups',
  'Education',
  'Healthcare',
  'Real Estate',
  'Personal Brands',
  'Corporate',
  'Service Providers',
  'Local Businesses',
];

export function About() {
  return (
    <section id="about" className="relative bg-paper py-20 text-ink md:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          tone="dark"
          eyebrow="About the studio"
          title={
            <>
              More than developers.
              <br />
              Your <span className="font-serif italic">digital growth</span> partners.
            </>
          }
          description="We help businesses turn their ideas into professional digital experiences. Whether you are starting a new business or upgrading an existing brand, we create websites that communicate your value and help customers connect with you."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.03] p-6 md:p-8">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ink/40">We build for</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <li
                    key={industry}
                    className="cursor-default rounded-full border border-ink/12 bg-paper px-3 py-1.5 text-[0.72rem] font-medium text-ink/70 transition-colors duration-300 hover:border-ink/30 hover:text-ink"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-ink/10 pt-5 text-[0.8rem] leading-relaxed text-ink/50">
                Whatever your business needs, we can design and build a website for it — from a
                single-page launch to a complete multi-page platform.
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-ink link-underline"
              >
                Tell us what you need
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </Reveal>

          <ol className="order-1 divide-y divide-ink/10 border-t border-ink/10 lg:order-2">
            {values.map((v, i) => (
              <Reveal as="li" key={v.n} delay={i * 0.08} className="group">
                <div className="flex gap-5 py-7 md:gap-8 md:py-8">
                  <span className="font-mono text-[0.7rem] leading-5 text-ink/35">{v.n}</span>
                  <div>
                    <h3 className="text-[1.15rem] font-medium tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-[1.3rem]">
                      {v.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[0.9rem] leading-relaxed text-ink/55">
                      {v.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
