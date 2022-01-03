
import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { combineReducers } from 'redux';
import { createMemoryHistory } from 'history';

import common from 'store/common/reducer';
import transcripts from 'store/transcripts/reducer';

afterEach(cleanup);
global.MutationObserver = class {
  constructor(callback) { }
  disconnect() { }
  observe(element, initObject) { }
};

const reducers = combineReducers({
  common,
  transcripts
});

const renderWithRouterAndRedux = (
  component,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    preloadedState,
    customStore
  } = {}
) => {
  const store = customStore ? customStore : createStore(reducers, preloadedState, applyMiddleware(thunk));
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          {component}
        </Router>
      </Provider>,
    ),
    history,
    store,
  }
}

export default renderWithRouterAndRedux;