const parseNews = (data) => {
  if (data && data.length) {
    return data.filter((d) => {
      return d.comment || d.albums;
    })
  }
  return [];
}


export {
  parseNews,
}