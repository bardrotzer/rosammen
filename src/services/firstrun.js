/**
 * This set of utilities will run once the app is started to set some environment variables
 */
import store from '@/store/state';
import { canUseVipps } from '@/utils/can';
import { currency } from '@/utils/currency';
import { getCountryCode } from '@/utils/ipUtils';
import { getDistance } from '@/utils/pointData'
import Axios from 'axios';
import clientUrl from '@/utils/clientUrl';
import moment from 'moment';

const KNOT = 0.539957;
const END = L.latLng(4.93854, -52.335);

const calculateDistance = (data) => {
  let total = 0;
  const distanceList = [];
  const numItems = data.length - 1;
  // iterate all positions calculating the distance.
  for(let i = 0; i < numItems; i += 1) {
    const item1 = data[i];
    const item2 = data[i + 1];
    const dist = Math.round(getDistance(L.latLng(item1.lat, item1.lon),L.latLng(item2.lat, item2.lon)));
    total += dist;
    const startTime = moment(item1.date);
    const endTime = moment(item2.date);
    const duration = moment.duration(endTime.diff(startTime));
    const time = duration.as('minutes') / 60
    const speed = (dist / time) / 1000;
    distanceList.push({
      time: duration,
      distance: dist,
      kmh: speed,
      knots: speed * KNOT
    });
  }

  const lastPos = data[data.length - 1];
  const remaining =  Math.round(getDistance(L.latLng(lastPos.lat, lastPos.lon),END));

  store.set({
    distances: distanceList,
    distance: Math.round(total/1000),
    remainingDistance: remaining,
  });

  // console.log(Math.round(total/1000));
}

/**
 * Initialises the app and sets currency, locale and others
 */
const init = () => {
  const rowing = clientUrl('assets','rowing.json');

  Axios.get(rowing)
  .then(r => {
    if (r.data && r.data.data && r.data.data.length)  {
      store.set({
        rowingData: r.data.data
      });
      calculateDistance(r.data.data);
    }
  });


  getCountryCode()
  // getCountryCode('82.102.22.120')
  .then((cc) => {
    store.set({
      country_code: cc
    })
  })
}


canUseVipps()
.then((r) => {
  let currency = 'EUR';
  if (r) {
    currency = 'NOK';
  }
  store.set({
    vippsEnabled: r,
    currency: currency,
  });
});

// currency()
// 	.then((c) => {
// 		this.set({
// 			currency: c,
// 		});
// 	});

export {
  init,
}