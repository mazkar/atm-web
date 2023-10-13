import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import constants from '../../../helpers/constants';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    height: 450,
    width: 'calc(100% - 16px)',
    maxWidth: '580px',
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonCancel: {
    margin: '65px',
    backgroundColor: constants.color.primaryHard,
    color: 'white',
    textTransform: 'capitalize',
    '& .MuiButton-root': {
      width: '100px',
      '&:hover': {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.8,
      },
    },
  },
  buttonContainer: {
    marginTop: 20,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 6,
    width: 100,
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    borderRadius: 6,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  textForm: {
    fontSize: 15,
    color: constants.color.dark,
    fontWeight: 500,
    marginBottom: 10,
  },
  inputForm: {
    height: 40,
    border: '1px solid #E6EAF3',
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    borderRadius: 8,
  },
  descForm: {
    '& .MuiTextField-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
    },
    border: '1px solid #E6EAF3',
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    borderRadius: 8,
  },
});

const ModalNew = ({ isOpen, onClose, type, submitFn, disabled, content, setIsLoadData }) => {
  const classes = useStyles();
  const isAdd = type === 'add';
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (!isAdd && content) {
      setName(content.name ? content.name : '');
      setDesc(content.desc ? content.desc : '');
    } else {
      setName('')
      setDesc('')
    }
  }, [content, type]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDesc(e) {
    setDesc(e.target.value);
  }

  const handleSubmit = () => {
    submitFn({ name, description: desc, type, id: content.id });
    setIsLoadData(true)
  };

  return (
    <div className={classes.root}>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.paper}>
          <Grid container justify="flex-end">
            <Grid item>
              <IconButton
                onClick={onClose}
                disabled={disabled}
                style={{ top: -20, right: -20 }}
              >
                <Close className={classes.closeIcon} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item>
              <Typography
                variant="h4"
                component="h4"
                style={{ marginBottom: 20 }}
              >
                {isAdd ? 'Add' : 'Edit'} Menu
              </Typography>
            </Grid>
          </Grid>
          <div>
            <div>
              <Typography className={classes.textForm}>Menu Name</Typography>
            </div>
            <div>
              <Input
                className={classes.inputForm}
                placeholder="Create Data..."
                value={name}
                onChange={handleChangeName}
              />
            </div>
          </div>
          <div style={{ marginTop: 25 }}>
            <div>
              <Typography className={classes.textForm}>Description</Typography>
            </div>
            <div>
              <TextField
                className={classes.descForm}
                id="outlined-textarea"
                placeholder="Menu untuk..."
                multiline
                fullWidth
                variant="outlined"
                rows={3}
                value={desc}
                onChange={handleChangeDesc}
              />
            </div>
          </div>
          <Grid
            container
            justify="space-between"
            className={classes.buttonContainer}
          >
            <Grid item>
              <Button
                disabled={disabled}
                variant="outlined"
                disableElevation
                className={classes.secondaryButton}
                onClick={onClose}
                style={{ textTransform: 'capitalize' }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={disabled}
                variant="contained"
                disableElevation
                className={classes.primaryButton}
                onClick={handleSubmit}
                style={{ textTransform: 'capitalize' }}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

ModalNew.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setIsLoadData: PropTypes.func.isRequired
};

export default ModalNew;
