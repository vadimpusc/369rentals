<script>
  import { onMount, onDestroy } from "svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
  import site from "../data/site.json";

  export let active = "";
  export let title = site.name;
  export let subtitle = "Camera, lens, and accessories rental";

  let open = false;
  let openDropdown = ""; // label of the open desktop dropdown (touch + click)
  let hoverCapable = false;

  const nav = [
    { label: "Home", href: "/" },
    {
      label: "Cameras",
      href: "/cameras/",
      children: []
    },
    {
      label: "Lenses",
      href: "/lenses/",
      children: [
        { label: "Anamorphic", href: "/lenses/anamorphic/" },
        { label: "Spherical", href: "/lenses/spherical/" },
        { label: "Zoom", href: "/lenses/zoom/" },
        { label: "Specials", href: "/lenses/specials/" },
        { label: "Super 16", href: "/lenses/super-16/" }
      ]
    },
    {
      label: "Accessories",
      href: "/accessories/",
      children: [
        { label: "Focus", href: "/accessories/focus/" },
        { label: "Monitoring", href: "/accessories/monitoring/" },
        { label: "Matte Boxes", href: "/accessories/matte-boxes/" },
        { label: "Filters + Diopters", href: "/accessories/filters-diopters/" },
        { label: "Grip", href: "/accessories/grip/" },
        { label: "Other", href: "/accessories/other/" }
      ]
    },
    { label: "How to Hire", href: "/how-to-hire/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" }
  ];

  function toggleDrawer() {
    open = !open;
  }

  function closeDrawer() {
    open = false;
  }

  function toggleDropdown(label) {
    openDropdown = openDropdown === label ? "" : label;
  }

  function setDropdown(label) {
    openDropdown = label;
  }

  function closeDropdown() {
    openDropdown = "";
  }

  function clickOutside(e) {
    const target = e.target;
    if (!(target instanceof Node)) return;

    const header = document.querySelector(".topbar");
    if (!header) return;

    if (!header.contains(target)) {
      closeDropdown();
    }
  }

  function onKey(e) {
    if (e.key === "Escape") {
      closeDropdown();
      closeDrawer();
    }
  }

  onMount(() => {
    // Only enable hover-open behaviour on devices that actually support hover.
    hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    document.addEventListener("click", clickOutside, true);
    document.addEventListener("keydown", onKey);
  });

  onDestroy(() => {
    document.removeEventListener("click", clickOutside, true);
    document.removeEventListener("keydown", onKey);
  });
</script>

