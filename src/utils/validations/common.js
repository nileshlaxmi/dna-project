export const constants = {
  numeric: /^[0-9]{10}$/,
  alphaNumeric: /^[0-9a-zA-Z]+$/,
  startsWithAlphaNumeric: /^[a-zA-Z][0-9a-zA-Z]+$/,
  specialCharsNoSpace: /^[a-zA-Z][0-9a-zA-Z-_]+$/,
  specialCharsWithSpace: /^[a-zA-Z][0-9a-zA-Z-_ ]+$/,
  alphabetsWithSpace: /^[a-zA-Z][a-zA-Z ]*$/,
  alphabetsWithSpaceOrEmpty: /^$|^[a-zA-Z][a-zA-Z ]*$/,
  specialCharsWithSpaceForVariables: /^[{}$a-zA-Z][0-9a-zA-Z-_{} :$]+$/,
  onlySpace: /^[ ]+$/,
  searchRegex: /[*&#%]+/
};

export const isNumeric = value => constants.numeric.test(value);
export const isAlphaNumeric = value => constants.alphaNumeric.test(value);
export const specialCharsWithSpace = value =>
  constants.specialCharsWithSpace.test(value);
export const alphabetsWithSpace = value =>
  constants.alphabetsWithSpace.test(value);
export const alphabetsWithSpaceOrEmpty = value =>
  constants.alphabetsWithSpaceOrEmpty.test(value);
export const validateRequired = value =>
  value && value.toString().trim().length > 0;

export const validateMinLength = (value, minLength) => {
  try {
    if (typeof value === 'number') {
      if (value >= minLength) return true;
    } else {
      if (value.trim().length >= minLength) return true;
    }
  } catch (e) {
    console.error('exception in validateMinLength ', JSON.stringify(e));
    return true;
  }
};

export const validateMaxLength = (value, maxLength) => {
  try {
    if (typeof value === 'number') {
      if (!maxLength || value <= 0) return true;
      if (value && value >= maxLength) return false;
    } else {
      if (!maxLength || value.trim().length <= 0) return true;
      if (value && value.trim().length >= maxLength) return false;
    }
    return true;
  } catch (e) {
    console.error('exception in validateMaxLength ', JSON.stringify(e));
    return true;
  }
};

