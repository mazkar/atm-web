import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getMinioFile from '../getMinioFile';

const RenderImageSlider=({filePath})=>{
  const [imageSlider,seImageSlider] = useState(null);
  useEffect(()=>{
    try{
      getMinioFile(filePath).then(result=>{
        console.log(">>>> try getMinio Offering ",JSON.stringify(result));
        seImageSlider(result);
      });
    }catch(err){
      console.log(">>>> Error try getMinio", err);
    }
  },[]);
  useEffect(()=>{console.log(">>>> imageSlider: ", imageSlider);},[imageSlider]);
  return(
    <div style={{ textAlign: 'center', }}>
      {imageSlider !== null &&
        <img src={imageSlider.fileUrl} alt="img" style={{width:'100%'}}/>
      }
    </div>
  );
};
RenderImageSlider.propTypes={
  filePath: PropTypes.string.isRequired,
};

export default RenderImageSlider;