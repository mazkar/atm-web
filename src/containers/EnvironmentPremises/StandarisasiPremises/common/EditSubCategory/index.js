import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import axios from "axios";
import { AutoComplete, Input } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { Typography, Card, Grid, Button, IconButton } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { ReactComponent as PlusIcon } from "../../../../../assets/images/add photo.svg";
import PopupSucces from "../../../../../components/PopupSucces";
import PopUpConfirmation from "../../../../../components/PopUpConfirmation";
import getMinioFile from "../../../../../helpers/getMinioFile";
import ModalLoader from "../../../../../components/ModalLoader";
import LoadingView from "../../../../../components/Loading/LoadingView";
import { doUploadPhoto } from "../../../../Implementation/ApiServiceImplementation";
import { ReactComponent as DeleteIcon } from "../../../../../assets/icons/general/delXIcon.svg";
import { doGetDetailEnvironmentPremises } from "../../../ApiServicesEnvironmentPremises";
import MinioImageComponent from "../../../../../components/MinioImageComponent";

const UseStyles = makeStyles({
  root: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    background: "inherit",
    padding: "30px 20px 20px 30px",
  },
  titleStyle: {
    fontWeight: 500,
    fontSize: 36,
    color: "#2b2f3c",
  },
  cardStyle: {
    width: "100%",
    minHeight: 560,
    borderRadius: 10,
    border: 0,
    padding: 0,

    display: "flex",
    flexDirection: "row",
    gap: 40,
  },
  ContainerStyle: {
    width: "100%",
    background: "inherit",
  },
  LeftContent: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  RightContent: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  gridContainer: {
    width: "100%",
  },
  gridItem: {
    width: "50%",
  },
  footerStyle: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    background: "inherit",
  },
  inputContainer: {
    width: "100%",
  },
  labelInput: {
    fontWeight: 400,
    fontSize: 15,
    fontFamily: "Barlow",
    fontStyle: "normal",
    paddingBottom: 1,
  },
  inputStyle: {
    display: "flex",
    alignItems: "center",
    height: 47,
    border: "1px solid #bcc8e7",
    fontSize: 16,
    color: "#2b2f3c",
    borderRadius: 8,
    fontStyle: "italic",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputImage: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  imageStyle: {
    width: "100%",
    height: "150px",
    display: "block",
    border: 0,
    borderRadius: 12,
  },
  figureStyle: {
    position: "relative",
  },
  resetFile: {
    position: "absolute",
    top: -10,
    right: -10,
    color: "#DC241F",
  },
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
  uploadFile: {
    cursor: "pointer",
  },
});

const ColorButton = withStyles(() => ({
  root: {
    color: "#DC241F",
    backgroundColor: "#FFFFFF",
    borderColor: "#DC241F",
    textTransform: "capitalize",
    padding: "10px 20px",
    boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
  },
}))(Button);
// input Image component
const InputImage = (props) => {
  const classess = UseStyles();
  const {
    inputID,
    image,
    handleChange,
    selectedImage,
    delHandle,
    handleEditFoto,
  } = props;
  return (
    <figure className={classess.figureStyle}>
      {image ? (
        <div>
          <MinioImageComponent
            filePath={image}
            className={classess.imageStyle}
          />
          <IconButton className={classess.resetFile} onClick={handleEditFoto}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ) : (
        <div>
          {selectedImage ? (
            <div>
              <img
                src={URL.createObjectURL(selectedImage)}
                className={classess.imageStyle}
                alt=""
              />
            </div>
          ) : (
            <>
              <input
                id={inputID}
                className={classess.inputImage}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  // console.log("+++ size", e.target.files[0].size);
                  if (e.target.files[0].size > 1000000) {
                    alert("Foto yang anda upload melebihi ukuran 1MB!");
                  } else {
                    handleChange(e);
                  }
                }}
              />
              <label htmlFor={inputID} className={classess.uploadFile}>
                <div>
                  <PlusIcon className={classess.imageStyle} />
                </div>
              </label>
            </>
          )}
          {selectedImage && (
            <IconButton className={classess.resetFile} onClick={delHandle}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </div>
      )}
    </figure>
  );
};
// end

