import Axios from 'axios';
import config from '@/config';

const cache = {
  country_code: null,
  ip: null
}

const _getCountryCode = (ip) => {
  const apiKey = config.get('ipStackKey');
  return Axios.get(`http://api.ipstack.com/${ip}?access_key=${apiKey}&fields=country_code`)
    .then((r) => {
      cache.country_code = r.data.country_code;
      return cache.country_code ;
    })
}

// returns the clients ip address
// thanlks: https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
const getIp = () => {
  // return a promis that resolves the
  return new Promise((resolve) => {
    if (cache.ip) {
      resolve(cache.ip);
    } else {
      const noop = () => {};
      const peerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      const pc = new peerConnection({iceServers:[]})
      // create a listener
      pc.onicecandidate = (c) => {
        try{
          const meh = c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g)
          if (meh.length) {
            cache.ip = meh[0];
            resolve(cache.ip);
          }
        }
        catch(e){}
      }
      // create empty data channel
      pc.createDataChannel("");
      pc.createOffer(((d) => {
        pc.setLocalDescription(d, noop, noop);
      }), noop);
    }
  });
};

const getCountryCode = (ip = null) => {
  if (cache.country_code) {
    return cache.country_code;
  }
  if (!ip) {
   return getIp()
      .then((resolvedIp) => {
        return _getCountryCode(resolvedIp);
      })
  }
  return _getCountryCode(ip);
}



export {
  getIp,
  getCountryCode,
}