import React, { useState, Suspense, lazy, useEffect, createContext, useContext } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import Axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { Dark, GrayUltrasoft, PrimaryHard } from '../../../assets/theme/colors';
import InfoCard from './partials/InfoCard';
import FilterBar from './partials/FilterBar';
import Achievement from './partials/Achievement';
import AtmImplementation from './partials/AtmImplementation';
import Summary from './partials/Summary';
import AverageCagr from './partials/AverageCagr';
import constants from '../../../helpers/constants';
import { getPencapaian, mapCardDetail, rearrangeArrayByStatus } from '../../../helpers/siteManOver';
import LoadingView from '../../../components/Loading/LoadingView';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import { RootContext } from '../../../router';

const SiteMap = lazy(() => import('./partials/SiteMap'));

export const SiteManOvContext = createContext();
const { Provider } = SiteManOvContext;

const useStyles = makeStyles((theme) => ({
  backBtnLabel: {
    fontWeight: '600',
    fontSize: '17px',
    lineHeight: '20px',
    color: PrimaryHard,
    textTransform: 'capitalize',
  },
  backBtnRoot: {
    background: 'white',
    border: `1px solid ${PrimaryHard}`,
    boxSizing: 'border-box',
    boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
    borderRadius: '6px',
  },
}));

const today = new Date();
export const thisYear = today.getFullYear();

