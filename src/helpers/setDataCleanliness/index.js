function mappingCleanliness(response){
 const vendorKebersihan = {
   kebersihan: [
     {
       question: "Kebersihan Ruangan Sebelum Datang ",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.vendorKebersihan[0].cleanlinessBefore,
         },
         {
           type: "image",
           value: response.vendorKebersihan[0].photoCleanlinessBefore,
         },
       ],
     },
     {
       question: "Kebersihan Ruangan Setelah Dibersihkan",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.vendorKebersihan[0].cleanlinessAfter,
         },
         {
           type: "image",
           value: response.vendorKebersihan[0].photoCleanlinessAfter,
         },
       ],
     },
     {
       question: "Kondisi Body Mesin Setelah Dibersihkan",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.vendorKebersihan[0].bodyMachineAfter,
         },
         {
           type: "image",
           value: response.vendorKebersihan[0].photoBodyMachineAfter,
         },
       ],
     },
     {
       question: "Kondisi Belakang Mesin Setelah Dibersihkan",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.vendorKebersihan[0].behindMachineAfter,
         },
         {
           type: "image",
           value: response.vendorKebersihan[0].photoBehindMachineAfter,
         },
       ],
     },
     {
       question: "Kondisi Booth Setelah Dibersihkan",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.vendorKebersihan[0].boothAfter,
         },
         {
           type: "image",
           value: response.vendorKebersihan[0].photoBoothAfter,
         },
       ],
     },
     {
       question: "Tersedia Tempat Sampah",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.vendorKebersihan[0].garbageExist,
         },
         {
           type: "string",
           keyname: "Type",
           value: response.vendorKebersihan[0].garbageType,
         },
         {
           type: "image",
           value: response.vendorKebersihan[0].photoGarbage,
         },
       ],
     },
     {
       question: "Keluhan Nasabah",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.vendorKebersihan[0].complainment,
         },
         {
           type: "string",
           keyname: "Type",
           value: response.vendorKebersihan[0].complainmentMentions,
         },
       ],
     },
   ],

   potensiModusKejahatan: [
     {
       question: "Pintu Booth Atas",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.potentialCrime[0].topBoothDoor,
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
           value: response.potentialCrime[0].cageBooth,
         },
         {
           type: "image",
           value: response.potentialCrime[0].photoCageBooth,
         },
       ],
     },
     {
       question: "Kunci Fascia Atas",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.potentialCrime[0].fasciaKeyTop,
         },
         {
           type: "image",
           value: response.potentialCrime[0].photoFasciaKeyTop,
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
           value: response.potentialCrime[0].photoObjectPinCover,
         },
       ],
     },
     {
       question: "Benda Asing Sekitar Kartu Masuk",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.potentialCrime[0].strangerCardSlot,
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
           value: response.potentialCrime[0].photoObjectPinCover,
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

   cekMediaPromosi: [
     {
       question: "Flag Mounted",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.mediaPromotion[0].flagMountedExist,
         },
         {
           type: "string",
           keyname: "Type",
           value: response.mediaPromotion[0].flagMountedType,
         },
         {
           type: "string",
           keyname: "Kondisi",
           value: response.mediaPromotion[0].flagMountedCondition,
         },
         {
           type: "image",
           value: response.mediaPromotion[0].photoFlagMounted,
         },
       ],
     },
     {
       question: "Neon Box",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.mediaPromotion[0].neonBoxExist,
         },
         {
           type: "string",
           keyname: "Type",
           value: response.mediaPromotion[0].neonBoxType,
         },
         {
           type: "string",
           keyname: "Kondisi",
           value: response.mediaPromotion[0].neonBoxCondition,
         },
         {
           type: "image",
           value: response.mediaPromotion[0].photoNeonBox,
         },
       ],
     },
     {
       question: "Sticker Kaca",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.mediaPromotion[0].stickerGlassExist,
         },
         {
           type: "string",
           keyname: "Type",
           value: response.mediaPromotion[0].stickerGlassType,
         },
         {
           type: "string",
           keyname: "Kondisi",
           value: response.mediaPromotion[0].stickerGlassCondition,
         },
         {
           type: "image",
           value: response.mediaPromotion[0].photoStickerGlass,
         },
       ],
     },
     {
       question: "Booth",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.mediaPromotion[0].boothExist,
         },
         {
           type: "string",
           keyname: "Type",
           value: response.mediaPromotion[0].boothType,
         },
         {
           type: "string",
           keyname: "Kondisi",
           value: response.mediaPromotion[0].boothCondition,
         },
         {
           type: "image",
           value: response.mediaPromotion[0].photoBooth,
         },
       ],
     },
     {
       question: "Phyton Sign",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.mediaPromotion[0].pylonExist,
         },
         {
           type: "image",
           value: response.mediaPromotion[0].photoPylon,
         },
       ],
     },
     {
       question: "Media Selain 5 Item Diatas",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.mediaPromotion[0].otherMediaExist,
         },
         {
           type: "string",
           keyname: "Type",
           value: response.mediaPromotion[0].otherMediaType,
         },
         {
           type: "image",
           value: response.mediaPromotion[0].photoOtherMedia,
         },
       ],
     },
     {
       question: "Celah Atas Mesin Dengan Booth",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.mediaPromotion[0].topGapMediaExist,
         },
         {
           type: "string",
           keyname: "Kondisi",
           value: response.mediaPromotion[0].topGapMachineCondition,
         },
         {
           type: "image",
           value: response.mediaPromotion[0].photoTopGapMachine,
         },
       ],
     },
     {
       question: "Sticker Kelengkapan Mesin",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.mediaPromotion[0].stickerMachineExist,
         },
         {
           type: "string",
           keyname: "Type",
           value: response.mediaPromotion[0].stickerMachineType,
         },
         {
           type: "image",
           value: response.mediaPromotion[0].photoStickerMachine,
         },
       ],
     },

     {
       question: "Body Cat Merah",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.mediaPromotion[0].bodyRedExist,
         },
         {
           type: "image",
           value: response.mediaPromotion[0].photoBodyRed,
         },
       ],
     },
     {
       question: "Posisi Flag Mounted",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.mediaPromotion[0].positionFlasExist,
         },
         {
           type: "string",
           keyname: "Kondisi",
           value: response.mediaPromotion[0].positionFlagCondition,
         },
         {
           type: "image",
           value: response.mediaPromotion[0].photoPositionFlas,
         },
       ],
     },
     {
       question: "Kondisi Lampu Flag Mounted Saat Malam",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.mediaPromotion[0].nightFlagExist
         },
         {
           type: "image",
           value: response.mediaPromotion[0].photoNightFlag,
         },
       ],
     },
   ],
   cekKondisiRuangan: [
     {
       question: "Suhu Ruangan",
       answer: [
         {
           type: "string",
           keyname: "Kondisi",
           value: response.roomConditionDto[0].temperature,
         },
       ],
     },
     {
       question: "Tersedia AC",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.roomConditionDto[0].availableAc,
         },
         {
           type: "string",
           keyname: "Kondisi",
           value: response.roomConditionDto[0].availableAcCondition,
         },
         {
           type: "image",
           value: response.roomConditionDto[0].photoAvailableAc,
         },
       ],
     },
     {
       question: "Kondisi Plafond",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.roomConditionDto[0].ceilingCondition,
         },

         {
           type: "image",
           value: response.roomConditionDto[0].photoCeiling,
         },
       ],
     },
     {
       question: "Kondisi Dinding / Tembok",
       answer: [
         {
           type: "string",
           keyname: "Kondisi",
           value: response.roomConditionDto[0].wallCondition,
         },
         {
           type: "image",
           value: response.roomConditionDto[0].photoWall,
         },
       ],
     },
     {
       question: "Kondisi Area Kaca",
       answer: [
         {
           type: "string",
           keyname: "Kondisi",
           value: response.roomConditionDto[0].glassAreaCondition,
         },
         {
           type: "image",
           value: response.roomConditionDto[0].photoGlassArea,
         },
       ],
     },
     {
       question: "Kondisi Lantai",
       answer: [
         {
           type: "string",
           keyname: "Kondisi",
           value: response.roomConditionDto[0].floorCondition,
         },

         {
           type: "image",
           value: response.roomConditionDto[0].photoFloor,
         },
       ],
     },
     {
       question: "Kondisi Pintu",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.roomConditionDto[0].doorExist,
         },
         {
           type: "string",
           keyname: "Kondisi",
           value: response.roomConditionDto[0].doorCondition,
         },
         {
           type: "image",
           value: response.roomConditionDto[0].photoDoor,
         },
       ],
     },
     {
       question: "Instalasi Kabel",
       answer: [
         {
           type: "string",
           keyname: "Kondisi",
           value: response.roomConditionDto[0].cableInstallation,
         },
         {
           type: "image",
           value: response.roomConditionDto[0].photoCableInsttalation,
         },
       ],
     },
     {
       question: "Lampu Ruangan",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.roomConditionDto[0].lightRoomExist,
         },
         {
           type: "string",
           keyname: "Type",
           value: response.roomConditionDto[0].lightRoomType,
         },
         {
           type: "string",
           keyname: "Kondisi",
           value: response.roomConditionDto[0].lightRoomCondition,
         },
      
       ],
     },
     {
       question: "Meteran Listrik",
       answer: [
         {
           type: "string",
           keyname: "Keberadaan",
           value: response.roomConditionDto[0].electricityMeterExist,
         },
         {
           type: "string",
           keyname: "Type",
           value: response.roomConditionDto[0].electricityMeterType,
         },
         {
           type: "string",
           keyname: "Kondisi",
           value: response.roomConditionDto[0].electricityMeterCondition,
         },

         {
           type: "image",
           value: response.roomConditionDto[0].photoElectricityMeter,
         },
       ],
     },
     {
       question: "Sisa Token Listrik",
       answer: [
         {
           type: "string",
           keyname: "Type",
           value: response.roomConditionDto[0].electricTokenRemaining,
         },

         {
           type: "image",
           value: response.roomConditionDto[0].photoElectricTokenRemaining,
         },
       ],
     },
   ],
 };
return vendorKebersihan;
}
export default mappingCleanliness;