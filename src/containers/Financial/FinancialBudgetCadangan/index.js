import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';
import { InputNumber, Input , Row, Col } from "antd";
import Paper from "@material-ui/core/Paper";
import CloseIcon from '@material-ui/icons/Close';
import { Grid, Typography } from "@material-ui/core";
import { LensOutlined } from "@material-ui/icons";
import moment from "moment";
import DoubleGrid from "../../../components/Grid/DoubleGrid";
import { ReactComponent as TitleRateIcon } from "../../../assets/icons/general/transaction_rate_overview.svg";
import constants from "../../../helpers/constants";
import BudgetDonutChart from "../../../components/Financial/Chart/BudgetDonutChart";
import DownloadButton from "../../../components/Button/DownloadButton";
import UploadButton from "../../../components/Button/UploadButton";
import { ReactComponent as Briefcase } from "../../../assets/images/briefcase.svg";
import { ReactComponent as Invoice } from "../../../assets/images/invoice.svg";
import TableSummary from "../../RBBData/TableRBB"; 
import * as Colors from "../../../assets/theme/colors";
import LongCardInfo from "../../../components/Financial/Card/LongCardInfo";
import { ChkySearchBar } from "../../../components";
import ModalUpload from "./ModalUpload";
import ModalLoader from "../../../components/ModalLoader";
import { ChkyButtons } from "../../../components/chky";
import Loading from "../../../components/Loading/LoadingView";
import ConvertUang from "../../../helpers/Utils/convertUang";
import YearSelect from '../../../components/Selects/YearSelect';

import Filter from "../../../components/GeneralComponent/FilterDashTransaction";

import {
  useDispatch,
  useSelector,
} from "../../../helpers/Utils/react-redux-hook";

import getFiles from "../../../helpers/getFiles";
import useRupiahConverter from "../../../helpers/useRupiahConverter";
import ModalAdjustment from "../../../components/Modal/ModalAdjustment";
import "./style.css";
import Table from "./Table";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#F4F7FB",
    padding: "30px 20px 20px 30px",
  },
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
    "& .MuiPaper-rounded": {
      borderRadius: 10,
    },
  },
  filterSection: {
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    padding: "20px 20px",
    borderRadius: 10,
    marginTop: "2%",
    marginBottom: "2%",
    zIndex: 6,
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
    color: "#2b2f3c",
  },
  label: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "13px",
    color: "#2B2F3C",
  },
  iconArea: {
    textAlign: "center",
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    background: "linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)",
    height: "108px",
    paddingTop: 20,
    paddingBottom: 20,
    color: "#FFFFFF",
    marginBottom: "10px",
    fontFamily: "Barlow",
    fontSize: "18px",
    fontWeight: "500",
  },
  tableContent: {
    marginTop: 30
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
    },
  },
  update: {
    fontFamily: 'Barlow',
    fontWeight: '400',
    fontSize: '13px',
    color: '#8D98B4'
  }
}));

