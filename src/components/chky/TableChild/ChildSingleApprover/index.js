/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { Avatar} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const ChildSingleApprover=(props)=>{
  const { approver } = props;
  
  function getInitialName(name){
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  }
  
  return(
    <div style={{display: 'flex', justifyContent: "center"}}>
      {approver && (
        <Avatar 
          style={{
            backgroundColor: "#88ADFF", 
            width: 32, 
            height: 32, 
            margin: 2.5, 
            fontSize: 14
          }}>
          {getInitialName(approver)}
        </Avatar>  
      )
      }
    </div>
  );
};
  
ChildSingleApprover.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  approver: PropTypes.string,
};
  
ChildSingleApprover.defaultProps = {
  approver: "",
};

export default ChildSingleApprover;