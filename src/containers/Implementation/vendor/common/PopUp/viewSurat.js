import React from 'react'
import {
  Modal,
  Box,
  Grid,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as CloseButton } from "../../../../../assets/icons/siab/x-new.svg"
import { ReactComponent as CimbLogo } from "../../../../../assets/icons/siab/cimbLogo.svg"
import PropTypes from 'prop-types'
import constants from '../../../../../helpers/constants'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 1000,
    height: 700,
    borderRadius: 10,
    padding: 30,
  },
  boxStyle: {
    marginTop: 15,
    padding: "0px 15px",
    position: "relative",
    borderRadius: 10,
    border: "1px solid #BCC8E7",
    backgroundColor: "#fff",
    width: "98%",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 20,
      height: "125%",
      left: -37,
      backgroundColor: "#fff",
      top: -100,
      zIndex: 1,
    },
    height: "160px",
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F4F7FB",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#9AC2FF",
    },
  },
})

const dataJasa = [
    {id: 1, name: 'Biaya Pemasangan AC dan Perawatan AC', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
    {id: 2, name: 'Biaya Pemasangan AC dan Perawatan AC', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
    {id: 3, name: 'Biaya Pemasangan AC dan Perawatan AC', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
    {id: 4, name: 'Biaya Pemasangan AC dan Perawatan AC', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
    {id: 5, name: 'Biaya Pemasangan AC dan Perawatan AC', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
]

const dataBarang = [
    {id: 1, name: 'Biaya Pemasangan AC dan Perawatan AC', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
    {id: 2, name: 'Biaya Pemasangan AC dan Perawatan AC', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
    {id: 3, name: 'Biaya Pemasangan AC dan Perawatan AC', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
    {id: 4, name: 'Biaya Pemasangan AC dan Perawatan AC', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
    {id: 5, name: 'Biaya Pemasangan AC dan Perawatan AC', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
]

const viewSurat = ({ isOpen, onClose }) => {
  const {
    modal,
    paper,
    boxStyle
  } = useStyles();

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container direction="column">

          <Grid container justify="flex-end" alignItems="stretch">
            <CloseButton onClick={onClose} style={{ cursor: "pointer" }} />
          </Grid>

          <Grid item>
                <CimbLogo style={{ width: 146, height: 46 }}/>
          </Grid>

          <Grid item style={{marginTop: 25}}>
                <Typography style={{ color: "#2B2F3C", fontWeight: 500 }}>Rincian Biaya Jasa</Typography>
          </Grid>

          <Grid item>
            <Box className={boxStyle}>

                <Grid container direction='row' style={{marginBottom: 15, marginTop: 10}}>
                    <Grid item xs={4} style={{textAlign: 'center'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>Nama Jasa</Typography>
                    </Grid>
                    <Grid item xs={1} style={{textAlign: 'center'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>Qty</Typography>
                    </Grid>
                    <Grid item xs={1} style={{textAlign: 'center'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>Satuan</Typography>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'center'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>Harga</Typography>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'center'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>Jumlah</Typography>
                    </Grid>
                </Grid>

                {dataJasa.map((item) => (
                    <>
                        <Grid container direction='row'>
                            <Grid item xs={4} style={{textAlign: 'center'}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>{item.name}</Typography>
                            </Grid>
                            <Grid item xs={1} style={{textAlign: 'center'}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>{item.qty}</Typography>
                            </Grid>
                            <Grid item xs={1} style={{textAlign: 'center'}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>{item.satuan}</Typography>
                            </Grid>
                            <Grid item xs={3} style={{textAlign: 'center'}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>{item.harga}</Typography>
                            </Grid>
                            <Grid item xs={3} style={{textAlign: 'center'}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>{item.jumlah}</Typography>
                            </Grid>
                        </Grid>
                        <Divider variant="fullWidth" light="true" style={{marginTop: 5}}/>
                    </>
                ))}

                <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                    <Grid item xs={4} style={{textAlign: 'right'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 10 }}>Total Biaya Jasa</Typography>
                    </Grid>
                    <Grid item xs={8} style={{textAlign: 'right'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 55 }}>Rp.1.500.000.000</Typography>
                    </Grid>
                </Grid>

            </Box>
          </Grid>

          <Grid item style={{marginTop: 25}}>
                <Typography style={{ color: "#2B2F3C", fontWeight: 500 }}>Rincian Biaya Barang</Typography>
          </Grid>

          <Grid item>
            <Box className={boxStyle}>

                <Grid container direction='row' style={{marginBottom: 15, marginTop: 10}}>
                    <Grid item xs={4} style={{textAlign: 'center'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>Nama Barang</Typography>
                    </Grid>
                    <Grid item xs={1} style={{textAlign: 'center'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>Qty</Typography>
                    </Grid>
                    <Grid item xs={1} style={{textAlign: 'center'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>Satuan</Typography>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'center'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>Harga</Typography>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'center'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>Jumlah</Typography>
                    </Grid>
                </Grid>

                {dataBarang.map((item) => (
                    <>
                        <Grid container direction='row'>
                            <Grid item xs={4} style={{textAlign: 'center'}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>{item.name}</Typography>
                            </Grid>
                            <Grid item xs={1} style={{textAlign: 'center'}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>{item.qty}</Typography>
                            </Grid>
                            <Grid item xs={1} style={{textAlign: 'center'}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>{item.satuan}</Typography>
                            </Grid>
                            <Grid item xs={3} style={{textAlign: 'center'}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>{item.harga}</Typography>
                            </Grid>
                            <Grid item xs={3} style={{textAlign: 'center'}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>{item.jumlah}</Typography>
                            </Grid>
                        </Grid>
                        <Divider variant="fullWidth" light="true" style={{marginTop: 5}}/>
                    </>
                ))}

                <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                    <Grid item xs={4} style={{textAlign: 'right'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 10 }}>Total Biaya Barang</Typography>
                    </Grid>
                    <Grid item xs={8} style={{textAlign: 'right'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 55 }}>Rp.1.500.000.000</Typography>
                    </Grid>
                </Grid>

            </Box>

                <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                    <Grid item xs={8} style={{textAlign: 'right'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 10 }}>Total Biaya :</Typography>
                    </Grid>
                    <Grid item xs={4} style={{textAlign: 'right'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 95 }}>Rp.50.000.000</Typography>
                    </Grid>
                </Grid>
                <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                    <Grid item xs={8} style={{textAlign: 'right'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 10 }}>PPN :</Typography>
                    </Grid>
                    <Grid item xs={4} style={{textAlign: 'right'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 95 }}>15%</Typography>
                    </Grid>
                </Grid>
                <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                    <Grid item xs={8} style={{textAlign: 'right'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 10 }}>Total Biaya+PPN :</Typography>
                    </Grid>
                    <Grid item xs={4} style={{textAlign: 'right'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 95 }}>Rp.55.000.000</Typography>
                    </Grid>
                </Grid>

          </Grid>

        </Grid>

      </Box>
    </Modal>
  );
};

viewSurat.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default viewSurat;