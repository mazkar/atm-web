/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Tab,
  Tabs,
  Typography,
  Paper,
  Link,
} from "@material-ui/core";
import * as ThemeColor from "../../../assets/theme/colors";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import { ChkySearchBar, ChkyTablePagination } from "../../../components/chky";
import Filter from "./Filter";
import ModalRemark from "../../../components/Modal/ModalRemark";
import ModalUploadFile from "./ModalUploadFile";
import ModalDraftLOI from "../../../components/Modal/ModalDraftLOI";
import ModalDraftPenghentianKerjasama from "../../../components/Modal/DraftPenghentianKerjasama";
import DraftPencabutanMesin from "../../../components/Modal/DraftPencabutanMesin";
import { ReactComponent as PaperClip } from "../../../assets/icons/siab/paperclip-red.svg";
import ModalDraftPKS from "../../../components/Modal/DraftPKS";
import Constants from "../../../helpers/constants";
import icnD from "../../../assets/icons/general/paperclip.svg";
import icn from "../../../assets/icons/general/paperclip_red.svg";
import ModalLoader from "../../../components/ModalLoader";
import { RootContext } from "../../../router";
import MenuCustom from "./MenuCustom";
import getMinioFile from "../../../helpers/getMinioFile";
import MenuCustomLoiPks from "./MenuCustomLoiPks";
import ModalAttachLoiPks from "./ModalAttachLoiPks";
import ModalPksAddendum from "../../../components/Modal/ModalPksAddendum";
import ModalDraftPksGeneral from "../../../components/Modal/ModalDraftPksGeneral";
import ModalDraftPksFreeSewa from "../../../components/Modal/ModalDraftPksFreeSewa";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  tabContent: {
    paddingTop: 10,
  },
  tableContent: { marginTop: 20 },
});
const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: ThemeColor.PrimaryHard,
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ padding: "24px 0px 0px 0px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const matchRoleName = (value) => {
  if (value) {
    const result = value.toLowerCase().match(/acknowledge/g) || [];

    if (result.length) {
      return result[0];
    } 
    return value;
    
  }
};

const handleDownloadFile = (file) => {
  getMinioFile(file).then((result) => {
    window.open(`${result.fileUrl}`);
  });
};

