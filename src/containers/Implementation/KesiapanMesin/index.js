import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ReactComponent as BackIcon } from '../../../assets/icons/general/arrow_back_red.svg';
import {
  Grid,
  Typography,
  Button,
  Paper,
  ButtonGroup,
} from '@material-ui/core';
import constansts from '../../../helpers/constants';
import { ChkyTablePagination } from '../../../components/chky';
import {
  GrayUltrasoft,
  GrayMedium,
  PrimaryHard,
} from '../../../assets/theme/colors';
import { Row, Col } from 'antd';
import LongCardSummary from '../../../components/Card/CardDashTransaction';
import Calculator from '../../../assets/images/calculator.png';
import Reload from '../../../assets/icons/siab/Group.png';
import AddIcon from '@material-ui/icons/Add';
import { ChkyButtons } from '../../../components';
import ModalLoader from '../../../components/ModalLoader';
import { ReactComponent as TrashIcon } from "../../../assets/images/trash.svg";
import { ReactComponent as EditIcon } from "../../../assets/images/edit.svg";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const BtnGroupItem = withStyles((theme) => ({
  root: {
    textTransform: 'capitalize',
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '14px',
    textAlign: 'center',
    fontSize: 12,
    backgroundColor: GrayUltrasoft,
    color: GrayMedium,
    border: 'none!important',
    padding: '8px 16px',
    width: '91px',
    height: '30px',

    '&:hover': {
      color: 'white',
    },
  },
  label: {
    whiteSpace: 'nowrap',
  },
  contained: {
    '&.Mui-disabled': {
      color: 'white',
      backgroundColor: PrimaryHard,
    },
  },
}))(Button);

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: 'unset',
    padding: 0,
    '& .MuiButton-root': {
      padding: 0,
      textTransform: 'none',
      backgroundColor: 'unset',
    },
    '& .MuiButton-root:hover': { opacity: 0.6, backgroundColor: 'unset' },
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
  },
  heading: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '24px',
    color: '#2B2F3C',
  },
  paper: {
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    borderRadius: '10px',
    padding: '20px 20px',
  },
  buttonInGroup: {
    color: '#FFFFFF',
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '14px',
    textAlign: 'center',
    width: '91px',
    height: '30px',
  },
  menuMoreItem: {
    fontSize: 13,
    justifyContent: "space-between",
    display: "flex",
    "&:hover": {
      color: "#DC241F",
    },
  },
});

