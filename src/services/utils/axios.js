import axios from 'axios';
import store from 'store';
import { logout } from '../../store/auth/action';

const instance = axios.create({
  baseURL: '',
  timeout: 45000,
  headers: { Pragma: 'no-cache' },
});

const requestHandler = request => {
  return request;
};

// request intercepter
instance.interceptors.request.use(request => requestHandler(request));

// response intercepter
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      let pathname = window.location.pathname;
      if (pathname.includes(`bulk-upload`)) {
        sessionStorage.setItem('pathname', pathname);
      }
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default instance;
