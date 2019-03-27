import { Store } from 'svelte/store.js';
import config from '@/config'

const ac = config.get('area_codes'); 

const store = new Store({
  name: 'state',
  country_code: null,
  currency: 'NOK',
  vippsEnabled: false,

});

// store.compute('currency', ['country_code'], (ccode) => {
//   if (ccode === 'NO') {
//     return 'NOK';
//   }
//   return 'EUR';
// });

store.compute('areacode', ['country_code'], (ccode) => {
  const code = ac[ccode];
  if (code) {
    return code.code;
  }
  return 'nada';
});

export default store;