


<div id="what" class="font-sans  h-screen scroll__child boat__background static">
    <nav class="flex justify-between p-8 items-center ">
      <a href="#" class="text-c-orange hidden no-underline text-sm md:text-4xl font-thin lg:block md:block">The atlantic crossing</a>
      <ul class="list-reset flex">
        <li><a href="#who" class="text-c-black no-underline p-2 md:p-4">About me</a></li>
        <li><a href="#what" class="text-c-black no-underline p-2 md:p-4 whitespace-no-wrap">The crossing</a></li>
        <li><a href="#where" class="text-c-black no-underline p-2 md:p-4">Travel map</a></li>
        <!-- <li><a href="donate#" class="text-black md:text-white p-2 md:p-4">Donate</a></li> -->
      </ul>
    </nav>

<!-- blocks for small screens-->
	<!-- <div class="lg:hidden xl:hidden sm:block md:hidden"> -->
		<!-- <img alt="row" src="img/frontpage.jpg" class="frontpage__image"/> -->

		<!-- what -->
		<div  class="container lg:container p-4 mx-auto">
		<div class="sm:block md:hidden lg:hidden xl:hidden  text-c-orange text-4xl font-thin text-center mb-10">
			The Atlantic crossing
		</div>
			<p class="lg:absolute xl:absolute lg:pin-b xl:pin-b md:text-xl lg:text-xl xl:text-2xl lg:text-white xl:text-white lg:pb-20 xl:pb-24 pb-4">
			This Atlantic crossing is a world record attempt to row continent to continent in less than 48 days. The six-person team will start the 1st of April 2019 under captain Ralph Tuijn (Netherlands).
			</p>
			<!-- <ul>
				<li>Niklas Persson (Sweden)</li>
				<li>James Morrisey (Ireland</li>
				<li>Therese Lundgren (Sweden)</li>
				<li>Denis Gorbylev (Russia)</li>
				<li>Jacob Røthing (Norway) (me)</li>
			</ul> -->
			<p class="absolute pin-b md:text-xl lg:text-xl xl:text-2xl text-white lg:pb-4 xl:pb-4 pb-2">
				The ocean rowboat is a Rannoch 45 mono-hull made of carbon and Kevlar. It is designed and built by experienced marine architects. The boat is safe, strong and fast.
			</p>
		</div>
	<!-- </div> -->
	<!-- blocks for big screens-->
	<!-- <div class="hidden sm:hidden  lg:block xl:block md:block">
		<div class="w-full h-full bg-water  p-6 mx-auto t text-black text-xl relative">
			<div  class="container lg:container p-4 mx-auto ">
				<p class="pt-8 pb-8">
				This Atlantic crossing is a world record attempt to row continent to continent in less than 48 days. The six-person team will start the 1st of April 2019 under captain Ralph Tuijn (Netherlands).
				</p> -->

 <!-- The crew members are:
					<ul>
						<li>Niklas Persson (Sweden)</li>
						<li>James Morrisey (Ireland</li>
						<li>Therese Lundgren (Sweden)</li>
						<li>Denis Gorbylev (Russia)</li>
						<li>Jacob Røthing (Norway) (me)</li>
					</ul> -->
<!--

				<p class=" container lg:container p-4 mx-auto pb-20 absolute pin-b">
					The ocean rowboat is a Rannoch 45 mono-hull made of carbon and Kevlar. It is designed and built by experienced marine architects. The boat is safe, strong and fast.
				</p>
			</div>
		</div> -->

	<!-- </div> -->
</div>
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
	<div id="donate"  class="container p-4 mx-auto lg:container h-screen scroll__child">
		<Donate/>
	</div>

	<div class="p-6">
		using <a href="https://svelte.technology">Svelte</a> coded by <a href="https://kartoteket.as">Kartoteket AS</a>
	</div>



<script>
	import Map from './Map.svelte';
	import Who from './Who.svelte';
	import Donate from './Donate.svelte';
	import './css/normalize.css'
	import './css/tailwind.css'

	export default {
		components: {
			Map,
			Who,
			Donate,
		},
		data() {
			return {
				isMenuOpen: false,
			}
		},
		methods: {
			togglemenu() {
				const { isMenuOpen } = this.get();
				console.log('toggle', isMenuOpen);
				this.set({isMenuOpen: !isMenuOpen});
				console.log('toggle', isMenuOpen);
				// console.log(this.refs.menubutton)
			}
		},
		oncreate() {
			const textHeight = this.refs.mapText.clientHeight;
			const mapHeight = this.refs.mapContainer.clientHeight;
			const newHeight = mapHeight - textHeight;
			this.refs.mapContainer.style.height = newHeight + 'px';
		}
	};
</script>
<style>
	img {
		width: 100%;
		height: auto;
	}

</style>