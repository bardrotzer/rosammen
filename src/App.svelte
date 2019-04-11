
<svelte:window on:resize="resizeMap()"/>
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
<div id="app"></div>
</div>



<script>
	import router from '@/router';
	import SvelteRouter from 'svelte-router';


	import What from '@/components/What.svelte';
	import News from '@/components/News.svelte';
	import { init } from '@/services/firstrun';
	import './css/normalize.css'
	import './css/tailwind.css'

	export default {
		components: {
			Map,
			// Who,
			Donate,
			What,
			News,
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
			resizeMap() {
				this.refs.mapContainer.style = '';
				const textHeight = this.refs.mapText.clientHeight;
				const mapHeight = this.refs.mapContainer.clientHeight;
				const winWidth = this.refs.mapContainer.clientWidth;
				const newHeight = mapHeight - textHeight - 20; // 2 * margin
				const newWidth = (winWidth - 20)
				this.refs.mapContainer.style.height = newHeight + 'px';
				this.refs.mapContainer.style.width = newWidth + 'px';

				this.store.set({
					winWidth: winWidth,
				})
      }
		},
		oncreate() {
			router.create('#app');
			this.resizeMap();
			init();

		}
	};
</script>