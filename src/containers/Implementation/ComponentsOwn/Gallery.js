import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import {
  Dark,
  InfoMedium,
  InfoSoft,
} from "../../../assets/theme/colors";

const useStyles = makeStyles(() => ({
  btn: {
    padding: "8px 14px",
    background: InfoSoft,
    border: `1px solid ${InfoMedium}`,
    borderRadius: "4px",
  },
  btnLabel: {
    fontWeight: "600",
    fontSize: "15px",
    lineHeight: "18px",
    color: InfoMedium,
    textTransform: "capitalize",
  },
  cardRoot: {
    width: 160,
    marginRight: 20,
    boxShadow: "none",
    flexShrink: 0,
  },
  cardMedia: {
    height: 100,
  },
}));

const Gallery = ({ title, images }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
        borderRadius: "10px",
        backgroundColor: "white",
        padding: 20,
        marginBottom: 20,
      }}
    >
      <Typography
        style={{
          fontWeight: "500",
          fontSize: "24px",
          lineHeight: "29px",
          color: Dark,
          marginBottom: 20,
        }}
      >
        {title}
      </Typography>
      <div style={{ overflow: "auto" }}>
        <div style={{ display: "flex" }}>
          {images?.map(({ url, caption }, i) => {
            return (
              <Card className={classes.cardRoot} key={i} square>
                <CardMedia
                  className={classes.cardMedia}
                  image={url}
                  title={caption}
                />
                <CardContent style={{ padding: 10 }}>
                  <Typography
                    style={{
                      fontSize: "12px",
                      lineHeight: "14px",
                      textAlign: "center",
                      color: Dark,
                    }}
                  >
                    {caption}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
