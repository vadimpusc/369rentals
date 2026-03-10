<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import site from '../data/site.json';
  import { setDynamicSchema, siteUrl } from '../components/seo.js';
  import { findItem, labelFor, itemPath } from '../lib/inventory.js';

  export let kind = 'cameras';
  export let slug = '';

  $: item = findItem(kind, slug);
  $: activePath = `/${kind}/`;

  onMount(() => {
    if (!item) return;

    setDynamicSchema({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: item.name,
      description: item.description,
      image: [siteUrl(item.image)],
      brand: { '@type': 'Brand', name: item.brand || site.name },
      category: labelFor(kind),
      url: siteUrl(itemPath(kind, item.slug)),
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        url: siteUrl('/contact/')
      }
    });
  });
</script>

<Layout active={activePath} title={site.name} subtitle="Rental">
  {#if !item}
    <section class="missing card">
      <h1>Item not found</h1>
      <p class="small">This product page could not be loaded. Please browse the inventory and try again.</p>
      <div class="actions">
        <a class="ctaGhost" href={activePath}>Back to {labelFor(kind)}</a>
        <a class="ctaBtn" href="/contact/">Contact us</a>
      </div>
    </section>
  {:else}
    <section class="hero">
      <div class="image card">
        <img src={item.image} alt={item.name} />
      </div>

      <div class="info">
        <div class="kicker">{labelFor(kind)}</div>
        <h1>{item.name}</h1>
        <p class="small">{item.summary}</p>

        <div class="actions">
          <a class="ctaBtn" href="/contact/">Contact for pricing</a>
          <a class="ctaGhost" href={activePath}>Back to {labelFor(kind)}</a>
        </div>

        <div class="meta">
          {#if item.type}<span class="pill">{item.type}</span>{/if}
          {#if item.group}<span class="pill">{item.group}</span>{/if}
          {#if item.brand}<span class="pill">{item.brand}</span>{/if}
        </div>
      </div>
    </section>

    <section class="content">
      <div class="block">
        <h2>Product description</h2>
        <p class="small">{item.description}</p>
      </div>

      <div class="block">
        <h2>Kit includes</h2>
        <ul>
          {#each item.kitIncludes || [] as k}
            <li>{k}</li>
          {/each}
        </ul>
      </div>

      <div class="block">
        <h2>Specifications</h2>
        <dl class="specs">
          {#each Object.entries(item.specs || {}) as [k, v]}
            <div class="row">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          {/each}
        </dl>
      </div>
    </section>
  {/if}
</Layout>

<style>
  .missing{padding:18px;}
  .actions{display:flex; gap:12px; flex-wrap:wrap; margin-top:12px;}

  .hero{display:grid; grid-template-columns: 1.15fr 0.85fr; gap:18px; align-items:start; margin-top:6px;}
  .image{overflow:hidden; border-radius:18px;}

  .info{padding-top:8px;}

  .meta{display:flex; flex-wrap:wrap; gap:10px; margin-top:14px;}

  .content{margin-top:26px; display:grid; gap:18px;}
  .block{padding:18px; border-radius:18px; border:1px solid color-mix(in srgb, var(--muted) 18%, transparent); background:var(--panel);}

  ul{margin:0; padding-left:18px;}
  li{margin:0 0 10px 0; color:color-mix(in srgb, var(--text) 86%, var(--muted));}

  .specs{margin:0;}
  .row{display:flex; justify-content:space-between; gap:18px; padding:10px 0; border-top:1px solid color-mix(in srgb, var(--muted) 16%, transparent);}
  .row:first-child{border-top:0; padding-top:0;}
  dt{font-weight:560; color:color-mix(in srgb, var(--text) 86%, var(--muted));}
  dd{margin:0; color:var(--muted); text-align:right;}

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

  @media(max-width: 980px){
    .hero{grid-template-columns:1fr;}
  }

  @media(max-width: 520px){
    dd{text-align:left;}
    .row{flex-direction:column; gap:6px;}
  }
</style>
