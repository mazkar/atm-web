import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Card,
  Typography,
  ButtonGroup,
  Button,
  Grid,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Row, Col, AutoComplete, Input } from "antd";
import MuiButton from "../../../../components/Button/MuiButton";
import { ChkyTablePagination } from "../../../../components/chky";
import { doGetOverviewSurveyVendor } from "../../ApiServicesEnvironmentPremises";
import TableTemplate from "./TableTemplate";
import LabelTextField from "../../../../components/Form/LabelTextField";
import { Barlow13 } from "../../../../components/Typography/BarlowWithSize";
import { GrayMedium } from "../../../../assets/theme/colors";
import { ChkyTabsAsOption } from "../../../../components/chky";
import * as Colors from "../../../../assets/theme/colors";
import InputText from "../../../../components/AssetManagement/inputText";

const useStyle = makeStyles({
  root: {
    padding: 20,
    border: 0,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  filterStyle: {
    border: "1px solid #E6EAF3",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    paddingLeft: 15,
    paddingRight: 20,
  },
  barlow: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
  subTitle: {
    fontWeight: 600,
    fontSize: 17,
    color: "#2B2F3C",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  inputStyle: {
    display: "flex",
    alignItems: "center",
    height: 47,
    border: "1px solid #bcc8e7",
    fontSize: 16,
    color: "#2b2f3c",
    borderRadius: 8,
    fontStyle: "italic",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
    borderRadius: 5,
    overflow: "hidden",
  },
  activeButton: {
    border: 0,
    borderRadius: 0,
    background: "#DC241F",
    color: "#FFFFFF",
  },
  notActiveButton: {
    background: "#F4F7FB",
    color: "#BCC8E7",
    border: 0,
  },
  leftButton: {
    border: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightButton: {
    border: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  middleButton: {
    border: 0,
    borderRadius: 0,
  },
  typoShowing: {
    fontWeight: 600,
    fontSize: 13,
  },
  typoVendor: {
    fontWeight: 400,
    fontSize: 13,
  },
  typoButton: {
    fontWeight: 500,
    fontSize: 12,
  },
  rootTabs: {
    minHeight: 40,
    backgroundColor: Colors.GrayUltrasoft,
    borderRadius: 10,
    color: Colors.GrayMedium,
    position: "relative",
  },
  tabsIndicator: {
    display: "none",
  },
  rootItemTabs: {
    minHeight: 40,
    // padding: "7px 10px",
  },
  selectedTabItem: {
    backgroundColor: Colors.PrimaryHard,
    color: Colors.White,
  },
  wrapperTabItem: {
    textTransform: "none",
  },
});

const UnActiveButton = withStyles({
  root: {
    borderRadius: 0,
    background: "#F4F7FB",
    color: "#BCC8E7",
  },
})(Button);

const ActiveButton = withStyles({
  root: {
    borderRadius: 0,
    background: "#DC241F",
    color: "#FFFFFF",
  },
})(Button);

const FilterTabs = ({ currentTab, dataTab, onChange }) => {
  const classes = useStyle();
  const [selectedTab, setSelectedTab] = useState(currentTab);

  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };
  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };

  const handleChange = (newVal) => {
    onChange(newVal);
    setSelectedTab(newVal);
  };

  useEffect(() => {
    setSelectedTab(currentTab);
  }, [currentTab]);

  return (
    <Tabs
      classes={tabsStyles}
      value={selectedTab}
      onChange={handleChange}
      variant="fullWidth"
    >
      {dataTab.map((item, index) => {
        return <Tab key={index} classes={tabItemStyles} label={item} />;
      })}
    </Tabs>
  );
};

const TableSummarySurveyVendor = () => {
  // variable is here
  const classess = useStyle();
  const {
    root,
    barlow,
    subTitle,
    filterStyle,
    flexRow,
    inputStyle,
    buttonGroup,
    typoShowing,
    typoVendor,
    typoButton,
  } = classess;

  const filterButton = [
    {
      field: "All",
      value: "all",
    },
    {
      field: "Jumlah Survey",
      value: "totalSurvey",
    },
    {
      field: "Open",
      value: "surveyOpen",
    },
    {
      field: "Tepat Waktu",
      value: "surveyDone",
    },
    {
      field: "Delay",
      value: "surveyDelay",
    },
    {
      field: "Tidak Dikerjakan",
      value: "notSurvey",
    },
    {
      field: "Manual",
      value: "surveyManual",
    },
    // "All",
    // "Jumlah Survey",
    // "Open",
    // "Tepat Waktu",
    // "Delay",
    // "Tidak Dikerjakan",
    // "Manual",
  ];

  const dataDummy = [
    {
      vendorName: "PT Raline Shah Abadi",
      totalSurvey: "120",
      openSurvey: "30",
      onTimeSurvey: "20",
      delaySurvey: "20",
      notWorkSurvey: "20",
      manualSurvey: "10",
    },
    {
      vendorName: "PT Raline Shah Abadi",
      totalSurvey: "120",
      openSurvey: "30",
      onTimeSurvey: "20",
      delaySurvey: "20",
      notWorkSurvey: "20",
      manualSurvey: "10",
    },
    {
      vendorName: "PT Raline Shah Abadi",
      totalSurvey: "120",
      openSurvey: "30",
      onTimeSurvey: "20",
      delaySurvey: "20",
      notWorkSurvey: "20",
      manualSurvey: "10",
    },
    {
      vendorName: "PT Raline Shah Abadi",
      totalSurvey: "120",
      openSurvey: "30",
      onTimeSurvey: "20",
      delaySurvey: "20",
      notWorkSurvey: "20",
      manualSurvey: "10",
    },
    {
      vendorName: "PT Raline Shah Abadi",
      totalSurvey: "120",
      openSurvey: "30",
      onTimeSurvey: "20",
      delaySurvey: "20",
      notWorkSurvey: "20",
      manualSurvey: "10",
    },
    {
      vendorName: "PT Raline Shah Abadi",
      totalSurvey: "120",
      openSurvey: "30",
      onTimeSurvey: "20",
      delaySurvey: "20",
      notWorkSurvey: "20",
      manualSurvey: "10",
    },
    {
      vendorName: "PT Raline Shah Abadi",
      totalSurvey: "120",
      openSurvey: "30",
      onTimeSurvey: "20",
      delaySurvey: "20",
      notWorkSurvey: "20",
      manualSurvey: "10",
    },
    {
      vendorName: "PT Raline Shah Abadi",
      totalSurvey: "120",
      openSurvey: "30",
      onTimeSurvey: "20",
      delaySurvey: "20",
      notWorkSurvey: "20",
      manualSurvey: "10",
    },
    {
      vendorName: "PT Raline Shah Abadi",
      totalSurvey: "120",
      openSurvey: "30",
      onTimeSurvey: "20",
      delaySurvey: "20",
      notWorkSurvey: "20",
      manualSurvey: "10",
    },
    {
      vendorName: "PT Raline Shah Abadi",
      totalSurvey: "120",
      openSurvey: "30",
      onTimeSurvey: "20",
      delaySurvey: "20",
      notWorkSurvey: "20",
      manualSurvey: "10",
    },
  ];

  const filterTabs = [
    "All",
    "Jumlah Survey",
    "Open",
    "Tepat Waktu",
    "Delay",
    "Tidak Dikerjakan",
    "Manual",
  ];

  const rowsPerPage = 10;

  const defaultDataHit = {
    pageNumber: 0,
    dataPerPage: rowsPerPage,
    sortBy: "id",
    sortType: "ASC",
    vendorName: "all",
  };

  // state is here
  const [tabsIndex, setTabsIndex] = useState(0);
  const [data, setData] = useState(dataDummy);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [inputVendor, setInputVendor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState({
    index: 0,
    value: "All",
  });
  const [applyState, setApplyState] = useState(false);
  const [tableConfig, setTableConfig] = useState({
    dataRequest: {
      pageNumber: 0,
      dataPerPage: rowsPerPage,
      sortBy: "id",
      sortType: "ASC",
      vendorName: "all",
    },
    orderDirection: "ASC",
    totalPages: 0,
    totalRows: 0,
    sortBy: null,
  });

  // function is here

  const clickedButton = (index, val) => {
    setSelectedButton({ ...selectedButton, index: index, value: val });
  };

  const onChangeInput = (e) => {
    setInputVendor(e.target.value);
  };

  const loaderHandler = (bool) => {
    setIsLoading(bool);
  };

  function handleSortTable(property) {
    return function actualFn(e) {
      const isActiveAndAsc =
        tableConfig.sortBy === property && tableConfig.orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVar[TableTemplate.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setTableConfig((prevValue) => ({
        ...prevValue,
        orderDirection: sortType,
        sortBy: property,
        dataRequest: {
          ...tableConfig.dataRequest,
          sortType,
          sortBy: sortByNewVal,
        },
      }));
      setDataRequest({
        ...dataRequest,
        sortBy: sortByNewVal,
        sortType: sortType,
      });
    };
  }

  function handleChangePage(newPage) {
    setDataRequest({ ...dataRequest, pageNumber: newPage });
  }

  const getTabValue = (tabs) => {
    switch (tabs) {
      case "All":
        return "id";
      case "Jumlah Survey":
        return "totalSurvey";
      case "Open":
        return "surveyOpen";
      case "Tepat Waktu":
        return "surveyDone";
      case "Delay":
        return "surveyDelay";
      case "Tidak Dikerjakan":
        return "notSurvey";
      case "Manual":
        return "surveyManual";
      default:
        break;
    }
  };

  const handleApply = () => {
    const tempRequest = { ...tableConfig };
    tempRequest.dataRequest.sortBy = getTabValue(filterTabs[tabsIndex]);
    setDataRequest(tempRequest);
    setApplyState(!applyState);
  };

  useEffect(() => {
    const { dataRequest } = tableConfig;
    doGetOverviewSurveyVendor(
      loaderHandler,
      dataRequest.pageNumber,
      dataRequest.dataPerPage,
      dataRequest.sortBy,
      dataRequest.sortType,
      inputVendor
    ).then((res) => {
      if (res.status === 200) {
        const { data } = res;
        setData(data.content);
        setTableConfig({
          ...tableConfig,
          totalPages: data.totalPages,
          totalRows: data.totalElements,
        });
      }
    });
  }, [applyState, tableConfig.dataRequest]);

  // return page is here
  return (
    <>
      <Card className={root} variant="outlined">
        <Row>
          <Col flex={1}>
            <Typography className={`${barlow} ${subTitle}`}>
              Jumlah Survey Vendor
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col flex={1}>
            <Card className={filterStyle} variant="outlined">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 20,
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Barlow13 style={{ fontWeight: 600 }}>Showing :</Barlow13>
                    <Barlow13 style={{ fontWeight: 400 }}>Vendor Name</Barlow13>
                    <InputText
                      style={{ width: 140 }}
                      value={inputVendor}
                      onChange={(e) => setInputVendor(e.target.value)}
                      
                      placeholder="Vendor Name"
                    />
                    <ChkyTabsAsOption
                      minWidth={"max-content"}
                      currenTab={tabsIndex}
                      dataTab={filterTabs}
                      handleChangeTab={(val) => setTabsIndex(val)}
                    />
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <MuiButton
                      label="Apply Filter"
                      onClick={handleApply}
                      height={38}
                    />
                  </div>
                </Grid>
              </Grid>
              {/* <Row align="middle">
                <Col flex={1} className={flexRow}>
                  <Typography className={`${barlow} ${typoShowing}`}>
                    Showing :
                  </Typography>
                  <div
                    className={flexRow}
                    style={{ paddingTop: 0, paddingBottom: 0, gap: 5 }}
                  >
                    <Typography className={`${barlow} ${typoVendor}`}>
                      Vendor Name
                    </Typography>
                    <AutoComplete value="">
                      <Input
                        className={inputStyle}
                        placeholder="Vendor Name"
                        value={inputVendor}
                        onChange={(e) => onChangeInput(e.target.value)}
                      />
                    </AutoComplete>
                  </div>
                  <div className={buttonGroup}>
                    {filterButton.map((button, index) => {
                      if (index === selectedButton.index) {
                        return (
                          <ActiveButton
                            onClick={() => clickedButton(index, button.value)}
                          >
                            <Typography className={`${barlow} ${typoButton}`}>
                              {button.field}
                            </Typography>
                          </ActiveButton>
                        );
                      }
                      return (
                        <UnActiveButton
                          onClick={() => clickedButton(index, button.value)}
                        >
                          <Typography className={`${barlow} ${typoButton}`}>
                            {button.field}
                          </Typography>
                        </UnActiveButton>
                      );
                    })}
                  </div>
                </Col>
                <Col flex={"auto"}></Col>
                <Col flex={"130px"}>
                  <MuiButton
                    label="Apply Filter"
                    onClick={handleApply}
                    height={38}
                  />
                </Col>
              </Row> */}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col flex={1}></Col>
        </Row>
        <ChkyTablePagination
          data={data}
          rowsPerPage={rowsPerPage}
          fields={TableTemplate.titleTable}
          cellOption={TableTemplate.valueType}
          isSort={TableTemplate.isSort}
          totalPages={tableConfig.totalPages}
          totalRows={tableConfig.totalRows}
          sortBy={tableConfig.sortBy}
          order={tableConfig.orderDirection}
          changePage={handleChangePage}
          handleSort={handleSortTable}
          isLoadData={isLoading}
          isUsingMuiSort
        />
      </Card>
    </>
  );
};

export default TableSummarySurveyVendor;

// data={tableData}
// rowsPerPage={rowsPerPage}
// fields={TableTemplate.titleTable}
// cellOption={TableTemplate.valueType}
// isSort={TableTemplate.isSort}
// totalPages={tableConfig.totalPages}
// totalRows={tableConfig.totalRows}
// sortBy={tableConfig.sortBy}
// order={tableConfig.orderDirection}
// changePage={handleChangePage}
// handleSort={handleSortTable}
// isLoadData={isLoading}
// isUsingMuiSort
