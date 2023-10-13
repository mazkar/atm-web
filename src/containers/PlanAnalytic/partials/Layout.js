import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import arrowBackPng from '../../../assets/icons/siab/arrow-left.png';
import {
  Dark,
  GrayMedium,
  PrimaryHard,
  GrayUltrasoft,
} from '../../../assets/theme/colors';

const useStyles = makeStyles(() => ({
  indicator: {
    backgroundColor: PrimaryHard,
    height: 4,
  },
  tab: {
    fontWeight: 600,
    fontSize: '17px',
    lineHeight: '20px',
    textTransform: 'capitalize',
    color: GrayMedium,
    opacity: 1,
  },
  tabSelected: {
    color: Dark,
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { hash } = location;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    history.push(props.contents[newValue].hash);
  };

  useEffect(() => {
    const currentIndex = props.contents.findIndex((el) => el.hash === hash);
    if (currentIndex >= 0) {
      setValue(currentIndex);
    } else {
      setValue(0);
    }
  }, [hash]);

  return (
    <div
      style={{
        padding: 30,
        backgroundColor: GrayUltrasoft,
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <div>
        <Link
          to="/plan-analytic"
          style={{ display: 'flex', alignItems: 'center', marginBottom: 26 }}
        >
          <img src={arrowBackPng} alt="" />
          <Typography
            style={{
              fontWeight: 500,
              fontSize: '17px',
              lineHeight: '20px',
              color: PrimaryHard,
              textTransform: 'capitalize',
              marginLeft: 10,
            }}
          >
            Back
          </Typography>
        </Link>
      </div>
      <Typography
        style={{
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '43px',
          textShadow: '0px 6px 10px rgba(0, 0, 0, 0.08)',
          marginBottom: 20,
        }}
      >
        {props.title}
      </Typography>
      {props.contents.length > 1 ? (
        <>
          <Tabs
            value={value}
            onChange={handleChange}
            classes={{
              indicator: classes.indicator,
            }}
            style={{ marginBottom: 20 }}
          >
            {props.contents.map((val, i) => {
              return (
                <Tab
                  key={i}
                  classes={{ root: classes.tab, selected: classes.tabSelected }}
                  label={val.label}
                />
              );
            })}
          </Tabs>
          {props.contents.map((val, i) => {
            return (
              <TabPanel value={value} index={i} key={i}>
                {val.tabContent}
              </TabPanel>
            );
          })}
        </>
      ) : (
        <>{props.contents[0].tabContent}</>
      )}
    </div>
  );
};

export default Layout;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
