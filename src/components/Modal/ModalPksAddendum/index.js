/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Grid,
  Typography,
  Button,
  Paper,
  Table,
  TableRow,
  TableCell,
} from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import "moment/locale/id";
import LoadingView from '../../Loading/LoadingView';
import constants from '../../../helpers/constants';
import Logo from '../../../assets/images/SideMenu/logo_cimb.png';
import DateSelect from '../../Selects/DateSelect';
import CommonSelect from '../../Selects/CommonSelect';
import { AdvancedSmallInput } from "../../chky/ChkyInputSmall";
import { Dark } from '../../../assets/theme/colors';
import DateSelectTimestamp from '../../Selects/DateSelectTimestamp';
import { useFormatter } from '../../../helpers';
import useTimestampConverter from '../../../helpers/useTimestampConverter';

moment.locale('id');

const useStyles = makeStyles({
  modal: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Barlow",
  },
  paperRoot: {
    position: "absolute",
    backgroundColor: constants.color.white,
    top: 0,
    width: 720,
    height: "100%",
    borderRadius: 10,
    padding: 30,
    overflowY: "auto",
  },
  girdAreaContent: {
    // background: 'blue',
    width: "100%",
  },
  logoArea: {
    marginBottom: 14,
  },
  judulArea: {
    paddingBottom: 10,
    borderBottom: `1px solid ${Dark}`
  },
  keteranganArea: {
    paddingTop: 10,
    marginBottom: 10,
  },
  wrapperArea: {
    marginBottom: 20,
  },
  deskripsiArea: {
    marginBottom: 20,
  },
  deskripsi: {
    fontStyle: "normal",
    fontSize: 13,
    color: "#2B2F3C",
    textAlign: 'justify'
  },
  headingInput: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 14,
  },
  labelInput: {
    fontSize: 13,
    color: constants.color.dark,
    marginBottom: 5,
  },
  inputForm: {
    borderRadius: 8,
    border: "1px solid #BCC8E7",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    height: 40,
  },
  buttonContainer: {
    marginTop: 40,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    borderRadius: 10,
    width: "100%",
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 115,
    height: 40,
  },
  iconInputRight: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: "12px 12px",
  },
  selectRegion: {
    "& .ant-select-single:not(.ant-select-customize-input) .ant-select-selector": {
      height: 40,
      border: `1px solid #BCC8E7`,
    },
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
      paddingTop: 4,
    },
  },
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  areaTandaTangan: {
    marginTop: 40,
    marginBottom: 30,
  },
  dropdownClassName:{
    zIndex: 1300
  },
  datePksWrapper:{
    display: 'inline-block'
  },
  deskripsiFooter: {
    fontStyle: "normal",
    fontSize: 13,
    color: "#DC241F",
    textAlign: 'justify',
  },
  inputAdv: { padding: 5 }
});

const namaKaryawanPimpinan1 = 'Wijaya Handoyo Jo';
const namaKaryawanPimpinan2 = 'Deden Hidayat';

const hariSuggestions = [
  { id: 0, value: "Senin", nameEn: "Senin", nameId: "Senin" },
  { id: 1, value: "Selasa", nameEn: "Selasa", nameId: "Selasa" },
  { id: 2, value: "Rabu", nameEn: "Rabu", nameId: "Rabu" },
  { id: 3, value: "Kamis", nameEn: "Kamis", nameId: "Kamis" },
  { id: 3, value: "Jumat", nameEn: "Jumat", nameId: "Jumat" },
  { id: 3, value: "Sabtu", nameEn: "Sabtu", nameId: "Sabtu" },
  { id: 3, value: "Minggu", nameEn: "Minggu", nameId: "Minggu" },
];

function isEmpty(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
}

function isNull(value){
  if(value === null || value === undefined){
    return true;
  }
  return false;
}

