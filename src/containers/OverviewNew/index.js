/* eslint-disable no-alert */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { withRouter, useHistory } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import IconGraph from "../../assets/icons/siab/icon.png";
import constants from "../../helpers/constants";
import FloatingChat from "../../components/GeneralComponent/FloatingChat";
import {
  ChkyChartOverview,
  ChkySearchBar,
  ChkyTabsAsOption,
  ChkyDonutChartSecondary,
  ChartOverviewUpDown
} from "../../components/chky";
import OverviewFilter from "./OverviewFilter";
import OverviewMachinePopulation from "./OverviewMachinePopulation";
import OverviewTransaction from "./OverviewTransaction";
import { ReactComponent as TitleRateIcon } from "../../assets/icons/general/transaction_rate_overview.svg";
import ModalLoader from "../../components/ModalLoader";
import SearchAtmIdBar from "../../components/SearchAtmIdBar";
// import OverviewMaps from './OverviewMaps';
const OverviewMaps = React.lazy(() => import("./OverviewMaps"));
import LoadingView from "../../components/Loading/LoadingView";
import SearchBarAutoComplete from "../../components/SearchBarAutoComplete";

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
    position: "relative",
    top: -70,
    zIndex: 2,
    padding: "0px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    // marginTop: 30,
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

var monthsInd = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};

const getFullDate = (date) => {
  if (date !== "-") {
    const splitDate = date.split("-");
    return `${parseInt(splitDate[2])} ${monthsInd[splitDate[1]]} ${
      splitDate[0]
    }`;
  } else {
    return "-";
  }
};

