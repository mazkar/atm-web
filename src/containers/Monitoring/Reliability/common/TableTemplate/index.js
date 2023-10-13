const titleTable = [
  "ATM ID",
  "Lokasi",
  "Machine",
  "ATM Cash",
  "Status",
  "Link",
  "DSP",
  "CRD",
  "RPT",
  "JNL",
  "EPP",
  "C1",
  "C2",
  "C3",
  "C4",
  "Device Fail",
  "RAT",
  "Last Trx",
  "Last R Code",
  "Status EJ",
  "Screen",
  "Score",
  "",
];

const valueType = [
  "string",
  "string",
  "string",
  "string",
  "node",
  "node",
  "node",
  "node",
  "node",
  "node",
  "node",
  "node",
  "node",
  "node",
  "node",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "node"
];

const isSort = [];

for(let i = 0; i <= titleTable.length-1; i++){
  if(i === titleTable.length-1){
    isSort.push(false);
  }
  isSort.push(true);
}

export default { titleTable, valueType, isSort };
