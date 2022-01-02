import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import ActionTypes from './auth/actionTypes';
import auth from './auth/reducer';
import common from './common/reducer';
import retain from './retain/reducer';
import dna from './dna/reducer';

const loggerMiddleware = createLogger();

const appReducer = combineReducers({
  auth,
  common,
  retain,
  dna
});

const rootReducer = (stateData, action) => {
  let state = stateData;
  if (action.type === ActionTypes.LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

function configureStore(preloadedState) {
  const middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares, thunkMiddleware)),
  );
}

export default configureStore();
