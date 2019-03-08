<div id="map" on:focus="focusme()" on:blur="blurme()"></div>

<script>
  import L from 'leaflet';
  import Axios from 'axios';
  import './css/custom.css'

  let maps

	export default {
    methods: {
      focusme() {
        console.log(maps);
        maps.scrollWheelZoom.enable();
      },
      blurme() {
        console.log('blur');
        maps.scrollWheelZoom.disable();
        console.log(maps);
      }
    },
		oncreate() {
      console.log('created', L);
      const center = new L.latLng(20.2750, -27.7590);
      const oceantiles = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
      const watercolor = 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}';
			const map = L.map('map', {
        center,
					zoom: 3
			});
      map.scrollWheelZoom.disable();
      maps = map;
      const tilemap = L.tileLayer(oceantiles, {
        // attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'jpg'
      }).addTo(map);

      map.on('click', function (a, b, c) {
        console.log(a,b,c);
      });

      Axios.get('https://ralph.travelmap.net/api/users/27165/trips/73428/spots')
        .then(r => {
          console.log(r);
          console.log('done');
        });

		}
	}
</script>
<style>
	#map {
		height: 500px;
		width: 100%
	}

</style>