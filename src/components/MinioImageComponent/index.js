/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import NoImage from "../../assets/images/image.png";
import getMinioFile from '../../helpers/getMinioFile';

const MinioImageComponent = ({ filePath, ...others }) => {
  const [minioFile, setMinioFile] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if(filePath){
      try {
        setIsLoading(true);
        getMinioFile(filePath).then((result) => {
        // console.log(">>>> try getMinio Offering ", JSON.stringify(result));
          setMinioFile(result);
          setIsLoading(false);
        });
      } catch (err) {
        setIsLoading(false);
        //   console.log(">>>> Error try getMinio", err);
      }
    }
  }, [filePath]);

  return (
    <>
      {minioFile !== null ? (
        <img src={minioFile.fileUrl} alt="img" {...others} 
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src=NoImage;
          }}
        />
      ): (<Typography style={{ fontSize: 9, color: "#8D98B4", textAlign: "center" }}>{isLoading? "Loading...": "Error."}</Typography>)}
    </>
  );
};

MinioImageComponent.propTypes = {
  filePath: PropTypes.string.isRequired,
};

export default MinioImageComponent;

