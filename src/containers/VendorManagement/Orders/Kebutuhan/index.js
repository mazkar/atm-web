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
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import moment from "moment";
import { Box, Grid, Typography} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import AddIcon from '@material-ui/icons/Add';
import Axios from 'axios';
import { RootContext } from "../../../../router";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import Constants from "../../../../helpers/constants";
import FilterProgress from '../common/FilterProgress';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { TableCheckPagination } from "../../../../components";
import PaperImplementOverview from "../common/card";
import { thousandFormat } from "../../../../helpers/useFormatter";
import { ReactComponent as ExchangeIcon }from '../../../../assets/icons/duotone-red/exchange-alt.svg';
import { ReactComponent as TagIcon } from "../../../../assets/icons/duotone-red/tag.svg";
import { ReactComponent as ListIcon } from "../../../../assets/icons/duotone-red/list-alt.svg";
import { ReactComponent as IconCalendar } from "../../../../assets/icons/duotone-red/calendar-day.svg";
import {useDispatch, useSelector} from "../../../../helpers/Utils/react-redux-hook";
import {ReactComponent as UploadIcon} from '../../../../assets/icons/linear-red/upload.svg';
import constansts from "../../../../helpers/constants";
import UploadInvoiceNotFound from "../common/PopUp/uploadInvoiceNotFound";
import AddNewOrderPopUp from "../common/PopUp/addNewOrder";
import SuccessPopUp from "../common/PopUp/successPopUp";
import { dataCard } from '../index';
import secureStorage from "../../../../helpers/secureStorage";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";

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
    color: constansts.color.primaryHard,
    backgroundColor: "white",
    height: 40,
    marginRight: 10,
    border: "1px solid",
    borderColor: constansts.color.primaryHard,
    borderRadius: 10,
    textTransform: "capitalize",
  },
});

// TABS PANEL COMPONENT
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
// END TABS PANEL COMPONENT

// TABLE REMARK COUNT
function MenuCount(props){
  const {remarkCount, disable} = props
  return(
    <span 
      style={{
        position: 'relative', 
        right: 0, 
        backgroundColor: disable ? constansts.color.grayMedium : constansts.color.primaryHard,
        padding: '2px 5px 2px 5px',
        color: 'white',
        fontWeight: 600,
        fontSize: 10,
        borderRadius: 25,
        marginLeft: 5}}>
      {remarkCount}
    </span>
  )
}
MenuCount.propTypes = {
  remarkCount: PropTypes.number,
  disable: PropTypes.bool
};
MenuCount.defaultProps = {
  remarkCount: 0,
  disable: false
};
// END TABLE REMARK COUNT

// CONVERTING DATE AS DD-MM-YYYY FORMAT
const DateConvert = (props) => {
  const { getDate } = props;
  const getNewDate = typeof getDate === 'string' ? getDate.replace("WIB", "+07:00") : '';
  const setDate = getNewDate ? moment(getNewDate)?.format("DD-MM-YYYY") : '';
  return setDate || '-';
};

DateConvert.propTypes = {
  getDate: PropTypes.string,
};

const itemSearch = [
  { text: 'No Ticket', value: 'ticketNumber' },
  { text: 'Tgl Request', value: 'requestDate' },
  { text: 'User Req', value: 'requesterUser' },
  { text: 'ID Loc', value: 'locationId' },
  { text: 'Nama Lokasi', value: 'locationName' },
  { text: 'Alamat', value: 'locationAddress' },
  { text: 'Area', value: 'locationArea' },
  { text: 'City', value: 'locationCity' },
  { text: 'Lat - Long', value: 'latitudeLongitude' },
  { text: 'ID Mesin', value: 'idMesin' },
  { text: 'Jenis Pekerjaan', value: 'jobType' },
  { text: 'Nama Vendor', value: 'vendorName' },
  { text: 'Tgl Approved', value: 'approvedDate' }
];

