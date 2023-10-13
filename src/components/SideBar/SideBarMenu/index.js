/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect } from "react";
import { Menu } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import Constant from "../../../helpers/constants";

import { ReactComponent as OverviewIcon } from "../../../assets/icons/duotone-red/dashboard.svg";
import { ReactComponent as AcquisitionIcon } from "../../../assets/icons/duotone-red/chart-line.svg";
import { ReactComponent as SiteIcon } from "../../../assets/icons/duotone-red/people-carry.svg";
import { ReactComponent as FinanceIcon } from "../../../assets/icons/duotone-red/money.svg";
import { ReactComponent as UserIcon } from "../../../assets/icons/duotone-red/user-friends.svg";
import { ReactComponent as MasterIcon } from "../../../assets/icons/duotone-red/file-alt.svg";
import { ReactComponent as OverviewIconGray } from "../../../assets/icons/duotone-gray/dashboard.svg";
import { ReactComponent as AcquisitionIconGray } from "../../../assets/icons/duotone-gray/chart-line.svg";
import { ReactComponent as SiteIconGray } from "../../../assets/icons/duotone-gray/people-carry.svg";
import { ReactComponent as FinanceIconGray } from "../../../assets/icons/duotone-gray/money.svg";
import { ReactComponent as UserIconGray } from "../../../assets/icons/duotone-gray/user-friends.svg";
import { ReactComponent as MasterIconGray } from "../../../assets/icons/duotone-gray/file-alt.svg";
import { ReactComponent as ImplementationIcon } from "../../../assets/icons/duotone-red/wrench.svg";
import { ReactComponent as ImplementationIconGray } from "../../../assets/icons/duotone-gray/wrench.svg";
import { ReactComponent as VendorIconGray } from "../../../assets/icons/duotone-gray/megaphone.svg";
import { ReactComponent as VendorIcon } from "../../../assets/icons/duotone-red/megaphone.svg";
import { ReactComponent as MapIcon } from "../../../assets/icons/duotone-red/map.svg";
import { ReactComponent as MapIconGray } from "../../../assets/icons/duotone-gray/map.svg";
import { ReactComponent as TasksIconGray } from "../../../assets/icons/duotone-gray/tasks.svg";
import { ReactComponent as TransactionsIconGray } from "../../../assets/icons/duotone-gray/transaction.svg";
import { ReactComponent as FileManagementRed } from "../../../assets/icons/duotone-red/fileManagementRed.svg";
import { ReactComponent as FileManagementGray } from "../../../assets/icons/duotone-gray/fileManajemen.svg";
import { ReactComponent as ProjectManagementRed } from "../../../assets/icons/general/clipboard-check.svg";
import { ReactComponent as ProjectManagementGray } from "../../../assets/icons/general/clipboard-check-gray.svg";

import { RootContext } from "../../../router";

const { SubMenu } = Menu;

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: "15px",
    fontFamily: "Barlow",
    color: Constant.color.primaryHard,
    fontWeight: "500",
  },
  titleGray: {
    marginLeft: "15px",
    fontFamily: "Barlow",
    color: Constant.color.grayMedium,
    fontWeight: "500",
  },
  groupItem: {
    "& .ant-menu-sub.ant-menu-inline .ant-menu-item-group-title": {
      paddingLeft: 60,
    },
  },
  subTitle: {
    marginLeft: 15,
    fontSize: 14,
    fontFamily: "Barlow",
    color: Constant.color.primaryHard,
    cursor: "pointer",
    fontWeight: "500",
  },
  subtitleGray: {
    marginLeft: 15,
    fontSize: 14,
    fontFamily: "Barlow",
    color: Constant.color.grayMedium,
    cursor: "pointer",
    fontWeight: "500",
  },
  subMenuWrapper: {
    display: "flex",
    alignItems: "center",
    "& .ant-menu-submenu-arrow::before": {
      background: `${Constant.color.grayMedium} !important`,
    },
  },
  subMenuActive: {
    backgroundColor: "#FFF5F4",
    "& .ant-menu-submenu-arrow::before": {
      background: `${Constant.color.primaryHard} !important`,
    },
    "& .ant-menu-submenu-arrow::after": {
      background: `${Constant.color.primaryHard} !important`,
    },
    "& .ant-menu-item-only-child": { marginTop: 0 },
  },
}));

// jika ada tambahan menu yang ada sub menu, tambahkan key nya pada bagian bawah
const rootSubmenuKeys = [
  "subDashboard",
  "subPlan",
  "subSite",
  "subFinance",
  "subUser",
  "subMaster",
  "subProjectManagement",
  "subImplementation",
  "subVendor",
  "subEnvironmentPremises",
  "subMediaPromosi",
  "subMonitoring",
  "subAsset",
  "subAddOns",
  "subFileManagement"
];

