/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Paper, Grid, IconButton } from "@material-ui/core";

import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import moment from "moment";

import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Col, Row, Typography, Button } from "antd";
import { ReactComponent as CalcIcon } from "../../../../assets/icons/general/chart_line_red.svg";
import Table from "./table";
import LineCharts1 from "./lineCharts";
import LineCharts2 from "./lineCharts2";
import LineCharts3 from "./lineCharts3";
import LineCharts4 from "./lineChart4";

import LoadingView from "../../../../components/Loading/LoadingView";
import { ReactComponent as DropDownIcon } from "../../../../assets/icons/general/dropdown_red.svg";
import constants from "../../../../helpers/constants";

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

const useStyles = makeStyles({
  select: {
    width: 150,
    padding: 10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
});

const month = [
  {
    id: "01",
    bulan: "Januari",
  },
  {
    id: "02",
    bulan: "Februari",
  },
  {
    id: "03",
    bulan: "Maret",
  },
  {
    id: "04",
    bulan: "April",
  },
  {
    id: "05",
    bulan: "Mei",
  },
  {
    id: "06",
    bulan: "Juni",
  },
  {
    id: "07",
    bulan: "Juli",
  },
  {
    id: "08",
    bulan: "Agustus",
  },
  {
    id: "09",
    bulan: "September",
  },
  {
    id: "10",
    bulan: "Oktober",
  },
  {
    id: "11",
    bulan: "November",
  },
  {
    id: "12",
    bulan: "Desember",
  },
];

const year = [
  {
    tahun: "2020",
    id: 1,
  },
  {
    tahun: "2021",
    id: 2,
  },
  {
    tahun: "2022",
    id: 3,
  },
];

const SummaryCountProblem = () => {
  const classes = useStyles();
  const [dataChart1, setDataChart1] = useState([]);
  const [dataChart2, setDataChart2] = useState([]);
  const [dataChart3, setDataChart3] = useState([]);
  const [dataChart4, setDataChart4] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedBulan, setSelectedBulan] = useState(moment().format("MM"));
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [flagHalf, setFlagHalf] = useState(false);
  const [flagHalf2, setFlagHalf2] = useState(false);
  const [flagHalf3, setFlagHalf3] = useState(false);
  const [flagHalf4, setFlagHalf4] = useState(false);

  // Fetch Data Chart
  const body = {
    pageNumber: 0,
    dataPerPage: 15,
    year: selectedYear,
    mounth: selectedBulan,
  };
  async function getDataChart() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constants.MONITORING_SERVICE}/cardCountCategoryProblem`,
        body
      );
      console.log("res chart", result.data.dataList);
      setDataChart1(
        result.data.dataList.map((val) => [
          {
            date: val.day.toString(),
            stuff: "CF",
            value: val.map.CF,
          },
          {
            date: val.day.toString(),
            stuff: "LC",
            value: val.map.LC,
          },
          {
            date: val.day.toString(),
            stuff: "DF",
            value: val.map.DF,
          },
          {
            date: val.day.toString(),
            stuff: "RF",
            value: val.map.RF,
          },
          {
            date: val.day.toString(),
            stuff: "JF",
            value: val.map.JF,
          },
          {
            date: val.day.toString(),
            stuff: "CO",
            value: val.map.CO,
          },
        ])
      );
      setDataChart2(
        result.data.dataList.map((val) => [
          {
            date: val.day.toString(),
            stuff: "PM",
            value: val.map.PM,
          },
          {
            date: val.day.toString(),
            stuff: "SL",
            value: val.map.SL,
          },
          {
            date: val.day.toString(),
            stuff: "SP",
            value: val.map.SP,
          },
          {
            date: val.day.toString(),
            stuff: "EF",
            value: val.map.EF,
          },
          {
            date: val.day.toString(),
            stuff: "HW",
            value: val.map.HW,
          },
        ])
      );
      setDataChart3(
        result.data.dataList.map((val) => [
          {
            date: val.day.toString(),
            stuff: "IM",
            value: val.map.IM,
          },
          {
            date: val.day.toString(),
            stuff: "MT",
            value: val.map.MT,
          },
          {
            date: val.day.toString(),
            stuff: "MP",
            value: val.map.MP,
          },
          {
            date: val.day.toString(),
            stuff: "SC",
            value: val.map.SC,
          },
        ])
      );
      setDataChart4(
        result.data.dataList.map((val) => [
          {
            date: val.day.toString(),
            stuff: "IN",
            value: val.map.IN,
          },
          {
            date: val.day.toString(),
            stuff: "OT",
            value: val.map.OT,
          },
        ])
      );
    } catch (err) {
      alert(`Error Fetching datachart ...! \n${err}`);
    }
    setIsLoading(false);
  }

  // Filter Bulan dan Tahun

  const handleBulanChange = (event) => {
    setSelectedBulan(event.target.value);
  };
  const handleTahunChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    getDataChart();
  }, [selectedBulan, selectedYear]);

  const ButtonFirstHalfConsole = () => {
    console.log(ButtonFirstHalfConsole, "tes");
  };
  return (
    <div style={{ padding: 30, paddingTop: 0 }}>
      <Paper
        style={{
          boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
          borderRadius: "10px",
          padding: 20,
        }}
      >
        <div
          style={{
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", directon: "row" }}>
            <CalcIcon />
            <Typography
              style={{
                fontWeight: 500,
                fontSize: "15px",
                lineHeight: "18px",
                marginLeft: 10,
              }}
            >
              Count Problem
            </Typography>
          </div>

          <div item>
            <FormControl className={classes.select}>
              <Select
                id="status"
                getPopupContainer={(trigger) => trigger.parentNode}
                input={<BootstrapInput />}
                IconComponent={DropDownIcon}
                value={selectedBulan}
                onChange={handleBulanChange}
              >
                {month.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.bulan}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.select}>
              <Select
                id="status"
                getPopupContainer={(trigger) => trigger.parentNode}
                input={<BootstrapInput />}
                IconComponent={DropDownIcon}
                value={selectedYear}
                onChange={handleTahunChange}
              >
                {year.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.tahun}>
                      {item.tahun}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>

        <Grid container spacing={1} style={{ marginTop: 28 }}>
          {isLoading ? (
            <Grid item xs={6}>
              <LoadingView />
            </Grid>
          ) : (
            <Grid item xs={6}>
              <LineCharts1
                flagHalf={flagHalf}
                setFlagHalf={setFlagHalf}
                dataChartPart1={
                  dataChart1
                    ? dataChart1[0]?.concat(
                        dataChart1[1],
                        dataChart1[2],
                        dataChart1[3],
                        dataChart1[4],
                        dataChart1[5],
                        dataChart1[6],
                        dataChart1[7],
                        dataChart1[8],
                        dataChart1[9],
                        dataChart1[10],
                        dataChart1[11],
                        dataChart1[12],
                        dataChart1[13],
                        dataChart1[14]
                      )
                    : null
                }
              />
            </Grid>
          )}

          {isLoading ? (
            <Grid item xs={6}>
              <LoadingView />
            </Grid>
          ) : (
            <Grid item xs={6}>
              <LineCharts2
                flagHalf2={flagHalf2}
                setFlagHalf2={setFlagHalf2}
                dataChartPart2={
                  dataChart2
                    ? dataChart2[0]?.concat(
                        dataChart2[1],
                        dataChart2[2],
                        dataChart2[3],
                        dataChart2[4],
                        dataChart2[5],
                        dataChart2[6],
                        dataChart2[7],
                        dataChart2[8],
                        dataChart2[9],
                        dataChart2[10],
                        dataChart2[11],
                        dataChart2[12],
                        dataChart2[13],
                        dataChart2[14]
                      )
                    : null
                }
              />
            </Grid>
          )}
          {isLoading ? (
            <Grid item xs={6}>
              <LoadingView />
            </Grid>
          ) : (
            <Grid item xs={6}>
              <LineCharts3
                flagHalf3={flagHalf3}
                setFlagHalf3={setFlagHalf3}
                dataChartPart3={
                  dataChart3
                    ? dataChart3[0]?.concat(
                        dataChart3[1],
                        dataChart3[2],
                        dataChart3[3],
                        dataChart3[4],
                        dataChart3[5],
                        dataChart3[6],
                        dataChart3[7],
                        dataChart3[8],
                        dataChart3[9],
                        dataChart3[10],
                        dataChart3[11],
                        dataChart3[12],
                        dataChart3[13],
                        dataChart3[14]
                      )
                    : null
                }
              />
            </Grid>
          )}
          {isLoading ? (
            <Grid item xs={6}>
              <LoadingView />
            </Grid>
          ) : (
            <Grid item xs={6}>
              <LineCharts4
                flagHalf4={flagHalf4}
                setFlagHalf4={setFlagHalf4}
                dataChartPart4={
                  dataChart4
                    ? dataChart4[0]?.concat(
                        dataChart4[1],
                        dataChart4[2],
                        dataChart4[3],
                        dataChart4[4],
                        dataChart4[5],
                        dataChart4[6],
                        dataChart4[7],
                        dataChart4[8],
                        dataChart4[9],
                        dataChart4[10],
                        dataChart4[11],
                        dataChart4[12],
                        dataChart4[13],
                        dataChart4[14]
                      )
                    : null
                }
              />
            </Grid>
          )}
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default SummaryCountProblem;
