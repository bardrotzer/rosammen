import SvelteRouter from 'svelte-router';
import TravelLog from '@/components/TravelLog.svelte';
import What from '@/components/What.svelte';
import Who from '@/components/Who.svelte';

const router = new SvelteRouter({
  mode: 'history',
  routes: {
    '/log': TravelLog,
    '/': What,
    '/who': Who,
  }
})

export default router;