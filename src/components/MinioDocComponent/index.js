import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Link } from '@material-ui/core';
import { ReactComponent as FileIcon } from "../../assets/icons/linear-red/paperclip.svg";
import getMinioFile from '../../helpers/getMinioFile';

const MinioDocComponent = ({ filePath, textColor = "#DC241F" }) => {
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
    <div>
      {minioFile !== null ? (
        <div>
          <Link href={minioFile.fileUrl} target="_blank" style={{ display: "flex", alignItems: "flex-start", textDecoration: "none", width: "fit-content" }}>
            <FileIcon height={15} style={{minWidth: 20, marginTop: 5}}/>
            <Typography style={{ fontSize: 14, color: textColor, marginLeft: 5, wordBreak: "break-all" }}>
              <b>{minioFile.fileName}</b>
            </Typography>
          </Link>
        </div>
      ): (<Typography style={{ fontSize: 12, color: "#8D98B4", marginLeft: 5 }}><b>{isLoading? "Loading...": "Document Error."}</b></Typography>)}
    </div>
  );
};

MinioDocComponent.propTypes = {
  filePath: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired
};

export default MinioDocComponent;

