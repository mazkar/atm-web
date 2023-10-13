import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GrayMedium, PrimaryHard } from "../../../../assets/theme/colors";
import {
  dataSummary,
  dummyDataMesinATM,
  dummyDataUPS,
  dummyDataDVR,
} from "./dummyData";
import SummaryCard from "./common/SummaryCard";
import Filter from "./common/Filter";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import { TableCheckPagination } from "../../../../components";
import { useHistory } from "react-router-dom";
import constansts from "../../../../helpers/constants";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: constansts.color.dark,
  },
  titleContainer: {
    marginBottom: 25,
  },
  indicator: {
    backgroundColor: PrimaryHard,
    height: 4,
  },
  tabContent: {
    paddingTop: 10,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage

// INIT DATA REQUEST
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};

const itemSearch = [
  { text: "No Aktivitas", value: "id" },
  { text: "No Aset Gudang", value: "warehouseId" },
  { text: "Jenis DVR", value: "type" },
  { text: "Tgl Tarik", value: "tglTarik" },
  { text: "Location", value: "location" },
];

const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 3,
    "& > span": {
      width: "100%",
      backgroundColor: constansts.color.primaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: constansts.color.grayMedium,
    "&:hover": {
      color: constansts.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: constansts.color.dark,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    "aria-controls": `content-tabpanel-${index}`,
  };
}

