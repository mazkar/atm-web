import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Grid, Paper, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as ThemeColor from "../../../assets/theme/colors";
import TotalImplementationChart from './ComponentOwn/TotalImplementationChart';
import CardItem from './ComponentOwn/CardItem';
import { ReactComponent as IconOverview } from '../../../assets/icons/general/overview_total_transaction.svg';
import { ReactComponent as IconSla } from '../../../assets/icons/duotone-others/icon_over_sla.svg';
import { ReactComponent as IconRollout } from '../../../assets/icons/duotone-others/icon_rollout_update.svg';
import { ReactComponent as IconKebutuhan } from '../../../assets/icons/duotone-others/exchange-alt.svg';
import { ReactComponent as IconMesin } from '../../../assets/icons/duotone-others/calculator.svg';
import { ReactComponent as IconBooth } from '../../../assets/icons/duotone-others/store.svg';
import { ReactComponent as IconSignage } from '../../../assets/icons/duotone-others/window-frame-open.svg';
import { ReactComponent as IconAktivasi } from '../../../assets/icons/duotone-others/check-double.svg';
import { ReactComponent as IconJarkom } from '../../../assets/icons/duotone-others/rss.svg';
import { ReactComponent as IconParam } from '../../../assets/icons/duotone-others/list.svg';
import { ReactComponent as IconKeamanan } from '../../../assets/icons/duotone-others/lock.svg';
import { ChkyTablePagination } from '../../../components';
import { doFetchCardTaskSummary, doFetchOverSlaImpementation, doFetchRolloutUpdate, doFetchTotalImpleChart } from '../ApiServiceImplementation';
import Remark from './ComponentOwn/Remark';
import LoadingView from '../../../components/Loading/LoadingView';
import reformatChartData from './ComponentOwn/reformatChartData';
import { stringLimit, timestampToDateId } from '../../../helpers/useFormatter';
import PresentasiAsset from "./ComponentOwn/PresentasiAsset";
import RollOutUpdate from "./ComponentOwn/RolloutUpdate";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: "calc(100vh - 64px)",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
});

const dummyCardSummary = [
  {title: "Task Kebutuhan", icon: <IconKebutuhan/>, done: 0, undone: 0},
  {title: "Task Mesin", icon: <IconMesin/>, done: 0, undone: 0},
  {title: "Task Booth", icon: <IconBooth/>, done: 0, undone: 0},
  {title: "Task Keamanan", icon: <IconKeamanan/>, done: 0, undone: 0},
  {title: "Task Signage", icon: <IconSignage/>, done: 0, undone: 0},
  {title: "Task Jarkom", icon: <IconJarkom/>, done: 0, undone: 0},
  {title: "Task Parameter", icon: <IconParam/>, done: 0, undone: 0},
  {title: "Task Aktivasi", icon: <IconAktivasi/>, done: 0, undone: 0},
];

const titleTableSla = [
  "ID",
  "ID ATM",
  "Tgl Submit",
  "ID Submit",
  "PIC Request",
  "Nama Lokasi",
  "Type",
  "SLA",
  "Remark",
];
const valueTypeSla = [
  "hide",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
];
const slaColumnNameVar = [
  'id',
  'atmId',
  'tglSubmit',
  'submitId',
  'picRequest',
  'locationName',
  'type',
  'sla',
  'remark'
];
const isSortSla = [true, true, true, true, true, true, true, true];

const rowsPerPageSla = 10; // <--- init default rowsPerPage
const defaultDataHitSla = {
  pageNumber: 0,
  dataPerPage: rowsPerPageSla,
  sortBy: "id",
  sortType: "ASC",
};

// ROLLOUT
const titleTableRollout = [
  "Id",
  "Nama Aset",
  "Nama Project",
  "Tgl Mulai",
  "Durasi Rollout",
  "Target Jumlah",
  "Total Ter Rollout",
  "Presentase",
  "Tgl Selesai",
  "Remark",
];
const valueTypeRollout = [
  "hide",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
];
const rolloutColumnNameVar = [
  'id',
  'aset',
  'project',
  'startDate',
  'duration',
  'totalTarget',
  'totalRollout',
  'persentage',
  'doneDate',
  'remark'
];
const isSortRollout = [true, true, true, true, true, true, true, true, true];

