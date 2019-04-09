
<svelte:window on:resize="resizeMap()"/>

<div id="what" class="font-sans h-screen scroll__child  boat__background static">
	<What/>
</div>
{#if $smallscreen}
<div id="news" class="font-sans h-screen scroll__child">
	<News/>
</div>
{/if}
	<!-- Who -->
	<div id="who" class="h-screen scroll__child">

		<Who/>
	</div>
	<!-- where -->
	<div id="where" class="h-screen flex flex-col scroll__child bg-c-darkgrey">

			<div ref:mapText class="container lg:container p-6 mx-auto flex-1">
				<h1 class="font-thin font-sans text-c-orange">Crossing the Atlantic</h1>
				<p class="text-white p-2">
					The ocean crossing will go from Portimão in Portugal to French Guyana, covering 3,300 nautical miles (6,000 kilometres). To cross the Atlantic Ocean the team can take advantage of tidal currents and trade winds.
				</p>
			</div>
			<div ref:mapContainer class="flex-1">
				<Map/>
			</div>
	</div>
	<!-- donate -->
	<div id="donate"  class="min-h-screen bg-c-darkgrey">
		<Donate vippsEnabled="{vippsEnabled}" currency="{currency}" country_code="{country_code}"/>
	</div>

	<div class="p-6">
		using <a href="https://svelte.technology">Svelte</a> coded by <a href="https://kartoteket.as">Kartoteket AS</a>
	</div>



<script>
	import Map from '@/components/Map.svelte';
	import Who from '@/components/Who.svelte';
	import Donate from '@/components/Donate.svelte';
	import What from '@/components/What.svelte';
	import News from '@/components/News.svelte';
	import { init } from '@/services/firstrun';
	import './css/normalize.css'
	import './css/tailwind.css'

	export default {
		components: {
			Map,
			Who,
			Donate,
			What,
			News,
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
			this.resizeMap();
			init();

		}
	};
</script>