import React, { useState } from "react"
import { Grid, Typography, Button, Paper, Box, InputBase, } from "@material-ui/core"
import { PrimaryHard } from '../../../../../assets/theme/colors'
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Input } from 'antd'

const SmallInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
      padding: 0,
    },
    input: {
      borderRadius: 6,
      position: 'relative',
      backgroundColor: (props) => props.backgroundColor, //theme.palette.common.white,
      fontSize: 15,
      width: '100%',
      height: '23px',
      padding: '7px 9px',
      border: '1px solid #BCC8E7',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: PrimaryHard,
      },
    },
}))(InputBase)

const SmallInputFocusRed = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
      padding: 0,
    },
    input: {
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      fontSize: 15,
      width: '100%',
      height: '23px',
      padding: '7px 9px',
      border: '1px solid #BCC8E7',
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: PrimaryHard,
      },
    },
}))(InputBase)

const useStyles = makeStyles({
    selectRegion: {
        marginTop: '-8px',
        paddingTop: '10px',
        "& .ant-select-single:not(.ant-select-customize-input) .ant-select-selector": {
          height: 39,
          border: `1px solid #BCC8E7`,
        },
        "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
          paddingTop: 4,
        },
      },
    inputMaterial: {
    width: '96%', 
    "& .MuiInputBase-input.Mui-disabled": {
      opacity: 1,
      cursor: 'not-allowed',
      backgroundColor: '#FFFF',
      border: '1px solid #F4F7FB',
    },
  },
})

function InputFields() {
  const classes = useStyles()
  const [namaJasa, setNamaJasa] = useState("")
  const [kuantitas, setKuantitas] = useState("")
  const [satuan, setSatuan] = useState("")
  const [harga, setHarga] = useState("")

  return (
    <div>
      <Grid container direction="row" spacing={2} style={{ marginTop: 20 }}>

        <Grid item xs={4}>
          <SmallInput
            style={{ width: "96%", height: "23px" }}
            onChange={(e) => console.log(e.target.value)}
            placeholder="Masukkan Pesan Anda"
          />
        </Grid>

        <Grid item xs={1}>
          <SmallInput
            style={{ width: "96%", height: "23px" }}
            onChange={(e) => console.log(e.target.value)}
            placeholder="Kuantitas"
          />
        </Grid>

        <Grid item xs={1}>
          <SmallInput
            style={{ width: "96%", height: "23px" }}
            onChange={(e) => console.log(e.target.value)}
            placeholder="Satuan"
          />
        </Grid>

        <Grid item className={classes.selectRegion} xs={3}>
          <Input.Group compact style={{ width: "100%" }}>
            <SmallInput
              className={classes.inputMaterial}
              style={{ width: "10%" }}
              value="Rp"
            />
            <SmallInputFocusRed
              className={classes.inputMaterial}
              style={{ width: "82%" }}
              onChange={(e) => console.log(e.target.value)}
              placeholder="Masukan Harga"
            />
          </Input.Group>
        </Grid>

        <Grid item className={classes.selectRegion} xs={3}>
          <Input.Group compact style={{ width: "100%" }}>
            <SmallInput
              className={classes.inputMaterial}
              style={{ width: "10%" }}
              value="Rp"
            />
            <SmallInputFocusRed
              className={classes.inputMaterial}
              style={{ width: "82%" }}
              onChange={(e) => console.log(e.target.value)}
              defaultValue="10.000.000"
            />
          </Input.Group>
        </Grid>

      </Grid>
    </div>
  )
}

export default InputFields