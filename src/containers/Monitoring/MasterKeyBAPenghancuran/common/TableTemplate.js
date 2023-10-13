const titleTable = [
  "ID Request",
  "User Request",
  "Tanggal Request",
  "Nama Vendor",
  "ATM ID",
  "Lokasi",
  "Detail",
  "Remark",
  "Master Key",
  "Approver",
  "Status Approval",
  "Tgl Approval",
  "Status",
  "",
];

const valueType = [];

const isSort = [];

for (let i = 0; i <= titleTable.length - 1; i++) {
  if (i === titleTable.length - 1) {
    isSort.push(false);
    valueType.push("node");
  }
  isSort.push(true);
  valueType.push("string");
}

export default { titleTable, valueType, isSort };
