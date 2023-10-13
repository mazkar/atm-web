const titleTable = [
  "ID Request",
  "UserRequest",
  "Tanggal Request",
  "Nama Vendor",
  "ATM ID",
  "Lokasi",
  "Detail",
  "Remark",
  "Master Key",
  "Approver",
  "Status Approval  ",
  "Tgl Approval",
  "Status",
  "",
];

const valueType = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "limit20",
  "limit20",
  "string",
  "string",
  "node",
  "node",
  "string",
  "node",
  "node",
];

const columnNameVar = [
  "ID Request",
  "UserRequest",
  "Tanggal Request",
  "Nama Vendor",
  "ATM ID",
  "Lokasi",
  "Detail",
  "Remark",
  "Master Key",
  "Approver",
  "Status Approval  ",
  "Tgl Approval",
  "Status",
  "",
];

const isSort = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
];

export default { titleTable, valueType, isSort, columnNameVar };
