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


export {
  parseNews,
}