import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import styles from "./styles";

import CimbLogo from "../../../../../../assets/images/logo_cimb_niaga.png";
import BarlowFont from "../../../../../../assets/fonts/Barlow/Barlow-Regular.ttf";
import BarlowFontSemiBold from "../../../../../../assets/fonts/Barlow/Barlow-SemiBold.ttf";
import QnAItemSecondary from "../../../../../../components/ExportPdf/QnAItemSecondary";
import ItemsTable from "../../../../../../components/ExportPdf/ItemsTable";
import dummyData from "./dummydata";

Font.register({
  family: "Barlow",
  format: "truetype",
  fonts: [
    { src: BarlowFont },
    { src: BarlowFontSemiBold, fontStyle: 'bold' },
  ]
});

// Create Document Component
const Pdf = (props) => {
  const { dataQnA, dataTopInfo } = props;
  // console.log(">>>>> data", data);
  return (
    <Document>
      <Page size="A4" wrap style={{paddingBottom: 100}}>
        <View fixed style={styles.headerSection}>
          <View style={styles.topRedLine}/>
          <View style={styles.container}>
            <View style={styles.section}>
              <Image style={styles.image} src={CimbLogo} />
            </View>
          </View>
          <hr style={styles.lineGray}/>
        </View>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={{fontStyle: "bold", fontSize: 18, paddingBottom: 10}}>Informasi Survey</Text>
            <View style={styles.gridContainer}>
              <View style={styles.grid50}><ItemsTable data={dataTopInfo.infoLeft} /></View>
              <View style={styles.grid50}><ItemsTable data={dataTopInfo.infoRight} /></View>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.gridContainer}>
              <View style={styles.grid50}><Text style={{fontStyle: "bold", fontSize: 16, paddingVertical: 10}}>Question</Text></View>
              <View style={styles.grid50}><Text style={{fontStyle: "bold", fontSize: 16, paddingVertical: 10}}>Answer</Text></View>
            </View>
          </View>
        </View>
        <hr style={styles.lineGray}/>
        <View style={styles.container}>
          <View style={styles.section}>
            <QnAItemSecondary data={dataQnA.cctvSurvei}/>
          </View>
        </View>
        <View style={styles.footerSection} fixed>
          <Text style={{fontStyle: "bold"}}>PT. Bank CIMB Niaga Tbk</Text>
          <Text> Griya Niaga 2.lt 10, Jl.Wahid Hasyim Blok B-4 No 3 Bintaro Sektor VII </Text>
          <Text> angerang 15224 </Text>
          <Text>Telp 299 72 400 Fax 7486 7959 </Text>
          <Text>SWIFT BNIAIDJA  www.cimbniaga.com</Text>
        </View>
      </Page>
    </Document>
  );
};

Pdf.propTypes = {
  data: PropTypes.object,
};
Pdf.defaultProps = {
  data: dummyData ,
};
export default Pdf;
