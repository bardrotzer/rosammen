<div id="windy" on:focus="focusme()" on:blur="blurme()" class="border border-c-orange rounded-lg"></div>

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
