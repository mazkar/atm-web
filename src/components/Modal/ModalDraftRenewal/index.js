/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/order */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unreachable */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/default-props-match-prop-types */
import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Modal,
  Box,
  Grid,
  Typography,
  Button,
  Link,
} from "@material-ui/core";
import { Switch, DatePicker } from 'antd';
import moment from "moment";
import { extendMoment } from "moment-range";
import { RootContext } from "../../../router";
import axios from "axios";
import { ReactComponent as Logo } from "../../../assets/images/logo-cimb-niaga.svg";
import LoadingView from "../../Loading/LoadingView";
import constants from "../../../helpers/constants";
import getMinioFile from "../../../helpers/getMinioFile";
import NumberInput from "../../chky/IdrNumberInput";
import RegularInput from "../../chky/ChkyInputSmall";
import ConvertRupiah from "../../../helpers/useRupiahConverter";
import explodeArray from "../../../helpers/explodeArray";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState, RichUtils } from "draft-js";
import { handleNewLine, insertNewUnstyledBlock } from 'draftjs-utils';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import SelectInputAddOption from "../../Selects/SelectInputAddOption";

const momentExt = extendMoment(moment);
const momentDefault = momentExt;

const useStyles = makeStyles({
  modal: {
    display: "block",
    overflowY: "auto",
    height: "100%",
    width: 720,
    marginRight: "auto",
    marginLeft: "auto",
  },
  paper: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: constants.color.white,
    borderRadius: 10,
    padding: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: 700,
  },
  fontBold: {
    fontWeight: 700,
    fontSize: 13,
  },
  buttonContainer: {
    marginTop: 30,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: "max-content",
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "14px 36px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  wrapperContentMsg1: {
    width: "100%",
  },
  editorContentMsg1: {
    border: "1px solid",
    borderColor: "black",
    height: 170,
    paddingLeft: 12,
    paddingRight: 12,
    '& .public-DraftStyleDefault-ltr': {
      textAlign: 'unset'
    }
  },
  wrapperContentMsg2: {
    width: "100%",
  },
  editorContentMsg2: {
    border: "1px solid",
    borderColor: "black",
    height: 280,
    paddingLeft: 12,
    paddingRight: 12,
    '& .public-DraftStyleDefault-ltr': {
      textAlign: 'unset'
    }
  },
  uploadFile: {
    cursor: "pointer",
    position: "absolute",
    marginLeft: "5px",
    marginTop: "20px",
    marginBottom: "20px",
    zIndex: 2,
    "& :hover": {
      color: constants.color.primaryHard,
    },
  },
  inputExcel: {
    // display: 'none',
    position: "relative",
    marginBottom: 15,
    // marginLeft: -150,
  },
  priceField: {
    width: 140,
    height: 37,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: constants.color.grayMedium,
    borderRadius: 8,
    outline: "none",
    padding: "12px 33px 12px 12px",
    fontSize: 13,
  },
  footerLine: {
    fontSize: '8pt',
    color: constants.color.primaryHard
  }
});

const dataLetterDummy = {
  number: "020-SK/CB-ABG/KP/VIII/20",
  subject: "Penawaran Harga Perpanjangan Sewa Lokasi ATM CIMB Niaga",
  location: "SKB.Kantor Pos",
  date: "12 Mei 2020",
  receiver:
    "Direktur Utama RSU Bunda Menteng-Jl. Teuku Cik Ditiro No.21 Menteng-Jakarta Pusat",
  rentYear: "3 Tahun",
  rentPeriod: "01 Oktober 2020 s/d 30 September 2023",
  rentCost: "Rp.24.000.000 per tahun-Exclude PPN 10% : Include PPH 10%",
  electricity: "Rp. 12.000.000 per tahun-Exclude PPN 10% : Include PPH 10%",
  user1: "active-user",
  user2: "active-user",
};

