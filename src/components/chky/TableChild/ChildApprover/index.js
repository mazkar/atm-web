/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { Avatar} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const ChildApprover=(props)=>{
  const { approver } = props;
  function renderBackColor(intialName){
    if(intialName === 'DH'){
      return '#88ADFF';
    }
    if (intialName === 'TS'){
      return '#FFB443';
    }
    if (intialName === 'BA'){
      return '#65D170';
    }
    if (intialName === 'Y'){
      return '#FF6A6A';
    }
    return '#88ADFF';
  }
  
  function getInitialName(name){
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  }
  
  return(
    <div style={{display: 'flex'}}>
      {approver?.map((item,i)=> {
        if(item !== null){
          return (
            <Avatar key={i} style={{backgroundColor: renderBackColor(getInitialName(item)), width: 32, height: 32, margin: 2.5, fontSize: 14}}>
              {getInitialName(item)}
            </Avatar>  
          );
        }
      })}
    </div>
  );
};
  
ChildApprover.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  approver: PropTypes.array,
};
  
ChildApprover.defaultProps = {
  approver: ["DH","TS","BA","Y","L"],
};

export default ChildApprover;