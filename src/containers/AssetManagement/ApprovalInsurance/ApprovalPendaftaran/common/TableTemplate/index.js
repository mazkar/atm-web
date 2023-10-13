const columnNameVar = [
  "id",
  "approvalId",
  "requestId",
  "requestorName",
  "requestDate",
  "idMesin",
  "location",
  "jenisAsuransi",
  "typeTransaksi",
  "harga",
  "sla",
  "approver",
  "statusApproval",
  "approvalDate",
  "",
];

const isSort = [
  false,
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

const valueType = [
  "hide",
  "string",
  "string",
  "string",
  "string",
  "string",
  "limit20",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
];

export default { columnNameVar, isSort, valueType };
