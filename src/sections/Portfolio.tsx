import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { categories, projects, type CategoryId } from '../data/projects';
import { asset, cn } from '../lib/utils';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';

function BrowserMockup({ image, name, url }: { image: string; name: string; url: string }) {
  const host = useMemo(() => {
    try {
      return new URL(url).host.replace('www.', '');
    } catch {
      return 'website';
    }
  }, [url]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-[#0a1729] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.95)]">
      <div className="flex items-center gap-2 border-b border-line bg-white/[0.04] px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
        </span>
        <span className="mx-auto max-w-[70%] truncate rounded-full border border-line bg-black/30 px-2.5 py-0.5 text-[0.58rem] text-mute-soft">
          {host}
        </span>
        <span className="size-4" />
      </div>
      <img
        src={asset(image)}
        alt={`Screenshot of the ${name} website`}
        loading="lazy"
        width={1440}
        height={900}
        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050b16]/55 to-transparent" />
    </div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<CategoryId>('all');
  const [expanded, setExpanded] = useState(false);
  const visible = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter));
  const shown = filter === 'all' && !expanded ? visible.slice(0, 9) : visible;

  return (
    <section id="work" className="relative overflow-hidden border-t border-line py-20 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 right-0 h-[30rem] w-[30rem] rounded-full bg-[#247bff]/10 blur-[140px]" />
      </div>

      <div className="shell">
        <SectionHeading
          eyebrow="Selected work"
          title="Digital Experiences. Real Projects."
          copy="Explore our collection of websites created across different industries and business categories."
        />

        <Reveal delay={0.05} className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                aria-pressed={active}
                className={cn(
                  'rounded-full border px-4 py-2 text-[0.78rem] font-medium transition-all duration-300',
                  active
                    ? 'border-accent/50 bg-accent/15 text-ink shadow-[0_0_28px_-10px_rgba(56,213,255,0.7)]'
                    : 'border-line bg-white/[0.03] text-mute hover:border-line-strong hover:text-ink',
                )}
              >
                {c.label}
              </button>
            );
          })}
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:grid-flow-dense">
          {shown.map((p) => (
            <Reveal
              key={p.id}
              delay={0.03}
              className={cn('group h-full', p.featured && 'xl:col-span-2')}
            >
              <TiltCard max={4} className="h-full">
                <article className="flex h-full flex-col">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name} — visit website (opens in a new tab)`}
                    className="block"
                  >
                    <BrowserMockup image={p.image} name={p.name} url={p.url} />
                  </a>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[0.62rem] tracking-[0.12em] text-mute-soft">
                          {p.index}
                        </span>
                        <span className="rounded-full border border-line bg-white/[0.03] px-2 py-0.5 text-[0.6rem] text-mute">
                          {p.category}
                        </span>
                        <span className="rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[0.58rem] tracking-[0.06em] text-accent uppercase">
                          {p.type === 'concept' ? 'Studio concept' : 'Commissioned'}
                        </span>
                      </div>
                      <h3 className="h3 mt-2 truncate text-[1.12rem]">{p.name}</h3>
                      <p className="mt-1.5 line-clamp-2 max-w-[46ch] text-[0.8rem] leading-relaxed text-mute">
                        {p.description}
                      </p>
                    </div>

                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-2 text-[0.7rem] font-medium text-mute transition-colors group-hover:border-accent/50 group-hover:text-accent"
                    >
                      Visit
                      <ArrowUpRight className="size-3" />
                    </a>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {filter === 'all' && !expanded && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="btn btn-ghost"
            >
              View all {projects.length} projects
              <ArrowUpRight className="size-4" />
            </button>
          </div>
        )}

        <p className="mt-10 max-w-2xl text-[0.74rem] leading-relaxed text-mute-soft">
          A mix of studio concept builds and project work. Each card is labelled with its type, and
          every link opens the live website in a new tab.
        </p>
      </div>
    </section>
  );
}
