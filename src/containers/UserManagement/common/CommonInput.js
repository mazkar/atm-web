import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Input, AutoComplete } from 'antd';
import { PrimaryHard } from '../../../assets/theme/colors';

const inputStyle = {
  height: 40,
  borderRadius: 8,
  border: '1px solid #BCC8E7',
  fontSize: 16,
  backgroundColor: '#FFFFFF',
};

const useStyles = makeStyles({
  inputForm: inputStyle,
});

const CommonInput = ({
  value,
  onChange,
  title,
  required,
  disabled,
  name,
  auto,
  options,
  onSelect,
  onSearch,
  type,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={3}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography>{title}</Typography>
        </Grid>
        {required && (
          <Grid item>
            <Typography
              style={{
                fontSize: '13px',
                lineHeight: '16px',
                color: PrimaryHard,
              }}
            >
              *mandatory
            </Typography>
          </Grid>
        )}
      </Grid>
      <div>
        {auto ? (
          <AutoComplete
            value={name ? value[name] : value}
            style={{ width: '100%' }}
            {...{ options, onSelect, onSearch, onChange, name }}
          >
            <Input style={inputStyle} />
          </AutoComplete>
        ) : (
          <Input
            className={classes.inputForm}
            {...{ onChange, disabled, name, type }}
            value={name ? value[name] : value}
          />
        )}
      </div>
    </Grid>
  );
};

export default CommonInput;
