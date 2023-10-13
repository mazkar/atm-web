import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Grid, Paper } from '@material-ui/core';
import { ReactComponent as IconStar } from '../../../../assets/icons/duotone-others/star-bg-red.svg';
import * as Colors from '../../../../assets/theme/colors';
import Loading from '../../../../components/Loading/LoadingView';
import { ReactComponent as ExchangeIcon }from '../../../../assets/icons/duotone-red/exchange-alt.svg';
import { ReactComponent as PlusWhite } from '../../../../assets/icons/siab/plus-white.svg';
import { ReactComponent as TagIcon } from "../../../../assets/icons/duotone-red/tag.svg";
import { ReactComponent as ListIcon } from "../../../../assets/icons/duotone-red/list-alt.svg";
import { ReactComponent as IconCalendar } from "../../../../assets/icons/duotone-red/calendar-day.svg";
const useStyles = makeStyles({
  root: {
    '& .MuiPaper-elevation1': {
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
      borderRadius: 10,
    },
    marginBottom: 30,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Barlow',
    fontWeight: 600,
    color: Colors.Dark,
    marginLeft: 5,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: 'Barlow',
    fontWeight: 600,
    color: (props) => props.colorSubTitle,
  },
  stringBlack: {
    fontSize: 13,
    fontFamily: 'Barlow',
    fontWeight: 500,
    color: Colors.Dark
  },
  valueA: {
    fontSize: 13,
    fontFamily: 'Barlow',
    fontWeight: 500,
    color: (props) => props.colorValueA,
  },
  valueB: {
    fontSize: 13,
    fontFamily: 'Barlow',
    fontWeight: 500,
    color: (props) => props.colorValueB,
  },
});

function PaperImplementOverview(props) {
  const classes = useStyles(props);
  const { icon, title, keyNameA, keyNameB, valA, valB, isLoading, valTotalSub } = props;
  return (
    <div className={classes.root}>
      {isLoading ?
        <Loading maxheight='100%' />
        :
        <Paper>
          <div container className={classes.content} >
            <Grid container direction='row' justify="space-between">
                <Grid item>
                    <Grid container direction='row'>
                        <Grid item>
                            {icon}
                        </Grid>
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
            <Grid container direction="row" style={{marginTop: 10}}>
              <Grid item className={classes.stringBlack} xs={6}>{keyNameA}</Grid>
              <Grid item xs={6}>
                <Grid container justify="flex-end" className={classes.valueA}>{valA}</Grid>
              </Grid>
            </Grid>
            <Grid container direction="row" style={{marginTop: 10}}>
              <Grid item className={classes.stringBlack} xs={6}>{keyNameB}</Grid>
              <Grid item xs={6}>
                <Grid container justify="flex-end" className={classes.valueB}>{valB}</Grid>
              </Grid>
            </Grid>
          </div>
        </Paper>
      }
    </div>
  );
}

PaperImplementOverview.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  keyNameA: PropTypes.string,
  keyNameB: PropTypes.string,
  valA: PropTypes.string,
  valB: PropTypes.string,
  valC: PropTypes.string,
  isLoading: PropTypes.bool
};
PaperImplementOverview.defaultProps = {
  icon: <IconStar />,
  title: "New Loc",
  keyNameA: "",
  keyNameB: "",
  valA: "",
  valB: "",
  isLoading: false
};
export default PaperImplementOverview;

export const SummaryCards = (props) => {
  const { isLoading } = props
  return (
    <Grid container justify="space-between" spacing={2}>
      <Grid item xs={3}>
        <PaperImplementOverview
          title="Total Order"
          keyNameA="Total Done"
          keyNameB="Total On Progress"
          valTotalSub={props.totalOrder}
          valA={props.totalDone}
          valB={props.totalOnProgress}
          isLoading={isLoading}
          icon={<ExchangeIcon />}
          colorSubTitle="#2B2F3C"
          colorValueA="#65D170"
          colorValueB="#FF6A6A"
        />
      </Grid>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Total Biaya"
            keyNameA="Biaya Jasa"
            keyNameB="Biaya Barang"
            valTotalSub={props.totalBiaya}
            valA={props.biayaJasa}
            valB={props.biayaBarang}
            isLoading={isLoading}
            icon={<TagIcon />}
          />
        </Grid>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Jumlah Pembayaran"
            keyNameA="Status Paid"
            keyNameB="Status Unpaid"
            valTotalSub={props.jumlahPembayaran}
            valA={props.statusPaid}
            valB={props.statusUnpaid}
            isLoading={isLoading}
            icon={<ListIcon />}
            colorValueA="#65D170"
            colorValueB="#FF6A6A"
          />
        </Grid>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Total Over SLA"
            valTotalSub={props.totalOverSla}
            isLoading={isLoading}
            icon={<IconCalendar />}
            colorSubTitle="#FF6A6A"
          />
        </Grid>
    </Grid>
  )
}