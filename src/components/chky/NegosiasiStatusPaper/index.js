import { Button, Divider, Grid, Paper, Table, TableCell, TableRow, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import React from 'react';

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
});

const RejectButton = withStyles({
  root: {
    background: '#DC241F',
    borderRadius: 8,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px',
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 13, 
    fontWeight: 600,
  },
})(Button);
const RenegotiateButton = withStyles({
  root: {
    background: 'white',
    borderRadius: 8,
    border: '1px solid #DC241F',
    color: '#DC241F',
    height: 40,
    padding: '0 30px',
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 13, 
    fontWeight: 600,
  },
})(Button);
const ApproveButton = withStyles({
  root: {
    background: '#65D170',
    borderRadius: 8,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px',
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 13, 
    fontWeight: 600,
  },
})(Button);

function NegosiasiStatusPaper() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography style={{fontSize:24, marginBottom: 20}}>Negosiasi Selesai</Typography>
      <Typography style={{fontSize:15}}>Kesepakatan tercapai.</Typography>
      <Typography style={{fontSize:15}}>Berikut rincian biaya keseluruhan selama masa sewa 5 tahun.</Typography>
      <Typography style={{fontSize:18, fontWeight:500, marginTop: 12}}>Biaya Sewa & Pengadaan</Typography>
      <Table size="small">
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Biaya Sewa</TableCell>
          <TableCell className={classes.tableCell}>: Rp 31.500.000</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Biaya Listrik</TableCell>
          <TableCell className={classes.tableCell}>: Rp 200.000</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Telepon</TableCell>
          <TableCell className={classes.tableCell}>: Rp 300.000</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>Service Charge</TableCell>
          <TableCell className={classes.tableCell}>: Rp 100.000</TableCell>
        </TableRow>

      </Table>
        
      <Divider style={{marginBottom:10,marginTop:10,}}/>
      <Table size="small">
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCellTot}>Total Sewa</TableCell>
          <TableCell className={classes.tableCellTot}>: Rp 37.500.000</TableCell>
        </TableRow>
      </Table>
      <Divider style={{marginTop:10,marginBottom:50}}/>
      <Grid container justify="space-between" style={{position: 'absolute',bottom:20, width: '92.5%'}}>
        <Grid item>
          <RejectButton>Reject</RejectButton>
        </Grid>
        <Grid item>
          <RenegotiateButton>Renegotiate</RenegotiateButton>
        </Grid>
        <Grid item>
          <ApproveButton>Approve</ApproveButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NegosiasiStatusPaper;
