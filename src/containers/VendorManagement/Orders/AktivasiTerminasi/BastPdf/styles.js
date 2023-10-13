import { StyleSheet, Font } from "@react-pdf/renderer";
import BarlowReguler from "../../../../../assets/fonts/Barlow/Barlow-Regular.ttf";
import BarlowBold from "../../../../../assets/fonts/Barlow/Barlow-Bold.ttf";

Font.register({
  family: "Barlow-Reguler",
  src: BarlowReguler,
});
Font.register({
  family: "Barlow-Bold",
  src: BarlowBold,
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 100,
    paddingHorizontal: 35,
  },
  wrapper: {
    paddingBottom: 50,
    paddingLeft: 0,
  },
  wrapperInpDet: {
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

  gridContainer:{
    display: "flex",
    flexDirection: "row", 
    fontSize: 13, 
    width: "100%"
  },
  gridContainerOther:{
    display: "flex",
    flexDirection: "row", 
    fontSize: 13, 
    width: "100%",
    paddingLeft: 10,
  },
  grid50:{
    display: "flex",
    width: "50%",
    paddingRight: 10,
    paddingVertical: 5,
  },
  
  gridCheck:{marginVertical: 5, marginRight: 20 },

  lineGray:{
    height: 2,
    backgroundColor: "#8D98B4",
    marginVertical: 5,
  },
  subSectionText:{
    color: "#8D98B4",
    fontSize: 13,
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
    paddingTop: 30,
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
    paddingTop: 30,
    paddingBottom: 30,
    marginLeft: 10,
  },
  AddressField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 10,
    width: "55%",
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
    fontFamily: "Barlow-Reguler",
  },
  textFooter: {
    fontSize: 13,
    fontWeight: 400,
    fontFamily: "Barlow-Reguler",
    color: "#FF6A6A",
  },
  textInpDet: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Barlow-Reguler",
    color: "#8D98B4",
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
    paddingTop: 25,
  },
  columnSecondOther: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
    paddingTop: 10,
  },
  imageVendor: {
    borderRadius: 10,
    width: "100px",
    height: "80px",
  },
  ketFoto: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Barlow-Bold",
    paddingLeft: 20,
  },
});

export default styles;
