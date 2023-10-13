const titleTable = [
  "Vendor Name",
  "Jumlah Survey",
  "Survey Open",
  "Survey Tepat Waktu",
  "Survey Delay",
  "Survey Tidak Dikerjakan",
  "Survey Manual",
];

const columnNameVar = [
  "vendorName",
  "totalSurvey",
  "surveyOpen",
  "surveyDone",
  "surveyDelay",
  "notSurvey",
  "surveyManual",
];

const valueType = [
  "string",
  "number",
  "number",
  "number",
  "number",
  "number",
  "number",
];

const isSort = [true, true, true, true, true, true, true];

export default { titleTable, columnNameVar, valueType, isSort };
