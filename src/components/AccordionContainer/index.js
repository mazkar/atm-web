import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  root: {
    borderRadius: 20,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  title: {
    fontSize: 20, 
    fontWeight: 500,
  },
  container: {
    padding: 10,
  },
});
function AccordionContainer(props) {
  const {title, children, defaultExpanded} = props;
  const classes = useStyles();
  return (
    <Accordion className={classes.root} defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{color:"#DC241F"}} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.title}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.container}>
        {children}
      </AccordionDetails>
      
    </Accordion>
  );
}

AccordionContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultExpanded: PropTypes.bool,
};
AccordionContainer.defaultProps = {
  defaultExpanded: false,
};

export default AccordionContainer;

