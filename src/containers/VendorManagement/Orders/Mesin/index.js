/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { RootContext } from '../../../../router';
import FloatingChat from '../../../../components/GeneralComponent/FloatingChat';
import FilterProgress from '../common/FilterProgress';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { TableCheckPagination } from '../../../../components';
import { SummaryCards } from '../common/card';
import AddIcon from '@material-ui/icons/Add';
import { ReactComponent as UploadIcon } from '../../../../assets/icons/linear-red/upload.svg';
import constansts from '../../../../helpers/constants';
import UploadInvoiceNotFound from '../common/PopUp/uploadInvoiceNotFound';
import AddNewOrderPopUp from '../common/PopUp/addNewOrder';
import SuccessPopUp from '../common/PopUp/successPopUp';
import axios from 'axios';
import ModalLoader from '../../../../components/ModalLoader';
import { dataCard } from '../index';

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

// DEFAULT EXPORT
const Main = () => {
  const classes = useStyles();
  const history = useHistory();

  // POPUP TAMBAH
  const [OpenModalUploadNew, setOpenModalUploadNew] = useState(false);
  const handleOpenModalUploadNew = () => setOpenModalUploadNew(true);
  const handleCloseModalUploadNew = () => setOpenModalUploadNew(false);

  // GET USER ID
  const { userRoleName } = useContext(RootContext);

  // INIT LOADING
  const [isLoading, setIsLoading] = useState(true);

  // INIT SUMMARY
  const [summaryNew, setSummaryNew] = useState({});

  // INIT TABLE
  const defaultType = 'ASC';
  const defaultColumn = 'id';
  const rowsPerPage = 10; // <--- init default rowsPerPage|
  const defaultRequest = {
    sortType: defaultType,
    sortBy: defaultColumn,
    dataPerPage: rowsPerPage,
    pageNumber: 0,
  };
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [openUploadModalNotFound, setopenUploadModalNotFound] = useState(false);
  const [openModalNewOrder, setOpenModalNewOrder] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [labelSuccess, setLabelSuccess] = useState('');
  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);

  // INIT DATA REQUEST
  const [dataRequest, setDataRequest] = useState(defaultRequest);

  // INIT FILTER Table
  const [selectedSearch, setSelectedSearch] = useState('All');
  const [selectedKebutuhan, setSelectedKebutuhan] = useState('All');
  const [inputSearch, setInputSearch] = useState('');

  const actionPerpanjangan = (id) => {
    // alert(`Perpanjangan ${id}`)
    const machineConfig = dataCard.find((val) => val.title.toLowerCase().includes('mesin'));
    if (userRoleName.toLowerCase().includes('vendor')) {
      history.push(`${machineConfig.urlVendor}/penawaran-harga/${id}`);
    } else {
      history.push(`${machineConfig.url}/penawaran-harga/${id}`);
    }
  };
  const actionDetail = (id) => {
    // alert(`(${id}) Go to Order Detail`)
    const machineConfig = dataCard.find((val) => val.title.toLowerCase().includes('mesin'));
    if (userRoleName.toLowerCase().includes('vendor')) {
      history.push(`${machineConfig.urlVendor}/${id}`);
    } else {
      history.push(`${machineConfig.url}/${id}`);
    }
  };

  const [dataImplementationNew, setDataImplementationNew] = useState([]); // <--- init dataImplementation array

  const dataAction2 = [{ name: 'Pengajuan Harga', func: actionPerpanjangan }];
  const dataAction3 = [{ name: 'Detail', func: actionDetail }];

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
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'ticketNumber', numeric: false, disablePadding: false, label: 'No Ticket' },
    { id: 'requestDate', numeric: false, disablePadding: false, label: 'Tgl Request' },
    { id: 'requesterUser', numeric: false, disablePadding: false, label: 'User Req' },
    { id: 'locationId', numeric: false, disablePadding: false, label: 'ID Loc' },
    { id: 'locationName', numeric: false, disablePadding: false, label: 'Nama Lokasi' },
    { id: 'locationAddress', numeric: false, disablePadding: false, label: 'Alamat' },
    { id: 'locationArea', numeric: false, disablePadding: false, label: 'Area' },
    { id: 'locationCity', numeric: false, disablePadding: false, label: 'City' },
    { id: 'latitudeLongitude', numeric: false, disablePadding: false, label: 'Lat - Long' },
    { id: 'idMesin', numeric: false, disablePadding: false, label: 'ID Mesin' },
    { id: 'jobType', numeric: false, disablePadding: false, label: 'Jenis Pekerjaan' },
    { id: 'vendorName', numeric: false, disablePadding: false, label: 'Nama Vendor' },
    { id: 'goodsCost', numeric: false, disablePadding: false, label: 'Biaya Barang' },
    { id: 'serviceCost', numeric: false, disablePadding: false, label: 'Biaya Jasa' },
    { id: 'totalCost', numeric: false, disablePadding: false, label: 'Total Biaya' },
    { id: 'totalCostWithPpn', numeric: false, disablePadding: false, label: 'Total Biaya+PPN' },
    { id: 'approver', numeric: false, disablePadding: false, label: 'Approver' },
    { id: 'statusApproval', numeric: false, disablePadding: false, label: 'Status Approval' },
    { id: 'approvedDate', numeric: false, disablePadding: false, label: 'Tgl Approved' },
    { id: 'processingDate', numeric: false, disablePadding: false, label: 'Tgl Pengerjaan' },
    { id: 'completeDate', numeric: false, disablePadding: false, label: 'Tgl Selesai' },
    { id: 'slaWork', numeric: false, disablePadding: false, label: 'SLA Pekerjaan' },
    { id: 'bastId', numeric: false, disablePadding: false, label: 'BAST Digital' },
    { id: 'invoiceDate', numeric: false, disablePadding: false, label: 'Tgl Kirim Invoice' },
    { id: 'invoiceNumber', numeric: false, disablePadding: false, label: 'No Invoice' },
    { id: 'paymentDate', numeric: false, disablePadding: false, label: 'Tgl Pembayaran' },
    { id: 'paidStatus', numeric: false, disablePadding: false, label: 'Status Paid' },
    { id: 'slaPayment', numeric: false, disablePadding: false, label: 'SLA Pembayaran' },
    { id: 'notesDescription', numeric: false, disablePadding: false, label: 'Notes & Desc' },
    { id: 'action1', numeric: false, disablePadding: false, label: '' },
    { id: 'action2', numeric: false, disablePadding: false, label: '' },
  ];

  const valueTypeTableNew = [
    'hide',
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
    'approver',
    'statusApproval',
    'string',
    'string',
    'string',
    'sla_pekerjaan',
    'link_bast',
    'string',
    'string',
    'string',
    'status_paid',
    'sla_pembayaran',
    'string',
  ];

  // SET DATA OF TABLE
  function getResponse() {
    setIsLoading(true);
    axios({
      method: 'POST',
      url: `${constansts.IMPLEMENTATION_SERVICE}/getListTaskMesinVendor`,
      data: {
        ...dataRequest,
      },
    })
      .then((res) => {
        // console.log('~ res.data', res.data);
        setIsLoading(false);
        setTotalRows(res.data.totalElements);
        setTotalPages(res.data.totalPages);
        setDataImplementationNew(
          res.data.content.map((val) => ({
            id: val.id,
            ticketNumber: val.ticketNumber,
            requestDate: val.requestDate,
            requesterUser: val.requesterUser,
            locationId: val.locationId,
            locationName: val.locationName,
            locationAddress: val.locationAddress,
            locationArea: val.locationArea,
            locationCity: val.locationCity,
            latitudeLongitude: val.latitudeLongitude,
            idMesin: val.idMesin,
            jobType: val.jobType,
            vendorName: val.vendorName,
            goodsCost: val.goodsCost,
            serviceCost: val.serviceCost,
            totalCost: val.totalCost,
            totalCostWithPpn: val.totalCostWithPpn,
            approver: val.approver,
            statusApproval: val.statusApproval,
            approvedDate: val.approvedDate,
            processingDate: val.processingDate,
            completeDate: val.completeDate,
            slaWork: val.slaWork,
            BASTDigital: val.bastId ? (
              <Link to={`/link/bast/${val.bastId}`}>BAST Digital</Link>
            ) : (
              '-'
            ),
            invoiceDate: val.invoiceDate,
            invoiceNumber: val.invoiceNumber,
            paymentDate: val.paymentDate,
            paidStatus: val.paidStatus,
            slaPayment: val.slaPayment,
            notesDescription: val.notesDescription,
            action1: dataAction2.map((act) => {
              return <a onClick={() => act.func(val.id)}>{act.name}</a>;
            }),
            action2: dataAction3.map((act) => {
              return <a onClick={() => act.func(val.id)}>{act.name}</a>;
            }),
          }))
        );
      })
      .catch((err) => {
        console.log('~ err', err);
        // console.log('error axios');
        setIsLoading(false);
      });
  }

  function onFilterSubmit() {
    setDataRequest({
      ...defaultRequest,
      ...(selectedSearch !== 'All' ? { [selectedSearch]: inputSearch } : {}),
    });
  }

  function handleReset() {
    setDataRequest(defaultRequest);
  }

  useEffect(() => {
    getResponse();
  }, [dataRequest]);

  useEffect(() => {
    // console.log('~ selectedSearch', selectedSearch);
  }, [selectedSearch]);

  useEffect(() => {
    // console.log('~ inputSearch', inputSearch);
  }, [inputSearch]);

  function handleChangePageValue(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  const handleSorting = (type, column) => {
    // console.log('~ type, column', type, column);
    setDataRequest({
      ...dataRequest,
      sortType: type.toUpperCase(),
      sortBy: column,
    });
  };

  const handleButton = () => {
    //alert("PopUp")
    handleOpenModalUploadNew();
  };

  const handleSubmitNewOrder = () => {
    setOpenSuccessModal(true);
    setOpenModalNewOrder(false);
    setLabelSuccess('Add New Order Success');
  };

  return (
    <div className={classes.root}>
      <Grid container justify='space-between' className={classes.titleContainer}>
        <Grid item>
          <Typography className={classes.title}>Task Kirim &amp; Tarik Mesin</Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            className={classes.paramButton}
            style={{
              width: 'max-content',
              background: '#FFFFFF',
              border: '1px solid #DC241F',
              boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
              borderRadius: '6px',
            }}
            label='Upload Pembayaran'
            iconPosition='endIcon'
            onClick={() => {
              setopenUploadModalNotFound(true);
            }}
            buttonIcon={<UploadIcon />}
          />
          <MuiIconLabelButton
            style={{
              width: 'max-content',
              right: 0,
              height: 40,
              boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
              borderRadius: '6px',
            }}
            label='New Order'
            iconPosition='endIcon'
            onClick={() => {
              setOpenModalNewOrder(true);
            }}
            buttonIcon={<AddIcon />}
          />
        </Grid>
      </Grid>
      <SummaryCards
        totalOrder='13.946'
        totalDone='12.809'
        totalOnProgress='1.137'
        totalBiaya='Rp. 18.450.000.000'
        biayaJasa='Rp.15.000.000.000'
        biayaBarang='Rp.3.450.000.000'
        jumlahPembayaran='133.946'
        statusPaid='12.809'
        statusUnpaid='1.137'
        totalOverSla='133.946'
        isLoading={isLoading}
      />
      <div className={classes.container}>
        {/* FILTER */}
        <div className={classes.filterContainer}>
          <FilterProgress
            setCurrentPage={setCurrentPage}
            selectedSearch={selectedSearch}
            setSelectedSearch={setSelectedSearch}
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}
            selectedKebutuhan={selectedKebutuhan}
            setSelectedKebutuhan={setSelectedKebutuhan}
            itemSearch={titleTableNew
              .filter((val) => {
                return (
                  !val.label.toLowerCase().includes('biaya') &&
                  !val.label.toLowerCase().includes('sla') &&
                  val.id !== 'action1' &&
                  val.id !== 'action2'
                );
              })
              .map((val) => ({ text: val.label, value: val.id }))}
            onFilterSubmit={onFilterSubmit}
            handleReset={handleReset}
          />
        </div>
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
          isWithApiSorting={true}
        />
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
        onClose={() => setOpenSuccessModal(false)}
        label={labelSuccess}
      />
      <UploadInvoiceNotFound
        isOpen={openUploadModalNotFound}
        data={dataInvoice}
        onClose={() => setopenUploadModalNotFound(false)}
      />
      <AddNewOrderPopUp
        isOpen={openModalNewOrder}
        onClose={() => setOpenModalNewOrder(false)}
        onSubmitNewOrder={handleSubmitNewOrder}
      />
      <ModalLoader isOpen={isModalLoaderOpen} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(Main)));
