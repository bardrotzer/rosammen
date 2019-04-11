	<svelte:window on:resize="resizeMap()"/>
  <!-- where -->
	<div id="where">
			<div ref:mapContainer>
        <div id="windy" on:focus="focusme()" on:blur="blurme()" style="margin: 0;"></div>
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
      },
      resizeMap() {
				this.refs.mapContainer.style = '';
				// const textHeight = this.refs.mapText.clientHeight;
				const mapHeight = this.refs.mapContainer.clientHeight;
				// const winWidth = this.refs.mapContainer.clientWidth;
				// const newHeight = mapHeight - textHeight - 20; // 2 * margin
				// const newWidth = (winWidth - 20)
				this.refs.mapContainer.style.height = (mapHeight - 105) + 'px';
				// this.refs.mapContainer.style.width = newWidth + 'px';
      }
    },
		oncreate() {
      console.log(this);
      this.resizeMap();
      const options = {
        // Required: API key
        key: process.env.WINDY_API_KEY,
        // Put additional console output
        verbose: false,
        reset: false,
        // Optional: Initial state of the map
        // lat: 37.11923,
        // lon: -8.527708,
        // zoom: 8,
        hourFormat: '24h',
        englishLabels: true,
      }

    // console.log(windyAPI.getAllowed());
    // Initialize Windy API
    windyInit( options, windyAPI => {
        // windyAPI is ready, and contain 'map', 'store',
        // 'picker' and other usefull stuff

        const { map, broadcast } = windyAPI
        _map = map;

                broadcast.on('redrawFinished', params => {

            console.log('Map was rendered:', params )

        })
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
