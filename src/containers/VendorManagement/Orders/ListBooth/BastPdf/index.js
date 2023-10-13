/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import styles from "./styles";

import CimbLogo from "../../../../../assets/images/logo_cimb_niaga.png";
import NoImage from "../../../../../assets/images/image.png";
import ATM4 from "../../../../../assets/images/atmcimb.png";
import getMinioFile from "../../../../../helpers/getMinioFile";

Font.register({
  family: "Inter",
  src: "https://fonts.gstatic.com/s/inter/v3/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf",
});

// Create Document Component
const BastPdf = (props) => {
  const { data, dataChecked } = props;
  console.log("DATA BAST DIGITAL =>", data);
  console.log("dataChecked BAST DIGITAL =>", dataChecked);
  console.log("INI LENGTH =>", data.locationName.length);
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

                {dataChecked.checkedFLM ? (
                  <div>
                    <View style={styles.th}>
                      <Text style={styles.textValue}>FLM :</Text>
                    </View>
                    <View style={styles.th}>
                      <Text style={styles.textValue}>&nbsp;</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}

                {dataChecked.checkedSLM ? (
                  <div>
                    <View style={styles.th}>
                      <Text style={styles.textValue}>SLM :</Text>
                    </View>
                    <View style={styles.th}>
                      <Text style={styles.textValue}>&nbsp;</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}

                {dataChecked.checkedVendorJaringan ? (
                  <div>
                    <View style={styles.th}>
                      <Text style={styles.textValue}>Jarkom :</Text>
                    </View>
                    <View style={styles.th}>
                      <Text style={styles.textValue}>&nbsp;</Text>
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
                {dataChecked.checkedFLM ? (
                  <div
                    style={{
                      marginTop: dataChecked.checkedFLM === false ? 5 : 0,
                    }}
                  >
                    <View style={styles.columnOther}>
                      <Text style={styles.textField}>{data.nameFLM}</Text>
                    </View>
                    <View style={styles.columnSecondOther}>
                      <Text style={styles.textField}>{data.phoneFLM}</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}

                {dataChecked.checkedSLM ? (
                  <div
                    style={{
                      marginTop: !dataChecked.checkedFLM === false ? -5 : 3,
                    }}
                  >
                    <View style={styles.columnOther}>
                      <Text style={styles.textField}>{data.nameSLM}</Text>
                    </View>
                    <View style={styles.columnSecondOther}>
                      <Text style={styles.textField}>{data.phoneSLM}</Text>
                    </View>
                  </div>
                ) : (
                  <div />
                )}

                {dataChecked.checkedVendorJaringan ? (
                  <div
                    style={{
                      marginTop: !dataChecked.checkedFLM === false ? -2 : 2,
                    }}
                  >
                    <View style={styles.columnOther}>
                      <Text style={styles.textField}>{data.nameJarkom}</Text>
                    </View>
                    <View style={styles.columnSecondOther}>
                      <Text style={styles.textField}>{data.phoneJarkom}</Text>
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
                <View
                  style={{
                    ...styles.th,
                    paddingTop: data.locationName.length > 16 ? 30 : 15,
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
                <View style={styles.th}>
                  <Text style={styles.textValue}>Link Video: </Text>
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
                  <Text style={styles.textField}>
                    {data.idMesin !== undefined ? data.idMesin : "-"}
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
          {/* Foto Sebelum */}
          <Text style={{ fontSize: 13, fontFamily: "Times-Bold" }}>
            Foto Sebelum
          </Text>
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

          {/* foto sesudah */}
          <View
            style={{
              marginTop: 28,
            }}
          >
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
                  filePath={data.photoRearVendor}
                  style={styles.imageAfter}
                />
                <Text style={styles.ketFoto}>Sesudah 4</Text>
                <Text style={styles.textValue}>{data.dateRearVendor}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rowfoot}>
            <Text style={styles.textValue}>
              Demikian kami sampaikan atas perhatian dan kerjasamanya kami
              ucapkan terima kasih.
            </Text>
          </View>
          <View style={styles.row}>
            {dataChecked.checkedFLM ? (
              <div>
                <View style={styles.columnVendor}>
                  <MinioImageComponent
                    filePath={data.photoFLMVendor}
                    style={styles.imageAfter}
                  />
                  <Text style={(styles.textField, { paddingLeft: 35 })}>
                    {data.picVendor}
                  </Text>
                </View>
              </div>
            ) : (
              <div />
            )}
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
export default BastPdf;

BastPdf.propTypes = {
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
