/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext } from "react";
import { Typography, Grid, Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { withRouter, useHistory } from "react-router-dom";
import { G2, Chart, Tooltip, Interval, Axis } from "bizcharts";
import { GrayMedium, Dark } from "../../assets/theme/colors";
import constants from "../../helpers/constants";
import FloatingChat from "../../components/GeneralComponent/FloatingChat";
import {
  ChkyChartOverview,
  ChkySearchBar,
  ChkyTabsAsOption,
} from "../../components/chky";
import PopulationFilter from "./PopulationFilter";
import PopulationMachines from "./PopulationMachines";
import { ReactComponent as TitleRateIcon } from "../../assets/icons/general/transaction_rate_overview.svg";
import ModalLoader from "../../components/ModalLoader";
import ChartBar from "./ComponentOwn/ChartBar";
import ChkySelectInput from "./selectMonthYear";
import SearchAtmIdBar from "../../components/SearchAtmIdBar";
import SearchBarAutoComplete from "../../components/SearchBarAutoComplete";
import ClusteredStackBar from "./ComponentOwn/ClusteredStackBar";
import LoadingView from "../../components/Loading/LoadingView";
import StackBar from "./ComponentOwn/StackBar";
// import PopulationMaps from './PopulationMaps';
const PopulationMaps = React.lazy(() => import("./PopulationMaps"));
import qs from 'qs';


const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  rootMap: {
    position: "relative",
    top: -50,
    zIndex: 1,
  },
  rootContent: {
    padding: "0px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    // marginBottom: 30,
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: constants.color.dark,
  },
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
    "& .MuiPaper-rounded": {
      borderRadius: 10,
    },
  },
});

export const DashboardPopulationContext = createContext()
const { Provider } = DashboardPopulationContext

