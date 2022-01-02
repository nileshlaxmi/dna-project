import actionTypes from './actionTypes';

export const showLoader = () => dispatch => {
  dispatch({ type: actionTypes.SHOW_LOADING });
};

export const hideLoader = () => dispatch => {
  dispatch({ type: actionTypes.HIDE_LOADING });
};
