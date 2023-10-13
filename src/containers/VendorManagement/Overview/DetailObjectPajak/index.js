import React,{useEffect,useState,useContext} from 'react'
import { withRouter,useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types'
import { Box, Grid, Typography, Tabs, Tab, Link, Paper} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import Constants from "../../../../helpers/constants";
import { Row } from 'antd/lib/grid';
import FilterData from './FilterData';
import TableCheckPagination from "../../../../components/chky/TableCheckPagination";
import { getSummaryNotExtend, getSummaryObjectPajak, getSummaryPajakTerbayar } from '../../ApiServices';
import useRupiahConverter from '../../../../helpers/useRupiahConverter';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  tabContent: {
    paddingTop: 10,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  tableContent: {
    marginTop: 20,
  },
  containerPaper: {
    backgroundColor: Constants.color.white,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginBottom: 40,
  },
  text12Normal: {
    fontSize: 12,
    fontWeight: 400,
  },
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  rootPaper: {
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    position: "relative",
    borderRadius: 10,
  },
  text12Bold: {
    fontSize: 12,
    fontWeight: "bold",
  },
  text12Italic: {
    fontSize: 12,
    fontWeight: 400,
    fontStyle: "italic",
  },
  filterContainer: { marginBottom: 15 },
});
// TABS PANEL COMPONENT
const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    position:"center",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 3,
    "& > span": {
      width: "100%",
      backgroundColor: Constants.color.primaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} style={{width:"100%"}} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(2),
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
}))((props) => <Tab  {...props} style={{width:"100%"}}/>);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
// END TABS PANEL COMPONENT
function DetailObjectPajak(props) {
  const classes = useStyles();
  const history = useHistory();
  // INIT TABLE
  const defaultType = "ASC";
  const defaultColumn = "id";
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const rowsPerPage = 10; // <--- init default rowsPerPage
  // INIT FILTER TABLE
  const [valueFilter, setValueFilter] = useState(titleTable);
  // RESET PAGE PAGINATION
  const [resetPageCounter, setResetPageCounter] = useState(0);
  // INIT DATA REQUEST
  const defaultDataHit = {
    sortType: defaultType,
    sortBy: defaultColumn,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
  };
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  // Init TABS Value
  const [valueTab, setValueTab] = useState(0);
  // INIT LOADING
  const [isLoading, setIsLoading] = useState(true); /* <------- loading Table */
  function loaderHandler(loaderValue) {
    setIsLoading(loaderValue);
  }
  // check url hash
  useEffect(() => {
    const windowsHash = window.location.hash;
    if (windowsHash) {
      switch (windowsHash) {
        case "#jlhObjectPajak":
          setValueTab(0);
          break;
        case "#jlhObjectExtend":
          setValueTab(1);
          break;
        case "#jlhObjectNotExtend":
          setValueTab(2);
          break;
        default:
          setValueTab(0);
      }
    } else {
      setValueTab(0);
    }
  }, [dataRequest]);
  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "jlhObjectPajak";
    }
    if (newValueTab === 1) {
      hashTab = "jlhObjectExtend";
    }
    if (newValueTab === 2) {
      hashTab = "jlhObjectNotExtend";
    }
    history.replace(`#${hashTab}`);
  };

  useEffect(() => {
    const fetchDataMaster = async () => {
      if (valueTab == 0) {
        hitDataObject();
      } else if (valueTab == 1) {
        hitDataTerbayar();
      } else if (valueTab == 2) {
        hitDataNotExtend();
      }
    };
    fetchDataMaster();
  }, [dataRequest]);
  useEffect(() => {
    setDataRequest(defaultDataHit);
  }, [valueTab]);
  //HitDiperpanjang
  const [dataDiperpanjang, setDataDiperpanjang] = useState([]);
  const hitDataTerbayar = () => {
    getSummaryPajakTerbayar(loaderHandler, dataRequest).then((response) => {
      try {
        const storePayment = [];
        if (response) {
          const resultData = response.data.overViewObjekPajakList;
          const { totalPages, totalElements } = response.data;
          setTotalRows(totalElements);
          setTotalPages(totalPages);
          resultData.map((data, index) => {
            storePayment.push({
              atmId: data.atmId,
              alamat: data.alamat,
              kondisiATM: data.kondisiAtm,
              nilaiPajak: data.nilaiPajak?useRupiahConverter(data.nilaiPajak): useRupiahConverter(0),
              status: data.status,
            });
          });
          setDataDiperpanjang(storePayment);
        } else {
          setDataDiperpanjang([]);
        }
      } catch (err) {
        console.log("~err", err);
        loaderHandler(false);
        alert(`Error Re-Construct Data..! \n ${err}`);
      }
    });
  };
  //HitObject
  const [dataObject, setDataObject] = useState([]);
  const hitDataObject = () => {
    getSummaryObjectPajak(loaderHandler, dataRequest).then((response) => {
      try {
        const storeObject = [];
        if (response) {
          const resultData = response.data.overViewObjekPajakList;
          const { totalPages, totalElements } = response.data;
          setTotalRows(totalElements);
          setTotalPages(totalPages);
          resultData.map((data, index) => {
            storeObject.push({
              atmId: data.atmId,
              alamat: data.alamat,
              kondisiATM: data.kondisiAtm,
              nilaiPajak: data.nilaiPajak?useRupiahConverter(data.nilaiPajak): useRupiahConverter(0),
              status: data.status,
            });
          });
          setDataObject(storeObject);
        } else {
          setDataObject([]);
        }
      } catch (err) {
        console.log("~err", err);
        loaderHandler(false);
        alert(`Error Re-Construct Data..! \n ${err}`);
      }
    });
  };
  //HitBelumDiperpanjang
  const [dataNotExtend, setDataNotExtend] = useState([]);
  const hitDataNotExtend = () => {
    getSummaryNotExtend(loaderHandler, dataRequest).then((response) => {
      try {
        const storeObject = [];
        if (response) {
          const resultData = response.data.overViewObjekPajakList;
          const { totalPages, totalElements } = response.data;
          setTotalRows(totalElements);
          setTotalPages(totalPages);
          resultData.map((data, index) => {
            storeObject.push({
              atmId: data.atmId,
              alamat: data.alamat,
              kondisiATM: data.kondisiAtm,
              nilaiPajak: data.nilaiPajak?useRupiahConverter(data.nilaiPajak): useRupiahConverter(0),
              status: data.status,
            });
          });
          setDataNotExtend(storeObject);
        } else {
          setDataNotExtend([]);
        }
      } catch (err) {
        console.log("~err", err);
        loaderHandler(false);
        alert(`Error Re-Construct Data..! \n ${err}`);
      }
    });
  };
  function handleChangePageValue(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  const handleSorting = (type, column) => {
    setDataRequest({
      ...dataRequest,
      sortType: type,
      sortBy: column,
    });
  };
function handleFilterSubmit(value) {
  // console.log(">>>>> FILTER DATA: ", JSON.stringify(value));
  // console.log(">>>>> FILTER DATA: ", JSON.stringify(dataRequest));
  setResetPageCounter((prevCount) => prevCount + 1);
  if (value === null) {
    setDataRequest(defaultDataHit);
  } else {
    setDataRequest({
      ...defaultDataHit,
      // // pageNumber: 0,
      // // dataPerPage: rowsPerPage,
      ...value,
    });
  }
}
  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Vendor Pajak</Typography>
        </Grid>
      </Grid>
      <div>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <ContentTabs
              value={valueTab}
              onChange={handleChangeTab}
              aria-label="full width tabs example"
              variant="fullWidth"
            >
              <ContentTab
                label="Jumlah Object Pajak"
                {...a11yProps(0)}
                //style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Jumlah Pajak Yang Sudah Diperpanjang"
                {...a11yProps(1)}
                //style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Jumlah Pajak Yang Belum Diperpanjang"
                {...a11yProps(2)}
                //style={{ minWidth: 100 }}
              />
            </ContentTabs>
          </Grid>
          {/*TAB CONTENT*/}
          <Grid item>
            <div className={classes.paperWrapper}>
              <Paper className={classes.rootPaper}>
                {valueTab == 0 ? (
                  <Typography style={{ fontSize: 17, fontWeight: 600 }}>
                    Jumlah Object Pajak
                  </Typography>
                ) : valueTab == 1 ? (
                  <Typography style={{ fontSize: 17, fontWeight: 600 }}>
                    Jumlah Object Pajak Diperpanjang
                  </Typography>
                ) : (
                  <Typography style={{ fontSize: 17, fontWeight: 600 }}>
                    Jumlah Object Pajak Belum Diperpanjang
                  </Typography>
                )}
                <Grid
                  container
                  direction="column"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <FilterData valueTab={valueTab} onFilterSubmit={handleFilterSubmit} valueFilter={valueFilter}/>
                  </Grid>
                  <Grid item>
                    {/*object*/}
                    <TabPanel
                      value={valueTab}
                      index={0}
                      className={classes.tabContent}
                    >
                      <TableCheckPagination
                        data={dataObject}
                        fields={titleTable}
                        cellOption={valueType}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        totalRows={totalRows}
                        changePage={handleChangePageValue}
                        resetPageCounter={resetPageCounter}
                        isWithCheck={false}
                        isLoadData={isLoading}
                        sorting={handleSorting}
                        isSort
                       
                      />
                    </TabPanel>
                    {/*Extend*/}
                    <TabPanel
                      value={valueTab}
                      index={1}
                      className={classes.tabContent}
                    >
                      <TableCheckPagination
                        data={dataDiperpanjang}
                        fields={titleTable}
                        cellOption={valueType}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        totalRows={totalRows}
                        changePage={handleChangePageValue}
                        resetPageCounter={resetPageCounter}
                        isWithCheck={false}
                        isLoadData={isLoading}
                        sorting={handleSorting}
                        isSort
                      
                      />
                    </TabPanel>
                    {/*NotExtend*/}
                    <TabPanel
                      value={valueTab}
                      index={2}
                      className={classes.tabContent}
                    >
                      <TableCheckPagination
                        data={dataNotExtend}
                        fields={titleTable}
                        cellOption={valueType}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        totalRows={totalRows}
                        changePage={handleChangePageValue}
                        resetPageCounter={resetPageCounter}
                        isWithCheck={false}
                        isLoadData={isLoading}
                        sorting={handleSorting}
                        isSort
                       
                      />
                    </TabPanel>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

DetailObjectPajak.propTypes = {}

export default DetailObjectPajak
const titleTable= [
  { id: "atmId", numeric: false, disablePadding: false, label: "ATM ID",typeColumn:"info" },
  { id: "alamat", numeric: false, disablePadding: false, label: "Alamat", typeColumn: "info" },
  { id: "kondisiAtm", numeric: false, disablePadding: false, label: "Kondisi ATM", typeColumn: "info" },
  { id: "nilaiPajak", numeric: false, disablePadding: false, label: "Nilai Pajak", typeColumn: "info" },
  { id: "status", numeric: false, disablePadding: false, label: "Status", typeColumn: "info" },
]
const valueType = ["string", "string", "string", "string", "object_pajak"];
const columnNameVar = ["atmID", "alamat", "kondisiATM", "nilaiPajak", "status"];

