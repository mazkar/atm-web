import React from "react";

const dummyData = [
  {
    id: 1,
    folderName: "Folder1",
    totalFile: "2",
    modifiedDate: "20-10-2021",
    documents: ["Dokumen.pdf", "Dokumen.jpg", "Dokumen2.pdf", "Dokumen.png"],
  },
  {
    id: 2,
    folderName: "Folder2",
    totalFile: "2",
    modifiedDate: "20-10-2021",
    documents: ["Dokumen.pdf", "Dokumen.jpg", "Dokumen2.pdf", "Dokumen.png"],
  },
  {
    id: 3,
    folderName: "Folder3",
    totalFile: "2",
    modifiedDate: "20-10-2021",
    documents: ["Dokumen.pdf", "Dokumen.jpg", "Dokumen2.pdf", "Dokumen.png"],
  },
  {
    id: 4,
    folderName: "Folder4",
    totalFile: "2",
    modifiedDate: "20-10-2021",
    documents: ["Dokumen.pdf", "Dokumen.jpg", "Dokumen2.pdf", "Dokumen.png"],
  },
  {
    id: 5,
    folderName: "Folder5",
    totalFile: "2",
    modifiedDate: "20-10-2021",
    documents: ["Dokumen.pdf", "Dokumen.jpg", "Dokumen2.pdf", "Dokumen.png"],
  },
  {
    id: 6,
    folderName: "Folder6",
    totalFile: "2",
    modifiedDate: "20-10-2021",
    documents: ["Dokumen.pdf", "Dokumen.jpg", "Dokumen2.pdf", "Dokumen.png"],
  },
  {
    id: 7,
    folderName: "Folder7",
    totalFile: "2",
    modifiedDate: "20-10-2021",
    documents: ["Dokumen.pdf", "Dokumen.jpg", "Dokumen2.pdf", "Dokumen.png"],
  },
];

const ServiceDocControl = () => {
  const hitDummyAPI = async () => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(dummyData);
      }, 3000);
    });
  };

  return {
    hitDummyAPI,
  };
};

export default ServiceDocControl;
