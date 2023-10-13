/* eslint-disable react/jsx-no-bind */
/* Third Party Import */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";

/* Internal Import */
import { ChkyTablePagination } from "../../../components";
import {
  Dark,
  PrimaryHard,
  PrimaryUltrasoft,
} from "../../../assets/theme/colors";
import { ReactComponent as ExclamationCircle } from "../../../assets/icons/duotone-red/exclamation-circle.svg";
import FilterComponent from "../../MediaPromosi/Overview/DetailObjectPajak/FilterData";
// import FilterComponent from "../../MediaPromosi/MediaPromosiQuality/common/FilterComponent";
import SuccessPopUp from "../../../components/Alert/Success";
import RemarkPopUp from "./common/RemarkPopUp";
import TableTemplate from "./common/TableTemplate";
import { doGetOverviewAnomaly } from "../serviceMonitoring";
import useTimestampConverter from "../../../helpers/useTimestampConverter";
import { doAcceptAnomalyAlert } from "../serviceMonitoring";
import ModalLoader from "../../../components/ModalLoader";
import { doSendRejectAnomaly } from "../serviceMonitoring";
import MenuPopUp from "../../../components/MenuPopup";
import { ReactComponent as CheckIcon } from "../../../assets/icons/general/check-green.svg";
import { ReactComponent as XIcon } from "../../../assets/icons/linear-red/x.svg";
import { ReactComponent as RemarkIcon } from "../../../assets/icons/general/edit-2.svg";
import { Barlow13 } from "../../../components/Typography/BarlowWithSize";
import AddNewOrder from "./common/AddOrder";
import { ContainedButton } from "../../../components/Button/NoiconButton";
import PopUpConfirmation from "../../../components/PopUpConfirmation";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
  textButtonAccept: {
    color: "#65D170",
    backgroundColor: "#DEFFE1",
    textTransform: "capitalize",
  },
  textButtonReject: {
    color: "#FFB443",
    backgroundColor: "#FFF9F0",
    textTransform: "capitalize",
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
  id: "All",
  atmId: "All",
  lokasi: "All",
  detailLokasi: "All",
  flm: "All",
  problem: "All",
  tgl: "All",
  bulan: "All",
  startDate: "All",
  endDate: "All",
  durasi: "All",
  anomali: "All",
  remark: "All",
};

const itemSearch = [
  { text: "No. Ticket", value: "id" },
  { text: "ATM ID", value: "atmId" },
  { text: "Lokasi", value: "lokasi" },
  { text: "Detail", value: "detailLokasi" },
  { text: "FLM", value: "flm" },
];

const listMenu = [
  {
    text: (
      <Barlow13 style={{ fontWeight: 500, color: "rgba(101, 209, 112, 1)" }}>
        Accept
      </Barlow13>
    ),
    icon: <CheckIcon />,
    action: () => {
      // editHandler("edit", true, itemId, vendorId);
    },
  },
  {
    text: (
      <Barlow13 style={{ fontWeight: 500, color: PrimaryHard }}>
        Reject
      </Barlow13>
    ),
    icon: <XIcon />,
    action: () => {
      // deleteHandler("delete", true, itemId);
    },
  },
  {
    text: <Barlow13 style={{ fontWeight: 500, color: Dark }}>Remark</Barlow13>,
    icon: <RemarkIcon />,
    action: () => {
      // deleteHandler("delete", true, itemId);
    },
  },
];

