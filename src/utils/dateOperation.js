function unixTime2Date(unixTimestamp) {
  return new Date(unixTimestamp * 1000);
}

function unixTime2FormatDate(unixTimestamp) {
  const date = unixTime2Date(unixTimestamp);
  return originDate2FormatDate(date);
}

//
function originDate2FormatDate(date) {
  let year = "" + date.getFullYear();
  let month = "" + (date.getMonth() + 1);
  if (month.length === 1) {
    month = "0" + month;
  }
  let day = "" + date.getDate();
  if (day.length === 1) {
    day = "0" + day;
  }
  let hour = "" + date.getHours();
  if (hour.length === 1) {
    hour = "0" + hour;
  }
  let minute = "" + date.getMinutes();
  if (minute.length === 1) {
    minute = "0" + minute;
  }
  let second = "" + date.getSeconds();
  if (second.length === 1) {
    second = "0" + second;
  }
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
}

const dateOperation = {
  unixTime2FormatDate: unixTime2FormatDate
};

export default dateOperation;
