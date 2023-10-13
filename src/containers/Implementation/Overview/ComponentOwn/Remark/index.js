import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, makeStyles, Modal, Typography, IconButton, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { ChkyButtons } from '../../../../../components';
import SuccesSubmit from './SuccesSubmit';
import constants from '../../../../../helpers/constants';
import { doAddRemarkRollout, doAddRemarkSla } from '../../../ApiServiceImplementation';

const useStyles = makeStyles({
  rootModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 840,
    backgroundColor: "#FFF",
    padding: 30,
    borderRadius: 10,
  },
  popUpCancel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  textField: {
    width: "100%",
    marginTop: 10,
    "& .MuiInputBase-root": {
      border: "1px solid",
      borderColor: "#BCC8E7",
      borderRadius: "6px",
    },
    "& .MuiInputBase-input": {
      // right: '-20px',
    },
    "& .MuiOutlinedInput-input": {
      "&: hover": {
        background: "#F4F7FB",
      },
    },
    "& .MuiButton-root": {
      "&:hover": {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.9,
      },
    },
  },
});

// eslint-disable-next-line react/prop-types
function Remark({id, remark, type = "sla"}) {
  const classes = useStyles();
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [succesSubmit, setSuccesSubmit] = useState(false);
  const [newRemark, setNewRemark] = useState("");
  const [loading, setLoading] = useState(false);
  
  // set handler loader when call Approval API Service
  function loadingHandler(bool) {
    setLoading(bool);
  }

  const submitRemark = ()=>{
    if(!newRemark){
      alert("Remark is required");
    }else{
      const dataHit = {
        id,
        remark: newRemark,
      };
      if(type === "sla"){
      // FETCH ROLLOUT UPDATE
        doAddRemarkSla(loadingHandler, dataHit).then((response) => {
        //   console.log('+++ response doAddRemarkSla', response);
          try {
            if (response.data?.responseCode === "00") {
              setSuccesSubmit(true);
            } 
          } catch (err) {
            console.log('~ err', err);
            loadingHandler(false);
            alert(`Terjadi Kesalahan...! \n${err}`);
          }
        });
      }else{
      // FETCH ROLLOUT UPDATE
        doAddRemarkRollout(loadingHandler, dataHit).then((response) => {
        //   console.log('+++ response doAddRemarkRollout', response);
          try {
            if (response.data?.responseCode === "00") {
              setSuccesSubmit(true);
            } 
          } catch (err) {
            console.log('~ err', err);
            loadingHandler(false);
            alert(`Terjadi Kesalahan...! \n${err}`);
          }
        });
      }
    }
  };
  return (
    <div>
      <Button onClick={()=>setOpenModal(true)} variant="text" style={{ textTransform: "none" }}>{remark || "-" }</Button>
      {/* MODAL SECTION */}
      <Modal
        className={classes.rootModal}
        open={openModal}
        onClose={()=>setOpenModal(false)}
      >
        <Grid container className={classes.container}>
          <Grid container className={classes.content} direction='column'>
            <Grid item>
              <Grid container justify="flex-end">
                <Grid item>
                  <IconButton onClick={()=>setOpenModal(false)}>
                    <Close className={classes.closeIcon} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h4" style={{textAlign: 'center', marginBottom: 45}}>Remark</Typography>
            </Grid>
            <Grid item>
              <Typography>Remark: </Typography>
              <TextField
                className={classes.textField}
                id="outlined-textarea"
                placeholder="add remark note"
                multiline
                variant="outlined"
                value={newRemark}
                onChange={(e)=>setNewRemark(e.target.value)}
                rows={3}
              />
            </Grid>
            <Grid item>
              <SuccesSubmit show={succesSubmit} onClose={()=>{
                setSuccesSubmit(false); 
                history.go(0);}} />
            </Grid>
            <Grid item>
              <Grid
                container
                justify="space-between"
                direction="row"
                style={{ marginTop: 35 }}
              >
                <ChkyButtons
                  height={38}
                  btnType="redOutlined"
                  buttonType="redOutlined"
                  onClick={() => setOpenModal(false)}
                  style={{textTransform: "capitalize"}}
                >
                Cancel
                </ChkyButtons>
                <ChkyButtons 
                  onClick={submitRemark} 
                  height={38}
                  style={{textTransform: "capitalize"}}
                  disabled={loading}>
                Submit
                </ChkyButtons>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}

Remark.propTypes = {
  id: PropTypes.string.isRequired,
  remark: PropTypes.string.isRequired,
};

export default Remark;

