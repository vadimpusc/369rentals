import { mount } from './_mount.js';
import ItemDetail from '../pages/ItemDetail.svelte';

mount(ItemDetail, window.__PAGE_PROPS__ || {});