const AnomalyAlert = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [sortBy, setSortBy] = useState(null);
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [idRemark, setIdRemark] = useState(null);
  const [addNewOpen, setAddNewOpen] = useState(false);
  const [isReject, setReject] = useState(false);
  const [rejectData, setRejectData] = useState({
    id: "",
    status: "",
  });

  const [dialog, setDialog] = useState({
    success: false,
    remark: false,
  });

  // set handler loader when call Approval API Service
  function loadingHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  /* Methods */
  function handleFilterSubmit(value) {
    console.log(value);
    setIsFilterApplied(true);
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      // console.log("Sasa",value);
      setDataRequest({
        ...defaultDataHit,
        ...value,
      });
    }
  }

  function handleSortTable(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVar[TableTemplate.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setOrderDirection(sortType);
      setSortBy(property);
      setDataRequest({
        ...dataRequest,
        sortType,
        sortBy: sortByNewVal,
      });
    };
  }

  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  function handleResetFilter() {
    setIsFilterApplied(false);
    setDataRequest({
      ...defaultDataHit,
    });
  }

  function handleOpenRemark(id, key) {
    setIdRemark(id);
    setDialog((prevValue) => ({
      ...prevValue,
      [key]: true,
    }));
  }

  function handleCloseDialog(key) {
    setDialog((prevValue) => ({
      ...prevValue,
      [key]: false,
    }));
  }

  function handleOpenDialog(key) {
    setDialog((prevValue) => ({
      ...prevValue,
      [key]: true,
    }));
  }

  function handleApply(id, status) {
    setAddNewOpen(true);

    // setIsLoadingSend(true);
    // const payload = {
    //   id: id,
    //   status: status,
    // };
    // doAcceptAnomalyAlert(loadingHandler, payload)
    //   .then((response) => {
    //     if (response) {
    //       if (response.responseCode === "200") {
    //         setIsLoadingSend(false);
    //         handleOpenDialog("success");
    //         setTimeout(() => {
    //           handleCloseDialog("success");
    //           setIsLoadingSend(false);
    //           location.reload();
    //         }, 2000);
    //       } else {
    //         alert(`Email Tidak Terkirim`);
    //       }
    //     }
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(`Error Fetching Data ${err}`);
    //   });
  }

  // function reject

  function handleReject(id, status) {
    setIsLoadingSend(true);
    const payload = {
      id: id,
      status: status,
    };
    doAcceptAnomalyAlert(loadingHandler, payload)
      .then((response) => {
        if (response) {
          if (response.responseCode === "200") {
            setIsLoadingSend(false);
            handleOpenDialog("rejected");
            setTimeout(() => {
              handleCloseDialog("success");
              setIsLoadingSend(false);
              location.reload();
            }, 2000);
          } else {
            alert(`Email Tidak Terkirim`);
          }
        }
        console.log(response);
      })
      .catch((err) => {
        console.log(`Error Fetching Data ${err}`);
      });
  }

  /* Functional Component */
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

  useEffect(() => {
    doGetOverviewAnomaly(loadingHandler, dataRequest).then((response) => {
      console.log(response);
      if (response) {
        if (response.responseCode === "200") {
          const { content } = response;
          setTotalPages(response.totalPages);
          setTotalRows(response.totalElements);
          const dataToSet = [];
          content.map((item) => {
            const newRow = {
              id: item.id,
              atmId: item.atmId,
              lokasi: item.lokasi ? item.lokasi : "-",
              detailLokasi: item.detailLokasi,
              flm: item.flm,
              problem: item.problem,
              tgl: item.tgl,
              bulan: item.bulan,
              startDate: item.startDate ? (
                <DateAlert
                  text={useTimestampConverter(
                    item.startDate / 1000,
                    "DD/MM/YYYY, hh:mm:ss"
                  )}
                />
              ) : (
                "-"
              ),
              endDate: item.endDate ? (
                <DateAlert
                  text={useTimestampConverter(
                    item.endDate / 1000,
                    "DD/MM/YYYY, hh:mm:ss"
                  )}
                />
              ) : (
                "-"
              ),
              durasi: item.durasi,
              // action:
              //   item.remark === null ? (
              //     <Button
              //       className={classes.textButton}
              //       onClick={() => {
              //         handleOpenRemark(item.id, "remark");
              //       }}
              //     >
              //       Remark
              //     </Button>
              //   ) : (
              //     <Button
              //       className={classes.textButtonAccept}
              //       onClick={() => {
              //         handleOpenRemark(item.id, "remark");
              //       }}
              //     >
              //       {item.remark}
              //     </Button>
              //   ),
              // action1:
              //   item.status === "1" ? (
              //     <Button disabled className={classes.textButtonAccept}>
              //       Accepted
              //     </Button>
              //   ) : (
              //     <Button
              //       className={classes.textButton}
              //       onClick={() => {
              //         handleApply(item.id, 1);
              //       }}
              //     >
              //       Accept
              //     </Button>
              //   ),
              // action2:
              //   item.status === "2" ? (
              //     <Button disabled className={classes.textButtonReject}>
              //       Rejected
              //     </Button>
              //   ) : (
              //     <Button
              //       className={classes.textButton}
              //       onClick={() => {
              //         handleReject(item.id, 2);
              //       }}
              //     >
              //       Reject
              //     </Button>
              //   ),
              action1: (
                <MenuPopUp
                  list={[
                    {
                      text: (
                        <Barlow13
                          style={{
                            fontWeight: 500,
                            color: "rgba(101, 209, 112, 1)",
                          }}
                        >
                          {item.status === "1" ? "Accepted" : "Accept"}
                        </Barlow13>
                      ),
                      icon: <CheckIcon />,
                      action: () => {
                        handleApply(item.id, 1);
                      },
                      disabled: item.status === "1" ? true : false,
                    },
                    {
                      text: (
                        <Barlow13
                          style={{ fontWeight: 500, color: PrimaryHard }}
                        >
                          {item.status === "2" ? "Rejected" : "Reject"}
                        </Barlow13>
                      ),
                      icon: <XIcon />,
                      action: () => {
                        // handleReject(item.id, 2);
                        setReject(true);
                        setRejectData({ id: item.id, status: 2 });
                      },
                      disabled: item.status === "2" ? true : false,
                    },
                    {
                      text: (
                        <Barlow13 style={{ fontWeight: 500, color: Dark }}>
                          {item.remark ? item.remark : "Remark"}
                        </Barlow13>
                      ),
                      icon: <RemarkIcon />,
                      action: () => {
                        handleOpenRemark(item.id, "remark");
                      },
                      disabled: false,
                    },
                  ]}
                />
              ),
            };
            dataToSet.push(newRow);
          });
          setData(dataToSet);
        }
      }
    });
  }, [dataRequest]);

  return (
    <div className={classes.root}>
      <AddNewOrder isOpen={addNewOpen} onClose={() => setAddNewOpen(false)} />
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography className={classes.title}>Anomaly Alert</Typography>
        </Grid>
        <Grid item>
          <ContainedButton onClick={() => console.log("exported")}>
            Export
          </ContainedButton>
        </Grid>
      </Grid>
      <FilterComponent
        onFilterSubmit={handleFilterSubmit}
        itemSearch={itemSearch}
        handleReset={handleResetFilter}
        redSearch={true}
      />
      <ModalLoader isOpen={isLoadingSend} />
      <ChkyTablePagination
        data={data}
        rowsPerPage={rowsPerPage}
        isLoadData={isLoading}
        fields={TableTemplate.titleTable}
        cellOption={TableTemplate.valueType}
        isSort={TableTemplate.isSort}
        totalPages={totalPages}
        totalRows={totalRows}
        sortBy={sortBy}
        order={orderDirection}
        changePage={handleChangePage}
        handleSort={handleSortTable}
        isUsingMuiSort
      />
      <SuccessPopUp
        isOpen={dialog.success}
        onClose={() => {
          handleCloseDialog("success");
        }}
        title="Accepted"
      />
      <SuccessPopUp
        isOpen={dialog.rejected}
        onClose={() => {
          handleCloseDialog("rejected");
        }}
        title="Rejected"
      />
      <RemarkPopUp
        isOpen={dialog.remark}
        onClose={() => {
          handleCloseDialog("remark");
        }}
        idData={idRemark}
      />
      <PopUpConfirmation
        message="Anda yakin ingin melakukan Reject ?"
        desc="Anda tidak dapat membatalkan tindakan ini"
        isOpen={isReject}
        onClose={() => setReject(false)}
        onLeave={() => setReject(false)}
        onSubmit={() => handleReject(rejectData.id, rejectData.status)}
      />
    </div>
  );
};

export default AnomalyAlert;
