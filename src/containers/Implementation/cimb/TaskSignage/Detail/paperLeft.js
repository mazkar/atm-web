import React from 'react';
import { Paper, Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ReactComponent as ExchangeIcon }from '../../../../../assets/icons/siab/camera-icon.svg'
import MinioImageComponent from '../../../../../components/MinioImageComponent';
import MinioDocComponent from '../../../../../components/MinioDocComponent';
import NoImage from "../../../../../assets/images/image.png";
import ValueDetailTask from '../../../../../components/ValueDetailTask';
import { dataCard } from "../../../../../helpers/constants";

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    padding: 25,
    height: '100%',
  },
  textValue: {
    minHeight: 40,
    padding: 12,
    border: "1px solid #dfe4ea",
    borderRadius: 10,
    fontSize: 13,
    color: "#2B2F3C",
    width: "100%",
  },
  imgContainer: {
    borderRadius: 10,
    width: '100%', 
    height: '100px',
  }
});


function LeftComponent(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <div>
        <Paper className={classes.rootPaper}>
            <Grid container direction='column' spacing={2} style={{paddingBottom: '15px', paddingRight: 70}}>

                <Grid item>
                    <Grid container direction='row'>
                        <Grid item style={{ padding: '2px 7px' }}>
                            <ExchangeIcon />
                        </Grid>
                        <Grid item>
                            <Typography style={{ fontWeight: 600, color: '#DC241F', fontSize: 20 }}>Signage</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Typography className={classes.textValue}>{data.type}</Typography>
                </Grid>

                <Grid item>
                    <Typography className={classes.textValue} style={{minHeight: 75}}>{data.note}</Typography>
                </Grid>

                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Due Date</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.textValue}>{data.dueDate}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>PIC / Vendor</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.textValue}>{data.vendor}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Dimensi</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.textValue}>{data.dimensi}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Type Mesin</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.textValue}>{data.machineType}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <ValueDetailTask
                                label="BAST Digital" 
                                value={data.bastDigital} 
                                bastSubmitStatus={data.bastSubmitStatus}
                                txtValue='BAST Digital - Signage'
                                href={dataCard.find(val=>val.type=='signage').url+'/bast-digital-preview/'+data.bastDigital}
                                bast 
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Photo</Typography>
                        <Grid container direction='row' spacing={4} style={{marginTop: '5px'}}> 
                            <Grid item xs={3}>
                                <Box>
                                    <Grid container direction='column' alignItems="center">
                                        {data.photoFront ? (<MinioImageComponent filePath={data.photoFront} className={classes.imgContainer}/>
                                    ):(
                                        <img src={NoImage} className={classes.imgContainer} alt="img-depan"/>
                                    )}
                                        <Typography>Depan</Typography>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box>
                                    <Grid container direction='column' alignItems="center">
                                        {data.photoRight ? (<MinioImageComponent filePath={data.photoRight} className={classes.imgContainer}/>
                                    ):(
                                        <img src={NoImage} className={classes.imgContainer} alt="img-kanan"/>
                                    )}
                                        <Typography>Kanan</Typography>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box>
                                    <Grid container direction='column' alignItems="center">
                                        {data.photoLeft ? (<MinioImageComponent filePath={data.photoLeft} className={classes.imgContainer}/>
                                    ):(
                                        <img src={NoImage} className={classes.imgContainer} alt="img-kiri"/>
                                    )}
                                        <Typography>Kiri</Typography>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box>
                                    <Grid container direction='column' alignItems="center">
                                        {data.photoRear ? (<MinioImageComponent filePath={data.photoRear} className={classes.imgContainer}/>
                                    ):(
                                        <img src={NoImage} className={classes.imgContainer} alt="img-belakang"/>
                                    )}
                                        <Typography>Belakang</Typography>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>

                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <b style={{fontSize: 13}}>CIMB Attachment</b>
                                {data.cimbAttachment.length > 0 ? 
                                    data.cimbAttachment.map((item)=>{
                                        return(<MinioDocComponent filePath={item.path}/>)}) : (<Typography className={classes.noData}>No Files</Typography>)}
                        </Grid>
                        <Grid item xs={6}>
                            <b style={{fontSize: 13}}>Vendor Attachment</b>
                                {data.vendorAttachment.length > 0 ? 
                                    data.vendorAttachment.map((item)=>{
                                        return(<MinioDocComponent filePath={item.path} textColor="#8D98B4"/>)}) : (<Typography className={classes.noData}>No Files</Typography>)}
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
        </Paper>
    </div>
  );
}

LeftComponent.propTypes = {
    data: PropTypes.object.isRequired,
};
  
export default LeftComponent;