const OverviewNew = () => {
  // ============ CONSTRUCTOR ============
  const classes = useStyles();
  // modalLoader
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isOpenModalLoaderNew, setModalLoaderNew] = useState(false);
  // init keyword
  const history = useHistory(); // <--- init default keyword
  const [loadingMaps, setLoadingMaps] = useState(false);
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [loadingPopulation, setLoadingPopulation] = useState(false);
  // filter
  const [dataFilter, setDataFilter] = useState({
    machineType: "",
    locBranch: "",
    nameBrand: "",
  });
  const [dataBrand, setDataBrand] = useState([]); // <--- init dataBrand array
  const [dataMaps, setDataMaps] = useState([]); // <--- init dataMaps array
  const [dataPopulationByGroup, setDataPopulationByGroup] = useState([]); // <--- init dataPopulationByGroup array
  const [dataPopulationByPremises, setDataPopulationByPremises] = useState([]); // <--- init dataPopulationByPremises array
  const [dataPopulationByBrand, setDataPopulationByBrand] = useState([]); // <--- init dataPopulationByBrand array
  const [dataTransaction, setDataTransaction] = useState(null); // <--- init DataTransaction array
  const [currentTabMapsRate, setCurrentTabMapsRate] = useState(0);
  const [dataFilterChart, setDataFilterChart] = useState({
    frequently: currentTabMapsRate,
    dataFilter,
  });
  const [dataMapsRate, setDataMapsRate] = useState([]);
  const [dataAtmModel, setDataAtmModel] = useState([]); // <--- init dataAtmModel array
  const [lastDateUpdate, setLastDateUpdate] = useState("-");
  const [isLoadDate, setIsLoadDate] = useState(false);
  // ============ CONSTRUCTOR ============

  // ============ USE_EFFECT ============
  useEffect(() => {
    if (lastDateUpdate != "-") {
      fetchDataMaps();
      fetchDataTransaction();
      fetchDataMachinePopulation();
      fetchDataAtmModel();
    }
    fetchDataAtmModel();
  }, [dataFilter]);
  useEffect(() => {
    if (lastDateUpdate != "-") {
      if (currentTabMapsRate === 0) {
        fetchDataMapsRateYearly();
      }
      if (currentTabMapsRate === 1) {
        fetchDataMapsRateMonthly();
      }
    }
  }, [dataFilterChart]);
  useEffect(() => {
    fetchDataBrand();
    getLastDateUpdate();
    // clear cache draft ATM details dari menu Profiling setelah sukses login
    var cachedItem = localStorage.getItem("dataGetDraftDetail");
    if (cachedItem) {
      localStorage.removeItem("dataGetDraftDetail");
    }
  }, []);
  // ============ USE_EFFECT ============

  // ============ FETCH API ============
  const getLastDateUpdate = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setIsLoadDate(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/transaction/getLastReportDate`,
        config
      );
      console.log("Check Date : ", result);
      try {
        const res = result.data.data;
        setLastDateUpdate(res.lastReportDate || "-");
        fetchDataMaps();
        fetchDataTransaction();
        fetchDataMachinePopulation();
        fetchDataAtmModel();
        if (currentTabMapsRate === 0) {
          fetchDataMapsRateYearly();
        }
        if (currentTabMapsRate === 1) {
          fetchDataMapsRateMonthly();
        }
      } catch (error) {
        // alert(`Error getting Last Update \n ${error}`);
      }
      setIsLoadDate(false);
    } catch (err) {
      // alert(`Error getting Last Update \n${err}`);
      setIsLoadDate(false);
    }
  };

  // ============ FETCH API ============
  const fetchDataMapsRateYearly = async () => {
    const dataToSet = [];
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setLoadingMaps(true);
      const result = await Axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/dashboardOverview/trendRateChart`,
        {
          frequently: "yearly",
          byPremises: dataFilter.locBranch,
          machineType: dataFilter.machineType,
          byBrand: dataFilter.nameBrand,
        },
        config
      );
      // reconstruct data from DB to dataMaps
      try {
        const dataPre = result.data.data.averageList;
        const dataPre2 = result.data.data.forecastDetail;
        // ======= ADDITIONAL =======
        dataPre2.map((item, index) => {
          let trendVal = 'same';
          if(index !== 0){
            const selisih = item.forecastAmount-dataPre2[index-1].forecastAmount;
            // console.log('<><> selisih', selisih);
            if(selisih > 0){
              trendVal = "up";
            }else if(selisih < 0){
              trendVal = "down";
            }
          }
          const newRow = {
            month: `${item.period}`,
            rate: item.type,
            value: item.forecastAmount,
            trend: trendVal,
          };
          dataToSet.push(newRow);
        });

        dataPre.map((item, index) => {
          let trendVal = 'same';
          if(index !== 0){
            const selisih = item.averageTotalAmount-dataPre[index-1].averageTotalAmount;
            console.log('<><> selisih', selisih);
            if(selisih > 0){
              trendVal = "up";
            }else if(selisih < 0){
              trendVal = "down";
            }
          }
          const newRow = {
            month: `${item.year}`,
            rate: item.type,
            value: item.averageTotalAmount,
            trend: trendVal,
          };
          dataToSet.push(newRow);
        });
      } catch (error) {
        setLoadingMaps(false);
        alert(`Error Refactor dataMapsRateYearly...! \n ${error}`);
      }
      setDataMapsRate(dataToSet);
      setLoadingMaps(false);
    } catch (err) {
      alert(`Error Fetching dataMapsRateYearly...! \n${err}`);
      setLoadingMaps(false);
    }
  };
  const fetchDataAtmModel = async () => {
    const dataToSet = [];
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setModalLoader(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/dashboard/getAtmModel?machineType=${dataFilter.machineType}&locationBranchType=${dataFilter.locBranch}&name=${dataFilter.nameBrand}`,
        config
      );
      // console.log(`<<< CEKPoint B =>${JSON.stringify(result)}`);
      // reconstruct data from DB to dataAtmModel
      try {
        const dataPre = result.data.data;
        // console.log(`<<< CEKPoint C => ${JSON.stringify(dataPre)}`);
        dataPre.map((item) => {
          const newRow = {
            type: item.modelTeam,
            value: item.modelCount,
          };
          dataToSet.push(newRow);
        });
      } catch (error) {
        setModalLoader(false);
        alert(`Error Refactor Data AtmModel...! \n ${error}`);
      }
      setDataAtmModel(dataToSet);
      setModalLoader(false);
    } catch (err) {
      alert(`Error Fetching Data AtmModel...! \n${err}`);
      setModalLoader(false);
    }
  };
  const fetchDataMapsRateMonthly = async () => {
    const dataToSet = [];
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setLoadingMaps(true);
      const result = await Axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/dashboardOverview/trendRateChart`,
        {
          frequently: "monthly",
          byPremises: dataFilter.locBranch,
          machineType: dataFilter.machineType,
          byBrand: dataFilter.nameBrand,
        },
        config
      );
      // reconstruct data from DB to dataMaps
      
      try {
        const dataPre = result.data.data.averageList;
        const dataPre2 = result.data.data.forecastDetail;
        dataPre2.map((item,index) => {
          let trendVal = 'same';
          if(index !== 0){
            const selisih = item.forecastAmount-dataPre2[index-1].forecastAmount;
            // console.log('<><>>> selisih', selisih);
            if(selisih > 0){
              trendVal = "up";
            }else if(selisih < 0){
              trendVal = "down";
            }
          }
          const newRow = {
            month: `${item.period.slice(0, 3)}`,
            rate: item.type,
            value: item.forecastAmount,
            trend: trendVal,
          };
          dataToSet.push(newRow);
        });
        dataPre.map((item, index) => {
          let trendVal = 'same';
          if(index !== 0){
            const selisih = item.averageTotalAmount-dataPre[index-1].averageTotalAmount;
            console.log('<><> selisih', selisih);
            if(selisih > 0){
              trendVal = "up";
            }else if(selisih < 0){
              trendVal = "down";
            }
          }
          const newRow = {
            month: `${item.month.slice(0, 3)}`,
            rate: item.type,
            value: item.averageTotalAmount,
            trend: trendVal,
          };
          dataToSet.push(newRow);
        });
      } catch (error) {
        setLoadingMaps(false);
        alert(`Error Refactor dataMapsRateMonthly...! \n ${error}`);
      }
      setDataMapsRate(dataToSet);
      setLoadingMaps(false);
    } catch (err) {
      alert(`Error Fetching dataMapsRateMonthly...! \n${err}`);
      setLoadingMaps(false);
    }
  };
  const fetchDataTransaction = async () => {
    const dataHit = {
      machineType: dataFilter.machineType,
      locationBranchType: dataFilter.locBranch,
      name: dataFilter.nameBrand,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setLoadingTransaction(true);
      const result = await Axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/dashboard/getTransaction`,
        dataHit,
        config
      );
      // console.log(`<<< CEKPoint B =>${JSON.stringify(result)}`);
      setDataTransaction(result.data.data);
      setLoadingTransaction(false);
    } catch (err) {
      alert(`Error Fetching Data Transaction...! \n${err}`);
      setLoadingTransaction(false);
    }
  };
  const fetchDataMachinePopulation = async () => {
    const dataByGroupToSet = [];
    const dataByPremisesToSet = [];
    const dataByBrandToSet = [];
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setLoadingPopulation(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/dashboard/getMachinePopulation?machineType=${dataFilter.machineType}&locationBranchType=${dataFilter.locBranch}&name=${dataFilter.nameBrand}`,
        config
      );
      // reconstruct data from DB to dataMaps
      try {
        const dataPrePopulationByGroup =
          result.data.data.calculateMachineTypeByGroup;
        dataPrePopulationByGroup.map((item) => {
          const dataGroupNew = {
            type: item.machineType,
            value: item.totalItem,
          };
          dataByGroupToSet.push(dataGroupNew);
        });

        const dataPrePopulationByPremises =
          result.data.data.calculateMachinePopulationByPermise;
        dataPrePopulationByPremises.map((item) => {
          let locBranchType = item.locationBranchType;
          if (item.locationBranchType === "OFF") {
            locBranchType = "NON CABANG";
          }
          if (item.locationBranchType === "ON") {
            locBranchType = "CABANG";
          }
          const dataPremisesNew = {
            type: locBranchType,
            value: item.totalItem,
          };
          dataByPremisesToSet.push(dataPremisesNew);
        });

        const dataPrePopulationByBrand =
          result.data.data.calculateMachinePopulationByBrand;
        dataPrePopulationByBrand.map((item) => {
          const dataBrandNew = {
            type: item.name.substring(0, 20),
            value: item.totalItem,
          };
          dataByBrandToSet.push(dataBrandNew);
        });
      } catch (error) {
        setLoadingPopulation(false);
        alert(`Error Refactor Data Maps...! \n ${error}`);
      }
      setDataPopulationByGroup(dataByGroupToSet);
      setDataPopulationByPremises(dataByPremisesToSet);
      setDataPopulationByBrand(dataByBrandToSet);
      setLoadingPopulation(false);
    } catch (err) {
      alert(`Error Fetching Data Maps...! \n${err}`);
      setLoadingPopulation(false);
    }
  };
  const fetchDataBrand = async () => {
    const dataBrandToSet = [];
    console.log(`<<< CEKPoint A dataBrand`);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setModalLoader(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/brand`,
        config
      );
      // reconstruct data from DB to dataBrand
      try {
        const dataPre = result.data.data;
        dataPre.map((item) => {
          const newRow = {
            id: item.id,
            name: item.name,
          };
          dataBrandToSet.push(newRow);
        });
      } catch (error) {
        setModalLoader(false);
        alert(`Error Refactor Data dataBrand Select...! \n ${error}`);
      }
      setDataBrand(dataBrandToSet);
      setModalLoader(false);
    } catch (err) {
      alert(`Error Fetching Data dataBrand Select...! \n${err}`);
      setModalLoader(false);
    }
  };
  const fetchDataMaps = async () => {
    const dataToSet = [];
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setModalLoader(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/dashboard/getProvinceLocation?machineType=${dataFilter.machineType}&locationBranchType=${dataFilter.locBranch}&name=${dataFilter.nameBrand}`,
        config
      );
      try {
        const dataPre = result.data.data;
        dataPre.map((item) => {
          const newRow = {
            loc: [item.latitude, item.longitude],
            population: item.countProvince,
            province: item.name,
            provinceId: item.provinceId,
          };
          dataToSet.push(newRow);
        });
      } catch (error) {
        setModalLoader(false);
        alert(`Error Refactor Data Maps...! \n ${error}`);
      }
      setDataMaps(dataToSet);
      setModalLoader(false);
    } catch (err) {
      alert(`Error Fetching Data Maps...! \n${err}`);
      setModalLoader(false);
    }
  };

  // ============ FETCH API ============

  // ============ FUNCTION ============
  // ============ FUNCTION ============

  // ============ ACTION_BUTTON ============
  function handleFilter(newValue) {
    if (newValue === null) {
      setDataFilter({
        machineType: "",
        locBranch: "",
        nameBrand: "",
      });
      setDataFilterChart({
        frequently: currentTabMapsRate,
        dataFilter: {
          machineType: "",
          locBranch: "",
          nameBrand: "",
        },
      });
    } else {
      // setMachineTypes(newValue.population);
      setDataFilter({
        machineType: newValue.population,
        locBranch: newValue.promises,
        nameBrand: newValue.brand,
      });
      setDataFilterChart({
        frequently: currentTabMapsRate,
        dataFilter: {
          machineType: newValue.population,
          locBranch: newValue.promises,
          nameBrand: newValue.brand,
        },
      });
    }
  }

  function handleChangeTabRate(newValue) {
    console.log(`===> TabVal : ${newValue}`);
    setCurrentTabMapsRate(newValue);
    setDataFilterChart({
      frequently: newValue,
      dataFilter,
    });
  }
  function handleKeyword(newValue) {
    // history.push(`/trend-analisa/detail/${newValue}`);
    // console.log("handle keywoard search", newValue);
    if(newValue===""){
      alert("Silahkan input / pilih ATM ID");
    }else{
      // DO SEARCH to detail
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
        },
      };
      setModalLoaderNew(true);
      Axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailAnalyticData`,
        {
          atmId: newValue,
        },
        config
      )
        .then((res) => {
          setModalLoaderNew(false);
          if (res.data.statusCode === 200) {
            const dataInfo = res.data.data.infoAtm[0];
            localStorage.setItem("infoAtmDetail", JSON.stringify(dataInfo));
            // history.push(`/trend-analisa/detail/${newValue}`);
            window.location.href=`/trend-analisa/detail/${newValue}`;
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          setModalLoaderNew(false);
          console.log("error", err);
          alert("atm ID not found");
        });
    }
    
  }
  // ============ ACTION_BUTTON ============

  // ============ RENDER_HELPER ============
  // ============ RENDER_HELPER ============

  return (
    <div style={{ background: "#F4F7FB" }}>
      <div className={classes.root}>
        <Grid
          container
          justify="space-between"
          className={classes.titleContainer}
          alignItems="center"
        >
          <Grid item>
            <Typography className={classes.title}>Overview</Typography>
          </Grid>
          <Grid item xs={4}>
            <SearchBarAutoComplete 
              onSubmit={handleKeyword}/>
          </Grid>
        </Grid>
        <div>
          {isLoadDate ? (
            <LoadingView maxheight="100%" isTransparent />
          ) : (
            <Typography
              style={{
                fontSize: "13px",
                fontWeight: 400,
                fontFamily: "Barlow",
                color: "#8D98B4",
                padding: "20px 0 20px 0",
              }}
            >
              Last update : {getFullDate(lastDateUpdate)}
            </Typography>
          )}
        </div>
        <OverviewFilter
          onFilterSubmit={handleFilter}
          dataBrandSelect={dataBrand}
        />
      </div>
      <div className={classes.rootMap}>
        <React.Suspense fallback={<div />}>
          <OverviewMaps
            dataMarker={dataMaps}
            loading={loadingMaps}
            dataFilter={dataFilter}
          />
        </React.Suspense>
      </div>
      <div className={classes.rootContent}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <OverviewMachinePopulation
              dataPopulationByGroup={{
                data: dataPopulationByGroup,
                colors: ["#DC241F", "#FFB443", "#780000", "#E6EAF3"],
              }}
              dataPopulationByPremises={{
                data: dataPopulationByPremises,
                colors: ["#DC241F", "#FFB443", "#780000", "#E6EAF3"],
              }}
              dataPopulationByBrand={{
                data: dataPopulationByBrand,
                colors: [
                  "#DC241F",
                  "#FFB443",
                  "#780000",
                  "#E9967A",
                  "#FF6347",
                  "#FFD700",
                  "#d6847f",
                  "#FF8C00",
                  "#F0E68C",
                  "#3b3838",
                  "#7fd1d6",
                  "#00a3ad",
                  "#ff3800",
                  "#b5bf50",
                  "#36648b",
                  "#c1cdc1",
                  "#e0eee0",
                  "#b0c4de",
                  "#000080",
                  "#32d9cb",
                  "#51828d",
                  "#2f1431",
                  "#94a7b1",
                  "#96ad29",
                  "#7f6f9f",
                  "#75bbca",
                  "#548bac",
                  "#a6cfe8",
                  "#7553bb",
                ],
              }}
              loading={loadingPopulation}
            />
          </Grid>

          <Grid item>
            <OverviewTransaction
              data={dataTransaction}
              loading={loadingTransaction}
            />
          </Grid>

          {!loadingTransaction && (
            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} className={classes.paperWrapper}>
                  <Paper style={{ padding: 20 }}>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item style={{ display: "flex" }}>
                            <TitleRateIcon />
                          </Grid>
                          <Grid item>
                            <Typography
                              style={{ fontSize: 15, fontWeight: 500 }}
                            >
                              Transaction Rate
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <ChkyTabsAsOption
                          currentTab={currentTabMapsRate}
                          dataTab={["Yearly", "Monthly"]}
                          handleChangeTab={handleChangeTabRate}
                          minWidth={100}
                        />
                      </Grid>
                    </Grid>
                    {/* <ChkyChartOverview data={dataMapsRate} /> */}
                    <ChartOverviewUpDown data={dataMapsRate}/>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} className={classes.paperWrapper}>
                  <Paper style={{ padding: 20, height: "100%" }}>
                    <ChkyDonutChartSecondary data={dataAtmModel} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isOpenModalLoaderNew} />
    </div>
  );
};

export default OverviewNew;
