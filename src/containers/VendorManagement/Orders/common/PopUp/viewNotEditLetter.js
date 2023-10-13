import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Dialog,
  Avatar,
  Button,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as CloseButton } from "../../../../../assets/icons/siab/x-new.svg";
import NoImage from "../../../../../assets/images/image.png";
import PropTypes from "prop-types";
import constants from "../../../../../helpers/constants";
import Divider from "@material-ui/core/Divider";
import getMinioFromUrl from "../../../../../helpers/getMinioFromUrl";
import { TextFormatted, TextRupiah } from "../FormattedNumber";
import { mergeClasses } from "@material-ui/styles";
import ImageSelectLogo from "../../../../../components/ImageSelectLogo";
import InputBordered from "../../../../../components/InputLetter";
import { RootContext } from "../../../../../router";
import { useParams, useHistory } from "react-router-dom";
import { doUploadPhoto } from "../../../../Implementation/ApiServiceImplementation";
import axios from "axios";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import DeleteIcon from "@material-ui/icons/Delete";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import ModalLoader from "../../../../../components/ModalLoader";
import ImageSelector from "../../../../../components/ImageSelector";
const useStyles = makeStyles({
  paper: {
    backgroundColor: constants.color.white,
    borderRadius: 10,
    padding: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    display: "flex",
    "& > *": {
      margin: 5,
    },
    fontSize: 18,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 190,
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
    marginTop: 15,
    padding: "0px 15px",
    position: "relative",
    borderRadius: 10,
    border: "1px solid #BCC8E7",
    backgroundColor: "#fff",
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
});

const ViewNotEditLetter = ({
  isOpen,
  onClose,
  content,
  kopSurat,
  footer,
  approver,
  approvalStatus,
  dataSurat,
}) => {
  const { paper, boxStyle, avatar, secondaryButton, primaryButton } =
    useStyles();
  const history = useHistory();
  const [kopUrl, setKopUrl] = useState("");
  const [isLoadingHeader, setIsLoadingHeader] = useState(false);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isLoadData, setLoadData] = useState(false);
  const [footerUrl, setfooterUrl] = useState("");
  const [isloadingFooter, setIsLoadingFooter] = useState(false);
  const [isLoadingApprovalStatus, setIsLoadingApprovalStatus] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  //const history = useHistory();
  const { userId, userFullName, userRoleName, userVendorId } =
    useContext(RootContext);
  const { id } = useParams();

  // khususPhoto
  const [photoLogo, setPhotoLogo] = useState("");
  const [photoTTD, setPhotoTTD] = useState("");
  const [dataAll, setDataALL] = useState({
    id,
    taskType: "",
    picVendorId: userVendorId,
    logoPicture: null,
    nomerSurat: "",
    tempat: "",
    tanggal: "",
    hal: "",
    ttdPicture: null,
    nama: "",
    jabatan: "",
    photoList: [],
  });
  function loadSubmitHandler(bool) {
    setLoadingSubmit(bool);
  }
  useEffect(() => {
    const dataNew = {
      logoPicture:dataSurat?.logoPerusahaan !== null ? dataSurat?.logoPerusahaan : "",
      nomerSurat: dataSurat?.nomerSurat !== null ? dataSurat?.nomerSurat : "",
      tempat: dataSurat?.tempat !== null ? dataSurat?.tempat : "",
      hal: dataSurat?.hal !== null ? dataSurat?.hal : "",
      ttdPicture: dataSurat?.ttd !== null ? dataSurat?.ttd : "",
      nama: dataSurat?.nama !== null ? dataSurat?.nama : "",
      jabatan: dataSurat?.jabatan !== null ? dataSurat?.jabatan : "",
      photoList: [],
    };
    setDataALL(dataNew);
  }, [dataSurat]);

  useEffect(() => {
    if (photoLogo !== "") {
      const oldDataList = dataAll.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoLogo",
        file: photoLogo,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = dataAll.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoLogo";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [photoLogo]);
  useEffect(() => {
    if (photoTTD !== "") {
      const oldDataList = dataAll.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoTTD",
        file: photoTTD,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = dataAll.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoTTD";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [photoTTD]);
  const handleChangeState = (newVal, attribut) => {
    console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataALL((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
  };

  useEffect(() => {
    if (kopSurat) {
      setIsLoadingHeader(true);
      getMinioFromUrl(kopSurat)
        .then((res) => {
          console.log("~ res", res);
          setIsLoadingHeader(false);
          setKopUrl(res.fileUrl);
        })
        .catch((err) => {
          alert(err);
          setIsLoadingHeader(false);
          console.log("~ err", err);
          setKopUrl("");
        });
    } else {
      setKopUrl("");
    }
  }, [kopSurat]);

  useEffect(() => {
    if (footer) {
      setIsLoadingFooter(true);
      getMinioFromUrl(footer)
        .then((res) => {
          console.log("~ resfooter", res);
          setIsLoadingFooter(false);
          setfooterUrl(res.fileUrl);
        })
        .catch((err) => {
          alert(err);
          setIsLoadingFooter(false);
          console.log("~ err", err);
          setfooterUrl("");
        });
    } else {
      setfooterUrl("");
    }
  }, [footer]);

  useEffect(() => {
    console.log(approver);
  }, [approver]);

  useEffect(() => {
    if (approvalStatus >= 2) {
      setIsLoadingApprovalStatus(true);
    }
  }, [approvalStatus]);

  const c = content || {};

  const dataBarang =
    c.biayaBarang?.map((val) => ({
      name: val.nama,
      qty: val.quantity,
      satuan: val.unit,
      harga: val.price,
      jumlah: val.quantity * val.price,
    })) || [];

  const dataJasa =
    c.biayaService?.map((val) => ({
      name: val.nama,
      qty: val.quantity,
      satuan: val.unit,
      harga: val.price,
      jumlah: val.quantity * val.price,
    })) || [];

  const totalHargaBarang = dataBarang.reduce((prev, cur) => {
    return cur.qty != null && cur.harga != null
      ? prev + cur.qty * cur.harga
      : prev;
  }, 0);

  const totalHargaJasa = dataJasa.reduce((prev, cur) => {
    return cur.qty != null && cur.harga != null
      ? prev + cur.qty * cur.harga
      : prev;
  }, 0);

  const subTotal = totalHargaBarang + totalHargaJasa;

  const total = subTotal * (1 + c.ppn * 0.01);
  function renderBackColor(intialName) {
    if (intialName === "DH") {
      return "#88ADFF";
    }
    if (intialName === "TS") {
      return "#FFB443";
    }
    if (intialName === "BA") {
      return "#65D170";
    }
    if (intialName === "Y") {
      return "#FF6A6A";
    }
    return "#88ADFF";
  }
  function getInitialName(name) {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  }
  function showJabatan(name) {
    switch (true) {
      case name.toLowerCase().includes("bambang"):
        return "Head of Digital Banking,Branchless,& Partnership";
      case name.toLowerCase().includes("trisna"):
        return "Atm Business Head";
      case name.toLowerCase().includes("roy"):
        return "Atm Site Management Head";
    }
  }
  function orderArr(arr) {
    const newArr = [];
    // console.log("+++ imple arr",arr);
    arr?.map((item) => {
      // console.log("+++ imple arr item ",item);
      switch (true) {
        case item.toLowerCase().includes("roy"):
          newArr[0] = item;
          break;
        case item.toLowerCase().includes("trisna"):
          newArr[2] = item;
          break;
        case item.toLowerCase().includes("bambang"):
          newArr[1] = item;
          break;

        default:
          newArr.push(item);
          break;
      }
    });
    // console.log("+++ imple arr new",newArr);

    return newArr;
  }

  const handleSubmitSurat = async () => {
    setModalLoader(true);
    // handlePhotoLogo
    const photoLogoCompany = { path: null, url: null };
    const photoTTDCompany = { path: null, url: null };
    const doUploadPhotos = async (arr) => {
      if (arr.length > 0) {
        setModalLoader(true);
        // console.log("arr",arr)
        await Promise.all(
          arr.map(async (item) => {
            const { docKey } = item;
            await doUploadPhoto(item.file)
              .then((res) => {
                // console.log("dataRest", res);
                // console.log("docKey", docKey);
                if (res.status === 200) {
                  if (res.data.responseCode === "00") {
                    switch (docKey) {
                      case "photoLogo":
                        photoLogoCompany.path = res.data.path;
                        break;
                      case "photoTTD":
                        photoTTDCompany.path = res.data.path;
                    }
                  } else {
                    alert(res.data.responseMessage);
                  }
                }
              })
              .catch((err) => {
                alert(`Failed to Upload`);
              });
          })
        );
      }
    };
    await doUploadPhotos(dataAll.photoList);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const dataSave = {
      id: dataAll.id,
      taskType: "need",
      picVendorId: dataAll.picVendorId,
      logoPerusahaan: photoLogoCompany.path
        ? photoLogoCompany.path
        : dataAll.logoPicture,
      nomerSurat: dataAll.nomerSurat,
      tempat: dataAll.tempat,
      tanggal: dataSurat?.tangalSurat,
      hal: dataAll.hal,
      ttd: photoTTDCompany.path,
      nama: dataAll.nama,
      jabatan: dataAll.jabatan,
    };
    const result = await axios.post(
      `${constants.IMPLEMENTATION_SERVICE}/saveOrUpdateSuratPenawaranHarga`,
      dataSave,
      config
    );
    try {
      if (result.status === 200) {
        setModalLoader(false);
        // history.goBack();
        history.go(0);
      }
    } catch (error) {
      alert(`Error ${error}`);
      setModalLoader(false);
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        scroll="body"
        maxWidth="md"
        width="662"
      >
        <Box className={paper}>
          <div>
            <Grid container justify="flex-end" alignItems="stretch">
              <Grid item>
                <CloseButton onClick={onClose} style={{ cursor: "pointer" }} />
              </Grid>
            </Grid>
          </div>
          {/*
        <div>
          {isLoadingHeader ? (
            "Loading header..."
          ) : (
            <img
              src={kopUrl}
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </div>
          */}
          <Grid container direction="column">
            <Grid item>
              {dataAll.logoPicture ? (
                <div style={{ position: "relative", width: 260 }}>
                  <MinioImageComponent
                    filePath={dataAll.logoPicture}
                    style={{ borderRadius: 10, width: 101, height: 80 }}
                  />
                </div>
              ) : (
                <img
                  src={NoImage}
                  style={{ borderRadius: 10, width: 101, height: 80 }}
                  alt="img-logo"
                />
              )}
            </Grid>
            <Grid item style={{ paddingTop: "30px" }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                spacing={2}
              >
                <Grid item xs={5}>
                  <InputBordered
                    style={{ width: "280px", height: "24px" }}
                    placeholder="Masukan Nomor Surat"
                    value={dataAll.nomerSurat}
                    disabled
                  />
                </Grid>
                <Grid item xs={2}>
                  <InputBordered
                    style={{ width: "144px", height: "24px" }}
                    placeholder="Masukan Tempat"
                    value={dataAll.tempat}
                    disabled
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    style={{ fontSize: 13, fontWeight: 600, marginTop: 13 }}
                  >
                    ,
                    {useTimestampConverter(
                      dataSurat?.tangalSurat / 1000,
                      "DD-MM-YYYY"
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} style={{ paddingTop: "20px" }}>
              <Typography style={{ fontSize: 13, fontWeight: 600 }}>
                Kepada Yth :
              </Typography>
              <Typography style={{ fontSize: 13, fontWeight: 600 }}>
                PT Bank CIMB Niaga
              </Typography>
              <Typography style={{ fontSize: 13, fontWeight: 400, spacing: 3 }}>
                Griya CIMB Niaga 2,Lantai 10
                <br />
                Jl.K.H Wahid Hasyim Blok B4 No.3
                <br />
                Bintaro
              </Typography>
            </Grid>
            <Grid item style={{ paddingTop: "40px", marginLeft: "40px" }}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={0.5}>
                  <Typography style={{ fontSize: 13 }}>Perihal</Typography>
                </Grid>
                <Grid item xs={0.5}>
                  <Typography style={{ fontSize: 13 }}>:</Typography>
                </Grid>
                <Grid item xs={9}>
                  {" "}
                  <InputBordered
                    style={{ width: "437px", height: "24px" }}
                    placeholder="Masukan Perihal"
                    value={dataAll.hal}
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ paddingTop: "20px" }}>
              <Typography style={{ fontSize: 13 }}>
                Dengan Hormat,
                <br />
                Sebelumnya kami ucapkan terimakasih atas kesempatan yang
                diberikan kepada <b>{dataSurat?.namaVendor}</b> untuk
                <br />
                dapat mengajukan Penawaran Harga{" "}
                <b>{dataSurat?.jenisPekerjaan}</b>.Untuk pekerjaan tersebut kami
                menawarkan harga <br />
                dengan rincian sebagai berikut:
              </Typography>
            </Grid>
          </Grid>

          <div style={{ marginTop: 25 }}>
            <Typography style={{ color: "#2B2F3C", fontWeight: 500 }}>
              Rincian Biaya Jasa
            </Typography>
          </div>

          <div>
            <Box className={boxStyle}>
              <Grid container style={{ marginBottom: 15, marginTop: 10 }}>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                  <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                    Nama Jasa
                  </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                    Qty
                  </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                    Satuan
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "center" }}>
                  <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                    Harga
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "center" }}>
                  <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                    Jumlah
                  </Typography>
                </Grid>
              </Grid>

              {dataJasa.map((item) => (
                <>
                  <Grid container>
                    <Grid item xs={4} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>
                        {item.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>
                        <TextFormatted value={item.qty} />
                      </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>
                        {item.satuan}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>
                        <TextRupiah value={item.harga} />
                      </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        <TextRupiah value={item.jumlah} />
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    variant="fullWidth"
                    light="true"
                    style={{ marginTop: 5 }}
                  />
                </>
              ))}

              <Grid container style={{ marginTop: 15, marginBottom: 15 }}>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                  <Typography
                    style={{
                      color: "#2B2F3C",
                      fontWeight: 600,
                      paddingRight: 10,
                    }}
                  >
                    Total Biaya Jasa
                  </Typography>
                </Grid>
                <Grid item xs={8} style={{ textAlign: "right" }}>
                  <Typography
                    style={{
                      color: "#2B2F3C",
                      fontWeight: 600,
                      paddingRight: 55,
                    }}
                  >
                    <TextRupiah value={totalHargaJasa} />
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </div>

          <div style={{ marginTop: 25 }}>
            <Typography style={{ color: "#2B2F3C", fontWeight: 500 }}>
              Rincian Biaya Barang
            </Typography>
          </div>

          <div>
            <Box className={boxStyle}>
              <Grid container style={{ marginBottom: 15, marginTop: 10 }}>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                  <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                    Nama Barang
                  </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                    Qty
                  </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                    Satuan
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "center" }}>
                  <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                    Harga
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "center" }}>
                  <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                    Jumlah
                  </Typography>
                </Grid>
              </Grid>

              {dataBarang.map((item) => (
                <>
                  <Grid container>
                    <Grid item xs={4} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>
                        {item.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>
                        <TextFormatted value={item.qty} />
                      </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>
                        {item.satuan}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 400 }}>
                        <TextRupiah value={item.harga} />
                      </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        <TextRupiah value={item.jumlah} />
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    variant="fullWidth"
                    light="true"
                    style={{ marginTop: 5 }}
                  />
                </>
              ))}

              <Grid container style={{ marginTop: 15, marginBottom: 15 }}>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                  <Typography
                    style={{
                      color: "#2B2F3C",
                      fontWeight: 600,
                      paddingRight: 10,
                    }}
                  >
                    Total Biaya Barang
                  </Typography>
                </Grid>
                <Grid item xs={8} style={{ textAlign: "right" }}>
                  <Typography
                    style={{
                      color: "#2B2F3C",
                      fontWeight: 600,
                      paddingRight: 55,
                    }}
                  >
                    <TextRupiah value={totalHargaBarang} />
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Grid container style={{ marginTop: 15, marginBottom: 15 }}>
              <Grid item xs={8} style={{ textAlign: "right" }}>
                <Typography
                  style={{
                    color: "#2B2F3C",
                    fontWeight: 400,
                    paddingRight: 10,
                  }}
                >
                  Total Biaya :
                </Typography>
              </Grid>
              <Grid item xs={3} style={{ textAlign: "right" }}>
                <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                  <TextRupiah value={subTotal} />
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 15, marginBottom: 15 }}>
              <Grid item xs={8} style={{ textAlign: "right" }}>
                <Typography
                  style={{
                    color: "#2B2F3C",
                    fontWeight: 400,
                    paddingRight: 10,
                  }}
                >
                  PPN :
                </Typography>
              </Grid>
              <Grid item xs={1} style={{ textAlign: "right" }}>
                <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                  <TextFormatted value={c.ppn} />%
                </Typography>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                  <TextRupiah value={(c.ppn * 0.01) * subTotal} />
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 15, marginBottom: 15 }}>
              <Grid item xs={8} style={{ textAlign: "right" }}>
                <Typography
                  style={{
                    color: "#2B2F3C",
                    fontWeight: 400,
                    paddingRight: 10,
                  }}
                >
                  Total Biaya+PPN :
                </Typography>
              </Grid>
              <Grid item xs={3} style={{ textAlign: "right" }}>
                <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                  <TextRupiah value={total} />
                </Typography>
              </Grid>
            </Grid>
            <div>
              {isLoadingApprovalStatus ? (
                <div>
                  <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                    Approved By:
                  </Typography>
                  <Grid
                    container
                    spacing={4}
                    style={{ padding: 10, marginBottom: 15, marginTop: 5 }}
                  >
                    {approver !== null &&
                      orderArr(approver).map((item, i) => {
                        if (item !== null) {
                          return (
                            <Grid
                              item
                              xs={6}
                              style={{ padding: 10, marginTop: 5 }}
                            >
                              <Grid container spacing={1}>
                                <Grid item xs={1.75}>
                                  <Avatar
                                    key={i}
                                    style={{
                                      backgroundColor: renderBackColor(
                                        getInitialName(item)
                                      ),
                                    }}
                                    className={avatar}
                                  >
                                    {getInitialName(item)}
                                  </Avatar>
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography
                                    style={{ fontSize: 12, fontWeight: "bold" }}
                                  >
                                    {item}
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontSize: 12,
                                      fontStyle: "italic",
                                      opacity: 0.5,
                                    }}
                                  >
                                    {showJabatan(item)}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          );
                        }
                      })}
                  </Grid>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <Grid container direction="column">
            <Grid item>
              <Typography style={{ fontSize: 13 }}>
                Demikian penawaran ini kami ajukan dan besar harapan kami untuk
                terus menjalin kerjasama dengan pihak <br />
                <b>PT Bank CIMB Niaga</b>. Apabila terdapat perihal yang
                membutuhkan informasi penjelasan dari penawaran harga
                <br />
                tersebut silahkan hubungi kami di <b>
                  {dataSurat?.namaVendor}
                </b>{" "}
                di nomor telephone <b>{dataSurat?.noTlpPerusahaan}</b>.
              </Typography>
            </Grid>
            <Grid item style={{ paddingTop: "30px" }}>
              <Typography style={{ fontSize: 13 }}>Hormat Kami</Typography>
              <Typography
                style={{ fontSize: 13, fontWeight: 600, paddingTop: "10px" }}
              >
                {dataSurat?.namaVendor}
              </Typography>
            </Grid>
            <Grid item style={{ paddingTop: "20px" }}>
              {dataAll.ttdPicture ? (
                <div style={{ position: "relative", width: 260 }}>
                  <MinioImageComponent
                    filePath={dataAll.ttdPicture}
                    style={{ borderRadius: 10, width: 101, height: 80 }}
                  />
                </div>
              ) : (
                <img
                  src={NoImage}
                  style={{ borderRadius: 10, width: 101, height: 80 }}
                  alt="img-depan"
                />
              )}
            </Grid>
            <Grid item>
              <Typography>{dataAll.nama}</Typography>
            </Grid>
            <Grid item>
              <Typography>{dataAll.jabatan}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Divider
              style={{
                marginTop: "50px",
                background: "#BCC8E7",
                height: "3px",
              }}
            />
          </Grid>
          <Grid item style={{ marginTop: "30px" }}>
            <Typography style={{ fontSize: 15, fontWeight: 600 }}>
              {dataSurat?.namaVendor}
            </Typography>
            <Typography style={{ fontSize: 13 }}>
              {dataSurat?.alamatPerusahaan}
            </Typography>
            <Typography style={{ fontSize: 13 }}>
              {dataSurat?.noTlpPerusahaan}
            </Typography>
          </Grid>
        </Box>
      </Dialog>
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

ViewNotEditLetter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  approver: PropTypes.array,
};

export default ViewNotEditLetter;
