import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { unix } from "moment";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ChkyButtons } from "../../../../../../components";
import MinioDocComponent from "../../../../../../components/MinioDocComponent";
import constansts from "../../../../../../helpers/constants";
import InputText from "../common/inputText";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Barlow",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "15px",
    width: "100%",
    paddingBottom: "10px",
    borderBottom: "2px solid #BCC8E7",
    margin: "30px 0 15px 0",
    color: "#BCC8E7",
  },
  detailContainer: {
    display: "flex",
    flex: 1,
  },
  container: { display: "flex", alignItems: "center", marginBottom: "15px" },
  dataName: {
    flex: 2,
    fontFamily: "Barlow",
    fontSize: "15px",
    fontWeight: 400,
  },
  colon: {
    flex: 0.2,
    display: "flex",
    alignItems: "center",
  },
  dataValue: {
    flex: 3,
    fontFamily: "Barlow",
    fontSize: "15px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
  },
});

const dummyData = {
  noKlaim: 123132,
  slaApproval: "21 Days",
  tipeKlaim: "Money Insurance",
  jumlahKerugian: "700.000",
  tglPengajuan: 1659314592000,
  kategori: "Vandal",
  idMesin: 5783,
  flm: "TAG",
  SnMesin: "56HG704680",
  slm: "Diebold Nixdorf",
  lokasi: "BKS. ATM CENTER APOTIK TAMAN NAROGONG INDAH",
  cctv: "-",
  ketKerugian: "Exit Shutter Palsu - Endra Budi Harianto",
  attachment: [
    { file: "Doc Klaim.pdf" },
    { file: "Attachment 4" },
    { file: "Attachment 2" },
    { file: "Attachment 5" },
    { file: "Attachment 3" },
  ],
  tglKejadian: 1659314592000,
  tglKirimDoc: 1659314592000,
  diajukanBeban: "Asuransi (Internal Ops)",
};

const dummyDataVendor = {
  noInvoice: 1232131,
  tglKirimInvoice: 1659314592000,
  uploadInvoice: "Invoice.jpg",
};

