import site from '../data/site.json';

export function setDynamicSchema(obj) {
  const el = document.getElementById('schema-dynamic');
  if (!el) return;
  try {
    el.textContent = JSON.stringify(obj, null, 2);
  } catch {
    el.textContent = '';
  }
}

export function siteUrl(pathname) {
  const base = (site.baseUrl || '').replace(/\/$/, '');
  const path = String(pathname || '/');
  return base + (path.startsWith('/') ? path : '/' + path);
}
