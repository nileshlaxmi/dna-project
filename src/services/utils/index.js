import errorMessages from 'constants/errorMessages';

export { default as endpoints } from './endpoints';
export { default as axios } from './axios';

export const successHandler = res => {
  return Promise.resolve(res.data);
};

export const errorHandler = ({ request, response, message }) => {
  if (response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    let err = response.data && (response.data.error || response.data.message);
    if (response.status === 500) {
      err = [errorMessages.apiError(response.status)];
    }
    return Promise.reject(err);
  } else if (request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return Promise.reject(['Something went wrong']);
  } else {
    // Something happened in setting up the request that triggered an Error
    return Promise.reject([message]);
  }
};
