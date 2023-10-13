import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Grid, Typography, Tabs, Tab, Button, Chip } from "@material-ui/core";
import constansts from "../../../helpers/constants";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { ReactComponent as UploadCloud } from "../../../assets/icons/siab/upload-cloud.svg";
import AddIcon from "@material-ui/icons/Add";
import { PrimaryHard } from "../../../assets/theme/colors";
import { ChkyTablePagination } from "../../../components";
import TableTicket from "./TableTemplate/Ticket";
import TableEscalation from "./TableTemplate/Escalation";
import TableShifting from "./TableTemplate/Shifting";
import FilterData from "./common/FilterData";
import { Ticket, Escalation, Shifting } from "./common/dummyData";
import PropTypes from "prop-types";
import { ReactComponent as ExclamationCircle } from "../../../assets/icons/duotone-red/exclamation-circle.svg";
import TableChips from "../../../components/Chips/TableChips";
import MenuPopUp from "../../VendorManagement/PartAndServicePricelist/common/MenuPopUp";
import PopUpAddShift from "./common/PopUpAddShift";
import PopUpConfirmation from "../../../components/PopUpConfirmation";
import PopupSucces from "../../../components/PopupSucces";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  titleContainer: {
    paddingBottom: 15,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: constansts.color.dark,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  indicator: {
    backgroundColor: PrimaryHard,
    height: 4,
  },
  tabStyle: {
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "capitalize",
  },
  Approver: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    marginRight: 2,
    marginLeft: 2,
    padding: 0,
  },
});

const itemSearchTicket = [
  { text: "Ticket ID", value: "id" },
  { text: "ATM ID", value: "atmId" },
  { text: "Lokasi", value: "location" },
  { text: "Detail", value: "detailLocation" },
  { text: "Problem", value: "detailProblem" },
  { text: "Tanggal", value: "dateNumber" },
  { text: "Bulan", value: "monthNumber" },
  { text: "Start", value: "startDate" },
  { text: "Selesai", value: "endDate" },
  { text: "Durasi", value: "durationTime" },
  { text: "Type Mesin", value: "machineType" },
];

const itemSearchEscalation = [
  { text: "ID Request", value: "id" },
  { text: "User Request", value: "userRequest" },
  { text: "Tanggal Request", value: "tglRequest" },
  { text: "Nama Vendor", value: "namaVendor" },
  { text: "ATM Id", value: "atmId" },
  { text: "Lokasi", value: "lokasi" },
  { text: "Detail", value: "detail" },
];

const itemSearchShifting = [
  { text: "Shifting ID", value: "id" },
  { text: "User ID", value: "userId" },
  { text: "Nama PIC", value: "PicName" },
  { text: "Jadwal", value: "jadwal" },
  { text: "Start Shift", value: "startShift" },
  { text: "Shift", value: "shift" },
  { text: "Status", value: "status" },
];

// init rowsPerPage
const rowsPerPage = 10;

