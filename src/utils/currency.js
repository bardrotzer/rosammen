import { getNation } from '@/utils/ipUtils';

const c = {
  currency: null,
}

const currency = (ip = null) => {
  return new Promise((resolve, reject) => {
    if (c.currency) {
      resolve(c.currency);
    }
    getNation(ip)
      .then((country_code) => {
        if (country_code === 'NO') {
          c.currency = 'NOK';
        } else {
          c.currency = 'EUR';
        }
        resolve(c.currency);
      });
  })
}

const convert = (amount, currency) => {
  if (currency === 'NOK') {
    return amount;
  }
  return amount * 0.1;
}

export {
  currency,
  convert,
}