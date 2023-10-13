import { IconButton } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { GrayHard, PrimaryHard } from '../../../../../assets/theme/colors';
import { makeStyles } from '@material-ui/styles';
import MinioDocComponent from '../../../../../components/MinioDocComponent';
import AttachFileSelector from '../../../../../components/AttachFileSelector';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
  deleteFile: {
    marginLeft: 10,
    color: PrimaryHard,
  },
}));

const FileUpload = ({ doc, index, isVendor, parentContext }) => {
  // KALAU MAU INTEGRASI HUBUNGI KUSKUS
  const classes = useStyles();
  const { isEditable, editableValues, setEditableValues } = useContext(parentContext);
  const [attachment, setAttachment] = useState('');

  useEffect(() => {
    let newDocuments;
    const oldDocuments = editableValues.documentList || [];
    // console.log('~ oldDocuments', oldDocuments);
    if (attachment) {
      newDocuments = [
        ...oldDocuments,
        {
          file: attachment,
          name: 'attachment',
        },
      ];
    } else {
      newDocuments = oldDocuments.filter((val, i) => i !== index);
    }
    // console.log('~ newDocuments', newDocuments);
    setEditableValues({ ...editableValues, documentList: newDocuments });
    // console.log('~ attachment', attachment);
  }, [attachment]);

  function handleChangeState(val, key) {
    setEditableValues({ ...editableValues, [key]: val });
  }

  return doc ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <MinioDocComponent filePath={doc.path} textColor={isVendor ? GrayHard : PrimaryHard} />
      {isEditable && !isVendor && (
        <IconButton
          className={classes.deleteFile}
          onClick={() => {
            const oldArr = editableValues.cimbAttachment || [];
            const newArr = oldArr.filter(function (itemOld, i) {
              return i !== index;
            });
            // console.log("+++ newArr",newArr);
            handleChangeState(newArr, 'cimbAttachment');
          }}
        >
          <DeleteIcon fontSize='small' />
        </IconButton>
      )}
    </div>
  ) : (
    <AttachFileSelector
      title={`Attachment ${index + 1}`}
      refId='attachment'
      onChange={(e) => setAttachment(e.target.files[0])}
      selectedFile={attachment}
      onDelete={() => setAttachment('')}
    />
  );
};

export default FileUpload;
