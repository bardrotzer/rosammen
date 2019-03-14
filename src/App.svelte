<nav class="flex items-center justify-between flex-wrap bg-water-darkest p-6  scroll__child">
  <div class="flex items-center flex-no-shrink text-white mr-6">
    <span class="font-semibold text-xl tracking-tight">The Atlantic crossing</span>
  </div>
		<div class="block sm:hidden">
			<button ref:menubutton class="flex items-center px-3 py-2 border rounded text-water-lighter border-water-light hover:text-white hover:border-white" on:click="togglemenu()">
				<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
			</button>
		</div>
		<div  class="w-full flex-grow sm:flex sm:items-center sm:w-auto" class:hidden="!isMenuOpen">
			<div class="text-sm sm:flex-grow">
				<a href="#who" class="block mt-4 sm:inline-block sm:mt-0 text-water-lighter hover:text-white mr-4">
					About me
				</a>
				<a href="#what" class="block mt-4 sm:inline-block sm:mt-0 text-water-lighter hover:text-white mr-4">
					The Atlanctic crossing
				</a>
				<a href="#where" class="block mt-4 sm:inline-block sm:mt-0 text-water-lighter hover:text-white">
					Travel map
				</a>
			</div>
			<div>
				<a href="#donate" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 sm:mt-0">Donate</a>
			</div>
		</div>
	</nav>


<div id="what" class=" h-screen scroll__child bg-water-darkest ">
<!-- blocks for small screens-->
	<div class="lg:hidden xl:hidden sm:block md:hidden">
		<img alt="row" src="img/frontpage.jpeg" class="frontpage__image"/>

		<!-- what -->
		<div  class="container lg:container p-4 mx-auto text-white">
			<p class="pb-4">
			This Atlantic crossing is a world record attempt to row continent to continent in less than 48 days. The six-person team will start the 1st of April 2019 under captain Ralph Tuijn (Netherlands). The crew members are:
			</p>
			<ul>
				<li>Niklas Persson (Sweden)</li>
				<li>James Morrisey (Ireland</li>
				<li>Therese Lundgren (Sweden)</li>
				<li>Denis Gorbylev (Russia)</li>
				<li>Jacob Røthing (Norway) (me)</li>
			</ul>
			<p class="pb-2 pt-2">
				The ocean rowboat is a Rannoch 45 mono-hull made of carbon and Kevlar. It is designed and built by experienced marine architects. The boat is safe, strong and fast.
			</p>
		</div>
	</div>
	<!-- blocks for big screens-->
	<div class="hidden sm:hidden  lg:block xl:block md:block">
		<div class="w-full h-full bg-water boat__background  p-6 mx-auto t text-white text-xl relative">
			<div  class="container lg:container p-4 mx-auto text-white">
				<p class="pt-8 pb-8">
				This Atlantic crossing is a world record attempt to row continent to continent in less than 48 days. The six-person team will start the 1st of April 2019 under captain Ralph Tuijn (Netherlands). The crew members are:
				</p>

					<ul>
						<li>Niklas Persson (Sweden)</li>
						<li>James Morrisey (Ireland</li>
						<li>Therese Lundgren (Sweden)</li>
						<li>Denis Gorbylev (Russia)</li>
						<li>Jacob Røthing (Norway) (me)</li>
					</ul>


				<p class=" container lg:container p-4 mx-auto pb-20 absolute pin-b">
					The ocean rowboat is a Rannoch 45 mono-hull made of carbon and Kevlar. It is designed and built by experienced marine architects. The boat is safe, strong and fast.
				</p>
			</div>
		</div>

	</div>
</div>
	<!-- Who -->
	<div id="who" class="container p-4 mx-auto lg:container h-screen scroll__child">
	
		<Who/>
	</div>
	<!-- where -->
	<div id="where" class="h-screen scroll__child">
		<div  class="container lg:container p-6 mx-auto">
		<h1>Crossing the Atlantic</h1>
			The ocean crossing will go from Portimão in Portugal to French Guyana, covering 3,300 nautical miles (6,000 kilometres). To cross the Atlantic Ocean the team can take advantage of tidal currents and trade winds.
		</div>
			<Map/>
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
		}
	};
</script>
<style>
	img {
		width: 100%;
		height: auto;
	}

</style>