/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Row } from 'antd';

import { ReactComponent as Racumin } from '../../../assets/images/logo-racumin.svg';
import { ReactComponent as Nostro } from '../../../assets/images/logo-nostro.svg';
import { ReactComponent as Rhizoplex } from '../../../assets/images/logo-rhizoplex.svg';

const useStyles = makeStyles(() => ({
  container: {
    padding: '10px 20px',
    marginLeft: '10px',
    marginTop: '10px',
  },
  title: {
    fontFamily: 'NunitoRegular',
    fontSize: '10px',
    color: '#364449',
  },
  oneColumn: {
    width: '100%',
  },
  twoColumn: {
    width: '50%',
  },
  threeColumn: {
    width: '33.33%',
  },
  value: {
    fontFamily: 'NunitoRegular',
    fontSize: '24px',
    color: '#364449',
  },
  unit: {
    fontFamily: 'NunitoRegular',
    fontSize: '8px',
    color: '#B0BFD3',
  },
}));

const SellAchievement = ({ title, sellAchievementData }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span className={classes.title}>{title}</span>
      <Row>
        {sellAchievementData.map((item, index) => (
          <div
            className={
              sellAchievementData.length === 1
                ? classes.oneColumn
                : sellAchievementData.length === 2
                  ? classes.twoColumn
                  : classes.threeColumn
            }
          >
            <div style={{ textAlign: 'center' }}>
              <span className={classes.value}>{item.value} </span>
              <span className={classes.unit}>{item.unit}</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              {item.name === 'Racumin' ? (
                <Racumin width="65px" height="20px" />
              ) : item.name === 'Nostro' ? (
                <Nostro width="65px" height="20px" />
              ) : (
                <Rhizoplex width="65px" height="20px" />
              )}
            </div>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default SellAchievement;
