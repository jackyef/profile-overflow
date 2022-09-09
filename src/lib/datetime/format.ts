let monthYearFormatter: Intl.DateTimeFormat;
let dayMonthYearFormatter: Intl.DateTimeFormat;

export const formatMonthYear = (date: Date) => {
  if (!monthYearFormatter) {
    monthYearFormatter = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }

  return monthYearFormatter.format(date);
};

export const formatDayMonthYear = (date: Date) => {
  if (!dayMonthYearFormatter) {
    dayMonthYearFormatter = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return dayMonthYearFormatter.format(date);
};