const BudgetCadangan = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const dispatch = useDispatch();
  const financialBudgetCadangan = useSelector((state) => state.financial);
  const financialBudgetCadanganSearch = useSelector(
    (state) => state.financialTable
  );

  const today = new Date();
  const year = today.getFullYear();
  const [isApply, setIsApply] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [budgetYear, setBudgetYear] = useState(year);
  const [dataBudgetInfo, setDataBudgetInfo] = useState({});
  const [dataNpb, setDataNpb] = useState({});
  const [loadingDataNpb, setLoadingDataNpb] = useState(true);
  const [dataInvoice, setDataInvoice] = useState({});
  const [loadingDataInvoice, setLoadingDataInvoice] = useState(true);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [OpenModalUploadNew, setOpenModalUploadNew] = React.useState(false);
  const [openModalAdjustment, setOpenModalAdjustment] = useState(false);
  const [listBudgetCadangan, setListBudgetCadangan] = useState([]);
  const [filterInput, setFilterInput] = useState({
    slCode: null,
    slDesc: null,
    slPic: null,
  });
  const [requestBodySearch, setRequestBodySearch] = useState({
    numberSl: null,
    deskripsiSl: null,
    picSl: null,
    tahunBudget: null,
  });
  const [dataModal, setDataModal] = useState({});
  const [slList, setSlList] = useState([]);
  const [index, setIndex] = useState("");
  const [selectIndex, setSelectIndex] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allListBudget, setAllListBudget] = useState([]);
  const [slValue, setSlValue] = useState('');
  const [update, setUpdate] = useState('');
  const [slOptions, setSlOptions] = useState('');

  const handleOpenModalUploadNew = () => setOpenModalUploadNew(true);
  const handleCloseModalUploadNew = () => setOpenModalUploadNew(false);
  const handleUpload = () => {
    handleOpenModalUploadNew();
  };

  const handleOpenModalAdjustment = () =>
    setOpenModalAdjustment(!openModalAdjustment);
  const handleCloseModalAdjustment = () =>
    setOpenModalAdjustment(!openModalAdjustment);
  const handleAdjustment = (id1, id2, data, e) => {
    setDataModal(data);
    setIndex(id2);
    setSelectIndex(id1);
    // if (data.numberSl[id2].balance.ending > 0) {
    //   handleOpenModalAdjustment();
    // } else {
    //   alert("Ending Balance is too low");
    // }
    handleOpenModalAdjustment();
    setSlValue(e.target.dataset.value);
  };

  const handleChangeYear = (value) => {
    setBudgetYear(value);
  };

  const actionCreateNPB = () => {
    setShowModalDetail(true);
  };

  function handleChangePageValue(e,page) {
    const items = document.querySelectorAll('.ant-table-row-expand-icon-expanded');
    items.forEach(item => item.click());
    setCurrentPage(page);
  }

  const handleChangeInput = (event) => {
    const {name} = event.target;
    const {value} = event.target;
    setFilterInput({ ...filterInput, [name]: value });
  };

  const handleApplySearchBudget = () => {
    setIsApply(1);
    setIsLoading(true);
    setRequestBodySearch({
      numberSl: filterInput.slCode,
      deskripsiSl: filterInput.slDesc,
      picSl: filterInput.slPic,
      tahunBudget: budgetYear,
    });
    setCurrentPage(1);
  };
  const handleResetSearchBudget = () => {
    setIsApply(0);
    setIsLoading(true);
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
    setCurrentPage(1);
  };

  function setLoading(data) {
    setModalLoader(data);
  }

  const dataAdjustment = [{ name: "Adjustment", func: handleAdjustment }];

  const tableTitle = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 400,
      align: "left",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 200,
      align: "center",
    },
    {
      title: "SL Code",
      dataIndex: "slCode",
      key: "slCode",
      width: 300,
      align: "center",
    },
    {
      title: "Divisi",
      dataIndex: "divisi",
      key: "divisi",
      width: 100,
      align: "center",
    },
    {
      title: "Beginning Balance",
      dataIndex: "beginningBalance",
      key: "beginningBalance",
      width: 150,
      align: "center",
    },
    {
      title: "Usage",
      dataIndex: "usage",
      key: "usage",
      width: 150,
      align: "center",
    },
    {
      title: "Adjustment",
      dataIndex: "adjustment",
      key: "adjustment",
      width: 150,
      align: "center",
    },
    {
      title: "Ending Balance",
      dataIndex: "endingBalance",
      key: "endingBalance",
      width: 150,
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: 100,
      align: "center",
    },
  ];

  function handleKeyword(newValue) {
    dispatch.financialTable.searchBudgetBesaran({
      numberSl: null,
      deskripsiSl: newValue,
      picSl: null,
      tahunBudget: null,
    });
  }

  useEffect(() => {
    dispatch.financial.budgetSummary();
  }, []);

  useEffect(() => {
    // console.log("+++ Dispatch requestBodySearch");
    dispatch.financialTable.searchBudgetBesaran(requestBodySearch);
  }, [requestBodySearch]);

  useEffect(() => {
    const responseDataBudgetCadangan = financialBudgetCadangan.data;
    if (responseDataBudgetCadangan.totalAmountBudget !== undefined) {
      const npbData = responseDataBudgetCadangan.npb;
      const invoiceData = responseDataBudgetCadangan.invoice;
      setDataBudgetInfo({
        titleIcon: <TitleRateIcon />,
        title: "Budget Information",
        listData: [
          {
            type: "Total Amount Budget",
            value: responseDataBudgetCadangan.totalAmountBudget,
          },
          {
            type: "Total Amount Ending Budget",
            value: responseDataBudgetCadangan.totalAmountEndingBudget,
          },
        ],
        colors: [
          constants.color.primaryHard,
          constants.color.secondaryMedium,
          constants.color.grayMedium,
        ],
      });
      if (npbData !== undefined) {
        setDataNpb({
          leftIcon: <Briefcase />,
          leftTitle: "NPB",
          listData: [
            {
              type: "Permintaan Pekerjaan",
              value: npbData.permintaanPekerjaan,
            },
            { type: "Jumlah NPB", value: npbData.jumlahNPB },
            { type: "Total Amount NPB", value: npbData.totalAmountNPB },
          ],
        });
        setLoadingDataNpb(false);
      }
      if (invoiceData !== undefined) {
        setDataInvoice({
          leftIcon: <Invoice />,
          leftTitle: "Invoice",
          listData: [
            {
              type: "Jumlah Invoice",
              value: responseDataBudgetCadangan.invoice.jumlahInvoice,
            },
            {
              type: "Amount Invoice",
              value: responseDataBudgetCadangan.invoice.nominalInvoice,
            },
            {
              type: "Selisih NPB Invoice",
              value: responseDataBudgetCadangan.invoice.selisihNPBInvoice,
            },
            {
              type: "Invoice Terbayar",
              value: responseDataBudgetCadangan.invoice.invoiceTerbayar,
            },
          ],
        });
        setLoadingDataInvoice(false);
      }
    }
  }, [financialBudgetCadangan]);

  useEffect(() => {
    setListBudgetCadangan([]);
    const response = financialBudgetCadanganSearch.data;
    if(response.tanggalUpload !== undefined) {
      const update = financialBudgetCadanganSearch.data.tanggalUpload;
      const result = moment(update.slice(0,10), 'YYYY-MM-DD').format('LL');
      setUpdate(result);
    }
    if (response.budgetBesaranResponse !== undefined) {
      if (response.budgetBesaranResponse.length === 0) {
        setIsLoading(false);
      }
      const dataResponse = response.budgetBesaranResponse;
      const store = [];
      let data = {};
      const listSL = [];
      
      const dataPreListSL = dataResponse.filter(item => item.description!=='').filter((val,i)=>(10*(currentPage-1)<=i&&i<10*(currentPage)));
      // console.log("+++ list", dataPreListSL);
      const allDataListSL = dataResponse.filter(item => item.description!=='');
      // console.log("+++ list", allDataListSL);

      const newListSL = [];
      allDataListSL.map((item)=>{
        item.numberSl.map((itemSL)=>{
          newListSL.push({
            group: item.category,
            lable: `${itemSL.codeSl} : ${itemSL.category}`,
            codeSl: itemSL.codeSl,
            balance: itemSL.balance,
            value: itemSL.budgetId,
          });
        });
      });
      // console.log("+++ newListSL", JSON.stringify(newListSL));
      setSlOptions(newListSL);
      dataPreListSL.map((list, idx1) => {
        const nestedData = [];
        list.numberSl.map((item, idx2) => {
          listSL.push({
            id: idx2,
            code: `${item.codeSl} : ${item.category}`,
            nameId: `${item.codeSl} : ${item.category}`,
            nameEn: `${item.codeSl} : ${item.category}`,
            value: item.budgetId,
            endingBalance: item.balance.ending,
            adjustment: item.balance.adjustment
          });
          nestedData.push({
            key: `${1 + idx1}${1 + idx2}`,
            category: item.category,
            slCode: item.codeSl,
            divisi: item.picSl,
            beginningBalance: useRupiahConverter(item.balance.beginning),
            usage: useRupiahConverter(item.balance.usage),
            adjustment: useRupiahConverter(item.balance.adjustment),
            endingBalance: useRupiahConverter(item.balance.ending),
            action: dataAdjustment.map((act) => {
              return (
                <a onClick={(e) => act.func(idx1, idx2, list, e)} data-value={item.budgetId}>{act.name}</a>
              );
            }),
          });
          data = {
            key: 1 + idx1,
            description: list.description,
            category: "",
            // category: list.category === null ? "" : list.category,
            divisi: "",
            // divisi: list.divisi,
            children: nestedData,
          };
        });
        store.push(data);
      });
      setListBudgetCadangan(store);
      if (allListBudget.length === 0) {
        setAllListBudget(listSL);
      }
      setLoading(false);
      setIsLoading(false);
    }
  }, [financialBudgetCadanganSearch,currentPage]);

  const totalRows = financialBudgetCadanganSearch?.data?.budgetBesaranResponse?.length || 0;
  const rowsPerPage = 10;
  const totalPages = Math.ceil(totalRows/rowsPerPage);

  // year for select
  const years = [];
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
          marginBottom: 20,
        }}
      >
        <div className={classes.title}>Budget & Cadangan</div>
        <Grid item>
          <ChkySearchBar
            placeholder="Pencarian berdasarkan deskripsi..."
            onKeywordChange={handleKeyword}
            width={290}
          />
        </Grid>
      </Row>

      <Row
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Grid item>
          <div className={classes.update}>Last update : {update}</div>
        </Grid>
        <Grid item>
          <DownloadButton
            style={{
              marginBottom: 20,
              width: 150,
              height: 40,
              right: 0,
              marginRight: 30,
            }}
            label="Download"
            onClick={() => {
              getFiles({
                url: `${process.env.REACT_APP_API_DOMAIN}/financialservices/financialPlannerServices/v1/fileDownloadBudgetBesaran`,
                data: {},
                fileName: "financial_budget",
                loading: setLoading,
              });
            }}
          />
          <UploadButton
            style={{
              marginBottom: 20,
              width: 150,
              height: 40,
              right: 0,
            }}
            label="Upload File"
            onClick={() => {
              handleUpload();
            }}
          />
        </Grid>
      </Row>
      {/* <div style={{ width: "100%", textAlign: "end", marginBottom: 15 }}>
        <DownloadButton
          style={{
            marginBottom: 20,
            width: 150,
            height: 40,
            right: 0,
            marginRight: 30,
          }}
          label="Download"
          onClick={() => {
            getFiles({
              url: `${process.env.REACT_APP_API_DOMAIN}/financialservices/financialPlannerServices/v1/fileDownloadBudgetBesaran`,
              data: {},
              fileName: "financial_budget",
              loading: setLoading,
            });
          }}
        />
        <UploadButton
          style={{
            marginBottom: 20,
            width: 150,
            height: 40,
            right: 0,
          }}
          label="Upload File"
          onClick={() => {
            handleUpload();
          }}
        />
      </div> */}

      <Grid item container spacing={3}>
        <Grid item xs={12} sm={5}>
          <Paper
            style={{
              height: "100%",
              background: "#FFFFFF",
              boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
              borderRadius: 10,
            }}
          >
            <BudgetDonutChart data={dataBudgetInfo} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Paper
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
                  borderRadius: 10,
                  height: 108,
                }}
              >
                {loadingDataNpb ? (
                  <Loading maxheight="100%" />
                ) : (
                  <Grid item container>
                    <Grid item xs={12} sm={2} className={classes.iconArea}>
                      <div>{dataNpb.leftIcon}</div>
                      <div>{dataNpb.leftTitle}</div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      style={{
                        height: "108px",
                        padding: "20px 20px",
                        textAlign: "center",
                      }}
                    >
                      <Grid item container spacing={1}>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 20,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {useRupiahConverter(dataNpb.listData[0].value, true)}
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 13,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {dataNpb.listData[0].type}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 20,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {useRupiahConverter(dataNpb.listData[1].value, true)}
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 13,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {dataNpb.listData[1].type}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 20,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {useRupiahConverter(dataNpb.listData[2].value, true)}
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 13,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {dataNpb.listData[2].type}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {/* <LongCardInfo data={dataNpb} height={108} /> */}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
                  borderRadius: 10,
                  height: 108,
                }}
              >
                {loadingDataInvoice ? (
                  <Loading maxheight="100%" />
                ) : (
                  <Grid item container>
                    <Grid item xs={12} sm={2} className={classes.iconArea}>
                      <div>{dataInvoice.leftIcon}</div>
                      <div>{dataInvoice.leftTitle}</div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      style={{
                        height: "108px",
                        padding: "20px 20px",
                        textAlign: "center",
                      }}
                    >
                      <Grid item container spacing={1}>
                        <Grid item xs={12} sm={3}>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 20,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {useRupiahConverter(dataInvoice.listData[0].value, true)}
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 13,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {dataInvoice.listData[0].type}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 20,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {useRupiahConverter(dataInvoice.listData[1].value, true)}
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 13,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {dataInvoice.listData[1].type}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 20,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {useRupiahConverter(dataInvoice.listData[2].value, true)}
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 13,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {dataInvoice.listData[2].type}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 20,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {useRupiahConverter(dataInvoice.listData[3].value, true)}
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: "Barlow",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 13,
                              textAlign: "center",
                              color: "#000000",
                            }}
                          >
                            {dataInvoice.listData[3].type}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {/* <LongCardInfo data={dataInvoice} height={108} /> */}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <DoubleGrid
        container={{ gutter: 20 }}
        leftComponent={{
          span: 10,
          component: <BudgetDonutChart data={dataBudgetInfo} />,
        }}
        rightComponent={{
          span: 14,
          component: (
            <div>
              <LongCardInfo data={dataNpb} height={108} />
              <div style={{ height: 15 }} />

              <LongCardInfo data={dataInvoice} height={108} />
            </div>
          ),
        }}
      /> */}
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
                <Typography className={classes.label}>Division</Typography>
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
                  style={{width:'100%'}}
                  years={years}
                  value={budgetYear}
                  onChange={handleChangeYear}
                />
              </Grid>
              {isApply === 1 && (
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
              )}
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
          {/* <Grid item>
            <Grid container direction="column" style={{ marginRight: 20 }}>
              <Grid item style={{ marginBottom: 5 }}>
                SL Code
              </Grid>
              <Grid item>
                <Input
                  style={{ borderRadius: 6, width: "140px" }}
                  placeholder="input SL Code"
                  name="slCode"
                  value={filterInput.slCode}
                  onChange={handleChangeInput}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ChkyButtons
              onClick={handleApplySearchBudget}
              height={40}
              style={{ textTransform: "capitalize" }}
            >
              Apply
            </ChkyButtons>
          </Grid> */}
          {/* <Grid container direction="row" style={{ width: "max-content" }}> */}
          {/* <Grid item>
              <Grid container direction="column" style={{ marginRight: 20 }}>
                <Grid item style={{ marginBottom: 5 }}>
                  SL Code
                </Grid>
                <Grid item>
                  <Input
                    style={{ borderRadius: 6, width: "140px" }}
                    placeholder="input SL Code"
                    name="slCode"
                    value={filterInput.slCode}
                    onChange={handleChangeInput}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" style={{ marginRight: 20 }}>
                <Grid item style={{ marginBottom: 5 }}>
                  Deskripsi SL
                </Grid>
                <Grid item>
                  <Input
                    style={{ borderRadius: 6, width: "440px" }}
                    placeholder="input Deskripsi SL"
                    name="slDesc"
                    value={filterInput.slDesc}
                    onChange={handleChangeInput}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" style={{ marginRight: 20 }}>
                <Grid item style={{ marginBottom: 5 }}>
                  PIC SL
                </Grid>
                <Grid item>
                  <Input
                    style={{ borderRadius: 6, width: "200px" }}
                    placeholder="username"
                    name="slPic"
                    value={filterInput.slPic}
                    onChange={handleChangeInput}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" style={{ marginRight: 20 }}>
                <Grid item style={{ marginBottom: 5 }}>
                  Tahun Budget
                </Grid>
                <Grid item>
                  <InputNumber
                    style={{ borderRadius: 6 }}
                    min={year - 10}
                    max={year + 1}
                    defaultValue={budgetYear}
                    onChange={handleChangeYear}
                  />
                </Grid>
              </Grid>
            </Grid> */}
          {/* </Grid> */}
        </Grid>
      </Paper>

      <div item className={classes.tableContent}>
        {/* <DynamicTablePagination data={dataTable} fields={titleTable} cellOption={valueType} changePage={handleChangePageValue}/> */}
        <TableSummary
          data={listBudgetCadangan}
          columnData={tableTitle}
          imgIcon={null}
          grandTotal={null}
          scrollWidth="max-content"
          isLoading={isLoading}
          container='finBudgetCadangan'
          className={classes.tableSummary}
        />
      </div>
      <div className={classes.paginationContainer}>
        <Typography
          style={{ fontSize: 15, color: constants.color.grayMedium }}
        >
          Showing {(currentPage - 1) * rowsPerPage + 1} -{" "}
          {(currentPage - 1) * rowsPerPage + listBudgetCadangan.length} of {totalRows}
        </Typography>
        <Pagination
          page={currentPage}
          count={totalPages}
          className={classes.pagination}
          onChange={handleChangePageValue}
        />
        {/* <Table fields={tableTitle} data={listBudgetCadangan} /> */}
      </div>

      <ModalUpload
        isOpen={OpenModalUploadNew}
        onClose={handleCloseModalUploadNew}
        onCloseAll={setOpenModalUploadNew}
        setLoading={setLoading}
      />
      <ModalAdjustment
        isOpen={openModalAdjustment}
        onClose={handleCloseModalAdjustment}
        onLeave={() => {
          handleCloseModalAdjustment();
        }}
        setOpen={setOpenModalAdjustment}
        dataModal={dataModal}
        dataSl={allListBudget}
        dataRequest={requestBodySearch}
        index={index}
        slValue={slValue}
        setLoading={setLoading}
        slOptions={slOptions}
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

export default BudgetCadangan;
