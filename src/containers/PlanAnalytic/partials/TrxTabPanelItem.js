import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import {
  Chart,
  Tooltip,
  Legend,
  Axis,
  Annotation,
  LineAdvance,
} from 'bizcharts';
// import numeral from 'numeral';

import clsx from 'clsx';
import axios from 'axios';
import { array } from 'prop-types';
import util from '../../../helpers/utility';
import {
  GrayBlue,
  GrayMedium,
  GrayUltrasoft,
  Dark,
  SecondaryMedium,
  InfoMedium,
} from '../../../assets/theme/colors';
import CommonTable from './CommonTable';
import FilterSelect from './FilterSelect';
import chartIconPng from '../../../assets/icons/siab/icon.png';
import { ChkyTablePagination } from '../../../components';
import useRupiahConverterSecondary from '../../../helpers/useRupiahConverterSecondary';
import useThousandSeparator from '../../../helpers/useThousandSeparator';
import LoadingView from '../../../components/Loading/LoadingView';
import FilterTransaksi from './FilterTransaksi';

const { numeral } = util;

// numeral.register('locale', 'ind', {
//   delimiters: {
//     thousands: '.',
//     decimal: ',',
//   },
//   abbreviations: {
//     thousand: 'rb',
//     million: 'jt',
//     billion: 'M',
//     trillion: 'T',
//   },
//   ordinal(number) {
//     return 'ke';
//   },
//   currency: {
//     symbol: 'Rp',
//   },
// });

// // switch between locales
// numeral.locale('ind');

const useStyles = makeStyles(() => ({
  legend: {
    marginLeft: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 6,
  },
  legendText: { fontSize: '13px', lineHeight: '16px' },
}));

const data = [
  {
    month: 'Jan',
    type: 'Jumlah Transaksi',
    value: 3000,
  },
  {
    month: 'Jan',
    type: 'Target Transaksi',
    value: 4000,
  },
  {
    month: 'Feb',
    type: 'Jumlah Transaksi',
    value: 3500,
  },
  {
    month: 'Feb',
    type: 'Target Transaksi',
    value: 4000,
  },
  {
    month: 'Mar',
    type: 'Jumlah Transaksi',
    value: 3250,
  },
  {
    month: 'Mar',
    type: 'Target Transaksi',
    value: 4000,
  },
  {
    month: 'Apr',
    type: 'Jumlah Transaksi',
    value: 5467,
  },
  {
    month: 'Apr',
    type: 'Target Transaksi',
    value: 4000,
  },
  {
    month: 'Mei',
    type: 'Jumlah Transaksi',
    value: 11000,
  },
  {
    month: 'Mei',
    type: 'Target Transaksi',
    value: 4000,
  },
  {
    month: 'Jun',
    type: 'Jumlah Transaksi',
    value: 2575,
  },
  {
    month: 'Jun',
    type: 'Target Transaksi',
    value: 4000,
  },
  {
    month: 'Jul',
    type: 'Target Transaksi',
    value: 4000,
  },
  {
    month: 'Agu',
    type: 'Target Transaksi',
    value: 4000,
  },
  {
    month: 'Sep',
    type: 'Target Transaksi',
    value: 4000,
  },
  {
    month: 'Okt',
    type: 'Target Transaksi',
    value: 4000,
  },
  {
    month: 'Nov',
    type: 'Target Transaksi',
    value: 4000,
  },
  {
    month: 'Des',
    type: 'Target Transaksi',
    value: 4000,
  },
  // ...
];

const options = [
  { value: 'Yearly', label: 'Yearly' },
  { value: 'Monthly', label: 'Monthly' },
];

const color = [
  'type',
  (type) => {
    if (type === 'actual') {
      return InfoMedium;
    }
    return SecondaryMedium;
  },
];

