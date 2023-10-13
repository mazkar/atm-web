import moment from "moment";

function mappingDataSiteQuality(response) {
  // console.log('dataResponse Mapping Site Quality =>', response);
  const vendorSurveySites = {
    vendorSiteSurvey: [
      {
        question: "ID ATM",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.siteQualityDto.atmId,
          },
        ],
      },
      {
        question: "Status Lokasi",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.siteQualityDto.locStatus,
          },
        ],
      },
      {
        question: "Tipe Lokasi",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.siteQualityDto.locTypeExist,
          },
          {
            type: "string",
            keyname: "Type",
            value: response.siteQualityDto.locType,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.siteQualityDto.locTypeCondition,
          },
          {
            type: "image",
            value: response.siteQualityDto.photoLocType,
          },
        ],
      },
      {
        question: "ATM Lain di lokasi sama",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.siteQualityDto.atmLocExist,
          },
          {
            type: "string",
            keyname: "Type",
            value: response.siteQualityDto.tmLocType,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.siteQualityDto.atmLocCondition,
          },
          {
            type: "image",
            value: response.siteQualityDto.photoAtmLoc,
          },
        ],
      },
      {
        question: "ATM Sekitar 100 m",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.siteQualityDto.atmNearExist,
          },
          {
            type: "string",
            keyname: "Type",
            value: response.siteQualityDto.atmNearType,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.siteQualityDto.atmNearCondition,
          },
        ],
      },
      {
        question: "Pengelola Listrik",
        answer: [
          {
            type: "string",
            keyname: "Type",
            value: response.siteQualityDto.electricVendor,
          },
        ],
      },
      {
        question: "Bayar Parkir ke ATM",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.siteQualityDto.parkingAtm,
          },
        ],
      },
      {
        question: "Foto seluruh Body Mesin",
        answer: [
          {
            type: "string",
            keyname: "",
            value: "",
          },
          {
            type: "image",
            value: response.siteQualityDto.photoMachineBody,
          },
        ],
      },
      {
        question: "Foto Seluruh Ruangan ATM dari dekat",
        answer: [
          {
            type: "string",
            keyname: "",
            value: "",
          },

          {
            type: "image",
            value: response.siteQualityDto.photoCloseUpAtm,
          },
        ],
      },
      {
        question: "Foto Ruangan ATM dari jauh terlihat area sekitar",
        answer: [
          {
            type: "string",
            keyname: "",
            value: "",
          },

          {
            type: "image",
            value: response.siteQualityDto.photoAroundAtm,
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
            value: response.potentialCrime.topBoothDoor,
          },
        ],
      },
      {
        question: "Kerangkeng Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime.cageBooth,
          },
        ],
      },
      {
        question: "Kunci Fascia Atas",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime.fasciaKeyTop,
          },
        ],
      },
      {
        question: "Kunci Fascia Bawah",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime.fasciaKeyBottom,
          },
        ],
      },
      {
        question: "PIN Cover",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime.pinCover,
          },
        ],
      },
      {
        question: "Benda Asing Sekitar Kartu Masuk",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime.strangerCardSlot,
          },
          {
            type: "image",
            value: response.potentialCrime.photoObjectCardSlot,
          },
        ],
      },
      {
        question: "Benda Asing Sekitar PIN Cover",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime.strangerPinCover,
          },
          {
            type: "image",
            value: response.potentialCrime.photoPinCover,
          },
        ],
      },
      {
        question: "Benda Asing Sekitar Ruangan",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.potentialCrime.strangerObjectRoom,
          },
          {
            type: "image",
            value: response.potentialCrime.photoObjectRoom,
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
            value: response.mediaPromotion.flagMountedExist,
          },
          {
            type: "string",
            keyname: "Type",
            value: response.mediaPromotion.flagMountedType,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.mediaPromotion.flagMountedCondition,
          },
          {
            type: "image",
            value: response.mediaPromotion.photoFlagMounted,
          },
        ],
      },
      {
        question: "Neon Box",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.mediaPromotion.neonBoxExist,
          },
          {
            type: "string",
            keyname: "Type",
            value: response.mediaPromotion.neonBoxType,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.mediaPromotion.neonBoxCondition,
          },
          {
            type: "image",
            value: response.mediaPromotion.photoNeonBox,
          },
        ],
      },
      {
        question: "Sticker Kaca",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.mediaPromotion.stickerGlassExist,
          },
          {
            type: "string",
            keyname: "Type",
            value: response.mediaPromotion.stickerGlassType,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.mediaPromotion.stickerGlassCondition,
          },
          {
            type: "image",
            value: response.mediaPromotion.photoStickerGlass,
          },
        ],
      },
      {
        question: "Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.mediaPromotion.boothExist,
          },
          {
            type: "string",
            keyname: "Type",
            value: response.mediaPromotion.boothType,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.mediaPromotion.boothCondition,
          },
          {
            type: "image",
            value: response.mediaPromotion.photoBooth,
          },
        ],
      },
      {
        question: "Phylon Sign",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.mediaPromotion.pylonExist,
          },
          {
            type: "image",
            value: response.mediaPromotion.photoPylon,
          },
        ],
      },
      {
        question: "Media Selain 5 Item Diatas",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.mediaPromotion.otherMediaExist,
          },

          {
            type: "string",
            keyname: "Type",
            value: response.mediaPromotion.otherMediaType,
          },
          {
            type: "image",
            value: response.mediaPromotion.photoOtherMedia,
          },
        ],
      },
      {
        question: "Celah Atas Mesin Dengan Booth",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.mediaPromotion.topGapMediaExist,
          },
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.mediaPromotion.topGapMachineCondition,
          },
          {
            type: "image",
            value: response.mediaPromotion.photoTopGapMachine,
          },
        ],
      },
      {
        question: "Sticker Kelengkapan Mesin",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.mediaPromotion.stickerMachineExist,
          },
          {
            type: "string",
            keyname: "Type",
            value: response.mediaPromotion.stickerMachineType,
          },

          {
            type: "image",
            value: response.mediaPromotion.photoStickerMachine,
          },
        ],
      },

      {
        question: "Body Cat Merah",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.mediaPromotion.bodyRedExist,
          },
          {
            type: "string",
            keyname: "Keberadaan",
            value: "",
          },
          {
            type: "image",
            value: response.mediaPromotion.photoBodyRed,
          },
        ],
      },
      {
        question: "Posisi Flag Mounted",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.mediaPromotion.positionFlasExist,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.mediaPromotion.positionFlagCondition,
          },
          {
            type: "image",
            value: response.mediaPromotion.photoPositionFlag,
          },
        ],
      },
      {
        question: "Kondisi Lampu Flag Mounted Saat Malam",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.mediaPromotion.nightFlagExist,
          },
          {
            type: "image",
            value: response.mediaPromotion.photoNightFlag,
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
            value: response.roomConditionDto.temperature,
          },
        ],
      },
      {
        question: "Tersedia AC",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.roomConditionDto.availableAc,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto.availableAcCondition,
          },
          {
            type: "image",
            value: response.roomConditionDto.photoAvailableAc,
          },
        ],
      },
      {
        question: "Kondisi Plafond",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.roomConditionDto.ceilingCondition,
          },

          {
            type: "image",
            value: response.roomConditionDto.photoCeiling,
          },
        ],
      },
      {
        question: "Kondisi Dinding / Tembok",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto.wallCondition,
          },
          {
            type: "image",
            value: response.roomConditionDto.photoWall,
          },
        ],
      },
      {
        question: "Kondisi Area Kaca",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto.glassAreaCondition,
          },
          {
            type: "image",
            value: response.roomConditionDto.photoGlassArea,
          },
        ],
      },
      {
        question: "Kondisi Lantai",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto.floorCondition,
          },

          {
            type: "image",
            value: response.roomConditionDto.photoFloor,
          },
        ],
      },
      {
        question: "Kondisi Pintu",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.roomConditionDto.doorExist,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto.doorCondition,
          },
          {
            type: "image",
            value: response.roomConditionDto.photoDoor,
          },
        ],
      },
      {
        question: "Instalasi Kabel",
        answer: [
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto.cableInstallation,
          },
          {
            type: "image",
            value: response.roomConditionDto.photoCableInstallation,
          },
        ],
      },
      {
        question: "Lampu Ruangan",
        answer: [
          {
            type: "string",
            keyname: "Keberadaan",
            value: response.roomConditionDto.lightRoomExist,
          },
          {
            type: "string",
            keyname: "Type",
            value: response.roomConditionDto.lightRoomType,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto.lightRoomCondition,
          },
        ],
      },
      {
        question: "Meteran Listrik",
        answer: [
          {
            type: "string",
            keyname: "Kebradaan",
            value: response.roomConditionDto.electricityMeterExist,
          },
          {
            type: "string",
            keyname: "Type",
            value: response.roomConditionDto.electricityMeterType,
          },
          {
            type: "string",
            keyname: "Kondisi",
            value: response.roomConditionDto.electricityMeterCondition,
          },

          {
            type: "image",
            value: response.roomConditionDto.photoElectricityMeter,
          },
        ],
      },
      {
        question: "Sisa Token Listrik",
        answer: [
          {
            type: "string",
            keyname: "type",
            value: "",
          },

          {
            type: "image",
            value: response.roomConditionDto.photoElectricTokenRemaining,
          },
        ],
      },
    ],
  };

  return vendorSurveySites;
}

export default mappingDataSiteQuality;
