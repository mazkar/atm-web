import { InputBase, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  input: {
    fontFamily: "Barlow",
    fontStyle: "italic",
    fontSize: "13px",
    width: "100%",
    border: "1px solid #BCC8E7",
    borderRadius: "8px",
    padding: "16px 12px",
    marginBottom: "15px",
  },
});

const InputMessage = () => {
  const { input } = useStyles();
  return <InputBase className={input} placeholder="Masukkan Pesan Anda" />;
};

export default InputMessage;