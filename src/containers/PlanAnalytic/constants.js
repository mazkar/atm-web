export const sectionRbb = [
  {
    hash: '#targetNewAtm',
    label: 'Target New ATM',
  },
  {
    hash: '#targetRenewal',
    label: 'Target Renewal',
  },
  {
    hash: '#targetTermin',
    label: 'Target Termin',
  },
];

const sectionRbbExt = sectionRbb.map((val) => ({
  ...val,
  linkUrl: '/plan-analytic/analyze-rbb' + val.hash,
}));

export const sectionTrx = [
  {
    hash: '#targetTransaksi',
    label: 'Target Transaksi',
  },
  {
    hash: '#targetRevenue',
    label: 'Target Revenue',
  },
  {
    hash: '#targetSLATransaksi',
    label: 'Target SLA Transaksi',
  },
];

const sectionTrxExt = sectionTrx.map((val) => ({
  ...val,
  linkUrl: '/plan-analytic/analyze-transaksi' + val.hash,
}));

export const sectionPop = [
  {
    hash: '#targetLowUsage',
    label: 'Target Low Usage',
  },
];

const sectionPopExt = sectionPop.map((val) => ({
  ...val,
  linkUrl: '/plan-analytic/analyze-populasi' + val.hash,
}));

export const urlHashes = [sectionRbbExt, sectionTrxExt, sectionPopExt];
