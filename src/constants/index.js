import closeSuccess from 'assets/images/closeGreen.svg';
import closeError from 'assets/images/closeError.svg';
import closeWarning from 'assets/images/closeWarning.svg';

export const CONSTANTS = {
  registration: 'Registration Form',
  resetPwd: 'Reset Password',
  changePwd: 'Change Password',
  forgotPwd: 'Forgot Password',
  logoutTxt: 'Logout',
  regPwdText: value => `${value} Password`,
  registerUserSuccess:
    'Welcome to TELUS Face Detection Admin Console. You are registered successfully',
  resetPwdTxt: 'Password reset successfully',
  changePwdTxt: 'Password updated successfully',
  forgotPasswordMailSuccess:
    'We will send you an email with reset password link.',
  // active: count => (count === 1 ? 'Active Employee' : 'Active Employees'),
  // inactive: count =>
  //   count === 1 ? 'Deactivated Employee' : 'Deactivated Employees',
  // verified: count => (count === 1 ? 'Verified Employee' : 'Verified Employees'),
  // not_verified: count =>
  //   count === 1 ? 'Unverified Employee' : 'Unverified Employees',
  login: 'Face Detection',
  minPwdChars: 'Enter (Minimum 8 chars)',
  minChars: 'Minimum 8 chars',
  fdText: 'Face Detection',
  noResults: 'No results found',
  sessionTimeOutHeader: 'Your session is about to expire!',
  sessionTimeOutLogout: 'You will be logged out in ',
  sessionTimeOutSigned: 'Do you want to stay signed in?',
  stayConnected: 'Yes! Keep me signed in',
  signMeOut: 'No! Sign me out',
  sessionWhere: 'Where have you gone?',
  sessionTimedOut: 'Your Session has timed out.',
  sessionWorry: `Don't worry!`,
  sessionLogin: 'Click Here to Login',
  notFoundLabel: {
    hiThere: 'Hi There!',
    somethingWentWrong: 'I think something went wrong.',
    pageNotFound: 'The page you are looking for does not exist or unavailable.',
    goBack: 'GO BACK TO HOMEPAGE',
  },
  accessDenied: {
    label: 'Access Denied!',
    statement: 'You do not have permission to access this application.',
  },
  linkExpired: {
    label: 'Sign-in link expired !',
    statement:
      'Hi,there your link has expired because you haven’t used it. Please connect your admin/manager for support.',
  },
  logoutText: {
    label: 'You have signed out from Face Detection.',
  },
};

export const SESSION_TIMEOUT = 1000 * 60 * 28; // 1000 * 60 * 28
export const SESSION_TIMEOUT_NEXT = 1000 * 60 * 2; // 1000 * 60 * 2


export const inputTypes = {
  slider: 'slider',
  dateRangePicker: 'dateRangePicker',
  select: 'select',
  checkbox: 'checkbox',
  input: 'input',
  toggle: 'toggle',
  radio: 'radio',
  languagePicker: 'languagePicker',
  multiSelect: 'multiSelect',
};
