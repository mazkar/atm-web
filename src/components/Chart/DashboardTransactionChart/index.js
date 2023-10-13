/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {useState} from 'react';
import { Chart, Tooltip, LineAdvance } from 'bizcharts';
import PropTypes from 'prop-types';
import {
  Paper,
  Grid,
  Typography,
  Tabs,
  Tab,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import moment from 'moment';
import constants from '../../../helpers/constants';
import SelectWithCaptions from '../../Selects/SelectWithCaptions';
import { Select } from 'antd';

const useStyles = makeStyles({
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
    alignItems: 'center',
    marginLeft: 200,
    width: '126px',
  },
  yearControllerButton: {
    padding: '7px 10px',
    color: constants.color.primaryHard,
  },
});

const useTabsStyles = makeStyles({
  root: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
  },
  indicator: {
    display: 'none',
  },
});

const useTabItemStyles = makeStyles({
  root: {
    minHeight: 40,
    minWidth: 72,
    padding: '7px 10px',
  },
  selected: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapper: {
    textTransform: 'none',
  },
});

const ChartLineIcon = () => (
  <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="30" rx="10" fill="#FFE9E9" />
    <path
      opacity=".4"
      d="M25 20.625v1.25a.624.624 0 01-.625.625H6.25A1.25 1.25 0 015 21.25V8.125a.625.625 0 01.625-.625h1.25a.625.625 0 01.625.625V20h16.875a.624.624 0 01.625.625z"
      fill="#DC241F"
    />
    <path
      d="M23.75 9.375v4.611c0 .835-1.01 1.254-1.602.664l-1.265-1.265-3.75 3.75a1.25 1.25 0 01-1.768 0L12.5 14.268l-1.8 1.8a.627.627 0 01-.883 0l-.884-.884a.625.625 0 010-.884l2.683-2.684a1.25 1.25 0 011.768 0l2.866 2.866 2.866-2.866-1.264-1.264c-.591-.591-.173-1.602.664-1.602h4.609a.625.625 0 01.625.625z"
      fill="#DC241F"
    />
  </svg>
);

const typeSuggestions = [
    { id: 1, value: 'Januari', nameId: 'Januari', nameEn: 'January' },
    { id: 2, value: 'Februari', nameId: 'Februari', nameEn: 'February' },
    { id: 3, value: 'Maret', nameId: 'Maret', nameEn: 'March' },
    { id: 4, value: 'April', nameId: 'April', nameEn: 'April' },
    { id: 5, value: 'Mei', nameId: 'Mei', nameEn: 'May' },
    { id: 6, value: 'Juni', nameId: 'Juni', nameEn: 'June' },
    { id: 7, value: 'Juli', nameId: 'Juli', nameEn: 'July' },
    { id: 8, value: 'Agustus', nameId: 'Agustus', nameEn: 'August' },
    { id: 9, value: 'September', nameId: 'September', nameEn: 'September' },
    { id: 10, value: 'Oktober', nameId: 'Oktober', nameEn: 'October' },
    { id: 11, value: 'November', nameId: 'November', nameEn: 'November' },
    { id: 12, value: 'Desember', nameId: 'Desember', nameEn: 'Desember' }
];

const TotalTransactionChart = (props) => {
  // console.log(data)
  // console.log(title)
  const { data, title, handleYearData, handleSelectMonth, handleSelectedMonth } = props;

  const YearController = (props, prevValue) => {
    const [year, setYear] = useState(moment().year());
    const { yearControllerContainer, yearControllerButton } = useStyles();
  
    const handleDecreaseYear = () => {
      setYear((prevValue) => prevValue - 1);
      props.handleYearData(prevValue);
    };
    const handleIncreaseYear = () => {
      setYear((prevValue) => prevValue + 1);
      props.handleYearData(prevValue);
    };
  
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

  const TabsFilter = () => {
    const [selectedTab, setSelectedTab] = useState(1);
    const tabsClasses = useTabsStyles();
    const tabItemClasses = useTabItemStyles();
    const tabsStyles = {
      root: tabsClasses.root,
      indicator: tabsClasses.indicator,
    };
  
    const tabItemStyles = {
      root: tabItemClasses.root,
      selected: tabItemClasses.selected,
      wrapper: tabItemClasses.wrapper,
    };
  
    const handleSelectedTab = (event, newValue) => {
      event.preventDefault();
      setSelectedTab(newValue);
    //   console.log(newValue);
    //   props.handleSelectMonth(newValue);
    };
  
    return (
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item>
          <Tabs
            classes={tabsStyles}
            value={selectedTab} 
            onChange={handleSelectedTab}
            // handleSelectMonth={handleSelectMonth}
            // handleSelectedTab={props.handleSelectedTab}
            // handleSelectedMonth={props.handleSelectedMonth}
          >
            <Tab classes={tabItemStyles} label="Yearly" />
            <Tab classes={tabItemStyles} label="Monthly" />
            <Tab classes={tabItemStyles} label="Daily" />
          </Tabs>
        </Grid>
        <Grid item>
          { selectedTab === 4 && <YearController/>}
        </Grid>
      </Grid>
    );
  };
  
  const ChartCard = ({ title, icon, children, headerControl, withControl }) => {
    const { cardContainer } = useStyles();
  
    return (
      <Paper className={`${cardContainer}`}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Grid container direction="row" alignItems="center" spacing={1}>
                  <Grid item>{icon}</Grid>
  
                  <Grid item>
                    <Typography gutterBottom variant="h6" component="h2">
                        Total Freq Transaction & Amount Revenue
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
  
              {withControl ? <Grid item>{headerControl}</Grid> : null}

              <Grid item>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <Typography
                        variant="p"
                        component="p"
                        style={{ padding: '25px 10px' }}
                        >
                        Bulan :
                        </Typography>
                    </Grid>
                    {/* <Grid item> */}
                        <Select
                        style={{ borderRadius: 20, width: '120px' }}
                        getPopupContainer={(trigger) => trigger.parentNode}
                        size="large"
                        defaultValue="Januari"
                        onChange={(value) => console.log(value)}
                        options={typeSuggestions}
                        />
                    {/* </Grid> */}
                </Grid>
            </Grid>
            </Grid>
          </Grid>
  
          <Grid item>{children}</Grid>

        </Grid>
      </Paper>
    );
  };

  ChartCard.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    headerControl: PropTypes.node,
    withControl: PropTypes.bool,
  };
  
  ChartCard.defaultProps = {
    headerControl: <TabsFilter 
      handleYearData={props.handleYearData} 
      handleSelectMonth={props.handleSelectMonth}
      // handleSelectedMonth={props.handleSelectedMonth} 
    />,
    withControl: false,
  };
  
  return (
    <ChartCard title={title} icon={<ChartLineIcon />} withControl
      handleSelectMonth = {handleSelectMonth}
      handleYearData = {handleYearData}
    // handleSelectedMonth = {handleSelectedMonth} 
    // headerControl= {<Tabsfilter handleYearData={props.handleYearData}>}
    >
      
      <Chart
        height={250}
        data={data}
        autoFit
        scale={{
          transaction: {
            min: 1_000_000,
            max: 50_000_000,
          },
        }}
      >
        <Tooltip shared showCrosshairs />

        <LineAdvance
          point={{
            size: 8,
            style: {
              lineWidth: 3,
            },
          }}
          area
          shape="smooth"
          position="date*transaction"
          size={2}
          color="type"
          label="transaction"
        />
      </Chart>
    </ChartCard>
  );
};

TotalTransactionChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleYearData: PropTypes.func,
  handleSelectMonth: PropTypes.func
};

export default TotalTransactionChart;