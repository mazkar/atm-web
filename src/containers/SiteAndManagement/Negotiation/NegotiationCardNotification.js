import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import constants from '../../../helpers/constants';
import paperClip from '../../../assets/icons/siab/paperclip-white.png';

const useStyles = makeStyles({

  paper: {
    backgroundColor: constants.color.white,
    width: 440,
    height: 154,
    borderRadius: 10,
  },
  container: {
    marginLeft: 15,
    // marginTop: 20,
  },
  clipFormat: {
    fontSize: 14,
    fontFamily: 'Barlow',
    fontWeight: 400,
    color: '#DC241F', cursor: 'pointer',
  },
  noteForm: {
    marginLeft: 15,
    // marginBottom: 50,
    width: '410px', 
    height: '50px',
    borderRadius: 4,
    backgroundColor: '749BFF',
    border: '1px solid #749BFF'
  },
  textNote: {
    fontFamily: 'Barlow', 
    fontSize: 11, 
    fontWeight: 500, 
    color: '#749BFF', 
    margin: 5,
  }
});

const NegoCardNotif = () => {
  const classes = useStyles();
    
  return (
    <Box className={classes.paper}>
      <Grid container direction="row" justify="flex-start" spacing={2} className={classes.container} 
        // style={{background: '#1e6dd4'}}
      >
        <Grid item>
          <Typography variant="body1" component="p" style={{ fontSize: 11, fontWeight: 400, fontFamily: 'Barlow' }}>Penawaran CIMB :</Typography>
          <Typography variant="body1" component="p" style={{ fontSize: 16, fontWeight: 500, fontFamily: 'Barlow' }}>Rp 31.000.000</Typography>
          <Grid style={{ display: 'flex', flexWrap: 'wrap', margin: 5 }}>
            <img src={paperClip} style={{ width: 11.34, height: 12.02, marginRight: 5 }} alt="" />
            <Typography className={classes.clipFormat}>Surat Penawaran.pdf</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body1" component="p" style={{ fontSize: 11, fontWeight: 400, fontFamily: 'Barlow' }}>Penawaran Landlord :</Typography>
          <Typography variant="body1" component="p" style={{ fontSize: 16, fontWeight: 500, fontFamily: 'Barlow' }}>Rp 31.000.000</Typography>
          <Grid style={{ display: 'flex', flexWrap: 'wrap', margin: 5 }}>
            <img src={paperClip} style={{ width: 11.34, height: 12.02, marginRight: 5 }} alt="" />
            <Typography className={classes.clipFormat}>Surat Penawaran.pdf</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box>
        <Grid container className={classes.noteForm}>
          <Grid item>
            <Typography variant="p" component="p" className={classes.textNote}>Note :</Typography>
            <Typography variant="p" component="p" className={classes.textNote}>Dokumen Terlampir</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

function mapStateToProps() {
  return {};
}
  
export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(NegoCardNotif))
);