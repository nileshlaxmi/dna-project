import actionTypes from './actionTypes';
import { showLoader, hideLoader } from '../common/action';
import { showApiError, showApiSuccess } from 'utils';
import {
  fetchRetainUsersService,
  getFailedCaptureService,
  getSignedImageUrlUniqueLoginService,
  fetchEmployeeInfoService,
  fetchEmpDetailsService,
} from 'services/retain.service';

export const fetchRetainUsers = request => dispatch => {
  dispatch(showLoader());
  return fetchRetainUsersService(request)
    .then(response => {
      if (response.status === 'ok') {
        dispatch({
          type: actionTypes.GET_RETAIN_USERS_SUCCESS,
          payload: response,
        });
      }
      dispatch(hideLoader());
      return response;
    })
    .catch(error => {
      dispatch(hideLoader());
      showApiError(error);
      return error;
    });
};

export const fetchEmployeeInfo = empId => dispatch => {
  dispatch(showLoader());
  return fetchEmployeeInfoService(empId)
    .then(response => {
      if (response.status === 'ok') {
        dispatch({
          type: actionTypes.GET_EMPLOYEE_DETAILS_SUCCESS,
          payload: response.result,
        });
      }
      dispatch(hideLoader());
      return response;
    })
    .catch(error => {
      dispatch(hideLoader());
      showApiError(error);
      return error;
    });
};

export const getFailedCapture = payload => dispatch => {
  dispatch(showLoader());
  return getFailedCaptureService(payload)
    .then(res => {
      dispatch({
        type: actionTypes.GET_FAILED_CAPTURES,
        payload: res,
      });
      dispatch(hideLoader());
      return res;
    })
    .catch(error => {
      dispatch(hideLoader());
      showApiError(error);
      return error;
    });
};

export const getSignedImageUrlUniqueLogin = payload => dispatch => {
  dispatch(showLoader());
  return getSignedImageUrlUniqueLoginService(payload)
    .then(res => {
      dispatch(hideLoader());
      return res;
    })
    .catch(error => {
      dispatch(hideLoader());
      showApiError(error);
      return error;
    });
};

export const fetchEmpDetails = empId => dispatch => {
  dispatch(showLoader());
  return fetchEmpDetailsService(empId)
    .then(response => {
      dispatch(hideLoader());
      return response;
    })
    .catch(error => {
      dispatch(hideLoader());
      showApiError(error);
      return error;
    });
};


