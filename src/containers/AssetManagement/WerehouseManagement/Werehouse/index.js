/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
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
import MenuIcon from "@material-ui/icons/MoreHoriz";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Menu, Space, Dropdown } from "antd";
import moment from "moment";
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
import constansts from "../../../../helpers/constants";
import secureStorage from "../../../../helpers/secureStorage";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import ModalUploadDvr from "./common/ModalUpload/ModalUploadDVR";
import ModalUploadUps from "./common/ModalUpload/ModalUploadUps";
import ModalUploadMesin from "./common/ModalUpload/ModalUploadMesin";
import ModalDelete from "./common/ModalDelete/ModalDelete";
import ModalDeleteError from "./common/ModalDelete/ModalDeleteError";
import ModalDeleteSuccess from "./common/ModalDelete/ModalDeleteSuccess";

import { ReactComponent as Checked } from "./common/Assets/Checked.svg";
import { ReactComponent as NotChecked } from "./common/Assets/NotChecked.svg";
import { ReactComponent as Edit } from "./common/Assets/IconEdit.svg";
import { ReactComponent as Detail } from "./common/Assets/IconDetail.svg";
import { ReactComponent as Deletes } from "./common/Assets/IconDelete.svg";
import { ReactComponent as UploadCloud } from "../../../../assets/icons/siab/upload-cloud.svg";

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
    display: "flex",
    justifyContent: "space-between",
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
  { text: "No Aset Gudang", value: "noAsset" },
  { text: "Jenis Mesin", value: "machineType" },
  { text: "Tgl Tarik", value: "dateStaging" },
  { text: "Location", value: "location" },
  { text: "SN UPS", value: "snUps" },
  { text: "SN DVR", value: "snDvr" },
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

