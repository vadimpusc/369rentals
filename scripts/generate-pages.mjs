import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function readJson(relPath) {
  const p = path.join(ROOT, relPath);
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

const site = readJson('src/data/site.json');
const cameras = readJson('src/data/cameras.json');
const lenses = readJson('src/data/lenses.json');
const accessories = readJson('src/data/accessories.json');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function kebab(x) {
  return String(x || '')
    .trim()
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function absUrl(p) {
  const base = String(site.baseUrl || '').replace(/\/$/, '');
  const rel = String(p || '/');
  return base + (rel.startsWith('/') ? rel : '/' + rel);
}

function baseSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: site.name,
        url: absUrl('/')
      },
      {
        '@type': 'Organization',
        name: site.legalName || site.name,
        url: absUrl('/'),
        email: site.email,
        telephone: site.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.location?.address,
          addressLocality: site.location?.locality,
          addressRegion: site.location?.region,
          postalCode: site.location?.postalCode,
          addressCountry: site.location?.country
        },
        sameAs: [site.social?.instagram, site.social?.vimeo, site.social?.imdb].filter(Boolean)
      }
    ]
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderHtml({ pagePath, entry, title, description, props = {}, ogImage = '/placeholders/camera-1.svg' }) {
  const canonical = absUrl(pagePath);
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;

  const schema = baseSchemaGraph();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(fullTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(absUrl(ogImage))}" />

    <meta name="twitter:card" content="summary_large_image" />

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

    <script>
      (function () {
        try {
          var t = localStorage.getItem('theme');
          if (!t) {
            t = 'dark';
          }
          document.documentElement.setAttribute('data-theme', t);
        } catch (e) {}
      })();
    </script>

    <script type="application/ld+json" id="schema-static">${JSON.stringify(schema)}</script>
    <script type="application/ld+json" id="schema-dynamic"></script>

    <script>
      window.__PAGE_PROPS__ = ${JSON.stringify(props)};
    </script>
  </head>

  <body>
    <div id="app"></div>
    <script type="module" src="/src/entries/${entry}.js"></script>
  </body>
</html>`;
}

function cleanOldGenerated() {
  const dirs = ['cameras', 'lenses', 'accessories', 'how-to-hire', 'about', 'contact'];
  for (const d of dirs) {
    const full = path.join(ROOT, d);
    if (fs.existsSync(full)) fs.rmSync(full, { recursive: true, force: true });
  }
}

function generateStaticPages() {
  writeFile(
    path.join(ROOT, 'index.html'),
    renderHtml({ pagePath: '/', entry: 'home', title: `${site.name} Rentals`, description: site.tagline, props: {} })
  );

  writeFile(
    path.join(ROOT, 'about/index.html'),
    renderHtml({
      pagePath: '/about/',
      entry: 'about',
      title: 'About',
      description: `About ${site.name}. Boutique rental for cameras, lenses, and accessories.`,
      props: {}
    })
  );

  writeFile(
    path.join(ROOT, 'how-to-hire/index.html'),
    renderHtml({
      pagePath: '/how-to-hire/',
      entry: 'howToHire',
      title: 'How to Hire',
      description: `How to hire cameras, lenses, and accessories from ${site.name}.`,
      props: {}
    })
  );

  writeFile(
    path.join(ROOT, 'contact/index.html'),
    renderHtml({
      pagePath: '/contact/',
      entry: 'contact',
      title: 'Contact',
      description: `Contact ${site.name} for availability, quotes, and package pricing.`,
      props: {}
    })
  );

  writeFile(
    path.join(ROOT, 'cameras/index.html'),
    renderHtml({
      pagePath: '/cameras/',
      entry: 'listing',
      title: 'Cameras',
      description: 'Cinema camera bodies and production-ready kits available for rental.',
      props: {
        kind: 'cameras',
        title: 'Cameras',
        description: 'Cinema camera bodies and production ready kits. Contact for availability and pricing.',
        pills: ['No lighting rental', 'Package friendly']
      },
      ogImage: cameras[0]?.image || '/placeholders/camera-1.svg'
    })
  );

  writeFile(
    path.join(ROOT, 'lenses/index.html'),
    renderHtml({
      pagePath: '/lenses/',
      entry: 'listing',
      title: 'Lenses',
      description: 'Lens sets across anamorphic, spherical, and zoom.',
      props: {
        kind: 'lenses',
        title: 'Lenses',
        description: 'Anamorphic, spherical, zoom, and specialist glass. Each listing links to a full spec and kit contents page.',
        pills: ['PL mount options', 'Matched sets']
      },
      ogImage: lenses[0]?.image || '/placeholders/lens-1.svg'
    })
  );

  writeFile(
    path.join(ROOT, 'accessories/index.html'),
    renderHtml({
      pagePath: '/accessories/',
      entry: 'listing',
      title: 'Accessories',
      description: 'Focus, monitoring, matte boxes, filters, and grip accessories.',
      props: {
        kind: 'accessories',
        title: 'Accessories',
        description: 'Focus, monitoring, matte boxes, filters and diopters, and grip support. No lighting rental.',
        pills: ['Rig ready', 'Clean cases']
      },
      ogImage: accessories[0]?.image || '/placeholders/acc-1.svg'
    })
  );

  const lensCats = ['Anamorphic', 'Spherical', 'Zoom', 'Specials', 'Super 16'];
  for (const c of lensCats) {
    const slug = kebab(c);
    const filtered = lenses.filter((x) => String(x.type || '').toLowerCase() === c.toLowerCase());
    writeFile(
      path.join(ROOT, `lenses/${slug}/index.html`),
      renderHtml({
        pagePath: `/lenses/${slug}/`,
        entry: 'listing',
        title: `Lenses: ${c}`,
        description: `${c} lenses available for rental.`,
        props: {
          kind: 'lenses',
          filter: c,
          title: `${c} Lenses`,
          description: `${c} lens options available for rental. Each item page includes kit contents and specifications.`,
          pills: ['Contact for pricing']
        },
        ogImage: filtered[0]?.image || lenses[0]?.image || '/placeholders/lens-1.svg'
      })
    );
  }

  const accCats = ['Focus', 'Monitoring', 'Matte Boxes', 'Filters + Diopters', 'Grip', 'Other'];
  for (const c of accCats) {
    const slug = kebab(c);
    const filtered = accessories.filter((x) => String(x.group || '').toLowerCase() === c.toLowerCase());
    writeFile(
      path.join(ROOT, `accessories/${slug}/index.html`),
      renderHtml({
        pagePath: `/accessories/${slug}/`,
        entry: 'listing',
        title: `Accessories: ${c}`,
        description: `${c} accessories available for rental.`,
        props: {
          kind: 'accessories',
          filter: c,
          title: `${c}`,
          description: `${c} accessories for camera teams. Each item page includes kit contents and specifications.`,
          pills: ['No lighting rental']
        },
        ogImage: filtered[0]?.image || accessories[0]?.image || '/placeholders/acc-1.svg'
      })
    );
  }
}

function generateItemPages() {
  const sets = [
    { kind: 'cameras', items: cameras },
    { kind: 'lenses', items: lenses },
    { kind: 'accessories', items: accessories }
  ];

  for (const set of sets) {
    for (const it of set.items) {
      writeFile(
        path.join(ROOT, `${set.kind}/${it.slug}/index.html`),
        renderHtml({
          pagePath: `/${set.kind}/${it.slug}/`,
          entry: 'item',
          title: it.name,
          description: it.summary || it.description || `Rental item: ${it.name}.`,
          props: { kind: set.kind, slug: it.slug },
          ogImage: it.image || '/placeholders/camera-1.svg'
        })
      );
    }
  }
}

function generateRobotsAndSitemap() {
  const routes = [];

  routes.push('/', '/about/', '/how-to-hire/', '/contact/', '/cameras/', '/lenses/', '/accessories/');

  for (const c of ['anamorphic', 'spherical', 'zoom', 'specials', 'super-16']) routes.push(`/lenses/${c}/`);
  for (const c of ['focus', 'monitoring', 'matte-boxes', 'filters-diopters', 'grip', 'other']) routes.push(`/accessories/${c}/`);

  for (const it of cameras) routes.push(`/cameras/${it.slug}/`);
  for (const it of lenses) routes.push(`/lenses/${it.slug}/`);
  for (const it of accessories) routes.push(`/accessories/${it.slug}/`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes.map((p) => `  <url><loc>${escapeHtml(absUrl(p))}</loc></url>`).join('\n') +
    `\n</urlset>\n`;

  ensureDir(path.join(ROOT, 'public'));
  writeFile(path.join(ROOT, 'public/sitemap.xml'), xml);

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${absUrl('/sitemap.xml')}\n`;
  writeFile(path.join(ROOT, 'public/robots.txt'), robots);
}

cleanOldGenerated();
generateStaticPages();
generateItemPages();
generateRobotsAndSitemap();

console.log('Generated pages, sitemap.xml, and robots.txt');
