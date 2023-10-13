/* eslint-disable func-names */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SelectWithCaptions from "../../Selects/SelectWithCaptions";
import MuiButton from '../../Button/MuiButton';
import MoneyCheck from '../../../assets/images/SideMenu/money_check.svg';
import SellProductSummary from '../../SellProductSummary';

const styles = () => ({
  root:{
    display:'flex', 
    flexWrap:'wrap', 
  },
  leftSide: {
    width: '200px',
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
    fontSize: '18px',
    color: '#ffffff',
    textShadow: '0px 4px 10px rgba(16, 33, 49, 0.1)',
  },
  rootSumcol:{
    display:'flex', 
    flexWrap:'wrap',
    flexGrow:2,
    flexDirection:'column',
    paddingLeft:10,
  },
  rootfilter: {
    paddingRight:20,
    display:'flex', 
    flexWrap:'wrap', 
    justifyContent:'space-between'
  },
  sellSum:{
    display:'flex', 
    flexWrap:'wrap',
    flexGrow:3, 
    justifyContent:'space-between',
  },
  col: {
    display:'flex', 
    flexWrap:'wrap', 
  },
});
const index = (props) => {
  const { 
    color, 
    imgIcon, 
    imgStyle, 
    title, 
    subtitle,
    viewingSuggestions, 
    handleViewByOnChange, 
    handleStartDateOnChange, 
    handleEndDateOnChange, 
    onFilterSubmit, 
    summaryOptions, 
    classes } = props;
  return (
    <div className={classes.root}>
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
      <div />
      <div className={classes.rootSumcol}>
        <div className={classes.rootfilter}>
          <div className={classes.col}>
            <SelectWithCaptions bordered caption='View By' suggestions={viewingSuggestions} defaultValue={viewingSuggestions[0].value} handleChange={handleViewByOnChange} width="150px" />
          </div>
          <div className={classes.col}>
            <SelectWithCaptions caption='Start Date' width="125px" isDatePicker defaultValue='11/09/2001' handleChange={handleStartDateOnChange} />
            <SelectWithCaptions caption='End Date' width="125px" isDatePicker defaultValue='11/09/2001' handleChange={handleEndDateOnChange} />
            <MuiButton label="Apply" onClick={() => onFilterSubmit} />
          </div>
        </div>
        <div className={classes.sellSum}>
          {summaryOptions.map(function(summary, i){
            return (<SellProductSummary 
              key={summary.id} 
              product={summary.product} 
              total={summary.total} 
              satuan={summary.satuan} 
              width={250} 
              marginTrbl="10px 0px 10px 0px" />);
          })
          }
                    
        </div>
      </div>
    </div>
        
  );
};

index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  imgIcon: PropTypes.object,
};

index.defaultProps = {
  imgIcon: MoneyCheck,
};

export default withStyles(styles)(index);
