/** Prepend the configured base URL to an internal path. */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return path === '/' ? `${base}/` : `${base}${path}`;
}
