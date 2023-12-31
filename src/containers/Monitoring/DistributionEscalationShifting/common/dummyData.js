const Ticket = [
  {
    TicketID: 1,
    ATMID: "1002",
    Lokasi: "TGR-CRM-CBG-CLG",
    Detail: "TGR-CRM-CBG-CLG",
    Problem: "Casette 3 Not Configured",
    Tgl: "01",
    Bulan: "00",
    Start: "01/05/2021, 07:30:00",
    Selesai: null,
    Durasi: null,
    TypeMesin: "Diebold 2321",
    PIC: "Amirul Hakim",
    Status: 1,
    SLA: "14 Days",
    Approver: [1, 2, 3],
    StatusApproval: 1,
    TglApproval: "01/05/2021",
    Remark: null,
  },
  {
    TicketID: 2,
    ATMID: "1003",
    Lokasi: "TGR-CRM-CBG-CLG",
    Detail: "TGR-CRM-CBG-CLG",
    Problem: "Casette 3 Not Configured",
    Tgl: "01",
    Bulan: "00",
    Start: "01/05/2021, 07:30:00",
    Selesai: null,
    Durasi: null,
    TypeMesin: "Diebold 2321",
    PIC: "Amirul Hakim",
    Status: 2,
    SLA: "14 Days",
    Approver: [1, 2, 3],
    StatusApproval: 2,
    TglApproval: "01/05/2021",
    Remark: null,
  },
  {
    TicketID: 3,
    ATMID: "1004",
    Lokasi: "TGR-CRM-CBG-CLG",
    Detail: "TGR-CRM-CBG-CLG",
    Problem: "Casette 3 Not Configured",
    Tgl: "01",
    Bulan: "00",
    Start: "01/05/2021, 07:30:00",
    Selesai: null,
    Durasi: null,
    TypeMesin: "Diebold 2321",
    PIC: "Amirul Hakim",
    Status: 3,
    SLA: "14 Days",
    Approver: [1, 2, 3],
    StatusApproval: 3,
    TglApproval: "01/05/2021",
    Remark: null,
  },
];

const Escalation = [
  {
    IDRequest: 112,
    UserRequest: "Vina Panduwinata",
    TanggalRequest: "18-06-2022 ",
    NamaVendor: "PT Trias Nusantara",
    ATMID: "1222",
    Lokasi: "TGR-CRM-CBG-CLG",
    Detail: "TGR-CRM-CBG-CLG",
    Remark: null,
    MasterKey: "1233121",
    Approver: [1, 2, 3],
    StatusApproval: 1,
    TglApproval: "12-02-2022",
    Status: 1,
  },
  {
    IDRequest: 112,
    UserRequest: "Vina Panduwinata",
    TanggalRequest: "18-06-2022 ",
    NamaVendor: "PT Trias Nusantara",
    ATMID: "1222",
    Lokasi: "TGR-CRM-CBG-CLG",
    Detail: "TGR-CRM-CBG-CLG",
    Remark: null,
    MasterKey: "1233121",
    Approver: [1, 2, 3],
    StatusApproval: 1,
    TglApproval: "12-02-2022",
    Status: 2,
  },
  {
    IDRequest: 112,
    UserRequest: "Vina Panduwinata",
    TanggalRequest: "18-06-2022 ",
    NamaVendor: "PT Trias Nusantara",
    ATMID: "1222",
    Lokasi: "TGR-CRM-CBG-CLG",
    Detail: "TGR-CRM-CBG-CLG",
    Remark: null,
    MasterKey: "1233121",
    Approver: [1, 2, 3],
    StatusApproval: 1,
    TglApproval: "12-02-2022",
    Status: 3,
  },
];

const Shifting = [
  {
    ShiftingID: "2123",
    UserID: "1222",
    NamaPIC: "Toto Wolf",
    Jadwal: "01/05/2021",
    StartShift: "09:00:00",
    EndShift: "17:00:00",
    Shift: 1,
    Status: 1,
  },
  {
    ShiftingID: "2123",
    UserID: "1222",
    NamaPIC: "Toto Wolf",
    Jadwal: "01/05/2021",
    StartShift: "09:00:00",
    EndShift: "17:00:00",
    Shift: 1,
    Status: 2,
  },
  {
    ShiftingID: "2123",
    UserID: "1222",
    NamaPIC: "Toto Wolf",
    Jadwal: "01/05/2021",
    StartShift: "09:00:00",
    EndShift: "17:00:00",
    Shift: 1,
    Status: 2,
  },
];

export { Ticket, Escalation, Shifting };
