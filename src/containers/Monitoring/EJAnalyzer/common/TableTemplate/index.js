const titleTable = [
  "Tanggal",
  "Dispenser Tidak Bekerja",
  "Full Reversal",
  "Kartu Tidak Diizinkan",
  "Saldo Tidak Cukup",
  "Transaksi Timeout",
  "Others",
];

const valueType = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
];

const isSort = [true, true, true, true, true, true, true];

const columnNameVar = [
  "date",
  "dispenserNotWorking",
  "fullReveal",
  "cardNotAllowed",
  "saldoNotEnough",
  "trxRto",
  "other",
];

export default { titleTable, valueType, isSort, columnNameVar };
