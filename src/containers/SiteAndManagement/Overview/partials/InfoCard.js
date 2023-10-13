import React, { useContext } from 'react';
import { Paper, Typography, Link, Divider } from '@material-ui/core';
import { Link as Routerlink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { ReactComponent as TitleRateIcon } from '../../../../assets/icons/general/transaction_rate_overview.svg';
import { PrimaryHard, SuccessMedium } from '../../../../assets/theme/colors';
import utility from '../../../../helpers/utility';
import { SiteManOvContext } from '../index';
import NoData from './NoData';

const useStyles = makeStyles((theme) => ({
  linkPrimary: {
    color: PrimaryHard,
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '18px',
  },
  linkContent: {
    color: PrimaryHard,
  },
}));

const InfoCard = (props) => {
  const { numeral } = utility;
  const classes = useStyles();
  const { pencapaian, target, listNewDetail = [] } = props.content || {};
  const isSelected = true;
  return (
    <Paper
      style={{
        padding: 20,
        boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <TitleRateIcon />
        <Typography
          style={{
            fontWeight: 500,
            fontSize: '15px',
            lineHeight: '18px',
            marginLeft: 10,
          }}
        >
          {props.title}
        </Typography>
        <Typography
          style={{
            marginLeft: 'auto',
            fontWeight: 500,
            fontSize: '25px',
            lineHeight: '30px',
          }}
        >
          {numeral(pencapaian).format('0,0')}
        </Typography>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Typography
          style={{
            color: SuccessMedium,
            fontWeight: '500',
            fontSize: '18px',
            lineHeight: '22px',
            textAlign: 'right',
          }}
        >
          {numeral(target).format('0,0')}
        </Typography>
      </div>
      <Divider />
      <div style={{ marginBottom: 24, marginTop: 16 }}>
        {props.content ? (
          props.content?.detail.map((val, i) => {
            const { status } = listNewDetail[i] || {};
            return (
              <div
                key={i}
                style={{
                  fontFamily: 'Barlow',
                  marginBottom: 8,
                  fontSize: '13px',
                  lineHeight: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {(i === 0 || i === 1) && (status == 1 || status == 2) ? (
                    <Link
                      component={Routerlink}
                      to={`/acquisition/savedLocation?status=${status}`}
                      className={classes.linkContent}
                      disabled={!isSelected || !props.content}
                    >
                      {val.left}
                    </Link>
                  ) : (
                    val.left
                  )}
                </div>
                <div>{isSelected ? numeral(val.right).format('0,0') : 'N/A'}</div>
              </div>
            );
          })
        ) : (
          <NoData />
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: 'auto' }}>
        <Link
          component={Routerlink}
          to={props.target}
          className={classes.linkPrimary}
          disabled={!isSelected || !props.content}
        >
          Show All
        </Link>
      </div>
    </Paper>
  );
};

export default InfoCard;