const InventoryMesin = () => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState(0);

  // INIT STATE
  const [isLoading, setIsLoading] = useState(true); /* <------- loading Table */
  function loaderHandler(loaderValue) {
    setIsLoading(loaderValue);
  }
  const [isLoadingSummary, setIsLoadingSummary] =
    useState(true); /* <------- loading Summary */
  function loaderHandlerSummary(loaderValue) {
    setIsLoadingSummary(loaderValue);
  }

  //Tabs Value
  const [valueTab, setValueTab] = useState(0);

  // Table
  const [dataMesinATM, setDataMesinATM] = useState([]);
  const [dataUPS, setDataUPS] = useState([]);
  const [dataDVR, setDataDVR] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState(null);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  // RESET PAGE PAGINATION
  const [resetPageCounter, setResetPageCounter] = useState(0);

  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "mesin-atm";
    }
    if (newValueTab === 1) {
      hashTab = "ups";
    }
    if (newValueTab === 2) {
      hashTab = "dvr";
    }
    history.replace(`#${hashTab}`);
  };

  // HANDLER
  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  const handleSorting = (type, column) => {
    setDataRequest({
      ...dataRequest,
      sortType: type,
      sortBy: column,
    });
  };

  useEffect(() => {
    const windowsHash = window.location.hash;
    if (windowsHash) {
      switch (windowsHash) {
        case "#mesin-atm":
          setValueTab(0);
          break;
        case "#ups":
          setValueTab(1);
          break;
        case "#dvr":
          setValueTab(2);
          break;
        default:
          setValueTab(0);
      }
    } else {
      setValueTab(0);
    }
  }, []);

  useEffect(() => {
    // Data Mesin ATM
    const arrDataMesinATM = [];
    dummyDataMesinATM.map((data) => {
      arrDataMesinATM.push({
        // id: data.id,
        // activityNumber: data.activityNumber,
        // warehouseNumber: data.warehouseNumber,
        // machineType: data.machineType,
        // pullDate: data.pullDate,
        // idMesin: data.idMesin,
        // snMesin: data.snMesin,
        // location: data.location,
        // snUps: data.snUps,
        // jumlahKaset: data.jumlahKaset,
        // jumlahReject: data.jumlahReject,
        // cardBin: data.cardBin,
        // kunciTombak: data.kunciTombak,
        // kunciFasciaAtas: data.kunciFasciaAtas,
        // kunciFasciaBawah: data.kunciFasciaBawah,
        // platAntiSkimmer: data.platAntiSkimmer,
        // pinCover: data.pinCover,
        // ups: data.ups,
        // dvr: data.dvr,
        // cctv: data.cctv,
        // booth: data.booth,
        // fm: data.fm,
        // pmDate: data.pmDate,
        // pmStatus: data.pmStatus,
        // kondisiCat: data.kondisiCat,
        // kodisiKunci: data.kodisiKunci,
        // kondisiSticker: data.kondisiSticker,
        // stickerId: data.stickerId,
        // userReq: data.userReq,
        // userControl: data.userControl,
        // tglStaging: data.tglStaging,
        // bastStaging: data.bastStaging,
        // reservedFor: data.reservedFor,
        // statusLokasiMesin: data.statusLokasiMesin,
        ...data,
        statusLokasiMesin:
          data.statusLokasiMesin.length > 20
            ? data.statusLokasiMesin.slice(0, 20) + "..."
            : data.statusLokasiMesin,
        action: (
          <Button
            onClick={() =>
              history.push(`/asset-management/inventory/mesin-atm/${data.id}`)
            }
            className={classes.textButton}
          >
            Detail
          </Button>
        ),
      });
    });

    // Data UPS
    const arrDataUPS = [];
    dummyDataUPS.map((data) => {
      arrDataUPS.push({
        ...data,
        statusLokasiMesin:
          data.statusLokasiMesin.length > 20
            ? data.statusLokasiMesin.slice(0, 20) + "..."
            : data.statusLokasiMesin,
        action: (
          <Button
            onClick={() =>
              history.push(`/asset-management/inventory/ups/${data.id}`)
            }
            className={classes.textButton}
          >
            Detail
          </Button>
        ),
      });
    });

    // Data DVR
    const arrDataDVR = [];
    dummyDataDVR.map((data) => {
      arrDataDVR.push({
        ...data,
        statusLokasiMesin:
          data.statusLokasiMesin.length > 20
            ? data.statusLokasiMesin.slice(0, 20) + "..."
            : data.statusLokasiMesin,
        action: (
          <Button
            onClick={() =>
              history.push(`/asset-management/inventory/dvr/${data.id}`)
            }
            className={classes.textButton}
          >
            Detail
          </Button>
        ),
      });
    });
    setTimeout(() => {
      loaderHandler(false);
      setDataMesinATM(arrDataMesinATM);
      setDataUPS(arrDataUPS);
      setDataDVR(arrDataDVR);
      // console.log(arrDataMesinATM);
      // console.log(arrDataUPS);
      // console.log(arrDataDVR);
    }, 5000);
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container className={classes.titleContainer}>
        <Grid item>
          <Typography className={classes.title}>Inventory Asset</Typography>
        </Grid>
      </Grid>
      <Grid container>
        {dataSummary.map((data, idx) => (
          <Grid key={idx} item>
            <SummaryCard data={data} />
          </Grid>
        ))}
      </Grid>
      <Box style={{ marginTop: 50 }}>
        {/* TABS */}
        <ContentTabs
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="content tabs"
        >
          <ContentTab
            label="Mesin ATM"
            {...a11yProps(0)}
            style={{ minWidth: 100 }}
          />
          <ContentTab label="UPS" {...a11yProps(1)} style={{ minWidth: 100 }} />
          <ContentTab label="DVR" {...a11yProps(2)} style={{ minWidth: 100 }} />
        </ContentTabs>
      </Box>
      <Grid container direction="column" spacing={1}>
        <Grid item style={{ width: "-webkit-fill-available" }}>
          <Box>
            <Filter itemSearch={itemSearch} />
          </Box>
          <TabPanel value={valueTab} index={0} className={classes.tabContent}>
            <TableCheckPagination
              data={dataMesinATM}
              fields={titleTableMesinATM}
              cellOption={valueTypeTableMesinATM}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              changePage={handleChangePage}
              resetPageCounter={resetPageCounter}
              isWithCheck={false}
              isLoadData={isLoading}
              sorting={handleSorting}
              isSort
              alignTitleData={alignTitleData}
            />
          </TabPanel>
          <TabPanel value={valueTab} index={1} className={classes.tabContent}>
            <TableCheckPagination
              data={dataUPS}
              fields={titleTableUPS}
              cellOption={valueTypeTableUPS}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              changePage={handleChangePage}
              resetPageCounter={resetPageCounter}
              isWithCheck={false}
              isLoadData={isLoading}
              sorting={handleSorting}
              isSort
              alignTitleData={alignTitleData}
            />
          </TabPanel>
          <TabPanel value={valueTab} index={2} className={classes.tabContent}>
            <TableCheckPagination
              data={dataDVR}
              fields={titleTableDVR}
              cellOption={valueTypeTableDVR}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              changePage={handleChangePage}
              resetPageCounter={resetPageCounter}
              isWithCheck={false}
              isLoadData={isLoading}
              sorting={handleSorting}
              isSort
              alignTitleData={alignTitleData}
            />
          </TabPanel>
        </Grid>
      </Grid>
      {/* <FloatingChat /> */}
    </Box>
  );
};

