/* Third Party Import */
import React, {useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  Grid,
  Box,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import PropTypes from "prop-types";

/* Internal Import */
import {
  PrimaryHard,
} from "../../../../../assets/theme/colors";
import SelectMui from '../../../../../components/Selects/SelectMui';
import LabelTextField from "../../../../../components/Form/LabelTextField";
import ConfirmAndCancelButton from "../../../../../components/Button/ConfirmAndCancelButton";
import {addPricelistPart, addPricelistService} from "../../../ApiServices";
import { doGetVendors } from '../../../../UserManagement/ApiServicesUser';

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
  label: {
    fontSize: "13px",
    marginBottom: "5px"
  }
});

const AddNewPricelist = ({isOpen = false, onClose, currentTabs, refresh}) => {
  const classes = useStyles();

  const [payload, setPayload] = useState({
    selectedVendor: {},
    vendorName: '',
    namaBarang: '',
    merek: '',
    hargaBarang: '',
    hargaJasaPemasangan: '',
    jenisJasa: '',
    biayaJasa: ''
  });
  const [vendorList, setVendorList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function handleChangeRequest(event, key) {
    setPayload((prev) => {
      return {
        ...prev,
        [key]: event,
      };
    });
  }

  const fetchAllVendor = async () => {
    const res = await doGetVendors((value)=>{setLoading(value);});
    if (res) {
      const newArray = res.map((item) => {
        const { name, id } = item;
        return {
          name,
          value: id
        };
      });
      setVendorList(newArray);
    }
  };

  const handleAddPricelistPart = async () => {
    const {selectedVendor, namaBarang, merek, hargaBarang, hargaJasaPemasangan} = payload;

    const newPayload = {
      vendorId: selectedVendor,
      namaBarang,
      merek,
      hargaBarang,
      hargaJasaPemasangan
    };

    const res = await addPricelistPart(newPayload);
    return res;
  };

  const handleAddPricelistService = async () => {
    const {selectedVendor, jenisJasa, biayaJasa} = payload;

    const newPayload = {
      vendorId: selectedVendor,
      jenisJasa,
      biayaJasa
    };

    const res = await addPricelistService(newPayload);
    return res;
  };

  const handleSubmit = async () => {
    const {selectedVendor, namaBarang, merek, hargaBarang, hargaJasaPemasangan, jenisJasa, biayaJasa} = payload;

    if(currentTabs === 0) if(!selectedVendor || !namaBarang || !merek || !hargaBarang || !hargaJasaPemasangan) return alert("Lengkapi data terlebih dahulu!")
    if(currentTabs === 1) if(!selectedVendor || !jenisJasa || !biayaJasa) return alert("Lengkapi data terlebih dahulu!")

    const res = currentTabs === 0 ? await handleAddPricelistPart() : await handleAddPricelistService();

    if (res) {
      await onClose();
      refresh();
    }
  };

  useEffect(() => {
    fetchAllVendor();
  },[]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" className={classes.modal}>
      <Box style={{ padding: "36px 48px" }}>
        <Grid container justify="flex-end">
          <IconButton small onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Typography className={classes.title}>Add Pricelist</Typography>
        <Grid container alignContent="center" spacing={2}>
          <Grid item xs={6}>
            <div style={{ marginBottom: "14px" }}>
              <Typography>Nama Vendor: </Typography>
              <SelectMui
                selectOptionData={vendorList}
                selectedValue={payload.selectedVendor}
                onSelectValueChange={(newVal) =>
                  handleChangeRequest(newVal, "selectedVendor")
                }
              />
            </div>
          </Grid>
          {
            currentTabs === 0 &&
            <>
              <Grid item xs={6}>
                <div style={{ marginBottom: "14px" }}>
                  <LabelTextField
                    label="Nama Barang:"
                    placeholder="Masukkan Nama Barang"
                    type="text"
                    onChange={(newVal) =>
                      handleChangeRequest(newVal.target.value, "namaBarang")
                    }
                    value={payload.namaBarang}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ marginBottom: "14px" }}>
                  <LabelTextField
                    label="Merek:"
                    placeholder="Masukkan Merek"
                    type="text"
                    onChange={(newVal) =>
                      handleChangeRequest(newVal.target.value, "merek")
                    }
                    value={payload.merek}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ marginBottom: "14px" }}>
                  <LabelTextField
                    label="Harga Barang:"
                    placeholder="Masukkan Harga Barang"
                    type="text"
                    currencyField
                    onChange={(newVal) =>
                      handleChangeRequest(newVal.target.value, "hargaBarang")
                    }
                    value={payload.hargaBarang}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ marginBottom: "14px" }}>
                  <LabelTextField
                    label="Biaya Pemasangan:"
                    placeholder="Masukkan Biaya Pemasangan"
                    type="text"
                    currencyField
                    onChange={(newVal) =>
                      handleChangeRequest(newVal.target.value, "hargaJasaPemasangan")
                    }
                    value={payload.hargaJasaPemasangan}
                  />
                </div>
              </Grid>
            </>
          }
          {
            currentTabs === 1 &&
            <>
              <Grid item xs={6}>
                <div style={{ marginBottom: "14px" }}>
                  <LabelTextField
                    label="Jenis Jasa:"
                    placeholder="Masukkan Jenis Jasa"
                    type="text"
                    onChange={(newVal) =>
                      handleChangeRequest(newVal.target.value, "jenisJasa")
                    }
                    value={payload.jenisJasa}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ marginBottom: "14px" }}>
                  <LabelTextField
                    label="Biaya Jasa:"
                    placeholder="Masukkan Biaya Jasa"
                    type="text"
                    onChange={(newVal) =>
                      handleChangeRequest(newVal.target.value, "biayaJasa")
                    }
                    value={payload.biayaJasa}
                  />
                </div>
              </Grid>
            </>
          }
        </Grid>
        <ConfirmAndCancelButton
          onCancel={onClose}
          textCancel="Cancel"
          textConfirm="Submit"
          onConfirm={handleSubmit}
        />
      </Box>
    </Dialog>
  );
};

AddNewPricelist.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddNewPricelist;
