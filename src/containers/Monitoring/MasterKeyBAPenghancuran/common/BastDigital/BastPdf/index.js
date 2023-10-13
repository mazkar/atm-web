import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import moment from "moment";
import CimbLogo from "../../../../../../assets/images/logo_cimb_niaga.png";
import NoImage from "../../../../../../assets/images/image.png";
import getMinioFile from "../../../../../../helpers/getMinioFile";
import BarlowFont from "../../../../../../assets/fonts/Barlow/Barlow-Regular.ttf";
import BarlowFontBold from "../../../../../../assets/fonts/Barlow/Barlow-Bold.ttf";

Font.register({
  family: "Barlow",
  src: BarlowFont,
});
Font.register({
  family: "Barlow-Bold",
  src: BarlowFontBold,
});
// Create styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 100,
    paddingHorizontal: 35,
  },
  wrapper: {
    paddingBottom: 30,
    paddingLeft: 0,
  },
  section: {
    margin: 10,
    padding: 10,
    flexDirection: "column",
  },
  row: { display: "flex", flexDirection: "row", fontSize: 13, width: "100%" },
  column: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
  },
  PerihalField: {
    display: "flex",
    flexDirection: "row",
    fontSize: 13,
    width: "100%",
    marginTop: 20,
  },
  locOwner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "50%",
  },
  rowYth: {
    display: "flex",
    flexDirection: "row",
    fontSize: 13,
    width: "100%",
    marginTop: 10,
  },
  rowfoot: {
    display: "flex",
    flexDirection: "row",
    fontSize: 13,
    width: "100%",
    paddingTop: 40,
  },
  rowfooter: {
    display: "flex",
    flexDirection: "column",
    fontSize: 13,
    width: "80%",
    paddingTop: 10,
  },
  rowfoto: {
    display: "flex",
    flexDirection: "row",
    fontSize: 13,
    width: "100%",
    paddingTop: 10,
  },
  YthField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 0,
  },
  columnVendor: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
    paddingTop: 60,
    paddingBottom: 15,
  },
  vendorIdentitas: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Barlow-Bold",
    paddingTop: 10,
  },
  AddressField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 10,
    width: "50%",
  },
  th: {
    paddingTop: 15,
    fontWeight: 600,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  td: {
    paddingTop: 10,
    fontWeight: 400,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  vndor: {
    paddingTop: 15,
    fontWeight: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  vndorTitle: {
    paddingTop: 15,
    fontWeight: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  locationNm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 15,
  },
  otherVendor: {
    paddingTop: 15,
    fontWeight: 600,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  valueVendor: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
  },
  textField: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Barlow-Bold",
  },
  textValue: {
    fontSize: 13,
    fontWeight: 400,
    fontFamily: "Barlow",
  },
  textFooter: {
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "Barlow",
    color: "#DC241F",
    textAlign: "justify",
  },
  MiddleValue: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Barlow-Bold",
    textAlign: "left",
    marginLeft: 80,
  },
  text: {
    fontSize: 13,
    fontWeight: 400,
    fontFamily: "Inter",
  },
  image: {
    width: 146,
    height: 46,
  },
  imageAfter: {
    borderRadius: 10,
    width: "100px",
    height: "80px",
  },
  columnOther: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
    paddingTop: 15,
  },
  vendorName: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Barlow-Bold",
    paddingLeft: 15,
  },
  imageVendor: {
    borderRadius: 10,
    width: "60px",
    height: "98px",
  },
  ketFoto: {
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "Barlow-Bold",
    paddingLeft: 20,
  },
  wrapperInpDet: {
    paddingBottom: 30,
    paddingTop: 10,
    paddingLeft: 0,
  },
  textInpDet: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Barlow-Bold",
    color: "#8D98B4",
  },
});

