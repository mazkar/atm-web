//function handlePopUp
const handleOpenPopUp = (type, atmId) => {
  console.log(type);
  console.log(atmId);
};

//DATA NEW------------------------------------------------------------------------->>>>>>>

export const dummyDataNew = [
  {
    id: 1,
    atmId: 101,
    locationName: "CIMB yogyakarta",
    type: "Perorangan",
    legalityTotal: "4/5",
    draftPksTotal: "1/1",
    rentInvoiceTotal: "1/2",
    bukpotTotal: "1/1",
    pksTotal: "1/1",
    suratIzinLandlordTotal: "1/1",
    status: "onprogress",
  },
  {
    id: 2,
    atmId: 101,
    locationName: "CIMB yogyakarta",
    type: "Institusi",
    legalityTotal: "4/5",
    draftPksTotal: "1/1",
    rentInvoiceTotal: "1/2",
    bukpotTotal: "1/1",
    pksTotal: "1/1",
    suratIzinLandlordTotal: "1/1",
    status: "onprogress",
  },
  {
    id: 3,
    atmId: 101,
    locationName: "CIMB yogyakarta",
    type: "Institusi",
    legalityTotal: "4/5",
    draftPksTotal: "1/1",
    rentInvoiceTotal: "1/2",
    bukpotTotal: "1/1",
    pksTotal: "1/1",
    suratIzinLandlordTotal: "1/1",
    status: "onprogress",
  },
  {
    id: 3,
    atmId: 101,
    locationName: "CIMB yogyakarta",
    type: "Perorangan",
    legalityTotal: "4/5",
    draftPksTotal: "1/1",
    rentInvoiceTotal: "1/2",
    bukpotTotal: "1/1",
    pksTotal: "1/1",
    suratIzinLandlordTotal: "1/1",
    status: "onprogress",
  },
];

//DATA RENEW-------------------------------------------------------------------------->>>>>>>>>>>

export const dummyDataRenew = [
  {
    id: 1,
    atmId: 1012,
    locationName: "CIMB yogyakarta",
    type: "Perorangan",
    legalityTotal: "4/5",
    draftPksTotal: "1/1",
    rentInvoiceTotal: "1/2",
    bukpotTotal: "1/1",
    filling: "1/1",
    status: "onprogress",
  },
  {
    id: 2,
    atmId: 1012,
    locationName: "CIMB yogyakarta",
    type: "Perorangan",
    legalityTotal: "4/5",
    draftPksTotal: "1/1",
    rentInvoiceTotal: "1/2",
    bukpotTotal: "1/1",
    filling: "1/1",
    status: "onprogress",
  },
  {
    id: 3,
    atmId: 1012,
    locationName: "CIMB yogyakarta",
    type: "Perorangan",
    legalityTotal: "4/5",
    draftPksTotal: "1/1",
    rentInvoiceTotal: "1/2",
    bukpotTotal: "1/1",
    filling: "1/1",
    status: "onprogress",
  },
];

//DATA TERMIN-------------------------------------------------------------------------->>>>>>>>>>>

export const dummyDataTermin = [
  {
    id: 1,
    atmId: 1012,
    locationName: "CIMB yogyakarta",
    type: "Perorangan",
    legalityTotal: "4/5",
    pengakhiranSewaPKS: "1/2",
    suratIzinLandlord: "1/1",
    securityDeposit: "1/1",
    status: "onprogress",
  },
  {
    id: 1,
    atmId: 1012,
    locationName: "CIMB yogyakarta",
    type: "Perorangan",
    legalityTotal: "4/5",
    pengakhiranSewaPKS: "1/2",
    suratIzinLandlord: "1/1",
    securityDeposit: "1/1",
    status: "onprogress",
  },
  {
    id: 1,
    atmId: 1012,
    locationName: "CIMB yogyakarta",
    type: "Perorangan",
    legalityTotal: "4/5",
    pengakhiranSewaPKS: "1/2",
    suratIzinLandlord: "1/1",
    securityDeposit: "1/1",
    status: "onprogress",
  },
  {
    id: 1,
    atmId: 1012,
    locationName: "CIMB yogyakarta",
    type: "Perorangan",
    legalityTotal: "4/5",
    pengakhiranSewaPKS: "1/2",
    suratIzinLandlord: "1/1",
    securityDeposit: "1/1",
    status: "onprogress",
  },
  {
    id: 1,
    atmId: 1012,
    locationName: "CIMB yogyakarta",
    type: "Perorangan",
    legalityTotal: "4/5",
    pengakhiranSewaPKS: "1/2",
    suratIzinLandlord: "1/1",
    securityDeposit: "1/1",
    status: "onprogress",
  },
];

//DATA TERMIN-------------------------------------------------------------------------->>>>>>>>>>>

