/** Prefix a public asset path with the deployment base (e.g. GitHub Pages sub-path). */
export const asset = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
