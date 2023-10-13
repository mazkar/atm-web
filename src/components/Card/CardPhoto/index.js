/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography,  Tabs, Tab } from '@material-ui/core';
import img from '../../../assets/images/atmcimb.png';
import { ReactComponent as Check } from '../../../assets/icons/siab/check-green.svg';
import { ReactComponent as Sync } from '../../../assets/icons/siab/sync-alt.svg';

const useTypeStyles =makeStyles({
  completeBack: {
    display: 'flex', 
    flexWrap: 'wrap',
    flexDirection: 'row', 
    backgroundColor: '#DEFFE1',
    padding: '4px 8px',
    alignItems: 'center',
    alignContent: 'center',
    border: '1px solid #65D170',
    borderRadius: 4,
    width: 'max-content',
    // marginLeft: '35%',
  },
  completeText: {
    color: '#65D170',
    fontSize: 13,
    fontWeight: 600,
    // marginRight: 10
  },
  incompleteBack: {
    display: 'flex', 
    flexWrap: 'wrap',
    flexDirection: 'row', 
    backgroundColor: '#FFF7F7',
    padding: '4px 8px',
    alignItems: 'center',
    alignContent: 'center',
    border: '1px solid #FF6A6A',
    width: 'max-content',
    // marginLeft: '35%',
    borderRadius: 4,
  },
  incompleteText: {
    color: '#FF6A6A',
    fontSize: 13,
    fontWeight: 600,
    // marginRight: 10
  },
});  

const Progress = (props) => {
  const { progress } = props;
  const classes = useTypeStyles();
  
  if(progress === 'Bersih'){
    return (
      <div className={classes.completeBack}>
        <Typography className={classes.completeText}> Bersih </Typography>
        {/* <Check/> */}
      </div>
    );
  }
  if (progress === 'Kotor'){
    return (
      <div className={classes.incompleteBack}>
        <Typography className={classes.incompleteText}> Kotor </Typography>
        {/* <Sync/> */}
      </div>
    );
  }
};

const CardPhoto = (props) => {
  const {title, description} = props
  const { Meta } = Card;
  return(
    <div>
      <Card
        hoverable
        style={{ width: 260, borderRadius: 12}}
        cover={<img alt="example" src={img} style={{maxHeight: 100, borderTopLeftRadius: 12, borderTopRightRadius: 12}}/>}
      >
        <Meta title={title} />
        <Progress progress={description} />
      </Card>
    </div>
  );
};

export default CardPhoto;