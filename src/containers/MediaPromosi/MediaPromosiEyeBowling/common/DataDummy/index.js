export const sideBarMenu = [
  {
    id: 1,
    category: "Gallery Foto Sekitar ATM",
  },
  {
    id: 2,
    category: "Gallery Foto Negatif",
  },
  {
    id: 3,
    category: "Gallery Flag Mounted",
  },
  {
    id: 4,
    category: "Gallery Foto Sticker Kaca",
  },
  {
    id: 5,
    category: "Gallery Foto Booth",
  },
];

export const listRequest = {
  reqFotoSekitarAtm: {
    dataPerPage: 3,
    pageNumber: 0,
    sortBy: "atmId",
    category: "Gallery Foto Sekitar ATM",
    sortType: "ASC",
    atmId: "All",
  },
  reqFotoNegatif: {
    dataPerPage: 3,
    pageNumber: 0,
    sortBy: "atmId",
    category: "Gallery Foto Negatif",
    sortType: "ASC",
    atmId: "All",
  },
  reqFotoFlagMounted: {
    dataPerPage: 3,
    pageNumber: 0,
    sortBy: "atmId",
    category: "Gallery Flag Mounted",
    sortType: "ASC",
    atmId: "All",
  },
  reqFotoStickerKaca: {
    dataPerPage: 3,
    pageNumber: 0,
    sortBy: "atmId",
    category: "Gallery Foto Sticker Kaca",
    sortType: "ASC",
    atmId: "All",
  },
  reqFotoBooth: {
    dataPerPage: 3,
    pageNumber: 0,
    sortBy: "atmId",
    category: "Gallery Foto Booth",
    sortType: "ASC",
    atmId: "All",
  },
};