function index() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [dataTicket, setDataTicket] = useState([]);
  const [dataEscalation, setDataEscalation] = useState([]);
  const [dataShifting, setDataShifting] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [sortBy, setSortBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [openPopUpShift, setOpenPopUpShift] = useState(false);
  const [sureDelete, setSureDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openModalSuccessDelete, setOpenModalSuccessDelete] = useState(false);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  //CHIP HANDLER

  function chipsHandler(type) {
    const condition = {
      done: "success",
      assigned: "info",
      onprogress: "warning",
      open: "purple",
      unprocessed: "error",
      overdue: "default",
    };
    return condition[type] ?? "default";
  }

  //FUNCTION CIRCLE

  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  //HANDLE SORT OPEN
  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        TableTicket.columnNameVar[TableTicket.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setOrderDirection(sortType);
      setSortBy(property);
      // setOrderBy(sortByNewVal);
      setDataRequest({
        ...dataRequest,
        sortType,
        sortBy: sortByNewVal,
      });
    };
  }

  //HANDLE CHANGE PAGE
  function handleChangePage(newPage) {
    console.log(newPage);
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  // HANDLE EDIT ESCALATION
  const handleEditEscalation = (id) => {};

  const handleDeleteEscalation = (id) => {
    console.log(id);
  };

  // HANDLE EDIT SHIFTING
  const handleEditShifting = (id) => {
    setIsEdit(true);
    setOpenPopUpShift(true);
  };
  const handleOpenSureDeleteShift = (id) => {
    setSureDelete(true);
  };
  const handleCloseSureDeleteShift = () => {
    setSureDelete(false);
  };

  // HANDLE OPEN POPUP
  const handleShowShift = () => {
    setOpenPopUpShift(true);
    setIsEdit(false);
  };

  const handleCloseShift = () => {
    setOpenPopUpShift(false);
  };

  // HANDLE CONFIRM
  const handleConfirmDelete = () => {
    setSureDelete(true);
  };

  const handleSubmitEdit = () => {};
  const handleSubmitDelete = () => {
    setOpenModalSuccessDelete(true);
  };
  // end handle submit

  const handleCloseSuccessDelete = () => {
    setOpenModalSuccessDelete(false);
  };

  // FUNCTION CHIP & STATUS ----------------------------->>>>>>>>>>>>>

  /* Status Approval */
  const StatusApproval = ({ status }) => {
    switch (status) {
      case 1:
        return <TableChips label="Approved" type={chipsHandler("done")} />;
        break;
      case 2:
        return (
          <TableChips label="Need Approved" type={chipsHandler("onprogress")} />
        );
        break;
      case 3:
        return (
          <TableChips label="Rejected" type={chipsHandler("unprocessed")} />
        );
        break;
      default:
        return (
          <TableChips label="Need Approved" type={chipsHandler("onprogress")} />
        );
    }
  };
  StatusApproval.propTypes = {
    status: PropTypes.number.isRequired,
  };

  /* Status */
  const Status = ({ status }) => {
    switch (status) {
      case 1:
        return <TableChips label="Open" type={chipsHandler("onprogress")} />;
        break;
      case 2:
        return (
          <TableChips label="On Progress" type={chipsHandler("overdue")} />
        );
        break;
      case 3:
        return <TableChips label="Done" type={chipsHandler("done")} />;
        break;
      case 4:
        return <TableChips label="Reject" type={chipsHandler("unprocessed")} />;
        break;
      default:
        return <TableChips label="Open" type={chipsHandler("onprogress")} />;
    }
  };
  Status.propTypes = {
    status: PropTypes.number.isRequired,
  };

  /* Data Alert */
  const DateAlert = ({ text }) => {
    return (
      <Grid container alignItems="center">
        <Typography
          style={{ color: PrimaryHard, fontSize: "13px", marginRight: "5px" }}
        >
          {text}
        </Typography>
        <ExclamationCircle width="18" />
      </Grid>
    );
  };
  DateAlert.propTypes = {
    text: PropTypes.string.isRequired,
  };

  /* Approver */
  const Approver = ({ approved }) => {
    return (
      <div className={classes.col}>
        {approved.map((item) => (
          <div
            className={`${classes.Approver} ${classes.col}`}
            style={{
              backgroundColor:
                item === 1 ? "#88ADFF" : item === 2 ? "#FFB443" : "#65D170",
              justifyContent: "center",
            }}
          >
            <Typography style={{ fontSize: 16, color: "#fff" }}>
              {item === 1 ? "RA" : item === 2 ? "TS" : "BA"}
            </Typography>
          </div>
        ))}
      </div>
    );
  };
  Approver.PropTypes = {
    approved: PropTypes.array.isRequired,
  };

  // FUNCTION CHIP & STATUS ----------------------------->>>>>>>>>>>>>

  useEffect(() => {
    if (selectedTab === 0) {
      const dataRow = [];
      Ticket.map((item) => {
        const newRow = {
          TicketID: item.TicketID,
          ATMID: item.ATMID,
          Lokasi: item.Lokasi,
          Detail: item.Detail,
          Problem: item.Problem,
          Tgl: item.Tgl,
          Bulan: item.Bulan,
          Start: item.Start,
          Selesai: item.Selesai,
          Durasi: item.Durasi,
          TypeMesin: item.TypeMesin,
          PIC: item.PIC,
          Status: <Status status={item.Status} />,
          SLA: <DateAlert text={item.SLA} />,
          Approver: <Approver approved={item.Approver} />,
          StatusApproval: <StatusApproval status={item.StatusApproval} />,
          TglApproval: item.TglApproval,
          Remark: item.Remark,
          action: (
            <Button
              style={{ color: PrimaryHard, textTransform: "capitalize" }}
              onClick={() => {
                history.push(
                  `/monitoring/ticket-distribution/${item.TicketID}`
                );
              }}
            >
              Detail
            </Button>
          ),
        };
        dataRow.push(newRow);
      });
      setDataTicket(dataRow);
    }

    if (selectedTab === 1) {
      const dataRow = [];
      Escalation.map((item) => {
        const newRow = {
          IDRequest: item.IDRequest,
          UserRequest: item.UserRequest,
          TanggalRequest: item.TanggalRequest,
          NamaVendor: item.NamaVendor,
          ATMID: item.ATMID,
          Lokasi: item.Lokasi,
          Detail: item.Detail,
          Remark: item.Remark,
          MasterKey: item.MasterKey,
          Approver: <Approver approved={item.Approver} />,
          StatusApproval: <StatusApproval status={item.StatusApproval} />,
          TglApproval: item.TglApproval,
          Status: <Status status={item.Status} />,
          Action: (
            <MenuPopUp
              itemId={item.IDRequest}
              editHandler={() => handleEditEscalation(item.IDRequest)}
              deleteHandler={() => handleDeleteEscalation(item.IDRequest)}
            />
          ),
        };
        dataRow.push(newRow);
      });
      setDataEscalation(dataRow);
    }

    if (selectedTab === 2) {
      const dataRow = [];
      Shifting.map((item) => {
        const newRow = {
          ShiftingID: item.ShiftingID,
          UserID: item.UserID,
          NamaPIC: item.NamaPIC,
          Jadwal: item.Jadwal,
          StartShift: item.StartShift,
          EndShift: item.EndShift,
          Shift: item.Shift,
          Status:
            item.Status === 1 ? (
              <TableChips label="Active" type={chipsHandler("done")} />
            ) : item.Status === 2 ? (
              <TableChips label="Inactive" type={chipsHandler("unprocessed")} />
            ) : null,
          Action: (
            <MenuPopUp
              itemId={item.IDRequest}
              editHandler={() => handleEditShifting(item.IDRequest)}
              deleteHandler={() => handleOpenSureDeleteShift(item.IDRequest)}
            />
          ),
        };
        dataRow.push(newRow);
      });
      setDataShifting(dataRow);
    }
  }, [selectedTab]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>
            {selectedTab === 0
              ? "Ticket Distribution (Scoring)"
              : selectedTab === 1
              ? "Escalation"
              : selectedTab === 2
              ? "Shifting"
              : null}
          </Typography>
        </Grid>

        <Grid item>
          {selectedTab === 1 ? (
            <MuiIconLabelButton
              style={{ width: "max-content", right: 0, height: 40 }}
              label="Request Master Key"
              iconPosition="startIcon"
              //   onClick={showPopUp2}
              buttonIcon={<AddIcon />}
            />
          ) : selectedTab === 2 ? (
            <div className={classes.col}>
              <MuiIconLabelButton
                style={{
                  width: "max-content",
                  right: 0,
                  height: 40,
                  marginRight: 5,
                }}
                label="Upload Shift"
                iconPosition="startIcon"
                // onClick={showPopUp2}
                buttonIcon={<UploadCloud />}
              />
              <MuiIconLabelButton
                style={{ width: "max-content", right: 0, height: 40 }}
                label="Add New shift"
                iconPosition="startIcon"
                onClick={handleShowShift}
                buttonIcon={<AddIcon />}
              />
            </div>
          ) : null}
        </Grid>
      </Grid>

      <Grid container direction="column">
        <Grid item xs={12}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            classes={{
              indicator: classes.indicator,
            }}
            style={{ marginTop: 12 }}
          >
            <Tab label="Ticket Distribution" className={classes.tabStyle} />
            <Tab label="Escalation" className={classes.tabStyle} />
            <Tab label="Shifting" className={classes.tabStyle} />
          </Tabs>
        </Grid>

        <Grid item xs={12} style={{ marginTop: 25 }}>
          <FilterData
            isOpening={false}
            itemSearch={
              selectedTab === 0
                ? itemSearchTicket
                : selectedTab === 1
                ? itemSearchEscalation
                : selectedTab === 2
                ? itemSearchShifting
                : null
            }
          />
        </Grid>
        {selectedTab === 0 && (
          <Grid item xs={12} style={{ marginTop: 25 }}>
            <ChkyTablePagination
              data={dataTicket}
              fields={TableTicket.titleTable}
              cellOption={TableTicket.valueType}
              isSort={TableTicket.isSort}
              handleSort={handleSort}
              sortBy={sortBy}
              isLoadData={isLoading}
              isUsingMuiSort
              order={orderDirection}
              changePage={handleChangePage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
            />
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid item xs={12} style={{ marginTop: 25 }}>
            <ChkyTablePagination
              data={dataEscalation}
              fields={TableEscalation.titleTable}
              cellOption={TableEscalation.valueType}
              isSort={TableEscalation.isSort}
              handleSort={handleSort}
              sortBy={sortBy}
              isLoadData={isLoading}
              isUsingMuiSort
              order={orderDirection}
              changePage={handleChangePage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
            />
          </Grid>
        )}
        {selectedTab === 2 && (
          <Grid item xs={12} style={{ marginTop: 25 }}>
            <ChkyTablePagination
              data={dataShifting}
              fields={TableShifting.titleTable}
              cellOption={TableShifting.valueType}
              isSort={TableShifting.isSort}
              handleSort={handleSort}
              sortBy={sortBy}
              isLoadData={isLoading}
              isUsingMuiSort
              order={orderDirection}
              changePage={handleChangePage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
            />
          </Grid>
        )}
      </Grid>
      <PopUpAddShift
        isOpen={openPopUpShift}
        onClose={handleCloseShift}
        isEdit={isEdit}
        setOpenPopUpShift={setOpenPopUpShift}
      />
      <PopUpConfirmation
        isOpen={sureDelete}
        message="Anda yakin ingin menghapus shift ini?"
        desc="Anda tidak dapat membatalkan tindakan ini"
        onSubmit={handleSubmitDelete}
        onClose={handleCloseSureDeleteShift}
      />
      <PopupSucces
        isOpen={openModalSuccessDelete}
        onClose={handleCloseSuccessDelete}
        onLeave={() => {
          handleCloseSuccessDelete();
        }}
        message="Berhasil Menghapus Shift"
      />
    </div>
  );
}

export default index;
