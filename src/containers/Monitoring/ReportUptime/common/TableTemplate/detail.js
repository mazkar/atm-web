const titleTable = [
  "No Ticket",
  "ATM ID",
  "Lokasi",
  "Detail",
  "Problem",
  "Tgl",
  "Bulan",
  "Start",
  "Selesai",
  "Durasi",
  "Downtime",
  "Uptime",
  "Downtime After Remark",
  "Uptime After Remark",
  "Acknowledge",
  "",
];
const columnNameVar = [
  "id",
  "atmId",
  "lokasi",
  "detailLokasi",
  "problem",
  "tanggal",
  "bulan",
  "mulai",
  "selesai",
  "durasi",
  "downTimeView",
  "upTimeView",
  "downTimeRemarkView",
  "upTimeRemarkView",
  "acknowledge",
  "",
];
const dummyData = [
  {
    noTicket: "01",
    atmId: "1222",
    location: "TGR-CRM-CBG-CLG",
    detail: "TGR-CRM-CBG-CLG",
    problem: "Casette 3 Not Configured",
    tgl: "01",
    bulan: "05",
    start: "01/05/2021, 07:30:00",
    end: "01/05/2021, 07:30:00",
    durasi: "30 Menit",
    downtime: "01:00",
    uptime: "23:00",
    downtimeAfterRemark: "00:30",
    uptimeAfterRemark: "23:30",
    acknowledge: {
      text: "Accept",
      type: "accept",
    },
    action: null,
  },
  {
    noTicket: "02",
    atmId: "1222",
    location: "TGR-CRM-CBG-CLG",
    detail: "TGR-CRM-CBG-CLG",
    problem: "Casette 3 Not Configured",
    tgl: "01",
    bulan: "05",
    start: "01/05/2021, 07:30:00",
    end: "01/05/2021, 07:30:00",
    durasi: "30 Menit",
    downtime: "01:00",
    uptime: "23:00",
    downtimeAfterRemark: "00:30",
    uptimeAfterRemark: "23:30",
    acknowledge: {
      text: "No Remark",
      type: "noRemark",
    },
    action: null,
  },
  {
    noTicket: "03",
    atmId: "1222",
    location: "TGR-CRM-CBG-CLG",
    detail: "TGR-CRM-CBG-CLG",
    problem: "Casette 3 Not Configured",
    tgl: "01",
    bulan: "05",
    start: "01/05/2021, 07:30:00",
    end: "01/05/2021, 07:30:00",
    durasi: "30 Menit",
    downtime: "01:00",
    uptime: "23:00",
    downtimeAfterRemark: "00:30",
    uptimeAfterRemark: "23:30",
    acknowledge: {
      text: "Reject",
      type: "reject",
    },
    action: null,
  },
];

const valueType = [];
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
  false,
];;

for (let i = 0; i < titleTable.length - 1; i++) {
  if (i === titleTable.length - 2) {
    valueType.push("node");
  }
  valueType.push("string");
}

valueType.push("node");

export default { titleTable, valueType, isSort, dummyData,columnNameVar };
