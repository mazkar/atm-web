import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Table, Typography, Button, Paper } from "@material-ui/core";
import { ChkyTablePagination } from "../../../../components";
import { PrimaryHard } from "../../../../assets/theme/colors";
// import FilterComponent from "../../../VendorManagement/Digitalisasi/Scheduling/common/FilterComponent";
import FilterComponent from "./FilterData";
import TableTemplateOpen from "./TableTemplate/Open";
import TableTemplateDone from "./TableTemplate/Done";
import TableChips from "../../../../components/Chips/TableChips";
import {
  doGetSummaryTaxTrackingOpen,
  doGetSummaryTaxTrackingDone,
  exportSummaryTaxTrackingDone,
  exportSummaryTaxTrackingOpen,
} from "../../services";
import { Dark } from "../../../../assets/theme/colors";
import {
  ContentTabs,
  ContentTab,
  TabPanel,
  a11yProps,
} from "../../../../components/MaterialTabs";
import { useHistory } from "react-router-dom";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";
import getMinioFile from "../../../../helpers/getMinioFile";

const UseStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  paramButton: {
    width: "max-content",
    color: PrimaryHard,
    backgroundColor: "white",
    height: 40,
    marginRight: 10,
    border: "1px solid",
    borderColor: PrimaryHard,
    borderRadius: 10,
    textTransform: "capitalize",
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
  secondContainer: {
    marginTop: 20,
  },
  filterContainer: { margin: "20px 20px", paddingTop: "20px" },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
// INIT DATA REQUEST
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: 10,
  provinceId: "All",
  cityId: "All",
  districtId: "All",
  sortType: "ASC",
};

//ITEM SEARCH OPEN
const itemSearch = [
  { text: "ATM ID", value: "atmId" },
  { text: "Lokasi", value: "locationName" },
  { text: "Alamat", value: "locationAddress" },
  { text: "Kondisi ATM", value: "conditionName" },
];

//ITEM SEARCH DONE
const itemSearchDone = [
  { text: "ATM ID", value: "atmId" },
  { text: "Lokasi", value: "locationName" },
  { text: "Alamat", value: "locationAddress" },
  { text: "Kondisi ATM", value: "conditionName" },
];

