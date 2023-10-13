import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Box,
  Tab,
  Tabs,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Axios from 'axios';
import moment from 'moment';
import constants from '../../helpers/constants';
import * as ThemeColor from '../../assets/theme/colors';
import { ChildHargaPenawaran, ChkyTablePagination } from '../../components/chky';
import ModalLoader from "../../components/ModalLoader";
import { useRenameOpeningType } from '../../helpers';
import FilterBar from './FilterBar';
import ChildTieringList from '../../components/chky/TableChild/ChildTieringList';
import useRupiahConverterSecondary from '../../helpers/useRupiahConverterSecondary';

const ContentTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: ThemeColor.PrimaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: constants.color.grayMedium,
    '&:hover': {
      color: constants.color.dark,
      opacity: 1,
    },
    '&$selected': {
      color: constants.color.dark,
    },
    '&:focus': {
      color: constants.color.dark,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles({
  contentHeader: {
    padding: 30,
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    color: constants.color.dark,
    textShadow: '0px 6px 10px rgba(0, 0, 0, 0.08)',
  },
});

const idrCurrencyFormat = (value, delimiter) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
};

const dateConverter = (tanggal) => {
  const dateNya = moment(new Date(tanggal)).format('DD-MM-YYYY');
  return dateNya;
};

const PlanAndAnalytic = ({ history }) => {
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    contentHeader,
    title,
  } = useStyles();

  const navigateToPage = (to) => history.push(to);
  const dataATM = [];
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(2);
  const [filterData, setFilterData] = useState({})
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const titleReject = [
    t('siteManagement.locationName'),
    t('siteManagement.locationType'),
    t('siteManagement.latitudee'),
    t('siteManagement.longitude'),
    t('siteManagement.submiter'),
    t('siteManagement.submitDate'),
    'Harga Penawaran',
    t('siteManagement.landLordName'),
    t('siteManagement.locationPrice'),
    t('siteManagement.status'),
    t('siteManagement.action'),
  ];

  const valueReject = [
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'child',
    'string',
    'child',
    'string',
    'modal',
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;
  const [totalRows, setTotalRows] = useState(0);
  const [resetPageCounter, setResetPageCounter] = useState(0);

  function handleChangePageValue(newPage){
    setCurrentPage(newPage);
  };

  const handleChange = (event, newTabValue) => {
    event.preventDefault();
    setTabValue(newTabValue);
    if(newTabValue === 0){
      navigateToPage('/acquisition');
    };
    if(newTabValue === 1){
      navigateToPage('/acquisition/savedLocation');
    };
  };

  useEffect(()=>{
    fetchRejectedLocation();
  }, [currentPage, filterData, orderBy, orderDirection]);

  useEffect(() => {
  }, [tabValue]);

  const dataToSet = [];
  const [dataTableRejectedLocation, setdataTableRejectedLocation] = useState([]);

  const handleRejectLocation = (id) => {
    editRejectLoc(id);
  };

  const fetchRejectedLocation = async() => {
    const {areaId, cityId, locationType} = filterData
    try {
      setModalLoader(true);
      const data = await Axios({
        url:  `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/savedLocationReject`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          pageNumber: currentPage,
          dataPerPage: rowsPerPage,
          ...(areaId && {areaId}),
          ...(cityId && {cityId}),
          ...(locationType && {locationType}),
          ...(orderBy && {orderBy, orderDirection})
        },
      });
      const getData = data.data;
      // console.log('REJECT LOCATION ====> : ', getData.data);
      const dataNewPre = getData.data.data;
      setTotalPages(getData.data.totalPages);
      setTotalRows(getData.data.totalElements);
      // eslint-disable-next-line array-callback-return
      dataNewPre.map((row) => {
        const actionDetails = [
          { name: 'Edit', id: row.idSite, funct: handleRejectLocation},
        ];
        const newRow = {
          locationName: row.locationName,
          locationType: row.locationType,
          latitude: row.latitude,
          longitude: row.longitude,
          submitter: row.submitterUsername,
          submitDate: dateConverter(row.submittedDate),
          hargaPenawaran: <ChildTieringList array={JSON.parse(row.yearlyRentCostList)} />,
          landLordName: row.landLord,
          price: <ChildHargaPenawaran lowest={row.lowestPrice} middle={row.approximatePrice} hihgest={row.highestPrice}/>,
          status: row.status === "1" ? 'Rejected' : row.status === "2" ? 'Cancelled' : 'Postpone',
          action: actionDetails,
        };
        // set constructed data
        dataToSet.push(newRow);
      });
      setdataTableRejectedLocation(dataToSet);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      console.log(`Error Fetching Data Get Saved Location : \n ${error}`);
    }
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    localStorage.removeItem("useGetDraft");
    localStorage.removeItem("dataGetDraftDetail");
  }, []);

  const getDraftDetail = async(idDraft) => {
    try {
      setIsLoading(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getDraftDetail`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          id: idDraft,
        },
      });
      const resItem = data.data.detailData;
      if(resItem){
        const setResItem = {...resItem, isEdit: true, idDraft };
        localStorage.setItem("useGetDraft", "true");
        localStorage.setItem("dataGetDraftDetail", JSON.stringify(setResItem));
        if(resItem.status === 1) {
          dataATM.push(resItem.findNearbyAtmResponse.atmPoints);
          // setItems(dataATM[0]);
          // quotaBI = resItem.cityQuota;
          // setQuotaPerKota(quotaBI);
          // toggleOpenDrawer();
          localStorage.setItem("dataNearestATMCard", JSON.stringify(dataATM[0]));
          let dataLocation = {
            longitude: resItem.longitude,
            latitude: resItem.latitude,
          };
          dataLocation = JSON.stringify(dataLocation);
          localStorage.setItem('dataSavedLocation', dataLocation);
          navigateToPage('/acquisition');
          console.log("RES ITEM : ", data);
        }else{
          navigateToPage(`/acquisition/profiling?openingType=${useRenameOpeningType(resItem.openingType)}&savedId=${resItem.id}&atmId=${null}`);
        }
      }
      console.log('GET DRAFT DETAIL : ', data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(`Error Fetching Get Draft Detail : \n ${error}`);
    }
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const editRejectLoc = async (id) => {
    try {
      setIsLoading(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/editLocationReject`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          idSiteNewAtm: id,
        },
      });
      getDraftDetail(id);
    } catch (error) {
      setIsLoading(false);
      console.log(`Error Fetching Edit Reject : \n ${error}`);
    }
  };

  function onFilterSubmit(newFilter){
    setFilterData(newFilter)
  }

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleReject.indexOf(property)]);
      setCurrentPage(0);
    };
  }

  return (
    <>
      <Box className={contentHeader}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={title} variant="h1" component="h1">
              {tabValue === 0
                ? 'Profiling 1'
                : tabValue === 1
                  ? t('siteManagement.savedLocation')
                  : t('siteManagement.reject')}
            </Typography>
            <div style={{ marginTop: 20 }}>
              <ContentTabs
                value={tabValue}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <ContentTab
                  label={t('siteManagement.newLocation')}
                  {...a11yProps(0)}
                />
                <ContentTab
                  label={t('siteManagement.savedLocation')}
                  {...a11yProps(1)}
                />
                <ContentTab
                  label={t('siteManagement.reject')}
                  {...a11yProps(1)}
                />
              </ContentTabs>
            </div>
          </Grid>
        </Grid>
      </Box>
      <div style={{padding: '0 30px'}}>
        <FilterBar onFilterSubmit={onFilterSubmit} setCurrentPage={setCurrentPage}/>
      </div>
      <div style={{ padding: '0px 30px' }}>
          <ChkyTablePagination
            data={dataTableRejectedLocation}
            fields={titleReject}
            cellOption={valueReject}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
            resetPageCounter={resetPageCounter}
            outerPage={currentPage+1}
            isLoadData={isOpenModalLoader}
            isSort={isSort}
            isUsingMuiSort={true}
            handleSort={handleSort}
            sortBy={sortBy}
            order={orderDirection}
          />
      </div>
      <ModalLoader isOpen={isLoading} />
    </>
  );
};

PlanAndAnalytic.propTypes = {
  history: PropTypes.func.isRequired,
};

export default PlanAndAnalytic;

const isSort = [true, true, true, true, true, true, false, true, false, true];

const columnNameVar = [
  'locationName',
  'locationType',
  'latitude',
  'longitude',
  'submitterUsername',
  'submittedDate',
  '',
  'landLord',
  'highestPrice',
  'status',
];
