	<!-- where -->
	<div id="where" class="h-screen flex flex-col scroll__child bg-c-darkgrey">

			<div ref:mapText class="container lg:container p-6 mx-auto flex-1">
				<h1 class="font-thin font-sans text-c-orange">Crossing the Atlantic</h1>
				<p class="text-white p-2">
					The ocean crossing will go from Portimão in Portugal to French Guyana, covering 3,300 nautical miles (6,000 kilometres). To cross the Atlantic Ocean the team can take advantage of tidal currents and trade winds.
				</p>
			</div>
			<div ref:mapContainer class="flex-1">
        <div id="windy" on:focus="focusme()" on:blur="blurme()" class="border border-c-orange rounded-lg"></div>
			</div>
	</div>
<script>
  // import L from 'leaflet';
  import '@/css/custom.css';
  import MapPoints from '@/classes/MapPoints';

  const L = window.L;
  let _map;

	export default {
    methods: {
      focusme() {
        _map.scrollWheelZoom.enable();
      },
      blurme() {
        _map.scrollWheelZoom.disable();
      }
    },
		oncreate() {

      const options = {
        // Required: API key
        key: process.env.WINDY_API_KEY,
        // Put additional console output
        verbose: false,
        // Optional: Initial state of the map
        lat: 37.11923,
        lon: -8.527708,
        zoom: 8,
        hourFormat: '24h',
        englishLabels: true,
      }

    // console.log(windyAPI.getAllowed());
    // Initialize Windy API
    windyInit( options, windyAPI => {
        // windyAPI is ready, and contain 'map', 'store',
        // 'picker' and other usefull stuff

        const { map } = windyAPI
        _map = map;
        // picker.on('pickerOpened', latLon => {

        //     // picker has been opened at latLon coords
        //     // picker.close();
        // })


        const mapPoints = new MapPoints(map);
        mapPoints.show();

        this.blurme();
    })
		}
	}
</script>
