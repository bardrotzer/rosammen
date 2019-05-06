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
  receivers:[{
    name: 'Røde Kors Norge',
    description: 'The Norwegian Red Cross mission is to reveal, prevent and alleviate human suffering and distress. Give healthcare to children in war.',
    vipps: '2272',
    card: null,
    logo: 'rode-kors-logo.png',
    link: 'https://www.rodekors.no/',
    id: 'rodekors',
  },{
    name: 'Ormsund Roklubb',
    description: 'Ormsund Roklubb is run by enthusiasts and contributes to an active and healthy Nedre Bekkelaget borough for young and old.',
    vipps: '13993',
    card: null,
    logo: 'ormsund-roklubb-logo.png',
    link: 'http://ormsund.no/',
    id: 'ormsund',
  }, {
    name: 'Rowtogether',
    description: 'Donate directly to Rowtogether to receive daily updates on sms and your name on the website.',
    vipps: null,
    card: true,
    logo: 'logo.png',
    link: 'https://www.rowtogether.no/',
    id: 'rowtogether',
  }],
  distance: null,
  distances: [],


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