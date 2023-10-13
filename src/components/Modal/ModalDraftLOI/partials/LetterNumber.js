import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AdvancedSmallInput } from '../../../chky/ChkyInputSmall';

const useStyles = makeStyles({
  letterNumber: {
    marginTop: 40,
    marginLeft: 20,
    fontSize: 13,
    width: 'calc(100% - 20px)',
  },
});

const LetterNumber = (props) => {
  const { fontSize, referencedNumber, letterDate, placeState, placeModifier } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  function isEmpty(obj) {
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
    return true;
  }
  return (
    <Grid item className={classes.letterNumber}>
      <Grid container style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography className={fontSize}>
            <b>{isEmpty(referencedNumber) ? 'No. N/A' : referencedNumber}</b>
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={fontSize}>
            <AdvancedSmallInput stateVar={placeState} stateModifier={placeModifier} />{', '}
            {isEmpty(letterDate) ? 'N/A' : letterDate}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LetterNumber;
