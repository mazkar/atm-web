/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { Divider, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import { GrayHard } from '../../assets/theme/colors';

const useStyles = makeStyles(() => ({
  paper: {
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    borderRadius: '8px',
    minHeight: 500,
  },
  title: {
    fontWeight: '600',
    fontSize: '17px',
    lineHeight: '20px',
    padding: '14px 20px',
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: '6px 20px',
    '&:hover': {
      backgroundColor: '#FFF5F4',
    },
  },
  listItemSelected: {
    backgroundColor: '#FFF5F4!important',
    '&:hover': {
      backgroundColor: '#FFF5F4!important',
    },
  },
}));

const SidebarDigitalisasiDetail = ({ title, items, onValueChange, value }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title}>{title}</Typography>
      <Divider />
      <List className={classes.list}>
        {items.map((item, index) => (
          <ListItem
            classes={{ root: classes.listItem, selected: classes.listItemSelected }}
            key={index}
            button
            onClick={() => onValueChange(item.value)}
            selected={value === item.value}
          >
            <CustomListText primary={item.label} secondary={`${item.count  } Items`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SidebarDigitalisasiDetail;

const CustomListText = withStyles((theme) => ({
  root: {
    margin: 0,
  },
  primary: {
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '14px',
  },
  secondary: {
    fontSize: '12px',
    lineHeight: '14px',
    color: GrayHard,
  },
}))(ListItemText);
