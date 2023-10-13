/* Third Party Import */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";

/* Internal Import */
import { ChkyTablePagination } from "../../../components";
import { PrimaryHard } from "../../../assets/theme/colors";
import FilterComponent from "./common/FilterReport";
import TableTemplate from "./common/TableTemplate";
import { ReactComponent as ChevronDoubleUp } from "../../../assets/icons/duotone-red/chevron-double-up.svg";
import { ReactComponent as ChevronDoubleDown } from "../../../assets/icons/duotone-red/chevron-double-down.svg";
import { ReactComponent as SignalSlash } from "../../../assets/icons/duotone-red/signal-alt-slash.svg";
import { ReactComponent as Calculator } from "../../../assets/icons/duotone-red/calculator.svg";
import { ReactComponent as ListIcon } from "../../../assets/icons/duotone-red/list-ul.svg";
import { ReactComponent as ScannerKeyboard } from "../../../assets/icons/duotone-red/scanner-keyboard.svg";
import { ReactComponent as FileAlt } from "../../../assets/icons/duotone-red/file-alt.svg";
import { ReactComponent as MoneyBill } from "../../../assets/icons/duotone-red/money-bill.svg";
import { ReactComponent as Wrench } from "../../../assets/icons/duotone-red/wrench.svg";
import { doGetReportUptime, doGetSummaryReportUpTime } from "../serviceMonitoring";
import LoadingView from "../../../components/Loading/LoadingView";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
    marginBottom: "32px"
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
  wrapper: {
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px, 6px rgba(232, 238, 255, 0.3)",
    padding: "20px",
    margin: "0px 10px"
  },
  textWrapper: {
    fontWeight: 600,
    fontSize: 15,
  },
  successText: {
    color: "#65D170"
  },
  errorText: {
    color: "#FF7774"
  },
  defaultText: {
    color: "#2B2F3C"
  }
});

