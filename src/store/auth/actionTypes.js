const MODULE_NAME = '[AUTH]';

const ActionTypes = {
  SIGNIN_INPROGRESS: `${MODULE_NAME} signin inprogress`,
  SIGNIN_IDLE: `${MODULE_NAME} signin idle`,
  SIGNIN_SUCCESS: `${MODULE_NAME} signin success`,
  SIGNIN_FAIL: `${MODULE_NAME} signin fail`,
  LOGOUT: `${MODULE_NAME} logout`,
  CLEAR_ERROR: `${MODULE_NAME} clear error`,
  SET_LOADER: `${MODULE_NAME} SET_LOADER`,
};

export default ActionTypes;
