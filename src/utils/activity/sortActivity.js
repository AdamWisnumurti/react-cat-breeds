export const handleSort = (
  init,
  data,
  setData,
  type,
  setSortedBy
) => {
  let dataList = init;
  if (type === 'Terbaru') {
    dataList.sort(function (a, b) {
      return new Date(b.id) - new Date(a.id);
    });
  } else if (type === 'Terlama') {
    dataList.sort(function (a, b) {
      return new Date(a.id) - new Date(b.id);
    });
  } else if (type === 'A-Z') {
    dataList.sort(function (a, b) {
      let nameA = a.title.toLowerCase();
      let nameB = b.title.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  } else if (type === 'Z-A') {
    dataList.sort(function (a, b) {
      let nameA = a.title.toLowerCase();
      let nameB = b.title.toLowerCase();
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    });
  } else {
    dataList = dataList.filter((item) => item.is_active === 1);
  }
  setData(dataList);
  setSortedBy(type);
};
