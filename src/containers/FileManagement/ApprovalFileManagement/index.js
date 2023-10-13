/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
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
import moment from "moment";
import { Box, Grid, Typography, Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Axios from "axios";
import _ from 'lodash';
import { RootContext } from "../../../router";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import Constants from "../../../helpers/constants";
// import FilterProgress from './FilterProgress';
import { TableCheckPagination } from "../../../components";
import ModalLoader from "../../../components/ModalLoader";
import PopUpConfirmation from '../../../components/PopUpConfirmation';
import { itemSearch, titleTable, valueTypes } from "./TableTemplate";
import FilterProgress from "./FilterProgress";
import PopupSucces from "../../../components/PopupSucces";
import { doFetchFileApproval, headersSetting } from "../serviceFileManagement";
import useTimestampConverter from "../../../helpers/useTimestampConverter";

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

const approvalStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: "15px 0px",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    display: "flex",
    "& > *": {
      margin: 5,
    },
    fontSize: 18,
  },
});

const ApprovalBy = (props) => {
  const classes = approvalStyles();
  // init Props
  const { name, jobTitle, initial } = props;
  function renderBackColor(intialName) {
    if (intialName === "DH") {
      return "#88ADFF";
    }
    if (intialName === "TS") {
      return "#FFB443";
    }
    if (intialName === "BA") {
      return "#65D170";
    }
    if (intialName === "Y") {
      return "#FF6A6A";
    }
    return "#88ADFF";
  }
  return (
    <div className={classes.root}>
      <Avatar
        style={{ backgroundColor: renderBackColor(initial) }}
        className={classes.avatar}
      >
        {initial}
      </Avatar>
      <div
        style={{
          marginLeft: 12,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography style={{ fontSize: 12, fontStyle: "italic" }}>
          {jobTitle}
        </Typography>
      </div>
    </div>
  );
};

ApprovalBy.propTypes = {
  name: PropTypes.string,
  jobTitle: PropTypes.string,
  initial: PropTypes.string,
};

ApprovalBy.defaultProps = {
  name: "Nama Lengkap",
  jobTitle: "Job Title",
  initial: "N",
};

const resDataDummy = [
  { 
    id: "A-21234",
    tglReq: "12/12/2021",
    userReq: "Deden Hidayat",
    judulArtikel: "Dokument 1",
    approver: [],
    statusApproval: 1,
    tglApproval: "12/12/2021",
  },
  { 
    id: "A-21235",
    tglReq: "12/12/2021",
    userReq: "Deden Hidayat",
    judulArtikel: "Dokument 2",
    approver: ["Roy Axter"],
    statusApproval: 2,
    tglApproval: "12/12/2021",
  }
];

// DEFAULT EXPORT
const ApprovalFileManagement = () => {
  const classes = useStyles();
  const history = useHistory();

  // GET USER ID
  const { userId, userRoleName } = useContext(RootContext);

  // INIT LOADING
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalLoader, setOpenModalLoader] = useState(false);

  // INIT TABLE
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const rowsPerPage = 10; // <--- init default rowsPerPage|
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState('Approve');
  const [labelSuccess, setLabelSuccess] = useState('');

  const [selectedItemTable, setSelectedItemTable] = useState([]);

  // INIT DATA REQUEST
  const defaultType = "ASC";
  const defaultColumn = "id";

  const defaultDataHit = {
    sortType: defaultType,
    sortBy: defaultColumn,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
  };

  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  // INIT FILTER Table
  const [dataFilter, setDataFilter] = useState(null);

  const [dataApproval, setDataApproval] = useState([]); // <--- init dataImplementation array

  function doApproveOrReject(){
    const serviceType = confirmType === "Approve" ? 'approveDocFile' : 'rejectDocFile';
    const arr = [];
    selectedItemTable.map((item)=>{
      arr.push({
        id: item.id,
      });
    });
    const dataHit = {
      listApprovalReject: arr
    };
    console.log("+++ dataHit", dataHit);
    setOpenModalLoader(true);
    // alert(`confirmType : ${confirmType}`);
    Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/${serviceType}`,
      method: 'POST',
      data: dataHit,
      headers: headersSetting,
    })
      .then(res => {
        setOpenModalLoader(false);
        // console.log('+++ res', res);
        if(res.data.responseCode === "200"){
          switch(confirmType) {
          case 'Approve':
            setLabelSuccess('Approve Berhasil Dilakukan');
            break;
          default:
            setLabelSuccess('Reject Berhasil Dilakukan');
            break;
          }
          setOpenConfirmModal(false);
          setOpenSuccessModal(true);
        }else{
          alert(res.data.responseMessage);
        }
      })
      .catch( err => {
        alert('Error', err);
        setOpenConfirmModal(false);
        setOpenModalLoader(false);
        console.log(err);
      });
    // setTimeout(() => {
    //   setOpenModalLoader(false);
    //   switch(confirmType) {
    //   case 'Approve':
    //     setOpenConfirmModal(false);
    //     setOpenSuccessModal(true);
    //     setLabelSuccess('Approve Berhasil Dilakukan');
    //     break;
    //   default:
    //     setOpenConfirmModal(false);
    //     setOpenSuccessModal(true);
    //     setLabelSuccess('Reject Berhasil Dilakukan');
    //     break;
    //   }
    // }, 5000);

  }

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

  function handleApproveReject(type){
    if(type === "Approve"){
      setConfirmType('Approve');
    }else{
      setConfirmType('Reject');
    }
    setOpenConfirmModal(true);

  }

  const handleGetSelectedItem = (selectedItems) => {
    // console.log("<<<<< CHECK PARENT : ", JSON.stringify(selectedItems));
    setSelectedItemTable(selectedItems);
  };

  function onFilterSubmit(filterValues){
    console.log("+++ filterValues",filterValues);
    // setDataFilter(!filterValues ? filterValues: null);
    setDataRequest(old=>({
      sortBy: old.sortBy,
      sortType: old.sortType, 
      dataPerPage: old.dataPerPage,
      ...filterValues, 
      pageNumber: 0
    }));
  }

  function handleResetFilter(){
    setDataRequest({
      ...defaultDataHit,
      pageNumber: 0,
    });
  }

  function fetchData(){
    doFetchFileApproval((bool)=>setIsLoading(bool), dataRequest)
      .then((response) => {
        console.log("+++ response", response);
        if(response){
          if(response.responseCode === "200"){
            const newArr = [];
            response.content.map((item)=>{
              newArr.push({
                id: item.id,
                tglReq: item.publishDate? useTimestampConverter(item.publishDate/1000, "DD-MM-YYYY"): "",
                userReq: item.userName,
                judulArtikel: item.fileName,
                approver: item.userApproval,
                statusApproval: item.status,
                tglApproval: item.approvalDate? useTimestampConverter(item.approvalDate/1000, "DD-MM-YYYY"): "",
                action: (<a onClick={() => history.push(`/file-management/preview/control/${item.id}`)}>Detail</a>)
              });
            });
            setDataApproval(newArr);
          }
        }
      })
      .catch((err) => {
        // console.log("Error Fetch Data Orders", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }

  useEffect(() => {
    fetchData();
  }, [dataRequest]);
  
  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Approval</Typography>
        </Grid>
      </Grid>
      <div className={classes.container}>
        <Grid container direction="column" spacing={1}>
          {/* TAB PANEL CONTENT */}
          <Grid item style={{ width: "-webkit-fill-available" }}>
            {/* FILTER */}
            <div className={classes.filterContainer}>
              <FilterProgress
                itemSearch={itemSearch}
                onFilterSubmit={onFilterSubmit}
                handleReset={handleResetFilter}
              />
            </div>
            <Grid container justify="space-between" style={{marginBottom: '24px'}}>
              <Grid item>
                <Button
                  style={{
                    backgroundColor: Constants.color.primaryHard,
                    padding: "12px 40px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                    textTransform: "capitalize",
                    borderRadius: 8,
                  }}
                  onClick={()=>handleApproveReject("Reject")}
                >
                  Reject
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    backgroundColor: "#65D170",
                    padding: "12px 40px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                    textTransform: "capitalize",
                    borderRadius: 8,
                  }}
                  onClick={()=>handleApproveReject("Approve")}
                >
                  Approve
                </Button>
              </Grid>
            </Grid>
            {/* NEW */}
            <TableCheckPagination
              data={dataApproval}
              fields={titleTable}
              cellOption={valueTypes}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              changePage={handleChangePageValue}
              isLoadData={isLoading}
              sorting={handleSorting}
              isSort
              // onSelectedItems={handleGetSelectedItem}
              onSelectedItemsObj={handleGetSelectedItem}
            />
          </Grid>
        </Grid>
        <div className={classes.containerPaper}>
          <Typography style={{ fontSize: 24, fontWeight: 500 }}>
                Approver
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <ApprovalBy
                name="Roy Axter"
                jobTitle="ATM Site Management Head"
                initial="RA"
              />
            </Grid>
          </Grid>
        </div>
      </div>
      {/* <FloatingChat /> */}
      
      <PopUpConfirmation
        isOpen={openConfirmModal}
        onClose={()=>{setOpenConfirmModal(false);}}
        onLeave={()=>{setOpenConfirmModal(false);}}
        message={confirmType ===  "Reject" ? "Anda yakin ingin Melakukan Reject ?" : "Anda yakin ingin Melakukan Approve ?"}
        desc="Anda tidak dapat membatalkan tindakan ini"
        onSubmit={doApproveOrReject}
      />
      <PopupSucces
        isOpen={openSuccessModal}
        onClose={()=>{setOpenSuccessModal(false); setDataRequest(defaultDataHit); fetchData();}}
        message={labelSuccess}
      />

      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

export default ApprovalFileManagement;
