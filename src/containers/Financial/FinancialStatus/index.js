import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tab, Tabs } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Budget from "../../../components/Financial/Chart/BudgetControlChart";
import BudgetStatus from "../../../components/Financial/Chart/BudgetStatus";
import DoubleGrid from "../../../components/Grid/DoubleGrid";
import constants from "../../../helpers/constants";
import {
  ChkyTablePagination,
  ChkyTabsAsOption,
} from "../../../components/chky";
import * as ThemeColor from "../../../assets/theme/colors";
import {
  useDispatch,
  useSelector,
} from "../../../helpers/Utils/react-redux-hook";
import useRupiahConverter from "../../../helpers/useRupiahConverter";
import usePercentage from "../../../helpers/usePercentage";
import DynamicTablePagination from "../../../components/DynamicTablePagination";
import Constants from "../../../helpers/constants";
import axios from "axios";

const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: ThemeColor.PrimaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: Constants.color.grayMedium,
    "&:hover": {
      color: Constants.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: Constants.color.dark,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: "calc(100vh - 64px)",
  },
  additionalHeader: {
    background: "#ffffff",
    padding: "20px 40%",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    marginBottom: "-10px",
  },
  goodStatus: {
    height: "24px",
    width: "50px",
    background: "#EFF4FF",
    border: "1px solid #88ADFF",
    borderRadius: "40px",
    textAlign: "center",
    color: "#88ADFF",
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "13px",
  },
  overBudgetStatus: {
    height: "24px",
    width: "90px",
    background: "#FFE9E9",
    border: "1px solid #FF7A76",
    borderRadius: "40px",
    textAlign: "center",
    color: "#FF7A76",
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "13px",
  },
  alertText: {
    fontFamily: "Barlow",
    fontSize: "13px",
    color: "#DC241F",
  },
  text: {
    fontFamily: "Barlow",
    fontSize: "13px",
    color: "#2B2F3C",
  },
  financialStatusTable: {
    '& .MuiTableCell-root': {
      textAlign: 'center'
    }
  }
}));

const ChildComponentStatus = (props) => {
  const { value } = props;
  const classes = useStyles();

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      {value === "Good" ? (
        <div className={classes.goodStatus}>{value}</div>
      ) : (
        <div className={classes.overBudgetStatus}>{value}</div>
      )}
    </div>
  );
};

const ChildComponentBalance = (props) => {
  const { status, value } = props;
  const classes = useStyles();

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      {status === "Good" ? (
        <div className={classes.text}>{value}</div>
      ) : (
        <div className={classes.alertText}>{value}</div>
      )}
    </div>
  );
};

