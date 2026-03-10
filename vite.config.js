import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve, join } from 'node:path';
import fs from 'node:fs';

function collectHtmlInputs(rootDir) {
  const inputs = {};

  /** @param {string} dir */
  function walk(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.name.startsWith('.')) continue;
      if (item.name === 'node_modules' || item.name === 'dist' || item.name === '__MACOSX') continue;

      const full = join(dir, item.name);
      if (item.isDirectory()) {
        walk(full);
        continue;
      }

      if (item.isFile() && item.name === 'index.html') {
        // Root index.html becomes 'index.html' after stripping the leading slash,
        // which would incorrectly resolve to 'index.html/index.html'.
        let rel = full.replace(rootDir, '').replace(/^\//, '').replace(/\/index\.html$/, '');
        if (rel === 'index.html') rel = '';
        const key = rel === '' ? 'home' : rel.replace(/\//g, '_');
        inputs[key] = resolve(rootDir, rel === '' ? 'index.html' : `${rel}/index.html`);
      }
    }
  }

  walk(rootDir);
  return inputs;
}

export default defineConfig(({ mode }) => {
  const rootDir = __dirname;
  const input = collectHtmlInputs(rootDir);

  return {
    base: './',
    plugins: [svelte()],
    build: {
      rollupOptions: {
        input
      }
    }
  };
});
