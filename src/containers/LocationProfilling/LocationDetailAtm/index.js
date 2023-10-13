/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-alert */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Box,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/styles";
import * as Colors from "../../../assets/theme/colors";
import {
  ChkyInputSmall,
  ChkyMultipleSelect,
  ChkySelectInput,
  ChkyTimePickerAmPm,
  ChkyAutocomplete,
} from "../../../components";
import ChkyTabsAsOption from "../ChkyTabsAsOption";
import { ReactComponent as DefUploadImageSvg } from "../../../assets/icons/general/def_upload.svg";
import Axios from "axios";
import ModalLoader from "../../../components/ModalLoader";
import ErrorComponent from "../ErrorComponent";
import { dataRuangAtm, dataTypeLokasi, jensKomList } from '../../../helpers/constants';

const useStyles = makeStyles({
  root: {
    padding: "20px 18px",
    borderRadius: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 10,
  },
  subsubTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  luasArea: {
    borderRadius: 6,
    border: "1px solid #E6EAF3",
    overflow: "hidden",
    textAlign: "center",
    alignItems: "center",
    height: 40,
  },
  numberInput: {
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: "center",
    fontSize: 15,
  },
  satuan: {
    backgroundColor: Colors.GraySoft,
    color: Colors.GrayHard,
    fontWeight: 500,
    borderLeft: `2px solid ${Colors.GrayMedium}`,
    fontSize: 15,
    height: "100%",
  },
  margin5px: {
    marginBottom: 5,
  },
  margin10px: {
    marginBottom: 10,
  },
  imageUploadContainer: {
    position: "relative",
    width: "90%",
  },
  imgDefault: {
    cursor: "pointer",
  },
  resetImage: {
    position: "absolute",
    top: -10,
    right: -10,
  },
});

const DeleteIconButton = withStyles(() => ({
  root: {
    backgroundColor: "#DC241F75",
    color: "#fff",
    "&:hover": {
      color: "#DC241F",
      backgroundColor: "#fff8f8cc",
    },
  },
}))(IconButton);

let photoPosisiMesinNoR = null,
  photoTampakMukaNoR = null,
  photoPosisiNeonNoR = null,
  photoPosisiAntenaNoR = null,
  photoLayoutNoR = null;

let photoMachinePath = "",
  photoFrontPath = "",
  photoNeonPath = "",
  photoAntenaPath = "",
  photoLayoutPath = "";

let tipeLokasiNoR = "-",
  boothTypeNoR = "-",
  buildingLargeNoR = "",
  aksesUmumNoR = "Tidak",
  aksesUmumTabNoR = 1,
  mediaPromosiNoR = [],
  atmBankLainNoR = [],
  valueAtmBankLainNoR = [],
  noteAksesUmumNoR = "",
  startTimeNoR = "",
  startTimeNoRCheck = "",
  endTimeNoR = "",
  endTimeNoRCheck = "",
  denomNoR = "-",
  acNoR = "- Include / Exclude -",
  kebersihanNoR = "- Include / Exclude -",
  jenisKomNoR = "- Pilih Jenis Komunikasi -",
  noteMediaPromNoR = "",
  promotionMedia = {
    "Signage / Pole Sign": false,
    "Flag Mounted": false,
    "Standart Booth": false,
    "Sticker Pintu": false,
    "Lain-lain": false,
  },
  otherBanks = null,
  amPmStart = 0,
  amPmEnd = 0,
  countImg1 = 0,
  countImg2 = 0,
  countImg3 = 0,
  countImg4 = 0,
  countImg5 = 0;

const itemList = [
  { title: "BANK BRI", code: "002" },
  { title: "BANK BCA", code: "014" },
  { title: "BANK MANDIRI", code: "008" },
  { title: "BANK BNI", code: "009" },
  { title: "BANK BNI SYARIAH", code: "427" },
  { title: "BANK SYARIAH MANDIRI (BSM)", code: "451" },
  { title: "BANK CIMB NIAGA", code: "022" },
  { title: "BANK CIMB NIAGA SYARIAH", code: "022" },
  { title: "BANK MUAMALAT", code: "147" },
  { title: "BANK BTPN", code: "213" },
  { title: "BANK BTPN SYARIAH", code: "547" },
  { title: "BANK PERMATA", code: "013" },
  { title: "BANK PERMATA SYARIAH", code: "013" },
  { title: "BANK DBS INDONESIA", code: "046" },
  { title: "DIGIBANK", code: "046" },
  { title: "BANK BRI SYARIAH", code: "422" },
  { title: "BANK BTN", code: "200" },
  { title: "BANK DANAMON", code: "011" },
  { title: "BANK MAYBANK (BII)", code: "016" },
  { title: "BANK MEGA", code: "426" },
  { title: "BANK SINARMAS", code: "153" },
  { title: "BANK COMMONWEALTH", code: "950" },
  { title: "BANK OCBC NISP", code: "028" },
  { title: "BANK BUKOPIN", code: "441" },
  { title: "BANK BUKOPIN SYARIAH", code: "521" },
  { title: "BANK BCA SYARIAH", code: "536" },
  { title: "BANK LIPPO", code: "026" },
  { title: "CITIBANK", code: "031" },
];

