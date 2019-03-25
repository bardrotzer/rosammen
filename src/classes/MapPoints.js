import Axios from 'axios';
import L from 'leaflet';
import '@/vendor/Leaflet.Geodesic';

export default class Mappoints {
  constructor (map) {
    this.map = map;
    this.data = null;
    this.route = [];
  }

  createFromTo() {
    const route = [];
    for (let i = 0; i < this.data.length - 1; i += 1) {
      const d1 = this.data[i];
      const from = new L.LatLng(d1.lat, d1.lon);
      const d2 = this.data[i + 1];
      const to = new L.LatLng(d2.lat, d2.lon);
      route.push([from, to])
    }
    return route;
  }

  drawMarkers() {
    console.log(this.data);
    const waypoint = L.divIcon({
      className: 'rounded-full waypoint__icon',
      iconSize: L.point(8, 8)});
    for (let i = 0; i < this.data.length; i += 1) {
      const d = this.data[i];
      const markerLocation = new L.LatLng(d.lat, d.lon);
      const marker = new L.Marker(markerLocation, {icon: waypoint});
      this.map.addLayer(marker);
  
      marker.bindPopup(d.comment || d.city, {
        maxWidth: 180,
      });
    }
  }

  drawCurve() {
    const points = this.createFromTo();
    const geodesi = L.geodesic(points, {
      weight: 1,
      opacity: 1,
      color: '#666',
      steps: 10,
    }).addTo(this.map);

    const b = geodesi.getBounds();
    this.map.fitBounds(b);
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