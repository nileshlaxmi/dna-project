import { successHandler, errorHandler, axios, endpoints } from './utils';

export const fetchRetainUsersService = request => {
  return axios
    .get(endpoints.fetchRetainUsers(request))
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const fetchEmployeeInfoService = empId => {
  return axios
    .get(endpoints.employeeInfo(empId))
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const getFailedCaptureService = request => {
  return axios
    .get(endpoints.getFailedCapture(request))
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const getSignedImageUrlUniqueLoginService = request => {
  return axios
    .get(endpoints.getSignedImageUrlUniqueLogin(request))
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const fetchEmpDetailsService = empId => {
  return axios
    .get(endpoints.employeeDetails(empId))
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};
