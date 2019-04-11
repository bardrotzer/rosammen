 <div id="what" class="font-sans h-full scroll__child  boat__background static">

	<!-- {#if !$smallscreen}

  <!-- <News/> -->
	<!-- {/if} --> -->
<!-- blocks for small screens-->
	<!-- <div class="lg:hidden xl:hidden sm:block md:hidden"> -->
		<!-- <img alt="row" src="img/frontpage.jpg" class="frontpage__image"/> -->

		<!-- what -->
		<div  class="container lg:container p-4 mx-auto">
		<div class="sm:block md:hidden lg:hidden xl:hidden  text-c-orange text-4xl font-thin text-center mb-8">
			The Atlantic crossing
		</div>
			<p class="lg:absolute xl:absolute lg:pin-b xl:pin-b md:text-xl lg:text-xl xl:text-2xl lg:text-white xl:text-white lg:pb-20 xl:pb-24 pb-4 container mx-auto">
			This Atlantic crossing is a world record attempt to row continent to continent in less than 48 days. The six-person team will start the 1st of April 2019 under captain Ralph Tuijn (Netherlands).
			</p>
			<!-- <ul>
				<li>Niklas Persson (Sweden)</li>
				<li>James Morrisey (Ireland</li>
				<li>Therese Lundgren (Sweden)</li>
				<li>Denis Gorbylev (Russia)</li>
				<li>Jacob Røthing (Norway) (me)</li>
			</ul> -->
			<p class="absolute pin-b md:text-xl lg:text-xl xl:text-2xl text-white lg:pb-4 xl:pb-4 pb-8 container mx-auto">
				The ocean rowboat is a Rannoch 45 mono-hull made of carbon and Kevlar. It is designed and built by experienced marine architects. The boat is safe, strong and fast.
			</p>
		</div>

		<a href="#who" class="absolute pin-b arrow bounce"> </a>
	</div>
  <div id="who" class="h-screen scroll__child">
  <div class="hidden sm:hidden lg:block xl:block md:hidden crew__background">
    <div class="leading-tight font-sans text-c-orange p-10 text-sm float-left">(from left) Niklas, Jakob, Ralph (Skipper) and James. Missing from the photo are Tessa and James</div>

  		<div class="font-sans text-c-orange text-4xl font-thin text-right p-10 float-right">
			The Crew
		</div>
  </div>
	<div class="sm:flex sm:items-center px-6 pt-4 pb-10 lg:-mt-32 xl:-mt-32">
    <img class="block h-64 rounded-full border-2 border-c-orange mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0" src="img/jacob.jpg" alt="">
    <div class="text-center sm:text-left sm:flex-grow">
      <div class="mb-4 ">
        <p class="text-2xl text-c-orange leading-tight sm:py-2 md:py-4 lg:py-16 xl:py-16">Håkon Jacob Røthing</p>
        <p class="leading-tight text-c-darkgrey py-2">Håkon Jakob Røthing is an adventurer and manager based in Oslo with his wife and two sons. He has previously biked from North Cape to Cape Town and walked along the Blue Nile. He believes in dreams, and the value of making them come true.</p>
        <p class="leading-tight text-c-darkgrey py-2">Connect with Jakob on facebook to follow the trip as it progresses</p>
      </div>
      <div>
        <a href="https://facebook.com" target="_blank" class=" font-semibold no-underline rounded-full px-4 py-1 leading-normal bg-white border border-c-blue text-c-blue hover:bg-c-blue hover:text-white">Connect with Jacob</a>
        <span class="text-c-lightgrey text-xs block py-2">opens facebook</span>
      </div>
    </div>
  </div>
</div>
  <script>
  import News from '@/components/News.svelte';

  export default {
    components: {
      News,
    }
  }

  </script>