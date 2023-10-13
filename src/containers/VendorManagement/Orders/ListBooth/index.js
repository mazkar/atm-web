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
import { Box, Grid, Typography, Tabs, Tab } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import { RootContext } from "../../../../router";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import Constants from "../../../../helpers/constants";
import FilterProgress from '../common/FilterProgress';
//import ModalTambah from "../../ModalTambah";
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { TableCheckPagination } from "../../../../components";
import PaperImplementOverview from "../common/card";
import { thousandFormat, percentageFormatter } from "../../../../helpers/useFormatter";
import { ReactComponent as ExchangeIcon }from '../../../../assets/icons/duotone-red/exchange-alt.svg';
import { ReactComponent as PlusWhite } from '../../../../assets/icons/siab/plus-white.svg';
import { ReactComponent as TagIcon } from "../../../../assets/icons/duotone-red/tag.svg";
import { ReactComponent as ListIcon } from "../../../../assets/icons/duotone-red/list-alt.svg";
import { ReactComponent as IconCalendar } from "../../../../assets/icons/duotone-red/calendar-day.svg";
import {useDispatch, useSelector} from "../../../../helpers/Utils/react-redux-hook";
import AddIcon from '@material-ui/icons/Add';
import {ReactComponent as UploadIcon} from '../../../../assets/icons/linear-red/upload.svg';
import constansts from "../../../../helpers/constants";
import UploadInvoiceNotFound from "../common/PopUp/uploadInvoiceNotFound";
import AddNewOrderPopUp from "../common/PopUp/addNewOrder";
import SuccessPopUp from "../common/PopUp/successPopUp";
import Axios from 'axios';


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

const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 3,
    "& > span": {
      width: "100%",
      backgroundColor: Constants.color.primaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: Constants.color.grayMedium,
    "&:hover": {
      color: Constants.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: Constants.color.dark,
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    "aria-controls": `content-tabpanel-${index}`,
  };
}

// END TABS PANEL COMPONENT

// CONVERTING DATE AS DD-MM-YYYY FORMAT
const DateConvert = (props) => {
  let { getDate } = props;
  let getNewDate = typeof getDate === 'string' ? getDate.replace("WIB", "+07:00") : '';
  let setDate = getNewDate ? moment(getNewDate)?.format("DD-MM-YYYY") : '';
  return setDate || '-';
};

DateConvert.propTypes = {
  getDate: PropTypes.string,
};

