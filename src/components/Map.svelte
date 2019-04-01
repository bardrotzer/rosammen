<div id="windy" on:focus="focusme()" on:blur="blurme()"></div>

<script>
  // import L from 'leaflet';
  import '@/css/custom.css';
  import MapPoints from '@/classes/MapPoints';

  const L = window.L;
  let map;

	export default {
    methods: {
      focusme() {
        console.log(map);
        map.scrollWheelZoom.enable();
      },
      blurme() {
        console.log('blur');
        map.scrollWheelZoom.disable();
        console.log(map);
      }
    },
		oncreate() {

      const options = {
        // Required: API key
        key: 'DYcYlzypFJaDiPqpZC7hZyquXioC1zOl',
        // Put additional console output
        verbose: false,
        // Optional: Initial state of the map
        lat: 37.11923,
        lon: -8.527708,
        zoom: 5,
        hourFormat: '24h',
        englishLabels: true,
      }

    // console.log(windyAPI.getAllowed());
    // Initialize Windy API
    windyInit( options, windyAPI => {
        // windyAPI is ready, and contain 'map', 'store',
        // 'picker' and other usefull stuff

        const { map, store, picker, utils } = windyAPI

        // picker.on('pickerOpened', latLon => {
        //     // picker has been opened at latLon coords
        //     const { lat, lon, values } = picker.getParams();
        //     // console.log(p);
        //     // -> 50.4, 14.3, 'wind', [ U,V, ]
        //     let windObject = utils.wind2obj( values )
        //     console.log( windObject )
        // })

        // const cp = picker.open({ lat: options.lat, lon: options.lon });

        // console.log(cp);
        // .map is instance of Leaflet map

        L.popup()
            .setLatLng([options.lat, options.lon])
            .setContent("Current Position")
            .openOn( map );

        const mapPoints = new MapPoints(map);
        mapPoints.show();

    })


      // console.log('created', L);
      // const center = new L.latLng(20.2750, -27.7590);
      // const oceantiles = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
      // const watercolor = 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}';
			// map = L.map('map', {
      //   center,
			// 		zoom: 3
      // });

      // map.scrollWheelZoom.disable();
      // const tilemap = L.tileLayer(oceantiles, {
      //   // attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      //   subdomains: 'abcd',
      //   minZoom: 1,
      //   maxZoom: 16,
      //   ext: 'jpg'
      // }).addTo(map);

      // map.on('click', function (a, b, c) {
      //   console.log(a,b,c);
      // });


		}
	}
</script>
<style>
	#map {
		height: 500px;
		width: 100%
  }


</style>