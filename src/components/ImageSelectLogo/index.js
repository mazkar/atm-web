/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { ReactComponent as PlusIcon } from "../../assets/icons/general/plus_red.svg";

const useStyles = makeStyles({
  container: {
    width: 80,
    position: "relative",
  },
  containerImg: {
    position: "relative",
    width: 80,
    minHeight: 76,
    border: "1px dashed #BCC8E7",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  uploadFile: {
    cursor: "pointer",
  },
  containerInput: {
    width: 80,
    minHeight: 76,
    border: "1px dashed #BCC8E7",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  resetFile: {
    position: "absolute",
    top: -10,
    right: -10,
    color: "#DC241F",
  },
});

const useStylesLarger = makeStyles({
  container: {
    width: (props) => props.largerWidth,
    position: "relative",
  },
  containerImg: {
    position: "relative",
    width: (props) => props.largerWidth,
    minHeight: (props) => props.largerMinHeight,
    border: "1px dashed #BCC8E7",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  uploadFile: {
    cursor: "pointer",
  },
  containerInput: {
    width: (props) => props.largerWidth,
    minHeight: (props) => props.largerMinHeight,
    border: "1px dashed #BCC8E7",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  resetFile: {
    position: "absolute",
    top: -10,
    right: -10,
    color: "#DC241F",
  },
});

function ImageSelectLogo({
  selectedImage,
  onChange,
  onDelete,
  title,
  refId = title,
  accept = "image/*",
  isLarger = false,
  largerWidth = 255,
  largerMinHeight = 165,
}) {
  const classes = useStyles();
  const classesLarger = useStylesLarger({ largerWidth, largerMinHeight });
  return (
    <>
      {isLarger ? (
        <div className={classesLarger.container}>
          {selectedImage ? (
            <div className={classesLarger.containerImg}>
              <img
                src={URL.createObjectURL(selectedImage)}
                width={largerWidth}
                alt="img"
              />
            </div>
          ) : (
            <>
              <input
                id={refId}
                type="file"
                accept={accept}
                onChange={(e) => {
                  // console.log("+++ size", e.target.files[0].size);
                  if (e.target.files[0].size > 1000000) {
                    alert("Foto yang anda upload melebihi ukuran 1MB!");
                  } else {
                    onChange(e);
                  }
                }}
                style={{
                  width: "0.1px",
                  height: "0.1px",
                  opacity: 0,
                  overflow: "hidden",
                  position: "absolute",
                  zIndex: -1,
                }}
              />
              <label htmlFor={refId} className={classesLarger.uploadFile}>
                <div className={classesLarger.containerInput}>
                  <PlusIcon height={24} />
                  <Typography
                    style={{
                      fontSize: 13,
                      color: "#2B2F3C",
                      fontWeight: 400,
                      textAlign: "center",
                      wordWrap: "break-word",
                    }}
                  >
                   {title}
                  </Typography>
                </div>
              </label>
            </>
          )}
          {selectedImage && (
            <IconButton className={classes.resetFile} onClick={onDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </div>
      ) : (
        <div className={classes.container}>
          {selectedImage ? (
            <div className={classes.containerImg}>
              <img
                src={URL.createObjectURL(selectedImage)}
                width="80"
                alt="img"
              />
            </div>
          ) : (
            <>
              <input
                id={refId}
                type="file"
                accept={accept}
                onChange={(e) => {
                  // console.log("+++ size", e.target.files[0].size);
                  if (e.target.files[0].size > 1000000) {
                    alert("Foto yang anda upload melebihi ukuran 1MB!");
                  } else {
                    onChange(e);
                  }
                }}
                style={{
                  width: "0.1px",
                  height: "0.1px",
                  opacity: 0,
                  overflow: "hidden",
                  position: "absolute",
                  zIndex: -1,
                }}
              />
              <label htmlFor={refId} className={classes.uploadFile}>
                <div className={classes.containerInput}>
                  <PlusIcon height={24} />
                  <Typography
                    style={{
                      fontSize: 13,
                      color: "#2B2F3C",
                      fontWeight: 400,
                      textAlign: "center",
                      wordWrap: "break-word",
                    }}
                  >
                    Photo <br /> {title}
                  </Typography>
                </div>
              </label>
            </>
          )}
          {selectedImage && (
            <IconButton className={classes.resetFile} onClick={onDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </div>
      )}
    </>
  );
}

ImageSelectLogo.propTypes = {};

export default ImageSelectLogo;
