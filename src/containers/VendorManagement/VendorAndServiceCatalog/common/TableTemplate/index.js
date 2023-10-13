const titleTable = [
  "Vendor ID",
  "Nama Vendor",
  "Email",
  "No Telp/HP",
  "Alamat",
  "Status",
  "",
];

const valueType = [
  "string",
  "string",
  "limit20Left",
  "string",
  "limit20Left",
  "statusSchedule",
  "node",
];

const columnNameVar = [
  "vendorId",
  "vendorName",
  "emailVendor",
  "phoneVendor",
  "address",
  "status",
  "",
];

const isSort = [true, true, true, true, true, true, false];

export default { titleTable, valueType, isSort, columnNameVar };