export const dummyDataReplace = [
  {
    id: 1,
    atmId: 1012,
    locationName: "CIMB yogyakarta UmbulHarjo",
    type: "Perorangan",
    suratIzinLandlord: "1/1",
    status: "onprogress",
  },
  {
    id: 1,
    atmId: 1012,
    locationName: "CIMB yogyakarta UmbulHarjo",
    type: "Institusi",
    suratIzinLandlord: "1/1",
    status: "onprogress",
  },
  {
    id: 1,
    atmId: 1012,
    locationName: "CIMB yogyakarta UmbulHarjo",
    type: "Perorangan",
    suratIzinLandlord: "1/1",
    status: "onprogress",
  },
  {
    id: 1,
    atmId: 1012,
    locationName: "CIMB yogyakarta UmbulHarjo",
    type: "Perorangan",
    suratIzinLandlord: "1/1",
    status: "onprogress",
  },
];

//API POPUP UPLOAD
export const documents = [
  {
    acknowledge: false,
    available: false,
    category: "Legalitas",
    documentName: "Akte Pendirian Perusahaan",
    filename: null,
    id: 1,
  },
  {
    acknowledge: false,
    available: false,
    category: "Legalitas",
    documentName: "Susunan Kepengurusan",
    filename: null,
    id: 86,
  },
  {
    acknowledge: false,
    available: false,
    category: "Legalitas",
    documentName: "Surat Izin Usaha Perdagangan(SIUP)",
    filename: null,
    id: 124,
  },
  {
    acknowledge: false,
    available: false,
    category: "Legalitas",
    documentName: "Tanda Daftar Perusahaan (TDP)",
    filename: null,
    id: 125,
  },
  {
    acknowledge: false,
    available: false,
    category: "Legalitas",
    documentName: "Tanda Daftar Perusahaan (TDP)",
    filename: null,
    id: 5,
  },
  {
    acknowledge: false,
    available: false,
    category: "Legalitas",
    documentName: "Surat Keterangan Domisili",
    filename: null,
    id: 6,
  },
  {
    acknowledge: false,
    available: false,
    category: "Legalitas",
    documentName: "Surat Pengukuhan Pengusaha Kena Pajak(SPPKP)",
    filename: null,
    id: 7,
  },
  {
    acknowledge: false,
    available: false,
    category: "Legalitas",
    documentName: "NPWP",
    filename: null,
    id: 8,
  },
];

export const dummyDetail = [
  {
    id: 1,
    tahun: "2020",
    surveyPajak: "12/12/2021",
    prosesDaftar: "12/12/2021",
    reviewSKPD: "12/12/2021",
    cetakSKPD: "12/12/2021",
    prosesBayar: "12/12/2021",
    attachSKPD: "Pajak2020.pdf",
    nextPajakAwal: "12/12/2021",
    nextPajakAkhir: "12/12/2021",
    nilaiPajak: "Rp 400.000",
    nilaiJasa: "Rp 400.000",
  },
  {
    id: 1,
    tahun: "2020",
    surveyPajak: "12/12/2021",
    prosesDaftar: "12/12/2021",
    reviewSKPD: "12/12/2021",
    cetakSKPD: "12/12/2021",
    prosesBayar: "12/12/2021",
    attachSKPD: "Pajak2020.pdf",
    nextPajakAwal: "12/12/2021",
    nextPajakAkhir: "12/12/2021",
    nilaiPajak: "Rp 400.000",
    nilaiJasa: "Rp 400.000",
  },
  {
    id: 1,
    tahun: "2020",
    surveyPajak: "12/12/2021",
    prosesDaftar: "12/12/2021",
    reviewSKPD: "12/12/2021",
    cetakSKPD: "12/12/2021",
    prosesBayar: "12/12/2021",
    attachSKPD: "Pajak2020.pdf",
    nextPajakAwal: "12/12/2021",
    nextPajakAkhir: "12/12/2021",
    nilaiPajak: "Rp 400.000",
    nilaiJasa: "Rp 400.000",
  },
  {
    id: 1,
    tahun: "2020",
    surveyPajak: "12/12/2021",
    prosesDaftar: "12/12/2021",
    reviewSKPD: "12/12/2021",
    cetakSKPD: "12/12/2021",
    prosesBayar: "12/12/2021",
    attachSKPD: "Pajak2020.pdf",
    nextPajakAwal: "12/12/2021",
    nextPajakAkhir: "12/12/2021",
    nilaiPajak: "Rp 400.000",
    nilaiJasa: "Rp 400.000",
  },
  {
    id: 1,
    tahun: "2020",
    surveyPajak: "12/12/2021",
    prosesDaftar: "12/12/2021",
    reviewSKPD: "12/12/2021",
    cetakSKPD: "12/12/2021",
    prosesBayar: "12/12/2021",
    attachSKPD: "Pajak2020.pdf",
    nextPajakAwal: "12/12/2021",
    nextPajakAkhir: "12/12/2021",
    nilaiPajak: "Rp 400.000",
    nilaiJasa: "Rp 400.000",
  },
  {
    id: 1,
    tahun: "2020",
    surveyPajak: "12/12/2021",
    prosesDaftar: "12/12/2021",
    reviewSKPD: "12/12/2021",
    cetakSKPD: "12/12/2021",
    prosesBayar: "12/12/2021",
    attachSKPD: "Pajak2020.pdf",
    nextPajakAwal: "12/12/2021",
    nextPajakAkhir: "12/12/2021",
    nilaiPajak: "Rp 400.000",
    nilaiJasa: "Rp 400.000",
  },
];