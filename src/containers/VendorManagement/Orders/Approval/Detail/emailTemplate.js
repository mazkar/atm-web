import React, { useEffect, useState, useContext } from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, Grid, Typography, Paper, InputBase, Modal } from "@material-ui/core"
import { ReactComponent as CimbLogo } from "../../../../../assets/icons/siab/cimbLogo.svg"
import constants from "../../../../../helpers/constants"
import { thousandFormat } from "../../../../../helpers/useFormatter"
import moment from 'moment'

const useStyles = makeStyles({
    root: {
      padding: "30px 20px 20px 30px",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'relative',
        backgroundColor: constants.color.white,
        width: '40%',
        height: '90%',
        borderRadius: 10,
        padding: 30,
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
    rootPaper: {
        width: '60%',
        minHeight: '550px',
        height: "100%",
        borderRadius: 10,
        boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
    backButton: {
        marginBottom: 20,
        "& .MuiButton-contained": {
          boxShadow: "none",
          backgroundColor: "transparent",
          color: "red",
        },
        "& .MuiButton-root": {
          textTransform: "capitalize",
          "& :hover": {
            backgroundColor: "#F4F7FB",
          },
        },
    },
    content: {
        padding: 10,
    },
    title: {
        fontFamily: 'Barlow',
        fontWeight: '500',
        fontSize: '36px',
        color: '#2B2F3C',
    },
    imageUploadContainer: {
        position: "relative",
      },
      imgDefault: {
        cursor: "pointer",
        display: "flex",
        flexDirection: 'column'
    },
    primaryButton: {
        color: constants.color.white,
        backgroundColor: constants.color.primaryHard,
        padding: "10px 32px",
        borderRadius: 10,
        border: "1px solid",
        borderColor: `${constants.color.primaryHard}`,
        width: 100,
        height: 40,
        marginLeft: -15,
      },
    secondaryButton: {
        color: constants.color.primaryHard,
        backgroundColor: constants.color.white,
        padding: "10px 32px",
        borderRadius: 10,
        border: "1px solid",
        borderColor: `${constants.color.primaryHard}`,
        width: 100,
        height: 40,
    },
    boxStyle: {
        padding: "15px 15px",
        position: "relative",
        borderRadius: 10,
        marginTop: 20,
        border: "1px solid #BCC8E7",
        backgroundColor: "#fff",
        width: "100%",
        // "&::after": {
        //   content: '""',
        //   position: "absolute",
        //   width: 20,
        //   height: "125%",
        //   left: -37,
        //   backgroundColor: "#fff",
        //   top: -100,
        //   zIndex: 1,
        // },
        height: "210px",
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

const EmailTemplate = ({data, isOpen, onClose}) => {
    const classes = useStyles()

    return (
        <Modal
            className={classes.modal}
            open={isOpen}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Box className={classes.paper}>
                <Grid container style={{ marginTop: 20, marginLeft: 0}}>
                            <Grid container direction='row' justify='space-between' style={{marginTop: 0, paddingLeft: 0, paddingRight: 0}}>
                                <Grid item>
                                    <CimbLogo style={{ width: 146, height: 46 }}/>
                                </Grid>
                                {/* <Grid item>
                                    <div className={classes.backButton}>
                                        <MuiIconLabelButton
                                            label="Export To PDF"
                                            iconPosition="endIcon"
                                            onClick={()=>console.log("Wakidawww")}
                                            buttonIcon={<ShareIcon />}
                                        />
                                    </div>
                                </Grid> */}
                            </Grid>

                            <Grid container direction='row' style={{marginTop: 40, paddingLeft: 0, paddingRight: 0}}>
                                <Grid item xs={12}>
                                    <Grid container direction='column'>
                                        <Grid item>
                                            <Grid container direction='row' justify='space-between'>
                                                <Grid item>
                                                    <Typography>{data && data.letterNumber}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography>Tangerang, {data?.requestDate ? moment(data.requestDate).format('D MMMM YYYY') : '-'}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop: 15}}>
                                            <Typography>[Kepada Yth :</Typography>
                                            <Typography>Perwakilan <strong>{data && data.picVendor}</strong></Typography>
                                            <Typography>{data && data.addressVendor}]</Typography>
                                        </Grid>
                                        <Grid item style={{marginTop: 50}}>
                                            <Typography>Perihal : Approval Task</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item style={{marginTop: 15, marginLeft: 0}}>
                                <Typography style={{fontWeight: 400}}>Dengan ini kami dari pihak PT Bank CIMB Niaga, Tbk. menyampaikan bahwa penawaran <strong>{data && data.picVendor}</strong> sudah di Approve, untuk permintaan pekerjaan <strong>{data && data.jobType}</strong>. Dengan detail sebagai berikut :</Typography>
                            </Grid>

                            <Grid item style={{marginTop: 25}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 500 }}>Rincian Biaya Jasa</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Box className={classes.boxStyle}>
                                    {data && data.serviceFeeList.map((item) => (
                                            <Grid container direction='row' style={{marginTop: 15}}>
                                                <Grid item xs={6} style={{textAlign: 'left'}}>
                                                    <Grid container justify='space-between'>
                                                        <Grid item>
                                                            <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>{item.name && item.name !== ""? item.name : 'N/A'}</Typography>
                                                        </Grid>
                                                        <Grid item>:</Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={6} style={{textAlign: 'right'}}>
                                                    <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>{item.price ? `Rp. ${thousandFormat(item.price)}` : '-'}</Typography>
                                                </Grid>
                                            </Grid>
                                    ))}

                                    <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                                        <Grid item xs={6} style={{textAlign: 'right'}}>
                                            <Typography style={{ color: "#2B2F3C", fontWeight: 600, }}>Total Biaya Jasa :</Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{textAlign: 'right'}}>
                                            <Typography style={{ color: "#2B2F3C", fontWeight: 600, }}>{data && data.totalServiceFee  ? `Rp. ${thousandFormat(data.totalServiceFee )}` : '-'}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>

                            <Grid item style={{marginTop: 25}}>
                                <Typography style={{ color: "#2B2F3C", fontWeight: 500 }}>Rincian Biaya Barang</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Box className={classes.boxStyle}>
                                    {data && data.goodsCostList.map((item) => (
                                            <Grid container direction='row' style={{marginTop: 15}}>
                                                <Grid item xs={6} style={{textAlign: 'left'}}>
                                                    <Grid container justify='space-between'>
                                                        <Grid item>
                                                            <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>{item.name && item.name !== ""? item.name : 'N/A'}</Typography>
                                                        </Grid>
                                                        <Grid item>:</Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={6} style={{textAlign: 'right'}}>
                                                    <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>{item.price ? `Rp. ${thousandFormat(item.price)}` : '-'}</Typography>
                                                </Grid>
                                            </Grid>
                                    ))}

                                    <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                                        <Grid item xs={6} style={{textAlign: 'right'}}>
                                            <Typography style={{ color: "#2B2F3C", fontWeight: 600, }}>Total Biaya Jasa :</Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{textAlign: 'right'}}>
                                            <Typography style={{ color: "#2B2F3C", fontWeight: 600, }}>{data && data.totalGoodsCost  ? `Rp. ${thousandFormat(data.totalGoodsCost )}` : '-'}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>

                                <Grid container direction='row' spacing={1} style={{marginTop: 15, marginBottom: 15}}>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>
                                        <Grid container justify='space-between'>
                                            <Grid item>
                                                <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 0 }}>Total Biaya </Typography>
                                            </Grid>
                                            <Grid item>:</Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1} />
                                    <Grid item xs={3} style={{textAlign: 'left'}}>
                                        <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 0 }}>{data && data.totalCost  ? `Rp. ${thousandFormat(data.totalCost )}` : '-'}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction='row' spacing={1}  style={{marginTop: 15, marginBottom: 15}}>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>
                                        <Grid container justify='space-between'>
                                            <Grid item>
                                                <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 0 }}>PPN</Typography>
                                            </Grid>
                                            <Grid item>:</Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 0 }}>{data && data.ppn}%</Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>
                                        <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 0 }}>{data && data.ppn != null ? `Rp. ${thousandFormat(data.totalCost * data.ppn / 100)}` : '-'}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction='row' spacing={1}  style={{marginTop: 15, marginBottom: 15}}>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>
                                        <Grid container justify='space-between'>
                                            <Grid item>
                                                <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 0 }}>Total Biaya + PPN</Typography>
                                            </Grid>
                                            <Grid item>:</Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1} />
                                    <Grid item xs={3} style={{textAlign: 'left'}}>
                                        <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 0 }}>{data && data.totalCostWithPpn  ? `Rp. ${thousandFormat(data.totalCostWithPpn )}` : '-'}</Typography>
                                    </Grid>
                                </Grid>

                            <Grid item style={{marginTop: 15, marginLeft: 0}}>
                                <Typography style={{fontWeight: 400}}>Atas perhatian dan kerjasama yang sudah terjalin baik selama ini, antara PT. Bank CIMB Niaga Tbk. dengan <strong>{data && data.picVendor}</strong>, kami ucapkan terima kasih.</Typography>
                            </Grid>

                            <Grid item style={{marginTop: 150, marginLeft: 0}}>
                                <Grid container direction='column'>
                                    <Grid item>
                                        <Typography style={{fontWeight: 400}}>Hormat Kami,</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{fontWeight: 600}}>PT Bank CIMB Niaga, Tbk.</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                    </Grid>
                </Box>
        </Modal>
    )
}

export default EmailTemplate