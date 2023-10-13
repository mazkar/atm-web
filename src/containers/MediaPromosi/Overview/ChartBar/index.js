import React, { useState, useEffect } from "react";
import {
  G2,
  Chart,
  Tooltip,
  Interval,
  Interaction,
  LineAdvance,
} from "bizcharts";
import {
  makeStyles,
  withStyles,
  Paper,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
} from "@material-ui/core";
import { ReactComponent as TitleRateIcon } from "../../../../assets/icons/general/transaction_rate_overview.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ChkyTabsAsOption } from "../../../../components/chky";
import { ReactComponent as DropDownIcon } from "../../../../assets/icons/general/dropdown_red.svg";
import { doGetSummaryMediaPromosi } from "../../services";
import LoadingView from "../../../../components/Loading/LoadingView";
import useRupiahConverter from "../../../../helpers/useRupiahConverter";
import { doGetSummaryTahun } from "../../services";

const UseStyles = makeStyles((theme) => ({
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    position: "relative",
    borderRadius: 10,
  },

  indicator: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "15px",
    color: "#2B2F3C",
    marginLeft: 10,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  loadPaper: {
    height: "314px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
  },
  select: {
    padding: 10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BCC8E7",
    fontSize: 13,
    padding: "6px 12px 6px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const scale = {
  month: {
    alias: "month",
  },
  JmlPajak: {
    alias: "monthly average rainfall",
  },
};

const thisYear = new Date().getFullYear();

function ChartBar() {
  const [data, setData] = useState([]);
  const [dataFiveYears, setDataFiveYears] = useState([]);
  const [dataRequest, setDataRequest] = useState({
    tahun: thisYear,
    bulan: "All",
  });
  const [isLoadData, setIsLoadData] = useState(false);
  const [chartMonth, setChartMonth] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);
  const [isRupiah, setIsRupiah] = useState(false);
  const [maxValue, setMaxValue] = useState(undefined);
  const [maxValueThis, setMaxValueThis] = useState(undefined);

  const classes = UseStyles();

  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }

  const handleChangeMonth = (idMonth) => {
    setChartMonth(idMonth);
    setDataRequest({
      tahun: thisYear,
      bulan: `${idMonth}`,
    });
  };

  const bulan = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //function getItMonth

  function getItemMonth(val) {
    switch (val) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "Mei";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Agu";
      case 9:
        return "Sep";
      case 10:
        return "Okt";
      case 11:
        return "Nov";
      case 12:
        return "Des";
    }
  }

  const handleChangeTab = (idTab) => {
    setCurrentTab(idTab);
    if (idTab === 1) {
      setDataRequest({
        tahun: thisYear,
        bulan: "All",
      });
      setChartMonth(1);
    }
  };

  const numberWithCommas = (x) => {
    if (x === null) {
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    doGetSummaryTahun(loadDataHandler).then((response) => {
      console.log(response);
      if (response) {
        const { data } = response;
        const dataToSet = [];
        data.map((item, index) => {
          if (item.data === null) {
            console.log(`data kosong!!!`);
          } else {
            const dataNew = {
              name: item.name,
              years: item.year.toString(),
              JmlPajak: item.jmlhObjct,
            };
            dataToSet.push(dataNew);
          }
        });
        console.log(dataToSet);
        setDataFiveYears(dataToSet);
      }
    });
  }, [currentTab]);

  useEffect(() => {
    doGetSummaryMediaPromosi(loadDataHandler, dataRequest).then((response) => {
      if (response) {
        const { overviewSummary } = response;
        const dataToSet = [];
        overviewSummary.map((item, index) => {
          if (item.data === null) {
            console.log(`data bulan ini kosong!`);
          } else {
            const newData = {
              name: item.name,
              month: getItemMonth(item.month),
              JmlPajak: item.jmlhObjct,
            };
            dataToSet.push(newData);
          }
        });
        setData(dataToSet);
      }
    });
  }, [dataRequest]);

  // useEffect(() => {
  //   doGetSummaryTahun(loadDataHandler).then((response) => {
  //     console.log(response);
  //     if (response) {
  //       const { data } = response;
  //       const dataToSet = [];
  //       data.map((item, index) => {
  //         if (item.data === null) {
  //           console.log(`data kosong!!!`);
  //         } else {
  //           item.data.map((res) => {
  //             const dataRow1 = {
  //               name: "Flag Mounted",
  //               years: String(item.tahun),
  //               JmlPajak:
  //                 res["Flag Mounted"] === undefined ? 0 : res["Flag Mounted"],
  //             };
  //             const dataRow2 = {
  //               name: "Wall Sign",
  //               years: String(item.tahun),
  //               JmlPajak: res["Wall Sign"] === undefined ? 0 : res["Wall Sign"],
  //             };
  //             const dataRow3 = {
  //               name: "Neon Box",
  //               years: String(item.tahun),
  //               JmlPajak: res["Neon Box"] === undefined ? 0 : res["Neon Box"],
  //             };
  //             const dataRow4 = {
  //               name: "Sticker Kaca",
  //               years: String(item.tahun),
  //               JmlPajak:
  //                 res["Sticker Kaca"] === undefined ? 0 : res["Sticker Kaca"],
  //             };
  //             const dataRow5 = {
  //               name: "Sticker Mesin",
  //               years: String(item.tahun),
  //               JmlPajak:
  //                 res["Sticker Mesin"] === undefined ? 0 : res["Sticker Mesin"],
  //             };
  //             const dataRow6 = {
  //               name: "Pengadaan Both",
  //               years: String(item.tahun),
  //               JmlPajak:
  //                 res["Pengadaan Both"] === undefined
  //                   ? 0
  //                   : res["Pengadaan Both"],
  //             };
  //             dataToSet.push(dataRow1);
  //             dataToSet.push(dataRow2);
  //             dataToSet.push(dataRow3);
  //             dataToSet.push(dataRow4);
  //             dataToSet.push(dataRow5);
  //             dataToSet.push(dataRow6);
  //           });
  //         }
  //       });
  //       setDataFiveYears(dataToSet);
  //     }
  //   });
  // }, [currentTab]);

  // useEffect(() => {
  //   doGetSummaryMediaPromosi(loadDataHandler, dataRequest).then((response) => {
  //     if (response) {
  //       const { content } = response.overviewSummary;
  //       const dataToSet = [];
  //       content.map((item, index) => {
  //         if (item.data === null) {
  //           console.log(`data bulan ${getItemMonth(chartMonth)} kosong!`);
  //         } else {
  //           item.data.map((res) => {
  //             const dataRow1 = {
  //               name: "Flag Mounted",
  //               month: getItemMonth(item.bulan),
  //               JmlPajak:
  //                 res["Flag Mounted"] === undefined ? 0 : res["Flag Mounted"],
  //             };
  //             const dataRow2 = {
  //               name: "Wall Sign",
  //               month: getItemMonth(item.bulan),
  //               JmlPajak: res["Wall Sign"] === undefined ? 0 : res["Wall Sign"],
  //             };
  //             const dataRow3 = {
  //               name: "Neon Box",
  //               month: getItemMonth(item.bulan),
  //               JmlPajak: res["Neon Box"] === undefined ? 0 : res["Neon Box"],
  //             };
  //             const dataRow4 = {
  //               name: "Sticker Kaca",
  //               month: getItemMonth(item.bulan),
  //               JmlPajak:
  //                 res["Sticker Kaca"] === undefined ? 0 : res["Sticker Kaca"],
  //             };
  //             const dataRow5 = {
  //               name: "Sticker Mesin",
  //               month: getItemMonth(item.bulan),
  //               JmlPajak:
  //                 res["Sticker Mesin"] === undefined ? 0 : res["Sticker Mesin"],
  //             };
  //             const dataRow6 = {
  //               name: "Pengadaan Both",
  //               month: getItemMonth(item.bulan),
  //               JmlPajak:
  //                 res["Pengadaan Both"] === undefined
  //                   ? 0
  //                   : res["Pengadaan Both"],
  //             };
  //             dataToSet.push(dataRow1);
  //             dataToSet.push(dataRow2);
  //             dataToSet.push(dataRow3);
  //             dataToSet.push(dataRow4);
  //             dataToSet.push(dataRow5);
  //             dataToSet.push(dataRow6);
  //           });
  //         }
  //       });
  //       setData(dataToSet);
  //     }
  //   });
  // }, [dataRequest]);

  // MAX DATA 5 TAHUN
  useEffect(() => {
    const arr = [];
    dataFiveYears.map((res) => {
      arr.push(res.JmlPajak);
    });
    const maxData = Math.max.apply(null, arr);
    setMaxValue(maxData);
  }, [dataFiveYears, maxValue]);

  // MAX DATA TAHUN BERJALAN
  useEffect(() => {
    const arr = [];
    data.map((res) => {
      arr.push(res.JmlPajak);
    });
    const maxData = Math.max.apply(null, arr);
    setMaxValueThis(maxData);
  }, [data, maxValueThis]);

  // SCALE DATA 5 TAHUN
  const scaleFiveYears = {
    JmlPajak: {
      min: 0,
      max: maxValue,
      formatter(val) {
        if (isRupiah) {
          return `Rp. ${numberWithCommas(val)}`;
        }
        return numberWithCommas(val);
      },
    },
  };

  // SCALE DATA TAHUN BERJALAN
  const scaleThisyears = {
    JmlPajak: {
      min: 0,
      max: maxValueThis,
      formatter(val) {
        if (isRupiah) {
          return `Rp. ${numberWithCommas(val)}`;
        }
        return numberWithCommas(val);
      },
    },
  };

  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        {isLoadData ? (
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.loadPaper}
          >
            <LoadingView />
          </Grid>
        ) : (
          <>
            {currentTab === 1 ? (
              <div>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.indicator}
                >
                  <Grid item>
                    <div className={classes.col}>
                      <TitleRateIcon />
                      <Typography
                        className={classes.title}
                        style={{ marginLeft: 10 }}
                      >
                        Jumlah Object Pajak
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <ChkyTabsAsOption
                      currentTab={currentTab}
                      dataTab={["Yearly", "Mounthly"]}
                      handleChangeTab={handleChangeTab}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography style={{ fontWeight: 400, fontSize: 13 }}>
                          Bulan:{" "}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <FormControl className={classes.select}>
                          <Select
                            value={chartMonth}
                            onChange={(e) => handleChangeMonth(e.target.value)}
                            input={<BootstrapInput />}
                            IconComponent={DropDownIcon}
                          >
                            {bulan.map((item, index) => {
                              return (
                                <MenuItem key={index} value={index + 1}>
                                  {item}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Chart
                  height={300}
                  padding="auto"
                  data={data}
                  autoFit
                  filter={[["JmlPajak", (val) => val != null]]}
                  scale={scaleThisyears}
                >
                  <Interval
                    adjust={[
                      {
                        type: "dodge",
                        marginRatio: 0.7,
                      },
                    ]}
                    color={[
                      "name",
                      [
                        "#DC241F",
                        "#FFB443",
                        "#65D170",
                        "#CB88FF",
                        "#FF7774",
                        "#8D98B4",
                      ],
                    ]}
                    position="month*JmlPajak"
                    size={11}
                  />

                  <Tooltip
                    shared={false}
                    showTitle={false}
                    showMarkers={true}
                  />
                </Chart>
              </div>
            ) : (
              <div>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.indicator}
                >
                  <Grid item>
                    <div className={classes.col}>
                      <TitleRateIcon />
                      <Typography
                        className={classes.title}
                        style={{ marginLeft: 10 }}
                      >
                        Jumlah Object Pajak
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <ChkyTabsAsOption
                      currentTab={currentTab}
                      dataTab={["Yearly", "Mounthly"]}
                      handleChangeTab={handleChangeTab}
                    />
                  </Grid>

                  <Grid item style={{ visibility: "hidden" }}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography style={{ fontWeight: 400, fontSize: 13 }}>
                          Bulan:{" "}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <FormControl className={classes.select}>
                          <Select
                            value={chartMonth}
                            onChange={(e) => handleChangeMonth(e.target.value)}
                            input={<BootstrapInput />}
                            IconComponent={DropDownIcon}
                          >
                            {bulan.map((item, index) => {
                              return (
                                <MenuItem key={index} value={index + 1}>
                                  {item}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Chart
                  height={300}
                  padding="auto"
                  data={dataFiveYears}
                  autoFit
                  filter={[["JmlPajak", (val) => val != null]]}
                  scale={scaleFiveYears}
                >
                  <Interval
                    adjust={[
                      {
                        type: "dodge",
                        marginRatio: 0.7,
                      },
                    ]}
                    color={[
                      "name",
                      [
                        "#DC241F",
                        "#FFB443",
                        "#65D170",
                        "#CB88FF",
                        "#FF7774",
                        "#8D98B4",
                      ],
                    ]}
                    position="years*JmlPajak"
                    size={11}
                  />

                  <Tooltip
                    shared={false}
                    showTitle={false}
                    showMarkers={true}
                  />
                </Chart>
              </div>
            )}
          </>
        )}
      </Paper>
    </div>
  );
}

export default ChartBar;
