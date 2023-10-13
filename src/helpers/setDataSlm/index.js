import moment from "moment";
function mappingDataSlm(response){
  /* eslint-disable import/prefer-default-export */
  const slmData = {
    slm: [
      {
        question: "Terminal Information",
        answer: [],
      },
      {
        question: "ID ATM",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.atmId,
          },
        ],
      },
      {
        question: "Type Mesin",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.machineType,
          },
        ],
      },
      {
        question: "Serial Number",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.serialNo,
          },
        ],
      },
      {
        question: "Admin Information",
        answer: [],
      },
      {
        question: "WO Number",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.woNumber,
          },
        ],
      },
      {
        question: "CE Number",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.ceNameType,
          },
          {
            type: "image",
            value: response?.vendorSLMDto[0]?.photoCeName,
          },
        ],
      },
      {
        question: "WO Type",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.woType,
          },
        ],
      },
      {
        question: "Service Time",
        answer: [],
      },
      {
        question: "Waktu Datang",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:
              moment
                .unix(response?.vendorSLMDto[0]?.startDate / 1000)
                .format("DD/MM/YYYY") + " ," +
              moment
                .unix(response?.vendorSLMDto[0]?.startDate / 1000)
                .format("HH:mm"),
          },
        ],
      },
      {
        question: "Waktu Selesai",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:   moment
                .unix(response?.vendorSLMDto[0]?.endDate / 1000)
                .format("DD/MM/YYYY") + " ," +
              moment
                .unix(response?.vendorSLMDto[0]?.endDate / 1000)
                .format("HH:mm"),
          },
        ],
      },
      {
        question: "Aktivitas yang Dilakukan",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.activity
          },
        ],
      },
      {
        question: "Module Check",
        answer: [],
      },
      {
        question: "Card Reader",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.cardReader,
          },
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.cardReaderNoPart,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response?.vendorSLMDto[0]?.cardReaderCondition,
          },
          {
            type: "image",
            value: response?.vendorSLMDto[0]?.photoCardReader,
          },
        ],
      },
      {
        question: "Receipt Printer",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.receiptPrinter,
          },
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.receiptPrinterNoPart,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response?.vendorSLMDto[0]?.receiptPrinterCondition,
          },
          {
            type: "image",
            value: response?.vendorSLMDto[0]?.photoReceiptPrinter,
          },
        ],
      },
      {
        question: "Dispenser Module",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.dispenderModule,
          },
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.dispenserModuleNoPart,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response?.vendorSLMDto[0]?.dispenserModuleCondition,
          },
          {
            type: "image",
            value: response?.vendorSLMDto[0]?.photoDispenserModule,
          },
        ],
      },
      {
        question: "Customer Display",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.customerDisplay,
          },
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.customerDisplayNoPart,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response?.vendorSLMDto[0]?.customerDisplayCondition,
          },
          {
            type: "image",
            value: response?.vendorSLMDto[0]?.photoCustomerDisplay,
          },
        ],
      },
      {
        question: "Customer Keypad /EPP",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.customerKeypad,
          },
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.customerKeypadNoPart,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response?.vendorSLMDto[0]?.customerKeypadCondition,
          },
          {
            type: "image",
            value: response?.vendorSLMDto[0]?.photoCustomerKeypad,
          },
        ],
      },
      {
        question: "CRM Module",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.crmModule,
          },
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.crmModuleNoPart,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response?.vendorSLMDto[0]?.crmModuleCondition,
          },
          {
            type: "image",
            value: response?.vendorSLMDto[0]?.photoCrmModule,
          },
        ],
      },
      {
        question: "CPU - Memory Size",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.cpuMemory,
          },
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.cpuMemoryType,
          },
        ],
      },
      {
        question: "CPU - HDD Size",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.cpuHdd,
          },
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.cpuHddSize,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response?.vendorSLMDto[0]?.spuHddSpace
          },
        ],
      },
      {
        question: "Partisi HDD",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.partitionHdd,
          },
        ],
      },
      {
        question: "Version & Power",
        answer: [],
      },
      {
        question: "Power Outlet",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.powerOutletType,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response?.vendorSLMDto[0]?.powerOutletCondition,
          },
          {
            type: "image",
            value: response?.vendorSLMDto[0]?.photoPowerOutlet,
          },
        ],
      },
      {
        question: "Electricity (L - N)",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.electricityLn,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response?.vendorSLMDto[0]?.electricityLnVoltage,
          },
          {
            type: "image",
            value: response?.vendorSLMDto[0]?.photoElectricityLn,
          },
        ],
      },
      {
        question: "Electricity (L - G)",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.electricityLg,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response?.vendorSLMDto[0]?.electricityLgVoltage,
          },
          {
            type: "image",
            value: response?.vendorSLMDto[0]?.photoElectricityLg,
          },
        ],
      },
      {
        question: "Grounding (N - G)",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.groundingExist,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response?.vendorSLMDto[0]?.groundingVoltage,
          },
          {
            type: "image",
            value: response?.vendorSLMDto[0]?.photoGrounding,
          },
        ],
      },
      {
        question: "Versi IOS",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.osVersion,
          },
        ],
      },
      {
        question: "Kelengkapan Screen",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.screenComplete,
          },
          {
            type: "string",
            keyname: "Type",
            value: response?.vendorSLMDto[0]?.screenCompleteType,
          },
        ],
      },
      {
        question: "Plat Anti Deep Skimming",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.vendorSLMDto[0]?.platSkimming,
          },
        ],
      },
    ],

    modusKejahatan: [
      {
        question: "Pintu Booth Atas",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.potentialCrimeDto[0]?.topBoothDoor,
          },
          {
            type: "image",
            value: response?.potentialCrimeDto[0]?.photoTopBoothDoor,
          },
        ],
      },
      {
        question: "Kerangkeng Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.potentialCrimeDto[0]?.cageBooth,
          },
          {
            type: "image",
            value: response?.potentialCrimeDto[0]?.photoCageBooth,
          },
        ],
      },
      {
        question: "Kunci Fascia Atas",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.potentialCrimeDto[0]?.fasciaKeyTop,
          },
          {
            type: "image",
            value: response?.potentialCrimeDto[0]?.photoFasciaKeyTop,
          },
        ],
      },
      {
        question: "Kunci Fascia Bawah",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.potentialCrimeDto[0]?.fasciaKeyBottom,
          },
          {
            type: "image",
            value: response?.potentialCrimeDto[0]?.photoFasciaKeyBottom,
          },
        ],
      },
      {
        question: "PIN Cover",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.potentialCrimeDto[0]?.pinCover,
          },
          {
            type: "image",
            value: response?.potentialCrimeDto[0]?.photoObjectPinCover,
          },
        ],
      },
      {
        question: "Benda Asing Sekitar Kartu Masuk",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.potentialCrimeDto[0]?.strangerCardSlot,
          },
          {
            type: "image",
            value: response?.potentialCrimeDto[0]?.photoObjectCardSlot,
          },
        ],
      },
      {
        question: "Benda Asing Sekitar PIN Cover",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.potentialCrimeDto[0]?.strangerPinCover,
          },
          {
            type: "image",
            value: response?.potentialCrimeDto[0]?.photoObjectPinCover,
          },
        ],
      },
      {
        question: "Benda Asing Sekitar Ruangan",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response?.potentialCrimeDto[0]?.strangerObjectRoom,
          },
          {
            type: "image",
            value: response?.potentialCrimeDto[0]?.photoObjectRoom,
          },
        ],
      },
    ],
  };
  return slmData;
}
export default mappingDataSlm;