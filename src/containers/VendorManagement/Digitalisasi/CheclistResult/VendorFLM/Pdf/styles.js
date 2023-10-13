import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
  },
  headerSection: {
    marginBottom: 10,
  },
  topRedLine: {
    display: "flex",
    height: 14,
    width: "100%",
    backgroundColor: "#DC241F",
  },
  lineGray:{
    height: 3,
    backgroundColor: "#F9FBFF",
    marginVertical: 5,
  },
  section: {
    padding: 10,
    flexDirection: "column",
    fontFamily: "Barlow",
  },
  gridContainer:{
    flexDirection: "row",
  },
  grid50:{
    width: "50%",
    paddingRight: 10,
  },
  footerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    fontSize: 10,
    width: "100%",
    paddingVertical: 25,
    backgroundColor: "#DC241F",
    fontFamily: "Barlow",
    color: "#FFF",
    position: 'absolute',
    bottom: 0,
  },
  image: {
    width: 137,
    height: 40,
  },
});

export default styles;
