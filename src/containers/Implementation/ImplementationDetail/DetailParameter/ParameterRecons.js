import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Tab, Tabs } from '@material-ui/core';
import constants from '../../../../helpers/constants';

import ChkyTablePagination from '../../../../components/chky/ChkyTablePagination';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { ReactComponent as ArrowLeft } from '../../../../assets/icons/siab/arrow-left.svg';
import { ReactComponent as Check } from '../../../../assets/icons/siab/check-green.svg';
import { ReactComponent as Sync } from '../../../../assets/icons/siab/sync-alt.svg';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
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
  button: {
    display: 'block',
    width: 120
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
    marginBottom: 20
  },
  dueDate: {
    fontWeight: 500, 
    fontSize: 10, 
    color: '#BCC8E7',
    textAlign: 'right'
  },
  // Tabs Style
  rootTabs: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,    
    width: "fit-content",
    position: "relative",
    left: "40%",
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
  tabBack: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 10,
    padding: '20px 0px',
    marginBottom: 20
  },
});

const useTypeStyles =makeStyles({
  completeBack: {
    display: 'flex', 
    flexWrap: 'wrap',
    flexDirection: 'row', 
    backgroundColor: '#DEFFE1',
    padding: '10px 10px',
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
    
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const param = {
  onlineDate: '07 Januari 2021',
  dueDate: 10,
  status: 'Complete',
};

const ParameterRecons = () => {
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
  
  // INITIAL STATE //
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10;
  const [anchorEl, setAnchorEl] = useState(null);

  // TABS //
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
    if(newValue === 0){   
      console.log("Tab Current 0");
    } else if(newValue === 1){   
      console.log("Tab Current 1");
    } else if(newValue === 2){   
      console.log("Tab Current 2");
    } else {
      console.log("Tab Default");
    }
  };

  // TABLE //
  const valueType = 
  [ 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'modal' ];

  const titleTable = [
    'Nama Lokasi',
    'Alamat',
    'Mesin',
    'Kode Branch',
    'Area',
    'Kota',
    'FLM Vendor',
    'FLM Vendor Region',
    'No Escrow',
    '',
  ];

  function handleUpdate() {
    alert('Clicked!');
  }

  const actionUpdate = [
    {
      name: 'Update',
      id: 2,
      funct: handleUpdate,
    },
  ];

  const dataRequest = [
    { 
      namaLokasi: 'CIMBN.JKT.Meruya.SPBU', alamat: 'Jl. Gatot Subroto, No.33', mesin: 'ATM', 
      branch: '120192', area: 'Jakarta', kota: 'Jakarta', flm: 'Nama FLM Vendor', 
      flmRegion: 'Jakarta Barat', escrom: '1200019221', update: actionUpdate 
    },
    { 
      namaLokasi: 'CIMBN.JKT.Meruya.SPBU', alamat: 'Jl. Gatot Subroto, No.33', mesin: 'ATM', 
      branch: '120192', area: 'Jakarta', kota: 'Jakarta', flm: 'Nama FLM Vendor', 
      flmRegion: 'Jakarta Barat', escrow: '1200019221', update: actionUpdate 
    },
  ];

  const dataDone = [
    { 
      namaLokasi: 'CIMBN.JKT.Meruya.SPBU', alamat: 'Jl. Gatot Subroto, No.33', mesin: 'ATM', 
      branch: '120192', area: 'Jakarta', kota: 'Jakarta', flm: 'Nama FLM Vendor', 
      flmRegion: 'Jakarta Pusat', escrow: '1200019271', update: actionUpdate 
    },
    { 
      namaLokasi: 'CIMBN.JKT.Meruya.SPBU', alamat: 'Jl. Gatot Subroto, No.33', mesin: 'ATM', 
      branch: '120192', area: 'Jakarta', kota: 'Jakarta', flm: 'Nama FLM Vendor', 
      flmRegion: 'Jakarta Pusat', escrow: '1200019271', update: actionUpdate 
    },
  ];

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
    // setDataHit({
    //   pageNumber: newPage,
    //   dataPerPage: rowsPerPage,
    // });
  }

  return (
    <div className={classes.root}>
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
          <Typography className={classes.title}>Parameter Detail</Typography>
        </Grid>

        <Grid item alignContent='flex-end'>
          <Typography style={{fontWeight: 600, fontSize: 13}}>Tanggal Online : {param.onlineDate}</Typography>
          <Typography className={classes.dueDate}>{param.dueDate} Days Left</Typography>
          <br/>
          <Progress style={{right: 50}} progress={param.status}/>
        </Grid>

      </Grid>

      <div className={classes.tabBack}>
        <Tabs
          classes={tabsStyles}
          value={selectedTab} 
          onChange={handleSelectedTab}
          centered
        >
          <Tab classes={tabItemStyles} label="Request"  />
          <Tab classes={tabItemStyles} label="Done" />
        </Tabs>
      </div>
      <TabPanel value={selectedTab} index={0}>
        <ChkyTablePagination
          data={dataRequest}
          fields={titleTable}
          cellOption={valueType}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoadData={isOpenModalLoader}
          changePage={handleChangePageValue}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <ChkyTablePagination
          data={dataDone}
          fields={titleTable}
          cellOption={valueType}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoadData={isOpenModalLoader}
          changePage={handleChangePageValue}
        />
      </TabPanel>
    </div>
  );
};

export default ParameterRecons;