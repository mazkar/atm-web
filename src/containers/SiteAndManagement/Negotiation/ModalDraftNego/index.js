/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, RichUtils } from "draft-js";
import { handleNewLine, insertNewUnstyledBlock } from 'draftjs-utils';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import moment from "moment";
import locale from "antd/lib/locale/id_ID";
import constants from "../../../../helpers/constants";
import LogoCimb from "../../../../assets/images/logo_cimb_niaga.png";
import { ChkyButtons, ChkyInputSmall } from "../../../../components";
import {
  doGetRequestDraftNegotation,
  doSaveNegotiation,
  doSendDraftNegotiation,
} from "../ApiServiceNegotiation";
import { isObejctEmpty } from "../../../../helpers/useFormatter";
import useRupiahConverterSecondary from "../../../../helpers/useRupiahConverterSecondary";
import explodeArray from "../../../../helpers/explodeArray";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "moment/locale/id";
import { DatePicker, ConfigProvider } from "antd";
import { ReactComponent as CalendarIcon } from "../../../../assets/images/calendar-alt.svg";
import CurrentNego from "./CurrentNego";

moment.locale("id");

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1200 !important",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 720,
    height: "90%",
    borderRadius: 10,
    padding: 50,
    overflow: "scroll",
  },
  text: {
    fontWeight: 400,
    fontSize: 13,
    textAlign: 'justify'
  },
  titleTable: { color: "#FFFFFF", fontWeight: 500, fontSize: 10 },
  textTable: { fontWeight: 400, fontSize: 10 },
  divider: { marginTop: 20 },
  divider10: { marginTop: 10 },
  buttonContainer: {
    marginTop: 36,
  },
  fieldOfferingNumb: {
    width: 90,
  },
  editorContentMsg: {
    border: "1px solid",
    borderColor: "black",
    height: 100,
    paddingLeft: 12,
    paddingRight: 12,
    '& .public-DraftStyleDefault-ltr': {
      textAlign: 'unset'
    }
  },
  wrapperContentMsg: {
    width: "100%",
  },
  inputForm: {
    borderRadius: 8,
    border: "1px solid #BCC8E7",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    height: 34,
  },
});
const ModalDraftNego = ({
  isOpen,
  onClose,
  onNext,
  dataNego,
  dataHitSaveNego,
  idGet,
  loaderHandler,
  dataMinor,
  openingType
}) => {
  const classes = useStyles();
  const [dataDraft, setDataDraft] = useState({});
  const [offeringLetterNumber, setOfferingLetterNumber] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [tanggalSurat, setTanggalSurat] = useState("");
  const [offeringLetterDate, setOfferingLetterDate] = useState(moment());
  const htmlContent =
    '<p style="text-align:justify;">Demikian kami sampaikan, selanjutnya akan diajukan ke manajemen pusat.<br/>Besar harapan kami untuk dapat menerima kabar positif dari pihak Bapak / Ibu. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.</p>';
  const [contentMsg, setContentMsg] = useState(convertHtmlToDraft(htmlContent));
  const dateFormatList = ["DD MMMM YYYY", "YYYY MMMM DD"];
  moment.locale("id");

  function doSetLokasi(letterDate) {
    if (letterDate === "" || letterDate === null || letterDate === undefined) {
      setLokasi("");
      setTanggalSurat("");
    }
    const res = letterDate.split(",");
    setLokasi(res[0]);
    setTanggalSurat(res[1]);
  }

  useEffect(() => {
    console.log("+++ dataHitSaveNego", dataHitSaveNego);
    console.log("+++ dataMinor", dataMinor);
    
    if (isOpen) {
      const dataHit = { id: idGet };
      doGetRequestDraftNegotation(loaderHandler, dataHit).then((response) => {
        console.log(
          "+++ doGetRequestDraftNegotation: ",
          JSON.stringify(response)
        );
        if (response) {
          if (response.status === 200) {
            setDataDraft(response.data);
            // setOfferingLetterNumber(response.data.offeringLetterNumber);
            setOfferingLetterNumber("");
            const offeringLetterDate = moment(
              response.data.offeringLetterDate,
              "DD MMMM YYYY"
            );
            setOfferingLetterDate(offeringLetterDate);
            doSetLokasi(response.data.letterDate);
          }
        } else {
          alert("Error get draft negotiation");
        }
      });
    }
  }, [isOpen]);

  useEffect(() => {
    console.log('+++ dataDraft', dataDraft);
  }, [dataDraft])

  // Demikian kami sampaikan, selanjutnya akan diajukan ke manajemen pusat.< br />
  //   Besar harapan kami untuk dapat menerima kabar positif dari pihak Bapak / Ibu.Atas perhatian dan kerjasamanya kami ucapkan terima kasih.

  function handleChangeLetterNumber(e) {
    setOfferingLetterNumber(e.target.value);
  }

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

  const handleSendLandlord = () => {
    if (isObejctEmpty(dataDraft)) {
      if (window.confirm("Body request empty, please reload page")) {
        window.location.reload();
      }
    } else {
      doSaveNegotiation(loaderHandler, dataHitSaveNego).then(
        dataFromApiSave => {
          if(dataFromApiSave.data.responseCode === '00'){
            // alert('Submit Draft Nego Success, Get email format Send to Landlord');
            // handleOpenModalDraft();

            const negotiationsAfterCurrentSaved = dataDraft.negotiations.slice();
            negotiationsAfterCurrentSaved.push({
              negotiationStep: dataDraft.negotiations.length+1,
              offeringPriceCimb: dataHitSaveNego.offeringPriceCimb,
              offeringPriceCimbList: JSON.stringify(dataHitSaveNego.offeringPriceCimbList),
              offeringPriceLandlord: dataHitSaveNego.offeringPriceLandlord,
              offeringPriceLandlordList: JSON.stringify(dataHitSaveNego.offeringPriceLandlordList),
            });

            const dataHit = {
              id: idGet,
              referenceNumber: dataDraft.referenceNumber,
              letterDate: `${lokasi},${tanggalSurat}`,
              sendTo: dataDraft.sendTo,
              subject: dataDraft.subject,
              offeringLetterNumber,
              offeringLetterDate: moment(offeringLetterDate).format(
                dateFormatList[0]
              ),
              locationName: dataDraft.locationName,
              rentPeriod: dataDraft.rentPeriod,
              buildingLarge: dataDraft.buildingLarge,
              negotiations: negotiationsAfterCurrentSaved,
              securityDeposit: dataMinor.securityDeposit,
              yearlyElectricityCost: dataMinor.yearlyElectricityCost,
              electricityType: dataDraft.electricityType,
              antenaLandCost: dataMinor.antenaLandCost,
              yearlySignageCost: dataMinor.yearlySignageCost,
              htmlContent: draftToHtml(convertToRaw(contentMsg.getCurrentContent())).replaceAll('<br>','<br />'),
              // atmId: dataMinor.atmId,
            };
            doSendDraftNegotiation(loaderHandler, dataHit).then((response) => {
              // console.log("<<< doSendDraftNegotiation", JSON.stringify(response));
              if (response) {
                if (response.data.statusCode === 200) {
                  window.alert("Send Landlord email success.");
                  window.location.reload();
                } else {
                  alert("Send Landlord email failed, Please try again!");
                }
              } else {
                alert("Error send draft negotiation, Please try again!");
              }
            });
          }
        });
     
    }
  };

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

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.paper}>
        <img style={{ width: 146 }} src={LogoCimb} alt="logo-img" />
        <div className={classes.divider} />
        <div className={classes.divider} />
        <Typography className={classes.text}>
          {isObejctEmpty(dataDraft) ? "-" : dataDraft.referenceNumber}
        </Typography>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <ChkyInputSmall
              placeholder="Lokasi"
              className={classes.fieldOfferingNumb}
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Typography className={classes.text}>,{tanggalSurat}</Typography>
          </Grid>
        </Grid>

        <div className={classes.divider} />
        <Typography className={classes.text}>Kepada Yth :</Typography>
        <Typography className={classes.text}>
          <b>[{isObejctEmpty(dataDraft) ? "-" : dataDraft.sendTo}]</b>
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.text}>
          Perihal :{" "}
          <b>{isObejctEmpty(dataDraft) ? "-" : dataDraft.subject}</b>
        </Typography>
        <div className={classes.divider} />
        <Typography className={classes.text}>Dengan Hormat,</Typography>
        <div className={classes.divider} />
        <Typography className={classes.text}>
          Menanggapi surat penawaran Bapak/ Ibu no :{" "}
          <b>
            <ChkyInputSmall
              placeholder="Input nomor surat"
              className={classes.fieldOfferingNumb}
              // value={isObejctEmpty(offeringLetterNumber) ? '-' : offeringLetterNumber }
              value={offeringLetterNumber}
              onChange={handleChangeLetterNumber}
            />
            {/* <input type="text" name="fname" value={isObejctEmpty(dataDraft) ? '-' : dataDraft.offeringLetterNumber}/> */}
          </b>{" "}
          tanggal{" "}
          <b>
            <ConfigProvider locale={locale}>
              <DatePicker
                className={classes.inputForm}
                popupStyle={{ zIndex: 1700 }}
                clearIcon
                suffixIcon={<CalendarIcon className="DateSelect__icon" />}
                format={dateFormatList[0]}
                value={offeringLetterDate}
                onChange={(e) => {
                  moment.locale("id");
                  setOfferingLetterDate(moment(e, "DD MMMM YYYY"));
                }}
                allowClear={false}
              />
            </ConfigProvider>
            {/* [{isObejctEmpty(dataDraft) ? '-' : dataDraft.offeringLetterDate}] */}
          </b>
          , perihal Penawaran Harga Sewa Ruang ATM di{" "}
          <b>[{isObejctEmpty(dataDraft) ? "-" : dataDraft.locationName}]</b>.
          Kami bermaksud untuk mengajukan penawaran sebagai berikut :
        </Typography>
        <div className={classes.divider} />
        <Grid
          container
          alignItems="center"
          justify="space-between"
          style={{ background: "#DC241F", padding: 10 }}
        >
          <Grid item xs={2}>
            <Typography className={classes.titleTable}>Item</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.titleTable}>Harga Sewa</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.titleTable}>
              Security Deposit
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.titleTable}>Listrik</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.titleTable}>
              Lahan Antena VSAT
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.titleTable}>
              Lahan Neon Sign
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.divider10} />
        {!isObejctEmpty(dataDraft) && (
          <div>
            {dataDraft.negotiations.map((item, j) => {
              // return 'ada Data';
              const {
                offeringPriceLandlordList,
                offeringPriceCimbList,
              } = item;
              const offeringPriceLandlordArr = explodeArray(
                offeringPriceLandlordList
              );
              const offeringPriceCimbArr = explodeArray(
                offeringPriceCimbList
              );
              const customStyle = openingType?.toLowerCase() === 'renewal' && j === 0 ? {fontWeight: "bold"} : null;
              return (
                <div key={j}>
                  <div
                    style={{
                      border: "1px solid #E6EAF3",
                      borderRadius: 4,
                      position: "relative",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: 10,
                        color: "#8D98B4",
                        fontWeight: 500,
                        padding: "4px 10px",
                        borderBottomRightRadius: 4,
                        background: "#E6EAF3",
                        position: "absolute",
                        left: 0,
                        top: 0,
                      }}
                    >
                      Nego {item.negotiationStep}
                    </Typography>
                    <div
                      style={{
                        padding: 10,
                        fontWeight: 500,
                        fontSize: 10,
                        marginTop: 20,
                      }}
                    >
                      <Grid
                        container
                        alignItems="flex-start"
                        justify="space-between"
                        style={{ marginBottom: 9 }}
                      >
                        <Grid item xs={2}>
                          <Typography className={classes.textTable} style={customStyle} >
                            Pemilik/PT {j===0 && <span style={{color: '#8D98B4'}}>(Existing)</span>}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          {offeringPriceLandlordArr?.map((price, i) => {
                            return (
                              <Typography key={i} className={classes.textTable}>
                                {offeringPriceLandlordArr
                                  ? `th - ${i + 1} : `
                                  : ""}
                                {useRupiahConverterSecondary(price*1)}
                              </Typography>
                            );
                          })}
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.textTable}>
                            {dataMinor.securityDeposit === null || dataMinor.securityDeposit === 0
                              ? "-"
                              : useRupiahConverterSecondary(
                                dataMinor.securityDeposit
                              )}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.textTable}>
                            {isObejctEmpty(dataDraft) ? "-" : 
                              dataDraft.electricityType.toLowerCase() === 'include' ? dataDraft.electricityType :
                                (<>
                                  {dataMinor.yearlyElectricityCost === null || dataMinor.yearlyElectricityCost === 0
                                    ? "-"
                                    : useRupiahConverterSecondary(
                                      dataMinor.yearlyElectricityCost
                                    )}
                                </>)
                            }
                            
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.textTable}>
                            {dataMinor.antenaLandCost === null || dataMinor.antenaLandCost === 0
                              ? "-"
                              : useRupiahConverterSecondary(
                                dataMinor.antenaLandCost
                              )}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.textTable}>
                            {dataMinor.yearlySignageCost === null || dataMinor.yearlySignageCost === 0
                              ? "-"
                              : useRupiahConverterSecondary(
                                dataMinor.yearlySignageCost
                              )}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        alignItems="flex-start"
                        justify="space-between"
                      >
                        <Grid item xs={2}>
                          <Typography className={classes.textTable}>
                            PT. CIMB Niaga
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          {offeringPriceCimbArr?.map((price, i) => {
                            return (
                              <Typography key={i} className={classes.textTable}>
                                {offeringPriceCimbArr
                                  ? `th - ${i + 1} : `
                                  : ""}
                                {useRupiahConverterSecondary(price*1)}
                              </Typography>
                            );
                          })}
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.textTable}>
                            {dataMinor.securityDeposit === null || dataMinor.securityDeposit === 0
                              ? "-"
                              : useRupiahConverterSecondary(
                                dataMinor.securityDeposit
                              )}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.textTable}>
                            {isObejctEmpty(dataDraft) ? "-" : 
                              dataDraft.electricityType.toLowerCase() === 'include' ? dataDraft.electricityType :
                                (<>
                                  {dataMinor.yearlyElectricityCost === null || dataMinor.yearlyElectricityCost === 0
                                    ? "-"
                                    : useRupiahConverterSecondary(
                                      dataMinor.yearlyElectricityCost
                                    )}
                                </>)
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.textTable}>
                            {dataMinor.antenaLandCost === null || dataMinor.antenaLandCost === 0
                              ? "-"
                              : useRupiahConverterSecondary(
                                dataMinor.antenaLandCost
                              )}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.textTable}>
                            {dataMinor.yearlySignageCost === null || dataMinor.yearlySignageCost === 0
                              ? "-"
                              : useRupiahConverterSecondary(
                                dataMinor.yearlySignageCost
                              )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <div className={classes.divider10} />
                </div>
              );
            })}
          </div>
        )}
        <CurrentNego data={dataHitSaveNego} dataMinor={dataMinor} dataDraft={dataDraft} negoStep={!isObejctEmpty(dataDraft)? dataDraft.negotiations.length+1: 1}/>
        <div className={classes.divider10} />
        <Typography className={classes.text}>
          Masa Sewa :{" "}
          <b>[{isObejctEmpty(dataDraft) ? "-" : dataDraft.rentPeriod}]</b>{" "}
          tahun Exclude PPn, Include PPh
          <br />
          Luas :{" "}
          <b>
            [{isObejctEmpty(dataDraft) ? "-" : dataDraft.buildingLarge}]
          </b>{" "}
          m2
          <br />
          <br />
          Cara Pembayaran : Selambatnya 20 (dua puluh) hari kerja setelah
          invoice yang lengkap dan benar serta bermaterai dan e-faktur telah
          diterima CIMB Niaga (Kantor Pusat Bintaro). Dengan syarat Perjanjian
          Sewa Ruangan ATM CIMB Niaga telah ditandatangani ke dua belah pihak.
          <br />
          <br />
          <Editor
            editorState={contentMsg}
            wrapperClassName={classes.wrapperContentMsg}
            editorClassName={classes.editorContentMsg}
            onEditorStateChange={(msg) => {
              setContentMsg(msg);
            }}
            toolbar={{
              options: ["inline", "fontSize", "list", "textAlign", "history"],
              inline: {
                options: ["bold", "italic", "underline"],
              },
              list: {
                options: ["unordered", "ordered"],
              },
            }}
            handleReturn={(e) => switchEnter(e, contentMsg, setContentMsg)}
          />
          {/* Demikian kami sampaikan, selanjutnya akan diajukan ke manajemen pusat.<br/>
        Besar harapan kami untuk dapat menerima kabar positif dari pihak Bapak/ Ibu. Atas perhatian dan kerjasamanya kami ucapkan terima kasih. */}
          <br />
          <br />
          <br />
          Hormat kami,
          <br />
          PT. Bank CIMB Niaga, Tbk.
        </Typography>

        <Grid
          container
          justify="space-between"
          className={classes.buttonContainer}
        >
          <Grid item>
            <ChkyButtons
              style={{ textTransform: "capitalize" }}
              buttonType="redOutlined"
              onClick={onClose}
            >
              Cancel
            </ChkyButtons>
          </Grid>

          <Grid item>
            <ChkyButtons
              style={{ textTransform: "capitalize" }}
              onClick={handleSendLandlord}
            >
              Send to Landlord
            </ChkyButtons>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalDraftNego.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  dataNego: PropTypes.object.isRequired,
  dataHitSaveNego: PropTypes.object.isRequired,
  idGet: PropTypes.string.isRequired,
  loaderHandler: PropTypes.func.isRequired,
  dataMinor: PropTypes.object.isRequired,
};

export default ModalDraftNego;
