import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2, MessageCircle, Phone, MapPin, Clock, ChevronDown } from 'lucide-react';
import { site, whatsappMessage } from '../data/site';
import { plans } from '../data/pricing';
import { cn, formatINR } from '../lib/utils';
import { Reveal } from '../components/Reveal';

const businessCategories = [
  'Restaurant / Cafe',
  'Juice Centre / Food Business',
  'Retail / Clothing',
  'E-commerce',
  'Agriculture / Farming',
  'Hotel / Hospitality',
  'Startup / Entrepreneur',
  'Education',
  'Healthcare',
  'Real Estate',
  'Personal Brand / Portfolio',
  'Corporate / Service Provider',
  'Other',
];

const websiteTypes = [
  'Business Website',
  'Restaurant Website',
  'E-commerce Website',
  'Portfolio Website',
  'Hotel Website',
  'Corporate Website',
  'Landing Page',
  'Custom Web Application',
  'Other',
];

const packageOptions = [
  ...plans.map((p) => ({ value: p.id, label: `${formatINR(p.price)} ${p.name.split(' ')[0]}` })),
  { value: 'custom', label: 'Custom Requirement' },
];

type FormState = {
  name: string;
  business: string;
  phone: string;
  email: string;
  category: string;
  websiteType: string;
  plan: string;
  message: string;
  existingUrl: string;
  company_website: string;
};

const empty: FormState = {
  name: '',
  business: '',
  phone: '',
  email: '',
  category: '',
  websiteType: '',
  plan: 'professional',
  message: '',
  existingUrl: '',
  company_website: '',
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(v: FormState): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[+]?[\d\s-]{10,16}$/.test(v.phone.trim()) || v.phone.replace(/\D/g, '').length < 10)
    e.phone = 'Enter a valid phone number with at least 10 digits.';
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (!v.category) e.category = 'Select your business category.';
  if (!v.websiteType) e.websiteType = 'Select the type of website you need.';
  if (v.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).';
  if (v.existingUrl.trim() && !/^https?:\/\/\S+\.\S+/i.test(v.existingUrl.trim()))
    e.existingUrl = 'Start the URL with https://';
  return e;
}

const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined;

