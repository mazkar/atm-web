import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from "prop-types";
import useRupiahConverterSecondary from '../../../../helpers/useRupiahConverterSecondary';

const ChildTieringList = ({ array }) => {
  if(array === null || array.length < 1){
    return <Typography style={{ textAlign: 'center' }}>-</Typography>;
  }
  return (
    <Grid container direction="column" alignContent="center">
      {array.map((price, index) => (
        <Grid item style={{width: 'max-content'}}>
          <Grid container direction="row">
            <Grid item style={{width: 30}}><Typography style={{ fontSize: 13 }}>{array.length > 1 && `th-${index+1}` }</Typography> </Grid>
            <Grid item><Typography style={{ fontSize: 13 }}>: {useRupiahConverterSecondary(price)}</Typography> </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

ChildTieringList.propTypes={
  // eslint-disable-next-line react/forbid-prop-types
  array: PropTypes.any.isRequired,
};

export default ChildTieringList;
