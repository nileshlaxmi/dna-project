import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import '../assets/scss/bootstrapCustom.scss';
import '../assets/scss/app.scss';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import IdleTimer from 'react-idle-timer';

// top level components
import Loader from '../components/shared/loader';

// common components
import Header from 'containers/header';
import Lazyload from '../components/shared/lazyLoad';
import RoutePrivate from '../components/routePrivate';

// auth actions
import {
  verifyLoggedInUser,
  signinSuccess,
  logout,
  keepMeAlive,
} from '../store/auth/action';
import { isLoadingSelector } from '../store/common/selector';

import SigninContainer from './auth/signin';
import UniqueLogin from './uniqueLogin';
import EmployeeInfo from './employeeInfo';
// import ForgotPassword from './auth/forgotPassword';
// import ResetPassword from './auth/resetPassword';
import RoutePublic from 'components/routePublic';
// import UserRegistration from 'containers/auth/userRegistration';
import { SESSION_TIMEOUT, SESSION_TIMEOUT_NEXT } from 'constants/index';
import SnackbarToast from 'components/common/SnackBar';
import ScrollToTop from 'components/common/ScrollToTop';
import SessionWarning from 'components/sessionTimeOut/SessionWarning';
import SessionTimeout from 'components/sessionTimeOut';
import Logout from 'components/logout';
import AccessDenied from 'components/accessDenied';

// lazy loaded components
const Notfound = Lazyload(() => import('../components/notFound/'));

// root app component
class App extends Component {
  state = {
    icons: { className: 'app-icons' },
    isMounted: false,
    isPopupOpen: false,
  };

  componentDidMount() {
    this.getServiceCall();
  }

  getServiceCall = () => {
    this.props
      .verifyLoggedInUser()
      .then(res => {
        this.setState({
          isMounted: true,
        });
      })
      .catch(err => {
        this.setState({
          isMounted: true,
        });
      });
  };

  handleOnAction = evt => {
    this.handleSessionTimeOutOnSleep();
  };

  handleSessionTimeOutOnSleep = () => {
    const lastActiveTime = this.idleTimer.getLastActiveTime();
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const halfHour = SESSION_TIMEOUT + SESSION_TIMEOUT_NEXT; // 1800000 ms
    const diff = currentTime - lastActiveTime;
    if (diff >= halfHour) {
      window.location.href = '/session-timeout';
    }
  };

  handleOnIdle = () => {
    this.setState({ isPopupOpen: true });
    this.setTimerCounter = setTimeout(() => {
      this.setState({ isSessionTimeOut: true, isPopupOpen: false }, () => {
        window.location.href = '/session-timeout';
      });
    }, SESSION_TIMEOUT_NEXT);
  };

  onLogout = () => {
    clearTimeout(this.setTimerCounter);
    // window.location.href = '/logout';
    this.props.logout();
  };

  onClosePopUp = () => {
    this.setState({ isPopupOpen: false, isSessionTimeOut: false }, () => {
      clearTimeout(this.setTimerCounter);
      this.props.keepMeAlive();
    });
  };

  render() {
    const { isMounted, isPopupOpen, isSessionTimeOut } = this.state;
    const { isLoading } = this.props;
    const { isAuthenticated } = this.props.authInfo;
    const href = (window.location.href || '').toLowerCase();
    const isTopLeftMargin = !href.includes('logout') && isAuthenticated;
    return (
      <IconContext.Provider value={this.state.icons}>
        <Router basename={process.env.REACT_APP_BASE_URL}>
          <ScrollToTop />
          <SnackbarToast />
          {isAuthenticated && (
            <IdleTimer
              ref={ref => {
                this.idleTimer = ref;
              }}
              timeout={SESSION_TIMEOUT}
              onIdle={this.handleOnIdle}
              onAction={this.handleOnAction}
              debounce={0}
              crossTab={false}
            />
          )}
          {isLoading && <Loader show={true} />}
          {isTopLeftMargin && (
            <>
              <div className="fixed-top-header">
                <Header {...this.props} />
              </div>
            </>
          )}
          {isPopupOpen && (
            <SessionWarning
              isPopupOpen={isPopupOpen}
              closeSessionPopUp={this.onClosePopUp}
              onLogout={this.onLogout}
            />
          )}
          {isMounted && (
            <main className={`app__main face-detection-admin ${isTopLeftMargin ? 'page-authenticated' : ''}`} >
              <div className={`face-detection-page ${isTopLeftMargin ? 'page-authenticated' : ''}`} >
                <Switch>
                  {/* <Route
                    path="/logout"
                    exact
                    render={props => (
                      <Logout {...props} logout={this.props.logout} />
                    )}
                  /> */}
                  <RoutePublic
                    isAuthenticated={isAuthenticated}
                    path="/"
                    exact
                    component={SigninContainer}
                  />

                  {/* <RoutePublic
                    isAuthenticated={isAuthenticated}
                    path="/reset-password/:token"
                    exact
                    component={ResetPassword}
                  />
                  <RoutePublic
                    isAuthenticated={isAuthenticated}
                    path="/forgot-password"
                    exact
                    component={ForgotPassword}
                  /> */}
                  {/* <RoutePublic
                    isAuthenticated={isAuthenticated}
                    path="/forgot-password"
                    exact
                    component={ForgotPassword}
                  />
                  <RoutePublic
                    isAuthenticated={isAuthenticated}
                    path="/auth/user-registration/:tokenId"
                    exact
                    component={UserRegistration}
                  /> */}
                  <RoutePrivate
                    authInfo={this.props.authInfo}
                    isAuthenticated={isAuthenticated}
                    path="/unique-login"
                    component={UniqueLogin}
                  />
                  <RoutePrivate
                    authInfo={this.props.authInfo}
                    isAuthenticated={isAuthenticated}
                    path="/employee-info/:empId"
                    component={EmployeeInfo}
                  />
                  <RoutePublic
                    isAuthenticated={isAuthenticated}
                    path="/not-found"
                    exact
                    component={Notfound}
                  />
                  <RoutePublic
                    isAuthenticated={isAuthenticated}
                    path="/access-denied"
                    exact
                    component={AccessDenied}
                  />
                  <Route
                    path="/session-timeout"
                    exact
                    render={props => (
                      <SessionTimeout {...props} logout={this.props.logout} />
                    )}
                  />
                  <Redirect to={isSessionTimeOut ? '/session-timeout' : '/'} />
                </Switch>
              </div>
            </main>
          )}
        </Router>
      </IconContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.auth,
    isLoading: isLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  logout,
  signinSuccess,
  verifyLoggedInUser,
  keepMeAlive,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
