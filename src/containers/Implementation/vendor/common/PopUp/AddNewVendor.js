import React from 'react'
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
  Checkbox,
  FormControlLabel
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { ReactComponent as CloseButton } from "../../../../../assets/icons/siab/x-new.svg"
import PropTypes from 'prop-types'
import constants from '../../../../../helpers/constants'


const RedCheckbox = withStyles({
    root: {
      color: "#E6EAF3",
      "&$checked": {
        color: "#DC241F",
      },
    },
    checked: {},
})((props) => <Checkbox {...props} />)

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 400,
    minHeight: "440px",
    height: "180px",
    borderRadius: 10,
    padding: 30,
  },
  boxStyle: {
    padding: "15px 15px",
    position: "relative",
    borderRadius: 10,
    border: "1px solid #BCC8E7",
    backgroundColor: "#fff",
    marginTop: 10,
    width: "96%",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 20,
      height: "125%",
      left: -37,
      backgroundColor: "#fff",
      top: -100,
      zIndex: 1,
    },
    height: "200px",
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F4F7FB",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#9AC2FF",
    },
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
});


const successPopUp = ({ isOpen, onClose }) => {
  const {modal,paper,boxStyle} = useStyles()
  const classes = useStyles()
  const [checkedCR, setCheckedCR] = React.useState(false)
  const [checkedFLM, setCheckedFLM] = React.useState(false)
  const [checkedSLM, setCheckedSLM] = React.useState(false)
  const [checkedCIT, setCheckedCIT] = React.useState(false)

  return (
    <Modal
      className={modal}
      open={isOpen}
      //   onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="flex-end" alignItems="stretch">
          {<CloseButton onClick={onClose} style={{ cursor: "pointer" }} />}
        </Grid>
        <Grid
          container
          //   justify="center"
          //   alignItems="center"
          direction="column"
          spacing={2}
        >
          <Grid item>
            <Typography
              variant="h5"
              component="h5"
              align="center"
              style={{ fontWeight: 600 }}
            >
              Add Nama Vendor
            </Typography>
          </Grid>

          <Grid item>
            <Typography style={{ color: "#374062", fontWeight: 500 }}>
              Pilih Vendor :
            </Typography>
          </Grid>
        </Grid>

        <Box className={boxStyle}>
          <Grid container direction="column">
            <Grid item>
              <FormControlLabel
                control={
                  <RedCheckbox
                    checked={checkedCR}
                    color="default"
                    onChange={() => setCheckedCR(!checkedCR)}
                  />
                }
                label={
                  <Typography className={classes.textCheckbox}>CR</Typography>
                }
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <RedCheckbox
                    checked={checkedFLM}
                    color="default"
                    onChange={() => setCheckedFLM(!checkedFLM)}
                  />
                }
                label={
                  <Typography className={classes.textCheckbox}>FLM</Typography>
                }
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <RedCheckbox
                    checked={checkedSLM}
                    color="default"
                    onChange={() => setCheckedSLM(!checkedSLM)}
                  />
                }
                label={
                  <Typography className={classes.textCheckbox}>SLM</Typography>
                }
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <RedCheckbox
                    checked={checkedCIT}
                    color="default"
                    onChange={() => setCheckedCIT(!checkedCIT)}
                  />
                }
                label={
                  <Typography className={classes.textCheckbox}>CIT</Typography>
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Grid
          container
          style={{ marginTop: 40, marginLeft: 0, marginBottom: 10 }}
          justify="space-between"
        >
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={classes.secondaryButton}
              onClick={onClose}
              style={{ textTransform: "capitalize" }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item style={{ marginRight: 10 }}>
            <Button
              variant="contained"
              disableElevation
              className={classes.primaryButton}
              onClick={onClose}
              style={{ textTransform: "capitalize" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

successPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};

export default successPopUp;