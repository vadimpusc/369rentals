import cameras from '../data/cameras.json';
import lenses from '../data/lenses.json';
import accessories from '../data/accessories.json';

/** @typedef {'cameras'|'lenses'|'accessories'} Kind */

export function allFor(kind) {
  if (kind === 'cameras') return cameras;
  if (kind === 'lenses') return lenses;
  if (kind === 'accessories') return accessories;
  return [];
}

export function labelFor(kind) {
  return kind === 'cameras' ? 'Cameras' : kind === 'lenses' ? 'Lenses' : 'Accessories';
}

export function itemPath(kind, slug) {
  return `/${kind}/${slug}/`;
}

export function findItem(kind, slug) {
  return allFor(kind).find((x) => x.slug === slug);
}

export function filterItems(kind, filter) {
  const items = allFor(kind);
  if (!filter) return items;

  if (kind === 'lenses') {
    return items.filter((x) => String(x.type || '').toLowerCase() === String(filter).toLowerCase());
  }

  if (kind === 'accessories') {
    return items.filter((x) => String(x.group || '').toLowerCase() === String(filter).toLowerCase());
  }

  return items;
}
