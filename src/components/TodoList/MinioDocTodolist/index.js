import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Link, Grid } from '@material-ui/core';
import { ReactComponent as FileExtentionIcon } from '../../../assets/icons/general/extension-icon.svg';
import getMinioFile from '../../../helpers/getMinioFile';
import { stringLimit } from '../../../helpers/useFormatter';

const MinioDocTodolist = ({ filePath, textColor = "#DC241F" }) => {
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
    <div style={{ width: "100%" }}>
      {minioFile !== null ? (
        <Link href={minioFile.fileUrl} target="_blank" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Grid 
            container 
            style={{
              marginBottom: 5, 
              width: 145, 
              minHeight: 130, 
              padding: 10, 
              borderRadius: 8, 
              border: "1px solid #E6EAF3"
            }} 
            direction="column" 
            alignItems='center' 
            justifyContent='space-between'>
            <Grid item>
              <FileExtentionIcon height={64}/>
            </Grid>
            <Grid item>
              <Typography
                style={{ fontWeight: 400, fontSize: 13, color: "#2B2F3C", wordBreak: "break-all", textAlign: "center"  }}
              >
                {stringLimit(minioFile.fileName, 40)}
              </Typography>
            </Grid>
          </Grid>
        </Link>
      ): (<Typography style={{ fontSize: 12, color: "#8D98B4", marginLeft: 5 }}><b>{isLoading? "Loading...": "Document Error."}</b></Typography>)}
    </div>
  );
};

MinioDocTodolist.propTypes = {
  filePath: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired
};

export default MinioDocTodolist;

