const titleTable = [
  "Pricelist ID",
  "Nama Vendor",
  "Jenis Jasa",
  "Biaya Jasa",
  "",
];

const columnNameVar = [
  "priceListId",
  "vendorName",
  "jenisJasa",
  "biayaJasa",
  ""
]

const valueType = [
  "string",
  "limit20Left",
  "string",
  "string",
  "node",
];

const isSort = [true, true, true, true, false];

export default { titleTable, valueType, isSort, columnNameVar };
