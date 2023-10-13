import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Markup } from "interweave";
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
import { makeStyles, withStyles } from "@material-ui/styles";
import { Typography, Grid, Paper } from "@material-ui/core";
import { useHistory,useParams } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as CameraIcon } from "../../../../assets/icons/linear-red/camera.svg";
import { ReactComponent as ArrowLeft } from "../../../../assets/icons/siab/arrow-left.svg";
import LabelTextField from "../../../../components/Form/LabelTextField";
import getMinioFile from "../../../../helpers/getMinioFile";
import {
  doUploadPhoto,
  doUploadDocument,
} from "../../../Implementation/ApiServiceImplementation";
import TextEditorAddEvent from "../../../../components/TextEditor/AddEvent";
import { editThread } from "../../EventScheduleNews/service";
import ModalLoader from "../../../../components/ModalLoader";

const useStyle = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "36px",
  },
  rootPaper: {
    width: "100%",
    height: "101px",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    padding: "18px 20px 30px 20px",
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
function EditThread(props) {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();
  const [dataDetail, setDataDetail] = useState();
  const [imageCover, setImageCover] = useState({ name: "" });
  const [titleInput, setTitleInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Text Editor State
  const [textInput, setTextInput] = useState();
  const [imageInput, setImageInput] = useState([]);
  const [docInput, setDocInput] = useState([]);
  const [vidInput, setVidInput] = useState([]);

  // Text Editor handler Start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const lastIndexDot = file.name.lastIndexOf(".");
    const sliceFile = file.name.slice(lastIndexDot + 1);
    console.log(sliceFile);
    if (sliceFile == "jpeg" || sliceFile == "jpg" || sliceFile == "png") {
      const data = [...imageInput];
      const obj = {};
      obj.file = file;
      obj.objURL = URL.createObjectURL(file);
      data.push(obj);
      setImageInput(data);
      return;
    }
    return alert("format file harus jpeg, jpg, atau png");
  };

  const onDeleteImage = (e) => {
    const clickedImage = imageInput[e];
    const filterImage = imageInput.filter((x) => x != clickedImage);

    setImageInput(filterImage);
  };

  const onChangeDocument = (e) => {
    const file = e.target.files[0];
    const lastIndexDot = file.name.lastIndexOf(".");
    const sliceFile = file.name.slice(lastIndexDot + 1);
    console.log(sliceFile);
    if (sliceFile == "docx" || sliceFile == "pdf" || sliceFile == "doc") {
      const data = [...docInput];
      const obj = {};
      obj.file = file;
      obj.name = file.name;
      data.push(obj);
      setDocInput(data);
      return;
    }
    return alert("format file harus berbentuk doc, docx, atau pdf");
  };

  const onDeleteDocument = (e) => {
    const clickedDocument = docInput[e];
    const filterDocument = docInput.filter((x) => x != clickedDocument);

    setDocInput(filterDocument);
  };

  const onChangeVideo = (e) => {
    const file = e.target.files[0];
    const lastIndexDot = file.name.lastIndexOf(".");
    const sliceFile = file.name.slice(lastIndexDot + 1);
    console.log(sliceFile);
    if (
      sliceFile == "mp4" ||
      sliceFile == "mkv" ||
      sliceFile == "mov" ||
      sliceFile == "avi"
    ) {
      const data = [...vidInput];
      const obj = {};
      obj.file = file;
      obj.name = file.name;
      data.push(obj);
      setVidInput(data);
      return;
    }
    return alert("format video harus mp4, mkv, mov atau avi");
  };

  const onDeleteVideo = (e) => {
    const clickedVideo = vidInput[e];
    const filterVideo = vidInput.filter((x) => x != clickedVideo);

    setVidInput(filterVideo);
  };

  const onChangeEditor = (val) => {
    setTextInput(val);
  };
  const loaderHandler = (bool) => {
    setIsLoading(bool);
  };
  const htmlToDraftBlocks = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };
  const convertAttachment=async(attachments)=>{
    const arrImage=[];
    const arrDoc=[];
    const arrVid=[];
    if(!attachments){
      return;
    }
    await Promise.all(
      attachments.map(async(attachment,index)=>{
        const obj = {};
        const lastIndexOfAttachment = attachment.lastIndexOf(".");
        const extentionName = attachment.slice(lastIndexOfAttachment + 1);
        if(extentionName === "jpg"||extentionName === "jpeg" || extentionName === "png"){
          await getMinioFile(attachment).then((res) => {
            obj.objURL = res.fileUrl;
            obj.fromAPI = 1;
            obj.file = attachment;
            arrImage.push(obj);
          });
        } if (
          extentionName === "docx" ||
          extentionName === "pdf" ||
          extentionName === "doc"
        ) {
          await getMinioFile(attachment).then((res) => {
            obj.name = res.fileName;
            obj.objURL = res.fileUrl;
            obj.file = attachment;
            obj.fromAPI = 1;
            arrDoc.push(obj);
          });
        }
        if (
          extentionName === "MP4"
        ) {
          await getMinioFile(attachment).then((res) => {
            obj.name = res.fileName;
            obj.objURL = res.fileUrl;
            obj.file = attachment;
            obj.fromAPI = 1;
            arrVid.push(obj);
          });
        }
      })
    );
    setImageInput(arrImage);
    setDocInput(arrDoc);
    setVidInput(arrVid);
  };
  const convertImageCover = async (image) => {
    const obj = {};
    await getMinioFile(image).then((res) => {
      obj.name = res.fileName;
      obj.file = image;
      obj.fromAPI = 1;
    });
    console.log(obj);
    setImageCover(obj);
  };
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    console.log("idChat", id);
    try {
      // setIsLoadData(true);
      axios
        .get(
          `${process.env.REACT_APP_API_ADD_ONS}/getDetailThread?id=${id}`,
          headers
        )
        .then((res) => {
          // setIsLoadData(false);
          const detailResponse = res.data;
          const newDataSet = {
            title: detailResponse.title,
            publishDate: detailResponse.publishDate,
            coverImage: detailResponse.coverImage,
            userName: detailResponse.userName,
            description: detailResponse.description,
            attachment: detailResponse?.attachment,
          };
          setTitleInput(newDataSet.title);
          setTextInput(htmlToDraftBlocks(newDataSet.description));
          // console.log(newDataSet);
          convertAttachment(newDataSet.attachment);
          convertImageCover(newDataSet.coverImage);
        })
        .catch((err) => {
          alert(err);
          // setIsLoadData(false);
        });
    } catch (errr) {
      alert(`Fail to Send Remark..!\n ${err}`);
      // setIsLoadData(false);
    }
  }, []);
  const onSave = async () => {
   
    if (!imageCover.name) return alert(`Gambar Cover harus di isi!`);
    setIsLoading(true);
    let coverImage;
    const hashTagConfig = {
      trigger: "#",
      separator: " ",
    };

    const htmlToRaw = convertToRaw(textInput.getCurrentContent());

    const markup = draftToHtml(htmlToRaw, hashTagConfig);
    console.log(markup);

    // upload gambar
    if(imageCover.fromAPI !== 1){
      await doUploadPhoto(imageCover).then((res) => {
        if (res.data.responseCode === "00") coverImage = res.data.path;
      });
    }else{
      coverImage=imageCover.file;
    }
   
    // upload file attachments
    const dataAttachment = [];
    const doUploadImage = async (arrImage) => {
      if (arrImage) {
        await Promise.all(
          arrImage.map(async (image) => {
            if(image.fromAPI !== 1){
               await doUploadPhoto(image.file).then((res) => {
                 // console.log(image.file)
                 if (res.data.responseCode === "00")
                   dataAttachment.push(res.data.path);
                 else return alert(`gagal upload gambar`);
               });
            }else{
              dataAttachment.push(image.file);
            }
          })
        );
      }
    };
    const doUploadDataAttachment = async (arrDoc, arrVideo) => {
      if (arrDoc) {
        await Promise.all(
          arrDoc.map(async (document) => {
            if(document.fromAPI !== 1){
               await doUploadDocument(document.file).then((res) => {
                 if (res.data.responseCode === "00")
                   dataAttachment.push(res.data.path);
                 else return alert(`gagal upload document`);
               });
            }else{
              dataAttachment.push(document.file);
            }
           
          })
        );
      }
      if (arrVideo) {
        await Promise.all(
          arrVideo.map(async (video) => {
            if (video.fromAPI !== 1) {
              await doUploadDocument(video.file).then((res) => {
                if (res.data.responseCode === "00")
                  dataAttachment.push(res.data.path);
                else return alert(`gagal upload video`);
              });
            } else {
              dataAttachment.push(video.file);
            }
          })
        );
      }
    };
    await doUploadImage(imageInput);
    await doUploadDataAttachment(docInput, vidInput);

    // send data
    await editThread(
      loaderHandler,
      id,
      titleInput,
      coverImage,
      markup,
      dataAttachment
    ).then((res) => {
      if (res.status === 200) history.push(`/add-ons/chat-forum`);
      else setIsLoading(false);
    });
  };
  // Text Editor handler End >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const onChangeCoverImage = (e) => {
    console.log(e.target.files[0]);
    setImageCover(e.target.files[0]);
  };

  const onChangeTitle = (e) => {
    setTitleInput(e.target.value);
  };
  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          buttonIcon={<ArrowLeft />}
          onClick={() => history.goBack()}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Grid container direction="column">
          <Grid item>
            <Typography className={classes.title}>Edit Thread</Typography>
          </Grid>
          <Grid item>
            <Paper className={classes.rootPaper}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                spacing={2}
              >
                <Grid item xs={6}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                        Judul :
                      </Typography>
                    </Grid>
                    <Grid item>
                      <LabelTextField
                        placeholder="Masukan judul thread"
                        type="text"
                        style={{ width: "480px", height: "47px" }}
                        value={titleInput}
                        onChange={(e) => onChangeTitle(e)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                        Gambar Cover :
                      </Typography>
                    </Grid>
                    <Grid item>
                      <input
                        type="file"
                        accept="image/*"
                        id="coverImage"
                        style={{
                          opacity: 0,
                          scale: 0,
                          position: "absolute",
                          zIndex: 0,
                        }}
                        onChange={(e) => onChangeCoverImage(e)}
                      />
                      <LabelTextField
                        placeholder={"Upload Gambar Cover"}
                        endIcon={
                          <label htmlFor="coverImage">
                            <CameraIcon />
                          </label>
                        }
                        type="text"
                        style={{
                          "&::focus": { outline: "none" },
                          "&::hover": { outline: "none" },
                          height: 40,
                        }}
                        value={imageCover.name}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item style={{ marginTop: 20 }}>
            <TextEditorAddEvent
              editorState={textInput}
              onChangeEditor={onChangeEditor}
              labelButton="Simpan"
              onClickButton={onSave}
              imageVal={imageInput}
              docVal={docInput}
              videoVal={vidInput}
              onChangeImage={onChangeImage}
              onDeleteImage={onDeleteImage}
              onChangeDocument={onChangeDocument}
              onDeleteDocument={onDeleteDocument}
              onChangeVideo={onChangeVideo}
              onDeleteVideo={onDeleteVideo}
            />
          </Grid>
        </Grid>
      </div>
      <ModalLoader isOpen={isLoading} />
    </div>
  );
}

EditThread.propTypes = {};

export default EditThread;
