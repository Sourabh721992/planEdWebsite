const GetCurrentDate = () => {
  return new Promise((resolve, reject) => {
    let dt = new Date();
    let zoneOffset = dt.getTimezoneOffset();
    //dt = new Date(dt.getTime() + (zoneOffset + 330) * 60 * 1000);
    let currentDate = dt.getDate() + " ";

    //get Month
    switch (dt.getMonth()) {
      case 0:
        currentDate += "Jan, ";
        break;
      case 1:
        currentDate += "Feb, ";
        break;
      case 2:
        currentDate += "Mar, ";
        break;
      case 3:
        currentDate += "Apr, ";
        break;
      case 4:
        currentDate += "May, ";
        break;
      case 5:
        currentDate += "Jun, ";
        break;
      case 6:
        currentDate += "Jul, ";
        break;
      case 7:
        currentDate += "Aug, ";
        break;
      case 8:
        currentDate += "Sep, ";
        break;
      case 9:
        currentDate += "Oct, ";
        break;
      case 10:
        currentDate += "Nov, ";
        break;
      case 11:
        currentDate += "Dec, ";
        break;
    }

    currentDate += dt.getFullYear();
    return resolve(currentDate);
  });
};

const GetCurrentEpochTime = () => {
  return new Promise((resolve, reject) => {
    let dt = new Date();
    let zoneOffset = dt.getTimezoneOffset();
    zoneOffset = 0; //bcz our server is showing time in gmt and its zoneoffset is -120.
    //dt = new Date(dt.getTime() + (zoneOffset + 330) * 60 * 1000);
    return resolve(Math.trunc(dt.getTime() / 1000));
  });
};

const GetCurrentYear = () => {
  return new Promise((resolve, reject) => {
    let dt = new Date();
    let zoneOffset = dt.getTimezoneOffset();
    zoneOffset = 0; //bcz our server is showing time in gmt and its zoneoffset is -120.
    //dt = new Date(dt.getTime() + (zoneOffset + 330) * 60 * 1000);
    return resolve(dt.getFullYear());
  });
};

const GetCurrentTimeIn24HoursFormat = () => {
  return new Promise((resolve, reject) => {
    let dt = new Date();
    let zoneOffset = dt.getTimezoneOffset();
    zoneOffset = 0; //bcz our server is showing time in gmt and its zoneoffset is -120.
    // dt = new Date(dt.getTime() + (zoneOffset + 330) * 60 * 1000);

    return resolve(dt.getHours() + ":" + dt.getMinutes());
  });
};

const GetTimeAsNumberOfMinutes = (time) => {
  let timeParts = time.split(":");
  let timeInMinutes = Number(timeParts[0]) * 60 + Number(timeParts[1]);
  return timeInMinutes;
};

export {
  GetCurrentDate,
  GetCurrentEpochTime,
  GetCurrentYear,
  GetCurrentTimeIn24HoursFormat,
  GetTimeAsNumberOfMinutes,
};