function DetailObjectPajak() {
  const history = useHistory();
  const classes = UseStyles();
  const windowsHash = window.location.hash;

  //INIT STATE
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  // minio
  const [minioFile, setMinioFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  //state data open
  const [dataOpen, setDataOpen] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  //state data done

  const [dataDone, setDataDone] = useState([]);
  const [totalPageDone, setTotalPageDone] = useState(0);
  const [totalRowsDone, setTotalRowsDone] = useState(0);
  const [resetPageCounterDone, setResetPageCounterDone] = useState(0);
  const [dataRequestDone, setDataRequestDone] = useState(defaultDataHit);
  const [sortByDone, setSortByDone] = useState(null);
  const [orderDirectionDone, setOrderDirectionDone] = useState("ASC");

  const [showUpload, setShowUpload] = useState(false);
  const [uploadPembayaran, setUploadPembayaran] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // set handler loader when call Approval API Service
  function loadingHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  //FUNCTION HANDLING

  //CHIP HANDLER

  function chipsHandler(type) {
    /*
     [props in table] : "color in chips component"
   */
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
  //END CHIP HANDLER

  //>>>>>>>>>>>>>>>>>>>>>>>>>function download file
  const document = async (documentFile, openFile) => {
    const filePath = documentFile;
    console.log("document", filePath);
    if (filePath) {
      try {
        //setIsLoading(true);
        getMinioFile(filePath).then((result) => {
          console.log(">>>> try getMinio Offering ", JSON.stringify(result));
          setMinioFile(result);
          setIsLoading(false);
          setFileUrl(result.fileUrl);
          openFile(result.fileUrl);
        });
      } catch (err) {
        setIsLoading(false);
      }
    } else {
      alert("Document does not exist");
    }
  };

  const openFile = (urlFile) => {
    // alert(`File opened:${urlFile}`)
    window.open(urlFile, "_blank");
  };
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>function download file

  // FUNCTION FILTER
  function handleFilterSubmit(value) {
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

  //RESET FILTER
  function handleResetFilter() {
    setDataRequest({
      ...defaultDataHit,
    });
  }
  //END RESET FILTER

  //handle filter submit done
  function handleFilterSubmitDone(value) {
    setResetPageCounterDone((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequestDone(defaultDataHit);
    } else {
      // console.log("Sasa",value);
      setDataRequestDone({
        ...defaultDataHit,
        ...value,
      });
    }
  }

  //RESET FILTER
  function handleResetFilterDone() {
    setDataRequestDone({
      ...defaultDataHit,
    });
  }
  //END RESET FILTER
  // END FUNCTION FILTER

  //HANDLE SORT OPEN
  function handleSortOpen(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        TableTemplateOpen.columnNameVar[
          TableTemplateOpen.titleTable.indexOf(property)
        ];
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
  //END HANDLE SORT OPEN

  //HANDLE SORT DONE
  function handleSortDone(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        TableTemplateDone.columnNameVar[
          TableTemplateDone.titleTable.indexOf(property)
        ];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setOrderDirectionDone(sortType);
      setSortByDone(property);
      // setOrderBy(sortByNewVal);
      setDataRequestDone({
        ...dataRequestDone,
        sortType,
        sortBy: sortByNewVal,
      });
    };
  }

  //END HANDLE SORT DONE

  //TABS
  const handleChangeTab = (event, newValueTab) => {
    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "jlhPajakOpen";
    }
    if (newValueTab === 1) {
      hashTab = "jlhPajakDone";
    }
    history.push(`#${hashTab}`);
  };
  //END TABS

  //FUNCTION HANDLE CHANGE PAGE
  function handleChangePage(newPage) {
    console.log(newPage);
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  //FUNCTION HANDLE CHANGE PAGE DONE
  function handleChangePageDone(newPage) {
    console.log(newPage);
    setDataRequestDone({
      ...dataRequestDone,
      pageNumber: newPage,
    });
  }

  //END FUNCTION HANDLE CHANGE PAGE

  //FORMAT RUPIAH

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  //END FORMAT RUPIAH

  //GET DATA API SUMMARY TAX OPEN

  useEffect(() => {
    doGetSummaryTaxTrackingOpen(loadingHandler, dataRequest)
      .then((response) => {
        console.log(response);
        if (response) {
          if (response.responseCode === "200") {
            const { content } = response;
            setTotalRows(response.totalElements);
            setTotalPage(response.totalPages);
            const dataToSet = [];
            console.log(content);

            content.map((item, index) => {
              const newRow = {
                id: item.atmId,
                location: item.locationName,
                address: item.locationAddress,
                condition: item.conditionName,
                pajakAwal: item.startDate
                  ? useTimestampConverter(item.startDate / 1000, "DD/MM/YYYY")
                  : "-",
                pajakAkhir: item.endDate
                  ? useTimestampConverter(item.endDate / 1000, "DD/MM/YYYY")
                  : "-",
                nilaiPajak: rupiah(item.tax),
                vendorPajak: item.vendorName,
                typeOrderan: item.orderType,
                signage: item.signageAvailable,
                mediaSignage: item.signageMedia,

                ukuranSignage: item.signageSize,
                sla:
                  item.status === 4 ? (
                    <Typography style={{ color: "#FF6A6A" }}>
                      {item.slaWork}
                    </Typography>
                  ) : (
                    <Typography style={{ color: "#65D170" }}>
                      {item.slaWork}
                    </Typography>
                  ),
                statusPajak:
                  item.status === 0 ? (
                    <TableChips
                      label="Tidak Bisa Diproses"
                      type={chipsHandler("unprocessed")}
                    />
                  ) : item.status === 1 ? (
                    <TableChips label="Done" type={chipsHandler("done")} />
                  ) : item.status === 2 ? (
                    <TableChips
                      label="Assign to vendor"
                      type={chipsHandler("assigned")}
                    />
                  ) : item.status === 3 ? (
                    <TableChips
                      label="On Progress"
                      type={chipsHandler("onprogress")}
                    />
                  ) : item.status === 4 ? (
                    <TableChips
                      label="Overdue"
                      type={chipsHandler("default")}
                    />
                  ) : item.status === 5 ? (
                    <TableChips label="Open" type={chipsHandler("open")} />
                  ) : null,
                surveyObjekPajak: item.taxObject,
                prosesDaftar: item.register,
                reviewSKPD: item.review,
                cetakSKPD: item.printSKPD,
                prosesBayar: item.payment,
                attachSKPDandSSPD: (
                  <Button
                    style={{
                      color: PrimaryHard,
                      textTransform: "capitalize",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => document(item.attachment, openFile)}
                  >
                    {
                      item.attachment === null ? "-" : item.review

                      // useTimestampConverter(
                      //     item.attachment.substr(46, 15) / 1000,
                      //     "DD/MM/YYYY"
                      //   )
                    }
                  </Button>
                ),
              };
              dataToSet.push(newRow);
            });
            setDataOpen(dataToSet);
          }
        }
      })
      .catch((err) => {
        alert(`Terjadi kesalahan : ${err}`);
      });
  }, [dataRequest]);
  //END GET DATA API SUMMARY TAX OPEN

  //GET DATA API SUMMARY TAX DONE
  useEffect(() => {
    doGetSummaryTaxTrackingDone(loadingHandler, dataRequestDone).then(
      (response) => {
        if (response) {
          if (response.responseCode === "200") {
            const { content } = response;
            setTotalRowsDone(response.totalElements);
            setTotalPageDone(response.totalPages);
            const dataToSet = [];

            content.map((item, index) => {
              const newRow = {
                atmId: item.atmId,
                location: item.locationName,
                address: item.locationAddress,

                condition: item.conditionName,
                pajakAwal: item.startDate
                  ? useTimestampConverter(item.startDate / 1000, "DD/MM/YYYY")
                  : "-",
                pajakAkhir: item.endDate
                  ? useTimestampConverter(item.endDate / 1000, "DD/MM/YYYY")
                  : "-",
                nilaiPajak: rupiah(item.tax),
                vendorPajak: item.vendorName,
                typeOrderan: item.orderType,
                signage: item.signageAvailable,
                mediaSignage: item.signageMedia,

                ukuranSignage: item.signageSize,

                sla:
                  item.status === 4 ? (
                    <Typography style={{ color: "#FF6A6A" }}>
                      {item.slaWork}
                    </Typography>
                  ) : (
                    <Typography style={{ color: "#65D170" }}>
                      {item.slaWork}
                    </Typography>
                  ),
                statusPajak:
                  item.status === 0 ? (
                    <TableChips
                      label="Tidak Bisa Diproses"
                      type={chipsHandler("unprocessed")}
                    />
                  ) : item.status === 1 ? (
                    <TableChips label="Done" type={chipsHandler("done")} />
                  ) : item.status === 2 ? (
                    <TableChips
                      label="Assign to vendor"
                      type={chipsHandler("assigned")}
                    />
                  ) : item.status === 3 ? (
                    <TableChips
                      label="On Progress"
                      type={chipsHandler("onprogress")}
                    />
                  ) : item.status === 4 ? (
                    <TableChips
                      label="Overdue"
                      type={chipsHandler("default")}
                    />
                  ) : item.status === 5 ? (
                    <TableChips label="Open" type={chipsHandler("open")} />
                  ) : null,
                surveyObjekPajak: item.taxObject,
                prosesDaftar: item.register,
                reviewSKPD: item.review,
                cetakSKPD: item.printSKPD,
                prosesBayar: item.payment,
                attachSKPDandSSPD: (
                  <Button
                    style={{
                      color: PrimaryHard,
                      textTransform: "capitalize",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => document(item.attachment, openFile)}
                  >
                    {
                      item.attachment === null ? "-" : item.review

                      // useTimestampConverter(
                      //     item.attachment.substr(46, 15) / 1000,
                      //     "DD/MM/YYYY"
                      //   )
                    }
                  </Button>
                ),
              };
              dataToSet.push(newRow);
            });
            setDataDone(dataToSet);
          }
        }
      }
    );
  }, [dataRequestDone]);
  //END DATA API SUMMARY TAX DONE

  //GET EXPORT TAX OPEN
  const handleExport = async () => {
    if (currentTab === 0) {
      const res = await exportSummaryTaxTrackingOpen();
      console.log(res);
    }
    if (currentTab === 1) {
      const res = await exportSummaryTaxTrackingDone();
      console.log(res);
    }
  };

  //END GET EXPORT TAX OPEN

  useEffect(() => {
    // console.log("HASH: ",windowsHash);
    if (windowsHash) {
      switch (windowsHash) {
        case "#jlhPajakOpen":
          setCurrentTab(0);
          setShowUpload(false);
          break;
        case "#jlhPajakDone":
          setCurrentTab(1);
          setShowUpload(true);
          break;
        default:
          setCurrentTab(0);
      }
    } else {
      setCurrentTab(0);
    }
  }, [windowsHash]);

  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        classes={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Jumlah Object Pajak</Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" className={classes.secondContainer}>
        {/* <Grid item xs={12}></Grid> */}
        <Grid item xs={12} className={classes.secondContainer}>
          <ContentTabs
            value={currentTab}
            onChange={handleChangeTab}
            aria-label="tabs untuk tracking pajak"
          >
            <ContentTab label="Open" {...a11yProps(0)} />
            <ContentTab label="Done" {...a11yProps(1)} />
          </ContentTabs>
          <Paper>
            <div className={classes.filterContainer}>
              <FilterComponent
                onFilterSubmit={
                  currentTab === 0 ? handleFilterSubmit : handleFilterSubmitDone
                }
                itemSearch={currentTab === 0 ? itemSearch : itemSearchDone}
                handleReset={
                  currentTab === 0 ? handleResetFilter : handleResetFilterDone
                }
              />
            </div>
            <TabPanel value={currentTab} index={0}>
              <ChkyTablePagination
                data={dataOpen}
                fields={TableTemplateOpen.titleTable}
                cellOption={TableTemplateOpen.valueType}
                isSort={TableTemplateOpen.isSort}
                handleSort={handleSortOpen}
                sortBy={sortBy}
                isLoadData={isLoading}
                isUsingMuiSort
                order={orderDirection}
                changePage={handleChangePage}
                totalPages={totalPage}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
              />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
              <ChkyTablePagination
                data={dataDone}
                fields={TableTemplateDone.titleTable}
                cellOption={TableTemplateDone.valueType}
                isSort={TableTemplateDone.isSort}
                handleSort={handleSortDone}
                sortBy={sortByDone}
                isLoadData={isLoading}
                isUsingMuiSort
                order={orderDirectionDone}
                changePage={handleChangePageDone}
                totalPages={totalPageDone}
                rowsPerPage={rowsPerPage}
                totalRows={totalRowsDone}
              />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailObjectPajak;
