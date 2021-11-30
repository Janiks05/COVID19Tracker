export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.todayCases > b.todayCases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};
