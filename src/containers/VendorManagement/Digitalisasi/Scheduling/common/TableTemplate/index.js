
const titleTable = [
  "Schedule ID",
  "ATM ID",
  "Lokasi",
  "Alamat",
  "Checklist Vendor",
  "Vendor Name",
  "User Vendor",
  "Start Date",
  "End Date",
  "Interval",
  
  "Status",
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
  
  "statusSchedule",
  "menuNew",
];
const columnNameVar = [
  "id",
  "atmId",
  "location",
  "address",
  "checklistVendor",
  "vendorName",
  "userId",
  "startDate",
  "endDate",
  "intervalDay",
  
  "status",
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
  false, 
];

export default {titleTable, valueType, columnNameVar, isSort};
