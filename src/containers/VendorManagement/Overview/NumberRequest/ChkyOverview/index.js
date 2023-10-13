import React from 'react';
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import {Grid,Typography} from "@material-ui/core";
import { PausePresentationSharp } from '@material-ui/icons';
import { ReactComponent as CalculatorIcon } from '../../../../../assets/icons/whiteIcons/calculator.svg';

const UseStyles = makeStyles({
  root: {
    display: "flex",
    borderRadius: 10,
    border: "1px solid # BCC8E7",
    height: (props) => props.height,
    width: "90%",
  },
  leftSide: {
    textAlign: "center",
    backgroundImage: "linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)",
    height:(props)=>PausePresentationSharp.height - 2,
    width:60,
    borderTopLeftRadius:9,
    borderBottomLeftRadius:9,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  rightSide:{
      display:"flex",
      alignItems:'center',
      padding:10,
      flex:1,
      borderTopRightRadius: '8px',
      borderBottomRightRadius:'8px',
      border: '1px solid #BCC8E7',
  }
  
});


function ChkyOverview(props) {
    const classes = UseStyles(props);
    const {title,value}= props
  return (
    <div className={classes.root}>
      <div className={classes.leftSide}>
        <CalculatorIcon />
      </div>
      <div className={classes.rightSide}>
        <Grid container direction="column">
          <Grid item>
            <Typography style={{ fontSize: 15, fontWeight: 500 }}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: 20, fontWeight: 600 }}>
              {value}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
ChkyOverview.propTypes = {
  
  title: PropTypes.string,
  value: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  height: PropTypes.number,
  
};
ChkyOverview.defaultProps = {
  //leftIcon: <IconOverview />,
  title: "Title",
  value: 882384290,
  height: 70,
  //isRupiah: false,
};

export default ChkyOverview