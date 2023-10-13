import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  withStyles,
} from "@material-ui/core";
import { ReactComponent as DropDownIcon } from "../../../assets/icons/linear-red/chevron-down.svg";
import constansts from "../../../helpers/constants";

const useStyles = makeStyles({
  select: {
    width: "100%",
    padding: 0,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
});

const CustomSelect = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${constansts.color.grayMedium}`,
    borderRadius: 8,
    fontFamily: "Barlow",
    fontSize: 13,
    padding: "16px 12px",
    width: "100%",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 8,
      border: `1px solid ${constansts.color.primaryMedium}`,
      backgroundColor: constansts.color.white,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const SelectInput = (props) => {
  const { menuItem, ...other } = props;
  const classes = useStyles();
  const [valueSelect, setValueSelect] = useState("");

  const onChangeHandler = (e) => {
    setValueSelect(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <FormControl className={classes.select}>
        <Select
          {...other}
          style={{ marginTop: 5 }}
          input={<CustomSelect />}
          IconComponent={DropDownIcon}
          defaultValue={menuItem[0].value}
        >
          {menuItem.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

SelectInput.propTypes = {
  // eslint-disable-next-line react/require-default-props
  menuItem: PropTypes.array.isRequired,
};

SelectInput.defaultProps = {
  menuItem: [
    {
      name: "Pilih Kondisi",
      value: "pilih kondisi",
    },
    {
      name: "Vandal",
      value: "vandal",
    },
  ],
};

export default SelectInput;
