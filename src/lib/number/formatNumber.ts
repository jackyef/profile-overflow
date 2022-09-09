export const formatNumber = (number: number): string => {
  if (Math.abs(number) >= 1000) {
    return `${(number / 1000).toFixed(1)}k+`;
  }

  return String(Math.abs(number))
    .split('')
    .reverse()
    .reduce((acc, v, index) => {
      if ((index + 1) % 4 === 0) {
        return `${v},${acc}`;
      }

      return `${v}${acc}`;
    });
};
