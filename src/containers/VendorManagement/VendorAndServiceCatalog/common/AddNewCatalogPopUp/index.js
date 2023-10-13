import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import isEmail from "validator/lib/isEmail";
import constants from "../../../../../helpers/constants";
import {
  GrayMedium,
  PrimaryHard,
  PrimaryUltrasoft,
  PrimaryDark,
} from "../../../../../assets/theme/colors";
import SelectMui from "../../../../../components/Selects/SelectMui";
import LabelTextField from "../../../../../components/Form/LabelTextField";

import { doGetVendors } from "../../../../UserManagement/ApiServicesUser";
import { doFetchDataVendor } from "../../../../Vendors/ApiServiceVendor";
import { addNewCatalog } from "../../../ApiServices";
import { ReactComponent as CloseButton } from "../../../../../assets/icons/siab/x-new.svg";
import useRupiahConverterSecondary from "../../../../../helpers/useRupiahConverterSecondary";

const useStyles = makeStyles({
  modal: {
    "& .MuiDialog-paper": {
      width: "960px",
    },
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "36px",
    textAlign: "center",
    marginBottom: "30px",
  },
  btnSquare: {
    minWidth: "40px",
    height: "40px",
    backgroundColor: PrimaryHard,
    color: "#ffffff",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: PrimaryDark,
    },
    "&:disabled": {
      backgroundColor: GrayMedium,
    },
  },
  table: {
    border: "1px solid #BCC8E7",
    borderRadius: "10px",
    padding: "10px",
  },
  tableText: {
    fontFamily: "Barlow",
    fontSize: "15px",
    fontWeight: 600,
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "center",
  },
  containedButton: {
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
  outlinedButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  emptyState: {
    color: constants.color.graySoft,
    textAlign: "center",
  },
});

