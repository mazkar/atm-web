/* eslint-disable radix */

export function selectedStatus(num) {
  // console.log("+++ num", num);
  const status = parseInt(num);
  switch (status) {
    case 0:
      return "TODO";
    case 1:
      return "DOING";
    case 2:
      return "DONE";
    case 3:
      return "STRIP";
    default:
      return "TODO";
  }
}

export function statusToNumber(string) {
  switch (string) {
    case "TODO":
      return 0;
    case "DOING":
      return 1;
    case "DONE":
      return 2;
    case "STRIP":
      return 3;
    default:
      return 0;
  }
}

export function getInitialName(name) {
  if(name){
    let initials = name.match(/\b\w/g) || [""];
    initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
    return initials;
  }
  return "";
}
