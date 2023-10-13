import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Grid, Paper } from '@material-ui/core';
import { ReactComponent as IconStar } from '../../../../assets/icons/duotone-others/star-bg-red.svg';
import * as Colors from '../../../../assets/theme/colors';
import Loading from '../../../../components/Loading/LoadingView';

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
    fontWeight: 500,
    color: Colors.Dark,
  },
  stringBlack: {
    fontSize: 12,
    fontFamily: 'Barlow',
    fontWeight: 500,
    color: Colors.Dark,
  },
  stringGreen: {
    fontSize: 12,
    fontFamily: 'Barlow',
    fontWeight: 500,
    color: Colors.Green,
  },
});

function PaperImplementOverview(props) {
  const classes = useStyles();
  const { icon, title, keyNameA, keyNameB, valA, valB, valC, isLoading } = props;
  return (
    <div className={classes.root}>
      {isLoading ?
        <Loading maxheight='100%' />
        :
        <Paper>
          <div container className={classes.content} >
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                {icon}
              </Grid>
              <Grid item className={classes.title}>
                {title}
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1} direction="row">
              <Grid item className={classes.stringBlack} xs={6}>{keyNameA}</Grid>
              <Grid item className={classes.stringBlack} xs={3}>{valA}</Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1} direction="row">
              <Grid item className={classes.stringBlack} xs={6}>{keyNameB}</Grid>
              <Grid item className={classes.stringGreen} xs={3}>{valB}</Grid>
              <Grid item className={classes.stringGreen} xs={3}>{valC}</Grid>
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
  keyNameA: "N/A",
  keyNameB: "N/A",
  valA: "N/A",
  valB: "N/A",
  valC: "N/A",
  isLoading: false
};
export default PaperImplementOverview;

