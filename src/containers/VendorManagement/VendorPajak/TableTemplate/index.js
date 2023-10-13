
const titleTable = [
  "Tgl Order",
  "ID ATM",
  "Type Orderan",
  "Lokasi",
  "Alamat",
  "Kelurahan",
  "Kecamatan",
  "Area",
  "City",
  "Provinsi",

  "Pajak Awal",
  "Pajak Akhir",
  "Nilai Pajak",
  "Vendor Pajak",
  
  "",
  "",
];
const valueType = [
  "string",
  "string",
  "string",
  "limit20",
  "limit20",
  "limit20",
  "string",
  "string",
  "limit20",
  "string",

  "string",
  "string",
  "string",
  "string",
  
  "child",
  "child",
];
const columnNameVar = [
  "orderDate",
  "atmId",
  "orderType",
  "locationName",
  "locationAddress",
  "district",
  "subDistrict",
  "areaName",
  "city",
  "province",

  "startTax",
  "endTax",
  "taxValue",
  "picVendorId",
  
  "",
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
  
  false, 
  false, 
];

export default {titleTable, valueType, columnNameVar, isSort};
