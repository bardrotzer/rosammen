import Axios from 'axios';
// import L from 'leaflet';
import '@/vendor/Leaflet.Geodesic';

export default class Mappoints {
  constructor (map) {
    console.log(L);
    this.map = map;
    this.data = null;
    this.route = [];
  }

  createFromTo() {
    const route = [];
    for (let i = 0; i < this.data.length; i += 1) {
      const d1 = this.data[i];
      const from = L.latLng(d1.lat, d1.lon);
      route.push(from);
      // const d2 = this.data[i + 1];
      // const to = L.latLng(d2.lat, d2.lon);
      // route.push([from, to])
    }
    return route;
  }

  drawMarkers() {
    const waypoint = L.divIcon({
      className: 'rounded-full waypoint__icon',
      iconSize: L.point(12, 12)});
    for (let i = 0; i < this.data.length; i += 1) {
      const d = this.data[i];
      const markerLocation = L.latLng(d.lat, d.lon);
      const marker = new L.Marker(markerLocation, {icon: waypoint});
      this.map.addLayer(marker);

      marker.bindPopup(d.comment || d.city, {
        maxWidth: 180,
      });
    }
  }

  drawCurve() {
    const points = this.createFromTo();
    console.log(points);
    const lines = L.polyline(points, {
      color: '#333',
      dashArray: 4,
      weight: 3,
    }).addTo(this.map);
    // const geodesi = L.geodesic(points, {
    //   weight: 1,
    //   opacity: 1,
    //   color: '#666',
    //   steps: 10,
    // }).addTo(this.map);

    // const b = geodesi.getBounds();
    // this.map.fitBounds(b);
  }

  show() {
    Axios.get('assets/rowing.json')
        .then(r => {
          if (r.data && r.data.length)  {
            this.data = r.data;
            this.drawMarkers();
            this.drawCurve()
          }
        });
  }
}