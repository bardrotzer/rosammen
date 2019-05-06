import SvelteRouter from 'svelte-router';
import TravelLog from '@/components/TravelLog.svelte';
import What from '@/components/What.svelte';
import Pay from '@/components/Pay.svelte';
import Donate from '@/components/Donate.svelte';
import Map from '@/components/Map.svelte';
import store from '@/store/state';

const router = new SvelteRouter({
  mode: 'hash',
  routes: {
    '/log': TravelLog,
    '/': {
      Component: What,
      props: {
        store,
      }
    },
    // '/who': Who,
    '/donate': {
      Component: Donate,
      props: {
        store,
      }
    },
    '/map': Map,
    '/payment/:id': {
      Component: Pay,
      props: {
        store,
      }
    },
  }
})

export default router;