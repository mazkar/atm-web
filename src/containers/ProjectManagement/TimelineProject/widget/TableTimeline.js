/* eslint-disable radix */
/* eslint-disable no-useless-computed-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Menu,
  Space,
  Input,
  Tooltip,
  DatePicker,
  Select,
  Form,
} from "antd";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Tabs,
  Tab,
  Paper,
  IconButton,
  MenuItem,
  Grid,
  Box,
  Modal,
} from "@material-ui/core";
import moment from "moment";
import { DownOutlined, CalendarOutlined } from "@ant-design/icons";
import { Close, EventBusyIcon } from "@material-ui/icons";
import axios from "axios";
import MenuIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { blue, orange, red } from "@mui/material/colors";
import { PrimaryHard, GrayUltrasoft } from "../../../../assets/theme/colors";
import TablePagination from "../../../../components/chky/ChkyTablePagination";
import constants from "../../../../helpers/constants";
import MenuPopUp from "./MenuPopUp";
import EditForm from "./EditPricelistPopUp/index";
import CalendarTimeline from "./CalendarTimeline";
import LoadingView from "../../../../components/Loading/LoadingView";
import { data as appointments } from "./CalendarTimeline/data";
import ModalAddSuccess from "./Modal/ModalAddSuccess";
import ModalAddError from "./Modal/ModalAddError";
import ModalEditError from "./Modal/ModalEditError";
import ModalLoader from "../../../../components/ModalLoader";
import secureStorage from "../../../../helpers/secureStorage";
import ModalDeleteSuccess from "./Modal/ModalDeleteSuccess";
import Filter from "./FilterProgress/index";

/* Internal Import */

import { ReactComponent as Edit } from "../assets/IconEdit.svg";
import { ReactComponent as Delete } from "../assets/IconDelete.svg";
import ModalDelete from "./Modal/ModalDelete";
import ModalAEditSuccess from "./Modal/ModalEditSuccess";
import ModalDeleteError from "./Modal/ModalDeleteError";

const titleTableNew = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  {
    id: "resultId",
    numeric: false,
    disablePadding: false,
    label: "No ID",
    typeColumn: "info",
  },
  {
    id: "projectTitle",
    numeric: false,
    disablePadding: false,
    label: "Judul Project",
    typeColumn: "info",
  },
  {
    id: "startDate",
    numeric: false,
    disablePadding: false,
    label: "Tanggal Mulai",
    typeColumn: "info",
  },
  {
    id: "endDate",
    numeric: false,
    disablePadding: false,
    label: "Tanggal Selesai",
    typeColumn: "info",
  },
  {
    id: "projectPic",
    numeric: false,
    disablePadding: false,
    label: "PIC",
    typeColumn: "info",
  },

  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    typeColumn: "checklist",
  },

  { id: "action", numeric: false, disablePadding: false, label: "" },
];

const ddlMonth = [
  {
    value: 1,
    month: "Januari",
  },
  {
    value: 2,
    month: "Februari",
  },
  {
    value: 3,
    month: "Maret",
  },
  {
    value: 4,
    month: "April",
  },
  {
    value: 5,
    month: "Mei",
  },
  {
    value: 6,
    month: "Juni",
  },
  {
    value: 7,
    month: "Juli",
  },
  {
    value: 8,
    month: "Agustus",
  },
  {
    value: 9,
    month: "September",
  },
  {
    value: 10,
    month: "Oktober",
  },
  {
    value: 11,
    month: "November",
  },
  {
    value: 12,
    month: "Desember",
  },
];

const ddlYear = [
  {
    id: 1,
    year: "2020",
  },
  {
    id: 2,
    year: "2021",
  },
  {
    id: 3,
    year: "2022",
  },
  {
    id: 4,
    year: "2023",
  },
];

const ddlStatus = [
  {
    id: 1,
    status: "To Do",
  },
  {
    id: 3,
    status: "Doing",
  },
  {
    id: 2,
    status: "Done",
  },
];
// const ddlPic = [
//   {
//     id: 1,
//     status: "DW",
//   },
//   {
//     id: 2,
//     status: "HS",
//   },
//   {
//     id: 3,
//     status: "MR",
//   },
// ];

