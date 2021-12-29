import ActionTypes from './actionTypes';

const initialState = {
  isLoading: false,
  error: null,
  retainUsers: null,
  retainSearchUsers: null,
  failedCaptures: null,
  successCaptures: null,
  employeeDetails: null,
  exemptedList: null,
  exemptedSearchUser: null,
  failedCapturesReasons: null,
};

const retainReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_RETAIN_USERS_SUCCESS:
      return {
        ...state,
        retainUsers: payload,
      };
    case ActionTypes.GET_FAILED_CAPTURES:
      return {
        ...state,
        failedCaptures: payload,
      };
      case ActionTypes.GET_FAILED_REASON:
      return {
        ...state,
        failedCapturesReasons: payload,
      };
    case ActionTypes.GET_SUCCESS_CAPTURES:
      return {
        ...state,
        successCaptures: payload,
      };
    case ActionTypes.GET_RETAIN_USERS_SEARCH_SUCCESS:
      return {
        ...state,
        retainSearchUsers: payload,
      };
    case ActionTypes.GET_RETAINED_LIST_SUCCESS:
      return {
        ...state,
        retainedList: payload,
      };
    case ActionTypes.GET_RETAINED_NOISE_LIST_SUCCESS:
      return {
        ...state,
        retainedNoiseList: payload,
      };  
    case ActionTypes.GET_RETAIN_DETAILS_SUCCESS:
      return {
        ...state,
        retainedDetails: payload,
      };
    case ActionTypes.GET_EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        employeeDetails: payload,
      };
    case ActionTypes.GET_EXEMPTED_LIST_SUCCESS:
      return {
        ...state,
        exemptedList: payload,
      };
    case ActionTypes.GET_EXEMPTED_USER_SEARCH_SUCCESS:
      return {
        ...state,
        exemptedSearchUser: payload,
      };
    case ActionTypes.RESUME_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};

export default retainReducer;