export default InventoryMesin;

const titleTableMesinATM = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  {
    id: "activityNumber",
    numeric: false,
    disablePadding: false,
    label: "No Aktivitas",
  },
  {
    id: "warehouseNumber",
    numeric: false,
    disablePadding: false,
    label: "No Aset Gudang",
    typeColumn: "info",
  },
  {
    id: "machineType",
    numeric: false,
    disablePadding: false,
    label: "Jenis Mesin",
    typeColumn: "info",
  },
  {
    id: "pullDate",
    numeric: false,
    disablePadding: false,
    label: "Tgl Tarik",
    typeColumn: "info",
  },
  {
    id: "idMesin",
    numeric: false,
    disablePadding: false,
    label: "ID Mesin",
    typeColumn: "info",
  },
  {
    id: "snMesin",
    numeric: false,
    disablePadding: false,
    label: "SN Mesin",
    typeColumn: "info",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location",
    typeColumn: "info",
  },
  {
    id: "snUps",
    numeric: false,
    disablePadding: false,
    label: "SN UPS",
    typeColumn: "info",
  },
  {
    id: "jumlahKaset",
    numeric: false,
    disablePadding: false,
    label: "Jumlah Kaset",
    typeColumn: "info",
  },
  {
    id: "jumlahReject",
    numeric: false,
    disablePadding: false,
    label: "Jumlah Reject",
    typeColumn: "info",
  },
  {
    id: "cardBin",
    numeric: false,
    disablePadding: false,
    label: "Card Bin",
    typeColumn: "checklist",
  },
  {
    id: "kunciTombak",
    numeric: false,
    disablePadding: false,
    label: "Kunci Tombak",
    typeColumn: "checklist",
  },
  {
    id: "kunciFasciaAtas",
    numeric: false,
    disablePadding: false,
    label: "Kunci Fascia Atas",
    typeColumn: "checklist",
  },
  {
    id: "kunciFasciaBawah",
    numeric: false,
    disablePadding: false,
    label: "Kunci Fascia Bawah",
    typeColumn: "checklist",
  },
  {
    id: "platAntiSkimmer",
    numeric: false,
    disablePadding: false,
    label: "Plat Anti Skimmer",
    typeColumn: "checklist",
  },
  {
    id: "pinCover",
    numeric: false,
    disablePadding: false,
    label: "Pin Cover",
    typeColumn: "checklist",
  },
  {
    id: "ups",
    numeric: false,
    disablePadding: false,
    label: "UPS",
    typeColumn: "checklist",
  },
  {
    id: "dvr",
    numeric: false,
    disablePadding: false,
    label: "DVR",
    typeColumn: "checklist",
  },
  {
    id: "cctv",
    numeric: false,
    disablePadding: false,
    label: "CCTV",
    typeColumn: "checklist",
  },
  {
    id: "booth",
    numeric: false,
    disablePadding: false,
    label: "Booth",
    typeColumn: "checklist",
  },
  {
    id: "fm",
    numeric: false,
    disablePadding: false,
    label: "FM",
    typeColumn: "checklist",
  },
  {
    id: "pmDate",
    numeric: false,
    disablePadding: false,
    label: "Tgl PM",
    typeColumn: "info",
  },
  {
    id: "pmStatus",
    numeric: false,
    disablePadding: false,
    label: "Status PM",
    typeColumn: "info",
  },
  {
    id: "kondisiCat",
    numeric: false,
    disablePadding: false,
    label: "Kondisi Cat",
    typeColumn: "info",
  },
  {
    id: "kondisiKunci",
    numeric: false,
    disablePadding: false,
    label: "Kondisi Kunci",
    typeColumn: "info",
  },
  {
    id: "kondisiSticker",
    numeric: false,
    disablePadding: false,
    label: "Kondisi Sticker",
    typeColumn: "info",
  },
  {
    id: "stickerId",
    numeric: false,
    disablePadding: false,
    label: "Sticker ID",
    typeColumn: "info",
  },
  {
    id: "userReq",
    numeric: false,
    disablePadding: false,
    label: "User Req",
    typeColumn: "info",
  },
  {
    id: "userControl",
    numeric: false,
    disablePadding: false,
    label: "User Control",
    typeColumn: "info",
  },
  {
    id: "stagingDate",
    numeric: false,
    disablePadding: false,
    label: "Tgl Staging",
    typeColumn: "info",
  },
  {
    id: "bastStaging",
    numeric: false,
    disablePadding: false,
    label: "BAST Staging",
    typeColumn: "info",
  },
  {
    id: "reservedFor",
    numeric: false,
    disablePadding: false,
    label: "Reserved For",
    typeColumn: "info",
  },
  {
    id: "statusLokasiMesin",
    numeric: false,
    disablePadding: false,
    label: "Status Lokasi Mesin",
    typeColumn: "info",
  },
  { id: "action", numeric: false, disablePadding: false, label: "" },
];

