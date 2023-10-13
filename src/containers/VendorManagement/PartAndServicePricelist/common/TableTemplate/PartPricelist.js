const titleTable = [
  "Pricelist ID",
  "Nama Vendor",
  "Nama Barang",
  "Merek",
  "Harga Barang",
  "Biaya Jasa Pemasangan",
  "",
];

const columnNameVar = [
  "priceListId",
  "vendorName",
  "namaBarang",
  "merek",
  "hargaBarang",
  "hargaJasaPemasangan",
  ""
]

const valueType = [
  "string",
  "limit20Left",
  "string",
  "string",
  "string",
  "string",
  "node",
];

const isSort = [true, true, true, true, true, true, false];

export default { titleTable, valueType, isSort, columnNameVar };
