import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Tab, Tabs, Button, MenuItem, Select, Menu } from '@material-ui/core';
import constants from '../../../../helpers/constants';

import ChkyTablePagination from '../../../../components/chky/ChkyTablePagination';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { ReactComponent as ArrowLeft } from '../../../../assets/icons/siab/arrow-left.svg';
import { ReactComponent as Check } from '../../../../assets/icons/siab/check-green.svg';
import { ReactComponent as Sync } from '../../../../assets/icons/siab/sync-alt.svg';
import { ReactComponent as ArrowUp } from '../../../../assets/icons/siab/arrow-up-right.svg';
import { ReactComponent as DropDownIcon } from '../../../../assets/icons/siab/chevron-down.svg';

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
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 135,
    height: 40,
    marginLeft: 25,
  },
  exportBtn: {
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: constants.color.primaryHard,
      color: 'white',
      borderRadius: 7
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      height: 40
    },
  },
  menu: {
    '& .MuiMenu-paper': {
      minWidth: 100
    },
    '& .MuiMenuItem-root': {
      justifyContent: 'space-between'
    },
  }
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

const ParameterTeam = () => {
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
  const { Option } = Select;
  
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
  [ 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'modal' ];

  const titleTable = [
    'ID Mesin',
    'Teller ID',
    'Remote Port',
    'Account',
    'Sub Acc',
    'Provider',
    'IP Mesin',
    'IP GW',
    'Sub Net',
    'No PSF',
    'Tgl PSF Selesai',
    'Status PSF',
    ''
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
      idMesin: '1101', tellerId: '129921', remote: '12001129128', 
      account: 'useraccount', subAcc: 'Sub Account', provider: '12001129128', 
      ipMesin: '128287612', IpGw: '120009271', subNet: '12000192172', 
      noPsf: '120019281', tglSelesai: '10/10/2020', status: 'On Progress', update: actionUpdate 
    },
    { 
      idMesin: '1101', tellerId: '129921', remote: '12001129128', 
      account: 'useraccount', subAcc: 'Sub Account', provider: '12001129128', 
      ipMesin: '128287612', IpGw: '120009271', subNet: '12000192172', 
      noPsf: '120019281', tglSelesai: '10/10/2020', status: 'On Progress', update: actionUpdate 
    },
  ];

  const dataDone = [
    { 
      idMesin: '1101', tellerId: '129921', remote: '12001129128', 
      account: 'useraccount', subAcc: 'Sub Account', provider: '12001129128', 
      ipMesin: '128287612', IpGw: '120009271', subNet: '12000192172', 
      noPsf: '120019281', tglSelesai: '10/10/2020', status: 'Done', update: actionUpdate 
    },
    { 
      idMesin: '1101', tellerId: '129921', remote: '12001129128', 
      account: 'useraccount', subAcc: 'Sub Account', provider: '12001129128', 
      ipMesin: '128287612', IpGw: '120009271', subNet: '12000192172', 
      noPsf: '120019281', tglSelesai: '10/10/2020', status: 'Done', update: actionUpdate 
    },
  ];

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
    // setDataHit({
    //   pageNumber: newPage,
    //   dataPerPage: rowsPerPage,
    // });
  }

  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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

      <Grid container direction='row' justify='flex-end' spacing={2}>
        <Grid item>
          <Button
            variant="outlined"
            disableElevation
            className={classes.secondaryButton}
            // onClick={onClose}
            style={{ textTransform: 'capitalize' }}
          >
                  Send PSF
          </Button>
        </Grid>
        <Grid item className={classes.exportBtn}>
          <Button variant='contained' onClick={handleClick} endIcon={<DropDownIcon/>}>
                Export
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.menu}
          >
            <div className={classes.menu}>
              <MenuItem onClick={handleClose} value={1}>
                <Typography>PDF</Typography>
                <ArrowUp fontSize="small" />
              </MenuItem>
            </div>
            <div className={classes.menu}>
              <MenuItem onClick={handleClose} value={2}>
                <Typography>Excel</Typography>
                <ArrowUp fontSize="small" />
              </MenuItem>
            </div>
          </Menu>
        </Grid>
      </Grid>
       
    </div>
  );
};

export default ParameterTeam;