const dataJenisListrik = [
  { value: "-", name: "- Pilih Jenis Listrik -" },
  { value: "CIMB - As per Usage - Token", name: "CIMB - As per Usage - Token" },
  { value: "CIMB - Vendor - Token", name: "CIMB - Vendor - Token" },
  { value: "CIMB - Vendor - Token - MCB", name: "CIMB - Vendor - Token - MCB" },
  { value: "CIMB - As per Usage - Pascabayar", name: "CIMB - As per Usage - Pascabayar" },
  { value: "CIMB - Vendor - Pascabayar", name: "CIMB - Vendor - Pascabayar" },
  { value: "CIMB - Vendor - Pascabayar - MCB", name: "CIMB - Vendor - Pascabayar - MCB" },
  { value: "Landlord - Lumpsum - Token", name: "Landlord - Lumpsum - Token" },
  { value: "Landlord - Include - Token", name: "Landlord - Include - Token" },
  { value: "Landlord - Lumpsum - Pascabayar", name: "Landlord - Lumpsum - Pascabayar" },
  { value: "Landlord - Include - Pascabayar", name: "Landlord - Include - Pascabayar" },
];

const ModalExtensionLetter = (props) => {
  const { isOpen, onClose, rowToShow, siteId } = props;
  const classes = useStyles();
  const { userSignature, userFullName } = useContext(RootContext);

  // INITIAL STATE //
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [letter, setLetter] = useState(defaultLetter);
  const [price, setPrice] = useState();
  const [prices, setPrices] = useState([]);
  const { userServiceBaseUrl } = constants;
  const [picLandlord, setPicLandlord] = useState("");
  const [subjectEmail, setSubjectEmail] = useState("");
  const [contentMsg1, setContentMsg1] = useState();
  const [contentMsg2, setContentMsg2] = useState();
  const [attachments, setAttachments] = useState([]);
  const [letterPlace, setLetterPlace] = useState("");
  const [flatCost, setFlatCost] = useState(true);

  // ENHANCE MASA SEWA dan Komponen Listrik
  const [electricityType, setElectricityType] = useState("");
  const [electricityCost, setElectricityCost] = useState(null);
  const [yearlyServiceCharge, setYearlyServiceCharge] = useState(null);
  const [antenaLandCost, setAntenaLandCost] = useState(null);
  const [tenacity, setTenacity] = useState(null);
  const [startEndRentDate, setStartEndRentDate] = useState("");
  const [endRentDate, setEndRentDate] = useState("");

  const isMultipleUpload = false;

  const inputFileRef = React.useRef(null);

  useEffect(() => {
    if (letter) {
      const htmlContent1 = 
      `<p style="text-align:justify;">Sebelumnya terima kasih atas kerjasama yang sudah terjalin dengan baik selama ini antara PT.Bank CIMB Niaga Tbk dengan<strong> ${
        letter.landlordName
      }</strong> dan kedepan - nya kerjasama semakin lebih baik.<br><br>Sehubungan dengan berakhirnya masa sewa lokasi ATM CIMB Niaga di <strong>${
        letter.location
      }</strong> pada <strong>${moment(letter.startDate)
        .subtract(1, "days")
        .format(
          "DD MMMM YYYY"
        )}</strong>, ${letter.rentCost > 0 ? 'kami bermaksud mengajukan perpanjangan sewa dengan kondisi yang sama seperti periode sewa yang sudah berjalan saat ini yaitu:' : 'kami bermaksud mengajukan perpanjangan penempatan ATM dengan kondisi yang sama seperti periode sewa yang sudah berjalan saat ini yaitu :'}
        
        </p>`;

      setContentMsg1(convertHtmlToDraft(htmlContent1));
      
      const htmlContent2 = letter.rentCost > 0 ?
        `<p style="text-align:justify;"><strong>Cara Pembayaran :</strong><br>Pembayaran Harga Sewa selambatnya 20 (dua puluh) hari kerja setelah invoice yang lengkap dan benar serta bermaterai dan e - faktur telah diterima CIMB Niaga(Kantor Pusat Bintaro).Dengan syarat Perjanjian Sewa Ruangan ATM CIMB Niaga telah ditandatangani ke dua belah pihak.<br><br>Hal tersebut kami ajukan dengan mempertimbangkan atas performance transaksi dan biaya operasional mesin ATM yang kami review dalam periode sebelum-nya.<br><br>Demikian kami sampaikan. Besar harapan kami untuk dapat menerima kabar positif dari pihak Bapak / Ibu.<br>Atas perhatian dan kerjasamanya kami ucapkan terima kasih.</p>`
        : `<p style="text-align:justify;"><strong>Cara Pembayaran :</strong><br>Pembayaran Listrik selambatnya 20 (dua puluh) hari kerja setelah invoice yang lengkap dan benar serta bermaterai dan e - faktur telah diterima CIMB Niaga(Kantor Pusat Bintaro).Dengan syarat Perjanjian Penempatan Ruangan ATM CIMB Niaga telah ditandatangani ke dua belah pihak.<br><br>Hal tersebut kami ajukan dengan mempertimbangkan atas performance transaksi mesin ATM yang kami review dalam periode sebelum-nya.<br><br>Demikian kami sampaikan. Besar harapan kami untuk dapat menerima kabar positif dari pihak Bapak / Ibu.<br>Atas perhatian dan kerjasamanya kami ucapkan terima kasih.</p>`;
      setContentMsg2(convertHtmlToDraft(htmlContent2));
    }
  }, [isOpen, letter]);

  function isEmpty(obj) {
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
    return true;
  }

  const handlePrice = (nilai) => {
    setPrice(nilai.floatValue);
  };

  const handlePrices = (nilai, index) => {
    const newPrices = prices.map((val, i) => {
      return i === index ? nilai.floatValue : val;
    });
    setPrices(newPrices);
  };

  function replaceChar(string, type) {
    const strId = string;
    const array = strId.split("\n");
    return (
      <div>
        {array.map((item) => {
          if (type === "address") {
            if (item === "null") {
              return "";
            }
            return (
              <Typography variant="body2" className={classes.fontBold}>
                {item}
              </Typography>
            );
          }
          return <Typography variant="body2">{item}</Typography>;
        })}
      </div>
    );
  }

  useEffect(() => {
    if (isOpen === true) {
      const data = { id: rowToShow };
      const config = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      };
      setLetter("");
      setPicLandlord("");
      setPrice("");
      setLetterPlace("");
      try {
        setModalLoader(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getRequestRenewal`,
            data,
            config
          )
          .then((res) => {
            const newData = res.data;
            if (
              newData.statusMessage === "Data Not Found" ||
              newData.sendTo === null
            ) {
              alert("Data Not Found, Please select another!");
              onClose();
            } else {
              const placeDateArr = newData.letterDate.split(",");
              const sendToArr = newData.sendTo.split("\n");
              const newRow = {
                number: newData.referencedNumber,
                subject: newData.subject,
                location: newData.locationName,
                startDate: newData.startEndRentDate,
                date: newData.endRentDate,
                receiver: newData.sendTo,
                receiverName: sendToArr[0],
                receiverAddress: sendToArr[1],
                rentYear: newData.tenancy,
                rentPeriod: newData.rentPeriod,
                rentCost: newData.yearlyRentCost,
                electricity: newData.yearlyElectricityCost,
                electricityType: newData.electricityType,
                yearlyServiceCharge: newData.yearlyServiceCharge,
                antenaLandCost: newData.antenaLandCost,
                user1: newData.firstSigner,
                user2: newData.secondSigner,
                letterDate: placeDateArr[1],
                firstSignature: newData.firstSignatureUrl,
                secondSignature: newData.secondSignatureUrl,
                landlordName: newData.landlordName,
                secondActiveUser: newData.secondActiveUser,
                firstActiveUser: newData.firstActiveUser,
              };
              const subjectFree = "Pengajuan Perpanjangan Penempatan ATM CIMB Niaga";
              setSubjectEmail(newRow.rentCost > 0 ? newData.subject : subjectFree);
              setFlatCost(newData.flatCost);
              setLetter(newRow);
              setPicLandlord(newData.piclandlord);
              setPrice(newRow.rentCost);
              setLetterPlace(placeDateArr[0]);
              const { yearlyRentCostList } = newData;
              const pricesArray = explodeArray(yearlyRentCostList);
              const defaultPrices = new Array(newData.tenancy).fill(newRow.rentCost);
              setPrices(pricesArray || defaultPrices);

              // ENHANCE MASA SEWA dan Komponen Listrik
              setElectricityType(newData.electricityType);
              setElectricityCost(newData.yearlyElectricityCost);
              setYearlyServiceCharge(newData.yearlyServiceCharge);
              setAntenaLandCost(newData.antenaLandCost);
              setTenacity(newData.tenancy);
              setStartEndRentDate(newData.startEndRentDate);
              setEndRentDate(newData.endRentDate);
              
            }
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
  }, [isOpen]);

  function sendDraft() {
    const data = {
      id: siteId,
      referenceNumber: letter.number,
      letterDate: `${letterPlace},${letter.letterDate}`,
      nameLandlord: letter.user1,
      subject: subjectEmail,
      sendTo: letter.receiver,
      date: letter.date === null ? null : moment(letter.date).format("YYYY-MM-DD"),
      locationName: letter.location,
      rentPeriod: letter.rentYear,
      // rentCost: price,
      flatCost,
      yearlyRentCostList: flatCost ? `[${[...Array(tenacity).fill(price)]}]` : `[${prices.toString()}]`,
      // electricityCost: letter.electricity,
      rentPeriodDate: letter.startDate === null ? null : moment(letter.startDate).format("YYYY-MM-DD"),
      // endRendDate: letter.date,
      firstSignature: letter.firstSignature,
      signatureUrl: userSignature,
      firstSigner: letter.user1,
      secondSigner: userFullName,
      htmlContent1: draftToHtml(convertToRaw(contentMsg1.getCurrentContent())).replaceAll('<br>','<br />'),
      htmlContent2: draftToHtml(convertToRaw(contentMsg2.getCurrentContent())).replaceAll('<br>','<br />'),
      attachments,
      piclandlord: picLandlord,
      electricityType: letter.electricityType,
      // antenaLandCost: letter.antenaLandCost,
      // yearlyServiceCharge: letter.yearlyServiceCharge,
      tenacity,
      startEndRentDate,
      endRendDate: endRentDate,
      electricityCost: parseInt(electricityCost),
      yearlyServiceCharge: parseInt(yearlyServiceCharge),
      antenaLandCost: parseInt(antenaLandCost),
      
    };
    const config = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      setModalLoader(true);
      axios
        .post(
          `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getDraftRenewal`,
          data,
          config
        )
        .then((res) => {
          if (res.status == 200) {
            alert("Success Generate PDF");
            window.location.reload();
          } else {
            alert("Data is not complete");
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

  useEffect(() => {
    setPrice(letter.rentCost);
  }, [letter.rentCost]);

  const RenderImageSlider = ({ filePath }) => {
    const [imageSlider, seImageSlider] = useState(null);
    const [isLoadImage, setLoadImage] = useState(false);
    useEffect(() => {
      try {
        setLoadImage(true);
        getMinioFile(filePath).then((result) => {
          seImageSlider(result);
          setLoadImage(false);
        });
      } catch (err) {
        setLoadImage(false);
      }
    }, []);
    return (
      <div style={{ margin: "auto", height: 120, width: 150 }}>
        {isLoadImage ? (
          <LoadingView />
        ) : imageSlider === null ? null : (
          <img
            src={imageSlider.fileUrl}
            alt="img"
            width="150"
            height="150"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </div>
    );
  };

  function convertHtmlToDraft(html) {
    const contentBlock = htmlToDraft(html);
    let editorState;
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      editorState = EditorState.createWithContent(contentState);
    }
    return editorState;
  }

  const handleUploadAttachment = (event) => {
    if (isMultipleUpload) {
      const { files } = event.target;
      if (files) {
        const newFiles = [];
        for (let i = 0; i < files.length; i++) {
          var file = event.target.files[i];
          if (file) {
            if (file.size < 2097152) {
              event.preventDefault();
              var reader = new FileReader();
              reader.readAsBinaryString(file);

              reader.onload = function () {
                newFiles.push(
                  `data:${file.type};base64,${btoa(reader.result)}`
                );
              };
              reader.onerror = function () {
                // console.log('there are some problems');
              };
            } else {
              event.target.value = null;
              alert(`Please select a file size under 2 MB`);
            }
          }
        }
        setAttachments(newFiles);
      }
    } else {
      var file = event.target.files[0];
      if (file) {
        if (file.size < 2097152) {
          event.preventDefault();
          var reader = new FileReader();
          reader.readAsBinaryString(file);

          reader.onload = function () {
            const metadataParamAttachment = [
              `data:${file.type};base64,${btoa(reader.result)}`,
            ];
            setAttachments(metadataParamAttachment);
          };
          reader.onerror = function () {
            // console.log('there are some problems');
          };
        } else {
          event.target.value = null;
          alert(`Please select a file size under 2 MB`);
        }
      }
    }
  };

  const pricesArrayForMap = flatCost ? [price] : prices;

  const switchEnter = (e, editorState, setEditorState) => {
    let newEditorState = null;
    if(e.keyCode === 13 && e.shiftKey) {
      newEditorState = insertNewUnstyledBlock(editorState);
    } else if(e.keyCode === 13 && !e.shiftKey) {
      newEditorState = RichUtils.insertSoftNewline(editorState);
    };
    if (newEditorState) {
      setEditorState(newEditorState);
      return true;
    }
    return false;
  };

  // ENHANCE MASA SEWA

  // fungsi hitung jangka waktu sewa
  function countRentRange(start, end) {
    if (start === "" || end === "") {
      return [0, 0];
    }
    const mulaiSewa = moment(start);
    const selesaiSewa = moment(end).add(1, "days");
    // years
    const years = selesaiSewa.diff(mulaiSewa, "year");
    return years;
  }

  function dateToShow(timestamp) {
    let dateReturn = "";
    if (timestamp !== "") {
      dateReturn = momentDefault(timestamp);
    }
    return dateReturn;
  }

  function disabledDateAwalSewa(current) {
    return current < moment();
  }

  function disableDateAkhirSewa(current) {
    const tglAwalSewa = moment(startEndRentDate);
    return (
      current < tglAwalSewa || moment(tglAwalSewa).add(5, "year") <= current
    );
  }

  useEffect(() => {
    const newPrices = new Array(tenacity).fill(price);
    setPrices(newPrices);
  }, [tenacity]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.modal}>
        {isOpenModalLoader ? (
          <LoadingView maxheight="100%" />
        ) : (
          <Box className={classes.paper}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Logo style={{ width: 145 }} />
              </Grid>
              <Grid item>
                <Grid container justify="space-between" alignItems="center" direction="row">
                  <Grid item>
                    <Typography variant="body2">
                      <span>
                        {isEmpty(letter.number) ? "N/A" : letter.number}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      <RegularInput
                        value={letterPlace}
                        onChange={(e) => setLetterPlace(e.target.value)}
                      />{", "}
                      <span>
                        {isEmpty(letter.letterDate) ? "N/A" : letter.letterDate}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body2">Kepada YTH: </Typography>
                {letter.receiverName != "null" ? (
                  <Typography className={classes.fontBold}>
                    {isEmpty(letter.receiverName)
                      ? "-"
                      : replaceChar(letter.receiverName, "address")}
                  </Typography>
                ) : null}
                <RegularInput
                  value={picLandlord}
                  onChange={(e) => setPicLandlord(e.target.value)}
                />
                <Typography className={classes.fontBold}>
                  {isEmpty(letter.receiverAddress)
                    ? "N/A"
                    : replaceChar(letter.receiverAddress, "address")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Perihal :{" "}
                  <span className={classes.fontBold}>{subjectEmail}</span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Dengan Hormat,</Typography>
              </Grid>
              <Editor
                editorState={contentMsg1}
                wrapperClassName={classes.wrapperContentMsg1}
                editorClassName={classes.editorContentMsg1}
                onEditorStateChange={(msg) => {
                  setContentMsg1(msg);
                }}
                toolbar={{
                  options: [
                    "inline",
                    "fontSize",
                    "list",
                    "textAlign",
                    "history",
                  ],
                  inline: {
                    options: ["bold", "italic", "underline"],
                  },
                  list: {
                    options: ["unordered", "ordered"],
                  },
                }}
                handleReturn={(e) => switchEnter(e, contentMsg1, setContentMsg1)}
              />
              <Grid item style={{marginBottom: -40, marginTop: 10}}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" className={classes.fontBold}>
                      Masa Sewa :
                    </Typography>
                    <Typography variant="body2">
                      {tenacity} Tahun
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" className={classes.fontBold}>
                      Periode Sewa :
                    </Typography>
                    {/* <Typography variant="body2">
                      {moment(letter.startDate).format("DD MMMM YYYY")} s/d{" "}
                      {moment(letter.date).format("DD MMMM YYYY")}
                    </Typography> */}
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <DatePicker
                          value={dateToShow(startEndRentDate)}
                          format="DD-MM-YYYY"
                          allowClear={false}
                          suffixIcon
                          onChange={(newDate) => {
                            const valDate = newDate.unix() * 1000;
                            setStartEndRentDate(valDate);
                            const rangeRent = countRentRange(valDate,endRentDate);
                            setTenacity(rangeRent);
                          }}
                          className={classes.datePicker}
                          disabledDate={disabledDateAwalSewa}
                          disabled
                          popupStyle={{ zIndex: 1700 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontSize: 15 }}>{" "}s/d{" "}</Typography>
                      </Grid>
                      <Grid item>
                        <DatePicker
                          value={dateToShow(endRentDate)}
                          placeholder="Select date"
                          format="DD-MM-YYYY"
                          allowClear={false}
                          suffixIcon
                          onChange={(newDate) => {
                            const valDate = newDate.unix() * 1000;
                            setEndRentDate(valDate);
                            const rangeRent = countRentRange(startEndRentDate,valDate);
                            setTenacity(rangeRent);
                          }}
                          className={classes.datePicker}
                          disabledDate={disableDateAkhirSewa}
                          popupStyle={{ zIndex: 1700 }}
                        />
                      </Grid>
                      {/* <Grid item>
                        <Typography style={{ fontSize: 15 }}>
                          {`${rentRange[0]} Tahun  ${rentRange[1]} Hari`}
                        </Typography>
                      </Grid> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{marginBottom: 20}}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={6}>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid item>
                        <Typography variant="body2" className={classes.fontBold}>
                          Harga Sewa Ruang ATM :
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Switch 
                          checked={flatCost} 
                          checkedChildren="Flat" 
                          unCheckedChildren="Tiering"
                          onChange={()=>setFlatCost(!flatCost)} 
                        />
                      </Grid>
                    </Grid>
                    {pricesArrayForMap.map((val, i) => {
                      return (
                        <div key={i} style={{ marginTop: 10 }}>
                          <NumberInput
                            value={val}
                            onValueChange={(nilai) =>
                              flatCost
                                ? handlePrice(nilai)
                                : handlePrices(nilai, i)
                            }
                            prefix="Rp."
                            className={classes.priceField}
                          />
                          <span style={{ marginTop: 7, marginLeft: 5 }}>
                            {flatCost
                              ? "/Unit/Tahun"
                              : `Tahun ke-${i + 1}`}
                          </span>
                        </div>
                      );
                    })}
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography variant="body2" className={classes.fontBold}>
                          Jenis Listrik :
                        </Typography>
                        <Typography variant="body2">
                          {/* [{letter.electricityType}] */}
                          {/* <RegularInput
                            value={electricityType}
                            onChange={(e) => setElectricityType(e.target.value)}
                            style={{width: 140}}
                          /> */}
                          <SelectInputAddOption
                            value={electricityType}
                            selectOptionData={dataJenisListrik}
                            onSelectValueChange={(value) =>
                              setElectricityType(value)
                            }
                          />
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" className={classes.fontBold}>
                          Harga Listrik :
                        </Typography>
                        <Typography variant="body2">
                          {/* [{typeof letter.electricity === 'number'
                            ? ConvertRupiah(letter.electricity)
                            : (letter.electricity || '-')}] */}
                          <NumberInput
                            value={electricityCost}
                            onValueChange={(val) => setElectricityCost(val.value)}
                            prefix="Rp."
                            className={classes.priceField}
                          />
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" className={classes.fontBold}>
                          Service Charge :
                        </Typography>
                        <NumberInput
                          value={yearlyServiceCharge}
                          onValueChange={(val) => setYearlyServiceCharge(val.value)}
                          prefix="Rp."
                          className={classes.priceField}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" className={classes.fontBold}>
                          Lahan Antena Vsat:
                        </Typography>
                        <NumberInput
                          value={antenaLandCost}
                          onValueChange={(val) => setAntenaLandCost(val.value)}
                          prefix="Rp."
                          className={classes.priceField}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Editor
                editorState={contentMsg2}
                wrapperClassName={classes.wrapperContentMsg2}
                editorClassName={classes.editorContentMsg2}
                onEditorStateChange={(msg) => {
                  setContentMsg2(msg);
                }}
                toolbar={{
                  options: [
                    "inline",
                    "fontSize",
                    "list",
                    "textAlign",
                    "history",
                  ],
                  inline: {
                    options: ["bold", "italic", "underline"],
                  },
                  list: {
                    options: ["unordered", "ordered"],
                  },
                }}
                handleReturn={(e) => switchEnter(e, contentMsg2, setContentMsg2)}
              />
              <Grid item>
                <Typography variant="body2">Hormat kami,</Typography>
                <Typography variant="body2" className={classes.fontBold}>
                  PT. Bank CIMB Niaga, Tbk.
                </Typography>
              </Grid>
              <Grid item style={{ textAlign: "center", marginTop: 30 }}>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    {letter.firstSignature != null || undefined ? (
                      <RenderImageSlider filePath={letter.firstSignature} />
                    ) : (
                      <Typography
                        style={{
                          fontSize: 13,
                          color: "#DC241F",
                          fontWeight: 400,
                          fontStyle: "italic",
                          paddingTop: 60,
                          height: 120,
                        }}
                      >
                      No signature
                      </Typography>
                    )}
                    <Typography variant="body2" className={classes.fontBold}>{letter.user1}</Typography>
                    <Typography variant="body2">
                      ATM Site Management
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {userSignature != null || undefined ? (
                      <RenderImageSlider filePath={userSignature} />
                    ) : (
                      <Typography
                        style={{
                          fontSize: 13,
                          color: "#DC241F",
                          fontWeight: 400,
                          fontStyle: "italic",
                          paddingTop: 60,
                          height: 120,
                        }}
                      >
                        No signature
                      </Typography>
                    )}
                    <Typography variant="body2" className={classes.fontBold}>{userFullName}</Typography>
                    <Typography variant="body2">
                      ATM Site Management Support
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography className={classes.footerLine}>
                  <b style={{fontSize: '9pt'}}>PT Bank CIMB Niaga Tbk</b><br />
                  Griya Niaga  2 Lt 10 , Jl. Wahid Hasyim Blok B-4 No 3 Bintaro Sektor VII Tangerang 15224<br />
                  Telp  299 72 400  Fax 7486 7959<br />
                  SWIFT <b>BNIAIDJA www.cimbniaga.com</b>
                </Typography>
              </Grid>
              <Grid item>
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
                      onClick={onClose}
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
                      onClick={sendDraft}
                      style={{ textTransform: "capitalize" }}
                    >
                      Generate PDF &amp; Send to Landlord
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </div>
    </Modal>
  );
};

ModalExtensionLetter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // rowToShow: PropTypes.string,
  // siteId: PropTypes.string
};

const defaultLetter = {
  number: "",
  subject: "",
  location: "",
  startDate: "",
  date: "",
  flatCost: "",
  receiver: "",
  receiverName: "",
  receiverAddress: "",
  rentYear: "",
  rentPeriod: "",
  rentCost: "",
  electricity: "",
  user1: "",
  user2: "",
  letterDate: "",
  firstSignature: "",
  secondSignature: "",
  landlordName: "",
  secondActiveUser: "",
  firstActiveUser: "",
};

export default ModalExtensionLetter;
