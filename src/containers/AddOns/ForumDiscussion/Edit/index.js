import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Footer } from "antd/lib/layout/layout";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { PrimaryHard } from "../../../../assets/theme/colors";
import { ReactComponent as LeftArrow } from "../../../../assets/icons/linear-red/arrow-left.svg";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import SelectMui from "../common/SelectMui";
import LabelTextField from "../../../../components/Form/LabelTextField";
import { ReactComponent as PaperClip } from "../../../../assets/icons/linear-red/paperclip.svg";
import TextArea from "antd/lib/input/TextArea";
import PopupSucces from "../../../../components/PopupSucces";
import {
  doAddUpdateForumDiscuss,
  doGetDetailForumDiscuss,
} from "../../ApiServicesAddOns";
import PopUpConfirmation from "../../../../components/PopUpConfirmation";
import { doUploadPhoto } from "../../../Implementation/ApiServiceImplementation";
import {
  doGetCategoryForumDiscuss,
  doGetSubCategoryForumDiscuss,
} from "../../ApiServicesAddOns";
import ModalLoader from "../../../../components/ModalLoader";

const UseStyle = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  boxForm: {
    width: "100%",
    minHeight: "350px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  footerStyle: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    background: "inherit",
  },
  colColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  placeholder: {
    fontSize: 13,
    fontWeight: 400,
    color: "#8D98B4",
    padding: 0,
    margin: 0,
    fontStyle: "italic",
    opacity: 0.5,
  },
  inputStyle: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #BCC8E7",
    fontSize: 13,
    borderRadius: 8,
    "&:hover": {
      borderColor: "#8D98B4",
    },
    "&:focus": {
      boxShadow: "none",
    },
    "&::-webkit-input-placeholder": {
      fontStyle: "italic",
      opacity: 0.5,
      fontSize: 13,
      color: "#8D98B4",
      margin: 0,
      padding: 0,
    },
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

