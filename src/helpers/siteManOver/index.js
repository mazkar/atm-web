function getStatusLabel(status, openingType = '') {
  const numericStatus = status * 1;
  const opening = openingType.toLowerCase();
  switch (numericStatus) {
    case 1:
      return opening === 'new' ? 'Pipeline' : 'Profiling - 1';
    case 2:
      return opening === 'new' ? 'Profiling' : 'Profiling - 2';
    case 3:
      return 'Negotiation';
    case 4:
      return 'Procurement';
    case 5:
      return 'Approval';
    case 6:
      return 'Submission';
    case 7:
      return opening === 'renewal' ? 'LOO' : 'Konfirmasi perpanjangan (Surat)';
    case 8:
      return opening === 'termin'
        ? 'Letter Termination'
        : opening === 'replace'
        ? 'Letter Replace'
        : 'Konfirmasi Termination (Surat)';
    case 9:
      return opening === 'replace' ? 'Submission' : 'Izin / Jadwal Penarikan';
    case 10:
      return opening === 'termin' ? 'Implementation' : 'Terminated';
    case 11:
      return opening === 'replace' ? 'Implementation' : 'Replaced';
    case 12:
      return opening === 'termin' ? 'Document Refund Deposit' : 'Implementation';
    case 13:
      return 'Online';
    case 14:
      return 'Document & Legality';
    default:
      return 'Unknown';
  }
}

function mapCardDetail(detailArray, openingType) {
  return detailArray?.map(({ status, value }) => ({
    left: getStatusLabel(status, openingType),
    right: value,
  }));
}

function findElByStatus(arr, status) {
  return arr.find((val) => status === val?.status) || { value: 0, status };
}

function findElByCategory(arr, cat) {
  return arr?.find((val) => val.category === cat);
}

function rearrangeArrayByStatus(arr, arrangedOrder) {
  return arrangedOrder.map((val) => findElByStatus(arr, val));
}

function getPencapaian(arr, status) {
  return findElByStatus(arr, status)?.value;
}

export {
  getStatusLabel,
  mapCardDetail,
  getPencapaian,
  findElByStatus,
  rearrangeArrayByStatus,
  findElByCategory,
};
