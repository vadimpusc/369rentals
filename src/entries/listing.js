import { mount } from './_mount.js';
import Listing from '../pages/Listing.svelte';

mount(Listing, window.__PAGE_PROPS__ || {});
