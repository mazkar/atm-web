import React,{useEffect,useState} from 'react'
import {makeStyles,Paper,Grid,Typography} from "@material-ui/core"
import FilterData from './FilterData';
import { ChkyTablePagination } from '../../../../components';
import { doGetNumberVendor } from '../../ApiServices';


const UseStyles = makeStyles((theme) => ({
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    position: "relative",
    borderRadius: 10,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  indicator: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "17px",
    color: "#2B2F3C",
  },
}));

const dataTable = [
  {
    id: 1,
    vendorName: "PT.Raline Shah Abadi",
    jumlahSurvey: 120,
    surveyOpen: 30,
    surveyTepatWaktu: 20,
    surveyDelay: 20,
    surveyTidakDikerjakan: 20,
    surveyManual: 20,
  },
  {
    id: 2,
    vendorName: "PT.Raline Shah Abadi",
    jumlahSurvey: 120,
    surveyOpen: 30,
    surveyTepatWaktu: 20,
    surveyDelay: 20,
    surveyTidakDikerjakan: 20,
    surveyManual: 20,
  },
  {
    id: 3,
    vendorName: "PT.Raline Shah Abadi",
    jumlahSurvey: 120,
    surveyOpen: 30,
    surveyTepatWaktu: 20,
    surveyDelay: 20,
    surveyTidakDikerjakan: 20,
    surveyManual: 20,
  },
  {
    id: 4,
    vendorName: "PT.Raline Shah Abadi",
    jumlahSurvey: 120,
    surveyOpen: 30,
    surveyTepatWaktu: 20,
    surveyDelay: 20,
    surveyTidakDikerjakan: 20,
    surveyManual: 20,
  },
  {
    id: 5,
    vendorName: "PT.Raline Shah Abadi",
    jumlahSurvey: 120,
    surveyOpen: 30,
    surveyTepatWaktu: 20,
    surveyDelay: 20,
    surveyTidakDikerjakan: 20,
    surveyManual: 20,
  },
  {
    id: 6,
    vendorName: "PT.Raline Shah Abadi",
    jumlahSurvey: 120,
    surveyOpen: 30,
    surveyTepatWaktu: 20,
    surveyDelay: 20,
    surveyTidakDikerjakan: 20,
    surveyManual: 20,
  },
  {
    id: 7,
    vendorName: "PT.Raline Shah Abadi",
    jumlahSurvey: 120,
    surveyOpen: 30,
    surveyTepatWaktu: 20,
    surveyDelay: 20,
    surveyTidakDikerjakan: 20,
    surveyManual: 20,
  },
  {
    id: 8,
    vendorName: "PT.Raline Shah Abadi",
    jumlahSurvey: 120,
    surveyOpen: 30,
    surveyTepatWaktu: 20,
    surveyDelay: 20,
    surveyTidakDikerjakan: 20,
    surveyManual: 20,
  },
  {
    id: 9,
    vendorName: "PT.Raline Shah Abadi",
    jumlahSurvey: 120,
    surveyOpen: 30,
    surveyTepatWaktu: 20,
    surveyDelay: 20,
    surveyTidakDikerjakan: 20,
    surveyManual: 20,
  },
  {
    id: 10,
    vendorName: "PT.Raline Shah Abadi",
    jumlahSurvey: 120,
    surveyOpen: 30,
    surveyTepatWaktu: 20,
    surveyDelay: 20,
    surveyTidakDikerjakan: 20,
    surveyManual: 20,
  },
];
const rowsPerPage = 10; // <--- init default rowsPerPage
function NumberVendor() {
  const classes = UseStyles();
  const page = new URLSearchParams(window.location.search).get("page");
  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);
  // INIT DATA REQUEST
  const defaultDataHit = {
    pageNumber: page || 0,
    dataPerPage: rowsPerPage,
    sortBy: "id",
    sortType: "ASC",
  };
  // =====> DATA TABLE  <=====
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [orderDirection, setOrderDirection] = useState("ASC");
  // const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  // LOADER LOAD DATA
  const [isLoadData, setIsLoadData] = useState(false);
  // set handler loader when call Approval API Service
  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }

  const [tabelData, setTabelData] = useState([]);
  const titleTable = [
    "Vendor Name",
    "Jumlah Survey",
    "Survey Open",
    "Survey Tepat Waktu",
    "Survey Delay",
    "Survey Tidak Dikerjakan",
    "Survey Manual"
  ];
  const valueType = ["string", "string", "string", "string", "string","string","string"];
  const isSort = [true, true, true, true, true,true,true];
  const columnNameVar = [
    "vendorName",
    "jumlahSurvey",
    "surveyOpen",
    "surveyTepatWaktu",
    "surveyDelay",
    "surveyTidakDikerjakan",
    "survey Manual"
  ];
  // HANDLER
  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }
  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal = columnNameVar[titleTable.indexOf(property)];
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
  function handleFilterSubmit(value){
    setResetPageCounter((prevCount)=>prevCount +1);
    if(value==null){
      setDataRequest(defaultDataHit)
    }else{
      setDataRequest({
        ...defaultDataHit,
        ...value,
      })
    }
  }
  function handleResetFilter(){
    setDataRequest({
      ...defaultDataHit,
    })
  }
  useEffect(() => {
    doGetNumberVendor(loadDataHandler,dataRequest).then((response)=>{
      console.log("++___iniResp",response)
       const dataRandom = [];
      if(response.data.responseCode == "00"){
        const dataRow = response.data.content;
        dataRow.map((item) => {
          const newRow = {
            vendorName: item.vendorName,
            jumlahSurvey: item.jumlahSurvey,
            surveyOpen: item.surveyOpen,
            surveyTepatWaktu: item.surveyTepatWaktu,
            surveyDelay: item.surveyDelay,
            surveyTidakDikerjakan: item.surveyTidakDikerjakan,
            surveyManual: item.surveyManual,
          };
          dataRandom.push(newRow);
        });
        setTabelData(dataRandom);
      }else{
        setTabelData([])
      }      
    });
  }, [dataRequest]);
  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid container>
          <Typography className={classes.title}>
            Jumlah Vendor Survey
          </Typography>
        </Grid>
        <div>
          <Grid container direction="column" justifyContent="space-between">
            <Grid item>
              <FilterData
                onFilterSubmit={handleFilterSubmit}
                isTable="status"
              />
            </Grid>
            <Grid item style={{ marginTop: -20 }}>
              <ChkyTablePagination
                data={tabelData}
                fields={titleTable}
                cellOption={valueType}
                changePage={handleChangePage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                isLoadData={isLoadData}
                isSort={isSort}
                isUsingMuiSort
                handleSort={handleSort}
                sortBy={sortBy}
                order={orderDirection}
              />
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default NumberVendor