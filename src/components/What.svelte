  <nav class="flex justify-between p-8 items-center ">
      <p class="text-c-orange hidden text-sm md:text-4xl font-thin lg:block md:block">The atlantic crossing</p>
      <ul class="list-reset flex">
        <li><a href="#who" class="text-c-black no-underline p-2 md:p-4">About me</a></li>
        <li><a href="#where" class="text-c-black no-underline p-2 md:p-4">Travel map</a></li>
        <li><a href="#donate" class="text-c-orange no-underline p-2 md:p-4 whitespace-no-wrap">Donate</a></li>
        <!-- <li><a href="donate#" class="text-black md:text-white p-2 md:p-4">Donate</a></li> -->
      </ul>
    </nav>
  <News/>
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
			<p class="absolute pin-b md:text-xl lg:text-xl xl:text-2xl text-white lg:pb-4 xl:pb-4 pb-2 container mx-auto">
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
  <script>
  import News from '@/components/News.svelte';

  export default {
    components: {
      News,
    }
  }

  </script>