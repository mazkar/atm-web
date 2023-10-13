import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import constansts from "../../../../../../helpers/constants";
import { ReactComponent as DropDownIcon } from "../../../../../../assets/icons/linear-red/chevron-down.svg";
import { ReactComponent as DropDownGrayIcon } from "../../../../../../assets/icons/duotone-gray/chevron-down-gray.svg";
import { ReactComponent as SyncGreenIcon } from "../../../../../../assets/icons/siab/sync-green.svg";
import { ReactComponent as SyncRedIcon } from "../../../../../../assets/icons/siab/sync-red.svg";
import MinioDocComponent from "../../../../../../components/MinioDocComponent";
import { doEditUps } from "../../../../ApiServiceAsset";
import { useParams, useHistory } from "react-router-dom";
import MuiButton from "../../../../../../components/Button/MuiButton";
import { PrimaryHard } from "../../../../../../assets/theme/colors";
import ModalLoader from "../../../../../../components/ModalLoader";
import PopUpSuccess from "../../../../../../components/PopupSucces";
import PropTypes from "prop-types";
import MinioImageComponent from "../../../../../../components/MinioImageComponent";

const SelectInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${constansts.color.grayMedium}`,
    borderRadius: 8,
    fontFamily: "Barlow",
    fontSize: 13,
    padding: "16px 12px",
    width: "100%",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 8,
      border: `1px solid ${constansts.color.primaryMedium}`,
      backgroundColor: constansts.color.white,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const RedSwitch = withStyles({
  switchBase: {
    color: constansts.color.primaryHard,
    "&$checked": {
      color: constansts.color.grayMedium,
    },
    "&$checked + $track": {
      backgroundColor: constansts.color.graySoft,
    },
  },
  checked: {},
  track: {
    backgroundColor: constansts.color.primaryMedium,
  },
})(Switch);

const useStyles = makeStyles({
  detailTitle: {
    fontWeight: 600,
    fontSize: 13,
    color: constansts.color.grayMedium,
    borderBottom: `2px solid ${constansts.color.grayMedium}`,
    paddingBottom: 10,
    marginBottom: 20,
  },
  detailInfo: {
    fontSize: 15,
    fontWeight: 400,
    color: constansts.color.dark,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: 600,
    color: constansts.color.dark,
  },
  select: {
    width: "100%",
    padding: 0,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
});

function DetailTabUPS({
  data,
  photos,
  attachments,
  requestEdit,
  setRequestEdit,
}) {
  const { id } = useParams();
  const [disableUPS, setDisableUPS] = useState(true);
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const [requestEdit, setRequestEdit] = useState({
  //   id: parseInt(id),
  //   ups: data.ups,
  //   status: data.status,
  // });

  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  const onChangeCondition = (e) => {
    setRequestEdit({
      ...requestEdit,
      ups: e.target.value,
    });
  };

  const onChangeStatus = (e) => {
    setRequestEdit({
      ...requestEdit,
      status: e.target.value,
    });
  };

  const handleSubmitEdit = () => {
    doEditUps(loadingHandler, requestEdit).then((response) => {
      if (response) {
        if (response.responseCode === "200") {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            history.push("/asset-management/warehouse-management#ups");
            window.location.reload();
          }, 2000);
        }
      }
    });
  };

  const handleClosePopUpSuccess = () => {
    setIsSuccess(false);
    history.push("/asset-management/warehouse-management#ups");
    window.location.reload();
  };

  useEffect(() => {
    console.log(data.status);
  }, []);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box>
            <Typography className={classes.detailTitle}>
              Informasi Mesin {requestEdit.ups}
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* Nama Request */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      User Request
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.userRequest ? data.userRequest : "-"}
                    </Typography>
                  </Grid>

                  {/* Jenis Mesin */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Jenis UPS
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.upsType ? data.upsType : "-"}
                    </Typography>
                  </Grid>

                  {/* Tgl Kirim/Tarik */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Tgl Kirim / Tarik
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.pmDate ? data.pmDate : "-"}
                    </Typography>
                  </Grid>

                  {/* ID Location */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      ID Location
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.idLocation ? data.idLocation : "-"}
                    </Typography>
                  </Grid>

                  {/* Nama Lokasi */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Nama Lokasi
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.locationName ? data.locationName : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* ID Mesin */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      ID Mesin
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.idMesin ? data.idMesin : "-"}
                    </Typography>
                  </Grid>

                  {/* SN Mesin */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      SN Mesin
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.snMachine ? data.snMachine : "-"}
                    </Typography>
                  </Grid>

                  {/* SN UPS */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      SN UPS
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.snUps ? data.snUps : "-"}
                    </Typography>
                  </Grid>

                  {/* Tahun Pembelian */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Tahun Pembelian
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.purchaseYear ? data.purchaseYear : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography className={classes.detailTitle}>
              Informasi Gudang
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* No Aktivitas */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      No Aktivitas
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.activityNumber ? data.activityNumber : "-"}
                    </Typography>
                  </Grid>

                  {/* No Aset Gudang */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      No Aset Gudang
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.warehouseAssetNumber
                        ? data.warehouseAssetNumber
                        : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* User Control */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      ID Mesin
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {data.idMachine ? data.idMachine : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                marginTop: 15,
              }}
            >
              {/* Select UPS */}
              <Grid item xs={4}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography className={classes.detailInfo}>UPS</Typography>
                  <RedSwitch
                    checked={disableUPS}
                    onChange={() => {
                      setDisableUPS(!disableUPS);
                    }}
                    size="small"
                  />
                </Box>
                <FormControl className={classes.select}>
                  <Select
                    disabled={disableUPS}
                    value={requestEdit.ups}
                    onChange={onChangeCondition}
                    style={{ marginTop: 5 }}
                    input={<SelectInput />}
                    IconComponent={disableUPS ? DropDownGrayIcon : DropDownIcon}
                    // defaultValue={data.ups ? data.ups : null}
                  >
                    <MenuItem value="Ada">Ada</MenuItem>
                    <MenuItem value="Tidak">Tidak</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Typography className={classes.detailTitle}>
              Informasi Umum
            </Typography>
            <Grid Container>
              <Grid item xs={6}>
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#8D98B4",
                    marginBottom: 5,
                  }}
                >
                  Status
                </Typography>
                <FormControl className={classes.select}>
                  <Select
                    value={requestEdit.status}
                    onChange={onChangeStatus}
                    style={{ marginTop: 5 }}
                    input={<SelectInput />}
                    IconComponent={DropDownIcon}
                    // defaultValue={requestEdit.status}
                  >
                    <MenuItem value={1}>
                      <SyncRedIcon />
                      <Typography style={{ marginLeft: 5 }}>
                        NOT READY
                      </Typography>
                    </MenuItem>
                    <MenuItem value={2}>
                      <SyncGreenIcon />
                      <Typography style={{ marginLeft: 5 }}>READY</Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box style={{ marginTop: 40 }}>
              <Typography
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#8D98B4",
                }}
              >
                Foto ATM
              </Typography>
              <Grid container style={{ marginTop: 5 }}>
                {photos.map((img) => (
                  <Grid item>
                    <MinioImageComponent
                      filePath={img}
                      style={{
                        borderRadius: 8,
                        width: 115,
                        height: 80,
                        marginRight: 20,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <ModalLoader isOpen={isLoading} />
            <PopUpSuccess
              isOpen={isSuccess}
              onClose={handleClosePopUpSuccess}
            />
            <Box style={{ marginTop: 40 }}>
              <Typography
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 10,
                  color: constansts.color.dark,
                }}
              >
                Vendor Attachment
              </Typography>
              <Grid container direction="column" spacing={2}>
                {attachments.map((item, index) => (
                  <Grid item key={index}>
                    <MinioDocComponent filePath={item.pathFile} />
                  </Grid>
                ))}
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ marginTop: 25 }}
              >
                <Grid item>
                  <MuiButton
                    label="Cancel"
                    onClick={() =>
                      history.push("/asset-management/warehouse-management#ups")
                    }
                    style={{
                      height: 38,
                      backgroundColor: "#fff",
                      color: PrimaryHard,
                      border: "1px solid #DC241F",
                    }}
                  />
                </Grid>
                <Grid item>
                  <MuiButton
                    label="Simpan"
                    onClick={handleSubmitEdit}
                    style={{ height: 38 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailTabUPS;

DetailTabUPS.PropTypes = {
  data: PropTypes.object.isRequired,
  photos: PropTypes.array.isRequired,
  attachments: PropTypes.array.isRequired,
};
