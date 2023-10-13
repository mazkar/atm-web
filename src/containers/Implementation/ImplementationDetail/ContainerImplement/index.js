/* eslint-disable no-nested-ternary */
import React, {useEffect,useState} from 'react';
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
import {isObejctEmpty} from '../../../../helpers/useFormatter';
import {
  doGetJarkom, 
  doGetKesiapanMesin, 
  doGetPermintaan, 
  doGetSaranaKeamanan, 
  doGetAktivasi, 
  doGetSingageStickerDanPajak,
  doGetBooth
} from '../../ApiServiceImplementation';

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
    minWidth: 500,
  },
  tableCell: {
    borderBottom: "none",
  }
});
const dataDummyDrafPermintaan = [
  {"taskList": "Bangun Ruangan", "request": "Yes", "ticket": "#10291", "status": "0"},
  {"taskList": "Renovasi Ruangan", "request": "Yes", "ticket": "#10291", "status": "0"},
  {"taskList": "Pemasangan AC", "request": "Yes", "ticket": "#10291", "status": "1"},
  {"taskList": "Pemasangan KWH", "request": "Yes", "ticket": "#10291", "status": "0"},
  {"taskList": "Pemasangan Outlet", "request": "Yes", "ticket": "#10291", "status": "0"},
  {"taskList": "Type Jarkom", "request": "VSAT", "ticket": "#10291", "status": "1"},
  {"taskList": "Pembuatan Booth", "request": "Standard", "ticket": "#10291", "status": "1"},
  {"taskList": "Pembuatan FM", "request": "Supermarket", "ticket": "#10291", "status": "0"},
  {"taskList": "Pembuatan Neon Box", "request": "Yes", "ticket": "#10291", "status": "1"},
];
const dataDummyParameter = [
  {"taskList": "Task - 1", "distributionData": "0", "statusPsf": "0"},
  {"taskList": "Task - 2", "distributionData": "0", "statusPsf": "1"},
];

