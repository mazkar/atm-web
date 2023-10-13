const useRupiahConverterSecondary = (value, separator=".", floatSeparator = ",") => {
  if(value === null) {
    return '-';}
  if(value === undefined){
    return '-';}
  const fixedVal = Number.parseFloat(value).toFixed();
  const parts = fixedVal.toString().split(".");
  const num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator) + (parts[1] ? `${floatSeparator}${  parts[1]}` : "");
  return `Rp. ${num}`;
  // return `Rp.${  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, separator)}`;
};

export default useRupiahConverterSecondary;