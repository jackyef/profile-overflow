let formatter: Intl.DateTimeFormat;

export const format = (date: Date) => {
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }

  return formatter.format(date);
};