function ContainerImplement(props) {
  const classes = useStyles();
  const {id} = props;
  // INIT STATE
  const [dataPermintaan, setDataPermintaan] = useState([]);  
  const [dataJarkom, setDataJarkom] = useState([]);  
  const [dataKesiapanMesin, setDataKesiapanMesin] = useState({});  
  const [dataKeamanan, setDataKeamanan] = useState({});  
  const [dataAktivasi, setDataAktivasi] = useState({});  
  // STATE LOADER
  const [isLoadData, setLoadData] = useState(false);
  // set handler loader when call Approval API Service
  function loaderHandler(loaderValue){
    setLoadData(loaderValue);
  }

  useEffect(() => {
    const dataHit={
      "siteNewAtmId": id
    };
    const dataHitImplementationId={
      "implementationId": id
    };
    // FETCH PERMINTAAN
    doGetPermintaan(loaderHandler, dataHitImplementationId).then((response)=>{
      if (response){
        if(response.data.status === "00"){
          console.log(">>> CEK doGetPermintaan: ", JSON.stringify(response.data.listDraftPermintaan));
          setDataPermintaan(response.data.listDraftPermintaan);
        }
      }
    });
    // FETCH JARKOM
    doGetJarkom(loaderHandler, dataHit).then((response)=>{
      if (response){
        if(response.data.status === "00"){
          console.log(">>> CEK doGetJarkom: ", JSON.stringify(response.data.listJarkom));
          setDataJarkom(response.data.listJarkom);
        }
      }
    });
    // FETCH KESIAPAN MESIN
    doGetKesiapanMesin(loaderHandler, dataHitImplementationId).then((response)=>{
      if (response){
        if(response.data.status === "oke"){
          console.log(">>> CEK doGetKesiapanMesin: ", JSON.stringify(response.data));
          setDataKesiapanMesin(response.data);
        }
      }
    });
    // FETCH SARANA KEAMANAN
    // doGetSaranaKeamanan(loaderHandler, dataHitImplementationId).then((response)=>{
    //   if (response){
    //     if(response.data.status === "00"){
    //       console.log(">>> CEK doGetSaranaKeamanan: ", JSON.stringify(response));
    //       // setDataJarkom(response.data.listJarkom);
    //     }
    //   }
    // });

    // FETCH AKTIVASI
    // doGetAktivasi(loaderHandler, dataHitImplementationId).then((response)=>{
    //   if (response){
    //     if(response.data.status === "00"){
    //       console.log(">>> CEK doGetAktivasi: ", JSON.stringify(response));
    //       // setDataJarkom(response.data.listJarkom);
    //     }
    //   }
    // });
    
  },[]);
  useEffect(() => {
    console.log(">>> CEK dataPermintaan", JSON.stringify(dataPermintaan));
  }, [dataPermintaan]);
  return (
    <div>
      {isLoadData ?
        <LoadingView maxheight='100%' isTransparent />
        :
        <div>
          <PaperDraftDetail title="Draft Permintaan" status="notComplete">
            <Grid container justify="space-between">
              <Grid item>
                {dataPermintaan.length < 1 ? 'N/A' :  
                  <Table size="small" cellSpacing={10} className={clsx(classes.tableRoot)}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={clsx(classes.tableCell)} align="left"><Typography className={classes.boldText}>Task List</Typography></TableCell>
                        <TableCell className={clsx(classes.tableCell)} align="center"><Typography className={classes.boldText}>Request</Typography></TableCell>
                        <TableCell className={clsx(classes.tableCell)} align="center"><Typography className={classes.boldText}>Ticket</Typography></TableCell>
                        <TableCell className={clsx(classes.tableCell)} align="center"><Typography className={classes.boldText}>Status</Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataPermintaan.map((item)=>{
                        return (
                          <TableRow >
                            <TableCell className={clsx(classes.tableCell)}><Typography className={classes.normalText}>{item.taskList === null ? 'N/A' : item.taskList}</Typography></TableCell>
                            <TableCell className={clsx(classes.tableCell)} align="center"><Typography className={classes.normalText}>{item.request === null ? 'N/A' : item.request}</Typography></TableCell>
                            <TableCell className={clsx(classes.tableCell)} align="center"><Typography className={classes.normalText}>{item.ticket === null ? 'N/A' : item.ticket}</Typography></TableCell>
                            <TableCell className={clsx(classes.tableCell)} align="center">{ item.status === null ? 'N/A' : <StatusChip value={item.status} /> }</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                }
              </Grid>
              <Grid item>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Parameter" status="complete">
            <Grid container justify="space-between">
              <Grid item>
                <Table size="small" cellSpacing={10} className={clsx(classes.tableRoot)}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={clsx(classes.tableCell)} align="left"/>
                      <TableCell className={clsx(classes.tableCell)} align="center"><Typography className={classes.boldText}>Distribution Data</Typography></TableCell>
                      <TableCell className={clsx(classes.tableCell)} align="center"><Typography className={classes.boldText}>Status PSF</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataDummyParameter.map((item)=>{
                      return (
                        <TableRow >
                          <TableCell className={clsx(classes.tableCell)}><Typography className={classes.boldText}>{item.taskList}</Typography></TableCell>
                          <TableCell className={clsx(classes.tableCell)} align="center"><StatusChip value={item.distributionData} /></TableCell>
                          <TableCell className={clsx(classes.tableCell)} align="center"><StatusChip value={item.statusPsf} /></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Grid>
              <Grid item>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Jarkom" status="notComplete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container direction="column" spacing={2}>
                  {dataJarkom.length < 1 ? 'N/A' :  
                    <Grid item>
                      <JarkomItem leftTitle="Order Link" rightTitle="Tgl Order" leftVal={<StatusChip value="0" />} rightVal={<Typography style={{fontSize: 12}}>10/12/2020</Typography>} />
                    </Grid>
                  }
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Kesiapan Mesin" status="complete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography className={classes.boldText}>Nama Ex lokasi :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.nameOfExlocation === null ? 'N/A' : dataKesiapanMesin.nameOfExlocation}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Type Mesin :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.typeMesin === null ? 'N/A' : dataKesiapanMesin.typeMesin}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Catridge :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.catridge === null ? 'N/A' : dataKesiapanMesin.catridge}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Retrack :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.retrack === null ? 'N/A' : dataKesiapanMesin.retrack}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Kunci Fascia Atas :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.kunciFasciaAtas === null ? 'N/A' : dataKesiapanMesin.kunciFasciaAtas}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>DVR :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.dvr === null ? 'N/A' : dataKesiapanMesin.dvr}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>UPS :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.ups === null ? 'N/A' : dataKesiapanMesin.ups}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography className={classes.boldText}>Jenis Mesin :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.jenisMesin === null ? 'N/A' : dataKesiapanMesin.jenisMesin}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Serial Number :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.serialNumber === null ? 'N/A' : dataKesiapanMesin.serialNumber}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Reject :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.reject === null ? 'N/A' : dataKesiapanMesin.reject}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Kunci Tombak :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.kunciTombak === null ? 'N/A' : dataKesiapanMesin.kunciTombak}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Kunci Fascia Bawah :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.kunciFasciaBawah === null ? 'N/A' : dataKesiapanMesin.kunciFasciaBawah}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>CCTV :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.cctv === null ? 'N/A' : dataKesiapanMesin.cctv}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Tanggal PM :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.tanggalPM === null ? 'N/A' : dataKesiapanMesin.tanggalPM}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography className={classes.boldText}>Status Rekondisi :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.statusRekondisi === null ? 'N/A' : dataKesiapanMesin.statusRekondisi}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Plan Tanggal Kirim :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.planTanggalKirim === null ? 'N/A' : dataKesiapanMesin.planTanggalKirim}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Keterangan :</Typography>
                        <Typography style={{fontSize: 12}}>{isObejctEmpty(dataKesiapanMesin) ? 'N/A' : dataKesiapanMesin.keterangan === null ? 'N/A' : dataKesiapanMesin.keterangan}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Media Promosi - Booth" status="notComplete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="Serial Number Booth :" leftVal={<Typography style={{fontSize: 12}}>120019281920</Typography>} onlyLeft/>
                  </Grid>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="Tanggal Tarik :" leftVal={<Typography style={{fontSize: 12}}>10-10-2020</Typography>} onlyLeft/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <ChkyButtons style={{textTransform: 'none'}} onClick={()=> window.location.assign(`/implementation/detail/${id}/kesiapan-booth`)} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Sarana Keamanan" status="complete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="DVR" leftVal={<Typography style={{fontSize: 12}}>Telah diangkut ke gudang</Typography>} onlyLeft/>
                  </Grid>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="Card Bin" leftVal={<Typography style={{fontSize: 12}}>Telah diangkut ke gudang</Typography>} onlyLeft/>
                  </Grid>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="Pin Cover" leftVal={<Typography style={{fontSize: 12}}>Telah diangkut ke gudang</Typography>} onlyLeft/>
                  </Grid>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="Alarm System" leftVal={<Typography style={{fontSize: 12}}>Telah diangkut ke gudang</Typography>} onlyLeft/>
                  </Grid>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="Plat Anti Skimming" leftVal={<Typography style={{fontSize: 12}}>Telah diangkut ke gudang</Typography>} onlyLeft/>
                  </Grid>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="Perangkat Lainnya" leftVal={<Typography style={{fontSize: 12}}>Telah diangkut ke gudang</Typography>} onlyLeft/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <ChkyButtons style={{textTransform: 'none'}} >Update</ChkyButtons>
              </Grid>
            </Grid>
          </PaperDraftDetail>

          <PaperDraftDetail title="Aktivasi" status="notComplete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography className={classes.boldText}>Jadwal Aktivasi :</Typography>
                        <Typography style={{fontSize: 12}}>10-10-2020</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>PIC FLM :</Typography>
                        <Typography style={{fontSize: 12}}>Suwandi</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>PIC SLM :</Typography>
                        <Typography style={{fontSize: 12}}>Suwandi</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography className={classes.boldText}>PIC Jarkom :</Typography>
                        <Typography style={{fontSize: 12}}>Suwandi</Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.boldText}>Serial Number :</Typography>
                        <Typography style={{fontSize: 12, color: '#DC241F'}}>File BAST</Typography>
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

          <PaperDraftDetail title="Signage Sticker & Pajak" status="complete">
            <Grid container justify="space-between" spacing={5}>
              <Grid item xs={10}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="Flag Mounted" leftVal={<Typography style={{fontSize: 12}}>10-10-2020</Typography>} onlyLeft/>
                  </Grid>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="Neon Box" leftVal={<Typography style={{fontSize: 12}}>10-10-2020</Typography>} onlyLeft/>
                  </Grid>
                  <Grid item xs={6}>
                    <JarkomItem leftTitle="Sticker Kaca" leftVal={<Typography style={{fontSize: 12}}>10-10-2020</Typography>} onlyLeft/>
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

ContainerImplement.propTypes = {
  id: PropTypes.string.isRequired,
  isLoadData: PropTypes.bool,
};
ContainerImplement.defaultProps = {
  isLoadData: false,
};

export default ContainerImplement;

