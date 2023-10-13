import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Chip } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import { ChkyMultipleSelect } from '../../../../../components';
// import { ReactComponent as MachineIcon } from '../../../../assets/icons/general/calculator_overview.svg';
import { ChkyButtons } from '../../../../components/chky';

const useStyles = makeStyles({
  superRoot: {
    '& .MuiFormControl-root': { width: '100%' },
    '& .MuiPaper-elevation1': {
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
    '& .MuiTypography-body1': {
      fontSize: 12,
    },
  },
  root: {
    borderRadius: 10,
  },
  rootMultiple: {
    '& .MuiFormControlLabel-root': { width: '16%' },
  },
  chipRoot: {
    '& .MuiChip-outlined': {
      border: '1px solid #8D98B4',
      backgroundColor: '#F4F7FB',
    },
  },
});

const RedCheckbox = withStyles({
  root: {
    color: '#DC241F',
    '&$checked': {
      color: '#DC241F',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const dataSelect = {
  "Reff / ID MP": true,
  "Desc. Transaction": true,
  "Location": false,
  "Start Period": false,
  "Type GL": false,
  "Division": false,
  "Inisiator": true,
  "Vendor Name": false,
  "Region": false,
  "End Period": false,
  "Type Expenses": false,
  // "Action": false,
  "Payment Date": true,
  "Bank Account Name": false,
  "RC Code": false,
  "SL Code": false,
  "Capex Code": false,
  "Amount": true,
  "Machine ID": true,
  "MP Date": false,
  "SL Category": false,
  "Project Code": false,
  "Bank Account No": false,
  "Bank Account Holder": false,
  "Invoice No": false,
  "Acrual Code": false,
  "NPB": false,
};

function MemoFilter(props) {
  const { setTitleTable, setValueType, setLoading } = props;

  const classes = useStyles();
  const [state, setState] = React.useState(dataSelect);
  console.log('STATE', state);

  useEffect(() => {
    console.log(JSON.stringify(state));
    let tableName = []
    let tableType = []
    Object.keys(state).map((keyName) => (
      state[keyName] &&
      tableName.push(keyName) &&
      tableType.push('string')
    ))
    setTitleTable(tableName)
    setValueType(tableType)
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleDelete = (keyName) => {
    setState({ ...state, [keyName]: false });
  };

  function applyFilter() {
    console.log(JSON.stringify(state));
    let tableName = []
    let tableType = []
    Object.keys(state).map((keyName) => (
      state[keyName] &&
      tableName.push(keyName) &&
      tableType.push('string')
    ))
    setTitleTable(tableName)
    setValueType(tableType)
    setLoading(true)
  }

  return (
    <div className={classes.superRoot}>
      <Accordion defaultExpanded className={classes.root} style={{ borderRadius: 10, }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#DC241F" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={1}>
            <Grid item xs={1}><Typography style={{ fontSize: 13, fontWeight: 600 }}>Showing:</Typography></Grid>
            <Grid item xs={11}>
              <Grid container spacing={1}>
                {Object.keys(state).map((keyName) => (
                  state[keyName] &&
                  <Grid item className={classes.chipRoot}>
                    <Chip
                      variant="outlined"
                      label={keyName}
                      size="small"
                      onDelete={() => handleDelete(keyName)}
                      style={{ color: '#8D98B4', fontStyle: 'italic' }}
                    />
                  </Grid>
                ))}
              </Grid>

            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} justify="space-between">
            <Grid item className={classes.rootMultiple} xs={11}>
              <FormControl component="fieldset">
                <FormGroup row>
                  {Object.keys(state).map((keyName) => (
                    <FormControlLabel
                      control={<RedCheckbox checked={state[keyName]} onChange={handleChange} name={keyName} />}
                      label={keyName}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={1} style={{ display: 'grid', alignContent: 'flex-end' }}>
              <ChkyButtons onClick={applyFilter}>Apply</ChkyButtons>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

MemoFilter.propTypes = {

};

export default MemoFilter;

