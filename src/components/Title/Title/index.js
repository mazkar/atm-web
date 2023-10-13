/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '28px',
    color: '#364449',
  },
}));

const Title = ({ title, titleStyle }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.title} style={titleStyle}>
        {title}
      </div>
    </div>
  );
};

export default Title;