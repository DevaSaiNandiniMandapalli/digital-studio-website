import { useState } from 'react';
import { PHONE, PHONE_RAW, STUDIO, WHATSAPP } from '../../data';
import { Arrow, Reveal, SectionHeading } from '../ui';

const TYPES = ['Business website', 'Restaurant / cafe', 'E-commerce', 'Portfolio', 'Custom platform', 'Not sure yet'];
const BUDGETS = ['Under ₹5,000', '₹5,000 – ₹10,000', '₹10,000 – ₹25,000', '₹25,000+'];

export function Contact() {
  const [form, setForm] = useState({ name: '', business: '', type: TYPES[0], budget: BUDGETS[1], message: '' });
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Hi YDS — new project enquiry.`,
      ``,
      `Name: ${form.name || '—'}`,
      `Business: ${form.business || '—'}`,
      `Project: ${form.type}`,
      `Budget: ${form.budget}`,
      form.message ? `\nDetails: ${form.message}` : '',
    ].join('\n');
    window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad relative z-10 border-t border-white/[0.06] bg-ink">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Start a project"
              title={
                <>
                  Let's build
                  <br className="hidden sm:block" /> something <span className="text-lime">real.</span>
                </>
              }
              lead="Tell us about your business and what you need. We'll reply with a clear scope, a timeline and a fixed price."
            />

            <div className="mt-10 space-y-3">
              <Reveal>
                <a
                  href={`tel:+${PHONE_RAW}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-card/50 px-5 py-4 transition-colors hover:border-white/20"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted">Call</p>
                    <p className="mt-1 font-display text-base tracking-tight text-paper">{PHONE}</p>
                  </div>
                  <Arrow className="text-muted transition-colors group-hover:text-lime" />
                </a>
              </Reveal>
              <Reveal delay={0.06}>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-lime/25 bg-lime/[0.05] px-5 py-4 transition-colors hover:border-lime/50"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-lime/80">WhatsApp</p>
                    <p className="mt-1 font-display text-base tracking-tight text-paper">Message us directly</p>
                  </div>
                  <Arrow className="text-lime" />
                </a>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-card/50 px-5 py-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted">Studio</p>
                    <p className="mt-1 font-display text-base tracking-tight text-paper">{STUDIO}</p>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-muted">Working globally</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.16}>
              <p className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_10px_2px_rgba(183,244,90,0.5)]" />
                Usually replies within a few hours
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-white/[0.09] bg-card/70 p-6 md:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name">
                    <input
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Aditya"
                      className="field"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Business name">
                    <input
                      value={form.business}
                      onChange={update('business')}
                      placeholder="Deccan Waffle House"
                      className="field"
                      autoComplete="organization"
                    />
                  </Field>
                  <Field label="Project type">
                    <select value={form.type} onChange={update('type')} className="field">
                      {TYPES.map((t) => (
                        <option key={t} value={t} className="bg-card">
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Budget range">
                    <select value={form.budget} onChange={update('budget')} className="field">
                      {BUDGETS.map((b) => (
                        <option key={b} value={b} className="bg-card">
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="mt-5">
                  <Field label="What do you need?">
                    <textarea
                      value={form.message}
                      onChange={update('message')}
                      rows={4}
                      placeholder="A few lines about your business, your goals and any references you like."
                      className="field resize-none"
                    />
                  </Field>
                </div>

                <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="btn btn-lime w-full sm:w-auto">
                    Send via WhatsApp <Arrow />
                  </button>
                  <p className="text-[11px] leading-relaxed text-muted sm:max-w-[230px]">
                    Opens WhatsApp with your details pre-filled. Nothing is stored on this site.
                  </p>
                </div>

                {sent && (
                  <p className="mt-4 rounded-lg border border-lime/30 bg-lime/[0.07] px-4 py-3 text-[13px] text-paper">
                    WhatsApp should have opened in a new tab. If it didn't,{' '}
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-lime underline">
                      tap here
                    </a>
                    .
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-muted">{label}</span>
      {children}
    </label>
  );
}
