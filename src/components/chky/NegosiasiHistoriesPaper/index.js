/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Timeline from '../../Timeline/negotiation';
import ModalLoader from '../../ModalLoader';
import idrCurrencyFormat from '../../../helpers/useRupiahConverter';

const useStyles = makeStyles({
  root: { padding: 20, borderRadius: 10 },
});

function NegosiasiHistoriesPaper(props) {
  const { dataNego, topData } = props;
  const classes = useStyles();
  const [isOpenModalLoader, setModalLoader] = useState(false);
  // const [price, setPrice] = useState({});

  useEffect(() => {
    if (topData?.length > 0) {
      setModalLoader(true);
    } else {
      setModalLoader(false);
    }
  }, [topData]);

  function isEmpty(obj) {
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
    return true;
  }
  return (
    <div className={classes.root}>
      <Typography
        style={{
          fontSize: 24,
          marginBottom: 10,
          fontFamily: 'Barlow',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: '24px',
          lineHeight: '29px',
        }}
      >
        Negotiation
      </Typography>
      <Grid container justify="space-between">
        <Typography style={{ fontSize: 15, fontWeight: 500 }}>
          Harga Penawaran :
        </Typography>
        <Typography style={{ fontSize: 15, fontWeight: 500 }}>
          {
            topData?.yearlyRentCostList?.map((rowRent,indexRent)=>{
              return(
                <>
                  <span style={{fontSize:13, fontWeight:300, marginRight:10}}>Tahun ke - {(indexRent+1)}</span> {idrCurrencyFormat(rowRent)} <br />
                </>
              )
            })
          }
        </Typography>
      </Grid>
      <Typography
        style={{
          fontSize: 15,
          fontWeight: 400,
          fontStyle: 'italic',
          marginBottom: 20,
        }}
      >
        Exclude ppn, include pph
      </Typography>
      <Grid container justify="space-between">
        <Typography style={{ fontSize: 15, fontWeight: 500 }}>
          Harga Kesepakatan :
        </Typography>
        <Typography style={{ fontSize: 15, fontWeight: 500 }}>
          {
            topData?.negotiationDealCostList?.map((row,index)=>{
              return(
                <>
                  <span style={{fontSize:13, fontWeight:300, marginRight:10}}>Tahun ke - {(index+1)}</span> {idrCurrencyFormat(row)}<br />
                </>
              )
            })
          }
        </Typography>
      </Grid>
      <Timeline dataNego={dataNego} />
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

NegosiasiHistoriesPaper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataNego: PropTypes.array,
  topData: PropTypes.array,
};

NegosiasiHistoriesPaper.defaultProps = {
  dataNego: [],
  topData: [],
};

export default NegosiasiHistoriesPaper;
