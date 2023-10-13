/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { 
  Grid, 
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom';
import TodoItem from '../TodoItem';
import { ReactComponent as IconHigh } from '../../../assets/icons/general/high-priority.svg';
import { ReactComponent as IconMedium } from '../../../assets/icons/general/medium-priority.svg';
import { ReactComponent as IconLow } from '../../../assets/icons/general/low-priority.svg';
import PopUpConfirmation from '../../PopUpConfirmation';
import PopupSuccesDelete from '../../PopupSuccessDelete';

const useStyles = makeStyles({
  root: {
    "& .MuiAccordion-root": {
      backgroundColor: "transparent",
    },
    "& .MuiAccordionSummary-content": {
      margin:0
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "inherit",
    },
  },
  paperHeader: {
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
  },
  priorityBg: {
    left: 0,
    top: 0,
    position: "absolute"
  },
  summaryContainer: {
    paddingLeft: 25,
    paddingTop: 5,
    paddingBottom: 5,
  },
  summaryTitle: {
    fontSize: 20, 
    fontWeight: 500,
    color: "#2B2F3C"
  },
  summaryCount: {
    fontWeight: 500,
    fontSize: 15,
    color: "#8D98B4",
    marginTop: 3,
  },
  containerList: {
    maxHeight: 450,
    width: "100%",
    overflowY: "scroll"
  },
  paperListItems: {
    marginTop: 30,
    padding: 0,
  },
});

function renderTitle(lvl){
  switch (lvl) {
  case "high":
    return "High Priority";
  case "medium":
    return "Medium Priority";
  default:
    return "Low Priority";
  }
}

function renderIcon(lvl){
  switch (lvl) {
  case "high":
    return <IconHigh/>;
  case "medium":
    return <IconMedium/>;
  default:
    return <IconLow/>;
  }
}

function PriorityCardContainer(props) {
  const classes = useStyles();
  const history = useHistory();
  const {level, data} = props;

  const [openDeletePop, setOpenDeletePop] = useState(false);
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);
  
  const [idDelete, setIdDelete] = useState(null);

  return (
    <div className={classes.root}>
      <Accordion elevation={0} defaultExpanded>
        <Paper className={classes.paperHeader}>
          <div className={classes.priorityBg}>{renderIcon(level)}</div>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{color:"#DC241F"}} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container direction='column' className={classes.summaryContainer}>
              <Grid item>
                <Typography className={classes.summaryTitle}>{renderTitle(level)}</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.summaryCount}>{data.length} Task</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
        </Paper>
        <AccordionDetails className={classes.paperListItems}>
          <div className={classes.containerList}>
            {/* <TodoItem/> */}
            <Grid container direction='column'>
              {data.map((item)=>{
                return(
                  <Grid item>
                    <TodoItem data={item} 
                      handleDelete={(id)=>{
                        setOpenDeletePop(true);
                        setIdDelete(id);
                      }}/>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </AccordionDetails>
      </Accordion>
      <PopupSuccesDelete
        isOpen={isSuccessDelete}
        onClose={()=>history.go(0)}
        message="Hapus Berhasil Dilakukan"
      />
      <PopUpConfirmation
        isOpen={openDeletePop}
        onSubmit={()=>{
          alert(`DELETE ID: ${idDelete}`);
          setIsSuccessDelete(true);
        }}
        onLeave={()=>setOpenDeletePop(false)}
        onClose={()=>setOpenDeletePop(false)}
        message="Anda yakin akan menghapus?"
        desc='Anda tidak dapat membatalkan tindakan ini'
      />
    </div>
  );
}

PriorityCardContainer.propTypes = {
  level: PropTypes.string,
  data: PropTypes.array
};
PriorityCardContainer.defaultProps = {
  level: "high",
  data: [],
};

export default PriorityCardContainer;
