/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
// import { Link as Routerlink } from 'react-router-dom';
// import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography,  Tabs, Tab } from '@material-ui/core';
import { ChkyTablePagination } from '../../../../components/chky';
import FloatingChat from '../../../../components/GeneralComponent/FloatingChat';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
// import BtnGroupItem from './BtnGroupItem';
import { ReactComponent as ArrowLeft } from '../../../../assets/icons/siab/arrow-left.svg';
import image from '../../../../assets/images/atmcimb.png';
import constants from '../../../../helpers/constants';
// import LoadingView from '../../../../components/Loading/LoadingView';
import { ReactComponent as Check } from '../../../../assets/icons/siab/check-green.svg';
import { ReactComponent as Sync } from '../../../../assets/icons/siab/sync-alt.svg';
// import { TabPanel } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  container: {
    marginTop: 25,
  },
  paper: {
    padding: 45,
    borderRadius: 10,
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 20,
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: 'red',
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      '& :hover': {
        backgroundColor: '#F4F7FB',
      },
    },
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
  },

  // Tabs Style
  rootTabs: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,    
    width: "fit-content",
    position: "relative",
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

const useTypeStyles =makeStyles({
  completeBack: {
    display: 'flex', 
    flexWrap: 'wrap',
    flexDirection: 'row', 
    backgroundColor: '#DEFFE1',
    padding: '5px 10px',
    alignItems: 'center',
    alignContent: 'center',
    border: '1px solid #65D170',
    borderRadius: 4,
    width: 'max-content',
    marginLeft: '35%',
  },
  completeText: {
    color: '#65D170',
    fontSize: 15,
    fontWeight: 600,
    marginRight: 10
  },
  incompleteBack: {
    display: 'flex', 
    flexWrap: 'wrap',
    flexDirection: 'row', 
    backgroundColor: '#DEFFE1',
    padding: '15px 0px',
    alignItems: 'center',
    alignContent: 'center',
    border: '1px solid #749BFF',
    width: 'max-content',
    marginLeft: '35%',
  },
  incompleteText: {
    color: '#749BFF',
    fontSize: 15,
    fontWeight: 600,
    marginRight: 10
  },
});  

const Progress = (props) => {
  const { progress } = props;
  const classes = useTypeStyles();
  
  if(progress === 'Complete'){
    return (
      <div className={classes.completeBack}>
        <Typography className={classes.completeText}> Complete </Typography>
        <Check/>
      </div>
    );
  }
  if (progress === 'Incomplete'){
    return (
      <div className={classes.incompleteBack}>
        <Typography className={classes.incompleteText}> Incomplete </Typography>
        <Sync/>
      </div>
    );
  }
};

