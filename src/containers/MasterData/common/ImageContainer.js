import { Grid, IconButton, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { EditMasterCtx } from '../Edit';
import ImgPlaceHolder from '../../../assets/images/def_upload.png';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { doUploadPhoto } from '../../Implementation/ApiServiceImplementation';
import MinioImageComponent from '../../../components/MinioImageComponent';
import { ReactComponent as TrashIcon } from '../../../assets/images/trash.svg';

const useStyles = makeStyles(() => ({
  upload: {
    '& .ant-upload.ant-upload-select-picture-card, & .ant-upload-list-picture-card-container': {
      margin: 0,
      width: 180,
      height: 140,
    },
    '& .ant-upload-list-picture .ant-upload-list-item, .ant-upload-list-picture-card .ant-upload-list-item':
      {
        padding: 0,
      },
  },
}));

const ImageContainer = ({ title, name }) => {
  const classes = useStyles();
  const { detailData, setDetailData } = useContext(EditMasterCtx);
  const [disabled, setDisabled] = useState(false);
  const url = detailData[name];

  async function handleChange(e) {
    setDisabled(true);
    try {
      const res = await doUploadPhoto(e.target.files[0]);
      // console.log('~ res', res);
      const newData = { ...detailData, [name]: res.data.path };
      setDisabled(false);
      setDetailData(newData);
    } catch (e) {
      console.log('~ e', e);
      alert('Error upload image!');
      setDisabled(false);
    }
  }

  function handleDelete() {
    const newData = { ...detailData, [name]: null };
    setDetailData(newData);
  }

  return (
    <Grid item xs>
      <Typography style={{ fontSize: '15px', lineHeight: '18px', marginBottom: 10 }}>
        {title}
      </Typography>
      <div style={{ width: 180, position: 'relative' }}>
        {url ? (
          <>
            <IconButton
              style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'white' }}
              onClick={handleDelete}
            >
              <TrashIcon />
            </IconButton>
            <MinioImageComponent filePath={url} style={{ height: 'auto', width: '100%' }} />
          </>
        ) : (
          <>
            <input
              type='file'
              id={name}
              accept='image/*'
              onChange={handleChange}
              style={{
                width: '0.1px',
                height: '0.1px',
                opacity: 0,
                overflow: 'hidden',
                position: 'absolute',
                zIndex: -1,
              }}
              disabled={disabled}
            />
            <label htmlFor={name}>
              <img src={ImgPlaceHolder} style={{ height: 'auto', width: '100%' }} />
            </label>
          </>
        )}
      </div>
    </Grid>
  );
};

export default ImageContainer;
