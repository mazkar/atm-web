/* eslint-disable no-alert */
import { Avatar, Button, Divider, Grid, Paper, Table, TableCell, TableRow, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import {ReactComponent as FileIcon} from '../../../assets/icons/general/paperclip.svg';
import ChkyButtons from '../ChkyButtons';

const useStyles = makeStyles({
  root: {padding: 20,borderRadius: 10, height: '100%', position:'relative',},
  tableRow: {
    "& .MuiTableCell-sizeSmall":{padding: 2,},
  },
  tableCell: {
    borderBottom: "unset",
    fontSize:12,
  },
  tableCellTot: {
    borderBottom: "unset",
    fontSize:13,
    fontWeight: 500,
  },
  documentLink: {
    backgroundColor: 'unset', 
    padding: 0,
    '& .MuiButton-root':{padding: 0, textTransform: 'none' ,backgroundColor: 'unset'},
    '& .MuiButton-root:hover':{opacity: 0.6,backgroundColor: 'unset'},
  },
});

const idrCurrencyFormat = (value, delimiter) => {
  return `Rp ${  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)}`;
};

function Approver(props){
  const { approver } = props;
  function renderBackColor(intialName){
    if(intialName === 'DH'){
      return '#88ADFF';
    }
    if (intialName === 'TS'){
      return '#FFB443';
    }
    if (intialName === 'BA'){
      return '#65D170';
    }
    if (intialName === 'Y'){
      return '#FF6A6A';
    }
    return '#88ADFF';
  }

  return(
    <div style={{display: 'flex'}}>
      {approver.map((item)=> {
        return (
          <Avatar style={{backgroundColor: renderBackColor(item), width: 32, height: 32, margin: 2.5, fontSize: 14}}>
            {item}
          </Avatar>  
        );
      })}
    </div>
  );
}

Approver.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  approver: PropTypes.array,
};

Approver.defaultProps = {
  approver: ["DH","TS","BA","Y","L"],
};

function ChkyApprovalDetailPaper(props) {
  const classes = useStyles();
  const {dataApproval, rejectionBtnHandler, renegotiateBtnHandler, approveBtnHandler} = props;
  function handlerDownloadDoc(){
    alert(`=== Url file ${dataApproval.documentSpapm} = ${dataApproval.documentSpapmUrl}`);
  }
  return (
    <Paper className={classes.root}>
      <Typography style={{fontSize:24, marginBottom: 20}}>Approval</Typography>
      <Typography style={{fontSize:15}}>SPAPM telah menyetujui pengadaan dengan rincian sebagai berikut:</Typography>
      <Typography style={{fontSize:18, fontWeight:500, marginTop: 12}}>Biaya Sewa & Pengadaan</Typography>
      <Table size="small">
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Biaya Sewa</TableCell>
          <TableCell className={classes.tableCell}>: {idrCurrencyFormat(dataApproval.biayaSewa, '.')}</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Biaya Listrik</TableCell>
          <TableCell className={classes.tableCell}>: {idrCurrencyFormat(dataApproval.biayaListrik, '.')}</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Telepon</TableCell>
          <TableCell className={classes.tableCell}>: {idrCurrencyFormat(dataApproval.telepon, '.')}</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Service Charge</TableCell>
          <TableCell className={classes.tableCell}>: {idrCurrencyFormat(dataApproval.serviceCharge, '.')}</TableCell>
        </TableRow>

      </Table>
        
      <Divider style={{marginBottom:10,marginTop:10,}}/>
      <Table size="small">
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCellTot}>Total Sewa</TableCell>
          <TableCell className={classes.tableCellTot}>: {idrCurrencyFormat(dataApproval.totalSewa, '.')}</TableCell>
        </TableRow>
      </Table>
      <Divider style={{marginTop:10,marginBottom:20}}/>

      <Grid container spacing={1}>
        <Grid item style={{marginTop:5}}><FileIcon/></Grid>
        <Grid item>
          <div className={classes.documentLink} >
            <Button onClick={() => handlerDownloadDoc()}>
              <Typography  style={{color: '#DC241F', fontSize: 14}}>
                {dataApproval.documentSpapmName === null ? 'N/A' : dataApproval.documentSpapmName}
              </Typography>
            </Button>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={1} direction="column" style={{marginTop:33}}>
        <Grid item>
          <Typography style={{fontSize: 15, fontWeight: 600}}>Approved By</Typography>
        </Grid> 
        <Grid item>
          <Approver approver={dataApproval.approver}/>
        </Grid>
      </Grid>
      
      <Grid container justify="space-between" style={{position: 'absolute',bottom:20, width: '92.5%'}}>
        <Grid item>
          <ChkyButtons onClick={rejectionBtnHandler}>Reject</ChkyButtons>
        </Grid>
        <Grid item>
          <ChkyButtons onClick={renegotiateBtnHandler} buttonType="redOutlined">Renegotiate</ChkyButtons>
        </Grid>
        <Grid item>
          <ChkyButtons onClick={approveBtnHandler} buttonType="greenFilled">Approve</ChkyButtons>
        </Grid>
      </Grid>
    </Paper>
  );
}
ChkyApprovalDetailPaper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataApproval: PropTypes.array,
  rejectionBtnHandler: PropTypes.func,
  renegotiateBtnHandler: PropTypes.func,
  approveBtnHandler: PropTypes.func,
};
    
ChkyApprovalDetailPaper.defaultProps = {
  dataApproval: [],
  rejectionBtnHandler: ()=>{alert("Button Rejection Clicked");},
  renegotiateBtnHandler: ()=>{alert("Button Renegotiate Clicked");},
  approveBtnHandler: ()=>{alert("Button Approve Clicked");},
};

export default ChkyApprovalDetailPaper;
