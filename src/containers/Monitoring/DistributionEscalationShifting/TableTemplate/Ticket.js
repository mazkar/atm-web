const titleTable = [
  "Ticket ID",
  "ATM ID",
  "Lokasi",
  "Detail",
  "Problem",
  "Tgl",
  "Bulan",
  "Start",
  "Selesai",
  "Durasi",
  "Type Mesin",
  "PIC",
  "Status",
  "SLA",
  "Approver",
  "Status Approval",
  "Tgl Approval",
  "Remark",
  "Detail",
];

const valueType = [
  "string",
  "string",
  "limit20",
  "limit20",
  "limit20",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "node",
];
const columnNameVar = [
  "Ticket ID",
  "ATM ID",
  "Lokasi",
  "Detail",
  "Problem",
  "Tgl",
  "Bulan",
  "Start",
  "Selesai",
  "Durasi",
  "Type Mesin",
  "PIC",
  "Status",
  "SLA",
  "Approver",
  "Status Approval",
  "Tgl Approval",
  "Remark",
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
  true,
  true,
  true,
  true,
  true,
  false,
];

export default { titleTable, valueType, isSort, columnNameVar };
