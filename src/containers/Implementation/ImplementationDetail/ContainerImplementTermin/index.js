import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import PaperDraftDetail from '../../ComponentsOwn/PaperDraftDetail';
import { ChkyButtons } from '../../../../components';
import StatusChip from '../../ComponentsOwn/StatusChip';
import AtmLayoutImg from '../../../../assets/images/atmLayout.png';
import JarkomItem from '../../ComponentsOwn/JarkomItem';
import LoadingView from '../../../../components/Loading/LoadingView';
import {ReactComponent as FileIcon} from '../../../../assets/icons/general/paperclip.svg';
import {ReactComponent as CalendarIcon} from '../../../../assets/icons/duotone-red/calendar.svg';

const useStyles = makeStyles({
  boldText: {
    fontFamily: 'Barlow',
    fontWeight: '600',
    fontSize: '13px',
    color: '#2B2F3C',
  },
  normalText: {
    fontFamily: 'Barlow',
    fontWeight: '400',
    fontSize: '13px',
    color: '#2B2F3C',
  },
  tableRoot: {
    width: '100%',
  },
  tableCell: {
    borderBottom: "none",
  },
  documentLink: {
    backgroundColor: 'unset', 
    padding: 0,
    '& .MuiButton-root':{padding: 0, textTransform: 'none' ,backgroundColor: 'unset'},
    '& .MuiButton-root:hover':{opacity: 0.6,backgroundColor: 'unset'},
  },
});
const dataDummyParameter = [
  {"taskList": "Request Delete ID ITM", "status": "InProgress"},
  {"taskList": "Inactive Aplikasi Monitoring (ESQ)", "status": "Done"},
  {"taskList": "Request Inactive IP / Firewall", "status": "Done"},
];
const dataDummyJarkom = [
  {"taskList": "Modem", "tglOrder": "10-10-2020"},
  {"taskList": "Kabel", "tglOrder": "10-10-2020"},
  {"taskList": "Antena", "tglOrder": "10-10-2020"},
];

