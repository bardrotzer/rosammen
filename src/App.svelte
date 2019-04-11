
<svelte:window on:resize="setWidth()"/>
<div class="h-screen">
  <nav class="flex justify-between p-8 items-center bg-c-black ">
      <p class="text-c-orange hidden text-sm md:text-4xl font-thin lg:block md:block">The atlantic crossing</p>
      <ul class="list-reset flex">
        <li><RouterLink className="text-c-lightgrey no-underline p-2 md:p-4" to="/">Home</RouterLink></li>
        <!-- <li><RouterLink className="text-c-lightgrey no-underline p-2 md:p-4" to="/who">About me</RouterLink></li> -->
        <li><RouterLink className="text-c-lightgrey no-underline p-2 md:p-4" to="/map">Travel map</RouterLink></li>
        <li><RouterLink className="text-c-lightgrey no-underline p-2 md:p-4" to="/log">Updates</RouterLink></li>
        <li><RouterLink className="text-c-orange no-underline p-2 md:p-4 whitespace-no-wrap" to="/donate">Donate</RouterLink></li>
        <!-- <li><a href="donate#" class="text-black md:text-white p-2 md:p-4">Donate</a></li> -->
      </ul>
    </nav>
<div id="app" ref:app></div>
</div>



<script>
	import router from '@/router';
	import SvelteRouter from 'svelte-router';
	import { init } from '@/services/firstrun';
	import './css/normalize.css'
	import './css/tailwind.css'

	export default {
		components: {
			RouterLink: SvelteRouter.RouterLink,
		},
		data() {
			return {
				isMenuOpen: false,
				vippsEnabled: false,
				currency: 'NOK',
				country_code: null,
			}
		},
		methods: {
			setWidth() {

				const winWidth = this.refs.app.clientWidth;

				this.store.set({
					winWidth: winWidth,
				})
      }
		},
		oncreate() {
			router.create('#app');
			this.setWidth();
			init();

		}
	};
</script>