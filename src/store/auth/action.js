import {
  oneLoginRedirectService,
  verifyLoggedInUserService,
  userSigninService,
  keepMeAliveService,
  logoutApi,
  tokenValidity,
  doRegister,
  passwordChangeApi,
  forgotPasswordApi,
  resetPasswordApi,
} from '../../services/auth.service';
import ActionTypes from './actionTypes';
import { showLoader, hideLoader } from '../common/action';
import { showApiError } from 'utils';
import { successToast } from 'components/common/SnackBar';

export const oneLoginRedirect = () => dispatch => {
  dispatch(showLoader());
  return oneLoginRedirectService()
    .then(response => {
      dispatch(hideLoader());
      if (response.status !== 'ok') {
        throw '';
      }
      return response.result;
    })
    .catch(errorResponse => {
      dispatch(hideLoader());
      throw '';
    });
};

export const verifyLoggedInUser = (manager_filter = false) => dispatch => {
  dispatch(showLoader());
  return verifyLoggedInUserService()
    .then(response => {
      dispatch(hideLoader());
      if (response.status !== 'ok') {
        throw '';
      }
      dispatch(signinSuccess(response.result))
      return response.result
    })
    .catch(errorResponse => {
      dispatch(hideLoader());
      throw '';
    });
};

export const keepMeAlive = () => dispatch => {
  dispatch(showLoader());
  return keepMeAliveService()
    .then(response => {
      dispatch(hideLoader());
      if (response.status !== 'ok') {
        throw '';
      }
      return response.result;
    })
    .catch(errorResponse => {
      dispatch(hideLoader());
      throw '';
    });
};

export const userSignin = (username, password) => dispatch => {
  dispatch(signinInprogress());
  return userSigninService(username, password)
    .then(response => {
      if (response.status === 'ok') {
        return response.result;
      }
      throw response.message;
    })
    .catch(errorResponse => {
      showApiError(errorResponse);
      dispatch(signinFail(errorResponse && errorResponse[0]));
      throw errorResponse;
    });
};

export const logout = () => dispatch => {
  dispatch(showLoader());
  return logoutApi()
    .then(response => {
      dispatch({ type: ActionTypes.LOGOUT });
      dispatch(hideLoader());
      return response;
    })
    .catch(errorResponse => {
      dispatch(hideLoader());
      return false;
    });
};

export const signinInprogress = () => ({
  type: ActionTypes.SIGNIN_INPROGRESS,
});

export const signinIdle = () => ({
  type: ActionTypes.SIGNIN_IDLE,
});

export const signinSuccess = user => {
  return {
    type: ActionTypes.SIGNIN_SUCCESS,
    payload: { user },
  };
};

export const signinFail = error => ({
  type: ActionTypes.SIGNIN_FAIL,
  payload: { error },
});

export const clearError = () => ({
  type: ActionTypes.CLEAR_ERROR,
});

export const checkTokenValidity = tokenId => dispatch => {
  dispatch({ type: ActionTypes.SET_LOADER, payload: true });
  return tokenValidity(tokenId)
    .then(response => {
      dispatch({ type: ActionTypes.SET_LOADER, payload: false });
      return response;
    })
    .catch(errorResponse => {
      dispatch({ type: ActionTypes.SET_LOADER, payload: false });
      return errorResponse;
    });
};

export const registerUser = data => dispatch => {
  dispatch({ type: ActionTypes.SET_LOADER, payload: true });
  return doRegister(data)
    .then(response => {
      dispatch({ type: ActionTypes.SET_LOADER, payload: false });
      return response;
    })
    .catch(errorResponse => {
      dispatch({ type: ActionTypes.SET_LOADER, payload: false });
      return errorResponse;
    });
};

export const changePassword = data => dispatch => {
  dispatch({ type: ActionTypes.SET_LOADER, payload: true });
  return passwordChangeApi(data)
    .then(response => {
      dispatch({ type: ActionTypes.SET_LOADER, payload: false });
      return response;
    })
    .catch(errorResponse => {
      dispatch({ type: ActionTypes.SET_LOADER, payload: false });
      return errorResponse;
    });
};

export const forgotPassword = data => dispatch => {
  dispatch({ type: ActionTypes.SET_LOADER, payload: true });
  return forgotPasswordApi(data)
    .then(response => {
      dispatch({ type: ActionTypes.SET_LOADER, payload: false });
      return response;
    })
    .catch(errorResponse => {
      dispatch({ type: ActionTypes.SET_LOADER, payload: false });
      return errorResponse;
    });
};

export const resetPassword = data => dispatch => {
  dispatch({ type: ActionTypes.SET_LOADER, payload: true });
  return resetPasswordApi(data)
    .then(response => {
      dispatch({ type: ActionTypes.SET_LOADER, payload: false });
      return response;
    })
    .catch(errorResponse => {
      dispatch({ type: ActionTypes.SET_LOADER, payload: false });
      return errorResponse;
    });
};
