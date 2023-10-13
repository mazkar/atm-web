import React, { useEffect, useState } from "react";
// lib import
import { Layout } from "antd";
import { Grid, Typography, Card } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
// component import
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import GeneralCard from "../../../../../components/Card/GeneralCard";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/linear-red/arrow-left.svg";
import { PrimaryHard, GraySoft } from "../../../../../assets/theme/colors";
import {
  Barlow13,
  Barlow15,
  Barlow18,
  Barlow36,
} from "../../../../../components/Typography/BarlowWithSize";
// text editor import
import TextEditorAddEvent from "../../../../../components/TextEditor/AddEvent";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import {
  doUploadPhoto,
  doUploadDocument,
} from "../../../../Implementation/ApiServiceImplementation";
import {
  saveAndUpdateFileManagement,
  dogetDetailAllFile,
} from "../../../serviceFileManagement";
import PopupSucces from "../../../../../components/PopupSucces";
import ModalLoader from "../../../../../components/ModalLoader";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import getMinioFile from "../../../../../helpers/getMinioFile";

const useStyles = makeStyles({
  root: {
    padding: 30,
    background: "inherit",
  },
  flexTitle: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputTitleStyle: {
    border: 0,
    "&:focus": {
      outline: "none",
    },
    fontFamily: "Barlow",
    fontSize: 18,
    fontWeight: 600,
    fontStyle: "italic",
  },
});

