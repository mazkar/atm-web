/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Link, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";
import { RootContext } from "../../../../router";
import Constants from "../../../../helpers/constants";
import { ChkyTablePagination } from "../../../../components";
import TableTemplate from "./common/TableTemplate";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import FilterComponent from "./common/FilterComponent";
import SuccessPopUp from "../../../Implementation/cimb/common/PopUp/successPopUp";
import AddNewSchedulePopUp from "./common/AddNewSchedulePopUp";
import PopUpUploadSchedule from "./common/PopUpUploadSchedule";
import EditSchedulePopUp from "./common/EditSchedulePopUp";
import { doFetchListSchedules, doDeleteSchedule } from "../../ApiServices";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";
import PopUpConfirmation from "../../../../components/PopUpConfirmation";
import ModalLoader from "../../../../components/ModalLoader";

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
  paramButton: {
    width: "max-content",
    color: Constants.color.primaryHard,
    backgroundColor: "white",
    height: 40,
    marginRight: 10,
    border: "1px solid",
    borderColor: Constants.color.primaryHard,
    borderRadius: 10,
    textTransform: "capitalize",
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
// INIT DATA REQUEST
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};

const itemSearch = [
  { text: "Schedule ID", value: "id" },
  { text: "ATM ID", value: "atmId" },
  { text: "Lokasi", value: "location" },
  { text: "Checklist Vendor", value: "checklistVendor" },
  { text: "Vendor Name", value: "vendorName" },
  { text: "User Vendor", value: "userVendor" },
];

// DEFAULT EXPORT
const Scheduling = () => {
  const classes = useStyles();
  const history = useHistory();
  const page = (new URLSearchParams(window.location.search)).get("page");
  // GET USER ID
  const { userId, userRoleName } = useContext(RootContext);

  // INIT STATE
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [itemEdit, setItemEdit] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  // =====> DATA TABLE  <=====
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [orderDirection, setOrderDirection] = useState("ASC");
  // const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [uploadSchedule, setUploadSchedule] = useState(false);
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [openModalNewSchedule, setOpenModalNewSchedule] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [idDelete, setIdDelete] = useState(false);
  const [openDeletePop, setOpenDeletePop] = useState(false);
  
  // set handler loader when call Approval API Service
  function loadingHandler(loaderValue) {
    setIsLoading(loaderValue);
  }
  
  function loadingHandlerDelete(loaderValue) {
    setIsLoadingDelete(loaderValue);
  }
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

  function handleFilterSubmit(value) {
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

  function handleResetFilter() {
    setDataRequest({
      ...defaultDataHit,
    });
  }

  useEffect(() => {
    // console.log("+++ dataRequest",dataRequest);
    doFetchListSchedules(loadingHandler, dataRequest)
      .then((response) => {
        // console.log("+++ response", response);
        if(response){
          if(response.responseCode === "200"){
            const {content} = response;
            setTotalRows(response.totalElements);
            setTotalPages(response.totalPages);
            const dataToSet = [];
            
            content.map((item) => {
              const newRow = 
                {
                  scheduleId: item.id,
                  atmId: item.atmId,
                  lokasi: item.location,
                  alamat: item.address,
                  checklistVendor: item.checklistVendor,
                  vendorName: item.vendorName,
                  userVendor: item.userVendor,
                  startDate: item.startDate? useTimestampConverter(item.startDate / 1000, "DD/MM/YYYY") : "-",
                  endDate: item.endDate? useTimestampConverter(item.endDate / 1000, "DD/MM/YYYY") : "-",
                  interval: `${item.intervalDay} Days`,
                  status: item.status,
                  action: [
                    {
                      name: 'Edit',
                      type: 'edit',
                      handler: ()=> {
                        setItemEdit(item);
                        setOpenEdit(true);
                      },
                    },
                    {
                      name: 'Delete',
                      type: 'delete',
                      handler: ()=>{
                        setIdDelete(item.id);
                        setOpenDeletePop(true);
                      },
                    },
                  ],
                };
              dataToSet.push(newRow);
            });

            setData(dataToSet);
          }
        }
      })
      .catch((err) => {
        // console.log("Error Fetch Data Orders", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, [dataRequest]);

  const handleDelete=()=>{
    // console.log("+++ idDelete", idDelete);
    doDeleteSchedule(loadingHandlerDelete, {id: idDelete})
      .then((response) => {
        // console.log("+++ response", response);
        if(response.responseCode === "200"){
          setOpenDeletePop(false);
          setOpenSuccessPopUp(true);
          setMessageSuccess("Berhasil Delete Schedule.");
        }
      })
      .catch((err) => {
      // console.log("Error Fetch Data Orders", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Scheduling</Typography>
        </Grid><Grid item>
          <MuiIconLabelButton
            className={classes.paramButton}
            style={{
              width: "max-content",
              background: "#FFFFFF",
              border: "1px solid #DC241F",
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label="Upload"
            onClick={() => {
              setUploadSchedule(true);
            }}
            buttonIcon={<AddIcon />}
            iconPosition="startIcon"
          />
          <MuiIconLabelButton
            style={{
              width: "max-content",
              right: 0,
              height: 40,
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label="Add New Schedule"
            onClick={() => {
              setOpenModalNewSchedule(true);
            }}
            buttonIcon={<AddIcon />}
            iconPosition="startIcon"
          />
        </Grid>
      </Grid>
      <div className={classes.container}>
        <Grid container direction="column" spacing={1}>
          <Grid item style={{ width: "-webkit-fill-available" }}>
            <div className={classes.filterContainer}>
              <FilterComponent 
                onFilterSubmit={handleFilterSubmit} 
                itemSearch={itemSearch}
                handleReset={handleResetFilter}
              />
            </div>
          </Grid>

          <ChkyTablePagination
            data={data}
            fields={TableTemplate.titleTable}
            cellOption={TableTemplate.valueType}
            changePage={handleChangePage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            isLoadData={isLoading}
            isSort={TableTemplate.isSort}
            isUsingMuiSort
            handleSort={handleSort}
            sortBy={sortBy}
            order={orderDirection}
          />
        </Grid>
        <PopUpUploadSchedule
          isOpen={uploadSchedule}
          onClose={() => setUploadSchedule(false)}
          onSuccesUpload={() => {
            setUploadSchedule(false);
          }}
        />
        <AddNewSchedulePopUp
          isOpen={openModalNewSchedule}
          onClose={() => setOpenModalNewSchedule(false)}
          onSuccessSubmit = {()=>{
            setOpenModalNewSchedule(false);
            setMessageSuccess("Berhasil Tambahkan Schedule.");
            setOpenSuccessPopUp(true);
          }}
        />
        <SuccessPopUp
          isOpen={openSuccessPopUp}
          onClose={()=>history.go(0)}
          label={messageSuccess}
          type="Add"
        />
        <PopUpConfirmation
          isOpen={openDeletePop}
          onSubmit={()=>{
            handleDelete();
          }}
          onLeave={()=>setOpenDeletePop(false)}
          onClose={()=>setOpenDeletePop(false)}
          message="Apakah anda yakin hapus data?"
        />
        <EditSchedulePopUp
          currentRow={itemEdit}
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          onSuccessSubmit = {()=>{
            setOpenEdit(false);
            setMessageSuccess("Berhasil Edit Schedule.");
            setOpenSuccessPopUp(true);
          }}
        />
        <ModalLoader isOpen={isLoadingDelete} />
      </div>
    </div>
  );
};

export default Scheduling;