<div class="shell">
  <header class="topbar">
    <a class="brand" href="/" aria-label="Home" on:click={closeDropdown}>
      <div class="brandTitle">{title}</div>
      <div class="brandSub">{subtitle}</div>
    </a>

    <nav class="nav" aria-label="Primary">
      {#each nav as item}
        {#if item.children && item.children.length}
          <div
            class="dd"
            class:selected={active.startsWith(item.href)}
            class:open={openDropdown === item.label}
            on:mouseenter={() => hoverCapable && setDropdown(item.label)}
            on:mouseleave={() => hoverCapable && setDropdown("")}
          >
            <div class="ddTop" aria-haspopup="true" aria-expanded={openDropdown === item.label}>
              <a class="ddLink" href={item.href} on:click={closeDropdown}>{item.label}</a>
              <button
                type="button"
                class="ddCaret"
                aria-label={`Open ${item.label} menu`}
                on:click={(e) => {
                  // Prevent link click when tapping the caret.
                  e.preventDefault();
                  toggleDropdown(item.label);
                }}
              >
                <span class="caret">▾</span>
              </button>
            </div>

            <div class="ddMenu" role="menu">
              <a role="menuitem" href={item.href} on:click={closeDropdown} class:selected={active === item.href}>
                All {item.label}
              </a>

              {#each item.children as child}
                <a role="menuitem" href={child.href} on:click={closeDropdown} class:selected={active === child.href}>
                  {child.label}
                </a>
              {/each}
            </div>
          </div>
        {:else}
          <a class:selected={active === item.href} href={item.href} on:click={closeDropdown}>{item.label}</a>
        {/if}
      {/each}
    </nav>

    <div class="right">
      <div class="theme">
        <ThemeToggle />
      </div>

      <button class="burger" on:click={toggleDrawer} aria-label="Menu" aria-expanded={open}>
        <span></span><span></span>
      </button>
    </div>
  </header>

  {#if open}
    <div class="drawer" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="drawerInner">
        <div class="drawerTop">
          <a class="brand drawerBrand" href="/" on:click={closeDrawer}>
            <div class="brandTitle">{title}</div>
            <div class="brandSub">{subtitle}</div>
          </a>
          <button class="close" on:click={closeDrawer} aria-label="Close">Close</button>
        </div>

        <nav class="drawerNav" aria-label="Mobile">
          {#each nav as item}
            {#if item.children && item.children.length}
              <div class="drawerGroup">
                <a class:selected={active.startsWith(item.href)} href={item.href} on:click={closeDrawer}>{item.label}</a>
                <div class="drawerChildren">
                  {#each item.children as child}
                    <a class:selected={active === child.href} href={child.href} on:click={closeDrawer}>{child.label}</a>
                  {/each}
                </div>
              </div>
            {:else}
              <a class:selected={active === item.href} href={item.href} on:click={closeDrawer}>{item.label}</a>
            {/if}
          {/each}
        </nav>

        <div class="drawerHint">
          <div class="small">No lighting rental. Cameras, lenses, accessories only.</div>
        </div>
      </div>
    </div>
  {/if}

  <main class="main">
    <slot />
  </main>

<footer class="foot">
  <div class="footInner">

    <div>
      <div class="small">
       {site.legalName} © {new Date().getFullYear()} All Rights Reserved
      </div>

      <div class="small">
        Design by
        <a href="https://sanrokuku.com" target="_blank" rel="noopener">
          San Roku Ku
        </a>
      </div>
    </div>

    <div class="small">
      Email: <a class="accent" href={`mailto:${site.email}`}>{site.email}</a>
    </div>

  </div>
</footer>
</div>

<style>

.foot a {
  text-decoration: none;
  opacity: 0.85;
}

.foot a:hover {
  opacity: 1;
}
  .shell{min-height:100vh; display:flex; flex-direction:column;}

  .topbar{
    position:sticky;
    top:0;
    z-index:40;
    display:flex;
    align-items:flex-end;
    justify-content:space-between;
    gap:20px;
    padding:22px 34px;
    background:color-mix(in srgb, var(--bg) 92%, transparent);
    backdrop-filter:saturate(160%) blur(10px);
  }

  .brand{display:inline-flex; flex-direction:column; gap:6px; min-width:240px;}
  .brandTitle{font-size:22px; font-weight:620; letter-spacing:-0.02em; line-height:1.05;}
  .brandSub{font-size:12px; font-weight:450; letter-spacing:0.18em; text-transform:uppercase; color:var(--muted);}

  .nav{display:flex; align-items:center; gap:18px; flex-wrap:wrap; justify-content:flex-end;}

  .nav a,
  .ddTop{
    font-size:12px;
    font-weight:450;
    letter-spacing:0.18em;
    text-transform:uppercase;
    color:var(--muted);
    padding:8px 6px;
    border-radius:10px;
    line-height:1;
  }

  .nav a.selected{color:var(--text);}

  .dd{position:relative;}
  .dd.selected .ddTop{color:var(--text);}

  .ddTop{
    display:flex;
    align-items:center;
    gap:6px;
    padding:0; /* child elements handle padding */
  }

  .ddLink{
    display:inline-flex;
    align-items:center;
    padding:8px 6px;
    border-radius:10px;
    color:inherit;
  }

  .ddCaret{
    display:inline-grid;
    place-items:center;
    border:0;
    background:transparent;
    cursor:pointer;
    padding:8px 6px;
    border-radius:10px;
    color:inherit;
  }

  .caret{margin-left:6px; opacity:0.7; font-size:12px;}

  .ddMenu{
    position:absolute;
    top:100%;
    right:0;
    min-width:240px;
    /* Add visual separation without creating a hover "gap" */
    padding:18px 10px 10px;
    border-radius:16px;
    background:var(--panel);
    box-shadow:var(--shadow);
    border:1px solid color-mix(in srgb, var(--muted) 18%, transparent);
    display:none;
  }

  /* Keyboard users */
  .dd:focus-within .ddMenu{display:block;}

  /* Touch/click users */
  .dd.open .ddMenu{display:block;}

  .ddMenu a{
    display:block;
    padding:10px 10px;
    border-radius:12px;
    font-size:12px;
    letter-spacing:0.14em;
  }

  .ddMenu a.selected{color:var(--text);}

  .right{display:flex; align-items:center; gap:10px;}
  .theme{display:flex; align-items:center;}

  .burger{
    width:44px;
    height:44px;
    border:0;
    background:transparent;
    border-radius:12px;
    display:none;
    place-items:center;
    padding:0;
    cursor:pointer;
  }
  .burger span{display:block; width:18px; height:2px; background:var(--text); border-radius:2px;}
  .burger span:last-child{margin-top:6px;}

  .main{width:100%; max-width:1220px; margin:0 auto; padding:34px 34px 44px;}

  .foot{margin-top:auto; padding:18px 34px 26px; max-width:1220px; width:100%; margin-left:auto; margin-right:auto;}
  .footInner{display:flex; justify-content:space-between; gap:18px; flex-wrap:wrap;}

  /* Mobile drawer: solid background for readability */
  .drawer{position:fixed; inset:0; background:var(--bg); z-index:50;}
  .drawerInner{max-width:560px; height:100%; padding:24px; background:var(--bg); border-right:1px solid color-mix(in srgb, var(--muted) 18%, transparent); overflow:auto;}
  .drawerTop{display:flex; justify-content:space-between; align-items:flex-start; gap:20px;}
  .drawerNav{margin-top:22px; display:flex; flex-direction:column; gap:10px;}

  .drawerNav a{font-size:13px; font-weight:450; letter-spacing:0.18em; text-transform:uppercase; color:var(--muted); padding:10px 8px; border-radius:12px;}
  .drawerNav a.selected{color:var(--text);}

  .drawerGroup{padding:8px 0; border-top:1px solid color-mix(in srgb, var(--muted) 18%, transparent);}
  .drawerGroup:first-child{border-top:0;}

  .drawerChildren{margin-top:8px; display:flex; flex-direction:column; gap:6px; padding-left:10px;}
  .drawerChildren a{letter-spacing:0.14em; font-size:12px; opacity:0.9;}

  .drawerHint{margin-top:18px; padding-top:14px; border-top:1px solid color-mix(in srgb, var(--muted) 18%, transparent);}

  .close{
    border:0;
    background:transparent;
    border-radius:999px;
    padding:10px 14px;
    font-weight:450;
    cursor:pointer;
    text-decoration:underline;
    text-underline-offset:6px;
    text-decoration-thickness:1px;
  }

  .accent{color:var(--accent);}

  @media(max-width: 980px){
    .nav{display:none;}
    .burger{display:grid;}
    .topbar{align-items:center;}
    .brand{min-width:auto;}
  }

  @media(max-width: 520px){
    .topbar{padding:18px 18px;}
    .main{padding:22px 18px 34px;}
    .foot{padding:16px 18px 22px;}
    .brandTitle{font-size:20px;}
  }
</style>