const EditSubCategory = (props) => {
  const classess = UseStyles();
  const { Header, Content, Footer } = Layout;
  const { TextArea } = Input;
  const history = useHistory();
  const categoryID = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Sub Kategory Berhasil Melakukan Perubahan"
  );
  const [messageConfirmationOpen, setMessageConfirmationOpen] = useState(false);

  const [imageUpload, setImageUpload] = useState("");
  const [imageUpload1, setImageUpload1] = useState("");
  const [imageUpload2, setImageUpload2] = useState("");
  const [imageUpload3, setImageUpload3] = useState("");

  const [inputSubCategory, setInputSubCategory] = useState({
    title: "",
    price: "",
    description: "",
    imageUploadCategory1: "",
    imageUploadCategory2: "",
    imageUploadCategory3: "",
    imageUploadCategory4: "",
    subCategoryId: null,
    photoList: [],
  });
  // Funtion handling standarisasi detail

  // loader
  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };
  const checkNumber = (num) => {
    return new Promise((resolve, reject) => {
      if (isNaN(num)) reject("Harga harus berisi angka");
      else resolve(num);
    });
  };

  const handleChange = async (key, e) => {
    console.log(key);
    console.log(e);
    if (key == "price")
      await checkNumber(e)
        .then((res) => {
          setInputSubCategory({ ...inputSubCategory, price: res });
        })
        .catch((err) => {
          setInputSubCategory({ ...inputSubCategory, price: "" });
        });
    else setInputSubCategory({ ...inputSubCategory, [key]: e });
  };

  //end function handling standarisasi detail

  //hanling cancel
  const handleCancel = () => {
    setInputSubCategory({
      title: "",
      price: "",
      description: "",
    });
    history.push("/environment-premises/premises-standarisasi");
  };
  const handleChangeState = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setInputSubCategory((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
  };
  // photo
  useEffect(() => {
    if (imageUpload !== "") {
      const oldDataList = inputSubCategory.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "imageUpload",
        file: imageUpload,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = inputSubCategory.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "imageUpload";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [imageUpload]);
  useEffect(() => {
    if (imageUpload1 !== "") {
      const oldDataList = inputSubCategory.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "imageUpload1",
        file: imageUpload1,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = inputSubCategory.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "imageUpload1";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [imageUpload1]);
  useEffect(() => {
    if (imageUpload2 !== "") {
      const oldDataList = inputSubCategory.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "imageUpload2",
        file: imageUpload2,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = inputSubCategory.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "imageUpload2";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [imageUpload2]);
  useEffect(() => {
    if (imageUpload3 !== "") {
      const oldDataList = inputSubCategory.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "imageUpload3",
        file: imageUpload3,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = inputSubCategory.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "imageUpload3";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [imageUpload3]);
  // get data
  useEffect(() => {
    doGetDetailEnvironmentPremises(loadingHandler, categoryID.id)
      .then((response) => {
        setInputSubCategory({
          title: response?.data?.subCategoryName,
          price: response?.data?.price,
          subCategoryId: response?.data?.subCategoryId,
          categoryId: response?.data?.categoryId,
          description: response?.data?.description,
          imageUploadCategory1: response?.data?.images[0],
          imageUploadCategory2: response?.data?.images[1],
          imageUploadCategory3: response?.data?.images[2],
          imageUploadCategory4: response?.data?.images[3],
          photoList: [],
        });
        // console.log("datasett",inputSubCategory);
      })
      .catch((err) => {
        alert(`Fetching Data Error ${err}`);
      });
  }, []);
  const handleClose = () => {
    setPopUpOpen(false);
    history.push("/environment-premises/premises-standarisasi");
  };
  const onSubmit = async () => {
    setIsLoading(true);
    // handle photo
    const photoOne = { path: null, url: null };
    const photoTwo = { path: null, url: null };
    const photoThree = { path: null, url: null };
    const photoFour = { path: null, url: null };

    // upload photo

    const doUploadPhotos = async (arr) => {
      if (arr.length > 0) {
        console.log("hello", arr);
        await Promise.all(
          arr.map(async (item) => {
            const { docKey } = item;

            await doUploadPhoto(item.file)
              .then((res) => {
                if (res.status === 200) {
                  if (res.data.responseCode === "00") {
                    switch (docKey) {
                      case "imageUpload":
                        photoOne.path = res.data.path;
                        break;
                      case "imageUpload1":
                        photoTwo.path = res.data.path;
                        break;
                      case "imageUpload2":
                        photoThree.path = res.data.path;
                        break;
                      case "imageUpload3":
                        photoFour.path = res.data.path;
                        break;
                    }
                  } else {
                    alert(res.data.responseMessage);
                  }
                }
              })
              .catch((err) => {
                alert(`Failed to upload file ${err}`);
              });
          })
        );
      }
    };
    await doUploadPhotos(inputSubCategory.photoList);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const dataHit = {
      id: inputSubCategory.subCategoryId,
      categoryId: inputSubCategory.categoryId,
      subCategoryName: inputSubCategory.title,
      price: inputSubCategory.price,
      description: inputSubCategory.description,
      photo1: inputSubCategory.imageUploadCategory1
        ? inputSubCategory.imageUploadCategory1
        : photoOne.path,
      photo2: photoTwo.path,
      photo3: photoThree.path,
      photo4: photoFour.path,
    };
    const result = await axios.post(
      `${process.env.REACT_APP_API_IENVIRONTMENT_SERVICE}/saveAndUpdateSubCategoryEnvironmentPremises`,
      dataHit,
      config
    );
    try {
      if (result.status === 200) {
        setIsLoading(false);
        setPopUpOpen(true);
        setTimeout(() => {
          setPopUpOpen(false);
          history.push("/environment-premises/premises-standarisasi");
          setMessageConfirmationOpen(false);
        }, 2000);
      } else {
        console.log("gagal");
      }
    } catch (error) {
      alert(`Error ${error}`);
    }
  };

  return (
    <Layout className={classess.root}>
      <Header style={{ background: "inherit", padding: 0 }}>
        <Typography className={classess.titleStyle}>
          Edit Sub Kategori
        </Typography>
      </Header>
      <Content style={{ marginTop: 20 }}>
        <Card variant="outlined">
          <Layout style={{ background: "inherit", padding: 30 }}>
            <Content className={classess.cardStyle}>
              {/* Left Container */}
              <Layout className={classess.ContainerStyle}>
                <Header style={{ padding: 0, background: "inherit" }}>
                  <Typography style={{ fontSize: 18, fontWeight: 600 }}>
                    Upload Gambar
                  </Typography>
                </Header>
                <Content className={classess.LeftContent}>
                  <Grid
                    container
                    flexDirection="row"
                    spacing={3}
                    className={classess.gridContainer}
                  >
                    <Grid item className={classess.gridItem}>
                      <InputImage
                        inputID="image1"
                        image={inputSubCategory.imageUploadCategory1}
                        selectedImage={imageUpload}
                        handleEditFoto={() => {
                          handleChangeState(null, "imageUploadCategory1");
                        }}
                        delHandle={() => setImageUpload("")}
                        handleChange={(e) => setImageUpload(e.target.files[0])}
                      />
                    </Grid>
                    <Grid item className={classess.gridItem}>
                      <InputImage
                        inputID="image2"
                        image={inputSubCategory.imageUploadCategory2}
                        handleEditFoto={() => {
                          handleChangeState(null, "imageUploadCategory2");
                        }}
                        selectedImage={imageUpload1}
                        delHandle={() => setImageUpload1("")}
                        handleChange={(e) => setImageUpload1(e.target.files[0])}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    flexDirection="row"
                    spacing={3}
                    className={classess.gridContainer}
                  >
                    <Grid item className={classess.gridItem}>
                      <InputImage
                        inputID="image3"
                        image={inputSubCategory.imageUploadCategory3}
                        handleEditFoto={() => {
                          handleChangeState(null, "imageUploadCategory3");
                        }}
                        selectedImage={imageUpload2}
                        delHandle={() => setImageUpload2("")}
                        handleChange={(e) => setImageUpload2(e.target.files[0])}
                      />
                    </Grid>
                    <Grid item className={classess.gridItem}>
                      <InputImage
                        inputID="image4"
                        image={inputSubCategory.imageUploadCategory4}
                        handleEditFoto={() => {
                          handleChangeState(null, "imageUploadCategory4");
                        }}
                        selectedImage={imageUpload3}
                        delHandle={() => setImageUpload3("")}
                        handleChange={(e) => setImageUpload3(e.target.files[0])}
                      />
                    </Grid>
                  </Grid>
                </Content>
              </Layout>

              {/* Right Container */}
              <Layout className={classess.ContainerStyle}>
                <Header style={{ padding: 0, background: "inherit" }}>
                  <Typography style={{ fontSize: 18, fontWeight: 600 }}>
                    Standarisasi Detail
                  </Typography>
                </Header>
                <Content className={classess.RightContent}>
                  <div className={classess.flexRow}>
                    <div className={classess.inputContainer}>
                      <Typography className={classess.labelInput}>
                        Judul :
                      </Typography>
                      <AutoComplete
                        onChange={(e) => handleChange("title", e)}
                        value={inputSubCategory.title}
                        style={{ width: "100%" }}
                      >
                        <Input
                          className={classess.inputStyle}
                          placeholder="Masukan Judul"
                          required
                        />
                      </AutoComplete>
                    </div>
                    <div className={classess.inputContainer}>
                      <Typography className={classess.labelInput}>
                        Harga :
                      </Typography>
                      <AutoComplete
                        onChange={(e) => handleChange("price", e)}
                        value={inputSubCategory.price}
                        style={{ width: "100%" }}
                      >
                        <Input
                          className={classess.inputStyle}
                          placeholder="Masukan Harga"
                          required
                        />
                      </AutoComplete>
                    </div>
                  </div>
                  <div>
                    <div className={classess.inputContainer}>
                      <Typography className={classess.labelInput}>
                        Deskripsi :
                      </Typography>
                      <AutoComplete
                        onChange={(e) => handleChange("description", e)}
                        value={inputSubCategory.description}
                        style={{ width: "100%" }}
                      >
                        <TextArea
                          className={classess.inputStyle}
                          style={{
                            height: 216,
                            display: "block",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                          placeholder="Masukan Deskripsi"
                          required
                        />
                      </AutoComplete>
                    </div>
                  </div>
                </Content>
              </Layout>
            </Content>

            <Footer className={classess.footerStyle}>
              <ColorButton
                onClick={handleCancel}
                color="secondary"
                variant="outlined"
              >
                <Typography style={{ fontWeight: 600, fontSize: 15 }}>
                  Batal
                </Typography>
              </ColorButton>
              <ColorButton
                variant="contained"
                color="secondary"
                onClick={() => setMessageConfirmationOpen(true)}
                style={{ backgroundColor: "#dc241f", color: "#ffffff" }}
              >
                <Typography style={{ fontWeight: 600, fontSize: 15 }}>
                  Simpan
                </Typography>
              </ColorButton>
            </Footer>
          </Layout>
        </Card>
      </Content>
      <ModalLoader isOpen={isLoading} />
      <PopUpConfirmation
        isOpen={messageConfirmationOpen}
        message="Anda yakin akan melakukan perubahan ?"
        // onLeave={handleLeave}
        onSubmit={() => onSubmit()}
      />
      <PopupSucces
        isOpen={popUpOpen}
        onClose={handleClose}
        message={successMessage}
      />
    </Layout>
  );
};

EditSubCategory.propTypes = {};

export default EditSubCategory;
