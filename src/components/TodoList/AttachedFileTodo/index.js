import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Grid, Typography } from '@material-ui/core';
import { ReactComponent as FileExtentionIcon } from '../../../assets/icons/general/extension-icon.svg';
import { stringLimit } from '../../../helpers/useFormatter';

function AttachedFileTodo(props) {
  const {filename, onDelete} = props;
  return (
    <Grid container style={{marginBottom: 5, width: 145, minHeight: 175, padding: 10, borderRadius: 8, border: "1px solid #E6EAF3"}} direction="column" alignItems='center'>
      <Grid item>
        <FileExtentionIcon height={64}/>
      </Grid>
      <Grid item>
        <Grid container direction="column" justifyContent='space-between' alignItems='center' style={{minHeight: 85}}>
          <Grid item>
            <Typography
              style={{ fontWeight: 400, fontSize: 13, color: "#2B2F3C", wordBreak: "break-all", textAlign: "center"  }}
            >
              {stringLimit(filename, 40)}
            </Typography>
          </Grid>
          <Grid item>
            <ButtonBase style={{ fontWeight: 400, fontSize: 10, color: "#FF7774", textAlign: "center"}} 
              onClick={onDelete}>
              <Typography>Hapus</Typography>
            </ButtonBase></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

AttachedFileTodo.propTypes = {
  filename: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AttachedFileTodo;
