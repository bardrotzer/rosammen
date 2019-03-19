<div id="map" on:focus="focusme()" on:blur="blurme()"></div>

<script>
  import L from 'leaflet';
  import './css/custom.css';
  import MapPoints from './MapPoints';

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
      console.log('created', L);
      const center = new L.latLng(20.2750, -27.7590);
      const oceantiles = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
      const watercolor = 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}';
			map = L.map('map', {
        center,
					zoom: 3
			});
      map.scrollWheelZoom.disable();
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

      const mapPoints = new MapPoints(map);
      mapPoints.show();

		}
	}
</script>
<style>
	#map {
		height: 500px;
		width: 100%
	}

</style>