function EditForumDiscuss() {
  const history = useHistory();
  const classes = UseStyle();
  const { id } = useParams();

  //state
  const [openPopUP, setOpenPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageConfirmation, setMessageConfirmation] = useState("");
  const [popUpConfirmation, setPopUpConfirmation] = useState(false);
  const [kategori, setKategori] = useState([]);
  const [subKategori, setSubKategori] = useState([]);

  const [payload, setPayload] = useState({
    title: "",
    category: "",
    coverImage: "",
    subCategory: "",
    description: "",
  });

  // LOADING HANDLER
  const loadingHanlder = (load) => {
    setIsLoading(load);
  };

  // HANDLE CHANGE CATEGORY
  const handleChangeCategory = (id, name) => {
    console.log(name);
    setPayload({
      ...payload,
      category: id,
    });

    doGetSubCategoryForumDiscuss(id).then((response) => {
      console.log(response.subCategory);

      const { subCategory } = response;
      const dataRow = [
        {
          value: 0,
          name: <p className={classes.placeholder}>Tambah Sub Kategori</p>,
        },
      ];
      subCategory.map((item) => {
        const newRow = {
          value: item.subCategoryName,
          name: item.subCategoryName,
        };
        dataRow.push(newRow);
      });
      setSubKategori(dataRow);
    });
  };

  const handleChangeSubCategory = (id) => {
    console.log(id);
    setPayload({
      ...payload,
      subCategory: id,
    });
  };

  // HANDLE CHANGE REQUEST
  const handleChangeRequest = (event, key) => {
    setPayload((prev) => {
      return {
        ...prev,
        [key]: event,
      };
    });
  };

  const closeConfirmation = () => {
    setPopUpConfirmation(false);
  };

  // HANDLE CHANGE IMAGE
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setPayload({
      ...payload,
      coverImage: file.name,
    });
    doUploadPhoto(file)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setPayload({
            ...payload,
            coverImage: response.data.path,
          });
        }
      })
      .catch((err) => {
        alert(`Gagal Upload Image ${err}`);
      });
  };

  // HANDLE ADD SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!payload.title)
      return (
        setMessageConfirmation("Judul harus di isi"), setPopUpConfirmation(true)
      );

    if (!payload.category)
      return (
        setMessageConfirmation("Kategori harus di isi"),
        setPopUpConfirmation(true)
      );

    if (!payload.coverImage)
      return (
        setMessageConfirmation("Image Cover harus di isi"),
        setPopUpConfirmation(true)
      );

    if (!payload.subCategory)
      return (
        setMessageConfirmation("Sub Kategori harus di isi"),
        setPopUpConfirmation(true)
      );

    if (!payload.description)
      return (
        setMessageConfirmation("Deskripsi harus di isi"),
        setPopUpConfirmation(true)
      );

    doAddUpdateForumDiscuss(loadingHanlder, {
      ...payload,
      id: id,
    })
      .then((response) => {
        if (response) {
          if (response.responseCode === "200") {
            setOpenPopUp(true);
            setTimeout(() => {
              setOpenPopUp(false);
              history.push("/add-ons/forum-discussion");
            }, 2500);
          }
        }
      })
      .catch((err) => {
        alert(`Failed to upload file ${err}`);
      });
  };

  // GET CATEGORY
  useEffect(() => {
    doGetCategoryForumDiscuss().then((response) => {
      if (response.responseCode === "200") {
        const { data } = response;
        const dataRow = [
          {
            value: 0,
            name: <p className={classes.placeholder}>Tambah Kategori</p>,
          },
        ];
        data.map((item) => {
          const newRow = {
            value: item.categoryId,
            name: item.categoryName,
          };
          dataRow.push(newRow);
        });
        setKategori(dataRow);
      }
    });
  }, []);

  useEffect(() => {
    doGetDetailForumDiscuss(loadingHanlder, id).then((response) => {
      console.log(response);
      if (response) {
        if (response.responseCode === "200") {
          setPayload((prevData) => {
            return {
              ...prevData,
              title: response.title,
              category: response.category,
              coverImage: response.coverImage,
              subCategory: response.subCategory,
              description: response.description,
            };
          });

          doGetSubCategoryForumDiscuss(response.category).then((response) => {
            console.log(response.subCategory);
            const { subCategory } = response;
            const dataRow = [
              {
                value: 0,
                name: (
                  <p className={classes.placeholder}>Tambah Sub Kategori</p>
                ),
              },
            ];
            subCategory.map((item) => {
              const newRow = {
                value: item.subCategoryName,
                name: item.subCategoryName,
              };
              dataRow.push(newRow);
            });
            setSubKategori(dataRow);
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log(payload);
  }, [payload]);

  return (
    <div className={classes.root}>
      <Grid container direction="column" className={classes.titleContainer}>
        <Grid item>
          <MuiIconLabelButton
            label="Back"
            iconPosition="startIcon"
            buttonIcon={<LeftArrow />}
            onClick={() => history.push("/add-ons/forum-discussion")}
            style={{ background: "inherit", color: PrimaryHard, padding: 0 }}
          />
          <Grid
            item
            className={classes.titleContainer}
            style={{ marginTop: 20 }}
          >
            <Typography className={classes.title}>
              Edit Forum Discussion
            </Typography>
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: 20 }}>
          <Paper className={classes.boxForm}>
            <Grid
              container
              justifyContent="space-between"
              direction="row"
              spacing={3}
            >
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item xs={12}>
                    <LabelTextField
                      type="text"
                      label="Judul"
                      placeholder="Masukan Judul"
                      value={payload.title}
                      onChange={(newVal) =>
                        handleChangeRequest(newVal.target.value, "title")
                      }
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 20 }}>
                    <input
                      id="gambarUpload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleChangeImage}
                    />
                    <label htmlFor="gambarUpload" style={{ cursor: "pointer" }}>
                      <LabelTextField
                        label="Gambar Cover"
                        placeholder="Upload Gambar Cover"
                        endIcon={<PaperClip />}
                        value={payload.coverImage}
                      />
                    </label>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        marginBottom: "5px",
                      }}
                    >
                      Kategori :
                    </Typography>
                    <SelectMui
                      selectOptionData={kategori}
                      selectedValue={0}
                      onSelectValueChange={handleChangeCategory}
                      value={payload.category}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 20 }}>
                    <Typography
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        marginBottom: "5px",
                      }}
                    >
                      Sub Kategori :
                    </Typography>
                    <SelectMui
                      selectOptionData={subKategori}
                      selectedValue={0}
                      value={payload.subCategory}
                      placeholder={payload.subCategory}
                      //   onSelectValueChange={(newVal) =>
                      //     handleChangeRequest(newVal, "subCategory")   }
                      onSelectValueChange={handleChangeSubCategory}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        marginBottom: "5px",
                      }}
                    >
                      Deskripsi :
                    </Typography>
                    <TextArea
                      className={classes.inputStyle}
                      placeholder="Masukan Deskripsi"
                      value={payload.description}
                      onChange={(newVal) =>
                        handleChangeRequest(newVal.target.value, "description")
                      }
                      required
                      style={{
                        minHeight: 144,
                        display: "block",
                        marginTop: "auto",
                        marginBottom: "auto",
                      }}
                    >
                      {payload.description}
                    </TextArea>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <PopupSucces
              isOpen={openPopUP}
              message="Forum Berhasil Ditambahkan"
            />

            <PopUpConfirmation
              message={messageConfirmation}
              onClose={closeConfirmation}
              onLeave={closeConfirmation}
              onSubmit={closeConfirmation}
              isOpen={popUpConfirmation}
            />
            <ModalLoader isOpen={isLoading} />
            <Footer className={classes.footerStyle}>
              <ColorButton
                onClick={() => history.push("/add-ons/forum-discussion")}
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
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditForumDiscuss;
