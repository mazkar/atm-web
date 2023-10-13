import React, { useContext, useEffect, useState } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import MinioImageComponent from '../../../../../components/MinioImageComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageSelector from '../../../../../components/ImageSelector';
import { makeStyles } from '@material-ui/core/styles';
import { PrimaryHard } from '../../../../../assets/theme/colors';

const useStyles = makeStyles({
  deleteFilePhoto: {
    position: 'absolute',
    right: -10,
    top: -10,
    color: PrimaryHard,
  },
  imgContainer: {
    borderRadius: 10,
    width: 80,
    height: 85,
  },
});

const ImageContainer = ({ title, name, parentContext }) => {
  const classes = useStyles();
  const { editableValues, setEditableValues, isEditable } = useContext(parentContext);
  const [photo, setPhoto] = useState('');

  function handleChangeState(val) {
    setEditableValues({ ...editableValues, [name]: val });
  }

  useEffect(() => {
    let newPhotos;
    const oldPhotos = editableValues.photoList ? [...editableValues.photoList] : [];
    // console.log('~ oldPhotos', oldPhotos);
    if (photo) {
      newPhotos = [
        ...oldPhotos,
        {
          name,
          img: photo,
        },
      ];
    } else {
      newPhotos = oldPhotos.filter((val) => val.name !== name);
    }
    // console.log('~ newPhotos', newPhotos);
    setEditableValues({ ...editableValues, photoList: newPhotos });
    // console.log('~ photo', photo);
  }, [photo]);

  return (
    <>
      {(isEditable || editableValues[name]) && (
        <Grid item>
          {editableValues[name] ? (
            <div style={{ position: 'relative' }}>
              <MinioImageComponent
                filePath={editableValues[name]}
                className={classes.imgContainer}
              />
              {isEditable && (
                <IconButton
                  className={classes.deleteFilePhoto}
                  onClick={() => {
                    handleChangeState(null);
                  }}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              )}
            </div>
          ) : (
            <ImageSelector
              title={title}
              onChange={(e) => setPhoto(e.target.files[0])}
              selectedImage={photo}
              onDelete={() => setPhoto('')}
            />
          )}
        </Grid>
      )}
    </>
  );
};

export default ImageContainer;
