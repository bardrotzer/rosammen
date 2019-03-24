import Axios from 'axios';
import config from '@/config';


const ipStack = (ip) => {
  const apiKey = config.get('ipStackKey');
  Axios.get(`http://api.ipstack.com/${ip}7?access_key=${apiKey}`)
    .then((r) => {
      console.log(r);
    })
}
// returns the clients ip address
// thanlks: https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
const getIp = () => {
  const noop = () => {};

  return new Promise((r) => {
    const peerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    const pc = new peerConnection({iceServers:[]})
    // console.log(pc);
    // create a listener
    pc.onicecandidate = (c) => {
      try{
        c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r);
      }
      catch(e){}
    }
        // create empty data channel
        pc.createDataChannel("");
        pc.createOffer(((d) => {
          pc.setLocalDescription(d, noop, noop);
        }), noop);
  })
};

const getNation = (ip = null) => {
  if (!ip) {
   return getIp()
      .then((resolvedIp) => {
        return ipStack(resolvedIp);
      })
  }
  return ipStack(ip);
}

export {
  getIp,
  getNation,
}