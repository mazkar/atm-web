/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Button, Col, Row } from "antd";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Paper, Grid, Tabs, Tab, Typography } from "@material-ui/core";
import { GrayMedium } from "../../../../assets/theme/colors";
import constants from "../../../../helpers/constants";
import {
  ChkyTablePagination,
  ChkyTabsAsOption,
} from "../../../../components/chky";
import LoadingView from "../../../../components/Loading/LoadingView";

import ExpandableFilter from "./pivot";

const useStyles = makeStyles({
  root: {
    width: "100%",
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  table: {
    minWidth: 750,
    marginTop: 30,
  },

  // Tabs Style
  rootTabs: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
    width: "fit-content",
    position: "relative",
    left: "65%",
  },
  wrapperTabItem: {
    textTransform: "none",
  },
  selectedTabItem: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  rootItemTabs: {
    minHeight: 40,
    minWidth: 100,
    padding: "7px 10px",
    fontSize: 12,
  },
  additionalHeader: {
    background: "#ffffff",
    padding: "20px 40%",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    marginBottom: "-10px",
  },
});

function createData(
  name,
  d1,
  d2,
  d3,
  d4,
  d5,
  d6,
  d7,
  d8,
  d9,
  d10,
  d11,
  d12,
  d13,
  d14,
  d15
) {
  return {
    name,
    d1,
    d2,
    d3,
    d4,
    d5,
    d6,
    d7,
    d8,
    d9,
    d10,
    d11,
    d12,
    d13,
    d14,
    d15,
  };
}
const dummyData = [
  {
    name: "CF",
    nameValue: "CF",
    isChecked: false,
  },
  {
    name: "CO",
    nameValue: "CO",
    isChecked: false,
  },
  {
    name: "LC",
    nameValue: "LC",
    isChecked: false,
  },
  {
    name: "DF",
    nameValue: "DF",
    isChecked: false,
  },
  {
    name: "EF",
    nameValue: "Encryptor",
    isChecked: false,
  },
  {
    name: "HW",
    nameValue: "Hardware",
    isChecked: false,
  },
  {
    name: "IM",
    nameValue: "Implementasi",
    isChecked: false,
  },
  {
    name: "IN",
    nameValue: "Insurance",
    isChecked: false,
  },
  {
    name: "JF",
    nameValue: "Journal",
    isChecked: false,
  },
  {
    name: "MT",
    nameValue: "Maintenance",
    isChecked: false,
  },
  {
    name: "SF",
    nameValue: "Media Promosi",
    isChecked: false,
  },
  {
    name: "OP",
    nameValue: "Other",
    isChecked: false,
  },
  {
    name: "OP",
    nameValue: "OP",
    isChecked: false,
  },
  {
    name: "RF",
    nameValue: "Receipt Printer",
    isChecked: false,
  },
  {
    name: "SC",
    nameValue: "Security",
    isChecked: false,
  },
  {
    name: "SL",
    nameValue: "SLM",
    isChecked: false,
  },
  {
    name: "SP",
    nameValue: "SPV Mode",
    isChecked: false,
  },
];

