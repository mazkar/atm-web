/* eslint-disable import/prefer-default-export */
  
export  function getInitialName(name){
  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
}

export const todoListColors = ['#4DE76F', '#009FD4', '#B381B3', '#939393', '#E3BC00', '#4DB0E7', '#DC2A2A'];

export function numberFromText(text) {
  // numberFromText("AA");
  const charCodes = text
    .split('') // => ["A", "A"]
    .map(char => char.charCodeAt(0)) // => [65, 65]
    .join(''); // => "6565"
  return parseInt(charCodes, 10);
}