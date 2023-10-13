/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Box, Grid, Typography, Tabs, Tab } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import axios from 'axios';
import qs from 'qs';
import { ReactComponent as UploadIcon } from "../../../assets/icons/whiteIcons/upload.svg";
import { ReactComponent as UploadCloud } from "../../../assets/icons/siab/upload-cloud.svg";
import { RootContext } from '../../../router';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import Filter from './Filter';
import MuiIconLabelButton from '../../../components/Button/MuiIconLabelButton';
import { ChkyDownloadButton, TableCheckPagination } from '../../../components';
import { useDispatch, useSelector } from '../../../helpers/Utils/react-redux-hook';
import constansts from '../../../helpers/constants';
import UploadInvoiceNotFound from '../vendor/common/PopUp/uploadInvoiceNotFound';
import AddNewOrderPopUp from '../vendor/common/PopUp/addNewOrder';
import SuccessPopUp from '../vendor/common/PopUp/successPopUp';
import ModalLoader from '../../../components/ModalLoader';
import UploadModal from "./PopUpUpload";

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: 500,
    fontSize: 36,
    color: '#2B2F3C',
  },
  titleContainer: {
    marginBottom: 25,
  },
  tabContent: {
    paddingTop: 10,
    '& .MuiBox-root': {
      padding: 0,
    },
  },
  tableContent: {
    marginTop: 20,
  },
  containerPaper: {
    backgroundColor: constansts.color.white,
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
    fontWeight: 'bold',
  },
  text12Italic: {
    fontSize: 12,
    fontWeight: 400,
    fontStyle: 'italic',
  },
  filterContainer: { marginBottom: 15 },
  paramButton: {
    width: 'max-content',
    color: constansts.color.primaryHard,
    backgroundColor: 'white',
    height: 40,
    marginRight: 10,
    border: '1px solid',
    borderColor: constansts.color.primaryHard,
    borderRadius: 10,
    textTransform: 'capitalize',
  },
});
const rowsPerPage = 10;
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};

