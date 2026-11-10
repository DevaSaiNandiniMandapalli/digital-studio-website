import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { BrowserFrame } from '../components/BrowserFrame';
import { BentArrow } from '../components/BentArrow';
import { useMagnetic } from '../lib/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Hero() {
  const section = useRef<HTMLElement | null>(null);
  const stage = useRef<HTMLDivElement | null>(null);
  const primary = useMagnetic<HTMLAnchorElement>(0.18);
  const secondary = useMagnetic<HTMLAnchorElement>(0.14);

  useEffect(() => {
    const root = section.current;
    const tilt = stage.current;
    if (!root || !tilt || reduceMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.from('[data-hero-line]', {
        yPercent: 118,
        rotate: 3,
        duration: 1.25,
        stagger: 0.09,
      })
        .from('[data-hero-fade]', { y: 26, opacity: 0, duration: 1, stagger: 0.08 }, '-=0.85')
        .from(
          '[data-hero-frame]',
          {
            y: 90,
            opacity: 0,
            rotateY: -26,
            rotateX: 8,
            scale: 0.94,
            duration: 1.5,
            stagger: 0.14,
          },
          '-=1.05',
        );

      gsap.to('[data-hero-glow]', {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to('[data-depth="far"]', {
        yPercent: -8,
        rotateY: 4,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1.1 },
      });
      gsap.to('[data-depth="near"]', {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.9 },
      });

      if (window.matchMedia('(pointer: coarse)').matches) return;

      const rx = gsap.quickTo(tilt, 'rotateX', { duration: 1.1, ease: 'power3.out' });
      const ry = gsap.quickTo(tilt, 'rotateY', { duration: 1.1, ease: 'power3.out' });
      const mx = gsap.quickTo('[data-hero-frames]', 'x', { duration: 1.2, ease: 'power3.out' });
      const my = gsap.quickTo('[data-hero-frames]', 'y', { duration: 1.2, ease: 'power3.out' });

      const onMove = (e: PointerEvent) => {
        const r = root.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx(py * -5);
        ry(px * 9);
        mx(px * -22);
        my(py * -14);
        root.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
        root.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
      };

      root.addEventListener('pointermove', onMove);
      return () => root.removeEventListener('pointermove', onMove);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={section}
      className="grain relative isolate overflow-hidden bg-canvas pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          data-hero-glow
          className="absolute -top-[26rem] left-1/2 h-[62rem] w-[62rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(214,96,58,0.22), rgba(214,96,58,0.06) 38%, transparent 66%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(520px circle at var(--spot-x, 72%) var(--spot-y, 28%), rgba(242,237,227,0.1), transparent 62%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-72"
          style={{ background: 'linear-gradient(to top, #0b0b0c, transparent)' }}
        />
      </div>

      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6 xl:col-span-5">
            <div data-hero-fade className="flex items-center gap-3">
              <span className="eyebrow">Independent digital studio — Hyderabad</span>
            </div>

            <h1 className="display mt-7 text-[clamp(2.7rem,6vw+1rem,5.1rem)]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  good ideas.
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  deserve{' '}
                  <span className="type-3d font-serif text-[1.08em] leading-[0.8] font-normal italic text-accent">
                    great
                  </span>
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  websites.
                </span>
              </span>
            </h1>

            <p data-hero-fade className="lede mt-7 max-w-[34ch]">
              We design and build distinctive, high-performing websites for ambitious businesses —
              from restaurants and retail brands to startups and established companies.
            </p>

            <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a ref={primary} href="#contact" className="btn btn-primary">
                Let&rsquo;s build your website
                <ArrowUpRight className="size-4" />
              </a>
              <a
                ref={secondary}
                href="#work"
                className="link-underline text-[0.78rem] font-medium tracking-[0.1em] text-ink uppercase"
              >
                Explore our work
                <BentArrow className="size-4 text-accent" />
              </a>
            </div>

            <div
              data-hero-fade
              className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-5 text-[0.66rem] tracking-[0.16em] text-mute"
            >
              <span className="uppercase">Website design</span>
              <span aria-hidden="true" className="size-1 bg-accent" />
              <span className="uppercase">Development</span>
              <span aria-hidden="true" className="size-1 bg-accent" />
              <span className="uppercase">Digital experiences</span>
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-7">
            <div className="stage">
              <div
                ref={stage}
                className="layer relative mx-auto h-[23rem] w-full max-w-[34rem] sm:h-[27rem] lg:h-[32rem] lg:max-w-none"
              >
                <div data-hero-frames className="layer absolute inset-0">
                  <div
                    data-hero-frame
                    data-depth="far"
                    className="layer absolute top-[2%] left-0 hidden w-[54%] sm:block"
                    style={{ transform: 'rotateY(15deg) rotateZ(-4deg) translateZ(-90px)' }}
                  >
                    <div className="float-slower">
                      <BrowserFrame
                        image="/projects/kapoors-cafe.jpg"
                        alt="Kapoor's Cafe restaurant website preview"
                        url="kapoors cafe — restaurant"
                        viewportClassName="aspect-[16/11]"
                        hover="none"
                        className="edge-card opacity-80"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="reflection mt-1 h-16 bg-gradient-to-b from-white/12 to-transparent blur-[2px]"
                    />
                  </div>

                  <div
                    data-hero-frame
                    data-depth="near"
                    className="layer absolute top-[18%] right-0 w-[74%] sm:w-[70%]"
                    style={{ transform: 'rotateY(-17deg) rotateX(5deg) translateZ(70px)' }}
                  >
                    <div className="float-slow">
                      <BrowserFrame
                        image="/projects/kasoori.jpg"
                        alt="Kasoori restaurant website preview"
                        url="kasoori — restaurant"
                        priority
                        viewportClassName="aspect-[16/10]"
                        hover="none"
                        className="edge-card"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="reflection mt-1 h-20 bg-gradient-to-b from-white/14 to-transparent blur-[3px]"
                    />
                  </div>

                  <div
                    data-hero-frame
                    className="layer absolute bottom-[2%] left-[2%] w-[52%] sm:bottom-[1%] sm:left-[4%] sm:w-[44%]"
                    style={{ transform: 'rotateY(11deg) rotateZ(3deg) translateZ(150px)' }}
                  >
                    <div className="float-slow" style={{ animationDelay: '-4s' }}>
                      <BrowserFrame
                        image="/projects/fluids-store.jpg"
                        alt="Fluids Store e-commerce website preview"
                        url="fluids — e-commerce"
                        viewportClassName="aspect-[4/3]"
                        hover="none"
                        className="edge-card"
                      />
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  data-hero-frame
                  className="plate-dark absolute right-[2%] bottom-0 hidden items-center gap-4 px-4 py-3 sm:flex"
                  style={{ transform: 'rotateY(-14deg) translateZ(190px)' }}
                >
                  <span className="font-display text-[1.05rem] leading-none font-bold tracking-[-0.05em]">
                    yds<span className="text-accent">.</span>
                  </span>
                  <span className="text-[0.52rem] tracking-[0.18em] text-mute uppercase">
                    Design · Build · Launch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
