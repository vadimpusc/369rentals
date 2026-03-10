<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import site from '../data/site.json';
  import { setDynamicSchema, siteUrl } from '../components/seo.js';
  import { allFor, itemPath } from '../lib/inventory.js';

  const cameras = allFor('cameras').slice(0, 2);
  const lenses = allFor('lenses').slice(0, 2);
  const accessories = allFor('accessories').slice(0, 2);

  onMount(() => {
    setDynamicSchema({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${site.name} | Rental`,
      url: siteUrl('/'),
      description: site.tagline,
      isPartOf: {
        '@type': 'WebSite',
        name: site.name,
        url: siteUrl('/')
      }
    });
  });
</script>

<Layout active="/" title={site.name} subtitle="Camera Rental">
  <section class="hero">
    <div class="heroText">
      <div class="kicker">London based rental</div>
      <h1>Camera, lens, and accessories rental that stays out of your way.</h1>
      <p class="lead">{site.tagline} No lighting rental. Fast quotes, clean kits, and practical packages built for real shoots.</p>
      <div class="cta">
        <a class="ctaBtn" href="/contact/">Request availability</a>
        <a class="ctaGhost" href="/how-to-hire/">How to hire</a>
      </div>
      <div class="meta">
        <span class="pill">Prep included</span>
        <span class="pill">Multi day rates</span>
        <span class="pill">Delivery options</span>
      </div>
    </div>

    <div class="heroArt" aria-hidden="true">
      <div class="orb">
        <img src="/placeholders/camera-1.svg" alt="" />
      </div>
    </div>
  </section>

  <section class="section">
    <div class="sectionTop">
      <h2>Browse inventory</h2>
      <!-- <div class="small">Local FREE delivery.</div> -->
    </div>

    <div class="grid cols3">
      <a class="cat card" href="/cameras/">
        <div class="catTop">
          <div class="pill">Cameras</div>
          <div class="small">Bodies and ready kits</div>
        </div>
        <img class="catImg" src="/placeholders/camera-2.svg" alt="" />
      </a>

      <a class="cat card" href="/lenses/">
        <div class="catTop">
          <div class="pill">Lenses</div>
          <div class="small">Anamorphic, spherical, zoom</div>
        </div>
        <img class="catImg" src="/placeholders/lens-1.svg" alt="" />
      </a>

      <a class="cat card" href="/accessories/">
        <div class="catTop">
          <div class="pill">Accessories</div>
          <div class="small">Focus, monitoring, matte boxes</div>
        </div>
        <img class="catImg" src="/placeholders/acc-2.svg" alt="" />
      </a>
    </div>
  </section>

  <section class="section">
    <div class="sectionTop">
      <h2>Featured kits</h2>
      <div class="small">A few examples. Contact us for a full quote and package options.</div>
    </div>

    <div class="grid cols3">
      {#each [...cameras, ...lenses, ...accessories] as item}
        <a class="tile card" href={itemPath(item.category.toLowerCase(), item.slug)}>
          <div class="thumb">
            <img src={item.image} alt={item.name} loading="lazy" />
          </div>
          <div class="tileBody">
            <div class="tileTitle">{item.name}</div>
            <div class="small">{item.summary}</div>
          </div>
        </a>
      {/each}
    </div>
  </section>

  <section class="section callout card">
    <div class="calloutInner">
      <div>
        <div class="kicker">Fast onboarding</div>
        <h2>New client? We keep it simple.</h2>
        <p class="small">Share your shoot dates, locations, and wish list. We will confirm availability, propose a package, and send a clean quote.</p>
      </div>
      <a class="ctaBtn" href="/contact/">Start a rental</a>
    </div>
  </section>
</Layout>

<style>
  .hero{display:grid; gap:26px; align-items:center; grid-template-columns: 1.25fr 0.75fr; padding:14px 0 8px;}
  .lead{font-size:18px; color:color-mix(in srgb, var(--text) 80%, var(--muted)); max-width:64ch;}
  .cta{display:flex; gap:12px; flex-wrap:wrap; margin-top:16px;}

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

  .meta{display:flex; flex-wrap:wrap; gap:10px; margin-top:16px;}

  .heroArt{display:flex; justify-content:flex-end;}
  .orb{width:min(360px, 100%); border-radius:30px; overflow:hidden; border:1px solid color-mix(in srgb, var(--muted) 18%, transparent);}

  .section{margin-top:34px;}
  .sectionTop{display:flex; align-items:baseline; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:16px;}

  .cat{overflow:hidden; padding:14px; display:flex; flex-direction:column; gap:12px;}
  .catTop{display:flex; flex-direction:column; gap:6px;}
  .catImg{border-radius:14px; border:1px solid color-mix(in srgb, var(--muted) 14%, transparent);}

  .tile{overflow:hidden; padding:14px; display:flex; flex-direction:column; gap:12px;}
  .thumb{border-radius:14px; overflow:hidden; border:1px solid color-mix(in srgb, var(--muted) 14%, transparent);}
  .tileBody{display:flex; flex-direction:column; gap:6px;}
  .tileTitle{font-weight:620; letter-spacing:-0.01em;}

  .callout{margin-top:40px; padding:20px;}
  .calloutInner{display:flex; align-items:center; justify-content:space-between; gap:18px; flex-wrap:wrap;}

  @media(max-width: 980px){
    .hero{grid-template-columns:1fr;}
    .heroArt{justify-content:flex-start;}
  }
</style>
