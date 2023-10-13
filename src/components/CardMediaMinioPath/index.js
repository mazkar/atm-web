import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CardMedia } from '@material-ui/core';
import getMinioFile from '../../helpers/getMinioFile';

const CardMediaMinioPath = ({ filePath, onClick, height = "140" }) => {
  const [minioFile, setMinioFile] = useState(null);

  useEffect(() => {
    try {
      getMinioFile(filePath).then((result) => {
        // console.log(">>>> try getMinio Offering ", JSON.stringify(result));
        setMinioFile(result);
      });
    } catch (err) {
    //   console.log(">>>> Error try getMinio", err);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      {minioFile !== null && (
        <CardMedia 
          component="img"
          alt="task"
          height={height}
          image={minioFile.fileUrl}
          title="Click to Detail"
          style={{cursor: "pointer"}} 
          onClick={onClick} />
      )}
    </div>
  );
};

CardMediaMinioPath.propTypes = {
  filePath: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  height: PropTypes.string.isRequired,
};

export default CardMediaMinioPath;

