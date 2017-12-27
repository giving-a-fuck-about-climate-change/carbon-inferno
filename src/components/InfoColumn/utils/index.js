export const numChecker = num => (isNaN(num) ? 0 : num);

export const calculateDiff = (previous = 0, current = 0) => {
  const diff = current - previous;
  const ppmDiff = numChecker(diff.toFixed(2));
  if (diff > 0) {
    return `+${ppmDiff}`;
  }
  return `${ppmDiff}`;
};

export const calculatePercentageDiff = (previous, current) => {
  const diff = (current - previous) / current * 100; // eslint-disable-line
  const percentageDiff = numChecker(diff.toFixed(2));
  if (diff > 0) {
    return `+${percentageDiff}`;
  }
  return `${percentageDiff}`;
};
