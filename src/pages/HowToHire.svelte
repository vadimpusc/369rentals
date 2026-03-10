<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import site from '../data/site.json';
  import { setDynamicSchema, siteUrl } from '../components/seo.js';

  onMount(() => {
    setDynamicSchema({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `How to hire | ${site.name}`,
      url: siteUrl('/how-to-hire/'),
      description: `How to hire cameras, lenses, and accessories from ${site.name}.`
    });
  });
</script>

<Layout active="/how-to-hire/" title={site.name} subtitle="Rental">
  <section class="hero card">
    <div class="inner">
      <div class="kicker">How to hire</div>
      <h1>Simple, practical, and crew friendly.</h1>
      <p class="lead">If you have not hired from us before, do not worry. Send a short email with your dates and wish list. We will reply with availability, options, and a clean quote.</p>

      <div class="steps">
        <div class="step">
          <div class="num">1</div>
          <div>
            <h2>Send an enquiry</h2>
            <p class="small">Email <a class="accent" href={`mailto:${site.email}`}>{site.email}</a> with shoot dates, locations, and the items you want. If you are unsure, tell us the camera, sensor size, and delivery needs.</p>
          </div>
        </div>

        <div class="step">
          <div class="num">2</div>
          <div>
            <h2>Confirm production details</h2>
            <p class="small">We may ask for billing info, a point of contact, and proof of insurance that covers rented equipment. If you need help picking coverage, ask and we will point you to common options.</p>
          </div>
        </div>

        <div class="step">
          <div class="num">3</div>
          <div>
            <h2>Prep and collection</h2>
            <p class="small">Book a prep session if you want to build and test. Otherwise, we prep in house and pack the kit ready to go. Collection and returns are by appointment.</p>
          </div>
        </div>

        <div class="step">
          <div class="num">4</div>
          <div>
            <h2>Shoot support</h2>
            <p class="small">If something is not behaving, call us. We keep spares and practical alternatives so you can keep rolling.</p>
          </div>
        </div>
      </div>

      <div class="cta">
        <a class="ctaBtn" href="/contact/">Start a rental</a>
        <a class="ctaGhost" href="/cameras/">Browse cameras</a>
      </div>

      <div class="fine">We do not offer lighting rental. Cameras, lenses, and accessories only.</div>
    </div>
  </section>
</Layout>

<style>
  .hero{padding:28px;}
  .inner{max-width:860px;}
  .lead{font-size:18px; color:color-mix(in srgb, var(--text) 84%, var(--muted));}

  .steps{margin-top:18px; display:flex; flex-direction:column; gap:14px;}
  .step{display:flex; gap:14px; padding-top:14px; border-top:1px solid color-mix(in srgb, var(--muted) 18%, transparent);}
  .step:first-child{border-top:0; padding-top:0;}

  .num{width:34px; height:34px; border-radius:12px; display:grid; place-items:center; font-weight:650; background:color-mix(in srgb, var(--accent) 28%, transparent); color:var(--text); border:1px solid color-mix(in srgb, var(--accent) 45%, transparent);}

  .cta{display:flex; gap:12px; flex-wrap:wrap; margin-top:18px;}

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

  .accent{color:var(--accent);}
  .fine{margin-top:14px; font-size:14px; color:var(--muted);}
</style>