export function Contact() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'whatsapp' | 'success' | 'error'>('idle');
  const [waLink, setWaLink] = useState('');
  const [serverError, setServerError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setValues((v) => ({ ...v, plan: id }));
      setStatus('idle');
    };
    window.addEventListener('select-plan', onSelect);
    return () => window.removeEventListener('select-plan', onSelect);
  }, []);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const buildMessage = (v: FormState) => {
    const planLabel =
      packageOptions.find((p) => p.value === v.plan)?.label ?? 'Not sure yet';
    return [
      `New website enquiry — ${v.business.trim() || v.name.trim()}`,
      '',
      `Name: ${v.name.trim()}`,
      `Business: ${v.business.trim() || '—'}`,
      `Phone: ${v.phone.trim()}`,
      `Email: ${v.email.trim()}`,
      `Business category: ${v.category}`,
      `Website type: ${v.websiteType}`,
      `Preferred package: ${planLabel}`,
      `Existing website: ${v.existingUrl.trim() || '—'}`,
      '',
      'Project details:',
      v.message.trim(),
    ].join('\n');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (values.company_website) return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setServerError('');
    setStatus('sending');

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, source: 'website-enquiry' }),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setStatus('success');
        setValues(empty);
        return;
      } catch {
        setServerError(
          'We could not reach our enquiry inbox. Your message is ready below — please send it on WhatsApp so it reaches us.',
        );
      }
    }

    const link = whatsappMessage(buildMessage(values));
    setWaLink(link);
    window.open(link, '_blank', 'noopener,noreferrer');
    setStatus('whatsapp');
  };

  const inputBase =
    'w-full rounded-lg border bg-white px-3.5 py-2.5 text-[0.87rem] text-ink placeholder:text-ink/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ink/10';
  const ok = 'border-ink/15 focus:border-ink/50';
  const bad = 'border-red-500/60 bg-red-50/50 focus:border-red-500';

  return (
    <section id="contact" className="relative bg-paper py-20 text-ink md:py-28 lg:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 text-ink/45">Start a project</p>
              <h2 className="text-[clamp(2rem,4.2vw,3.3rem)] leading-[0.98]">
                Let&apos;s build something <span className="font-serif italic">amazing</span> together.
              </h2>
              <p className="mt-6 max-w-md text-[0.93rem] leading-relaxed text-ink/55">
                Tell us about your business and the website you need. We&apos;ll discuss your
                requirements and recommend the right solution.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-9 divide-y divide-ink/10 border-y border-ink/10">
                <li>
                  <a href={`tel:${site.phoneRaw}`} className="group flex items-center gap-4 py-4">
                    <span className="grid size-9 place-items-center rounded-md border border-ink/12 bg-white/60 text-ink/70 transition-colors group-hover:border-ink/30 group-hover:text-ink">
                      <Phone className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[0.65rem] uppercase tracking-[0.14em] text-ink/40">Call us</span>
                      <span className="block text-[0.9rem] font-medium">{site.phone}</span>
                    </span>
                    <ArrowUpRight className="ml-auto size-4 text-ink/30 transition-colors group-hover:text-ink" />
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-4"
                  >
                    <span className="grid size-9 place-items-center rounded-md border border-ink/12 bg-white/60 text-ink/70 transition-colors group-hover:border-ink/30 group-hover:text-ink">
                      <MessageCircle className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[0.65rem] uppercase tracking-[0.14em] text-ink/40">WhatsApp</span>
                      <span className="block text-[0.9rem] font-medium">Chat instantly</span>
                    </span>
                    <ArrowUpRight className="ml-auto size-4 text-ink/30 transition-colors group-hover:text-ink" />
                  </a>
                </li>
                <li className="flex items-center gap-4 py-4">
                  <span className="grid size-9 place-items-center rounded-md border border-ink/12 bg-white/60 text-ink/70">
                    <MapPin className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-[0.14em] text-ink/40">Based in</span>
                    <span className="block text-[0.9rem] font-medium">{site.location}</span>
                  </span>
                </li>
                <li className="flex items-center gap-4 py-4">
                  <span className="grid size-9 place-items-center rounded-md border border-ink/12 bg-white/60 text-ink/70">
                    <Clock className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-[0.14em] text-ink/40">Typical reply</span>
                    <span className="block text-[0.9rem] font-medium">Within one business day</span>
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex items-center gap-2.5 text-[0.75rem] text-ink/50">
                <span className="status-dot size-1.5 rounded-full bg-[#4ea72e]" />
                {site.availability} · taking projects for the current month
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="rounded-xl border border-ink/12 bg-white/70 p-5 shadow-[0_20px_60px_-40px_rgba(11,12,14,0.4)] md:p-8">
              <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-note">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" required error={errors.name} htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={set('name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      placeholder="Your name"
                      className={cn(inputBase, errors.name ? bad : ok)}
                    />
                  </Field>

                  <Field label="Business name" htmlFor="business" hint="Optional">
                    <input
                      id="business"
                      name="business"
                      type="text"
                      autoComplete="organization"
                      value={values.business}
                      onChange={set('business')}
                      placeholder="e.g. Kasoori Restaurant"
                      className={cn(inputBase, ok)}
                    />
                  </Field>

                  <Field label="Phone number" required error={errors.phone} htmlFor="phone">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={set('phone')}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      placeholder="+91 98765 43210"
                      className={cn(inputBase, errors.phone ? bad : ok)}
                    />
                  </Field>

                  <Field label="Email address" required error={errors.email} htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={set('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="you@business.com"
                      className={cn(inputBase, errors.email ? bad : ok)}
                    />
                  </Field>

                  <Field label="Business category" required error={errors.category} htmlFor="category">
                    <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={values.category}
                      onChange={set('category')}
                      aria-invalid={!!errors.category}
                      aria-describedby={errors.category ? 'category-error' : undefined}
                      className={cn(inputBase, 'appearance-none pr-9', errors.category ? bad : ok)}
                    >
                      <option value="">Select a category</option>
                      {businessCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-ink/40" />
                    </div>
                  </Field>

                  <Field label="Website type" required error={errors.websiteType} htmlFor="websiteType">
                    <div className="relative">
                    <select
                      id="websiteType"
                      name="websiteType"
                      value={values.websiteType}
                      onChange={set('websiteType')}
                      aria-invalid={!!errors.websiteType}
                      aria-describedby={errors.websiteType ? 'websiteType-error' : undefined}
                      className={cn(inputBase, 'appearance-none pr-9', errors.websiteType ? bad : ok)}
                    >
                      <option value="">Select a type</option>
                      {websiteTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-ink/40" />
                    </div>
                  </Field>

                  <div className="sm:col-span-2" role="group" aria-labelledby="plan-label">
                    <p id="plan-label" className="mb-1.5 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-ink/50">
                      Preferred package
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {packageOptions.map((opt) => {
                        const active = values.plan === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setValues((v) => ({ ...v, plan: opt.value }))}
                            aria-pressed={active}
                            className={cn(
                              'rounded-lg border px-2.5 py-2.5 text-[0.72rem] font-medium leading-tight transition-all duration-300',
                              active
                                ? 'border-ink bg-ink text-paper'
                                : 'border-ink/15 bg-white text-ink/60 hover:border-ink/35 hover:text-ink',
                            )}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    <input type="hidden" name="plan" value={values.plan} readOnly />
                  </div>

                  <Field label="Existing website URL" htmlFor="existingUrl" hint="Optional" error={errors.existingUrl} className="sm:col-span-2">
                    <input
                      id="existingUrl"
                      name="existingUrl"
                      type="url"
                      inputMode="url"
                      value={values.existingUrl}
                      onChange={set('existingUrl')}
                      aria-invalid={!!errors.existingUrl}
                      aria-describedby={errors.existingUrl ? 'existingUrl-error' : undefined}
                      placeholder="https://yourcurrentsite.com"
                      className={cn(inputBase, errors.existingUrl ? bad : ok)}
                    />
                  </Field>

                  <Field label="Project description" required error={errors.message} htmlFor="message" className="sm:col-span-2">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={set('message')}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      placeholder="What does your business do, and what do you need the website to achieve?"
                      className={cn(inputBase, 'resize-y', errors.message ? bad : ok)}
                    />
                  </Field>

                  <input
                    type="text"
                    name="company_website"
                    value={values.company_website}
                    onChange={set('company_website')}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                  />
                </div>

                <button type="submit" disabled={status === 'sending'} className="btn btn-primary mt-6 w-full">
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending enquiry…
                    </>
                  ) : (
                    <>
                      Send my enquiry
                      <ArrowUpRight className="size-4" />
                    </>
                  )}
                </button>

                <p id="form-note" className="mt-3 text-center text-[0.66rem] leading-relaxed text-ink/40">
                  {endpoint
                    ? 'Your details are sent securely to our enquiry inbox.'
                    : 'Your details are formatted into a WhatsApp message and opened in a new tab — nothing is sent until you press send in WhatsApp.'}
                </p>

                <div aria-live="polite" className="mt-4">
                  {status === 'success' && (
                    <div className="flex items-start gap-2.5 rounded-lg border border-emerald-600/25 bg-emerald-50 px-3.5 py-3 text-[0.78rem] text-emerald-900">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                      Enquiry received. We&apos;ll reply within one business day.
                    </div>
                  )}
                  {status === 'whatsapp' && (
                    <div className="rounded-lg border border-ink/15 bg-ink/[0.04] px-3.5 py-3 text-[0.78rem] text-ink/70">
                      <p className="font-medium text-ink">
                        WhatsApp opened with your enquiry — press send there to deliver it.
                      </p>
                      <p className="mt-1">
                        Nothing was submitted automatically.{' '}
                        <a href={waLink} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
                          Reopen WhatsApp
                        </a>{' '}
                        or call{' '}
                        <a href={`tel:${site.phoneRaw}`} className="font-semibold underline underline-offset-2">
                          {site.phone}
                        </a>
                        .
                      </p>
                    </div>
                  )}
                  {serverError && (
                    <div className="flex items-start gap-2.5 rounded-lg border border-amber-600/30 bg-amber-50 px-3.5 py-3 text-[0.78rem] text-amber-900">
                      <AlertCircle className="mt-0.5 size-4 shrink-0" />
                      {serverError}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-ink/50">
        {label}
        {required && <span className="text-ink/30">*</span>}
        {hint && <span className="ml-1 font-normal normal-case tracking-normal text-ink/30">({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-[0.7rem] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
