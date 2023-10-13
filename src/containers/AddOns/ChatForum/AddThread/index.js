import React,{useState,useEffect}from 'react';
import PropTypes from 'prop-types';
import{makeStyles,withStyles}from"@material-ui/styles";
import{Typography,Grid,Paper}from"@material-ui/core";
import { useHistory } from 'react-router-dom';
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { ReactComponent as CameraIcon } from "../../../../assets/icons/linear-red/camera.svg";
import { ReactComponent as ArrowLeft } from "../../../../assets/icons/siab/arrow-left.svg";
import LabelTextField from '../../../../components/Form/LabelTextField';
import { doUploadPhoto,doUploadDocument } from "../../../Implementation/ApiServiceImplementation";
import TextEditorAddEvent from '../../../../components/TextEditor/AddEvent';
import {saveThread} from "../../EventScheduleNews/service";
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
    height: "120px",
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
function AddThread(props) {
  const classes = useStyle();
  const history = useHistory();
  const [imageCover,setImageCover]=useState({name:""});
  const [titleInput,setTitleInput]=useState("");
  const [isLoading,setIsLoading]=useState(false);
  const [titleMandatory, setTitleMandatory] = useState("");
  const [coverMandatory, setCoverMandatory] = useState("");

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
      sliceFile === "mp4" ||
      sliceFile === "mkv" ||
      sliceFile === "mov" ||
      sliceFile === "avi"
    ) {
      const data = [...vidInput];
      const obj = {};
      obj.file = file;
      obj.name = file.name;
      data.push(obj);
      setVidInput(data);
      return;
    }
    return  alert("format video harus mp4, mkv, mov atau avi");
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
  const onSave = async() => {
    setIsLoading(true);
    let coverImage;
    const hashTagConfig = {
      trigger: "#",
      separator: " ",
    };

    const htmlToRaw = convertToRaw(textInput.getCurrentContent());

    const markup= draftToHtml(htmlToRaw,hashTagConfig);
    console.log(markup);
 
    // upload gambar
    await doUploadPhoto(imageCover).then((res)=>{
      if(res.data.responseCode === "00")coverImage=res.data.path;
    });

    // upload file attachments
    const dataAttachment=[];
    const doUploadImage=async(arrImage)=>{
      if(arrImage){
        await Promise.all(
          arrImage.map(async(image)=>{
            await doUploadPhoto(image.file).then((res)=>{
              // console.log(image.file)
              if(res.data.responseCode === "00")
                dataAttachment.push(res.data.path);
              else return alert(`gagal upload gambar`);
            });
          })
        );
      }
    };
    const doUploadDataAttachment=async(arrDoc,arrVideo)=>{
      if(arrDoc){
        await Promise.all(
          arrDoc.map(async(document)=>{
            await doUploadDocument(document.file).then((res)=>{
              if(res.data.responseCode === "00")
                dataAttachment.push(res.data.path);
              else return alert(`gagal upload document`);
            });
          })
        );
      }
      if(arrVideo){
        await Promise.all(
          arrVideo.map(async(video)=>{
            await doUploadDocument(video.file).then((res)=>{
              if(res.data.responseCode === "00")
                dataAttachment.push(res.data.path);
              else return alert(`gagal upload video`);
            });
          })
        );
      }
    };
    await doUploadImage(imageInput);
    await doUploadDataAttachment(docInput,vidInput);

    // send data
    await saveThread(loaderHandler,titleInput,coverImage,markup,dataAttachment).then((res)=>{
      if(res.status === 200) history.push(`/add-ons/chat-forum`);
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
  useEffect(() => {
    setTitleMandatory("");
    if (!titleInput)
      setTitleMandatory(`*Judul harus di isi!`);
  }, [titleInput]);

  useEffect(() => {
    setCoverMandatory("");
    if (!imageCover.name) setCoverMandatory(`*Gambar Cover harus di isi!`);
  }, [imageCover.name]);

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
            <Typography className={classes.title}>Tambah Thread</Typography>
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
                      <Typography style={{ color: "#DC241F",fontSize:12 }}>
                        {titleMandatory}
                      </Typography>
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
                      <Typography style={{ color: "#DC241F",fontSize:12 }}>
                        {coverMandatory}
                      </Typography>
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

AddThread.propTypes = {};

export default AddThread;
