import moment from 'moment';

const parseNews = (data) => {
  if (data && data.length) {
    const newsList = data.filter((d) => {
      return d.comment || d.albums;
    });
    newsList.sort((a, b) => {
      console.log(a.date,b.date);
      const isABefore =  moment(a.date).isBefore(b.date);
      if (isABefore) {
        return 1
      } else {
        return -1;
      }
    });

    return newsList;
  }
  return [];
}


export {
  parseNews,
}