const TrxTabPanelItem = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataChart, setDataChart] = useState([]);
  const [maxValue, setMaxValue] = useState(1000000);
  const [dataTable, setDataTable] = useState([]);

  // init table pagination props
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [currentPage, setCurrentPages] = useState(0); // <--- init default totalPages
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [filter, setFilter] = useState('Yearly');
  const [filterYear, setFilterYear] = useState('All');
  const [years, setYears] = useState([
    { value: 'All', label: 'All' }
  ]);
  const [dataFilter, setDataFilter] = useState({
    atmId: 'All',
    cityId: 'All',
    areaId: 'All'
  });

  const today = new Date();
  const yearNow = today.getFullYear();

  // Init Default API Hit Service Parameter
  const defaultHitData = {
    frequently: 'Yearly',
    pageNumber: 0,
    dataPerPage: rowsPerPage,
    atmId: 'All',
    cityId: 'All',
    areaId: 'All'
  };

  // init state hitData
  const [hitData, setHitData] = useState(defaultHitData);

  function resetFilterHitData() {
    setCurrentPages(0);
    setTotalPages(0);
    setTotalRows(0);
    setFilter('Yearly');
    setHitData(defaultHitData);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const fetchDataTrx = async (dataToHit) => {
    setIsLoadingData(true);
    axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/planAnalytic/analyticTransaction/targetTransaction?frequently=${dataToHit.frequently}&pageNumber=${dataToHit.pageNumber}&dataPerPage=${dataToHit.dataPerPage}&atmId=${dataToHit.atmId}&cityId=${dataToHit.cityId}&areaId=${dataToHit.areaId}`,
        config
      )
      .then((res) => {
        // set data chart
        const newDataChart = [];
        const { targetTransactionChart } = res.data;
        targetTransactionChart.map((item, index) => {
          const itemDataTarget = {
            month: item.month ? item.month : item.year,
            type: 'target',
            value: item.target,
          };
          const itemDataActual = {
            month: item.month ? item.month : item.year,
            type: 'actual',
            value: item.actual,
          };
          newDataChart.push(itemDataActual);
          newDataChart.push(itemDataTarget);
        });
        let maxTrx = newDataChart.reduce(
          (max, shot) => (shot.value > max ? shot.value : max),
          0
        );
        maxTrx = Math.round(maxTrx / 1000000) * 1000000;
        setMaxValue((100 / 90) * maxTrx); // set batas atas chart
        setDataChart(newDataChart);

        // set data table
        const newDataTable = [];
        const targetTransactionData = res.data.targetTransactionData.content;
        targetTransactionData.map((item, index) => {
          const newData = [
            item.atm_id,
            item.location_id,
            useThousandSeparator(item.total_amount),
            useThousandSeparator(item.target),
            useThousandSeparator(item.difference)
          ];
          newDataTable.push(newData);
        });
        setDataTable(newDataTable);
        setTotalPages(res.data.targetTransactionData.totalPages);
        setTotalRows(res.data.targetTransactionData.totalElements);
        setIsLoadingData(false);
      })
      .catch((err) => {
        setIsLoadingData(false);
        if (err.response && err.response.data) {
          console.log('error fetch data trx', err.response);
          alert(err.response.message);
        }
      });
  };

  const fetchDataRevenue = async (dataToHit) => {
    setIsLoadingData(true);
    axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/planAnalytic/analyticTransaction/targetRevenue?frequently=${filterYear!=='All' ? 'Monthly' : dataToHit.frequently}&pageNumber=${dataToHit.pageNumber}&dataPerPage=${dataToHit.dataPerPage}&year=${filterYear==='All' ? yearNow : filterYear}&atmId=${dataToHit.atmId}&cityId=${dataToHit.cityId}&areaId=${dataToHit.areaId}`,
        config
      )
      .then((res) => {
        // set data chart
        const newDataChart = [];
        const { targetRevenueChart } = res.data;
        targetRevenueChart.map((item, index) => {
          const itemDataTarget = {
            month: item.month ? item.month : item.year,
            type: 'target',
            value: item.target,
          };
          const itemDataActual = {
            month: item.month ? item.month : item.year,
            type: 'actual',
            value: item.actual,
          };
          newDataChart.push(itemDataActual);
          newDataChart.push(itemDataTarget);
        });
        let maxTrx = newDataChart.reduce(
          (max, shot) => (shot.value > max ? shot.value : max),
          0
        );
        maxTrx = Math.round(maxTrx / 1000000) * 1000000;
        setMaxValue((100 / 90) * maxTrx); // set batas atas chart
        setDataChart(newDataChart);

        // set data table
        const newDataTable = [];
        const targetTransactionData = res.data.targetRevenueData.content;
        targetTransactionData.map((item, index) => {
          const newData = [
            item.atm_id,
            item.location_id,
            useRupiahConverterSecondary(item.total_amount),
            useRupiahConverterSecondary(item.target),
            useRupiahConverterSecondary(item.difference),
            `${parseFloat((item.total_amount/item.target)*100).toFixed(2).replace(".",",")}%`
          ];
          newDataTable.push(newData);
        });
        setDataTable(newDataTable);
        setTotalPages(res.data.targetRevenueData.totalPages);
        setTotalRows(res.data.targetRevenueData.totalElements);
        setIsLoadingData(false);
      })
      .catch((err) => {
        setIsLoadingData(false);
        if (err.response && err.response.data) {
          console.log('error fetch data trx', err.response);
          alert(error.response.message);
        }
      });
  };

  const fetchDataSla = async (dataToHit) => {
    setIsLoadingData(true);
    axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/planAnalytic/analyticTransaction/targetSlaData?frequently=${dataToHit.frequently}&pageNumber=${dataToHit.pageNumber}&dataPerPage=${dataToHit.dataPerPage}&sortBySLA=ASC&atmId=${dataToHit.atmId}&cityId=${dataToHit.cityId}&areaId=${dataToHit.areaId}`,
        config
      )
      .then((res) => {
        // set data chart
        const newDataChart = [];
        const { targetSlaChart } = res.data;
        targetSlaChart.map((item, index) => {
          const itemDataTarget = {
            month: item.month ? item.month : item.year,
            type: 'target',
            value: item.target,
          };
          const itemDataActual = {
            month: item.month ? item.month : item.year,
            type: 'actual',
            value: item.actual,
          };
          newDataChart.push(itemDataActual);
          newDataChart.push(itemDataTarget);
        });
        let maxTrx = newDataChart.reduce(
          (max, shot) => (shot.value > max ? shot.value : max),
          0
        );
        maxTrx = Math.round(maxTrx);
        setMaxValue((100 / 90) * maxTrx); // set batas atas chart
        setDataChart(newDataChart);

        // set data table
        const newDataTable = [];
        // console.log('<<< CHECK DATA : ', JSON.stringify(res.data));
        const targetTransactionData = res.data.targetSlaData.content;
        targetTransactionData.map((item, index) => {
          const newData = [
            item.atm_id,
            item.location_id,
            `${item.sla === null ? 0 : item.sla}%`,
            `${item.target === null ? 0 : item.target}%`,
            `${item.difference === null ? 0 : item.difference}%`,
          ];
          newDataTable.push(newData);
        });
        setDataTable(newDataTable);
        setTotalPages(res.data.targetSlaData.totalPages);
        setTotalRows(res.data.targetSlaData.totalElements);
        setIsLoadingData(false);
      })
      .catch((err) => {
        setIsLoadingData(false);
        if (err.response && err.response.data) {
          console.log('error fetch data trx', err.response);
          alert(error.response.message);
        }
      });
  };

  const getYearsRevenue = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/planAnalytic/analyticTransaction/targetRevenue?frequently=Yearly&pageNumber=0&dataPerPage=10&year=${yearNow}&atmId=All&cityId=All&areaId=All`,
        config
      )
      .then((res) => {
        const { targetRevenueChart } = res.data;
        let yearsArr = [];
        targetRevenueChart.map((item, index) => {
          let year = {value: item.year, label: item.year};
          yearsArr.push(year);
        });
        setYears([...years, ...yearsArr.reverse()]);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.log('error fetch data trx', err.response);
        }
      });
  };

  React.useEffect(() => {
    // console.log('props title ganti', props);
    if (props.title.includes('SLA')) {
      resetFilterHitData();
      fetchDataSla(defaultHitData);
    } else if (props.title.includes('Target Revenue')) {
      resetFilterHitData();
      getYearsRevenue();
      fetchDataRevenue(defaultHitData);
    } else if (props.title.includes('Target Transaksi')) {
      resetFilterHitData();
      fetchDataTrx(defaultHitData);
    }
  }, [props.title]);

  React.useEffect(() => {
    // console.log('filter baru', filter);
    if (props.title.includes('SLA')) {
      fetchDataSla(hitData);
    } else if (props.title.includes('Target Revenue')) {
      fetchDataRevenue(hitData);
    } else if (props.title.includes('Target Transaksi')) {
      fetchDataTrx(hitData);
    }
  }, [hitData, filterYear]);

  React.useEffect(() => {
    setHitData({
      frequently: filter,
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      atmId: dataFilter.atmId,
      cityId: dataFilter.cityId,
      areaId: dataFilter.areaId
    });
  }, [dataFilter]);

  const titleTable = [
    'ATM ID',
    'Lokasi',
    'Jumlah Transaksi',
    'Target Transaksi',
    'Selisih',
  ];
  const titleTableRevenue = [
    'ATM ID',
    'Lokasi',
    'Total Revenue',
    'Target Revenue',
    'Selisih',
    'Presentase Achievement'
  ];
  const titleTableSla = ['ATM ID', 'Lokasi', 'SLA', 'Target SLA', 'Selisih'];
  const valueType = ['string', 'string', 'string', 'string', 'string'];

  function handleChangePageValue(newPage) {
    setCurrentPages(newPage);
    setHitData({
      frequently: filter,
      pageNumber: newPage,
      dataPerPage: rowsPerPage,
      atmId: dataFilter.atmId,
      cityId: dataFilter.cityId,
      areaId: dataFilter.areaId
    });
  }

  function handleFilterChange(e) {
    setFilter(e.target.value);
    setHitData({
      frequently: e.target.value,
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      atmId: dataFilter.atmId,
      cityId: dataFilter.cityId,
      areaId: dataFilter.areaId
    });
    setFilterYear('All');
  }
  function handleFilterYearChange(e) {
    setFilterYear(e.target.value);
  }

  function renderTitleTable() {
    if (props.title.includes('SLA')) {
      return titleTableSla;
    }
    if (props.title.includes('Target Revenue')) {
      return titleTableRevenue;
    }
    return titleTable;
  }

  return (
    <div>
      <Paper
        style={{
          padding: 20,
          marginBottom: 20,
          boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
          borderRadius: '10px',
        }}
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginBottom: 20 }}
        >
          <Grid item xs style={{ display: 'flex', alignItems: 'center' }}>
            <img src={chartIconPng} alt="" />
            <Typography
              style={{
                marginLeft: 10,
                fontWeight: 500,
                fontSize: '15px',
                lineHeight: '18px',
              }}
            >
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={2} style={{display:'flex', justifyContent:'space-between'}}>
            <FilterSelect
              isManualUpdateValue
              value={filter}
              onChange={handleFilterChange}
              options={options}
              type="Transaksi"
            />
            {filter==='Yearly' && location.hash==='#targetRevenue' ? (
              <FilterSelect
                isManualUpdateValue
                value={filterYear}
                onChange={handleFilterYearChange}
                options={years}
                type="Transaksi"
              />
            ) : null}
          </Grid>
          <Grid
            item
            xs
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <span
              className={clsx(classes.legend, classes.legendColor)}
              style={{ backgroundColor: SecondaryMedium }}
            >
              &nbsp;
            </span>
            <Typography className={clsx(classes.legend, classes.legendText)}>
              Target
            </Typography>
            <span
              className={clsx(classes.legend, classes.legendColor)}
              style={{ backgroundColor: InfoMedium }}
            >
              &nbsp;
            </span>
            <Typography className={clsx(classes.legend, classes.legendText)}>
              Actual
            </Typography>
          </Grid>
        </Grid>

        {isLoadingData ? (
          <LoadingView maxheight="100%" />
        ) : (
          <Chart
            padding="auto"
            autoFit
            height={200}
            data={dataChart}
            scale={{
              value: {
                tickCount: 6,
                type: 'linear',
                min: 0,
                max: maxValue,
                formatter: (text, item, index) => {
                  return numeral(text).format('0,0');
                },
              },
            }}
          >
            <Annotation.Region
              start={['0%', '0%']}
              end={['100%', '100%']}
              style={{
                fill: GrayUltrasoft,
                fillOpacity: 1,
              }}
            />
            <Legend visible={false} />
            <Axis
              name="month"
              line={{
                style: {
                  lineWidth: 0,
                },
              }}
              tickLine={null}
              label={{
                style: {
                  fill: Dark,
                  fontSize: 10,
                  fontWeight: 500,
                  fontFamily: 'Barlow',
                },
              }}
            />
            <Axis
              name="value"
              label={{
                style: {
                  fill: GrayMedium,
                  fontSize: 12,
                  fontWeight: 400,
                  fontFamily: 'Barlow',
                },
                formatter: (text, item, index) => {
                  return props.title.includes('SLA') ? `${numeral(text).format('0,0')}%` : numeral(text).format('0,0');
                },
              }}
              grid={{
                line: {
                  style: {
                    stroke: GrayMedium, // 网格线的颜色
                    lineWidth: 1, // 网格线的宽度复制代码
                    lineDash: [2, 2], // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
                  },
                },
              }}
            />
            <LineAdvance
              point={{
                size: 5,
                style: {
                  lineWidth: 2,
                },
              }}
              area
              shape="smooth"
              position="month*value"
              size={2}
              color={color}
            />
            <Tooltip
              shared
              showCrosshairs
              itemTpl={
                `<li data-index={index} class="g2-tooltip-list-item" style="list-style-type: none; padding: 0px; margin: 12px 0px;">
                  <span class="g2-tooltip-marker" style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                  <span class="g2-tooltip-name" style="text-transform:capitalize">{name}</span> :
                  <span class="g2-tooltip-value" style="display: inline-block; float: right; margin-left: 30px;">{value}${props.title.includes('SLA')? '%':''}</span>
                  </li>`
              } />
          </Chart>
        )}
      </Paper>
      <div style={{marginBottom: '20px'}}>
        <FilterTransaksi setDataFilter={setDataFilter} setCurrentPages={setCurrentPages} />
      </div>
      {/* <CommonTable header={tableHeaderContent} body={dataTable} /> */}
      <ChkyTablePagination
        data={dataTable}
        fields={renderTitleTable()}
        cellOption={valueType}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        changePage={handleChangePageValue}
        isLoadData={isLoadingData}
        leftAlignBody={[1]}
        outerPage={currentPage+1}
      />
    </div>
  );
};

export default TrxTabPanelItem;
