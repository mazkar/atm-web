/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Link, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";
import { RootContext } from "../../../router";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import Constants from "../../../helpers/constants";
import FilterProgress from "./common/FilterProgress";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { ChkyTablePagination } from "../../../components";
import PaperImplementview, { SummaryCards } from "./common/card";
import { ReactComponent as ExchangeIcon } from "../../../assets/icons/duotone-red/exchange-alt.svg";
import { ReactComponent as TagIcon } from "../../../assets/icons/duotone-red/tag.svg";
import { ReactComponent as ListIcon } from "../../../assets/icons/duotone-red/list-alt.svg";
import { ReactComponent as IconCalendar } from "../../../assets/icons/duotone-red/calendar-day.svg";
import { ReactComponent as UploadIcon } from "../../../assets/icons/linear-red/upload.svg";
import secureStorage from "../../../helpers/secureStorage";
import UploadInvoiceNotFound from "./common/PopUp/uploadInvoiceNotFound";
import AddNewOrderPopUp from "./common/PopUp/addNewOrder";
import SuccessPopUp from "./common/PopUp/successPopUp";
import TableTemplate, {
  dataDummyOrders,
  routeRef,
} from "./common/TableTemplate";
import { doFetchAllOrders, doFetchSummaryVendorOrders } from "../ApiServices";
import useTimestampConverter from "../../../helpers/useTimestampConverter";
import useThousandSeparator from "../../../helpers/useThousandSeparator";
import PopUpUploadInvoice from "./common/PopUpUploadInvoice";
import ButtonLink from "../../../components/Button/ButtonLink";

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
  titleContainer: {
    marginBottom: 25,
  },
  tabContent: {
    paddingTop: 10,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  tableContent: {
    marginTop: 20,
  },
  containerPaper: {
    backgroundColor: Constants.color.white,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginBottom: 40,
  },
  text12Normal: {
    fontSize: 12,
    fontWeight: 400,
  },
  text12Bold: {
    fontSize: 12,
    fontWeight: "bold",
  },
  text12Italic: {
    fontSize: 12,
    fontWeight: 400,
    fontStyle: "italic",
  },
  filterContainer: { marginBottom: 15 },
  paramButton: {
    width: "max-content",
    color: Constants.color.primaryHard,
    backgroundColor: "white",
    height: 40,
    marginRight: 10,
    border: "1px solid",
    borderColor: Constants.color.primaryHard,
    borderRadius: 10,
    textTransform: "capitalize",
  },
});

export const dataCard = Constants.dataCard;

const itemSearch = [
  { text: "No Ticket", value: "ticketNumber" },
  { text: "Tgl Request", value: "requestDate" },
  { text: "User Req", value: "requesterUser" },
  { text: "ID Loc", value: "locationId" },
  { text: "Nama Lokasi", value: "locationName" },
  { text: "Alamat", value: "locationAddress" },
  { text: "Area", value: "locationArea" },
  { text: "City", value: "locationCity" },
  { text: "Lat - Long", value: "latitudeLongitude" },
  { text: "ID Mesin", value: "idMesin" },
  { text: "Jenis Pekerjaan", value: "jobType" },
  { text: "Nama Vendor", value: "vendorName" },
  { text: "Tgl Approved", value: "approvedDate" },
];

const rowsPerPage = 10; // <--- init default rowsPerPage

