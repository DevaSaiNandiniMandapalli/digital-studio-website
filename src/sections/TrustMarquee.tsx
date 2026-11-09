const items = [
  'Custom Website Design',
  'Mobile-First Development',
  'Business Websites',
  'SEO-Ready Structure',
  'Fast Performance',
  'Modern UI/UX',
  'Responsive Design',
  'Website Launch',
];

export function TrustMarquee() {
  const row = [...items, ...items];
  return (
    <section aria-label="What every website includes" className="relative overflow-hidden border-y border-ink/10 bg-lime text-ink">
      <div className="marquee-paused py-3.5 md:py-4">
        <div className="marquee-track items-center">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1 || undefined}
            >
              {row.map((item, i) => (
                <li key={`${copy}-${i}`} className="flex items-center">
                  <span className="whitespace-nowrap px-6 text-[0.7rem] font-semibold uppercase tracking-[0.2em] md:px-8 md:text-[0.75rem]">
                    {item}
                  </span>
                  <span aria-hidden="true" className="text-[0.6rem] opacity-50">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
