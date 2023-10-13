import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import SummaryOpexApex from "../../components/Financial/SummaryOpexApex";
import constants from "../../helpers/constants";
import TableSummary from "../RBBData/TableRBB";
import { ReactComponent as TitleRateIcon } from "../../assets/icons/general/transaction_rate_overview.svg";
import { useSelector, useDispatch } from "../../helpers/Utils/react-redux-hook";
import * as ThemeColor from "../../assets/theme/colors";
import useRupiahConverter from "../../helpers/useRupiahConverter";
import usePercentage from "../../helpers/usePercentage";
import Pagination from '@material-ui/lab/Pagination';
import Constants from '../../helpers/constants';

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
    color: constants.color.grayMedium,
    "&:hover": {
      color: constants.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: constants.color.dark,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
  },
  paginationContainer: {
    "& > *": {
      marginTop: 15,
      marginBottom: 35,
    },
    display: "flex",
    justifyContent: "space-between",
  },
  pagination: {
    padding: 5,
    backgroundColor: constants.color.white,
    borderRadius: 10,
    "& .Mui-selected": {
      backgroundColor: constants.color.primaryUltaSoft,
    },
    "& .MuiPaginationItem-root": {
      color: constants.color.primaryHard,
    }
  }
});
const Financial = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const tableTitle = [
    {
      title: "Divisi",
      dataIndex: "divisi",
      key: "divisi",
      width: "15%",
      align: "center",
    },
    { title: "Category", dataIndex: "category", key: "category", width: "15%" },
    {
      title: "No. SL",
      dataIndex: "numberSl",
      key: "numberSl",
      width: "25%",
      align: "center",
    },
    {
      title: "Budget Awal",
      dataIndex: "budgetAwal",
      key: "budgetAwalKey",
      width: "15%",
      align: "center",
    },
    {
      title: "Budget Sisa",
      dataIndex: "budgetSisa",
      key: "budgetSisaKey",
      width: "15%",
      align: "center",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentageKey",
      width: "10%",
      align: "center",
    },
  ];

  const dispatch = useDispatch();
  const financial = useSelector((state) => state.financial);
  const financialTable = useSelector((state) => state.financialTable);

  const [tabValue, setTabValue] = useState(0);
  const [dataOpex, setDataOpex] = useState({});
  const [dataCapex, setDataCapex] = useState({});
  const [dataNpb, setDataNpb] = useState({});
  const [currentTabMapsRate, setCurrentTabMapsRate] = useState(0);
  const [budgetOpexCapex, setBudgetOpexCapex] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);

  // handle pivot expanded
  const handlePivot = () => {
    let items = document.querySelectorAll('.ant-table-row-expand-icon-expanded');
    items.forEach(item => item.click());
  };

  const handleChange = (event, newTabValue) => {
    event.preventDefault();
    handlePivot();
    // setBudgetOpexCapex([]);
    // setLoading(true);
    setTabValue(newTabValue);
    // newTabValue === 0
    //   ? dispatch.financialTable.detailBudgetOpex()
    //   : dispatch.financialTable.detailBudgetCapex();
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function handleTabBudgetInformation(newValue) {
    // setDataOpex({});
    // setDataCapex({});
    // setDataNpb({});
    handlePivot();
    setCurrentTabMapsRate(newValue);
    // newValue === 0
    //   ? dispatch.financial.budgetSummaryInfoByMP()
    //   : dispatch.financial.budgetSummaryInfoByNPB();
  }

  useEffect(() => {
    if(currentTabMapsRate===0) {
      dispatch.financial.budgetSummaryInfoByMP();
    } else {
      dispatch.financial.budgetSummaryInfoByNPB();
    }
  }, [currentTabMapsRate]);

  useEffect(() => {
    if(tabValue===0) {
      dispatch.financialTable.detailBudgetOpex();
    } else {
      dispatch.financialTable.detailBudgetCapex();
    }
  }, [tabValue]);

  useEffect(() => {
    setLoadingChart(true);
    let responseDataFinancial = financial.data;
    if (responseDataFinancial.opex !== undefined) {
      setDataOpex({
        title: "OPEX",
        listData: [
          {
            type: "Budget Terpakai",
            value: responseDataFinancial.opex.budgetUsed,
          },
          {
            type: "Sisa Budget",
            value: responseDataFinancial.opex.totalAmountEndingBudget,
          },
          {
            type: "Total Budget",
            value: responseDataFinancial.opex.totalAmountBudget,
          },
        ],
        colors: [
          constants.color.primaryHard,
          constants.color.secondaryMedium,
          constants.color.white,
        ],
        npb: responseDataFinancial.opex.npb,
        invoice: responseDataFinancial.opex.invoice,
        paidInvoice: responseDataFinancial.opex.invoiceTerbayar,
        type: currentTabMapsRate
      });
      setDataCapex({
        title: "CAPEX",
        listData: [
          {
            type: "Budget Terpakai",
            value: responseDataFinancial.capex.budgetUsed,
          },
          {
            type: "Sisa Budget",
            value: responseDataFinancial.capex.totalAmountEndingBudget,
          },
          {
            type: "Total Budget",
            value: responseDataFinancial.capex.totalAmountBudget,
          },
        ],
        colors: [
          constants.color.primaryHard,
          constants.color.secondaryMedium,
          constants.color.white,
        ],
        npb: responseDataFinancial.capex.npb,
        invoice: responseDataFinancial.capex.invoice,
        paidInvoice: responseDataFinancial.capex.invoiceTerbayar,
        type: currentTabMapsRate
      });
      setDataNpb({
        invoice: responseDataFinancial.invoice,
        payment: responseDataFinancial.pembayaran,
      });
      setLoadingChart(false);
    }
  }, [financial]);

  const handleDivision = (dataBudget) => {
    let divArr = dataBudget.map(data => data.division);
    let divArrSet = new Set(divArr);
    let newDivArr = [...divArrSet].sort();
    let newBudgetData = [];
    for(let i=0; i<newDivArr.length; i++) {
      let div = {};
      let arr = [];
      for(let j=0; j<dataBudget.length; j++) {
        if(newDivArr[i]===dataBudget[j].division) {
          arr.push(dataBudget[j]);
        }
      }
      div = {
        division: newDivArr[i],
        list: arr
      };
      newBudgetData.push(div);
    }
    return newBudgetData;
  };

  useEffect(() => {
    setLoading(true);
    let responseDataFinancialTable = financialTable.data;
    if (responseDataFinancialTable.detailTransaction !== undefined) {
      const dataBudgetOpexCapex = responseDataFinancialTable.detailTransaction;
      if (dataBudgetOpexCapex !== undefined && dataBudgetOpexCapex !== null) {
        let dataOpexCapexStore = [];
        let newBudgetDataMPNPB;
        if(currentTabMapsRate===0) {
          newBudgetDataMPNPB = dataBudgetOpexCapex.filter(item => item.mpId !== '0');
        } else {
          newBudgetDataMPNPB = dataBudgetOpexCapex.filter(item => item.mpId === '0');
        }
        let newBudgetDataOpexCapex = handleDivision(newBudgetDataMPNPB);
        newBudgetDataOpexCapex.map((data, idx1) => {
          let divisiOpexCapexStore = {};
          let categoryOpexCapexStore = [];
          let totalBudgetAwalOpexCapex = 0;
          if(data.list!==undefined) {
            data.list.map((item, idx2) => {
              totalBudgetAwalOpexCapex += item.beginningBalance;
              categoryOpexCapexStore.push({
                key: `${1 + idx1}${1 + idx2}`,
                category: item.category==='' ? '-' : item.category,
                numberSl: item.slCode,
                budgetAwal: item.beginningBalance ? useRupiahConverter(item.beginningBalance) : '-',
                budgetSisa: item.endingBalance ? useRupiahConverter(item.endingBalance) : '-',
                percentage: item.beginningBalance || item.endingBalance ? usePercentage(item.endingBalance, item.beginningBalance) : '-',
              });
              divisiOpexCapexStore = {
                key: 1 + idx1,
                divisi: data.division,
                budgetAwal: useRupiahConverter(totalBudgetAwalOpexCapex),
                children: categoryOpexCapexStore,
              };
            });
          }
          dataOpexCapexStore.push(divisiOpexCapexStore);
        });
        setBudgetOpexCapex(dataOpexCapexStore);
      }
      setLoading(false);
    }
  }, [financialTable, currentTabMapsRate]);

  // pagination
  const totalRows = budgetOpexCapex?.length || 0
  const rowsPerPage = 10
  const totalPages = Math.ceil(totalRows/rowsPerPage)

  return (
    <div className={classes.root}>
      <div className="contentTitle" style={{ marginBottom: "28px" }}>
        {t("financial")}
      </div>
      <SummaryOpexApex
        dataChartOpex={dataOpex}
        dataChartApex={dataCapex}
        dataNpb={dataNpb}
        currentTabMapsRate={currentTabMapsRate}
        handleChangeTab={handleTabBudgetInformation}
        isLoading={loadingChart}
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
      {tabValue === 0 ? (
        <TableSummary
          titleSum={t("transaction.detail")}
          data={budgetOpexCapex}
          columnData={tableTitle}
          imgIcon={<TitleRateIcon />}
          grandTotal={null}
          container='finBudgetCadangan'
          isLoading={loading}
        />
      ) : (
          <TableSummary
            titleSum={t("transaction.detail")}
            data={budgetOpexCapex}
            columnData={tableTitle}
            imgIcon={<TitleRateIcon />}
            grandTotal={null}
            container='finBudgetCadangan'
            isLoading={loading}
          />
        )}
      <div className={classes.paginationContainer}>
        <Typography style={{ fontSize: 15, color: Constants.color.grayMedium }}>
          Showing {((currentPage - 1) * rowsPerPage) + 1} - {(((currentPage - 1) * rowsPerPage) + 10) <= totalRows ? (((currentPage - 1) * rowsPerPage) + 10) : totalRows} of {totalRows}
        </Typography>
        <Pagination
          page={currentPage}
          count={totalPages}
          onChange={(e, page) => setCurrentPage(page)}
          className={classes.pagination}
        />
      </div>
    </div>
  );
};

export default Financial;