const valueTypeTableMesinATM = [
  "hide",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "cardStatus",
  "cardStatus",
  "cardStatus",
  "cardStatus",
  "cardStatus",
  "cardStatus",
  "cardStatus",
  "cardStatus",
  "cardStatus",
  "cardStatus",
  "cardStatus",
  "string",
  "statusImplementation",
  "statusImplementation",
  "statusImplementation",
  "statusImplementation",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "",
];

const alignTitleData = [
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
];

const titleTableUPS = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  {
    id: "activityNumber",
    numeric: false,
    disablePadding: false,
    label: "No Aktivitas",
  },
  {
    id: "warehouseNumber",
    numeric: false,
    disablePadding: false,
    label: "No Aset Gudang",
  },
  { id: "upsType", numeric: false, disablePadding: false, label: "Jenis UPS" },
  { id: "pullDate", numeric: false, disablePadding: false, label: "Tgl Tarik" },
  { id: "location", numeric: false, disablePadding: false, label: "Location" },
  { id: "snUps", numeric: false, disablePadding: false, label: "SN UPS" },
  { id: "ups", numeric: false, disablePadding: false, label: "UPS" },
  { id: "userReq", numeric: false, disablePadding: false, label: "User Req" },
  {
    id: "userControl",
    numeric: false,
    disablePadding: false,
    label: "User Control",
  },
  {
    id: "tglStaging",
    numeric: false,
    disablePadding: false,
    label: "Tgl Staging",
  },
  {
    id: "bastStaging",
    numeric: false,
    disablePadding: false,
    label: "BAST Staging",
  },
  {
    id: "reservedFor",
    numeric: false,
    disablePadding: false,
    label: "Reserved For",
  },
  {
    id: "statusLokasiMesin",
    numeric: false,
    disablePadding: false,
    label: "Status Lokasi Mesin",
  },
  { id: "action", numeric: false, disablePadding: false, label: "" },
];

const valueTypeTableUPS = [
  "hide",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "cardStatus",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "",
];

const titleTableDVR = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  {
    id: "activityNumber",
    numeric: false,
    disablePadding: false,
    label: "No Aktivitas",
  },
  {
    id: "warehouseNumber",
    numeric: false,
    disablePadding: false,
    label: "No Aset Gudang",
  },
  { id: "dvrType", numeric: false, disablePadding: false, label: "Jenis DVR" },
  { id: "pullDate", numeric: false, disablePadding: false, label: "Tgl Tarik" },
  { id: "location", numeric: false, disablePadding: false, label: "Location" },
  { id: "snDvr", numeric: false, disablePadding: false, label: "SN DVR" },
  { id: "dvr", numeric: false, disablePadding: false, label: "DVR" },
  { id: "userReq", numeric: false, disablePadding: false, label: "User Req" },
  {
    id: "userControl",
    numeric: false,
    disablePadding: false,
    label: "User Control",
  },
  {
    id: "tglStaging",
    numeric: false,
    disablePadding: false,
    label: "Tgl Staging",
  },
  {
    id: "bastStaging",
    numeric: false,
    disablePadding: false,
    label: "BAST Staging",
  },
  {
    id: "reservedFor",
    numeric: false,
    disablePadding: false,
    label: "Reserved For",
  },
  {
    id: "statusLokasiMesin",
    numeric: false,
    disablePadding: false,
    label: "Status Lokasi Mesin",
  },
  { id: "action", numeric: false, disablePadding: false, label: "" },
];

const valueTypeTableDVR = [
  "hide",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "cardStatus",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "",
];
