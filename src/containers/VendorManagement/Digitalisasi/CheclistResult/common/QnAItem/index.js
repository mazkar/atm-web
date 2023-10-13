/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MinioImageComponent from "../../../../../../components/MinioImageComponent";

const useStyles = makeStyles({
  imageItem: {
    width: 100,
    height: 70,
    objectFit: "cover",
    borderRadius: 10,
    marginRight: 10,
  },
});
const Answer = ({ answer }) => {
  const classes = useStyles();
  switch (answer.type) {
    case "image":
      return (
        <>
          {answer.value && (
            <MinioImageComponent
              filePath={answer.value}
              className={classes.imageItem}
            />
          )}
        </>
      );

    case "link":
      return (
        <Grid container style={{ fontSize: 13, color: "#2B2F3C" }}>
          <Grid item xs={4} style={{ fontWeight: 600 }}>
            {answer.keyname}
          </Grid>
          <Grid item xs={1}>
            {answer.keyname === "" ? "" : ":"}
          </Grid>
          <Grid item>
            <a
              style={{
                color: "#DC241F",
                fontSize: 13,
                fontWeight: 400,
                textDecoration: "none",
              }}
              target="_blank"
              href={answer.value}
              rel="noreferrer"
            >
              {answer.value}
            </a>
          </Grid>
        </Grid>
      );
    default:
      return (
        <Grid container style={{ fontSize: 13, color: "#2B2F3C" }}>
          <Grid item xs={4} style={{ fontWeight: 600 }}>
            {answer.keyname}
          </Grid>
          <Grid item xs={1}>
            {answer.keyname === "" ? "" : ":"}
          </Grid>
          <Grid item>{answer.value}</Grid>
        </Grid>
      );
  }
};
function QnAItem({ data }) {
  // console.log("apa ya",data)
  return (
    <>
      {data.map((item, index) => {
        return (
          <Grid
            container
            style={{
              backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F9FBFF",
              padding: 15,
            }}
          >
            <Grid item xs={4}>
              <Typography
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#2B2F3C",
                }}
              >
                {item.question}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Grid container direction="column" spacing={2}>
                {item.answer.map((itemAnswer) => {
                  return <Answer answer={itemAnswer} />;
                })}
                <Grid item />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}

QnAItem.propTypes = {
  data: PropTypes.array.isRequired,
};

export default QnAItem;