// Create Document Component
const BASTPdf = (props) => {
  const { data, dataChecked } = props;
  return (
    <Document>
      <Page style={styles.page} wrap>
        <View style={styles.section}>
          <Image style={styles.image} src={CimbLogo} />
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.textValue}>{data.noReference}</Text>
              <Text style={styles.textValue}>{data.letterDate}</Text>
            </View>
          </View>
          <View style={styles.rowYth}>
            <View style={styles.column}>
              <Text style={styles.textValue}>Kepada Yth:</Text>
              <View style={styles.YthField}>
                <Text style={styles.textValue}>Bapak/Ibu:</Text>
                <Text style={styles.textField}>{data.nameLandlord}</Text>
              </View>
              <View style={styles.YthField}>
                <Text style={styles.textValue}>Pemilik Pengelola Lokasi</Text>
              </View>
              <View style={styles.locOwner}>
                <Text style={styles.textField}>{data.locationName}</Text>
              </View>
            </View>
          </View>
          <View style={styles.PerihalField}>
            <Text style={styles.textValue}>Perihal:</Text>
            <Text style={styles.textField}>Berita Acara Serah Terima</Text>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>ID ATM :</Text>
                </View>
                <View style={styles.td}>
                  <Text style={styles.textValue}>{data.atmId}</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>Area:</Text>
                </View>
                <View style={styles.td}>
                  <Text style={styles.textValue}>{data.areaName}</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>Lokasi:</Text>
                </View>
                <View style={styles.td}>
                  <Text style={styles.textValue}>{data.locationName}</Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>Latitude :</Text>
                </View>
                <View style={styles.td}>
                  <Text style={styles.textValue}>{data.latitude}</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>Longitude:</Text>
                </View>
                <View style={styles.td}>
                  <Text style={styles.textValue}>{data.longitude}</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>Kota:</Text>
                </View>
                <View style={styles.td}>
                  <Text style={styles.textValue}>{data.cityName}</Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>Alamat :</Text>
                </View>
                <View style={styles.AddressField}>
                  <Text style={styles.textValue}>{data.locationAddress}</Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Tgl Pekerjaan: </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>PIC Pekerjaan: </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>No.Engineer: </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Vendor Lainnya: </Text>
                </View>
                <View
                  style={{
                    paddingTop: 15,
                    fontWeight: 600,
                    display: "flex",
                    flexDirection: "colum",
                    justifyContent: "flex-start",
                  }}
                >
                  {dataChecked.checkedFLM ? (
                    <View style={styles.row}>
                      <Text style={styles.textValue}>FLM :</Text>
                    </View>
                  ) : (
                    <div />
                  )}

                  {dataChecked.checkedSLM ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          fontSize: 13,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedJarkom == false &&
                            dataChecked.checkedSecurity == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedOther == false
                              ? 0
                              : 40,
                        }}
                      >
                        <Text style={styles.textValue}>SLM :</Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}

                  {dataChecked.checkedCR ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          fontSize: 13,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedJarkom == false &&
                            dataChecked.checkedSecurity == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedOther == false
                              ? 0
                              : 40,
                        }}
                      >
                        <Text style={styles.textValue}>CR :</Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}
                  {dataChecked.checkedSecurity ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          fontSize: 13,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedJarkom == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedOther == false
                              ? 0
                              : 40,
                        }}
                      >
                        <Text style={styles.textValue}>Maintenance:</Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}
                  {dataChecked.checkedJarkom ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          fontSize: 13,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedSecurity == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedOther == false
                              ? 0
                              : 40,
                        }}
                      >
                        <Text style={styles.textValue}>Jarkom :</Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}
                  {dataChecked.checkedSurvey ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          fontSize: 13,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedSecurity == false &&
                            dataChecked.checkedJarkom == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedOther == false
                              ? 0
                              : 40,
                        }}
                      >
                        <Text style={styles.textValue}>Survey:</Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}
                  {dataChecked.checkedPromosi ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          fontSize: 13,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedSecurity == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedJarkom == false &&
                            dataChecked.checkedOther == false
                              ? 0
                              : 40,
                        }}
                      >
                        <Text style={styles.textValue}>Promosi :</Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}
                  {dataChecked.checkedOther ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          fontSize: 13,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedSecurity == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedJarkom == false
                              ? 0
                              : 40,
                        }}
                      >
                        <Text style={styles.textValue}>Other :</Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>{data.processingDate}</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>{data.picVendor}</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.engineerTelephoneNumber}
                  </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField} />
                </View>
                <View style={styles.vndor}>
                  {dataChecked.checkedFLM ? (
                    <div>
                      <View style={styles.columnOther}>
                        <Text style={styles.textField}>{data.namePicFLM}</Text>
                        <Text style={styles.vendorIdentitas}>
                          {data.phoneFLM}
                        </Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}
                  {dataChecked.checkedSLM ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedJarkom == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedSecurity == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedOther == false
                              ? 30
                              : 15,
                        }}
                      >
                        <Text style={styles.textField}>{data.namePicSLM}</Text>
                        <Text style={styles.vendorIdentitas}>
                          {data.phoneSLM}
                        </Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}

                  {dataChecked.checkedCR ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedJarkom == false &&
                            dataChecked.checkedSecurity == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedOther == false
                              ? 30
                              : 15,
                        }}
                      >
                        <Text style={styles.textField}>{data.namePicCR}</Text>
                        <Text style={styles.vendorIdentitas}>
                          {data.phoneCR}
                        </Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}

                  {dataChecked.checkedJarkom ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedSecurity == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedOther == false
                              ? 30
                              : 15,
                        }}
                      >
                        <Text style={styles.textField}>
                          {data.namePicJarkom}
                        </Text>
                        <Text style={styles.vendorIdentitas}>
                          {data.phoneJarkom}
                        </Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}

                  {dataChecked.checkedSecurity ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedJarkom == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedOther == false
                              ? 30
                              : 15,
                        }}
                      >
                        <Text style={styles.textField}>
                          {data.namePicSecurity}
                        </Text>
                        <Text style={styles.vendorIdentitas}>
                          {data.phoneSecurity}
                        </Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}
                  {dataChecked.checkedSurvey ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedJarkom == false &&
                            dataChecked.checkedSecurity == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedOther == false
                              ? 30
                              : 15,
                        }}
                      >
                        <Text style={styles.textField}>
                          {data.namePicSurvey}
                        </Text>
                        <Text style={styles.vendorIdentitas}>
                          {data.phoneSurvey}
                        </Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}
                  {dataChecked.checkedPromosi ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedJarkom == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedSecurity == false &&
                            dataChecked.checkedOther == false
                              ? 15
                              : 15,
                        }}
                      >
                        <Text style={styles.textField}>
                          {data.namePicPromosi}
                        </Text>
                        <Text style={styles.vendorIdentitas}>
                          {data.phonePromosi}
                        </Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}
                  {dataChecked.checkedOther ? (
                    <div>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          width: "100%",
                          paddingTop:
                            dataChecked.checkedFLM == false &&
                            dataChecked.checkedSLM == false &&
                            dataChecked.checkedCR == false &&
                            dataChecked.checkedJarkom == false &&
                            dataChecked.checkedSurvey == false &&
                            dataChecked.checkedPromosi == false &&
                            dataChecked.checkedSecurity == false
                              ? 30
                              : 15,
                        }}
                      >
                        <Text style={styles.textField}>
                          {data.namePicOther}
                        </Text>
                        <Text style={styles.vendorIdentitas}>
                          {data.phoneOther}
                        </Text>
                      </View>
                    </div>
                  ) : (
                    <div />
                  )}
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textValue}>No.Ticket: </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>ID Location: </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Nama Lokasi:</Text>
                </View>
                <View
                  style={{
                    paddingTop: data.locationName.length >= 15 ? 30 : 15,
                    fontWeight: 600,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text style={styles.textValue}>ID Mesin: </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Jenis Pekerjaan: </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Tanggal Request: </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Keterangan: </Text>
                </View>
                <View
                  style={{
                    paddingTop: data.locationName.length >= 15 ? 30 : 15,
                    fontWeight: 600,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text style={styles.textValue}>Link Video: </Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.ticketNumber ? data.ticketNumber : "-"}
                  </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>{data.locationId}</Text>
                </View>
                <View style={styles.locationNm}>
                  <Text style={styles.textField}>{data.locationName}</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.idMesin ? data.idMesin : "-"}
                  </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>{data.jobType}</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>{data.requestDate}</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>{data.notesDescription}</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>{data.linkVideo}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Detail Atribut */}
          <View style={styles.wrapperInpDet}>
            <Text style={styles.textInpDet}>Detail Atribut</Text>
            <View
              style={{
                width: "100%",
                height: 1.5,
                marginTop: 5,
                marginBottom: 7,
                backgroundColor: "#8D98B4",
              }}
            />
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textValue}>No Part : </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Tgl Installasi: </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>PIC Pasang: </Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.partNumber != null ? data.partNumber : "-"}
                  </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {moment(data.installationDate).format("DD/MM/YYYY")}
                  </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.picInstall != null ? data.picInstall : "-"}
                  </Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Merk/Type/Nama : </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>No Sticker Aset : </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Version : </Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.brandTypeName != null ? data.brandTypeName : "-"}
                  </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.stickerId != null ? data.stickerId : "-"}
                  </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.version != null ? data.version : "-"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={{ fontSize: 13, fontFamily: "Barlow-Bold" }}>
              Foto Sebelum
            </Text>
          </View>
          <View style={styles.rowfoto}>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoFrontCimb}
                style={styles.imageAfter}
              />
              <Text style={styles.ketFoto}>Sebelum 1</Text>
              <Text style={styles.textValue}>{data.datefrontCimb}</Text>
            </View>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoRightCimb}
                style={styles.imageAfter}
              />
              <Text style={styles.ketFoto}>Sebelum 2</Text>
              <Text style={styles.textValue}>{data.dateRightCimb}</Text>
            </View>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoLeftCimb}
                style={styles.imageAfter}
              />
              <Text style={styles.ketFoto}>Sebelum 3</Text>
              <Text style={styles.textValue}>{data.dateLeftCimb}</Text>
            </View>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoRearCimb}
                style={styles.imageAfter}
              />
              <Text style={styles.ketFoto}>Sebelum 4</Text>
              <Text style={styles.textValue}>{data.dateRearCimb}</Text>
            </View>
          </View>
          <View style={{ paddingTop: 30 }}>
            <Text style={{ fontSize: 13, fontFamily: "Barlow-Bold" }}>
              Foto Sesudah
            </Text>
          </View>
          <View style={styles.rowfoto}>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoFrontVendor}
                style={styles.imageAfter}
              />

              <Text style={styles.ketFoto}>Sesudah 1</Text>
              <Text style={styles.textValue}>{data.dateFrontVendor}</Text>
            </View>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoRightVendor}
                style={styles.imageAfter}
              />
              <Text style={styles.ketFoto}>Sesudah 2</Text>
              <Text style={styles.textValue}>{data.dateRightVendor}</Text>
            </View>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoLeftVendor}
                style={styles.imageAfter}
              />
              <Text style={styles.ketFoto}>Sesudah 3</Text>
              <Text style={styles.textValue}>{data.dateLeftVendor}</Text>
            </View>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoRearVendor}
                style={styles.imageAfter}
              />
              <Text style={styles.ketFoto}>Sesudah 4</Text>
              <Text style={styles.textValue}>{data.dateRearVendor}</Text>
            </View>
          </View>
          <View style={styles.rowfoot}>
            <Text style={styles.textValue}>
              Demikian kami sampaikan atas perhatian dan kerjasamanya kami
              ucapkan terima kasih.
            </Text>
          </View>

          {data.photoSignVendor ? (
            <View style={styles.columnVendor}>
              <MinioImageComponent
                filePath={data.photoSignVendor}
                style={styles.imageVendor}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Barlow-Bold",
                  textAlign: "left",
                  marginLeft: 10,
                }}
              >
                {data.picVendor}
              </Text>
            </View>
          ) : (
            <div />
          )}

          <View style={styles.rowfooter}>
            <Text
              style={{
                fontFamily: "Barlow-Bold",
                fontSize: 13,
                color: "#DC241F",
              }}
            >
              PT. Bank CIMB Niaga Tbk
            </Text>
            <Text style={styles.textFooter}>
              Griya Niaga 2.lt 10, Jl.Wahid Hasyim Blok B-4 No 3 Bintaro Sektor
              VII Tangerang 15224 Telp 299 72 400 Fax 7486 7959 SWIFT BNIAIDJA
              www.cimb.com
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default BASTPdf;
BASTPdf.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  dataChecked: PropTypes.object.isRequired,
};
const MinioImageComponent = ({ filePath, ...others }) => {
  const [minioFile, setMinioFile] = useState(null);

  useEffect(() => {
    if (filePath) {
      try {
        getMinioFile(filePath).then((result) => {
          // console.log(">>>> try getMinio Offering ", JSON.stringify(result));
          setMinioFile(result);
        });
      } catch (err) {
        console.log(">>>> Error try getMinio", err);
      }
    }
  }, [filePath]);
  return (
    <>
      {minioFile !== null ? (
        <Image src={minioFile.fileUrl} alt="img" {...others} />
      ) : (
        <Image src={NoImage} alt="img" {...others} />
      )}
    </>
  );
};

MinioImageComponent.propTypes = {
  filePath: PropTypes.string.isRequired,
};
