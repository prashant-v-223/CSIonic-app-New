import * as moment from "moment";

export const getDaysArray = (year, month) => {
  var monthIndex = month - 1; // 0..11 instead of 1..12
  var date = new Date(year, monthIndex, 1);
  var result = [];
  while (date.getMonth() == monthIndex) {
    result.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }
  return result;
};
