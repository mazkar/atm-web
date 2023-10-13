import { Box, InputBase, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  label: {
    fontWeight: 400,
    fontSize: 15,
    color: "#2B2F3C",
    marginBottom: 5,
  },
  input: {
    fontFamily: "Barlow",
    fontStyle: "italic",
    fontSize: "16px",
    width: "100%",
    border: "1px solid #BCC8E7",
    borderRadius: "8px",
    padding: "16px 12px",
    marginBottom: "15px",
  },
});

const CategoryInput = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography className={classes.label}>{props.label} :</Typography>
      <InputBase
        onChange={props.onChange}
        className={classes.input}
        placeholder={props.placeholder}
      />
    </Box>
  );
};

export default CategoryInput;