const MenuMore = (props) => {
  const classes = useStyles();
  const obj = props.value;
  const actionObject = obj;

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderIconMenu(type) {
    if (type === "Edit") {
      return <EditIcon height={16} width={16} />;
    } else {
      return <TrashIcon height={16} width={16} />;
    }
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon style={{ color: "#DC241F" }} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {actionObject.map((item, i) => {
          return (
            <MenuItem
              key={i}
              onClick={()=>alert(item.id)}
              className={classes.menuMoreItem}
            >
              <Typography style={{ fontSize: 13 }}>{item.name}</Typography>
              <div>{renderIconMenu(item.type)}</div>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

const KesiapanMesin = ({ history }) => {
  const classes = useStyles();
  const [type, setType] = useState('Mesin Masuk');
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isLoadData, setIsLoadData] = useState(true);

  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage

  const [dataMesinMasuk, setDataMesinMasuk] = useState([]);
  const [dataMesinKeluar, setDataMesinKeluar] = useState([]);
  const [dataNonMesinKeluar, setDataNonMesinKeluar] = useState([]);
  const [dataNonMesinMasuk, setDataNonMesinMasuk] = useState([]);
  const [dataAksesGudang, setDataAksesGudang] = useState([]);
  const [dataSPK, setDataSPK] = useState([]);

  const onClickType = (value) => {
    setType(value);
  };

  const [dataHit, setDataHit] = useState({
    pageNumber: currentPage,
    dataPerPage: rowsPerPage,
  });

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
    setDataHit({
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
    });
  };

  const titleTableMesinMasuk = [
    'FLM',
    'Tgl Masuk',
    'Jenis Mesin',
    'Type Mesin',
    'BAST Penarikan',
    'Status Rekondisi',
    'Status',
    'PIC',
    'Keterangan',
    '',
  ];

  const titleTableMesinKeluar = [
    'FLM',
    'Tgl Masuk',
    'Jenis Mesin',
    'Type Mesin',
    'BAST Penarikan',
    'Status Rekondisi',
    'Status',
    '',
    '',
    '',
  ];

  const titleAksesGudang = [
    'Keperluan',
    'PIC Pemberi Ijin',
    'Tanggal & Jam Masuk',
    'Tanggal & Jam Keluar',
    'Keterangan',
    '',
    '',
    '',
    '',
    '',
  ];

  const titleTableNonMesin = [
    'Nama Barang',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  const titleTableSPKMesin = [
    'Serial Number Mesin',
    'Serial Number UPS',
    'Lokasi Tujuan',
    'Alamat',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  function handleDetailPage() {
    alert("Action Clicked");
  };

  const handleBAST = [
    { name: 'Document.doc', id: '#1025', funct: handleDetailPage },
  ];

  const valueType = [
    'string',
    'string',
    'string',
    'string',
    'modal',
    'string',
    'string',
    'string',
    'string',
    'child',
  ];

  const valueType2 = [
    'string',
    'string',
    'string',
    'string',
    'String',
    'string',
    'string',
    'string',
    'string',
    'child',
  ];

  const [dataCardDetails, setDataCardDetails] = useState(null);

  const hitDetailKesiapanMesin = async() => {
    try {
      setModalLoader(true);
      const result = await Axios({
        url: 'https://atm-biz-siab.getsandbox.com/implementation/kesiapan-mesin/getDetails',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          id: '777'
        },
      });
      console.log("Get Details Kesiapan Mesin : ", result);
      setDataCardDetails(result.data.data)
      setModalLoader(false);
    } catch (error) {
      alert(`There is an error ${error}`)
      setModalLoader(false);
    }
  };

  useEffect(() => {
    hitDetailKesiapanMesin();
    hitGetMesinMasuk();
  }, []);

  useEffect(() =>{
    console.log("DATA MESIN MASUK TABLE : ", dataMesinMasuk);
  }, [dataMesinMasuk]);

  const hitGetMesinMasuk = async() => {
    try {
      setIsLoadData(true);
      const result = await Axios({
        url: 'https://atm-biz-siab.getsandbox.com/implementation/kesiapan-mesin/getDataMesinMasuk',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          dataPerPage: 10,
          pageNumber: 0,
        },
      });
      const dataResponse = result.data.content;
      const newData = [];
      for(var each in dataResponse){
        const actionData = [
          {
            id: dataResponse[each].id,
            name: 'Edit',
            type: 'Edit',
          },
          {
            id: dataResponse[each].id,
            name: 'Delete',
            type: 'Delete',
          },
        ];
        const newRow = {
            FLM: dataResponse[each].FLM,
            tglMasuk: dataResponse[each].tglMasuk,
            jenisMesin: dataResponse[each].jenisMesin,
            typeMesin: dataResponse[each].typeMesin,
            bASTPenarikan: handleBAST,
            statusRekondisi: dataResponse[each].statusRekondisi,
            status: dataResponse[each].status,
            pic: dataResponse[each].pic,
            keterangan: dataResponse[each].keterangan,
            action: <MenuMore value={actionData}/>
        };
        newData.push(newRow);
      };
      console.log("Get Data Mesin Masuk : ", result.data);
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
      setDataMesinMasuk(newData);
      setIsLoadData(false);
    } catch (error) {
      alert(`There is an error ${error}`)
      setIsLoadData(false);
    };
  };

  const hitGetMesinKeluar = async() => {
    try {
      setIsLoadData(true);
      const result = await Axios({
        url: 'https://atm-biz-siab.getsandbox.com/implementation/kesiapan-mesin/getDataMesinKeluar',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          dataPerPage: 10,
          pageNumber: 0,
        },
      });
      const dataResponse = result.data.content;
      const newData = [];
      for(var each in dataResponse){
        const actionData = [
          {
            id: dataResponse[each].id,
            name: 'Edit',
            type: 'Edit',
          },
          {
            id: dataResponse[each].id,
            name: 'Delete',
            type: 'Delete',
          },
        ];
        const newRow = {
            FLM: dataResponse[each].FLM,
            tglMasuk: dataResponse[each].tglMasuk,
            jenisMesin: dataResponse[each].jenisMesin,
            typeMesin: dataResponse[each].typeMesin,
            bASTPenarikan: handleBAST,
            statusRekondisi: dataResponse[each].statusRekondisi,
            status: dataResponse[each].status,
            action: <MenuMore value={actionData}/>
        };
        newData.push(newRow);
      };
      console.log("Get Data Mesin Keluar : ", result.data);
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
      setDataMesinKeluar(newData);
      setIsLoadData(false);
    } catch (error) {
      alert(`There is an error ${error}`)
      setIsLoadData(false);
    };
  };

  const hitGetNonMesinKeluar = async() => {
    try {
      setIsLoadData(true);
      const result = await Axios({
        url: 'https://atm-biz-siab.getsandbox.com/implementation/kesiapan-mesin/getDataNonMesinKeluar',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          dataPerPage: 10,
          pageNumber: 0,
        },
      });
      const dataResponse = result.data.content;
      const newData = [];
      for(var each in dataResponse){
        const actionData = [
          {
            id: dataResponse[each].id,
            name: 'Edit',
            type: 'Edit',
          },
          {
            id: dataResponse[each].id,
            name: 'Delete',
            type: 'Delete',
          },
        ];
        const newRow = {
            namaBarang: dataResponse[each].namaBarang,
            a: ' ',
            b: ' ',
            c: ' ',
            d: ' ',
            e: ' ',
            f: ' ',
            g: ' ',
            h: ' ',
            action: <MenuMore value={actionData}/>
        };
        newData.push(newRow);
      };
      console.log("Get Data Non Mesin Keluar : ", result.data);
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
      setDataNonMesinKeluar(newData);
      setIsLoadData(false);
    } catch (error) {
      alert(`There is an error ${error}`)
      setIsLoadData(false);
    };
  };

  const hitGetNonMesinMasuk = async() => {
    try {
      setIsLoadData(true);
      const result = await Axios({
        url: 'https://atm-biz-siab.getsandbox.com/implementation/kesiapan-mesin/getDataNonMesinMasuk',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          dataPerPage: 10,
          pageNumber: 0,
        },
      });
      const dataResponse = result.data.content;
      const newData = [];
      for(var each in dataResponse){
        const actionData = [
          {
            id: dataResponse[each].id,
            name: 'Edit',
            type: 'Edit',
          },
          {
            id: dataResponse[each].id,
            name: 'Delete',
            type: 'Delete',
          },
        ];
        const newRow = {
            namaBarang: dataResponse[each].namaBarang,
            a: ' ',
            b: ' ',
            c: ' ',
            d: ' ',
            e: ' ',
            f: ' ',
            g: ' ',
            h: ' ',
            action: <MenuMore value={actionData}/>
        };
        newData.push(newRow);
      };
      console.log("Get Data Non Mesin Masuk : ", result.data);
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
      setDataNonMesinMasuk(newData);
      setIsLoadData(false);
    } catch (error) {
      alert(`There is an error ${error}`)
      setIsLoadData(false);
    };
  };

  const hitGetDataAksesGudang = async() => {
    try {
      setIsLoadData(true);
      const result = await Axios({
        url: 'https://atm-biz-siab.getsandbox.com/implementation/kesiapan-mesin/getDataAksesGudang',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          dataPerPage: 10,
          pageNumber: 0,
        },
      });
      const dataResponse = result.data.content;
      const newData = [];
      for(var each in dataResponse){
        const actionData = [
          {
            id: dataResponse[each].id,
            name: 'Edit',
            type: 'Edit',
          },
          {
            id: dataResponse[each].id,
            name: 'Delete',
            type: 'Delete',
          },
        ];
        const newRow = {
            keperluan: dataResponse[each].keperluan,
            pic: dataResponse[each].pic,
            dateEntry: dataResponse[each].dateEntry,
            dateOut: dataResponse[each].dateOut,
            keterangan: dataResponse[each].keterangan,
            a: ' ',
            b: ' ',
            c: ' ',
            d: ' ',
            action: <MenuMore value={actionData}/>
        };
        newData.push(newRow);
      };
      console.log("Get Data Akses Gudang : ", result.data);
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
      setDataAksesGudang(newData);
      setIsLoadData(false);
    } catch (error) {
      alert(`There is an error ${error}`)
      setIsLoadData(false);
    };
  };

  const hitGetDataSPK = async() => {
    try {
      setIsLoadData(true);
      const result = await Axios({
        url: 'https://atm-biz-siab.getsandbox.com/implementation/kesiapan-mesin/getDataSPK',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          dataPerPage: 10,
          pageNumber: 0,
        },
      });
      const dataResponse = result.data.content;
      const newData = [];
      for(var each in dataResponse){
        const actionData = [
          {
            id: dataResponse[each].id,
            name: 'Edit',
            type: 'Edit',
          },
          {
            id: dataResponse[each].id,
            name: 'Delete',
            type: 'Delete',
          },
        ];
        const newRow = {
            machineSerialNumb: dataResponse[each].machineSerialNumb,
            upsSerialNumb: dataResponse[each].upsSerialNumb,
            lokasiTujuan: dataResponse[each].lokasiTujuan,
            alamat: dataResponse[each].alamat,
            a: ' ',
            b: ' ',
            c: ' ',
            d: ' ',
            e: ' ',
            action: <MenuMore value={actionData}/>
        };
        newData.push(newRow);
      };
      console.log("Get Data SPK : ", result.data);
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
      setDataSPK(newData);
      setIsLoadData(false);
    } catch (error) {
      alert(`There is an error ${error}`)
      setIsLoadData(false);
    };
  };

  function renderViewTrxNasabah(title, data){
    if (data !== null) {
      switch (title) {
        case 'Total ATM':
            return {
              title,
              count: data.totalATM,
            };
        case 'Total CDM':
            return {
              title,
              count: data.totalCDM,
            };
        case 'Total TST':
            return {
              title,
              count: data.totalTST,
            };
        case 'Total Non Mesin':
            return {
              title,
              count: data.totalNonMesin,
            };
        default:
          return { title, count: '0' };
      }
    }
    return { title, count: '0' };
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={3} justify="space-between">
            <Grid item className={classes.backAction}>
              <Button onClick={() => history.goBack()}>
                <BackIcon />
                <Typography className={classes.backLabel}>Back</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  color: '#000000',
                  fontFamily: 'Barlow',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                Target Online : 20 December 2020
              </Typography>
              <Typography
                style={{
                  color: '#BCC8E7',
                  fontFamily: 'Barlow',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '10px',
                  textAlign: 'right'
                }}
              >
                10 Days left
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
           <Grid container direction="row" spacing={3} justify="space-between">
             <Grid item>
               <Typography className={classes.title}>
                 Kesiapan Mesin Detail
               </Typography>
             </Grid>
             <Grid item>
             <Grid container direction="row" spacing={1} justify="space-between">
                 <Typography
                    style={{
                    background: '#EBF0FF',
                    border: '1px solid #749BFF',
                    padding: '8px 14px',
                    color: '#749BFF',
                    fontSize: '15px',
                    borderRadius: '4px',
                    }}
                    >
                    Incomplete
                    <img src={Reload} style={{height: '20px', width: '20px', marginLeft: '10px'}} />
                </Typography>
            </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="flex-end">
          <ChkyButtons onClick={()=> alert("Button Clicked")} style={{textTransform:'capitalize'}}>
            <AddIcon style={{color: '#fff'}}/>Add New
          </ChkyButtons>
        </Grid>

        <Grid item>
            <Row
                gutter={16}
                style={{
                padding: '10px 0 10px 0',
                justifyContent: 'space-between',
                }}
            >
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort={false}
                  summaryOptions={renderViewTrxNasabah('Total ATM', dataCardDetails && dataCardDetails)}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Calculator}
                  imgStyle={{ height: '40px', width: '40px' }}
                  currency=""
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort={false}
                  summaryOptions={renderViewTrxNasabah('Total CDM', dataCardDetails && dataCardDetails)}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Calculator}
                  imgStyle={{ height: '40px', width: '40px' }}
                  currency=""
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort={false}
                  summaryOptions={renderViewTrxNasabah('Total TST', dataCardDetails && dataCardDetails)}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Calculator}
                  imgStyle={{ height: '40px', width: '40px' }}
                  currency=""
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort={false}
                  summaryOptions={renderViewTrxNasabah('Total Non Mesin', dataCardDetails && dataCardDetails)}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Calculator}
                  imgStyle={{ height: '40px', width: '40px' }}
                  currency=""
                />
              </div>
            </Col>
          </Row>
        </Grid>

          <Grid item>
           <Paper className={classes.paper}>
             <Grid
              container
              direction="row"
              justify="center"
              spacing={3}
              style={{ padding: '10px 0px' }}
            >
              <ButtonGroup
                variant="contained"
                disableElevation
                style={{ margin: '0 10px', background: '#F4F7FB' }}
              >
                <BtnGroupItem
                  disabled={type === 'Mesin Masuk'}
                  onClick={() => {
                    onClickType('Mesin Masuk');
                    hitGetMesinMasuk();
                  }}
                >
                  Mesin Masuk
                </BtnGroupItem>
                <BtnGroupItem
                  disabled={type === 'Mesin Keluar'}
                  onClick={() => { 
                    onClickType('Mesin Keluar');
                    hitGetMesinKeluar(); 
                  }}
                >
                  Mesin Keluar
                </BtnGroupItem>
                <BtnGroupItem
                  disabled={type === 'Non Mesin Masuk'}
                  onClick={() => {
                    onClickType('Non Mesin Masuk');
                    hitGetNonMesinKeluar();
                  }}
                  style={{ width: '120px' }}
                >
                  Non Mesin Masuk
                </BtnGroupItem>
                <BtnGroupItem
                  disabled={type === 'Non Mesin Keluar'}
                  onClick={() => {
                    onClickType('Non Mesin Keluar');
                    hitGetNonMesinMasuk();
                  }}
                  style={{ width: '120px' }}
                >
                  Non Mesin Keluar
                </BtnGroupItem>
                <BtnGroupItem
                  disabled={type === 'Akses Gudang Masuk'}
                  onClick={() => {
                    onClickType('Akses Gudang Masuk');
                    hitGetDataAksesGudang();
                  }}
                  style={{ width: '120px' }}
                >
                  Akses Gudang Masuk
                </BtnGroupItem>
                <BtnGroupItem
                  disabled={type === 'SPK Kirim Mesin'}
                  onClick={() => {
                    onClickType('SPK Kirim Mesin');
                    hitGetDataSPK();
                  }}
                  style={{ width: '120px' }}
                >
                  SPK Kirim Mesin
                </BtnGroupItem>
              </ButtonGroup>
            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          {type === 'Mesin Masuk' && (
            <ChkyTablePagination
              fields={titleTableMesinMasuk}
              data={dataMesinMasuk}
              cellOption={valueType}
              changePage={handleChangePage}
              isLoadData={isLoadData}
            />
          )}

          {type === 'Mesin Keluar' && (
            <ChkyTablePagination
              fields={titleTableMesinKeluar}
              data={dataMesinKeluar}
              cellOption={valueType}
              changePage={handleChangePage}
              isLoadData={isLoadData}
            />
          )}

          {type === 'Non Mesin Masuk' && (
            <ChkyTablePagination
              fields={titleTableNonMesin}
              data={dataNonMesinKeluar}
              cellOption={valueType2}
              changePage={handleChangePage}
              isLoadData={isLoadData}
            />
          )}

          {type === 'Non Mesin Keluar' && (
            <ChkyTablePagination
              fields={titleTableNonMesin}
              data={dataNonMesinMasuk}
              cellOption={valueType2}
              changePage={handleChangePage}
              isLoadData={isLoadData}
            />
          )}

          {type === 'Akses Gudang Masuk' && (
            <ChkyTablePagination
              fields={titleAksesGudang}
              data={dataAksesGudang}
              cellOption={valueType2}
              changePage={handleChangePage}
              isLoadData={isLoadData}
            />
          )}

          {type === 'SPK Kirim Mesin' && (
            <ChkyTablePagination
              fields={titleTableSPKMesin}
              data={dataSPK}
              cellOption={valueType2}
              changePage={handleChangePage}
              isLoadData={isLoadData}
            />
          )}
        </Grid>
      </Grid>
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

export default KesiapanMesin;