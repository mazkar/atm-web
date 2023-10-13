const dummyDataNew = [
  {
    id: 1,
    atmId: "A-1222",
    location: "TGR-CRM-CBG-CLG",
    address: "Cipayung",
    area: "Jakarta Barat",
    city: "Jakarta",
    latlong: "12345-6789",
    idMesin: "A001",
  },
  {
    id: 2,
    atmId: "A-1222",
    location: "TGR-CRM-CBG-CLG",
    address: "Cipayung",
    area: "Jakarta Barat",
    city: "Jakarta",
    latlong: "12345-6789",
    idMesin: "A001",
  },
  {
    id: 3,
    atmId: "A-1222",
    location: "TGR-CRM-CBG-CLG",
    address: "Cipayung",
    area: "Jakarta Barat",
    city: "Jakarta",
    latlong: "12345-6789",
    idMesin: "A001",
  },
  {
    id: 4,
    atmId: "A-1222",
    location: "TGR-CRM-CBG-CLG",
    address: "Cipayung",
    area: "Jakarta Barat",
    city: "Jakarta",
    latlong: "12345-6789",
    idMesin: "A001",
  },
  {
    id: 5,
    atmId: "A-1222",
    location: "TGR-CRM-CBG-CLG",
    address: "Cipayung",
    area: "Jakarta Barat",
    city: "Jakarta",
    latlong: "12345-6789",
    idMesin: "A001",
  },
  {
    id: 6,
    atmId: "A-1222",
    location: "TGR-CRM-CBG-CLG",
    address: "Cipayung",
    area: "Jakarta Barat",
    city: "Jakarta",
    latlong: "12345-6789",
    idMesin: "A001",
  },
  {
    id: 7,
    atmId: "A-1222",
    location: "TGR-CRM-CBG-CLG",
    address: "Cipayung",
    area: "Jakarta Barat",
    city: "Jakarta",
    latlong: "12345-6789",
    idMesin: "A001",
  },
  {
    id: 8,
    atmId: "A-1222",
    location: "TGR-CRM-CBG-CLG",
    address: "Cipayung",
    area: "Jakarta Barat",
    city: "Jakarta",
    latlong: "12345-6789",
    idMesin: "A001",
  },
  {
    id: 9,
    atmId: "A-1222",
    location: "TGR-CRM-CBG-CLG",
    address: "Cipayung",
    area: "Jakarta Barat",
    city: "Jakarta",
    latlong: "12345-6789",
    idMesin: "A001",
  },
  {
    id: 10,
    atmId: "A-1222",
    location: "TGR-CRM-CBG-CLG",
    address: "Cipayung",
    area: "Jakarta Barat",
    city: "Jakarta",
    latlong: "12345-6789",
    idMesin: "A001",
  },
];
// data replace
const dummyDataReplace = [
  {
    atmIdLama: "A-1222",
    mesinLama: "ATM",
    locationName: "TGR-CRM-CBG-CLG",
    atmIdBaru: "1022",
    mesinBaru: "ATM",
  },
  {
    atmIdLama: "A-1222",
    mesinLama: "ATM",
    locationName: "TGR-CRM-CBG-CLG",
    atmIdBaru: "1022",
    mesinBaru: "ATM",
  },
  {
    atmIdLama: "A-1222",
    mesinLama: "ATM",
    locationName: "TGR-CRM-CBG-CLG",
    atmIdBaru: "1022",
    mesinBaru: "ATM",
  },
  {
    atmIdLama: "A-1222",
    mesinLama: "ATM",
    locationName: "TGR-CRM-CBG-CLG",
    atmIdBaru: "1022",
    mesinBaru: "ATM",
  },
  {
    atmIdLama: "A-1222",
    mesinLama: "ATM",
    locationName: "TGR-CRM-CBG-CLG",
    atmIdBaru: "1022",
    mesinBaru: "ATM",
  },
];
// dummydataMigrasi
const dummyDataMigrasi = [
  {
    atmId: "A-1222",
    locationName: "TGR-CRM-CBG-CLG",
    branch: "Yogyakarta,Sleman",
    typeMesin: "ATM",
    idBaru: "1103",
    newLocation: "TGR-CRM-CBG-CLG",
  },
];

