import ActionTypes from './actionTypes';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: {},
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ActionTypes.SIGNIN_INPROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SIGNIN_IDLE:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case ActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };
    case ActionTypes.SIGNIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    case ActionTypes.SET_LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
