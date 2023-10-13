import React from 'react';
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
import { Select } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as CloseButton } from "../../../../../assets/icons/siab/x-new.svg";
import { ReactComponent as AngleDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import PropTypes from 'prop-types';
import constants from '../../../../../helpers/constants';
import InputBordered from '../InputComponent';
import { ReactComponent as DefUploadImageSvg } from "../../../../../assets/icons/general/def_upload.svg";
import { withStyles } from "@material-ui/styles";


const { Option } = Select

const DeleteIconButton = withStyles(() => ({
    root: {
      backgroundColor: "#DC241F75",
      color: "#fff",
      "&:hover": {
        color: "#DC241F",
        backgroundColor: "#fff8f8cc",
      },
    },
}))(IconButton)

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#F4F7FB",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#BCC8E7",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#9AC2FF",
      },
    backgroundColor: constants.color.white,
    width: 800,
    minHeight: "550px",
    height: "570px",
    borderRadius: 10,
    padding: 30,
  },
  imageUploadContainer: {
    position: "relative",
  },
  imgDefault: {
    display: "flex",
    flexDirection: 'column'
  },
  input: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  resetImage: {
    position: "absolute",
    width: '15px',
    height: '15px',
    top: -10,
    right: -10,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
});

const dataJenisPekerjaan = [
    {id: 0, value: 'CCTV'},
    {id: 1, value: 'CCTV'},
    {id: 2, value: 'CCTV'},
]

const dataVendor = [
    {id: 0, value: 'PT. Citra'},
    {id: 1, value: 'PT. Wahana'},
    {id: 2, value: 'PT. Neopack'},
]

