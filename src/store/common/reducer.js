import ActionTypes from './actionTypes';

const initialState = {
  isLoading: false,
  autoSuggestions: [],
  globalSearch: null,
  domainList: [],
  channelList: null,
  // globalSearch: {
  //   "status": "ok",
  //   "result": [
  //       {
  //           "emp_id": "XIND15685",
  //           "uid": "1jV2wMrdrsrsGXbOfr972Y8Q4uL",
  //           "name": "mazin",
  //           "email": "mazin.hafeez@telusinternational.com",
  //           "suspicious_count": 64,
  //           "capture_attempt_count": 43546,
  //           "exempted_count": 64,
  //           "retained_count": 43
  //       }
  //   ],
  //   "_meta": {
  //       "count": 1
  //   }
  // }

};

const commonReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.SHOW_AUTO_SUGGESTIONS:
      return {
        ...state,
        autoSuggestions: payload,
        field: action.field,
      };
    case ActionTypes.RESET_AUTO_SUGGESTIONS:
      return {
        ...state,
        autoSuggestions: [],
      };
    case ActionTypes.SET_GLOBAL_SEARCH_LIST:
      return {
        ...state,
        globalSearch: payload,
      };
    case ActionTypes.FETCH_DOMAIN_LIST_SUCCESS:
      return {
        ...state,
        domainList: payload,
      };
      case ActionTypes.FETCH_CHANNEL_LIST_SUCCESS:
      return {
        ...state,
        channelList: payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
