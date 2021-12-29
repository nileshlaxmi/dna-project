import moment from 'moment';

export const getSpecificFormattedDateTime = (
  date = new Date(),
  format = '',
) => {
  return moment(date).format(format);
};
