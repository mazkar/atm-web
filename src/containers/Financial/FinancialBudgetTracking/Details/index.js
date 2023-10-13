import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'
import constants from '../../../../helpers/constants';
import { ChkyTablePagination } from '../../../../components';
import MemoFilter from './memo';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { ReactComponent as ArrowLeft } from '../../../../assets/icons/siab/arrow-left.svg';
import FloatingChat from '../../../../components/GeneralComponent/FloatingChat';
import LoadingView from '../../../../components/Loading/LoadingView';
import useRupiahConverter from '../../../../helpers/useRupiahConverter';
import useDateFormater from '../../../../helpers/useDateFormater';

import './Details.css'

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
    '& .MuiBox-root': {
      padding: 0,
    },
  },
  rootMap: {
    position: 'relative',
    top: -50,
    zIndex: 1,
  },
  titleContainer: {
    marginBottom: 0,
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constants.color.dark,
  },
  backButton: {
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: 'red'
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      '& :hover': {
        backgroundColor: '#F4F7FB',
      },
    },
  },
});
const actionData = [
  { name: 'Detail', url: `/detail` }
];

function DetailsBudgetTracking(props) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory()
  const { data } = location.state;

  const [loading, setLoading] = useState(false)
  const [titleTable, setTitleTable] = useState([]);
  const [valueType, setValueType] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRow, setTotalRow] = useState(0);
  const [initData, setInitData] = useState(0);
  const [onPage, setOnPage] = useState(1);

  useEffect(() => {
    filterData()
  }, [titleTable, onPage])

  var addToObject = function (obj, key, value, index) {
    var temp = {};
    var i = 0;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (i === index && key && value) {
          temp[key] = value;
        }
        temp[prop] = obj[prop];
        i++;
      }
    }
    if (!index && key && value) {
      temp[key] = value;
    }
    return temp;
  };

  function filterData() {
    setLoading(true)
    let showData = []
    let totalData = data.length
    setTotalPage(Math.ceil(totalData / 10))
    setTotalRow(totalData)

    data.map((value, index) => {
      // console.log('~ value', value)
      let rowData = {}
      if (index >= initData && index <= (onPage * 10) - 1) {
        titleTable.map((data, index) => {
          // console.log('~ data', data)
          data === "Location" ? rowData = addToObject(rowData, "location", value.location !== null && value.location !== "" ? value.location : "-")
            : data === "Pembayaran" ? rowData = addToObject(rowData, "pembayaran", value.pembayaran !== null && value.pembayaran !== "" ? value.pembayaran : "-")
              : data === "Inisiator" ? rowData = addToObject(rowData, "inisiatorNpb", value.npb.inisiatorNpb !== null && value.npb.inisiatorNpb !== "" ? value.npb.inisiatorNpb : "-")
                : data === "Status" ? rowData = addToObject(rowData, "status", value.npb.statusApprovalNpb !== null && value.npb.statusApprovalNpb !== "" ? value.npb.statusApprovalNpb==='1' ? "Approved" : value.npb.statusApprovalNpb==='2' ? "Rejected" : "Waiting Approval" : "Waiting Approval")
                  : data === "File" ? rowData = addToObject(rowData, "name", value.document.documentList)
                    : data === "Smart Reff" ? rowData = addToObject(rowData, "smartReff", value.smartReff !== null && value.smartReff !== "" ? value.smartReff : "-")
                      : data === "SL" ? rowData = addToObject(rowData, "sl", "-")
                        : data === "Category" ? rowData = addToObject(rowData, "category", value.category !== null && value.category !== "" ? value.category : "-")
                          : data === "NPB" ? rowData = addToObject(rowData, "npb", "-")
                            : data === "Approval" ? rowData = addToObject(rowData, "statusApprovalNpb", value.npb.statusApprovalNpb !== null && value.npb.statusApprovalNpb !== "" ? value.npb.statusApprovalNpb==='1' ? "approve" : value.npb.statusApprovalNpb==='2' ? "not approve" : "waiting" : "waiting")
                              : data === "Nominal Invoice" ? rowData = addToObject(rowData, "nominalInvoice", value.invoice.nominalInvoice !== null && value.invoice.nominalInvoice !== "" ? value.invoice.nominalInvoice.toString() : "-")
                                : data === "PIC Up Load Smart" ? rowData = addToObject(rowData, "picUploadSmart", value.picUploadSmart !== null && value.picUploadSmart !== "" ? value.picUploadSmart : "-")
                                  : data === "Keterangan SL" ? rowData = addToObject(rowData, "keteranganSl", value.keteranganSl !== null && value.keteranganSl !== "" ? value.keteranganSl : "-")
                                    : data === "Detail Pekerjaan" ? rowData = addToObject(rowData, "detailPekerjaan", value.detailPekerjaan !== null && value.detailPekerjaan !== "" ? value.detailPekerjaan : "-")
                                      : data === "Nominal" ? rowData = addToObject(rowData, "nominalNpb", value.npb.nominalNpb !== null && value.npb.nominalNpb !== "" ? useRupiahConverter(value.npb.nominalNpb) : "-")
                                        : data === "Tanggal Approval NPB" ? rowData = addToObject(rowData, "tanggalApprovalNpb", value.npb.tanggalApprovalNpb !== null && value.npb.tanggalApprovalNpb !== "" ? value.npb.tanggalApprovalNpb : "-")
                                          : data === "Nominal NPB Invoice" ? rowData = addToObject(rowData, "nominalNPBInvoice", value.invoice.nominalNPBInvoice !== null && value.invoice.nominalNPBInvoice !== "" ? value.invoice.nominalNPBInvoice : "-")
                                            : data === "Tanggal Bayar" ? rowData = addToObject(rowData, "tanggalBayar", value.tanggalBayar !== null && value.tanggalBayar !== "" ? value.tanggalBayar : "-")
                                              : data === "ATM ID" ? rowData = addToObject(rowData, "atmId", value.atmId !== null && value.atmId !== "" ? value.atmId : "-")
                                                : data === "Penawaran Harga" ? rowData = addToObject(rowData, "penawaranHarga", value.penawaranHarga !== null && value.penawaranHarga !== "" ? value.penawaranHarga : "-")
                                                  : data === "Tgl Submit" ? rowData = addToObject(rowData, "tanggalSubmitNpb", value.npb.tanggalSubmitNpb !== null && value.npb.tanggalSubmitNpb !== "" ? useDateFormater(value.npb.tanggalSubmitNpb.slice(0,10),'YYYY-MM-DD','DD / MM / YYYY') : "-")
                                                    : data === "No. Invoice" ? rowData = addToObject(rowData, "noInvoice", value.invoice.noInvoice !== null && value.invoice.noInvoice !== "" ? value.invoice.noInvoice : "-")
                                                      : data === "Nama Vendor" ? rowData = addToObject(rowData, "vendorName", value.vendorName !== null && value.vendorName !== "" ? value.vendorName : "-")
                                                        : data === "Bupot Pajak" ? rowData = addToObject(rowData, "bupotPajak", value.bupotPajak !== null && value.bupotPajak !== "" && value.bupotPajak !== "null" ? value.bupotPajak : "-")
                                                          : data === "Type Budget" ? rowData = addToObject(rowData, "typeBudget", value.typeBudget !== null && value.typeBudget !== "" ? value.typeBudget : "-")
                                                            : data === 'Remark' ? rowData = addToObject(rowData, "remark", value.remark !== null && value.remark !== "" ? value.remark : "-") : null
        })
        showData.push(rowData)
      }
    })
    setDataTable(showData)
    setLoading(false)
  }

  return (
    <div className={classes.root}>
      <Grid container justify="flex-start" className={classes.titleContainer} alignItems="center">
        <Grid item className={classes.backButton}>
          <MuiIconLabelButton
            label="Back"
            iconPosition="startIcon"
            onClick={() => history.goBack()}
            buttonIcon={<ArrowLeft />}
            style={{color:'rgb(220, 36, 31)'}}
          />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item />
      </Grid>
      <Grid direction="column" spacing={2} style={{ marginTop: 20 }}>
        <Grid item>
          <MemoFilter setTitleTable={setTitleTable} setValueType={setValueType} setLoading={setLoading} />
        </Grid>
        <Grid item style={{ marginTop: '20px' }}>
          <div style={{ backgroundColor: 'white', borderTopLeftRadius: 6, borderTopRightRadius: 6, fontSize: '28px', fontWeight: 500, padding: '20px 0 30px 20px' }}>
            Detail
            </div>
          {/* <Typography style={{fontSize: '28px', fontWeight: 500}}>
              Detail
            </Typography> */}
        </Grid>
        <Grid item style={{ marginTop: '-30px' }}>
          {loading === true
            ? <LoadingView maxheight='100%' />
            : <ChkyTablePagination
              data={dataTable}
              fields={titleTable}
              cellOption={valueType}
              totalPages={totalPage}
              rowsPerPage={10}
              totalRows={totalRow}
              changePage={() => {
                // setOnPage(onPage + 1)
                // setInitData(initData + 10)
                // filterData("")
              }}
              setOnPage={setOnPage}
              setInitData={setInitData}
            />}
        </Grid>
      </Grid>
      {/* <FloatingChat /> */}
    </div>

  );
}

export default DetailsBudgetTracking;