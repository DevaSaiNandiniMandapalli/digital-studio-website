import { useId, useState } from 'react';
import { ArrowUpRight, Check, Loader2, Mail, MessageCircle, Phone } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { site, whatsappMessage } from '../data/site';
import { cn } from '../lib/utils';

type Fields = {
  name: string;
  business: string;
  email: string;
  phone: string;
  websiteType: string;
  budget: string;
  message: string;
};

const initial: Fields = {
  name: '',
  business: '',
  email: '',
  phone: '',
  websiteType: '',
  budget: '',
  message: '',
};

const websiteTypes = [
  'Business website',
  'Restaurant or cafe',
  'E-commerce store',
  'Portfolio',
  'Corporate or startup',
  'Redesign of an existing site',
  'Something else',
];

const budgets = ['₹2,999 — Starter', '₹5,999 — Professional', '₹8,999 — Premium', 'Custom / not sure yet'];

const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined;

const inputClass =
  'mt-2 w-full border border-line bg-canvas px-3.5 py-3 text-[0.9rem] text-ink placeholder:text-mute-soft transition-colors focus:border-ink focus:outline-none';

export function Contact() {
  const [values, setValues] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const uid = useId();

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (values.name.trim().length < 2) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = 'Please enter a valid email address.';
    const digits = values.phone.replace(/[^\d]/g, '');
    if (digits.length < 10) next.phone = 'Please enter a valid phone number.';
    if (values.message.trim().length < 12) next.message = 'A sentence or two about your project helps.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const summary = () =>
    encodeURIComponent(
      `New website enquiry\n\nName: ${values.name}\nBusiness: ${values.business || '—'}\nEmail: ${values.email}\nPhone: ${values.phone}\nType: ${values.websiteType || '—'}\nBudget: ${values.budget || '—'}\n\n${values.message}`,
    );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setState('sending');
    if (!endpoint) {
      window.open(`${site.whatsapp}?text=${summary()}`, '_blank', 'noopener,noreferrer');
      setState('sent');
      return;
    }
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, source: 'studio-website' }),
      });
      setState('sent');
    } catch {
      window.open(`${site.whatsapp}?text=${summary()}`, '_blank', 'noopener,noreferrer');
      setState('sent');
    }
  };

  const field = (key: keyof Fields) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${uid}-${key}-error` : undefined,
  });

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-canvas py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Start a project</span>
              <h2 className="h2 mt-5">
                Tell us about <br className="hidden md:block" />
                <span className="text-accent">your business</span>.
              </h2>
              <p className="lede mt-4">
                Share a few details and we will come back with a clear recommendation, timeline and
                price. No obligation, no sales pressure.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 border-t border-line">
                <a
                  href={whatsappMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-line py-4"
                >
                  <span className="flex items-center gap-3 text-[0.86rem] text-ink">
                    <MessageCircle className="size-4 text-accent" />
                    WhatsApp the studio
                  </span>
                  <ArrowUpRight className="size-4 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:text-accent" />
                </a>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="group flex items-center justify-between gap-4 border-b border-line py-4"
                >
                  <span className="flex items-center gap-3 text-[0.86rem] text-ink">
                    <Phone className="size-4 text-accent" />
                    {site.phone}
                  </span>
                  <ArrowUpRight className="size-4 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:text-accent" />
                </a>
                <div className="flex items-center justify-between gap-4 border-b border-line py-4">
                  <span className="flex items-center gap-3 text-[0.86rem] text-ink">
                    <Mail className="size-4 text-accent" />
                    Studio hours
                  </span>
                  <span className="text-[0.78rem] text-mute">Mon–Sat · 10:00–19:00 IST</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              {state === 'sent' ? (
                <div className="flex h-full min-h-[26rem] flex-col items-start justify-center border border-line bg-surface p-8">
                  <span className="grid size-11 place-items-center rounded-full bg-accent text-white">
                    <Check className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.4rem] font-medium tracking-[-0.03em] uppercase">
                    Thank you — message noted.
                  </h3>
                  <p className="mt-3 max-w-md text-[0.9rem] leading-relaxed text-mute">
                    {endpoint
                      ? 'Your enquiry has been received. We usually reply within one working day.'
                      : 'WhatsApp should have opened with your details ready to send. If it did not, message us directly and we will pick it up from there.'}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={whatsappMessage()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Open WhatsApp
                      <ArrowUpRight className="size-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setValues(initial);
                        setState('idle');
                      }}
                      className="btn btn-ghost"
                    >
                      Send another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="border border-line bg-surface p-6 md:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${uid}-name`} className="text-[0.68rem] tracking-[0.12em] text-mute uppercase">
                        Your name *
                      </label>
                      <input {...field('name')} type="text" autoComplete="name" placeholder="Full name" className={inputClass} />
                      {errors.name && (
                        <p id={`${uid}-name-error`} className="mt-1.5 text-[0.72rem] text-accent">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor={`${uid}-business`} className="text-[0.68rem] tracking-[0.12em] text-mute uppercase">
                        Business name
                      </label>
                      <input {...field('business')} type="text" autoComplete="organization" placeholder="Business or brand" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor={`${uid}-email`} className="text-[0.68rem] tracking-[0.12em] text-mute uppercase">
                        Email *
                      </label>
                      <input {...field('email')} type="email" autoComplete="email" placeholder="you@business.com" className={inputClass} />
                      {errors.email && (
                        <p id={`${uid}-email-error`} className="mt-1.5 text-[0.72rem] text-accent">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor={`${uid}-phone`} className="text-[0.68rem] tracking-[0.12em] text-mute uppercase">
                        Phone *
                      </label>
                      <input {...field('phone')} type="tel" autoComplete="tel" placeholder="+91" className={inputClass} />
                      {errors.phone && (
                        <p id={`${uid}-phone-error`} className="mt-1.5 text-[0.72rem] text-accent">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor={`${uid}-websiteType`} className="text-[0.68rem] tracking-[0.12em] text-mute uppercase">
                        What do you need?
                      </label>
                      <select {...field('websiteType')} className={cn(inputClass, 'appearance-none')}>
                        <option value="">Select a type</option>
                        {websiteTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`${uid}-budget`} className="text-[0.68rem] tracking-[0.12em] text-mute uppercase">
                        Budget range
                      </label>
                      <select {...field('budget')} className={cn(inputClass, 'appearance-none')}>
                        <option value="">Select a range</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor={`${uid}-message`} className="text-[0.68rem] tracking-[0.12em] text-mute uppercase">
                      About your project *
                    </label>
                    <textarea
                      {...field('message')}
                      rows={5}
                      placeholder="What does your business do, and what should the website achieve?"
                      className={cn(inputClass, 'resize-y')}
                    />
                    {errors.message && (
                      <p id={`${uid}-message-error`} className="mt-1.5 text-[0.72rem] text-accent">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-line pt-5 sm:flex-row sm:items-center">
                    <p className="max-w-[20rem] text-[0.72rem] leading-relaxed text-mute">
                      Your details are used only to reply to this enquiry.
                    </p>
                    <button type="submit" disabled={state === 'sending'} className="btn btn-primary w-full sm:w-auto">
                      {state === 'sending' ? (
                        <>
                          Sending
                          <Loader2 className="size-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send enquiry
                          <ArrowUpRight className="size-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
