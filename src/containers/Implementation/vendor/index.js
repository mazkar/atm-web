import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Grid} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import * as ThemeColor from "../../../assets/theme/colors";
import CardPortal from "./common/CardPortal";
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
const dataCard=[
  {title: "Kebutuhan", leftIcon: IconKebutuhan, url:"/vendor-management/orders/kebutuhan"},
  {title: "Mesin", leftIcon: IconMesin, url:"/implementation/vendor/main-mesin"},
  {title: "UI Gudang", leftIcon: IconGudang, url:"/implementation/vendor/gudang"},
  {title: "Booth", leftIcon: IconBooth, url:"/implementation/vendor/main-list-booth"},
  {title: "Signage", leftIcon: IconSignage, url:"/implementation/vendor"},
  {title: "Aktivasi", leftIcon: IconAktivasi, url:"/implementation/vendor"},
  {title: "Terminasi", leftIcon: IconTerminasi, url:"/implementation/vendor"},
  {title: "Jarkom", leftIcon: IconJarkom, url:"/implementation/vendor/main-jarkom"},
  {title: "Parameter", leftIcon: IconParam, url:"/implementation/vendor"},
  {title: "Keamanan", leftIcon: IconKeamanan, url:"/implementation/vendor"},
  {title: "Maintenance", leftIcon: IconMaintenance, url:"/implementation/vendor"},
];
function index(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Implementation Vendor</Typography>
      <Grid container spacing={2}>
        {dataCard.map((item)=>{
          return (
            <Grid item xs={3}>
              <CardPortal title={item.title} subtitle={item.subtitle} leftIcon={item.leftIcon} url={item.url}/>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

index.propTypes = {

};

export default index;

