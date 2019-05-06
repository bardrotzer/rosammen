import moment from 'moment';
import { sortASC } from '@/utils/date';

const parseNews = (data) => {
  if (data && data.length) {
    const newsList = data.filter((d) => {
      return d.comment || d.albums;
    });
    newsList.sort(sortASC);

    return newsList;
  }
  return [];
}

const _toRadian = degree => degree * Math.PI/180;

const getDistance = (origin, destination) =>{
  // return distance in meters
  const lon1 = _toRadian(origin.lng);
  const lat1 = _toRadian(origin.lat);
  const lon2 = _toRadian(destination.lng);
  const lat2 = _toRadian(destination.lat);

  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;

  const a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const EARTH_RADIUS = 6371;

  return c * EARTH_RADIUS * 1000;
}


export {
  parseNews,
  getDistance,
}