import { mount } from './_mount.js';
import About from '../pages/About.svelte';

mount(About, window.__PAGE_PROPS__ || {});