const resources = [
  {
    fieldName: "priorityId",
    title: "Priority",
    instances: [
      { text: "Card Baru", id: 1, color: blue },
      { text: "Developing ", id: 2, color: orange },
      { text: "Timeline 3", id: 3, color: red },
      { text: "Membuat Card Baru ", id: 4, color: "#30b16c" },
    ],
  },
];

const useStyles = makeStyles({
  iconButton: {
    "& .MuiSvgIcon-root": {
      fill: PrimaryHard,
    },
  },
  customMenu: {
    "& .MuiPopover-paper": {
      minWidth: "140px",
      borderRadius: "4px",
      boxShadow: "0px 6px 6px rgb(232 238 255 / 30%)",
      fontSize: "13px",
      fontWeight: "500px",
      "& .MuiSvgIcon-root": {
        fill: PrimaryHard,
      },
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 10,
    padding: "0px 40px 0px 40px",
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,

    borderRadius: 10,
    width: 100,
    height: 40,
  },
  paperModal: {
    // position: "absolute",
    backgroundColor: constants.color.white,
    width: 780,
    // height: 423,
    borderRadius: 10,
    padding: 30,
    paddingLeft: 70,
    paddingBottom: 50,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,

    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  paper: {
    // position: "absolute",
    backgroundColor: constants.color.white,
    width: 780,
    // height: 423,
    borderRadius: 10,
    // padding: 30,
    // paddingLeft: 70,
    // paddingBottom: 50,
    // paddingTop:30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
});

// tab kd transaksi
const titleTable = [
  "No ID",
  "Judul Project",
  "Tanggal Mulai",
  "Tanggal Selesai",
  "PIC",
  "Status",
  "",
];
const valueType = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "child",
];
const columnNameVar = [
  "resultId",
  "projectTitle",
  "startDate",
  "endDate",
  "projectPic",
  "status",
  "action",
];
const isSort = [true, true, true, true, true, true];

export default function TableTimeline() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [messageDelete, setMessageDelete] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialog, setDialog] = useState({
    edit: false,
    delete: false,
  });
  const [openModalEditError, setOpenModalEditError] = useState(false);

  const [data, setData] = useState([]);

  // Fetch Data
  const [valueFilter, setValueFilter] = useState(titleTableNew);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [defDate, setDefDate] = useState(moment().format());
  const [flag, setFlag] = useState(0);
  const [orderBy, setOrderBy] = useState("projectId");
  const [sortBy, setSortBy] = useState("noId");
  const [month, setMonth] = useState(moment().format("M"));
  // const [month, setMonth] = useState(moment().format("M"));
  const [year, setYear] = useState(moment().format("YYYY"));
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [dataFilter, setDataFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [dataCalendar, setDataCalendar] = useState([]);
  const [noId, setNoId] = useState("");
  const [resultId, setResultId] = useState("");
  const [Keterangan, setKeterangan] = useState("");
  const [startDatee, setStartDate] = useState("");
  const [statuss, setStatuss] = useState("");
  const [judul, setJudul] = useState("");
  const [pic, setPic] = useState("");

  const [endDatee, setEndDate] = useState("");

  const [OpenModalUploadSuccess, setOpenModalUploadSuccess] =
    React.useState(false);
  const [OpenModalUploadError, setOpenModalUploadError] = React.useState(false);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [messageUpload, setMessageUpload] = React.useState("");
  const handleCloseModalUploadError = () => setOpenModalUploadError(false);
  const handleCloseModalEditError = () => setOpenModalEditError(false);
  const handleCloseModalUploadSuccess = () => setOpenModalUploadSuccess(false);

  const [dataRequest, setDataRequest] = useState({
    pageNumber: 0,
    dataPerPage: 10,
    sortBy: orderBy,
    sortType: orderDirection,
    // eslint-disable-next-line object-shorthand
    month: month,
    // eslint-disable-next-line object-shorthand
    year: year,
    // // noId: "All",
    // // judul: "All",
    // // projectDesc: "All",
    // // pic: "All",
    // // startDate: "All",
    // // endDate: "All",
    // // status: "All",
  });

  const defaultDataHit = {
    pageNumber: 0,
    dataPerPage: 10,
    sortBy: orderBy,
    sortType: orderDirection,
    month,
    year,
  };

  const onChangeMonth = (valuePass) => {
    setMonth(valuePass);
    setDataRequest({
      ...dataRequest,
      month: valuePass,
    });
    setDefDate(moment(`${year}-${valuePass}-4`));
  };
  const onChangeyear = (valuePass) => {
    setDefDate(moment(`${valuePass}-${month}-4`));
    setDataRequest({
      ...dataRequest,
      year: valuePass,
    });
    setYear(valuePass);
  };

  const showModalEdit = (dp) => {
    setIsModalEditVisible(true);
  };

  const hideModalEdit = () => {
    setIsModalEditVisible(false);
  };

  const handleChangeNoID = (e) => {
    setNoId(e);
  };
  const handleChangeKet = (e) => {
    setKeterangan(e);
  };
  const handleChangeStartDate = (e) => {
    setStartDate(e);
  };
  const handleChangeStatus = (e) => {
    setStatuss(e);
  };
  const handleChangeJudul = (e) => {
    setJudul(e);
  };
  const handleChangePic = (e) => {
    setPic(e);
  };
  const handleChangeEndDate = (e) => {
    setEndDate(e);
  };

  const submitEdit = () => {
    console.log(noId);
  };

  const [dataResource, setDataResourceCalendar] = useState([
    {
      fieldName: "priorityId",
      title: "Priority",
      instances: [{ text: "Card Baru", id: 1, color: blue }],
    },
  ]);

  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const [currentId, setCurrentId] = useState("");
  const getDataPass = (record) => {
    // setModalEditVisible(true);
    setCurrentId(record);
    setNoId(record.resultId);
    setResultId(record.resultId);
    setKeterangan(record.projectDesc);
    setStartDate(record.startDate);
    setEndDate(record.endDate);
    setStatuss(record.status);
    setJudul(record.projectTitle);
    setPic(record.projectPicId);

    console.log(record, "data pass");
  };
  // Handle Delete
  const bodyRequsest = {
    projectId: noId,
  };

  const [showModalDelete, setIsModalDelete] = useState(false);

  const hideModalDelete = () => {
    setIsModalDelete(false);
  };

  function HandleDelete(record) {
    // setIsLoading(true);
    setIsModalDelete(true);
    // console.log('~ dataRequest', dataRequest);
    console.log(record, "id");
  }

  const menuDropdown = (
    <Menu>
      <Menu.Item key="1">
        <Edit onClick={() => showModalEdit()} />
      </Menu.Item>
      <Menu.Item key="2">
        <Delete onClick={() => HandleDelete()} />
      </Menu.Item>
    </Menu>
  );

  async function getDataOverviewTimeline() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constants.PROJECT_MANAGEMENT_SERVICE}/filterTimeline`,
        { ...dataRequest, ...(dataFilter && dataFilter) },
        configNew
      );
      console.log("res master Overview Timeline", result.data.content);
      setData(
        result.data.content.map((val) => ({
          noId: val?.resultId,
          judul: val?.projectTitle,
          startDate: moment(val?.startDate).format("YYYY-MM-DD"),
          endDate: moment(val?.endDate).format("YYYY-MM-DD"),
          pic: (
            <div
              style={{
                backgroundColor: "#88adff",
                height: 35,
                width: 35,
                borderRadius: "50%",
                paddingTop: 5,
                // padding: "4px 8px 4px 8px",
              }}
            >
              <Tooltip title={val.projectPic}>
                <Typography style={{ fontWeight: 400, color: "#fff" }}>
                  {val?.projectPic?.substring(0, 2).toUpperCase()}
                </Typography>
              </Tooltip>
            </div>
          ),
          status:
            val.status === 0 ? (
              <div
                style={{
                  backgroundColor: "#fbecd6",
                  border: "1px solid #ffc060",
                  padding: "3px 15px 3px",
                  borderRadius: 15,
                }}
              >
                <Typography
                  style={{ color: "#ffc060", fontSize: 12, fontWeight: "600" }}
                >
                  Open
                </Typography>
              </div>
            ) : val.status === "To Do" ? (
              <div
                style={{
                  backgroundColor: "#eedada",
                  border: "1px solid #ff6a6a",
                  padding: "3px 15px 3px",
                  borderRadius: 15,
                }}
              >
                <Typography
                  style={{ color: "#ff6a6a", fontSize: 12, fontWeight: "600" }}
                >
                  ToDos
                </Typography>
              </div>
            ) : val.status === "Done" ? (
              <div
                style={{
                  backgroundColor: "#deffe1",
                  border: "1px solid #6bd375",
                  padding: "3px 15px 3px",
                  borderRadius: 15,
                }}
              >
                <Typography
                  style={{ color: "#6bd375", fontSize: 12, fontWeight: "600" }}
                >
                  Done
                </Typography>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "#e3ecff",
                  border: "1px solid #7a9fff",
                  padding: "3px 15px 3px",
                  borderRadius: 15,
                }}
              >
                <Typography
                  style={{ color: "#7a9fff", fontSize: 12, fontWeight: "600" }}
                >
                  Doing
                </Typography>
              </div>
            ),
          action: (
            <>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    overlay={menuDropdown}
                    trigger={["click"]}
                    placement="bottomLeft"
                  >
                    <MenuIcon
                      style={{ color: PrimaryHard }}
                      onClick={() => getDataPass(val)}
                    />
                  </Dropdown>
                </Space>
              </Space>
              {/* <IconButton
                id="test123"
                className={classes.iconButton}
                onClick={(e) => handleOpenMenu(e)}
                aria-describedby={id}
                aria-haspopup="true"
                // onClick={showMenu}
              >
                <MenuIcon
                //   onClick={(e)=>handleOpenMenu(e,id)}
                />
              </IconButton>
              <Menu
                id={id}
                open={open}
                onClose={() => {
                  handleCloseMenu();
                }}
                anchorEl={anchorEl}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                className={classes.customMenu}
              >
                {list &&
                  list.map((item, index) => {
                    return (
                      <MenuItem onClick={item.action} key={index}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography>{item.text}</Typography>
                          </Grid>
                          <Grid item>{item.icon}</Grid>
                        </Grid>
                      </MenuItem>
                    );
                  })}
              </Menu> */}
            </>
          ),
        }))
      );
      setTotalPages(result.data?.totalPages);
      setTotalRows(result.data?.totalElements);
      setDataCalendar(
        result.data.content.map((val) => ({
          title: val?.projectTitle,
          priorityId: val?.resultId,
          cek: "cek",
          startDate: moment(val?.startDate).set("hour", 9),

          endDate: moment(val?.endDate).set("hour", 17),

          id: val?.resultId,
        }))
      );
      setDataResourceCalendar([
        {
          fieldName: "priorityId",
          title: "Priority",
          instances: result?.data?.content?.map((val) => ({
            text: val?.projectTitle,
            id: val?.resultId,
            color:
              val?.status === 0
                ? orange
                : val?.status === "To Do"
                ? red
                : val?.status === "Doing"
                ? blue
                : "#6bd375",
          })),
        },
      ]);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  function handleSort(property) {
    return function actualFn() {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      setOrderDirection(isActiveAndAsc ? "DESC" : "ASC");
      setSortBy(property);
      setOrderBy(columnNameVar[titleTable.indexOf(property)]);
      setCurrentPage(0);
      console.log(orderBy);
      console.log(orderDirection, "od");
    };
  }

  function handleChangePageValue(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  const buttonConsole = () => {
    console.log(dataCalendar, "ini data");
  };

  // Set Filter
  function handleFilterSubmit(value) {
    console.log("~ filter", value);

    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      setDataRequest({
        ...dataRequest,
        // // pageNumber: 0,
        // // dataPerPage: rowsPerPage,
        ...value,
      });
    }
  }

  useEffect(() => {
    setDataRequest((old) => ({
      ...old,
      sortType: orderDirection,
      sortBy: orderBy,
      pageNumber: 0,
      dataPerPage: 10,
    }));
  }, [orderDirection]);

  const accessToken = secureStorage.getItem("access_token");
  const body = {
    projectId: "",
    resultId: parseInt(noId),
    projectTitle: judul,
    projectDesc: Keterangan,
    projectPic: parseInt(pic),
    startDate: moment(startDatee).format("YYYY-MM-DD"),
    endDate: moment(endDatee).format("YYYY-MM-DD"),
    status: parseInt(statuss),
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    setModalLoader(true);
    // const formData = new FormData();
    // formData.append("file", fileFile);

    console.log(body, "body");

    axios({
      method: "post",
      url: `${constants.PROJECT_MANAGEMENT_SERVICE}/updateTimeline`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res, "res");

        if (res.status === 200) {
          setOpenModalUploadSuccess(true);
          setOpenModalEditError(false);
          setModalLoader(false);
          setIsModalEditVisible(false);
          getDataOverviewTimeline();
        } else {
          setOpenModalEditError(true);
          setOpenModalUploadSuccess(false);
          setMessageUpload(res.data.message);
          setModalLoader(false);
        }

        //  console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setOpenModalEditError(true);
        setOpenModalUploadSuccess(false);
        setMessageUpload("Please check your connection and try again");
        setModalLoader(false);
      });
  };

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

  async function submitDelete(record) {
    // console.log('~ dataRequest', dataRequest);
    console.log(noId, "payload delete");

    axios({
      method: "post",
      url: `${constants.PROJECT_MANAGEMENT_SERVICE}/removeTimeline`,
      data: {
        resultId,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            setIsModalDelete(true);
            setOpenModalUploadError(false);
            setModalLoader(false);
            // showModalDelete(false);
            setIsModalDelete(false);
            setIsModalDeleteSuccessVisible(true);
            getDataOverviewTimeline();
          } else {
            showModalDelete(false);
            setIsModalDelete(false);
          }
        }
        //  console.log(res.data);
      )
      .catch((err) => {
        console.log(err);
        // setOpenModalUploadError(true);
        setOpenModalUploadSuccess(false);
        setIsModalDeleteErrorVisible(true);
        setMessageUpload("Please check your connection and try again");
        setModalLoader(false);
      });
  }

  const [ddlPic, setDdlPic] = useState([]);

  async function getDdlPic() {
    // console.log('~ dataRequest', dataRequest);
    console.log(noId, "payload delete");

    axios({
      method: "get",
      url: `${constants.userServiceBaseUrl}/users`,

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(
        (res) => {
          console.log(res, "user");
          if (res.status === 200) {
            setDdlPic(res.data.data.users);
          } else {
            console.log(res);
            // showModalDelete(false);
            // setIsModalDelete(false);
          }
        }
        //  console.log(res.data);
      )
      .catch((err) => {
        console.log(err);
        // setOpenModalUploadError(true);
      });
  }

  useEffect(() => {
    getDataOverviewTimeline();
  }, [dataRequest, flag, dataFilter, year, month]);

  useEffect(() => {
    getDdlPic();
  }, []);

  return (
    <div>
      <Row gutter={24}>
        <Col span={24}>
          <Filter
            // valueTab={valueTab}
            onFilterSubmit={handleFilterSubmit}
            valueFilter={valueFilter}
          />
        </Col>
        {data.length === 0 ? (
          <Col gutter="row" xl={13}>
            {isLoading ? (
              <LoadingView />
            ) : (
              <TablePagination
                data={
                  [
                    // {
                    //   id: 1,
                    //   judulProject: null,
                    //   startDate: "1 Okt 2022",
                    //   endDate: "24 Okt 2022",
                    //   PIC: null,
                    //   Status: null,
                    // },
                  ]
                }
                fields={titleTable}
                cellOption={valueType}
                totalPages={totalPages}
                rowsPerPage={10}
                totalRows={totalRows}
                changePage={handleChangePageValue}
                isWithCheck={false}
                isSort={isSort}
                isUsingMuiSort
                sortBy={sortBy}
                order={orderDirection}
                handleSort={handleSort}
              />
            )}
          </Col>
        ) : (
          <Col gutter="row" xl={13}>
            {isLoading ? (
              <LoadingView />
            ) : (
              <TablePagination
                data={data}
                fields={titleTable}
                cellOption={valueType}
                totalPages={totalPages}
                rowsPerPage={10}
                totalRows={totalRows}
                changePage={handleChangePageValue}
                isWithCheck={false}
                isSort={isSort}
                isUsingMuiSort
                sortBy={sortBy}
                order={orderDirection}
                handleSort={handleSort}
              />
            )}
          </Col>
        )}
        {dataCalendar.length === 0 ? (
          <Col gutter="row" xl={11}>
            <Paper
              style={{
                padding: 4,
                height: 470,
                borderRadius: 10,
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              {isLoading ? (
                // <Row
                //   gutter={24}
                //   justify="center"
                //   style={{ backgroundColor: "red" }}
                // >
                //   <Col span={8} offset={12}>
                //     <LoadingView />
                //   </Col>
                // </Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 204,
                  }}
                >
                  <LoadingView />
                </div>
              ) : (
                // <CalendarTimeline
                //   dataCalendar={dataCalendar}
                //   dataResourceCalendar={[
                //     {
                //       fieldName: "priorityId",
                //       title: "Priority",
                //       instances: [{ text: "Add Timeline", id: 1, color: blue }],
                //     },
                //   ]}
                //   defaultDate={defDate}
                // />
                <>
                  <Row>
                    <Col className="gutter-row" xl={10}>
                      <Select
                        suffixIcon={
                          <DownOutlined
                            style={{
                              fontSize: 12,
                              color: constants.color.primaryHard,
                            }}
                          />
                        }
                        bordered={false}
                        defaultValue={moment(month, "M").format("MMMM")}
                        onChange={(e) => onChangeMonth(e)}
                        placeholder="Select an Month"
                      >
                        {ddlMonth.map((rbs) => (
                          <Select.Option value={rbs.value}>
                            {rbs.month}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                    <Col className="gutter-row" xl={8}>
                      <Select
                        bordered={false}
                        style={{ fontFamily: "barlow", fontWeight: "600" }}
                        suffixIcon={
                          <DownOutlined
                            style={{
                              fontSize: 12,
                              color: constants.color.primaryHard,
                            }}
                          />
                        }
                        defaultValue={moment(year).format("YYYY")}
                        onChange={(e) => onChangeyear(e)}
                        placeholder="Select an Year"
                      >
                        {ddlYear.map((rbs) => (
                          <Select.Option value={rbs.year}>
                            {rbs.year}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>

                    <Col span={10} offset={24}>
                      <CalendarOutlined
                        style={{ fontSize: 64, color: "#a2a5aa" }}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </Paper>
          </Col>
        ) : (
          <Col gutter="row" xl={11}>
            <Paper
              style={{
                padding: 4,
                height: 550,
                borderRadius: 10,
                paddingTop: 10,
              }}
            >
              <Row gutter={24} justify="start">
                <Col className="gutter-row" xl={5}>
                  <Select
                    suffixIcon={
                      <DownOutlined
                        style={{
                          fontSize: 12,
                          color: constants.color.primaryHard,
                        }}
                      />
                    }
                    bordered={false}
                    defaultValue={moment(month, "M").format("MMMM")}
                    onChange={(e) => onChangeMonth(e)}
                    placeholder="Select an Month"
                  >
                    {ddlMonth.map((rbs) => (
                      <Select.Option value={rbs.value}>
                        {rbs.month}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col className="gutter-row" xl={8}>
                  <Select
                    bordered={false}
                    style={{ fontFamily: "barlow", fontWeight: "600" }}
                    suffixIcon={
                      <DownOutlined
                        style={{
                          fontSize: 12,
                          color: constants.color.primaryHard,
                        }}
                      />
                    }
                    defaultValue={moment(year).format("YYYY")}
                    onChange={(e) => onChangeyear(e)}
                    placeholder="Select an Year"
                  >
                    {ddlYear.map((rbs) => (
                      <Select.Option value={rbs.year}>{rbs.year}</Select.Option>
                    ))}
                  </Select>
                </Col>
                {dataCalendar?.length === 0 && dataResource?.length === 0 ? (
                  <></>
                ) : (
                  <Col className="gutter-row" xl={24}>
                    {isLoading ? null : ( // </Row> //   </Col> //     <LoadingView /> //   <Col span={4} offset={10}> // <Row justify="center">
                      <CalendarTimeline
                        dataCalendar={dataCalendar}
                        dataResourceCalendar={dataResource}
                        defaultDate={defDate}
                      />
                    )}
                  </Col>
                )}
              </Row>
            </Paper>
          </Col>
        )}
      </Row>

      <Modal
        className={classes.modal}
        open={isModalEditVisible}
        onClose={hideModalEdit}
        refresh={getDataOverviewTimeline}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.paperModal}>
          <Grid container justify="flex-end">
            <Grid item>
              <IconButton onClick={hideModalEdit}>
                <Close className={classes.closeIcon} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid
            container
            justify="center"
            // alignItems="center"
            direction="column"
            spacing={5}
          >
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                style={{ marginBottom: 40, fontSize: 36, fontWeight: 500 }}
              >
                Edit timeline
              </Typography>
            </Grid>
            <Form
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
              layout="horizontal"
              initialValues={{
                ["id"]: noId,
                ["keterangan"]: Keterangan,
              }}
              fields={[
                {
                  name: ["id"],
                  value: noId,
                },
                {
                  name: ["keterangan"],
                  value: Keterangan,
                },
              ]}
              onFinish={submitEdit}
            >
              <Row gutter={24} style={{ marginTop: 20, display: "flex" }}>
                <Col gutter="row" xl={12}>
                  {/* <Form.Item name="id">
                    <div className={classes.inputContainer}>
                      <Typography className={classes.labelInput}>
                        No ID Project :
                      </Typography>

                      <Input
                        //   className={classes.inputStyle}
                        placeholder="Input No ID Project"
                        required
                        disabled
                        defaultValue={noId}
                        name="id"
                        style={{
                          width: "90%",
                          height: "40px",
                          borderRadius: 10,
                        }}
                        // value={hargaToken}
                        onChange={(e) => handleChangeNoID(e.target.value)}
                      />
                    </div>
                  </Form.Item> */}
                  <Form.Item name="keterangan">
                    <div className={classes.inputContainer}>
                      <Typography className={classes.labelInput}>
                        Keterangan :
                      </Typography>

                      <Input
                        //   className={classes.inputStyle}
                        defaultValue={Keterangan}
                        placeholder="Keterangan"
                        required
                        style={{
                          width: "90%",
                          height: "40px",
                          borderRadius: 10,
                        }}
                        // value={hargaToken}
                        onChange={(e) => handleChangeKet(e.target.value)}
                      />
                    </div>
                  </Form.Item>
                  <Form.Item name="start">
                    <div className={classes.inputContainer}>
                      <Typography className={classes.labelInput}>
                        Tanggal Mulai :
                      </Typography>

                      <Input.Group compact>
                        <DatePicker
                          //   className={classes.inputStyle}
                          defaultValue={moment(startDatee)}
                          placeholder="Tanggal Mulai"
                          defaultValue={moment(startDatee)}
                          popupStyle={{ zIndex: 9999 }}
                          required
                          style={{
                            width: "90%",
                            height: "40px",
                            borderRadius: 10,
                          }}
                          // value={hargaToken}
                          onChange={(e) => handleChangeStartDate(e)}
                        />
                      </Input.Group>
                    </div>
                  </Form.Item>
                  <Form.Item name="status">
                    <div className={classes.inputContainer}>
                      <Typography className={classes.labelInput}>
                        Status :
                      </Typography>
                      <Select
                        defaultValue={statuss}
                        placeholder="Pilih Status"
                        required
                        dropdownStyle={{ zIndex: 9999 }}
                        size="large"
                        style={{
                          width: "90%",

                          //   height: "70px",
                          borderRadius: 10,
                        }}
                        onChange={(e) => handleChangeStatus(e)}
                      >
                        {ddlStatus.map((inv) => (
                          <Select.Option value={inv.id}>
                            {inv.status}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </Form.Item>
                </Col>
                <Col gutter="row" xl={12}>
                  <Form.Item name="judul">
                    <div className={classes.inputContainer}>
                      <Typography className={classes.labelInput}>
                        Judul Project :
                      </Typography>

                      <Input
                        //   className={classes.inputStyle}
                        placeholder="Judul Project"
                        defaultValue={judul}
                        required
                        style={{
                          width: "90%",
                          height: "40px",
                          borderRadius: 10,
                        }}
                        // value={hargaToken}
                        onChange={(e) => handleChangeJudul(e.target.value)}
                      />
                    </div>
                  </Form.Item>
                  <Form.Item name="judul">
                    <div className={classes.inputContainer}>
                      <Typography className={classes.labelInput}>
                        PIC :
                      </Typography>
                      <Select
                        placeholder="Pilih PIC"
                        size="large"
                        defaultValue={pic}
                        dropdownStyle={{ zIndex: 9999 }}
                        style={{
                          width: "90%",

                          //   height: "70px",
                          borderRadius: 10,
                        }}
                        onChange={(e) => handleChangePic(e)}
                      >
                        {ddlPic?.map((inv) => (
                          <Select.Option value={inv.id}>
                            {inv.fullName}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </Form.Item>
                  <Form.Item name="end">
                    <div className={classes.inputContainer}>
                      <Typography className={classes.labelInput}>
                        Tanggal Selesai :
                      </Typography>

                      <Input.Group compact>
                        <DatePicker
                          //   className={classes.inputStyle}
                          defaultValue={moment(endDatee)}
                          placeholder="Tanggal Selesai"
                          popupStyle={{ zIndex: 9999 }}
                          required
                          style={{
                            width: "90%",
                            height: "40px",
                            borderRadius: 10,
                          }}
                          // value={hargaToken}
                          onChange={(e) => handleChangeEndDate(e)}
                        />
                      </Input.Group>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>

            <Grid
              container
              justify="space-between"
              className={classes.buttonContainer}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  disableElevation
                  className={classes.secondaryButton}
                  onClick={hideModalEdit}
                  style={{ textTransform: "capitalize" }}
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.primaryButton}
                  onClick={handleSubmitEdit}
                  style={{ textTransform: "capitalize" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <ModalLoader isOpen={isOpenModalLoader} />
      <ModalAEditSuccess
        isOpen={OpenModalUploadSuccess}
        onClose={handleCloseModalUploadSuccess}
        onLeave={() => {
          handleCloseModalUploadSuccess();
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
      <ModalDelete
        isOpen={showModalDelete}
        onClose={hideModalDelete}
        onHapus={submitDelete}
        onLeave={() => {
          hideModalDelete();
        }}
      />

      <ModalAddError
        isOpen={OpenModalUploadError}
        onClose={handleCloseModalUploadError}
        onLeave={() => {
          handleCloseModalUploadError();
        }}
        message={messageUpload}
      />
      <ModalEditError
        isOpen={openModalEditError}
        onClose={handleCloseModalEditError}
        onLeave={() => {
          handleCloseModalEditError();
        }}
        message={messageUpload}
      />
    </div>
  );
}