const LocationDetailAtm = (props) => {
  const classes = useStyles();
  const { onChangeData, errorForm, dataValue } = props;

  const [aksesUmumTab, setAksesUmumTab] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line no-console
    // console.log(`Nilai aksesUmum: ${aksesUmum}`);
  }, [aksesUmum]);

  const [tipeLokasi, setTipeLokasi] = useState(""),
    [boothType, setBoothType] = useState(""),
    [buildingLarge, setBuildingLarge] = useState(""),
    [aksesUmum, setAksesUmum] = useState("Tidak"),
    [mediaPromosi, setMediaPromosi] = useState([]),
    [atmBankLain, setATMBankLain] = useState([]),
    [noteAksesUmum, setNoteAksesUmum] = useState(""),
    [startTime, setStartTime] = useState(""),
    [endTime, setEndTime] = useState(""),
    [denom, setDenom] = useState(""),
    [ac, setAc] = useState(""),
    [kebersihan, setKebersihan] = useState(""),
    [jenisKom, setJenisKom] = useState(""),
    [noteMediaProm, setNoteMediaProm] = useState("");

  const [locationMachinePhotos, setLocationMachinePhotos] = useState("");
  const [frontPhoto, setFrontPhoto] = useState("");
  const [neonPhoto, setNeonPhoto] = useState("");
  const [antenaPhoto, setAntenaPhoto] = useState("");
  const [layoutPhoto, setLayoutPhoto] = useState("");

  const [isStartTime, setIsStartTime] = useState(false);
  const [isEndTime, setIsEndTime] = useState(false);

  function convertArrayObjToArrayStringATMBankList(data) {
    var newArr = [];
    data.map((item) => {
      newArr.push(item.title);
    });
  // console.log("new arr atm bank", newArr);
    return newArr;
  }

  function getDenom(denom) {
    var newDenom = "-";
    if (denom.includes("100")) {
      newDenom = "100";
    } else if (denom.includes("50")) {
      newDenom = "50";
    } else if (denom.includes("Multi Denom")) {
      newDenom = "Multi Denom";
    }
    return newDenom;
  }

  const newHandleDataDetailATM = (data, keyData) => {
    var newDataDetailATM = {
      ...dataValue,
      [keyData]: data,
    };
    onChangeData(newDataDetailATM);
  };

  const handleTipeLokasi = (e) => {
      newHandleDataDetailATM(e, "locationType");
    },
    handleBoothType = (e) => {
      newHandleDataDetailATM(e, "boothType");
    },
    handleMediaPromosi = (e) => {
      newHandleDataDetailATM(e, "mediaPromotion");
    },
    handleAtmBankLain = (e, newValue) => {
      let newArr = convertArrayObjToArrayStringATMBankList(newValue);
      var newDataDetailATM = {
        ...dataValue,
        aroundAtmBank: newValue,
        aroundAtmBankList: newArr,
      };
      onChangeData(newDataDetailATM);
      setATMBankLain(e);
      atmBankLainNoR = e;
      valueAtmBankLainNoR = newValue;
    },
    handleNoteAkses = (e) => {
      newHandleDataDetailATM(e.target.value, "publicAccessibilityNote");
    },
    handleSelectedAksesUmumTab = (newValue) => {
      setAksesUmumTab(newValue);
      aksesUmumTabNoR = newValue;
      var publicAccessibility = "";
      if (newValue === 0) {
        setAksesUmum("Ya");
        aksesUmumNoR = "Ya";
        publicAccessibility = "Ya";
      }
      if (newValue === 1) {
        setAksesUmum("Tidak");
        aksesUmumNoR = "Tidak";
        publicAccessibility = "Tidak";
      }
      newHandleDataDetailATM(publicAccessibility, "publicAccessibility");
    },
    handleStartTime = (e) => {
    // console.log("handle start time", e);
      newHandleDataDetailATM(e, "startWorkHour");
    },
    handleEndTime = (e) => {
      newHandleDataDetailATM(e, "endWorkHour");
    },
    handleDenom = (e) => {
      newHandleDataDetailATM(e, "denom");
    },
    handleAC = (e) => {
      newHandleDataDetailATM(e, "acType");
    },
    handleKebersihan = (e) => {
      newHandleDataDetailATM(e, "cleanType");
    },
    handleJenisKom = (e) => {
      newHandleDataDetailATM(e, "commType");
    },
    handleNoteMediaProm = (e) => {
      newHandleDataDetailATM(e.target.value, "mediaPromotionNote");
    };

  function onChange(e) {
    // const re = /^[0-9\b]+$/;
    const noAlph = /^[0-9,]+$/;
    // if (e.target.value === "" || noAlph.test(e.target.value)) {
    newHandleDataDetailATM(e.target.value, "buildingLarge");
  }

  //* ***************************************************************************************************************************************************************

  let fileInput1 = React.createRef(),
    fileInput2 = React.createRef(),
    fileInput3 = React.createRef(),
    fileInput4 = React.createRef(),
    fileInput5 = React.createRef();

  // UPLOAD FOTO photoPosisiMesin
  const [photoPosisiMesin, setPhotoPosisiMesin] = useState(null);
  function handleUploadPosisiMesin(event) {
    event.preventDefault();
    // setPhotoPosisiMesin(URL.createObjectURL(event.target.files[0]));
    setPhotoPosisiMesin(event.target.files[0]);
    photoPosisiMesinNoR = event.target.files[0];
  }

  useEffect(() => {
    if (photoPosisiMesin) {
      handleUpload(photoPosisiMesin, "machine");
      // console.log("Photo Mesin : ", photoPosisiMesin);
    }
  }, [photoPosisiMesin]);

  // UPLOAD FOTO photoTampakMuka
  const [photoTampakMuka, setPhotoTampakMuka] = useState(null);
  function handleUploadTampakMuka(event) {
    event.preventDefault();
    // setPhotoTampakMuka(URL.createObjectURL(event.target.files[0]));
    setPhotoTampakMuka(event.target.files[0]);
    photoTampakMukaNoR = event.target.files[0];
  }

  useEffect(() => {
    if (photoTampakMuka) {
      handleUpload(photoTampakMuka, "front");
      // console.log("Photo Tampak Muka : ", photoTampakMuka);
    }
  }, [photoTampakMuka]);

  // UPLOAD FOTO photoPosisiNeon
  const [photoPosisiNeon, setPhotoPosisiNeon] = useState(null);
  function handleUploadPosisiNeon(event) {
    // setPhotoPosisiNeon(URL.createObjectURL(event.target.files[0]));
    setPhotoPosisiNeon(event.target.files[0]);
    photoPosisiNeonNoR = event.target.files[0];
  }

  useEffect(() => {
    if (photoPosisiNeon) {
      handleUpload(photoPosisiNeon, "neon");
      // console.log("Photo Tampak Muka : ", photoPosisiNeon);
    }
  }, [photoPosisiNeon]);

  // UPLOAD FOTO photoPosisiAntena
  const [photoPosisiAntena, setPhotoPosisiAntena] = useState(null);
  function handleUploadPosisiAntena(event) {
    // setPhotoPosisiAntena(URL.createObjectURL(event.target.files[0]));
    setPhotoPosisiAntena(event.target.files[0]);
    photoPosisiAntenaNoR = event.target.files[0];
  }

  useEffect(() => {
    if (photoPosisiAntena) {
      handleUpload(photoPosisiAntena, "antena");
      // console.log("Photo Tampak Muka : ", photoPosisiAntena);
    }
  }, [photoPosisiAntena]);

  // UPLOAD FOTO photoPosisiAntena
  const [photoLayout, setPhotoLayout] = useState(null);
  function handleUploadLayout(event) {
    // setPhotoPosisiAntena(URL.createObjectURL(event.target.files[0]));
    setPhotoLayout(event.target.files[0]);
    photoLayoutNoR = event.target.files[0];
  }

  useEffect(() => {
    if (photoLayout) {
      handleUpload(photoLayout, "layout");
      // console.log("Photo Tampak Muka : ", photoPosisiAntena);
    }
  }, [photoLayout]);

  const [isOpenModalLoader, setModalLoader] = useState(false);

  useEffect(() => {
    // console.log("PATH PHOTO MACHINE : ", locationMachinePhotos);
    // console.log("PATH PHOTO TAMPAK MUKA : ", frontPhoto);
    // console.log("PATH PHOTO NEON : ", neonPhoto);
    // console.log("PATH PHOTO ANTENA : ", antenaPhoto);
  }, [locationMachinePhotos, frontPhoto, neonPhoto, antenaPhoto]);

  const handleUpload = (file, type) => {
    setModalLoader(true);
    const formData = new FormData();
    formData.append("file", file);
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/uploadPhoto`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        // console.log("data res", res);
        if (res.status === 200) {
          if (res.data.responseCode === "00") {
            if (type === "machine") {
              setLocationMachinePhotos(res.data.path);
              newHandleDataDetailATM(res.data.path, "locationMachinePhotos");
              photoMachinePath = res.data.path;
            }
            if (type === "front") {
              newHandleDataDetailATM(
                res.data.path,
                "locationFrontMachinePhoto"
              );
              setFrontPhoto(res.data.path);
              photoFrontPath = res.data.path;
            }
            if (type === "neon") {
              newHandleDataDetailATM(
                res.data.path,
                "locationPhotosPositionNeonSign"
              );
              setNeonPhoto(res.data.path);
              photoNeonPath = res.data.path;
            }
            if (type === "antena") {
              newHandleDataDetailATM(
                res.data.path,
                "locationPhotosPositionAtenaVsat"
              );
              setAntenaPhoto(res.data.path);
              photoAntenaPath = res.data.path;
            }
            if (type === "layout") {
              newHandleDataDetailATM(
                res.data.path,
                "locationPhotosLayout"
              );
              setLayoutPhoto(res.data.path);
              photoLayoutPath = res.data.path;
            }
          } else {
            alert(res.data.responseMessage);
          }
        }
        // console.log("Data", res.data);
        setModalLoader(false);
      })
      .catch((err) => {
        alert(`Failed to upload picture ${err}`);
        // console.log(err);
        // console.log("Form Data", formData);
        setModalLoader(false);
      });
  };

  useEffect(() => {
    // console.log("Start time : ", startTimeNoR);
    // console.log("Start time Real : ", startTime);
  }, [startTimeNoR, startTime]);

  //*************************** MINIO *****************************//
  const [dataImage, setDataImage] = useState(null),
    [dataImage2, setDataImage2] = useState(null),
    [dataImage3, setDataImage3] = useState(null),
    [dataImage4, setDataImage4] = useState(null),
    [dataImage5, setDataImage5] = useState(null);

  const [imageMachinePosition, setMachinePosition] = useState(null),
    [imageFront, setImageFront] = useState(null),
    [imageNeonPosition, setNeonPosition] = useState(null),
    [imageAntenaPosition, setAntenaPosition] = useState(null),
    [imageLayout, setImageLayout] = useState(null);

  useEffect(() => {
    setMachinePosition(dataValue.locationMachinePhotos || null);
    setImageFront(dataValue.locationFrontMachinePhoto || null);
    setNeonPosition(dataValue.locationPhotosPositionNeonSign || null);
    setAntenaPosition(dataValue.locationPhotosPositionAtenaVsat || null);
    setImageLayout(dataValue.locationPhotosLayout || null);

    dataValue.mediaPromotion.map((item) => {
      promotionMedia[item] = true;
    });
    return () => {
      photoPosisiAntenaNoR = null;
      photoLayoutNoR = null;
      photoPosisiMesinNoR = null;
      photoPosisiNeonNoR = null;
      photoTampakMukaNoR = null;
      promotionMedia = {
        "Signage / Pole Sign": false,
        "Flag Mounted": false,
        "Standart Booth": false,
        "Sticker Pintu": false,
        "Lain-lain": false,
      };
    };
  }, []);

  useEffect(() => {
  // console.log("SIMBA ===> ", photoPosisiMesinNoR);
  }, [photoPosisiMesinNoR]);

  var Minio = require("minio");
  var prepareData = [],
    prepareData2 = [],
    prepareData3 = [],
    prepareData4 = [],
    prepareData5 = [];

  var minioClient = new Minio.Client({
    endPoint: `${process.env.REACT_APP_MINIO_URL}`,
    useSSL: true,
    accessKey: `${process.env.REACT_APP_MINIO_ACCESS_KEY}`,
    secretKey:
      process.env.REACT_APP_MINIO_SECRET_KEY === "IstuatATM"
        ? "IstuatATM$14b"
        : process.env.REACT_APP_MINIO_SECRET_KEY,
  });

  useEffect(() => {
    minioClient.presignedUrl(
      "GET",
      "project",
      // "atm_bussiness/public/opening/location_photo/id.PNG",
      imageMachinePosition,
      24 * 60 * 60,
      function (err, presignedUrl) {
        if (err) return console.log(err);
      // console.log("Pre Design 1 ===> ", presignedUrl);
        prepareData.push(presignedUrl);
        if (imageMachinePosition !== null) {
          if (countImg1 === 0) {
            photoPosisiMesinNoR = prepareData;
          }
          setDataImage(prepareData);
        }
      }
    );
  }, [imageMachinePosition]);

  useEffect(() => {
    minioClient.presignedUrl(
      "GET",
      "project",
      imageFront,
      24 * 60 * 60,
      function (err, presignedUrl) {
        if (err) return console.log(err);
        // console.log("Pre Design 2 ===> ", presignedUrl);
        prepareData2.push(presignedUrl);
        if (imageFront !== null) {
          if (countImg2 === 0) {
            photoTampakMukaNoR = prepareData2;
          }
          setDataImage2(prepareData2);
        }
      }
    );
  }, [imageFront]);

  useEffect(() => {
    minioClient.presignedUrl(
      "GET",
      "project",
      imageNeonPosition,
      24 * 60 * 60,
      function (err, presignedUrl) {
        if (err) return console.log(err);
        // console.log('Pre Design 3 ===> ', presignedUrl);
        prepareData3.push(presignedUrl);
        if (imageNeonPosition !== null) {
          if (countImg3 === 0) {
            photoPosisiNeonNoR = prepareData3;
          }
          setDataImage3(prepareData3);
        }
      }
    );
  }, [imageNeonPosition]);

  useEffect(() => {
    minioClient.presignedUrl(
      "GET",
      "project",
      imageAntenaPosition,
      24 * 60 * 60,
      function (err, presignedUrl) {
        if (err) return console.log(err);
        // console.log('Pre Design 4 ===> ', presignedUrl);
        prepareData4.push(presignedUrl);
        if (imageAntenaPosition !== null) {
          if (countImg4 === 0) {
            photoPosisiAntenaNoR = prepareData4;
          }
          setDataImage4(prepareData4);
        }
      }
    );
  }, [imageAntenaPosition]);

  useEffect(() => {
    console.log("+++ imageLayout", imageLayout);
    minioClient.presignedUrl(
      "GET",
      "project",
      imageLayout,
      24 * 60 * 60,
      function (err, presignedUrl) {
        if (err) return console.log(err);
        console.log('Pre Design 5 ===> ', presignedUrl);
        prepareData5.push(presignedUrl);
        if (imageLayout !== null) {
          if (countImg5 === 0) {
            photoLayoutNoR = prepareData5;
          }
          setDataImage5(prepareData5);
        }
      }
    );
  }, [imageLayout]);

  const renderImageNew = (ImgLocal, imgMinio) => {
    // renderImage(imageMachinePosition, dataImage, photoPosisiMesin)
    if (imgMinio !== null) {
      return (
        <img src={URL.createObjectURL(imgMinio)} style={{ maxWidth: "100%" }} />
      );
    } else if (ImgLocal !== null) {
      return <img src={ImgLocal && ImgLocal} style={{ maxWidth: "100%" }} />;
    } else {
      return <DefUploadImageSvg />;
    }
  };

  const renderDeleteImage = (img1, img2) => {
    if (img1 !== null) {
      return (
        <DeleteIconButton
          className={classes.resetImage}
          onClick={() => {
            setPhotoPosisiMesin(null);
            setLocationMachinePhotos("");
            newHandleDataDetailATM("", "locationMachinePhotos");
            photoMachinePath = "";
            fileInput1.current.value = null;
            photoPosisiMesinNoR = null;
            setMachinePosition(null);
            countImg1++;
          }}
        >
          <DeleteIcon />
        </DeleteIconButton>
      );
    } else {
      if (img2 !== null) {
        return (
          <DeleteIconButton
            className={classes.resetImage}
            onClick={() => {
              setPhotoPosisiMesin(null);
              setLocationMachinePhotos("");
              newHandleDataDetailATM("", "locationMachinePhotos");
              photoMachinePath = "";
              fileInput1.current.value = null;
              photoPosisiMesinNoR = null;
              setMachinePosition(null);
              countImg1++;
            }}
          >
            <DeleteIcon />
          </DeleteIconButton>
        );
      }
      return null;
    }
  };

  const renderDeleteImageFront = (img1, img2) => {
    if (img1 !== null) {
      return (
        <DeleteIconButton
          className={classes.resetImage}
          onClick={() => {
            setPhotoTampakMuka(null);
            setFrontPhoto("");
            newHandleDataDetailATM("", "locationFrontMachinePhoto");
            photoFrontPath = "";
            fileInput2.current.value = null;
            photoTampakMukaNoR = null;
            setImageFront(null);
            countImg2++;
          }}
        >
          <DeleteIcon />
        </DeleteIconButton>
      );
    } else {
      if (img2 !== null) {
        return (
          <DeleteIconButton
            className={classes.resetImage}
            onClick={() => {
              setPhotoTampakMuka(null);
              setFrontPhoto("");
              newHandleDataDetailATM("", "locationFrontMachinePhoto");
              photoFrontPath = "";
              fileInput2.current.value = null;
              photoTampakMukaNoR = null;
              setImageFront(null);
              countImg2++;
            }}
          >
            <DeleteIcon />
          </DeleteIconButton>
        );
      }
      return null;
    }
  };

  const renderDeleteImageNeon = (img1, img2) => {
    if (img1 !== null) {
      return (
        <DeleteIconButton
          className={classes.resetImage}
          onClick={() => {
            setPhotoPosisiNeon(null);
            setNeonPhoto("");
            newHandleDataDetailATM("", "locationPhotosPositionNeonSign");
            photoNeonPath = "";
            fileInput3.current.value = null;
            photoPosisiNeonNoR = null;
            setNeonPosition(null);
            countImg3++;
          }}
        >
          <DeleteIcon />
        </DeleteIconButton>
      );
    } else {
      if (img2 !== null) {
        return (
          <DeleteIconButton
            className={classes.resetImage}
            onClick={() => {
              setPhotoPosisiNeon(null);
              setNeonPhoto("");
              newHandleDataDetailATM("", "locationPhotosPositionNeonSign");
              photoNeonPath = "";
              fileInput3.current.value = null;
              photoPosisiNeonNoR = null;
              setNeonPosition(null);
              countImg3++;
            }}
          >
            <DeleteIcon />
          </DeleteIconButton>
        );
      }
      return null;
    }
  };

  const renderDeleteImageAntena = (img1, img2) => {
    if (img1 !== null) {
      return (
        <DeleteIconButton
          className={classes.resetImage}
          onClick={() => {
            setPhotoPosisiAntena(null);
            setAntenaPhoto("");
            newHandleDataDetailATM("", "locationPhotosPositionAtenaVsat");
            photoAntenaPath = "";
            fileInput4.current.value = null;
            photoPosisiAntenaNoR = null;
            setAntenaPosition(null);
            countImg4++;
          }}
        >
          <DeleteIcon />
        </DeleteIconButton>
      );
    } else {
      if (img2 !== null) {
        return (
          <DeleteIconButton
            className={classes.resetImage}
            onClick={() => {
              setPhotoPosisiAntena(null);
              newHandleDataDetailATM("", "locationPhotosPositionAtenaVsat");
              setAntenaPhoto("");
              photoAntenaPath = "";
              fileInput4.current.value = null;
              photoPosisiAntenaNoR = null;
              setAntenaPosition(null);
              countImg4++;
            }}
          >
            <DeleteIcon />
          </DeleteIconButton>
        );
      }
      return null;
    }
  };

  const renderDeleteImageLayout = (img1, img2) => {
    if (img1 !== null) {
      return (
        <DeleteIconButton
          className={classes.resetImage}
          onClick={() => {
            setPhotoLayout(null);
            setLayoutPhoto("");
            newHandleDataDetailATM("", "locationPhotosLayout");
            photoLayoutPath = "";
            fileInput5.current.value = null;
            photoLayoutNoR = null;
            setImageLayout(null);
            countImg5++;
          }}
        >
          <DeleteIcon />
        </DeleteIconButton>
      );
    } else {
      if (img2 !== null) {
        return (
          <DeleteIconButton
            className={classes.resetImage}
            onClick={() => {
              setPhotoLayout(null);
              newHandleDataDetailATM("", "locationPhotosLayout");
              setLayoutPhoto("");
              photoLayoutPath = "";
              fileInput5.current.value = null;
              photoLayoutNoR = null;
              setImageLayout(null);
              countImg5++;
            }}
          >
            <DeleteIcon />
          </DeleteIconButton>
        );
      }
      return null;
    }
  };

  useEffect(() => {}, [promotionMedia, otherBanks]);

  useEffect(() => {
  // console.log("??? +++ promotionMedia", promotionMedia);
    var mediaPromotion = [];
    for (var propt in promotionMedia) {
      if (promotionMedia[propt]) {
        mediaPromotion.push(propt);
      }
    }
  // console.log("??? +++ mediaPromotion", mediaPromotion);
    handleMediaPromosi(mediaPromotion);
  }, [promotionMedia]);
  return (
    <>
      <Paper className={classes.root}>
        <Typography style={{ fontSize: 20, fontWeight: 500, marginBottom: 12 }}>
          Detail ATM
        </Typography>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={3}>
            <Typography className={classes.subTitle}>Tipe Lokasi</Typography>
            <ChkySelectInput
              selectFirstDummy="-"
              selectOptionData={dataTypeLokasi}
              onSelectValueChange={handleTipeLokasi}
              value={dataValue.locationType || "-"}
              // value={tipeLokasi !== "" ? tipeLokasi : tipeLokasiNoR}
              // isDisable={isDisableTypeLoc}
            />
            {errorForm.locationType ? (
              <ErrorComponent label="! Select one" />
            ) : null}
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.subTitle}>Ruang ATM</Typography>
            <ChkySelectInput
              selectFirstDummy="-"
              selectOptionData={dataRuangAtm}
              onSelectValueChange={handleBoothType}
              value={dataValue.boothType || "-"}
              // value={boothType !== "" ? boothType : boothTypeNoR}
              // isDisable={isDisableRuangATM}
            />
            {errorForm.boothType ? (
              <ErrorComponent label="! Select one" />
            ) : null}
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.subTitle}>Luas Area ATM</Typography>
            <Grid
              container
              justify="space-between"
              className={classes.luasArea}
            >
              <Grid item xs={8} className={classes.numberInput}>
                <TextField
                  // value={
                  //   buildingLarge !== "" ? buildingLarge : buildingLargeNoR
                  // }
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="Insert number"
                  onChange={onChange}
                  value={dataValue.buildingLarge}
                  // onChange={handleLargeArea}
                  // disabled={isDisableLuasArea}
                />
                {errorForm.buildingLarge ? <ErrorComponent /> : null}
              </Grid>
              <Grid item xs={4} className={classes.satuan}>
                <Typography style={{ top: 7, position: "relative" }}>
                  Meter
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.subTitle}>Akses Umum</Typography>
            <ChkyTabsAsOption
              // currentTab={aksesUmumTabNoR}
              currentTab={dataValue.publicAccessibility == "Ya" ? 0 : 1}
              handleChangeTab={handleSelectedAksesUmumTab}
              type="public access"
            />
            <div className={classes.margin10px} />
            <ChkyInputSmall
              multiline
              rows={5}
              placeholder="Note"
              fullWidth
              onChange={handleNoteAkses}
              value={dataValue.publicAccessibilityNote}
              // value={noteAksesUmum !== "" ? noteAksesUmum : noteAksesUmumNoR}
              // disabled={isDisableNote}
            />
          </Grid>
          <Grid item xs={2} style={{ paddingLeft: 15, paddingRight: 10 }}>
            <Typography className={classes.subTitle}>Operasional</Typography>
            <Typography className={classes.subSubTitle}>Start at :</Typography>
            <ChkyTimePickerAmPm
              getTime={handleStartTime}
              type="start"
              gimmeThat={dataValue.startWorkHour || ""}
              // isDisable={isDisableStartTime}
              currentTab={amPmStart}
              handleChangeTab={(e) => (amPmStart = e)}
            />
            {errorForm.startWorkHour ? <ErrorComponent /> : null}
            <div style={{ marginBottom: 25 }} />
            <Typography className={classes.subSubTitle}>End at :</Typography>
            <ChkyTimePickerAmPm
              getTime={handleEndTime}
              type="end"
              // gimmeThat={endTimeNoR}
              gimmeThat={dataValue.endWorkHour || ""}
              // isDisable={isDisableEndTime}
              currentTab={amPmEnd}
              handleChangeTab={(e) => (amPmEnd = e)}
            />
            {errorForm.endWorkHour ? <ErrorComponent /> : null}
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: 50 }}>
          <Grid item xs={3}>
            <Typography className={classes.subTitle}>
              Jumlah ATM Bank Lain
            </Typography>
            <ChkyAutocomplete
              item={itemList}
              value={dataValue.aroundAtmBank || []}
              onChange={handleAtmBankLain}
              setUnrendered={(e) => (otherBanks = e)}
              // isDisable={isDisableATMBankLain}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.subTitle}>Denom</Typography>
            <ChkySelectInput
              selectFirstDummy="-"
              selectOptionData={[
                { value: "-", name: "- Pilih Denom -" },
                { value: "50", name: "50" },
                { value: "100", name: "100" },
                { value: "Multi Denom", name: "Multi Denom" },
              ]}
              onSelectValueChange={handleDenom}
              value={getDenom(dataValue.denom)}
              // isDisable={isDisableDenom}
            />
            {errorForm.denom ? <ErrorComponent label="! Select one" /> : null}
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.subTitle}>AC</Typography>
            <ChkySelectInput
              selectFirstDummy="-"
              selectOptionData={[
                { value: "-", name: "- Pilih Jenis AC -", },
                { value: "CIMB – Split", name: "CIMB – Split", },
                { value: "Landlord – Central", name: "Landlord – Central" },
                { value: "Landlord – Split", name: "Landlord – Split" },
                { value: "Landlord – Ruang Terbuka", name: "Landlord – Ruang Terbuka" },
              ]}
              onSelectValueChange={handleAC}
              value={dataValue.acType || "-"}
              // value={ac !== "" ? ac : acNoR}
              // isDisable={isDisableAC}
            />
            {errorForm.acType ? <ErrorComponent label="! Select one" /> : null}
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.subTitle}>Kebersihan</Typography>
            <ChkySelectInput
              selectFirstDummy="- Include / Exclude - "
              selectOptionData={[
                {
                  value: "- Include / Exclude -",
                  name: "- Include / Exclude -",
                },
                { value: "include", name: "Include" },
                { value: "exclude", name: "Exclude" },
              ]}
              onSelectValueChange={handleKebersihan}
              value={dataValue.cleanType || "- Include / Exclude -"}
              // value={kebersihan !== "" ? kebersihan : kebersihanNoR}
              // isDisable={isDisableKebersihan}
            />
            {errorForm.cleanType ? (
              <ErrorComponent label="! Select one" />
            ) : null}
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.subTitle}>
              Jenis Komunikasi
            </Typography>
            <ChkySelectInput
              selectFirstDummy="- Pilih Jenis Komunikasi -"
              // selectOptionData={jenisKomOption}
              selectOptionData={jensKomList}
              onSelectValueChange={handleJenisKom}
              value={dataValue.commType || "- Pilih Jenis Komunikasi -"}
              // value={jenisKom !== "" ? jenisKom : jenisKomNoR}
              // isDisable={isDisableCommType}
            />
            {errorForm.commType ? (
              <ErrorComponent label="! Select one" />
            ) : null}
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <Grid container style={{ marginTop: 50, marginBottom: 25 }} spacing={2}>
          <Grid item xs={3}>
            <Typography className={classes.subTitle}>Media Promosi</Typography>
            <ChkyMultipleSelect
              dataSelect={promotionMedia}
              handleSelectAll={(e) => console.log("print handle select all", e)}
              getValue={handleMediaPromosi}
              setUnrendered={(e) => (promotionMedia = e)}
              // isDisable={isDisableMediaPromotion}
            />
            <div style={{ marginBottom: 20 }} />
            <ChkyInputSmall
              multiline
              rows={3}
              placeholder="Note"
              fullWidth
              onChange={handleNoteMediaProm}
              value={dataValue.mediaPromotionNote}
              // value={noteMediaProm !== "" ? noteMediaProm : noteMediaPromNoR}
              // disabled={isDisableNoteMedia}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography className={classes.subTitle}>Photo</Typography>
            <div className={classes.margin10px} />
            <Grid container justify="space-between" spacing={1}>
              <Grid item xs={3}>
                <Typography className={classes.subSubTitle}>
                  Posisi Mesin
                </Typography>
                <div className={classes.margin10px} />
                <Box className={classes.imageUploadContainer}>
                  <input
                    id="photoPosisiMesin"
                    type="file"
                    accept=".png,.jpg, .jpeg"
                    onChange={handleUploadPosisiMesin}
                    ref={fileInput1}
                    style={{
                      width: "0.1px",
                      height: "0.1px",
                      opacity: 0,
                      overflow: "hidden",
                      position: "absolute",
                      zIndex: -1,
                    }}
                  />
                  <label
                    htmlFor="photoPosisiMesin"
                    className={classes.imgDefault}
                  >
                    {renderImageNew(photoPosisiMesinNoR, photoPosisiMesin)}
                  </label>
                  {renderDeleteImage(photoPosisiMesinNoR, photoPosisiMesin)}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.subSubTitle}>
                  Tampak Muka
                </Typography>
                <div className={classes.margin10px} />
                <Box className={classes.imageUploadContainer}>
                  <input
                    id="photoTampakMuka"
                    type="file"
                    accept=".png,.jpg, .jpeg"
                    onChange={handleUploadTampakMuka}
                    ref={fileInput2}
                    style={{
                      width: "0.1px",
                      height: "0.1px",
                      opacity: 0,
                      overflow: "hidden",
                      position: "absolute",
                      zIndex: -1,
                    }}
                  />
                  <label
                    htmlFor="photoTampakMuka"
                    className={classes.imgDefault}
                  >
                    {renderImageNew(photoTampakMukaNoR, photoTampakMuka)}
                  </label>
                  {renderDeleteImageFront(photoTampakMukaNoR, photoTampakMuka)}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.subSubTitle}>
                  Posisi Neon Sign
                </Typography>
                <div className={classes.margin10px} />
                <Box className={classes.imageUploadContainer}>
                  <input
                    id="photoPosisiNeon"
                    type="file"
                    accept=".png,.jpg, .jpeg"
                    onChange={handleUploadPosisiNeon}
                    ref={fileInput3}
                    style={{
                      width: "0.1px",
                      height: "0.1px",
                      opacity: 0,
                      overflow: "hidden",
                      position: "absolute",
                      zIndex: -1,
                    }}
                  />
                  <label
                    htmlFor="photoPosisiNeon"
                    className={classes.imgDefault}
                  >
                    {renderImageNew(photoPosisiNeonNoR, photoPosisiNeon)}
                  </label>
                  {renderDeleteImageNeon(photoPosisiNeonNoR, photoPosisiNeon)}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.subSubTitle}>
                  Posisi Antena VSAT
                </Typography>
                <div className={classes.margin10px} />
                <Box className={classes.imageUploadContainer}>
                  <input
                    id="photoPosisiAntena"
                    type="file"
                    accept=".png,.jpg, .jpeg"
                    onChange={handleUploadPosisiAntena}
                    ref={fileInput4}
                    style={{
                      width: "0.1px",
                      height: "0.1px",
                      opacity: 0,
                      overflow: "hidden",
                      position: "absolute",
                      zIndex: -1,
                    }}
                  />
                  <label
                    htmlFor="photoPosisiAntena"
                    className={classes.imgDefault}
                  >
                    {renderImageNew(photoPosisiAntenaNoR, photoPosisiAntena)}
                  </label>
                  {renderDeleteImageAntena(
                    photoPosisiAntenaNoR,
                    photoPosisiAntena
                  )}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.subSubTitle}>
                  Layout
                </Typography>
                <div className={classes.margin10px} />
                <Box className={classes.imageUploadContainer}>
                  <input
                    id="photoLayout"
                    type="file"
                    accept=".png,.jpg, .jpeg"
                    onChange={handleUploadLayout}
                    ref={fileInput5}
                    style={{
                      width: "0.1px",
                      height: "0.1px",
                      opacity: 0,
                      overflow: "hidden",
                      position: "absolute",
                      zIndex: -1,
                    }}
                  />
                  <label
                    htmlFor="photoLayout"
                    className={classes.imgDefault}
                  >
                    {renderImageNew(photoLayoutNoR, photoLayout)}
                  </label>
                  {renderDeleteImageLayout(
                    photoLayoutNoR,
                    photoLayout
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <ModalLoader isOpen={isOpenModalLoader} />
    </>
  );
};

LocationDetailAtm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  errorForm: PropTypes.object,
  dataValue: PropTypes.object,
};

LocationDetailAtm.defaultProps = {
  data: [],
  errorForm: {},
  dataValue: {
    locationType: "",
    boothType: "",
    buildingLarge: "",
    publicAccessibility: "",
    mediaPromotion: [],
    aroundAtmBankList: [],
    publicAccessibilityNote: "",
    // startWorkHour: startTime !== "" ? startTime : startTimeNoR,
    startWorkHour: "",
    // endWorkHour: endTime !== "" ? endTime : endTimeNoR,
    endWorkHour: "",
    denom: "",
    acType: "",
    cleanType: "",
    commType: "",
    mediaPromotionNote: "",
    locationMachinePhotos: "",
    locationFrontMachinePhoto: "",
    locationPhotosPositionNeonSign: "",
    locationPhotosPositionAtenaVsat: "",
  },
};

export default LocationDetailAtm;