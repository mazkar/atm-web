/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "antd";
import Avatar from "@material-ui/core/Avatar";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Filter from "./TransactionFilter";
import { ReactComponent as UploadCloud } from "../../assets/icons/siab/upload-cloud.svg";
import MuiIconLabelButton from "../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../components/GeneralComponent/FloatingChat";
import ModalUpload from "./uploadModal";
import LongCardSummary from "../../components/Card/CardDashTransaction";
import Exchange from "../../assets/images/exchange-alt.png";
import ExchangeSmall from "../../assets/images/exchange-alt-small.png";
import Calculator from "../../assets/images/calculator.png";
import Grab from "../../assets/images/grab.png";
import Rekpon from "../../assets/images/rekpon.png";
import OtherBankCard from "../../assets/images/other-bank.png";
import Tunai from "../../assets/images/cash.png";
import NonTunai from "../../assets/images/non-cash.png";
import CreditCard from "../../assets/images/credit-card-blank.png";
import HighestTrx from "../../assets/images/trx-up.png";
import LowestTrx from "../../assets/images/trx-down.png";
import HighestRev from "../../assets/images/rev-up.png";
import FailedTrx from "../../assets/images/trx-failed.png";
import TopTenContent from "./topTenContainer";
import * as Colors from "../../assets/theme/colors";
import ModalLoader from "../../components/ModalLoader";
import { ChkyTabsAsOption } from "../../components";
import { ReactComponent as TitleRateIcon } from "../../assets/icons/general/transaction_rate_overview.svg";
import { DualAxisChart } from "../../components/chky";
import Donate from "../../assets/images/donate.png";
import SearchAtmIdBar from "../../components/SearchAtmIdBar";
import ConvertUang from "../../helpers/Utils/convertUang";
import LoadingView from "../../components/Loading/LoadingView";
import useThousandSeparator from "../../helpers/useThousandSeparator";
import { ReactComponent as DropDownIcon } from "../../assets/icons/general/dropdown_red.svg";
import { BootstrapInput } from './TransactionFilter';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import qs from 'qs'
import SearchBarAutoComplete from "../../components/SearchBarAutoComplete";

