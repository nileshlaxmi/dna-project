import {
  autoSearchService,
  fetchNotificationsListService,
  setNotificationService,
  fetchGlobalSearchListService,
  fetchDomainListService,
  getChannelListService,
} from 'services/common.service';
import { showApiError } from 'utils';
import actionTypes from './actionTypes';

export const showLoader = () => dispatch => {
  dispatch({ type: actionTypes.SHOW_LOADING });
};

export const hideLoader = () => dispatch => {
  dispatch({ type: actionTypes.HIDE_LOADING });
};

export const resetAutoSuggestions = () => ({
  type: actionTypes.RESET_AUTO_SUGGESTIONS,
});

export const fetchGlobalSearchList = id => dispatch => {
  dispatch(showLoader());
  return fetchGlobalSearchListService(id)
    .then(response => {
      dispatch({
        type: actionTypes.SET_GLOBAL_SEARCH_LIST,
        payload: response,
      });
      dispatch(hideLoader());
      return response;
    })
    .catch(errorResponse => {
      dispatch(hideLoader());
      // showApiError(errorResponse);
      return errorResponse;
    });
};

export const fetchDomainList = () => dispatch => {
  return fetchDomainListService()
    .then(response => {
      dispatch({
        type: actionTypes.FETCH_DOMAIN_LIST_SUCCESS,
        payload: response.result,
      });
      return response.result;
    })
    .catch(errorResponse => {
      return errorResponse;
    });
};

export const getChannelList = () => dispatch => {
  //dispatch(showLoader());
  return getChannelListService()
    .then(response => {
      dispatch({
        type: actionTypes.FETCH_CHANNEL_LIST_SUCCESS,
        payload: response.result,
      });
      //dispatch(hideLoader());
      return response.result;
    })
    .catch(errorResponse => {
      //dispatch(hideLoader());
      showApiError(errorResponse);
      return errorResponse;
    });
};