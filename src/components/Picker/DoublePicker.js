import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Select } from "antd";

const DoublePicker = ({
  onOff,
  onPremises,
  defaultPremises,
  defaultOnOff,
  selectedOff,
  selectedPremises,
}) => {
  const classes = useStyles();
  const { Option } = Select;
  const [select, setSelect] = useState("");
  const [ValueOnOff, setValueOnOff] = useState(selectedOff);
  const [ValuePremises, setValuePremises] = useState(selectedPremises);

  useEffect(() => {
    setValueOnOff(selectedOff);
  }, [selectedOff]);

  useEffect(() => {
    setValuePremises(selectedPremises);
  }, [selectedPremises]);

  const handleOnOff = (e) => {
    if (e === "OFF") {
      onPremises("Konvensional");
    }
    onOff(e);
    setSelect(e);
  };

  let val;
  if (select === "OFF") {
    val = (
      <Select
        style={{ width: "100%" }}
        placeholder="Choose Premises"
        value="Konvensional"
        onChange={onPremises}
      >
        <Option value="Konvensional">Konvensional</Option>
      </Select>
    );
  } else if (select === "ON") {
    val = (
      <Select
        style={{ width: "100%" }}
        placeholder="Choose Premises"
        defaultValue={defaultPremises}
        onChange={onPremises}
      >
        <Option value="Syariah">Syariah</Option>
        <Option value="Konvensional">Konvensional</Option>
      </Select>
    );
  } else {
    val = (
      <Select
        style={{ width: "100%" }}
        placeholder="Choose Premises"
        defaultValue={defaultPremises}
        value={ValuePremises}
        onChange={onPremises}
      >
        <Option value="Syariah">Syariah</Option>
        <Option value="Konvensional">Konvensional</Option>
      </Select>
    );
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
          Premises
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: "5px" }}>
        <Grid container direction="row">
          <Grid item className={classes.selectPremises}>
            <Select
              style={{ width: "100%" }}
              defaultValue={defaultOnOff}
              value={ValueOnOff}
              onChange={handleOnOff}
            >
              <Option value="ON">ON</Option>
              <Option value="OFF">OFF</Option>
            </Select>
          </Grid>
          <Grid item className={classes.selectKonven}>
            {val}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DoublePicker;

const useStyles = makeStyles({
  selectPremises: {
    width: "30%",
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
      paddingTop: "5px",
      color: "#DC241F",
    },
    "& .ant-select-single .ant-select-selector": {
      height: "41px",
      border: "1px solid #DC241F",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    "& .ant-select-single .ant-select-arrow": {
      transition: "transform 0.2s ease-in",
      color: "#DC241F",
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
      transform: " rotate(180deg)",
      transition: "transform 0.2s ease-in",
    },
  },
  selectKonven: {
    width: "70%",
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
      paddingTop: "5px",
    },
    "& .ant-select-single .ant-select-selector": {
      height: "41px",
      border: "1px solid #A8B6DB",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    "& .ant-select-single .ant-select-arrow": {
      transition: "transform 0.2s ease-in",
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
      transform: "rotate(180deg)",
      transition: "transform 0.2s ease-in",
    },
  },
});
