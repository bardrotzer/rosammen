/**
 * This set of utilities will run once the app is started to set some environment variables
 */
import store from '@/store/state';
import { canUseVipps } from '@/utils/can';
import { currency } from '@/utils/currency';
import { getCountryCode } from '@/utils/ipUtils';


/**
 * Initialises the app and sets currency, locale and others
 */
const init = () => {
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