// Tab Panel
function TabPanel(props) {
  const { children, value, index, ...other } = props;
      
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

const Jarkom = () => {
  const {
    root,
    container,
    paper,
  } = useStyles();
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

  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
  };

  const handleDetail = () => {
    alert('datail');
  };

  const actionDetail = [
    { name: 'Detail', id: 1, funct: handleDetail },
  ];
  const titleJarkom = [
    'Task',
    'Tgl Survey',
    'Tgl Instalasi',
    'PIC Jarkom',
    'Remark',
    '',
  ];
  const tableType = [
    'string', 'string', 'string', 'string', 'string', 'modal'
  ];
  const dataTable = [
    {
      task: 'Order Link',
      dateSurvey: '01/01/21',
      dateIntall: '02/02/21',
      pic: 'udin',
      remark: 'Jarkom has been intalled',
      actionDetail
    },
    {
      task: 'Instalation Link',
      dateSurvey: '01/01/21',
      dateIntall: '02/02/21',
      pic: 'zuddin',
      remark: 'Jarkom has been intalled',
      actionDetail
    }
  ];

  const actionDetailRe = [
    { name: 'Update', id: 1, funct: handleDetail },
  ];
  const titleJarkomRe = [
    'Task',
    'Tgl Relokasi',
    'PIC Jarkom',
    'Status Instalasi',
    'Remark',
    '',
  ];
  const tableTypeRe = [
    'string', 'string', 'string', 'string', 'string', 'modal'
  ];
  const dataTableRe = [
    {
      task: 'Order Link',
      dateSurvey: '01/01/21',
      pic: 'udin',
      status: 'Done',
      remark: 'Jarkom has been intalled',
      actionDetailRe
    },
    {
      task: 'Instalation Link',
      dateSurvey: '01/01/21',
      pic: 'zuddin',
      status: 'On Progress',
      remark: 'Jarkom On Progress ',
      actionDetailRe
    }
  ];

  const titleJarkomDis = [
    'Task',
    'Tgl Survey',
    'PIC Jarkom',
    'Remark',
    '',
  ];
  const tableTypeDis = [
    'string', 'string', 'string', 'string', 'modal'
  ];
  const dataTableDis = [
    {
      task: 'Order Link',
      dateSurvey: '01/01/21',
      pic: 'udin',
      remark: 'Jarkom has been intalled',
      actionDetailRe
    },
    {
      task: 'Instalation Link',
      dateSurvey: '01/01/21',
      pic: 'zuddin',
      remark: 'Jarkom has been intalled',
      actionDetailRe
    }
  ];

  return (
    <div className={root}>
      <Grid container direction='row' justify='space-between'>
        <Grid item>
          <div className={classes.backButton}>
            <MuiIconLabelButton
              label="Back"
              iconPosition="startIcon"
              //   onClick={() => window.location.assign('/')}
              buttonIcon={<ArrowLeft />}
            />
          </div>
          <Typography className={classes.title}>Jarkom Detail</Typography>
        </Grid>

        <Grid item alignContent='flex-end'>
          <Typography style={{fontWeight: 600, fontSize: 13}}>Tanggal Online : 12/12/21</Typography>
          <Typography className={classes.dueDate}>335 Days Left</Typography>
          <br/>
          <Progress style={{right: 50}} progress='Complete'/>
        </Grid>

      </Grid>
      <div className={container}>
        <Paper className={paper}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="column"
            spacing={5}
          >
            
            <Tabs
              classes={tabsStyles}
              value={selectedTab} 
              onChange={handleSelectedTab}
              centered
            >
              <Tab classes={tabItemStyles} label="Request Instalasi"  />
              <Tab classes={tabItemStyles} label="Relokasi Posisi" />
              <Tab classes={tabItemStyles} label="Dismantle" />
            </Tabs>
            
          </Grid>
        </Paper>
        <Paper className={paper}>
          <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            direction="column"
            spacing={3}
          >
            <Grid item>
              <Typography >FOTO</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing={5} justify="space-between">
                <Grid item>
                  <img src={image} style={{maxWidth: 150, maxHeight: 150}} />
                  <Typography>Order</Typography>
                </Grid>
                <Grid item>
                  <img src={image} style={{maxWidth: 150, maxHeight: 150}} />
                  <Typography>Instalasi</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <div className={classes.container}>
          <div className={classes.tableContent}>
            <TabPanel value={selectedTab} index={0}>
              <ChkyTablePagination
              // data={dataNewRBB}
                fields={titleJarkom}
                data={dataTable}
                cellOption={tableType}
                //   isLoadData={isLoadData}
              />
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
              <ChkyTablePagination
              // data={dataNewRBB}
                fields={titleJarkomRe}
                data={dataTableRe}
                cellOption={tableTypeRe}
                //   isLoadData={isLoadData}
              />
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
              <ChkyTablePagination
              // data={dataNewRBB}
                fields={titleJarkomDis}
                data={dataTableDis}
                cellOption={tableTypeDis}
                //   isLoadData={isLoadData}
              />
            </TabPanel>
          </div>
        </div>
      </div>
      {/* <FloatingChat /> */}
    </div>
  );
};

export default Jarkom;
