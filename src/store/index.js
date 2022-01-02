import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import common from './common/reducer';
import transcripts from './transcripts/reducer';

const loggerMiddleware = createLogger();

const appReducer = combineReducers({
  common,
  transcripts
});

const rootReducer = (stateData, action) => {
  let state = stateData;
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
