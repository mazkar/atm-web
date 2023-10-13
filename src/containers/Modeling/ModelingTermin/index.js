/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Typography, Paper, Button, Tabs, Tab } from '@material-ui/core';
import axios from 'axios';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import MuiIconLabelButton from '../../../components/Button/MuiIconLabelButton';
import { ReactComponent as PlusWhite } from '../../../assets/icons/siab/plus-white.svg';
import ModalLoader from '../../../components/ModalLoader';
import { ChkyDownloadButton, ChkyFilterRenewalForecast, ChkyFilterTerminForecast, ChkyTablePagination, ChkyUploadMedicalButton } from '../../../components/chky';
import constants from '../../../helpers/constants';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constants.color.dark,
  },
  tombolAdd: {textAlign: 'right',},
  filterContainer: {marginBottom: 15,},
  tableContent: {},
  // Tabs Style
  rootTabs: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
    zIndex: 2,
    position: 'relative',
    top: 10,
  },
  tabsIndicator: {
    display: 'none',
  },  
  rootItemTabs: {
    minHeight: 40,
    minWidth: 72,
    padding: '7px 10px',
  },
  selectedTabItem: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapperTabItem: {
    textTransform: 'none',
  },
});

function ModelingTermin() {
  const classes = useStyles();
  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };
  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };
  // MODAL UPLOAD
  const [openModalUpload, setOpenModalUpload] = React.useState(false);
  const handleOpenModalUpload = () => setOpenModalUpload (true);
  const handleCloseModalUpload= () => setOpenModalUpload(false);

  const handleUploadCriteria = () => {
    handleOpenModalUpload();
  };
  
  // =========> FETCHING DATA
  // modalLoader
  const [isOpenModalLoader, setModalLoader] = useState(false);
  // getDataTable
  const [dataTable, setDataTable] = useState([]); // <--- init dataTable array
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage

  // filterData
  const [filterData, setFilterData] = useState([]);

  // init data table Fields and valueTypes
  const titleTable0 = ['ATM ID','Location','Harga Sewa Per Bulan','Harga Sewa Per Tahun','Model','Recommendation','Action'];
  const valueType0 = ['string','string','string','string','string','string','menu'];

  const titleTable1 = ['ATM ID','Inquiry','Deposit','Cash','Payment','Transfer','Other','Total','Action'];
  const valueType1 = ['string','string','string','string','string','string','string','string','menu'];

  const titleTable2 = ['ATM ID','Cash','Payment','Transfer','Action'];
  const valueType2 = ['string','string','string','string','menu'];

  const titleTable3 = ['ATM ID','Acquiring','Transfer','Payment','Total','Action'];
  const valueType3 = ['string','string','string','string','string','menu'];

  const titleTable4 = ['ATM ID','Sewa','Overhead','Biaya','Revenue Per Cost','Model Team','Model Final','Action'];
  const valueType4 = ['string','string','string','string','string','string','string','menu'];

  const titleTable5 = ['ATM ID','% Up Time','Jumlah Hari  Transaksi Cash','CASA','Trx Regular','Trx Grab','Trx Rekpon','Trx Off Us','Medical','Action'];
  const valueType5 = ['string','string','string','string','string','string','string','string','string','menu'];

  const [currentTitle, setCurrentTitle] = useState(titleTable0);
  const [currentValueType, setCurrentValueType] = useState(valueType0);

  // TABS
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
    if(newValue === 0){   
      setCurrentTitle(titleTable0);
      setCurrentValueType(valueType0);
    } else if(newValue === 1){   
      setCurrentTitle(titleTable1);
      setCurrentValueType(valueType1);
    } else if(newValue === 2){   
      setCurrentTitle(titleTable2);
      setCurrentValueType(valueType2);
    } else if(newValue === 3){   
      setCurrentTitle(titleTable3);
      setCurrentValueType(valueType3);
    } else if(newValue === 4){   
      setCurrentTitle(titleTable4);
      setCurrentValueType(valueType4);
    } else if(newValue === 5){   
      setCurrentTitle(titleTable5);
      setCurrentValueType(valueType5);
    } else {
      setCurrentTitle(titleTable0);
      setCurrentValueType(valueType0);
    }
  };
  useEffect(() => {
    const dataToSet = [];
    const fetchDataMaster = async () => {
      const data = {
        pageNumber : currentPage,
        dataPerPage : rowsPerPage
      };

      const config = { headers: 
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      };

      // hit API
      try {
        setModalLoader(true);
        const result = await axios.post(`${constants.URL_API_SERVICE}/viewNewAtmData`, data , config);
        console.log(`>>>> data ${JSON.stringify(data)}  Fetched ${JSON.stringify(result)} `);

        // reconstruct data from DB to dataNewRBB
        try{
          const dataNewPre = result.data.content;
          setTotalPages(result.data.totalPages);
          setTotalRows(result.data.totalElements);
          // eslint-disable-next-line array-callback-return
          dataNewPre.map((row) => {
            const actionToInsertAsNewField = [
              { name: 'Edit', url: `/master-new/update/${row.id}`, type:'edit' }, 
              { name: 'Delete', url: `/master-new/delete/${row.id}`, type:'delete' }
            ];
            const newRow = {
              id: row.id,
              oldLocation: row.oldLocation,
              newCity: row.newCity,
              openingPicName: row.openingPicName,
              newRbbReason: row.newRbbReason,
              newLocation: row.newLocation,
              submissionDate: row.submissionDate,
              biOpeningReportDate: row.biOpeningReportDate,
              machineType: row.machineType,
              oldCity: row.oldCity,
              action : actionToInsertAsNewField
            };
            // set constructed data
            dataToSet.push(newRow);
          });
        }catch(err){
          setModalLoader(false);
          alert(`Error Re-Construct Data New...! \n${err}`);
        }
        setDataTable(dataToSet);
        setModalLoader(false);
      } catch (err) {
        alert(`Error Fetching Data...! \n${err}`);
        setModalLoader(false);
      }
    };
    fetchDataMaster();
  }, [currentPage]);

  useEffect (()=>{
    console.log(`====> New Master Data New ${JSON.stringify(dataTable)}`);
  },[dataTable]);

  useEffect (()=>{
    console.log(`====> currentPage = ${currentPage}`);
  },[currentPage]);

  function handleChangePageValue(newPage){
    setCurrentPage(newPage);
  };

  function handleFilter(newValue) {
    setFilterData(newValue);
  }
  useEffect(() => console.log(`====> filterData ${JSON.stringify(filterData)}`), [filterData]);

  function handleDownload(){
    console.log("Download Button Clicked");
  }
  
  function handleUploadMedical(){
    console.log("Upload Medical Button Clicked");
  }

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" className={classes.titleContainer} alignItems="center">
        <Grid item>
          <Typography  className={classes.title}>Termin</Typography>
        </Grid>
        <Grid item>
          <ChkyDownloadButton
            style={{ marginRight: 5 }}
            label="Download Excel"
            onClick={() => {handleDownload();}}
          />
          <ChkyUploadMedicalButton
            style={{ marginRight: 5 }}
            label="Upload Medical Record"
            onClick={() => {handleUploadMedical();}}
          />
          <MuiIconLabelButton
            style={{ width: 175, right: 0 }}
            label="Upload Criteria"
            iconPosition="startIcon"
            onClick={() => {handleUploadCriteria();}}
            buttonIcon={<PlusWhite />}
          />
        </Grid>
      </Grid>
      <div className={classes.container}>
        <div className={classes.filterContainer}>
          <ChkyFilterTerminForecast onFilterSubmit={handleFilter}/>
        </div>
        <div item className={classes.tableContent}>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Tabs
                classes={tabsStyles}
                value={selectedTab} 
                onChange={handleSelectedTab}
                centered
              >
                <Tab classes={tabItemStyles} label="Location"  />
                <Tab classes={tabItemStyles} label="Item Transaction" />
                <Tab classes={tabItemStyles} label="Amount" />
                <Tab classes={tabItemStyles} label="Revenue" />
                <Tab classes={tabItemStyles} label="Total" />
                <Tab classes={tabItemStyles} label="Others" />
              </Tabs>
            </Grid>
          </Grid>
          <ChkyTablePagination
            data={[]}
            fields={currentTitle}
            cellOption={currentValueType}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
            withTabs
          />
        </div>
      </div>
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isOpenModalLoader} />
      
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(ModelingTermin))
);