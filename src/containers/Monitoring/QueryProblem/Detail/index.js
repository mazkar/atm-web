/* eslint-disable react/jsx-no-bind */
/* Third Party Import */
import React, {useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';

/* Internal Import */
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { ChkyTablePagination } from "../../../../components";
import {PrimaryHard, PrimaryUltrasoft} from "../../../../assets/theme/colors";
import { ReactComponent as UploadIcon } from "../../../../assets/icons/whiteIcons/upload.svg";
import FilterComponent from "../../../MediaPromosi/MediaPromosiQuality/common/FilterComponent";
import TableTemplate from "../common/TableTemplate/detail";
import ServiceQueryProblem from '../service';
import TableChips from '../../../../components/Chips/TableChips';

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
    backgroundColor: "#ffffff"
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "atmId",
  sortType: "ASC",
  lokasi: "all",
  flm: "all",
  slm: "all",
  jarkom: "all",
  kategori: "all",
  problem: "all",
  durasi: "all",
  downTime: "all",
  upTime: "all",
  startDate: "all",
  endDate: "all",
};

const itemSearch = [
  {text: "ID ATM", value: "atmId"},
  {text: "Location", value: "lokasi"},
  {text: "FLM", value: "flm"},
  {text: "SLM", value: "slm"},
  {text: "Jarkom", value: "jarkom"},
  {text: "Kategori Problem", value: "kategori"},
  {text: "Jenis Problem", value: "problem"},
  {text: "Duration", value: "durasi"},
  {text: "% Downtime", value: "downTime"},
  {text: "% Uptime", value: "upTime"},
  {text: "Status", value: "status"},
]

const QueryProblemDetail = () => {
  const classes = useStyles();

  // const tableData = [
  //   {
  //     id: "1222",
  //     location: "TGR-CRM-CBG-CLG",
  //     flm: "TAG",
  //     slm: "Datindo",
  //     jarkom: "Vsat Telkom",
  //     problemCategory: "Cash Out",
  //     typeCategory: "Casette 3 Not Configure",
  //     startDate: "01/05/2021, 07:30:00",
  //     endDate: "02/05/2021, 07:30:00",
  //     downtimeDuration: "30 Menit",
  //     downtimePercentage: "5%",
  //     uptimePercentage: "15%",
  //   },
  //   {
  //     id: "1232",
  //     location: "TGR-CRM-CBG-CLG",
  //     flm: "TAG",
  //     slm: "Telkom",
  //     jarkom: "Vsat Telkom",
  //     problemCategory: "Cash Out",
  //     typeCategory: "Casette 3 Not Configure",
  //     startDate: "01/05/2021, 07:30:00",
  //     endDate: "02/05/2021, 07:30:00",
  //     downtimeDuration: "30 Menit",
  //     downtimePercentage: "5%",
  //     uptimePercentage: "15%",
  //   }
  // ];

  // param
  const {id} = useParams()

  // service
  const { hitQueryProblemOverviewDetail, hitExportQueryProblem } = ServiceQueryProblem()

  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false)
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

  /* Methods */
  function handleFilterSubmit(value) {
    console.log(value) 
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
  }

  const loaderExport = (bool) => {
    setIsDisabled(bool)
  }

  function handleChangePage(newPage) {
    setTableConfig({
      dataRequest: {
        ...tableConfig.dataRequest,
        pageNumber: newPage
      }
    });
  }

  function handleSortTable(property) {
    return function actualFn(e) {
      const isActiveAndAsc = tableConfig.sortBy === property && tableConfig.orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVar[TableTemplate.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setTableConfig((prevValue) => ({
        ...prevValue,
        orderDirection: sortType,
        sortBy: property,
        dataRequest: {
          ...tableConfig.dataRequest,
          sortType,
          sortBy: sortByNewVal
        }
      }));
      setDataRequest({
        ...dataRequest,
        sortBy: sortByNewVal,
        sortType: sortType,
      })
    };
  }

  function handleResetFilter() {
    setIsFilterApplied(false);
    setDataRequest({
      ...defaultDataHit,
    });
  }

  const problemCategory = (param) => {
    switch (param) {
      case "CF":
        return "Card Reader"
        break;
      case "CO":
        return "Cash Out"
        break;
      case "LC":
        return "Lost Comm"
        break;
      case "SL":
        return "SLM"
        break;
      case "DF":
        return "Dispenser"
        break;
      case "EF":
        return "Encryptor"
        break;
      case "HW":
        return "Hardware"
        break;
      case "SP":
        return "Spv Mode"
        break;
      case "IM":
        return "Implementasi"
        break;
      case "IN":
        return "Insurance"
        break;
      case "JF":
        return "Journal"
        break;
      case "MT":
        return "Maintenance"
        break;
      case "MP":
        return "Media Promosi"
        break;
      case "PM":
        return "PM"
        break;
      case "RF":
        return "Receipt Printer"
        break;
      case "SC":
        return "Security"
        break;
      case "OT":
        return "Other"
        break;
    
      default:
        return param
        break;
    }
  }

  const getTimeDate = (timeDate) => {
    const date = new Date(timeDate).toLocaleDateString()
    const time = new Date(timeDate).toLocaleTimeString()
    return `${date}, ${time}`
  }

  const chipsHandler = (statusValue) => {
    if(!statusValue) return "-"
    const labelChips = ["Done", "Open", "On Progress"]
    const typeChips = ["success", "warning", "info"]

    return <TableChips label={labelChips[statusValue]} type={typeChips[statusValue]} />
  }

  useEffect(() => {
    hitQueryProblemOverviewDetail(dataRequest, id)
    .then((res) => {
      console.log(res)
      const {data} = res
      const dataToSet  = []
      data.queryProblemDetails.map((item) => {
        const newRow = {
          "atmId": item.atmId,
          "lokasi": item.lokasi,
          "flm": item.flm,
          "slm": item.slm,
          "jarkom": item.jarkom,
          "kategori": problemCategory(item.kategori),
          "problem": item.problem,
          "startDate": getTimeDate(item.startDate),
          "endDate": getTimeDate(item.endDate),
          "durasi": item.durasi,
          "downTime": item.downTime,
          "upTime": item.upTime,
          "status": chipsHandler(2)
      }
      dataToSet.push(newRow)
      })
      setTableData(dataToSet)
      setTableConfig({
        ...tableConfig,
        totalPages: data.totalPages,
        totalRows: data.totalElements,
      })
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setIsLoading(false)
    })

  }, [dataRequest])

  return (
    <div className={classes.root}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography className={classes.title}>
            Query Problem Detail
          </Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            className={`${classes.rootButton} ${classes.containedButton}`}
            label="Export to Excel"
            iconPosition="endIcon"
            buttonIcon={<UploadIcon width={18} height={18} />}
            disabled={isDisabled}
            onClick={() => hitExportQueryProblem(loaderExport, "", "atmId", "ASC", id)}
          />
        </Grid>
      </Grid>
      <FilterComponent onFilterSubmit={handleFilterSubmit} handleReset={handleResetFilter} itemSearch={itemSearch} />
      <ChkyTablePagination
        data={tableData}
        rowsPerPage={rowsPerPage}
        fields={TableTemplate.titleTable}
        cellOption={TableTemplate.valueType}
        isSort={TableTemplate.isSort}
        totalPages={tableConfig.totalPages}
        totalRows={tableConfig.totalRows}
        sortBy={tableConfig.sortBy}
        order={tableConfig.orderDirection}
        changePage={handleChangePage}
        handleSort={handleSortTable}
        isLoadData={isLoading}
        isUsingMuiSort
      />
    </div>
  );
};

export default QueryProblemDetail;
