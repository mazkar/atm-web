import moment from "moment";

function mappingDataVendorMaintenance(response){
  const vendorMaintenances = {
    maintenanceSurvei: [
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
            value: response.premisesMaintenance[0]?.atmId || '-',
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
            value: response.premisesMaintenance[0]?.picOrderBy || '-',
          },
                
        ],
      },
      {
        question: "CE Number",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: "",
          },
          {
            type: "image",
            value: "",
          },
                
        ],
      },
      {
        question: "WO Type",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: "",
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
            value: response.premisesMaintenance[0] ? `${moment
                .unix(response.premisesMaintenance[0].starteddate / 1000)
                .format("DD/MM/YYYY")} ,${ 
                  moment
                  .unix(response.premisesMaintenance[0].starteddate / 1000)
                  .format("HH:mm")}` : '-',
          },
               
        ],
      },
      {
        question: "Waktu Selesai",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.premisesMaintenance[0] ? `${moment
                .unix(response.premisesMaintenance[0].endDate / 1000)
                .format("DD/MM/YYYY")  } ,${ 
                  moment
                  .unix(response.premisesMaintenance[0].endDate / 1000)
                  .format("HH:mm")}` : '-'
          },
               
        ],
      },
      {
        question: "Aktivitas yang Dilakukan",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value:  response.premisesMaintenance[0]?.activity || '-',
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
            value: response.potentialCrime[0]?.topBoothDoor || '-',
          },
        ],
      },
      {
        question: "Kerangkeng Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:  response.potentialCrime[0]?.cageBooth || '-',
          },
        ],
      },
      {
        question: "Kunci Fascia Atas",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0]?.fasciaKeyTop || '-',
          },
        ],
      },
      {
        question: "Kunci Fascia Bawah",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0]?.fasciaKeyBottom || '-',
          },
        ],
      },
      {
        question: "PIN Cover",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0]?.pinCover || '-',
          },
        ],
      },
      {
        question: "Benda Asing Sekitar Kartu Masuk",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0]?.strangerCardSlot || '-',
          },
          {
            type: "image",
            value:  response.potentialCrime[0]?.photoObjectCardSlot || '-',
          },
        ],
      },
      {
        question: "Benda Asing Sekitar PIN Cover",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:  response.potentialCrime[0]?.strangerPinCover || '-',
          },
          {
            type: "image",
            value:  response.potentialCrime[0]?.photoObjectPinCover || '-',
          },
        ],
      },
      {
        question: "Benda Asing Sekitar Ruangan",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0]?.strangerObjectRoom || '-',
          },
          {
            type: "image",
            value: response.potentialCrime[0]?.photoObjectRoom || '-',
          },
        ],
      },
    ],
    mediaPromosi: [
      {
        question: "Flag Mounted",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "string",
            keyname: "Type",
            value: "",
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: "",
          },
          {
            type: "image",
            value: "",
          }, 
        ],
      },
      {
        question: "Neon Box",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "string",
            keyname: "Type",
            value: "",
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: "",
          },
          {
            type: "image",
            value: "",
          },
        ],
      },
      {
        question: "Sticker Kaca",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "string",
            keyname: "Type",
            value: "",
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: "",
          },
          {
            type: "image",
            value: "",
          },
        ],
      },
      {
        question: "Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "string",
            keyname: "Type",
            value: "",
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: "",
          },
          {
            type: "image",
            value: "",
          },
        ],
      },
      {
        question: "Phylon Sign",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "image",
            value: "",
          },
        ],
      },
      {
        question: "Media Selain 5 Item Diatas",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "string",
            keyname: "Type",
            value: "",
          },
          {
            type: "image",
            value: "",
          },
        ],
      },
      {
        question: "Celah Atas Mesin Dengan Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "image",
            value: "",
          },
        ],
      },
      {
        question: "Sticker Kelengkapan Mesin",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "string",
            keyname: "Type",
            value: "",
          },
          {
            type: "image",
            value: "",
          },
        ],
      },
        
      {
        question: "Body Cat Merah",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "image",
            value: "",
          },
        ],
      },
      {
        question: "Posisi Flag Mounted",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: "",
          },
          {
            type: "image",
            value: "",
          },
        ],
      },
      {
        question: "Kondisi Lampu Flag Mounted Saat Malam",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "image",
            value: "",
          },
        ],
      },
    ],
    kondisiRuangan: [
      {
        question: "Suhu Ruangan",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto[0]?.temperature || '-',
          },
        ],
      },
      {
        question: "Tersedia AC",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.roomConditionDto[0]?.availableAc || '-',
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto[0]?.availableAcCondition || '-',
          },
          {
            type: "image",
            value: response.roomConditionDto[0]?.photoAvailableAc || '-',
          },
        ],
      },
      {
        question: "Kondisi Plafond",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.roomConditionDto[0]?.ceilingCondition || '-',
          },
        
          {
            type: "image",
            value: response.roomConditionDto[0]?.photoCeiling || '-',
          },
        ],
      },
      {
        question: "Kondisi Dinding / Tembok",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto[0]?.wallCondition || '-',
          },
          {
            type: "image",
            value: response.roomConditionDto[0]?.photoWall || '-',
          },
        ],
      },
      {
        question: "Kondisi Area Kaca",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto[0]?.glassAreaCondition || '-',
          },
          {
            type: "image",
            value: response.roomConditionDto[0]?.photoGlassArea || '-',
          },
        ],
      },
      {
        question: "Kondisi Lantai",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto[0]?.floorCondition || '-',
          },
        
          {
            type: "image",
            value: response.roomConditionDto[0]?.photoFloor || '-',
          },
        ],
      },
      {
        question: "Kondisi Pintu",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:  response.roomConditionDto[0]?.doorExist || '-',
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto[0]?.doorCondition || '-',
          },
          {
            type: "image",
            value: response.roomConditionDto[0]?.photoDoor || '-',
          },
        ],
      },
      {
        question: "Instalasi Kabel",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value:   response.roomConditionDto[0]?.cableInstallation || '-',
          },
          {
            type: "image",
            value:   response.roomConditionDto[0]?.photoCableInstallation || '-',
          },
        ],
      },
      {
        question: "Lampu Ruangan",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:   response.roomConditionDto[0]?.lightRoomExist || '-',
          },
          {
            type: "string",
            keyname: "Type",
            value:   response.roomConditionDto[0]?.lightRoomType || '-',
          },
          {
            type: "string",
            keyname: "Kondisi",
            value:   response.roomConditionDto[0]?.lightRoomCondition || '-',
          }
        ],
      },
      {
        question: "Meteran Listrik",
        answer: [
          {
            type: "string",
            keyname: "Kebradaan",
            value:   response.roomConditionDto[0]?.electricityMeterExist || '-',
          },
          {
            type: "string",
            keyname: "Type",
            value:   response.roomConditionDto[0]?.electricityMeterType || '-',
          },
          {
            type: "string",
            keyname: "Kondisi",
            value:   response.roomConditionDto[0]?.electricityMeterCondition || '-',
          },
        
          {
            type: "image",
            value: response.roomConditionDto[0]?.photoElectricityMeter || '-',
          },
        ],
      },
      {
        question: "Sisa Token Listrik",
        answer: [
          {
            type: "string",
            keyname: "type",
            value:   response.roomConditionDto[0]?.electricTokenRemaining || '-',
          },
        
          {
            type: "image",
            value:  response.roomConditionDto[0]?.photoElectricTokenRemaining || '-',
          },
        ],
      },
    ],
  };
  return vendorMaintenances;
}
export default mappingDataVendorMaintenance;