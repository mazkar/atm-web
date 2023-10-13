/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-no-bind */
/* Third Party Import */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  IconButton,
  Collapse,
  Checkbox,
  FormControl,
  FormControlLabel,
  Chip,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
} from "@material-ui/core";
import { DatePicker } from "antd";
import ArrowDown from "@material-ui/icons/KeyboardArrowDownOutlined";
import ArrowUp from "@material-ui/icons/KeyboardArrowUpOutlined";

/* Internal Import */
import dummyData from "./common/dummyData";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import MuiButton from "../../../components/Button/MuiButton";
import LabelTextField from "../../../components/Form/LabelTextField";
import { ChkyTabsAsOption } from "../../../components/chky";
import { ReactComponent as UploadIcon } from "../../../assets/icons/whiteIcons/upload.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/icons/linear-red/calendar.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/linear-red/search.svg";
import { PrimaryHard, PrimaryUltrasoft } from "../../../assets/theme/colors";
import ServiceEsqFaultAnalyzer from "./Service";
import AutoCompleteByAtmId from "../../../components/AutoCompleteByAtmId";
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
  },
  rootButton: {
    width: "max-content",
    height: 40,
    borderRadius: 10,
    textTransform: "capitalize",
    boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
  },
  containedButton: {
    color: "#ffffff",
    backgroundColor: PrimaryHard,
  },
  outlinedButton: {
    border: "1px solid",
    borderColor: PrimaryHard,
    color: PrimaryHard,
    backgroundColor: "#ffffff",
  },
  customWrapper: {
    background: "#ffffff",
    borderRadius: "6px",
    padding: "16px 20px",
    marginBottom: "24px",
  },
  datePicker: {
    height: "40px",
    borderRadius: "6px",
    border: "1px solid #BCC8E7",
    width: "100%",
    "& .ant-picker-input > input::placeholder": {
      color: "#BCC8E7",
      fontStyle: "italic",
      textOverflow: "ellipsis !important",
      fontSize: 12,
    },
  },
  listItem: {
    "&.Mui-selected": {
      backgroundColor: PrimaryUltrasoft,
    },
    "&.Mui-selected:hover": {
      backgroundColor: PrimaryUltrasoft,
    },
  },
  tableGridRoot: {
    display: "grid",
  },
  tableGridDaily: {
    gridTemplateColumns: "50px repeat(4, 250px) repeat(37, 80px);",
  },
  tableGridMonthly: {
    gridTemplateColumns: "50px repeat(4, 250px) repeat(16, 80px);",
  },
  tableCell: {
    borderBottom: "1px solid rgba(188, 200, 231, 0.4)",
    whiteSpace: "nowrap",
    padding: "10px",
  },
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

