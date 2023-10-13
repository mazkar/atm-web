/* eslint-disable react/prop-types */
import { Typography, Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LetterClosing = props => {
  const { margin, fontSize, nameBusinessEntity } = props;
  // console.log("+++ nameBusinessEntity",nameBusinessEntity);
  const { t } = useTranslation();
  return (
    <>
      <div item className={margin}>
        <Typography className={fontSize}>Demikian kami sampaikan atas perhatian dan kerjasamanya kami ucapkan terima kasih.</Typography>
      </div>
      <Grid container justify="space-between" className={margin}>
        <Grid item>
          <Typography className={fontSize}>Hormat kami, <br /> <b>PT. Bank CIMB Niaga, Tbk</b>.</Typography>
        </Grid>
        <Grid item style={{marginRight: 10}}>
          <Typography className={fontSize}>&nbsp; <br /><b>{nameBusinessEntity === null || nameBusinessEntity === undefined ? "-": nameBusinessEntity}</b></Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default LetterClosing;