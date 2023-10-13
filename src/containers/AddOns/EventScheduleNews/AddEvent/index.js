import React, { useEffect } from "react";
import { withStyles, ThemeProvider } from "@material-ui/styles";
import { Typography, Grid, Card } from "@material-ui/core";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { Layout } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { createTheme } from "@material-ui/core";
import { ReactComponent as LeftArrow } from "../../../../assets/icons/linear-red/arrow-left.svg";
import { ReactComponent as CameraIcon } from "../../../../assets/icons/linear-red/camera.svg";
import LabelTextField from "../../../../components/Form/LabelTextField";
import { useState } from "react";
import TextEditorAddEvent from "../../../../components/TextEditor/AddEvent";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useParams } from "react-router-dom";
import ModalLoader from "../../../../components/ModalLoader";
import { saveEvent, saveSchedule, saveNews } from "../service";
import { doUploadPhoto } from "../../../Implementation/ApiServiceImplementation";
import { doUploadDocument } from "../../../Implementation/ApiServiceImplementation";
import constansts from "../../../../helpers/constants";
import PopupSucces from "../../../../components/PopupSucces";

const BarlowTypography = withStyles({
  root: {
    fontStyle: "normal",
    fontFamily: "Barlow",
  },
})(Typography);

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 36,
      fontWeight: 500,
    },
    body1: {
      fontSize: 15,
      fontWeight: 500,
    },
    body2: {
      fontSize: 13,
      fontWeight: 400,
    },
  },
});

const CustomizedCard = withStyles({
  root: {
    borderRadius: 8,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    border: "1px solid #E6EAF3",
  },
})(Card);

