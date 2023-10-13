
export const titleTable = [
  {id: "id", numeric: false, disablePadding: false, label: "No Ticket"},
  {id: "tglReq", numeric: false, disablePadding: false, label: "Tgl Req"},
  {id: "userReq", numeric: false, disablePadding: false,label: "User Req"},
  {id: "judulArtikel", numeric: false, disablePadding: false, label: "Judul Artikel"},
  {id: "approver", numeric: false, disablePadding: false, label: "Approver",},
  {id: "statusApproval", numeric: false, disablePadding: false, label: "Status Approval",},
  {id: "tglApproval", numeric: false, disablePadding: false, label: "Tgl Approval",},
  { id: "action", numeric: false, disablePadding: false, label: "", disabledSort: true  },
];

export const valueTypes = [
  "string",
  "limit20",
  "limit20",
  "limit20",
  "singleApprover",
  "statusFileApproval",
  "limit20",
  "child"
];

export const itemSearch = [
  { text: 'No Ticket', value: 'id' },
  { text: 'Tgl Req', value: 'publishDate' },
  { text: 'User Req', value: 'userName' },
  { text: 'Judul Artikel', value: 'fileName' },
  // { text: 'Approver', value: 'approver' },
  { text: 'Status Approval', value: 'status' },
  { text: 'Tgl Approval', value: 'approvalDate' }
];
