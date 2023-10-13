/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable react/require-default-props */
/* eslint-disable no-shadow */
/* eslint-disable no-const-assign */
/* eslint-disable operator-assignment */
/* eslint-disable react/forbid-prop-types */
import { Avatar, Button, Divider, Grid, Paper, Table, TableCell, TableRow, Typography , Link} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import Axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { RootContext } from '../../../router';
import { ReactComponent as FileIcon } from '../../../assets/icons/general/paperclip.svg';
import ChkyButtons from '../../../components/chky/ChkyButtons';
import getInitial from '../../../helpers/initialName';
import getMinioFile from '../../../helpers/getMinioFromUrl';
import ModalLoader from '../../../components/ModalLoader';

const useStyles = makeStyles({
  root: { padding: 20, borderRadius: 10, height: '110%', position: 'relative', },
  tableRow: {
    "& .MuiTableCell-sizeSmall": { padding: 2, },
  },
  tableCell: {
    borderBottom: "unset",
    fontSize: 12,
  },
  tableCellTot: {
    borderBottom: "unset",
    fontSize: 13,
    fontWeight: 500,
  },
  textTitle: {
    fontFamily: 'Barlow',
    fontSize: 15,
    fontWeight: 600,
    borderBottom: "unset",
  },
  textBody: {
    fontFamily: 'Barlow',
    fontWeight: 400,
    fontSize: 12,
    borderBottom: "unset",
  },
  textTotal: {
    fontFamily: 'Barlow',
    fontWeight: 700,
    fontSize: 13,
    borderBottom: "unset",
  },
  documentLink: {
    backgroundColor: 'unset',
    padding: 0,
    '& .MuiButton-root': { padding: 0, textTransform: 'none', backgroundColor: 'unset' },
    '& .MuiButton-root:hover': { opacity: 0.6, backgroundColor: 'unset' },
  },
});

const idrCurrencyFormat = (value, delimiter) => {
  return `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)}`;
};

function Procure(props) {
  const { procure } = props;
  function renderBackColor(initialName) {
    if (initialName === 'DH') {
      return '#88ADFF';
    }
    if (initialName === 'TS') {
      return '#FFB443';
    }
    if (initialName === 'BA') {
      return '#65D170';
    }
    if (initialName === 'Y') {
      return '#FF6A6A';
    }
    return '#88ADFF';
  }

  return (
    <div style={{ display: 'flex' }}>
      {procure.map((item) => {
        return (
          <Avatar style={{ backgroundColor: renderBackColor(item), width: 32, height: 32, margin: 2.5, fontSize: 14 }}>
            {item}
          </Avatar>
        );
      })}
    </div>
  );
}

Procure.propTypes = {
  procure: PropTypes.array,
};

Procure.defaultProps = {
  procure: [],
};

const RenderOfferingFile=({filePath})=>{
  const [dataOffering,setDataOffering] = useState(null);
  function limitString(string, count){
    const result = string.slice(0, count) + (string.length > count ? "..." : "");
    return result;
  }
  useEffect(()=>{
    try{
      getMinioFile(filePath).then(result=>{
        // console.log(">>>> try getMinio Offering ",JSON.stringify(result));
        setDataOffering(result);
      });
    }catch(err){
      console.log(">>>> Error try getMinio", err);
    }
  },[]);
  useEffect(()=>{console.log(">>>> dataOffering: ", dataOffering);},[dataOffering]);
  return(
    <Link href={dataOffering === null ? '#' : dataOffering.fileUrl} target="_blank" style={{textDecoration: 'none',fontSize: 13, color: '#DC241F', fontWeight: 400}}>
      {dataOffering === null ? 'N/A': limitString(dataOffering.fileName, 25)}
    </Link>
  );
};
RenderOfferingFile.propTypes={
  filePath: PropTypes.string.isRequired,
};

function isEmpty(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const x in obj) { if (obj.hasOwnProperty(x))  return false; }
  return true;
}

