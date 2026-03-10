<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import site from '../data/site.json';
  import { setDynamicSchema, siteUrl } from '../components/seo.js';

  let firstName = '';
  let lastName = '';
  let email = '';
  let subject = '';
  let message = '';

  $: mailto = `mailto:${encodeURIComponent(site.email)}?subject=${encodeURIComponent(subject || 'Rental enquiry')}&body=${encodeURIComponent(
    `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}\n\n---\nSent from ${site.name}`
  )}`;

  onMount(() => {
    setDynamicSchema({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `Contact | ${site.name}`,
      url: siteUrl('/contact/'),
      description: `Contact ${site.name} for availability, quotes, and package pricing.`
    });
  });
</script>

<Layout active="/contact/" title={site.name} subtitle="Rental">
  <section class="top">
    <div>
      <!-- <div class="kicker">Contact</div> -->
      <h1>Request availability and pricing.</h1>
      <p class="small">Share dates, locations, and a short wish list. We will confirm availability and propose a clean package. Visits are by appointment only.</p>
    </div>
  </section>

  <section class="grid cols2">
    <div class="card pad">
      <!-- <h2>Direct</h2> -->
      <div class="lines">
        <div class="line"><span class="lbl">Email</span> <a class="accent" href={`mailto:${site.email}`}>{site.email}</a></div>
        <!-- <div class="line"><span class="lbl">Phone</span> {site.phone}</div> -->
        <div class="line"><span class="lbl">Address</span> {site.location.locality} {site.location.postalCode}</div>
      </div>

      <div class="note">
        <div class="small">No lighting rental. Cameras, lenses, and accessories only.</div>
      </div>
    </div>

  </section>
</Layout>

<style>


  .top{padding:6px 0 18px;}
  .pad{padding:18px;}

  .lines{display:flex; flex-direction:column; gap:10px; margin-top:12px;}
  .line{color:color-mix(in srgb, var(--text) 86%, var(--muted));}
  .lbl{display:inline-block; min-width:76px; color:var(--muted);}

  .note{margin-top:14px; padding-top:14px; border-top:1px solid color-mix(in srgb, var(--muted) 18%, transparent);}

  .form{margin-top:12px; display:flex; flex-direction:column; gap:12px;}
  label{display:flex; flex-direction:column; gap:6px;}
  label span{font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted);}

  input, textarea{
    background:transparent;
    border:1px solid color-mix(in srgb, var(--muted) 22%, transparent);
    border-radius:14px;
    padding:12px 12px;
    color:var(--text);
    font:inherit;
  }


  textarea{resize:vertical;}

  .row{display:grid; grid-template-columns:1fr 1fr; gap:10px;}

  .actions{display:flex; gap:12px; flex-wrap:wrap; margin-top:6px; align-items:center;}

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
    border:0;
    cursor:pointer;
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

  @media(max-width: 520px){
    .row{grid-template-columns:1fr;}
  }
</style>