// DEFAULT EXPORT
const Main = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const implementation = useSelector((state) => state.implementation);
  const implementationTable = useSelector((state) => state.implementationTable);
  const accessToken = secureStorage.getItem("access_token");

  // GET USER ID
  const { userId, userRoleName } = useContext(RootContext);

  // INIT LOADING
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(true);

  // INIT TABLE
  const defaultType = "ASC";
  const defaultColumn = "id";
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage|
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [openUploadModalNotFound, setopenUploadModalNotFound] = useState(false);
  const [openModalNewOrder, setOpenModalNewOrder] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [labelSuccess, setLabelSuccess] = useState('');
  const [openingType, setOpeningType] = useState('All');
  const [card1, setCard1] = useState({
    totalOrder: 'N/A',
    totalDone: 'N/A',
    totalOnProgre: 'N/A'
  });
  const [card2, setCard2] = useState({
    totalBiaya: 'N/A',
    totalBiayaJasa: 'N/A',
    totalBiayaBarang: 'N/A'
  });
  const [card3, setCard3] = useState({
    totalPembayaran: 'N/A',
    statusPaid: 'N/A',
    statusUnpaid: 'N/A'
  });
  const [card4, setCard4] = useState('N/A');

  // INIT DATA REQUEST
  const defaultDataHit = {
    sortType: defaultType,
    sortBy: defaultColumn,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
    // status: "All"
  };
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  // Init TABS Value
  const [valueTab, setValueTab] = useState(null);

  // INIT FILTER Table
  const [selectedSearch, setSelectedSearch] = useState('All');
  const [selectedKebutuhan, setSelectedKebutuhan] = useState('All');
  const [inputSearch, setInputSearch] = useState('');
  const [dataFilter, setDataFilter] = useState({
    area: 'All',
    city: 'All',
    atmId: 'All',
    type: 'All',
    progress: 'All',
    approval: 'All',
    docLegal: 'All'
  });

  // const getSelectedSearch = (key) => {
  //   setSelectedSearch(key)
  //   setDataRequest(prevState => ({
  //     ...prevState,
  //     [key]: openingType
  //   }))
  // }

  // const getOpeningType = (key) => {
  //   setOpeningType(key)
  //   setDataRequest(prevState => ({
  //     ...prevState,
  //     status: key
  //   }))
  // }

  // useEffect(() => {
  //   console.log(dataRequest);
  // }, [dataRequest]);

  const actionBAST = (id) => {
    // alert(`BAST ${id}`)
    if (userRoleName.toLowerCase().includes('vendor')) {
      window.location.assign(`/vendor-management/orders/kebutuhan/bast-digital/${id}`);
    }else{
      //window.location.assign(`/implementation/bast-digital-preview/${id}`);
      window.location.assign(`/vendor-management/orders/bast-digital-preview/${id}`);
    }
  };
  const actionPerpanjangan = (id) => {
    // alert(`Perpanjangan ${id}`)
    const needConfig = dataCard.find((val) => val.title.toLowerCase().includes('kebutuhan'));
    if (userRoleName.toLowerCase().includes('vendor')) {
      window.location.assign(`${needConfig.urlVendor}/penawaran-harga/${id}`);
    } else {
      window.location.assign(`${needConfig.url}/penawaran-harga/${id}`);
    }
  };
  const actionDetail = (id) => {
    // alert(`(${id}) Go to Order Detail`)
    if (userRoleName.toLowerCase().includes('vendor')) {
      window.location.assign(`/vendor-orders/kebutuhan/${id}`);
    }else{
      window.location.assign(`/vendor-management/orders/kebutuhan/${id}`);
    }
  };

  const [dataImplementationNew, setDataImplementationNew] = useState([]); // <--- init dataImplementation array

  const dataAction1 = [{ name: "BAST Digital", func: actionBAST }];
  const dataAction2 = [{ name: "Pengajuan Harga", func: actionPerpanjangan }];
  const dataAction3 = [{ name: "Detail", func: actionDetail }];

  const dataInvoice = [
    {id: 1, noInvoice: 'A234958'},
    {id: 2, noInvoice: 'A234958'},
    {id: 3, noInvoice: 'A234958'},
    {id: 4, noInvoice: 'A234958'},
    {id: 5, noInvoice: 'A234958'},
    {id: 6, noInvoice: 'A234958'},
    {id: 7, noInvoice: 'A234958'},
    {id: 8, noInvoice: 'A234958'},
  ];

  const titleTableNew = [
    { id: "id", numeric: false, disablePadding: false, label: "ID"},
    { id: "ticket", numeric: false, disablePadding: false,label: "No Ticket"},
    { id: "requestDate", numeric: false, disablePadding: false, label: "Tgl Request"},
    { id: "userRequest", numeric: false, disablePadding: false, label: "User Req",},
    { id: "idLocation", numeric: false, disablePadding: false, label: "ID Loc",},
    { id: "locationName", numeric: false, disablePadding: false, label: "Nama Lokasi",},
    { id: "address", numeric: false, disablePadding: false, label: "Alamat",},
    { id: "area", numeric: false, disablePadding: false, label: "Area"},
    { id: "city", numeric: false, disablePadding: false, label: "City"},
    { id: "longLat", numeric: false, disablePadding: false, label: "Lat - Long"},
    { id: "machineId", numeric: false, disablePadding: false, label: "ID Mesin"},
    { id: "jenisPekerjaan", numeric: false, disablePadding: false, label: "Jenis Pekerjaan"},
    { id: "namaVendor", numeric: false, disablePadding: false, label: "Nama Vendor"},
    { id: "biayaBarang", numeric: false, disablePadding: false, label: "Biaya Barang"},
    { id: "biayaJasa", numeric: false, disablePadding: false, label: "Biaya Jasa" },
    { id: "totalBiaya", numeric: false, disablePadding: false, label: "Total Biaya" },
    { id: "totalBiayaPpn", numeric: false, disablePadding: false, label: "Total Biaya+PPN" },
    { id: "approval", numeric: false, disablePadding: false, label: "Approver" },
    { id: "approvalStatus", numeric: false, disablePadding: false, label: "Status Approval" },
    { id: "approvalDate", numeric: false, disablePadding: false, label: "Tgl Approved" },
    { id: "processingDate", numeric: false, disablePadding: false, label: "Tgl Pengerjaan" },
    { id: "completeDate", numeric: false, disablePadding: false, label: "Tgl Selesai" },
    { id: "sla", numeric: false, disablePadding: false, label: "SLA Pekerjaan" },
    { id: "bast", numeric: false, disablePadding: false, label: "BAST Digital" },
    { id: "invoiceDate", numeric: false, disablePadding: false, label: "Tgl Kirim Invoice" },
    { id: "invoiceNumber", numeric: false, disablePadding: false, label: "No Invoice" },
    { id: "paymentDate", numeric: false, disablePadding: false, label: "Tgl Pembayaran" },
    { id: "paymentStatus", numeric: false, disablePadding: false, label: "Status Paid" },
    { id: "slaPembayaran", numeric: false, disablePadding: false, label: "SLA Pembayaran" },
    { id: "noteDesc", numeric: false, disablePadding: false, label: "Notes & Desc" },
    { id: "action1", numeric: false, disablePadding: false, label: "", disabledSort: true },
    { id: "action2", numeric: false, disablePadding: false, label: "", disabledSort: true },
  ];

  const valueTypeTableNew = [
    "hide",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "approverImple",
    "statusApproval",
    "limit20",
    "limit20",
    "limit20",
    "sla_Vendor",
    "string",
    "limit20",
    "limit20",
    "limit20",
    "status_paid",
    "sla_Vendor",
    "limit20",
  ];

  // SET DATA OF TABLE

  async function getResponse(){
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      setIsLoadingTable(true);
      const result = await Axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/getListKebutuhanVendor`,
        dataRequest,
        config
      );
      try {
         console.log("AHASIL: ", result.data)
        const response = result.data;
        let totalData; let totalPage;
        const storeNew = [];
        if (response.content !== undefined) {
          if (response.content !== undefined) {
            totalData = response.content.length;
            totalPage = Math.ceil(totalData / rowsPerPage);
            setTotalRows(response.totalElement);
            setTotalPages(response.totalPage);
            response.content.map((data, index) => {

              // eslint-disable-next-line no-inner-declarations
              function checkIsDisabledPenawaran(){
                if(userRoleName.toLowerCase().includes('vendor') === false){
                  // USER CIMB
                  if(data.totalBiaya === 0 ){
                    // BELUM ADA PENAWARAN
                    return true;
                  }
                  // SUDAH ADA PENAWARAN
                  return false;
                }
                // USER VENDOR
                return false;
              }
              
              storeNew.push({
                id: data.id,
                noTicket: data.ticket,
                tglRequest: data.requestDate !== null? useTimestampConverter(data.requestDate/1000, "DD-MM-YYYY") : "-",
                userReq: data.userRequest,
                iDLoc: data.idLocation,
                namaLokasi: data.locationName,
                alamat: data.address,
                area: data.area,
                city: data.city,
                latLong: data.longLat,
                IDMesin: data.idMesin,
                jenisPekerjaan: data.jenisPekerjaan,
                namaVendor: data.namaVendor,
                biayaBarang: thousandFormat(data.biayaBarang),
                biayaJasa: thousandFormat(data.biayaJasa),
                totalBiaya: thousandFormat(data.totalBiaya),
                totalBiayaPPN: thousandFormat(data.totalBiayaPpn),
                approver: data.approval,
                statusApproval: data.approvalStatus,
                tglApproved: data.approvalDate !== null? useTimestampConverter(data.approvalDate/1000, "DD-MM-YYYY") : "-",
                tglPengerjaan: data.processingDate !== null? useTimestampConverter(data.processingDate/1000, "DD-MM-YYYY") : "-",
                //tglPengerjaan: data.processingDate !== null? data.processingDate : "-",
                tglSelesai: data.completeDate !== null? useTimestampConverter(data.completeDate/1000, "DD-MM-YYYY") : "-",
                SLAPekerjaan: `${data.sla} Days`,
                BASTDigital: data.bastSubmitStatus ? dataAction1.map((act) => {
                  return <a onClick={() => act.func(data.bast)}>{act.name}</a>;
                }) : '',
                tglKirimInvoice: data.invoiceDate !== null? useTimestampConverter(data.invoiceDate/1000, "DD-MM-YYYY") : "-",
                noInvoice: data.invoiceNumber,
                tglPembayaran: data.paymentDate !== null? useTimestampConverter(data.paymentDate/1000, "DD-MM-YYYY") : "-",
                statusPaid: data.paymentStatus,
                SLAPembayaran: `${data.slaPembayaran} Days`,
                notesDesc: data.noteDesc,
                action1: dataAction2.map((act) => {
                  return (
                  <a 
                    onClick={() => checkIsDisabledPenawaran()? null : act.func(data.id)}
                    disabled={checkIsDisabledPenawaran()}>
                      {act.name}<MenuCount remarkCount={data.remarkCount} disable={checkIsDisabledPenawaran()}/>
                  </a>
                  )
                }),
                action2: dataAction3.map((act) => {
                  return (
                    <a
                      onClick={() => 
                        data.approvalStatus === 0 || data.approvalStatus === 10 || data.approvalStatus == null || data.approvalStatus < 2?
                        null : act.func(data.id)}
                      disabled={data.approvalStatus === 0 || data.approvalStatus === 10 || data.approvalStatus == null || data.approvalStatus < 2}
                    >
                      {act.name}
                    </a>
                  );
                }),
              });
            });
            setDataImplementationNew(storeNew);
            setIsLoadingTable(false);
          }
        }
      } catch (error) {
        alert(`Error ${error}`);
      }
      setIsLoadingTable(false);
    } catch (err) {
      alert(`Error ${err}`);
      setIsLoadingTable(false);
    }
  }

  useEffect(()=>{
    setValueTab(0);
    getResponse();
  }, [dataRequest]);

  function handleChangePageValue(newPage) {
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

  const handleSubmitNewOrder = () => {
    setOpenSuccessModal(true);
    setOpenModalNewOrder(false);
    setLabelSuccess('Add New Order Success');
  };

  const fetchDataCard1 = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      setIsLoading(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/summaryImplementationKebutuhanOrderVendor`,
        config
      );
      try {
        const dataPre = result.data;
        setCard1({...card1, 
          totalOrder: dataPre.totalOrder,
          totalDone: dataPre.totalDone,
          totalOnProgre: dataPre.totalOnProgre
        });
      } catch (error) {
        alert(`Error ${error}`);
      }
      setIsLoading(false);
    } catch (err) {
      alert(`Error ${err}`);
      setIsLoading(false);
    }
  };

  const fetchDataCard2 = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      setIsLoading(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/summaryImplementationKebutuhanBiayaVendor`,
        config
      );
      try {
        const dataPre = result.data;
        setCard2({...card2, 
          totalBiaya: thousandFormat(dataPre.totalBiaya),
          totalBiayaJasa: thousandFormat(dataPre.totalBiayaJasa),
          totalBiayaBarang: thousandFormat(dataPre.totalBiayaBarang)
        });
      } catch (error) {
        alert(`Error ${error}`);
      }
      setIsLoading(false);
    } catch (err) {
      alert(`Error ${err}`);
      setIsLoading(false);
    }
  };

  const fetchDataCard3 = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      setIsLoading(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/summaryImplemtationKebuhanPembayaran`,
        config
      );
      try {
        const dataPre = result.data;
        setCard3({...card3, 
          totalPembayaran: thousandFormat(dataPre.totalPembayaran),
          statusPaid: thousandFormat(dataPre.statusPaid),
          statusUnpaid: thousandFormat(dataPre.statusUnpaid)
        });
      } catch (error) {
        alert(`Error ${error}`);
      }
      setIsLoading(false);
    } catch (err) {
      alert(`Error ${err}`);
      setIsLoading(false);
    }
  };

  const fetchDataCard4 = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      setIsLoading(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/summaryImpementationSlaVendor`,
        config
      );
      try {
        const dataPre = result.data;
        setCard4(dataPre.totalSla);
      } catch (error) {
        alert(`Error ${error}`);
      }
      setIsLoading(false);
    } catch (err) {
      alert(`Error ${err}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataCard1();
    fetchDataCard2();
    fetchDataCard3();
    fetchDataCard4();
  }, []);

  function handleFilterSubmit(value) {
    console.log(">>>>> FILTER DATA: ", JSON.stringify(value));
    console.log(">>>>> FILTER DATA: ", JSON.stringify(dataRequest));
    setResetPageCounter(prevCount => prevCount+1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      console.log("Sasa",value);
      setDataRequest({
        ...defaultDataHit,
        // // pageNumber: 0,
        // // dataPerPage: rowsPerPage,
        ...value
      });
    }
  }
  function handleResetFilter(){
    setDataRequest({
      ...defaultDataHit,
    });
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Task Kebutuhan</Typography>
        </Grid>
        {/* ACTION BUTTON TAMPIL, JIKA BUKAn VENDOR */}
        {userRoleName.toLowerCase().includes('vendor') === false && (
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
                setopenUploadModalNotFound(true);
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
      <Grid container justify="space-between" spacing={2}>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Total Order"
            keyNameA="Total Done"
            keyNameB="Total On Progress"
            valTotalSub={card1.totalOrder}
            valA={card1.totalDone}
            valB={card1.totalOnProgre}
            isLoading={isLoading}
            icon={<ExchangeIcon />}
            colorSubTitle="#2B2F3C"
            colorValueA="#65D170"
            colorValueB="#FF6A6A"
          />
        </Grid>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Total Biaya"
            keyNameA="Biaya Jasa"
            keyNameB="Biaya Barang"
            valTotalSub={card2.totalBiaya}
            valA={card2.totalBiayaJasa}
            valB={card2.totalBiayaBarang}
            isLoading={isLoading}
            icon={<TagIcon />}
          />
        </Grid>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Jumlah Pembayaran"
            keyNameA="Status Paid"
            keyNameB="Status Unpaid"
            valTotalSub={card3.totalPembayaran}
            valA={card3.statusPaid}
            valB={card3.statusUnpaid}
            isLoading={isLoading}
            icon={<ListIcon />}
            colorValueA="#65D170"
            colorValueB="#FF6A6A"
          />
        </Grid>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Total Over SLA"
            valTotalSub={card4}
            isLoading={isLoading}
            icon={<IconCalendar />}
            colorSubTitle="#FF6A6A"
          />
        </Grid>
      </Grid>
      <div className={classes.container}>
        <Grid container direction="column" spacing={1}>
          {/* TAB PANEL CONTENT */}
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
            {/* NEW */}
            <TabPanel value={valueTab} index={0} className={classes.tabContent}>
              <TableCheckPagination
                data={dataImplementationNew}
                fields={titleTableNew}
                cellOption={valueTypeTableNew}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                resetPageCounter={resetPageCounter}
                changePage={handleChangePageValue}
                isWithCheck={false}
                isLoadData={isLoadingTable}
                sorting={handleSorting}
                leftAlignBody={[5,6,12,29]}
                limitCharacter={true}
                isSort
              />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
      {/* <FloatingChat /> */}
      <SuccessPopUp
        isOpen={openSuccessModal}
        onClose={()=>setOpenSuccessModal(false)}
        label={labelSuccess}
      />
      <UploadInvoiceNotFound
        isOpen={openUploadModalNotFound}
        data={dataInvoice}
        onClose={()=>setopenUploadModalNotFound(false)}
      />
      <AddNewOrderPopUp 
        isOpen={openModalNewOrder}
        onClose={()=>setOpenModalNewOrder(false)}
        onSubmitNewOrder={handleSubmitNewOrder}
      />
      
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(Main))
);