function ProcurementPaper(props) {
  const { dataProcurement, renegotiateBtnHandler, approveBtnHandler , locId, isApproved} = props;
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [totalBiayaRent, setTotalBiayaRent] = useState(0);
  const { userId, userRoleName } = useContext(RootContext);
  const classes = useStyles();
  const [initial, setInitial] = useState();

  useEffect(() => {
    if(dataProcurement.daNameList?.length > 0){
      const name = dataProcurement.daNameList.map((val) => {
        return (getInitial(val));
      });
      setInitial(name);
    }
    function handleAddTotalBiaya(){
      let biayaTotal = 0;  
      dataProcurement.detailInforent.map((item) => {
        biayaTotal = biayaTotal+item.yearlyRentCost;
      });
      setTotalBiayaRent(biayaTotal);
    }
    if(!isEmpty(dataProcurement)){
      handleAddTotalBiaya();
    }
  }, [dataProcurement]);  

  const buttonApprove = () => {
    const data = {
      "id" : dataProcurement.id,
      "userId": userId,
      "locationId": locId.id
    };
    // console.log(data);
    setModalLoader(true);
    Axios.post(`${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/approveProcurement`, data)
      .then((res) => {
        if(res.status === 200){
          if(res.data.responseCode === "01"){
            alert(res.data.responseMessage)
            setModalLoader(false);
          } else {
            window.location.assign('/procurement');
          }
          //  alert("success")
        }
        else{
          alert("Failed to Approve");
          setModalLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setModalLoader(false);
        // setModalLoader(false)
        // alert(`===> Error When Fetch Data${err}`);
      });
  };

  const buttonRenego = () => {
    const data = {
      "id" : dataProcurement.id,
      "userId": userId,
      "locationId": locId.id
    };
    setModalLoader(true);
    Axios.post(`${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/reNegotiateProcurement`, data)
      .then((res) => {
        if(res.status === 200){
          if(res.data.responseCode === "01"){
            alert(res.data.responseMessage)
            setModalLoader(false);
          } else {
            window.location.assign('/procurement');
          }
        }
        else{
          alert("Failed to Renego");
          setModalLoader(false);
        }
      })
      .catch((err) => {
        setModalLoader(false);
        console.log(err);
        // setModalLoader(false)
        // alert(`===> Error When Fetch Data${err}`);
      });
  };

  const isProcurementTeam = userRoleName.toLowerCase().includes('spapm')

  return (
    <Paper className={classes.root}>
      <Typography style={{ fontSize: 24, marginBottom: 20 }}>Approval</Typography>
      <Typography style={{ fontSize: 15 }}>SPAPM telah menyetujui pengadaan dengan rincian sebagai berikut:</Typography>
      <Typography style={{fontSize:18, fontWeight:500, marginTop: 12}}>Biaya Sewa</Typography>
      <Table size="small" style={{marginTop:10}}>
        {isEmpty(dataProcurement) ? 'N/A': dataProcurement.detailInforent.map((item, index)=>{
          return(
            <TableRow className={classes.tableRow}>
              <TableCell width="40%" className={classes.textBody}>Tahun ke - {index+1}</TableCell>
              <TableCell className={classes.textBody}>
                        : {idrCurrencyFormat(item.yearlyRentCost, '.')}
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCellTot}>Total</TableCell>
          <TableCell className={classes.tableCellTot}>
            : {idrCurrencyFormat(totalBiayaRent, '.')}
          </TableCell>
        </TableRow>
      </Table>
      <Divider style={{marginTop:10,marginBottom:20}}/>
        
      <Typography style={{fontSize:18, fontWeight:500, marginTop: 12}}>Biaya Lain-Lain</Typography>
      <Table size="small">
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.textBody}>Biaya Listrik</TableCell>
          <TableCell className={classes.textBody}>
                    : {isEmpty(dataProcurement) ? 'N/A': idrCurrencyFormat(dataProcurement.yearlyElectricityCost, '.')}
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.textBody}>Biaya Telephone</TableCell>
          <TableCell className={classes.textBody}>
                    : {isEmpty(dataProcurement) ? 'N/A': idrCurrencyFormat(dataProcurement.yearlyTelephoneRentCost, '.')}
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.textBody}>Service Charge</TableCell>
          <TableCell className={classes.textBody}>
                    : {isEmpty(dataProcurement) ? 'N/A': idrCurrencyFormat(dataProcurement.yearlyServiceCharge, '.')}
          </TableCell>
        </TableRow>
        {/* <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.textBody}>Sewa Lahan Signage / Pole Sign</TableCell>
          <TableCell className={classes.textBody}>
                    : valueHere
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.textBody}>Biaya Notaris</TableCell>
          <TableCell className={classes.textBody}>
                    : valueHere
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.textBody}>Biaya Promosi</TableCell>
          <TableCell className={classes.textBody}>
                    : valueHere
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.textBody}>Biaya Konsesi</TableCell>
          <TableCell className={classes.textBody}>
                    : valueHere
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.textBody}>Other</TableCell>
          <TableCell className={classes.textBody}>
                    : valueHere
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCellTot}>Total Sewa</TableCell>
          <TableCell className={classes.tableCellTot}>: valueHere</TableCell>
        </TableRow> */}
      </Table>
      <Divider style={{marginTop:10,marginBottom:20}}/>

      {/* <Typography style={{fontSize:18, fontWeight:500, marginTop: 12}}>Perkiraan Harga Dari Lokasi Setipe</Typography>
      <Table size="small">
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.textBody}>Nilai Terendah</TableCell>
          <TableCell className={classes.textBody}>
                    : valueHere
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.textBody}>Nilai Tengah</TableCell>
          <TableCell className={classes.textBody}>
                    : valueHere
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.textBody}>Nilai Tertinggi</TableCell>
          <TableCell className={classes.textBody}>
                    : valueHere
          </TableCell>
        </TableRow>
      </Table>
      <Divider style={{marginTop:10,marginBottom:20}}/> */}
      {/* <Typography style={{ fontSize: 18, fontWeight: 500, marginTop: 12 }}>Biaya Sewa & Pengadaan</Typography>
      <Table size="small">
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Biaya Sewa</TableCell>
          <TableCell className={classes.tableCell}>: {isEmpty(dataProcurement) ? 'N/A': idrCurrencyFormat(dataProcurement.negotiationDealCost, '.')}</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Biaya Listrik</TableCell>
          <TableCell className={classes.tableCell}>: {isEmpty(dataProcurement) ? 'N/A':idrCurrencyFormat(dataProcurement.yearlyElectricityCost, '.')}</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Telepon</TableCell>
          <TableCell className={classes.tableCell}>: {isEmpty(dataProcurement) ? 'N/A':idrCurrencyFormat(dataProcurement.yearlyTelephoneRentCost, '.')}</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Service Charge</TableCell>
          <TableCell className={classes.tableCell}>: {isEmpty(dataProcurement) ? 'N/A':idrCurrencyFormat(dataProcurement.yearlyServiceCharge, '.')}</TableCell>
        </TableRow>
      </Table>

      <Divider style={{ marginBottom: 10, marginTop: 10, }} /> */}
      {/* <Table size="small">
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCellTot}>Total Sewa</TableCell>
          <TableCell className={classes.tableCellTot}>: {isEmpty(dataProcurement) ? 'N/A':idrCurrencyFormat(dataProcurement.totalRent, '.')}</TableCell>
        </TableRow>
      </Table>
      <Divider style={{ marginTop: 10, marginBottom: 20 }} /> */}

      <Grid container spacing={1}>
        <Grid item style={{ marginTop: 5 }}><FileIcon /></Grid>
        <Grid item>
          <div className={classes.documentLink} >
            {isEmpty(dataProcurement) ? <Typography  style={{color: '#DC241F', fontSize: 14}}>N/A</Typography> 
              : dataProcurement.documents === null ? <Typography  style={{color: '#DC241F', fontSize: 14}}>N/A</Typography> : dataProcurement.documents.length < 1 ? <Typography  style={{color: '#DC241F', fontSize: 14}}>N/A</Typography> :
                <RenderOfferingFile filePath={dataProcurement.documents}/>}
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={1} direction="column" style={{ marginTop: 20, marginBottom: 30}}>
        <Grid item>
          <Typography style={{ fontSize: 15, fontWeight: 600 }}>Approved By</Typography>
        </Grid>
        <Grid item>
          <Procure procure={initial} />
        </Grid>
      </Grid>
      {isApproved === 'true' ? null : 
        <Grid container justify="space-between" style={{ position: 'absolute', bottom: 20, width: '92.5%'}}>
          <Grid item>
            <ChkyButtons disabled={!isProcurementTeam} onClick={buttonRenego} buttonType="redOutlined">Renegotiate</ChkyButtons>
          </Grid>
          <Grid item>
            <ChkyButtons disabled={!isProcurementTeam} onClick={buttonApprove} buttonType="greenFilled">Approve</ChkyButtons>
          </Grid>
        </Grid>
      }
      
      <ModalLoader isOpen={isOpenModalLoader} />
    </Paper>
  );
}

ProcurementPaper.propTypes = {
  dataProcurement: PropTypes.array,
  locId: PropTypes.string,
  isApproved: PropTypes.bool,
};

ProcurementPaper.defaultProps = {
  dataProcurement: [],
  isApproved: false,
};
export default ProcurementPaper;