// DEFAULT EXPORT
const Main = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const implementation = useSelector((state) => state.implementation);
  //const implementationTable = useSelector((state) => state.implementationTable);

  // POPUP TAMBAH
  const [OpenModalUploadNew, setOpenModalUploadNew] = React.useState(false);
  const handleOpenModalUploadNew = () => setOpenModalUploadNew(true);
  const handleCloseModalUploadNew = () => setOpenModalUploadNew(false);

  // GET USER ID
  const { userId } = useContext(RootContext);

  // INIT LOADING
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(true);

  // INIT SUMMARY & Loading
  const [summaryNew, setSummaryNew] = useState({});
  const [isLoading1, setIsLoading1] = useState(true);
  const [card1, setCard1] = useState({
    totalOrder: 0,
    totalDone: 0,
    totalOnProgres: 0
  })
  const [isLoading2, setIsLoading2] = useState(true);
  const [card2, setCard2] = useState({
    totalBiaya: 0,
    totalBiayaJasa: 0,
    totalBiayaBarang: 0
  })
  const [isLoading3, setIsLoading3] = useState(true);
  const [card3, setCard3] = useState({
    totalPembayaran: 0,
    statusPaid: 0,
    statusUnpaid: 0
  })
  const [isLoading4, setIsLoading4] = useState(true);
  const [card4, setCard4] = useState(0)

  // INIT TABLE
  const defaultType = "ASC";
  const defaultColumn = "id";
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage|
  const [openUploadModalNotFound, setopenUploadModalNotFound] = useState(false)
  const [openModalNewOrder, setOpenModalNewOrder] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [labelSuccess, setLabelSuccess] = useState('')

  // INIT DATA REQUEST
  const [dataRequest, setDataRequest] = useState({
    sortType: defaultType,
    sortBy: defaultColumn,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
  });

  // Init TABS Value
  const [valueTab, setValueTab] = useState(null);

  // INIT FILTER Table
  const [selectedSearch, setSelectedSearch] = useState('All');
  const [selectedKebutuhan, setSelectedKebutuhan] = useState('All');
  const [inputSearch, setInputSearch] = useState('')
  const [dataFilter, setDataFilter] = useState({
    area: 'All',
    city: 'All',
    atmId: 'All',
    type: 'All',
    progress: 'All',
    approval: 'All',
    docLegal: 'All'
  });

  useEffect(() => {
    fetchDataCard1()
    fetchDataCard2()
    fetchDataCard3()
    fetchDataCard4()
  }, [])

  const fetchDataCard1 = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setIsLoading1(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/summaryTotalOrderTaskBoothVendor`,
        config
      );
      try {
        const dataPre = result.data;
        console.log("Aaa",dataPre)
        console
        setCard1({...card1, 
          totalOrder: dataPre.totalOrder,
          totalDone: dataPre.totalDone,
          totalOnProgres: dataPre.totalOnProgres
        })
      } catch (error) {
        alert(`Error summary order ${error}`);
      }
      setIsLoading1(false);
    } catch (err) {
      alert(`Error summary order ${err}`);
      setIsLoading1(false);
    }
  };

  const fetchDataCard2 = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setIsLoading2(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/summaryTotalBiayaTaskBoothVendor`,
        config
      );
      try {
        const dataPre = result.data;
        setCard2({...card2, 
          totalBiaya: thousandFormat(dataPre.totalBiaya),
          totalBiayaJasa: thousandFormat(dataPre.totalBiayaJasa),
          totalBiayaBarang: thousandFormat(dataPre.totalBiayaBarang)
        })
      } catch (error) {
        alert(`Error summary Biaya ${error}`);
      }
      setIsLoading2(false);
    } catch (err) {
      alert(`Error summary Biaya ${err}`);
      setIsLoading2(false);
    }
  };

  const fetchDataCard3 = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setIsLoading3(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/summaryTotalBayarTaskBoothVendor`,
        config
      );
      try {
        const dataPre = result.data;
        setCard3({...card3, 
          totalPembayaran: thousandFormat(dataPre.totalPembayaran),
          statusPaid: thousandFormat(dataPre.statusPaid),
          statusUnpaid: thousandFormat(dataPre.statusUnpaid)
        })
      } catch (error) {
        alert(`Error summary Bayar ${error}`);
      }
      setIsLoading3(false);
    } catch (err) {
      alert(`Error summary Bayar ${err}`);
      setIsLoading3(false);
    }
  };

  const fetchDataCard4 = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setIsLoading4(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/summarySlaTaskBoothVendor`,
        config
      );
      try {
        const dataPre = result.data;
        setCard4(dataPre.totalSla)
      } catch (error) {
        alert(`Error summary SLA${error}`);
      }
      setIsLoading4(false);
    } catch (err) {
      alert(`Error summary SLA${err}`);
      setIsLoading4(false);
    }
  };

  // check url hash
  useEffect(() => {
    const windowsHash = window.location.hash;
    if (windowsHash) {
      switch (windowsHash) {
        case "#new":
          setValueTab(0);
          dispatch.implementationTable.getListImplementationNew(dataRequest);
          break;
        case "#termin":
          setValueTab(1);
          dispatch.implementationTable.getListImplementationTermin(dataRequest);
          break;
        case "#replace":
          setValueTab(2);
          dispatch.implementationTable.getListImplementationReplace(
            dataRequest
          );
          break;
        case "#migrasi":
          setValueTab(3);
          dispatch.implementationTable.getListImplementationMigrasi(
            dataRequest
          );
          break;
        default:
          setValueTab(0);
          dispatch.implementationTable.getListImplementationNew(dataRequest);
      }
    } else {
      setValueTab(0);
    }
  }, [dataRequest]);

  const actionBAST = (id) => {
    //alert(`BAST ${id}`)
    window.location.assign(`/implementation/vendor/main-list-booth/bast-digital/${id}`)
  };
  const actionPerpanjangan = (id) => {
    //alert(`Perpanjangan ${id}`)
    window.location.assign(`/implementation/vendor/main-list-booth/penawaran-harga/${id}`)
  };
  const actionDetail = (id) => {
    //alert(`(${id}) Go to Order Detail`)
    window.location.assign(`/implementation/vendor/main-list-booth/order-detail/${id}`)
  };

  // HIT API SUMMARY AND LIST NEW
  useEffect(() => {
    dispatch.implementation.getImplementationSummary();
  }, []);

  useEffect(() => {
    dispatch.implementationTable.getListImplementationNew(dataRequest);
  }, []);

  // SET DATA OF SUMMARY
  useEffect(() => {
    const response = implementation.data;

    let storeNew = {}

    if (response.newLocation) {
      storeNew = {
        submission: response.newLocation.totalSubmission,
        actual: response.newLocation.totalActual,
        percentage: response.newLocation.totalActualPercentage,
    };

      setSummaryNew(storeNew);
      setIsLoading(false);
    }
  }, [implementation]);


  const [dataImplementationNew, setDataImplementationNew] = useState([]); // <--- init dataImplementation array

  const dataAction1 = [{ name: "BAST Digital", func: actionBAST }]
  const dataAction2 = [{ name: "Pengajuan Harga", func: actionPerpanjangan }]
  const dataAction3 = [{ name: "Detail", func: actionDetail }]

  const dataInvoice = [
    {id: 1, noInvoice: 'A234958'},
    {id: 2, noInvoice: 'A234958'},
    {id: 3, noInvoice: 'A234958'},
    {id: 4, noInvoice: 'A234958'},
    {id: 5, noInvoice: 'A234958'},
    {id: 6, noInvoice: 'A234958'},
    {id: 7, noInvoice: 'A234958'},
    {id: 8, noInvoice: 'A234958'},
  ]

  const titleTableNew = [
    {id: "id", numeric: false, disablePadding: false, label: "ID"},
    {id: "noTicket", numeric: false, disablePadding: false,label: "No Ticket"},
    {id: "tglRequest", numeric: false, disablePadding: false, label: "Tgl Request"},
    {id: "userReq", numeric: false, disablePadding: false, label: "User Req",},
    {id: "iDLoc", numeric: false, disablePadding: false, label: "ID Loc",},
    {id: "namaLokasi", numeric: false, disablePadding: false, label: "Nama Lokasi",},
    {id: "alamat", numeric: false, disablePadding: false, label: "Alamat",},
    {id: "area", numeric: false, disablePadding: false, label: "Area"},
    {id: "city", numeric: false, disablePadding: false, label: "City"},
    { id: "latLong", numeric: false, disablePadding: false, label: "Lat - Long"},
    { id: "IDMesin", numeric: false, disablePadding: false, label: "ID Mesin"},
    { id: "jenisPekerjaan", numeric: false, disablePadding: false, label: "Jenis Pekerjaan"},
    {id: "namaVendor", numeric: false, disablePadding: false, label: "Nama Vendor"},
    {id: "biayaBarang", numeric: false, disablePadding: false, label: "Biaya Barang"},
    { id: "biayaJasa", numeric: false, disablePadding: false, label: "Biaya Jasa" },
    { id: "totalBiaya", numeric: false, disablePadding: false, label: "Total Biaya" },
    { id: "totalBiayaPPN", numeric: false, disablePadding: false, label: "Total Biaya+PPN" },
    { id: "approver", numeric: false, disablePadding: false, label: "Approver" },
    { id: "statusApproval", numeric: false, disablePadding: false, label: "Status Approval" },
    { id: "tglApproved", numeric: false, disablePadding: false, label: "Tgl Approved" },
    { id: "tglPengerjaan", numeric: false, disablePadding: false, label: "Tgl Pengerjaan" },
    { id: "tglSelesai", numeric: false, disablePadding: false, label: "Tgl Selesai" },
    { id: "SLAPekerjaan", numeric: false, disablePadding: false, label: "SLA Pekerjaan" },
    { id: "BASTDigital", numeric: false, disablePadding: false, label: "BAST Digital" },
    { id: "tglKirimInvoice", numeric: false, disablePadding: false, label: "Tgl Kirim Invoice" },
    { id: "noInvoice", numeric: false, disablePadding: false, label: "No Invoice" },
    { id: "tglPembayaran", numeric: false, disablePadding: false, label: "Tgl Pembayaran" },
    { id: "statusPaid", numeric: false, disablePadding: false, label: "Status Paid" },
    { id: "SLAPembayaran", numeric: false, disablePadding: false, label: "SLA Pembayaran" },
    { id: "notesDesc", numeric: false, disablePadding: false, label: "Notes & Desc" },
    { id: "action1", numeric: false, disablePadding: false, label: "" },
    { id: "action2", numeric: false, disablePadding: false, label: "" },
  ];

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
  ]

  const valueTypeTableNew = [
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
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "approver",
    "statusApproval",
    "string",
    "string",
    "string",
    "sla_pekerjaan",
    "string",
    "string",
    "string",
    "string",
    "status_paid",
    "sla_pembayaran",
    "string",
  ];

  // SET DATA OF TABLE
  useEffect(()=>{
    setValueTab(0)
    getResponse()
  }, [])

  async function getResponse(){
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
        console.log("AHASIL: ", result)
        let response = result.data,
        totalData, totalPage,
        storeNew = []
        if (response.content !== undefined) {
          if (response.content !== undefined) {
            totalData = response.content.length;
            totalPage = Math.ceil(totalData / rowsPerPage);
            setTotalRows(totalData);
            setTotalPages(totalPage);
            response.content.map((data, index) => {
              storeNew.push({
                id: index + 1,
                noTicket: data.ticket,
                tglRequest: data.requestDate,
                userReq: data.userRequest,
                iDLoc: data.idLocation,
                namaLokasi: data.locationName,
                alamat: data.address,
                area: data.area,
                city: data.city,
                latLong: data.longLat,
                IDMesin: data.machineId,
                jenisPekerjaan: data.jenisPekerjaan,
                namaVendor: data.namaVendor,
                biayaBarang: thousandFormat(data.biayaBarang),
                biayaJasa: thousandFormat(data.biayaJasa),
                totalBiaya: thousandFormat(data.totalBiaya),
                totalBiayaPPN: thousandFormat(data.totalBiayaPpn),
                approver: JSON.parse(data.approval),
                statusApproval: data.approvalStatus,
                tglApproved: data.approvalDate,
                tglPengerjaan: data.processingDate,
                tglSelesai: data.completeDate,
                SLAPekerjaan: `${data.sla} Days`,
                BASTDigital: dataAction1.map((act) => {
                    return <a onClick={() => act.func(index + 1)}>{act.name}</a>;
                }),
                tglKirimInvoice: data.invoiceDate,
                noInvoice: data.invoiceNumber,
                tglPembayaran: data.paymentDate,
                statusPaid: data.paymentStatus,
                SLAPembayaran: `${data.slaPembayaran} Days`,
                notesDesc: data.noteDesc,
                action1: dataAction2.map((act) => {
                  return <a onClick={() => act.func(index + 1)}>{act.name}</a>;
                }),
                action2: dataAction3.map((act) => {
                    return <a onClick={() => act.func(index + 1)}>{act.name}</a>;
                  }),
              });
            });
            setDataImplementationNew(storeNew);
            setIsLoadingTable(false);
          }
        }
      } catch (error) {
        alert(`Error get data table ${error}`);
      }
      setIsLoadingTable(false);
    } catch (err) {
      alert(`Error get data table ${err}`);
      setIsLoadingTable(false);
    }
  }

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

  const handleButton = () => {
    //alert("PopUp")
    handleOpenModalUploadNew();
  };

  const handleSubmitNewOrder = () => {
    setOpenSuccessModal(true)
    setOpenModalNewOrder(false)
    setLabelSuccess('Add New Order Success')
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Task Booth</Typography>
        </Grid>
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
              setopenUploadModalNotFound(true)
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
              setOpenModalNewOrder(true)
            }}
            buttonIcon={<AddIcon />}
          />
        </Grid>
      </Grid>
      <Grid container justify="space-between" spacing={2}>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Total Order"
            keyNameA="Total Done"
            keyNameB="Total On Progress"
            valTotalSub={card1.totalDone}
            valA={card1.totalOrder}
            valB={card1.totalOnProgres}
            isLoading={isLoading1}
            icon={<ExchangeIcon />}
            colorSubTitle="#2B2F3C"
            colorValueA="#65D170"
            colorValueB="#FF6A6A"
          />
        </Grid>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Total Biaya"
            keyNameA="Biaya Jasaaaa"
            keyNameB="Biaya Barang"
            valTotalSub={card2.totalBiaya}
            valA={card2.totalBiayaJasa}
            valB={card2.totalBiayaBarang}
            isLoading={isLoading2}
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
            isLoading={isLoading3}
            icon={<ListIcon />}
            colorValueA="#65D170"
            colorValueB="#FF6A6A"
          />
        </Grid>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Total Over SLA"
            valTotalSub={card4}
            isLoading={isLoading4}
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
                  setDataFilter={setDataFilter} 
                  setCurrentPage={setCurrentPage} 
                  selectedSearch={selectedSearch}
                  setSelectedSearch={setSelectedSearch}
                  inputSearch={inputSearch}
                  setInputSearch={setInputSearch}
                  selectedKebutuhan={selectedKebutuhan}
                  setSelectedKebutuhan={setSelectedKebutuhan}/>
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
                changePage={handleChangePageValue}
                isWithCheck={false}
                isLoadData={isLoadingTable}
                sorting={handleSorting}
                isSort={true}
              />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
      {/* <FloatingChat /> */}
      {/* <ModalTambah
        isOpen={OpenModalUploadNew}
        onClose={handleCloseModalUploadNew}
        onCloseAll={setOpenModalUploadNew}
        //setLoading={setLoading}
      /> */}
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
