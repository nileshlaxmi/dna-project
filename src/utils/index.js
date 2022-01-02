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

export const isLocalHost = () => window.location.hostname === 'localhost';

export const getInitials = name => {
  return name
    .match(/(\b\S)?/g)
    .join('')
    .toUpperCase();
};