const AddFileKnowledgeBase = () => {
  const { id } = useParams();
  const folderId = id.split("-")[0];
  const fileId = id.split("-")[1];
  const history = useHistory();
  const pathName = useLocation().pathname;
  const pathCategory = pathName.split("/")[3];
  const [textInput, setTextInput] = useState();
  const [imageInput, setImageInput] = useState([]);
  const [docInput, setDocInput] = useState([]);
  const [vidInput, setVidInput] = useState([]);

  const { Content } = Layout;
  const { root, flexTitle, inputTitleStyle } = useStyles();
  const [inputTitle, setInputTitle] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const loaderHandler = (bool) => setIsLoading(bool);

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
      obj.fromAPI = 0;
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
      obj.fromAPI = 0;
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

  const onSave = async () => {
    if (!inputTitle) return alert("judul tidak boleh kosong!");

    setIsLoading(true);

    const hashTagConfig = {
      trigger: "#",
      separator: " ",
    };

    const htmlToRaw = convertToRaw(textInput.getCurrentContent());

    const markup = draftToHtml(htmlToRaw, hashTagConfig);

    console.log(markup);

    const dataAttachment = [];

    // upload photo
    const uploadImage = async (arrImage) => {
      if (arrImage) {
        await Promise.all(
          arrImage.map(async (image) => {
            if (image.fromAPI === 0) {
              await doUploadPhoto(image.file).then((res) => {
                if (res.data.responseCode === "00") {
                  dataAttachment.push(res.data.path);
                } else return alert("gagal upload gambar");
              });
            } else dataAttachment.push(image.file);
          })
        );
      }
    };

    // upload document
    const uploadDocument = async (arrDoc) => {
      if (arrDoc) {
        await Promise.all(
          arrDoc.map(async (doc) => {
            if (doc.fromAPI === 0) {
              await doUploadDocument(doc.file).then((res) => {
                if (res.data.responseCode === "00") {
                  dataAttachment.push(res.data.path);
                } else return alert("gagal upload document");
              });
            } else dataAttachment.push(doc.file);
          })
        );
      }
    };

    // upload video
    const uploadVideo = async (arrVid) => {
      if (arrVid) {
        await Promise.all(
          arrVid.map(async (vid) => {
            if (vid.fromAPI === 0) {
              await doUploadDocument(vid.file).then((res) => {
                if (res.data.responseCode === "00") {
                  dataAttachment.push(res.data.path);
                } else return alert("gagal upload video");
              });
            } else dataAttachment.push(vid.file);
          })
        );
      }
    };

    await uploadImage(imageInput);

    await uploadDocument(docInput);

    await uploadVideo(vidInput);

    const payload = {
      type: 2,
      folderId: folderId,
      fileName: inputTitle,
      description: markup,
      attachment: dataAttachment,
    };

    if (pathCategory === "edit-file") {
      payload.id = fileId;
    }

    await saveAndUpdateFileManagement(loaderHandler, payload).then((res) => {
      if (res)
        if (res.status === 200) {
          setIsSuccess(true);
        }
    });

    // {
    //     "id": 15,  ==> Tambahkan di payload untuk Update, Untuk Create tidak usah ditambah.

    //     "type": 3,
    //     "folderId": 4,
    //     "fileName": "Mencoba API baru",
    //     "description": "Mencoba Buat deskripsi",
    //     "attachment": ["atm_bussiness/public/image_survey/1976d461253d.jpg", "atm_bussiness/public/image_survey/1976d461253d.jpg", "atm_bussiness/public/image_survey/1976d461253d.jpg"]
    // }

    // 1 = Doc Control
    // 2 = Knowledge Base
    // 3 = Doc Project
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
      obj.fromAPI = 0;
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

  // Text Editor handler End >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const handleInputTitle = (e) => {
    setInputTitle(e);
  };

  const onClosePopUp = () => {
    history.push(
      `/file-management/configuration/detail-knowledge-base/${folderId}`
    );
  };

  const convertToHtml = (html) => {
    const { entityMap, contentBlocks } = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );

    return EditorState.createWithContent(contentState);
  };

  useEffect(() => {
    if (pathCategory === "edit-file") {
      dogetDetailAllFile(loaderHandler, { id: fileId, type: "knowledge" })
        .then(async (res) => {
          if (res)
            if (res.responseCode == 200) {
              const arrImage = [];
              const arrDoc = [];
              const arrVid = [];
              setInputTitle(res.fileName);
              setTextInput(convertToHtml(res.description));
              await Promise.all(
                JSON.parse(res.attachment[0]).map(async (item) => {
                  const obj = {};
                  const splitedItem = item.split(".");
                  const lastIndex = splitedItem.length;
                  const extention = splitedItem[lastIndex - 1];

                  if (
                    extention === "jpg" ||
                    extention === "jpeg" ||
                    extention === "png"
                  ) {
                    await getMinioFile(item).then((res) => {
                      obj.file = item;
                      obj.objURL = res.fileUrl;
                      obj.fromAPI = 1;
                      arrImage.push(obj);
                    });
                  }

                  if (
                    extention == "docx" ||
                    extention == "pdf" ||
                    extention == "doc" ||
                    extention == "xls" ||
                    extention == "xlsx"
                  ) {
                    await getMinioFile(item).then((res) => {
                      obj.file = item;
                      obj.name = res.fileName;
                      obj.fromAPI = 1;
                      arrDoc.push(obj);
                    });
                  }

                  if (
                    extention == "mp4" ||
                    extention == "mkv" ||
                    extention == "mov" ||
                    extention == "avi"
                  ) {
                    await getMinioFile(item).then((res) => {
                      obj.file = item;
                      obj.name = res.fileName;
                      obj.fromAPI = 1;
                      arrVid.push(obj);
                    });
                  }
                })
              );
              setImageInput(arrImage);
              setDocInput(arrDoc);
              setVidInput(arrVid);
            }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <Layout className={root}>
        <PopupSucces
          isOpen={isSuccess}
          message={pathCategory === "edit-file" ? "Knowledge Base Berhasil Di ubah" : "Knowledge Base Berhasil Ditambah"}
          onClose={onClosePopUp}
        />
        <ModalLoader isOpen={isLoading} />
        <Content>
          <MuiIconLabelButton
            label={"Back"}
            variant="text"
            buttonIcon={<BackIcon />}
            iconPosition="startIcon"
            style={{ background: "inherit", color: PrimaryHard }}
            onClick={() =>
              history.push(
                `/file-management/configuration/detail-knowledge-base/${folderId}`
              )
            }
          />
        </Content>
        <Content style={{ marginTop: 20 }}>
          <Barlow36 style={{ fontWeight: 500 }}>Knowledge Base</Barlow36>
        </Content>
        <Content style={{ marginTop: 26 }}>
          <GeneralCard variant="outlined" style={{ padding: 20 }}>
            <div className={flexTitle}>
              <Barlow15 style={{ fontWeight: 500 }}>Judul</Barlow15>
              <input
                type="text"
                onChange={(e) => handleInputTitle(e.target.value)}
                className={inputTitleStyle}
                placeholder="Masukan Judul Knowledge Base"
                value={inputTitle}
              />
              {!inputTitle && (
                <Barlow13 style={{ fontWeight: 400, color: PrimaryHard }}>
                  *Judul tidak boleh kosong!
                </Barlow13>
              )}
            </div>
          </GeneralCard>
        </Content>
        <Content style={{ marginTop: 20 }}>
          <TextEditorAddEvent
            editorState={textInput}
            onChangeEditor={onChangeEditor}
            labelButton={"Simpan"}
            onClickButton={onSave}
            imageVal={imageInput}
            docVal={docInput}
            onChangeImage={onChangeImage}
            onDeleteImage={onDeleteImage}
            onChangeDocument={onChangeDocument}
            onDeleteDocument={onDeleteDocument}
            onChangeVideo={onChangeVideo}
            onDeleteVideo={onDeleteVideo}
          />
        </Content>
      </Layout>
    </>
  );
};

export default AddFileKnowledgeBase;
