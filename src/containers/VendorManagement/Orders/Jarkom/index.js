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
import ModalTambah from "../../ModalTambah";
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { TableCheckPagination } from "../../../../components";
import PaperImplementOverview from "../common/CardFrame";
import { thousandFormat, percentageFormatter } from "../../../../helpers/useFormatter";
import { ReactComponent as ExchangeIcon }from '../../../../assets/icons/duotone-red/exchange-alt.svg';
import { ReactComponent as PlusWhite } from '../../../../assets/icons/siab/plus-white.svg';
import { ReactComponent as TagIcon } from "../../../../assets/icons/duotone-red/tag.svg";
import { ReactComponent as ListIcon } from "../../../../assets/icons/duotone-red/list-alt.svg";
import IconKebutuhan from '../../../../assets/icons/duotone-others/exchange-alt.svg';
import IconCek from "../../../../assets/icons/duotone-others/check-circle-2nd.svg";
import IconClose from "../../../../assets/icons/duotone-others/times-circle.svg";
import { ReactComponent as IconCalendar } from "../../../../assets/icons/duotone-red/calendar-day.svg";
import {useDispatch, useSelector} from "../../../../helpers/Utils/react-redux-hook";
import AddIcon from '@material-ui/icons/Add';
import {ReactComponent as UploadIcon} from '../../../../assets/icons/linear-red/upload.svg';
import constansts from "../../../../helpers/constants";
import UploadInvoiceNotFound from "../common/PopUp/uploadInvoiceNotFound";
import AddNewOrderPopUp from "../common/PopUp/addNewOrder";
import SuccessPopUp from "../common/PopUp/successPopUp";


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
  const implementationTable = useSelector((state) => state.implementationTable);

  // POPUP TAMBAH
  const [OpenModalUploadNew, setOpenModalUploadNew] = React.useState(false);
  const handleOpenModalUploadNew = () => setOpenModalUploadNew(true);
  const handleCloseModalUploadNew = () => setOpenModalUploadNew(false);

  // GET USER ID
  const { userId } = useContext(RootContext);

  // INIT LOADING
  const [isLoading, setIsLoading] = useState(true);

  // INIT SUMMARY
  const [summaryNew, setSummaryNew] = useState({});

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
    window.location.assign(`/implementation/vendor/main-jarkom/bast-digital/${id}`)
  };
  const actionPerpanjangan = (id) => {
    alert(`Perpanjangan ${id}`)
    //window.location.assign(`/implementation/vendor/main-list-booth/penawaran-harga/${id}`)
  };
  const actionDetail = (id) => {
    //alert(`(${id}) Go to Order Detail`)
    window.location.assign(`/implementation/vendor/main-jarkom/order-detail/${id}`)
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
    //{ id: "action1", numeric: false, disablePadding: false, label: "" },
    { id: "action2", numeric: false, disablePadding: false, label: "" },
  ];

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
  function getResponse(){
    let response = implementationTable.data,
     totalData, totalPage,
     storeNew = []

    if (response.content !== undefined) {
      if (response.content.implementationNew !== undefined) {
        totalData = response.content.implementationNew.length;
        totalPage = Math.ceil(totalData / rowsPerPage);
        setTotalRows(totalData);
        setTotalPages(totalPage);
        response.content.implementationNew.map((data, index) => {
          storeNew.push({
            id: index + 1,
            noTicket: "A-11341",
            tglRequest: "12/11/2020",
            userReq: "Deden",
            iDLoc: "1123",
            namaLokasi: "JKT. SPBU CIPAYUNG",
            alamat: "Cipayung",
            area: "Jakarta Barat",
            city: "Jakarta",
            latLong: "7.591860 - 110.384033",
            IDMesin: "A001",
            jenisPekerjaan: "Bangunan Baru",
            namaVendor: "Trias",
            biayaBarang: "Rp. 5.000.000",
            biayaJasa: "Rp. 5.000.000",
            totalBiaya: "Rp. 5.000.000",
            totalBiayaPPN: "Rp. 5.000.000",
            approver: ["DH", "TS", "BA"],
            statusApproval: "2",
            tglApproved: "01-06-2021",
            tglPengerjaan: "01-06-2021",
            tglSelesai: "01-06-2021",
            SLAPekerjaan: "14 Days",
            BASTDigital: dataAction1.map((act) => {
                return <a onClick={() => act.func(index + 1)}>{act.name}</a>;
            }),
            tglKirimInvoice: "01-08-2021",
            noInvoice: "121342",
            tglPembayaran: "01-08-2021",
            statusPaid: "Paid",
            SLAPembayaran: "14 Days",
            notesDesc: "Butuh persetujuan",
            // action1: dataAction2.map((act) => {
            //   return <a onClick={() => act.func(index + 1)}>{act.name}</a>;
            // }),
            action2: dataAction3.map((act) => {
                return <a onClick={() => act.func(index + 1)}>{act.name}</a>;
              }),
          });
        });
        setDataImplementationNew(storeNew);
        setIsLoading(false);
      }
    }
  }

  useEffect(()=>{getResponse()},[implementationTable])

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
          <Typography className={classes.title}>Task Jarkom</Typography>
        </Grid>
        <Grid item>
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
      <Grid container 
      justify="space-between" 
      spacing={2}>
        <Grid item xs={2.5}>
          <PaperImplementOverview
            title='Total Request' value='12.234' valueColor='#2B2F3C' leftIcon={IconKebutuhan}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={2.5}>
          <PaperImplementOverview
            title='Total Done' value='12.234' valueColor='#65D170' leftIcon={IconCek}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={2.5}>
          <PaperImplementOverview
            title='Total Undone' value='12.234' valueColor='#FF6A6A' leftIcon={IconClose}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={2.5}>
          <PaperImplementOverview
            title='Total Met SLA' value='12.234' valueColor='#65D170' leftIcon={IconCek}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={2.5}>
          <PaperImplementOverview
            title='Total Not Met SLA' value='12.234' valueColor='#FF6A6A' leftIcon={IconClose}
            isLoading={isLoading}
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
                isLoadData={isLoading}
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