function DocumentLegality() {
  const { userRoleName } = useContext(RootContext);
  const classes = useStyles();
  const [loadingDataDocument, setLoadingDataDocument] = useState(false);
  const [isOpenModalRemark, setModalRemark] = useState(false);
  const [isOpenModalFileUpload, setModalFileUpload] = useState(false);
  const [isOpenModalAttachLoiPks, setIsOpenModalAttachLoiPks] = useState(false);
  
  const [loiOrPksData, setLoiOrPksData] = useState({
    siteNewAtmId: "",
    category : "",
    openType : "",
  });

  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [dataNewDocument, setDataNewDocument] = useState([]);
  const [dataRenewDocument, setDataRenewDocument] = useState([]);
  const [dataTerminDocument, setDataTerminDocument] = useState([]);
  const [dataReplaceDocument, setDataReplaceDocument] = useState([])
  const [type, setType] = useState("");
  const [atmId, setAtmId] = useState("");
  const [atmStatus, setAtmStatus] = useState("");
  const [valueSelectArea, setValueSelectArea] = useState("All");
  const [valueSelectCity, setValueSelectCity] = useState("All");
  const [location, setLocation] = useState("");
  const [selectedRow, setSelectedRow] = useState();
  const [filterTypeValue, setFilterTypeValue] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const [
    openModalDraftPenghentianKerjasama,
    setOpenModalDraftPenghentianKerjasama,
  ] = useState(false);
  const handleCloseModalDraftPenghentianKerjasama = () =>
    setOpenModalDraftPenghentianKerjasama(false);
  const [openingType, setOpeningType] = useState("New");
  const [dataHit, setDataHit] = useState({
    pageNumber: currentPage,
    dataPerPage: rowsPerPage,
  });
  const [modalLoader, setModalLoader] = useState(false);
  const history = useHistory();
  const { location : { hash } } = history;
  const isAcknowledgeUser = matchRoleName(userRoleName) === "acknowledge";

  const index = hashValues.indexOf(hash.replace('#',''));
  // console.log('~ index', index)
  const tabValue = ( index >= 0 ? index : 0);

  useEffect(() => {
    fetchData();

    setTotalPages(0);
    setTotalRows(0);
  }, [tabValue, dataHit, orderBy, orderDirection]);

  const deleteGeneratedFile = async(id, filename) => {
    if(window.confirm('Are you sure to Delete file?')){
      setModalLoader(true);
      try {
        const resDelete = await axios.post(
          `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/actionAttachDocumentDelete`,
          {
            id, 
            filename,
          }
        );
        console.log('<><> resDelete', resDelete);
        if(resDelete.status === 200){
          if(window.confirm('File deleted successfully, Reload Page?')){
            window.location.reload();
          }
        }
        setModalLoader(false);
  
      } catch (error) {
        alert('Something wrong', error);
        setModalLoader(false);
      }
    }
  };

  function fetchData(isResetFilter) {
    if (tabValue === 0) {
      hitApiNewDocument(isResetFilter);
      setOpeningType("New");
    }
    if (tabValue === 1) {
      hitApiRenewDocument(isResetFilter);
      setOpeningType("Renewal");
    }
    if (tabValue === 2) {
      hitApiTerminDocument(isResetFilter);
      setOpeningType("Termin");
    }
    if (tabValue === 3) {
      hitApiReplaceDocument(isResetFilter);
      setOpeningType("Replace");
    }
  }

  const showRemark = (id) => {
    // console.log(id);
    setSelectedRow(id);
    setModalRemark(true);
  };

  const actionAttach = (act, value) => {
    return (
      <>
        <Grid direction="row" container>
          <Grid item>
            <img src={icn} />
          </Grid>
          <Grid item>
            <Link
              style={{ color: "#DC241F", textDecoration: "none" }}
              onClick={() => uploadLoi(value)}
            >
              {act}
            </Link>
          </Grid>
        </Grid>
      </>
    );
  };

  function uploadLoi(event) {
    document.getElementById("selectFileLoi").click(event);
    setSelectedRow(event);
  }

  const handleCabutMesin = (id) => {
    setOpenModalDraftPenghentianKerjasama(true);
    setSelectedRow(id);
  };

  const handleAcknowledge = async (id) => {
    setModalLoader(true);
    try {
      const payload = {
        id,
      };
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/documentLegalityAcknowledge`,
        payload
      );
      setTimeout(() => {
        alert("Sukses Acknowledge");
      });
      window.location.reload();
    } catch (e) {
      setModalLoader(false);
      setTimeout(() => {
        alert(`Internal Server Error`, e);
      }, 100);
    }
  };

  // MODAL CREATE DRAFT PKS
  const [openModalCreateDraftPKS, setOpenModalCreateDraftPKS] = useState(false);
  const handleOpenModalCreateDraftPKS = () => setOpenModalCreateDraftPKS(true);
  const handleCloseModalCreateDraftPKS = () =>
    setOpenModalCreateDraftPKS(false);
  const handleCreateDraftPKS = (id) => {
    // setSelectedRow(val[0].value);
    setSelectedRow(id);
    handleOpenModalCreateDraftPKS();
    // console.log(val[0].value);
  };

  // PKS FREE

  const [openModalCreatePksFree, setOpenModalCreatePksFree] = useState(false);
  const handleModalCreatePksFree = (bool) => setOpenModalCreatePksFree(bool);
  const handleCreatePksFree = (id) => {
    // setSelectedRow(val[0].value);
    setSelectedRow(id);
    handleModalCreatePksFree(true);
    // console.log(val[0].value);
  };
  // END DRAFT PKS

  // MODAL CREATE DRAFT PKS ADDENDUM
  const [openModalCreatePksAddendum, setOpenModalCreatePksAddendum] = useState(false);
  const handleModalCreatePksAddendum = (bool) => setOpenModalCreatePksAddendum(bool);
  const handleCreatePksAddendum = (id) => {
    // setSelectedRow(val[0].value);
    setSelectedRow(id);
    handleModalCreatePksAddendum(true);
    // console.log(val[0].value);
  };
  // END DRAFT PKS ADDENDUM

  // MODAL CREATE DRAFT LOI
  const [openModalCreateDraftLOI, setOpenModalCreateDraftLOI] = useState(false);
  const handleOpenModalCreateDraftLOI = () => setOpenModalCreateDraftLOI(true);
  const handleCloseModalCreateDraftLOI = () =>
    setOpenModalCreateDraftLOI(false);
  const handleCreateDraftLOI = (id) => {
    // setSelectedRow(val[0].value);
    setSelectedRow(id);
    handleOpenModalCreateDraftLOI();
    // console.log(val[0].step);
  };
  // END DRAFT LOI
  // MODAL CREATE DRAFT LOI Renewal
  const [
    openModalCreateDraftLOIRenewal,
    setOpenModalCreateDraftLOIRenewal,
  ] = useState(false);
  const handleOpenModalCreateDraftLOIRenewal = () =>
    setOpenModalCreateDraftLOIRenewal(true);
  const handleCloseModalCreateDraftLOIRenewal = () =>
    setOpenModalCreateDraftLOIRenewal(false);
  const handleCreateDraftLOIRenewal = (id) => {
    setSelectedRow(id);
    handleOpenModalCreateDraftLOIRenewal();
    // console.log(data.status);
    // window.location.assign( /id)
  };
  // END DRAFT LOI Renew

  // HANDLER MODAL ATTACH LOI/PKS
  const handleAttatchLoiorPks=(siteNewAtmId, category, openType)=>{
    setLoiOrPksData({
      siteNewAtmId,
      category,
      openType,
    });
    setIsOpenModalAttachLoiPks(true);
  };

  const hitApiNewDocument = async (isResetFilter) => {
    setLoadingDataDocument(true);
    try {
      const payload = {
        pageNumber: dataHit.pageNumber,
        dataPerPage: dataHit.dataPerPage,
        areaId: valueSelectArea,
        cityId: valueSelectCity,
        location,
        type: filterTypeValue,
        status: filterStatus,
        ...(isResetFilter && defaultFilter),
        ...(orderBy && {orderBy, orderDirection})
      };
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getNewDocumentLegality`,
        payload
      );

      // console.log("DATA NEW : ", result);
      const newData = [];
      for (let i = 0; i < result.data.content.length; i++) {
        const row = result.data.content[i]
        const actionUploadPerorangan = [
          {
            name: renderAttachFile(),
            id: row.id,
            data: row.type,
            status: row.status,
            funct: handleShowModalFileUpload,
          },
        ];
        
        // ===> Start INIT MENU ITEMS
        const menuItems = [
          {name: "Detail", type: "detail", 
            handler: () => history.push(`/site-management/document-legality/detail/${row.id}`)
          },
        ];
        if(row.loiPath){
          // console.log(`>>> Download File ${row.loiPath}`);
          menuItems.push(
            {name: "File Surat Kesepakatan Harga", type: "file", 
              isDownload: true, 
              isSigned: row.loiSignedStatus,
              handler: () => handleDownloadFile(row.loiPath),
              handlerIcon: () => deleteGeneratedFile(row.id, row.loiPath),
            });
        }else{
          menuItems.push({
            name: "Create LOI",
            nameSecond: "Attach File", 
            type: "file", 
            isDoubleAction: true,
            handler: () => handleCreateDraftLOI(row.id),
            handlerSecond: () => handleAttatchLoiorPks(row.id,"LOI","New"),
          });
        }
        if(row.pksPath){
          // console.log(`>>> Download File ${row.pksPath}`);
          menuItems.push(
            {name: "File Draft PKS", type: "file", 
              isDownload: true,
              isSigned: row.pksSignedStatus,
              handler: () => handleDownloadFile(row.pksPath),
              handlerIcon: () => deleteGeneratedFile(row.id, row.pksPath),
            });
        }else{
          const tipePksFree = row.tipePks === "FreeRent";
          menuItems.push(
            {
              name: "Create PKS",
              nameSecond: "Attach File", 
              type: "file", 
              isDoubleAction: true,
              handler: () => tipePksFree ? handleCreatePksFree(row.id) : handleCreateDraftPKS(row.id),
              handlerSecond: () => handleAttatchLoiorPks(row.id,"PKS","New"),
            });
        }
        // Menu Remark
        menuItems.push(
          {name: "Remark", type: "edit", 
            handler: () => showRemark(row.id)
          });
        // // Menu Acknowladge
        // if(isAcknowledgeUser){
        //   menuItems.push(
        //     {name: "Acknowledge", type: "acknowledge", 
        //       handler: () => handleAcknowledge(row.id)
        //     });
        // }
        // ===> END MENU ITEMS 
        newData.push({
          atmId: row.requestId,
          location: row.locationName,
          type: row.type,
          legalityCount: `${row.legality}/${row.legalityTotal}`,
          draftPKS: `${row.draftPks}/${row.draftPksTotal}`,
          invoice: `${row.rentInvoice}/${row.rentInvoiceTotal}`,
          bukpot: `${row.bukpot}/${row.bukpotTotal}`,
          pks: `${row.pks}/${row.pksTotal}`,
          suratLandlord: `${row.suratIzinLandlord}/${row.suratIzinLandlordTotal}`,
          status: row.status,
          actUpload: actionUploadPerorangan,
          // action: actionDetails,
          menu: <MenuCustomLoiPks remarkCount={row.remarkCount} menuItems={menuItems}/>
        });
      }
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
      setDataNewDocument(newData);
      setLoadingDataDocument(false);
    } catch (error) {
      setLoadingDataDocument(false);
      setTimeout(() => {
        alert(`Terjadi Kesalahan`, error);
      }, 100);
    }
  };

  const hitApiRenewDocument = async (isResetFilter) => {
    setLoadingDataDocument(true);

    try {
      const payload = {
        pageNumber: dataHit.pageNumber,
        dataPerPage: dataHit.dataPerPage,
        areaId: valueSelectArea,
        cityId: valueSelectCity,
        location,
        type: filterTypeValue,
        status: filterStatus,
        ...(isResetFilter && defaultFilter),
        ...(orderBy && {orderBy, orderDirection})
      };
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getRenewalDocumentLegality`,
        payload
      );

      const newData = [];
      for (let i = 0; i < result.data.content.length; i++) {
        const actionUploadPerorangan = [
          {
            name: renderAttachFile(),
            id: result.data.content[i].id,
            status: result.data.content[i].status,
            funct: handleShowModalFileUpload,
          },
        ];

        const attachFile = actionAttach(
          "Attach LOI",
          result.data.content[i].id
        );

        // ===> Start INIT MENU ITEMS
        const menuItems = [
          {name: "Detail", type: "detail", 
            handler: () => history.push(`/site-management/document-legality/detail/${result.data.content[i].id}`)
          },
          {name: "Remark", type: "edit", 
            handler: () => showRemark(result.data.content[i].id)
          }
        ];
        if(result.data.content[i].loiPath){
          // console.log(`>>> Download File ${result.data.content[i].loiPath}`);
          menuItems.push(
            {name: "File Surat Kesepakatan Harga", type: "file", 
              isDownload: true,
              isSigned: result.data.content[i].loiSignedStatus,
              handler: () => handleDownloadFile(result.data.content[i].loiPath),
              handlerIcon: () => deleteGeneratedFile(result.data.content[i].id, result.data.content[i].loiPath),
            });
        }else{
          menuItems.push(
            {
              name: "Create LOI",
              nameSecond: "Attach File", 
              type: "file", 
              isDoubleAction: true,
              handler: () => handleCreateDraftLOIRenewal(result.data.content[i].id),
              handlerSecond: () => handleAttatchLoiorPks(result.data.content[i].id,"LOI","Renew"),
            });
        }
        if(result.data.content[i].pksPath){
          // console.log(`>>> Download File ${row.pksPath}`);
          menuItems.push(
            {name: "File Draft PKS", type: "file", 
              isDownload: true,
              isSigned: result.data.content[i].pksSignedStatus,
              handler: () => handleDownloadFile(result.data.content[i].pksPath),
              handlerIcon: () => deleteGeneratedFile(result.data.content[i].id, result.data.content[i].pksPath),
            });
        }else{
          const tipePksFree = result.data.content[i].tipePks === "FreeRent";
          menuItems.push(
            {
              name: "Create PKS",
              nameSecond: "Attach File", 
              type: "file", 
              isDoubleAction: true,
              handler: () => tipePksFree ? handleCreatePksFree(result.data.content[i].id) : handleCreateDraftPKS(result.data.content[i].id),
              handlerSecond: () => handleAttatchLoiorPks(result.data.content[i].id,"PKS","Renewal"),
            });
        }
        if(result.data.content[i].pksAddendumPath){
          // console.log(`>>> Download File ${row.pksPath}`);
          menuItems.push(
            {name: "File Draft PKS Addendum", type: "file", 
              isDownload: true,
              isSigned: result.data.content[i].pksSignedStatus,
              handler: () => handleDownloadFile(result.data.content[i].pksAddendumPath),
              handlerIcon: () => deleteGeneratedFile(result.data.content[i].id, result.data.content[i].pksAddendumPath),
            });
        }else{
          menuItems.push(
            {
              name: "Create PKS Addendum",
              nameSecond: "Attach File", 
              type: "file", 
              isDoubleAction: true,
              handler: () => handleCreatePksAddendum(result.data.content[i].id),
              handlerSecond: () => handleAttatchLoiorPks(result.data.content[i].id,"PKS Addendum","Renewal"),
            });
        }
        // // Menu Acknowladge
        // if(isAcknowledgeUser){
        //   menuItems.push(
        //     {name: "Acknowledge", type: "acknowledge", 
        //       handler: () => handleAcknowledge(result.data.content[i].id)
        //     });
        // }
        // ===> END MENU ITEMS 

        newData.push({
          atmId: result.data.content[i].atmId,
          location: result.data.content[i].locationName,
          jumlah: `${result.data.content[i].type}`,
          legalityCount: `${result.data.content[i].legality}/${result.data.content[i].legalityTotal}`,
          draftFinalPKS: `${result.data.content[i].draftPks}/${result.data.content[i].draftPksTotal}`,
          pks: `${result.data.content[i].pks}/${result.data.content[i].pksTotal}`,
          invoice1: `${result.data.content[i].rentInvoice}/${result.data.content[i].rentInvoiceTotal}`,
          bukpot: `${result.data.content[i].bukpot}/${result.data.content[i].bukpotTotal}`,
          filling: `${result.data.content[i].filling}/${result.data.content[i].fillingTotal}`,
          status: result.data.content[i].status,
          actUpload: actionUploadPerorangan,
          // attachFile,
          // action: actionDetailsRe,
          menu: <MenuCustomLoiPks remarkCount={result.data.content[i].remarkCount} menuItems={menuItems}/>
        });
      }
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
      setDataRenewDocument(newData);
      setLoadingDataDocument(false);
    } catch (error) {
      setLoadingDataDocument(false);
      setTimeout(() => {
        alert(`Internal Server Error`);
      }, 100);
    }
  };

  const hitApiTerminDocument = async (isResetFilter) => {
    setLoadingDataDocument(true);
    try {
      const payload = {
        pageNumber: dataHit.pageNumber,
        dataPerPage: dataHit.dataPerPage,
        areaId: valueSelectArea,
        cityId: valueSelectCity,
        location,
        type: filterTypeValue,
        status: filterStatus,
        ...(isResetFilter && defaultFilter),
        ...(orderBy && {orderBy, orderDirection})
      };
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getTerminDocumentLegality`,
        payload
      );

      const newData = [];
      for (let i = 0; i < result.data.content.length; i++) {
        const actionUploadPerorangan = [
          {
            name: renderAttachFile(),
            id: result.data.content[i].id,
            status: result.data.content[i].status,
            funct: handleShowModalFileUpload,
          },
        ];

        // ===> Start INIT MENU ITEMS
        const menuItems = [
          {name: "Detail", type: "detail", 
            handler: () => history.push(`/site-management/document-legality/detail/${result.data.content[i].id}`)
          },
          {name: "Remark", type: "edit", 
            handler: () => showRemark(result.data.content[i].id)
          }
        ];
        if(result.data.content[i].terminPath){
          menuItems.push(
            {name: "File Surat Pemberhentian Sewa", type: "file", isDownload: true,
              handler: () => handleDownloadFile(result.data.content[i].terminPath),
              handlerIcon: () => deleteGeneratedFile(result.data.content[i].id, result.data.content[i].terminPath),
            });
        }else{
          menuItems.push(
            {name: "Surat Termin", type: "file", 
              handler: () => handleCabutMesin(result.data.content[i].id)
            });
        }
        if(result.data.content[i].terminRevocationPath){
          menuItems.push(
            {name: "File Surat Izin Penarikan Mesin", type: "file", isDownload: true,
              handler: () => handleDownloadFile(result.data.content[i].terminRevocationPath),
              handlerIcon: () => deleteGeneratedFile(result.data.content[i].id, result.data.content[i].terminRevocationPath),
            });
        }
          
        // ===> END MENU ITEMS 

        const attachFile = actionAttach(
          "Attach LOI",
          result.data.content[i].id
        );

        newData.push({
          atmId: result.data.content[i].atmId,
          location: result.data.content[i].locationName,
          jumlah: `${result.data.content[i].type}`,
          legalitas: `${result.data.content[i].legality}/${result.data.content[i].legalityTotal}`,
          draftFinalPKS: `${result.data.content[i].draftPks}/${result.data.content[i].draftPksTotal}`,
          suratIzinLandlord: `${result.data.content[i].suratIzinLandlord}/${result.data.content[i].suratIzinLandlordTotal}`,
          securityDeposit: `${result.data.content[i].securityDeposit}/${result.data.content[i].securityDepositTotal}`,
          status: result.data.content[i].status,
          actUpload: actionUploadPerorangan,
          // attachFile,
          // action: actionDetailsRe,
          menu: <MenuCustom remarkCount={result.data.content[i].remarkCount} menuItems={menuItems}/>,
        });
      }
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
      setDataTerminDocument(newData);
      setLoadingDataDocument(false);
    } catch (error) {
      setLoadingDataDocument(false);
      setTimeout(() => {
        alert(`Internal Server Error`);
      }, 100);
    }
  };

  const hitApiReplaceDocument = async (isResetFilter) => {
    setLoadingDataDocument(true);
    try {
      const payload = {
        pageNumber: dataHit.pageNumber,
        dataPerPage: dataHit.dataPerPage,
        areaId: valueSelectArea,
        cityId: valueSelectCity,
        location,
        type: filterTypeValue,
        status: filterStatus,
        ...(isResetFilter && defaultFilter),
        ...(orderBy && {orderBy, orderDirection})
      };
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getReplaceDocumentLegality`,
        payload
      );

      const newData = [];
      for (let i = 0; i < result.data.content.length; i++) {

        const val = result.data.content[i]

        const actionUploadPerorangan = [
          {
            name: renderAttachFile(),
            id: val.id,
            status: val.status,
            funct: handleShowModalFileUpload,
          },
        ];

        // ===> Start INIT MENU ITEMS
        const menuItems = [
          {name: "Detail", type: "detail", 
            handler: () => history.push(`/site-management/document-legality/detail/${val.id}`)
          },
          {name: "Remark", type: "edit", 
            handler: () => showRemark(val.id)
          }
        ];
          
        // ===> END MENU ITEMS 

        newData.push({
          atmId: val.atmId || val.oldAtmId,
          location: val.locationName,
          type: `${val.type}`,
          suratIzinLandlord: `${val.suratIzinLandlord}/${val.suratIzinLandlordTotal}`,
          status: val.status,
          actUpload: actionUploadPerorangan,
          menu: <MenuCustom remarkCount={val.remarkCount} menuItems={menuItems}/>,
        });
      }
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
      setDataReplaceDocument(newData);
      setLoadingDataDocument(false);
    } catch (error) {
      setLoadingDataDocument(false);
      setTimeout(() => {
        alert(`Internal Server Error`);
      }, 100);
    }
  };

  const handleOpenModalUpload = () => {
    setModalFileUpload(false);
  };

  const handleCloseModalFileUpload = () => {
    setModalFileUpload(false);
    setType("");
    setAtmStatus("");
  };

  const handleOpenModalDraftPKS = () => {
    setModalFileUpload(false);
  };

  function handleKeyword(e) {
    const {value} = e.target;
    setLocation(value);
  }

  const handleChange = (event, newTabValue) => {
    event.preventDefault();
    history.push(`#${hashValues[newTabValue]}`);
  };

  useEffect(() => {
    setCurrentPage(0);
    setDataHit({
      pageNumber: 0,
      dataPerPage: rowsPerPage,
    });
    setOrderBy(null);
    setSortBy(null);
    setOrderDirection('ASC');
    // console.log('~ hash', hash)
  }, [hash]);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
    setDataHit({
      pageNumber: newPage,
      dataPerPage: rowsPerPage,
    });
  };

  const handleCloseRemark = () => setModalRemark(false);

  const handleFilter = () => {
    setDataHit({
      pageNumber: 0,
      dataPerPage: rowsPerPage,
    });
    setResetPageCounter((i) => i + 1);
    // fetchData();
  };

  function handleReset() {
    setDataHit({
      pageNumber: 0,
      dataPerPage: rowsPerPage,
    });
    setResetPageCounter((i) => i + 1);
    fetchData(true);
  }

  const handleShowModalFileUpload = (id, data, status) => {
    setModalFileUpload(true);
    setAtmId(id);
    setType(data);
    setSelectedRow(id);
    setAtmStatus(status);
  };

  const handleRemarkUpload = (id) => {
    setModalFileUpload(false);
    setModalRemark(true);
  };

  const renderAttachFile = () => {
    return (
      <>
        <PaperClip /> Attach Document{" "}
      </>
    );
  };

  function fileSelectLoi(e) {
    // console.log("select file", e);
    const loiFile = e.target.files[0];
    // setFileLoi(loiFile);
    // console.log("ini persiapan upload LOI", selectedRow);
    const formData = new FormData();
    formData.append("file", loiFile);
    formData.append("id", selectedRow);
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/attachLoiRenewal`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
        window.location.assign("/rbb-implementation#Renewal");
      })
      .catch((error) => {
        // console.log("failed to upload file LOI", error);
        alert("failed to upload File LOI");
      });
  }

  // MODAL Draft Pencabutan Mesin
  const [
    openModalDraftPencabutanMesin,
    setOpenModalDraftPencabutanMesin,
  ] = useState(false);
  const handleCloseModalDraftPencabutanMesin = () =>
    setOpenModalDraftPencabutanMesin(false);
  const handleMassageTerm = () => setOpenModalDraftPencabutanMesin(true);

  function handleSaveDraftTermin() {
    handleCloseModalDraftPenghentianKerjasama();
    setTimeout(() => {
      handleMassageTerm();
    }, 200);
  }

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      const {titleArr, colNameArr} = sortArray[tabValue];
      const colNumber = titleArr.indexOf(property);
      const columnName = colNameArr[colNumber];
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnName);
      setCurrentPage(0);
    };
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Document &amp; Legality</Typography>
        </Grid>
      </Grid>

      <div className={classes.container}>
        <Filter
          onFilterSubmit={handleFilter}
          handleReset={handleReset}
          onChangeChky={handleKeyword}
          location={location}
          setLocation={setLocation}
          valueSelectArea={valueSelectArea}
          setValueSelectArea={setValueSelectArea}
          valueSelectCity={valueSelectCity}
          setValueSelectCity={setValueSelectCity}
          type={filterTypeValue}
          setType={setFilterTypeValue}
          status={filterStatus}
          setStatus={setFilterStatus}
          openingType={openingType}
        />

        <div className={classes.panelTab}>
          <ContentTabs
            value={tabValue}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <ContentTab label="New" {...a11yProps(0)} />
            <ContentTab label="Renewal" {...a11yProps(1)} />
            <ContentTab label="Termin" {...a11yProps(2)} />
            <ContentTab label="Replace" {...a11yProps(3)} />
          </ContentTabs>
          <TabPanel value={tabValue} index={0}>
            <ChkyTablePagination
              data={dataNewDocument}
              fields={titleTable}
              cellOption={valueType}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              changePage={handleChangePage}
              isLoadData={loadingDataDocument}
              leftAlignBody={[1]}
              isSort={isSortNew}
              isUsingMuiSort
              handleSort={handleSort}
              sortBy={sortBy}
              order={orderDirection}
              resetPageCounter={resetPageCounter}
            />
          </TabPanel>
        </div>
        <TabPanel value={tabValue} index={1}>
          <ChkyTablePagination
            data={dataRenewDocument}
            fields={titleRenewal}
            cellOption={valueRenewal}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePage}
            isLoadData={loadingDataDocument}
            leftAlignBody={[1]}
            isSort={isSortRenewal}
            isUsingMuiSort
            handleSort={handleSort}
            sortBy={sortBy}
            order={orderDirection}
            resetPageCounter={resetPageCounter}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ChkyTablePagination
            data={dataTerminDocument}
            fields={titleTermin}
            cellOption={valueTermin}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePage}
            isLoadData={loadingDataDocument}
            leftAlignBody={[1]}
            isSort={isSortTermin}
            isUsingMuiSort
            handleSort={handleSort}
            sortBy={sortBy}
            order={orderDirection}
            resetPageCounter={resetPageCounter}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <ChkyTablePagination
            data={dataReplaceDocument}
            fields={titleReplace}
            cellOption={valueReplace}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePage}
            isLoadData={loadingDataDocument}
            leftAlignBody={[1]}
          />
        </TabPanel>
      </div>
      {/* <FloatingChat /> */}
      {isOpenModalRemark && (
        <ModalRemark
          isOpen={isOpenModalRemark}
          onClose={handleCloseRemark}
          onLeave={handleCloseRemark}
          rowToShow={selectedRow}
          type={openingType}
          rType="DOCUMENT_LEGALITY_REMARK"
        />
      )}
      <ModalUploadFile
        isOpen={isOpenModalFileUpload}
        type={type}
        atmId={atmId}
        onClose={handleCloseModalFileUpload}
        onRemark={handleRemarkUpload}
        onUpload={handleOpenModalUpload}
        onDraftPKS={handleOpenModalDraftPKS}
        setModalLoader={setModalLoader}
        isAcknowledgeUser={isAcknowledgeUser}
        confirmAction={()=>handleAcknowledge(atmId)}
        atmStatus={atmStatus}
      />

      {/* {openModalCreateDraftPKS && (
        <ModalDraftPKS
          // Surat PKS
          isOpen={openModalCreateDraftPKS}
          handleClose={handleCloseModalCreateDraftPKS}
          onLeave={() => {
            handleCloseModalCreateDraftPKS();
          }}
          rowToShow={selectedRow}
        />
      )} */}
      <ModalDraftPksGeneral
        isOpen={openModalCreateDraftPKS}
        handleClose={handleCloseModalCreateDraftPKS}
        onLeave={() => {
          handleCloseModalCreateDraftPKS();
        }}
        rowToShow={selectedRow}
      />
      
      <ModalDraftPksFreeSewa
        isOpen={openModalCreatePksFree}
        handleClose={()=>handleModalCreatePksFree(false)}
        onLeave={() => {
          handleModalCreatePksFree(false);
        }}
        rowToShow={selectedRow}
      />
      <ModalPksAddendum
        // Surat PKS Addendum
        isOpen={openModalCreatePksAddendum}
        handleClose={()=>handleModalCreatePksAddendum(false)}
        onLeave={() => {
          handleModalCreatePksAddendum(false);
        }}
        rowToShow={selectedRow}
      />

      <ModalDraftLOI
        isOpen={openModalCreateDraftLOI}
        onClose={handleCloseModalCreateDraftLOI}
        onLeave={() => {
          handleCloseModalCreateDraftLOI();
        }}
        rowToShow={selectedRow}
        type="new"
      />
      <ModalDraftLOI
        isOpen={openModalCreateDraftLOIRenewal}
        onClose={handleCloseModalCreateDraftLOIRenewal}
        onLeave={() => {
          handleCloseModalCreateDraftLOIRenewal();
        }}
        rowToShow={selectedRow}
        type="renewal"
      />
      {openModalDraftPenghentianKerjasama && (
        <ModalDraftPenghentianKerjasama
          isOpen={openModalDraftPenghentianKerjasama}
          onClose={handleCloseModalDraftPenghentianKerjasama}
          rowToShow={selectedRow}
          handleSave={handleSaveDraftTermin}
        />
      )}
      {openModalDraftPencabutanMesin && (
        <DraftPencabutanMesin
          isOpen={openModalDraftPencabutanMesin}
          onClose={handleCloseModalDraftPencabutanMesin}
          rowToShow={selectedRow}
          setModalLoader={setModalLoader}
        />
      )}
      <ModalAttachLoiPks
        loiOrPksData={loiOrPksData}
        isOpen={isOpenModalAttachLoiPks}
        onClose={()=>{setIsOpenModalAttachLoiPks(false);}}
        rowToShow={selectedRow}
      />
      <ModalLoader isOpen={modalLoader} />
      <input id="selectFileLoi" hidden type="file" onChange={fileSelectLoi} />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(DocumentLegality))
);

const defaultFilter = {
  areaId: "All",
  cityId: "All",
  location: "",
  type: 'All',
  status: 'All'
};

const hashValues = ["new", "renewal", "termin", "replace"];

const titleTable = [
  "ID Requester",
  "Lokasi",
  "Type",
  "Jumlah Legalitas",
  "Draft Final PKS",
  "Invoice Sewa",
  "Bukpot",
  "PKS",
  "Surat Izin Landlord",
  "Status",
];
const valueType = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "status_legality",
  "modal",
  // isAcknowledgeUser ? "menu_fifth" : "menu_four",
  "child",
];
const titleRenewal = [
  "ATM ID",
  "Lokasi",
  "Type",
  "Jumlah Legalitas",
  "Draft Final PKS",
  'PKS',
  "Invoice Sewa",
  "Bukpot",
  "Filling",
  "Status",
  "",
  // "",
  "",
];
const valueRenewal = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "status_legality",
  "modal",
  // "child",
  "child",
];
const titleTermin = [
  "ATM ID",
  "Lokasi",
  "Type",
  "Jumlah Legalitas",
  "PKS Pengakhiran Sewa",
  "Surat Izin Landlord",
  "Security Deposit",
  "Status",
  "",
  // "",
  "",
];
const valueTermin = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "status_legality",
  "modal",
  "child",
  // isAcknowledgeUser ? "menu_fifth" : "menu_four",
];
const titleReplace = [
  "ATM ID",
  "Lokasi",
  "Type",
  "Surat Izin Landlord",
  "Status",
  "",
  "",
];
const valueReplace = [
  "string",
  "string",
  "string",
  "string",
  "status_legality",
  "modal",
  "child",
];

const isSortNew = [true, true, true, true, true, true, true, true, true, true, true, true];
const isSortRenewal = [true, true, true, true, true, true, true, true, true,];
const isSortTermin = [true, true, true, false, false, false, false, true,];
const isSortReplace = [];

const columnNameVarNew = [
  'atmId',
  'locationName',
  'type',
  'legalityTotal',
  'draftPksTotal',
  'rentInvoiceTotal',
  'bukpotTotal',
  'pksTotal',
  'suratIzinLandlordTotal',
  'status',
];

const columnNameVarRenewal = [
  'atmId',
  'locationName',
  'type',
  'legalityTotal',
  'draftPksTotal',
  'pks',
  'rentInvoiceTotal',
  'bukpotTotal',
  'fillingTotal',
  'status',
];

const columnNameVarTermin = [
  'atmId',
  'locationName',
  'type',
  'legalityTotal',
  'draftPksTotal',
  'suratIzinLandlordTotal',
  'securityDepositTotal',
  'status',
];

const columnNameVarReplace = [];

const sortArray = [
  {titleArr: titleTable, colNameArr: columnNameVarNew},
  {titleArr: titleRenewal, colNameArr: columnNameVarRenewal},
  {titleArr: titleTermin, colNameArr: columnNameVarTermin},
  {titleArr: titleReplace, colNameArr: columnNameVarReplace},
];