import React , {useState}from 'react';
import {makeStyles} from "@material-ui/styles";
import {Typography,Grid} from "@material-ui/core";
import NumberRequest from "./NumberRequest/index"
import OrderToVendor from './OrderToVendor';
import PersentationStatus from './PersentationStatus';
import NumberVendor from './NumberVendor';
import VendorPajak from './VendorPajak';


const UseStyles = makeStyles({
    root:{
        padding:"30px 20px 20px 30px"
    },
    title:{
        fontFamily:"Barlow",
        fontWeight:"500",
        fontSize:"36px"
    },
    titleContainer:{
        marginBottom:15,
    }
})

function index() {
 const classes = UseStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="space-between"
        className={classes.titleContainer}
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title}>Vendor Management</Typography>
        </Grid>
      </Grid>
      {/*content*/}
      {/*Jumlah Request*/}
      <Grid item style={{ marginTop: 20 }}>
        <NumberRequest />
      </Grid>
      <Grid item style={{ marginTop: 20 }}>
        <OrderToVendor />
      </Grid>
      <Grid item style={{ marginTop: 20 }}>
        <PersentationStatus />
      </Grid>
      <Grid item style={{ marginTop: 20 }}>
        <NumberVendor />
      </Grid>
      <Grid item style={{ marginTop: 20 }}>
        <VendorPajak />
      </Grid>
    </div>
  );
}
export default index;