// DEFAULT EXPORT
const Main = () => {
  const classes = useStyles();
  const history = useHistory();

  // GET USER ID
  const { userId } = useContext(RootContext);

  // INIT LOADING
  const [isLoading, setIsLoading] = useState(true);

  // INIT TABLE
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [openUploadModalNotFound, setopenUploadModalNotFound] = useState(false);
  const [openModalNewOrder, setOpenModalNewOrder] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [labelSuccess, setLabelSuccess] = useState('');

  // Modal Upload
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const handleOpenModalUpload = () => setOpenModalUpload(true);
  const handleCloseModalUpload = () => setOpenModalUpload(false);


  // INIT DATA REQUEST
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  // check url hash
  useEffect(() => {
    getResponse();
  }, [dataRequest]);

  const [dataRollout, setDataRollout] = useState([]);

  const dataInvoice = [
    { id: 1, noInvoice: 'A234958' },
    { id: 2, noInvoice: 'A234958' },
    { id: 3, noInvoice: 'A234958' },
    { id: 4, noInvoice: 'A234958' },
    { id: 5, noInvoice: 'A234958' },
    { id: 6, noInvoice: 'A234958' },
    { id: 7, noInvoice: 'A234958' },
    { id: 8, noInvoice: 'A234958' },
  ];

  const titleTableNew = [
    { id: 'atmId', numeric: false, disablePadding: false, label: 'ID ATM' },
    { id: 'lokasi', numeric: false, disablePadding: false, label: 'Lokasi' },
    { id: 'alamat', numeric: false, disablePadding: false, label: 'Alamat' },
    { id: 'serialNo', numeric: false, disablePadding: false, label: 'Serial No' },
    { id: 'typeMesin', numeric: false, disablePadding: false, label: 'Type Mesin' },
    { id: 'tahunPembelian', numeric: false, disablePadding: false, label: 'Tahun Pembelian' },
    { id: 'noSpk', numeric: false, disablePadding: false, label: 'No SPK' },
    { id: 'noAset', numeric: false, disablePadding: false, label: 'No Aset' },
    { id: 'bangunanBaru', numeric: false, disablePadding: false, label: 'Bangunan Baru' },
    { id: 'renovasi', numeric: false, disablePadding: false, label: 'Renovasi' },
    { id: 'kwh', numeric: false, disablePadding: false, label: 'KWH' },
    { id: 'ac', numeric: false, disablePadding: false, label: 'AC' },
    { id: 'booth', numeric: false, disablePadding: false, label: 'Booth' },
    { id: 'signage', numeric: false, disablePadding: false, label: 'Signage' },
    { id: 'stickerKaca', numeric: false, disablePadding: false, label: 'Sticker Kaca' },
    { id: 'stickerMesin', numeric: false, disablePadding: false, label: 'Sticker Mesin' },
    { id: 'cctv', numeric: false, disablePadding: false, label: 'CCTV' },
    { id: 'pinCover', numeric: false, disablePadding: false, label: 'PIN Cover' },
    { id: 'platSkimming', numeric: false, disablePadding: false, label: 'Plat Skimming' },
    { id: 'alarmSystem', numeric: false, disablePadding: false, label: 'Alarm System' },
    { id: 'ups', numeric: false, disablePadding: false, label: 'UPS' },
    { id: 'isoTrans', numeric: false, disablePadding: false, label: 'ISO Trans' },
    { id: 'tempatSampah', numeric: false, disablePadding: false, label: 'Tempat Sampah' },
    { id: 'patchingUangPalsu', numeric: false, disablePadding: false, label: 'Patching Uang Palsu' },
  ];

  const valueTypeTableNew = [
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
  ];

  const handleUpload =()=>{
    handleOpenModalUpload();
  };

  function handleFilterSubmit(value) {
    // setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      // console.log("Sasa",value);
      setDataRequest({
        ...dataRequest,
        ...value,
      });
    }
  }

  function handleResetFilter() {
    setDataRequest({
      ...defaultDataHit,
    });
  }

  // SET DATA OF TABLE
  async function getResponse() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios({
        url: `${process.env.REACT_APP_API_IMPLEMENTATION}/rolloutImplementations`,
        method: 'POST',
        data: dataRequest
      });
      // console.log('~ result.data', result.data);
      setDataRollout(result.data.detail);
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
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
      sortType: type.toUpperCase(),
      sortBy: column,
    });
  };

  const handleSubmitNewOrder = () => {
    setOpenSuccessModal(true);
    setOpenModalNewOrder(false);
    setLabelSuccess('Add New Order Success');
  };

  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);
  const handleExportToExcel = () => {
    setIsModalLoaderOpen(true);
    // console.log('click');
    axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/exportRolloutImp`,
      responseType: "blob", // important
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      // },
    })
      .then((res) => {
        console.log(res.data);
        setIsModalLoaderOpen(false);
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        // console.log('~ url', url);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Master Data.xlsx");
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
        setIsModalLoaderOpen(false);
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Rollout</Typography>
        </Grid>
        <Grid item>
          <Grid container justify="flex-end" direction="row">
            <Grid item>
              <MuiIconLabelButton
                style={{
                  width: "max-content",
                  // right: 0,
                  marginRight: 30,
                  height: 40,
                  boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
                  borderRadius: "8px",
                }}
                label="Export Excel"
                iconPosition="endIcon"
                onClick={handleExportToExcel}
                buttonIcon={<UploadIcon />}
              />
            </Grid>
            <Grid item>
              <ChkyDownloadButton
                style={{
                  width: "max-content",
                  right: 0,
                  height: 40,
                  boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
                  borderRadius: "8px",
                }}
                label="Upload"
                iconPosition="endIcon"
                onClick={handleUpload}
                buttonIcon={<UploadCloud />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.container}>
        <div className={classes.filterContainer}>
          <Filter
            onFilterSubmit={handleFilterSubmit}
            handleReset={handleResetFilter}
          />
        </div>
        <div style={{ overflow: "auto" }}>
          <TableCheckPagination
            data={dataRollout}
            fields={titleTableNew}
            cellOption={valueTypeTableNew}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
            isWithCheck={false}
            isLoadData={isLoading}
            sorting={handleSorting}
            isSort
          />
        </div>
      </div>
      {/* <FloatingChat /> */}
      <SuccessPopUp
        isOpen={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        label={labelSuccess}
      />
      <UploadModal
        isOpen={openModalUpload}
        onClose={handleCloseModalUpload}
        onLeave={() => {
          handleCloseModalUpload();
        }}
      />
      <ModalLoader isOpen={isModalLoaderOpen} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(Main)));
