/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { withRouter } from 'react-router-dom';
import {ReactComponent as BackIcon} from '../../assets/icons/general/arrow_back_red.svg';
import { DetailAtmInfoPaper, NegosiasiHistoriesPaper, NegosiasiStatusPaper, NegotiationProgressPaper } from '../../components';
import constansts from '../../helpers/constants';

const useStyles = makeStyles({
  root: {padding: '30px 20px 20px 30px',},
  backLabel: {fontSize: 17, color: constansts.color.primaryHard, marginLeft: 5,},
  backAction: {
    backgroundColor: 'unset', 
    padding: 0,
    '& .MuiButton-root':{padding: 0, textTransform: 'none' ,backgroundColor: 'unset'},
    '& .MuiButton-root:hover':{opacity: 0.6,backgroundColor: 'unset'},
  },
});

const dataNego=[
  {title: "5th Negotiation", price: "Rp 31.030.000", date:"20 July 2020", status:"Failed"},
  {title: "4th Negotiation", price: "Rp 30.030.000", date:"20 July 2020", status:"Failed"},
  {title: "3rd Negotiation", price: "Rp 30.020.000", date:"20 July 2020", status:"Failed"},
  {title: "2nd Negotiation", price: "Rp 30.010.000", date:"20 July 2020", status:"Failed"},
  {title: "1st Negotiation", price: "Rp 30.000.000", date:"20 July 2020", status:"Failed"},
];

const GeneralDetail= ({ history }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container>

            <div className={classes.backAction} >
              <Button onClick={() => history.goBack()}>
                <BackIcon/>
                <Typography className={classes.backLabel}>Back</Typography>
              </Button>
            </div>
            
          </Grid>
        </Grid>
        <Grid item>
          <DetailAtmInfoPaper/>
        </Grid>
        <Grid item>
          <NegotiationProgressPaper/>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item sm={6}><NegosiasiStatusPaper/></Grid>
            <Grid item sm={6}><NegosiasiHistoriesPaper dataNego={dataNego}/></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(GeneralDetail);
