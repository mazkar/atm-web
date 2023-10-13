/* Third Party Import */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useHistory,useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import {RootContext} from "../../../../router";

/* Internal Import */
import { ChkyTablePagination } from "../../../../components";
import { PrimaryHard } from "../../../../assets/theme/colors";
import FilterComponent from "../common/FilterComponent";
import TableTemplate from "../common/TableTemplate/detail";
import TableChips from "../../../../components/Chips/TableChips";
import AcknowledgePopUp from "../common/AddAcknowledgeRemarkOrder";
import RemarkPopUp from "../../AnomalyAlert/common/RemarkPopUp";
import { ReactComponent as ChevronDoubleUp } from "../../../../assets/icons/duotone-red/chevron-double-up.svg";
import { ReactComponent as ChevronDoubleDown } from "../../../../assets/icons/duotone-red/chevron-double-down.svg";
import { ReactComponent as SignalSlash } from "../../../../assets/icons/duotone-red/signal-alt-slash.svg";
import { ReactComponent as Calculator } from "../../../../assets/icons/duotone-red/calculator.svg";
import { ReactComponent as ListIcon } from "../../../../assets/icons/duotone-red/list-ul.svg";
import { ReactComponent as ScannerKeyboard } from "../../../../assets/icons/duotone-red/scanner-keyboard.svg";
import { ReactComponent as FileAlt } from "../../../../assets/icons/duotone-red/file-alt.svg";
import { ReactComponent as MoneyBill } from "../../../../assets/icons/duotone-red/money-bill.svg";
import { ReactComponent as Wrench } from "../../../../assets/icons/duotone-red/wrench.svg";
import { doGetDetailUptimeDetail, doGetSummaryUptimeDetail } from "../../serviceMonitoring";
import moment from "moment";
import LoadingView from "../../../../components/Loading/LoadingView";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import PopupSucces from "../../../../components/PopupSucces";


const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
    marginBottom: "32px",
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
    margin: "0px 10px",
    height: "170px",
    overflowY: "auto",
  },
  textWrapper: {
    fontWeight: 600,
    fontSize: 15,
  },
  successText: {
    color: "#65D170",
  },
  errorText: {
    color: "#FF7774",
  },
  defaultText: {
    color: "#2B2F3C",
  },
});

