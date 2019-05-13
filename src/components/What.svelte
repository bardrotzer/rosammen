 <svelte:window on:resize="resizeChart()"/>
 <div id="what" class="font-sans bg-white">
 <!-- <div id="what" class="font-sans h-full scroll__child  boat__background static"> -->

<!-- blocks for small screens-->
	<!-- <div class="lg:hidden xl:hidden sm:block md:hidden"> -->
		<!-- <img alt="row" src="img/frontpage.jpg" class="frontpage__image"/> -->

		<!-- what -->
	<div class="container lg:container p-4 mx-auto">
		<div class="sm:block md:hidden lg:hidden xl:hidden  text-c-orange text-4xl font-thin text-center mb-8">
			The Atlantic crossing
		</div>
			<p ref:container class="md:text-4xl lg:text-4xl xl:text-5xl lg:pb-20 xl:pb-24 pb-4 container mx-auto text-center">
			This Atlantic crossing is a world record attempt to row continent to continent.

			</p>
			<div class="flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row ">
			<div ref:distance class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mr-8">
				<span  class="text-c-orange">
					If the team maintains the current speed at {knots} knots, they will spend {daysLeft} more days at sea.
				</span>
				<p class="js-radialprogress">

				</p>

				<span  class="text-c-orange">
					The team has traveled {Math.round($distance)} kilometers since April 1st with {Math.round($remainingDistance)} kilometers left.
				</span>
				<p class="js-progressbar pt-4"></p>
			</div>

			<div ref:speed class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mr-8">
				<span  class="text-c-orange">
					Currently the team are moving at an average of {knots} knots ({kmh} km/h)
				</span>
				<p class="js-speedchart pt-4"></p>
			</div>
		</div>



			<!-- <p class="absolute pin-b md:text-xl lg:text-xl xl:text-2xl text-white lg:pb-4 xl:pb-4 pb-8 container mx-auto">
				The ocean rowboat is a Rannoch 45 mono-hull made of carbon and Kevlar. It is designed and built by experienced marine architects. The boat is safe, strong and fast.
			</p> -->
		</div>
	</div>
  <div id="who" class="h-screen scroll__child  bg-white">
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
        <p class="leading-tight text-c-darkgrey py-2">Connect with Jakob on facebook to follow the trip as it progresses or follow the <RouterLink className="text-c-orange no-underline" to="/log">Travel log</RouterLink></p>
      </div>
      <div>
        <a href="https://facebook.com" target="_blank" class=" font-semibold no-underline rounded-full px-4 py-1 leading-normal bg-white border border-c-blue text-c-blue hover:bg-c-blue hover:text-white">Connect with Jacob</a>
        <span class="text-c-lightgrey text-xs block py-2">opens facebook</span>
      </div>
    </div>
  </div>
</div>
<div id="sponsors" class="bg-white">
		<div class="text-c-orange text-4xl text-center mb-8">
			Our Sponsors
		</div>

	{#each sponsors as sponsor }
		<Sponsor data={sponsor} />
	{/each}
</div>
<div>
</div>

  <script>
	import SvelteRouter from 'svelte-router';
	import Sponsor from '@/components/common/Sponsor.svelte';
	import clientUrl from '@/utils/clientUrl';
	import Axios from 'axios';
	import ProgressBar from '@/classes/ProgressBar'
	import SpeedChart from '@/classes/SpeedChart'
	import RadialProgress from '@/classes/RadialProgress'

	let progressBar;
	let radialProgress;
	let speedChart;
	let timeout;

  export default {
		data() {
			return {
				sponsors: [],
				daysLeft: 0,
			}
		},
		methods: {
			resizeChart() {
				progressBar.width = this.refs.distance.clientWidth;
				speedChart.width = this.refs.speed.clientWidth;
				radialProgress.width = this.refs.distance.clientWidth;
				if(!timeout) {
					timeout = setTimeout(() => {
						const { kmh } = this.get();
						progressBar.draw();
						speedChart.draw();
						radialProgress.draw(kmh)

						clearTimeout(timeout);
						timeout = null;
					}, 100)
				}
			}
		},
    components: {
			RouterLink: SvelteRouter.RouterLink,
			Sponsor,
		},
		computed: {
			knots: ({$distances}) => {
				if ($distances.length) {
					const item = $distances[$distances.length - 1];
					return (item.knots).toFixed(1);
				}
				return '';
			},
			kmh: ({$distances}) => {
				if ($distances.length) {
					const item = $distances[$distances.length - 1];
					return (item.kmh).toFixed(1);
				}
				return '';
			},
		},
		oncreate() {
			progressBar = new ProgressBar('.js-progressbar');
			progressBar.width = this.refs.distance.clientWidth;

			speedChart = new SpeedChart('.js-speedchart');
			speedChart.width = this.refs.speed.clientWidth;

			radialProgress = new RadialProgress('.js-radialprogress');
			radialProgress.width = this.refs.speed.clientWidth;

			this.store.on('state', ({ current, changed, previous }) => {

				// draw progressbar on data
				if (changed.distance || changed.remainingDistance) {
					const item = current.distances[current.distances.length - 1];

					progressBar.distance = current.distance;
					progressBar.remaining = current.remainingDistance;
					progressBar.draw();

					radialProgress.distance = current.distance;
					radialProgress.remaining = current.remainingDistance;
					radialProgress.draw(item.kmh);

					this.set({
						daysLeft: radialProgress.daysLeft,
					});
				}
				// draw speedchart on data
				if (changed.distances) {
					speedChart.data = current.distances;
					speedChart.draw();
				}
			});

			Axios.get(clientUrl('assets', 'sponsors.json'))
      .then((r) => {
        // const text = this.getParsed(r.data)
        this.set({
          sponsors: r.data,
        });
			});

		}
  }

  </script>