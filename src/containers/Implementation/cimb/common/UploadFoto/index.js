import { Grid, Typography } from '@material-ui/core';
import { Upload } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import getMinioFromUrl from '../../../../../helpers/getMinioFromUrl';
import { ReactComponent as Plus } from '../../../../../assets/icons/general/plus_red.svg';
import { ReactComponent as DelIcon } from '../../../../../assets/icons/general/del-upload.svg';
import secureStorage from '../../../../../helpers/secureStorage';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import Add from '@material-ui/icons/Add';
import { GrayMedium } from '../../../../../assets/theme/colors';
//import { TaskJarkomCtx } from '../Detail';

const useStyles = makeStyles(() => ({
  upload: {
    '& .ant-upload.ant-upload-select-picture-card, & .ant-upload-list-picture-card-container': {
      margin: 0,
      width: 80,
      height: 80,
      backgroundColor: 'white',
      borderColor: GrayMedium,
      borderRadius: 10,
      '&>div': {
        border: 'none',
      },
      '& .ant-upload-list-item-actions': {
        opacity: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: 'none',
        '&>a': {
          position: 'absolute',
          transform: 'translate(-50%,-50%)',
          top: '50%',
          left: '50%',
        },
        '& .ant-upload-list-item-card-actions-btn': {
          opacity: 1,
          position: 'absolute',
          top: 5,
          right: 5,
          width: 'auto',
          height: 'auto',
          border: 'none',
        },
      },
    },
    '& .ant-upload-list-picture .ant-upload-list-item, .ant-upload-list-picture-card .ant-upload-list-item': {
      padding: 0,
    },
    '& .ant-upload-list-item-thumbnail img': {
      borderRadius: 10,
    },
  },
}));

const ImageContainer = ({ title, url }) => {
  // KALAU MAU INTEGRASI HUBUNGI KUSKUS
  const classes = useStyles();
  //const { isEditable } = useContext(TaskJarkomCtx);
  const [isEditable, setIsEditable] = useState("isEdit")
  const token = secureStorage.getItem('access_token');
  const [disabled, setDisabled] = useState(false);
  const [fileList, setFileList] = useState([]);

  // useEffect(() => {
  // // console.log('~ fileList', fileList);
  // }, [fileList]);

  useEffect(() => {
    if (url) {
      setFileList([
        {
          uid: '1',
          name: 'file name',
          status: 'done',
          url,
        },
      ]);
    } else {
      setDisabled(false);
      setFileList([]);
    }
    // console.log('~ url', url);
  }, [url]);

  function handleChange(info) {
    console.log('~ status', info.file.status, moment().format());
    if (info.file.status === 'done') {
      setFileList([info]);
    } else if (info.file.status === 'removed') {
      setFileList([]);
    } else if (info.file.status === 'uploading') {
      setDisabled(true);
    }
  }

  return (
    <>
      {(isEditable || (!isEditable && url)) && (
        <Grid item>
          <Upload
            action={`${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/uploadPhoto`}
            headers={{ Authorization: `Bearer ${token}` }}
            listType='picture-card'
            onChange={handleChange}
            className={classes.upload}
            fileList={fileList}
            accept='image/*'
            showUploadList={{
              showRemoveIcon: isEditable,
              removeIcon: () => <DelIcon />,
            }}
            disabled={disabled}
          >
            {disabled ? (
              'Uploading'
            ) : fileList.length === 1 ? null : (
              <div style={{ textAlign: 'center' }}>
                <Plus style={{ fontSize: 14 }} />
                <Typography
                  style={{
                    fontSize: '13px',
                    lineHeight: '16px',
                    width: 55,
                  }}
                >
                  Photo {title}
                </Typography>
              </div>
            )}
          </Upload>
          {!isEditable && (
            <Typography
              style={{
                fontSize: '12px',
                lineHeight: '14px',
                marginTop: 10,
                textAlign: 'center',
              }}
            >
              {title}
            </Typography>
          )}
        </Grid>
      )}
    </>
  );
};

export default ImageContainer;
