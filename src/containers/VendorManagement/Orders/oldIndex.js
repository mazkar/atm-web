import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Typography, Grid} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import * as ThemeColor from "../../../assets/theme/colors";
import CardPortal from "./CardPortal";
import IconKebutuhan from '../../../assets/icons/duotone-others/exchange-alt.svg';
import IconMesin from '../../../assets/icons/duotone-others/calculator.svg';
import IconGudang from '../../../assets/icons/duotone-others/building.svg';
import IconBooth from '../../../assets/icons/duotone-others/store.svg';
import IconSignage from '../../../assets/icons/duotone-others/camera.svg';
import IconAktivasi from '../../../assets/icons/duotone-others/check-double.svg';
import IconTerminasi from '../../../assets/icons/duotone-others/undo.svg';
import IconJarkom from '../../../assets/icons/duotone-others/rss.svg';
import IconParam from '../../../assets/icons/duotone-others/list.svg';
import IconKeamanan from '../../../assets/icons/duotone-others/lock.svg';
import IconMaintenance from '../../../assets/icons/duotone-others/tools.svg';
// eslint-disable-next-line import/no-cycle
import { RootContext } from '../../../router';
import { doFetchListCard } from '../ApiServices';
import LoadingView from '../../../components/Loading/LoadingView';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: "calc(100vh - 64px)",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: ThemeColor.Dark,
    marginBottom: 15,
  },
});
export const dataCard=[
  {title: "Kebutuhan", type: "need", leftIcon: IconKebutuhan, url:"/vendor-management/orders/kebutuhan", urlVendor:"/vendor-orders/kebutuhan"},
  {title: "Mesin", type: "mesin", leftIcon: IconMesin, url:"/vendor-management/orders/mesin", urlVendor:"/vendor-orders/mesin"},
  {title: "UI Gudang", type: "", leftIcon: IconGudang, url:"/vendor-management/orders/gudang", urlVendor:"/vendor-orders/gudang"},
  {title: "Booth", type: "booth", leftIcon: IconBooth, url:"/vendor-management/orders/booth", urlVendor:"/vendor-orders/booth"},
  {title: "Signage", type: "signage", leftIcon: IconSignage, url:"/vendor-management/orders/signage", urlVendor:"/vendor-orders/signage"},
  {title: "Aktivasi", type: "activation", leftIcon: IconAktivasi, url:"/implementation/vendor", urlVendor:"/implementation/vendor"},
  {title: "Terminasi", type: "termination", leftIcon: IconTerminasi, url:"/implementation/vendor", urlVendor:"/implementation/vendor"},
  {title: "Jarkom", type: "jarkom", leftIcon: IconJarkom, url:"/implementation/vendor/main-jarkom", urlVendor:"/implementation/vendor"},
  {title: "Parameter", type: "parameter", leftIcon: IconParam, url:"/implementation/vendor", urlVendor:"/implementation/vendor"},
  {title: "Keamanan", type: "security", leftIcon: IconKeamanan, url:"/implementation/vendor", urlVendor:"/implementation/vendor"},
  {title: "Maintenance", type: "", leftIcon: IconMaintenance, url:"/implementation/vendor", urlVendor:"/implementation/vendor"},
];
function index(props) {
  const classes = useStyles();
  const { userRoleName, userVendorId } = useContext(RootContext);
  const [cardMenus, setCardMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // HANDLER
  function loaderHandler(bool){
    setIsLoading(bool);
  }

  useEffect(() => {
    if(userRoleName.toLowerCase().includes('vendor')){
      doFetchListCard(loaderHandler).then((response)=>{
        // console.log("+++ vendor menus", response);
        const menus = [];
        dataCard.map((card) => {
          response.map((itemMenu)=>{
            if(card.type === itemMenu){
              menus.push(card);
            }
          });
        });
        setCardMenus(menus);

      }).catch((err) => {
        // console.log('Error Get Data', err);
        alert(`Terjadi Kesalahan:${err}`);
      });
    }else{
      setCardMenus(dataCard);
    }
  }, []);
  
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Vendor Order</Typography>
      <Grid container spacing={2}>

        {isLoading? (
          <div style={{height: 250, width: "100%"}}>
            <LoadingView maxheight='100%' isTransparent />
          </div>
        ):(
          <>
            {cardMenus.map((item)=>{
              return (
                <Grid item xs={3}>
                  <CardPortal title={item.title} subtitle={item.subtitle} leftIcon={item.leftIcon} url={userRoleName.toLowerCase().includes("vendor") ? item.urlVendor : item.url}/>
             
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </div>
  );
}

index.propTypes = {

};

export default index;