const index = () => {
  const classes = useStyles();
  const CancelToken = Axios.CancelToken;
  const source = CancelToken.source();
  const { userAreas: contextUserAreas, userId } = useContext(RootContext);
  const [activeFilter, setActiveFilter] = useState(null);
  const [points, setPoints] = useState([]);
  const [detailPoints, setDetailPoints] = useState([]);
  const [existingPoints, setExistingPoints] = useState([])
  const [isDetailMap, setIsDetailMap] = useState(false);
  const [picAreaId, setPicAreaId] = useState(0); // PIC Area ID untuk map detail area
  const [isModalLoadingOpen, setIsModalLoadingOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMapReloadShown, setIsMapReloadShown] = useState(false);
  const [cagrData, setCagrData] = useState([]);
  const [cardDetail, setCardDetail] = useState(null);
  const [achData, setAchData] = useState(null);
  const [sumData, setSumData] = useState(null);
  const [atmImpData, setAtmImpData] = useState(null);
  const [isAchLoading, setIsAchLoading] = useState(false);
  const [isCagrLoading, setIsCagrLoading] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState('');
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedPicSite, setSelectedPicSite] = useState(null)

  const {year = thisYear + '', openingType = 'New', cityId = 'All', month = 'All' } = activeFilter || {}

  const areaName = points.find((val) => val.picAreaId === picAreaId)?.name;
  const userAreas = contextUserAreas.length > 0 ? contextUserAreas : areas.map(({id})=>id)
  // const userAreasStringArr = userAreas.map((val) => val + '');
  const areasStrArr = areas.map(({id})=>id+'')
  const userAreasStr = userAreas.toString();
  const selectedAreaArr =
    typeof selectedArea === 'string' ? selectedArea.split(',') : [selectedArea + '']; // array of string
  const selectedPicSiteArr =
    selectedPicSite === 'All' ? areasStrArr : [selectedPicSite + '']; // array of string

  function applyFilter(filters) {
    setActiveFilter(filters);
  }

  function handleSelectArea(e) {
    setSelectedArea(e.target.value);
  }

  function handleSelectPicSite(e) {
    setSelectedPicSite(e.target.value);
  }

  useEffect(() => {
    if (userAreasStr.length > 0 && areas.length > 0) {
      setSelectedArea(userAreasStr);
    }
    if (areas.length > 0) {
      setSelectedPicSite('All')
    }
  }, [userAreasStr, areas]);

  useEffect(() => {
    if (userId) {
      Axios({
        method: 'POST',
        url: `${constants.apiHost}/getAreaAll`,
      })
        .then(({ data }) => {
          let updateArea = data.data;
          setAreas(updateArea);
        })
        .catch((err) => {});
    }
  }, [userId]);

  useEffect(() => {
    if (selectedArea) {
      getAtmImpData()
        .then(handleAtmImpData)
        .catch((err) => {
          console.log(err);
        });
    }
  }, [year, month, selectedArea, selectedPicSite]);

  useEffect(() => {
    // Initial map load
    if (!isDetailMap && year && openingType && cityId && selectedArea && selectedPicSite) {
    // console.log('hit API map general');
      getMapDataPromise()
    }
    return () => source.cancel('Get map data cancelled.');
  }, [isDetailMap, year, month, openingType, cityId, selectedArea, selectedPicSite]);

  useEffect(() => {
    if (year && openingType && cityId && selectedArea && selectedPicSite) {
      getCardDetail()
        .then(handleCardDetailRes)
        .catch((err) => console.log(err));
    }
  }, [year, month, openingType, cityId, selectedArea, selectedPicSite]);

  useEffect(() => {
    if (openingType && selectedArea && selectedPicSite) {
      setIsAchLoading(true);
      getAchievementData()
        .then(handleAchData)
        .catch((err) => {
          setAchData(null);
          setIsAchLoading(false);
        });
      setSumData();
      getSummaryData()
        .then(handleSummaryData)
        .catch((err) => {});
    }
  }, [year, month, openingType, selectedArea, selectedPicSite]);

  function handleMapReload() {
    if (isDetailMap) {
      getAreaMapData();
    } else {
      getMapDataPromise()
    }
  }

  useEffect(() => {
    if (picAreaId) {
      getAreaMapData();
      // console.log(picAreaId);
    }
    return () => source.cancel('Get map data cancelled.');
  }, [picAreaId, year, month, openingType, cityId, selectedPicSite]);

  function getMapData() {
    const url = `${constants.apiDomain}/profilelocationservices/profilelocationservices/v1/dashboardSummaryOverview`;
    setIsMapLoaded(false);
    setIsMapReloadShown(false);
    return Axios.post(
      url,
      {
        year,
        month,
        openingType,
        picAreaId: selectedAreaArr,
        picSiteId: selectedPicSiteArr
      },
      {
        cancelToken: source.token,
      }
    );
  }

  function handleMapRes(res) {
    // console.log(res.data);
    // console.log(selectedAreaArr);
    if (res.data.responseCode === '00') {
      const thePoints = res.data.overviewDetailList
        .filter((val) => selectedAreaArr.includes(val.picAreaId + ''))
        .map(({ actual, target, latitude, longitude, picAreaId, name }) => ({
          loc: [latitude, longitude],
          top: actual,
          bottom: target,
          picAreaId,
          name,
        }));
      // console.log(thePoints);
      setPoints(thePoints);
      setIsMapLoaded(true);
    } else {
      setIsMapReloadShown(true);
      setOverlayMessage(res.data.responseMessage);
    }
  }

  function getMapDataPromise(){
    return getMapData()
      .then(handleMapRes)
      .catch((err) => {
        if (Axios.isCancel(err)) {
          // console.log('Request canceled', err.message);
        } else {
          // handle error
          setIsMapReloadShown(true);
        }
      });
  }

  function getAreaMapData() {
    setIsMapLoaded(false);
    setIsMapReloadShown(false);
    const url = `${constants.apiDomain}/profilelocationservices/profilelocationservices/v1/dashboardSummaryOverviewPicArea`;
    if (picAreaId) {
      Axios.post(
        url,
        {
          picAreaId,
          openingType,
          year,
          month,
          cityId,
          picSiteId: selectedPicSite
        },
        {
          cancelToken: source.token,
        }
      )
        .then((res) => {
          // console.log(res.data);
          setIsDetailMap(true);
          if (res.data.responseCode === '00') {
            const mapped = res.data.overviewPicAreaDetailList.map((val) => ({
              loc: [val.latitude, val.longitude],
              topPopup: val.status,
              bottomPopup: val.atmId,
            }));
            const mappedExisting = res.data.overviewExistingAtmPicAreaList.map((val) => ({
              loc: [val.latitude, val.longitude],
              topPopup: val.status,
              bottomPopup: val.atmId,
            }));
            // console.log(mapped);
            setDetailPoints(mapped);
            setExistingPoints(mappedExisting)
            setIsMapLoaded(true);
          } else {
            setIsMapReloadShown(true);
            setOverlayMessage(res.data.responseMessage);
          }
        })
        .catch((err) => {
          if (Axios.isCancel(err)) {
            // console.log('Request canceled', err.message);
          } else {
            // handle error
            setIsMapReloadShown(true);
          }
        });
    }
  }

  function getCardDetail() {
    return Axios.post(
      `${constants.apiDomain}/profilelocationservices/profilelocationservices/v1/dashboardSummaryOpeningType`,
      {
        year,
        month,
        cityId,
        openingType: 'All',
        ...(userAreas && { picAreaId: selectedArea + '', picSiteId: selectedPicSite + '' }),
      }
    );
  }

  function handleCardDetailRes(res) {
    setIsModalLoadingOpen(true);
    // console.log(res.data);
    const {
      responseCode,
      listNewDetail,
      listRenewalDetail,
      listReplaceDetail,
      listTerminDetail,
      sumTotalNewAtm,
      sumTotalRenewal,
      sumTotalReplace,
      sumTotalTermin,
      completedRenewal
    } = res.data;
    if (responseCode === '00') {
      setIsModalLoadingOpen(false);
      const listRenewalDetailModif = rearrangeArrayByStatus(listRenewalDetail, [7, 3, 4, 5, 14]);
      const listTerminDetailModif = rearrangeArrayByStatus(listTerminDetail, [5, 8, 6, 10, 12]);
      const listReplaceDetailModif = rearrangeArrayByStatus(listReplaceDetail, [5, 8, 6, 12]);
      setCardDetail({
        newAtm: {
          pencapaian: getPencapaian(listNewDetail, 13),
          target: sumTotalNewAtm,
          detail: mapCardDetail(listNewDetail, 'new'),
          listNewDetail
        },
        renewal: {
          pencapaian: completedRenewal,// getPencapaian(listRenewalDetail, 6),
          target: sumTotalRenewal,
          detail: mapCardDetail(listRenewalDetailModif, 'renewal'),
        },
        termin: {
          pencapaian: getPencapaian(listTerminDetail, 10),
          target: sumTotalTermin,
          detail: mapCardDetail(listTerminDetailModif, 'termin'),
        },
        replace: {
          pencapaian: getPencapaian(listReplaceDetail, 11),
          target: sumTotalReplace,
          detail: mapCardDetail(listReplaceDetailModif, 'replace'),
        },
      });
    }
  }

  function getAchievementData() {
    return Axios.post(
      `${constants.apiDomain}/profilelocationservices/profilelocationservices/v1/dashboardSummaryTarget`,
      {
        openingType: openingType || 'New',
        picAreaId: selectedArea + '',
        picSiteId: selectedPicSite + '',
        cityId,
        year,
        month: month !== 'All' ? month : null,
      }
    );
  }

  function handleAchData(res) {
    // console.log(res.data);
    setIsAchLoading(false);
    if (res.data.responseCode === '00') {
      setAchData(res.data);
    } else {
      setAchData(null);
    }
  }

  function getSummaryData() {
    return Axios.post(
      `${constants.apiDomain}/profilelocationservices/profilelocationservices/v1/dashboardSummaryDocument`,
      {
        openingType: openingType && openingType !== 'New' ? openingType : 'New Location',
        year,
        month,
        ...(userAreas && { picAreaId: selectedAreaArr, cityId, picSiteId: selectedPicSiteArr }),
      }
    );
  }

  function handleSummaryData(res) {
    // console.log(res.data);
    if (res.data.responseCode === '00') {
      setSumData(res.data);
    }
  }

  function getAtmImpData() {
    return Axios.post(
      `${constants.apiDomain}/profilelocationservices/profilelocationservices/v1/dashboardSummaryAtmImplementation`,
      {
        year,
        month,
        ...(userAreas && { picAreaId: selectedAreaArr, cityId, picSiteId: selectedPicSiteArr }),
      }
    );
  }

  function handleAtmImpData(res) {
    // console.log(res.data);
    if (res.data.responseCode === '00') {
      setAtmImpData(res.data);
    }
  }

  function getRenewalCagrData(reqData) {
  // console.log('??? HIT getRenewalCagrData');
    const { area: areaId, year = moment().year(), range: month } = reqData || {};
    return Axios.post(
      `${constants.apiDomain}/profilelocationservices/profilelocationservices/v1/dashboardRenewalCagr`,
      {
        areaId: typeof selectedArea === 'string' ? null : selectedArea + '',
        year: year + '',
        month: month || null,
      }
    );
  }

  function handleRenewalCagrData(res) {
    // console.log(res.data);
    setIsCagrLoading(false);
    if (res.data.responseCode === '200') {
      setCagrData(res.data.averageCagrRenewalListData);
    }
  }

  function handleStateChangeCagr(cagrState) {
    setIsCagrLoading(true);
    getRenewalCagrData(cagrState)
      .then(handleRenewalCagrData)
      .catch((err) => {
        // console.log(err);
        setIsCagrLoading(false);
      });
  }

  return (
    <>
      <Provider
        value={{
          cagrData,
          achData,
          sumData,
          atmImpData,
          isAchLoading,
          handleStateChangeCagr,
          isCagrLoading,
          areas,
          handleSelectArea,
          selectedArea,
          setSelectedArea,
          handleSelectPicSite,
          selectedPicSite,
          openingType
        }}
      >
        <div
          style={{
            backgroundColor: GrayUltrasoft,
            minHeight: 'calc(100vh - 60px)',
          }}
        >
          <div style={{ padding: 30 }}>
            <Typography
              style={{
                fontWeight: 500,
                fontSize: '36px',
                lineHeight: '43px',
                color: Dark,
                textShadow: '0px 6px 10px rgba(0, 0, 0, 0.08)',
              }}
            >
              Site Management
            </Typography>
          </div>
          {isDetailMap && (
            <div
              style={{
                padding: '0 30px',
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                variant='contained'
                classes={{
                  root: classes.backBtnRoot,
                  label: classes.backBtnLabel,
                }}
                onClick={() => {
                  setIsDetailMap(false);
                  setPicAreaId(0);
                  setActiveFilter({...activeFilter, cityId: 'All'});
                  setSelectedArea(userAreasStr)
                }}
                startIcon={<ArrowBackIcon />}
              >
                Lihat Semua Area
              </Button>
              <Typography
                style={{
                  fontWeight: '600',
                  fontSize: '17px',
                  lineHeight: '20px',
                }}
              >
                Area {areaName}
              </Typography>
            </div>
          )}
          <div style={{ padding: '0 30px', position: 'relative' }}>
            <FilterBar {...{ applyFilter, isDetailMap, picAreaId }} />
          </div>
          <Suspense fallback={<div />}>
            <SiteMap
              {...{
                points,
                isMapLoaded,
                isMapReloadShown,
                handleMapReload,
                setPicAreaId,
                isDetailMap,
                detailPoints,
                existingPoints,
                overlayMessage,
                setIsDetailMap
              }}
            />
          </Suspense>
          <div style={{ padding: 30, paddingBottom: 20 }}>
            {isModalLoadingOpen ? (
              <LoadingView maxheight='100%' />
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <InfoCard
                    content={cardDetail?.newAtm}
                    title='New'
                    target='/rbb-implementation#NewATM'
                  />
                </Grid>
                <Grid item xs={3}>
                  <InfoCard
                    content={cardDetail?.renewal}
                    title='Renewal'
                    target='/rbb-implementation#Renewal'
                  />
                </Grid>
                <Grid item xs={3}>
                  <InfoCard
                    content={cardDetail?.termin}
                    title='Termin'
                    target='/rbb-implementation#Termin'
                  />
                </Grid>
                <Grid item xs={3}>
                  <InfoCard
                    content={cardDetail?.replace}
                    title='Replace'
                    target='/rbb-implementation#Replace'
                  />
                </Grid>
              </Grid>
            )}
          </div>
          <Achievement type={openingType || 'New'}/>
          <Summary />
          <AtmImplementation />
          <AverageCagr />
          {/* // <ModalLoader isOpen={isModalLoadingOpen} /> */}
          {/* <FloatingChat /> */}
        </div>
      </Provider>
    </>
  );
};

export default index;
