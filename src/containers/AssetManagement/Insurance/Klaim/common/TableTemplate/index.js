const titleTable = [
  "No Klaim",
  "Status",
  "Tipe Klaim",
  "Tgl Pengajuan",
  "SN Mesin",
  "ID Mesin",
  "Lokasi",
  "Keterangan Kerugian",
  "Tgl Kejadian",
  "SLA Input FLM ke tgl Kejadian",

  "Jumlah Kerugian",
  "Tgl Email Penawaran",
  "Kategori",
  "FLM",
  "SLM",
  "CCTV",
  "SLA Verifikasi",
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
  "string",
  "string",
  "string",
  "string",
];
const columnNameVar = [
  "noTicket",
  "status",
  "typeKlaim",
  "tglPengajuan",
  "snMesin",
  "idMesin",
  "lokasi",
  "keteranganKerugian",
  "tglKejadian",
  "slaPengajuan",
    
  "totalKerugian",
  "emailPenawaran",
  "category",
  "flm",
  "slm",
  "cctv",
  "slaVerifikasi",
  "action",
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
  false, 
];
  
export default {titleTable, valueType, columnNameVar, isSort};