// eslint-disable-next-line no-unused-vars
const SideBarMenu = (props) => {
  const classes = useStyles();
  const [activeButton, setActiveButton] = React.useState("0");
  const [activeSubButton, setActiveSubButton] = React.useState("");
  const location = useLocation();
  const { pathname } = location;
  const { userMenus, userRoleName } = useContext(RootContext);
  // console.log('~ userRoleName', userRoleName)
  const isPlanningUser = userRoleName?.toLowerCase().includes("planning");

  // buat atur yang akan ditampil di side menu
  const dataSideMenu = [
    {
      title: "Dashboard",
      rootKeys: "subDashboard",
      iconRed: <OverviewIcon />,
      iconGray: <OverviewIconGray />,
      sub: [
        {
          key: "011",
          title: "Overview",
          url: "/dashboard-overview",
        },
        {
          key: "012",
          title: "Population",
          url: "/dashboard-population",
        },
        {
          key: "013",
          title: "Transaction",
          url: "/dashboard-transaction",
        },
      ],
    },
    {
      title: "Plan & Analytics",
      rootKeys: "subPlan",
      iconRed: <AcquisitionIcon />,
      iconGray: <AcquisitionIconGray />,
      sub: [
        {
          key: "021",
          title: "Target",
          url: "/plan-analytic",
        },
        {
          key: "022",
          title: "RBB",
          url: "/rbb-data",
        },
        {
          key: "023",
          title: "Modeling",
          url: "/modeling-model",
        },
        {
          key: "024",
          title: "Analytic Data",
          url: "/trend-analisa",
        },
        ...(isPlanningUser
          ? [
              {
                key: "037",
                title: "Submission",
                url: "/submission-tracking",
              },
            ]
          : []),
      ],
    },
    {
      title: "Site Management",
      rootKeys: "subSite",
      iconRed: <SiteIcon />,
      iconGray: <SiteIconGray />,
      sub: [
        {
          key: "031",
          title: "Overview",
          url: "/site-management",
        },
        {
          key: "032",
          title: "RBB Implementation",
          url: "/rbb-implementation",
        },
        {
          key: "033",
          title: "Acquisition Pipeline",
          url: "/acquisition",
        },
        {
          key: "034",
          title: "Negotiation",
          url: "/negotiation",
        },
        {
          key: "035",
          title: "Procurement",
          url: "/procurement",
        },
        {
          key: "036",
          title: "Approval",
          url: "/approval",
        },
        ...(!isPlanningUser
          ? [
              {
                key: "037",
                title: "Submission",
                url: "/submission-tracking",
              },
            ]
          : []),
        {
          key: "038",
          title: "Document & Legality",
          url: "/site-management/document-legality",
        },
        {
          key: "039",
          title: "Progress List",
          url: "/site-management/progress-list",
        },
      ],
    },
    {
      title: "Financial",
      rootKeys: "subFinance",
      iconRed: <FinanceIcon />,
      iconGray: <FinanceIconGray />,
      sub: [
        {
          key: "041",
          title: "Overview",
          url: "/financial",
        },
        {
          key: "042",
          title: "Budget Cadangan",
          url: "/financial-BudgetCadangan",
        },
        {
          key: "043",
          title: "Budget Tracking",
          url: "/financial-BudgetTracking",
        },
        {
          key: "044",
          title: "Memo Pembayaran",
          url: "/financial-memo-pembayaran",
        },
        {
          key: "045",
          title: "Financial Status",
          url: "/financial-status",
        },
        {
          key: "046",
          title: "Financial Approval",
          url: "/financial-approval",
        },
      ],
    },
    {
      title: "User Management",
      rootKeys: "subUser",
      iconRed: <UserIcon />,
      iconGray: <UserIconGray />,
      sub: [
        {
          key: "051",
          title: "User Management",
          url: "/user-management",
        },
        {
          key: "052",
          title: "User Role",
          url: "/user-management/user-role",
        },
        {
          key: "053",
          title: "Vendor Management",
          url: "/vendors",
        },
        {
          key: "054",
          title: "Menu Management",
          url: "/menu-management",
        },
      ],
    },
    {
      title: "Master Data",
      rootKeys: "subMaster",
      iconRed: <MasterIcon />,
      iconGray: <MasterIconGray />,
      sub: [
        {
          key: "061",
          title: "Master Data",
          url: "/master-data",
        },
        {
          key: "063",
          title: "History Master Data",
          url: "/master-data/edit-history",
        },
      ],
    },
    {
      title: "Project Management",
      rootKeys: "subProjectManagement",
      iconRed: <ProjectManagementRed />,
      iconGray: <ProjectManagementGray />,
      sub: [
        {
          key: "171",
          title: "Overview",
          url: "/project-management/overview",
        },
        {
          key: "172",
          title: "Timeline Project",
          url: "/project-management/timeline",
        },
      ],
    },
    {
      title: "Implementation",
      rootKeys: "subImplementation",
      iconRed: <ImplementationIcon />,
      iconGray: <ImplementationIconGray />,
      sub: [
        {
          key: "071",
          title: "Overview",
          url: "/implementation/overview",
        },
        {
          key: "072",
          title: "Implementation Tracking",
          url: "/implementation",
        },
        {
          key: "073",
          title: "Roll-Out",
          url: "/implementation/rollout",
        },
        {
          key: "074",
          title: "Configuration",
          url: "/implementation/config",
        },
      ],
    },
    {
      title: "Vendor Management",
      rootKeys: "subVendor",
      iconRed: <VendorIcon />,
      iconGray: <VendorIconGray />,
      sub: [
        {
          key: "081",
          title: "Overview",
          url: "/vendor-management",
        },
        {
          key: "082",
          title: "Vendor & Service Catalog",
          url: "/vendor-management/vendor-service-catalog",
        },
        {
          key: "083",
          title: "Pricelist Part & Service",
          url: "/vendor-management/part-service-pricelist",
        },
        {
          key: "084",
          title: "Vendor Order",
          url: "/vendor-management/orders",
        },
        {
          key: "085",
          title: "Vendor Pajak",
          url: "/vendor-management/pajak",
        },
        {
          key: "086",
          title: "Vendor Approval",
          url: "/vendor-management/approval",
        },
        // {
        //   key: "087",
        //   title: "Vendor Apps",
        //   url: "/vendor-management",
        // },
        {
          key: "088",
          title: "BAST Pekerjaan Vendor",
          url: "/vendor-management",
        },
        {
          key: "089",
          title: "Digitalisasi Checklist",
          url: "/vendor-management/digitalisasi",
          itemGroup: true,
          groupItems: [
            {
              key: "0891",
              title: "Scheduling",
              url: "/vendor-management/digitalisasi/scheduling",
            },
            {
              key: "0892",
              title: "Result / Ticketing",
              url: "/vendor-management/digitalisasi/ticketing",
            },
            {
              key: "0893",
              title: "Configuration",
              url: "/vendor-management/digitalisasi/configuration",
            },
          ],
        },
      ],
    },

    // +++ START MENU FOR VENDOR USER
    {
      title: "Vendor Order",
      rootKeys: "subVendorOrder",
      iconRed: <VendorIcon />,
      iconGray: <VendorIconGray />,
      sub: [
        {
          key: "091",
          title: "Order",
          url: "/vendor-orders",
        },
      ],
    },
    // Vendor Monitoring
    {
      title: "Vendor Monitoring",
      rootKeys: "subVendorMonitoring",
      iconRed: <VendorIcon />,
      iconGray: <VendorIconGray />,
      sub: [
        {
          key: "1233",
          title: "Report Uptime",
          url: "/vendor-monitoring/report-uptime",
        },
      ],
    },
    // {
    //   title: "Vendor Digitalisasi",
    //   rootKeys: "subVendorDigitalisasi",
    //   iconRed: <VendorIcon />,
    //   iconGray: <VendorIconGray />,
    //   sub: [
    //     {
    //       key: "131",
    //       title: "Checklist Result",
    //       url: "/vendor-digitalisasi",
    //     },
    //     {
    //       key: "132",
    //       title: "Premisses Quality",
    //       url: "/vendor-digitalisasi/premisses-quality",
    //     },
    //     {
    //       key: "133",
    //       title: "Clearliness Quality",
    //       url: "/vendor-digitalisasi/clearliness-quality",
    //     },
    //     {
    //       key: "134",
    //       title: "Media Promosi Quality",
    //       url: "/vendor-digitalisasi/media-promosi-quality",
    //     },
    //     {
    //       key: "135",
    //       title: "Tracking Pengurusan Pajak",
    //       url: "/vendor-digitalisasi/tracking-pengurusan-pajak",
    //     },
    //   ],
    // },
    // +++ END MENU FOR VENDOR USER

    {
      title: "Environment Premises",
      rootKeys: "subEnvironmentPremises",
      iconRed: <MapIcon />,
      iconGray: <MapIconGray />,
      sub: [
        {
          key: "101",
          title: "Overview",
          url: "/environment-premises",
        },
        {
          key: "102",
          title: "Standarisasi Premises",
          url: "/environment-premises/premises-standarisasi",
        },
        {
          key: "103",
          title: "Premises Quality",
          url: "/environment-premises/premisses-quality",
        },
        {
          key: "104",
          title: "Clearliness Quality",
          url: "/environment-premises/clearliness-quality",
        },
        {
          key: "105",
          title: "Pra & Pasca Bayar Listrik",
          url: "/environment-premises/pra-pasca-bayar",
        },
      ],
    },
    {
      title: "Media Promosi",
      rootKeys: "subMediaPromosi",
      iconRed: <VendorIcon />,
      iconGray: <VendorIconGray />,
      sub: [
        {
          key: "111",
          title: "Overview",
          url: "/media-promosi",
        },
        {
          key: "112",
          title: "Standarisasi Media Promosi",
          url: "/media-promosi/standarisasi-media-promosi",
        },
        {
          key: "113",
          title: "Media Promosi Quality",
          url: "/media-promosi/media-promosi-quality",
          itemGroup: true,
          groupItems: [
            {
              key: "1131",
              title: "Eye Bowling",
              url: "/media-promosi/media-promosi-quality/eye-bowling",
            },
            {
              key: "1132",
              title: "Vendor Media Promosi",
              url: "/media-promosi/media-promosi-quality/vendor-media-promosi",
            },
          ],
        },
        {
          key: "114",
          title: "Tracking Pengurusan Pajak",
          url: "/media-promosi/tracking-pengurusan-pajak",
        },
      ],
    },

    {
      title: "Monitoring",
      rootKeys: "subMonitoring",
      iconRed: <VendorIcon />,
      iconGray: <VendorIconGray />,
      sub: [
        {
          key: "121",
          title: "Overview",
          url: "/monitoring/overview",
        },
        {
          key: "122",
          title: "Master Data",
          url: "/monitoring/master",
        },
        {
          key: "123",
          title: "Esq Fault Analyzer",
          url: "/monitoring/esq-fault-analyzer",
        },
        {
          key: "124",
          title: "Query Problem",
          url: "/monitoring/query-problem",
        },
        {
          key: "125",
          title: "EJ Analyzer",
          url: "/monitoring/ej-analyzer",
        },
        {
          key: "126",
          title: "Respon Code Analyzer",
          url: "/monitoring/respon-code-analyzer",
        },
        {
          key: "127",
          title: "Anomaly Alert",
          url: "/monitoring/anomaly-alert",
        },
        {
          key: "128",
          title: "Intermitten Alert",
          url: "/monitoring/intermitten-alert",
        },
        {
          key: "129",
          title: "Medical Record",
          url: "/monitoring/medical-record",
        },
        {
          key: "1291",
          title: "Report Uptime",
          url: "/monitoring/report-uptime",
        },
        {
          key: "1292",
          title: "Configuration",
          url: "/monitoring/configuration",
        },
        {
          key: "1293",
          title: "Reliability",
          url: "/monitoring/reliability",
        },
        {
          key: "1294",
          title: "Reliability Report",
          url: "/monitoring/reliability-report",
        },
        {
          key: "1295",
          title: "Ticket Distribution, Escalation dan Shifting",
          url: "/monitoring/ticket-distribution",
        },
        {
          key: "1297",
          title: "Master Key dan BA Penghancuran",
          url: "/monitoring/key-penghancuran",
        },
        {
          key: "1299",
          title: "Ba Approval",
          url: "/monitoring/ba-approval",
        },
      ],
    },
    // ASSET MANAGEMENT
    {
      title: "Asset",
      rootKeys: "subAsset",
      iconRed: <TransactionsIconGray />,
      iconGray: <TransactionsIconGray />,
      sub: [
        {
          key: "141",
          title: "Overview",
          url: "/asset-management",
        },
        {
          key: "142",
          title: "Warehouse Management",
          url: "/asset-management/warehouse-management",
        },
        {
          key: "143",
          title: "Inventory Asset",
          url: "/asset-management/inventory",
        },
        {
          key: "144",
          title: "Insurance",
          url: "/asset-management/insurance",
          itemGroup: true,
          groupItems: [
            {
              key: "1441",
              title: "Pendaftaran Asuransi",
              url: "/asset-management/insurance/pendaftaran",
            },
            {
              key: "1442",
              title: "Asuransi",
              url: "/asset-management/insurance/klaim",
            },
            {
              key: "1443",
              title: "Approval Klaim",
              url: "/asset-management/insurance/insurance-approval",
            },
            {
              key: "1444",
              title: "Approval Pendaftaran Asuransi",
              url: "/asset-management/insurance/register-insurance-approval",
            },
          ],
        },
      ],
    },
    // AD-ONs

    {
      title: "Add-Ons",
      rootKeys: "subAddOns",
      iconRed: <TasksIconGray />,
      iconGray: <TasksIconGray />,
      sub: [
        {
          key: "151",
          title: "Chat & Forum",
          url: "/add-ons/chat-forum",
        },
        {
          key: "152",
          title: "Forum Discussion",
          url: "/add-ons/forum-discussion",
        },
        {
          key: "153",
          title: "Todo List",
          url: "/add-ons/todo-list",
        },
        {
          key: "154",
          title: "Event,schedule, news",
          url: "/add-ons/event-schedule-news",
        },
        {
          key: "155",
          title: "Configuration",
          url: "/add-ons/configuration",
        },
      ],
    },

    // root file management
    {
      title: "File Management",
      rootKeys: "subFileManagement",
      iconRed: <FileManagementRed />,
      iconGray: <FileManagementGray />,
      sub: [
        {
          key: "161",
          title: "Doc Control",
          url: "/file-management/doc-control",
        },
        {
          key: "162",
          title: "Doc Legalitas",
          url: "/file-management/doc-legalitas",
        },
        {
          key: "163",
          title: "Doc Project",
          url: "/file-management/doc-project",
        },
        {
          key: "164",
          title: "Doc BAST",
          url: "/file-management/doc-bast",
        },
        {
          key: "165",
          title: "Knowledge Base",
          url: "/file-management/knowledge-base",
        },
        {
          key: "166",
          title: "Doc Invoice",
          url: "/file-management/doc-invoice",
        },
        {
          key: "167",
          title: "Pembuatan No Surat",
          url: "/file-management/pembuatan-no-surat",
        },
        {
          key: "168",
          title: "Approval",
          url: "/file-management/file-approval",
        },
        {
          key: "169",
          title: "Configuration",
          url: "/file-management/configuration",
        },
      ],
    },
  ];

  // eslint-disable-next-line consistent-return
  async function activeButtonHighlight() {
    // eslint-disable-next-line default-case
    // sub menu dashboard
    if (pathname.includes("/dashboard-overview")) {
      return "011";
    }
    if (pathname.includes("/dashboard-population")) {
      return "012";
    }
    if (pathname.includes("/dashboard-transaction")) {
      return "013";
    }
    // sub menu plan and analytic
    if (pathname.includes("/plan-analytic")) {
      return "021";
    }
    if (pathname.includes("/rbb-data")) {
      return "022";
    }
    if (pathname.includes("/modeling-model")) {
      return "023";
    }
    if (pathname.includes("/trend-analisa")) {
      return "024";
    }
    if (pathname.includes("/submission-tracking")) {
      return "037";
    }
    // sub menu site management
    if (pathname.includes("/site-management/document-legality")) {
      return "038";
    }
    if (pathname.includes("/site-management/progress-list")) {
      return "039";
    }
    if (pathname.includes("/site-management")) {
      return "031";
    }
    if (pathname.includes("/rbb-implementation")) {
      return "032";
    }
    if (pathname.includes("/acquisition")) {
      return "033";
    }
    if (pathname.includes("/negotiation")) {
      return "034";
    }
    if (pathname.includes("/procurement")) {
      return "035";
    }
    if (pathname.includes("/approval")) {
      return pathname.includes("vendor") ? "086" : "036";
    }

    // financial
    if (pathname.includes("/financial-BudgetCadangan")) {
      return "042";
    }
    if (pathname.includes("/financial-BudgetTracking")) {
      return "043";
    }
    if (pathname.includes("/financial-memo-pembayaran")) {
      return "044";
    }
    if (pathname.includes("/financial-status")) {
      return "045";
    }
    if (pathname.includes("/financial-approval")) {
      return "046";
    }
    if (pathname.includes("/financial")) {
      return "041";
    }

    // user management
    if (pathname.includes("/user-management/user-role")) {
      return "052";
    }
    if (pathname.includes("/user-management")) {
      return "051";
    }
    if (pathname.includes("/vendors")) {
      return "053";
    }
    if (pathname.includes("/menu-management")) {
      return "054";
    }

    // master data
    if (pathname.includes("/master-data/detail")) {
      return "062";
    }
    if (pathname.includes("/master-data/edit-history")) {
      return "063";
    }
    if (pathname.includes("/master-data")) {
      return "061";
    }

    // implementation
    if (pathname.includes("/implementation/overview")) {
      return "071";
    }
    if (pathname.includes("/implementation/rollout")) {
      return "073";
    }
    if (pathname.includes("/implementation/config")) {
      return "074";
    }
    if (pathname.includes("/implementation")) {
      return "072";
    }

    // vendor management
    if (pathname.includes("/vendor-management/orders")) {
      return "084";
    }
    if (pathname.includes("/vendor-management/pajak")) {
      return "085";
    }
    if (pathname.includes("/vendor-management/digitalisasi/scheduling")) {
      return "0891";
    }
    if (pathname.includes("/vendor-management/digitalisasi/ticketing")) {
      return "0892";
    }
    if (pathname.includes("/vendor-management/digitalisasi/configuration")) {
      return "0893";
    }
    if (pathname.includes("/vendor-management/digitalisasi")) {
      return "0891";
    }
    if (pathname.includes("/vendor-management/part-service-pricelist")) {
      return "083";
    }
    if (pathname.includes("/vendor-management/vendor-service-catalog")) {
      return "082";
    }
    if (pathname.includes("/vendor-management")) {
      return "081";
    }

    // vendor order
    if (pathname.includes("/vendor-orders")) {
      return "091";
    }
    if (pathname.includes("/vendor-monitoring/report-uptime")) {
      return "1233";
    }

    // vendor digitalisasi

    if (pathname.includes("/vendor-digitalisasi/tracking-pengurusan-pajak")) {
      return "135";
    }
    if (pathname.includes("/vendor-digitalisasi/media-promosi-quality")) {
      return "134";
    }
    if (pathname.includes("/vendor-digitalisasi/clearliness-quality")) {
      return "133";
    }
    if (pathname.includes("/vendor-digitalisasi/premisses-quality")) {
      return "132";
    }
    if (pathname.includes("/vendor-digitalisasi")) {
      return "131";
    }

    // environment premises
    if (pathname.includes("/environment-premises/premises-standarisasi")) {
      return "102";
    }
    if (pathname.includes("/environment-premises/premisses-quality")) {
      return "103";
    }
    if (pathname.includes("/environment-premises/clearliness-quality")) {
      return "104";
    }
    if (pathname.includes("/environment-premises/pra-pasca-bayar")) {
      return "105";
    }
    if (pathname.includes("/environment-premises")) {
      return "101";
    }

    // media promosi
    if (pathname.includes("/media-promosi/media-promosi-quality/eye-bowling")) {
      return "1131";
    }
    if (
      pathname.includes(
        "/media-promosi/media-promosi-quality/vendor-media-promosi"
      )
    ) {
      return "1132";
    }
    if (pathname.includes("/media-promosi/media-promosi-quality")) {
      return "1131";
    }
    if (pathname.includes("/media-promosi/standarisasi-media-promosi")) {
      return "112";
    }
    if (pathname.includes("/media-promosi/tracking-pengurusan-pajak")) {
      return "114";
    }
    if (pathname.includes("/media-promosi")) {
      return "111";
    }

    // monitoring
    if (pathname.includes("/monitoring/overview")) {
      return "121";
    }
    if (pathname.includes("/monitoring/esq-fault-analyzer")) {
      return "123";
    }
    if (pathname.includes("/monitoring/query-problem")) {
      return "124";
    }
    if (pathname.includes("/monitoring/ej-analyzer")) {
      return "125";
    }
    if (pathname.includes("/monitoring/respon-code-analyzer")) {
      return "126";
    }
    if (pathname.includes("/monitoring/anomaly-alert")) {
      return "127";
    }
    if (pathname.includes("/monitoring/master")) {
      return "122";
    }
    if (pathname.includes("/monitoring/intermitten-alert")) {
      return "128";
    }
    if (pathname.includes("/monitoring/medical-record")) {
      return "129";
    }
    if (pathname.includes("/monitoring/report-uptime")) {
      return "1291";
    }
    if (pathname.includes("/monitoring/configuration")) {
      return "1292";
    }
    if (pathname.includes("/monitoring/reliability")) {
      return "1293";
    }
    if (pathname.includes("/monitoring/reliability-report")) {
      return "1294";
    }
    if (pathname.includes("/monitoring/ticket-distribution")) {
      return "1295";
    }
    if (pathname.includes("/monitoring/key-penghancuran")) {
      return "1297";
    }
    if (pathname.includes("/monitoring/ba-approval")) {
      return "1299";
    }
    // ASSET
    if (pathname.includes("/asset-management/insurance/pendaftaran")) {
      return "1441";
    }
    if (pathname.includes("/asset-management/insurance/klaim")) {
      return "1442";
    }
    if (
      pathname.includes("/asset-management/insurance/insurance-approval")
    ) {
      return "1443";
    }
    if (
      pathname.includes(
        "/asset-management/insurance/register-insurance-approval"
      )
    ) {
      return "1444";
    }
    if (pathname.includes("/asset-management/inventory")) {
      return "143";
    }
    if (pathname.includes("/asset-management/warehouse-management")) {
      return "142";
    }
    if (pathname.includes("/asset-management")) {
      return "141";
    }

    // ADD ONS

    if (pathname.includes("/add-ons/configuration")) {
      return "155";
    }
    if (pathname.includes("/add-ons/event-schedule-news")) {
      return "154";
    }
    if (pathname.includes("/add-ons/todo-list")) {
      return "153";
    }
    if (pathname.includes("/add-ons/forum-discussion")) {
      return "152";
    }
    if (pathname.includes("/add-ons/chat-forum")) {
      return "151";
    }
    if (pathname.includes("/add-ons")) {
      return "151";
    }

    // FILE MANAGEMENT
    if (pathname.includes("/file-management/doc-control")) {
      return "161";
    }
    if (pathname.includes("/file-management/doc-legalitas")) {
      return "162";
    }
    if (pathname.includes("/file-management/doc-project")) {
      return "163";
    }
    if (pathname.includes("/file-management/doc-bast")) {
      return "164";
    }
    if (pathname.includes("/file-management/knowledge-base")) {
      return "165";
    }
    if (pathname.includes("/file-management/doc-invoice")) {
      return "166";
    }
    if (pathname.includes("/file-management/pembuatan-no-surat")) {
      return "167";
    }
    if (pathname.includes("/file-management/file-approval")) {
      return "168";
    }
    if (pathname.includes("/file-management/configuration")) {
      return "169";
    }
    if (pathname.includes("/file-management")) {
      return "161";
    }
    // PROJECT MANAGEMENT
    if (pathname.includes("/project-management/overview")) {
      return "171";
    }
    if (pathname.includes("/project-management/timeline")) {
      return "172";
    }
  }

  // eslint-disable-next-line consistent-return
  async function activeSubButtonHighlight() {
    // sub menu dashboard
    if (pathname.includes("/dashboard-overview")) {
      const result = ["subDashboard"];
      return result;
    }
    if (pathname.includes("/dashboard-population")) {
      const result = ["subDashboard"];
      return result;
    }
    if (pathname.includes("/dashboard-transaction")) {
      const result = ["subDashboard"];
      return result;
    }
    // subPlan
    if (pathname.includes("/plan-analytic")) {
      const result = ["subPlan"];
      return result;
    }
    if (pathname.includes("/rbb-data")) {
      const result = ["subPlan"];
      return result;
    }
    if (pathname.includes("/modeling-model")) {
      const result = ["subPlan"];
      return result;
    }
    if (pathname.includes("/trend-analisa")) {
      const result = ["subPlan"];
      return result;
    }
    if (pathname.includes("/submission-tracking")) {
      const result = isPlanningUser ? ["subPlan"] : ["subSite"];
      return result;
    }
    // subSiteManagement
    if (pathname.includes("/negotiation")) {
      const result = ["subSite"];
      return result;
    }
    if (pathname.includes("/approval")) {
      const result = pathname.includes("vendor") ? ["subVendor"] : ["subSite"];
      return result;
    }
    if (pathname.includes("/site-management")) {
      const result = ["subSite"];
      return result;
    }
    if (pathname.includes("/rbb-implementation")) {
      const result = ["subSite"];
      return result;
    }
    if (pathname.includes("/acquisition")) {
      const result = ["subSite"];
      return result;
    }
    if (pathname.includes("/procurement")) {
      const result = ["subSite"];
      return result;
    }

    // financial
    if (pathname.includes("/financial")) {
      const result = ["subFinance"];
      return result;
    }

    // user management
    if (pathname.includes("/user-management/user-role")) {
      const result = ["subUser"];
      return result;
    }
    if (pathname.includes("/user-management")) {
      const result = ["subUser"];
      return result;
    }
    if (pathname.includes("/vendors")) {
      const result = ["subUser"];
      return result;
    }
    if (pathname.includes("/menu-management")) {
      const result = ["subUser"];
      return result;
    }

    // master data
    if (pathname.includes("/master-data")) {
      const result = ["subMaster"];
      return result;
    }

    // implementation
    if (pathname.includes("/implementation/overview")) {
      const result = ["subImplementation"];
      return result;
    }
    if (pathname.includes("/implementation")) {
      const result = ["subImplementation"];
      return result;
    }

    // vendor
    if (pathname.includes("/vendor-management")) {
      const result = ["subVendor"];
      return result;
    }

    // vendor orders
    if (pathname.includes("/vendor-orders")) {
      const result = ["subVendorOrder"];
      return result;
    }
    // vendor monitoring
    if (pathname.includes("/vendor-monitoring/report-uptime")) {
      const result = ["subVendorMonitoring"];
      return result;
    }
    // vendor digitalisasi
    if (pathname.includes("/vendor-digitalisasi")) {
      const result = ["subVendorDigitalisasi"];
      return result;
    }

    // environment premises
    if (pathname.includes("/environment-premises")) {
      const result = ["subEnvironmentPremises"];
      return result;
    }
    // media promosi
    if (pathname.includes("/media-promosi/media-promosi-quality")) {
      const result = ["subMediaPromosi"];
      return result;
    }
    // media promosi
    if (pathname.includes("/media-promosi")) {
      const result = ["subMediaPromosi"];
      return result;
    }
    // monitoring
    if (pathname.includes("/monitoring")) {
      const result = ["subMonitoring"];
      return result;
    }
    // asset
    if (pathname.includes("/asset-management")) {
      const result = ["subAsset"];
      return result;
    }
    // add-ons
    if (pathname.includes("/add-ons")) {
      const result = ["subAddOns"];
      return result;
    }
    // file-management
    if (pathname.includes("/file-management")) {
      const result = ["subFileManagement"];
      return result;
    }
    // project-management
    if (pathname.includes("/project-management")) {
      const result = ["subProjectManagement"];
      return result;
    }
    const result = [""];
    return result;
  }

  useEffect(() => {
    activeButtonHighlight().then((value) => {
      // console.log(`set active keys ${value}`);
      setActiveButton(value);
    });

    // set default open Sub Menu
    activeSubButtonHighlight().then((value) => {
      setActiveSubButton(value);
    });
    console.log(userMenus, "cek");
  }, [location]);

  const onOpenChange = (openKeys) => {
    // console.log("+++ openKeys", openKeys);
    const latestOpenKey = openKeys.find(
      (key) => activeSubButton.indexOf(key) === -1
    );
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setActiveSubButton(openKeys);
    } else {
      setActiveSubButton(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const userMenuNames = userMenus.map(({ menuName }) => menuName);

  const filteredMenus = dataSideMenu.filter(({ title }) =>
    userMenuNames.includes(title)
  );

  // console.log(userMenuNames);
  // useEffect(() => {
  //   console.log("+++ userMenus", userMenus);
  // }, [userMenus]);

  return (
    <div style={{ marginTop: 5 }}>
      <Menu
        defaultSelectedKeys={[activeButton]}
        selectedKeys={[activeButton]}
        openKeys={activeSubButton}
        onOpenChange={onOpenChange}
        style={{
          backgroundColor: Constant.color.white,
          width: "100%",
          paddingBottom: 20,
        }}
        mode="inline"
      >
        {/* CHECK USER MENUS to SHOW */}
        {userMenus.length < 1
          ? [1, 2, 3, 4].map(() => (
              <Skeleton
                style={{ background: "#f9fcff", marginBottom: 10 }}
                variant="rectangular"
                width="100%"
                height={30}
              />
            )) // <==== show loader
          : (userMenus.length > 0 ? filteredMenus : dataSideMenu).map(
              (item) => {
                return (
                  <SubMenu
                    key={item.rootKeys}
                    className={
                      activeSubButton[0] === item.rootKeys
                        ? classes.subMenuActive
                        : null
                    }
                    title={
                      props.collapsed ? (
                        activeSubButton[0] === item.rootKeys ? (
                          item.iconRed
                        ) : (
                          item.iconGray
                        )
                      ) : (
                        <span className={classes.subMenuWrapper}>
                          {activeSubButton[0] === item.rootKeys
                            ? item.iconRed
                            : item.iconGray}
                          <span
                            className={
                              activeSubButton[0] === item.rootKeys
                                ? classes.subTitle
                                : classes.subtitleGray
                            }
                          >
                            {item.title}
                          </span>
                        </span>
                      )
                    }
                  >
                    {item.sub.map((subItem) => {
                      if (subItem.itemGroup) {
                        return (
                          <div className={classes.groupItem}>
                            <Menu.ItemGroup
                              key={subItem.key}
                              title={subItem.title}
                            >
                              {subItem.groupItems.map((groupItem) => {
                                return (
                                  <Menu.Item
                                    key={groupItem.key}
                                    style={{ paddingLeft: 64 }}
                                  >
                                    {subMenuGeneral(
                                      classes,
                                      activeButton,
                                      groupItem.key,
                                      groupItem.title,
                                      groupItem.url
                                    )}
                                  </Menu.Item>
                                );
                              })}
                            </Menu.ItemGroup>
                          </div>
                        );
                      }
                      return (
                        <Menu.Item key={subItem.key}>
                          {subMenuGeneral(
                            classes,
                            activeButton,
                            subItem.key,
                            subItem.title,
                            subItem.url
                          )}
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              }
            )}
      </Menu>
    </div>
  );
};

// sub menu general
function subMenuGeneral(classes, activeKey, buttonKey, title, pathname) {
  let titleStyle = classes.titleGray;
  if (activeKey === buttonKey) {
    titleStyle = classes.title;
  }
  return (
    <Link style={{ cursor: "pointer", fontSize: 14 }} to={pathname}>
      <span className={titleStyle}>{title}</span>
    </Link>
  );
}

// sub menu Group Item
function subMenuGroupItem(classes, activeKey, buttonKey, title, pathname) {
  let titleStyle = classes.titleGroupray;
  if (activeKey === buttonKey) {
    titleStyle = classes.titleGroup;
  }
  return (
    <Link style={{ cursor: "pointer", fontSize: 14 }} to={pathname}>
      <span className={titleStyle}>{title}</span>
    </Link>
  );
}

export default SideBarMenu;
