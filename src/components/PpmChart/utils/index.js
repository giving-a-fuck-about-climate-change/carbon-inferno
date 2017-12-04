const binarySearch = (data = [{}], target = 0) => {
  const end = data.length - 1;
  if (target >= data[0].svgX) {
    return data[0];
  }
  if (target <= data[end].svgX) {
    return data[end];
  }
  let middle = Math.round(data.length / 2);
  while (middle <= end) {
    // debugger; //eslint-disable-line
    if (target >= data[middle].svgX) {
      if (target <= data[middle - 1].svgX) {
        return data[middle];
      }
      middle -= 1;
    } else if (target <= data[middle].svgX) {
      if (target >= data[middle + 1].svgX) {
        return data[middle];
      }
      middle += 1;
    } else {
      return data[middle];
    }
  }
  return {};
};

export default binarySearch;
