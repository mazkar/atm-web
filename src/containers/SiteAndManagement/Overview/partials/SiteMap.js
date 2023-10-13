import React, { useContext, useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Map, Marker, Popup, ZoomControl, TileLayer } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import clsx from 'clsx';

import mapLocationIconUrl from '../../../../assets/icons/general/map-location.svg';
import mapLocationIconUrlBlue from '../../../../assets/icons/general/map-location-selected.svg';
import { GrayMedium, PrimaryHard, GraySoft } from '../../../../assets/theme/colors';
import LoadingOverlayWrapper from './LoadingOverlayWrapper';
import { SiteManOvContext } from '../index';
import { getStatusLabel } from '../../../../helpers/siteManOver';
import FullscreenControl from 'react-leaflet-fullscreen';
import 'react-leaflet-fullscreen/dist/styles.css';

const useStyles = makeStyles((theme) => ({
  markerRounded: {
    display: 'inline-block',
    borderRadius: 80,
    border: `2px solid ${PrimaryHard}`,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textMarker: {
    width: '100%',
    display: 'block',
    textAlign: 'center',
    lineHeight: '12px',
    fontSize: 10,
  },
  textMarkerRed: {
    color: PrimaryHard,
  },
  popup: {
    '& .leaflet-popup-content': {
      margin: 0,
      padding: '10px 15px',
    },
  },
}));

const defaultCenter = [-2.5, 118];

const SiteMap = (props) => {
  const classes = useStyles();
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(5);
  const { setSelectedArea, openingType } = useContext(SiteManOvContext);

  const isDetail = props.isDetailMap;
  const currentPoints = isDetail ? props.detailPoints : props.points;
  const pointsWithCoord = currentPoints.filter((val) => val.loc[0] && val.loc[1]);
  const arrX = pointsWithCoord.map((val) => val.loc[0]);
  const arrY = pointsWithCoord.map((val) => val.loc[1]);
  const bounds = [
    [Math.min(...arrX), Math.min(...arrY)],
    [Math.max(...arrX), Math.max(...arrY)],
  ];
  useEffect(() => {
    if (isDetail) {
      if (pointsWithCoord.length === 1) {
        setZoom(10);
        setCenter(pointsWithCoord[0].loc);
      } else {
        setZoom();
      }
    } else {
      setZoom(5);
      setCenter(defaultCenter);
    }
  }, [isDetail, currentPoints]);

  // console.log(props);

  const DetailMarker = ({ item, color }) => {
    const customMarker = L.icon({
      iconUrl: color === 'red' ? mapLocationIconUrl : mapLocationIconUrlBlue,
      iconAnchor: [15, 15],
      iconSize: [30, 30],
    });
    return (
      <Marker icon={customMarker} position={item.loc}>
        <Popup className={classes.popup}>
          <div style={{ ...popupStyle, marginBottom: 2 }}>
            {getStatusLabel(item.topPopup, openingType)}
          </div>
          <div style={{ ...popupStyle, color: GrayMedium }}>
            ATM ID {openingType === 'New' && item.topPopup != 12 && color === 'red' ? '-' : item.bottomPopup}
          </div>
        </Popup>
      </Marker>
    );
  };

  return (
    <Box style={{ height: 400, zIndex: 1 }}>
      <LoadingOverlayWrapper
        open={!props.isMapLoaded}
        isReloadShown={props.isMapReloadShown}
        reloadBtnAction={() => {
          props.handleMapReload(true);
        }}
        message={props.overlayMessage}
      >
        <Map
          center={center}
          zoom={zoom}
          zoomControl={false}
          scrollWheelZoom={false}
          bounds={props.isDetailMap && props.detailPoints.length > 1 ? bounds : null}
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            backgroundColor: GraySoft,
            marginTop: -20,
          }}
        >
          <FullscreenControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {props.isMapLoaded &&
            (!isDetail
              ? pointsWithCoord?.map((item, i) => {
                  const icon = divIcon({
                    className: classes.markerRounded,
                    html: `
                      <span class='${classes.textMarker}'>
                        ${item.top}
                      </span>
                      <span class='${clsx(classes.textMarker, classes.textMarkerRed)}'>
                        ${item.bottom}
                      </span>
                    `,
                    iconSize: [40, 40],
                  });
                  return (
                    <Marker
                      key={i}
                      icon={icon}
                      position={item.loc}
                      onClick={(e) => {
                        // console.log(item);
                        props.setPicAreaId(item.picAreaId);
                        props.setIsDetailMap(true)
                        setSelectedArea(item.picAreaId);
                      }}
                    ></Marker>
                  );
                })
              : pointsWithCoord?.map((item, i) => {
                  return <DetailMarker key={i} item={item} color='red' />;
                }))}
          {props.isMapLoaded &&
            isDetail &&
            props.existingPoints?.map((item, i) => {
              return <DetailMarker key={i} item={item} color='blue' />;
            })}
          <ZoomControl position='bottomright' />
        </Map>
      </LoadingOverlayWrapper>
    </Box>
  );
};

export default SiteMap;

const popupStyle = {
  fontWeight: 500,
  fontSize: '10px',
  lineHeight: '12px',
  textAlign: 'center',
};
