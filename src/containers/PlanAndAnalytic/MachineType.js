import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ComonSelect from '../../components/Selects/CommonSelect';

const useStyles = makeStyles({
  root: {
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 10,
  },
  col: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 5,
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  // title: {
  //   fontWeight: 'bold',
  //   marginRight: 2,
  // },
});

const typeSugestions = [
  { id: 0, value: 'ATM', nameId: 'ATM', nameEn: 'ATM' },
  { id: 1, value: 'CRM', nameId: 'CRM', nameEn: 'CRM' },
  { id: 2, value: 'MDM', nameId: 'MDM', nameEn: 'MDM' },
  { id: 3, value: 'CDM', nameId: 'CDM', nameEn: 'CDM' },
];

function handleChange(e) {
  console.log(e);
}

const MachineType = () => {
  const { root, col } = useStyles();
  return (
    <div className={root}>
      <label style={{ fontSize: '13px', fontWeight: 400, marginLeft: 5 }}>Jenis Mesin :</label>
      <div className={col}>
        <ComonSelect
          suggestions={typeSugestions}
          width="215px"
          bordered
          defaultValue="CDM"
          value="CDM"
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};
MachineType.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  captionD: PropTypes.string,
};

MachineType.defaultProps = {
  captionD: 'Status',
};

export default withStyles(useStyles)(MachineType);
