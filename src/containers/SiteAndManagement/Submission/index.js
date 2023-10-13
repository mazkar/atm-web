/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable import/named */
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Link,
} from "@material-ui/core";
import axios from "axios";
import { ChkyTablePagination } from "../../../components/chky";
import FilterSubmission from "./SubmissionFilter";
import ModalUpdateNew from "./ModalAction/ModalUpdateNew";
import ModalUpdateTermin from "./ModalAction/ModalUpdateTermin";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import constants from "../../../helpers/constants";
import SubmissionStatus from "./SubmissionStatus";
import ModalUpdateReplace from './ModalAction/ModalUpdateReplace';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: constants.color.dark,
  },
});

const matchRoleName = (value) => {
  if (value) {
    const result = value.toLowerCase().match(/planning/g) || [];
    if (result.length) {
      return result[0];
    } else {
      return value;
    }
  }
};

const Submission = () => {
  const roleName = window.sessionStorage.getItem("roleName");
  const classes = useStyles();
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataSubmission, setDataSubmission] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [selectedRow, setSelectedRow] = useState("");
  // const [selectedLoc, setSelectedLoc] = useState('');
  // const [selectedArea, setSelectedArea] = useState(2);
  // const [areaName, setAreaName] = useState('Central');
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0)

  const [dataFilter, setDataFilter] = useState({
    provinceId: "All",
    cityId: "All",
    districtId: "All",
    status: "All",
    location: "",
  });

  function handleFilterSubmit(filterNewValue) {
    // alert('Apply Filter Clicked!');
    // console.log(`===> Data Filter : ${JSON.stringify(filterNewValue)}`);
    if (filterNewValue === null) {
      setDataFilter({
        provinceId: "All",
        cityId: "All",
        districtId: "All",
        status: "All",
        location: "",
      });
    } else {
      setDataFilter(filterNewValue);
    }
    setCurrentPage(0);
    setResetPageCounter(c=>c+1)
  }

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  // MODAL UPDATE //
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalUpdateTermin, setOpenModalUpdateTermin] = useState(false);
  const [isOpenModalReplace, setIsOpenModalReplace] = useState(false)
  const handleOpenModalUpdateTermin = () => setOpenModalUpdateTermin(true);
  const handleCloseModalUpdateTermin = () => setOpenModalUpdateTermin(false);
  const handleOpenModalUpdate = () => setOpenModalUpdate(true);
  const handleCloseModalUpdate = () => setOpenModalUpdate(false);

  const handleModalUpdate = (id) => {
    // alert('Update is Clicked!');
    setSelectedRow(id);
    handleOpenModalUpdate();
    // console.log(selectedRow, "selectedrow");
    // console.log(selectedLoc, "select Location");
  };

  const handleModalUpdateTermin = (id) => {
    // alert('Update is Clicked!');
    setSelectedRow(id);
    handleOpenModalUpdateTermin();
    // console.log(selectedRow, "selectedrow");
    // console.log(selectedLoc, "select Location");
  };

  const handleModalUpdateReplace = (id) => {
    // alert('Update is Clicked!');
    setSelectedRow(id);
    setIsOpenModalReplace(true);
  };

  const handleModalRbbArea = (id) => {
    handleOpenModalArea();
  };

  function isEmpty(obj) {
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
    return true;
  }

  function replaceChar(atmId, locationId) {
    if (atmId !== null) {
      const strId = atmId;
      const result = strId.replace("#", "");
      return result;
    }
    if (atmId == null) {
      // const stringId = isEmpty(atmId) ? "N-A" : atmId;
      // return stringId;
      return locationId;
    }
  }

  const handleClickSubmit = (type, id, atmId, locationId) => {
    if (type === "New ATM") {
      window.location.assign(
        `/submission-detail-new/${id}/${replaceChar(atmId, locationId)}`
      );
    } else if (type === "Renewal") {
      window.location.assign(
        `/submission-detail-renewal/${id}/${replaceChar(atmId)}`
      );
    } else if (type === "Termin") {
      window.location.assign(
        `/submission-detail-termin/${id}/${replaceChar(atmId)}`
      );
    } else if (type === "Replace") {
      window.location.assign(
        `/submission-detail-replace/${id}`
      );
    } else if (type === "Migration") {
      window.location.assign(
        `/submission-detail-migration/${id}/${replaceChar(atmId)}`
      );
    } else {
      window.location.assign(
        `/submission-detail-new/${id}/${replaceChar(atmId, locationId)}`
      );
    }
  };

  let titleTable = [];
  let valueType = [];

  if (matchRoleName(roleName) !== "planning") {
    titleTable = [
      "ATM ID",
      "Location",
      "ID Requester",
      "Requester",
      "Type",
      "Machine Type",
      "SLA",
      "Status",
      "",
      "",
    ];
    valueType = [
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "child",
      "child",
      "modal",
    ];
  } else {
    titleTable = [
      "ATM ID",
      "Location",
      "ID Requester",
      "Requester",
      "Type",
      "Machine Type",
      "SLA",
      "Status",
      "",
    ];
    valueType = [
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "child",
      "modal",
    ];
  }

  const isSort=[true, true, true, true, true, true, true, true]

  const colNameVarArr = [
    'atmId', 
    'location',
    'locationId',
    'requester',
    'openingType',
    'machineType',
    'dueDate',
    'submissionStatus',
  ]

  const dataToSet = [];
  const fetchData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: {},
    };

    const data = {
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      provinceId: dataFilter.provinceId,
      cityId: dataFilter.cityId,
      districtId: dataFilter.districtId,
      submissionStatus: dataFilter.status,
      location: dataFilter.location,
      type: dataFilter.type,
      approval: matchRoleName(roleName) == "planning" ? true : false,
      ...(orderBy && {orderBy, orderDirection})
    };

    try {
      setModalLoader(true);
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getSubmission`,
        data,
        config
      );
      // const result = await axios(
      //   `https://atm-biz-siab.getsandbox.com:443/sitemanagement/submissiontracking`,
      //   config
      // );
      try {
        const dataNew = result.data.content;
        setTotalPages(result.data.totalPages);
        setTotalRows(result.data.totalElements);
        // eslint-disable-next-line array-callback-return
        dataNew.map((row) => {
          const actionSubmit = [
            {
              name:
                matchRoleName(roleName) !== "planning" ? "Submit" : "Approval",
              id: row.id,
              funct: () => {
                handleClickSubmit(row.openingType, row.id, row.atmId, row.locationId);
              },
            },
          ];

          const statusSubmission = (
            <SubmissionStatus
              value={row.openingType === 'Replace' ? '1' : row.submissionStatus}
              userRoleName={roleName}
            />
          );

          if (matchRoleName(roleName) !== "planning") {
            const ChildComponentSecondary = (props) => {
              const { value, idRow } = props;
              return (
                <div>
                  <center>
                    <Link
                      style={{ color: "#DC241F", textDecoration: "none" }}
                      onClick={() => {
                        if(value.toLowerCase() === 'termin'){
                          handleModalUpdateTermin(idRow);
                        } else if(value.toLowerCase() === 'replace'){
                          handleModalUpdateReplace(idRow)
                        } else {
                          handleModalUpdate(idRow);
                        }
                      }}
                    >
                      Update
                    </Link>
                  </center>
                </div>
              );
            };
            const newRow = {
              atmId: row.openingType == 'New ATM' || row.openingType == 'Reopen' ? '-' : row.atmId, 
              location: row.location,
              idLocation: row.locationId,
              requester: row.requester,
              type: row.openingType,
              machineType: row.machineType,
              sla: row.sla,
              statusSubmission: statusSubmission,
              action: (
                <ChildComponentSecondary
                  value={row.openingType}
                  idRow={row.id}
                />
              ),
              submit: actionSubmit,
            };
            dataToSet.push(newRow);
            setModalLoader(false);
          } else {
            const newRow = {
              atmId: row.openingType == 'New ATM' || row.openingType == 'Reopen' ? '-' : row.atmId, 
              location: row.location,
              idLocation: row.locationId,
              requester: row.requester,
              type: row.openingType,
              machineType: row.machineType,
              sla: row.sla,
              statusSubmission: statusSubmission,
              submit: actionSubmit,
            };
            dataToSet.push(newRow);
            setModalLoader(false);
          }
        });
      } catch (err) {
        setModalLoader(false);
        alert(`Error Re-Construct Data Submission...! \n${err}`);
      }
      setDataSubmission(dataToSet);
      setModalLoader(false);
      // console.log(dataToSet);
    } catch (err) {
      alert(`Error Fetching Data Submission...! \n${err}`);
      setModalLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, dataFilter, orderBy, orderDirection]);

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(colNameVarArr[titleTable.indexOf(property)]);
    };
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title}>Submission</Typography>
        </Grid>
        {/* <Grid item>
          <ChkySearchBar
            placeholder="Pencarian berdasarkan lokasi.."
            // onKeywordChange={handleKeyword}
            width={310}
          />
        </Grid> */}
      </Grid>
      <div style={{ marginBottom: 20 }}>
        <FilterSubmission onFilterSubmit={handleFilterSubmit} />
      </div>

      <ChkyTablePagination
        data={dataSubmission}
        fields={titleTable}
        cellOption={valueType}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        isLoadData={isOpenModalLoader}
        resetPageCounter={resetPageCounter}
        isSort={isSort}
        changePage={handleChangePage}
        leftAlignBody={[1]}
        isUsingMuiSort
        handleSort={handleSort}
        sortBy={sortBy}
        order={orderDirection}
      />
      {/* <FloatingChat /> */}

      <ModalUpdateNew
        isOpen={openModalUpdate}
        onClose={handleCloseModalUpdate}
        onLeave={() => {
          handleCloseModalUpdate();
        }}
        rowToShow={selectedRow}
        successUpdate={() => {
          handleCloseModalUpdate();
          fetchData();
        }}
      />

      <ModalUpdateTermin
        isOpen={openModalUpdateTermin}
        onClose={handleCloseModalUpdateTermin}
        onLeave={() => {
          handleCloseModalUpdateTermin();
        }}
        rowToShow={selectedRow}
        successUpdate={() => {
          handleCloseModalUpdateTermin();
          fetchData();
        }}
      />

      <ModalUpdateReplace
        isOpen={isOpenModalReplace}
        onClose={() => setIsOpenModalReplace(false)}
        onLeave={() => setIsOpenModalReplace(false)}
        id={selectedRow}
      />
    </div>
  );
};

export default Submission;
