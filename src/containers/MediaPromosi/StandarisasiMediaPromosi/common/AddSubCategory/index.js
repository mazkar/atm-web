import React, { useState } from "react";
import { Layout } from "antd";
import { Typography, Card, Grid, Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import AddPhoto from "../../../../../assets/images/add photo.svg";
import { ReactComponent as DelIcon } from "../../../../../assets/icons/general/delXIcon.svg";
import { AutoComplete, Input } from "antd";
import PopupSucces from "../../../../../components/PopupSucces";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PopUpConfirmation from "../../../../../components/PopUpConfirmation";
import getMinioFile from "../../../../../helpers/getMinioFile";
import { useEffect } from "react";
import { doUploadPhoto } from "../../../../Implementation/ApiServiceImplementation";
import ModalLoader from "../../../../../components/ModalLoader";
import LoadingView from "../../../../../components/Loading/LoadingView";
import { useParams } from "react-router-dom";
import { IconButton } from "@material-ui/core";

const useStyle = makeStyles({
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
    // position: "absolute",
    // width: "100%",
    // height: 100,
    // cursor: "pointer",
    // margin: "auto",
    // opacity: 0,
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  imageStyle: {
    width: "100%",
    display: "block",
    border: 0,
    borderRadius: 12,
  },
  figureStyle: {
    position: "relative",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
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
  resetFile: {
    position: "absolute",
    top: -10,
    right: -10,
    color: "#DC241F",
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

const InputImage = (props) => {
  const classess = useStyle();
  const { handleChange, inputID, image, onDelete, fromAPI } = props;
  return (
    <figure className={classess.figureStyle}>
      {image ? (
        <>
          {fromAPI ? (
            <img className={classess.imageStyle} src={image} alt="" />
          ) : (
            <img
              className={classess.imageStyle}
              src={URL.createObjectURL(image)}
              alt=""
            />
          )}
        </>
      ) : (
        <>
          <input
            id={inputID}
            className={classess.inputImage}
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          <label htmlFor={inputID} style={{ cursor: "pointer" }}>
            <img className={classess.imageStyle} src={AddPhoto} alt="" />
          </label>
        </>
      )}
      {image && (
        <IconButton className={classess.resetFile} onClick={onDelete}>
          <DelIcon fontSize={"small"} />
        </IconButton>
      )}
    </figure>
  );
};

const AddSubCategory = () => {
  const { id } = useParams();
  const splitId = id.split("-");
  const classess = useStyle();
  const { Header, Content, Footer } = Layout;
  const { TextArea } = Input;
  const history = useHistory();
  const categoryID = splitId[0];
  const subCategoryID = splitId[1];

  const [isLoading, setIsLoading] = useState(false);
  const [loadingView, setLoadingView] = useState(true);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popUpConfirmation, setPopUpConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState(true);
  const [messageConfirmation, setMessageConfirmation] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [imageUpload1, setImageUpload1] = useState("");
  const [imageUpload2, setImageUpload2] = useState("");
  const [imageUpload3, setImageUpload3] = useState("");
  const [uploadImage, setUploadImage] = useState({
    name: "photo1",
    file: "",
    fromAPI: 0,
    objUrl: "",
  });
  const [uploadImage1, setUploadImage1] = useState({
    name: "photo2",
    file: "",
    fromAPI: 0,
    objUrl: "",
  });
  const [uploadImage2, setUploadImage2] = useState({
    name: "photo3",
    file: "",
    fromAPI: 0,
    objUrl: "",
  });
  const [uploadImage3, setUploadImage3] = useState({
    name: "photo4",
    file: "",
    fromAPI: 0,
    objUrl: "",
  });
  const [inputSubCategory, setInputSubCategory] = useState({
    title: "",
    price: "",
    description: "",
  });

  const fetchData = async () => {
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_MONITORING}/getSubCategoryMediaPromosi?id=${categoryID}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (res) => {
        const { data } = res.data;
        console.log(data);
        const findSubCategory = data.find((x) => {
          return x.id == subCategoryID;
        });
        const { subCategoryName, price, description, images } = findSubCategory;
        setInputSubCategory({
          title: subCategoryName,
          price: price,
          description: description,
        });

        if (images[0] !== null) {
          await getMinioFile(images[0])
            .then((response) => {
              setUploadImage({
                ...uploadImage,
                file: images[0],
                fromAPI: 1,
                objUrl: response.fileUrl,
              });
              setImageUpload(response.fileUrl);
            })
            .catch((error) => {
              alert(`error getting images[0]\n${error}`);
            });
        }

        if (images[1] !== null) {
          await getMinioFile(images[1])
            .then((response) => {
              setUploadImage1({
                ...uploadImage1,
                file: images[1],
                fromAPI: 1,
                objUrl: response.fileUrl,
              });
              setImageUpload1(response.fileUrl);
            })
            .catch((error) => {
              alert(`error getting images[1]\n${error}`);
            });
        }

        if (images[2] !== null) {
          await getMinioFile(images[2])
            .then((response) => {
              setUploadImage2({
                ...uploadImage2,
                file: images[2],
                fromAPI: 1,
                objUrl: response.fileUrl,
              });
              setImageUpload2(response.fileUrl);
            })
            .catch((error) => {
              alert(`error getting images[2]\n${error}`);
            });
        }

        if (images[3] !== null) {
          await getMinioFile(images[3])
            .then((response) => {
              setUploadImage3({
                ...uploadImage3,
                file: images[3],
                fromAPI: 1,
                objUrl: response.fileUrl,
              });
              setImageUpload3(response.fileUrl);
            })
            .catch((error) => {
              alert(`error getting images[3]\n${error}`);
            });
        }
        setLoadingView(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingView(false);
        alert(`error while Fetching Data\n${err}`);
      });
  };

  useEffect(() => {
    console.log(subCategoryID);
    if (splitId[0] !== "null" && splitId[1] !== "null") {
      fetchData();
      setSuccessMessage(false);
    } else
      setTimeout(() => {
        setLoadingView(false);
      }, 500);
  }, []);

  const checkNumber = (num) => {
    return new Promise((resolve, reject) => {
      if (isNaN(num)) reject("Harga harus berisi Angka");
      else resolve(num);
    });
  };

  const handleChange = async (key, e) => {
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

  const handleCancel = () => {
    setInputSubCategory({
      title: "",
      price: "",
      description: "",
    });
    history.push("/media-promosi/standarisasi-media-promosi");
  };

  const handleDelete1 = () => {
    // setImageUpload("");
    setUploadImage({ ...uploadImage, file: "" });
  };

  const handleDelete2 = () => {
    // setImageUpload1("");
    setUploadImage1({ ...uploadImage1, file: "" });
  };

  const handleDelete3 = () => {
    // setImageUpload2("");
    setUploadImage2({ ...uploadImage2, file: "" });
  };

  const handleDelete4 = () => {
    // setImageUpload3("");
    setUploadImage3({ ...uploadImage3, file: "" });
  };

  const handleChangeImage = (e) => {
    // setImageUpload(URL.createObjectURL(e.target.files[0]));
    setUploadImage({ ...uploadImage, file: e.target.files[0] });
  };

  const handleChangeImage1 = (e) => {
    // setImageUpload1(URL.createObjectURL(e.target.files[0]));
    setUploadImage1({ ...uploadImage1, file: e.target.files[0] });
  };

  const handleChangeImage2 = (e) => {
    // setImageUpload2(URL.createObjectURL(e.target.files[0]));
    setUploadImage2({ ...uploadImage2, file: e.target.files[0] });
  };

  const handleChangeImage3 = (e) => {
    // setImageUpload3(URL.createObjectURL(e.target.files[0]));
    setUploadImage3({ ...uploadImage3, file: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const { title, price, description } = inputSubCategory;
    const dataArr = [];
    const photo1 = { path: null };
    const photo2 = { path: null };
    const photo3 = { path: null };
    const photo4 = { path: null };

    if (!title)
      return (
        setMessageConfirmation("Judul harus di isi"), setPopUpConfirmation(true)
      );

    if (!price)
      return (
        setMessageConfirmation("Harga harus di isi"), setPopUpConfirmation(true)
      );

    if (!description)
      return (
        setMessageConfirmation("Deskripsi harus di isi"),
        setPopUpConfirmation(true)
      );

    if (uploadImage.file) dataArr.push(uploadImage);
    if (uploadImage1.file) dataArr.push(uploadImage1);
    if (uploadImage2.file) dataArr.push(uploadImage2);
    if (uploadImage3.file) dataArr.push(uploadImage3);

    const doUploadPhotos = async (arr) => {
      setIsLoading(true);
      await Promise.all(
        arr.map(async (item) => {
          const { name, file, fromAPI } = item;
          if (fromAPI === 1) {
            switch (name) {
              case "photo1":
                photo1.path = uploadImage.file;
                break;
              case "photo2":
                photo2.path = uploadImage1.file;
                break;
              case "photo3":
                photo3.path = uploadImage2.file;
                break;
              case "photo4":
                photo4.path = uploadImage3.file;
                break;
            }
          } else if (fromAPI === 0) {
            await doUploadPhoto(file)
              .then((res) => {
                if (res.data.responseCode === "00") {
                  switch (name) {
                    case "photo1":
                      photo1.path = res.data.path;
                      break;
                    case "photo2":
                      photo2.path = res.data.path;
                      break;
                    case "photo3":
                      photo3.path = res.data.path;
                      break;
                    case "photo4":
                      photo4.path = res.data.path;
                      break;
                  }
                } else {
                  alert(res.data.responseMessage);
                }
              })
              .catch((err) => {
                alert(`Failed to upload file\n${err}`);
                setIsLoading(false);
              });
          }
        })
      );
    };

    console.log(dataArr);
    await doUploadPhotos(dataArr);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_MONITORING}/saveAndUpdateSubCategoryMediaPromosi`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        categoryId: categoryID,
        id: subCategoryID === "null" ? null : subCategoryID,
        subCategoryName: title,
        price: price,
        description: description,
        photo1: photo1.path,
        photo2: photo2.path,
        photo3: photo3.path,
        photo4: photo4.path,
      },
    })
      .then((res) => {
        setIsLoading(false);
        setPopUpOpen(true);
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(`error from saving Sub Category\n${err}`);
      });
  };

  const closePopUp = () => {
    setPopUpOpen(false);

    setInputSubCategory({
      title: "",
      price: "",
      description: "",
    });
    history.push("/media-promosi/standarisasi-media-promosi");
  };

  const closeConfirmation = () => {
    setPopUpConfirmation(false);
  };

  return (
    <>
      <PopupSucces
        isOpen={popUpOpen}
        onClose={closePopUp}
        message={
          successMessage
            ? "Sub Kategori Berhasil Ditambahkan"
            : "Sub Kategori Berhasil Diubah"
        }
      />
      <PopUpConfirmation
        message={messageConfirmation}
        onClose={closeConfirmation}
        onLeave={closeConfirmation}
        onSubmit={closeConfirmation}
        isOpen={popUpConfirmation}
      />
      <Layout className={classess.root}>
        <Header style={{ background: "inherit", padding: 0 }}>
          <Typography className={classess.titleStyle}>
            Tambah Sub Kategori
          </Typography>
        </Header>
        <Content style={{ marginTop: 50 }}>
          <Card variant="outlined">
            <Layout style={{ background: "inherit", padding: 30 }}>
              {loadingView ? (
                <div className={classess.loaderWrapper}>
                  <LoadingView maxheight="100%" isTransparent />
                </div>
              ) : (
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
                            fromAPI={uploadImage.fromAPI}
                            image={
                              uploadImage.fromAPI === 1
                                ? uploadImage.objUrl
                                : uploadImage.file
                            }
                            handleChange={(e) => handleChangeImage(e)}
                            onDelete={handleDelete1}
                          />
                        </Grid>
                        <Grid item className={classess.gridItem}>
                          <InputImage
                            inputID="image2"
                            fromAPI={uploadImage1.fromAPI}
                            image={
                              uploadImage1.fromAPI === 1
                                ? uploadImage1.objUrl
                                : uploadImage1.file
                            }
                            handleChange={(e) => handleChangeImage1(e)}
                            onDelete={handleDelete2}
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
                            fromAPI={uploadImage2.fromAPI}
                            image={
                              uploadImage2.fromAPI === 1
                                ? uploadImage2.objUrl
                                : uploadImage2.file
                            }
                            handleChange={(e) => handleChangeImage2(e)}
                            onDelete={handleDelete3}
                          />
                        </Grid>
                        <Grid item className={classess.gridItem}>
                          <InputImage
                            inputID="image4"
                            fromAPI={uploadImage3.fromAPI}
                            image={
                              uploadImage3.fromAPI === 1
                                ? uploadImage3.objUrl
                                : uploadImage3.file
                            }
                            handleChange={(e) => handleChangeImage3(e)}
                            onDelete={handleDelete4}
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
              )}
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
                  onClick={handleSubmit}
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
      </Layout>
      <ModalLoader isOpen={isLoading} />
    </>
  );
};

export default AddSubCategory;