// DEFAULT EXPORT
const Main = () => {
  const classes = useStyles();
  const history = useHistory();
  const accessToken = secureStorage.getItem("access_token");
  const page = (new URLSearchParams(window.location.search)).get("page");
  // INIT DATA REQUEST
  const defaultDataHit = {
    pageNumber: page || 0,
    dataPerPage: rowsPerPage,
    sortBy: "id",
    sortType: "ASC",
  };
  // GET USER ID
  const { userId, userRoleName } = useContext(RootContext);

  // INIT STATE
  const [isLoading, setIsLoading] = useState(false);
  const [openUploadPembayaran, setopenUploadPembayaran] = useState(false);
  const [openModalNewOrder, setOpenModalNewOrder] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [labelSuccess, setLabelSuccess] = useState("");

  // =====> DATA TABLE  <=====
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [orderDirection, setOrderDirection] = useState("ASC");
  // const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  // LOADER LOAD DATA
  const [isLoadData, setIsLoadData] = useState(false);
  // set handler loader when call Approval API Service
  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }

  // HANDLER
  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVar[TableTemplate.titleTable.indexOf(property)];
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

  const handleSubmitNewOrder = () => {
    setOpenSuccessModal(true);
    setOpenModalNewOrder(false);
    setLabelSuccess("Add New Order Success");
  };

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

  function handleResetFilter() {
    setDataRequest({
      ...defaultDataHit,
    });
  }

  useEffect(() => {
    
  }, []);

  const generateDetailLink = (id, typeCard, openingType) => {

    const urlRoute = routeRef.find((val) => val.type.toLowerCase().includes(typeCard));
    if(typeCard === "parameter"){
      if(openingType){
        switch (openingType.toLowerCase()) {
        case "replace":
          if (userRoleName.toLowerCase().includes("vendor")) {
            window.location.assign(`${urlRoute.urlVendorReplace}/${id}`);
          } else {
            window.location.assign(`${urlRoute.urlReplace}/${id}`);
          }
          break;
    
        case "migrasi":
          if (userRoleName.toLowerCase().includes("vendor")) {
            window.location.assign(`${urlRoute.urlVendorMigrasi}/${id}`);
          } else {
            window.location.assign(`${urlRoute.urlMigrasi}/${id}`);
          }
          break;
    
        default:
          if (userRoleName.toLowerCase().includes("vendor")) {
            window.location.assign(`${urlRoute.urlVendor}/${id}`);
          } else {
            window.location.assign(`${urlRoute.url}/${id}`);
          }
          break;
        }
      }else{
        alert("Gagal Generate Link Url Parameter, Opening Type Tidak Dikenali!");
      }
      
    }else if (userRoleName.toLowerCase().includes("vendor")) {
      window.location.assign(`${urlRoute.urlVendor}/${id}`);
    } else {
      window.location.assign(`${urlRoute.url}/${id}`);
    }
    
  };
  const generatePenawaranLink = (id, typeCard) => {
    const urlRoute = routeRef.find((val) =>
      val.type.toLowerCase().includes(typeCard)
    );
    if (userRoleName.toLowerCase().includes("vendor")) {
      window.location.assign(`${urlRoute.urlVendor}/penawaran-harga/${id}`);
    } else {
      window.location.assign(`${urlRoute.url}/penawaran-harga/${id}`);
    }
  };
  const generateBastLink = (bastId, typeCard) => {
    const urlRoute = routeRef.find((val) =>
      val.type.toLowerCase().includes(typeCard)
    );
    if (userRoleName.toLowerCase().includes("vendor")) {
      window.location.assign(`${urlRoute.urlVendor}/bast-digital/${bastId}`);
    } else {
      window.location.assign(`${urlRoute.url}/bast-digital-preview/${bastId}`);
    }
  };

  function checkIsDisabledPenawaran(totalBiaya){
    if(userRoleName.toLowerCase().includes('vendor') === false){
      // USER CIMB
      if(totalBiaya === 0 ){
        // BELUM ADA PENAWARAN
        return true;
      }
      // SUDAH ADA PENAWARAN
      return false;
    }
    // USER VENDOR
    return false;
  }

  useEffect(() => {
    doFetchAllOrders(loadDataHandler, dataRequest)
      .then((response) => {
        // console.log("+++ response", response);
        if(response){
          if(response.responseCode === "200"){
            const {detail} = response;
            setTotalRows(response.totalElements);
            setTotalPages(response.totalPages);
            
            const dataToSet = [];
            detail.map((item) => {
              const newRow = {
                id: item.id,
                ticket: item.ticket,
                requestDate: item.requestDate
                  ? useTimestampConverter(item.requestDate / 1000, "DD/MM/YYYY")
                  : "-",
                userRequest: item.userRequest,
                locationId: item.locationId,
                locationName: item.locationName,
                address: item.locationAddress,
                area: item.area,
                city: item.city,
                longLat: item.latLong,
                idMesin: item.idMesin,
                jenisPekerjaan: item.jenisPekerjaan,
                namaVendor: item.namaVendor,
                biayaBarang: item.biayaBarang,
                biayaJasa: item.biayaJasa,
                totalBiaya: item.totalBiaya,
                totalBiayaPpn: item.totalBiayaPpn,
                approval: item.approval,
                approvalStatus: item.approvalStatus,
                approvalDate: item.approvalDate
                  ? useTimestampConverter(
                    item.approvalDate / 1000,
                    "DD/MM/YYYY"
                  )
                  : "-",
                processingDate: item.processingDate
                  ? useTimestampConverter(
                    item.processingDate / 1000,
                    "DD/MM/YYYY"
                  )
                  : "-",
                completeDate: item.completeDate
                  ? useTimestampConverter(
                    item.completeDate / 1000,
                    "DD/MM/YYYY"
                  )
                  : "-",
                sla:  item.cardType === "jarkom" || item.cardType === "termination" || item.cardType === "parameter" ||item.cardType === "activation" ? "-":`${item.slaWork} Days`,
                bast: item.bast != null? 
                  (<ButtonLink title="BAST Digital" onClick={() => generateBastLink(item.bast, item.cardType)}/>) : "-",
                invoiceDate: item.invoiceDate? useTimestampConverter(item.invoiceDate/1000, "DD/MM/YYYY") : "-",
                invoiceNumber: item.invoiceNumber,
                paymentDate: item.paymentDate
                  ? useTimestampConverter(item.paymentDate / 1000, "DD/MM/YYYY")
                  : "-",
                paymentStatus: item.paymentStatus?item.paymentStatus.toString() : '0',
                slaPembayaran: item.cardType === "jarkom" || item.cardType === "termination" || item.cardType === "parameter" ||item.cardType === "activation" ? "-": `${item.slaPembayaran} Days`,
                noteDesc: item.noteDesc,
                cardType:
                  item.cardType[0].toUpperCase() + item.cardType.slice(1),
                openingType: item.openingType,
                ...{
                  penawaranHarga: (
                    <>
                      {(item.cardType === "activation" || item.cardType === "termination"  || item.cardType === "jarkom" || item.cardType === "parameter"|| item.cardType === "balance") ? (
                        <Typography> </Typography>
                      ):(
                        <ButtonLink
                          title="Penawaran Harga"
                          onClick={() =>
                            generatePenawaranLink(item.id, item.cardType)
                          }
                          disabled={checkIsDisabledPenawaran(item.totalBiaya)}
                        />
                      )}
                    </>
                  ),
                },
                ...{
                  detail: (
                    <>
                      {(item.cardType === "activation" || item.cardType === "termination" || item.cardType === "jarkom" || item.cardType === "parameter"|| item.cardType === "balance") ? (
                        <ButtonLink title="Detail" onClick={() => generateDetailLink(item.id, item.cardType, item.openingType)}/>
                      ):(
                        <ButtonLink
                          title="Detail"
                          onClick={() => generateDetailLink(item.id, item.cardType, item.openingType)}
                          disabled={item.approvalStatus === 0 || item.approvalStatus === 10 || item.approvalStatus == null || item.approvalStatus < 2}
                        />
                      )}
                    </>
                  ),
                },
              };
              dataToSet.push(newRow);
            });
            setData(dataToSet);
          }
        }
      })
      .catch((err) => {
        // console.log("Error Fetch Data Orders", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, [dataRequest]);

  // LOADER LOAD DATA
  const [isLoadDataSummary, setIsLoadDataSummary] = useState(false);
  // set handler loader when call Approval API Service
  function loadDataSummaryHandler(bool) {
    setIsLoadDataSummary(bool);
  }

  const [summaryCards, setSummaryCards] = useState({
    statusPaid: 0,
    statusUnpaid: 0,
    totalBiaya: 0,
    totalBiayaBarang: 0,
    totalBiayaJasa: 0,
    totalDone: 0,
    totalMetSla: 0,
    totalNotMetSla: 0,
    totalPembayaran: 0,
    totalRequest: 0,
    totalSla: 0,
    totalUndone: 0
  });

  useEffect(() => {
    doFetchSummaryVendorOrders(loadDataSummaryHandler)
      .then((response) => {
        // console.log("+++ response", response);
        if(response){
          const {summaryOrder} = response;
          if(summaryOrder){
            setSummaryCards({
              statusPaid: summaryOrder[0].statusPaid,
              statusUnpaid: summaryOrder[0].statusUnpaid,
              totalBiaya: summaryOrder[0].totalBiaya,
              totalBiayaBarang: summaryOrder[0].totalBiayaBarang,
              totalBiayaJasa: summaryOrder[0].totalBiayaJasa,
              totalDone: summaryOrder[0].totalDone,
              totalMetSla: summaryOrder[0].totalMetSla,
              totalNotMetSla: summaryOrder[0].totalNotMetSla,
              totalPembayaran: summaryOrder[0].totalPembayaran,
              totalRequest: summaryOrder[0].totalRequest,
              totalSla: summaryOrder[0].totalSla,
              totalUndone: summaryOrder[0].totalUndone,
            });
          }
        }
      })
      .catch((err) => {
        // console.log("Error Fetch Data Summary", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Vendor Orders</Typography>
        </Grid>
        {/* ACTION BUTTON TAMPIL, JIKA BUKAN VENDOR */}
        {userRoleName.toLowerCase().includes("vendor") === false && (
          <Grid item>
            <MuiIconLabelButton
              className={classes.paramButton}
              style={{
                width: "max-content",
                background: "#FFFFFF",
                border: "1px solid #DC241F",
                boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
                borderRadius: "6px",
              }}
              label="Upload Pembayaran"
              iconPosition="endIcon"
              onClick={() => {
                setopenUploadPembayaran(true);
              }}
              buttonIcon={<UploadIcon />}
            />
            <MuiIconLabelButton
              style={{
                width: "max-content",
                right: 0,
                height: 40,
                boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
                borderRadius: "6px",
              }}
              label="New Order"
              iconPosition="endIcon"
              onClick={() => {
                setOpenModalNewOrder(true);
              }}
              buttonIcon={<AddIcon />}
            />
          </Grid>
        )}
      </Grid>
      <SummaryCards
        totalOrder={useThousandSeparator(summaryCards.totalRequest)}
        totalDone={useThousandSeparator(summaryCards.totalDone)}
        totalOnProgress={useThousandSeparator(summaryCards.totalUndone)}
        totalBiaya={useThousandSeparator(summaryCards.totalBiaya, ".", "Rp. ")}
        biayaJasa={useThousandSeparator(summaryCards.totalBiayaJasa, ".", "Rp. ")}
        biayaBarang={useThousandSeparator(summaryCards.totalBiayaBarang, ".", "Rp. ")}
        jumlahPembayaran={useThousandSeparator(summaryCards.totalPembayaran)}
        statusPaid={useThousandSeparator(summaryCards.statusPaid)}
        statusUnpaid={useThousandSeparator(summaryCards.statusUnpaid)}
        totalOverSla={useThousandSeparator(summaryCards.totalSla)}
        isLoading={isLoadDataSummary}
      />
      <div className={classes.container}>
        <Grid container direction="column" spacing={1}>
          <Grid item style={{ width: "-webkit-fill-available" }}>
            {/* FILTER */}
            <div className={classes.filterContainer}>
              <FilterProgress
                itemSearch={itemSearch}
                onFilterSubmit={handleFilterSubmit}
                handleReset={handleResetFilter}
                isTable="status"
              />
            </div>
          </Grid>

          <ChkyTablePagination
            data={data}
            fields={TableTemplate.titleTable}
            cellOption={TableTemplate.valueType}
            changePage={handleChangePage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            isLoadData={isLoadData}
            isSort={TableTemplate.isSort}
            isUsingMuiSort
            handleSort={handleSort}
            sortBy={sortBy}
            order={orderDirection}
          />
        </Grid>
      </div>

      <PopUpUploadInvoice
        isOpen={openUploadPembayaran}
        // data={dataInvoice}
        onClose={() => setopenUploadPembayaran(false)}
      />

      <UploadInvoiceNotFound
        isOpen={false}
        // data={dataInvoice}
        onClose={() => setopenUploadPembayaran(false)}
      />
      <AddNewOrderPopUp
        isOpen={openModalNewOrder}
        onClose={() => setOpenModalNewOrder(false)}
        onSuccessSubmit = {(noTicket)=>{
          setOpenModalNewOrder(false);
          setOpenSuccessModal(true);
          setLabelSuccess(`Add New Order Success \n No Ticket: ${noTicket}`);
        }}
      />
      <SuccessPopUp
        isOpen={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        label={labelSuccess}
      />
    </div>
  );
};

export default Main;