const FinancialStatus = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const rowsPerPage = 10;
  const [totalRowsOpexPIC, setTotalRowsOpexPIC] = useState(0);
  const [totalRowsOpexDiv, setTotalRowsOpexDiv] = useState(0);
  const [totalRowsCapexPIC, setTotalRowsCapexPIC] = useState(0);
  const [totalRowsCapexDiv, setTotalRowsCapexDiv] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [dataBudget, setDataBudget] = useState({});
  const [dataBudgetStatus, setDataBudgetStatus] = useState({});
  const [tableOpexDivision, setTableOpexDivision] = useState([]);
  const [tableOpexPIC, setTableOpexPIC] = useState([]);
  // const [tableOpexPIC, setTableOpexPIC] = useState([
  //   {
  //     division: 'Deden',
  //     category: 'Management',
  //     totalBudget: useRupiahConverter(60000000000),
  //     budgetUsage: (
  //       <ChildComponentBalance
  //         status={'Good'}
  //         value={useRupiahConverter(40000000000)}
  //       />
  //     ),
  //     percentage: usePercentage(40000000000, 60000000000),
  //     remainBalance: (
  //       <ChildComponentBalance
  //         status={'Good'}
  //         value={useRupiahConverter(20000000000)}
  //       />
  //     ),
  //     status: <ChildComponentStatus value='Good' />,
  //   },
  //   {
  //     division: 'Edwin',
  //     category: 'Management',
  //     totalBudget: useRupiahConverter(20000000000),
  //     budgetUsage: (
  //       <ChildComponentBalance
  //         status={'Over Budget'}
  //         value={useRupiahConverter(40000000000)}
  //       />
  //     ),
  //     percentage: usePercentage(40000000000, 20000000000),
  //     remainBalance: (
  //       <ChildComponentBalance
  //         status={'Over Budget'}
  //         value={useRupiahConverter(-20000000000)}
  //       />
  //     ),
  //     status: <ChildComponentStatus value='Over Budget' />,
  //   }
  // ]);
  const [tableCapexDivision, setTableCapexDivision] = useState([]);
  const [tableCapexPIC, setTableCapexPIC] = useState([]);
  const [tabTable, setTabTable] = useState(0);
  const [isLoadData, setIsLoadData] = useState(true);
  const [isLoadDataSummary, setIsLoadDataSummary] = useState(true);

  const dispatch = useDispatch();
  const financialStatus = useSelector((state) => state.financial);
  const financialStatusTable = useSelector((state) => state.financialTable);

  const handleChange = (event, newTabValue) => {
    event.preventDefault();
    setTabValue(newTabValue);
  };

  const handleChangeTab = (value) => {
    setTabTable(value);
  };

  useEffect(() => {
    dispatch.financial.summaryFinancialStatus();
    // dispatch.financialTable.listFinancialStatus();
    hitApiOpexCapex();
  }, []);

  useEffect(() => {
    let response = financialStatus.data;
    if (response.budget) {
      let status =
        response.budget.usage < response.budget.total ? "Good" : "Over Budget";
      let balance =
        response.budget.usage < response.budget.total
          ? response.budget.total - response.budget.usage
          : 0;
      setDataBudget({
        status: status,
        colors: ["#749BFF", "#E6EAF3", constants.color.grayMedium],
        listData: [
          {
            type: "Total Budget",
            value: response.budget.total,
          },
          {
            type: "Budget Usage",
            value: response.budget.usage,
          },
          {
            type: "Remain Balance",
            value: balance,
          },
        ],
      });
    }

    if (response.budgetStatus) {
      let dataStore = [];
      let data = {};
      response.budgetStatus.map((item) => {
        dataStore.push({
          month: item.month,
          rate: "Actual",
          value: item.balance,
        });
        data = {
          data: dataStore,
          colors: ["#DC241F", "#88ADFF"],
          listData: ["Actual", "Forecast"],
        };
      });
      setDataBudgetStatus(data);
    }

    if(response.responseStatus !== undefined) {
      setIsLoadDataSummary(false);
    }
  }, [financialStatus]);

  useEffect(() => {
    setTabTable(0);
  }, [tabValue]);

  const hitApiOpexCapex = () => {
    axios
      .post(`${process.env.REACT_APP_API_FINANCIAL}/listFinancialStatus`, {})
      .then((response) => {
        if (response.data.opex !== undefined && response.data.opex.length > 0) {
          let tableOpexDivStore = []
          let tableOpexPicStore = []
          let opexDiv = {}
          let opexPic = {}
         
          // opex division
          if(response.data.opex[0].listByDivision.length > 0) {
            let totalDataOpexDiv = response.data.opex[0].listByDivision.length;
            setTotalRowsOpexDiv(totalDataOpexDiv);
            response.data.opex[0].listByDivision.map(item => {
              let status = item.budget.usage <= item.budget.total ? 'Good' : 'Over Budget'
              opexDiv = {
                division: item.division,
                category: item.category,
                totalBudget: useRupiahConverter(item.budget.total),
                budgetUsage: (
                  <ChildComponentBalance
                    status={status}
                    value={useRupiahConverter(item.budget.usage)}
                  />
                ),
                percentage: usePercentage(item.budget.usage, item.budget.total),
                remainBalance: (
                  <ChildComponentBalance
                    status={status}
                    value={useRupiahConverter(item.budget.remainBalance)}
                  />
                ),
                status: <ChildComponentStatus value={status} />,
              };
              tableOpexDivStore.push(opexDiv)
            });
          }

          // opex pic
          if(response.data.opex[0].listByPIC.length > 0) {
            let totalDataOpexPIC = response.data.opex[0].listByPIC.length;
            setTotalRowsOpexPIC(totalDataOpexPIC);
            response.data.opex[0].listByPIC.map(item => {
              let status = item.budget.usage <= item.budget.total ? 'Good' : 'Over Budget',
              opexPic = {
                pic: item.pic,
                category: item.category,
                totalBudget: useRupiahConverter(item.budget.total),
                budgetUsage: (
                  <ChildComponentBalance
                    status={status}
                    value={useRupiahConverter(item.budget.usage)}
                  />
                ),
                percentage: usePercentage(item.budget.usage, item.budget.total),
                remainBalance: (
                  <ChildComponentBalance
                    status={status}
                    value={useRupiahConverter(item.budget.remainBalance)}
                  />
                ),
                status: <ChildComponentStatus value={status} />,
              };
              tableOpexPicStore.push(opexPic)
            });
          }
          setTableOpexDivision(tableOpexDivStore)
          setTableOpexPIC(tableOpexPicStore)
          setIsLoadData(false)
        };

        if (response.data.capex !== undefined && response.data.capex.length > 0) {
          let tableCapexDivStore = []
          let tableCapexPicStore = []
          let capexDiv = {}
          let capexPic = {}

          // capex division
          if(response.data.capex[0].listByDivision.length > 0) {
            let totalDataCapexDiv = response.data.capex[0].listByDivision.length;
            setTotalRowsCapexDiv(totalDataCapexDiv);
            response.data.capex[0].listByDivision.map(item => {
              let status = item.budget.usage <= item.budget.total ? 'Good' : 'Over Budget'
              capexDiv = {
                division: item.division,
                category: item.category,
                totalBudget: useRupiahConverter(item.budget.total),
                budgetUsage: (
                  <ChildComponentBalance
                    status={status}
                    value={useRupiahConverter(item.budget.usage)}
                  />
                ),
                percentage: usePercentage(item.budget.usage, item.budget.total),
                remainBalance: (
                  <ChildComponentBalance
                    status={status}
                    value={useRupiahConverter(item.budget.remainBalance)}
                  />
                ),
                status: <ChildComponentStatus value={status} />,
              };
              tableCapexDivStore.push(capexDiv)
            });
          };

          // capex pic
          if(response.data.capex[0].listByPIC.length > 0) {
            let totalDataCapexPIC = response.data.capex[0].listByPIC.length;
            setTotalRowsCapexPIC(totalDataCapexPIC);
            response.data.capex[0].listByPIC.map(item => {
              let status = item.budget.usage <= item.budget.total ? 'Good' : 'Over Budget'
              capexPic = {
                pic: item.pic,
                category: item.category,
                totalBudget: useRupiahConverter(item.budget.total),
                budgetUsage: (
                  <ChildComponentBalance
                    status={status}
                    value={useRupiahConverter(item.budget.usage)}
                  />
                ),
                percentage: usePercentage(item.budget.usage, item.budget.total),
                remainBalance: (
                  <ChildComponentBalance
                    status={status}
                    value={useRupiahConverter(item.budget.remainBalance)}
                  />
                ),
                status: <ChildComponentStatus value={status} />,
              };
              tableCapexPicStore.push(capexPic)
            });
          }
          setTableCapexDivision(tableCapexDivStore)
          setTableCapexPIC(tableCapexPicStore)
          setIsLoadData(false)
        };
        setIsLoadData(false)

      // // opex
      // let tableOpexDivStore = [];
      // let tableOpexPicStore = [];
      // let opexDiv = {};
      // let opexPic = {};
      // // capex
      // let tableCapexDivStore = [];
      // let tableCapexPicStore = [];
      // let capexDiv = {};
      // let capexPic = {};

      // if(response.data) {
        
      //   // opex division
      //   if(response.data.devision.opex.length > 0) {
      //     let totalDataOpexDiv = response.data.devision.opex[0].listByDivision.length;
      //     setTotalRowsOpexDiv(totalDataOpexDiv);
      //     response.data.devision.opex[0].listByDivision.map(item => {
      //       let status = item.budget.usage <= item.budget.total ? "Good" : "Over Budget";
      //       opexDiv = {
      //         division: item.division,
      //         category: item.category,
      //         totalBudget: useRupiahConverter(item.budget.total),
      //         budgetUsage: (
      //           <ChildComponentBalance
      //             status={status}
      //             value={useRupiahConverter(item.budget.usage)}
      //           />
      //         ),
      //         percentage: usePercentage(item.budget.usage, item.budget.total),
      //         remainBalance: (
      //           <ChildComponentBalance
      //             status={status}
      //             value={useRupiahConverter(item.budget.remainBalance)}
      //           />
      //         ),
      //         status: <ChildComponentStatus value={status} />,
      //       };
      //       tableOpexDivStore.push(opexDiv);
      //     });
      //   }
        
      //   // opex pic
      //   if(response.data.pic.opex.length > 0) {
      //     let totalDataOpexPIC = response.data.pic.opex[0].listByPIC.length;
      //     setTotalRowsOpexPIC(totalDataOpexPIC);
      //     response.data.pic.opex[0].listByPIC.map(item => {
      //       let status = item.budget.remainBalance > 0 ? "Good" : "Over Budget";
      //       opexPic = {
      //         pic: item.pic,
      //         category: item.category,
      //         amount: (
      //           <ChildComponentBalance
      //             status={status}
      //             value={useRupiahConverter(item.budget.remainBalance)}
      //           />
      //         ),
      //         vendorName: item.vendor,
      //         Invoice: item.invoice,
      //         status: <ChildComponentStatus value={status} />,
      //       };
      //       tableOpexPicStore.push(opexPic);
      //     });
      //   }
        
      //   // capex division
      //   if(response.data.devision.capex.length > 0) {
      //     let totalDataCapexDiv = response.data.devision.capex[0].listByDivision.length;
      //     setTotalRowsCapexDiv(totalDataCapexDiv);
      //     response.data.devision.capex[0].listByDivision.map(item => {
      //       let status = item.budget.usage <= item.budget.total ? "Good" : "Over Budget";
      //       capexDiv = {
      //         division: item.division,
      //         category: item.category,
      //         totalBudget: useRupiahConverter(item.budget.total),
      //         budgetUsage: (
      //           <ChildComponentBalance
      //             status={status}
      //             value={useRupiahConverter(item.budget.usage)}
      //           />
      //         ),
      //         percentage: usePercentage(item.budget.usage, item.budget.total),
      //         remainBalance: (
      //           <ChildComponentBalance
      //             status={status}
      //             value={useRupiahConverter(item.budget.remainBalance)}
      //           />
      //         ),
      //         status: <ChildComponentStatus value={status} />,
      //       };
      //       tableCapexDivStore.push(capexDiv);
      //     });
      //   }
        
      //   // capex pic
      //   if(response.data.pic.capex.length > 0) {
      //     let totalDataCapexPIC = response.data.pic.capex[0].listByPIC.length;
      //     setTotalRowsCapexPIC(totalDataCapexPIC);
      //     response.data.pic.capex[0].listByPIC.map(item => {
      //       let status = item.budget.remainBalance > 0 ? "Good" : "Over Budget";
      //       capexPic = {
      //         pic: item.pic,
      //         category: item.category,
      //         amount: (
      //           <ChildComponentBalance
      //             status={status}
      //             value={useRupiahConverter(item.budget.remainBalance)}
      //           />
      //         ),
      //         vendorName: item.vendor,
      //         Invoice: item.invoice,
      //         status: <ChildComponentStatus value={status} />,
      //       };
      //       tableCapexPicStore.push(capexPic);
      //     });
      //   }
        
      //   setTableOpexDivision(tableOpexDivStore);
      //   setTableOpexPIC(tableOpexPicStore);
      //   setTableCapexDivision(tableCapexDivStore);
      //   setTableCapexPIC(tableCapexPicStore);

      //   if(response.status) {
      //     setIsLoadData(false);
      //   }
      // };
    }).catch(error => {
      setIsLoadData(false);
    });
  };

  const titleTableDivision = [
    "Division",
    "Category",
    "Total Budget",
    "Budget Usage",
    "Percentage",
    "Remain Balance",
    "Status",
  ];

  const titleTablePIC = [
    "PIC",
    "Category",
    "Total Budget",
    "Budget Usage",
    "Percentage",
    "Remain Balance",
    "Status",
  ];

  const valueTypeDiv = [
    "string",
    "string",
    "string",
    "child",
    "string",
    "child",
    "child"
  ];

  const valueTypePIC = [
    "string",
    "string",
    "string",
    "child",
    "string",
    "child",
    "child"
  ];

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className={classes.root}>
      <div className="contentTitle" style={{ marginBottom: "28px" }}>
        {t("financial.status")}
      </div>

      <DoubleGrid
        container={{ gutter: 20 }}
        leftComponent={{
          span: 12,
          component: <Budget data={dataBudget} isLoading={isLoadDataSummary} />,
        }}
        rightComponent={{
          span: 12,
          component: <BudgetStatus dataChart={dataBudgetStatus} isLoading={isLoadDataSummary} />,
        }}
      />

      <div style={{ margin: "40px 0 20px 0" }}>
        <ContentTabs
          value={tabValue}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <ContentTab label={t("opex")} {...a11yProps(0)} />
          <ContentTab label={t("capex")} {...a11yProps(1)} />
        </ContentTabs>
      </div>
      {tabValue === 0 && (
        <div>
          <div className={classes.additionalHeader}>
            <ChkyTabsAsOption
              dataTab={["By Division", "By PIC"]}
              handleChangeTab={handleChangeTab}
            />
          </div>
          {tabTable === 0 ? (
            <DynamicTablePagination
              rowsPerPage={rowsPerPage}
              totalRows={totalRowsOpexDiv}
              data={tableOpexDivision}
              fields={titleTableDivision}
              cellOption={valueTypeDiv}
              isLoading={isLoadData}
              className={classes.financialStatusTable}
            />
          ) : (
            <DynamicTablePagination
              rowsPerPage={rowsPerPage}
              totalRows={totalRowsOpexPIC}
              data={tableOpexPIC}
              fields={titleTablePIC}
              cellOption={valueTypeDiv}
              isLoading={isLoadData}
              className={classes.financialStatusTable}
            />
          )}
        </div>
      )}

      {tabValue === 1 && (
        <div>
          <div className={classes.additionalHeader}>
            <ChkyTabsAsOption
              dataTab={["By Division", "By PIC"]}
              handleChangeTab={handleChangeTab}
            />
          </div>
          {tabTable === 0 ? (
            <DynamicTablePagination
              rowsPerPage={rowsPerPage}
              totalRows={totalRowsCapexDiv}
              data={tableCapexDivision}
              fields={titleTableDivision}
              cellOption={valueTypePIC}
              isLoading={isLoadData}
              className={classes.financialStatusTable}
            />
          ) : (
            <DynamicTablePagination
              rowsPerPage={rowsPerPage}
              totalRows={totalRowsCapexPIC}
              data={tableCapexPIC}
              fields={titleTablePIC}
              cellOption={valueTypePIC}
              isLoading={isLoadData}
              className={classes.financialStatusTable}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialStatus;
