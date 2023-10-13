const titleTable = [
  "No Ticket",
  "ATM ID",
  "Lokasi",
  "Detail",
  "FLM",
  "Problem",
  "Tgl",
  "Bulan",
  "Start",
  "Selesai",
  "Durasi",
  "",
];

const valueType = [
  "string",
  "string",
  "limit20",
  "limit20",
  "string",
  "limit20",
  "string",
  "string",
  "string",
  "string",
  "string",
  "node",
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
  false,
];

const columnNameVar = [
  "id",
  "atmId",
  "lokasi",
  "detailLokasi",
  "flm",
  "problem",
  "tgl",
  "bulan",
  "startDate",
  "endDate",
  "durasi",
  "",
];

export default { titleTable, valueType, isSort, columnNameVar };
