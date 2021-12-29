import { axios, endpoints, errorHandler, successHandler } from './utils';



export const fetchGlobalSearchListService = (request) => {
  return axios
    .get(endpoints.fetchGlobalSearchList(request))
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const fetchDomainListService = () => {
  return axios
    .get(endpoints.fetchDomainList)
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const getChannelListService = () => {
  return axios
    .get(endpoints.getChannelList)
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};