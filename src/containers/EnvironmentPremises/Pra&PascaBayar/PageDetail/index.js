/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  Button,
  Link,
  Paper,
  IconButton,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { Layout, Col, Row, Input, AutoComplete, DatePicker, Form } from "antd";
import axios from "axios";
import moment from "moment";
import { ReactComponent as DeleteIcon } from "../../../../assets/icons/general/delXIcon.svg";

import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as IconRp } from "../../../../assets/icons/general/InputIconRp.svg";
import { ReactComponent as IconKwh } from "../../../../assets/icons/general/InputIconkwh.svg";
import { ReactComponent as AddIcon } from "../../../../assets/icons/general/UploadCard.svg";
import constants from "../../../../helpers/constants";
import LoadingView from "../../../../components/Loading/LoadingView";
import { doUploadPhoto } from "../../../Implementation/ApiServiceImplementation";
import { ReactComponent as PlusIcon } from "../../../../assets/images/add photo.svg";
import PopupSucces from "../../../../components/PopupSucces";
import MinioImageComponent from "../../../../components/MinioImageComponent";

const useStyles = makeStyles({
  root: { padding: "30px 20px 20px 30px" },
  backLabel: {
    fontSize: 17,
    color: constants.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
  Barlow: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
  },
  containerContn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
  },
  paperContnet: {
    width: 640,
    // height: 671,
    borderRadius: 10,
    padding: "30px 20px 30px 20px",
  },
  headerContent: {
    color: constants.color.grayMedium,
    fontFamily: "Barlow",
    fontStyle: "normal",
    borderBottom: `2px solid ${constants.color.grayMedium} `,
    lineHeight: 2,
    fontSize: 13,
  },
  text1: {
    lineHeight: 2,
  },
  inputContainer: {
    width: "100%",
  },
  labelInput: {
    fontWeight: 400,
    fontSize: 15,
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
  figureStyle: {
    position: "relative",
  },
  imageStyle: {
    width: "100%",
    height: "100px",
    display: "block",
    border: 0,
    borderRadius: 12,
  },
  inputImage: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  titleImage: {
    fontWeight: 400,
    fontSize: 12,
    fontFamily: "Barlow",
    color: "#9e9e9e",
    fontStyle: "normal",
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

// input Image component
const InputImage = (props) => {
  const classess = useStyles();
  const { inputID, image, handleChange, selectedImage, delHandle } = props;
  return (
    <figure className={classess.figureStyle}>
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
              <AddIcon />
            </div>
          </label>
        </>
      )}
      {selectedImage && (
        <IconButton className={classess.resetFile} onClick={delHandle}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </figure>
  );
};

export default function DetailPraPascaBayar() {
  const classes = useStyles();
  const history = useHistory();
  const { Barlow, title } = classes;
  const { Header } = Layout;
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  const [tokenSesudah, setTokenSesudah] = useState("");
  const [hargaToken, setHargaToken] = useState("");
  const [tanggalPembelianToken, setTanggalPembelianToken] = useState(null);
  const [fotoKWHSebelum, setFotoKWHSebelum] = useState("");
  const [fotoKWHSesudah, setFotoKWHSesudah] = useState("");
  const [showModalSuccess, setIsModalSuccess] = useState(false);

  const [inputSubCategory, setInputSubCategory] = useState({
    atmId: "",
    priceToken: "",
    purchaseDate: "",
    tokenRemainingPhoto: "",
    tokenAfterPhoto: "",
    tokenAdded: "",

    photoList: [],
  });

  const [imageUpload1, setImageUpload1] = useState("");
  const [imageUpload2, setImageUpload2] = useState("");

  const handleChangeharga = (e) => {
    setHargaToken(e);
  };
  const handleChangeTokenSesudah = (e) => {
    setTokenSesudah(e);
  };
  const handleTanggalPembelian = (e) => {
    setTanggalPembelianToken(e);
  };

  const handleCancel = () => {
    setImageUpload1("");
    setImageUpload2("");
    history.goBack();
  };
  const handleCloseModal = () => {
    showModalSuccess(false);
  };

  // fetch Data detail
  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  async function fetchDataDetail() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.get(
        `${constants.ENVIRONTMENT_SERVICE}/getDetailToken?atmId=${id}`,

        configNew
      );
      console.log("res data detail", result.data);
      setDataDetail(result.data);
      setHargaToken(result.data.tokenPrice);
      setTokenSesudah(result.data.afterToken);
      setFotoKWHSebelum(
        result.data.remainingTokenPhoto
          ? result.data.remainingTokenPhoto
          : ""
      );
      setFotoKWHSesudah(
        result.data.afterTokenPhoto
          ? result.data.afterTokenPhoto
          : ""
      );
      setTanggalPembelianToken(result.data.purchaseDate ? moment(result.data.purchaseDate) : null);
    } catch (err) {
      alert(`Error Fetching Data derail ...! \n${err}`);
    }
    setIsLoading(false);
  }

  // Post
  const handleChangeState = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setInputSubCategory((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
  };

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

  const onSubmit = async () => {
    setIsLoading(true);
    // handle photo
    const photoOne = { path: null, url: null };
    const photoTwo = { path: null, url: null };

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
                      case "imageUpload1":
                        photoOne.path = res.data.path;
                        break;
                      case "imageUpload2":
                        photoTwo.path = res.data.path;
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
      atmId: id,
      priceToken: hargaToken,
      purchaseDate: moment(tanggalPembelianToken).format("YYYY-MM-DD"),
      tokenAdded: tokenSesudah,
      tokenRemainingPhoto: photoOne.path,
      tokenAfterPhoto: photoTwo.path,
    };
    const result = await axios.post(
      `${process.env.REACT_APP_API_IENVIRONTMENT_SERVICE}/updateToken`,
      dataHit,
      config
    );
    try {
      if (result.status === 200) {
        setIsLoading(false);
        setIsModalSuccess(true);
        setTimeout(() => {
          setIsModalSuccess(false);
          history.push("/environment-premises/pra-pasca-bayar");
          location.reload();
        }, 2000);
      } else {
        console.log("gagal");
      }
    } catch (error) {
      alert(`Error ${error}`);
    }
  };

  const buttonConsole = () => {
    console.log(id, "atmId");
  };

  useEffect(() => {
    fetchDataDetail();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container style={{ marginBottom: 20 }}>
        <div className={classes.backAction}>
          <Button onClick={() => history.goBack()}>
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </div>
      </Grid>
      <Header style={{ padding: 0, background: "inherit" }}>
        <Typography className={`${Barlow} ${title}`}>
          Pra & Pasca Bayar Listrik
        </Typography>
      </Header>
      <div className={classes.containerContn}>
        <Paper className={classes.paperContnet}>
          <Typography className={classes.headerContent}>
            Informasi Listrik
          </Typography>
          {isLoading ? (
            <>
              <LoadingView />
            </>
          ) : (
            <Row gutter={24} style={{ marginTop: 20 }}>
              <Col gutter="row" xl={12}>
                <Row gutter={24}>
                  <Col gutter="row" xl={12}>
                    <Typography className={classes.text1}>ATM ID</Typography>
                  </Col>
                  <Col gutter="row" xl={12}>
                    <Typography className={classes.text1}>
                      :
                      <span style={{ fontWeight: "800", marginLeft: 10 }}>
                        {dataDetail.atmId}
                      </span>
                    </Typography>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col gutter="row" xl={12}>
                    <Typography className={classes.text1}>
                      Jenis Listrik
                    </Typography>
                  </Col>
                  <Col gutter="row" xl={12}>
                    <Typography className={classes.text1}>
                      :
                      <span style={{ fontWeight: "800", marginLeft: 10 }}>
                        {dataDetail.electricType}
                      </span>
                    </Typography>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col gutter="row" xl={12}>
                    <Typography className={classes.text1}>
                      No Meteran
                    </Typography>
                  </Col>
                  <Col gutter="row" xl={12}>
                    <Typography className={classes.text1}>
                      :
                      <span style={{ fontWeight: "800", marginLeft: 10 }}>
                        {dataDetail.meterNumber !== null
                          ? dataDetail.meterNumber
                          : "-"}
                      </span>
                    </Typography>
                  </Col>
                </Row>
              </Col>
              <Col gutter="row" xl={12}>
                <Row gutter={24}>
                  <Col gutter="row" xl={12}>
                    <Typography className={classes.text1}>Atas Nama</Typography>
                  </Col>
                  <Col gutter="row" xl={12}>
                    <Typography className={classes.text1}>
                      :
                      <span style={{ fontWeight: "800", marginLeft: 10 }}>
                        {dataDetail.electricOwner !== null
                          ? dataDetail.electricOwner
                          : "-"}
                      </span>
                    </Typography>
                  </Col>
                  <Col gutter="row" xl={12}>
                    <Typography className={classes.text1}>
                      Token Sebelum
                    </Typography>
                  </Col>
                  <Col gutter="row" xl={12}>
                    <Typography className={classes.text1}>
                      :
                      <span style={{ fontWeight: "800", marginLeft: 10 }}>
                        {dataDetail.tokenBefore !== null
                          ? dataDetail.tokenBefore
                          : "-"}{" "}
                        KWH
                      </span>
                    </Typography>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
          {/* Detail Information */}

          {/* form Input */}
          <Row gutter={25} style={{ marginTop: 28 }}>
            <Col gutter="row" xl={12}>
              <div className={classes.inputContainer}>
                <Typography className={classes.labelInput}>
                  Harga Pembelian Token :
                </Typography>

                <Input.Group compact>
                  <IconRp />
                  <Input
                    //   className={classes.inputStyle}
                    placeholder="Input Nominal"
                    required
                    style={{
                      width: "70%",
                      height: "40px",
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                    value={hargaToken}
                    onChange={(e) => handleChangeharga(e.target.value)}
                  />
                </Input.Group>
              </div>
              {/* <Button onClick={buttonConsole}>azka</Button> */}
            </Col>
            <Col gutter="row" xl={12}>
              <div className={classes.inputContainer}>
                <Typography className={classes.labelInput}>
                  Token Sesudah :
                </Typography>

                <Input.Group compact>
                  <IconKwh />
                  <Input
                    //   className={classes.inputStyle}
                    placeholder="Input Nominal"
                    required
                    style={{
                      width: "70%",
                      height: "40px",
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                    value={tokenSesudah}
                    onChange={(e) => handleChangeTokenSesudah(e.target.value)}
                  />
                </Input.Group>
              </div>
            </Col>
            <Col gutter="row" xl={12} style={{ marginTop: 20 }}>
              <div className={classes.inputContainer}>
                <Typography className={classes.labelInput}>
                  Tanggal Pembelian Token :
                </Typography>

                <Input.Group compact>
                  <DatePicker
                    //   className={classes.inputStyle}
                    value={tanggalPembelianToken}
                    onChange={(e) => handleTanggalPembelian(e)}
                    placeholder="Input Tanggal Pembelian"
                    required
                    style={{
                      width: "82%",
                      height: "40px",
                      borderRadius: 10,
                    }}
                  />
                </Input.Group>
              </div>
            </Col>
          </Row>
          <Typography
            className={classes.headerContent}
            style={{ marginTop: 10 }}
          >
            Informasi Gambar
          </Typography>
          <Row gutter={24} style={{ marginTop: 15 }}>
            <Col gutter="row" xl={5}>
              <Typography className={classes.titleImage}>
                Foto KWH Sebelum
              </Typography>
              <MinioImageComponent
                className={classes.imageStyle}
                filePath={fotoKWHSebelum}
              />
              <Typography
                className={classes.titleImage}
                style={{ color: "#2B2F3C", fontWeight: 600 }}
              >
                {fotoKWHSebelum.substring(fotoKWHSebelum.lastIndexOf('/')+1)}
              </Typography>
              {/* <InputImage
                inputID="image1"
                selectedImage={imageUpload1}
                delHandle={() => setImageUpload1("")}
                handleChange={(e) => setImageUpload1(e.target.files[0])}
              /> */}
            </Col>
            <Col gutter="row" xl={5}>
              <Typography className={classes.titleImage}>
                Foto KWH Sesudah
              </Typography>
              {fotoKWHSesudah === "" ? (
                <InputImage
                  inputID="image2"
                  selectedImage={imageUpload2}
                  delHandle={() => {
                    setImageUpload2("");
                    setFotoKWHSesudah(
                      dataDetail.afterTokenPhoto
                        ? dataDetail.afterTokenPhoto
                        : ""
                    );
                  }}
                  handleChange={(e) => {
                    setImageUpload2(e.target.files[0]);
                  }}
                />
              ) : (
                <>
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      className={classes.imageStyle}
                      filePath={fotoKWHSesudah}
                    />
                    {fotoKWHSesudah && (
                      <IconButton
                        className={classes.resetFile}
                        onClick={() => setFotoKWHSesudah("")}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </div>
                  {fotoKWHSesudah && (
                    <Typography
                      className={classes.titleImage}
                      style={{ color: "#2B2F3C", fontWeight: 600 }}
                    >
                      {fotoKWHSesudah.substring(fotoKWHSesudah.lastIndexOf('/')+1)}
                    </Typography>
                  )}
                </>
              )}
            </Col>
          </Row>
          <Row
            gutter={24}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 10px 0px 10px",
              marginTop: 20,

              height: 100,
              alignItems: "end",
            }}
          >
            <Col gutter="ro2w" xl={4}>
              <ColorButton
                onClick={handleCancel}
                color="secondary"
                variant="outlined"
              >
                <Typography style={{ fontWeight: 600, fontSize: 15 }}>
                  Batal
                </Typography>
              </ColorButton>
            </Col>
            <Col gutter="ro2w" xl={4}>
              <ColorButton
                variant="contained"
                color="secondary"
                onClick={onSubmit}
                style={{ backgroundColor: "#dc241f", color: "#ffffff" }}
              >
                <Typography style={{ fontWeight: 600, fontSize: 15 }}>
                  Simpan
                </Typography>
              </ColorButton>
            </Col>
          </Row>
        </Paper>
      </div>
      <PopupSucces
        isOpen={showModalSuccess}
        onClose={handleCloseModal}
        message="Data Token Berhasil di Update"
      />
    </div>
  );
}
