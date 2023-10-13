import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { withStyles, makeStyles } from "@material-ui/styles";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import { Chip, Grid, Typography } from "@material-ui/core";
import { ReactComponent as DropDownIcon } from "../../../assets/icons/general/dropdown_red.svg";

const icon = (
  <CheckBoxOutlineBlankIcon fontSize="small" style={{ color: "#DC241F" }} />
);
const checkedIcon = (
  <CheckBoxIcon fontSize="small" style={{ color: "#DC241F" }} />
);
const itemList = [
  { title: "BANK BRI", code: "002" },
  { title: "BANK BCA", code: "014" },
  { title: "BANK MANDIRI", code: "008" },
  { title: "BANK BNI", code: "009" },
  { title: "BANK BNI SYARIAH", code: "427" },
  { title: "BANK SYARIAH MANDIRI (BSM)", code: "451" },
  { title: "BANK CIMB NIAGA", code: "022" },
  { title: "BANK CIMB NIAGA SYARIAH", code: "022" },
  { title: "BANK MUAMALAT", code: "147" },
  { title: "BANK BTPN", code: "213" },
  { title: "BANK BTPN SYARIAH", code: "547" },
  { title: "BANK PERMATA", code: "013" },
  { title: "BANK PERMATA SYARIAH", code: "013" },
  { title: "BANK DBS INDONESIA", code: "046" },
  { title: "DIGIBANK", code: "046" },
  { title: "BANK BRI SYARIAH", code: "422" },
  { title: "BANK BTN", code: "200" },
  { title: "BANK DANAMON", code: "011" },
  { title: "BANK MAYBANK (BII)", code: "016" },
  { title: "BANK MEGA", code: "426" },
  { title: "BANK SINARMAS", code: "153" },
  { title: "BANK COMMONWEALTH", code: "950" },
  { title: "BANK OCBC NISP", code: "028" },
  { title: "BANK BUKOPIN", code: "441" },
  { title: "BANK BUKOPIN SYARIAH", code: "521" },
  { title: "BANK BCA SYARIAH", code: "536" },
  { title: "BANK LIPPO", code: "026" },
  { title: "CITIBANK", code: "031" },
];
const itemListAbal = [
  { title: "BANK BRI", code: "002" },
  { title: "BANK BCA", code: "014" },
  { title: "BANK MANDIRI", code: "008" },
];

const SelectInputCustom = withStyles(() => ({
  root: {
    "& .MuiInputBase-root": {
      fontSize: 13,
    },
    "& .MuiAutocomplete-inputRoot": {
      padding: 3,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 8,
        border: "1px solid #BCC8E7",
        fontSize: 13,
      },
      "&:hover fieldset": {
        // borderColor: 'yellow',
      },
      "&.Mui-focused fieldset": {
        borderRadius: 8,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  },
}))(TextField);

const useStyles = makeStyles({
  root: {
    width: "-webkit-fill-available",
    "& .MuiChip-root": {
      height: 25,
    },
    "& .MuiChip-deleteIcon": {
      height: 18,
      width: 18,
    },
  },
});

const ChkyAutocomplete = (props) => {
  const { onChange, value, isDisable } = props;

  const classes = useStyles();

  const handleChange = (event, value) => {
    var newArray = [];
    for (const each in value) {
      newArray.push(value[each].title);
    }
    onChange(newArray, value);
    console.log("BROW : ", value);
  };

  return (
    <FormControl className={classes.root}>
      <Autocomplete
        onChange={handleChange}
        value={value}
        multiple
        size="small"
        id="checkboxes-tags-demo"
        options={itemList}
        disableCloseOnSelect
        popupIcon={<DropDownIcon />}
        input={<SelectInputCustom />}
        getOptionLabel={(option) => option.title}
        disabled={isDisable}
        renderOption={(option, { selected }) => (
          <>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </>
        )}
        renderInput={(params) => (
          // <SelectInputCustom {...params} variant="outlined" placeholder="Bank lain.."/>
          <TextField {...params} variant="outlined" label="Bank lain.." />
        )}
        renderTags={(data, getTagProps) => (
          <Grid container direction="column">
            <Grid item>
              <Typography style={{ paddingLeft: 5 }}>
                {data.length} bank selected :{" "}
              </Typography>
            </Grid>

            <Grid item>
              {data.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.title}
                  size="small"
                  {...getTagProps({ index })}
                />
              ))}
            </Grid>
          </Grid>
        )}
      />
    </FormControl>
  );
};

export default ChkyAutocomplete;
