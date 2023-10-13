/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import AtmLayoutImg from '../../../../assets/images/atmLayout.png';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    borderRadius: 10,
    border: '1px solid #BCC8E7',
    height: (props) => props.height,
    width: '100%',
  },
  sideLeft: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  sideRight: {
    backgroundImage: (props) => `url(${props.imgRight})`,
    backgroundSize:'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: (props) => props.height - 2,
    width: 100,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
});

function JarkomItem(props) {
  const classes = useStyles(props);
  const { leftTitle, rightTitle, leftVal, rightVal, onlyLeft } = props;
  return (
    <div className={classes.root}>
      <div className={classes.sideLeft}>
        <Grid container>
          <Grid item xs={onlyLeft? 12 : 6}>
            <Typography style={{ fontSize: 13, fontWeight: 600, marginBottom: 7 }}>{leftTitle}</Typography>
            {leftVal}
          </Grid>
          {!onlyLeft && 
            <Grid item xs={6}>
              <Typography style={{ fontSize: 13, fontWeight: 600, marginBottom: 7 }}>{rightTitle}</Typography>
              {rightVal}
            </Grid>}
        </Grid>
      </div>
      <div className={classes.sideRight} />
    </div>
  );
}

JarkomItem.propTypes = {
  imgRight: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  height: PropTypes.number,
  leftTitle: PropTypes.string,
  leftVal: PropTypes.any,
  rightTitle: PropTypes.string,
  rightVal: PropTypes.any,
  onlyLeft: PropTypes.bool,
};
JarkomItem.defaultProps = {
  imgRight: AtmLayoutImg,
  height: 70,
  leftTitle: "Title Left",
  leftVal: "Value Left",
  rightTitle: "Title Right",
  rightVal: "Value Right",
  onlyLeft: false,
};

export default JarkomItem;
