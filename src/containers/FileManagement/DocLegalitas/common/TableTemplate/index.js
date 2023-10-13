// TAB NEW
export const TitleNew = [
  "ID Requester",
  "Lokasi",
  "Type",
  "Jumlah Legalitas",
  "Draft Final PKS",
  "Invoice Sewa",
  "Bukpot",
  "PKS",
  "Surat Izin Landlord",
  "Status",
  "",
  "",
];

export const typeNew = [
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
  "node",
  "node",
];

export const isSortNew = [
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  false,
];

export const columnNameVarNew = [
  "requestId",
  "locationName",
  "type",
  "legalityTotal",
  "draftPksTotal",
  "rentInvoiceTotal",
  "bukpotTotal",
  "pksTotal",
  "suratIzinLandlordTotal",
  "status",
  "",
  "",
];

//TAB RENEW------------------------------------------------------------------------------------->>>>>>>>
export const TitleRenew = [
  "ATM ID",
  "Lokasi",
  "Type",
  "Jumlah Legalitas",
  "Draft Final PKS",
  "Invoice Sewa",
  "Bukpot",
  "Filling",
  "Status",
  "",
  "",
];

export const typeReNew = [
  "string",
  "limit20",
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

export const isSortRenew = [
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  true,
  true,
  false,
  false,
];

export const columnNameVarRenew = [
  "atmId",
  "locationName",
  "type",
  "legalityTotal",
  "draftPksTotal",
  "rentInvoiceTotal",
  "bukpotTotal",
  "filling",
  "status",
  "",
  "",
];

//TAB TERMIN------------------------------------------------------------------------------------->>>>>>>>
export const TitleTermin = [
  "ATM ID",
  "Lokasi",
  "Type",
  "Jumlah Legalitas",
  "PKS Pengakhiran Sewa",
  "Surat Izin LandLord",
  "Security Deposit",
  "Status",
  "",
  "",
];

export const typeTermin = [
  "string",
  "limit20",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "node",
  "node",
];

export const isSortTermin = [
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  true,
  false,
  false,
];
export const columnNameVarTermin = [
  "atmId",
  "locationName",
  "type",
  "legalityTotal",
  "pengakhiranSewaPKS",
  "suratIzinLandlord",
  "securityDeposit",
  "status",
  "",
  "",
];

//TAB REPLACE------------------------------------------------------------------------------------->>>>>>>>
export const TitleReplace = [
  "ATM ID",
  "Lokasi",
  "Type",
  "Surat Izin LandLord",
  "Status",
  "",
  "",
];

export const typeReplace = [
  "string",
  "limit20",
  "string",
  "string",
  "string",
  "node",
  "node",
];

export const isSortReplace = [true, true, true, false, true, false, false];

export const columnNameVarReplace = [
  "atmId",
  "locationName",
  "type",
  "suratIzinLandlord",
  "status",
  "",
  "",
];
