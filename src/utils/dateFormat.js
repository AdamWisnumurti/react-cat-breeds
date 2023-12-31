import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

export const dateFormat = (date, format) => {
  if (date) {
    const finalDate = moment(date).format(format);
    return finalDate;
  }
};