const dataDetail = [
  {
    id: "12345",
    tanggal: "12/12/2022",
    bast: true,
    vendorCode: 0,
  },
  {
    id: "12345",
    tanggal: "12/12/2022",
    bast: false,
    vendorCode: 0,
  },
  {
    id: "12345",
    tanggal: "12/12/2022",
    bast: true,
    vendorCode: 1,
  },
  {
    id: "12345",
    tanggal: "12/12/2022",
    bast: true,
    vendorCode: 2,
  },
  {
    id: "12345",
    tanggal: "12/12/2022",
    bast: true,
    vendorCode: 4,
  },
  {
    id: "12345",
    tanggal: "12/12/2022",
    bast: true,
    vendorCode: 5,
  },
  {
    id: "12345",
    tanggal: "12/12/2022",
    bast: true,
    vendorCode: 6,
  },
  {
    id: "12345",
    tanggal: "12/12/2022",
    bast: true,
    vendorCode: 7,
  },
  {
    id: "12345",
    tanggal: "12/12/2022",
    bast: true,
    vendorCode: 8,
  },
  {
    id: "12345",
    tanggal: "12/12/2022",
    bast: true,
    vendorCode: 9,
  },
];
const detailInfo = {
  kondisi: "New Location",
  namaLokasi: "JKT.CRM Rezeki Fresh Market",
  alamat: "JL.Hayam Wuruk RT/RW",
  picRequest: "UserName",
  noHpPicRequest: "0812345678910",
  emailPicRequest: "Ahmad@email.com",
  picLokasi: "UserName",
  noHpPicLokasi: "0812345678910",
  emailPicLokasi: "ahmad@gmail.com",
  namaLooMou: "UserName",
  noHpLooMou: "0812345678901",
  emailLooMou: "ahmad@gmail.com",
  kodeGfms: "12345",
  idRequester: "WR-235467",
  roArea: "Jawa",
  cabang: "Hayam Wuruk",
  jenisLokasi: "Cabang",
  tipeLokasi: "Retail",
  populasiATM: "34 ATM",
  aksesbilitas: "24 Jam",
  publicAccess: "Ya",
  luasArea: "1.5m",
  jumlahBankLain: "1",
  tipeATM: "ATM",
  ruangATM: "bersama",
  komunikasi: "VSAT",
  initialCabang: "JN-238965",
  latitude: -6.229728,
  longitude: 106.6894312,
};
// for Filter
const titleFilter=[
  {id:"atmId",numeric: false, disablePadding: false,label:"ATM ID", typeColumn: "info"},
  {id:"lokasi",numeric: false, disablePadding: false,label:"Nama Lokasi", typeColumn: "info"},
  {id:"alamat", numeric: false, disablePadding: false,label:"Alamat", typeColumn: "info"},
  {id:"area", numeric: false, disablePadding: false,label:"Area", typeColumn: "info"},
  {id:"city", numeric: false, disablePadding: false,label:"City", typeColumn: "info"},
  {id:"latLong", numeric: false, disablePadding: false,label:"Lat-Long", typeColumn: "info"},
  {id:"idMesin", numeric: false, disablePadding: false,label:"ID Mesin", typeColumn: "info"},
  { id: "parameter", numeric: false, disablePadding: false, label: "Parameter", typeColumn: "checklist" },
  { id: "jarkom", numeric: false, disablePadding: false, label: "Jarkom", typeColumn: "checklist" },
  { id: "mesin", numeric: false, disablePadding: false, label: "Mesin", typeColumn: "checklist" },
  { id: "booth", numeric: false, disablePadding: false, label: "Booth", typeColumn: "checklist" },
  { id: "security", numeric: false, disablePadding: false, label: "Keamanan", typeColumn: "checklist" },
  { id: "activation", numeric: false, disablePadding: false, label: "Aktivasi", typeColumn: "checklist" },
  { id: "termintaion", numeric: false, disablePadding: false, label: "Terminasi", typeColumn: "checklist" },
  { id: "signage", numeric: false, disablePadding: false, label: "Signage", typeColumn: "checklist" },
];
const titleFilterReplace=[
  {id:"atmId",numeric: false, disablePadding: false,label:"ATM ID Lama", typeColumn: "info"},
  {id:"typeMesin",numeric: false, disablePadding: false,label:"Mesin Lama", typeColumn: "info"},
  {id:"lokasi", numeric: false, disablePadding: false,label:"Nama Lokasi", typeColumn: "info"},
  {id:"newAtmId", numeric: false, disablePadding: false,label:"ATM ID Baru", typeColumn: "info"},
  {id:"city", numeric: false, disablePadding: false,label:"Mesin Baru", typeColumn: "info"},
  { id: "parameter", numeric: false, disablePadding: false, label: "Parameter", typeColumn: "checklist" },
  { id: "jarkom", numeric: false, disablePadding: false, label: "Jarkom", typeColumn: "checklist" },
  { id: "mesin", numeric: false, disablePadding: false, label: "Mesin", typeColumn: "checklist" },
  { id: "booth", numeric: false, disablePadding: false, label: "Booth", typeColumn: "checklist" },
  { id: "security", numeric: false, disablePadding: false, label: "Keamanan", typeColumn: "checklist" },
  { id: "activation", numeric: false, disablePadding: false, label: "Aktivasi", typeColumn: "checklist" },
  { id: "termintaion", numeric: false, disablePadding: false, label: "Terminasi", typeColumn: "checklist" },
  { id: "signage", numeric: false, disablePadding: false, label: "Signage", typeColumn: "checklist" },
];
const titleFilterMigrasi=[
  {id:"atmId",numeric: false, disablePadding: false,label:"ATM ID Lama", typeColumn: "info"},
  {id:"lokasi", numeric: false, disablePadding: false,label:"Nama Lokasi", typeColumn: "info"},
  {id:"branch", numeric: false, disablePadding: false,label:"Branch", typeColumn: "info"},
  {id:"typeMesin", numeric: false, disablePadding: false,label:"Type Mesin", typeColumn: "info"},
  {id:"newAtmId", numeric: false, disablePadding: false,label:"ID Baru", typeColumn: "info"},
  {id:"lokasiBaru", numeric: false, disablePadding: false,label:"Nama Lokasi Baru", typeColumn: "info"},
  { id: "parameter", numeric: false, disablePadding: false, label: "Parameter", typeColumn: "checklist" },
  { id: "jarkom", numeric: false, disablePadding: false, label: "Jarkom", typeColumn: "checklist" },
  { id: "mesin", numeric: false, disablePadding: false, label: "Mesin", typeColumn: "checklist" },
  { id: "booth", numeric: false, disablePadding: false, label: "Booth", typeColumn: "checklist" },
  { id: "security", numeric: false, disablePadding: false, label: "Keamanan", typeColumn: "checklist" },
  { id: "activation", numeric: false, disablePadding: false, label: "Aktivasi", typeColumn: "checklist" },
  { id: "termintaion", numeric: false, disablePadding: false, label: "Terminasi", typeColumn: "checklist" },
  { id: "signage", numeric: false, disablePadding: false, label: "Signage", typeColumn: "checklist" },
];
// title Tab
const titleTableNew=[
  {id:"atmId",numeric: false, disablePadding: false,label:"ATM ID", typeColumn: "info"},
  {id:"lokasi",numeric: false, disablePadding: false,label:"Nama Lokasi", typeColumn: "info"},
  {id:"alamat", numeric: false, disablePadding: false,label:"Alamat", typeColumn: "info"},
  {id:"area", numeric: false, disablePadding: false,label:"Area", typeColumn: "info"},
  {id:"city", numeric: false, disablePadding: false,label:"City", typeColumn: "info"},
  {id:"latLong", numeric: false, disablePadding: false,label:"Lat-Long", typeColumn: ""},
  {id:"IdMesin", numeric: false, disablePadding: false,label:"ID Mesin", typeColumn: "info"},
  {id: "action", numeric: false, disablePadding: false, label: "" },
];
const titleTableTermin=[
  {id:"atmId",numeric: false, disablePadding: false,label:"ATM ID"},
  {id:"lokasi",numeric: false, disablePadding: false,label:"Nama Lokasi"},
  {id:"alamat", numeric: false, disablePadding: false,label:"Alamat"},
  {id:"area", numeric: false, disablePadding: false,label:"Area"},
  {id:"city", numeric: false, disablePadding: false,label:"City"},
  {id:"latLong", numeric: false, disablePadding: false,label:"Lat-Long"},
  {id:"IdMesin", numeric: false, disablePadding: false,label:"ID Mesin"},
  {id: "action", numeric: false, disablePadding: false, label: "" },
];
const titleTableReplace=[
  {id:"atmId",numeric: false, disablePadding: false,label:"ATM ID Lama"},
  {id:"typeMesin",numeric: false, disablePadding: false,label:"Mesin Lama"},
  {id:"lokasi", numeric: false, disablePadding: false,label:"Nama Lokasi"},
  {id:"newAtmId", numeric: false, disablePadding: false,label:"ATM ID Baru"},
  {id:"mesinTypeBaru", numeric: false, disablePadding: false,label:"Mesin Baru"},
  {id: "action", numeric: false, disablePadding: false, label: "" },
];
const titleTableMigrasi=[
  {id:"atmId",numeric: false, disablePadding: false,label:"ATM ID Lama"},
  {id:"lokasi", numeric: false, disablePadding: false,label:"Nama Lokasi"},
  {id:"branch", numeric: false, disablePadding: false,label:"Branch"},
  {id:"typeMesin", numeric: false, disablePadding: false,label:"Type Mesin"},
  {id: "newAtmId", numeric: false, disablePadding: false, label: "ID Baru" },
  {id: "lokasiBaru", numeric: false, disablePadding: false, label: "Nama Lokasi Baru" },
  {id: "action", numeric: false, disablePadding: false, label: "" },
];
const titleDetail=[
  "ID",
  "Tanggal",
  "Nama BAST",
];
const valueTypeDetail=[
  "string",
  "string",
  "bast",
];
const valueTypeReplace=[];
const valueTypeMigrasi = [];
const valueType=[];
const isSort=[];
for (let i = 0; i < titleTableNew.length - 1; i++) {
  valueType.push("string");
  isSort.push(true);
}
for (let i = 0; i < titleTableReplace.length - 1; i++) {
  valueTypeReplace.push("string");
  isSort.push(true);
}
for (let i = 0; i < titleTableMigrasi.length - 1; i++) {
  valueTypeMigrasi.push("string");
  isSort.push(true);
}
valueType.push("node");
isSort.push(false);
valueTypeReplace.push("node");
export default {
  dummyDataNew,
  titleTableNew,
  valueType,
  isSort,
  titleTableTermin,
  titleTableReplace,
  titleTableMigrasi,
  valueTypeReplace,
  valueTypeMigrasi,
  dummyDataReplace,
  dummyDataMigrasi,
  titleFilter, 
  titleFilterMigrasi,
  titleFilterReplace,
  titleDetail,
  valueTypeDetail,
  dataDetail,
  detailInfo,
};