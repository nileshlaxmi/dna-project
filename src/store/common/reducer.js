import ActionTypes from './actionTypes';

const initialState = {
  isLoading: false,
};

const commonReducer = (state = initialState, action) => {
  const { type } = action;
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
    default:
      return state;
  }
};

export default commonReducer;
