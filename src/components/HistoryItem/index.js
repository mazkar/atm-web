import React from "react";
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import * as Colors from '../../assets/theme/colors';

const styles = ({
  root: {
    display:'flex', 
    flexDirection: 'column',
    border: `1px solid ${Colors.GrayMedium}`,
    borderRadius: 4,
    width: (props) => props.width,
    marginBottom: 5,
    padding: 15,
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'space-between',
    justifyItems: 'center',
  },
});

const HistoryItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, uploader, planCount, date, onClick, classes } = props;
  return (
    <ListItem className={classes.root} onClick={onClick}>
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap:'wrap', marginBottom:11}} >
        <Typography style={{fontSize:13, fontWeight: 500, color: Colors.Dark}}>{id}</Typography>
        <Typography style={{fontSize:13, fontWeight: 500, color: Colors.GrayMedium}}>{date}</Typography>
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap:'wrap'}} >
        <Typography style={{fontSize:13, fontWeight: 500, color: Colors.BlueMedium}}>{uploader}</Typography>
        <Typography style={{fontSize:15, fontWeight: 500, color: Colors.Dark}}>{planCount}</Typography>
      </div>
    </ListItem>
  );
};

HistoryItem.propTypes = {
  id: PropTypes.string,
  uploader: PropTypes.string,
  planCount: PropTypes.string,
  date: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  onClick: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

const alertFun = ()=> {
  alert('List Item Clicked');
};

HistoryItem.defaultProps  = {
  id: "#0019281",
  uploader: "Robert Fox",
  planCount: "+ 142 New Plan",
  date: "November 7, 2017",
  onClick: alertFun,
  // eslint-disable-next-line react/default-props-match-prop-types
  width: '100%',
};

export default withStyles(styles)(HistoryItem);