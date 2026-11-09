const industries = [
  'Restaurants',
  'Cafés',
  'Juice Centres',
  'Retail Stores',
  'Hotels & Resorts',
  'E-commerce',
  'Agriculture',
  'Startups',
  'Education',
  'Healthcare',
  'Real Estate',
  'Personal Brands',
];

export function TrustMarquee() {
  const row = [...industries, ...industries];

  return (
    <section aria-label="Industries we build for" className="overflow-hidden border-y border-line bg-surface py-5">
      <div className="flex items-center gap-6 md:gap-8">
        <p className="hidden shrink-0 pl-5 text-[0.68rem] tracking-[0.14em] text-mute-soft uppercase md:block md:pl-8">
          Industries we build for
        </p>
        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
          <div className="marquee items-center gap-8 pr-8">
            {row.map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
                <span className="text-[0.83rem] font-medium text-ink/70">{item}</span>
                <span className="size-1 rounded-full bg-accent-deep/60" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
