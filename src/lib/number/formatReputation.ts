export const formatReputation = (reputation: number): string => {
  if (Math.abs(reputation) >= 10000) {
    return `${(reputation / 1000).toFixed(1)}k`;
  }

  return String(Math.abs(reputation))
    .split('')
    .reverse()
    .reduce((acc, v, index) => {
      if ((index + 1) % 4 === 0) {
        return `${v},${acc}`;
      }

      return `${v}${acc}`;
    });
};