const ModalPksAddendum = (props) => {
  const classes = useStyles();
  const { isOpen, handleClose, rowToShow } = props;

  const [isOpenModalLoader, setModalLoader] = useState(false);

  const [dataRequest, setDataRequest] = useState({
    id: null,
    referencedNumber: "",
    sendTo: "",
    nameBusinessEntity: "",
    locationName: "",
    landlordName: "",
    ownerName: "",
    ownerInfo: "",
    ownerPosition: "",
    buildingLarge: "",
    buildingName: "",
    boothType: "",
    letterDay: moment().format('dddd'),
    letterDate: "",
    letterDate2: moment().valueOf(),
    ownershipType: "",
    ownershipNumber: "",
    ownershipName: "",
    landLetterNumber: "",
    landLetterDate: "",
    landLetterArea: "",
    landLetterBuildingArea: "",
    city: "",
    district: "",
    subDistrict: "",
    address: "",
    imbNumber: "",
    imbDate: "",
    nop: "",
    startRentDate: null,
    endRentDate: null,
    bankName: "",
    noRekeningPic: "",
    nameRekeningPic: "",
    rentYear: null,
    yearlyRentCost: "",
    cityName: "",
    provinceName: "",
    startAddendumDate: "",
    endAddendumDate: "",
  });

  const [yearlyRentCostList, setYearlyRentCostList] = useState([]);

  // console.log('props pks',props);

  const handleDataRequest = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataRequest((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  useEffect(() => {
    if (isOpen === true) {
      const dataHit = { id: rowToShow };
      handleDataRequest(rowToShow, "id");
      const config = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      };
      try {
        setModalLoader(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getRequestDraftPks`,
            dataHit,
            config
          )
          .then(async(res) => {
            // console.log("+++ getRequestDraftPks: ", res);
            const {data} = res;
            setDataRequest((prevstate) => ({
              ...prevstate,
              referencedNumber: data.referencedNumber,
              sendTo: data.sendTo,
              nameBusinessEntity: data.nameBusinessEntity,
              locationName: data.locationName,
              landlordName: data.landlordName,
              ownerName: data.ownerName,
              ownerInfo: data.ownerInfo,
              ownerPosition: data.ownerPosition,
              buildingLarge: data.buildingLarge,
              buildingName: data.buildingName,
              boothType: data.boothType,
              // letterDay: data.namePks,
              letterDate: data.letterDate,
              // letterDate2: data.namePks,
              // ownershipType: data.namePks,
              // ownershipNumber: data.namePks,
              // ownershipName: data.namePks,
              // landLetterNumber: data.namePks,
              // landLetterDate: data.namePks,
              // landLetterArea: data.namePks,
              // landLetterBuildingArea: data.namePks,
              // city: data.cityName,
              // district: data.namePks,
              // subDistrict: data.namePks,
              // address: data.namePks,
              // imbNumber: data.namePks,
              // imbDate: data.namePks,
              // nop: data.namePks,
              startRentDate: data.startRentDate,
              endRentDate: data.endRentDate,
              bankName: data.bankName,
              noRekeningPic: data.noRekeningPic,
              nameRekeningPic: data.nameRekeningPic,
              rentYear: data.rentYear,
              yearlyRentCost: data.yearlyRentCost,
              cityName: data.cityName,
              provinceName: data.provinceName,
              // lineTlp: data.namePks,
              // buildingFloor: data.namePks,
              // ownerBy: data.namePks,
              // witness: data.namePks,
              // ppatLocation: data.namePks,
              // yearlyElectricityCost: null,
              // serviceCharge: null,
              // maintenanceCost: data.namePks,
              // branches: data.namePks
            }));

            const dataCostList = data.yearlyRentCost;
            const arrayData = dataCostList?.replace("[", "").replace("]", "").split(",");
            setYearlyRentCostList(arrayData);
      
            setModalLoader(false);
          })
          .catch((err) => {
            alert(err);
            setModalLoader(false);
          });
      } catch (err) {
        alert(`Error Fetching Data...! \n${err}`);
        setModalLoader(false);
      }
    }
  }, [rowToShow, isOpen]);

  const handleSend = () => {
    // console.log("REQ DATA NEW LOI",data);
    const config = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };

    const dataHit = {
      ...dataRequest,
      startAddendumDate: useTimestampConverter(dataRequest.startRentDate/1000, "YYYY-MM-DD"),
      endAddendumDate: useTimestampConverter(dataRequest.endRentDate/1000, "YYYY-MM-DD"),
    };
    try {
      setModalLoader(true);
      axios
        .post(
          `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/sendDraftPksAddendum`,
          dataHit,
          config
        )
        .then((res) => {
          if (res.data.statusCode === "00"||res.data.statusCode === 200) {
            alert("Success Send Data to Landlord!");
            setModalLoader(false);
            window.location.reload();
          } else {
            alert("Failed to Send Data to Landlord");
            setModalLoader(false);
          }
        })
        .catch((err) => {
          setModalLoader(false);
          alert(`${err}`);
        });
    } catch (err) {
      setModalLoader(false);
      alert(`Error Fetching Data...! \n${err}`);
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {isOpenModalLoader ? (
          <div className={classes.paperRoot}>
            <LoadingView maxheight="100%"/>
          </div>
        ) : (
          <Paper className={classes.paperRoot}>
            <Grid item className={classes.girdAreaContent}>
              <Grid item className={classes.logoArea}>
                <img style={{ width: "145px" }} src={Logo} alt="logo" />
              </Grid>
              <Grid item className={classes.judulArea}><Typography
                align="center"
                style={{ fontWeight: "bold", fontSize: 13 }}
              >
                  ADDENDUM I
              </Typography>
              <Typography
                align="center"
                style={{ fontWeight: "bold", fontSize: 13 }}
              >
                  PERJANJIAN SEWA MENYEWA <br />
                  RUANG ATM BANK CIMB NIAGA DI{" "}
                <b>{dataRequest.locationName ? dataRequest.locationName : "-"}</b>
              </Typography>
              </Grid>
              <Grid item className={classes.keteranganArea}>
                <Grid container style={{justifyContent: 'center'}}>
                  <Grid item>
                    <Typography style={{ fontSize: 13, fontWeight: 300}}>
                      <b>{dataRequest.referencedNumber ? dataRequest.referencedNumber : "-"}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className={classes.wrapperArea} spacing={2}>
                <Grid item>
                  <Typography className={classes.labelInput}>
                    Pada hari ini{' '}
                    <div className={classes.datePksWrapper}>
                      <CommonSelect
                        bordered
                        suggestions={hariSuggestions}
                        value={dataRequest.letterDay}
                        width="140px"
                        handleChange={(value)=>handleDataRequest(value, "letterDay")}
                        color={constants.color.dark}
                      />
                    </div>
                    {' '} tanggal {' '}
                    <div className={classes.datePksWrapper}>
                      <DateSelectTimestamp 
                        value={dataRequest.letterDate2} 
                        popupStyle={{ zIndex: 1700 }}
                        handleChange={(val) => {
                          handleDataRequest(val, "letterDate2");
                        }}/>
                    </div>
                    {' '}yang bertanda tangan di  bawah ini  :
                  </Typography>
                </Grid>
              </Grid>
              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  <b>I. LOKASI/ {dataRequest.nameBusinessEntity ? dataRequest.nameBusinessEntity : "-"}</b>{" "}
                  <br />
                  Dalam hal ini diwakili oleh{" "}
                  <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.landlordName} stateModifier={(val)=>handleDataRequest(val, "landlordName")}/>{' '}
                  selaku <b>{dataRequest.ownerPosition ? dataRequest.ownerPosition : "-"}</b>, 
                  dari dan karenanya bertindak untuk dan atas nama{" "}
                  <b>{dataRequest.nameBusinessEntity ? dataRequest.nameBusinessEntity : "-"}</b>, yang berkedudukan di{" "}
                  <b>{dataRequest.locationName ? dataRequest.locationName : "-"}</b>, selanjutnya
                  disebut <b>"PEMILIK/ PIHAK PERTAMA".</b>
                </Typography>
              </Grid>
              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  <b>II. PT. BANK CIMB NIAGA Tbk,</b>
                  <br />
                  Suatu perseroan terbatas, berkedudukan di Jakarta Selatan, berkantor pusat di Graha CIMB Niaga lantai 15, Jl. Jenderal Sudirman Kav. 58, Jakarta 12190,  yang didirikan berdasarkan hukum Republik Indonesia yang Anggaran Dasarnya telah diumumkan dalam Berita Negara Republik Indonesia tanggal 4 September tahun 1956 nomor 71, Tambahan nomor 729/1956, anggaran dasar tersebut telah beberapa kali mengalami perubahan dan terakhir telah diubah dengan akta No. 49 tanggal 24 April 2018, dibuat di hadapan Ashoya Ratam, SH, MKN, Notaris di Jakarta, yang telah memperoleh persetujan dari Menteri Hukum dan Hak Asasi Manusia Republik Indonesia sebagaimana ternyata dari Surat Keputusan No.AHU-AHA 01.03-0169812 tanggal 28 April 2018, dalam hal ini diwakili oleh  {' '}
                  <b>{namaKaryawanPimpinan1}</b> dan <b>{namaKaryawanPimpinan2}</b>, 
                  masing-masing selaku Karyawan Pimpinan PT. BANK CIMB NIAGA Tbk yang dalam hal ini bertindak berturut-turut berdasarkan Surat Kuasa No. 667 – tertanggal 15 November 2019 dan karenanya bertindak mewakili Direksi dengan demikian sah mewakili  PT. BANK CIMB NIAGA Tbk, selanjutnya disebut {' '}
                  <b>"PENYEWA / PIHAK KEDUA"</b>
                </Typography>
              </Grid>

              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  Kedua belah pihak  menerangkan terlebih dahulu :
                </Typography>
              </Grid>
              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                Bahwa antara  PIHAK PERTAMA dan PIHAK KEDUA  telah ditanda tangani  <b>Perjanjian  Sewa Menyewa No.</b> 
                  <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.landLetterNumber} stateModifier={(val)=>handleDataRequest(val, "landLetterNumber")}/> 
                  tertanggal 
                  <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.letterDate} stateModifier={(val)=>handleDataRequest(val, "letterDate")}/>
                 yang dibuat dibawah tangan bermaterai cukup atas Ruangan ATM, yang berakhir  pada tanggal 
                  <div className={classes.datePksWrapper}>
                    <DateSelectTimestamp 
                      value={dataRequest.endRentDate} 
                      popupStyle={{ zIndex: 1700 }}
                      handleChange={(val) => {
                        handleDataRequest(val, "endRentDate");
                      }}/>
                  </div>
                  yang selanjutnya disebut Perjanjian.
                </Typography>
              </Grid>
              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                Selanjutnya kedua belah pihak sepakat untuk  memperpanjang <b>Perjanjian</b> Sewa Menyewa Ruang ATM tersebut dengan perubahan, syarat-syarat dan ketentuan-ketentuan  sebagai berikut :
                </Typography>
              </Grid>

              <Grid item className={classes.deskripsiArea}>
                <ol>
                  <li><b>Perjanjian</b> diperpanjang untuk jangka waktu   <b>{dataRequest.rentYear? dataRequest.rentYear : "-"}</b>{" "}
                        tahun,  terhitung  sejak tanggal    <b>{dataRequest.startRentDate? useTimestampConverter(dataRequest.startRentDate/1000, "DD-MM-YYYY") : "-"}</b>{" "}
                    <b>dan akan berakhir pada tanggal</b>  <b>{dataRequest.endRentDate? useTimestampConverter(dataRequest.endRentDate/1000, "DD-MM-YYYY") : "-"}</b>.</li>
                  <li>Besarnya biaya sewa adalah sebesar 
                  {
                    yearlyRentCostList?.map((rowList,idxList,arr)=>{
                        return(
                          <>
                            <b> Rp {isNull(dataRequest.yearlyRentCost) ? '-' : useFormatter.thousandFormat(rowList)}</b>
                            {` (tahun ke ${idxList + 1})`}
                            {idxList === arr.length - 1 ? '' : ','}
                          </>
                        )
                    })
                  }
                    , harga sudah termasuk  Pajak Penghasilan (PPh) sebesar 10%,  tetapi belum termasuk Pajak Pertambahan Nilai (PPN) sebesar 11%.</li>
                  <li>Pembayaran tersebut dibayar oleh PIHAK KEDUA  secara  sekaligus dimuka, selambatnya 20 (dua puluh) hari kerja setelah invoice/ tagihan dan e-faktur dari PIHAK PERTAMA diterima PIHAK KEDUA  ,  untuk itu akan dibuat  kwitansi/ tanda terima yang sah tersendiri oleh PIHAK PERTAMA atas penerimaan sejumlah uang tersebut. </li>
                  <li>Pembayaran sebagaimana tersebut pada butir 2 dilakukan dengan cara transfer ke rekening PIHAK PERTAMA pada :
                    <div>
                      <table>
                        <tr>
                          <td>BANK</td>
                          <td>: <b>{dataRequest.bankName ? dataRequest.bankName : "-"}</b></td>
                        </tr>
                        <tr>
                          <td>No Rekening</td>
                          <td>: <b>{dataRequest.noRekeningPic ? dataRequest.noRekeningPic : "-"}</b></td>
                        </tr>
                        <tr>
                          <td>Atas Nama</td>
                          <td>: <b>{dataRequest.nameRekeningPic ? dataRequest.nameRekeningPic : "-"}</b></td>
                        </tr>
                      </table>
                    </div>
                    <div>Dan sebagai tanda penerimaan akan dibuatkan kuitansi tersendiri oleh PIHAK PERTAMA.</div>
                  </li>
                  <li>Ketentuan-ketentuan  yang tercantum dalam <b>Perjanjian</b> tersebut di atas tetap berlaku dan mengikat para pihak sepanjang tidak diubah dengan <b>Addendum I Perjanjian Sewa Menyewa</b> ini.</li>
                  <li><b>Addendum I Perjanjian Sewa Menyewa</b> ini merupakan satu kesatuan yang tidak dapat dipisahkan  dengan <b>Perjanjian</b> tersebut di atas.</li>
                </ol>
              </Grid>

              <div>
              Demikian <b>Addendum I Perjanjian Sewa Menyewa</b> ini dibuat dalam rangkap 2 (dua) bermeterai cukup dan berkekuatan hukum yang sama, ditanda tangani pada hari dan tanggal tersebut di atas.
              </div>
              <br />
              <Table size="small">
                <TableRow>
                  <TableCell style={{borderBottom: 'none'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>PEMILIK / PIHAK PERTAMA</Typography>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>{dataRequest.nameBusinessEntity ? dataRequest.nameBusinessEntity : "-"}</Typography>
                  </TableCell>
                  <TableCell colSpan={2} style={{borderBottom: 'none'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>PENYEWA / PIHAK KEDUA</Typography>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>PT. BANK CIMB Niaga Tbk</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} style={{paddingTop: 20, borderBottom: 'none'}}>
                    <div  style={{paddingTop: 20,}} >&nbsp;</div>
                  </TableCell>
                </TableRow>
  
                <TableRow>
                  <TableCell style={{borderBottom: 'none', padding:'unset'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px'}}> 
                      <b>{dataRequest.landlordName ? dataRequest.landlordName : "-"}</b>
                    </Typography>
                  </TableCell>
                  <TableCell  style={{borderBottom: 'none', padding:'unset'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px'}}>{namaKaryawanPimpinan1}</Typography>
                  </TableCell>
                  <TableCell  style={{borderBottom: 'none', padding:'unset'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px'}}>{namaKaryawanPimpinan2}</Typography>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell style={{borderBottom: 'none', padding:'unset'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>Pemilik</Typography>
                  </TableCell>
                  <TableCell  style={{borderBottom: 'none', padding:'unset'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>Karyawan Pimpinan</Typography>
                  </TableCell>
                  <TableCell  style={{borderBottom: 'none'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>Karyawan Pimpinan</Typography>
                  </TableCell>
                </TableRow>
              </Table>

              <Grid item className={classes.deskripsiArea} style={{marginTop : 20}}>
                <Typography className={classes.deskripsiFooter}>
                  <b>PT. Bank CIMB Niaga, Tbk. </b><br />
                Griya Niaga 2 Lt 10 , Jl. Wahid Hasyim Blok B-4 No 3 Bintaro Sektor VII Tangerang 15224 
                Telp 299 72 400 Fax 7486 7959 SWIFT BNIAIDJA www.cimbniaga.com
                </Typography>
              </Grid>

              <Grid
                container
                justify="space-between"
                className={classes.buttonContainer}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    disableElevation
                    className={classes.secondaryButton}
                    onClick={handleClose}
                    style={{ textTransform: "capitalize" }}
                  >
                    Cancel
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.primaryButton}
                    onClick={handleSend}
                    style={{ textTransform: "capitalize" }}
                  >
                    Generate PDF & Send to Landlord
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Modal>
    </>
  );
};

export default ModalPksAddendum;
