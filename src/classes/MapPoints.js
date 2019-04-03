import Axios from 'axios';
import clientUrl from '@/utils/clientUrl';
// import L from 'leaflet';
import '@/vendor/Leaflet.Geodesic';
import moment from 'moment';

export default class Mappoints {
  constructor (map) {
    console.log(L);
    this.map = map;
    this.path = null;
    this.rowing = null;
    this.route = [];
  }

  createFromTo(type) {
    const route = [];
    const data = type === 'path' ? this.path : this.rowing;
    for (let i = 0; i < data.length; i += 1) {
      const d1 = data[i];
      const from = L.latLng(d1.lat, d1.lon);
      route.push(from);
      // const d2 = data[i + 1];
      // const to = L.latLng(d2.lat, d2.lon);
      // route.push([from, to])
    }
    return route;
  }

  drawMarkers(type) {
    const data = type === 'path' ? this.path : this.rowing;
    const waypoint = L.divIcon({
      className: 'rounded-full waypoint__icon',
      iconSize: L.point(12, 12)});
    for (let i = 0; i < data.length; i += 1) {
      const d = data[i];
      const markerLocation = L.latLng(d.lat, d.lon);
      const marker = new L.Marker(markerLocation, {icon: waypoint});
      this.map.addLayer(marker);

      marker.bindPopup(d.comment || d.city, {
        maxWidth: 180,
      });
    }

    if (type === 'rowing') {
      const pos = data[data.length -1]; 
      const date = new moment(pos.date)
      // console.log(date.format('MMM Do - HH:mm'));
      L.popup()
      .setLatLng([pos.lat, pos.lon])
      .setContent(pos.comment || date.format('MMM Do - HH:mm'), {
        maxWidth: 180,
      })
      .openOn( this.map );
    }
  }

  drawCurve(type) {
    const points = this.createFromTo(type);

    const lines = L.polyline(points, {
      color: type === 'path' ? '#333' : "blue",
      dashArray: 4,
      weight: 3,
    }).addTo(this.map);
    // const geodesi = L.geodesic(points, {
    //   weight: 1,
    //   opacity: 1,
    //   color: '#666',
    //   steps: 10,
    // }).addTo(this.map);
    // if (type === 'rowing') {
    //   this.map.fitBounds(lines.getBounds());
    // }
  }

  show() {
    const path = clientUrl('assets','path.json');
    const rowing = clientUrl('assets','rowing.json');

    Axios.get(path)
        .then(r => {
          if (r.data && r.data.data && r.data.data.length)  {
            this.path = r.data.data;
            this.drawMarkers('path');
            this.drawCurve('path')
          }
        });
  
        Axios.get(rowing)
        .then(r => {
          if (r.data && r.data.data && r.data.data.length)  {
            this.rowing = r.data.data;
            this.drawMarkers('rowing');
            this.drawCurve('rowing')
          }
        });
  }
}