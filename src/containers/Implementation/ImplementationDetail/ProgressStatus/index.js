/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { ReactComponent as ProgressIcon } from "../../../../assets/icons/duotone-others/progression-blue.svg";
import { ReactComponent as CheckIcon } from "../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as MinusIcon } from "../../../../assets/icons/duotone-gray/minus-circle.svg";
import LoadingView from '../../../../components/Loading/LoadingView';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

const ChildStatusIcon=(props)=> {
  const classes = useStyles();
  const {value} = props;
  return (
    <div>
      {value === 'minus' ? <MinusIcon className={classes.icon}/>  : value === 'complete' ? <CheckIcon className={classes.icon}/> : <ProgressIcon className={classes.icon}/> }
    </div>
  );
};

ChildStatusIcon.propTypes = {
  value: PropTypes.bool.isRequired,
};

const dataDummy = [
  {"status": "complete", "title":"Daftar Permintaan"},
  {"status": "minus", "title":"Parameter"},
  {"status": "minus", "title":"Status Jarkom"},
  {"status": "complete", "title":"Status Mesin"},
  {"status": "not complete", "title":"Status Booth"},
  {"status": "not complete", "title":"Sarana Keamanan"},
  {"status": "complete", "title":"Aktivasi"},
  {"status": "complete", "title":"Signage & Pajak"},
];

const ProgressStatus=(props)=> {
  const classes = useStyles();
  const {dataStatus, isLoadData} = props;
        
  return (
    <div className={classes.root}>
      {isLoadData ?
        <LoadingView maxheight='100%' />
        :
        <Grid container justify="space-between">
          {dataStatus.map((item)=>{
            return (
              <Grid item style={{width: `calc(100% / ${dataStatus.length})`}}>
                <Grid item style={{textAlign: 'center'}}>
                  <Grid item>
                    <ChildStatusIcon value={item.status}/>
                  </Grid>
                  <Grid item>
                    {item.title}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      }
    </div>
  );
};
  
ProgressStatus.propTypes = {
  dataStatus: PropTypes.array,
  isLoadData: PropTypes.bool,
};
ProgressStatus.defaultProps = {
  dataStatus: dataDummy,
  isLoadData: false,
};

export default ProgressStatus;

