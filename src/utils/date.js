import moment from 'moment';

const sortASC = (a, b) => {
  const isABefore =  moment(a.date).isBefore(b.date);
  if (isABefore) {
    return 1
  } else {
    return -1;
  }
}

const sortDESC = (a, b) => {
  const isABefore =  moment(a.date).isBefore(b.date);
  if (isABefore) {
    return -1
  } else {
    return 1;
  }
}

export {
  sortASC,
  sortDESC,
}