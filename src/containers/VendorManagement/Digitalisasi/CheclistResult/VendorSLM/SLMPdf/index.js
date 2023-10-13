import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  Font,
} from "@react-pdf/renderer";
import BarlowFont from "../../../../../../assets/fonts/Barlow/Barlow-Regular.ttf";
import BarlowFontSemiBold from "../../../../../../assets/fonts/Barlow/Barlow-SemiBold.ttf";
import CimbLogo from "../../../../../../assets/images/logo_cimb_niaga.png";
import styles from "./styles"
import dummyData from "./dummyData"
import QnAItem from "../../../../../../components/ExportPdf/QnAItem"
import ItemsTable from "../../../../../../components/ExportPdf/ItemsTable"
import QnAItemSecondary from "../../../../../../components/ExportPdf/QnAItemSecondary";
import PropTypes from "prop-types";

Font.register({
  family: "Barlow",
  format: "truetype",
  fonts: [{ src: BarlowFont }, { src: BarlowFontSemiBold, fontStyle: "bold" }],
});



// Create Document Component
const SLMPdf = (props) => {
  const { dataQnA,dataTopInfo } = props;
  return (
    <Document>
      <Page size="A4" wrap style={{ paddingBottom: 100 }}>
        <View fixed style={styles.headerSection}>
          <View style={styles.topRedLine} />
          <View style={styles.container}>
            <View style={styles.section}>
              <Image style={styles.image} src={CimbLogo} />
            </View>
          </View>
          <hr style={styles.lineGray} />
        </View>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text
              style={{ fontStyle: "bold", fontSize: 18, paddingBottom: 10 }}
            >
              Informasi Survey
            </Text>
            <View style={styles.gridContainer}>
              <View style={styles.grid50}>
                <ItemsTable data={dataTopInfo.infoLeft} />
              </View>
              <View style={styles.grid50}>
                <ItemsTable data={dataTopInfo.infoRight} />
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.gridContainer}>
                <View style={styles.grid50}>
                  <Text
                    style={{
                      fontStyle: "bold",
                      fontSize: 16,
                      paddingVertical: 10,
                    }}
                  >
                    Question
                  </Text>
                </View>
                <View style={styles.grid50}>
                  <Text
                    style={{
                      fontStyle: "bold",
                      fontSize: 16,
                      paddingVertical: 10,
                    }}
                  >
                    Answer
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <hr style={styles.lineGray} />
        </View>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text
              style={{ fontStyle: "bold", fontSize: 14, paddingBottom: 10 }}
            >
              SLM
            </Text>
            <QnAItemSecondary data={dataQnA.slm} />
          </View>
          <View style={styles.section}>
            <Text 
              style={{ fontStyle: "bold", fontSize: 14, paddingBottom: 10 }}
            >
             Potensi Modus Kejahatan
            </Text>
            <QnAItemSecondary data={dataQnA.modusKejahatan} />
          </View>
        </View>
        <View style={styles.footerSection} fixed>
          <Text style={{ fontStyle: "bold" }}>PT. Bank CIMB Niaga Tbk</Text>
          <Text>
            {" "}
            Griya Niaga 2.lt 10, Jl.Wahid Hasyim Blok B-4 No 3 Bintaro Sektor
            VII{" "}
          </Text>
          <Text> angerang 15224 </Text>
          <Text>Telp 299 72 400 Fax 7486 7959 </Text>
          <Text>SWIFT BNIAIDJA www.cimbniaga.com</Text>
        </View>
      </Page>
    </Document>
  );
};

/*SLMPdf.PropTypes = {
  data: PropTypes.array.isRequired,
};*/
SLMPdf.propTypes = {
  data: PropTypes.object,
};
SLMPdf.defaultProps = {
  data: dummyData,
};
export default SLMPdf;
