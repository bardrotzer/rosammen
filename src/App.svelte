<nav class="flex items-center justify-between flex-wrap bg-blue-darker p-6  scroll__child">
		<div class="block sm:hidden">
			<button ref:menubutton class="flex items-center px-3 py-2 border rounded text-blue-lighter border-blue-light hover:text-white hover:border-white" on:click="togglemenu()">
				<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
			</button>
		</div>
		<div  class="w-full flex-grow sm:flex sm:items-center sm:w-auto" class:hidden="!isMenuOpen">
			<div class="text-sm sm:flex-grow">
				<a href="#who" class="block mt-4 sm:inline-block sm:mt-0 text-blue-lighter hover:text-white mr-4">
					Hvem
				</a>
				<a href="#what" class="block mt-4 sm:inline-block sm:mt-0 text-blue-lighter hover:text-white mr-4">
					Hva
				</a>
				<a href="#where" class="block mt-4 sm:inline-block sm:mt-0 text-blue-lighter hover:text-white">
					Hvor
				</a>
			</div>
			<div>
				<a href="#donate" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 sm:mt-0">Donér</a>
			</div>
		</div>
	</nav>

<div class=" h-screen scroll__child">
		<img alt="row" src="img/boat.jpg"/><br/>
	<!-- what -->
	<div id="what" class="container lg:container p-6 mx-auto">
		<h1 class="pb-6">The atlantic crossing</h1>
		<p class="pb-4">
		This Atlantic crossing is a world record attempt to row continent to continent in less than 48 days. The six-person team will start the 1st of April 2019 under captain Ralph Tuijn (Netherlands). The crew members are:
		</p>
		<ul>
		 	<li>Niklas Persson (Sweden)</li>
			<li>James Morrisey (Ireland</li>
			<li>Therese Lundgren (Sweden)</li>
		  <li>Denis Gorbylev (Russia)</li>
		  <li>Jacob Røthing (Norway)</li>
		 </ul>
		<p class="pb-2 pt-2">
			The ocean rowboat is a Rannoch 45 mono-hull made of carbon and Kevlar. It is designed and built by experienced marine architects. The boat is safe, strong and fast.
		</p>

	</div>
</div>
	<!-- Who -->
	<div id="who" class="container p-4 mx-auto lg:container h-screen scroll__child">
		<Who/>
	</div>
	<!-- where -->
	<div id="where" class="h-screen scroll__child">
			<Map/>
	</div>
	<!-- donate -->
	<div id="donate"  class="container p-4 mx-auto lg:container h-screen scroll__child">
	donations on separate page
	</div>

	<div class="p-6">
		using <a href="https://svelte.technology">Svelte</a> coded by <a href="https://kartoteket.as">Kartoteket AS</a>
	</div>



<script>
	import Map from './Map.svelte';
	import Who from './Who.svelte';
	// import Donate from './Donate.svelte';
	import './css/normalize.css'
	import './css/tailwind.css'

	export default {
		components: {
			Map,
			Who,
			// Donate,
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