const DetailKlaimNonAsuransi = () => {
  const { id } = useParams();
  const [valueKerugian, setValueKerugian] = useState(dummyData.jumlahKerugian);
  const [valueKetKerugian, setValueKetKerugian] = useState(
    dummyData.ketKerugian
  );

  const classes = useStyles();
  // fetch Data detail
  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const [dataValueDetail, setDataValueDetail] = useState([]);
  const [dataAttac, setDataAttach] = useState([]);
  const [dataValueDetailVendor, setDataValueDetailVendor] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function fetchDataDetail() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.get(
        `${constansts.ASSET_MANAGEMENT_SERVICE}/getDetailKlaimEEI?id=${id}`,

        configNew
      );
      console.log("res data detail", result.data);
      setDataValueDetail(result.data.data.informasiUmum);
      setDataValueDetailVendor(result.data.data.informasiVendor);
      setDataValueDetailVendor(result.data.data.informasiUmum.attachDoc);
      // setHargaToken(result.data.tokenPrice);
      // setTokenSesudah(result.data.afterToken);
      // setFotoKWHSebelum(
      //   result.data.remainingTokenPhoto ? result.data.remainingTokenPhoto : ""
      // );
      // setFotoKWHSesudah(
      //   result.data.afterTokenPhoto ? result.data.afterTokenPhoto : ""
      // );
      // setTanggalPembelianToken(
      //   result.data.purchaseDate ? moment(result.data.purchaseDate) : null
      // );
    } catch (err) {
      alert(`Error Fetching Data derail ...! \n${err}`);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchDataDetail();
  }, []);
  return (
    <Box className={classes.root}>
      {/* Informasi */}
      <Typography className={classes.title}>Informasi</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>No Klaim</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dataValueDetail?.id}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>SLA Approval Beban</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: 400, color: "#65D170" }}>
                {dataValueDetail.slaApprovalBeban}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>Tipe Klaim</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dataValueDetail.tipeKlaim}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>Jumlah Kerugian</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <InputText
                value={dataValueDetail.jumlahKerugian}
                onChange={(e) => {
                  setValueKerugian(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>Tanggal Pengajuan</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              {dataValueDetail.tglPengajuan !== null ? (
                <Typography
                  style={{ fontWeight: 600, color: constansts.color.dark }}
                >
                  {unix(dataValueDetail.tglPengajuan / 1000).format(
                    "DD-MM-YYYY"
                  )}
                </Typography>
              ) : (
                <Typography
                  style={{ fontWeight: 600, color: constansts.color.dark }}
                >
                  -
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>Kategori</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              {dataValueDetail.kategori !== null ? (
                <Typography
                  style={{ fontWeight: 600, color: constansts.color.dark }}
                >
                  {dataValueDetail.kategori}
                </Typography>
              ) : (
                <Typography
                  style={{ fontWeight: 600, color: constansts.color.dark }}
                >
                  -
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>ID Mesin</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dataValueDetail.mesinId}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>FLM</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dataValueDetail.flm}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>SN Mesin</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dataValueDetail.snMesin}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>SLM</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dataValueDetail.slm}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>Lokasi</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dataValueDetail.lokasi}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>CCTV</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dataValueDetail.cctv}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>Keterangan Kerugian</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <InputText
                value={dataValueDetail.ketKerugian}
                onChange={(e) => {
                  setValueKetKerugian(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center" spacing={2}>
            {dataAttac.length !== 0 ? (
              dataAttac?.map((item) => (
                <Grid item xs={6}>
                  <MinioDocComponent filePath={`/${item.file}`} />
                </Grid>
              ))
            ) : (
              <Typography
                style={{ fontWeight: 600, color: constansts.color.primaryHard }}
              >
                No Attachment
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={5}>
              <Typography>Tgl Kejadian</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {unix(dataValueDetail.tglKejadian / 1000).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={5}>
              <Typography>Tgl Kirim DOC komplit ke Asuransi</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              {dataValueDetail.tglPengajuan !== null ? (
                <Typography
                  style={{ fontWeight: 600, color: constansts.color.dark }}
                >
                  {unix(dataValueDetail.tglPengajuan / 1000).format(
                    "DD-MM-YYYY"
                  )}
                </Typography>
              ) : (
                <Typography
                  style={{ fontWeight: 600, color: constansts.color.dark }}
                >
                  -
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={5}>
              <Typography>Diajukan Beban ke</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              {dataValueDetail.diBebankan !== null ? (
                <Typography
                  style={{ fontWeight: 600, color: constansts.color.dark }}
                >
                  {dummyData.diajukanBeban}
                </Typography>
              ) : (
                <Typography>-</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Informasi Vendor */}
      <Typography className={classes.title}>Informasi Vendor</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>No Invoice</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              {dataValueDetailVendor !== null ? (
                <Typography
                  style={{ fontWeight: 600, color: constansts.color.dark }}
                >
                  {dataValueDetailVendor.noInvoice}
                </Typography>
              ) : (
                <Typography>-</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>Tgl Kirim Invoice</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              {dataValueDetailVendor !== null ? (
                <Typography
                  style={{ fontWeight: 600, color: constansts.color.dark }}
                >
                  {unix(dataValueDetailVendor.invoiceDate / 1000).format(
                    "DD-MM-YYYY"
                  )}
                </Typography>
              ) : (
                <Typography>-</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>Upload Invoice</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <MinioDocComponent
                filePath={`/${dummyDataVendor.uploadInvoice}`}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="space-between" style={{ marginTop: 20 }}>
        <Grid item>
          <ChkyButtons
            buttonType="redOutlined"
            style={{ textTransform: "none" }}
          >
            Cancel
          </ChkyButtons>
        </Grid>
        <Grid item>
          <ChkyButtons style={{ textTransform: "none" }}>Simpan</ChkyButtons>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailKlaimNonAsuransi;