export default function DenseTable() {
  const [tabTable, setTabTable] = useState(0);
  const [dataTable, setDataTable] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [flagHalf, setFlagHalf] = useState(false);

  const plusHalf = () => {
    setFlagHalf(true);
  };
  const minusHalf = () => {
    setFlagHalf(false);
  };

  const rows = [
    dataTable["1"]?.CF !== undefined
      ? createData(
          "CF ",
          dataTable["1"]?.CF,
          dataTable["2"]?.CF,
          dataTable["3"]?.CF,
          dataTable["4"]?.CF,
          dataTable["5"]?.CF,
          dataTable["6"]?.CF,
          dataTable["7"]?.CF,
          dataTable["8"]?.CF,
          dataTable["9"]?.CF,
          dataTable["10"]?.CF,
          dataTable["11"]?.CF,
          dataTable["12"]?.CF,
          dataTable["13"]?.CF,
          dataTable["14"]?.CF,
          dataTable["15"]?.CF,
          dataTable["16"]?.CF,
          dataTable["17"]?.CF,
          dataTable["18"]?.CF,
          dataTable["19"]?.CF,
          dataTable["20"]?.CF,
          dataTable["21"]?.CF,
          dataTable["22"]?.CF,
          dataTable["23"]?.CF,
          dataTable["24"]?.CF,
          dataTable["25"]?.CF,
          dataTable["26"]?.CF,
          dataTable["27"]?.CF,
          dataTable["28"]?.CF,
          dataTable["29"]?.CF,
          dataTable["30"]?.CF
        )
      : null,

    dataTable["1"]?.CO !== undefined
      ? createData(
          "CO",
          dataTable["1"]?.CO,
          dataTable["2"]?.CO,
          dataTable["3"]?.CO,
          dataTable["4"]?.CO,
          dataTable["5"]?.CO,
          dataTable["6"]?.CO,
          dataTable["7"]?.CO,
          dataTable["8"]?.CO,
          dataTable["9"]?.CO,
          dataTable["10"]?.CO,
          dataTable["11"]?.CO,
          dataTable["12"]?.CO,
          dataTable["13"]?.CO,
          dataTable["14"]?.CO,
          dataTable["15"]?.CO
        )
      : null,

    dataTable["1"]?.LC !== undefined
      ? createData(
          "LC",
          dataTable["1"]?.LC,
          dataTable["2"]?.LC,
          dataTable["3"]?.LC,
          dataTable["4"]?.LC,
          dataTable["5"]?.LC,
          dataTable["6"]?.LC,
          dataTable["7"]?.LC,
          dataTable["8"]?.LC,
          dataTable["9"]?.LC,
          dataTable["10"]?.LC,
          dataTable["11"]?.LC,
          dataTable["12"]?.LC,
          dataTable["13"]?.LC,
          dataTable["14"]?.LC,
          dataTable["15"]?.LC
        )
      : null,
    dataTable["1"]?.DF !== undefined
      ? createData(
          "DF",
          dataTable["1"]?.DF,
          dataTable["2"]?.DF,
          dataTable["3"]?.DF,
          dataTable["4"]?.DF,
          dataTable["5"]?.DF,
          dataTable["6"]?.DF,
          dataTable["7"]?.DF,
          dataTable["8"]?.DF,
          dataTable["9"]?.DF,
          dataTable["10"]?.DF,
          dataTable["11"]?.DF,
          dataTable["12"]?.DF,
          dataTable["13"]?.DF,
          dataTable["14"]?.DF,
          dataTable["15"]?.DF
        )
      : null,
    dataTable["1"]?.EF !== undefined
      ? createData(
          "Encryptor",
          dataTable["1"]?.EF,
          dataTable["2"]?.EF,
          dataTable["3"]?.EF,
          dataTable["4"]?.EF,
          dataTable["5"]?.EF,
          dataTable["6"]?.EF,
          dataTable["7"]?.EF,
          dataTable["8"]?.EF,
          dataTable["9"]?.EF,
          dataTable["10"]?.EF,
          dataTable["11"]?.EF,
          dataTable["12"]?.EF,
          dataTable["13"]?.EF,
          dataTable["14"]?.EF,
          dataTable["15"]?.EF
        )
      : null,

    dataTable["1"]?.HW !== undefined
      ? createData(
          "Hardware",
          dataTable["1"]?.HW,
          dataTable["2"]?.HW,
          dataTable["3"]?.HW,
          dataTable["4"]?.HW,
          dataTable["5"]?.HW,
          dataTable["6"]?.HW,
          dataTable["7"]?.HW,
          dataTable["8"]?.HW,
          dataTable["9"]?.HW,
          dataTable["10"]?.HW,
          dataTable["11"]?.HW,
          dataTable["12"]?.HW,
          dataTable["13"]?.HW,
          dataTable["14"]?.HW,
          dataTable["15"]?.HW
        )
      : null,
    dataTable["1"]?.IM !== undefined
      ? createData(
          "Implementasi",
          dataTable["1"]?.IM,
          dataTable["2"]?.IM,
          dataTable["3"]?.IM,
          dataTable["4"]?.IM,
          dataTable["5"]?.IM,
          dataTable["6"]?.IM,
          dataTable["7"]?.IM,
          dataTable["8"]?.IM,
          dataTable["9"]?.IM,
          dataTable["10"]?.IM,
          dataTable["11"]?.IM,
          dataTable["12"]?.IM,
          dataTable["13"]?.IM,
          dataTable["14"]?.IM,
          dataTable["15"]?.IM
        )
      : null,
    dataTable["1"]?.IN !== undefined
      ? createData(
          "Insurance",
          dataTable["1"]?.IN,
          dataTable["2"]?.IN,
          dataTable["3"]?.IN,
          dataTable["4"]?.IN,
          dataTable["5"]?.IN,
          dataTable["6"]?.IN,
          dataTable["7"]?.IN,
          dataTable["8"]?.IN,
          dataTable["9"]?.IN,
          dataTable["10"]?.IN,
          dataTable["11"]?.IN,
          dataTable["12"]?.IN,
          dataTable["13"]?.IN,
          dataTable["14"]?.IN,
          dataTable["15"]?.IN
        )
      : null,
    dataTable["1"]?.JF !== undefined
      ? createData(
          "Journal",
          dataTable["1"]?.JF,
          dataTable["2"]?.JF,
          dataTable["3"]?.JF,
          dataTable["4"]?.JF,
          dataTable["5"]?.JF,
          dataTable["6"]?.JF,
          dataTable["7"]?.JF,
          dataTable["8"]?.JF,
          dataTable["9"]?.JF,
          dataTable["10"]?.JF,
          dataTable["11"]?.JF,
          dataTable["12"]?.JF,
          dataTable["13"]?.JF,
          dataTable["14"]?.JF,
          dataTable["15"]?.JF
        )
      : null,
    dataTable["1"]?.MT !== undefined
      ? createData(
          "Maintenance",
          dataTable["1"]?.MT,
          dataTable["2"]?.MT,
          dataTable["3"]?.MT,
          dataTable["4"]?.MT,
          dataTable["5"]?.MT,
          dataTable["6"]?.MT,
          dataTable["7"]?.MT,
          dataTable["8"]?.MT,
          dataTable["9"]?.MT,
          dataTable["10"]?.MT,
          dataTable["11"]?.MT,
          dataTable["12"]?.MT,
          dataTable["13"]?.MT,
          dataTable["14"]?.MT,
          dataTable["15"]?.MT
        )
      : null,
    dataTable["1"]?.SF !== undefined
      ? createData(
          "Media Promosi",
          dataTable["1"]?.SF,
          dataTable["2"]?.SF,
          dataTable["3"]?.SF,
          dataTable["4"]?.SF,
          dataTable["5"]?.SF,
          dataTable["6"]?.SF,
          dataTable["7"]?.SF,
          dataTable["8"]?.SF,
          dataTable["9"]?.SF,
          dataTable["10"]?.SF,
          dataTable["11"]?.SF,
          dataTable["12"]?.SF,
          dataTable["13"]?.SF,
          dataTable["14"]?.SF,
          dataTable["15"]?.SF
        )
      : null,
    dataTable["1"]?.OP !== undefined
      ? createData(
          "Other",
          dataTable["1"]?.OP,
          dataTable["2"]?.OP,
          dataTable["3"]?.OP,
          dataTable["4"]?.OP,
          dataTable["5"]?.OP,
          dataTable["6"]?.OP,
          dataTable["7"]?.OP,
          dataTable["8"]?.OP,
          dataTable["9"]?.OP,
          dataTable["10"]?.OP,
          dataTable["11"]?.OP,
          dataTable["12"]?.OP,
          dataTable["13"]?.OP,
          dataTable["14"]?.OP,
          dataTable["15"]?.OP
        )
      : null,
    dataTable["1"]?.OP !== undefined
      ? createData(
          "OP",
          dataTable["1"]?.OP,
          dataTable["2"]?.OP,
          dataTable["3"]?.OP,
          dataTable["4"]?.OP,
          dataTable["5"]?.OP,
          dataTable["6"]?.OP,
          dataTable["7"]?.OP,
          dataTable["8"]?.OP,
          dataTable["9"]?.OP,
          dataTable["10"]?.OP,
          dataTable["11"]?.OP,
          dataTable["12"]?.OP,
          dataTable["13"]?.OP,
          dataTable["14"]?.OP,
          dataTable["15"]?.OP
        )
      : null,
    dataTable["1"]?.RF !== undefined
      ? createData(
          "Receipt Printer",
          dataTable["1"]?.RF,
          dataTable["2"]?.RF,
          dataTable["3"]?.RF,
          dataTable["4"]?.RF,
          dataTable["5"]?.RF,
          dataTable["6"]?.RF,
          dataTable["7"]?.RF,
          dataTable["8"]?.RF,
          dataTable["9"]?.RF,
          dataTable["10"]?.RF,
          dataTable["11"]?.RF,
          dataTable["12"]?.RF,
          dataTable["13"]?.RF,
          dataTable["14"]?.RF,
          dataTable["15"]?.RF
        )
      : null,
    dataTable["1"]?.SC !== undefined
      ? createData(
          "Security",
          dataTable["1"]?.SC,
          dataTable["2"]?.SC,
          dataTable["3"]?.SC,
          dataTable["4"]?.SC,
          dataTable["5"]?.SC,
          dataTable["6"]?.SC,
          dataTable["7"]?.SC,
          dataTable["8"]?.SC,
          dataTable["9"]?.SC,
          dataTable["10"]?.SC,
          dataTable["11"]?.SC,
          dataTable["12"]?.SC,
          dataTable["13"]?.SC,
          dataTable["14"]?.SC,
          dataTable["15"]?.SC
        )
      : null,
    dataTable["1"]?.SL !== undefined
      ? createData(
          "SLM",
          dataTable["1"]?.SL,
          dataTable["2"]?.SL,
          dataTable["3"]?.SL,
          dataTable["4"]?.SL,
          dataTable["5"]?.SL,
          dataTable["6"]?.SL,
          dataTable["7"]?.SL,
          dataTable["8"]?.SL,
          dataTable["9"]?.SL,
          dataTable["10"]?.SL,
          dataTable["11"]?.SL,
          dataTable["12"]?.SL,
          dataTable["13"]?.SL,
          dataTable["14"]?.SL,
          dataTable["15"]?.SL
        )
      : null,
    dataTable["1"]?.SP !== undefined
      ? createData(
          "SPV Mode",
          dataTable["1"]?.SP,
          dataTable["2"]?.SP,
          dataTable["3"]?.SP,
          dataTable["4"]?.SP,
          dataTable["5"]?.SP,
          dataTable["6"]?.SP,
          dataTable["7"]?.SP,
          dataTable["8"]?.SP,
          dataTable["9"]?.SP,
          dataTable["10"]?.SP,
          dataTable["11"]?.SP,
          dataTable["12"]?.SP,
          dataTable["13"]?.SP,
          dataTable["14"]?.SP,
          dataTable["15"]?.SP
        )
      : null,
    dataTable["1"]?.totalProblem !== undefined
      ? createData(
          "Total Problem",
          dataTable["1"]?.totalProblem,
          dataTable["2"]?.totalProblem,
          dataTable["3"]?.totalProblem,
          dataTable["4"]?.totalProblem,
          dataTable["5"]?.totalProblem,
          dataTable["6"]?.totalProblem,
          dataTable["7"]?.totalProblem,
          dataTable["8"]?.totalProblem,
          dataTable["9"]?.totalProblem,
          dataTable["10"]?.totalProblem,
          dataTable["11"]?.totalProblem,
          dataTable["12"]?.totalProblem,
          dataTable["13"]?.totalProblem,
          dataTable["14"]?.totalProblem,
          dataTable["15"]?.totalProblem
        )
      : null,
  ];

  // Fetch Data Chart

  const bodyDefault = {
    filter: "monthly",
    // problemCategory: [""],
    problemCategory: [
      "CF",
      "CO",
      "LC",
      "DF",
      "HW",
      "IN",
      "JF",
      "MT",
      "OP",
      "PM",
      "RF",
      "SC",
      "SL",
      "SF",
      "SP",
      "IM",
    ],
  };
  const [dataRequest, setDataRequest] = useState(bodyDefault);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [newRequest, setNewRequest] = useState({});

  const handleApply = (dataValue, inputOthers) => {
    console.log(dataValue);
    setResetPageCounter((prevCount) => prevCount + 1);
    const dataApplied = [];
    const isCheckedValue = dataValue.filter(function (data) {
      return data.isChecked == true;
    });
    isCheckedValue.map((item) => {
      dataApplied.push(item.name);
    });
    console.log(dataApplied);
    setDataRequest({
      ...dataRequest,
      problemCategory: dataApplied,
    });
    setNewRequest({
      ...dataRequest,
      problemCategory: dataApplied,
    });
  };

  async function getDataTable() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constants.MONITORING_SERVICE}/getOverviewPivot`,
        dataRequest
      );
      console.log("res table", result.data.data["1"]);

      setDataTable(result.data.data);
    } catch (err) {
      alert(`Error Fetching datachart ...! \n${err}`);
    }
    setIsLoading(false);
  }

  const classes = useStyles();

  const handleChangeTab = (value) => {
    setTabTable(value);
    setDataRequest({
      ...dataRequest,
      filter: value === 0 ? "monthly" : "yearly",
    });
    console.log(value);
  };

  useEffect(() => {
    getDataTable();
  }, [dataRequest, newRequest]);
  useEffect(() => {
    getDataTable();
  }, [tabTable]);

  const buttonConsole = () => {
    console.log(rows);
  };

  return (
    <div>
      <ExpandableFilter
        data={dummyData}
        handleApply={handleApply}
        setDataRequest={setDataRequest}
        defaultDataHit={bodyDefault}
        label="Pivot"
        otherCheckbox
      />
      <div
        style={{
          borderRadius: 8,
          border: `1px solid ${GrayMedium}`,
          paddingTop: 10,
          height: "100%",
        }}
      >
        <div className={classes.additionalHeader}>
          <ChkyTabsAsOption
            dataTab={["Monthly", "Yearly"]}
            handleChangeTab={handleChangeTab}
            minWidth="max-content"
            value={tabTable}
          />
        </div>

        {isLoading ? (
          <>
            <LoadingView />
          </>
        ) : (
          <>
            {tabTable === 0 ? (
              <Row
                gutter={24}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Col
                  xl={3}
                  style={{
                    border: "1px solid #BCC8E7",
                    marginRight: 26,
                    padding: "4px 8px 4px 8px",
                    justifyContent: "space-between",
                    alignItems: "center",

                    display: "flex",

                    borderRadius: 8,
                  }}
                >
                  <ArrowBackIosIcon
                    style={
                      flagHalf
                        ? { color: "#DC241F", fontSize: 14, fontWeight: "bold" }
                        : { color: "#a6a6a6", fontSize: 14, fontWeight: "bold" }
                    }
                    onClick={minusHalf}
                  />

                  <Typography style={{ fonstSize: 8 }}>
                    {flagHalf ? "2nd Half" : "1st Half"}
                  </Typography>

                  <ArrowForwardIosIcon
                    style={
                      flagHalf
                        ? { color: "#a6a6a6", fontSize: 14, fontWeight: "bold" }
                        : { color: "#DC241F", fontSize: 14, fontWeight: "bold" }
                    }
                    onClick={plusHalf}
                  />
                </Col>
              </Row>
            ) : (
              <></>
            )}

            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <>
                      <TableCell>Date</TableCell>
                      {tabTable === 0 ? (
                        flagHalf === false ? (
                          <>
                            <TableCell align="right">1</TableCell>
                            <TableCell align="right">2</TableCell>
                            <TableCell align="right">3</TableCell>
                            <TableCell align="right">4</TableCell>
                            <TableCell align="right">5</TableCell>
                            <TableCell align="right">6</TableCell>
                            <TableCell align="right">7</TableCell>
                            <TableCell align="right">8</TableCell>
                            <TableCell align="right">9</TableCell>
                            <TableCell align="right">10</TableCell>
                            <TableCell align="right">11</TableCell>
                            <TableCell align="right">12</TableCell>
                            <TableCell align="right">13</TableCell>
                            <TableCell align="right">14</TableCell>
                            <TableCell align="right">15</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="right">16</TableCell>
                            <TableCell align="right">17</TableCell>
                            <TableCell align="right">18</TableCell>
                            <TableCell align="right">19</TableCell>
                            <TableCell align="right">20</TableCell>
                            <TableCell align="right">21</TableCell>
                            <TableCell align="right">22</TableCell>
                            <TableCell align="right">23</TableCell>
                            <TableCell align="right">24</TableCell>
                            <TableCell align="right">25</TableCell>
                            <TableCell align="right">26</TableCell>
                            <TableCell align="right">27</TableCell>
                            <TableCell align="right">28</TableCell>
                            <TableCell align="right">29</TableCell>
                            <TableCell align="right">30</TableCell>
                          </>
                        )
                      ) : (
                        <>
                          <TableCell align="right">1</TableCell>
                          <TableCell align="right">2</TableCell>
                          <TableCell align="right">3</TableCell>
                          <TableCell align="right">4</TableCell>
                          <TableCell align="right">5</TableCell>
                          <TableCell align="right">6</TableCell>
                          <TableCell align="right">7</TableCell>
                          <TableCell align="right">8</TableCell>
                          <TableCell align="right">9</TableCell>
                          <TableCell align="right">10</TableCell>
                          <TableCell align="right">11</TableCell>
                          <TableCell align="right">12</TableCell>
                        </>
                      )}

                      {/* <TableCell align="right">16</TableCell>
            <TableCell align="right">17</TableCell>
            <TableCell align="right">18</TableCell>
            <TableCell align="right">19</TableCell>
            <TableCell align="right">20</TableCell>
            <TableCell align="right">21</TableCell>
            <TableCell align="right">22</TableCell>
            <TableCell align="right">23</TableCell>
            <TableCell align="right">24</TableCell>
            <TableCell align="right">25</TableCell>
            <TableCell align="right">26</TableCell>
            <TableCell align="right">27</TableCell>
            <TableCell align="right">28</TableCell>
            <TableCell align="right">29</TableCell> */}
                    </>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .filter(function (el) {
                      return el !== null;
                    })
                    .map((row) => (
                      <>
                        <TableRow key={row?.name}>
                          <TableCell component="th" scope="row">
                            <Typography style={{ fontWeight: 500 }}>
                              {row?.name}
                            </Typography>
                          </TableCell>
                          {tabTable === 0 ? (
                            flagHalf === false ? (
                              <>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d1 !== undefined ? row?.d1 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d2 !== undefined ? row?.d2 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d3 !== undefined ? row?.d3 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d4 !== undefined ? row?.d4 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d5 !== undefined ? row?.d5 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d6 !== undefined ? row?.d6 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d7 !== undefined ? row?.d7 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d8 !== undefined ? row?.d8 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d9 !== undefined ? row?.d9 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d10 !== undefined ? row?.d10 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d11 !== undefined ? row?.d11 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d12 !== undefined ? row?.d12 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d13 !== undefined ? row?.d13 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d14 !== undefined ? row?.d14 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d15 !== undefined ? row?.d15 : "0"}
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d16 !== undefined ? row?.d16 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d17 !== undefined ? row?.d17 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d18 !== undefined ? row?.d18 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d19 !== undefined ? row?.d19 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d20 !== undefined ? row?.d20 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d21 !== undefined ? row?.d21 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d22 !== undefined ? row?.d22 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d23 !== undefined ? row?.d23 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d24 !== undefined ? row?.d24 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d25 !== undefined ? row?.d25 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d26 !== undefined ? row?.d26 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d27 !== undefined ? row?.d27 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d28 !== undefined ? row?.d28 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d29 !== undefined ? row?.d29 : "0"}
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                  {row?.d30 !== undefined ? row?.d30 : "0"}
                                </TableCell>
                              </>
                            )
                          ) : (
                            <>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d1 !== undefined ? row?.d1 : "0"}
                              </TableCell>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d2 !== undefined ? row?.d2 : "0"}
                              </TableCell>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d3 !== undefined ? row?.d3 : "0"}
                              </TableCell>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d4 !== undefined ? row?.d4 : "0"}
                              </TableCell>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d5 !== undefined ? row?.d5 : "0"}
                              </TableCell>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d6 !== undefined ? row?.d6 : "0"}
                              </TableCell>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d7 !== undefined ? row?.d7 : "0"}
                              </TableCell>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d8 !== undefined ? row?.d8 : "0"}
                              </TableCell>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d9 !== undefined ? row?.d9 : "0"}
                              </TableCell>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d10 !== undefined ? row?.d10 : "0"}
                              </TableCell>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d11 !== undefined ? row?.d11 : "0"}
                              </TableCell>
                              <TableCell align="right" style={{ fontWeight: row?.name === "Total Problem" ? 500 : 400 }}>
                                {row?.d12 !== undefined ? row?.d12 : "0"}
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      </>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </div>
  );
}
