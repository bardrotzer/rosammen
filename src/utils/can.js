import { getCountryCode } from '@/utils/ipUtils';

const _canUse = {

}

const isNorway = n => n.includes('nb') || n.includes('nn') || n.includes('no') || n.includes('nb_NO')  || n.includes('nn_NO');

const canUseVipps = () => {
  return new Promise((resolve, reject) => {
    const languages = navigator.languages;

    if (_canUse.hasOwnProperty('vipps')) {
      // first check if the static prop is set
      resolve(_canUse.vipps)
    } else if (languages.length && isNorway(languages)) {
      // check the browser capabilities (norway == vipps)
      _canUse.vipps = true;
      resolve(true);
    } else {
      // check the ip if we are in norway
      getCountryCode()
        .then((r) => {
          const isNorway = r === 'NO';
          _canUse.vipps = isNorway;
          resolve(isNorway);
        });
    }
  });
}

export {
  canUseVipps,
}