import { errorToast, successToast } from 'components/common/SnackBar';
export const isObject = item => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const isObjectKeyPresent = (item, key) => {
  return isObject(item) && item.hasOwnProperty(key);
};

export const showToastSuccess = response => successToast(response);
export const showToastError = error => errorToast(error);

export const showApiError = errors => {
  Array.isArray(errors)
    ? (errors || []).forEach(err => showToastError(err))
    : showToastError(errors);
};

export const showApiSuccess = response => showToastSuccess(response);

export const debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export const checkEnterKey = keyCode => {
  if (keyCode === 13) return true;
};

export const setQueryParams = ({
  sortOrder = '',
  sortBy = '',
  page,
  size,
  searchText = '',
  selectedOption = {},
  start_date = '',
  end_date = '',
  time_zone = '',
  status = '',
}) => {
  const { value = '' } = selectedOption;
  const queryParams = {};
  queryParams.page = page;
  queryParams.size = size;
  queryParams.query = searchText;
  queryParams.start_date = start_date;
  queryParams.end_date = end_date;
  queryParams.time_zone = time_zone;
  queryParams.sort_by = sortBy;
  queryParams.sort_order = sortOrder;

  if (value !== 'all' && Object.keys(selectedOption).length > 0)
    queryParams[`${value}`] = searchText;
  if (status) {
    switch (status) {
      case 'active':
        queryParams.active = 1;
        break;
      case 'deboarded':
      case 'deactivated':
        queryParams.active = 2;
        break;
      case 'verified':
        queryParams.verified = 1;
        queryParams.active = 1;
        break;
      case 'unverified':
        queryParams.verified = 2;
        queryParams.active = 1;
        break;
      default:
        queryParams.active = 0;
        queryParams.verified = 0;
        break;
    }
  }
  return queryParams;
};

export const isLocalHost = () => window.location.hostname === 'localhost';

export const isDevEnvironment = () =>
  isLocalHost() || window.location.hostname === 'fd-dev.xavlab.xyz';

export const checkSelectAll = (objList = []) => {
  let _objList = objList.map(item => {
    if (item.is_allowed) return true;
    else return false;
  });
  if ((_objList || []).includes(false)) return false;
  else return true;
};

export const getInitials = name => {
  return name
    .match(/(\b\S)?/g)
    .join('')
    .toUpperCase();
};

export const objectListCount = (objectList = []) => {
  let objectListAr = objectList.map(item => {
    return (item.objects || []).map(obj => {
      return obj.is_allowed;
    });
  });

  let newObjectListAr = [].concat(...objectListAr);
  let count = 0;

  (newObjectListAr || []).forEach(item => {
    if (item) count++;
  });
  return count;
};

export const checkValidDomain = (email, domainList = []) => {
  let message = { error: '', status: false };
  for (let i = 0; i < domainList.length; i++) {
    domainList[i] = domainList[i].toLowerCase();
  }
  let emailRegEx = /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/;
  let checkValidEmail = emailRegEx.exec(email);
  if (!checkValidEmail) {
    message.error = `Please enter a valid email id`;
    message.status = false;
    return message;
  } else {
    let isValidDomain = false;
    let updatedEmail = checkValidEmail[1].toLowerCase();
    for (let i = 0; i < domainList.length; i++) {
      if (updatedEmail == domainList[i]) {
        isValidDomain = true;
        break;
      }
    }
    if (!isValidDomain) {
      message.error = `Please enter an authorized domain.`;
      message.status = false;
      return message;
    } else {
      message.error = '';
      message.status = true;
      return message;
    }
  }
};

export const checkSupportedFormat = (fileName, allSupportedFormat) => {
  const array = fileName.split('.');
  const fileTye = array.length > 0 && array[array.length - 1].toLowerCase();
  return allSupportedFormat.includes(fileTye);
};

export const settingsRange = (lower_validation, upper_validation) => {
  return `${lower_validation} to ${upper_validation}`;
};
