import React, { useState } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Tabs,
  Tab,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import PropTypes from 'prop-types';
import moment from 'moment';

import constants from '../../helpers/constants';

const useStyles = makeStyles({
  cardContainer: {
    borderRadius: 10,
    padding: 15,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  chartContainer: {
    height: 280,
  },
  yearControllerContainer: {
    border: '1px solid #E6EAF3',
    borderRadius: 8,
  },
  yearControllerButton: {
    padding: '7px 10px',
    color: constants.color.primaryHard,
  },
});

const useTabsStyles = makeStyles({
  root: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
  },
  indicator: {
    display: 'none',
  },
});

const useTabItemStyles = makeStyles({
  root: {
    minHeight: 40,
    minWidth: 72,
    padding: '7px 10px',
  },
  selected: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapper: {
    textTransform: 'none',
  },
});

const YearController = () => {
  const [year, setYear] = useState(moment().year());
  const { yearControllerContainer, yearControllerButton } = useStyles();

  const handleDecreaseYear = () => setYear((prevValue) => prevValue - 1);
  const handleIncreaseYear = () => setYear((prevValue) => prevValue + 1);

  return (
    <Grid container alignItems="center" className={yearControllerContainer}>
      <Grid item>
        <IconButton
          className={yearControllerButton}
          onClick={handleDecreaseYear}
        >
          <ChevronLeft />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography variant="body1" component="p">
          {year}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          className={yearControllerButton}
          onClick={handleIncreaseYear}
        >
          <ChevronRight />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const TabsFilter = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabsClasses = useTabsStyles();
  const tabItemClasses = useTabItemStyles();
  const tabsStyles = {
    root: tabsClasses.root,
    indicator: tabsClasses.indicator,
  };

  const tabItemStyles = {
    root: tabItemClasses.root,
    selected: tabItemClasses.selected,
    wrapper: tabItemClasses.wrapper,
  };

  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
  };

  return (
    <Grid container direction="row" alignItems="center" spacing={1}>
      <Grid item>
        <Tabs
          classes={tabsStyles}
          value={selectedTab}
          onChange={handleSelectedTab}
        >
          <Tab classes={tabItemStyles} label="Yearly" />
          <Tab classes={tabItemStyles} label="Quarter" />
          <Tab classes={tabItemStyles} label="Monthly" />
          <Tab classes={tabItemStyles} label="Weekly" />
          <Tab classes={tabItemStyles} label="Daily" />
        </Tabs>
      </Grid>
      <Grid item>
        <YearController />
      </Grid>
    </Grid>
  );
};

const ChartCard = ({ title, icon, children, headerControl, withControl }) => {
  const { cardContainer } = useStyles();

  return (
    <Paper className={`${cardContainer}`}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>{icon}</Grid>

                <Grid item>
                  <Typography variant="body1" component="p" gutterBottom>
                    {title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {withControl ? <Grid item>{headerControl}</Grid> : null}
          </Grid>
        </Grid>

        <Grid item>{children}</Grid>
      </Grid>
    </Paper>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  headerControl: PropTypes.node,
  withControl: PropTypes.bool,
};

ChartCard.defaultProps = {
  headerControl: <TabsFilter />,
  withControl: false,
};

export default ChartCard;
