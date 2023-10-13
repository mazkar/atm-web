/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import { ReactComponent as PlusWhite } from '../../assets/icons/siab/plus-white.svg';
import TablePagination from '../../components/chky/ChkyTablePagination';
import constants from '../../helpers/constants';
import secureStorage from '../../helpers/secureStorage';
import { GrayUltrasoft } from '../../assets/theme/colors';
import { getUsers } from '../../helpers/userManagement';
import {ContentTabs, ContentTab, TabPanel, a11yProps} from '../../components/TabsMui';
import VendorUsers from './VendorUsers';

const { userServiceBaseUrl } = constants;

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
    backgroundColor: GrayUltrasoft,
    '& .MuiBox-root': {
      padding: 0,
    },
  },
  titleContainer: {
    paddingBottom: 15,
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constants.color.dark,
  },
  tableContent: {
    marginTop: 20,
  },
  filterSection: {
    padding: '10px 20px 10px 20px',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  dataSectionNoPadding: {
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
});

const titleTable = [
  'User Name',
  'User ID',
  'Email',
  'Role',
  'Divisi',
  'Delegasi',
  'Status',
  'Kategory',
  '',
];
const valueType = [
  'child',
  'string',
  'string',
  'string',
  'string',
  'string',
  'status_user',
  'string',
  'menu_twouser',
];
const isSort = [true, true, false, false, false, false, false];

const Overview = () => {
  const classes = useStyles();
  const history = useHistory();
  // check url hash
  const windowsHash = window.location.hash;
  const access_token = secureStorage.getItem('access_token');
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [dataUserTable, setDataUserTable] = useState([]);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [sortBy, setSortBy] = useState(titleTable[0]);
  const [isLoading, setIsLoading] = useState(true);
  // Init TABS Value
  const [valueTab, setValueTab] = useState(null);

  const rowsPerPage = 10; // <--- init default rowsPerPage

  function goEdit(username, vendorId) {
    if(vendorId){
      history.push(`/user-management/edit/${username}?category=vendor`);
    }else{
      history.push(`/user-management/edit/${username}`);
    }
  }

  function delUser(id, delName = '') {
    if (window.confirm(`Are you sure to delete user ${delName}`)) {
      axios({
        url: `${userServiceBaseUrl}/users/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${  access_token}`,
        },
      })
        .then((res) => fetchData())
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPage, orderDirection, sortBy]);

  async function fetchData() {
    try {
      const res = await getUsers({
        rowsPerPage,
        currentPage,
        orderDirection,
        sortBy: getColumnId(sortBy),
      });
      const { users, totalRecord, rowPerPage } = res.data.data;
      const mappedData = users.map((user) => {
        const dataAction = [
          {
            name: ['Edit', 'Delete'],
            type: ['edit', 'delete'],
            handler: [() => goEdit(user.id, user.vendorId), () => delUser(user.id, user.fullName)],
          },
        ];
        const newRow = {
          userName: user.fullName,
          userId: user.id,
          email: user.email,
          role: user.roleName,
          divisi: user.divisionName,
          delegasi: user.delegationFullName,
          status: user.status ? '1' : '2',
          category: user.vendorId? "Vendor": "CIMB",
          dataAction,
        };
        return newRow;
      });
      setTotalPages(Math.ceil(totalRecord / rowPerPage));
      setTotalRows(totalRecord);
      setDataUserTable(mappedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }

  const handleButton = () => {
    history.push('/user-management/add');
  };

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
  }

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'asc';
      setOrderDirection(isActiveAndAsc ? 'desc' : 'asc');
      setSortBy(property);
    };
  }

  function getColumnId(columnLabel) {
    if (columnLabel === titleTable[0]) {
      return 'fullName';
    }
    return 'id';
  }

  // const handleChangeTab = (event, newValueTab) => {
  //   let hashTab = "";
  //   if (newValueTab === 0) {
  //     hashTab = "cimb";
  //   }
  //   if (newValueTab === 1) {
  //     hashTab = "vendor";
  //   }
  //   history.push(`#${hashTab}`);
  // };

  // useEffect(() => {
  //   if (windowsHash) {
  //     switch (windowsHash) {
  //     case "#cimb":
  //       setValueTab(0);
  //       break;
  //     case "#vendor":
  //       setValueTab(1);
  //       break;
  //     default:
  //       setValueTab(0);
  //     }
  //   } else {
  //     setValueTab(0);
  //   }
  // }, [windowsHash]);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title}>User Management</Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            style={{ width: 120, height: 40 }}
            label="Add User"
            iconPosition="startIcon"
            onClick={handleButton}
            buttonIcon={<PlusWhite />}
          />
        </Grid>
      </Grid>
      {/* <ContentTabs
        value={valueTab}
        onChange={handleChangeTab}
        aria-label="simple tabs example"
      >
        <ContentTab label="CIMB" {...a11yProps(0)} />
        <ContentTab label="Vendor" {...a11yProps(1)} />
      </ContentTabs> */}

      {/* <TabPanel value={valueTab} index={0}> */}
      <div className={classes.container}>
        <div className={classes.tableContent}>
          <TablePagination
            data={dataUserTable}
            fields={titleTable}
            cellOption={valueType}
            isSort={isSort}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
            isUsingMuiSort
            handleSort={handleSort}
            sortBy={sortBy}
            order={orderDirection}
            leftAlignHeaders={[0]}
            isLoadData={isLoading}
          />
        </div>
      </div>
      {/* </TabPanel> */}
      {/* <TabPanel value={valueTab} index={1}>
        <VendorUsers/>
      </TabPanel> */}
      
      {/* <FloatingChat /> */}
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Overview))
);


