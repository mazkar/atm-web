import React from "react";
import LoadingView from "./LoadingView";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

const LoadingState = () => {
  const { loaderWrapper } = useStyles();
  return (
    <div className={loaderWrapper}>
      <LoadingView maxheight="100%" isTransparent />
    </div>
  );
};

export default LoadingState;
