import React, {useState} from 'react';
import { Typography, Grid,  IconButton, } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import constants from '../../helpers/constants';
import moment from 'moment';

import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import DynamicTable from '../../components/DynamicTable';
import TotalTransactionForecastingChart from '../../components/Chart/TotalTransactionForecastingChart';
import Title from '../../components/Title/Title';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import SelectWithCaptions from '../../components/Selects/SelectWithCaptions';

import Medical from '../../assets/icons/siab/medical.png';
import { ReactComponent as ArrowLeft } from '../../assets/icons/siab/arrow-left.svg';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  container: {
    marginTop: 25,
  },
  paper: {
    margin: '23px 0px 35px 0px',
    padding: '12px',
  },
  table: {
    minWidth: 650,
  },
  tableTermin: {
    textAlign: 'left',
    '& .MuiPaper-elevation1': {
      boxShadow: 'none',
    },
  },
  backButton: {
    marginBottom: 20, 
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

const useYearStyles = makeStyles({
  cardContainer: {
    borderRadius: 10,
    padding: 15,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  chartContainer: {
    height: 280,
  },
  yearControllerContainer: {
    border: '1px solid #E6EAF3',
    borderRadius: 8,
    width: '24%',
    margin: '10px 0px 0px 365px',
  },
  yearControllerButton: {
    padding: '7px 10px',
    color: constants.color.primaryHard,
  },
});


  const titleTable = [ 'Issue', 'Date Issue', 'Date Fixed', 'Estimate Revenue Lost', 'Status' ];

  const dataTable = [
    { issueMedical: 'ATM Error', dateIssue: '02/02/2020', dateFixed: '03/02/2020', estimateRevenueLost: 'Rp.30.000.000', statusMedical:'Complete' },
    { issueMedical: 'Pembobolan', dateIssue: '02/02/2020', dateFixed: '03/02/2020', estimateRevenueLost: 'Rp.30.000.000', statusMedical:'Complete' },
    { issueMedical: 'Offline', dateIssue: '02/02/2020', dateFixed: '03/02/2020', estimateRevenueLost: 'Rp.30.000.000', statusMedical:'Incomplete' },
    { issueMedical: 'Offline', dateIssue: '02/02/2020', dateFixed: '03/02/2020', estimateRevenueLost: 'Rp.30.000.000', statusMedical:'Incomplete' },
    { issueMedical: 'Offline', dateIssue: '02/02/2020', dateFixed: '03/02/2020', estimateRevenueLost: 'Rp.30.000.000', statusMedical:'Incomplete' },
  ];
  const valueType = [ 'string', 'string', 'string', 'string', 'statusMedical' ];
  // const isSort = [ false , true, true, false, false ];

  const totalTransactionData = [
      { date: 'Jan', transaction: 10_000_000 },
      { date: 'Feb', transaction: 12_000_000 },
      { date: 'Mar', transaction: 24_500_000 },
      { date: 'Apr', transaction: 13_800_000 },
      { date: 'May', transaction: 34_200_000 },
      { date: 'Jun', transaction: 19_100_000 },
      { date: 'Jul', transaction: 20_000_000 },
      { date: 'Aug', transaction: 25_000_000 },
      { date: 'Sep', transaction: 34_000_000 },
      { date: 'Oct', transaction: 19_000_000 },
      { date: 'Nov', transaction: 20_000_000 },
      { date: 'Des', transaction: 35_000_000 },
  ]  

  
  const YearController = () => {
    const [year, setYear] = useState(moment().year());
    const { yearControllerContainer, yearControllerButton } = useYearStyles();
  
    const handleDecreaseYear = () => setYear((prevValue) => prevValue - 1);
    const handleIncreaseYear = () => setYear((prevValue) => prevValue + 1);
    
  
    return (
      <Grid container alignItems="center" className={yearControllerContainer}>
        <Grid item>
          <IconButton
            className={yearControllerButton}
            onClick={handleDecreaseYear}
          >
            <ChevronLeft />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="body1" component="p">
            {year}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            className={yearControllerButton}
            onClick={handleIncreaseYear}
          >
            <ChevronRight />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

const terminDetail = () => {
  const {
    root,
    container,
    paper,
    tableTermin,
    backButton,
  } = useStyles();

const handleYearData = (prevValue) => {
  console.log('year data', prevValue);
}

const [monthFilter, setMonthFilter] = useState(totalTransactionData)

const handleSelectMonth = (newValue) => {
  console.log('month data', newValue);
  if (newValue === 0) {
    setMonthFilter(totalTransactionData.slice(0, 3))
    console.log('3 Months Data')
  } else if (newValue === 1) {
    setMonthFilter(totalTransactionData.slice(0, 4))
    console.log('4 Months Data')
  } else if (newValue === 2) {
    setMonthFilter(totalTransactionData.slice(0, 6))
    console.log('6 Months Data')
  } else if (newValue === 3) {
    setMonthFilter(totalTransactionData.slice(0, 9))
    console.log('9 Months Data')
  } else {
    setMonthFilter(totalTransactionData)
    console.log('A Year Data')
  }
}


  return (
    <div className={root}>
      <div className={backButton}>
      <MuiIconLabelButton
        label="Back"
        iconPosition="startIcon"
        onClick={() => window.location.assign(`/forecasting`)}
        buttonIcon={<ArrowLeft/>}
      />
      </div>

      <Title title="Termin Detail" />
      <div className={container}>
        <Paper>
          <Grid item>
            <TotalTransactionForecastingChart
             data={monthFilter} 
             title= "Total Transaction"
             handleYearData={handleYearData}
             handleSelectMonth={handleSelectMonth}
            //  handleSelectedMonth={monthFilter}
            />
          </Grid>
        </Paper>

        <Paper className={paper}>

        <Grid 
          container
          direction="row"
          spacing={5}>
              
          <Grid item xs={6}>
            <Typography variant="h6" component="h6" >
              <img src={Medical}/> Medical Record
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <YearController/>
          </Grid>
        </Grid>

        <div className={tableTermin}>
          <DynamicTable
            data={dataTable} 
            fields={titleTable} 
            cellOption={valueType} 
            // isSort={isSort}
          /> 
        </div>
            
        </Paper>
        </div>
      {/* <FloatingChat/> */}
    </div>
  );
};

export default terminDetail;