function ContainerImplementTermin(props) {
  const classes = useStyles();
  const {id, isLoadData} = props;
  return (
    <div>
      {isLoadData ?
        <LoadingView maxheight='100%' isTransparent />
        :
        <div>
          <PaperDraftDetail title="Kunjungan PM" status="notComplete">
            <Grid container justify="space-between">
              <Grid item xs={10}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography className={classes.boldText} style={{marginBottom: 5}}>Tanggal Kunjungan :</Typography>
                    <div style={{border:' 1px solid #BCC8E7', padding: '6px 12px', borderRadius: 8, width: 'fit-content'}}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Typography  style={{fontSize: 13}}>20 - 10 - 2020</Typography> 
                        </Grid>
                        <Grid item style={{marginTop:5}}><CalendarIcon/></Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.boldText} style={{marginBottom: 15}}>Lampirkan Job Card :</Typography>
                    <Grid container spacing={1}>
                      <Grid item style={{marginTop:5}}><FileIcon/></Grid>
                      <Grid item>
                        <div className={classes.documentLink} >
                          <Typography  style={{color: '#DC241F', fontSize: 14}}>job-card.pdf</Typography> 
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Konfirmasi Saldo Nol" status="complete">
            <Grid container justify="space-between">
              <Grid item xs={10}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography className={classes.boldText} style={{marginBottom: 5}}>Konfirmasi Saldo Nol ITM :</Typography>
                    <div style={{border:' 1px solid #BCC8E7', padding: '6px 12px', borderRadius: 8, width: 'fit-content'}}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Typography  style={{fontSize: 13}}>20 - 10 - 2020</Typography> 
                        </Grid>
                        <Grid item style={{marginTop:5}}><CalendarIcon/></Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.boldText} style={{marginBottom: 5}}>Konfirmasi Saldo Nol GL :</Typography>
                    <div style={{border:' 1px solid #BCC8E7', padding: '6px 12px', borderRadius: 8, width: 'fit-content'}}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Typography  style={{fontSize: 13}}>20 - 10 - 2020</Typography> 
                        </Grid>
                        <Grid item style={{marginTop:5}}><CalendarIcon/></Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Cabut Parameter" status="complete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={8}>
                <Table size="small" cellSpacing={10} className={clsx(classes.tableRoot)}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={clsx(classes.tableCell)} align="left"><Typography className={classes.boldText}>Task List</Typography></TableCell>
                      <TableCell className={clsx(classes.tableCell)} align="center"><Typography className={classes.boldText}>Status</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataDummyParameter.map((item)=>{
                      return (
                        <TableRow >
                          <TableCell className={clsx(classes.tableCell)}><Typography className={classes.boldText}>{item.taskList}</Typography></TableCell>
                          <TableCell className={clsx(classes.tableCell)} align="center"><StatusChip value={item.status} /></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={2}>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Cabut Jarkom" status="notComplete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container justify="space-between">
                  <Grid item xs={8}>
                    <Table size="small" cellSpacing={10} className={clsx(classes.tableRoot)}>
                      <TableHead>
                        <TableRow>
                          <TableCell className={clsx(classes.tableCell)} align="left"><Typography className={classes.boldText}>Task List</Typography></TableCell>
                          <TableCell className={clsx(classes.tableCell)} align="center"><Typography className={classes.boldText}>Tanggal Order</Typography></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataDummyJarkom.map((item)=>{
                          return (
                            <TableRow >
                              <TableCell className={clsx(classes.tableCell)}><Typography className={classes.normalText}>{item.taskList}</Typography></TableCell>
                              <TableCell className={clsx(classes.tableCell)} align="center"><Typography className={classes.normalText}>{item.tglOrder}</Typography></TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid item><img src={AtmLayoutImg} alt="img" style={{width: 180, height: 80, objectFit: 'cover'}}/></Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Cabut Mesin" status="complete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography className={classes.boldText}>Type Mesin :</Typography>
                        <Typography style={{fontSize: 12}}>Data dari warehouse</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Serial Number :</Typography>
                        <Typography style={{fontSize: 12}}>Data dari warehouse</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Jumlah Cassette :</Typography>
                        <Typography style={{fontSize: 12}}>Data dari warehouse</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Kunci Card Bin :</Typography>
                        <Typography style={{fontSize: 12}}>Data dari warehouse</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Kunci Fascia Atas :</Typography>
                        <Typography style={{fontSize: 12}}>Data dari warehouse</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>No SN UPS :</Typography>
                        <Typography style={{fontSize: 12}}>Data dari warehouse</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography className={classes.boldText}>Jenis Mesin :</Typography>
                        <Typography style={{fontSize: 12}}>Data dari warehouse</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>&nbsp;</Typography>
                        <Typography style={{fontSize: 12}}>&nbsp;</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Jumlah Reject :</Typography>
                        <Typography style={{fontSize: 12}}>Data dari warehouse</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Kunci Tombak :</Typography>
                        <Typography style={{fontSize: 12}}>Data dari warehouse</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Kunci Fascia Bawah :</Typography>
                        <Typography style={{fontSize: 12}}>Data dari warehouse</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Type UPS :</Typography>
                        <Typography style={{fontSize: 12}}>Data dari warehouse</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container spacing={1}>
                      {[1,2,3,4].map(()=>{
                        return (
                          <Grid item xs={6}>
                            <img src={AtmLayoutImg} alt="img" style={{width: '100%', height: 'auto'}}/>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <ChkyButtons style={{textTransform: 'none'}} onClick={()=> window.location.assign(`/implementation/detail/${id}/kesiapan`)} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Cabut Booth" status="notComplete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography className={classes.boldText}>Type Booth :</Typography>
                        <Typography style={{fontSize: 12}}>120019281920</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>No. Asset :</Typography>
                        <Typography style={{fontSize: 12}}>120019281920</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container spacing={1}>
                      {[1,2,3,4].map(()=>{
                        return (
                          <Grid item xs={6}>
                            <img src={AtmLayoutImg} alt="img" style={{width: '100%', height: 'auto'}}/>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Cabut Sarana Keamanan" status="complete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="CCTV" leftVal={<Typography style={{fontSize: 12}}>Telah diangkut ke gudang</Typography>} onlyLeft/>
                  </Grid>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="Alarm System" leftVal={<Typography style={{fontSize: 12}}>Telah diangkut ke gudang</Typography>} onlyLeft/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Status Terminasi" status="complete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography className={classes.boldText}>Tanggal Terminasi :</Typography>
                        <Typography style={{fontSize: 12}}>10-10-2020</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Keterangan :</Typography>
                        <Typography style={{fontSize: 12}}>Semua sudah terlaksana dengan aman dan lancar</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container spacing={1}>
                      {[1,2,3,4].map(()=>{
                        return (
                          <Grid item xs={6}>
                            <img src={AtmLayoutImg} alt="img" style={{width: '100%', height: 'auto'}}/>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Status Signage Sticker & Pajak" status="notComplete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography className={classes.boldText}>Type FM :</Typography>
                        <Typography style={{fontSize: 12}}>120019281920</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Pengurusan Cabut Wajib Pajak :</Typography>
                        <Typography style={{fontSize: 12}}>Selesai</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>BAST :</Typography>
                        <Grid container spacing={1}>
                          <Grid item style={{marginTop:5}}><FileIcon/></Grid>
                          <Grid item>
                            <div className={classes.documentLink} >
                              <Typography  style={{color: '#DC241F', fontSize: 14}}>document-bast.pdf</Typography> 
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography className={classes.boldText}>Tanggal Cabut :</Typography>
                        <Typography style={{fontSize: 12}}>10-11-2020</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Cabut Sticker :</Typography>
                        <Typography style={{fontSize: 12}}>Selesai</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container spacing={1}>
                      {[1,2,3,4].map(()=>{
                        return (
                          <Grid item xs={6}>
                            <img src={AtmLayoutImg} alt="img" style={{width: '100%', height: 'auto'}}/>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>
        </div>
      }
    </div>
  );
}

ContainerImplementTermin.propTypes = {
  id: PropTypes.string.isRequired,
  isLoadData: PropTypes.bool,
};
ContainerImplementTermin.defaultProps = {
  isLoadData: false,
};

export default ContainerImplementTermin;

