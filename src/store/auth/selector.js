import { createSelector } from 'reselect';
import store from 'store';

export const userInfoSelector = () => store.getState().auth.user;
export const isAuthenticated = () => store.getState().auth.isAuthenticated;

export const loggedInUser = createSelector(userInfoSelector, loginInfo => {
  if (loginInfo && loginInfo.userInfo) {
    return loginInfo.userInfo;
  }
  return null;
});