const successPopUp = ({ isOpen, onClose, data, onSubmitNewOrder }) => {
  const {
    modal,
    paper,
    imageUploadContainer,
    imgDefault,
    input,
    resetImage,
    primaryButton,
    secondaryButton
  } = useStyles()

  let fileInput1 = React.createRef(),
    fileInput2 = React.createRef(),
    fileInput3 = React.createRef(),
    fileInput4 = React.createRef()

  const [photoDepan, setPhotoDepan] = React.useState(null)
  const [photoKanan, setPhotoKanan] = React.useState(null)
  const [photoKiri, setPhotoKiri] = React.useState(null)
  const [photoBelakang, setPhotoBelakang] = React.useState(null)

  function handlePhoto(event, type) {
    event.preventDefault()
    switch(type){
        case 'depan':
            setPhotoDepan(event.target.files[0])
            break
        case 'kanan':
            setPhotoKanan(event.target.files[0])
            break
        case 'kiri':
            setPhotoKiri(event.target.files[0])
            break
        case 'belakang':
            setPhotoBelakang(event.target.files[0])
            break
    }
  }

  const renderImage = (ImgLocal) => {
    if (ImgLocal !== null) {
      return <img src={URL.createObjectURL(ImgLocal)} style={{ width: '135px', height: '135px' }} />;
    } else {
      return <DefUploadImageSvg style={{ width: '135px', height: '135px' }}/>
    }
  }

  const renderDeleteImage = (image, type) => {
    if (image !== null) {
      return (
        <DeleteIconButton
          className={resetImage}
          onClick={() => {
            switch (type) {
              case "depan":
                setPhotoDepan(null)
                fileInput1.current.value = null;
                break
              case "kanan":
                setPhotoKanan(null)
                fileInput2.current.value = null;
                break
              case "kiri":
                setPhotoKiri(null)
                fileInput3.current.value = null;
                break
              case "belakang":
                setPhotoBelakang(null)
                fileInput4.current.value = null;
                break
            }
          }}
        >
          <ClearIcon />
        </DeleteIconButton>
      )
    }
  }

  const handleChange = (e) => {
    console.log(e)
  }

  const handleChangeLongText = (e) => {
    console.log(e)
  }

  return (
    <Modal
      className={modal}
      open={isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="flex-end" alignItems="stretch">
          {<CloseButton onClick={onClose} style={{ cursor: "pointer" }} />}
        </Grid>

        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={2}
        >
          <Grid item>
            <Typography
              variant="h5"
              component="h5"
              align="center"
              style={{ color: "#374062", fontWeight: 600 }}
            >
              Add New Order
            </Typography>
          </Grid>

          <Grid
            container
            direction="row"
            style={{ marginTop: 15, marginLeft: 15 }}
          >
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography>No Ticket :</Typography>
                </Grid>
                <Grid item>
                  <Typography style={{ fontWeight: 600 }}>B-02342</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography>ID Location :</Typography>
                </Grid>
                <Grid item>
                  <Typography>-</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            style={{ marginTop: 15, marginLeft: 15 }}
          >
            <Grid item xs={6}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography>ID Mesin :</Typography>
                </Grid>
                <Grid item>
                  <InputBordered
                    style={{ width: "86%", height: "24px" }}
                    placeholder="Masukan ID Mesin"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography>Nama Lokasi :</Typography>
                </Grid>
                <Grid item>
                  <Typography>-</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            style={{ marginTop: 15, marginLeft: 15 }}
          >
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography>Jenis Pekerjaan :</Typography>
                </Grid>
                <Grid item style={{ marginTop: 5 }}>
                  <Select
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement
                    }
                    className={"CommonSelect__select--bordered #BCC8E7"}
                    style={{ width: "86%" }}
                    onChange={handleChange}
                    placeholder="Pilih Jenis Pekerjaan"
                    suffixIcon={
                      <AngleDownIcon className="CommonSelect__select-icon" />
                    }
                  >
                    {dataJenisPekerjaan.map((data) => (
                      <Option key={data.id} value={data.value}>
                        {data.value}
                      </Option>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography>Nama Vendor :</Typography>
                </Grid>
                <Grid item style={{ marginTop: 5 }}>
                  <Select
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement
                    }
                    className={"CommonSelect__select--bordered #BCC8E7"}
                    style={{ width: "86%" }}
                    onChange={handleChange}
                    placeholder="Pilih Nama Vendor"
                    suffixIcon={
                      <AngleDownIcon className="CommonSelect__select-icon" />
                    }
                  >
                    {dataVendor.map((data) => (
                      <Option key={data.id} value={data.value}>
                        {data.value}
                      </Option>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="stretch"
            style={{ marginTop: 15, marginLeft: 15 }}
          >
            <Grid container direction="column">
              <Grid item>
                <Typography>Notes & Description :</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="stretch" style={{ marginTop: 15 }}>
              <InputBordered
                multiline
                rows={6}
                style={{ width: "92%" }}
                onChange={handleChangeLongText}
                placeholder="Notes & Description"
              />
            </Grid>
          </Grid>

          <Grid
            item
            style={{ paddingLeft: "20px", marginTop: "20px", width: "96%" }}
          >
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <Box className={imageUploadContainer}>
                  <input
                    id="depan"
                    type="file"
                    accept=".png,.jpg, .jpeg"
                    onChange={(e) => handlePhoto(e, "depan")}
                    ref={fileInput1}
                    className={input}
                  />
                  <label
                    htmlFor="depan"
                    className={imgDefault}
                    style={{ cursor: "pointer" }}
                  >
                    <Grid container direction="column" alignItems="center">
                      {renderImage(photoDepan)}
                      <Typography>Depan</Typography>
                    </Grid>
                  </label>
                  {renderDeleteImage(photoDepan, "depan")}
                </Box>
              </Grid>
              <Grid item>
                <Box className={imageUploadContainer}>
                  <input
                    id="kanan"
                    type="file"
                    accept=".png,.jpg, .jpeg"
                    onChange={(e) => handlePhoto(e, "kanan")}
                    ref={fileInput2}
                    className={input}
                  />
                  <label
                    htmlFor="kanan"
                    className={imgDefault}
                    style={{ cursor: "pointer" }}
                  >
                    <Grid container direction="column" alignItems="center">
                      {renderImage(photoKanan)}
                      <Typography>Kanan</Typography>
                    </Grid>
                  </label>
                  {renderDeleteImage(photoKanan, "kanan")}
                </Box>
              </Grid>
              <Grid item>
                <Box className={imageUploadContainer}>
                  <input
                    id="kiri"
                    type="file"
                    accept=".png,.jpg, .jpeg"
                    onChange={(e) => handlePhoto(e, "kiri")}
                    ref={fileInput3}
                    className={input}
                  />
                  <label
                    htmlFor="kiri"
                    className={imgDefault}
                    style={{ cursor: "pointer" }}
                  >
                    <Grid container direction="column" alignItems="center">
                      {renderImage(photoKiri)}
                      <Typography>Kiri</Typography>
                    </Grid>
                  </label>
                  {renderDeleteImage(photoKiri, "kiri")}
                </Box>
              </Grid>
              <Grid item>
                <Box className={imageUploadContainer}>
                  <input
                    id="belakang"
                    type="file"
                    accept=".png,.jpg, .jpeg"
                    onChange={(e) => handlePhoto(e, "belakang")}
                    ref={fileInput4}
                    className={input}
                  />
                  <label
                    htmlFor="belakang"
                    className={imgDefault}
                    style={{ cursor: "pointer" }}
                  >
                    <Grid container direction="column" alignItems="center">
                      {renderImage(photoBelakang)}
                      <Typography>Belakang</Typography>
                    </Grid>
                  </label>
                  {renderDeleteImage(photoBelakang, "belakang")}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid container
            alignItems="stretch"
            style={{ marginTop: 5, marginLeft: 15 }}
          >
            <Typography style={{ fontWeight: 400, color: "#8D98B4" }}>
              *Tolong upload foto sesuai dengan keterangan yang tersedia
            </Typography>
          </Grid>

          <Grid container style={{ marginTop: 20 }} justify='space-between'>
            <Grid item>
                <Button
                    variant="contained"
                    disableElevation
                    className={secondaryButton}
                    onClick={onClose}
                    style={{ textTransform: "capitalize" }}
                >
                    Cancel
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    disableElevation
                    className={primaryButton}
                    onClick={onSubmitNewOrder}
                    style={{ textTransform: "capitalize" }}
                >
                    Submit
                </Button>
            </Grid>
          </Grid>

        </Grid>
      </Box>
    </Modal>
  );
};

successPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitNewOrder: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};

export default successPopUp;