import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Select,
  InputBase,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';

const CommonSelect = ({ title, value, options, onChange, name }) => {
  return (
    <Grid item xs={3}>
      <div>
        <Typography>{title}</Typography>
      </div>
      <div>
        <Select
          fullWidth
          value={name ? value[name] : value}
          {...{ onChange, name }}
          input={<BootstrapInput />}
          IconComponent={DropDownIcon}
        >
          {options.map((item) => {
            return (
              <MenuItem key={item.id} value={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </Grid>
  );
};

export default CommonSelect;

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    height: 23,
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #BCC8E7',
    fontSize: 16,
    paddingLeft: 5,
    paddingTop: 8,
    '&:focus': {
      borderRadius: 8,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
