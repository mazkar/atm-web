import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Chip } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import { ChkyMultipleSelect } from '../../../components';
// import {ReactComponent as MachineIcon} from '../../../assets/icons/general/calculator_overview.svg';
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
  "Location": false,
  "Pembayaran": true,
  "Inisiator NPB": true,
  "Status": true,
  "Document": true,
  "Smart Reff": false,
  "SL": false,
  "Category": true,
  "NPB": false,
  "Status Approval NPB": true,
  "Nominal Invoice": false,
  "PIC Up Load Smart": false,
  "Keterangan SL": true,
  "Detail Pekerjaan": false,
  "Nominal NPB": true,
  "Tanggal Approval NPB": false,
  "Nominal NPB Invoice": false,
  "Tanggal Bayar": false,
  "ATM ID": true,
  "Penawaran Harga": false,
  "Tanggal Submit NPB": true,
  "No. Invoice": false,
  "Nama Vendor": false,
  "Bupot Pajak": false,
  "Type Budget": false,
  "Remark": true
};

function MemoFilter(props) {
  const { setTitleTable, setValueType, setLoading } = props;

  const classes = useStyles();
  const [state, setState] = React.useState(dataSelect);

  useEffect(() => {
    // console.log(JSON.stringify(state));
    let tableName1 = []
    let tableName2 = []
    let tableName3 = []
    let tableName4 = []
    let tableName5 = []
    let tableType1 = []
    let tableType2 = []
    let tableType3 = []
    let tableType4 = []
    let tableType5 = []
    Object.keys(state).map((keyName) => (
      state[keyName] && keyName === 'Remark' ? tableName5.push(keyName) && tableType5.push('remark_budget_tracking')
        : state[keyName] && keyName === 'ATM ID' ? tableName1.push(keyName) && tableType1.push('string')
          : state[keyName] && keyName === 'Category' ? tableName2.push(keyName) && tableType2.push('string')
            : state[keyName] && keyName === 'Pembayaran' ? tableName3.push(keyName) && tableType3.push('string')
              : state[keyName] && keyName === 'Keterangan SL' ? tableName3.push(keyName) && tableType3.push('string')
                : state[keyName] && keyName === 'Nominal NPB' ? tableName3.push('Nominal') && tableType3.push('string')
                  : state[keyName] && keyName === 'Tanggal Submit NPB' ? tableName3.push('Tgl Submit') && tableType3.push('string')
                    : state[keyName] && keyName === 'Inisiator NPB' ? tableName4.push('Inisiator') && tableType4.push('string')
                      : state[keyName] && keyName === 'Status' ? tableName4.push(keyName) && tableType4.push('string')
                        : state[keyName] && keyName === 'Document' ? tableName4.push('File') && tableType4.push('file_budget_tracking')
                          : state[keyName] && keyName === 'Status Approval NPB' ? tableName5.push('Approval') && tableType5.push('approve_budget_tracking')
                            : state[keyName] && tableName3.push(keyName) && tableType3.push('string')
    ))
    setTitleTable(tableName1.concat(tableName2, tableName3, tableName4, tableName5))
    setValueType(tableType1.concat(tableType2, tableType3, tableType4, tableType5))
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleDelete = (keyName) => {
    setState({ ...state, [keyName]: false });
  };

  function applyFilter() {
    // console.log(JSON.stringify(state));
    let tableName1 = []
    let tableName2 = []
    let tableName3 = []
    let tableName4 = []
    let tableName5 = []
    let tableType1 = []
    let tableType2 = []
    let tableType3 = []
    let tableType4 = []
    let tableType5 = []
    Object.keys(state).map((keyName) => (
      state[keyName] && keyName === 'Remark' ? tableName5.push(keyName) && tableType5.push('remark_budget_tracking')
        : state[keyName] && keyName === 'ATM ID' ? tableName1.push(keyName) && tableType1.push('string')
          : state[keyName] && keyName === 'Category' ? tableName2.push(keyName) && tableType2.push('string')
            : state[keyName] && keyName === 'Pembayaran' ? tableName3.push(keyName) && tableType3.push('string')
              : state[keyName] && keyName === 'Keterangan SL' ? tableName3.push(keyName) && tableType3.push('string')
                : state[keyName] && keyName === 'Nominal NPB' ? tableName3.push('Nominal') && tableType3.push('string')
                  : state[keyName] && keyName === 'Tanggal Submit NPB' ? tableName3.push('Tgl Submit') && tableType3.push('string')
                    : state[keyName] && keyName === 'Inisiator NPB' ? tableName4.push('Inisiator') && tableType4.push('string')
                      : state[keyName] && keyName === 'Status' ? tableName4.push(keyName) && tableType4.push('string')
                        : state[keyName] && keyName === 'Document' ? tableName4.push('File') && tableType4.push('file_budget_tracking')
                          : state[keyName] && keyName === 'Status Approval NPB' ? tableName5.push('Approval') && tableType5.push('approve_budget_tracking')
                            : state[keyName] && tableName3.push(keyName) && tableType3.push('string')
    ))
    setTitleTable(tableName1.concat(tableName2, tableName3, tableName4, tableName5))
    setValueType(tableType1.concat(tableType2, tableType3, tableType4, tableType5))
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