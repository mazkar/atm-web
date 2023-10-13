/* eslint-disable array-callback-return */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { Paper, Grid, Typography, Table, TableCell, TableRow, TableBody } from '@material-ui/core';
import { Divider } from 'antd';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import { ReactComponent as CostIcon } from '../../../assets/icons/siab/cost-icon.svg';
import RupiahConverter from '../../../helpers/useRupiahConverter';
import ChartCost from './ChartCost';

const useStyles = makeStyles({
  container: {
    borderRadius: 10,
    padding: 20,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    marginTop: 20,
  },
  tableRow: {
    "& .MuiTableCell-sizeSmall":{padding: 2,},
  },
  tableCell: {
    borderBottom: "unset",
    fontSize:12,
    width: "16.5%",
  },
  tableCellTotal: {
    borderBottom: "unset",
    fontWeight: 700,
    fontSize:13,
    width: "30%",
  },
  select: {
    padding: 10,
    '& .MuiSelect-icon':{
      top: 'unset',
      right: 5,
    }
  },
  total: {
    paddingTop: 10,
    paddingBottom: 10,
  }
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #BCC8E7',
    fontSize: 13,
    padding: '6px 12px 6px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 8,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const  PaperCost = (props) => {
  const { cost, idAtm } = props;
  // console.log(cost);
  const classes = useStyles();
  const [showCost, setShowCost] = useState({});
  const [filterByValue, setFilterByValue] = useState(1);

  const handleCostYear = (year) => {
    const newCost = {
      stickerCost: RupiahConverter(cost[year-1]?.stickerCost),
      taxBillboard: RupiahConverter(cost[year-1]?.taxBillboard),
      taxPromotion: RupiahConverter(cost[year-1]?.taxPromotion),
      totalAll: RupiahConverter(cost[year-1]?.totalAll),
      totalPromosition: RupiahConverter(cost[year-1]?.totalPromosition),
      totalRent: RupiahConverter(cost[year-1]?.totalRent),
      totalTax: RupiahConverter(cost[year-1]?.totalTax),
      yearlyElectricityCost: RupiahConverter(cost[year-1]?.yearlyElectricityCost),
      yearlyRentCost: RupiahConverter(cost[year-1]?.yearlyRentCost),
      yearlyServiceCharge: RupiahConverter(cost[year-1]?.yearlyServiceCharge),
      yearlySignageCost: RupiahConverter(cost[year-1]?.yearlySignageCost),
      yearlyTelephoneRentCost: RupiahConverter(cost[year-1]?.yearlyTelephoneRentCost),
      boothBuildCost: RupiahConverter(cost[year-1]?.boothBuildCost),
      totalImplementation: RupiahConverter(cost[year-1]?.totalImplementation),
      yearlyAntenaLandCost: RupiahConverter(cost[year-1]?.yearlyAntenaLandCost),
      yearlyCleanliness: RupiahConverter(cost[year-1]?.yearlyCleanliness),
      yearlyConsessionCost: RupiahConverter(cost[year-1]?.yearlyConsessionCost),
      yearlyFlmCost: RupiahConverter(cost[year-1]?.yearlyFlmCost),
      yearlyJarkomCost: RupiahConverter(cost[year-1]?.yearlyJarkomCost),
      yearlyMaintenance: RupiahConverter(cost[year-1]?.yearlyMaintenance),
      yearlyMediaPromotionCost: RupiahConverter(cost[year-1]?.yearlyMediaPromotionCost),
      yearlyNotaryCost: RupiahConverter(cost[year-1]?.yearlyNotaryCost),
      yearlyOtherCost: RupiahConverter(cost[year-1]?.yearlyOtherCost),
      yearlyPromotionCost: RupiahConverter(cost[year-1]?.yearlyPromotionCost),
      yearlyRentCostList:  RupiahConverter(cost[year-1]?.yearlyRentCostList[year-1]),
      yearlySlmCost: RupiahConverter(cost[year-1]?.yearlySlmCost),
      yearlySupportFacilities: RupiahConverter(cost[year-1]?.yearlySupportFacilities),
      yearlyTax: RupiahConverter(cost[year-1]?.yearlyTax),
    };
    console.log('+++ newCost', newCost);
    setShowCost(newCost);
  };

  const handleFilterByChange = (event) => {
    setFilterByValue(event.target.value);
  };

  useEffect(() => {
    console.log('+++ filterByValue',filterByValue);
    if (cost.length !== 0) {
      handleCostYear(filterByValue);
    }
  },[filterByValue,cost]);

  return(
    <div>
      <ChartCost idAtm={idAtm}/>
      <Paper className={classes.container}>
        <Grid container direction="row" spacing={2} justify="flex-start">
          <Grid item style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: 30, 
            height: 30, 
            backgroundColor: '#FFE9E9', 
            borderRadius: 10}}><CostIcon/></Grid>
          <Grid item>
            <Typography variant="body1" component="h6" style={{fontWeight: 500}}>Cost</Typography>
          </Grid>
        </Grid>

        <Grid container direction="column">
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography style={{fontSize: 15, fontWeight: 600}}>Lihat Keseluruhan Biaya Dalam :</Typography>
            </Grid>
            <Grid item>
              {/* ===> Start Select FilterBy */}
              <FormControl className={classes.select}>
                <Select
                  id="filterBy"
                  value={filterByValue}
                  onChange={handleFilterByChange}
                  input={<BootstrapInput />}
                  IconComponent={DropDownIcon}
                >
                  {cost.map((item, index)=>{
                    return <MenuItem value={index+1}>Tahun ke {index+1}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              {/* ===< End Select FilterBy */}
            </Grid>
          </Grid>
          <Typography style={{fontSize:15, fontWeight: 600, marginBottom: 10}}>Biaya Sewa dan Pengadaan</Typography>
          <Table size="small">
            <TableBody>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Biaya Sewa</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyRentCostList}</TableCell>
                <TableCell className={classes.tableCell}>Sewa Lahan Signage</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlySignageCost}</TableCell>
                <TableCell className={classes.tableCell}>Other</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyOtherCost}</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Listrik Pertahun</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyElectricityCost}</TableCell>
                <TableCell className={classes.tableCell}>Biaya Notaris</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyNotaryCost}</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Lahan Antena Vsat</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyAntenaLandCost}</TableCell>
                <TableCell className={classes.tableCell}>Biaya Promosi</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyPromotionCost}</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Service Charge</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyServiceCharge}</TableCell>
                <TableCell className={classes.tableCell}>Biaya Konsesi</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyConsessionCost}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Divider style={{margin: '10px 0px 10px 0px'}}/>
          <Table size="small">
            <TableBody>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellTotal}>Total Sewa & Pengadaan</TableCell>
                <TableCell className={classes.tableCellTotal}>: {showCost.totalRent} </TableCell>
                <TableCell className={classes.tableCellTotal}>&nbsp;</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Divider style={{margin: '10px 0px 10px 0px'}}/>

          {/* BIAYA IMPLEMENTASI */}

          <Typography style={{fontSize:15, fontWeight: 600, marginBottom: 10}}>Biaya Implementasi</Typography>
          <Table size="small">
            <TableBody>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>FLM</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyFlmCost}</TableCell>
                <TableCell className={classes.tableCell}>Pajak</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyTax}</TableCell>
                <TableCell className={classes.tableCell}>&nbsp;</TableCell>
                <TableCell className={classes.tableCell}>&nbsp;</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>SLM</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlySlmCost}</TableCell>
                <TableCell className={classes.tableCell}>Maintenance</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyMaintenance}</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Jarkom</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyJarkomCost}</TableCell>
                <TableCell className={classes.tableCell}>Sarana Pendukung</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlySupportFacilities}</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Media Promosi</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyMediaPromotionCost}</TableCell>
                <TableCell className={classes.tableCell}>Kebersihan</TableCell>
                <TableCell className={classes.tableCell}>: {showCost.yearlyCleanliness}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Divider style={{margin: '10px 0px 10px 0px'}}/>
          <Table size="small">
            <TableBody>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellTotal}>Total Implementasi</TableCell>
                <TableCell className={classes.tableCellTotal}>: {showCost.totalImplementation}</TableCell>
                <TableCell className={classes.tableCellTotal}> </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        
          <Divider style={{margin: '10px 0px 10px 0px'}}/>

          <Table size="small">
            <TableBody>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellTotal} style={{fontSize: 17}}>Total Keseluruhan Cost</TableCell>
                <TableCell className={classes.tableCellTotal} style={{fontSize: 17}}>: {showCost.totalAll}</TableCell>
                <TableCell className={classes.tableCellTotal}> </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Paper>
    </div>
    
  );
};

PaperCost.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cost: PropTypes.object.isRequired,
  idAtm: PropTypes.string.isRequired,
};

export default PaperCost;