import moment from "moment";
function mappingDataVendorFlm(response){
  console.log('dataResponse Mapping Site Quality =>', response);
  const vendorFlm = {
    flmSurvey: [
      {
        question: "Alasan Akses ke Mesin",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.flm[0].reasonMachineAccess
          },
          {
            type: "string",
            keyname: "Type",
            value: response.flm[0].reasonMachineType
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].reasonMachineCondition
          },
        ],
      },
      {
        question: "Waktu Datang",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: `${moment
              .unix(response.flm[0].startDate / 1000)
              .format("DD/MM/YYYY")  } ,${ 
              moment
                .unix(response.flm[0].startDate / 1000)
                .format("HH:mm")}`,
          },
        ],
      },
      {
        question: "Waktu Selesai",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: `${moment
              .unix(response.flm[0].endDate / 1000)
              .format("DD/MM/YYYY")  } ,${ 
                moment
                .unix(response.flm[0].endDate / 1000)
                .format("HH:mm")}`,
          },
        ],
      },
      {
        question: "Nama Petugas",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.flm[0].nameOfficer
          },
          {
            type: "image",
            value: response.flm[0].photoOfficer
          },
        ],
      },
      {
        question: "Anak Kunci Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:  response.flm[0].smallKeyBooth
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].smallKeyCondition
          },
        ],
      },
      {
        question: "Gembok kerangkeng",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.flm[0].cageLockExist
          },
          {
            type: "string",
            keyname: "Type",
            value: response.flm[0].cageLockType
          },
          {
            type: "string",
            keyname: "kondisi",
            value: response.flm[0].cageLockCondition
          },
        ],
      },
      {
        question: "Kebersihan Dalam Booth",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.flm[0].boothCleanessType
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].boothCleanessCondition
          },
        ],
      },
      {
        question: "Exhaust Fan Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:  response.flm[0].exhaustFanBooth
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].exhaustFanCondition
          },
        ],
      },
      {
        question: "UPS",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.flm[0].upsExist
          },
          {
            type: "string",
            keyname: "Type",
            value: response.flm[0].upsType
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].upsCondition
          },
        ],
      },
      {
        question: "ISO Trans",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.flm[0].isoTransExist,
          },
        ],
      },
      {
        question: "Perkabelan Dalam Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.flm[0].wiringInsideBooth
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].wiringInBoothCondition
          },
        ],
      },
      {
        question: "Perkabelan Diluar Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.flm[0].wiringOutsideBooth
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].wiringOutBoothCondition
            
          },
        ],
      },
      {
        question: "Camera Internal Upper & Lower",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.flm[0].camInternalCondition
          },
        ],
      },
      {
        question: "Camera External CCTV",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.flm[0].camExternalExist
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].camExternalCondition
          },
          {
            type: "image",
            value:  response.flm[0].camExternalCondition.photoQuestion,
          },
        ],
      },
      {
        question: "Cara Penempelan CCTV",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.flm[0].cctvAttached
          },
        ],
      },
      {
        question: "Camera External (DVR)",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:  response.flm[0].dvrCamExterl
          },
          {
            type: "string",
            keyname: "Type",
            value: response.flm[0].dvrCamExternalType
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].dvrCamExternalCondition
          },
        ],
      },
      {
        question: "Kartu Tertelan",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:  response.flm[0].cardAccident
          },
          {
            type: "string",
            keyname: "Type",
            value: response.flm[0].cardAccidentType
          },
          {
            type: "image",
            value: response.flm[0].photoCardAccident,
          },
        ],
      },
      {
        question: "Status Mesin Setelah Kunjungan",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].machineStatusVisited
          }  
        ],
      },
      {
        question: "Status Nasabah Bertransaksi",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].customerStatusTrx
          }  
        ],
      },
      {
        question: "Struk Transaksi",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].billsTrxCondition
          }  
            
        ],
      },
      {
        question: "Menu Octo Mobile",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].octoMobileMenu
          },
        ],
      },
      {
        question: "Transaksi Lambat",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].trxLateCondition
          },
        ],
      },
      {
        question: "Benda Asing Mencurigakan Dalam Mesin",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.flm[0].strangerInsideManchine
          },
        ],
      },
      {
        question: "Keluhan Lainnya",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:  response.flm[0].followupProblem
          },
          {
            type: "image",
            value: response.flm[0].photoFollowupProblem
          },
        ],
      },
    ],
    modusKejahatan : [
      {
        question: "Pintu Booth Atas",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value:  response.potentialCrime[0].topBoothDoor
          },
               
          {
            type: "image",
            value: response.potentialCrime[0].photoTopBoothDoor,
          },
        ],
      },
      {
        question: "Kerangkeng Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0].cageBooth
          },
               
          {
            type: "image",
            value:  response.potentialCrime[0].photoCageBooth
          },
        ],
      },
      {
        question: "Kunci Fascia Atas",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0].fasciaKeyTop
          },
               
          {
            type: "image",
            value: response.potentialCrime[0].photoTopBoothDoor,
          },
        ],
      },
      {
        question: "Kunci Fascia Bawah",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0].fasciaKeyBottom,
          },
               
          {
            type: "image",
            value: response.potentialCrime[0].photoFasciaKeyBottom,
          },
        ],
      },
      {
        question: "PIN Cover",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0].pinCover,
          },
               
          {
            type: "image",
            value: response.potentialCrime[0].photoPinCover,
          },
        ],
      },
      {
        question: "Benda Asing Sekitar Kartu Masuk",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0].fasciaKeyBottom,
          },
               
          {
            type: "image",
            value: response.potentialCrime[0].photoObjectCardSlot,
          },
        ],
      }, 
      {
        question: "Benda Asing Sekitar PIN Cover",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0].strangerPinCover,
          },
               
          {
            type: "image",
            value: response.potentialCrime[0].photoPinCover,
          },
        ],
      },
      {
        question: "Benda Asing Sekitar Ruangan",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime[0].strangerObjectRoom,
          },
               
          {
            type: "image",
            value: response.potentialCrime[0].photoObjectRoom,
          },
        ],
      },
            
    ],
  };
    
  return vendorFlm;
    
}
    
export default mappingDataVendorFlm;
  