
const titleTable = [
  "id",
  "No Ticket",
  "Tgl Request",
  "User Req",
  "ID Loc",
  "Nama Lokasi",
  "Alamat",
  "Area",
  "City",
  "Lat - Long",
  "ID Mesin",
  
  "Jenis Pekerjaan",
  "Nama Vendor",
  "Biaya Barang",
  "Biaya Jasa",
  "Total Biaya",
  "Total Biaya+PPN",
  "Approver",
  "Status Approval",
  "Tgl Approved",
  "Tgl Pengerjaan",
  
  "Tgl Selesai",
  "SLA Pekerjaan",
  "BAST Digital",
  "Tgl Kirim Invoice",
  "No Invoice",
  "Tgl Pembayaran",
  "Status Paid",
  "SLA Pembayaran",
  "Notes & Desc",
  "Card Type",
  "Opening Type",
    
  "",
  "",
];
const valueType = [
  "hide",
  "string",
  "string",
  "string",
  "limit20",
  "limit20Left",
  "limit20Left",
  "string",
  "string",
  "limit",
  "string",

  "limit20",
  "string",
  "idrCurrency",
  "idrCurrency",
  "idrCurrency",
  "idrCurrency",
  "approverImple",
  "statusApproval",
  "string",
  "string",

  "string",
  "sla_pekerjaan",
  "string",
  "string",
  "string",
  "string",
  "status_paid",
  "sla_Vendor",
  "limit20",
  "string",

  "node",
  "node",
];
const columnNameVar = [
  "id",
  "ticket",
  "requestDate",
  "userRequest",
  "locationId",
  "locationName",
  "address",
  "area",
  "city",
  "longLat",
  "idMesin",
  
  "jenisPekerjaan",
  "namaVendor",
  "biayaBarang",
  "biayaJasa",
  "totalBiaya",
  "totalBiayaPpn",
  "approval",
  "approvalStatus",
  "approvalDate",
  "processingDate",
    
  "completeDate",
  "sla",
  "bast",
  "invoiceDate",
  "invoiceNumber",
  "paymentDate",
  "paymentStatus",
  "slaPembayaran",
  "noteDesc",
  "cardType",
  "openingType",

  "",
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
  
  false, 
  false, 
];

export const dataDummyOrders = [
  { "cardType" : "need"},
  { "cardType" : "machine"},
  { "cardType" : "booth"},
  { "cardType" : "signage"},
  { "cardType" : "activation"},
  { "cardType" : "termination"},
  { "cardType" : "jarkom"},
  { "cardType" : "parameter"},
  { "cardType" : "security"},
];

export const routeRef = [
  { type: "need", url:"/vendor-management/orders/kebutuhan", urlVendor:"/vendor-orders/kebutuhan"},
  { type: "machine", url:"/vendor-management/orders/mesin", urlVendor:"/vendor-orders/mesin"},
  { type: "booth", url:"/vendor-management/orders/booth", urlVendor:"/vendor-orders/booth"},
  { type: "signage", url:"/vendor-management/orders/signage", urlVendor:"/vendor-orders/signage"},
  { type: "activation", url:"/vendor-management/orders/aktivasi", urlVendor:"/vendor-orders/aktivasi"},
  { type: "termination", url:"/vendor-management/orders/terminasi", urlVendor:"/vendor-orders/terminasi"},
  { type: "jarkom", url:"/vendor-management/orders/jarkom", urlVendor:"/vendor-orders/jarkom"},
  { 
    type: "parameter", 
    url:"/vendor-management/orders/parameter", 
    urlVendor:"/vendor-orders/parameter",
    urlReplace:"/vendor-management/orders/parameter-replace", 
    urlVendorReplace:"/vendor-orders/parameter-replace",
    urlMigrasi:"/vendor-management/orders/parameter-migrasi", 
    urlVendorMigrasi:"/vendor-orders/parameter-migrasi"
  },
  { type: "security", url:"/vendor-management/orders/keamanan", urlVendor:"/vendor-orders/keamanan"},
  { type: "maintenance", url:"/vendor-management/orders/maintenance", urlVendor:"/vendor-orders/maintenance"},
];

export default {titleTable, valueType, columnNameVar, isSort};

// const generateDataDummy = () => {
//   const dataToSet = [];
//   dataDummyOrders.map((item, index) => {
//     const newObj = {};
//     const idTicket = `idTicket${index}`;
//     TableTemplate.valueType.map((type, indexChild) => {
//       if (indexChild < TableTemplate.valueType.length - 4) {
//         newObj[`key${indexChild}`] = `Value ${indexChild}`;
//       }
//       if (indexChild === TableTemplate.valueType.length - 4) {
//         newObj[`key${indexChild}`] = `${item.cardType}`;
//       }
//     });
//     const newRow = {
//       idTicket,
//       ...newObj,
//       ...{
//         penawaranHarga: (
//           <a onClick={() => generatePenawaranLink(idTicket, item.cardType)}>
//             Penawaran Harga
//           </a>
//         ),
//       },
//       ...{
//         detail: (
//           <a onClick={() => generateDetailLink(idTicket, item.cardType)}>
//             Detail
//           </a>
//         ),
//       },
//     };
//     dataToSet.push(newRow);
//   });
//   // console.log("+++ dataToSet", dataToSet);
//   setData(dataToSet);
// };
// generateDataDummy();