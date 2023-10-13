import React from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { Grid, Paper } from "@material-ui/core";
import { ReactComponent as IconStar } from "../../../../assets/icons/duotone-others/star-bg-red.svg";
import * as Colors from "../../../../assets/theme/colors";
import Loading from "../../../../components/Loading/LoadingView";

import { ReactComponent as ExchangeIcon } from "../../../../assets/icons/duotone-red/exchange-alt.svg";
import { ReactComponent as PlusWhite } from "../../../../assets/icons/siab/plus-white.svg";
import { ReactComponent as TagIcon } from "../../../../assets/icons/duotone-red/tag.svg";
import { ReactComponent as ListIcon } from "../../../../assets/icons/duotone-red/list-alt.svg";
import { ReactComponent as IconCalendar } from "../../../../assets/icons/duotone-red/calendar-day.svg";

const useStyles = makeStyles({
  root: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
      borderRadius: 10,
    },
  },
  content: {
    padding: 20,
    height: 160,
  },
  title: {
    fontSize: 15,
    fontFamily: "Barlow",
    fontWeight: 600,
    color: Colors.Dark,
    marginLeft: 5,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: "Barlow",
    fontWeight: 600,
    color: (props) => props.colorSubTitle,
  },
  stringBlack: {
    fontSize: 13,
    fontFamily: "Barlow",
    fontWeight: 500,
    color: Colors.Dark,
  },
  valueA: {
    fontSize: 13,
    fontFamily: "Barlow",
    fontWeight: 500,
    color: (props) => props.colorValueA,
  },
  valueB: {
    fontSize: 13,
    fontFamily: "Barlow",
    fontWeight: 500,
    color: (props) => props.colorValueB,
  },
});

function PaperAsurance(props) {
  const classes = useStyles(props);
  const {
    icon,
    title,
    keyNameA,
    keyNameB,
    keyNameC,
    valA,
    valB,
    valC,
    isLoading,
    valTotalSub,
  } = props;

  return (
    <div className={classes.root}>
      {isLoading ? (
        <Loading maxheight="100%" />
      ) : (
        <Paper>
          <div container className={classes.content}>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Grid container direction="row">
                  <Grid item>{icon}</Grid>
                  <Grid item className={classes.title}>
                    {title}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="flex-end" className={classes.subTitle}>
                  {valTotalSub}
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="row" style={{ marginTop: 10 }}>
              <Grid item className={classes.stringBlack} xs={6}>
                {keyNameA}
              </Grid>
              <Grid item xs={6}>
                <Grid container justify="flex-end" className={classes.valueA}>
                  {valA}
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="row" style={{ marginTop: 10 }}>
              <Grid item className={classes.stringBlack} xs={6}>
                {keyNameB}
              </Grid>
              <Grid item xs={6}>
                <Grid container justify="flex-end" className={classes.valueB}>
                  {valB}
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="row" style={{ marginTop: 10 }}>
              <Grid item className={classes.stringBlack} xs={6}>
                {keyNameC}
              </Grid>
              <Grid item xs={6}>
                <Grid container justify="flex-end" className={classes.valueB}>
                  {valC}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Paper>
      )}
    </div>
  );
}

PaperAsurance.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  keyNameA: PropTypes.string,
  keyNameB: PropTypes.string,
  valA: PropTypes.string,
  valB: PropTypes.string,
  valC: PropTypes.string,
  isLoading: PropTypes.bool,
};
PaperAsurance.defaultProps = {
  icon: <IconStar />,
  title: "New Loc",
  keyNameA: "",
  keyNameB: "",
  valA: "",
  valB: "",
  isLoading: false,
};

export default PaperAsurance;

export const SummaryCardsAsurance = (props) => {
  const { isLoading } = props;
  return (
    <Grid container justify="space-between" spacing={2}>
      <Grid item lg={4} sm={12} md={6}>
        <PaperAsurance
          title="Total Pendaftaran"
          keyNameA="Total Done"
          keyNameB="Total On Progress"
          valTotalSub={13.946}
          valA={12.809}
          valB={1.137}
          isLoading={isLoading}
          icon={<ExchangeIcon />}
          colorSubTitle="#2B2F3C"
          colorValueA="#65D170"
          colorValueB="#FF6A6A"
        />
      </Grid>
      <Grid item lg={4} sm={12} md={6}>
        <PaperAsurance
          title="Total Harga"
          keyNameA="ATM"
          keyNameB="CRM"
          keyNameC="CDM"
          valTotalSub={"Rp. 18.450.000.000"}
          valA={"Rp. 18.450.000.000"}
          valB={"Rp.15.000.000.000"}
          valC={"Rp.3.450.000.000"}
          isLoading={isLoading}
          icon={<TagIcon />}
        />
      </Grid>

      <Grid item lg={4} sm={12} md={6}>
        <PaperAsurance
          title="Total Over SLA"
          valTotalSub={"133.946"}
          isLoading={isLoading}
          icon={<IconCalendar />}
          colorSubTitle="#FF6A6A"
        />
      </Grid>
    </Grid>
  );
};
