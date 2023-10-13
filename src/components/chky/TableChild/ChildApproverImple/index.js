/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { Avatar} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

function orderArr(arr){
  const newArr = [];
  console.log("+++ imple arr",arr);
  arr.map((item)=>{
    // console.log("+++ imple arr item ",item);
    switch (true) {
    case item.toLowerCase().includes("roy"):
      newArr[0]=item;
      break;
    case item.toLowerCase().includes("trisna"):
      newArr[1]=item;
      break;
    case item.toLowerCase().includes("bambang"):
      newArr[2]=item;
      break;
    
    default:
      newArr.push(item);
      break;
    }
  });
  // console.log("+++ imple arr new",newArr);

  return newArr;

}
const ChildApproverImple=(props)=>{
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
      {approver !== null && 
      orderArr(approver).map((item,i)=> {
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
  
ChildApproverImple.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  approver: PropTypes.array,
};
  
ChildApproverImple.defaultProps = {
  approver: ["DH","TS","BA","Y","L"],
};

export default ChildApproverImple;