import React,{useEffect,useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Typography,Grid,Paper,Avatar} from "@material-ui/core";
import { useHistory,useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import {
  convertToRaw,
  convertFromHTML,
  CompositeDecorator,
  ContentBlock,
  ContentState,
  Editor,
  EditorState,
} from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";
import { Markup } from "interweave";
import constants from "../../../../helpers/constants";
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { ReactComponent as ArrowLeft } from "../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as CornerLeftArrow } from "../../../../assets/icons/linear-red/corner-up-left.svg";
import { ReactComponent as SendIcon } from "../../../../assets/icons/whiteIcons/send.svg";
import LabelTextField from '../../../../components/Form/LabelTextField';
import { ReactComponent as PaperClip } from "../../../../assets/icons/linear-red/paperclip.svg";
import ModalLoader from "../../../../components/ModalLoader";
import LoadingView from '../../../../components/Loading/LoadingView';
import useTimestampConverter from "../../../../helpers/useTimestampConverter";
import MinioImageComponent from '../../../../components/MinioImageComponent';


const useStyle = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "36px",
  },
  content: {
    padding: 10,
  },
  chat: {
    fontFamily: "Barlow",
    fontSize: "15px",
    fontWeight: 400,
    color: "#2B2F3C",
    marginTop: "10px",
  },
  rootPaper: {
    width: "100%",
    minHeight: "550px",
    height: "100%",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  rootPaperSecond: {
    width: "100%",
    maxHeight: "700px",
    borderRadius: 10,
    overflowY: "auto",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  image: {
    width: "850px",
    height: "490px",
    borderRadius: 8,
  },
  titleChat: {
    fontFamily: "Barlow",
    fontSize: "20px",
    fontWeight: 500,
    color: "#2B2F3C",
  },
  boxDiscussion: {
    padding: "30px 30px 20px 30px",
    borderRadius: "10px 10px 0px 0px",
    maxHeight: "800px",
    overflowY: "auto",
  },
  titleContainer: {
    // marginBottom: 25,
  },
  titleBox: {
    fontFamily: "Barlow",
    fontSize: "24px",
    fontWeight: 600,
    color: "#2B2F3C",
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
  imageStyle: {
    width: "850px",
    height: "490px",
    borderRadius: 10,
  },
  sliderContainer: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    "& .slick-prev:before": {
      color: constants.color.primaryHard,
    },
    "& .slick-next:before": {
      color: constants.color.primaryHard,
    },
    "& .MuiSvgIcon-root": {
      color: "#dc241f",
      backgroundColor: "#00000024",
      borderRadius: 12,
    },
  },
  backButton: {
    "& .MuiButton-contained": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "red",
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
      "& :hover": {
        backgroundColor: "#F4F7FB",
      },
    },
  },
});
const settingsSlider = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

