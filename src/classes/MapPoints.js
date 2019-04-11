import Axios from 'axios';
import clientUrl from '@/utils/clientUrl';
import store from '@/store/state';
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
    let data, options

    if (type === 'path') {
      data = this.path;
      options = {
        iconSize: L.point(12, 12),
        className: 'rounded-full waypoint__icon',
      }
    } else {
      data = this.rowing;
      options = {
        iconSize: L.point(10, 10),
        className: 'rounded-full rowing__icon',
      }
    }

    const waypoint = L.divIcon(options);

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
    let options;
    if (type === 'path') {
      options = {
        color: '#333',
        dashArray: 4,
        weight: 3,
      }
    } else {
      options = {
        color: 'blue',
        weight: 3,
      }
    }


    const lines = L.polyline(points, options).addTo(this.map);

    if (type === 'rowing') {
      this.map.fitBounds(lines.getBounds(), {
        padding: L.point(10,10),
        reset: true,
      });
      // this.map.invalidateSize({
      //   debounceMoveend: true,
      // });
      this.map.on('moveend', (b) => {
        console.log('ended');
      })
    }
  }

  getRowData() {

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
    const { rowingData } = store.get();
    if (!rowingData ) {
      store.on('state', ({ current, changed, previous }) => {
        if (current.rowingData && current.rowingData.length) {
          this.rowing = current.rowingData;
          this.drawMarkers('rowing');
          this.drawCurve('rowing')

        }
      });
    } else {
      this.rowing = rowingData;
      this.drawMarkers('rowing');
      this.drawCurve('rowing')
    }
        // Axios.get(rowing)
        // .then(r => {
        //   if (r.data && r.data.data && r.data.data.length)  {
        //     this.rowing = r.data.data;
        //     this.drawMarkers('rowing');
        //     this.drawCurve('rowing')
        //   }
        // });
  }
}