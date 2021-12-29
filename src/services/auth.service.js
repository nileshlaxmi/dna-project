import { successHandler, errorHandler, axios, endpoints } from './utils';

export const oneLoginRedirectService = () => {
  return axios
    .get(endpoints.oneLogin)
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const verifyLoggedInUserService = () => {
  return axios
    .get(endpoints.me)
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const keepMeAliveService = () => {
  return axios
    .get(endpoints.keepMeAlive)
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const logoutApi = () => {
  return axios
    .get(endpoints.logout)
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const userSigninService = (username, password) => {
  const payload = {
    email: username,
    password,
    // domain: '',
  };
  return axios
    .post(endpoints.login, payload)
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const forgotPasswordApi = payload => {
  return axios
    .post(endpoints.forgotPassword, payload)
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const resetPasswordApi = payload => {
  return axios
    .post(endpoints.passwordReset, payload)
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const passwordChangeApi = payload => {
  return axios
    .post(endpoints.passwordChange, payload)
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const tokenValidity = tokenId => {
  return axios
    .get(endpoints.checkTokenValidity(tokenId))
    .then(response => {
      return successHandler(response).then(res => {
        return res;
      });
    })
    .catch(errorResponse => {
      return errorHandler(errorResponse);
    });
};

export const doRegister = data => {
  const bodyFormData = {};
  bodyFormData.email = data.email;
  bodyFormData.name = data.name;
  bodyFormData.password = data.password;
  bodyFormData.emp_id = data.emp_id;

  return axios
    .post(endpoints.registerUser(data.tokenId), bodyFormData)
    .then(response => {
      return successHandler(response).then(res => {
        return res;
      });
    })
    .catch(errorResponse => {
      return errorHandler(errorResponse);
    });
};
