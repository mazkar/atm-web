import React, { useEffect, useState } from "react";
import { ReactComponent as PlusWhite } from "../../../assets/icons/siab/plus-white.svg";
import { useHistory } from "react-router-dom";

import SummaryOpexApex from "../../../components/Financial/SummaryOpexApex";
import constants from "../../../helpers/constants";
import { Row, InputNumber, Input } from "antd";
import { Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import CloseIcon from '@material-ui/icons/Close';
import { ChkyButtons } from "../../../components/chky";
// import DynamicTablePagination from '../../components/DynamicTablePagination';
import { ChkyTablePagination, ChkySearchBar } from "../../../components";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import ModalNPB from "./ModalNPB";
import {
  useDispatch,
  useSelector,
} from "../../../helpers/Utils/react-redux-hook";
import useRupiahConverter from "../../../helpers/useRupiahConverter";
import * as ThemeColor from "../../../assets/theme/colors";
import YearSelect from '../../../components/Selects/YearSelect';
import { array } from "prop-types";
import InfinityLoading from "../../../components/Loading/InfinityLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
  },
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: "2%",
    marginBottom: "2%",
    zIndex: 6,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: " #2b2f3c",
  },
  label: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "13px",
    color: "#2B2F3C",
  },
}));

const FinancialBudgetTracking = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const today = new Date();
  const year = today.getFullYear();

  const dispatch = useDispatch();
  const financial = useSelector((state) => state.financial);
  const budgetTrackingSearch = useSelector((state) => state.financialTable);

  const [isApply, setIsApply] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModalDetail, setShowModalDetail] = React.useState(false);
  const [dataOpex, setDataOpex] = useState({});
  const [dataCapex, setDataCapex] = useState({});
  const [dataNpb, setDataNpb] = useState({});
  const [currentTabMapsRate, setCurrentTabMapsRate] = useState(0);
  const [listBudgetTracking, setListBudgetTracking] = useState([]);
  const [filterInput, setFilterInput] = useState({
    slCode: "",
    slDesc: "",
    slPic: "",
  });
  const [budgetYear, setBudgetYear] = useState(year);
  const [sendDataToModal, setSendDataToModal] = useState({
    npbCode: "",
    endingBudget: "",
  });
  const [requestBodySearch, setRequestBodySearch] = useState({
    numberSl: "",
    deskripsiSl: "",
    picSl: "",
    tahunBudget: "",
  });
  const [isLoadData, setIsLoadData] = useState(true);
  const [suggestionSL, setSuggestionSL] = useState([]);
  const [capexDesc, setCapexDesc] = useState([]);
  const [fullYearBudget, setFullYearBudget] = useState([]);
  const [availableBudget, setAvailableBudget] = useState([]);
  const [typeGl, setTypeGl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [npbCode, setNpbCode] = useState('');
  const [rcCode, setRcCode] = useState([]);
  const [division, setDivision] = useState([]);
  const [loadingChart, setLoadingChart] = useState(true);

  const titleTable = [
    "SL No",
    "SL Description",
    "Category SL",
    "PIC SL",
    "Beginning Balance",
    "Ending Balance",
    "Terpakai",
    "Action",
  ];
  const valueType = [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "actionfunc",
  ];
  const isSort = [false, false, false, false, false, false, false];

  const handleChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setFilterInput({ ...filterInput, [name]: value });
  };

  const handleChangeYear = (value) => {
    setBudgetYear(value);
  };

  const handleApplySearchBudget = () => {
    setIsApply(1);
    setIsLoadData(true);
    setRequestBodySearch({
      numberSl: filterInput.slCode,
      deskripsiSl: filterInput.slDesc,
      picSl: filterInput.slPic,
      tahunBudget: budgetYear,
    });
  };
  const handleResetSearchBudget = () => {
    setIsApply(0);
    setIsLoadData(true);
    setFilterInput({
      slCode: null,
      slDesc: null,
      slPic: null,
    });
    setBudgetYear(year);
    setRequestBodySearch({
      numberSl: null,
      deskripsiSl: null,
      picSl: null,
      tahunBudget: null,
    });
  };

  const handleTabBudgetInformation = (newValue) => {
    setCurrentTabMapsRate(newValue);
  };

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
  }

  function handleKeyword(newValue) {
    dispatch.financialTable.searchBudgetTracking({
      numberSl: "",
      deskripsiSl: newValue,
      picSl: "",
      tahunBudget: "",
    });
  }

  const actionCreateNPB = () => {
    dispatch.financial.generateNPBCode();
    setShowModalDetail(true);
  };

  useEffect(() => {
    setLoadingChart(true);
    if(currentTabMapsRate===0) {
      dispatch.financial.budgetSummaryInfoByMP();
    } else {
      dispatch.financial.budgetSummaryInfoByNPB();
    }
  }, [currentTabMapsRate]);

  useEffect(() => {
    dispatch.financialTable.searchBudgetTracking(requestBodySearch);
  }, [requestBodySearch]);

  useEffect(() => {
    let responseDataFinancial = financial.data;
    if (responseDataFinancial.opex !== undefined) {
      setDataOpex({
        title: "OPEX",
        listData: [
          {
            type: "Total Amount Budget",
            value: responseDataFinancial.opex.totalAmountBudget,
          },
          {
            type: "Total Amount Ending Budget",
            value: responseDataFinancial.opex.totalAmountEndingBudget,
          },
        ],
        colors: [
          constants.color.primaryHard,
          constants.color.secondaryMedium,
          constants.color.grayMedium,
        ],
        npb: responseDataFinancial.opex.npb,
        invoice: responseDataFinancial.opex.invoice,
        paidInvoice: responseDataFinancial.opex.invoiceTerbayar,
      });
      setDataCapex({
        title: "CAPEX",
        listData: [
          {
            type: "Total Amount Budget",
            value: responseDataFinancial.capex.totalAmountBudget,
          },
          {
            type: "Total Amount Ending Budget",
            value: responseDataFinancial.capex.totalAmountEndingBudget,
          },
        ],
        colors: [
          constants.color.primaryHard,
          constants.color.secondaryMedium,
          constants.color.grayMedium,
        ],
        npb: responseDataFinancial.capex.npb,
        invoice: responseDataFinancial.capex.invoice,
        paidInvoice: responseDataFinancial.capex.invoiceTerbayar,
      });
      setDataNpb({
        invoice: responseDataFinancial.invoice,
        payment: responseDataFinancial.pembayaran,
      });
      setLoadingChart(false);
    }
  }, [financial]);

  useEffect(() => {
    let response = financial.data;
    if (response.npbCode !== undefined) {
      setNpbCode(response.npbCode);
      dispatch.financial.listBudgetNpb();
      // dispatch.financial.listBudgetBesaran();
      setSendDataToModal({
        npbCode: response.npbCode,
        endingBudget: response.totalAmountEndingBudget,
      });
    }
  }, [financial]);

  useEffect(() => {
    let response = financial.data;
    if (response && response.length > 0) {
      let storeSL = [];
      let storeDesc = [];
      let storeBudget = [];
      let storeAB = [];
      let storeType = [];
      let storeCode = [];
      let storeDiv = [];
      response.map((item, index) => {
        let desc = item.slDescription;
        let yearBudget = item.budgetLastYear;
        let endingBalance = item.endingBalance;
        let type = item.typeGL;
        let code = item.rcCode;
        let div = item.division;
        storeDesc.push(desc);
        storeBudget.push(yearBudget);
        storeAB.push(endingBalance);
        storeType.push(type);
        storeCode.push(code);
        storeDiv.push(div);
        storeSL.push({
          id: index + 1,
          value: item.slCode,
          nameId: item.slCode,
          budgetId: item.budgetId,
        });
      });
      setSuggestionSL(storeSL);
      setCapexDesc(storeDesc);
      setFullYearBudget(storeBudget);
      setAvailableBudget(storeAB);
      setTypeGl(storeType);
      setRcCode(storeCode);
      setDivision(storeDiv);
    }
  }, [financial]);

  useEffect(() => {
    let response = budgetTrackingSearch.data;
    if (response.budgetTrackingV2 !== undefined) {
      let store = [];
      let data = {};
      let sortFirst = [];
      for(let i=0; i<response.budgetTrackingV2.length; i++) {
        let mainArr = response.budgetTrackingV2[i];
        let secondArr = mainArr.budgetTrackingDetails.sort((a,b) => {
          let newA = new Date(`${a.npb.tanggalSubmitNpb.slice(0,10)}T${a.npb.tanggalSubmitNpb.slice(11,19)}Z`);
          let newB = new Date(`${b.npb.tanggalSubmitNpb.slice(0,10)}T${b.npb.tanggalSubmitNpb.slice(11,19)}Z`);
          return newB - newA;
        });
        mainArr.budgetTrackingDetails = secondArr;
        sortFirst.push(mainArr);
      }
      let sortSecond = sortFirst.sort((a,b) => {
        let tempA = a.budgetTrackingDetails[0].npb.tanggalSubmitNpb;
        let tempB = b.budgetTrackingDetails[0].npb.tanggalSubmitNpb;
        let newA = new Date(`${tempA.slice(0,10)}T${tempA.slice(11,19)}Z`);
        let newB = new Date(`${tempB.slice(0,10)}T${tempB.slice(11,19)}Z`);
        return newB - newA;
      });

      sortSecond.map((item, index) => {
        let countUsage = (
          (item.balance.usage / item.balance.beginning) *
          100
        ).toFixed(2);
        let percentage =
          item.balance.beginning === 0 ? (0 * 100).toFixed(2) : countUsage;
        data = {
          slNumber: item.sl.numberSl,
          slDescription: <div style={{width:'400px', textAlign:'left'}}>{item.sl.slInfo}</div>,
          category: item.sl.categorySl,
          picSl: item.sl.picSl,
          startBalance: useRupiahConverter(item.balance.beginning),
          EndBalance: useRupiahConverter(item.balance.ending),
          usage: `${percentage}%`,
          action: {
            dataAction: [
              {
                name: "Detail",
                funct: details,
                data: item.budgetTrackingDetails,
              },
            ],
          },
        };
        store.push(data);
      });
      setListBudgetTracking(store);
      setIsLoadData(false);
      setLoading(false);
    }
  }, [budgetTrackingSearch]);

  function details(data) {
    history.push({
      pathname: "/financial-BudgetTracking/details",
      state: {
        data: data,
      },
    });
  }

  // year for select
  let years = [];
  for(let i=year-10; i<=year+1; i++) {
    years.push(i);
  }

  return (
    <div className={classes.root}>
      <Row
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className={classes.title}>Budget Tracking</div>
        <Grid item>
          <ChkySearchBar
            placeholder="Pencarian berdasarkan deskripsi..."
            onKeywordChange={handleKeyword}
            width={290}
          />
        </Grid>
      </Row>
      <div style={{ width: "100%", textAlign: "end" }}>
        <MuiIconLabelButton
          style={{ marginBottom: 20, width: 150, marginTop: 26 }}
          label="Create NPB"
          iconPosition="startIcon"
          onClick={actionCreateNPB}
          buttonIcon={<PlusWhite />}
        />
      </div>
      <SummaryOpexApex
        dataChartOpex={dataOpex}
        dataChartApex={dataCapex}
        dataNpb={dataNpb}
        currentTabMapsRate={currentTabMapsRate}
        handleChangeTab={handleTabBudgetInformation}
        isLoading={loadingChart}
      />
      <Paper elevation={3} className={classes.filterSection}>
        <Typography
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#2B2F3C",
            fontFamily: "Barlow",
          }}
        >
          Filter Berdasarkan :
        </Typography>
        <Grid container spacing={1} style={{ marginTop: 10 }}>
          <Grid item xs={12} sm={12}>
            <Grid
              item
              container
              spacing={1}
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={2} sm={2}>
                <Typography className={classes.label}>SL Code</Typography>
                <Input
                  style={{ borderRadius: 6, width: "100%", height: 40 }}
                  placeholder="input SL Code"
                  name="slCode"
                  value={filterInput.slCode}
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item xs={isApply===1 ? 3 : 4} sm={isApply===1 ? 3 : 4}>
                <Typography className={classes.label}>Deskripsi SL</Typography>
                <Input
                  style={{ borderRadius: 6, width: "100%", height: 40 }}
                  placeholder="input Deskripsi SL"
                  name="slDesc"
                  value={filterInput.slDesc}
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item xs={2} sm={2}>
                <Typography className={classes.label}>PIC SL</Typography>
                <Input
                  style={{ borderRadius: 6, width: "100%", height: 40 }}
                  placeholder="username"
                  name="slPic"
                  value={filterInput.slPic}
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item xs={2} sm={2}>
                <Typography className={classes.label}>Tahun Budget</Typography>
                <YearSelect
                  style={{width: '100%'}}
                  years={years}
                  value={budgetYear}
                  onChange={handleChangeYear}
                />
              </Grid>
              {
                isApply === 1 &&
                <Grid item xs={1} sm={1} style={{ marginTop: "19px" }}>
                  <ChkyButtons
                    startIcon={<CloseIcon />}
                    buttonType="redOutlined"
                    onClick={handleResetSearchBudget}
                    height={40}
                    style={{ textTransform: 'capitalize' }}>
                    Reset
                  </ChkyButtons>
                </Grid>
              }
              <Grid item xs={1} sm={1} style={{ margin: `19px 0 0 ${isApply===1 ? '20px' : '0'}` }}>
                <ChkyButtons
                  onClick={handleApplySearchBudget}
                  height={40}
                  style={{ textTransform: "capitalize" }}
                >
                  Apply
                </ChkyButtons>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <div item className={classes.tableContent}>
        {/* <DynamicTablePagination data={dataTable} fields={titleTable} cellOption={valueType} changePage={handleChangePageValue}/> */}
        <ChkyTablePagination
          data={listBudgetTracking}
          fields={titleTable}
          cellOption={valueType}
          totalPages={listBudgetTracking ? Math.ceil(listBudgetTracking?.length/10) : 1}
          rowsPerPage={10}
          totalRows={listBudgetTracking?.length}
          changePage={handleChangePageValue}
          isLoadData={isLoadData}
        />
      </div>

      {/* <FloatingChat /> */}
      <ModalNPB
        isOpen={showModalDetail}
        setShowModalDetail={setShowModalDetail}
        onEdit={() => setShowModalDetail(false)}
        onComplete={() => setShowModalDetail(false)}
        sendData={sendDataToModal}
        tableData={requestBodySearch}
        suggestion={suggestionSL}
        capexDescription={capexDesc}
        fullYearBudget={fullYearBudget}
        availableBudget={availableBudget}
        typeGl={typeGl}
        setLoading={setLoading}
        npbCode={npbCode}
        rcCode={rcCode}
        division={division}
      />
      {loading ? <InfinityLoading /> : null}
    </div>
  );
};

export default FinancialBudgetTracking;
