<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import site from '../data/site.json';
  import { setDynamicSchema, siteUrl } from '../components/seo.js';

  onMount(() => {
    setDynamicSchema({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `About | ${site.name}`,
      url: siteUrl('/about/'),
      description: `About ${site.name}, a boutique rental house focused on cameras, lenses, and accessories.`
    });
  });
</script>

<Layout active="/about/" title={site.name} subtitle="Rental">
  <section class="top">
    <!-- <div class="kicker">About</div> -->
    <h1>Built for crews who like clean kits and calm days.</h1>
    <p class="lead">San Roku Ku Rentals is a boutique inventory for camera teams. We focus on cameras, lenses, and accessories only. No lighting rental. Everything is checked, labeled, and packed so you can spend your time shooting, not troubleshooting.</p>
  </section>

  <section class="grid cols2">
    <div class="card pad">
      <h2>What we do</h2>
      <ul>
        <li>Camera bodies and production ready kits</li>
        <li>Lens sets across anamorphic, spherical, and zoom</li>
        <li>Accessories for focus, monitoring, matte boxes, and filters</li>
        <li>Prep and build support for your workflow</li>
      </ul>
    </div>

    <div class="card pad">
      <h2>How we work</h2>
      <p class="small">Send dates and a wish list. We confirm availability, suggest options, and send a quote. Multi day pricing is available, and we can tailor kits around your camera team and shooting style.</p>
      <div class="meta">
        <span class="pill">Fast quotes</span>
        <span class="pill">Prep included</span>
        <span class="pill">Package friendly</span>
      </div>
    </div>
  </section>

  <section class="card pad location">
    <div>
      <h2>Location</h2>
      <p class="small">Visits by appointment only. Contact us to book a test, prep day, or collection slot.</p>

      <div class="addr">
        <div>{site.location.address}</div>
        <div>{site.location.locality}, {site.location.region}</div>
        <div>{site.location.postalCode}, {site.location.country}</div>
      </div>

      <div class="actions">
        <a class="ctaBtn" href="/contact/">Get in touch</a>
        <a class="ctaGhost" href="/how-to-hire/">How to hire</a>
      </div>
    </div>

    <div class="art" aria-hidden="true">
      <img src="/placeholders/acc-5.svg" alt="" />
    </div>
  </section>
</Layout>

<style>
  .top{padding:6px 0 18px;}
  .lead{font-size:18px; color:color-mix(in srgb, var(--text) 84%, var(--muted)); max-width:70ch;}

  .pad{padding:18px;}

  ul{margin:12px 0 0; padding-left:18px;}
  li{margin:0 0 10px 0; color:color-mix(in srgb, var(--text) 86%, var(--muted));}

  .meta{display:flex; flex-wrap:wrap; gap:10px; margin-top:14px;}

  .location{margin-top:18px; display:grid; grid-template-columns:1.2fr 0.8fr; gap:16px; align-items:stretch; overflow:hidden;}
  .art{border-radius:16px; overflow:hidden; border:1px solid color-mix(in srgb, var(--muted) 14%, transparent);}

  .addr{margin-top:12px; color:var(--muted);}

  .actions{display:flex; gap:12px; flex-wrap:wrap; margin-top:14px;}

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
    .location{grid-template-columns:1fr;}
  }
</style>
