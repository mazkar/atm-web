/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Row } from 'antd';

const useStyles = makeStyles(() => ({
  container: {
    height: '50px',
    backgroundColor: '#ffffff',
    padding: '10px 10px',
    border: '1px solid #E5EDF8',
    borderRadius: '4px',
    marginBottom: '10px',
    alignItems: 'center',
  },
  iconContainer: {
    height: '30px',
    width: '30px',
    borderRadius: '50px',
    textAlign: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'NunitoRegular',
    fontWeight: '600',
    fontSize: '14px',
    padding: '4px 0px',
  },
  name: {
    fontFamily: 'NunitoRegular',
    fontSize: '14px',
    color: '#364449',
    marginLeft: '10px',
  },
  unit: {
    fontFamily: 'NunitoRegular',
    fontSize: '14px',
    color: '#364449',
    marginLeft: '10px',
    textAlign: 'end',
    width: '47%',
  },
}));

const SmallCard = ({ containerStyle, iconStyle, data }) => {
  const classes = useStyles();

  return (
    <Row className={classes.container} style={containerStyle}>
      <Row style={{ width: '50%', alignItems: 'center' }}>
        <div className={classes.iconContainer} style={iconStyle}>
          {data.name.charAt(0)}
        </div>
        <span className={classes.name}>{data.name}</span>
      </Row>
      <span className={classes.unit}>
        {data.sellerValue} {data.unit}
      </span>
    </Row>
  );
};

export default SmallCard;
