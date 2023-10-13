const titleTable = [
  "ID ATM",
  "Lokasi",
  "Machine",
  "Denom",
  "Link",
  "FLM",
  "SLM",
  "Bulan 3",
  "Bulan 2",
  "Bulan 1",
  "Bulan 0",
  "Downtime",
  "LC",
  "DF",
  "CF",
  "RF",
  "JF",
  "C0",
  "Trx Bulan -3",
  "Trx Bulan -2",
  "Trx Bulan -1",
  "Trx Bulan 0",
  "Rev Bulan -3",
  "Rev Bulan -2",
  "Rev Bulan -1",
  "Rev Bulan 0",
  "",
];

const valueType = [];

const isSort = [];

for(let i = 0; i <= titleTable.length-1; i++){
  if(i === titleTable.length-1){
    isSort.push(false);
    valueType.push("node");
  }
  isSort.push(true);
  valueType.push("string");
}

export default { titleTable, valueType, isSort };
