import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography, Grid, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as CornerLeftArrow } from "../../../../../assets/icons/linear-red/corner-up-left.svg";
import { ReactComponent as SendIcon } from "../../../../../assets/icons/whiteIcons/send.svg";
import LabelTextField from "../../../../../components/Form/LabelTextField";
import { ReactComponent as PaperClip } from "../../../../../assets/icons/linear-red/paperclip.svg";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import LoadingView from "../../../../../components/Loading/LoadingView";
import { doSendCommentEvents } from "../../../ApiServicesAddOns";
import constansts from "../../../../../helpers/constants";

const UseStyles = makeStyles((theme) => ({
  commentBox: {
    marginTop: 30,
    padding: "30px 30px 20px 30px",
    borderRadius: "10px 10px 0px 0px",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    maxHeight: "800px",
    overflowY: "auto",
    backgroundColor: constansts.color.white,
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
    boxShadow: "0px -4px 12px rgba(175, 184, 206, 0.2)",
    backgroundColor: constansts.color.white,
    "&.MuiPaper-root ": {
      color: "#2B2F3C",
      transition: "box-shadow 300ms cubic-bezier(0.8, 0, 0, 0) 0ms",
      backgroundColor: "#fff",
    },
  },
}));

function Comment({
  comments,
  jmlComment,
  isLoading,
  id,
  detailTitle,
  handleSendComment,
}) {
  const classes = UseStyles();
  const inputElement = useRef();

  const [fieldOff, setFieldOff] = useState(false);
  const [loading, setLoading] = useState(false);

  const [chatValue, setChatValue] = useState("");
  const [requestComment, setRequestComment] = useState({
    eventId: parseInt(id),
    message: "",
    status: 0,
  });

  const loadingHandler = (loadValue) => {
    setLoading(loadValue);
  };

  const handleChangeImage = (val) => {
    setChatValue(val.target.value);
    setFieldOff(true);
  };

  const sendCommentHandler = () => {
    if (chatValue == "") {
    } else {
      setChatValue("");
      doSendCommentEvents(loadingHandler, requestComment).then((res) => {
        console.log(res);
        handleSendComment();
      });
    }
  };

  const inputCommentHandler = (e) => {
    setChatValue(e.target.value);
    switch (detailTitle) {
      case "events":
        setRequestComment({
          ...requestComment,
          message: e.target.value,
          status: 1,
        });
        break;
      case "schedule":
        setRequestComment({
          ...requestComment,
          message: e.target.value,
          status: 2,
        });
        break;
      case "news":
        setRequestComment({
          ...requestComment,
          message: e.target.value,
          status: 3,
        });
        break;
    }
  };

  const handleClickReply = (id) => {
    inputElement.current.focus();
    // setCommentId(id);
    setRequestComment({
      ...requestComment,
      repliedTo: id,
    });
    console.log("clickReply >>> ", requestComment);
  };

  useEffect(() => {
    console.log("comments>> ", comments);
  }, [comments]);

  return (
    // <div>as</div>
    <div>
      {isLoading ? (
        <Paper className={classes.commentBox}>
          <LoadingView />
        </Paper>
      ) : (
        <>
          <div className={classes.commentBox}>
            <Typography className={classes.title}>
              Comments <span style={{ color: "#8D98B4" }}>- {jmlComment}</span>
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
                    <Grid item>
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
                    <Grid item style={{ marginLeft: 20 }}>
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
                      <MuiIconLabelButton
                        label={"Reply"}
                        iconPosition="startIcon"
                        buttonIcon={<CornerLeftArrow />}
                        onClick={() => handleClickReply(item.idComment)}
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
                          style={{
                            marginTop: 25,
                          }}
                        >
                          <Grid
                            item
                            style={{
                              marginLeft: 60,
                            }}
                          >
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
                          <Grid item style={{ marginLeft: 20 }}>
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
                              {res.message}
                            </Typography>
                            <MuiIconLabelButton
                              label={"Reply"}
                              iconPosition="startIcon"
                              buttonIcon={<CornerLeftArrow />}
                              // onClick={() => ()}
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
              {loading ? <LoadingView /> : null}
            </Grid>
          </div>
          <div className={classes.chatBox}>
            <Grid container justifyContent="space-between">
              <Grid item>
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
              <Grid item xs={10}>
                <input
                  id="gambarUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(newVal) => handleChangeImage(newVal)}
                />
                <LabelTextField
                  placeholder={"Masukan Komentar Anda"}
                  endIcon={<PaperClip style={{ cursor: "pointer" }} />}
                  value={chatValue}
                  onChange={inputCommentHandler}
                  disabled={fieldOff}
                  inputRef={inputElement}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item>
                <MuiIconLabelButton
                  label="Kirim"
                  iconPosition="endIcon"
                  buttonIcon={<SendIcon />}
                  onClick={sendCommentHandler}
                />
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </div>
  );
}

Comment.PropTypes = {
  comments: PropTypes.array.isRequired,
  jmlComment: PropTypes.number,
};

export default Comment;
