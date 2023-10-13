import moment from 'moment';

export const thousandFormat = (value) => {
  if(value === null) {
    return '-';}
  if(value === undefined){
    return '-';}
  return `${  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};
  
export const setStringValue = (value) =>{
  if(value === null) {
    return 'N/A';}
  if(value === undefined){
    return 'N/A';}
  if(value === ''){
    return 'N/A';}
  return value;
};
  
export const isObejctEmpty=(obj)=> {
  for (const x in obj) { if (obj.hasOwnProperty(x))  return false; }
  return true;
};

export const timestampToDateId = (timestamp, format = "DD-MM-YYYY")=>{
  const idDate = moment(new Date(timestamp)).format(format);
  return idDate;
};

export const percentageFormatter = (val, decimalPlace=2)=>{
  const percentVal = `${parseFloat(val).toFixed(decimalPlace)}%`;
  return percentVal;
};

export function disableDateBeforeStart(current, startDate) {
  if(startDate){
    const tanggalAwal = moment(startDate);
    return (
      current < tanggalAwal
    );
  }
  const yesterday = moment().subtract(1,'day');
  return current.isBefore(yesterday);
}

export function stringLimit(text, limit = 50) {
  return text.toString().slice(0, limit) + (text.length > limit ? "..." : "");
};