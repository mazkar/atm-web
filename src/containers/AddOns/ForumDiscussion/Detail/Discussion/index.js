import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography, Grid, Avatar, ButtonBase } from "@material-ui/core";
import PropTypes from "prop-types";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as CornerLeftArrow } from "../../../../../assets/icons/linear-red/corner-up-left.svg";
import { ReactComponent as SendIcon } from "../../../../../assets/icons/whiteIcons/send.svg";
import LabelTextField from "../../../../../components/Form/LabelTextField";
import { ReactComponent as PaperClip } from "../../../../../assets/icons/linear-red/paperclip.svg";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import LoadingView from "../../../../../components/Loading/LoadingView";
import { doSendCommentForumDiscuss } from "../../../ApiServicesAddOns";
import { Markup } from "interweave";
import { ReactComponent as FileIcon } from "../../../../../assets/icons/linear-red/paperclip.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import { doUploadPhoto } from "../../../../Implementation/ApiServiceImplementation";
import { doUploadDocument } from "../../../../Implementation/ApiServiceImplementation";
import MinioDocComponent from "../../../../../components/MinioDocComponent";
import ModalLoader from "../../../../../components/ModalLoader";

const UseStyles = makeStyles((theme) => ({
  boxDiscussion: {
    padding: "30px 30px 20px 30px",
    borderRadius: "10px 10px 0px 0px",
    maxHeight: "800px",
    overflowY: "auto",
  },
  title: {
    fontFamily: "Barlow",
    fontSize: "24px",
    fontWeight: 600,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  titleChat: {
    fontFamily: "Barlow",
    fontSize: "20px",
    fontWeight: 500,
    color: "#2B2F3C",
  },
  chat: {
    fontFamily: "Barlow",
    fontSize: "15px",
    fontWeight: 400,
    color: "#2B2F3C",
    marginTop: "10px",
  },
  chatBox: {
    padding: "20px 30px 20px 30px",
    width: "100%",
    borderRadius: "0px 0px 10px 10px",
    "&.MuiPaper-root ": {
      color: "#2B2F3C",
      transition: "box-shadow 300ms cubic-bezier(0.8, 0, 0, 0) 0ms",
      backgroundColor: "#fff",
    },
  },
}));

function Discussion({ comments, jmlComment, isLoading, idForum }) {
  const classes = UseStyles();
  const inputElement = useRef();
  const [commentUser, setCommentUser] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [chatValue, setChatValue] = useState("");
  const [fieldOff, setFieldOff] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestSend, setRequestSend] = useState({
    forumId: idForum,
    message: `<p><b style="color:#DC241F;">@${commentUser}</b>&nbsp&nbsp${chatValue}</p>`,
    attachment: [""],
  });

  const loadingHandler = (loadValue) => {
    setLoading(loadValue);
  };

  const handleChange = (event) => {
    setChatValue(event.target.value);
    setRequestSend({
      ...requestSend,
      message: isReply
        ? `<p><b style="color:#DC241F;">@${commentUser}</b>&nbsp&nbsp${event.target.value}</p>`
        : event.target.value,
    });
  };

  const handleChangeImage = (val) => {
    const arr = requestSend.attachment;
    const file = val.target.files[0];
    const name = file.name;
    const extension = name.slice(name.length - 4);
    if (extension === ".jpg" || extension === ".png" || extension === "jpeg") {
      doUploadPhoto(file).then((response) => {
        if (response.status === 200) {
          arr.push(response.data.path);
          setRequestSend({
            ...requestSend,
            attachment: arr,
          });
        }
      });
    } else {
      doUploadDocument(file).then((response) => {
        console.log(response);
        if (response.status === 200) {
          arr.push(response.data.path);
          setRequestSend({
            ...requestSend,
            attachment: arr,
          });
        }
      });
    }

    console.log(requestSend);
  };

  const handleSend = (e) => {
    e.preventDefault();
    doSendCommentForumDiscuss(loadingHandler, requestSend).then((response) => {
      console.log(response);
      if (response.responseCode === "200") {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          location.reload();
        }, 3000);
      }
    });
    setFieldOff(false);
  };

  const handleFocusInput = (idComment, userName) => {
    inputElement.current.focus();
    setIsReply(true);
    setCommentUser(userName ? userName : "");
    setRequestSend({
      ...requestSend,
      replayTo: idComment,
    });
  };

  const enterKeyPress = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      setChatValue("");
      doSendCommentForumDiscuss(loadingHandler, requestSend).then(
        (response) => {
          console.log(response);
          if (response.responseCode === "200") {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              location.reload();
            }, 3000);
          }
        }
      );
      setFieldOff(false);
    }
  };

  useEffect(() => {
    console.log(requestSend);
  }, [requestSend]);

  const htmlToDraftBlocks = (html) => {
    return (
      <div>
        <Markup content={html} />
      </div>
    );
  };

  return (
    <div>
      {isLoading ? (
        <Paper className={classes.boxDiscussion}>
          <LoadingView />
        </Paper>
      ) : (
        <>
          <Paper className={classes.boxDiscussion}>
            <Typography className={classes.title}>
              Discussion{" "}
              <span style={{ color: "#8D98B4" }}>- {jmlComment}</span>
            </Typography>

            <Grid
              container
              direction="column"
              spacing={2}
              style={{ marginTop: "36px", overflow: "auto" }}
            >
              {comments.map((item) => (
                <Grid item className={classes.titleContainer}>
                  <Grid container direction="row">
                    <Grid item xs={11} lg={1}>
                      {item.userPhoto === null ? (
                        <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                      ) : (
                        <Avatar alt="Avatar">
                          <MinioImageComponent
                            filePath={item.userPhoto}
                            style={{ width: 40, height: 40 }}
                          />
                        </Avatar>
                      )}
                    </Grid>
                    <Grid item xs={11}>
                      <Typography className={classes.titleChat}>
                        {item.userName ? item.userName : "-"}
                        <span
                          style={{
                            fontWeight: 400,
                            fontSize: "20px",
                            color: "#8D98B4",
                            marginLeft: "10px",
                          }}
                        >
                          {item.createdAt
                            ? useTimestampConverter(
                                item.createdAt / 1000,
                                "DD/MM/YYYY - hh:mm"
                              )
                            : "-"}
                        </span>
                      </Typography>
                      <Typography className={classes.chat}>
                        {item.message}
                      </Typography>
                      <div
                        style={{
                          margin: "5px 0px",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        {item.attachment
                          ? item.attachment.map((fileAttch) => {
                              const extension = fileAttch.slice(
                                fileAttch.length - 4
                              );
                              if (
                                extension === ".jpg" ||
                                extension === ".png" ||
                                extension === "jpeg"
                              ) {
                                return (
                                  <MinioImageComponent
                                    filePath={fileAttch}
                                    style={{
                                      width: 400,
                                      marginLeft: 10,
                                      marginTop: 10,
                                    }}
                                  />
                                );
                              } else {
                                return (
                                  <MinioDocComponent filePath={fileAttch} />
                                );
                              }
                            })
                          : null}
                      </div>
                      <MuiIconLabelButton
                        label={"Reply"}
                        iconPosition="startIcon"
                        buttonIcon={<CornerLeftArrow />}
                        onClick={() =>
                          handleFocusInput(item.idComment, item.userName)
                        }
                        style={{
                          background: "inherit",
                          color: "#DC241F",
                          padding: 0,
                          marginTop: 10,
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* reply comment */}
                  {item.reply
                    ? item.reply.map((res) => (
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-end"
                          style={{ marginTop: 25 }}
                        >
                          <Grid item xs={10} lg={1}>
                            {item.userPhoto === null ? (
                              <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                            ) : (
                              <Avatar alt="Avatar">
                                <MinioImageComponent
                                  filePath={item.userPhoto}
                                  style={{ width: 40, height: 40 }}
                                />
                              </Avatar>
                            )}
                          </Grid>
                          <Grid item xs={10}>
                            <Typography className={classes.titleChat}>
                              {res.userName}
                              <span
                                style={{
                                  fontWeight: 400,
                                  fontSize: "20px",
                                  color: "#8D98B4",
                                  marginLeft: "10px",
                                }}
                              >
                                {res.createdAt
                                  ? useTimestampConverter(
                                      res.createdAt / 1000,
                                      "DD/MM/YYYY - hh:mm"
                                    )
                                  : "-"}
                              </span>
                            </Typography>
                            <Typography className={classes.chat}>
                              {htmlToDraftBlocks(
                                res.message ? res.message : "-"
                              )}
                            </Typography>

                            <div
                              style={{
                                margin: "5px 0px",
                                display: "flex",
                                flexWrap: "wrap",
                              }}
                            >
                              {res.attachment
                                ? res.attachment.map((fileAttch) => {
                                    const extension = fileAttch.slice(
                                      fileAttch.length - 4
                                    );
                                    if (
                                      extension === ".jpg" ||
                                      extension === ".png" ||
                                      extension === "jpeg"
                                    ) {
                                      return (
                                        <MinioImageComponent
                                          filePath={fileAttch}
                                          style={{
                                            width: 400,
                                            marginLeft: 10,
                                            marginTop: 10,
                                          }}
                                        />
                                      );
                                    } else {
                                      return (
                                        <MinioDocComponent
                                          filePath={fileAttch}
                                        />
                                      );
                                    }
                                  })
                                : null}
                            </div>

                            <MuiIconLabelButton
                              label={"Reply"}
                              iconPosition="startIcon"
                              buttonIcon={<CornerLeftArrow />}
                              onClick={() =>
                                handleFocusInput(item.idComment, item.userName)
                              }
                              style={{
                                background: "inherit",
                                color: "#DC241F",
                                padding: 0,
                                marginTop: 10,
                              }}
                            />
                          </Grid>
                        </Grid>
                      ))
                    : null}
                  {/* end reply comment */}
                </Grid>
              ))}
              {/* send chat */}
              <ModalLoader isOpen={loading} />
            </Grid>
          </Paper>
          <Paper className={classes.chatBox}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item xs={1}></Grid>
              <Grid item xs={11}>
                {isReply === true ? (
                  <Typography
                    style={{
                      fontWeight: 400,

                      fontSize: 13,
                      opacity: 0.6,
                    }}
                  >
                    Replying to{" "}
                    <span style={{ color: "#DC241F" }}>@{commentUser}</span>
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>

            <Grid container direction="row" alignItems="center">
              <Grid item xs={1}>
                {/* {item.userPhoto === null ? ( */}
                <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                {/* ) : (
              <Avatar alt="Avatar">
                <MinioImageComponent
                  filePath={item.userPhoto}
                  style={{ width: 40, height: 40 }}
                />
              </Avatar>
            )} */}
              </Grid>
              <Grid item xs={10} style={{ paddingRight: 20 }}>
                <input
                  id="gambarUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(newVal) => handleChangeImage(newVal)}
                />
                <label htmlFor="gambarUpload" style={{ cursor: "pointer" }}>
                  <LabelTextField
                    placeholder={"Masukan Komentar Anda"}
                    endIcon={<PaperClip />}
                    value={chatValue}
                    onChange={handleChange}
                    disabled={fieldOff}
                    inputRef={inputElement}
                    onKeyDown={enterKeyPress}
                  />
                </label>
              </Grid>
              <Grid item xs={1}>
                <MuiIconLabelButton
                  label="Kirim"
                  iconPosition="endIcon"
                  buttonIcon={<SendIcon />}
                  onClick={handleSend}
                />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item xs={1}></Grid>
              <Grid item xs={11}>
                {requestSend.attachment.map((item, indexFile) => {
                  if (item === "") {
                    return null;
                  } else {
                    return (
                      <Grid container style={{ marginBottom: 5 }}>
                        <Grid item>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              paddingRight: 30,
                            }}
                          >
                            <FileIcon height={15} />
                            <Typography
                              style={{
                                fontSize: 13,
                                color: "#DC241F",
                                marginLeft: 5,
                                wordBreak: "break-all",
                              }}
                            >
                              <b>{item}</b>
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item>
                          <ButtonBase
                            style={{
                              position: "relative",
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                            onClick={() => {
                              const newArr = requestSend.attachment;
                              newArr.splice(indexFile, 1);
                              setRequestSend({
                                ...requestSend,
                                attachment: newArr,
                              });
                            }}
                          >
                            <TrashIcon />
                          </ButtonBase>
                        </Grid>
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </div>
  );
}

Discussion.PropTypes = {
  comments: PropTypes.array.isRequired,
  jmlComment: PropTypes.number,
};

export default Discussion;
