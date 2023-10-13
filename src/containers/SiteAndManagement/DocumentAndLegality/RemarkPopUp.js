import React from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import constants from '../../../helpers/constants';
import TextArea from 'antd/lib/input/TextArea';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 660,
    height: 420,
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    marginTop: 62,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width:180,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border:'1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width:180,
  },
  areaText: {
    width: '600px',
    height: '70px',
    borderRadius: 8,
    backgroundColor: constants.color.white,
  },
});

const RemarkPopUp = ({ isOpen, onClose, onLeave, onChange }) => {
  const {
    modal,
    paper,
    closeIcon,
    buttonContainer,
    primaryButton,
    secondaryButton,
    areaText
  } = useStyles();

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="flex-end">
          <Grid item>
            <IconButton onClick={onClose}>
              <Close className={closeIcon} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={5}
        >
          <Grid item>
            <Typography variant="h4" component="h4">
                Remark Document
            </Typography>
          </Grid>

            <Grid
                container
                justify="flex-start"
                direction="column"
                spacing={1}
                alignItems="center"
            >
                <Grid item style={{marginLeft: "-540px"}}>
                    <Typography variant="body1" component="p">
                        Remark
                    </Typography>
                </Grid>
                <Grid item style={{width: "600px", borderRadius: 8}}>
                    <TextArea
                        placeholder="Input remark..."
                        className={areaText}
                        onChange={(e) => onChange(e.target.value)}
                        rows={5}
                    />
                </Grid>
            </Grid>

        </Grid>

        <Grid container justify="space-between" className={buttonContainer}>
          <Grid item>
            <Button
              variant="outlined"
              disableElevation
              className={secondaryButton}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={onLeave}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

RemarkPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RemarkPopUp;