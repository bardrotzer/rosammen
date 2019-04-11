import SvelteRouter from 'svelte-router';
import TravelLog from '@/components/TravelLog.svelte';
import What from '@/components/What.svelte';
import Who from '@/components/Who.svelte';
import Map from '@/components/Map.svelte';

const router = new SvelteRouter({
  mode: 'history',
  routes: {
    '/log': TravelLog,
    '/': What,
    '/who': Who,
    '/map': Map,
  }
})

export default router;