const ReportUptime = () => {
  const classes = useStyles();
  const history = useHistory();

  const rowsPerPage = 10;
  const defaultDataHit = {
    pageNumber: 0,
    dataPerPage: rowsPerPage,
    sortBy: "atmId",
    sortType: "ASC",
  };

  const [data, setData] = useState([]);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [isLoadData,setIsLoadData]= useState(false);
  const [isLoadTable,setIsLoadTable]= useState(false);
  const [totalPages,setTotalPages]= useState(0);
  const [totalRows,setTotalRows]= useState(0);
  const itemSearch = [{ text: "ATM ID", value: "atmId" }];
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState(null);

  const [dataSummary,setIsDataSummary] = useState([]);
  const [dataSummaryTime,setIsDataSummaryTime]=useState([]);
  const [isdataTotal,setIsDataTotal]=useState([]);
  const [tableConfig, setTableConfig] = useState({
    dataRequest: {
      pageNumber: 0,
      dataPerPage: rowsPerPage,
      sortBy: "atmId",
      sortType: "ASC",
    },
    orderDirection: "ASC",
    totalPages: 0,
    totalRows: 0,
    sortBy: null
  });
  function loaderHandler(loaderValue){
    setIsLoadData(loaderValue);
  }
  function loaderHandlerTable(loaderValue){
    setIsLoadTable(loaderValue);
  }

  function handleSortTable(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVar[TableTemplate.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setOrderDirection(sortType);
      setSortBy(property);
      // setOrderBy(sortByNewVal);
      setDataRequest({
        ...dataRequest,
        sortType,
        sortBy: sortByNewVal,
      });
    };
  };

  const handleFilterSubmit = (value) => {
    setIsFilterApplied(true);
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      // console.log("Sasa",value);
      setDataRequest({
        ...defaultDataHit,
        ...value,
      });
    }
  };

  const handleResetFilter = () => {
    setIsFilterApplied(false);
    setDataRequest({
      ...defaultDataHit,
    });
  };

  const  handleChangePage = (newPage) => {
    setTableConfig({
      dataRequest: {
        ...tableConfig.dataRequest,
        pageNumber: newPage
      }
    });
  };

  /* useEffect(() => {
    const {dummyData} = TableTemplate;
    const tempArray = dummyData.map(item => ({
      ...item,
      action: <Button className={classes.textButton} onClick={() => {history.push(`/monitoring/report-uptime/detail/1508`);}}>Detail</Button>,
    }));

    setData(tempArray);
  },[]); */
  /* summary */
  useEffect(()=>{
    doGetSummaryReportUpTime(loaderHandler).then((response)=>{
      console.log("~~~response",response);
      if(response){
        // setIsDataSummary(response);
        const dataSetTime = [
          {
            key: "Uptime",
            value: response?.uptime,
            type:"success",
            icon: <ChevronDoubleUp width={16} />,
          },
          {
            key: "Downtime",
            value: response?.downtime,
            type:"error",
            icon: <ChevronDoubleDown width={16} />,
          },
        ];
        setIsDataSummaryTime(dataSetTime);
        const dataSet = [
          {
            key: "LC",
            value: response?.lc,
            icon: <SignalSlash width={16} />,
          },
          {
            key: "DF",
            value: response?.df,
            icon: <Calculator width={16} />,
          },
          {
            key: "JF",
            value: response?.jf,
            icon: <ListIcon width={16} />,
          },
          {
            key: "CF",
            value: response?.cf,
            icon: <ScannerKeyboard width={16} />,
          },
          {
            key: "RF",
            value: response?.rf,
            icon: <FileAlt width={16} />,
          },
          {
            key: "CO",
            value: response?.co,
            icon: <MoneyBill width={16} />,
          },
        ];
        setIsDataSummary(dataSet);
        const dataTotal=[
          {
            key:"Total ATM Under SLA",
            value:response?.totalAtmUnderSla,
            type:"error",
            icon:<Wrench width={16} />
          },
          {
            key:"Total ATM SLA",
            value:response?.totalAtmSla,
            icon:<Wrench width={16} />,
          }
        ];
        setIsDataTotal(dataTotal);
      }
    });
  },[]);

  /* data Tabel */
  useEffect(()=>{
    doGetReportUptime(loaderHandlerTable,dataRequest).then((response)=>{
      console.log("___responseTable",response.data);
      const dataToSet=[];
      const tableData=response.data.data;
      setTotalPages(response.data.pagination.totalPages);
      setTotalRows(response.data.pagination.totalElements);
      tableData.map((item)=>{
        const newRow = {
          atmId: item?.atmId,
          lokasi: item?.lokasi,
          machine: item?.machine,
          denom: item?.denom,
          jarkom: item?.jarkom,
          flm: item?.flm,
          slm: item?.slm,
          uptime: item?.uptime === null ? 0 + "%" : item?.uptime.toString().slice(0, 4) + "%",
          downtime: item?.downtime === null ? 0 + "%" : item?.downtime.toString().slice(0, 4) + "%",
          lcPercent: item?.lcPercent === null ? 0 + "%" : item?.lcPercent + "%",
          dfPercent: item?.dfPercent === null ? 0 + "%" : item?.dfPercent + "%",
          cfPercent: item?.cfPercent === null ? 0 + "%" : item?.cfPercent + "%",
          rfPercent: item?.rfPercent === null ? 0 + "%" : item?.rfPercent + "%",
          jfPercent: item?.jfPercent === null ? 0 + "%" : item?.jfPercent + "%",
          coPercent: item?.coPercent === null ? 0 + "%" : item?.coPercent + "%",
          sanggahan: item?.sanggahan === null ? 0 + "%" : item?.sanggahan + "%",
          lc: item?.lc,
          df: item?.df,
          cf:item?.cf,
          rf: item?.rf,
          jf: item?.jf,
          co: item?.co,
          spvModel: item?.spvModel,
          action: (
            <Button
              className={classes.textButton}
              onClick={() => {
                history.push(`/monitoring/report-uptime/detail/${item?.atmId}`);
              }}
            >
              Detail
            </Button>
          ),
        };
        dataToSet.push(newRow);
      });
      setData(dataToSet.slice(0, 10));
    });
  },[dataRequest]);

  /* Functional Component */
  const RowData = (props) => {
    const {label, value, icon, type} = props;
    return (
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ flexWrap: "nowrap", marginBottom: "16px" }}
      >
        <Grid container alignItems="center">
          <div
            style={{
              marginRight: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon}
          </div>
          <Typography className={classes.textWrapper}>{label}</Typography>
        </Grid>
        <Typography
          className={`
            ${classes.textWrapper}
            ${type === "success" && classes.successText}
            ${type === "error" && classes.errorText}
            ${type === "default" && classes.defaultText}
          `}
        >
          {value}
        </Typography>
      </Grid>
    );
  };
  RowData.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
  };
  RowData.defaultProps = {
    type: "default",
    value: "0%",
  };
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Report Uptime</Typography>
      <Grid
        container
        alignItems="start"
        style={{ flexWrap: "nowrap", marginBottom: "24px" }}
      >
        <Grid item xs={3} className={classes.wrapper}>
          {isLoadData ? (
            <LoadingView />
          ) : (
            <>
              {" "}
              {dataSummaryTime.map((item) => {
                return (
                  <>
                    <RowData
                      label={item?.key}
                      value={`${item?.value}`}
                      type={item?.type}
                      icon={item?.icon}
                    />
                  </>
                );
              })}
            </>
          )}
        </Grid>
        <Grid item xs={6} className={classes.wrapper}>
          {isLoadData ? (
            <LoadingView />
          ) : (
            <>
              <Grid container spacing={8}>
                <Grid item xs={6}>
                  {dataSummary.map((item, i) => {
                    return (
                      <>
                        {i <= 2 && (
                          <RowData
                            label={item?.key}
                            value={`${item?.value}`}
                            icon={item?.icon}
                          />
                        )}
                      </>
                    );
                  })}
                </Grid>
                <Grid item xs={6}>
                  {dataSummary.map((item, i) => {
                    return (
                      <>
                        {i > 2 && (
                          <RowData
                            label={item?.key}
                            value={`${item?.value}`}
                            icon={item?.icon}
                          />
                        )}
                      </>
                    );
                  })}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        <Grid item xs={3} className={classes.wrapper}>
          {isLoadData ? (
            <LoadingView />
          ) : (
            <>
              {isdataTotal.map((item) => {
                return (
                  <>
                    <RowData
                      label={item?.key}
                      value={`${item?.value}`}
                      type={item?.type}
                      icon={item?.icon}
                    />
                  </>
                );
              })}
            </>
          )}
        </Grid>
      </Grid>
      <FilterComponent
        isOpening={false}
        onFilterSubmit={handleFilterSubmit}
        handleReset={handleResetFilter}
        itemSearch={itemSearch}
      />
      <ChkyTablePagination
        data={data}
        rowsPerPage={rowsPerPage}
        fields={TableTemplate.titleTable}
        cellOption={TableTemplate.valueType}
        isSort={TableTemplate.isSort}
        totalPages={totalPages}
        totalRows={totalRows}
        sortBy={tableConfig.sortBy}
        order={tableConfig.orderDirection}
        changePage={handleChangePage}
        handleSort={handleSortTable}
        isUsingMuiSort
        isLoadData={isLoadTable}
      />
    </div>
  );
};

export default ReportUptime;
