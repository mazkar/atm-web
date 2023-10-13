/* eslint-disable react/prop-types */
/* eslint-disable import/no-useless-path-segments */
import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChkyMultipleSelectLOI } from '../../../../components/chky';
import './style.css';

const useStyles = makeStyles({
  checkboxItem: {
    width: 260,
    height: 'max-content',
  }
});

const LetterTerm = props => {
  const { margin1, margin2, fontSize, valueCheckLeft, valueCheckRight, termList } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <Grid item className={margin1}>
        <Typography className={fontSize}>{t('modal.rbbImplementation.LOI.letter.content.three')}</Typography>
      </Grid>
      <Grid container direction='row' className={margin2}>
        <Grid item className={classes.checkboxItem}>
          <ChkyMultipleSelectLOI dataSelect={termList.leftSide} getValue={valueCheckLeft} />
        </Grid>
        <Grid item className={classes.checkboxItem}>
          <ChkyMultipleSelectLOI dataSelect={termList.rightSide} getValue={valueCheckRight} />
        </Grid>
      </Grid>
    </div>
  );
};

export default LetterTerm;