const useStyles = makeStyles(() => ({
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: "2%",
    marginBottom: "2%",
    zIndex: 6,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  cardHeader: {
    padding: "5px",
  },
  avatar: {
    backgroundColor: Colors.PrimarySoft,
    padding: "8px 8px 8px 8px",
    width: "30px",
    height: "30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
    textShadow: "0px 6px 10px rgba(0, 0, 0, 0.08)",
  },
  shortCard: {
    border: "1px solid #BCC8E7",
    borderRadius: 12,
  },
  paperWrapper: {
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px",
  },
  col: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  caption: { fontSize: 13 },
  select: {
    padding: 10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
}));

const numberWithCommas = (x) => {
  if (x === null) {
    return 0;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const dataTop10s = null;

const monthsInd = [
  "",
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

const getFullDate = (date) => {
  if (date !== "-") {
    const splitDate = date.split("-");
    return `${parseInt(splitDate[2])} ${monthsInd[splitDate[1] * 1]} ${
      splitDate[0]
    }`;
  }
  return "-";
};

const Transaction = () => {
  // ========================== Constructor ================================ //
  const classes = useStyles();
  const [openModalUpload, setOpenModalUpload] = React.useState(false);
  const handleOpenModalUpload = () => setOpenModalUpload(true);
  const handleCloseModalUpload = () => setOpenModalUpload(false);
  const [month, setMonth] = useState(1)
  useEffect(() => {
    console.log('~ month', month)
  }, [month])
  const handleUploadMaster = () => {
    handleOpenModalUpload();
  };
  const history = useHistory();

  // modalLoader
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isOpenModalLoaderNew, setModalLoaderNew] = useState(false);
  const [isOpenModalLoaderChart, setModalLoaderChart] = useState(false);
  const [isOpenModalLoaderTotal, setIsOpenModalLoaderTotal] = useState(false);
  const [
    isOpenModalLoaderTransaction,
    setIsOpenModalLoaderTransaction,
  ] = useState(false);
  const [isOpenModalLoaderTopTen, setIsOpenModalLoaderTopTen] = useState(false);

  const [dataFilter, setDataFilter] = useState({
    provinceId: "All",
    citiesId: "All",
    kecamatanId: "All",
  });

  // ============ FETCH DATA CHART TOTAL FREQ ============

  const [currentTabTrx, setCurrentTabTrx] = useState(0);

  const [dataTotalChart, setDataTotalChart] = useState([]); // <--- init dataTotalChart array

  const [dataTransaksionAtmCard, setDataTransaksionAtmCard] = useState(null); // <--- init dataTransaksionAtmCard array
  const [
    dataTransaksionJenisNasabah,
    setDataTransaksionJenisNasabah,
  ] = useState(null); // <--- init dataTransaksionJenisNasabah array

  const [dataTotal, setDataTotal] = useState(null);

  const [dataTopTen, setDataTopTen] = useState(null); // <--- init dataTopTen array

  const [lastDateUpdate, setLastDateUpdate] = useState("-");
  const [isLoadDate, setIsLoadDate] = useState(false);

  // ========================== Constructor ================================ //

  let frequently;
  if (currentTabTrx === 0) {
    frequently = "yearly";
  } else {
    frequently = "monthly";
  }

  const { provinceId, citiesId: cityId, kecamatanId: districtId } = dataFilter;

  // ========================== UseEffect   ================================ //
  useEffect(() => {
    getLastDateUpdate();
  }, []);

  useEffect(() => {
    if (lastDateUpdate != "-") {
      fetchDataTotalYearly();
      fetchDataTotal();
      fetchDataTransaksionJenisNasabah();
      fetchDataTransaksionAtmCard();
      fetchDataTopTen();
    }
  }, [dataFilter, currentTabTrx, month]);

  // ========================== UseEffect   ================================ //

  // ========================== Method      ================================ //

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
      try {
        const res = result.data.data;
        setLastDateUpdate(res.lastReportDate || "-");
        fetchDataTotal();
        fetchDataTopTen();
        fetchDataTransaksionJenisNasabah();
        fetchDataTransaksionAtmCard();
        fetchDataTotalYearly();
      } catch (error) {
        // alert(`Error getting Last Update \n ${error}`);
      }
      setIsLoadDate(false);
    } catch (err) {
      // alert(`Error getting Last Update \n${err}`);
      setIsLoadDate(false);
    }
  };

  const fetchDataTotalYearly = async () => {
    const dataToSet = [];
    setDataTotalChart([]);
    setModalLoaderChart(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const queryString = qs.stringify({
      provinceId,
      cityId,
      districtId,
      frequently,
      ...(currentTabTrx && {month})
    })
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/TransactionDashboard/freqRevenueChart?${queryString}`,
        config
      );
      // reconstruct data from DB
      if (currentTabTrx === 0) {
        try {
          const dataPreYearlyFreq = result.data.data.transactionFrequency;
          const dataPreYearlyRev = result.data.data.transactionRevenue;

          const merged = _(dataPreYearlyFreq)
            .concat(dataPreYearlyRev)
            .groupBy("year")
            .map(_.spread(_.merge))
            .value();
          merged.map((item, index) => {
            // console.log('<><> merged', merged);
            let trendValRev = 'same';
            let trendValFreq = 'same';
            if(index !== 0){
              const selisihRev = item.revenue-merged[index-1].revenue;
              const selisihFreq = item.frequency-merged[index-1].frequency;
              // console.log('<><> selisih', selisihRev);
              if(selisihRev > 0){
                trendValRev = "up";
              }else if(selisihRev < 0){
                trendValRev = "down";
              }

              if(selisihFreq > 0){
                trendValFreq = "up";
              }else if(selisihFreq < 0){
                trendValFreq = "down";
              }
            }
            const newRow = {
              time: item.year,
              revenue: item.revenue,
              frequency: item.frequency,
              trendRevenue: trendValRev,
              trendFrequency: trendValFreq,
            };
            dataToSet.push(newRow);
          });
        } catch (error) {
          setModalLoaderChart(false);
          alert(`Error Refactor Data Maps...! \n ${error}`);
        }
      } else {
        // reconstruct data from DB
        try {
          const dataPreYearlyFreq = result.data.data.transactionFrequency;
          const dataPreYearlyRev = result.data.data.transactionRevenue;
          const merged = _(dataPreYearlyFreq)
            .concat(dataPreYearlyRev)
            .groupBy("month")
            .map(_.spread(_.merge))
            .value();

          merged.map((item, index) => {
            let trendValRev = 'same';
            let trendValFreq = 'same';
            if(index !== 0){
              const selisihRev = item.revenue-merged[index-1].revenue;
              const selisihFreq = item.frequency-merged[index-1].frequency;
              // console.log('<><> selisih', selisihRev);
              if(selisihRev > 0){
                trendValRev = "up";
              }else if(selisihRev < 0){
                trendValRev = "down";
              }

              if(selisihFreq > 0){
                trendValFreq = "up";
              }else if(selisihFreq < 0){
                trendValFreq = "down";
              }
            }
            const newRow = {
              time: item.month,
              revenue: item.revenue,
              frequency: item.frequency,
              trendRevenue: trendValRev,
              trendFrequency: trendValFreq,
            };
            dataToSet.push(newRow);
          });
        } catch (error) {
          setModalLoaderChart(false);
          alert(`Error Refactor Data Maps...! \n ${error}`);
        }
      }
      setModalLoaderChart(true);
      setDataTotalChart(dataToSet);
      setModalLoaderChart(false);
    } catch (err) {
      alert(`Error Fetching Data Maps...! \n${err}`);
      setModalLoaderChart(false);
    }
  };

  const fetchDataTopTen = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const queryString = qs.stringify({
      id: cityId,
      provinceId,
      districtId,
      frequently,
      ...(currentTabTrx&&{month})
    })
    try {
      setDataTopTen(null);
      setIsOpenModalLoaderTopTen(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/transaction/topTenTransactions?${queryString}`,
        config
      );
      // reconstruct data from DB to dataMaps
      try {
        const dataPre = result.data.data;
        setDataTopTen(dataPre);
      } catch (error) {
        alert(`Error Refactor Data TopTen...! \n ${error}`);
      }
      setIsOpenModalLoaderTopTen(false);
    } catch (err) {
      alert(`Error Fetching Data TopTen...! \n${err}`);
      setIsOpenModalLoaderTopTen(false);
    }
  };

  const fetchDataTotal = async () => {
    setDataTotal(null)
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const queryString = qs.stringify({
      cityId,
      provinceId,
      districtId,
      frequently,
      ...(currentTabTrx&&{month})
    })
    try {
      setIsOpenModalLoaderTotal(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/transaction/getTransaksionRevenue?${queryString}`,
        config
      );
      // reconstruct data from DB to dataMaps
      try {
        const dataPre = result.data.data;
        const transaksi = currentTabTrx === 0
          ? numberWithCommas(dataPre.transaksi[0].total)
          : numberWithCommas(
            dataPre.transaksiMonthly[0].total
          )
        const revenue = currentTabTrx === 0
          ? ConvertUang(dataPre.revenue[0].total)
          : ConvertUang(dataPre.revenueMonthly[0].total)
        setDataTotal({transaksi, revenue});
      } catch (error) {
        setIsOpenModalLoaderTotal(false);
        alert(`Error Refactor DataaTotal...! \n ${error}`);
      }
      setIsOpenModalLoaderTotal(false);
    } catch (err) {
      alert(`Error Fetching DataaTotal...! \n${err}`);
      setIsOpenModalLoaderTotal(false);
    }
  };

  const fetchDataTransaksionJenisNasabah = async () => {
    setDataTransaksionJenisNasabah(null)
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const queryString = qs.stringify({
      cityId,
      provinceId,
      districtId,
      frequently,
      ...(currentTabTrx&&{month})
    })
    try {
      setIsOpenModalLoaderTransaction(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/transaction/getTransaksionCustomer?${queryString}`,
        config
      );
      // reconstruct data from DB to dataMaps
      try {
        const dataPre = result.data.data;
        const dataByType = currentTabTrx ? dataPre.transactionCustomerTypeMonthy[0] : dataPre.transactionCustomerTypeYearly[0]
        const dataBeforeByType = currentTabTrx ? dataPre.transactionCustomerTypeMonthyBefore[0] : dataPre.transactionCustomerTypeYearlyBefore[0]
        setDataTransaksionJenisNasabah({dataByType, dataBeforeByType});
      } catch (error) {
        setIsOpenModalLoaderTransaction(false);
        alert(`Error Refactor Data TransaksionJenisNasabah...! \n ${error}`);
      }
      setIsOpenModalLoaderTransaction(false);
    } catch (err) {
      alert(`Error Fetching Data TransaksionJenisNasabah...! \n${err}`);
      setIsOpenModalLoaderTransaction(false);
    }
  };

  const fetchDataTransaksionAtmCard = async () => {
    setDataTransaksionAtmCard(null)
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const queryString = qs.stringify({
      cityId,
      provinceId,
      districtId,
      frequently,
      ...(currentTabTrx&&{month})
    })
    try {
      setModalLoader(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/transaction/getTransaksionAtm?${queryString}`,
        config
      );
      // reconstruct data from DB to dataMaps
      try {
        const dataPre = result.data.data;
        const dataByType = currentTabTrx ? dataPre.atmCardMonthly[0] : dataPre.atmCardYearly[0]
        const dataBeforeByType = currentTabTrx ? dataPre.atmCardMonthlyBefore[0] : dataPre.atmCardYearlyBefore[0]
        setDataTransaksionAtmCard({dataByType, dataBeforeByType});
      } catch (error) {
        setModalLoader(false);
        alert(`Error Refactor Data TransaksionAtmCard...! \n ${error}`);
      }
      setModalLoader(false);
    } catch (err) {
      alert(`Error Fetching Data TransaksionAtmCard...! \n${err}`);
      setModalLoader(false);
    }
  };

  // ========================== Method      ================================ //

  // ========================== Handle Button=============================== //

  function handleSubmitFilter(filterNewValue) {
    // console.log("handle submit filter");
    if (filterNewValue === null || filterNewValue === undefined) {
      setDataFilter({
        provinceId: "All",
        citiesId: "All",
        kecamatanId: "All",
      });
    } else {
      setDataFilter(filterNewValue);
    }
  }

  function handleChangeTabTrx(newValue) {
    // console.log(`handle change tab trx : ${newValue}`);
    setCurrentTabTrx(newValue);
  }

  function handleChangeMonth(e){
    setMonth(e.target.value)
  }

  function handleKeyword(newValue) {
    // history.push(`/trend-analisa/detail/${newValue}`);
    // console.log("handle keywoard search", newValue);
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
        atmId: newValue,
      },
      config
    )
      .then((res) => {
        setModalLoaderNew(false);
        if (res.data.statusCode == 200) {
          const dataInfo = res.data.data.infoAtm[0];
          localStorage.setItem("infoAtmDetail", JSON.stringify(dataInfo));
          history.push(`/trend-analisa/detail/${newValue}`);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        setModalLoaderNew(false);
        alert("atm ID not found");
      });
  }

  // ========================== Handle Button=============================== //

  // ========================== Render Helper=============================== //

  function renderViewTrxNasabah(tab, title, data) {
    let count = 0, previous;
    if (data) {
      const {dataByType, dataBeforeByType} = data
      switch (title) {
        case "Regular":
          count = dataByType.casaTransaction;
          previous = dataBeforeByType.casaTransaction;
          break;
        case "Grab":
          count = dataByType.grabTransaction;
          previous = dataBeforeByType.grabTransaction;
          break;
        case "Rekpon":
          count = dataByType.rekponTransaction;
          previous = dataBeforeByType.rekponTransaction;
          break;
        case "Kartu Bank Lain":
          count = dataByType.ofUsTranssaction;
          previous = dataBeforeByType.ofUsTranssaction;
          break;
        default:
          count = 0;
          break;
        }
    }
    return { title: `${title} (Qty)`, count, previous};
  }

  function renderViewTrxOnAtm(tab, cardOrCardless, title, data) {
    let count = 0, previous;
    if (data) {
      const {dataByType, dataBeforeByType} = data
      if (cardOrCardless === "card") {
        switch (title) {
          case "Tunai":
            count = dataByType.debitCard;
            previous = dataBeforeByType.debitCard;
            break;
          case "Non Tunai":
            count = dataByType.creditCard;
            previous = dataBeforeByType.creditCard;
            break;
          default:
            count = 0;
            break;
        }
      }

      if (cardOrCardless === "cardless") {
        switch (title) {
          case "Tunai":
            count = dataByType.cardless;
            previous = dataBeforeByType.cardless;
            break;
          case "Non Tunai":
            count = dataByType.cashlessCardless;
            previous = dataBeforeByType.cashlessCardless;
            break;
          default:
            count = 0;
            break;
        }
      }
    }
    return { title: `${title} (Qty)`, count, previous};
  }

  function reformatDataTopTen(data, currency) {
    const dataToSet = [];
    function formatStatus(status) {
      switch (status) {
      case "down":
        return 2;
      case "up":
        return 1;
      default:
        return 0;
      }
    }

    data.map((item) => {
      const newRow = {
        id: item.atmId,
        locationName: item.locationName,
        amount:
          currency === "Rp"
            ? `${currency} ${useThousandSeparator(item.currentValue)}`
            : numberWithCommas(item.currentValue),
        status: `${formatStatus(item.ladder)}`,
      };
      dataToSet.push(newRow);
    });
    return dataToSet;
  }

  function renderViewTopTen(tab, category, data) {
    if (data !== null) {
      // Yearly
      if (tab === 0) {
        // eslint-disable-next-line default-case
        switch (category) {
        case "transaksiTertinggi":
          return reformatDataTopTen(data.topTenHighestTransactionsYearly, "");
        case "revenueTertinggi":
          return reformatDataTopTen(data.topTenHighestRevenueYearly, "Rp");
        case "transaksiTerendah":
          return reformatDataTopTen(data.topTenLowestTransactionsYearly, "");
        case "transaksiGagal":
          return reformatDataTopTen(data.topTenFailedHighestYearly, "");
        default:
          return dataTop10s;
        }
      }
      // Monthly
      if (tab === 1) {
        switch (category) {
        case "transaksiTertinggi":
          return reformatDataTopTen(
            data.topTenHighestTransactionsMonthly,
            ""
          );
        case "revenueTertinggi":
          return reformatDataTopTen(data.topTenHighestRevenueMonthly, "Rp");
        case "transaksiTerendah":
          return reformatDataTopTen(data.topTenLowestTransactionsMonthly, "");
        case "transaksiGagal":
          return reformatDataTopTen(data.topTenFailedHighestMonthly, "");
        default:
          return dataTop10s;
        }
      } else {
        return dataTop10s;
      }
    } else {
      return dataTop10s;
    }
  }

  // ========================== Render Helper=============================== //

  return (
    <div className="content_container" style={{ background: "#F4F7FB" }}>
      <Row
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className={classes.title}>Transaction</div>
        <Grid item xs={4}>
          {/* <SearchAtmIdBar
            placeholder="ATM ID"
            onSubmit={handleKeyword}
            width={290}
          /> */}
          <SearchBarAutoComplete 
            onSubmit={handleKeyword}/>
        </Grid>
      </Row>
      <Row
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Grid item style={{ marginLeft: 5 }}>
          {isLoadDate ? (
            <LoadingView maxheight="100%" isTransparent />
          ) : (
            <Typography
              style={{
                fontSize: "13px",
                fontWeight: 400,
                fontFamily: "Barlow",
                color: "#8D98B4",
              }}
            >
              Last update : {getFullDate(lastDateUpdate)}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            style={{ width: 250 }}
            label="Upload Master Transaction"
            iconPosition="startIcon"
            onClick={handleUploadMaster}
            buttonIcon={<UploadCloud />}
          />
        </Grid>
      </Row>
      <div style={{ padding: "10px 5px 10px 5px", marginTop: 15 }}>
        <div style={{ marginBottom: 20 }}>
          <Filter
            onFilterSubmit={handleSubmitFilter}
            // handleCounterReset={handleFilterCounter}
          />
        </div>
        <Grid item xs={12} style={{ marginBottom: "1%" }}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              {/* <TotalTransactionChart data={totalTransactionData} /> */}
              <Paper style={{ padding: 20 }} className={classes.paperWrapper}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item style={{ display: "flex" }}>
                        <TitleRateIcon />
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                          Total Freq Transaction & Amount Revenue
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <ChkyTabsAsOption
                      currentTab={currentTabTrx}
                      dataTab={["Yearly", "Monthly"]}
                      handleChangeTab={handleChangeTabTrx}
                      // resetCounter={resetTabCounter}
                      minWidth={100}
                    />
                  </Grid>
                  <Grid item>
                    {
                      currentTabTrx == 1 &&
                      <div className={classes.col}>
                        <div>
                          <Typography className={classes.caption}>
                            Bulan :{" "}
                          </Typography>
                        </div>
                        <div item style={{ position: "relative" }}>
                          <FormControl className={classes.select}>
                            <Select
                              value={month}
                              onChange={handleChangeMonth}
                              input={<BootstrapInput />}
                              IconComponent={DropDownIcon}
                            >
                              {monthsInd.filter((item,i)=>i>0).map((item, i) => {
                                return (
                                  <MenuItem key={i} value={i+1}>
                                    {item}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    }
                  </Grid>
                </Grid>
                {/* <ChkyChartOverview
                  data={dataTotalChart}
                  isLoadData={isOpenModalLoaderChart}
                /> */}
                <DualAxisChart
                  data={dataTotalChart}
                  isLoadData={isOpenModalLoaderChart}
                  isRevenueRp
                  istrend
                  // showLabelPoint
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Total All Transaction & Revenue */}
        <Row
          gutter={16}
          style={{
            marginBottom: "2%",
            marginTop: "2%",
            justifyContent: "space-between",
          }}
        >
          <Col className="gutter-row" span={12}>
            <Paper elevation={3} className={classes.filterSection}>
              {dataTotal !== null ? (
                <LongCardSummary
                  summaryOptions={
                    dataTotal.transaksi
                      ? {
                        title: "Total All Transaction (Qty)",
                        count: dataTotal.transaksi
                      }
                      : { title: "Total All Transaction", count: 0 }
                  }
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Exchange}
                  imgStyle={{ height: "40px", width: "40px" }}
                  currency=""
                  isLoadData={isOpenModalLoaderTotal}
                />
              ) : (
                <LongCardSummary
                  summaryOptions={{ title: "Total All Transaction", count: 0 }}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Exchange}
                  imgStyle={{ height: "40px", width: "40px" }}
                  currency=""
                  isLoadData={isOpenModalLoaderTotal}
                />
              )}
            </Paper>
          </Col>
          <Col className="gutter-row" span={12}>
            <Paper elevation={3} className={classes.filterSection}>
              {dataTotal !== null ? (
                <LongCardSummary
                  summaryOptions={
                    dataTotal.revenue
                      ? {
                        title: `Total All Revenue (Million)`,
                        count: dataTotal.revenue
                      }
                      : { title: "Total All Revenue", count: 0 }
                  }
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Donate}
                  imgStyle={{ height: "40px", width: "40px" }}
                  isLoadData={isOpenModalLoader}
                />
              ) : (
                <LongCardSummary
                  summaryOptions={{ title: "Total All Revenue", count: 0 }}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Donate}
                  imgStyle={{ height: "40px", width: "40px" }}
                  isLoadData={isOpenModalLoader}
                />
              )}
            </Paper>
          </Col>
        </Row>

        {/* Transaction Per Jenis Nasabah */}
        <Paper elevation={3} className={classes.filterSection}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            style={{ padding: "0 0 15px" }}
          >
            <Grid item>
              <Avatar src={ExchangeSmall} className={classes.avatar} />
            </Grid>
            <Grid item>
              <Typography
                style={{ fontSize: "15px", padding: "2px 0 0 7px" }}
                variant="h6"
                component="h2"
              >
                Transaction Per Jenis Nasabah
              </Typography>
            </Grid>
          </Grid>

          <Row
            gutter={16}
            style={{
              padding: "10px 0 10px 0",
              justifyContent: "space-between",
            }}
          >
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort
                  isWithChange
                  summaryOptions={renderViewTrxNasabah(
                    currentTabTrx,
                    "Regular",
                    dataTransaksionJenisNasabah
                  )}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Calculator}
                  imgStyle={{ height: "40px", width: "40px" }}
                  currency=""
                  isLoadData={isOpenModalLoaderTransaction}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort
                  isWithChange
                  summaryOptions={renderViewTrxNasabah(
                    currentTabTrx,
                    "Grab",
                    dataTransaksionJenisNasabah
                  )}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Grab}
                  imgStyle={{ height: "40px", width: "40px" }}
                  currency=""
                  isLoadData={isOpenModalLoaderTransaction}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort
                  isWithChange
                  summaryOptions={renderViewTrxNasabah(
                    currentTabTrx,
                    "Rekpon",
                    dataTransaksionJenisNasabah
                  )}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Rekpon}
                  imgStyle={{ height: "40px", width: "40px" }}
                  currency=""
                  isLoadData={isOpenModalLoaderTransaction}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort
                  isWithChange
                  summaryOptions={renderViewTrxNasabah(
                    currentTabTrx,
                    "Kartu Bank Lain",
                    dataTransaksionJenisNasabah
                  )}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={OtherBankCard}
                  imgStyle={{ height: "40px", width: "40px" }}
                  currency=""
                  isLoadData={isOpenModalLoaderTransaction}
                />
              </div>
            </Col>
          </Row>
        </Paper>

        {/* Transaksi Dengan dan Tanpa Kartu ATM */}
        <Row
          gutter={16}
          style={{ marginBottom: "2%", justifyContent: "space-between" }}
        >
          {/* Dengan Kartu ATM */}
          <Col className="gutter-row" span={12}>
            <Paper elevation={3} className={classes.filterSection}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                style={{ padding: "0 0 15px" }}
              >
                <Grid item>
                  <Avatar src={CreditCard} className={classes.avatar} />
                </Grid>
                <Grid item>
                  <Typography
                    style={{ fontSize: "15px", padding: "2px 0 0 7px" }}
                    variant="h6"
                    component="h2"
                  >
                    Transaksi Dengan Kartu ATM
                  </Typography>
                </Grid>
              </Grid>

              <Row
                gutter={16}
                style={{
                  padding: "10px 0 10px 0",
                  justifyContent: "space-between",
                }}
              >
                <Col className="gutter-row" span={12}>
                  <div className={classes.shortCard}>
                    <LongCardSummary
                      isShort
                      isWithChange
                      summaryOptions={renderViewTrxOnAtm(
                        currentTabTrx,
                        "card",
                        "Tunai",
                        dataTransaksionAtmCard
                      )}
                      color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                      imgIcon={Tunai}
                      imgStyle={{ height: "40px", width: "40px" }}
                      currency=""
                      isLoadData={isOpenModalLoader}
                    />
                  </div>
                </Col>
                <Col className="gutter-row" span={12}>
                  <div className={classes.shortCard}>
                    <LongCardSummary
                      isShort
                      isWithChange
                      summaryOptions={renderViewTrxOnAtm(
                        currentTabTrx,
                        "card",
                        "Non Tunai",
                        dataTransaksionAtmCard
                      )}
                      color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                      imgIcon={NonTunai}
                      imgStyle={{ height: "40px", width: "40px" }}
                      currency=""
                      isLoadData={isOpenModalLoader}
                    />
                  </div>
                </Col>
              </Row>
            </Paper>
          </Col>

          {/* Tanpa Kartu ATM */}
          <Col className="gutter-row" span={12}>
            <Paper elevation={3} className={classes.filterSection}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                style={{ padding: "0 0 15px" }}
              >
                <Grid item>
                  <Avatar src={ExchangeSmall} className={classes.avatar} />
                </Grid>
                <Grid item>
                  <Typography
                    style={{ fontSize: "15px", padding: "2px 0 0 7px" }}
                    variant="h6"
                    component="h2"
                  >
                    Transaksi Tanpa Kartu ATM
                  </Typography>
                </Grid>
              </Grid>

              <Row
                gutter={16}
                style={{
                  padding: "10px 0 10px 0",
                  justifyContent: "space-between",
                }}
              >
                <Col className="gutter-row" span={12}>
                  <div className={classes.shortCard}>
                    <LongCardSummary
                      isShort
                      isWithChange
                      summaryOptions={renderViewTrxOnAtm(
                        currentTabTrx,
                        "cardless",
                        "Tunai",
                        dataTransaksionAtmCard
                      )}
                      color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                      imgIcon={Tunai}
                      imgStyle={{ height: "40px", width: "40px" }}
                      currency=""
                      isLoadData={isOpenModalLoader}
                    />
                  </div>
                </Col>
                <Col className="gutter-row" span={12}>
                  <div className={classes.shortCard}>
                    <LongCardSummary
                      isShort
                      isWithChange
                      summaryOptions={renderViewTrxOnAtm(
                        currentTabTrx,
                        "cardless",
                        "Non Tunai",
                        dataTransaksionAtmCard
                      )}
                      color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                      imgIcon={Grab}
                      imgStyle={{ height: "40px", width: "40px" }}
                      currency=""
                      isLoadData={isOpenModalLoader}
                    />
                  </div>
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>

        <Row
          gutter={16}
          style={{ marginBottom: "1%", justifyContent: "space-between" }}
        >
          <Col className="gutter-row" span={12}>
            <TopTenContent
              data={renderViewTopTen(
                currentTabTrx,
                "transaksiTertinggi",
                dataTopTen
              )}
              Icon={HighestTrx}
              Title="Top 10 ID Transaksi Tertinggi"
              isLoadData={isOpenModalLoaderTopTen}
              type="Frequency"
            />
          </Col>
          <Col className="gutter-row" span={12}>
            <TopTenContent
              data={renderViewTopTen(
                currentTabTrx,
                "revenueTertinggi",
                dataTopTen
              )}
              Icon={HighestRev}
              Title="Top 10 ID Revenue Tertinggi"
              isLoadData={isOpenModalLoaderTopTen}
              type="Amount"
            />
          </Col>
        </Row>

        <Row
          gutter={16}
          style={{ marginBottom: "1%", justifyContent: "space-between" }}
        >
          <Col className="gutter-row" span={12}>
            <TopTenContent
              data={renderViewTopTen(
                currentTabTrx,
                "transaksiTerendah",
                dataTopTen
              )}
              Icon={LowestTrx}
              Title="Top 10 ID Transaksi Terendah"
              isLoadData={isOpenModalLoaderTopTen}
              type="Frequency"
            />
          </Col>
          <Col className="gutter-row" span={12}>
            <TopTenContent
              data={renderViewTopTen(
                currentTabTrx,
                "transaksiGagal",
                dataTopTen
              )}
              Icon={FailedTrx}
              Title="Top 10 ID Transaksi Gagal"
              isLoadData={isOpenModalLoaderTopTen}
              type="Total"
            />
          </Col>
        </Row>
      </div>
      {/* <FloatingChat /> */}
      <ModalUpload
        isOpen={openModalUpload}
        onClose={handleCloseModalUpload}
        onLeave={() => {
          handleCloseModalUpload();
        }}
      />
      <ModalLoader isOpen={isOpenModalLoaderNew} />
    </div>
  );
};

export default Transaction;