const EsqFaultAnalyzer = () => {
  const classes = useStyles();
  const {
    hitSummaryEsqFaultAnalyzer,
    hitFilterEsqFaultAnalyzer,
    hitDetailEsqAnalyzer,
    hitExportEsqFaultAnalizer,
  } = ServiceEsqFaultAnalyzer();
  const [filterId, setFilterId] = useState(false);
  const [filterDate, setFilterDate] = useState(false);
  const [listATM, setListATM] = useState(null);
  const [listTableBody, setListTableBody] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  /* ATM ID State */
  const [listAtmId, setListAtmId] = useState(null);
  const [selectedAtmId, setSelectedAtmId] = useState(null);

  // Header State
  const [headerState, setHeaderState] = useState([]);
  const [headerStateMonthly, setHeaderStateMonthly] = useState([]);

  // disabled button export
  const [isDisabledExport, setIsDisabledExport] = useState(false);

  // Header Pivot Table
  const headerPivotTable = (range) => {
    const header = ["", "Problem", "FLM", "SLM", "Jarkom"];

    for (let i = 1; i <= range; i++) {
      header.push(`Tgl ${i}`);
    }

    const additionalHeader = ["Total Prob", "Avg Prob", "Max", "Min"];

    for (let i = 0; i < additionalHeader.length; i++) {
      header.push(additionalHeader[i]);
    }

    return header;
  };

  // Header Pivot Table with Filter Date
  const headerPivotTableWithDate = (startDate, endDate) => {
    const header = ["", "Problem", "FLM", "SLM", "Jarkom"];
    const firstSlice = new Date(startDate).getDate() + 1;
    const endSlice = new Date(endDate).getDate() + 1;
    const maxLoop = endSlice - firstSlice;
    for (let i = firstSlice; i <= maxLoop + firstSlice; i++) {
      header.push(`Tgl ${i}`);
    }

    const additionalHeader = ["Total Prob", "Avg Prob", "Max", "Min"];

    for (let i = 0; i < additionalHeader.length; i++) {
      header.push(additionalHeader[i]);
    }

    return header;
  };

  const headerPivotTableMonthly = (range) => {
    const header = ["", "Problem", "FLM", "SLM", "Jarkom"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    for (let i = 0; i < range; i++) {
      header.push(months[i]);
    }
    const additionalHeader = ["Total Prob", "Avg Prob", "Max", "Min"];
    for (const item of additionalHeader) {
      header.push(item);
    }
    return header;
  };

  /* Filter State */
  const [filter, setFilter] = useState({
    id: "",
    atmId: "",
    startDate: "",
    endDate: "",
    pivot: [],
  });

  // fetching Data SummaryEsqFaultAnalyzer
  const fetchDataSummaryEsqFaultAnalyzer = async () => {
    await hitSummaryEsqFaultAnalyzer(0, 10, "id", "ASC")
      .then((res) => {
        if (res.status === 200) {
          setListATM(res.data.content);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // fetching Data DetailEsqFaultAnalyzer
  const fetchDataDetailEsqFaultAnalyzer = async (id) => {
    await hitDetailEsqAnalyzer(id)
      .then((res) => {
        if (res.status === 200) {
          setListATM([res.data.information]);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Convert response pivot to UI Table
  const convertResToTable = (response) => {
    const arr = [];

    response.problem.map((item) => {
      const obj = {};
      const arrProblem = [];
      const arrForReduce = [];
      obj.problem = item.name;
      obj.flm = response.flm;
      obj.slm = response.slm;
      obj.jarkom = response.jarkom;
      item.dataProblem.map((item2) => {
        const objProblem = {};
        const arrReduceProblem = [];
        objProblem.problem = item2.name;
        objProblem.flm = response.flm;
        objProblem.slm = response.slm;
        objProblem.jarkom = response.jarkom;
        item2.totalProblem.map((item3, index) => {
          objProblem[`date ${index + 1}`] = item3;
          arrReduceProblem.push(item3);
        });
        objProblem.totalProb = arrReduceProblem.reduce(
          (prev, total) => total + prev
        );
        const average = objProblem.totalProb / arrReduceProblem.length;
        objProblem.avgProb = average.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        });
        objProblem.max = Math.max(...arrReduceProblem);
        objProblem.min = Math.min(...arrReduceProblem);
        arrProblem.push(objProblem);
      });
      obj.detail = arrProblem;
      if (item.dataProblem.length > 0) {
        item.dataProblem[0].totalAllProblem.map((item4, index) => {
          obj[`date ${index + 1}`] = item4;
          arrForReduce.push(item4);
        });
        obj.totalProb = arrForReduce.reduce((prev, total) => total + prev);
        const average = obj.totalProb / arrForReduce.length;
        obj.avgProb = average.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        });
        obj.max = Math.max(...arrForReduce);
        obj.min = Math.min(...arrForReduce);
      }
      arr.push(obj);
    });
    return arr;
  };

  // Convert response pivot to UI Table with date filter
  const convertResToTableWithDate = (startDate, endDate, response) => {
    const firstSlice = new Date(startDate).getDate() - 1;
    const lastSlice = new Date(endDate).getDate();

    const startMonth = new Date(startDate).getMonth();
    const endMonth = new Date(endDate).getMonth();

    if (startMonth !== endMonth)
      return "startDate and endDate must be in the same month";

    const arrRes = [];

    response.problem.map((item) => {
      const obj = {};
      const arrProblem = [];
      const arrForReduce = [];
      obj.problem = item.name;
      obj.flm = response.flm;
      obj.slm = response.slm;
      obj.jarkom = response.jarkom;
      item.dataProblem.map((item2) => {
        const objProblem = {};
        const arrReduceProblem = [];
        objProblem.problem = item2.name;
        objProblem.flm = response.flm;
        objProblem.slm = response.slm;
        objProblem.jarkom = response.jarkom;
        const slicedTotalProblem = item2.totalProblem.slice(
          firstSlice,
          lastSlice
        );
        slicedTotalProblem.map((item3, index) => {
          objProblem[`date ${index + 1}`] = item3;
          arrReduceProblem.push(item3);
        });
        objProblem.totalProb = arrReduceProblem.reduce(
          (prev, total) => total + prev
        );
        const average = objProblem.totalProb / arrReduceProblem.length;
        objProblem.avgProb = average.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        });
        objProblem.max = Math.max(...arrReduceProblem);
        objProblem.min = Math.min(...arrReduceProblem);
        arrProblem.push(objProblem);
      });
      obj.detail = arrProblem;
      if (item.dataProblem.length > 0) {
        const slicedTotalAllProblem = item.dataProblem[0].totalAllProblem.slice(
          firstSlice,
          lastSlice
        );
        slicedTotalAllProblem?.map((item4, index) => {
          obj[`date ${index + 1}`] = item4;
          arrForReduce.push(item4);
        });
        // const maxLoop = lastSlice - firstSlice
        // for(let i = firstSlice; i <= (maxLoop + firstSlice); i++ ){
        //   obj[`date ${i}`] = slicedTotalAllProblem[i - 1]
        //   arrForReduce.push(slicedTotalAllProblem[i - 1])
        // }
        obj.totalProb = arrForReduce.reduce((prev, total) => total + prev);
        const average = obj.totalProb / arrForReduce.length;
        obj.avgProb = average.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        });
        obj.max = Math.max(...arrForReduce);
        obj.min = Math.min(...arrForReduce);
      }
      arrRes.push(obj);
    });

    return arrRes;
  };

  // fething Data FilterEsqFaultAnalyzer
  const fetchDataFilterEsqFaultAnalyzer = async (tab, atmId, category) => {
    await hitFilterEsqFaultAnalyzer("monthly", atmId, category)
      .then((res) => {
        console.log(res);
        if (!filter.startDate && !filter.endDate) {
          setHeaderState(
            headerPivotTable(
              res.data?.problem[0]?.dataProblem[0]?.totalAllProblem?.length
            )
          );
          setTableAtmId(convertResToTable(res?.data));
        }
        if (filter.startDate && filter.endDate) {
          setHeaderState(
            headerPivotTableWithDate(filter.startDate, filter.endDate)
          );
          setTableAtmId(
            convertResToTableWithDate(
              filter.startDate,
              filter.endDate,
              res?.data
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await hitFilterEsqFaultAnalyzer("yearly", atmId, category)
      .then((res) => {
        setHeaderStateMonthly(
          headerPivotTableMonthly(
            res.data?.problem[0]?.dataProblem[0]?.totalAllProblem?.length
          )
        );
        setTableAtmIdMonthly(convertResToTable(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setIsLoadingTable(false);
    }, 1000);
  };

  // Auto Complete
  const handleChangeAutoComplete = (e) => {
    if (e?.value) {
      console.log(e.value);
      setFilter({ ...filter, atmId: e.value });
    } else {
      setFilter({ ...filter, atmId: "" });
    }
  };

  // onclick apply filter
  const handleApplyFilter = async () => {
    setIsLoading(true);
    if (filter.atmId) {
      await hitSummaryEsqFaultAnalyzer(0, 10000, "id", "ASC")
        .then(async (res) => {
          if (res.status === 200) {
            const { content } = res.data;
            const getId = content.find((x) => x.atmId == filter.atmId);
            console.log(getId);
            setFilter({ ...filter, id: getId.id });
            await fetchDataDetailEsqFaultAnalyzer(getId.id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else alert("silahkan lakukan pencarian ATM ID terlebih dahulu!");
    // else await fetchDataSummaryEsqFaultAnalyzer()
    setIsLoading(false);
  };

  /* Pivot Filter State & Static Data */
  const [isExpanded, setIsExpanded] = useState(false);
  const [listCheckbox, setListCheckbox] = useState(dummyData.arrayCheckbox);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const column = 4;
  const rowLength = Math.ceil(dummyData.arrayCheckbox.length / column);
  let anchor = 0; // <-- Anchor for looping checkbox

  /* Detail ATM ID State */
  const [currentTab, setCurrentTab] = useState(0);
  const [tableAtmId, setTableAtmId] = useState(null);
  const [tableAtmIdMonthly, setTableAtmIdMonthly] = useState(null);

  /* Method */
  function handleChangeFilter(event, key) {
    setFilter((prevValue) => {
      return {
        ...prevValue,
        [key]: event,
      };
    });
  }

  function handleCheckbox(event) {
    const key = event.target.name;
    const value = event.target.checked;

    const tempArray = [...listCheckbox];
    const newArray = tempArray.map((object) =>
      object.name === key ? { ...object, isChecked: value } : object
    );
    console.log(event.target.checked);
    setListCheckbox(newArray);
  }

  function handleDelete(name) {
    const tempArray = [...listCheckbox];
    const newArray = tempArray.map((object) =>
      object.name === name ? { ...object, isChecked: false } : object
    );

    setListCheckbox(newArray);
  }

  function handleCheckboxAll(event) {
    const value = event.target.checked;
    setIsCheckedAll(value);

    const tempArray = [...listCheckbox];
    const newArray = tempArray.map((object) => {
      return {
        ...object,
        isChecked: value,
      };
    });
    setListCheckbox(newArray);
  }

  function handleReset() {
    const tempArray = [...listCheckbox];
    const newArray = tempArray.map((object) => {
      return {
        ...object,
        isChecked: false,
      };
    });
    console.log(newArray);
    setListCheckbox(newArray);
    setIsCheckedAll(false);
    setTableAtmId(null);
    setTableAtmIdMonthly(null);
  }

  function handleApply() {
    const filterCategory = listCheckbox.filter((x) => x.isChecked == true);

    if (filterCategory.length < 1)
      return alert("Pivot Category harus memiliki minimal 1 checklist!");
    setTableAtmId(null);
    setTableAtmIdMonthly(null);
  }

  function handleExpand() {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }

  const handleListItemClick = async (event, object, index) => {
    const filterCheckbox = listCheckbox.filter((x) => x.isChecked == true);
    if (filterCheckbox.length > 0) {
      setIsLoadingTable(true);
      const tempObject = { ...object };
      const newObject = {
        name: `${tempObject?.atmId} - ${tempObject?.location}`,
        index,
      };
      setSelectedAtmId(newObject);
      console.log(newObject);

      const filterCategory = listCheckbox.filter((x) => x.isChecked == true);

      const arrCategory = [];

      filterCategory.map((item) => {
        arrCategory.push(item.value);
      });

      if (!currentTab) {
        await fetchDataFilterEsqFaultAnalyzer(
          "monthly",
          tempObject?.atmId,
          arrCategory
        );
      } else {
        await fetchDataFilterEsqFaultAnalyzer(
          "yearly",
          tempObject?.atmId,
          arrCategory
        );
      }
    } else alert("Pivot Category harus memiliki minimal 1 checklist!");
  };

  function handleChangeTab(event) {
    setCurrentTab(event);
  }

  const exportToExcel = async () => {
    let monthly;
    let yearly;
    if (!currentTab) {
      monthly = true;
      yearly = false;
    } else {
      monthly = false;
      yearly = true;
    }

    if (!filter.id) return alert("filter ATM ID harus di isi");

    setIsDisabledExport(true);

    return await hitExportEsqFaultAnalizer(filter.id, monthly, yearly)
      .then((res) => {
        console.log(res);
        setIsDisabledExport(false);
      })
      .catch((err) => {
        console.log(err);
        setIsDisabledExport(false);
      });
  };

  /* Functional Component */
  const RedCheckbox = withStyles({
    root: {
      color: "#DC241F",
      "&$checked": {
        color: "#DC241F",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const EmptyState = () => (
    <div style={{ textAlign: "center" }}>
      <SearchIcon />
      <Typography
        style={{
          fontFamily: "Barlow",
          fontWeight: 500,
          fontSize: "15px",
          textAlign: "center",
        }}
      >
        Silahkan lakukan pencarian ATM ID dan pilih tanggal terlebih dahulu
      </Typography>
    </div>
  );

  /*
  Expanded Row Component

  This expanded row component styled by "tableGridDaily" (for daily table)
  and "tableGridMonthly" (for monthly table).
  */
  const Row = ({ row }) => {
    const [open, setOpen] = useState(false);

    const problemCategory = (param) => {
      switch (param) {
        case "CF":
          return "Card Reader";
          break;
        case "CO":
          return "Cash Out";
          break;
        case "LC":
          return "Lost Comm";
          break;
        case "SL":
          return "SLM";
          break;
        case "DF":
          return "Dispenser";
          break;
        case "EF":
          return "Encryptor";
          break;
        case "HW":
          return "Hardware";
          break;
        case "SP":
          return "Spv Mode";
          break;
        case "IM":
          return "Implementasi";
          break;
        case "IN":
          return "Insurance";
          break;
        case "JF":
          return "Journal";
          break;
        case "MT":
          return "Maintenance";
          break;
        case "MP":
          return "Media Promosi";
          break;
        case "PM":
          return "PM";
          break;
        case "RF":
          return "Receipt Printer";
          break;
        case "SC":
          return "Security";
          break;
        case "OT":
          return "Other";
          break;

        default:
          return param;
          break;
      }
    };

    return (
      <>
        <div
          className={`${classes.tableGridRoot} ${
            !currentTab ? classes.tableGridDaily : classes.tableGridMonthly
          }`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <ArrowUp /> : <ArrowDown />}
            </IconButton>
          </div>
          {Object.keys(row).map(
            (object, index) =>
              object !== "detail" &&
              row[object] !== "" && (
                <div className={classes.tableCell}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      textAlign: index < 5 ? "left" : "center",
                    }}
                  >
                    {problemCategory(row[object])}
                  </Typography>
                </div>
              )
          )}
        </div>
        <Collapse in={open} timeout="auto" unmountOnExit component="div">
          {row.detail.map((detailRow) => (
            <div
              className={`${classes.tableGridRoot} ${
                !currentTab ? classes.tableGridDaily : classes.tableGridMonthly
              }`}
            >
              <div />
              {Object.keys(detailRow).map((object, index) => (
                <div className={classes.tableCell}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      textAlign: index < 4 ? "left" : "center",
                    }}
                  >
                    {detailRow[object]}
                  </Typography>
                </div>
              ))}
            </div>
          ))}
        </Collapse>
      </>
    );
  };
  Row.propTypes = {
    row: PropTypes.object.isRequired,
  };

  const TableDaily = () => {
    return (
      <div style={{ width: "100%", overflowX: "auto" }}>
        <div className={`${classes.tableGridRoot} ${classes.tableGridDaily}`}>
          {headerState.map((header, index) => (
            <div className={classes.tableCell}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  textAlign: index < 5 ? "left" : "center",
                }}
              >
                {header}
              </Typography>
            </div>
          ))}
        </div>
        {tableAtmId?.map((row) => (
          <Row row={row} />
        ))}
      </div>
    );
  };

  const TableMonthly = () => {
    return (
      <div style={{ width: "100%", overflowX: "auto" }}>
        <div className={`${classes.tableGridRoot} ${classes.tableGridMonthly}`}>
          {headerStateMonthly.map((header, index) => (
            <div className={classes.tableCell}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  textAlign: index < 5 ? "left" : "center",
                }}
              >
                {header}
              </Typography>
            </div>
          ))}
        </div>
        {tableAtmIdMonthly?.map((row) => (
          <Row row={row} />
        ))}
      </div>
    );
  };

  const DetailTable = () => (!currentTab ? <TableDaily /> : <TableMonthly />);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <Grid item>
          <Typography className={classes.title}>ESQ Fault Analyzer</Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            className={`${classes.rootButton} ${classes.containedButton}`}
            label="Export to Excel"
            iconPosition="endIcon"
            buttonIcon={<UploadIcon width={18} height={18} />}
            disabled={isDisabledExport}
            onClick={exportToExcel}
          />
        </Grid>
      </Grid>

      {/* Filter */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.customWrapper}
      >
        <Grid item>
          <Grid container alignItems="center" style={{ flexWrap: "nowrap" }}>
            <Typography
              style={{
                fontFamily: "Barlow",
                fontWeight: 500,
                fontSize: "16px",
                marginRight: "20px",
              }}
            >
              Show:
            </Typography>
            {/* Atm ID Search */}
            <Grid
              container
              style={{ flexWrap: "nowrap", marginRight: "20px" }}
              alignItems="center"
            >
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontWeight: 400,
                  fontSize: "13px",
                  marginRight: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                ATM ID
              </Typography>
              {/* <LabelTextField
                placeholder="ATM ID"
                onChange={(newVal) => handleChangeFilter(newVal.target.value, "id")}
                value={filter.id}
                height="40px"
              /> */}
              <AutoCompleteByAtmId
                placeholder={"ATM ID"}
                onChange={handleChangeAutoComplete}
                onSubmit={handleChangeAutoComplete}
              />
            </Grid>

            {/* Datepicker Filter */}
            <Grid container style={{ flexWrap: "nowrap" }} alignItems="center">
              <DatePicker
                format="DD/MM/YYYY"
                popupStyle={{ zIndex: 1500 }}
                allowClear={false}
                suffixIcon={<CalendarIcon />}
                className={classes.datePicker}
                onChange={(newVal) => handleChangeFilter(newVal, "startDate")}
                value={filter.startDate}
              />
              <Typography style={{ margin: "0px 12px" }}>-</Typography>
              <DatePicker
                format="DD/MM/YYYY"
                popupStyle={{ zIndex: 1500 }}
                allowClear={false}
                suffixIcon={<CalendarIcon />}
                className={classes.datePicker}
                onChange={(newVal) => handleChangeFilter(newVal, "endDate")}
                value={filter.endDate}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <MuiButton
            className={`${classes.rootButton} ${classes.containedButton}`}
            label="Apply"
            height="40px"
            onClick={handleApplyFilter}
          />
        </Grid>
      </Grid>

      {/* Pivot Filter */}
      <div className={classes.customWrapper}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ flexWrap: "nowrap" }}
        >
          <Grid container>
            <Typography
              style={{
                fontWeight: 600,
                fontFamily: "Barlow",
                fontSize: "13px",
                marginRight: "10px",
              }}
            >
              Pivot:
            </Typography>
            {listCheckbox.map((chip) => {
              if (chip.isChecked) {
                return (
                  <Chip
                    variant="outlined"
                    label={chip.name}
                    size="small"
                    onDelete={() => handleDelete(chip.name)}
                    style={{
                      color: "#8D98B4",
                      fontStyle: "italic",
                      margin: "0px 5px",
                    }}
                  />
                );
              }
              return "";
            })}
          </Grid>
          <IconButton small onClick={handleExpand}>
            {isExpanded ? <ArrowUp /> : <ArrowDown />}
          </IconButton>
        </Grid>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <div>
            <Grid container spacing={2}>
              {/* Divide checkbox rendering in several columns */}
              {Array.from(Array(column)).map((x, index) => {
                const start = anchor;
                const end = start + rowLength;
                anchor = end;
                return (
                  <Grid item xs={2}>
                    <FormControl>
                      {listCheckbox.slice(start, end).map((checkbox) => {
                        return (
                          <FormControlLabel
                            control={
                              <RedCheckbox
                                checked={checkbox.isChecked}
                                onChange={handleCheckbox}
                                name={checkbox.name}
                              />
                            }
                            label={checkbox.name}
                            value={checkbox.name}
                          />
                        );
                      })}
                    </FormControl>
                  </Grid>
                );
              })}
              <Grid item xs={2}>
                <FormControl>
                  <FormControlLabel
                    control={
                      <RedCheckbox
                        checked={isCheckedAll}
                        onChange={handleCheckboxAll}
                      />
                    }
                    label="Check All"
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  alignSelf: "end",
                  alignItems: "end",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MuiButton
                  className={`${classes.rootButton} ${classes.outlinedButton}`}
                  style={{
                    marginBottom: "10px",
                    padding: "0px 24px",
                    textAlign: "right",
                  }}
                  label="Reset"
                  height="40px"
                  onClick={handleReset}
                />
                <MuiButton
                  className={`${classes.rootButton} ${classes.containedButton}`}
                  style={{ padding: "0px 24px", textAlign: "right" }}
                  label="Apply"
                  height="40px"
                  onClick={handleApply}
                />
              </Grid>
            </Grid>
          </div>
        </Collapse>
      </div>

      {/* Table */}
      <Grid container style={{ flexWrap: "nowrap" }} alignItems="start">
        <Grid
          item
          xs={3}
          className={`${classes.customWrapper}`}
          style={{ marginRight: "20px", height: listAtmId ? "100%" : "50vh" }}
        >
          <Typography
            style={{ fontFamily: "Barlow", fontWeight: 600, fontSize: "13px" }}
          >
            ATM ID
          </Typography>
          {isLoading ? (
            <div className={classes.loaderWrapper}>
              <LoadingView maxheight="100%" isTransparent />
            </div>
          ) : (
            <>
              {listATM ? (
                <List
                  component="nav"
                  style={{ maxHeight: "100%", overflow: "auto" }}
                >
                  {listATM.map((item, index) => (
                    <ListItem
                      className={classes.listItem}
                      button
                      selected={selectedAtmId && selectedAtmId.index === index}
                      onClick={(event) =>
                        handleListItemClick(event, item, index)
                      }
                    >
                      <ListItemText
                        primary={`ATM ${item?.atmId} - ${item?.location}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <EmptyState />
                </div>
              )}
            </>
          )}
        </Grid>
        <Grid
          item
          xs={9}
          className={`${classes.customWrapper}`}
          style={{ height: tableAtmId ? "auto" : "50vh" }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            style={{ marginBottom: "20px" }}
          >
            <Grid item>
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                ATM ID: {selectedAtmId ? selectedAtmId.name : "-"}
              </Typography>
            </Grid>
            <Grid item>
              <ChkyTabsAsOption
                currentTab={currentTab}
                handleChangeTab={handleChangeTab}
                dataTab={dummyData.dataTab}
              />
            </Grid>
          </Grid>
          {isLoadingTable ? (
            <div className={classes.loaderWrapper}>
              <LoadingView maxheight="100%" isTransparent />
            </div>
          ) : (
            <>
              {tableAtmId ? (
                <DetailTable />
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EmptyState />
                </div>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default EsqFaultAnalyzer;

// {listATM ?
//   <>
//   {isLoading ? (
//   <div className={classes.loaderWrapper}>
//     <LoadingView maxheight="100%" isTransparent />
//   </div>
//   ) : (
//     <List component="nav" style={{maxHeight: '100%', overflow: 'auto'}} >
//       {listATM.map((item, index) => (
//         <ListItem
//           className={classes.listItem}
//           button
//           selected={selectedAtmId && selectedAtmId.index === index}
//           onClick={(event) => handleListItemClick(event, item, index)}
//         >
//           <ListItemText primary={`ATM ${item?.atmId} - ${item?.location}`} />
//         </ListItem>
//       ))}
//     </List>
//   )}
//   </>
//     : <div style={{height: "100%", display: "flex", alignItems: "center"}}>
//       <EmptyState />
//     </div>
//   }

/*

{isLoading ? (
  <div className={classes.loaderWrapper}>
    <LoadingView maxheight="100%" isTransparent />
  </div>
) : (
  <>
    {listATM ? (
      <List component="nav" style={{maxHeight: '100%', overflow: 'auto'}} >
        {listATM.map((item, index) => (
          <ListItem
            className={classes.listItem}
            button
            selected={selectedAtmId && selectedAtmId.index === index}
            onClick={(event) => handleListItemClick(event, item, index)}
          >
            <ListItemText primary={`ATM ${item?.atmId} - ${item?.location}`} />
          </ListItem>
        ))}
      </List>
    ) : (
      <div style={{height: "100%", display: "flex", alignItems: "center"}}>
        <EmptyState />
      </div>
    )}
  </>
)}

*/
