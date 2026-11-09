import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BrowserFrame } from '../components/BrowserFrame';
import { Reveal } from '../components/Reveal';
import { categories, projects, type CategoryId } from '../data/projects';
import { cn } from '../lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];

export function Portfolio() {
  const [active, setActive] = useState<CategoryId>('all');
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.categories.includes(active))),
    [active],
  );

  return (
    <section id="work" className="relative overflow-hidden border-t border-line bg-canvas py-20 md:py-28">
      <div className="shell">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Selected work</span>
            <h2 className="h2 mt-4">
              A portfolio built <br className="hidden md:block" />
              for <span className="text-accent">real businesses</span>.
            </h2>
            <p className="lede mt-4">
              Restaurants, retail stores, juice centres and hospitality brands — every build starts
              with the business, then becomes a website.
            </p>
          </div>
          <div className="shrink-0">
            <p className="font-display text-[2.4rem] leading-none font-medium tracking-[-0.05em]">
              {String(projects.length).padStart(2, '0')}
              <span className="text-accent">+</span>
            </p>
            <p className="rule-label mt-2">Studio projects</p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2 md:mt-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              aria-pressed={active === cat.id}
              className={cn(
                'rounded-full border px-4 py-2 text-[0.68rem] font-medium tracking-[0.06em] transition-all duration-300',
                active === cat.id
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-line-strong text-mute hover:border-ink hover:text-ink',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-x-6 gap-y-12 md:mt-14 lg:grid-cols-12 lg:gap-y-20">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={reduce ? undefined : { opacity: 0, y: 28 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.65, delay: reduce ? 0 : Math.min(i * 0.05, 0.3), ease }}
                className={cn('group col-span-1', spans[i % spans.length], i % 4 === 1 && 'lg:mt-16')}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`Open ${project.name} project in a new tab`}
                >
                  <BrowserFrame
                    image={project.image}
                    alt={`${project.name} website preview`}
                    url={project.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}
                    viewportClassName={i % 4 === 0 || i % 4 === 3 ? 'aspect-[16/10]' : 'aspect-[4/3]'}
                  />

                  <div className="mt-4 flex items-start justify-between gap-4 border-t border-line pt-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-[0.68rem] tracking-[0.12em] text-accent">
                          {project.index}
                        </span>
                        <h3 className="font-display text-[1.05rem] leading-tight font-medium tracking-[-0.02em] md:text-[1.15rem]">
                          {project.name}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-[0.76rem] tracking-[0.02em] text-mute">
                        {project.category}
                        <span aria-hidden="true" className="px-2 text-line-strong">
                          /
                        </span>
                        {project.type === 'concept' ? 'Studio concept' : 'Commissioned'}
                      </p>
                    </div>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-mute transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </a>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-16 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.86rem] text-mute">
            Every project is a live, working website. Open any one to see it in action.
          </p>
          <a href="#contact" className="btn btn-ghost">
            Start your project
            <ArrowUpRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