const ReportUptime = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const {userId,userRoleName}=useContext(RootContext);

  const buttonList = ["All", "Accept", "Reject", "No Remark"];
  const rowsPerPage = 10;
  const defaultDataHit = {
    pageNumber: 0,
    dataPerPage: rowsPerPage,
    sortBy: "id",
    sortType: "ASC",
  };
  const dummyDetail = [
    {
      title: "Magnetic Card Reader / Write Fatal",
      percentage: "15%",
      value: "1",
      type: "success",
    },
    {
      title: "BNA Binout",
      percentage: "90%",
      value: "200",
      type: "error",
    },
    {
      title: "Communication Command Fail",
      percentage: "90%",
      value: "200",
      type: "error",
    },
    {
      title: "Down-Communication Fail",
      percentage: "15%",
      value: "2",
      type: "success",
    },
    {
      title: "Magnetic Card Reader / Write Fatal",
      percentage: "15%",
      value: "1",
      type: "success",
    },
    {
      title: "BNA Binout",
      percentage: "90%",
      value: "200",
      type: "error",
    },
    {
      title: "Communication Command Fail",
      percentage: "90%",
      value: "200",
      type: "error",
    },
    {
      title: "Down-Communication Fail",
      percentage: "15%",
      value: "2",
      type: "success",
    },
  ];

  const [data, setData] = useState([]);
  const [dataSummary,setDataSummary]= useState({});
  const [isProblemPercent,setIsProblemPercent]=useState([]);
  const [isProblem,setIsProblem]=useState([]);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState(null);
  const [isLoadData,setIsLoadData]=useState(false);
  const [openSuccess, setOpenSuccess] = useState(false)
  const itemSearch = [
    { text: "ATM ID", value: "atmId" },
  ];
  const [tableConfig, setTableConfig] = useState({
    dataRequest: {
      pageNumber: 0,
      dataPerPage: rowsPerPage,
      sortBy: "id",
      sortType: "ASC",
    },
    orderDirection: "ASC",
    totalPages: 0,
    totalRows: 0,
    sortBy: null,
  });

  const [dialog, setDialog] = useState({
    acknowledge: false,
    remark: false,
    id:0,
  });
  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setIsLoadData(bool);
  }
  useEffect(() => {
    // setIsLoadData(true);
    doGetSummaryUptimeDetail(loadingHandler,id).then((response)=>{
      console.log("~~~~Data",response);
      if(response){
        const summaryPart = {
          uptime: response?.data?.uptime,
          downTime: response?.data?.downtime,
        };
        const problemPercent = response?.data?.problemPercent;
        const problem = response?.data?.problem;
        setDataSummary(summaryPart);
        setIsProblemPercent(problemPercent);
        setIsProblem(problem);
        setIsLoadData(false);
      }
    }).catch((err)=>{
      alert(`Terjadi Kesalahan:${err}`);
    });
  }, []);

  const chipsHandler = (type) => {
    /*
      [props in table] : "color in chips component"
    */
    const condition = {
      "1": "success",
      "0": "warning",
      "2": "error",
    };

    return condition[type] ?? "default";
  };
  const fillChips = (ack) => {
    const number = {
      "0": "No Remark",
      "1": "Accept",
      "2": "Reject",
      "3":"Not Acknowledge"
    };
    return number[ack] ?? "Not Acknowledge";
  };
  // Fetch Table Data
  useEffect(()=>{
    doGetDetailUptimeDetail(loadingHandler,dataRequest).then((response)=>{
      console.log("____response",response);
      setTotalPages(response.data.totalPages);
      setTotalRows(response.data.totalElements);
      const tableData = response.data.detailUptimeDowntime;
      const dataToSet =[];
      tableData.map((item)=>{
        const newRow = {
          noTicket: item?.id,
          atmId: item?.atmId,
          lokasi: item?.lokasi,
          detail: item?.detailLokasi,
          problem: item?.problem,
          tanggal: item?.tanggal,
          bulan: item?.bulan,
          mulai: moment.unix(item?.mulai / 1000).format("DD/MM/YYYY hh:mm:ss"),
          selesai: moment
            .unix(item?.selesai / 1000)
            .format("DD/MM/YYYY hh:mm:ss"),
          durasi: item?.durasi,
          downTime: item?.downTimeView,
          uptime: item?.upTimeView,
          downTimeRemarkView: item?.downTimeRemarkView,
          upTimeRemarkView: item?.upTimeRemarkView,
          acknowledge: (
            <TableChips
              label={fillChips(item?.acknowledge)}
              type={chipsHandler(item?.acknowledge)}
              clickable={item.acknowledge === "0"}
              // onClick={() => {
              // handleOpenDialog("acknowledge");
              // }}
            />
          ),
          action: (
            <Button
              disabled={item?.acknowledge === "0" && userRoleName !== "Vendor Order"}
              className={classes.textButton}
              onClick={() => {
                handleOpenDialog(item?.id);
              }}
            >
              Remark
            </Button>
          ),
        };
        dataToSet.push(newRow);
      });
      setData(dataToSet);
    }).catch((err) => {
      alert(`Terjadi Kesalahan:${err}`);
    });
  },[dataRequest]);

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
  }
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

  const handleChangePage = (newPage) => {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  };

  const handleOpenDialog = (val) => {
    /* setDialog((prev) => ({
      ...prev,
      [value]: true,
    })); */
    if(userRoleName.toLowerCase().includes("vendor")){
      setDialog(()=>({
        remark:true,
        id:val
      }));
    }else{
      setDialog(()=>({
        acknowledge:true,
        id:val,
      }));
    }
  };

  const handleCloseDialog = (value) => {
    setDialog((prev) => ({
      ...prev,
      [value]: false,
    }));
  };

  /* useEffect(() => {
    const { dummyData } = TableTemplate;
    const tempArray = dummyData.map((item) => ({
      ...item,
      acknowledge: (
        <TableChips
          label={item.acknowledge.text}
          type={chipsHandler(item.acknowledge.type)}
          clickable={item.acknowledge.type === "noRemark"}
          onClick={() => {
            handleOpenDialog("acknowledge");
          }}
        />
      ),
      action: (
        <Button
          disabled={item.acknowledge.type === "noRemark"}
          className={classes.textButton}
          onClick={() => {
            handleOpenDialog("remark");
          }}
        >
          Detail
        </Button>
      ),
    }));

    setData(tempArray);
  }, []); */

  /* Functional Component */
  const RowData = (props) => {
    const { label, value, icon, type } = props;
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
            ${type %2 === 0 && classes.successText}
            ${type %2 !== 0 && classes.errorText}
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
      <Typography className={classes.title}>Report Uptime Detail</Typography>
      <Grid
        container
        alignItems="start"
        style={{ flexWrap: "nowrap", marginBottom: "24px" }}
      >
        <Grid item xs={2} className={classes.wrapper}>
          <RowData
            label="Uptime"
            value={`${dataSummary?.uptime}%`}
            type={0}
            icon={<ChevronDoubleUp width={16} />}
          />
          <RowData
            label="Downtime"
            value={`${dataSummary?.downTime}%`}
            type={1}
            icon={<ChevronDoubleDown width={16} />}
          />
        </Grid>
        <Grid item xs={5} className={classes.wrapper}>
          {isLoadData ? (
            <LoadingView />
          ) : (
            <div>
              {isProblemPercent.map((item, i) => (
                <RowData label={item?.key} value={`${item?.value}%`} type={i} />
              ))}
            </div>
          )}
        </Grid>
        <Grid item xs={5} className={classes.wrapper}>
          {isLoadData ? (
            <LoadingView />
          ) : (
            <div>
              {isProblem.map((item, i) => (
                <RowData label={item?.key} value={item?.value} type={i} />
              ))}
            </div>
          )}
        </Grid>
      </Grid>
      <FilterComponent
        onFilterSubmit={handleFilterSubmit}
        handleReset={handleResetFilter}
        buttonList={buttonList}
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
        sortBy={sortBy}
        order={orderDirection}
        changePage={handleChangePage}
        handleSort={handleSortTable}
        isUsingMuiSort
        isLoadData={isLoadData}
      />
      <AcknowledgePopUp
        idData={dialog.id}
        isOpen={dialog.acknowledge}
        onClose={() => handleCloseDialog("acknowledge")}
        onSuccess={()=> {
          setOpenSuccess(true)
          setTimeout(()=>{
            setOpenSuccess(false)
            history.go(0)
          }, 3000)
        }}
      />
      <RemarkPopUp
        idData={dialog.id}
        isOpen={dialog.remark}
        onClose={() => {
          handleCloseDialog("remark");
        }}
      />
      <PopupSucces 
        isOpen={openSuccess} 
        onClose={()=>setOpenSuccess(false)} 
        message="Berhasil memperbaharui Downtime after Remark!" 
      />
      {/* <FloatingChat/> */}
    </div>
  );
};

export default ReportUptime;
