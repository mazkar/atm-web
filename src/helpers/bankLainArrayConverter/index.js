import { listBankLain } from "../constants";

/* eslint-disable import/prefer-default-export */
export function convertArrayStringToArrayObjectATMBankList(data) {
  const newArr = [];
  data.map((item) => {
    const newItem = listBankLain.find((obj) => obj.title === item);
    newArr.push(newItem);
  });
  return newArr;
}

export function convertArrayObjToArrayStringATMBankList(data) {
  const newArr = [];
  data.map((item) => {
    newArr.push(item.title);
  });
  // console.log("new arr atm bank", newArr);
  return newArr;
}