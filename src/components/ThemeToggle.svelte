<script>
  import { onMount } from 'svelte';

  let theme = 'light';

  function apply(next) {
    theme = next;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      /* ignore */
    }
  }

  function toggle() {
    apply(theme === 'dark' ? 'light' : 'dark');
  }

  onMount(() => {
    let saved = null;
    try {
      saved = localStorage.getItem('theme');
    } catch (e) {
      saved = null;
    }

    if (saved === 'dark' || saved === 'light') {
      apply(saved);
      return;
    }

    apply('dark');
  });
</script>

<button class="toggle" on:click={toggle} aria-label="Toggle night mode" title="Toggle night mode">
  {#if theme === 'dark'}
    <span aria-hidden="true">☾</span>
  {:else}
    <span aria-hidden="true">☀</span>
  {/if}
</button>

<style>
  .toggle{
    width:40px;
    height:40px;
    border:0;
    border-radius:999px;
    background:transparent;
    color:var(--text);
    display:grid;
    place-items:center;
    cursor:pointer;
    font-size:18px;
    line-height:1;
    opacity:0.9;
  }

  .toggle:hover{opacity:0.65;}
  .toggle:active{transform:translateY(1px);}
</style>
