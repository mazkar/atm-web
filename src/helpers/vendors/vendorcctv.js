function mappingDataVendorCctv(response){
  console.log('Fiuehhh',response);
  const cctvSurvey = {
    cctvSurvei: [
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
            value:response.detailCctv[0]?.atmId,
          },
              
        ],
      },
      {
        question: "Administration",
        answer: [
          {
            type: "string",
            keyname: "",
            value: "",
          },
              
        ],
      },
      {
        question: "PIC Order",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.detailCctv[0]?.picOrder,
          },
              
        ],
      },
      {
        question: "CE Name",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.detailCctv[0]?.ceName,
          },
          {
            type: "image",
            value: response.detailCctv[0]?.photoCeName,
          },
              
        ],
      },
      {
        question: "WO Type",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.detailCctv[0]?.woType,
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
            value: response.detailCctv[0]?.startDate,
          },
             
        ],
      },
      {
        question: "Waktu Selesai",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.detailCctv[0]?.endDate,
          },
             
        ],
      },
      
      {
        question: "Aktivitas yang Dilakukan",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.detailCctv[0]?.activity,
          },
             
        ],
      },
      {
        question: "Module Check",
        answer: [
          {
            type: "string",
            keyname: "",
            value: "",
          },
             
        ],
      },
      {
        question: "Status Rekaman",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.detailCctv[0]?.recordStatus,
          },
             
        ],
      },
      {
        question: "Cek HDD",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.detailCctv[0]?.checkHdd,
          },
          {
            type: "string",
            keyname: "Type",
            value: response.detailCctv[0]?.checkHddSize,
          },
             
        ],
      },
      {
        question: "Arah CCTV",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.detailCctv[0]?.cctvDirection,
          },
          {
            type: "image",
            value: response.detailCctv[0]?.photoCctv,
          },
             
        ],
      },
    ]
  };

  return cctvSurvey;
}

export default mappingDataVendorCctv;