const WerehouseManagement = () => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentId, setCurrentId] = useState("");

  const accessToken = secureStorage.getItem("access_token");

  // Modal

  const [modalUploadMesin, setIsModalUploadMesin] = useState(false);
  const [modalUploadUps, setIsModalUploadUps] = useState(false);
  const [modalUploadDvr, setIsModalUploadDvr] = useState(false);

  const showModalPopUpMesin = () => {
    setIsModalUploadMesin(true);
  };

  const hideModalPopUpMesin = () => {
    setIsModalUploadMesin(false);
  };

  const showModalPopUpUps = () => {
    setIsModalUploadUps(true);
  };

  const hideModalPopUpUps = () => {
    setIsModalUploadUps(false);
  };

  const showModalPopUpDvr = () => {
    setIsModalUploadDvr(true);
  };

  const hideModalPopUpDvr = () => {
    setIsModalUploadDvr(false);
  };

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

  // Summary Card

  const [dataCard, setDataCard] = useState({});

  // Tabs Value
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
  const [dataFilter, setDataFilter] = useState(null);

  // Handle Delete

  const [modalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isModalDeleteErrorVisible, setIsModalDeleteErrorVisible] =
    useState(false);
  const [isModalDeleteSuccessVisible, setIsModalDeleteSuccessVisible] =
    useState(false);

  const hideModalDeleteSuccess = () => {
    setIsModalDeleteSuccessVisible(false);
  };
  const hideModalDeleteError = () => {
    setIsModalDeleteErrorVisible(false);
    setIsModalDelete(false);
  };

  const showModalDelete = () => {
    setIsModalDeleteVisible(true);
  };

  const hideModalDelete = () => {
    setIsModalDeleteVisible(false);
  };

  function submitDelete(valueTabs) {
    console.log("delete");
    axios({
      method: "post",
      url: `${constansts.ASSET_MANAGEMENT_SERVICE}/${
        valueTabs === 0
          ? "deleteMachine"
          : valueTabs === 1
          ? "deleteUps"
          : "deleteDvr"
      }`,
      data: {
        id: currentId,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setIsModalDeleteErrorVisible(false);

          // showModalDelete(false);
          setIsModalDeleteVisible(false);
          setIsModalDeleteSuccessVisible(true);
        } else {
          setIsModalDelete(false);
        }
      })
      .catch((err) => {
        console.log(err);
        // setOpenModalUploadError(true);
        setIsModalDeleteSuccessVisible(false);
        setIsModalDeleteErrorVisible(true);
        setMessageUpload("Please check your connection and try again");
      });
  }

  // handleDetail

  const navigateDetailMachine = (id) => {
    history.push(`/asset-management/warehouse-management/mesin-atm/${id}`);
    console.log(id, "id");
  };
  const navigateDetailUps = (id) => {
    history.push(`/asset-management/warehouse-management/ups/${id}`);
  };
  const navigateDetailDvr = (id) => {
    history.push(`/asset-management/werehouse/dvr/${id}`);
  };

  const getDataPass = (record) => {
    // setModalEditVisible(true);
    setCurrentId(record.id);

    console.log(record, "data pass");
  };

  const menuDropdownMachine = (value) => {
    return (
      <Menu>
        <Menu.Item key="0" onClick={() => navigateDetailMachine(value.id)}>
          <Detail
          // onClick={() => navigateDetailMachine(currentId)}
          // onClick={(e) => console.log(e)}
          />
        </Menu.Item>
        <Menu.Item key="1">
          <Edit />
        </Menu.Item>
        <Menu.Item key="2" onClick={() => showModalDelete()}>
          <Deletes />
        </Menu.Item>
      </Menu>
    );
  };
  const menuDropdownUps = (value) => {
    return (
      <Menu>
        <Menu.Item key="0" onClick={() => navigateDetailUps(value.id)}>
          <Detail />
        </Menu.Item>
        <Menu.Item key="1">
          <Edit />
        </Menu.Item>
        <Menu.Item key="2" onClick={() => showModalDelete()}>
          <Deletes />
        </Menu.Item>
      </Menu>
    );
  };

  const menuDropdownDvr = (value) => {
    return (
      <Menu>
        <Menu.Item key="0" onClick={() => navigateDetailDvr(value.id)}>
          <Detail />
        </Menu.Item>
        <Menu.Item key="1">
          <Edit />
        </Menu.Item>
        <Menu.Item key="2" onClick={() => showModalDelete()}>
          <Deletes />
        </Menu.Item>
      </Menu>
    );
  };

  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  // Fetch Mesin ATM

  async function getDataMesinATM() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constansts.ASSET_MANAGEMENT_SERVICE}/filterMachine`,
        { ...dataRequest, ...(dataFilter && dataFilter) },
        configNew
      );
      console.log("res mesin atm", result);
      setDataMesinATM(
        result.data.content.map((data) => ({
          id: data.id,
          activityNumber: data.id,
          warehouseNumber: data.noAsset,
          machineType: data.machineType,
          pullDate: moment(data.dateStaging).format("DD/MM/YYYY"),
          idMesin: data.idMachine,
          snMesin: data.snMachine,
          location: data.location,
          snUps: data.snUps,
          snDvr: data.snDvr,
          yearPurchase: data.yearPurchase,
          totalCassette: data.totalCassette,
          jumlahReject: data.totalReject,
          cardBin: data.cardBin,
          kunciTombak: data.kunciTombak,
          kunciFasciaAtas: data.topKeyFascia,
          kunciFasciaBawah: data.underKeyFascia,
          platAntiSkimmer: data.plateAntiScammer,
          pinCover: data.pinCover,
          ups: data.ups,
          dvr: data.dvr,
          cctv: data.cctv,
          booth: data.booth,
          fm: data.fm,
          pmDate: moment(data.datePm).format("DD/MM/YYYY"),
          pmStatus: data.status,
          kondisiCat: data.paintCondition,
          kondisiKunci: data.keyCondition,
          kondisiSticker: data.stickerCondition,
          stickerId: data.idSticker,
          userReq: data.userControl,
          userControl: data.userControl,
          stagingDate: moment(data.dateStaging).format("DD/MM/YYYY"),
          bastStaging: "BAST Digital",
          reservedFor: data.reservedFor,
          statusLokasiMesin: "Gudang",
          action: (
            <>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    overlay={() => menuDropdownMachine(data)}
                    trigger={["click"]}
                    placement="bottomLeft"
                  >
                    <MenuIcon
                      style={{ color: PrimaryHard }}
                      onClick={() => setCurrentId(data.id)}
                    />
                  </Dropdown>
                </Space>
              </Space>
            </>
          ),
        }))
      );

      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  const handleDownloadMesin = () => {
    // setIsModalLoaderOpen(true);
    // console.log('click');
    axios({
      url: `${constansts.ASSET_MANAGEMENT_SERVICE}/exportWarehouseMesin`,
      responseType: "blob", // important
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      // },
    })
      .then((res) => {
        console.log(res.data);
        // setIsModalLoaderOpen(false);
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        // console.log('~ url', url);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Werehouse Mesin.xlsx");
        document.body.appendChild(link);
        link.addEventListener(
          "click",
          function () {
            setTimeout(() => {
              URL.revokeObjectURL(url);
              link.removeEventListener("click", this);
            }, 150);
          },
          false
        );
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        // setIsModalLoaderOpen(false);
        console.log(err);
      });
  };

  // Fetch Data UPS

  async function getDataUPS() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constansts.ASSET_MANAGEMENT_SERVICE}/filterUps`,
        { ...dataRequest, ...(dataFilter && dataFilter) },
        configNew
      );
      console.log("res UPS", result);
      setDataUPS(
        result.data.content.map((data) => ({
          id: data.id,
          noActifitas: data.id,
          noAsset: data.noAsset,
          upsType: data.upsType,
          datePm: moment(data.datePm).format("DD/MM/YYYY"),
          location: data.location,
          snUps: data.snUps,
          ups: data.ups === "Ada" ? <Checked /> : <NotChecked />,

          userReq: data.userControl,
          userControl: data.userControl,
          dateStaging: moment(data.dateStaging).format("DD/MM/YYYY"),
          bastStaging: "BAST DIGITAL",
          reservedFor: data.reservedFor,
          status:
            data.status === 1 ? (
              <div
                style={{
                  border: "1px solid #7cd886",
                  padding: "0px 8px 0px 8px",
                  borderRadius: 10,
                  backgroundColor: "#e2f6e4",
                }}
              >
                <Typography style={{ fontSize: 14, color: "#7cd886" }}>
                  Ready
                </Typography>
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid #ff7676",
                  padding: "0px 8px 0px 8px",
                  borderRadius: 10,
                  backgroundColor: "#fff6f6",
                }}
              >
                <Typography style={{ fontSize: 14, color: "#ff7676" }}>
                  Not Ready
                </Typography>
              </div>
            ),
          action: (
            <>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    overlay={() => menuDropdownUps(data)}
                    trigger={["click"]}
                    placement="bottomLeft"
                  >
                    <MenuIcon
                      style={{ color: PrimaryHard }}
                      onClick={() => getDataPass(data)}
                    />
                  </Dropdown>
                </Space>
              </Space>
            </>
          ),
        }))
      );
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  const handleDownloadUps = () => {
    // setIsModalLoaderOpen(true);
    // console.log('click');
    axios({
      url: `${constansts.ASSET_MANAGEMENT_SERVICE}/exportWarehouseUps`,
      responseType: "blob", // important
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      // },
    })
      .then((res) => {
        console.log(res.data);
        // setIsModalLoaderOpen(false);
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        // console.log('~ url', url);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Werehouse UPS.xlsx");
        document.body.appendChild(link);
        link.addEventListener(
          "click",
          function () {
            setTimeout(() => {
              URL.revokeObjectURL(url);
              link.removeEventListener("click", this);
            }, 150);
          },
          false
        );
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        // setIsModalLoaderOpen(false);
        console.log(err);
      });
  };

  // Fetch Data DVR

  async function getDataDvr() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constansts.ASSET_MANAGEMENT_SERVICE}/filterDvr`,
        { ...dataRequest, ...(dataFilter && dataFilter) },
        configNew
      );
      console.log("res DVR", result);
      setDataDVR(
        result.data.content.map((data) => ({
          id: data.id,
          noActifitas: data.id,
          noAsset: data.noAsset,
          dvrType: data.dvrType,
          datePm: moment(data.datePm).format("DD/MM/YYYY"),
          location: data.location,
          snDvr: data.snDvr,
          dvr: data.dvr === "Ada" ? <Checked /> : <NotChecked />,

          userReq: data.userControl,
          userControl: data.userControl,
          dateStaging: moment(data.dateStaging).format("DD/MM/YYYY"),
          bastStaging: "BAST DIGITAL",
          reservedFor: data.reservedFor,
          status:
            data.status === 1 ? (
              <div
                style={{
                  border: "1px solid #7cd886",
                  padding: "0px 8px 0px 8px",
                  borderRadius: 10,
                  backgroundColor: "#e2f6e4",
                }}
              >
                <Typography style={{ fontSize: 14, color: "#7cd886" }}>
                  Ready
                </Typography>
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid #ff7676",
                  padding: "0px 8px 0px 8px",
                  borderRadius: 10,
                  backgroundColor: "#fff6f6",
                }}
              >
                <Typography style={{ fontSize: 14, color: "#ff7676" }}>
                  Not Ready
                </Typography>
              </div>
            ),
          action: (
            <>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    overlay={() => menuDropdownDvr(data)}
                    trigger={["click"]}
                    placement="bottomLeft"
                  >
                    <MenuIcon
                      style={{ color: PrimaryHard }}
                      onClick={() => getDataPass(data)}
                    />
                  </Dropdown>
                </Space>
              </Space>
            </>
          ),
        }))
      );
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  const handleDownloadDvr = () => {
    // setIsModalLoaderOpen(true);
    // console.log('click');
    axios({
      url: `${constansts.ASSET_MANAGEMENT_SERVICE}/exportWarehouseUps`,
      responseType: "blob", // important
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      // },
    })
      .then((res) => {
        console.log(res.data);
        // setIsModalLoaderOpen(false);
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        // console.log('~ url', url);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Werehouse DVR.xlsx");
        document.body.appendChild(link);
        link.addEventListener(
          "click",
          function () {
            setTimeout(() => {
              URL.revokeObjectURL(url);
              link.removeEventListener("click", this);
            }, 150);
          },
          false
        );
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        // setIsModalLoaderOpen(false);
        console.log(err);
      });
  };

  // Fetch Data Card Summary

  async function getDataCard() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.get(
        `${constansts.ASSET_MANAGEMENT_SERVICE}/summaryWarehouse`,

        configNew
      );
      console.log("res Card", result);
      setDataCard(result.data);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getDataCard();
  }, []);

  useEffect(() => {
    getDataMesinATM();
    getDataUPS();
    getDataDvr();
  }, [dataRequest]);

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

  // Set Filter
  function onFilterSubmit(filter) {
    // console.log('~ filter', filter)
    const newFilter = { ...filter };
    delete newFilter.status;
    // console.log('~ newFilter', newFilter)
    setDataFilter(_.isEmpty(newFilter) ? null : newFilter);
    setDataRequest((old) => ({ ...old, pageNumber: 0 }));
    console.log(filter);
  }

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
        ...data,
        statusLokasiMesin:
          data.statusLokasiMesin.length > 20
            ? `${data.statusLokasiMesin.slice(0, 20)}...`
            : data.statusLokasiMesin,
        action: (
          <Button
            onClick={() =>
              history.push(
                `/asset-management/warehouse-management/mesin-atm/${data.id}`
              )
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
            ? `${data.statusLokasiMesin.slice(0, 20)}...`
            : data.statusLokasiMesin,
        action: (
          <Button
            onClick={() =>
              history.push(
                `/asset-management/warehouse-management/ups/${data.id}`
              )
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
            ? `${data.statusLokasiMesin.slice(0, 20)}...`
            : data.statusLokasiMesin,
        action: (
          <Button
            onClick={() =>
              history.push(
                `/asset-management/warehouse-management/dvr/${data.id}`
              )
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
      // setDataMesinATM(arrDataMesinATM);
      // setDataUPS(arrDataUPS);
      // setDataDVR(arrDataDVR);
      // console.log(arrDataMesinATM);
      // console.log(arrDataUPS);
      // console.log(arrDataDVR);
    }, 5000);
  }, []);

  return (
    <>
      <Box className={classes.root}>
        <Grid container className={classes.titleContainer}>
          <Grid item>
            <Typography className={classes.title}>
              Werehouse Management
            </Typography>
          </Grid>
          <Grid item justifyContent="space-between">
            <MuiIconLabelButton
              style={{
                width: "max-content",
                right: 0,
                height: 40,
                backgroundColor: "#65d170",
                marginRight: 10,
              }}
              label="Download Excel"
              iconPosition="startIcon"
              onClick={
                valueTab === 0
                  ? handleDownloadMesin
                  : valueTab === 1
                  ? handleDownloadUps
                  : handleDownloadDvr
              }
              buttonIcon={<UploadCloud />}
            />
            <MuiIconLabelButton
              style={{ width: "max-content", right: 0, height: 40 }}
              label="Upload Excel"
              iconPosition="startIcon"
              onClick={
                valueTab === 0
                  ? showModalPopUpMesin
                  : valueTab === 1
                  ? showModalPopUpUps
                  : showModalPopUpDvr
              }
              buttonIcon={<UploadCloud />}
            />
          </Grid>
        </Grid>

        <SummaryCard data={dataCard} />

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
            <ContentTab
              label="UPS"
              {...a11yProps(1)}
              style={{ minWidth: 100 }}
            />
            <ContentTab
              label="DVR"
              {...a11yProps(2)}
              style={{ minWidth: 100 }}
            />
          </ContentTabs>
        </Box>
        <Grid container direction="column" spacing={1}>
          <Grid item style={{ width: "-webkit-fill-available" }}>
            <Box>
              <Filter itemSearch={itemSearch} onFilterSubmit={onFilterSubmit} />
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
      <ModalUploadMesin
        isOpen={modalUploadMesin}
        onClose={() => setIsModalUploadMesin(false)}
        onSuccesUpload={() => setIsModalUploadMesin(false)}
      />
      <ModalUploadUps
        isOpen={modalUploadUps}
        onClose={() => setIsModalUploadUps(false)}
        onSuccesUpload={() => setIsModalUploadUps(false)}
      />
      <ModalUploadDvr
        isOpen={modalUploadDvr}
        onClose={() => setIsModalUploadDvr(false)}
        onSuccesUpload={() => setIsModalUploadDvr(false)}
      />
      <ModalDelete
        isOpen={modalDeleteVisible}
        onClose={hideModalDelete}
        onHapus={() => submitDelete(valueTab)}
        onLeave={() => {
          hideModalDelete();
        }}
      />
      <ModalDeleteSuccess
        isOpen={isModalDeleteSuccessVisible}
        onClose={() => window.location.reload()}
        onLeave={() => {
          window.location.reload();
        }}
      />
      <ModalDeleteError
        isOpen={isModalDeleteErrorVisible}
        onClose={hideModalDeleteError}
        onLeave={() => {
          handleCloseModalUploadSuccess();
        }}
      />
    </>
  );
};

export default WerehouseManagement;

const titleTableMesinATM = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "No Aktivitas",
  },
  {
    id: "noAsset",
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
    id: "datePm",
    numeric: false,
    disablePadding: false,
    label: "Tgl Tarik",
    typeColumn: "info",
  },
  {
    id: "idMachine",
    numeric: false,
    disablePadding: false,
    label: "ID Mesin",
    typeColumn: "info",
  },
  {
    id: "snMachine",
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
    id: "snDvr",
    numeric: false,
    disablePadding: false,
    label: "SN DVR",
    typeColumn: "info",
  },
  {
    id: "yearPurchase",
    numeric: false,
    disablePadding: false,
    label: "Tahun Pembelian",
    typeColumn: "info",
  },
  {
    id: "totalCassette",
    numeric: false,
    disablePadding: false,
    label: "Jumlah Kaset",
    typeColumn: "info",
  },
  {
    id: "totalReject",
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
    id: "topKeyFascia",
    numeric: false,
    disablePadding: false,
    label: "Kunci Fascia Atas",
    typeColumn: "checklist",
  },
  {
    id: "underKeyFascia",
    numeric: false,
    disablePadding: false,
    label: "Kunci Fascia Bawah",
    typeColumn: "checklist",
  },
  {
    id: "plateAntiScammer",
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
    id: "datePm",
    numeric: false,
    disablePadding: false,
    label: "Tgl PM",
    typeColumn: "info",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status PM",
    typeColumn: "info",
  },
  {
    id: "paintCondition",
    numeric: false,
    disablePadding: false,
    label: "Kondisi Cat",
    typeColumn: "info",
  },
  {
    id: "keyCondition",
    numeric: false,
    disablePadding: false,
    label: "Kondisi Kunci",
    typeColumn: "info",
  },
  {
    id: "stickerCondition",
    numeric: false,
    disablePadding: false,
    label: "Kondisi Sticker",
    typeColumn: "info",
  },
  {
    id: "idSticker",
    numeric: false,
    disablePadding: false,
    label: "Sticker ID",
    typeColumn: "info",
  },
  {
    id: "userControl",
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
    id: "dateStaging",
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
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "No Aktivitas",
  },
  {
    id: "noAsset",
    numeric: false,
    disablePadding: false,
    label: "No Aset Gudang",
  },
  { id: "upsType", numeric: false, disablePadding: false, label: "Jenis UPS" },
  { id: "datePm", numeric: false, disablePadding: false, label: "Tgl Tarik" },
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
    id: "dateStaging",
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
    id: "status",
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
  "",
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
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "No Aktivitas",
  },
  {
    id: "noAsset",
    numeric: false,
    disablePadding: false,
    label: "No Aset Gudang",
  },
  { id: "dvrType", numeric: false, disablePadding: false, label: "Jenis DVR" },
  { id: "datePm", numeric: false, disablePadding: false, label: "Tgl Tarik" },
  { id: "location", numeric: false, disablePadding: false, label: "Location" },
  { id: "snDvr", numeric: false, disablePadding: false, label: "SN DVR" },
  { id: "dvr", numeric: false, disablePadding: false, label: "DVR" },
  {
    id: "userControl",
    numeric: false,
    disablePadding: false,
    label: "User Req",
  },
  {
    id: "userControl",
    numeric: false,
    disablePadding: false,
    label: "User Control",
  },
  {
    id: "dateStaging",
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
    id: "status",
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
  "",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "",
];
