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
  // console.log("+++ DATA BAST DIGITAL =>", data);
  // console.log("+++ dataChecked BAST DIGITAL =>", dataChecked);
  // console.log("INI LENGTH =>", data.locationName.length);
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
            
            <View style={styles.gridContainer}>
              <View style={styles.grid50}>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>Tgl Pekerjaan</Text></View>
                  <View style={styles.grid50}><Text style={styles.textValue}>: {data.processingDate}</Text></View>
                </View>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>PIC Pekerjaan</Text></View>
                  <View style={styles.grid50}><Text style={styles.textValue}>: {data.picVendor}</Text></View>
                </View>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>No.Engineer</Text></View>
                  <View style={styles.grid50}><Text style={styles.textValue}>: {data.engineerTelephoneNumber}</Text></View>
                </View>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>Vendor Lainnya: </Text></View>
                </View>
                {data.vendorDetails.map((item)=>{
                  if(dataChecked[item.check]){
                    return(
                      <View style={styles.gridContainerOther}>
                        <View style={styles.grid50}><Text style={styles.textValue}>{item.key} :</Text></View>
                        <View style={styles.grid50}>
                          <Text style={styles.textValue}>{item.name}</Text>
                          <Text style={styles.textValue}>{item.phone}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </View>
              <View style={styles.grid50}>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>No.Ticket</Text></View>
                  <View style={styles.grid50}><Text style={styles.textValue}>: {data.ticketNumber}</Text></View>
                </View>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>ID Location</Text></View>
                  <View style={styles.grid50}><Text style={styles.textValue}>: {data.locationId}</Text></View>
                </View>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>Nama Lokasi</Text></View>
                  <View style={styles.grid50}><Text style={styles.textValue}>: {data.locationName}</Text></View>
                </View>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>ID Mesin</Text></View>
                  <View style={styles.grid50}><Text style={styles.textValue}>: {data.idMesin}</Text></View>
                </View>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>Jenis Pekerjaan</Text></View>
                  <View style={styles.grid50}><Text style={styles.textValue}>: {data.jobType}</Text></View>
                </View>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>Tanggal Request</Text></View>
                  <View style={styles.grid50}><Text style={styles.textValue}>: {data.requestDate}</Text></View>
                </View>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>Keterangan</Text></View>
                  <View style={styles.grid50}><Text style={styles.textValue}>: {data.notesDescription}</Text></View>
                </View>
                <View style={styles.gridContainer}>
                  <View style={styles.grid50}><Text style={styles.textValue}>Link Video</Text></View>
                  <View style={styles.grid50}><Text style={styles.textValue}>: {data.hub}</Text></View>
                </View>
              </View>
            </View> 
          </View>

          <Text style={styles.subSectionText}>Detail Team Mover</Text>
          <hr style={styles.lineGray}/>

          <View style={styles.gridContainer}>
            <View style={styles.grid50}>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>ID Mesin</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.idMesin}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Mesin</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.mesin}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Merk Mesin</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.merekMesin}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Type Mesin</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.mesinType}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>SN Mesin</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.snMesin}</Text></View>
              </View>
            </View>
            <View style={styles.grid50}>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Merk UPS</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.upsBrand}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>SN UPS</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.snUps}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Jumlah Kaset</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.jumlahKaset}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Jumlah Reject</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.jumlahReject}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Dynabolt</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.dynabolt}</Text></View>
              </View>
            </View>
          </View> 

          <Text style={styles.subSectionText}>Detail Team SLM</Text>
          <hr style={styles.lineGray}/>
          <View style={styles.gridContainer}>
            <View style={styles.grid50}>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Kondisi Ac</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.kondisiAc}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Type Booth</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.boothType}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Kondisi Booth</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.kondisiBooth}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Tegangan Listrik Outlet</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.teganganListrikOtlet}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Grounding Listrik Outlet </Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.groundListrikOtlet}</Text></View>
              </View>
            </View>
            <View style={styles.grid50}>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Tegangan Listrik Booth</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.teganganListrikBooth}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Grounding Listrik Booth</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.groundListrikBooth}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>CCTV Internal </Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.cctvInternal}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>CCTV + DVR</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.cctvDvr}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Status Mesin</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.statusMesin}</Text></View>
              </View>
            </View>
          </View> 

          <View 
            style={{
              flexDirection: "column",
              flexWrap: "wrap",
              height: "75"}}>
            {data.kunciBooth===1 && (<View style={styles.gridCheck}><Text style={styles.textValue}>Kunci Booth</Text></View>)}
            {data.kunciFasciaAtas===1 && (<View style={styles.gridCheck}><Text style={styles.textValue}>Kunci Fascia Atas</Text></View>)}
            {data.kunciKerangkeng===1 && (<View style={styles.gridCheck}><Text style={styles.textValue}>Kunci Kerangkeng</Text></View>)}
            {data.kunciFasciaBawah===1 && (<View style={styles.gridCheck}><Text style={styles.textValue}>Kunci Fascia Bawah</Text></View>)}
            {data.kunciTombak===1 && (<View style={styles.gridCheck}><Text style={styles.textValue}>Kunci Tombak</Text></View>)}
          </View>
          
          <Text style={styles.subSectionText}>Detail Team FLM</Text>
          <hr style={styles.lineGray}/>

          <View style={styles.gridContainer}>
            <View style={styles.grid50}>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Testing Transaksi Kartu</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.testingTransaksiKartu}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Testing Transaksi Octo Mobile</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.testingTransaksiOctom}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Kerapihan Kabel</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.kerapihanKabel}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Cahaya Ruangan</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.cahayaRuangan}</Text></View>
              </View>
            </View>
            <View style={styles.grid50}>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Kebersihan Ruangan</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.kebersihanRuang}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Stiker Kelengkapan</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.kelengkapanStiker}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Stiker ID</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.stickerId}</Text></View>
              </View>
            </View>
          </View> 

          <Text style={styles.subSectionText}>Detail Team Jarkom</Text>
          <hr style={styles.lineGray}/>

          <View style={styles.gridContainer}>
            <View style={styles.grid50}>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Merek Modem</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.merekModem}</Text></View>
              </View>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>SN Modem</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.snModem}</Text></View>
              </View>
            </View>
            <View style={styles.grid50}>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}><Text style={styles.textValue}>Hub</Text></View>
                <View style={styles.grid50}><Text style={styles.textValue}>: {data.hub}</Text></View>
              </View>
            </View>
          </View> 

          <Text style={{ fontSize: 13, fontFamily: "Times-Bold" }}>
            Foto Sebelum
          </Text>
          <View style={styles.rowfoto}>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoFrontCimb}
                style={styles.imageAfter}
              />
              <Text style={styles.ketFoto}>Sesudah 1</Text>
              <Text style={styles.textValue}>{data.dateFrontCimb}</Text>
            </View>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoRightCimb}
                style={styles.imageAfter}
              />
              <Text style={styles.ketFoto}>Sesudah 2</Text>
              <Text style={styles.textValue}>{data.dateRightCimb}</Text>
            </View>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoLeftCimb}
                style={styles.imageAfter}
              />
              <Text style={styles.ketFoto}>Sesudah 3</Text>
              <Text style={styles.textValue}>{data.dateLeftCimb}</Text>
            </View>
            <View style={styles.column}>
              <MinioImageComponent
                filePath={data.photoRearCimb}
                style={styles.imageAfter}
              />
              <Text style={styles.ketFoto}>Sesudah 4</Text>
              <Text style={styles.textValue}>{data.dateRearCimb}</Text>
            </View>
          </View>

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
            {data.vendorSignature.length > 0 ? (
              <div>
                <View style={styles.columnVendor}>
                  <MinioImageComponent
                    filePath={data.vendorSignature[0].value}
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
