import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import constants from '../../../helpers/constants';
import { ChkyButtons, ChkySearchBar, ChkyTablePagination } from '../../../components';
import MemoFilter from './MemoFilter';
import ModalUpload from './ModalUpload';
import { useSelector, useDispatch } from "../../../helpers/Utils/react-redux-hook";
import LoadingView from '../../../components/Loading/LoadingView';
import DynamicTablePagination from '../../../components/DynamicTablePagination';
import useRupiahConverter from '../../../helpers/useRupiahConverter';
import moment from "moment";

import './MemoPembayaran.css'
import * as ThemeColor from "../../../assets/theme/colors";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
  },
  rootMap: {
    position: 'relative',
    top: -50,
    zIndex: 1,
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constants.color.dark,
  },
  update: {
    fontFamily: 'Barlow',
    fontWeight: '400',
    fontSize: '13px',
    color: '#8D98B4'
  }
});

function MemoPembayaran(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const financialTable = useSelector(state => state.financialTable)
  // const [keywords, setKeyword] = useState(''); // <--- init default keyword
  function handleKeyword(newValue) {
    filterData(newValue)
  }

  const rowsPerPage = 10
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const [titleTable, setTitleTable] = useState([]);
  const [valueType, setValueType] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRow, setTotalRow] = useState(0);
  const [onPage, setOnPage] = useState(1);
  const [initData, setInitData] = useState(0);
  const handleOpenModalUpload = () => setOpenModalUpload(true);
  const handleCloseModalUpload = () => setOpenModalUpload(false);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState('-');

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

  const useDateFormater = (date) => {
    if(date==='null' || date==='' || date===null) {
      return '-'
    } else {
      let arr = date.split(' ');
      return `${arr[2][0]==='0' ? arr[2][1] : arr[2]}/${arr[1]}/${arr[5].slice(2,4)}`;
    }
  };

  function filterData(reffID) {
    setLoading(true)
    let showData = []
    let tableData = financialTable.data.memoPembayaran
    if(financialTable.data.tanggalUploadFile) {
      let update = financialTable.data.tanggalUploadFile;
      let result = moment(update.slice(0,10), 'YYYY-MM-DD').format('LL');
      setUpdate(result);
    }
    if (tableData !== undefined) {
      let totalData = tableData.length
      setTotalPage(Math.ceil(totalData / 10))
      setTotalRow(totalData)
      tableData.map((value, index) => {
        let rowData = {}
        if (value.mpId !== "" && value.mpId.indexOf(reffID) !== -1) {
          titleTable.map((data, index) => {
            data === "Reff / ID MP"
              ? rowData = addToObject(rowData, "mpId", value.mpId !== null && value.mpId !== "" ? value.mpId : "-")
              : data === "Desc. Transaction"
                ? rowData = addToObject(rowData, "description", value.description !== null && value.description !== "" ? <div style={{textAlign:'left', width:'580px'}}>{value.description}</div> : "-")
                : data === "Location"
                  ? rowData = addToObject(rowData, "location", value.location !== null && value.location !== "" ? value.location : "-")
                  : data === "Start Period"
                    ? rowData = addToObject(rowData, "startPeriod", value.startPeriod !== null && value.startPeriod !== "" ? value.startPeriod : "-")
                    : data === "Type GL"
                      ? rowData = addToObject(rowData, "typeGL", value.typeGL !== null && value.typeGL !== "" ? value.typeGL : "-")
                      : data === "Division"
                        ? rowData = addToObject(rowData, "division", value.division !== null && value.division !== "" ? value.division : "-")
                        : data === "Inisiator"
                          ? rowData = addToObject(rowData, "inisiator", value.inisiator !== null && value.inisiator !== "" ? value.inisiator : "-")
                          : data === "Vendor Name"
                            ? rowData = addToObject(rowData, "vendorName", value.vendorName !== null && value.vendorName !== "" ? value.vendorName : "-")
                            : data === "Region"
                              ? rowData = addToObject(rowData, "region", value.region !== null && value.region !== "" ? value.region : "-")
                              : data === "End Period"
                                ? rowData = addToObject(rowData, "endPeriod", value.endPeriod !== null && value.endPeriod !== "" ? value.endPeriod : "-")
                                : data === "Type Expenses"
                                  ? rowData = addToObject(rowData, "typeExpense", value.typeExpense !== null && value.typeExpense !== "" ? value.typeExpense : "-")
                                  : data === "Payment Date"
                                    ? rowData = addToObject(rowData, "paymentDate", value.paymentDate !== null && value.paymentDate !== "" ? value.paymentDate : "-")
                                    : data === "Bank Account Name"
                                      ? rowData = addToObject(rowData, "bankAccountName", value.bankAccountName !== null && value.bankAccountName !== "" ? value.bankAccountName : "-")
                                      : data === "RC Code"
                                        ? rowData = addToObject(rowData, "rcCode", value.rcCode !== null && value.rcCode !== "" ? value.rcCode : "-")
                                        : data === "SL Code"
                                          ? rowData = addToObject(rowData, "slCode", value.slCode !== null && value.slCode !== "" ? value.slCode : "-")
                                          : data === "Capex Code"
                                            ? rowData = addToObject(rowData, "capexCode", value.capexCode !== null && value.capexCode !== "" && value.capexCode !== 'null' ? value.capexCode : "-")
                                            : data === "Amount"
                                              ? rowData = addToObject(rowData, "amount", value.amount !== null && value.amount !== "" ? useRupiahConverter(value.amount) : "-")
                                              : data === "Machine ID"
                                                ? rowData = addToObject(rowData, "machineId", value.machineId !== null && value.machineId !== "" ? value.machineId : "-")
                                                : data === "MP Date"
                                                  ? rowData = addToObject(rowData, "mpDate", value.mpDate !== null && value.mpDate !== "" ? useDateFormater(value.mpDate) : "-")
                                                  : data === "SL Category"
                                                    ? rowData = addToObject(rowData, "slCategory", value.slCategory !== null && value.slCategory !== "" ? value.slCategory : "-")
                                                    : data === "Project Code"
                                                      ? rowData = addToObject(rowData, "projectCode", value.projectCode !== null && value.projectCode !== 'null' && value.projectCode !== "" ? value.projectCode : "-")
                                                      : data === "Bank Account No"
                                                        ? rowData = addToObject(rowData, "bankAccountNo", value.bankAccountNo !== null && value.bankAccountNo !== "" ? value.bankAccountNo : "-")
                                                        : data === "Bank Account Holder"
                                                          ? rowData = addToObject(rowData, "bankAccountHolder", value.bankAccountHolder !== null && value.bankAccountHolder !== "" ? value.bankAccountHolder : "-")
                                                          : data === "Invoice No"
                                                            ? rowData = addToObject(rowData, "invoiceNo", value.invoiceNo !== null && value.invoiceNo !== "" ? value.invoiceNo : "-")
                                                            : data === "Acrual Code"
                                                              ? rowData = addToObject(rowData, "accrualCode", value.accrualCode !== null && value.accrualCode !== "" ? value.accrualCode : "-")
                                                                : rowData = addToObject(rowData, "npb", value.npb !== null && value.npb !== "" ? value.npb : "-");
                                                    
          })
          showData.push(rowData)
        }
      })
      setDataTable(showData)
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    dispatch.financialTable.listMemoPembayaran()
  }, []);

  useEffect(() => {
    filterData("")
  }, [titleTable])

  useEffect(() => {
    filterData("")
  }, [financialTable])

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" className={classes.titleContainer} alignItems="center">
        <Grid item>
          <Typography className={classes.title}>Memo Pembayaran</Typography>
        </Grid>
        <Grid item>
          <ChkySearchBar placeholder="Pencarian berdasarkan Reff / ID MP" onKeywordChange={handleKeyword} width={290} />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item>
          <div className={classes.update}>Last update : {update}</div>
        </Grid>
        <Grid item>
          <ChkyButtons height={40} style={{ textTransform: 'capitalize' }} onClick={handleOpenModalUpload}>
            <AddIcon color="white" height={14} width={14} />
            <Typography style={{ marginLeft: 5, fontSize: 17, fontWeight: 500 }}>Upload File MP</Typography>
          </ChkyButtons>
        </Grid>
      </Grid>
      <Grid
        direction="column"
        spacing={2}
        style={{ marginTop: 20 }}
      >
        <Grid item>
          <MemoFilter setTitleTable={setTitleTable} setValueType={setValueType} setLoading={setLoading} />
        </Grid>
        <Grid item style={{ marginTop: '20px' }}>
          {loading
            ? <LoadingView maxheight='100%' />
            : <DynamicTablePagination
              className='tableMP'
              rowsPerPage={rowsPerPage}
              totalRows={totalRow}
              data={dataTable}
              fields={titleTable}
              cellOption={valueType}
              isLoading={loading}
            />}
        </Grid>
      </Grid>
      <ModalUpload
        isOpen={openModalUpload}
        onClose={handleCloseModalUpload}
        onCloseAll={setOpenModalUpload}
      />
    </div>

  );
}

MemoPembayaran.propTypes = {

};

export default MemoPembayaran;
