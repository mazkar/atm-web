const titleTable = [
  "ATM ID",
  "Lokasi",
  "Alamat",
  "Kelurahan",
  "Kecamatan",
  "Area",
  "City",
  "Provinsi",
  "Kondisi ATM",
  "Pajak Awal",
  "Pajak Akhir",
  "Nilai Pajak",
  "Vendor Pajak",
  "Type Orderan",
  "Ketersediaan Signage Kepengurusan",
  "Media Signage",
  "Media Signage 2",
  "Ukuran Signage",
  "Bentuk Ukuran Signage",
  "SLA",
  "Status Pajak",
  "Survey Objek Pajak",
  "Proses Daftar",
  "Review SKPD",
  "Cetak SKPD",
  "Proses Bayar",
  "Attach SKPD & SSPD",
  "",
  "",
];

const valueType = [
  "string",
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
  "node",
];
const columnNameVar = [
  "atmId",
  "locationName",
  "locationAddress",
  "subDistrict",
  "district",
  "areaName",
  "city",
  "province",
  "conditionName",
  "startDate",
  "endDate",
  "tax",
  "vendorName",
  "orderType",
  "signageAvailable",
  "signageMedia",
  "signageMediaTwo",
  "signageSize",
  "bentukUkuranSignage",
  "slaWork",
  "status",
  "taxObject",
  "register",
  "review",
  "printSKPD",
  "payment",
  "attachment",
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

export default { titleTable, valueType, isSort, columnNameVar };
