/* eslint-disable react/prop-types */
import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
  },
  description: {
    width: "40%",
    fontFamily: "Barlow",
    fontSize: 11,
  },
  separator: {
    width: "5%",
    fontFamily: "Barlow",
    fontStyle: "bold",
    fontSize: 11,
  },
  value: {
    width: "55%",
    fontFamily: "Barlow",
    fontStyle: "bold",
    fontSize: 11,
  },
});

const TableRow = ({ items }) => {
  const rows = items.map((item, index) => (
    <View style={styles.row} key={item.sr? item.sr.toString() : index}>
      <Text style={styles.description}>{item.desc}</Text>
      <Text style={styles.separator}>:</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  ));
  return <>{rows}</>;
};

export default TableRow;