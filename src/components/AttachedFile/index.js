import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Grid, Typography } from '@material-ui/core';
import { ReactComponent as FileIcon } from "../../assets/icons/linear-red/paperclip.svg";
import { ReactComponent as TrashIcon } from "../../assets/images/trash.svg";

import { stringLimit } from '../../helpers/useFormatter';

function AttachedFile(props) {
  const {filename, onDelete} = props;
  return (
    <Grid container style={{marginBottom: 5}}>
      <Grid item>
        <div style={{ display: "flex", alignItems: "center", paddingRight: 30}}>
          <FileIcon height={15}/>
          <Typography style={{ fontSize: 13, color: "#DC241F", marginLeft: 5, wordBreak: "break-all"  }}>
            <b>{stringLimit(filename, 40)}</b>
          </Typography>
        </div>  
      </Grid>
      <Grid item>
        <ButtonBase
          style={{position: "relative", paddingLeft: 10, paddingRight: 10}} 
          onClick={onDelete}>
          <TrashIcon/>
        </ButtonBase>
      </Grid>
    </Grid>
  );
}
  
AttachedFile.propTypes = {
  filename: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
  
export default AttachedFile;

