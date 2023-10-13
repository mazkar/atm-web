const titleTableResult = [
  "id",
  "Result ID",
  "ATM ID",
  "Lokasi",
  "Checklist Vendor",
  "Vendor Name",
  "Vendor User",
  "Start Date",
  "End Date",
  "Durasi",
  "Status",
  "",
];
const valueTypeResult = [
  "hide",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "statusResult",
  "node",
];
const columnNameVarResult = [
  "id",
  "resultId",
  "atmId",
  "lokasi",
  "detail",
  "overview",
  "vendorName",
  "startDate",
  "endDate",
  "durasi",
  "status",
  "",
];
const isSortResult = [
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
  false, 
];

// TICKETING

const titleTableTicketing = [
  "Ticket ID",
  "ATM ID",
  "Lokasi",
  "Vendor Name",
  "User Vendor",
  "Category",
  "Question",
  "Kondisi",
  "Start Date",
  
  "Status",
  "",
];
const valueTypeTicketing = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  
  "statusTicket",
  "node",
];
const columnNameVarTicketing = [
  "id",
  "atmId",
  "location",
  "vendorName",
  "userId",
  "surveyCategory",
  "surveyQuestion",
  "boothCondition",
  "startDate",
  "status",
  "",
];
const isSortTicketing = [
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
export default { titleTableResult, valueTypeResult, columnNameVarResult, isSortResult, titleTableTicketing, valueTypeTicketing, columnNameVarTicketing, isSortTicketing };
