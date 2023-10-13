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
import { Input, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import LoadingView from '../../Loading/LoadingView';
import constants from '../../../helpers/constants';
import Logo from '../../../assets/images/SideMenu/logo_cimb.png';
import DateSelect from '../../Selects/DateSelect';
import CommonSelect from '../../Selects/CommonSelect';
import Article from './article';
import getMinioFromUrl from '../../../helpers/getMinioFromUrl';
import { AdvancedSmallInput } from "../../chky/ChkyInputSmall";
import AutoCompleteTest from '../../Form/AutoComplete';
import { Dark } from '../../../assets/theme/colors';

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
  }
});

const DraftPKS = (props) => {
  const classes = useStyles();
  const { isOpen, handleClose, rowToShow } = props;
  const { Option } = Select;

  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isKecDisabled, setIsKecDisabled] = useState(true);
  const [isVillageDisabled, setIsVillageDisabled] = useState(true);
  const [letterNumber, setLetterNumber] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [managerName, setManagerName] = useState("");
  const [manager, setManager] = useState("");
  const [name, setName] = useState("");
  const [large, setLarge] = useState("");
  const [buildPlace, setBuildPlace] = useState("");
  const [buildName, setBuildName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [letterDay, setLetterDay] = useState("Senin");
  const [datePks, setDatePks] = useState(new Date());
  const [landLetterDate, setLandLetterDate] = useState(new Date());
  const [letterDate, setLetterDate] = useState('');
  const [letterPlace, setLetterPlace] = useState('');
  const [valueHakSertipikat, setValueHakSertipikat] = useState(" ");
  const [valueNomorSertipikat, setValueNomorSertipikat] = useState("");
  const [valueNamaSertipikat, setValueNamaSertipikat] = useState("");
  const [valueNomorSuratUkur, setValueNomorSuratUkur] = useState("");
  const [valueSeluasSuratUkur, setValueSeluasSuratUkur] = useState("");
  const [valueLuasBangunanSuratUkur, setValueLuasBangunanSuratUkur] = useState(
    ""
  );
  const [valueJalan, setValueJalan] = useState("");
  const [valueImbNomor, setValueImbNomor] = useState("");
  const [valueImbDate, setValueImbDate] = useState(new Date());
  const [valueNop, setValueNop] = useState("");
  const [citiesValue, setCitiesValue] = useState(" ");
  const [citiesName, setCitiesName] = useState("");
  const [kecamatanValue, setKecamatanValue] = useState(" ");
  const [kecamatanName, setKecamatanName] = useState("");
  const [villageValue, setVillageValue] = useState(" ");
  const [villageName, setVillageName] = useState("");
  // INIT DATA PASAL
  const [dataPasal, setDataPasal] = useState({
    startRentDate: null,
    endRentDate: null,
    rentYear: null,
    flatCost: null,
    yearlyRentCost: null,
    nameBank: null,
    noRekeningPic: null,
    nameRekeningPic: null,
    cityName: null,
    provinceName: null,
    nameLanlord: null,
    corporateAddressLanlord: null,
  });

  const [nameManagement, setNameManagement] = useState('');
  const [signatureManagement, setSignatureManagement] = useState(null);

  function getManagementSignature(signature){
    if(signature){
      getMinioFromUrl(signature)
        .then((res) => {
          setSignatureManagement(res.fileUrl);
        })
        .catch(() => {
        });
    } 
  };

  // console.log('props pks',props);

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

  const handleChangeDay = (value) => {
    // console.log(value, "DAY");
    setLetterDay(value);
  };

  const handleDatePks = (date) => {
    // const selectedPeriode = moment(date).format(dateFormat);
    setDatePks(date);
  };
  const handleLandLetterDate = (date) => {
    // const selectedPeriode = moment(date).format(dateFormat);
    setLandLetterDate(date);
  };
  
  useEffect(() => {
    // console.log("+++ datePks: ", datePks);
    // console.log("+++ datePks moment: ", moment(datePks).format("YYYY-MM-DD"));
    
  }, [datePks]);
  const handleChangeHakSertipikat = (value) => {
    // const {value} = e.target;
    setValueHakSertipikat(value);
  };

  const handleChangeNomorSertipikat = (e) => {
    const { value } = e.target;
    setValueNomorSertipikat(value);
  };

  const handleChangeNamaSertipikat = (e) => {
    const { value } = e.target;
    setValueNamaSertipikat(value);
  };

  const handleChangeNomorSuratUkur = (e) => {
    const { value } = e.target;
    setValueNomorSuratUkur(value);
  };

  const handleChangeSeluasSuratUkur = (e) => {
    const { value } = e.target;
    setValueSeluasSuratUkur(value);
  };

  const handleChangeLuasBangunanSuratUkur = (e) => {
    const { value } = e.target;
    setValueLuasBangunanSuratUkur(value);
  };

  const handleChangeKota = (event) => {
    if (event !== citiesValue) {
      const newObj = JSON.parse(event);
      setCitiesValue(newObj.value);
      setCitiesName(newObj.name);
    }
  };

  const handleChangeKecamatan = (event) => {
    if (event !== kecamatanValue) {
      const newObj = JSON.parse(event);
      setKecamatanValue(newObj.value);
      setKecamatanName(newObj.name);
    }
  };

  const handleChangeVillage = (event) => {
    if (event !== villageValue) {
      const newObj = JSON.parse(event);
      setVillageValue(newObj.value);
      setVillageName(newObj.name);
    }
  };

  const handleChangeJalan = (e) => {
    const { value } = e.target;
    setValueJalan(value);
  };

  const handleChangeImbNomor = (e) => {
    const { value } = e.target;
    setValueImbNomor(value);
  };

  const handleImbDate = (date) => {
    setValueImbDate(date);
  };

  const handleChangeNop = (e) => {
    const { value } = e.target;
    setValueNop(value);
  };

  // eslint-disable-next-line consistent-return
  const satuan = (suffix) => {
    if (suffix === "Meter")
      return (
        <Typography variant="caption">
          Meter <sup>2</sup>
        </Typography>
      );
  };

  useEffect(() => {
    if (isOpen === true) {
      const data = { id: rowToShow };
      const config = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      };
      try {
        setModalLoader(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getRequestDraftPks`,
            data,
            config
          )
          .then(async(res) => {
            const newData = res.data;
            const newRow = {
              letterNumber: newData.referencedNumber,
              managerName: newData.landlordName,
              nameBusinessEntity: newData.nameBusinessEntity,
              manager: newData.ownerPosition,
              name: newData.ownerName,
              large: newData.buildingLarge,
              buildPlace: newData.boothType,
              buildName: newData.buildingName,
              locationName: newData.locationName,
              sendTo: newData.sendTo,
              ownerInfo: newData.ownerInfo,
            };
            const dataPassal = {
              startRentDate: newData.startRentDate,
              endRentDate: newData.endRentDate,
              rentYear: newData.rentYear,
              flatCost: newData.flatCost,
              yearlyRentCost: newData.yearlyRentCost,
              nameBank: newData.bankName,
              noRekeningPic: newData.noRekeningPic,
              nameRekeningPic: newData.nameRekeningPic,
              cityName: newData.cityName,
              provinceName: newData.provinceName,
            };
            // console.log(newData);
            // console.log('Ini Data request Draft Renewal', res);
            const letterDateArr = newData.letterDate.split(',');
            setLetterPlace(letterDateArr[0]);
            setLetterDate(letterDateArr[1]);
            // ====> SET DATA PASAL <====
            setDataPasal(dataPassal);
            setLetterNumber(newRow.letterNumber);
            setLocation(newRow.locationName);
            // setCompany(newRow.company);
            setCompany(newRow.nameBusinessEntity);
            setManagerName(newRow.managerName);
            setManager(newRow.manager);
            setName(newRow.name);
            setLarge(newRow.large);
            setBuildPlace(newRow.buildPlace);
            setBuildName(newRow.buildName);
            setLocationName(newRow.locationName);
            setModalLoader(false);
            setNameManagement(newData.firstSigner);
            await getManagementSignature(newData.firstSignatureUrl);
            if (newData.statusCode === 404) {
              alert(newData.statusMessage);
            }
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

  // ============ FETCH DATA CITIES ============

  const [isCitiesLoader, setIsCitiesLoader] = useState(false);
  const [dataCities, setDataCities] = useState([]);
  const dataCitiesToSet = [];
  const fetchDataCities = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setIsCitiesLoader(true);
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getCities`,
        config
      );
      try {
        const dataPre = result.data.data;
        // console.log(
        //   `<<< CEKPoint C dataCities => ${JSON.stringify(dataPre)}`
        // );
        dataPre.map((item) => {
          const newRow = {
            id: item.id,
            name: item.name,
          };
          dataCitiesToSet.push(newRow);
        });
      } catch (error) {
        setIsCitiesLoader(false);
        alert(`Error Refactor Data dataCities Select...! \n ${error}`);
      }
      setDataCities(dataCitiesToSet);
      setIsCitiesLoader(false);
    } catch (err) {
      alert(`Error Fetching Data dataCities Select...! \n${err}`);
      setIsCitiesLoader(false);
    }
  };

  useEffect(() => {
    fetchDataCities();
  }, []);

  useEffect(() => {
    // console.log(`DATA CITY ${JSON.stringify(dataCities)}`);
  }, [dataCities]);

  // ============ END FETCH DATA CITIES ============

  // ============ FETCH DATA CITIES ============

  const [isKecamatanLoader, setIsKecamatanLoader] = useState(false);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  useEffect(() => {
    const dataKecamatanToSet = [];
    const fetchDataKecamatan = async () => {
      // console.log(`<<< CEKPoint A dataKecamatan`);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      try {
        setIsKecamatanLoader(true);
        const result = await axios.get(
          `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/districtByCity?cityId=${citiesValue}`,
          config
        );
        // console.log(`<<< CEKPoint B dataKecamatan =>${JSON.stringify(result)}`);
        // reconstruct data from DB to dataKecamatan
        try {
          const dataPre = result.data.data;
          // console.log(
          //   `<<< CEKPoint C dataKecamatan => ${JSON.stringify(dataPre)}`
          // );
          dataPre.map((item) => {
            const newRow = {
              id: item.id,
              name: item.name,
            };
            dataKecamatanToSet.push(newRow);
          });
        } catch (error) {
          setIsKecamatanLoader(false);
          alert(`Error Refactor Data dataKecamatan Select...! \n ${error}`);
        }
        setDataKecamatan(dataKecamatanToSet);
        setIsKecamatanLoader(false);
      } catch (err) {
        alert(`Error Fetching Data dataKecamatan Select...! \n${err}`);
        setIsKecamatanLoader(false);
      }
    };
    if (citiesValue !== " ") {
      fetchDataKecamatan();
      setIsKecDisabled(false);
    }
  }, [citiesValue]);

  // ============ END FETCH DATA KECAMATAN ============

  // ============ FETCH DATA VILLAGE ============

  const [isVillageLoader, setIsVillageLoader] = useState(false);
  const [dataVillage, setDataVillage] = useState([]);
  useEffect(() => {
    const dataVillageToSet = [];
    const fetchDataVillage = async () => {
      // console.log(`<<< CEKPoint A dataVillage`);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      try {
        // setIsVillageLoader(true);
        const result = await axios.get(
          `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/villageByDistrict?districtId=${kecamatanValue}`,
          config
        );
        // console.log(`<<< CEKPoint B dataVillage =>${JSON.stringify(result)}`);
        // reconstruct data from DB to dataVillage
        try {
          const dataPre = result.data.data;
          // console.log(
          //   `<<< CEKPoint C dataVillage => ${JSON.stringify(dataPre)}`
          // );
          dataPre.map((item) => {
            const newRow = {
              id: item.id,
              name: item.name,
            };
            dataVillageToSet.push(newRow);
          });
        } catch (error) {
          setIsVillageLoader(false);
          alert(`Error Refactor Data dataVillage Select...! \n ${error}`);
        }
        setDataVillage(dataVillageToSet);
        setIsVillageLoader(false);
      } catch (err) {
        alert(`Error Fetching Data dataVillage Select...! \n${err}`);
        setIsVillageLoader(false);
      }
    };
    if (kecamatanValue !== " ") {
      fetchDataVillage();
      setIsVillageDisabled(false);
    }
  }, [kecamatanValue]);

  // ============ END FETCH DATA VILLAGE ============

  const data = {
    id: rowToShow,
    referencedNumber: letterNumber,
    sendTo: company,
    nameBusinessEntity: company,
    locationName,
    landlordName: managerName,
    ownerName: name,
    ownerInfo: manager,
    ownerPosition: manager,
    buildingLarge: large,
    buildingName: buildName,
    boothType: buildPlace,
    letterDay,
    letterDate: `${letterPlace},${letterDate}`,
    letterDate2: moment(datePks).format("YYYY-MM-DD"),
    ownershipType: valueHakSertipikat,
    ownershipNumber: valueNomorSertipikat,
    ownershipName: valueNamaSertipikat,
    landLetterNumber: valueNomorSuratUkur,
    landLetterDate: moment(landLetterDate).format("YYYY-MM-DD"),
    landLetterArea: valueSeluasSuratUkur,
    landLetterBuildingArea: valueLuasBangunanSuratUkur,
    // city: citiesValue,
    city: citiesName,
    // district: kecamatanValue,
    district: kecamatanName,
    // subDistrict: villageValue,
    subDistrict: villageName,
    address: valueJalan,
    imbNumber: valueImbNomor,
    imbDate: moment(valueImbDate).format("YYYY-MM-DD"),
    nop: valueNop,
    // ===== TAMBAHAN DATA PASAL =====
    startRentDate: dataPasal.startRentDate,
    endRentDate: dataPasal.endRentDate,
    bankName: dataPasal.nameBank,
    noRekeningPic: dataPasal.noRekeningPic,
    nameRekeningPic: dataPasal.nameRekeningPic,
    nameLanlord: managerName,
    rentYear: dataPasal.rentYear,
    yearlyRentCost: dataPasal.yearlyRentCost,
    cityName: dataPasal.cityName,
    provinceName: dataPasal.provinceName,
    corporateAddressLanlord: dataPasal.corporateAddressLanlord,
  };
  const handleSend = () => {
    // console.log("REQ DATA NEW LOI",data);
    const config = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      setModalLoader(true);
      axios
        .post(
          `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/sendDraftPks`,
          data,
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

  const [displayValue, setDisplayValue] = useState("none");
  const displayDifHide = { display: displayValue };

  function showHideHistory() {
    if (displayValue === "none") {
      setDisplayValue("block");
    } else {
      setDisplayValue("none");
    }
  }

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
              <Grid item className={classes.judulArea}>
                <Typography
                  align="center"
                  style={{ fontWeight: "bold", fontSize: 13 }}
                >
                  PERJANJIAN SEWA MENYEWA <br />
                  RUANG ATM BANK CIMB NIAGA DI{" "}
                  {isEmpty(location) ? "-" : location}
                </Typography>
              </Grid>
              <Grid item className={classes.keteranganArea}>
                <Grid container style={{justifyContent: 'center'}}>
                  <Grid item>
                    <Typography style={{ fontSize: 13, fontWeight: 300}}>
                      <b>{isEmpty(letterNumber) ? "No. -" : letterNumber}</b>
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
                        value={letterDay}
                        width="140px"
                        handleChange={handleChangeDay}
                        color={constants.color.dark}
                      />
                    </div>
                    {' '} tanggal {' '}
                    <div className={classes.datePksWrapper}>
                      <DateSelect
                        value={datePks}
                        handleChange={handleDatePks}
                        width="140px"
                        popupStyle={{ zIndex: 1700 }}
                        formatView="DD MMM YYYY"
                      />
                    </div>
                    {' '}yang bertanda tangan di  bawah ini  :
                  </Typography>
                </Grid>
              </Grid>
              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  <b>I. LOKASI/ PT {isEmpty(company) ? "-" : company}</b>{" "}
                  <br />
                  Dalam hal ini diwakili oleh{" "}
                  <AdvancedSmallInput stateVar={managerName} stateModifier={setManagerName}/>{' '}
                  selaku <b>{isEmpty(manager) ? "-" : manager}</b>, dari
                  dan karenanya bertindak untuk dan atas nama{" "}
                  <b>{isEmpty(company) ? "-" : company}</b>, yang berkedudukan di{" "}
                  <b>{isEmpty(location) ? "-" : location}</b>, selanjutnya
                  disebut <b>"PEMILIK/ PIHAK PERTAMA".</b>
                </Typography>
              </Grid>
              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  <b>II. PT. BANK CIMB NIAGA Tbk,</b>
                  <br />
                  perseroan terbatas, berkedudukan di Jakarta Selatan, berkantor pusat di Graha CIMB Niaga lantai 15, Jl. Jenderal Sudirman Kav. 58, Jakarta 12190,  yang didirikan berdasarkan hukum Republik Indonesia yang Anggaran Dasarnya telah diumumkan dalam Berita Negara Republik Indonesia tanggal 4 September tahun 1956 nomor 71, Tambahan nomor 729/1956, anggaran dasar tersebut telah beberapa kali mengalami perubahan dan terakhir telah diubah dengan akta No. 49 tanggal 24 April 2018, dibuat di hadapan Ashoya Ratam, SH, MKN, Notaris di Jakarta, yang telah memperoleh persetujan dari Menteri Hukum dan Hak Asasi Manusia Republik Indonesia sebagaimana ternyata dari Surat Keputusan No.AHU-AHA 01.03-0169812 tanggal 28 April 2018, dalam hal ini diwakili oleh  {' '}
                  <b>{namaKaryawanPimpinan1}</b> dan <b>{namaKaryawanPimpinan2}</b>, 
                  masing-masing selaku Karyawan Pimpinan PT. BANK CIMB NIAGA Tbk yang dalam hal ini bertindak berturut-turut berdasarkan Surat Kuasa No. 667 – tertanggal 15 November 2019 dan karenanya bertindak mewakili Direksi dengan demikian sah mewakili  PT. BANK CIMB NIAGA Tbk, selanjutnya disebut {' '}
                  <b>"PENYEWA / PIHAK KEDUA"</b>
                </Typography>
              </Grid>

              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  PEMILIK dan PENYEWA secara sendiri-sendiri disebut "Pihak" dan
                  secara bersama-sama disebut "Para Pihak".
                  Para Pihak dengan ini terlebih dahulu menerangkan hal-hal
                  sebagai berikut :
                </Typography>
              </Grid>

              <Grid
                container
                direction="column"
                className={classes.wrapperArea}
                spacing={2}
              >
                <Grid item xs={12}>
                  <Typography className={classes.headingInput}>
                    Bahwa Pihak Pertama adalah pemilik tanah berdasarkan
                    Sertipikat
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={3}>
                      <Typography className={classes.labelInput}>
                        Hak :
                      </Typography>
                      <Input
                        className={classes.inputForm}
                        value={valueHakSertipikat}
                        width="140px"
                        onChange={(e)=>handleChangeHakSertipikat(e.target.value)}
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.labelInput}>
                        Nomor :
                      </Typography>
                      <Input
                        className={classes.inputForm}
                        value={valueNomorSertipikat}
                        onChange={handleChangeNomorSertipikat}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.labelInput}>
                        Terdaftar Atas Nama :
                      </Typography>
                      <Input
                        className={classes.inputForm}
                        value={valueNamaSertipikat}
                        onChange={handleChangeNamaSertipikat}
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container className={classes.wrapperArea}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={3}>
                    <Typography className={classes.labelInput}>
                      Nomor Surat Ukur :
                    </Typography>
                    <Input
                      className={classes.inputForm}
                      value={valueNomorSuratUkur}
                      onChange={handleChangeNomorSuratUkur}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.labelInput}>
                      Tanggal :
                    </Typography>
                    <DateSelect
                      value={landLetterDate}
                      handleChange={handleLandLetterDate}
                      width="140px"
                      popupStyle={{ zIndex: 1700 }}
                      formatView="DD MMM YYYY"
                    />
                  </Grid>
                  <Grid item xs={2} style={{ marginRight: 9 }}>
                    <Typography className={classes.labelInput}>
                      Seluas :
                    </Typography>
                    <Input
                      style={{ width: 95, marginRight: 9 }}
                      className={classes.inputForm}
                      value={valueSeluasSuratUkur}
                      onChange={handleChangeSeluasSuratUkur}
                      type="number"
                      suffix={satuan("Meter")}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.labelInput}>
                      Luas Bangunan :
                    </Typography>
                    <Input
                      style={{ width: 95 }}
                      className={classes.inputForm}
                      value={valueLuasBangunanSuratUkur}
                      onChange={handleChangeLuasBangunanSuratUkur}
                      type="number"
                      suffix={satuan("Meter")}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container className={classes.wrapperArea} spacing={2}>
                <Grid item xs={12}>
                  <Typography className={classes.headingInput}>
                    Terletak Di
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Grid item>
                    <Typography className={classes.labelInput}>
                      Kota :
                    </Typography>
                  </Grid>
                  <Grid item className={classes.selectRegion}>
                    <AutoCompleteTest
                      placeholder="Nama Kota"
                      setNilai={setCitiesName}
                      setNilaiId={setCitiesValue}
                      value={citiesName}
                      fieldName="namaKota"
                      keywordMaxLenght={30}
                      dropdownClassName={classes.dropdownClassName}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid item>
                    <Typography className={classes.labelInput}>
                      Kecamatan :
                    </Typography>
                  </Grid>
                  <Grid item className={classes.selectRegion}>
                    <Select
                      style={{ width: 140 }}
                      className={classes.option}
                      defaultValue={kecamatanValue}
                      bordered
                      disabled={isKecDisabled}
                      onChange={(event) => handleChangeKecamatan(event)}
                      getPopupContainer={(trigger) => trigger.parentNode}
                    >
                      <Option value=" ">Pilih Kecamatan</Option>
                      {dataKecamatan.map((kecamatan) => (
                        // <Option key={kecamatan.id} value={kecamatan.id}>
                        <Option key={kecamatan.id} value={JSON.stringify({name: kecamatan.name, value:kecamatan.id})}>
                          {kecamatan.name}
                        </Option>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
                <Grid item xs={3} className={classes.selectRegion}>
                  <Grid item>
                    <Typography className={classes.labelInput}>
                      Kelurahan :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Select
                      style={{ width: 140 }}
                      className={classes.option}
                      defaultValue={villageValue}
                      bordered
                      disabled={isVillageDisabled}
                      onChange={(event) => handleChangeVillage(event)}
                      getPopupContainer={(trigger) => trigger.parentNode}
                    >
                      <Option value=" ">Pilih Kelurahan</Option>
                      {dataVillage.map((village) => (
                        // <Option key={village.id} value={village.id}>
                        <Option key={village.id} value={JSON.stringify({name: village.name, value:village.id})}>
                          {village.name}
                        </Option>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid item>
                    <Typography className={classes.labelInput}>
                      Jalan :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Input
                      className={classes.inputForm}
                      value={valueJalan}
                      onChange={handleChangeJalan}
                      type="text"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container className={classes.wrapperArea} spacing={2}>
                <Grid item xs={12}>
                  <Typography className={classes.headingInput}>
                    Berdasarkan Surat Ijin Mendirikan Bangunan
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Grid item>
                    <Typography className={classes.labelInput}>
                      IMB nomor :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Input
                      className={classes.inputForm}
                      value={valueImbNomor}
                      onChange={handleChangeImbNomor}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid item>
                    <Typography className={classes.labelInput}>
                      Tanggal :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <DateSelect
                      value={valueImbDate}
                      handleChange={handleImbDate}
                      width="140px"
                      popupStyle={{ zIndex: 1700 }}
                      formatView="DD MMM YYYY"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container className={classes.wrapperArea} spacing={2}>
                <Grid item xs={12}>
                  <Typography className={classes.headingInput}>
                    Surat Pemberitahuan Pajak Terhutang Pajak Bumi dan Bangunan
                    (SPPT-PBB) dengan Nomor Objek Pajak
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Grid item>
                    <Typography className={classes.labelInput}>
                      NOP :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Input
                      className={classes.inputForm}
                      value={valueNop}
                      onChange={handleChangeNop}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  Bahwa PEMILIK setuju untuk menyewakan kepada PENYEWA dan
                  PENYEWA setuju menyewa ruangan seluas{" "}
                  <b>{isEmpty(large) ? "-" : large}</b> meter yang terletak di{" "}
                  <b>{buildPlace}</b> Gedung{" "}
                  <b>{isEmpty(buildName) ? "-" : buildName}</b> tersebut
                  diatas selanjutnya disebut <b>"RUANGAN SEWA"</b>.
                </Typography>
              </Grid>
              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  Selanjutnya Para Pihak sepakat bahwa Perjanjian Sewa Menyewa
                  Ruang ATM Bank CIMB Niaga di{" "}
                  <b>{isEmpty(locationName) ? "-" : locationName}</b>{" "}
                  (selanjutnya disebut <b>"Perjanjian"</b>) ini dilangsungkan dan
                  diterima oleh kedua belah pihak dengan syarat - syarat dan
                  ketentuan - ketentuan sebagai berikut :
                </Typography>
              </Grid>

              <Grid item style={displayDifHide}>
                <Article data={dataPasal} managerName={managerName} company={company} />
              </Grid>

              <Grid
                item
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  color: "#DC241F",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                <Typography
                  onClick={() => {
                    showHideHistory();
                  }}
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    color: "#DC241F",
                    fontSize: 16,
                  }}
                >
                  Lihat Pasal
                </Typography>
              </Grid>

              <div>
                Demikian  Perjanjian ini,  dibuat  dalam rangkap 2 (dua)  bermeterai cukup  dan mempunyai kekuatan hukum yang sama,  masing-masing  pihak  memperoleh  1 (satu) eksemplar.
              </div>
              <br></br>
              <Table size="small">
                <TableRow>
                  <TableCell style={{borderBottom: 'none'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>PEMILIK / PIHAK PERTAMA</Typography>
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
                    <Typography style={{textAlign: 'center', fontSize: '13px'}}>{managerName}</Typography>
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

              {/* <Grid
                container
                justify="space-between"
                className={classes.areaTandaTangan}
              >
                <Grid item style={{display: 'flex'}}>
                  <Grid container direction='column' justify='space-between'>
                    <Grid item>
                      <Typography style={{textAlign: 'center', fontSize: '13px', fontWeight: 700}}>PEMILIK / PIHAK PERTAMA</Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{ textAlign: 'center' }}>
                        {managerName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography style={{textAlign: 'center', fontSize: '13px', fontWeight: 400}}>PT. BANK CIMB Niaga Tbk</Typography>
                  <img src={signatureManagement} style={{width: '132px', height: '55px', marginBottom: '10px', marginLeft: '40px', marginTop: '20px'}}/>
                  <Typography style={{ textAlign: 'center' }}>
                    {nameManagement} <br />
                    <b>Head ATM Site Management Support</b>
                  </Typography>
                </Grid>
              </Grid> */}
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

export default DraftPKS;

const namaKaryawanPimpinan1 = 'Trisna Lucia Mauliaty Siahaan'
const namaKaryawanPimpinan2 = 'Moudy Yuanita Massie'