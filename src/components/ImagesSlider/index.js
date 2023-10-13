/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  Typography,
  Link,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import getMinioFile from '../../helpers/getMinioFile';
import NoImage from "../../assets/images/image.png";

const ImagesSlider = ({ filePath, filename }) => {
  const [imageSlider, seImageSlider] = useState(null);
  const [open, setOpen] = useState(false);
      
  useEffect(() => {
    try {
      getMinioFile(filePath).then((result) => {
        // console.log(">>>> try getMinio Offering ", JSON.stringify(result));
        seImageSlider(result);
      });
    } catch (err) {
    //   console.log('>>>> Error try getMinio', err);
    }
  }, []);
    
  return (
    <div style={{ textAlign: 'center' }}>
      {imageSlider !== null && (
        <>
          <Typography>{filename}</Typography>
          <Link onClick={() => setOpen(true)}>
            <div style={{ height: 180, width: 180 }}>
              <img
                src={imageSlider.fileUrl}
                alt='img'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src=NoImage;
                }}
                style={{ width: '100%', margin: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </Link>
          <Modal
            centered
            visible={open}
            onCancel={() => setOpen(false)}
            footer={[
              <Button
                key='submit'
                type='primary'
                onClick={() => window.open(imageSlider.fileUrl, '_blank')}
              >
                Download
              </Button>,
            ]}
            zIndex={2000}
          >
            <img 
              src={imageSlider.fileUrl} 
              style={{ width: '100%' }} alt='img' 
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src=NoImage;
              }}/>
          </Modal>
        </>
      )}
    </div>
  );
};
ImagesSlider.propTypes = {
  filePath: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
};

export default ImagesSlider;