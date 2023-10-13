const arrayCheckbox = [
  {
    name: "Card Reader",
    isChecked: false,
    value: "CF",
  },
  {
    name: "Cash Out",
    isChecked: false,
    value: "CO",
  },
  {
    name: "Lost Comm",
    isChecked: false,
    value: "LC",
  },
  {
    name: "SLM",
    isChecked: false,
    value: "SL",
  },
  {
    name: "Dispenser",
    isChecked: false,
    value: "DF",
  },
  {
    name: "Encryptor",
    isChecked: false,
    value: "EF",
  },
  {
    name: "Hardware",
    isChecked: false,
    value: "HW",
  },
  {
    name: "Spv Mode",
    isChecked: false,
    value: "SP",
  },
  {
    name: "Implementasi",
    isChecked: false,
    value: "IM",
  },
  {
    name: "Insurance",
    isChecked: false,
    value: "IN",
  },
  {
    name: "Journal",
    isChecked: false,
    value: "JF",
  },
  {
    name: "Maintenance",
    isChecked: false,
    value: "MT",
  },
  {
    name: "Media Promosi",
    isChecked: false,
    value: "MP",
  },
  {
    name: "PM",
    isChecked: false,
    value: "PM",
  },
  {
    name: "Receipt Printer",
    isChecked: false,
    value: "RF",
  },
  {
    name: "Security",
    isChecked: false,
    value: "SC",
  },
  {
    name: "Other",
    isChecked: false,
    value: "OT"
  }
];

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dataTab = ["Daily", "Monthly"];

const listAtmId = [
  {
    id: "ATM 1234 - JKT.SPBU.Meruya",
    isSelected: false,
  },
  {
    id: "ATM 1234 - JKT.SPBU.Priok",
    isSelected: false,
  },
  {
    id: "ATM 1234 - JKT.SPBU.Menteng",
    isSelected: false,
  },
  {
    id: "ATM 1234 - JKT.SPBU.Kemang",
    isSelected: false,
  },
  {
    id: "ATM 1234 - JKT.SPBU.Kemayoran",
    isSelected: false,
  },
  {
    id: "ATM 1234 - JKT.SPBU.Blok M",
    isSelected: false,
  },
  {
    id: "ATM 1234 - JKT.SPBU.Jakpus",
    isSelected: false,
  },
  {
    id: "ATM 1234 - JKT.SPBU.Kemang",
    isSelected: false,
  },
  {
    id: "ATM 1234 - JKT.SPBU.Kemayoran",
    isSelected: false,
  },
  {
    id: "ATM 1234 - JKT.SPBU.Blok M",
    isSelected: false,
  },
  {
    id: "ATM 1234 - JKT.SPBU.Jakpus",
    isSelected: false,
  },
];

const dailyTableHeader = [
  "",
  "Problem",
  "FLM",
  "SLM",
  "Jarkom"
];

const monthlyTableHeader = [
  "",
  "Problem",
  "FLM",
  "SLM",
  "Jarkom",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Total Prob",
  "Avg Prob",
  "Max",
  "Min"
];

const lastHeader = [
  "Total Prob",
  "Avg Prob",
  "Max",
  "Min"
];

for(let i = 1; i <= 31; i++){
  dailyTableHeader.push(`Tgl ${i}`);
};

for(let i = 0; i < lastHeader.length; i++){
  dailyTableHeader.push(lastHeader[i]);
};

const dummyTable = [
  {
    problem: "Card Reader",
    flm: "TAG",
    slm: "Datindo",
    jarkom: "Vsat Telkom",
    detail: [
      {
        problem: "Magnetic Card Read Write Warning",
        flm: "TAG",
        slm: "Datindo",
        jarkom: "Vsat Telkom",
      },
      {
        problem: "Magnetic Card Read Write Alarm",
        flm: "TAG",
        slm: "Datindo",
        jarkom: "Vsat Telkom",
      }
    ]
  },
  {
    problem: "Card Out",
    flm: "TAG",
    slm: "Datindo",
    jarkom: "Vsat Telkom",
    detail: [
      {
        problem: "Magnetic Card Read Write Warning",
        flm: "TAG",
        slm: "Datindo",
        jarkom: "Vsat Telkom",
      },
      {
        problem: "Magnetic Card Read Write Alarm",
        flm: "TAG",
        slm: "Datindo",
        jarkom: "Vsat Telkom",
      }
    ]
  }
];

const dummyDaily = () => {
  const data = {};
  for(let i = 1; i <= 5; i++){
    data[`date ${i}`] = i;
  };
  return data;
};

const additionalDummy = {
  totalProb: "2.456",
  avgProb: "127",
  max: "12",
  min: "1"
};

const mutateDetail = (detail) => {
  const dateData = dummyDaily();

  return {
    ...detail,
    ...dateData,
    ...additionalDummy
  };
};

const dailyTable = dummyTable.map(row => {
  const dateData = dummyDaily();
  return {
    ...row,
    ...dateData,
    ...additionalDummy,
    detail: row.detail.map(item => {
      return {
        ...mutateDetail(item)
      };
    })
  };
});

const dummyMonthly = () => {
  const data = {};
  for(let i = 0; i < month.length; i++){
    data[`${month[i]}`] = "21";
  };
  return data;
};

const mutateDetailMonthly = (detail) => {
  const dateData = dummyMonthly();

  return {
    ...detail,
    ...dateData,
    ...additionalDummy
  };
};

const monthlyTable = dummyTable.map(row => {
  const monthData = dummyMonthly();

  return {
    ...row,
    ...monthData,
    ...additionalDummy,
    detail: row.detail.map(item => {
      return {
        ...mutateDetailMonthly(item)
      };
    })
  };
});

const dummyHeader = [
  "Tgl 1",
  "Tgl 2",
  "Tgl 3",
  "Tgl 4",
  "Tgl 5",
]

console.log(monthlyTable);

export default {arrayCheckbox, dataTab, listAtmId, dailyTableHeader, dailyTable, monthlyTable, monthlyTableHeader, dummyHeader};
