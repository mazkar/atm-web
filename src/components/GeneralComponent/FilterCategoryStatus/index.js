/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SelectWithCaptions from '../../Selects/SelectWithCaptions';
import MuiButton from '../../Button/MuiButton';
import { ChkyButtons, SearchBarFilterSecondary } from '../../chky';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import MenuItem from '@material-ui/core/MenuItem';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #BCC8E7',
    fontSize: 13,
    padding: '6px 12px 6px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 8,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const styles = () => ({
  root: {
    padding: 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 'auto',
  },
  title: {
    fontWeight: 'bold',
    marginRight: 30,
  },
  caption: { fontSize: 13, padding: '22px 0' },
  select: {
    padding: 10,
    '& .MuiSelect-icon': {
      top: 'unset',
      right: 5,
    },
  },
  textInput:{
    padding: 10
  },
  search: {
    fontFamily: 'Barlow',
    fontSize: 13,
    borderRadius: 8,
    border: '1px solid #BCC8E7',
    outline: 'none',
    padding: '6px 12px 6px 12px',
    width: 100,
    transition: '0.25s',
    '&:focus': {
      borderColor: '#4677ff'
    }
  }
});
const index = (props) => {
  const {
    modelSuggestions,
    statusSuggestions,
    onFilterSubmit,
    onResetSubmit,
    classes,
    filterData
  } = props;
  const [modelTeam, setModelTeam] = useState(modelSuggestions[10].value);
  const [modelFinal, setModelFinal] = useState(modelSuggestions[10].value);
  const [status, setStatus] = useState(statusSuggestions[3].value);
  const [location, setLocation] = useState('')
  const onApplyFilter = () => {
    onFilterSubmit({
      status,
      modelTeam,
      modelFinal,
      location,
    });
  };

  const onResetFilter = () => {
    onResetSubmit()
    setModelTeam(modelSuggestions[10].value)
    setModelFinal(modelSuggestions[10].value)
    setStatus(statusSuggestions[3].value)
  }
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Showing :</Typography>
      <div className={classes.col}>
        <SelectWithCaptions
          bordered
          caption="Status"
          suggestions={statusSuggestions}
          value={status}
          handleChange={setStatus}
          width="120px"
        />

        <SelectWithCaptions
          bordered
          caption="Model Team"
          suggestions={modelSuggestions}
          value={modelTeam}
          handleChange={setModelTeam}
          width="120px"
        />
        
        <SelectWithCaptions
          bordered
          caption="Model Final"
          suggestions={modelSuggestions}
          value={modelFinal}
          handleChange={setModelFinal}
          width="120px"
        />
        <div style={{padding: 10}}>
          <SearchBarFilterSecondary
            placeholder="Nama Lokasi"
            onChangeEffect={setLocation}
            keywordFromParent={location}
            height="41px"
            width={170}
          />
        </div>
      </div>
      {filterData ?
        <ChkyButtons
          startIcon={<CloseIcon />}
          buttonType="redOutlined"
          onClick={onResetFilter}
          height={30}
          style={{ textTransform: 'capitalize' }}
        >
          Reset
      </ChkyButtons>
        : null
      }
      <MuiButton label="Apply Filter" onClick={onApplyFilter} />
    </div>
  );
};
index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  captionD: PropTypes.string,
  onFilterSubmit: PropTypes.func,
  onResetSubmit: PropTypes.func,
  // filterData: PropTypes.func
};

index.defaultProps = {
  captionD: 'Status',
};

export default withStyles(styles)(index);
