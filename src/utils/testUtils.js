
import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { combineReducers } from 'redux';
import { createMemoryHistory } from 'history';

import auth from 'store/auth/reducer';
import common from 'store/common/reducer';
import notification from 'store/notification/reducer';
import users from 'store/manageUsers/reducer';
import employees from 'store/employees/reducer';
import analytics from 'store/analytics/reducer';
import retain from 'store/retain/reducer';
import settings from 'store/settings/reducer';
import utility from 'store/utility/reducer';
import alert from 'store/alert/reducer';
import employeeTeam from 'store/employeeTeam/reducer';
import employeeReport from 'store/employeeReport/reducer';
import noise from 'store/noiseDetection/reducer';
import auditTrail from 'store/auditTrail/reducer';

import { ActionTypes } from 'store/auth/actionTypes';

afterEach(cleanup);
global.MutationObserver = class {
  constructor(callback) { }
  disconnect() { }
  observe(element, initObject) { }
};

const reducers = combineReducers({
  auth,
  common,
  users,
  employees,
  analytics,
  retain,
  settings,
  utility,
  alert,
  employeeReport,
  noise,
  notification,
  employeeTeam,
  auditTrail,
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