const rowsPerPageRollout = 15; // <--- init default rowsPerPage
const defaultDataHitRollout = {
  pageNumber: 0,
  dataPerPage: rowsPerPageRollout,
  sortBy: "id",
  sortType: "ASC",
};
function Overview(props) {
  const classes = useStyles();
  const [cardStatusSummary, setCardStatusSummary] = useState(dummyCardSummary);

  // =====> OVER SLA <=====
  const [dataOverSla, setDataOverSla] = useState([]);
  const [totalPagesSla, setTotalPagesSla] = useState(0);
  const [totalRowsSla, setTotalRowsSla] = useState(0); // <--- init default totalRows
  const [orderDirectionSla, setOrderDirectionSla] = useState('ASC');
  const [sortBySla, setSortBySla] = useState(null);

  const [dataHitSla, setDataHitSla] = useState(defaultDataHitSla);  
  
  // LOADER LOAD DATA
  const [isLoadDataSla, setIsLoadDataSla] = useState(false);
  // set handler loader when call Approval API Service
  function loadDataHandlerSla(loaderValue) {
    setIsLoadDataSla(loaderValue);
  }

  // HANDLER
  function handleChangePageSla(newPage) {
    setDataHitSla({
      ...dataHitSla,
      pageNumber: newPage,
    });
  };
  
  function handleSortSla(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBySla === property && orderDirectionSla === 'ASC';
      setOrderDirectionSla(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBySla(property);
      // setOrderBySla(slaColumnNameVar[titleTableSla.indexOf(property)]);
      setDataHitSla((oldState)=>({
        ...oldState,
        sortBy: slaColumnNameVar[titleTableSla.indexOf(property)],
        sortType: isActiveAndAsc ? 'DESC' : 'ASC',
      }));
    };
  }

  // =====> ROLLOUT <=====
  const [dataRollout, setDataRollout] = useState([]);
  const [totalPagesRollout, setTotalPagesRollout] = useState(0);
  const [totalRowsRollout, setTotalRowsRollout] = useState(0); // <--- init default totalRows
  const [orderDirectionRollout, setOrderDirectionRollout] = useState('ASC');
  const [sortByRollout, setSortByRollout] = useState(null);

  const [dataHitRollout, setDataHitRollout] = useState(defaultDataHitRollout);  
  
  // LOADER LOAD DATA
  const [isLoadDataRollout, setIsLoadDataRollout] = useState(false);
  // set handler loader when call Approval API Service
  function loadDataHandlerRollout(loaderValue) {
    setIsLoadDataRollout(loaderValue);
  }

  // HANDLER
  function handleChangePageRollout(newPage) {
    setDataHitRollout({
      ...dataHitRollout,
      pageNumber: newPage,
    });
  };
  
  function handleSortRollout(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortByRollout === property && orderDirectionRollout === 'ASC';
      setOrderDirectionRollout(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortByRollout(property);
      // setOrderByRollout(rolloutColumnNameVar[titleTableRollout.indexOf(property)]);
      setDataHitRollout((oldState)=>({
        ...oldState,
        sortBy: rolloutColumnNameVar[titleTableRollout.indexOf(property)],
        sortType: isActiveAndAsc ? 'DESC' : 'ASC',
      }));
    };
  }

  useEffect(() => {

    // FETCH OVER SLA LIST
    doFetchOverSlaImpementation(
      loadDataHandlerSla,
      dataHitSla
    ).then((response) => {
      // console.log('+++ response doFetchOverSlaImpementation', response);
      try {
        const storeNew = [];
        if (response) {
          const {totalPage,totalElement}=response.data;
          const resultData = response.data.content;
          if(resultData){
            setTotalPagesSla(totalPage);
            setTotalRowsSla(totalElement);
            resultData.map((item,index) => {
              storeNew.push({
                id: item.id,
                atmId: item.atmId,
                tglSubmit: item.tglSubmit,
                submitId: item.submitId,
                picRequest: item.picRequest,
                locationName: item.locationName,
                type: item.type,
                sla: item.sla,
                remark: item.remark? stringLimit(item.remark) : "-",
                // remark: <Remark remark={item.remark} id={item.id}/>,
              });
            });
            setDataOverSla(storeNew);
          }
        } 
      } catch (err) {
        // console.log('~ err', err);
        loadDataHandlerSla(false);
        alert(`Terjadi Kesalahan...! \n${err}`);
      }
    });
  }, [dataHitSla]);

  useEffect(() => {
    
    // FETCH ROLLOUT UPDATE
    doFetchRolloutUpdate(
      loadDataHandlerRollout,
      dataHitRollout
    ).then((response) => {
      // console.log('+++ response doFetchRolloutUpdate', response);
      try {
        
        const storeNew = [];
        if (response) {
          const resultData = response.data.content;
          if(resultData){
            const {totalPage,totalElement}=response.data;
            setTotalPagesRollout(totalPage);
            setTotalRowsRollout(totalElement);
            resultData.map((item,index) => {
              storeNew.push({
                id: item.id,
                aset: item.aset,
                project: item.project,
                startDate: item.startDate? timestampToDateId(item.startDate): "",
                duration: item.duration,
                totalTarget: item.totalTarget,
                totalRollout: item.totalRollout,
                persentage: item.persentage? `${item.persentage}%`: "",
                doneDate: item.doneDate? timestampToDateId(item.doneDate): "",
                remark: item.remark? stringLimit(item.remark) : "-",
                // remark: <Remark remark={item.remark} id={item.id} type="rollout"/>,
              });
            });
            setDataRollout(storeNew);
            console.log("data",storeNew);
          }
        } 
      } catch (err) {
        // console.log('~ err', err);
        loadDataHandlerRollout(false);
        alert(`Terjadi Kesalahan...! \n${err}`);
      }
    });
  }, [dataHitRollout]);

  // LOADER LOAD DATA CHART
  const [isLoadDataCardsSummary, setIsLoadDataCardsSummary] = useState(false);
  // set handler loader when call Approval API Service
  function loadDataHandlerCardsSummary(bool) {
    setIsLoadDataCardsSummary(bool);
  }
  useEffect(() => {
    // FETCH ROLLOUT UPDATE
    doFetchCardTaskSummary(loadDataHandlerCardsSummary).then((response) => {
      // console.log('+++ response doFetchCardTaskSummary', response);
      try {
        if (response) {
          const resData = response.data;
          const newValue =[
            {title: "Task Kebutuhan", icon: <IconKebutuhan/>, done: resData.need[0].totalDone, undone: resData.need[0].totalUndone},
            {title: "Task Mesin", icon: <IconMesin/>, done: resData.machine[0].totalDone, undone: resData.machine[0].totalUndone},
            {title: "Task Booth", icon: <IconBooth/>, done: resData.booth[0].totalDone, undone: resData.booth[0].totalUndone},
            {title: "Task Keamanan", icon: <IconKeamanan/>, done: resData.security[0].totalDone, undone: resData.security[0].totalUndone},
            {title: "Task Signage", icon: <IconSignage/>, done: resData.signage[0].totalDone, undone: resData.signage[0].totalUndone},
            {title: "Task Jarkom", icon: <IconJarkom/>, done: resData.jarkom[0].totalDone, undone: resData.jarkom[0].totalUndone},
            {title: "Task Parameter", icon: <IconParam/>, done: resData.parameter[0].totalDone, undone: resData.parameter[0].totalUndone},
            {title: "Task Aktivasi", icon: <IconAktivasi/>, done: resData.activation[0].totalDone, undone: resData.activation[0].totalUndone},
          ];
          setCardStatusSummary(newValue);
        } 
      } catch (err) {
        // console.log('~ err', err);
        loadDataHandlerCardsSummary(false);
        alert(`Terjadi Kesalahan...! \n${err}`);
      }
    });
  }, []);

  // CHART SESSION
  const [dataChart, setDataChart] = useState([]);  
  const [chartYear, setChartYear] = useState(new Date().getFullYear());  

  // LOADER LOAD DATA CHART
  const [isLoadDataChart, setIsLoadDataChart] = useState(false);
  // set handler loader when call Approval API Service
  function loadDataHandlerChart(bool) {
    setIsLoadDataChart(bool);
  }

  useEffect(() => {
    // FETCH TOTAL IMPLEMENTATION CHART
    doFetchTotalImpleChart(loadDataHandlerChart, {year: chartYear}).then(async (response) => {
      // console.log('+++ response doFetchTotalImpleChart', response);
      // const newArrChart = await reformatChartData([{"total":1,"actual":0,"type":"New Location","month":"11"},{"total":1,"actual":0,"type":"Termin","month":"11"},{"total":1,"actual":0,"type":"Migrasi","month":"11"},{"total":1,"actual":0,"type":"Replace","month":"12"}], dataChart);
      // console.log('+++ newArrChart to SET', newArrChart);
      // setDataChart(newArrChart);
      if(response){
        const {groupingImplementationOverview} = response.data;
        console.log("ini data",groupingImplementationOverview)
        if(groupingImplementationOverview){
          const newArrChart = await reformatChartData(groupingImplementationOverview);
          // console.log('+++ newArrChart to SET', newArrChart);
          setDataChart(newArrChart);
        }
      }
    });
  }, [chartYear]);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Implementation</Typography>
        </Grid>
      </Grid>
      <div className={classes.container}>
        {/* CONTAINER */}
        <TotalImplementationChart
          selectedYear={chartYear}
          onChangeYear={(newYear) => setChartYear(newYear)}
          loading={isLoadDataChart}
          data={dataChart}
        />

        {isLoadDataCardsSummary ? (
          <div style={{ marginTop: 30 }}>
            <LoadingView maxheight="100%" />
          </div>
        ) : (
          <Grid container spacing={2} style={{ marginTop: 30 }}>
            {cardStatusSummary.map((item) => {
              return (
                <Grid item xs={3}>
                  <CardItem
                    leftIcon={item.icon}
                    title={item.title}
                    valueDone={item.done}
                    valueUndone={item.undone}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
        {/* TABLE SECTION */}
        <Paper
          style={{
            padding: 20,
            boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
            borderRadius: 10,
            marginTop: 30,
          }}
        >
          <Grid container justify="space-between" style={{ marginBottom: 20 }}>
            <Grid item>
              <Grid container spacing={1} alignItems="center">
                <Grid item style={{ display: "flex" }}>
                  <IconSla />
                </Grid>
                <Grid item>
                  <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                    Over SLA
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <ChkyTablePagination
            data={dataOverSla}
            fields={titleTableSla}
            cellOption={valueTypeSla}
            changePage={handleChangePageSla}
            totalPages={totalPagesSla}
            rowsPerPage={rowsPerPageSla}
            totalRows={totalRowsSla}
            isLoadData={isLoadDataSla}
            isSort={isSortSla}
            isUsingMuiSort
            handleSort={handleSortSla}
            sortBy={sortBySla}
            order={orderDirectionSla}
            borderedContainer
          />
        </Paper>

        <Paper
          style={{
            padding: 20,
            boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
            borderRadius: 10,
            marginTop: 30,
          }}
        >
          <Grid container justify="space-between" style={{ marginBottom: 20 }}>
            <Grid item>
              <Grid container spacing={1} alignItems="center">
                <Grid item style={{ display: "flex" }}>
                  <IconRollout />
                </Grid>
                <Grid item>
                  <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                    Roolout Update
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <ChkyTablePagination
            data={dataRollout}
            fields={titleTableRollout}
            cellOption={valueTypeRollout}
            totalPages={totalPagesRollout}
            rowsPerPage={rowsPerPageRollout}
            totalRows={totalRowsRollout}
            isLoadData={isLoadDataRollout}
            isSort={isSortRollout}
            isUsingMuiSort
            handleSort={handleSortRollout}
            sortBy={sortByRollout}
            order={orderDirectionRollout}
            borderedContainer
            isDisablePagination
          />
        </Paper>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <PresentasiAsset />
          </Grid>
          <Grid item xs={6}>
            <PresentasiAsset />
          </Grid>
        </Grid>
      </div>
      <RollOutUpdate />
    </div>
  );
}

Overview.propTypes = {

};

export default Overview;