const DashboardPopulation = () => {
  const classes = useStyles();

  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isOpenModalLoaderNew, setModalLoaderNew] = useState(false);
  const [dataMachinePopulation, setDataMachinePopulation] = useState({
    byMachineType: [],
    byPremises: [],
    byBrand: [],
    byFLM: [],
    bySLM: [],
    byProvider: [],
    byJanitor: [],
    byCCTV: [],
    byTax: [],
  });
  const [dataGrowth, setDataGrowth] = useState([]);
  const [dataMaps, setDataMaps] = useState([]);
  const [growthColor, setGrowthColor] = useState([]);
  const [typeMachine, setTypeMachine] = useState([]);
  const history = useHistory();
  const [refreshMaps, doRefreshMaps] = useState(0);
  const [isMonthly, setIsMonthly] = useState(false);
  
  const [dataFilter, setDataFilter] = useState({
    provinceId: "",
    cityId: "",
    districtId: "",
  });

  const { provinceId, cityId, districtId } = dataFilter

  const filterUrlParam = qs.stringify(dataFilter)

  useEffect(() => {
    getProvinceLocation();
  }, [provinceId, cityId, districtId]);

  const getProvinceLocation = async () => {
    const constructData = [];
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/population/getProvinceLocation?${filterUrlParam}`,
        method: "GET",
      });
      const dataPre = data.data.data;
    // console.log("REQUEST PROVINCE LOCATION ====> : ", data);
    // console.log("PROVINCE LOCATION ====> : ", dataPre);
      dataPre.map((item) => {
        const newRow = {
          loc: [item.latitude, item.longitude],
          population: item.countProvince,
          province: item.name,
          provinceId: item.provinceId,
        };
        constructData.push(newRow);
      });
      setDataMaps(constructData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      console.log(`Error Fetching Get Province Location : \n ${error}`);
    }
  };

  useEffect(() => {
    getMachinePopulation();
  }, [provinceId, cityId, districtId]);

  const getMachinePopulation = async () => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/population/machinePopulation?${filterUrlParam}`,
        method: "GET",
      });
      const getData = data.data.data;
    // console.log("MACHINE POPULATION REQUEST====> : ", data);
    // console.log("MACHINE POPULATION DATA====> : ", getData);

      // byMachineType
      const dataMachineType = [];
      getData.byMachineType.generalPopulations.map((item) => {
        const dataNew = {
          type:
            !item.machine_type
              ? "N/A"
              : item.machine_type.substring(0, 20),
          value: item.total_item,
        };
        dataMachineType.push(dataNew);
      });
      // byPremises
      const dataPremises = [];
      getData.byPremises.generalPopulations.map((item) => {
        const dataNew = {
          type:
            !item.location_branch_type
              ? "N/A"
              : item.location_branch_type.substring(0, 20),
          value: item.total_item,
        };
        dataPremises.push(dataNew);
      });
      // byBrand
      const dataBrand = [];
      getData.byBrand.generalPopulations.map((item) => {
        const dataNew = {
          type: !item.name ? "N/A" : item.name.substring(0, 20),
          value: item.total_item,
        };
        dataBrand.push(dataNew);
      });
      // byFLM
      const dataFLM = [];
      getData.byFLM.generalPopulations.map((item) => {
        const dataNew = {
          type: !item.name ? "N/A" : item.name.substring(0, 20),
          value: item.total_item,
        };
        dataFLM.push(dataNew);
      });
      // bySLM
      const dataSLM = [];
      getData.bySLM.generalPopulations.map((item) => {
        const dataNew = {
          type: !item.name ? "N/A" : item.name.substring(0, 20),
          value: item.total_item,
        };
        dataSLM.push(dataNew);
      });
      // byProvider
      const dataProvider = [];
      getData.byProvider.generalPopulations.map((item) => {
        const dataNew = {
          type: !item.name ? "N/A" : item.name.substring(0, 20),
          value: item.total_item,
        };
        dataProvider.push(dataNew);
      });
      // byJanitor
      const dataJanitor = [];
      getData.byJanitor.generalPopulations.map((item) => {
        const dataNew = {
          type: !item.name ? "N/A" : item.name.substring(0, 20),
          value: item.total_item,
        };
        dataJanitor.push(dataNew);
      });
      // byCCTV
      const dataCCTV = [];
      getData.byCCTV.generalPopulations.map((item) => {
      // console.log(">>>> CEK: ", item);
        const dataNewCCTV = {
          type: !item.name ? "N/A" : item.name.substring(0, 20),
          value: item.total_item,
        };
        dataCCTV.push(dataNewCCTV);
      });
      // byTax
      const dataTax = [];
      getData.byTax.generalPopulations.map((item) => {
      // console.log(">>>> CEK: ", item);
        const dataNewTax = {
          type: !item.name ? "N/A" : item.name.substring(0, 20),
          value: item.total_item,
        };
        dataTax.push(dataNewTax);
      });

      setDataMachinePopulation({
        byMachineType: dataMachineType,
        byPremises: dataPremises,
        byBrand: dataBrand,
        byFLM: dataFLM,
        bySLM: dataSLM,
        byProvider: dataProvider,
        byJanitor: dataJanitor,
        byCCTV: dataCCTV,
        byTax: dataTax,
      });
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      console.log(`Error Fetching Get Machine Population : \n ${error}`);
    }
  };

  const [currentTabGrowth, setCurrentTabGrowth] = useState(0);
  const [isLoadGrowth, setIsLoadGrowth] = useState(false);
  function handleChangeTabGrowth(newValue) {
    setCurrentTabGrowth(newValue);
    if(newValue === 1){
      setIsMonthly(true);
    }else{
      setIsMonthly(false);
    }
  }

  useEffect(() => {
    let frequently = currentTabGrowth ? 'monthly' : 'yearly';
    const getGrowthPopulation = async () => {
      const dataConstructGrowth = [];
      const urlParam = qs.stringify({cityId, provinceId, areaId: districtId, frequently})
      try {
        setIsLoadGrowth(true);
        const data = await Axios({
          url: `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/population/growthPopulation?${urlParam}`,
          method: "GET",
        });
        const getData = data.data.data;
        const colors = [];
        const machineTypes = [];

        let newThisTimeTotal;
        if(frequently === "yearly"){
          const res = Array.from(getData.growthPopulation.reduce(
            (m, {year, total_item,total_item_asIs}) => m.set(year, (m.get(year) || 0) + total_item_asIs), new Map
          ), ([year, total_item]) => ({time: year, total:total_item}));
          newThisTimeTotal = res;
        }else{
          const res = Array.from(getData.growthPopulation.reduce(
            (m, {month, total_item,total_item_asIs}) => m.set(month, (m.get(month) || 0) + total_item_asIs), new Map
          ), ([month, total_item]) => ({time: month, total:total_item}));
          newThisTimeTotal = res;
        }
        // console.log("<<<< DATA newThisTimeTotal", JSON.stringify(newThisTimeTotal));

        getData.growthPopulation.map((item) => {
          let total = 0;
          let time;
          if(frequently === "yearly"){
            const getTotalVal = newThisTimeTotal.find(obj => {
              return obj.time === item.year;
            });
            total = getTotalVal.total;
            time = item.year;
          }else{
            const getTotalVal = newThisTimeTotal.find(obj => {
              return obj.time === item.month;
            });
            total = getTotalVal.total;
            time = item.month;
          }
          // console.log(`Total: ${total} dari time ${time}`);
          const dataGroupNew = {
            time: frequently === "yearly" ? item.year.toString() : item.month,
            atmType: item.machine_type,
            // val: item.total_item+item.total_item_asIs,
            val: item.total_item_asIs,
            total,
          };
          dataConstructGrowth.push(dataGroupNew);
          const type_machine =
            item.machine_type == "" ? "Other" : item.machine_type;
          if (!machineTypes.includes(type_machine)) {
            machineTypes.push(type_machine);
            const color = `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`;
            colors.push(color);
          }
          setGrowthColor(colors);
          setTypeMachine(machineTypes);
        });
        const dataLine = [];
        newThisTimeTotal.map((item)=>{
          dataLine.push({time: item.time, val: item.total, timeLine: item.time, totalLine: item.total});
        });
        // console.log("<< dataLine",dataLine);
        // dataConstructGrowth.push(dataLine);
        setDataGrowth(dataConstructGrowth);
        setIsLoadGrowth(false);
      } catch (error) {
        setIsLoadGrowth(false);
        console.log(`Error Fetching Get Growth Population : \n ${error}`);
      }
    };
    getGrowthPopulation();
  }, [currentTabGrowth, provinceId, cityId, districtId]);

  function handleKeyword(val) {
    // setKeyword(newValue);
    // history.push(`/trend-analisa/detail/${newValue}`);
  // console.log("handle keywoard search", val);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    setModalLoaderNew(true);
    Axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailAnalyticData`,
      {
        atmId: val,
      },
      config
    )
      .then((res) => {
        setModalLoaderNew(false);
        if (res.data.statusCode == 200) {
          const dataInfo = res.data.data.infoAtm[0];
          localStorage.setItem("infoAtmDetail", JSON.stringify(dataInfo));
          history.push(`/trend-analisa/detail/${val}`);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        setModalLoaderNew(false);
        console.log("error", err);
        alert("ATM ID not found");
      });
  }

  function handleFilter(newValue) {
    doRefreshMaps((prev) => prev + 1);
    if (newValue === null) {
      setDataFilter({
        provinceId: "",
        cityId: "",
        districtId: "",
      });
    } else {
      // setMachineTypes(newValue.population);
      setDataFilter({
        provinceId: newValue.provinceId,
        cityId: newValue.cityId,
        districtId: newValue.districtId,
      });
    }
  }

  // 
  // 
  return (
    <Provider value={{dataFilter}}>
      <div style={{background: '#F4F7FB'}}>
        <div className={classes.root}>
          <Grid
            container
            justify="space-between"
            className={classes.titleContainer}
            alignItems="center"
          >
            <Grid item>
              <Typography className={classes.title}>Population</Typography>
            </Grid>
            <Grid item xs={4}>
              {/* <SearchAtmIdBar
                placeholder="ATM ID"
                onSubmit={handleKeyword}
                width={290}
              /> */}
              <SearchBarAutoComplete 
                onSubmit={handleKeyword}/>
            </Grid>
          </Grid>
          <PopulationFilter onFilterSubmit={handleFilter} />
        </div>
        <div className={classes.rootMap}>
          <React.Suspense fallback={<div />}>
            <PopulationMaps
              dataMarker={dataMaps}
              isLoadData={isOpenModalLoader}
              refresh={refreshMaps}
              dataFilter={dataFilter}
            />
          </React.Suspense>
        </div>
        <div className={classes.rootContent}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <PopulationMachines
                dataProps={dataMachinePopulation}
                isLoadData={isOpenModalLoader}
              />
            </Grid>
            <Grid item className={classes.paperWrapper}>
              <Paper style={{ padding: 20 }}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item style={{ display: "flex" }}>
                        <TitleRateIcon />
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                          Growth
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <ChkyTabsAsOption
                      currentTab={currentTabGrowth}
                      dataTab={["Yearly", "Monthly"]}
                      handleChangeTab={handleChangeTabGrowth}
                      minWidth={100}
                    />
                    {/* <ChkySelectInput
                      selectedValue="monthly"
                      selectOptionData={[
                        { value: 'monthly', name: 'Monthly' },
                        { value: 'yearly', name: 'Yearly' },
                      ]}
                      onSelectData={handleOnSelect}
                    /> */}
                  </Grid>
                  <Grid item>
                    <Grid container spacing={1}>
                      {[ '#749BFF', '#FFB443', '#DC241F', '#780000' ].map((item, index) => {
                        const arrayMachineType = ["MDM", "CDM","CRM","ATM"];
                        return (
                          <Grid item>
                            <Grid container spacing={1}>
                              <Grid item>
                                <div
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 4,
                                    backgroundColor: item,
                                  }}
                                />
                              </Grid>
                              <Grid item>
                                <Typography
                                  style={{ fontSize: 13, fontWeight: 400 }}
                                >
                                  {arrayMachineType[index]}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
                {isLoadGrowth ? (
                  <LoadingView maxheight="100%" />
                ) : (
                  <StackBar data={dataGrowth} isMonthly={isMonthly}/>
                  // <ClusteredStackBar data={dataGrowth} />
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
        {/* <FloatingChat /> */}
        <ModalLoader isOpen={isOpenModalLoaderNew} />
      </div>
    </Provider>
  );
};

export default DashboardPopulation;
