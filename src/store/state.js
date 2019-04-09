import { Store } from 'svelte/store.js';
import config from '@/config'

const ac = config.get('area_codes');

const store = new Store({
  name: 'state',
  country_code: null,
  currency: 'NOK',
  vippsEnabled: false,
  rowingData: null,
  winWidth: 600,

});

store.compute('smallscreen', ['winWidth'], (ww) => {
  return (ww < 992);
});

store.compute('areacode', ['country_code'], (ccode) => {
  const code = ac[ccode];
  if (code) {
    return code.code;
  }
  return '';
});

export default store;