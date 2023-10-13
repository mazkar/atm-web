import moment from "moment";

function mappingDataVendorMaintenance(response) {
  const vendorMaintenances = {
    maintenanceSurveiPromosi: [
      {
        question: "Terminal Information",
        answer: [
          {
            type: "string",
            keyname: "",
            value: "",
          },
        ],
      },
      {
        question: "ID ATM",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.atmId ? response.atmId : "-",
          },
        ],
      },
      {
        question: "Admin Information",
        answer: [
          {
            type: "string",
            keyname: "",
            value: "",
          },
        ],
      },
      {
        question: "Nama Teknisi",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.technicianType ? response.technicianType : "-",
          },
          {
            type: "image",
            value: response.photoTechnician ? response.photoTechnician : "-",
          },
        ],
      },
      {
        question: "Jenis Orderan",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.orderType ? response.orderType : "-",
          },
        ],
      },
      {
        question: "PIC Yang Order",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.picOrderBy ? response.picOrderBy : "-",
          },
        ],
      },
      {
        question: "Type Vendor",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.typeVendor ? response.typeVendor : "-",
          },
        ],
      },
      {
        question: "Service Time",
        answer: [
          {
            type: "string",
            keyname: "",
            value: "",
          },
        ],
      },
      {
        question: "Waktu Datang",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.startedDate
              ? `${moment
                  .unix(response.startedDate / 1000)
                  .format("DD/MM/YYYY")} ,${moment
                  .unix(response.startedDate / 1000)
                  .format("HH:mm")}`
              : "-",
          },
        ],
      },
      {
        question: "Waktu Selesai",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.endDate
              ? `${moment
                  .unix(response.endDate / 1000)
                  .format("DD/MM/YYYY")} ,${moment
                  .unix(response.endDate / 1000)
                  .format("HH:mm")}`
              : "-",
          },
        ],
      },
      {
        question: "Aktivitas yang Dilakukan",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.activity,
          },
        ],
      },
    ],
  };
  return vendorMaintenances;
}
export default mappingDataVendorMaintenance;
