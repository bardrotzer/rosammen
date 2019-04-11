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
		<!-- {#if $smallscreen}
		<a href="#news" class="absolute pin-b arrow bounce"> </a>
		{/if} -->
	</div>
  <script>
  import News from '@/components/News.svelte';

  export default {
    components: {
      News,
    }
  }

  </script>