import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  InputBase,
} from "@material-ui/core";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Input } from "antd";
import FormattedNumber from "../FormattedNumber";

const SmallInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    borderRadius: 6,
    position: "relative",
    backgroundColor: (props) => props.backgroundColor, //theme.palette.common.white,
    fontSize: 15,
    width: "100%",
    height: "23px",
    padding: "7px 9px",
    border: "1px solid #BCC8E7",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: PrimaryHard,
    },
  },
}))(InputBase);

const SmallInputFocusRed = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    position: "relative",
    backgroundColor: theme.palette.common.white,
    fontSize: 15,
    width: "100%",
    height: "23px",
    padding: "7px 9px",
    border: "1px solid #BCC8E7",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: PrimaryHard,
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  selectRegion: {
    marginTop: "-8px",
    paddingTop: "10px",
    "& .ant-select-single:not(.ant-select-customize-input) .ant-select-selector": {
      height: 39,
      border: `1px solid #BCC8E7`,
    },
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
      paddingTop: 4,
    },
  },
  inputMaterial: {
    width: "96%",
    "& .MuiInputBase-input.Mui-disabled": {
      opacity: 1,
      cursor: "not-allowed",
      backgroundColor: "#FFFF",
      border: "1px solid #BCC8E7",
    },
  },
});

function InputFields({ data, index, handleChange, type }) {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="row" spacing={1} style={{ marginTop: 20 }}>
        <Grid item xs={3}>
          <SmallInput
            style={{ width: "96%", height: "23px" }}
            onChange={(e) =>
              handleChange({ value: e.target.value, name: "nama", index, type })
            }
            value={data?.nama}
            placeholder={`Masukkan Nama ${type === "jasa" ? "Jasa" : "Barang"}`}
          />
        </Grid>

        <Grid item xs={2}>
          <FormattedNumber
            style={{ width: "80%", height: "23px" }}
            onValueChange={(x) =>
              handleChange({
                value: x.floatValue,
                name: "quantity",
                index,
                type,
              })
            }
            value={data?.quantity}
            placeholder="Kuantitas"
            customInput={SmallInput}
          />
        </Grid>

        <Grid item xs={1}>
          <SmallInput
            style={{ width: "100%", height: "23px" }}
            onChange={(e) =>
              handleChange({ value: e.target.value, name: "unit", index, type })
            }
            value={data?.unit}
            placeholder="Satuan"
          />
        </Grid>

        <Grid item className={classes.selectRegion} xs={3}>
          <Input.Group compact style={{ width: "100%" }}>
            <SmallInput
              className={classes.inputMaterial}
              style={{ width: "15%" }}
              value="Rp"
              disabled
            />
            <FormattedNumber
              className={classes.inputMaterial}
              style={{ width: "70%" }}
              onValueChange={(x) =>
                handleChange({
                  value: x.floatValue,
                  name: "price",
                  index,
                  type,
                })
              }
              value={data?.price}
              placeholder="Masukan Harga"
              customInput={SmallInputFocusRed}
            />
          </Input.Group>
        </Grid>

        <Grid item className={classes.selectRegion} xs={3}>
          <Input.Group compact style={{ width: "100%" }}>
            <SmallInput
              className={classes.inputMaterial}
              style={{ width: "15%" }}
              value="Rp"
              disabled
            />
            <FormattedNumber
              className={classes.inputMaterial}
              style={{ width: "80%" }}
              value={
                isNaN(data?.price * data?.quantity) ||
                data?.price * data?.quantity === 0
                  ? null
                  : data?.price * data?.quantity
              }
              disabled
              customInput={SmallInputFocusRed}
              placeholder="Jumlah"
            />
          </Input.Group>
        </Grid>
      </Grid>
    </div>
  );
}

export default InputFields;
