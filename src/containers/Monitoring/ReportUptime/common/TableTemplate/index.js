const titleTable = [
  "ID ATM",
  "Lokasi",
  "Machine",
  "Denom",
  "Jarkom",
  "FLM",
  "SLM",
  "Uptime",
  "Downtime",
  "LC%",
  "DF%",
  "CF%",
  "RF%",
  "JF%",
  "CO%",
  "Sanggahan",
  "LC",
  "DF",
  "CF",
  "RF",
  "JF",
  "CO",
  "SPV Mode",
  ""
];
const columnNameVar = [
  "atmId",
  "lokasi",
  "machine",
  "denom",
  "jarkom",
  "flm",
  "slm",
  "uptime",
  "downtime",
  "lcPercent",
  "dfPercent",
  "cfPercent",
  "rfPercent",
  "jfPercent",
  "coPercent",
  "sanggahan",
  "lc",
  "df",
  "cf",
  "rf",
  "jf",
  "co",
  "spvModel",
  "",
];
const dummyData = [
  {
    idAtm: "12313",
    location: "TGR-CRM-CBG-CLG",
    machine: "ss2e",
    denome: "100",
    jarkom: "Telkom",
    flm: "TAG",
    slm: "PCR",
    uptime: "98%",
    downtime: "2%",
    percentage_lc: "98%",
    percentage_df: "8%",
    percentage_cf: "8%",
    percentage_rf: "8%",
    percentage_jf: "8%",
    percentage_co: "25%",
    sanggahan: "5%",
    lc: "180",
    df: "30",
    cf: "30",
    rf: "30",
    jf: "30",
    co: "30",
    spvMode: "20",
    action: null,
  }
];

const valueType = [];
const isSort = [];

for(let i=0; i<titleTable.length-1; i++){
  valueType.push("string");
  isSort.push(true);
}

valueType.push("node");
isSort.push(false);

export default { titleTable, valueType, isSort, dummyData,columnNameVar };
