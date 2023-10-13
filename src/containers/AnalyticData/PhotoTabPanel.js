import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { ReactComponent as ImagesIcon } from '../../assets/icons/duotone-red/images-red.svg';
import getUrl from '../../helpers/getMinioFromUrl';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  judulFoto: {
    fontSize: '15px',
    lineHeight: '18px',
    marginBottom: 10
  },
  foto: { width: '180px', height: '135px', objectFit: 'cover' },
});

const PhotoTabPanel = ({ detail }) => {
  const classes = useStyles();
  const { fotoMesin, fotoDepan, fotoNeonSign, fotoVsat, fotoLayout } = detail;
  const [fotoMesinUrl, setFotoMesinUrl] = useState('');
  const [fotoDepanUrl, setFotoDepanUrl] = useState('');
  const [fotoNeonUrl, setFotoNeonUrl] = useState('');
  const [fotoVsatUrl, setFotoVsatUrl] = useState('');
  const [fotoLayoutUrl, setFotoLayoutUrl] = useState('');
  const minioUrls = [fotoMesin, fotoDepan, fotoNeonSign, fotoVsat, fotoLayout];
  useEffect(() => {
    Promise.allSettled(minioUrls.map((val) => getUrl(val))).then((results) => {
      const [resMesin, resDepan, resNeon, resVsat, resLayout] = results;
      if (resMesin.status === 'fulfilled') {
        setFotoMesinUrl(resMesin.value.fileUrl);
      }
      if (resDepan.status === 'fulfilled') {
        setFotoDepanUrl(resDepan.value.fileUrl);
      }
      if (resNeon.status === 'fulfilled') {
        setFotoNeonUrl(resNeon.value.fileUrl);
      }
      if (resVsat.status === 'fulfilled') {
        setFotoVsatUrl(resVsat.value.fileUrl);
      }
      if (resLayout.status === 'fulfilled') {
        setFotoLayoutUrl(resLayout.value.fileUrl);
      }
    });
  }, [...minioUrls]);
  return (
    <Paper
      style={{
        padding: 20,
        boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
        borderRadius: '10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <ImagesIcon />
        <Typography
          style={{
            fontWeight: '500',
            fontSize: '15px',
            lineHeight: '18px',
          }}
        >
          Photo
        </Typography>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography className={classes.judulFoto}>Posisi Mesin</Typography>
          {fotoMesinUrl&&<img className={classes.foto} src={fotoMesinUrl} alt='' />}
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.judulFoto}>Tampak Muka</Typography>
          {fotoDepanUrl&&<img className={classes.foto} src={fotoDepanUrl} alt='' />}
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.judulFoto}>Posisi Neon Sign</Typography>
          {fotoNeonUrl&&<img className={classes.foto} src={fotoNeonUrl} alt='' />}
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.judulFoto}>Posisi Atena VSAT</Typography>
          {fotoVsatUrl&&<img className={classes.foto} src={fotoVsatUrl} alt='' />}
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.judulFoto}>Layout</Typography>
          {fotoLayoutUrl&&<img className={classes.foto} src={fotoLayoutUrl} alt='' />}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PhotoTabPanel;
