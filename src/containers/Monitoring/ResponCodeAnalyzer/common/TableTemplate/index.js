const titleTable = [
  "ID ATM",
  "Location",
  "Card ID",
  "Kode Transaksi",
  "Kode Respon",
  "Amount",
  "Charge",
  "Tanggal",
  "Paycode",
  "Respon Code",
  "Status Card ID",
  "Message Type Class",
  "Message Type Func",
  "Kode Valuta",
  "Payreff",
];

const valueType = [
  "string",
  "limit20",
  "string",
  "string",
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
];

const columnNameVar = [
  "atmId",
  "location",
  "cardId",
  "kodeTransaksi",
  "kodeResponse",
  "amount",
  "charge",
  "tanggal",
  "payCode",
  "responCode",
  "statusCardId",
  "msgTypeClass",
  "msgTypeFunc",
  "kodeValuta",
  "payref",
];

export default { titleTable, valueType, isSort, columnNameVar };