const AddNewCatalog = ({ isOpen = false, onClose, refresh }) => {
  const classes = useStyles();

  // =====> Option Select State  <=====
  const statusList = [
    {
      name: "Tidak Aktif",
      value: 0,
    },
    {
      name: "Aktif",
      value: 1,
    },
  ];
  const [vendorList, setVendorList] = useState([
    {
      value: "-",
      name: "Pilih Nama Vendor",
    },
  ]);

  // =====> Payload State  <=====
  const [payload, setPayload] = useState({
    selectedVendor: "",
    status: 1,
    serviceName: "",
    serviceCharge: "",
  });
  const [tableList, setTableList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeRequest = (newValue, key) => {
    console.log(newValue);
    setPayload((prevValue) => {
      // =====> Replace field with new value  <=====
      return {
        ...prevValue,
        [key]: newValue,
      };
    });
  };

  const handleAddData = () => {
    // =====> Init dummy data  <=====
    const data = {
      name: payload.serviceName,
      fee: payload.serviceCharge,
    };

    // =====> Push dummy data to state  <=====
    const tempArray = [...tableList];
    tempArray.push(data);
    setTableList(tempArray);

    handleChangeRequest("", "serviceName");
    handleChangeRequest("", "serviceCharge");
  };

  const handleDelete = (index) => {
    const tempArray = [...tableList];
    tempArray.splice(index, 1);
    setTableList(tempArray);
  };

  const loadingHandler = (value) => {
    setIsLoading(value);
  };

  const handleSubmit = async () => {
    const { status } = payload;
    const { email, telephoneNumber, address, id } = payload.selectedVendor;

    const listOfNameService = tableList.map((item) => {
      const { name, fee } = item;
      return `${name},${fee}`;
    });

    const newPayload = {
      vendorId: id,
      email,
      phone: telephoneNumber,
      address,
      status,
      nameService: listOfNameService,
    };

    if (formValidation()) {
      const res = await addNewCatalog(newPayload);
      if (res) {
        await onClose();
        await refresh();
      }
    }
  };

  const fieldValidation = (field) => {
    const value = payload[field] !== "";
    return value;
  };

  const formValidation = () => {
    /* Expecting true from this validation */
    const vendorValidation = fieldValidation("selectedVendor");
    const statusValidation = fieldValidation("status");
    const nameServiceValidation = tableList.length !== 0;
    const tempArray = [
      vendorValidation,
      statusValidation,
      nameServiceValidation,
    ];
    const result = tempArray.every((x) => x === true);
    return result;
  };

  const fetchAllVendor = async () => {
    const res = await doFetchDataVendor(loadingHandler, 100, 0, "id", "ASC");
    const { content } = res.data;
    if (res.status === 200) {
      const newArray = content.map((item) => {
        const { name, id, email, telephoneNumber, address } = item;
        return {
          name,
          value: {
            id,
            name,
            email,
            telephoneNumber,
            address,
          },
        };
      });
      setVendorList(newArray);
    }
  };

  useEffect(() => {
    fetchAllVendor();
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      className={classes.modal}
    >
      <Box style={{ padding: "36px 48px" }}>
        <Grid container justify="flex-end">
          <CloseButton onClick={onClose} style={{ cursor: "pointer" }} />
        </Grid>
        <Typography className={classes.title}>Add New</Typography>

        {/* =====> Form  <===== */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div style={{ marginBottom: "14px" }}>
              <Typography className={classes.label}>Nama Vendor: </Typography>
              <SelectMui
                selectOptionData={vendorList}
                selectedValue={payload.selectedVendor}
                onSelectValueChange={(newVal) =>
                  handleChangeRequest(newVal, "selectedVendor")
                }
              />
              {!payload.selectedVendor && (
                <FormHelperText style={{ color: PrimaryHard }}>
                  Pilih vendor terlebih dahulu
                </FormHelperText>
              )}
            </div>
            <div style={{ marginBottom: "14px" }}>
              <LabelTextField
                label="Email: "
                placeholder="Email"
                type="text"
                value={payload.selectedVendor.email}
                disabled
              />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <LabelTextField
                label="No Telp/HP"
                placeholder="No Telp/HP"
                type="number"
                value={payload.selectedVendor.telephoneNumber}
                disabled
              />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <LabelTextField
                label="Alamat"
                placeholder="Alamat"
                type="text"
                value={payload.selectedVendor.address}
                disabled
              />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <Typography className={classes.label}>Status: </Typography>
              <SelectMui
                selectOptionData={statusList}
                selectedValue={payload.status}
                onSelectValueChange={(newVal) =>
                  handleChangeRequest(newVal, "status")
                }
              />
              {/* {!payload.status && (
                <FormHelperText style={{ color: PrimaryHard }}>
                  Pilih status terlebih dahulu
                </FormHelperText>
              )} */}
            </div>
          </Grid>
          <Grid item xs={8}>
            {/* =====> Upper Form  <===== */}
            <Grid container alignItems="center">
              <Grid item xs={5}>
                <div style={{ marginBottom: "14px", marginRight: "14px" }}>
                  <LabelTextField
                    label="Layanan:"
                    placeholder="Masukkan nama layanan"
                    type="text"
                    onChange={(newVal) =>
                      handleChangeRequest(newVal.target.value, "serviceName")
                    }
                    value={payload.serviceName}
                  />
                </div>
              </Grid>
              <Grid item xs={5}>
                <div style={{ marginBottom: "14px" }}>
                  <LabelTextField
                    label="Masukkan Biaya Layanan"
                    placeholder="Masukkan biaya layanan"
                    type="number"
                    onChange={(newVal) =>
                      handleChangeRequest(newVal.target.value, "serviceCharge")
                    }
                    value={payload.serviceCharge}
                    currencyField
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={2}
                style={{ textAlign: "right", marginTop: "10px" }}
              >
                <Button
                  disabled={!payload.serviceName || !payload.serviceCharge}
                  className={classes.btnSquare}
                  onClick={() => {
                    handleAddData();
                  }}
                >
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
            {/* =====> Table  <===== */}

            {tableList.length !== 0 ? (
              <Box className={classes.table}>
                {tableList.map((row, index) => {
                  return (
                    <div className={classes.tableRow}>
                      <Typography className={classes.tableText}>
                        {row.name}
                      </Typography>
                      <Typography className={classes.tableText}>
                        {useRupiahConverterSecondary(row.fee)}
                      </Typography>
                      <div style={{ textAlign: "right" }}>
                        <IconButton
                          small
                          onClick={() => {
                            handleDelete(index);
                          }}
                        >
                          <DeleteIcon style={{color: PrimaryHard}} />
                        </IconButton>
                      </div>
                    </div>
                  );
                })}
              </Box>
            ) : (
              <Box className={classes.table}>
                <Typography className={classes.emptyState}>
                  Silahkan masukkan layanan dan biaya layanan
                </Typography>
              </Box>
            )}
          </Grid>

          <Grid container style={{ marginTop: 20 }} justify="space-between">
            <Grid item>
              <Button
                variant="contained"
                disableElevation
                className={classes.outlinedButton}
                style={{ textTransform: "capitalize" }}
                onClick={onClose}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disableElevation
                className={classes.containedButton}
                style={{ textTransform: "capitalize" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

AddNewCatalog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddNewCatalog;
