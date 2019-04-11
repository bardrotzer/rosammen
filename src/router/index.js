import SvelteRouter from 'svelte-router';
import TravelLog from '@/components/TravelLog.svelte';
import What from '@/components/What.svelte';
import Who from '@/components/Who.svelte';
import Donate from '@/components/Donate.svelte';
import Map from '@/components/Map.svelte';

const router = new SvelteRouter({
  mode: 'hash',
  routes: {
    '/log': TravelLog,
    '/': What,
    '/who': Who,
    '/donate': Donate,
    '/map': Map,
  }
})

export default router;