const AddEvent = () => {
  const { id } = useParams();
  const history = useHistory();
  const pathName = useLocation().pathname;
  const { Content } = Layout;
  const [imageCover, setImageCover] = useState({ name: "" });
  const [titleInput, setTitleInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [titleMandatory, setTitleMandatory] = useState("");
  const [coverMandatory, setCoverMandatory] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const readPathName = (path) => {
    const splitedPath = path.split("-");
    return splitedPath[splitedPath.length - 1];
  };

  // Text Editor State
  const [textInput, setTextInput] = useState();
  const [imageInput, setImageInput] = useState([]);
  const [docInput, setDocInput] = useState([]);
  const [vidInput, setVidInput] = useState([]);

  // Text Editor handler Start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const onChangeImage = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const lastIndexDot = file.name.lastIndexOf(".");
    const sliceFile = file.name.slice(lastIndexDot + 1);
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
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const lastIndexDot = file.name.lastIndexOf(".");
    const sliceFile = file.name.slice(lastIndexDot + 1);
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
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const lastIndexDot = file.name.lastIndexOf(".");
    const sliceFile = file.name.slice(lastIndexDot + 1);
    if (sliceFile == "mp4") {
      const data = [...vidInput];
      const obj = {};
      obj.file = file;
      obj.name = file.name;
      data.push(obj);
      setVidInput(data);
      return;
    }
    return alert("format video harus mp4");
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

  const onSave = async () => {
    // check image cover
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

    // upload gambar cover
    await doUploadPhoto(imageCover).then((res) => {
      if (res.data.responseCode === "00") coverImage = res.data.path;
    });

    // upload file attachments
    const dataAttachment = [];
    const doUploadImage = async (arrImage) => {
      if (arrImage) {
        await Promise.all(
          arrImage.map(async (image) => {
            await doUploadPhoto(image.file).then((res) => {
              if (res.data.responseCode === "00")
                dataAttachment.push(res.data.path);
              else return alert(`gagal upload gambar`);
            });
          })
        );
      }
    };

    const doUploadDataAttachment = async (arrDoc, arrVideo) => {
      if (arrDoc) {
        await Promise.all(
          arrDoc.map(async (document) => {
            await doUploadDocument(document.file).then((res) => {
              if (res.data.responseCode === "00")
                dataAttachment.push(res.data.path);
              else return alert(`gagal upload document`);
            });
          })
        );
      }
      if (arrVideo) {
        await Promise.all(
          arrVideo.map(async (video) => {
            await doUploadDocument(video.file).then((res) => {
              if (res.data.responseCode === "00")
                dataAttachment.push(res.data.path);
              else return alert(`gagal upload video`);
            });
          })
        );
      }
    };

    await doUploadImage(imageInput);

    await doUploadDataAttachment(docInput, vidInput);

    // pass data to Back End
    if (readPathName(pathName) === "event") {
      await saveEvent(
        loaderHandler,
        titleInput,
        coverImage,
        markup,
        dataAttachment
      ).then((res) => {
        if (res.status === 200) setIsSuccess(true);
      });
    }

    if (readPathName(pathName) === "schedule") {
      await saveSchedule(
        loaderHandler,
        titleInput,
        coverImage,
        markup,
        dataAttachment
      ).then((res) => {
        if (res.status === 200) setIsSuccess(true);
      });
    }

    if (readPathName(pathName) === "news") {
      await saveNews(
        loaderHandler,
        titleInput,
        coverImage,
        markup,
        dataAttachment
      ).then((res) => {
        if (res.status === 200) setIsSuccess(true);
      });
    }
  };
  // Text Editor handler End >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const onChangeCoverImage = (e) => {
    console.log(e.target.files[0]);
    setImageCover(e.target.files[0]);
  };

  const onChangeTitle = (e) => {
    setTitleInput(e.target.value);
  };

  const onClosePopUp = () => {
    history.push(`/add-ons/event-schedule-news`);
  };

  useEffect(() => {
    setTitleMandatory("");
    if (!titleInput)
      setTitleMandatory(`*Judul ${readPathName(pathName)} harus di isi!`);
  }, [titleInput]);

  useEffect(() => {
    setCoverMandatory("");
    if (!imageCover.name) setCoverMandatory(`*Gambar Cover harus di isi!`);
  }, [imageCover.name]);

  return (
    <ThemeProvider theme={theme}>
      <ModalLoader isOpen={isLoading} />
      <PopupSucces
        isOpen={isSuccess}
        message={`${readPathName(pathName)} Berhasil Ditambah`}
        onClose={onClosePopUp}
      />
      <Layout style={{ padding: 30, background: "inherit" }}>
        <Content>
          <MuiIconLabelButton
            label={"Back"}
            iconPosition="startIcon"
            buttonIcon={<LeftArrow />}
            onClick={() => history.push("/add-ons/event-schedule-news")}
            style={{ background: "inherit", color: "#DC241F", padding: 0 }}
          />
        </Content>
        <Content style={{ marginTop: 20 }}>
          <BarlowTypography
            variant="h1"
            color="initial"
            style={{ textTransform: "capitalize" }}
          >
            Tambah {readPathName(pathName)}
          </BarlowTypography>
        </Content>
        <Content style={{ marginTop: 25 }}>
          <CustomizedCard
            variant="outlined"
            style={{
              padding: "18px 20px 13px 20px",
            }}
          >
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={6}>
                <BarlowTypography variant="body1" color="initial">
                  Judul :
                </BarlowTypography>
                <LabelTextField
                  placeholder={"Masukan judul Event"}
                  type="text"
                  value={titleInput}
                  onChange={(e) => onChangeTitle(e)}
                />
                <BarlowTypography
                  variant="caption"
                  style={{ color: constansts.color.primaryHard }}
                >
                  {titleMandatory}
                </BarlowTypography>
              </Grid>
              <Grid item xs={6}>
                <BarlowTypography variant="body1" color="initial">
                  Gambar Cover :
                </BarlowTypography>
                <div style={{ position: "relative" }}>
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
                </div>
                <BarlowTypography
                  variant="caption"
                  style={{ color: constansts.color.primaryHard }}
                >
                  {coverMandatory}
                </BarlowTypography>
              </Grid>
            </Grid>
          </CustomizedCard>
        </Content>
        <Content style={{ marginTop: 20 }}>
          <TextEditorAddEvent
            editorState={textInput}
            onChangeEditor={onChangeEditor}
            labelButton={"Simpan"}
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
        </Content>
      </Layout>
    </ThemeProvider>
  );
};

export default AddEvent;
