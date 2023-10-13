/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
/* Third Party Import */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  Chip,
  IconButton,
  Collapse,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import ArrowDown from "@material-ui/icons/KeyboardArrowDownOutlined";
import ArrowUp from "@material-ui/icons/KeyboardArrowUpOutlined";

/* Internal Import */
import { PrimaryHard, PrimaryUltrasoft } from "../../../assets/theme/colors";
import MuiButton from "../../Button/MuiButton";
import LabelTextField from "../../Form/LabelTextField";

const useStyles = makeStyles({
  wrapper: {
    background: "#ffffff",
    borderRadius: "6px",
    padding: "16px 20px",
    marginBottom: "24px",
  },
  rootButton: {
    width: "max-content",
    height: 40,
    borderRadius: 10,
    textTransform: "capitalize",
    boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
  },
  containedButton: {
    color: "#ffffff",
    backgroundColor: PrimaryHard,
  },
  outlinedButton: {
    border: "1px solid",
    borderColor: PrimaryHard,
    color: PrimaryHard,
    backgroundColor: "#ffffff",
  },
});

const ExpandableFilter = (props) => {
  const classes = useStyles();
  const {
    data,
    handleApply,
    checkAll,
    label,
    otherCheckbox,
    defaultDataHit,
    setDataRequest,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [listCheckbox, setListCheckbox] = useState(data);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isAllowInputOthers, setIsAllowInputOthers] = useState(false);
  const [inputOthers, setInputOthers] = useState("");

  const column = 4;
  const rowLength = Math.ceil(listCheckbox.length / column);
  let anchor = 0; // <-- Anchor for looping checkbox

  /* Functional Component */
  const RedCheckbox = withStyles({
    root: {
      color: "#DC241F",
      "&$checked": {
        color: "#DC241F",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  /* Methods */
  function handleCheckbox(event) {
    const key = event.target.name;
    const value = event.target.checked;

    const tempArray = [...listCheckbox];
    const newArray = tempArray.map((object) =>
      object.name === key ? { ...object, isChecked: value } : object
    );

    setListCheckbox(newArray);
  }

  function handleDelete(name) {
    const tempArray = [...listCheckbox];
    const newArray = tempArray.map((object) =>
      object.name === name ? { ...object, isChecked: false } : object
    );

    setListCheckbox(newArray);
  }

  function handleCheckboxAll(event) {
    const value = event.target.checked;
    setIsCheckedAll(value);

    const tempArray = [...listCheckbox];
    const newArray = tempArray.map((object) => {
      return {
        ...object,
        isChecked: value,
      };
    });
    setListCheckbox(newArray);
  }

  function handleReset() {
    const tempArray = [...listCheckbox];
    const newArray = tempArray.map((object) => {
      return {
        ...object,
        isChecked: false,
      };
    });
    setInputOthers("");
    setListCheckbox(newArray);
    setIsCheckedAll(false);
    setIsAllowInputOthers(false);
    setDataRequest({
      ...defaultDataHit,
    });
  }

  function handleExpand() {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }

  function handleInputOthers(event) {
    const value = event.target.checked;
    setIsAllowInputOthers(value);
  }

  function handleEnter(event) {
    const newObject = {
      name: inputOthers,
      isChecked: false,
    };
    const tempArray = [...listCheckbox];

    if (event.key === "Enter") {
      tempArray.push(newObject);
      setListCheckbox(tempArray);
      setInputOthers("");
    }
  }

  return (
    <div className={classes.wrapper}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ flexWrap: "nowrap" }}
      >
        <Grid container>
          <Typography
            style={{
              fontWeight: 600,
              fontFamily: "Barlow",
              fontSize: "13px",
              marginRight: "10px",
            }}
          >
            {`${label}:`}
          </Typography>
          {listCheckbox.map((chip) => {
            if (chip.isChecked) {
              return (
                <Chip
                  variant="outlined"
                  label={chip.name}
                  size="small"
                  onDelete={() => handleDelete(chip.name)}
                  style={{
                    color: "#8D98B4",
                    fontStyle: "italic",
                    margin: "0px 5px",
                  }}
                />
              );
            }
            return "";
          })}
        </Grid>
        <IconButton small onClick={handleExpand}>
          {isExpanded ? <ArrowUp /> : <ArrowDown />}
        </IconButton>
      </Grid>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <div>
          <Grid container spacing={2}>
            {/* Divide checkbox rendering in several columns */}
            {Array.from(Array(column)).map((x, index) => {
              const start = anchor;
              const end = start + rowLength;
              anchor = end;
              return (
                <Grid item xs={2}>
                  <FormControl>
                    {listCheckbox.slice(start, end).map((checkbox) => {
                      return (
                        <FormControlLabel
                          control={
                            <RedCheckbox
                              checked={checkbox.isChecked}
                              onChange={handleCheckbox}
                              name={checkbox.name}
                            />
                          }
                          label={checkbox.name}
                        />
                      );
                    })}
                  </FormControl>
                </Grid>
              );
            })}
            <Grid item xs={2}>
              {checkAll && (
                <FormControl>
                  <FormControlLabel
                    control={
                      <RedCheckbox
                        checked={isCheckedAll}
                        onChange={handleCheckboxAll}
                      />
                    }
                    label="Check All"
                  />
                </FormControl>
              )}
              {otherCheckbox && (
                <>
                  <FormControl>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={isAllowInputOthers}
                          onChange={handleInputOthers}
                        />
                      }
                      label="Others"
                    />
                  </FormControl>
                  <LabelTextField
                    placeholder="Input Others"
                    onChange={(newVal) => setInputOthers(newVal.target.value)}
                    value={inputOthers}
                    height="40px"
                    disabled={!isAllowInputOthers}
                    onKeyPress={handleEnter}
                  />
                </>
              )}
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                alignSelf: "end",
                alignItems: "end",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MuiButton
                className={`${classes.rootButton} ${classes.outlinedButton}`}
                style={{
                  marginBottom: "10px",
                  padding: "0px 24px",
                  textAlign: "right",
                }}
                label="Reset"
                height="40px"
                onClick={handleReset}
              />
              <MuiButton
                className={`${classes.rootButton} ${classes.containedButton}`}
                style={{ padding: "0px 24px", textAlign: "right" }}
                label="Apply"
                height="40px"
                onClick={() => handleApply(listCheckbox, inputOthers)}
              />
            </Grid>
          </Grid>
        </div>
      </Collapse>
    </div>
  );
};

ExpandableFilter.propTypes = {
  data: PropTypes.array,
  handleApply: PropTypes.func,
  checkAll: PropTypes.bool,
  label: PropTypes.string,
  otherCheckbox: PropTypes.bool,
};
ExpandableFilter.defaultProps = {
  data: [
    {
      name: "Testing",
      isChecked: false,
    },
  ],
  handleApply: () => {
    console.log("Applied");
  },
  checkAll: false,
  label: "Expandable Filter",
  otherCheckbox: false,
};

export default ExpandableFilter;
