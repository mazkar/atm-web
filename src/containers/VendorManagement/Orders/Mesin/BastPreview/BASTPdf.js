/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import styles from "./styles";

import CimbLogo from "../../../../../assets/images/logo_cimb_niaga.png";
import NoImage from "../../../../../assets/images/image.png";
import getMinioFile from "../../../../../helpers/getMinioFile";

Font.register({
  family: "Inter",
  src: "https://fonts.gstatic.com/s/inter/v3/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf",
});

// Create Document Component
const BASTPdf = (props) => {
  const { data } = props;
  const [arrCek, setArrCek] = useState([]);

  useEffect(() => {
    const checkArr = [];
    if (data.ups) {
      checkArr.push("UPS");
    }
    if (data.kunciFasciaAtas) {
      checkArr.push("Kunci Fascia Atas");
    }
    if (data.dvr) {
      checkArr.push("DVR");
    }
    if (data.fm) {
      checkArr.push("FM");
    }
    if (data.kunciTombak) {
      checkArr.push("Kunci Tombak");
    }
    if (data.kunciFasciaBawah) {
      checkArr.push("Kunci Fascia Bawah");
    }
    if (data.cctv) {
      checkArr.push("CCTV");
    }
    if (data.pinCover) {
      checkArr.push("Pin Cover");
    }
    if (data.platAntiSkimmer) {
      checkArr.push("Plat Anti Skimmer");
    }
    if (data.booth) {
      checkArr.push("Booth");
    }
    setArrCek(checkArr);
  }, [data]);

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
              <Text style={styles.textValue}>Kepada Yth :</Text>
              <View style={styles.YthField}>
                <Text style={styles.textValue}>Bapak/Ibu </Text>
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
            <Text style={styles.textValue}>Perihal : </Text>
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
                  <Text style={styles.textField}>Area :</Text>
                </View>
                <View style={styles.td}>
                  <Text style={styles.textValue}>{data.areaName}</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>Lokasi :</Text>
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
                  <Text style={styles.textField}>Longitude :</Text>
                </View>
                <View style={styles.td}>
                  <Text style={styles.textValue}>{data.longitude}</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>Kota :</Text>
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
                  <Text style={styles.textValue}>Tgl Pekerjaan :</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>PIC Pekerjaan :</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>No.Engineer :</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Vendor Lainnya :</Text>
                </View>
                {data.namePicFLM ? (
                  <div>
                    <View style={styles.th}>
                      <Text style={styles.textValue}>FLM :</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}

                {data.namePicSLM ? (
                  <div>
                    <View style={styles.th}>
                      <Text style={styles.textValue}>SLM :</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}

                {data.namePicCR ? (
                  <div>
                    <View style={styles.th}>
                      <Text style={styles.textValue}>CR :</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}

                {data.namePicCIT ? (
                  <div>
                    <View style={styles.th}>
                      <Text style={styles.textValue}>CIT :</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}
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
                {data.namePicFLM ? (
                  <div>
                    <View style={styles.columnOther}>
                      <Text style={styles.textField}>{data.namePicFLM}</Text>
                      <Text style={styles.textField}>{data.phoneFLM}</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}

                {data.namePicSLM ? (
                  <div>
                    <View style={styles.columnOther}>
                      <Text style={styles.textField}>{data.namePicSLM}</Text>
                      <Text style={styles.textField}>{data.phoneSLM}</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}

                {data.namePicCR ? (
                  <div>
                    <View style={styles.columnOther}>
                      <Text style={styles.textField}>{data.namePicCR}</Text>
                      <Text style={styles.textField}>{data.phoneCR}</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}

                {data.namePicCIT ? (
                  <div>
                    <View style={styles.columnOther}>
                      <Text style={styles.textField}>{data.namePicCIT}</Text>
                      <Text style={styles.textField}>{data.phoneCIT}</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}
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
                <View style={styles.th}>
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
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>{data.ticketNumber}</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>{data.locationId}</Text>
                </View>
                <View style={styles.locationNm}>
                  <Text style={styles.textField}>{data.locationName}</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>{data.idMesin}</Text>
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
              </View>
            </View>
          </View>

          {/* input detail */}
          <View style={styles.wrapperInpDet}>
            <Text style={styles.textInpDet}>Input Detail</Text>
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
                  <Text style={styles.textValue}>Sticker ID : </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Kondisi Sticker: </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Jumlah Reject : </Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.stickerId != null ? data.stickerId : "-"}
                  </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.kondisiSticker != null ? data.kondisiSticker : "-"}
                  </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.jumlahReject != null ? data.jumlahReject : "-"}
                  </Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Link Video : </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textValue}>Jumlah Kaset : </Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.linkVideo != null ? data.linkVideo : "-"}
                  </Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.textField}>
                    {data.jumlahKaset != null ? data.jumlahKaset : "-"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Kelengkapan Data */}
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Times-Bold",
                marginTop: 20,
                marginBottom: 5,
              }}
            >
              Kelengkapan Data
            </Text>
            <View
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                height: "100",
              }}
            >
              {arrCek.map((item, index) => {
                return (
                  <View style={{ marginVertical: 5, marginRight: 40 }}>
                    <Text style={styles.textValue}>{`${
                      index + 1
                    }. ${item}`}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* foto sesudah */}
          <Text style={{ fontSize: 13, fontFamily: "Times-Bold" }}>
            Foto Sesudah
          </Text>
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
                filePath={data.photoFrontVendor}
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
          <View style={styles.row}>

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
            {/* {data.photoFLMVendor ? (
              <div>
                <View style={styles.columnVendor}>
                  <MinioImageComponent
                    filePath={data.photoFLMVendor}
                    style={styles.imageAfter}
                  />
                  <Text style={(styles.textField, { paddingLeft: 35 })}>
                    FLM
                  </Text>
                </View>
              </div>
            ) : (
              <div />
            )}

            {data.photoSLMVendor ? (
              <div>
                <View style={styles.columnVendor}>
                  <MinioImageComponent
                    filePath={data.photoSLMVendor}
                    style={styles.imageAfter}
                  />
                  <Text style={(styles.textField, { paddingLeft: 35 })}>
                    SLM
                  </Text>
                </View>
              </div>
            ) : (
              <div />
            )}

            {data.photoCRVendor ? (
              <div>
                <View style={styles.columnVendor}>
                  <MinioImageComponent
                    filePath={data.photoCRVendor}
                    style={styles.imageAfter}
                  />
                  <Text style={(styles.textField, { paddingLeft: 35 })}>
                    CR
                  </Text>
                </View>
              </div>
            ) : (
              <div />
            )}

            {data.photoCITVendor ? (
              <div>
                <View style={styles.columnVendor}>
                  <MinioImageComponent
                    filePath={data.photoCITVendor}
                    style={styles.imageAfter}
                  />
                  <Text style={(styles.textField, { paddingLeft: 35 })}>
                    CIT
                  </Text>
                </View>
              </div>
            ) : (
              <div />
            )} */}
          </View>
          <View style={styles.rowfooter}>
            <Text
              style={{
                fontFamily: "Times-Bold",
                fontSize: 13,
                color: "#FF6A6A",
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
  data: PropTypes.object.isRequired,
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
