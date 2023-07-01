import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL_CAT,
});

const CatServices = () => {
  const getAllCats = () => {
    return apiClient
      .get('breeds')
      .then((res) => {
        return { data: res.data };
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  const getCatById = (params) => {
    return apiClient
      .get(`images/search`, { params })
      .then((res) => {
        return { data: res.data };
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  return {
    getAllCats,
    getCatById,
  };
};

export default CatServices;