function detailChatForum() {
  const classes = useStyle();
  const history = useHistory();
  const {id} = useParams();
  const [commentUser, setUserComment] = useState();
  const [chatValue, setChatValue] = useState(commentUser);
  const [fieldOff, setFieldOff] = useState(false);
  const [dataDetail,setDataDetail]= useState();
  const [dataPhotos, setDataPhotos] = useState([]);
  const [typeComment,setTypeComment]= useState("comment");
  const [commentId,setIdComment]=useState();
  const [isReply,setReply]=useState(false);
  const [isLoadData,setIsLoadData]=useState(false);
  const [sendLoadData,setSendLoadData]=useState(false);


  const handleChange = (event) => {
    setChatValue(event.target.value);
  };


  const handleChangeImage = (val) => {
    setChatValue(val.target.value);
    setFieldOff(true);
  };

  const handleSend = () => {
    // setChatValue("");
    console.log("chatValue",chatValue);
    const hashTagConfig = {
      trigger: "#",
      separator: " ",
    };
    setFieldOff(false);
     
    if(typeComment === "comment"){
      try {
        setSendLoadData(true);
        const headers = {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        };
        const dataHit = {
          threadId: id,
          message: chatValue,
        };
        axios
          .post(
            `${process.env.REACT_APP_API_ADD_ONS}/userCommentThread`,
            dataHit,
            headers
          )
          .then((res) => {
            setSendLoadData(false);
            history.go(0);
          });
      } catch (err) {
        alert(`Error send data ${err}`);
      }
    }
    else if(typeComment === "reply"){
      try {
        setSendLoadData(true);
        const headers = {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        };
        const dataHit = {
          threadId: id,
          message: `<p><b style="color:#DC241F;">@${commentUser}</b>&nbsp&nbsp${chatValue}</p>`,
          repliedTo: commentId,
        };
        axios.post(
          `${process.env.REACT_APP_API_ADD_ONS}/userCommentThread`,
          dataHit,
          headers
        ).then((res)=>{
          setSendLoadData(false);
          history.go(0);
        })
      } catch (err) {
        alert(`Error send data ${err}`);
      }
    }
    
  };
  const replyComment = (idComment,userComment)=>{
    console.log(idComment);
    console.log(userComment);
    setTypeComment("reply");
    setIdComment(idComment);
    setUserComment(userComment);
    setReply(true);
  };
  const convertDate = (resDate) => {
    const date = new Date(resDate).getDate();
    const month = new Date(resDate).getMonth();
    const year = new Date(resDate).getFullYear();

    const listMonth = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${date} ${listMonth[month]} ${year}`;
  };
  useEffect(()=>{
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    console.log("idChat",id);
    try {
      setIsLoadData(true);
      axios
        .get(
          `${process.env.REACT_APP_API_ADD_ONS}/getDetailThread?id=${id}`,
          headers
        )
        .then((res) => {
          setIsLoadData(false);
          const detailResponse=res.data;
          const newDataSet = {
            idComment:detailResponse.idComment,
            title: detailResponse.title,
            publishDate: detailResponse.publishDate,
            coverImage:detailResponse.coverImage,
            userName: detailResponse.userName,
            description: detailResponse.description,
            attachment1: detailResponse.attachment1,
            attachment2: detailResponse.attachment2,
            attachment3: detailResponse.attachment3,
            comment: detailResponse.comments,
          };
          setDataDetail(newDataSet);
          // console.log(newDataSet);
        })
        .catch((err) => {
          alert(err);
          setIsLoadData(false);
        });
    } catch (errr) {
      alert(`Fail to Send Remark..!\n ${err}`);
      setIsLoadData(false);
    }
  },[]);

  const htmlToDraftBlocks = (html) => {
    return (
      <div>
        <Markup content={html} />
      </div>
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      <div className={classes.content}>
        <Grid container direction="column">
          <Grid item style={{ padding: "0px 10px 40px 10px" }}>
            <Typography className={classes.title}>Thread Detail</Typography>
          </Grid>

          <Grid item>
            <Paper className={classes.rootPaper}>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                style={{ padding: "30px 100px" }}
              >
                {isLoadData ? (
                  <LoadingView />
                ) : (
                  <>
                    <Grid item>
                      <Typography
                        style={{
                          textAlign: "center",
                          fontWeight: 600,
                          fontSize: "30px",
                          marginTop: "10px",
                        }}
                      >
                        {dataDetail?.title}
                      </Typography>
                    </Grid>
                    <Grid item style={{ marginTop: "30px" }}>
                      <Typography
                        style={{
                          fontSize: "18px",
                          color: "#8D98B4",
                          fontWeight: 600,
                        }}
                      >
                        {convertDate(dataDetail?.publishDate)} -{" "}
                        {dataDetail?.userName}
                      </Typography>
                    </Grid>
                    <Grid item style={{ marginTop: 20 }}>
                      <Grid container>
                        <MinioImageComponent
                          filePath={dataDetail?.coverImage}
                          className={classes.imageStyle}
                        />
                      </Grid>
                    </Grid>
                    <Grid item style={{ marginTop: 20 }}>
                      <Typography
                        style={{
                          fontSize: 18,
                          fontWeight: 400,
                          fontFamily: "Barlow",
                        }}
                      >
                        {htmlToDraftBlocks(dataDetail?.description)}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item style={{ marginTop: 20 }}>
            <Paper className={classes.boxDiscussion}>
              <Typography className={classes.titleBox}>
                Comment <span style={{ color: "#8D98B4" }}>- 234</span>
              </Typography>
              <Grid
                container
                direction="column"
                style={{ marginTop: "36px", overflow: "auto" }}
              >
                {isLoadData ? (
                  <LoadingView />
                ) : (
                  <>
                    {dataDetail?.comment.map((item) => {
                      return (
                        <Grid item className={classes.titleContainer}>
                          <Grid container direction="row">
                            <Grid item xs={11} lg={1}>
                              <Avatar />
                            </Grid>
                            <Grid item xs={11}>
                              <Typography className={classes.titleChat}>
                                {item?.userName}
                                <span
                                  style={{
                                    fontWeight: 400,
                                    fontSize: "20px",
                                    color: "#8D98B4",
                                    marginLeft: "10px",
                                  }}
                                >
                                  {useTimestampConverter(
                                    item?.createdAt / 1000,
                                    "DD/MM/YYYY - HH:mm"
                                  )}
                                </span>
                              </Typography>
                              <Typography className={classes.chat}>
                                {item?.message}
                              </Typography>
                              <MuiIconLabelButton
                                label="Reply"
                                iconPosition="startIcon"
                                buttonIcon={
                                  <CornerLeftArrow
                                    style={{
                                      width: "90%",
                                      height: "80%",
                                      marginRight: 0,
                                    }}
                                  />
                                }
                                onClick={() =>
                                  replyComment(item.idComment, item.userName)
                                }
                                style={{
                                  background: "inherit",
                                  color: "#2B2F3C",
                                  fontWeight: 600,
                                  padding: 0,
                                  marginTop: 10,
                                }}
                              />
                            </Grid>
                          </Grid>
                          {/* reply comment */}
                          {item?.reply.map((itemReply) => {
                            return (
                              <>
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="flex-end"
                                >
                                  <Grid item xs={10} lg={1}>
                                    <Avatar />
                                  </Grid>
                                  <Grid item xs={10}>
                                    <Typography className={classes.titleChat}>
                                      {itemReply?.userName}
                                      <span
                                        style={{
                                          fontWeight: 400,
                                          fontSize: "20px",
                                          color: "#8D98B4",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {useTimestampConverter(
                                          itemReply?.createdAt / 1000,
                                          "DD/MM/YYYY - HH:mm"
                                        )}
                                      </span>
                                    </Typography>
                                    <Typography className={classes.chat}>
                                      {htmlToDraftBlocks(itemReply?.message)}
                                    </Typography>
                                    <MuiIconLabelButton
                                      label="Reply"
                                      iconPosition="startIcon"
                                      buttonIcon={
                                        <CornerLeftArrow
                                          style={{
                                            width: "90%",
                                            height: "80%",
                                            marginRight: 0,
                                          }}
                                        />
                                      }
                                      onClick={() =>
                                        replyComment(
                                          item.idComment,
                                          itemReply.userName
                                        )
                                      }
                                      style={{
                                        background: "inherit",
                                        color: "#2B2F3C",
                                        fontWeight: 600,
                                        padding: 0,
                                        marginTop: 10,
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </>
                            );
                          })}
                        </Grid>
                      );
                    })}
                  </>
                )}
              </Grid>
            </Paper>
          </Grid>

          <Grid item>
            <Paper className={classes.chatBox}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={1}>
                  <Avatar />
                </Grid>
                <Grid item xs={10} style={{ paddingRight: 20 }}>
                  {isReply === true ? (
                    <Typography
                      style={{ fontWeight: 400, fontSize: 13, opacity: 0.6 }}
                    >
                      Replying to{" "}
                      <span style={{ color: "#DC241F" }}>@{commentUser}</span>
                    </Typography>
                  ) : (
                    ""
                  )}
                  <input
                    id="gambarUpload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(newVal) => handleChangeImage(newVal)}
                  />
                  <label htmlFor="gambarUpload" style={{ cursor: "pointer" }}>
                    <LabelTextField
                      placeholder="Masukan Komentar Anda"
                      endIcon={<PaperClip />}
                      value={chatValue}
                      onChange={handleChange}
                      disabled={fieldOff}
                    />
                  </label>
                </Grid>
                <Grid item xs={1}>
                  {isReply === true ? (
                    <Typography
                      style={{ fontWeight: 400, fontSize: 13, opacity: 0.6 }}
                    >
                      {" "}
                    </Typography>
                  ) : (
                    ""
                  )}
                  <MuiIconLabelButton
                    label="Kirim"
                    iconPosition="endIcon"
                    buttonIcon={<SendIcon />}
                    onClick={() => handleSend(typeComment)}
                    style={{ marginTop: isReply === true ? 20 : 0 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <ModalLoader isOpen={sendLoadData} />
    </div>
  );
}

export default detailChatForum;