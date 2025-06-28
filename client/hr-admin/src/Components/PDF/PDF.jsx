import React from "react";
import { StyleSheet } from "@react-pdf/renderer";

// Create styles
export const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    position: "relative",
    marginTop: 40,
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "Helvetica",
    fontSize: "12px",
    // padding: "30px 50px",
  },

  watermarkImage: {
    position: "absolute",
    top: "25%",
    left: "15%",
    width: "70%",
    opacity: "0.2",
    zIndex: 0,
  },

  passImage: {
    width: "25%",
    objectFit: "cover",
    marginLeft: 60,
    marginBottom: 20,
  },

  section: {
    zIndex: 1,
    display: "flex",
    flexDirection: "row",
    columnGap: 30,
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 60,
  },

  field: {
    display: "flex",
    flex: "30% 30% 30%",
    flexDirection: "column",
    // justifyContent: "space-around",
  },

  singleSection: {
    marginLeft: 60,
  },

  line: {
    height: 1.5,
    backgroundColor: "#888",
    marginVertical: 10,
    width: "100%",
  },

  title: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    marginBottom: 20,
    textAlign: "center",
  },

  keyTag: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#575757",
    textAlign: "left",
  },

  valueTag: {
    // maxWidth: 90,
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "#000000",
    // marginBottom: 20,
    textAlign: "left",
  },
});
