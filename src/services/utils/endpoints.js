import { getTimezoneOffset } from 'utils/functions';
const timeZone = getTimezoneOffset();

const endpoints = {
  // auth apis
  oneLogin: '/api/saml/login',
  login: '/api/account/login',
  me: '/api/account/me',
  keepMeAlive: '/api/v1/me',
  logout: '/api/account/logout',
  forgotPassword: '/api/account/password/forgot',
  passwordReset: '/api/account/password/reset',
  passwordChange: '/api/account/password/change',
  checkTokenValidity: tokenId => `/api/account/user/invite/verify/${tokenId}`,
  registerUser: tokenId => `/api/account/user/register/${tokenId}`,

  fetchRetainUsers: ({
    sortOrder,
    sortBy,
    page,
    size,
    start_date,
    end_date,
    time_zone,
    filterList,
    managerFilter,
    channelFilter,
  }) => 
  `/api/v1/emp/screen-capture/list?${page ? 'page=' + page : ''}${size ? '&size=' + size : ''}${sortBy ? '&sort=' + sortBy : ''}${sortOrder ? '&order=' + sortOrder : ''}${start_date ? '&start_date=' + start_date : ''}${end_date ? '&end_date=' + end_date : ''}${time_zone ? '&time_zone=' + encodeURIComponent(time_zone) : ''}`,
    // `/api/v1/emp/retain/status?${page ? 'page=' + page : ''}${size ? '&size=' + size : ''}${sortBy ? '&sort=' + sortBy : ''}${sortOrder ? '&order=' + sortOrder : ''}${start_date ? '&start_date=' + start_date : ''}${end_date ? '&end_date=' + end_date : ''}${time_zone ? '&time_zone=' + encodeURIComponent(time_zone) : ''}${filterList ? '&filterList=' + filterList : ''}${channelFilter ? '&channelFilter=' + channelFilter : ''}${managerFilter ? '&managerFilter=' + managerFilter : ''}`,
  
  employeeInfo: empId => `/api/v1/emp/${empId}`,
  
  employeeDetails: empId => `/api/v1/emp/unique_login/${empId}`,

  getFailedCapture: ({
    username,
    empId,
    sortOrder,
    sortBy,
    page,
    size,
    start_date,
    end_date,
    time_zone,
    type,
    filterReason,
  }) => 
    `/api/v1/emp/${username}/screen-capture?${page ? 'page=' + page : ''}${size ? '&size=' + size : ''}${sortBy ? '&sort=' + sortBy : ''}${sortOrder ? '&order=' + sortOrder : ''}${start_date ? '&start_date=' + start_date : ''}${end_date ? '&end_date=' + end_date : ''}${time_zone ? '&time_zone=' + encodeURIComponent(time_zone) : ''}${type ? '&type=' + type : ''}`,

  getGeneSymbol: ({species, gene_symbol, pageNumber=1}) => `/lookup/symbol/${species}/${gene_symbol}.json?;expand=${pageNumber}`

};

export default endpoints;
