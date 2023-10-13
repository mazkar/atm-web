/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'antd';

import Header from '../../Title/Header1';

const useStyles = makeStyles(() => ({
  cardContainer: {
    height: '200px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 10px rgba(122, 191, 255, 0.2)',
    borderRadius: '10px',
    margin: '20px 0px',
  },
  leftSide: {
    width: '18%',
    height: '200px',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    padding: '27px 20px',
  },
  title: {
    fontFamily: 'NunitoRegular',
    fontWeight: '600',
    fontSize: '32px',
    color: '#ffffff',
    textShadow: '0px 4px 10px rgba(16, 33, 49, 0.1)',
  },
  subtitle: {
    fontFamily: 'NunitoRegular',
    fontWeight: '600',
    fontSize: '18px',
    color: '#ffffff',
    textShadow: '0px 4px 10px rgba(16, 33, 49, 0.1)',
  },
  threeCol: {
    width: '33.33%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '25px',
  },
  fourCol: {
    width: '25%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '25px',
  },
  dataTitle: {
    fontFamily: 'NunitoRegular',
    fontWeight: '200',
    fontSize: '16px',
    color: '#364449',
    textAlign: 'center',
  },
  dataValue: {
    fontFamily: 'NunitoRegular',
    fontSize: '30px',
    color: '#364449',
    textAlign: 'center',
  },
  dataUnit: {
    fontFamily: 'NunitoRegular',
    fontSize: '14px',
    color: '#B0BFD3',
    textAlign: 'center',
  },
}));

const LongCard = ({
  color,
  data,
  defaultValue,
  imgIcon,
  imgStyle,
  title,
  subtitle,
  suggestions,
}) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.cardContainer}>
        <Row>
          <div
            className={classes.leftSide}
            style={{
              backgroundImage: color,
            }}
          >
            <img src={imgIcon} style={imgStyle} />
            <div className={classes.title}>{title}</div>
            <div className={classes.subtitle}>{subtitle}</div>
          </div>
          <div style={{ width: '82%' }}>
            <Header
              suggestions={suggestions}
              defaultValue={defaultValue}
              handleOnchange={() => { }}
            />
            <Row>
              {data.map((item, index) => (
                <div
                  className={
                    data.length === 4 ? classes.fourCol : classes.threeCol
                  }
                >
                  <div className={classes.dataTitle}>{item.title}</div>
                  <div className={classes.dataValue}>{item.value}</div>
                  <div className={classes.dataUnit}>{item.unit}</div>
                </div>
              ))}
            </Row>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default LongCard;
