<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import site from '../data/site.json';
  import { setDynamicSchema, siteUrl } from '../components/seo.js';
  import { filterItems, labelFor, itemPath } from '../lib/inventory.js';

  export let kind = 'cameras';
  export let filter = '';
  export let title = '';
  export let description = '';
  export let pills = [];

  $: heading = title || labelFor(kind);
  $: items = filterItems(kind, filter);
  $: activePath = `/${kind}/`;

  const lensFilters = [
    { label: 'All', href: '/lenses/' },
    { label: 'Anamorphic', href: '/lenses/anamorphic/' },
    { label: 'Spherical', href: '/lenses/spherical/' },
    { label: 'Zoom', href: '/lenses/zoom/' },
    { label: 'Specials', href: '/lenses/specials/' },
    { label: 'Super 16', href: '/lenses/super-16/' }
  ];

  const accFilters = [
    { label: 'All', href: '/accessories/' },
    { label: 'Focus', href: '/accessories/focus/' },
    { label: 'Monitoring', href: '/accessories/monitoring/' },
    { label: 'Matte Boxes', href: '/accessories/matte-boxes/' },
    { label: 'Filters + Diopters', href: '/accessories/filters-diopters/' },
    { label: 'Grip', href: '/accessories/grip/' },
    { label: 'Other', href: '/accessories/other/' }
  ];

  $: filters = kind === 'lenses' ? lensFilters : kind === 'accessories' ? accFilters : [];

  onMount(() => {
    const pageDesc = description || `${heading} available for rental. Contact for availability and pricing.`;

    setDynamicSchema({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${heading} | ${site.name}`,
      url: siteUrl(activePath + (filter ? filter.toLowerCase().replace(/\s+/g, '-') + '/' : '')),
      description: pageDesc,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: items.slice(0, 24).map((it, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: siteUrl(itemPath(kind, it.slug)),
          name: it.name
        }))
      }
    });
  });
</script>

<Layout active={activePath} title={site.name} subtitle="Rental">
  <section class="top">
    <div>
      <div class="kicker">Inventory</div>
      <h1>{heading}</h1>
      <p class="small">{description || 'All items are shown as static pages. Each product includes kit contents and specifications.'}</p>
    </div>

    <div class="topRight">
      {#if pills && pills.length}
        <div class="pills">
          {#each pills as p}
            <span class="pill">{p}</span>
          {/each}
        </div>
      {/if}

      <div class="actions">
        <a class="ctaGhost" href="/contact/">Contact for pricing</a>
      </div>
    </div>
  </section>

  {#if filters.length}
    <div class="filterRow">
      {#each filters as f}
        <a class="pill" class:active={f.href === activePath + (filter ? filter.toLowerCase().replace(/\s+/g,'-') + '/' : '')} href={f.href}>{f.label}</a>
      {/each}
    </div>
  {/if}

  <section class="grid cols3">
    {#each items as item}
      <a class="card tile" href={itemPath(kind, item.slug)}>
        <div class="thumb">
          <img src={item.image} alt={item.name} loading="lazy" />
        </div>
        <div class="body">
          <div class="title">{item.name}</div>
          <div class="small">{item.summary}</div>
        </div>
      </a>
    {/each}
  </section>

  <!-- <section class="note card">
    <div class="noteInner">
      <div>
        <div class="kicker">Notes</div>
        <p class="small">We do not offer lighting rental. If you need a package built around a specific camera body or lens set, send your wish list and we will propose the cleanest option.</p>
      </div>
      <a class="ctaBtn" href="/contact/">Request availability</a>
    </div>
  </section> -->
</Layout>

<style>
  .top{display:flex; justify-content:space-between; align-items:flex-end; gap:18px; flex-wrap:wrap; padding:6px 0 18px;}
  .topRight{display:flex; flex-direction:column; align-items:flex-end; gap:10px;}
  .pills{display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end;}

  .filterRow{display:flex; gap:10px; flex-wrap:wrap; margin:10px 0 18px;}

  .tile{padding:14px; display:flex; flex-direction:column; gap:12px; overflow:hidden;}
  .thumb{border-radius:14px; overflow:hidden; border:1px solid color-mix(in srgb, var(--muted) 14%, transparent);}
  .body{display:flex; flex-direction:column; gap:6px;}
  .title{font-weight:620; letter-spacing:-0.01em;}

  .note{margin-top:26px; padding:18px;}
  .noteInner{display:flex; justify-content:space-between; align-items:center; gap:18px; flex-wrap:wrap;}

  .ctaBtn{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    height:44px;
    padding:0 18px;
    border-radius:999px;
    background:var(--accent);
    color:#050505;
    font-weight:650;
    letter-spacing:0.06em;
    text-transform:uppercase;
    font-size:12px;
  }

  .ctaGhost{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    height:44px;
    padding:0 18px;
    border-radius:999px;
    border:1px solid color-mix(in srgb, var(--muted) 22%, transparent);
    color:var(--text);
    font-weight:520;
    letter-spacing:0.06em;
    text-transform:uppercase;
    font-size:12px;
  }

  @media(max-width: 520px){
    .topRight{align-items:flex-start;}
  }
</style>
