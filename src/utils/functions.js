import moment from 'moment';
import { isEqual } from 'lodash';

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

export const getFileNameFromPath = (url = '') => {
  return url.split('/').pop();
};
export const getUserNameFromEmail = (email = '') => {
  return email.split('@')[0] || '';
};

export const getUnretainedImageUrl = (row = {}, img, numCaptures = 3) => {
  let imgArr = [];
  let isImageFound = false;
  (row.image_url || []).forEach(image => {
    let url = '';
    if (image && !image.status && (!img || image.url === img.url)) {
      url = image.url;
      isImageFound = true;
    }
    imgArr.push(url);
  });

  /**
   * Based on number of captures
   * ***/
  // for (var i = 0; i < numCaptures; i++) {
  //   let image = row.image_url && row.image_url[i];
  //   let url = '';
  //   if (image && !image.status && (!img || image.url === img.url)) {
  //     url = image.url;
  //     isImageFound = true;
  //   }
  //   imgArr.push(url);
  // }
  if (isImageFound) {
    return [{ ...row, image_url: imgArr }];
  }
  return [];
};

export const getUnretainedImageUrlFromDay = dayCaptures => {
  let imgArr = [];
  (dayCaptures || []).forEach(timeCapture => {
    imgArr = [...imgArr, ...getUnretainedImageUrl(timeCapture)];
  });
  return imgArr;
};

export const trackSettingChanges = (initialSettings, settings) => {
  let isUpdated = false;
  /**
   * Track changes in settings
   */
  if (!isUpdated) {
    isUpdated = !isEqual(initialSettings, settings);
  }
  return isUpdated;
};

export const getDurationInSeconds = expireOn => {
  let now = moment(new Date());
  let end = moment(expireOn);
  let duration = moment.duration(end.diff(now));
  return duration.asSeconds();
};
