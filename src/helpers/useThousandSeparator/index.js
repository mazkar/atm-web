const useThousandSeparator = (value, separator = ".", currency = "") => {
  if (value === null) {
    return "-";
  }
  if (value === undefined) {
    return "-";
  }
  return `${currency}${`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, separator)}`;
};

export default useThousandSeparator;
