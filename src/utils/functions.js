import moment from 'moment';

export const isFirefox =
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

export const titleCase = (str = '') => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const replaceText = (text, words = []) => {
  try {
    let str = text;
    words.forEach(o => (str = str.split(o.src_word).join(o.replaced_word)));
    return str;
  } catch (e) {
    return text;
  }
};

export const validateEmail = (email, ignoreString) => {
  if (email === ignoreString) return true;
  // eslint-disable-next-line
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const getTimezoneOffset = () => {
  return moment().format('Z');
};

export const getDateUTCFormat = date => {
  return moment.parseZone(date).format();
};
