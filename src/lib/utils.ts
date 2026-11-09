/** Resolve public asset paths against the configured Vite base path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export const formatINR = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export const scrollToId = (hash: string) => {
  const el = document.getElementById(hash.replace('#', ''));
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
