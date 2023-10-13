/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Paper, Box, } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";



const useStyles = makeStyles({
    rootPaper: {
        width: '100%',
        minHeight: '300px',
        height: "100%",
        borderRadius: 10,
        boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
        marginBottom: 0,
        padding: 30
      },
})

const dataPenawaranHarga = [
    {label1: 'No Ticket', value1: '11341', label2: 'Jenis Pekerjaan', value2: 'Ganti AC'},
    {label1: 'Tgl Request', value1: '12/11/2020', label2: 'PIC / Vendor', value2: 'Trias'},
    {label1: 'User Request', value1: 'Deden Hidayat', label2: 'ID Lokasi', value2: '122323'},
    {label1: 'ID Mesin', value1: 'A0002', label2: 'Nama Lokasi', value2: 'JKT.CIMBN.MERUYA'},
]

const TopComponent = ({data}) => {
  const classes = useStyles()
  const { id } = useParams()

  return (
    <div>
        <Paper className={classes.rootPaper}>
            <Grid container direction='column' style={{paddingTop: 10, paddingLeft: '20px', width: '100%'}}>
                {data && data.map((item) => (
                    <>
                        <Grid container direction='row' style={{marginTop: 10}}>
                            <Grid item xs={4}>
                                <Grid container direction='row'>
                                    <Grid item xs={3}>
                                        <Typography>{item.label1}</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        :
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography style={{fontWeight: 600}}>{item.value1 ? item.value1 : '-'}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container direction='row' style={{marginTop: 10}}>
                                    <Grid item xs={3}>
                                        <Typography>{item.label2}</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        :
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography style={{fontWeight: 600}}>{item.value2}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                ))}
            </Grid>
        </Paper>
    </div>
  )
}

function mapStateToProps() {
  return {}
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(TopComponent))
)