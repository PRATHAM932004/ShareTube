import moment from 'moment';
export const defaultDateFormat = 'DD-MM-YYYY HH:mm:ss';

export const numberToTime = (duration: number) => {
  return duration >= 3600
    ? moment.utc(duration * 1000).format('HH:mm:ss')
    : moment.utc(duration * 1000).format('mm:ss');
};

export const customTimeAgo = (date: Date) => {
  const now = moment();
  const givenDate = moment(date);

  const diffDays = now.diff(givenDate, 'days');
  const diffWeeks = now.diff(givenDate, 'weeks');
  const diffMonths = now.diff(givenDate, 'months');
  const diffYears = now.diff(givenDate, 'years');

  if (diffDays <= 6) {
    return diffDays === 0
      ? 'Today'
      : `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  }

  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  }

  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
};
