const titleTable = [
  "ID ATM",
  "Location",
  "FLM",
  "SLM",
  "Jarkom",
  "Durasi Downtime",
  "% Downtime",
  "% Uptime",
  "",
];

const columnNameVar = [
  "atmId",
  "lokasi",
  "flm",
  "slm",
  "jarkom",
  "durasi",
  "downTime",
  "upTime",
  "",
]

const valueType = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "node"
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
  false
];

export default { titleTable, valueType, isSort, columnNameVar };
