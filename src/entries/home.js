import { mount } from './_mount.js';
import Home from '../pages/Home.svelte';

mount(Home, window.__PAGE_PROPS__ || {});
