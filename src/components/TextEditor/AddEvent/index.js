import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { Grid, Card, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextButton from "../../Button/TextButton";
import PropTypes from "prop-types";
import { ReactComponent as InsertImageIcon } from "../../../assets/icons/general/insertImage.svg";
import { ReactComponent as InsertDocumentIcon } from "../../../assets/icons/general/insertFile.svg";
import { ReactComponent as InsertVideoIcon } from "../../../assets/icons/general/insertVideo.svg";
import { GraySoft } from "../../../assets/theme/colors";
import Barlow from "../../Typography/barlow";

const MainGrid = withStyles({
  root: {
    overflow: "auto",
    height: 480,
  },
})(Grid);

const CustomizedCard = withStyles({
  root: {
    borderRadius: 8,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    border: "1px solid #E6EAF3",
  },
})(Card);

const BottomGrid = withStyles({
  root: {
    boxShadow: "0px -6px 6px rgba(232, 238, 255, 0.3)",
    position: "absolute",
    bottom: 0,
  },
})(Grid);

const ToolbarGrid = withStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 38,
    gap: 10,
    border: `1px solid ${GraySoft}`,
  },
})(Grid);

const MappedGrid = withStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    position: "relative",
  },
})(Grid);

const useStyle = makeStyles({
  inputImage: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
});

/* Dokumentasi Text Editor,

  const [textInput, setTextInput] = useState();
  const [imageInput, setImageInput] = useState([]);
  const [docInput, setDocInput] = useState([]);
  const [vidInput, setVidInput] = useState([]);

  // Text Editor handler Start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const onChangeImage = (e) => {
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

  const onChangeEditor = (val) => {
    setTextInput(val);
  };

  const onSave = () => {
    console.log(textInput);
    console.log(imageInput);
    console.log(docInput);
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

<<<<<<<<<<<<<<<<<< contoh cara pemanggilan component >>>>>>>>>>>>>>>>>>>>

  <TextEditorAddEvent
    editorState={textInput}
    onChangeEditor={onChangeEditor}
    labelButton={"Simpan"}
    onClickButton={() => console.log(textInput)}
    imageVal={imageInput}
    docVal={docInput}
    onChangeImage={onChangeImage}
    onDeleteImage={onDeleteImage}
    onChangeDocument={onChangeDocument}
    onDeleteDocument={onDeleteDocument}
  />

*/

const TextEditorAddEvent = (props) => {
  const {
    editorState,
    onChangeEditor,
    labelButton,
    onClickButton,
    imageVal,
    docVal,
    videoVal,
    onChangeImage,
    onDeleteImage,
    onChangeDocument,
    onDeleteDocument,
    onChangeVideo,
    onDeleteVideo,
  } = props;

  const { inputImage } = useStyle();

  const InputImage = () => {
    return (
      <div style={{ position: "relative" }}>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          name="insertImage"
          id="insertImage"
          className={inputImage}
          onChange={onChangeImage}
        />
        <label
          htmlFor="insertImage"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InsertImageIcon style={{ cursor: "pointer" }} />
        </label>
      </div>
    );
  };

  const InputDocument = () => {
    return (
      <div style={{ position: "relative" }}>
        <input
          type="file"
          name="insertDocument"
          id="insertDocument"
          className={inputImage}
          onChange={onChangeDocument}
        />
        <label
          htmlFor="insertDocument"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InsertDocumentIcon style={{ cursor: "pointer" }} />
        </label>
      </div>
    );
  };

  const InputVideo = () => {
    return (
      <div style={{ position: "relative" }}>
        <input
          type="file"
          name="insertVideo"
          id="insertVideo"
          className={inputImage}
          onChange={onChangeVideo}
          accept="video/mp4"
        />
        <label
          htmlFor="insertVideo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InsertVideoIcon style={{ cursor: "pointer" }} />
        </label>
      </div>
    );
  };

  return (
    <>
      <CustomizedCard
        variant="outlined"
        style={{ height: 550, position: "relative" }}
      >
        <MainGrid container justifyContent="flex-start" alignItems="start">
          <Grid item xs={9} style={{ padding: 5 }}>
            <Editor
              editorState={editorState}
              onEditorStateChange={onChangeEditor}
              toolbar={{
                options: [
                  "inline",
                  "emoji",
                  "textAlign",
                  "list",
                  "link",
                  "history",
                ],
                inline: {
                  options: ["bold", "italic", "underline", "strikethrough"],
                },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
              }}
            />
          </Grid>
          <Grid item xs={3} style={{ padding: 5 }}>
            <ToolbarGrid item xs={12}>
              <InputImage />
              <InputDocument />
              <InputVideo />
            </ToolbarGrid>
            {imageVal &&
              imageVal.map((image, index) => (
                <MappedGrid key={index} item xs={12}>
                  <img
                    src={image.objURL}
                    alt=""
                    style={{ width: "95%", aspectRatio: 16 / 9 }}
                  />
                  <TextButton
                    title={"x"}
                    onClick={() => {
                      onDeleteImage(index);
                    }}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  />
                </MappedGrid>
              ))}
            {docVal &&
              docVal.map((document, index) => (
                <MappedGrid
                  key={index}
                  item
                  xs={12}
                  style={{ justifyContent: "flex-start" }}
                >
                  <Barlow>{document.name}</Barlow>
                  <TextButton
                    title={"x"}
                    onClick={() => {
                      onDeleteDocument(index);
                    }}
                  />
                </MappedGrid>
              ))}
            {videoVal &&
              videoVal.map((video, index) => (
                <MappedGrid
                  key={index}
                  item
                  xs={12}
                  style={{ justifyContent: "flex-start" }}
                >
                  <Barlow>{video.name}</Barlow>
                  <TextButton
                    title={"x"}
                    onClick={() => {
                      onDeleteVideo(index);
                    }}
                  />
                </MappedGrid>
              ))}
          </Grid>
          {/* </Grid> */}
        </MainGrid>
        <BottomGrid container justifyContent="center" alignItems="center">
          <TextButton
            title={labelButton ? labelButton : "Simpan"}
            height={70}
            onClick={onClickButton}
          />
        </BottomGrid>
      </CustomizedCard>
    </>
  );
};

TextEditorAddEvent.propTypes = {
  editorState: PropTypes.node.isRequired,
  onChangeEditor: PropTypes.func.isRequired,
  labelButton: PropTypes.string,
  onClickButton: PropTypes.func.isRequired,
  imageVal: PropTypes.array.isRequired,
  docVal: PropTypes.array.isRequired,
  videoVal: PropTypes.array.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  onChangeDocument: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  onDeleteDocument: PropTypes.func.isRequired,
  onChangeVideo: PropTypes.func.isRequired,
  onDeleteVideo: PropTypes.func.isRequired,
};

export default TextEditorAddEvent;
