import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useHistory, useParams } from 'react-router-dom';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import { ReactComponent as ArrowLeft } from '../../assets/icons/siab/arrow-left.svg';
import { Grid, Paper, Typography } from '@material-ui/core';
import CommonInput from './common/CommonInput';
import MediaPromosi from './common/MediaPromosi';
import FieldBiayaSewa from './common/FieldBiayaSewa';
import { GrayMedium } from '../../assets/theme/colors';
import { useState } from 'react';
import ModalLoader from '../../components/ModalLoader';
import axios from 'axios';
import constansts, { branches, dataRuangAtm, jensKomList, listBankLain } from '../../helpers/constants';
import { createContext } from 'react';
import { itemList as bankList } from '../LocationProfilling';
import ImageContainer from './common/ImageContainer';
import { ChkyButtons } from '../../components';
import { convertArrayStringToArrayObjectATMBankList } from '../../helpers/bankLainArrayConverter';

const useStyles = makeStyles({
  sectionTitle: {
    fontWeight: '600',
    fontSize: '13px',
    lineHeight: '16px',
    marginBottom: 20,
    marginTop: 40,
    paddingBottom: 10,
    color: GrayMedium,
    borderBottom: `2px solid ${GrayMedium}`,
  },
  backButton: {
    marginBottom: 20,
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: 'red',
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      '& :hover': {
        backgroundColor: '#F4F7FB',
      },
      '& .MuiButton-label': {
        fontSize: 17,
        fontWeight: 500,
      },
    },
  },
  photoSectionTitle: {
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    marginTop: 40,
    marginBottom: 10,
  },
});

export const EditMasterCtx = createContext();
const { Provider } = EditMasterCtx;

const Edit = () => {
  const classes = useStyles();
  const history = useHistory();
  const { atmId } = useParams();

  const [detailData, setDetailData] = useState({});
  const [fieldOptions, setFieldOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [branch, setBranch] = useState(null);
  const [branchOptions, setBranchOptions] = useState([]);
  const [origMediaPromotions, setOrigMediaPromotions] = useState(null);

  function fetchDetailData() {
    setIsLoading(true);
    axios({
      method: 'POST',
      url: `${constansts.MODELINGS_SERVICE}/getDetailMasterData`,
      data: { atmId },
    })
      .then((res) => {
        // console.log('~ res.data', res.data);
        const d = res.data.detailMasterData;
        setDetailData({
          ...d, 
          aroundAtmBank: convertArrayStringToArrayObjectATMBankList(d.aroundAtmBank || []),
          aroundAtmBankList: d.aroundAtmBank || [],
          aroundAtmCount: d.aroundAtmBank ? d.aroundAtmBank.length : null,
        });
        setBranch(d.branch);
        setOrigMediaPromotions(d.mediaPromotion);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('~ err', err);
        setIsLoading(false);
      });
  }

  function fetchAreas() {
    axios({
      method: 'POST',
      url: `${constansts.apiHost}/getAreaAll`,
    })
      .then(({ data }) => {
        let updateArea = data.data;
        setAreas(updateArea.map(({ id, name }) => ({ id, value: id, name })));
      })
      .catch((err) => {});
  }

  function fetchOptions() {
    axios({
      method: 'POST',
      url: `${constansts.MODELINGS_SERVICE}/getFieldProperties`,
    })
      .then((res) => {
        // console.log('~ res.data', res.data);
        setFieldOptions(res.data);
      })
      .catch((err) => {
        console.log('~ err', err);
      });
  }

  async function fetchProvinces() {
    try {
      const data = await axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getProvince`,
        method: 'GET',
      });
      const dataPre = data.data.data;
      // console.log('PROVINCE LIST ====> : ', dataPre);
      const constructData = dataPre.map((item) => {
        const newRow = {
          id: item.id,
          value: item.id + '',
          name: item.name,
        };
        return newRow;
      });
      setProvinces(constructData);
    } catch (error) {
      console.log(`Error Fetching Get Province List : \n ${error}`);
    }
  }

  async function fetchCities(provinceId) {
    setCities([]);
    try {
      const data = await axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/citiesByProvince?provinceId=${provinceId}`,
        method: 'GET',
      });
      const dataPre = data.data.data;
      // console.log('PROVINCE LIST ====> : ', dataPre);
      const constructData = dataPre.map((item) => {
        const newRow = {
          id: item.id,
          value: item.id + '',
          name: item.name,
        };
        return newRow;
      });
      setCities(constructData);
    } catch (error) {
      console.log(`Error Fetching Get Province List : \n ${error}`);
    }
  }

  async function fetchDistricts(cityId) {
    setDistricts([]);
    try {
      const data = await axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/districtByCity?cityId=${cityId}`,
        method: 'GET',
      });
      const dataPre = data.data.data;
      // console.log('PROVINCE LIST ====> : ', dataPre);
      const constructData = dataPre.map((item) => {
        const newRow = {
          id: item.id,
          value: item.id + '',
          name: item.name,
        };
        return newRow;
      });
      setDistricts(constructData);
    } catch (error) {
      console.log(`Error Fetching Get Province List : \n ${error}`);
    }
  }

  function handleSelectBranch(val, op) {
    // console.log('~ onselect val,op', val, op);
  }

  function handleSearchBranch(text) {
    setBranch(text);
    if (text?.length > 0) {
      setBranchOptions(branches.filter(({ value }) => value.includes(text)));
    } else {
      setBranchOptions([]);
    }
  }

  function handleChangeBranch(val) {
    setBranch(val);
  }

  function handleSave() {
    setIsLoading(true);
    const d = { ...detailData }; // sebagai acuan saja
    const req = {
      ...detailData,
      branch,
      picSiteId: d.picSiteId * 1,
      picAreaId: d.picAreaId * 1,
      picAreaName: areas.find(({ id }) => id == d.picAreaId)?.name || null,
      mediaPromotion: d.mediaPromotion?.toString() || null,
      areaName: fieldOptions.area?.find(({ id }) => id == d.areaId)?.name || null,
      provinceName: provinces?.find(({ id }) => id == d.provinceId)?.name || null,
      cityName: cities?.find(({ id }) => id == d.cityId)?.name || null,
      districtName: districts?.find(({ id }) => id == d.districtId)?.name || null,
    };
    delete req.flatCost;
    delete req.locationMachinePositionPhotosUrl;
    delete req.locationFrontMachinePhotoUrl;
    delete req.locationPhotosLayoutUrl;
    delete req.locationPhotosPositionNeonSignUrl;
    delete req.locationPhotosPositionAtenaVsatUrl;
    delete req.aroundAtmBank;
    // console.log(req);
    axios({
      method: 'POST',
      url: constansts.MODELINGS_SERVICE + '/updateMasterData',
      data: req,
    })
      .then((res) => {
        setIsLoading(false);
        // console.log('~ res', res);
        if (res.data.responseCode === '00') {
          alert('Save data success.');
          history.push('/master-data');
        } else {
          alert(res.data.responseMessage);
        }
      })
      .catch((err) => {
        console.log('~ err', err);
        alert(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    // console.log('~ detailData', detailData);
    // console.log('~ areas', areas);
  }, [detailData /* , areas */]);

  useEffect(() => {
    fetchDetailData();
  }, [atmId]);

  useEffect(() => {
    if (detailData.provinceId) {
      fetchCities(detailData.provinceId);
    } else {
      setCities([]);
    }
  }, [detailData.provinceId]);

  useEffect(() => {
    if (detailData.cityId) {
      fetchDistricts(detailData.cityId);
    } else {
      setDistricts([]);
    }
  }, [detailData.cityId]);

  useEffect(() => {
    fetchAreas();
    fetchOptions();
    fetchProvinces();
  }, []);

  return (
    <Provider value={{ detailData, setDetailData, origMediaPromotions, fieldOptions }}>
      <div style={{ padding: 20 }}>
        <div className={classes.backButton}>
          <MuiIconLabelButton
            label='Back'
            iconPosition='startIcon'
            onClick={() => history.goBack()}
            buttonIcon={<ArrowLeft />}
          />
        </div>
        <Typography
          style={{ fontWeight: '500', fontSize: '36px', lineHeight: '43px', marginBottom: 40 }}
        >
          Edit Master Data
        </Typography>
        <Paper
          style={{
            padding: 30,
            boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
            borderRadius: '10px',
            padding: 30,
          }}
        >
          <Typography
            style={{
              fontWeight: '500',
              fontSize: '24px',
              lineHeight: '29px',
            }}
          >
            ATM ID : {atmId}
          </Typography>
          <Typography className={classes.sectionTitle}>Detail ATM</Typography>
          <Grid container spacing={5}>
            <CommonInput
              type='select'
              options={[
                { value: true, name: 'Active' },
                { value: false, name: 'Non Active' },
              ]}
              label='Status BI'
              name='active'
            />
            <CommonInput label='Sandi Kantor' name='branchCode' />
            <CommonInput label='Nama Lokasi' name='locationName' />
            <CommonInput label='Initial Cabang' name='branchInitial' />
            <CommonInput label='Kode GFMS' name='codeGFMS' type='alphanumeric' />
            <CommonInput type='select' options={areas} label='Nama Area' name='picAreaId' />
            <CommonInput type='select' options={areas} label='PIC Site' name='picSiteId' />
            <CommonInput label='Visitor' name='visitorPerDay' type='number' />
            <CommonInput type='select' label='Ruang ATM' name='boothType' options={dataRuangAtm} />
            <CommonInput
              type='select'
              options={valToNameArr(['Ya', 'Tidak'])}
              label='Akses Umum'
              name='publicAccessibility'
            />
            <CommonInput type='time' label='Jam Buka' name='startWorkHour' />
            <CommonInput type='time' label='Jam Tutup' name='endWorkHour' />
            <CommonInput label='ATM Bank Lain' name='aroundAtmBank' type='banklain' />
            <CommonInput type='select' options={acSugestions} label='AC' name='acType' />
            <CommonInput
              type='select'
              options={includesStrOpt}
              label='Kebersihan'
              name='cleanType'
            />
            <CommonInput
              type='select'
              options={jensKomList}
              label='Jenis Komunikasi'
              name='commType'
            />
            <Grid item xs={8} />
            <MediaPromosi />
          </Grid>
          <Typography className={classes.sectionTitle}>Detail Harga</Typography>
          <Grid container spacing={5}>
            <FieldBiayaSewa />
            <CommonInput label='Harga Sewa Tempat (Bulan)' name='monthlyRentCost' type='currency' />
            <CommonInput label='Keterangan Sewa' name='remark' />
            <CommonInput type='select' options={includesOpt} label='Pajak' name='taxIncluded' />
            <CommonInput
              label='Service Charge (Tahun)'
              name='yearlyServiceCharge'
              type='currency'
            />
            <CommonInput label='Sewa Lahan Vsat (Tahun)' name='antenaLandCost' type='currency' />
            <CommonInput label='Sewa Lahan Signage' name='yearlySignageCost' type='currency' />
            <CommonInput label='Biaya Notaris' name='notaryCost' type='currency' />
            <CommonInput label='Biaya Promosi' name='promotionCost' type='currency' />
            <CommonInput label='Biaya Konsesi' name='consessionCost' type='currency' />
            <CommonInput label='Biaya Lain - Lain' name='otherCost' type='currency' />
            <CommonInput label='Deposit Sewa' name='depositRent' type='currency' />
            <CommonInput
              label='Deposit Service Charge'
              name='depositServiceCharge'
              type='currency'
            />
            <CommonInput label='Deposit Listrik' name='depositElectricity' type='currency' />
            <CommonInput
              type='select'
              options={jenisListrikSugestions}
              label='Jenis Listrik'
              name='electricityType'
            />
            <CommonInput
              label='Harga Listrik (Tahun)'
              name='yearlyElectricityCost'
              type='currency'
            />
            <CommonInput
              type='select'
              options={valToNameArr(['Termin', 'Full-Payment'])}
              label='Cara Pembayaran'
              name='paymentType'
            />
            <CommonInput label='No Meteran' name='numberMeterElectricity' />
            <CommonInput label='Atas Nama' name='electricityOwnerName' />
          </Grid>
          <Typography className={classes.sectionTitle}>Detail Mesin</Typography>
          <Grid container spacing={5}>
            <CommonInput
              label='Pengajuan'
              name='machineType'
              type='select'
              options={valToNameArr(['ATM', 'CRM', 'MDM', 'CDM'])}
            />
            <CommonInput label='Jumlah Mesin Dilokasi' name='totalMachine' type='number' />
            <CommonInput label='Kategori Prioritas' name='priorityCategory' type='select' />
            <CommonInput label='Type Premises' name='locationBranchType' type='select' />
            <CommonInput
              type='date'
              label='Tgl Lapor Buka ke BI'
              name='biOpeningReportDate'
              isUnix
            />
            <CommonInput
              type='date'
              label='Tgl Lapor Tutup ke BI'
              name='biClosingReportDate'
              isUnix
            />
            <CommonInput
              type='date'
              label='Tgl Mesin Operasional'
              name='implementationDate'
              isUnix
            />
            <CommonInput label='Merk Mesin' name='brandName' type='select' />
            <CommonInput label='Type Mesin' name='typeAtm' type='select' />
            <CommonInput label='SN Mesin' name='snMachine' />
            <CommonInput
              label='Denominasi Mesin'
              name='denom'
              type='select'
              options={valToNameArr(['50', '100'])}
            />
            <CommonInput label='Potensi Model' name='potentialModel' type='select' />
          </Grid>
          <Typography className={classes.sectionTitle}>Detail Lokasi</Typography>
          <Grid container spacing={5}>
            <CommonInput label='Alamat' name='locationAddress' />
            <CommonInput
              label='Area'
              name='areaId'
              type='select'
              options={fieldOptions.area?.map(({ id, name }) => ({ value: id, name }))}
            />
            <CommonInput label='Provinsi' name='provinceId' type='select' options={provinces} />
            <CommonInput
              label='Kota'
              name='cityId'
              type='select'
              options={cities}
              disabled={!cities.length}
            />
            <CommonInput
              label='Kecamatan'
              name='districtId'
              type='select'
              options={districts}
              disabled={!districts.length}
            />
            <CommonInput label='Kelurahan' name='subDistrict' />
            <CommonInput label='Tipe Lokasi' name='locationType' type='select' />
            <CommonInput label='Sub Tipe Lokasi' name='subLocationType' />
            <CommonInput label='Kode POS' name='postalCode' />
            <CommonInput label='Kode Kabupaten' name='regencyCode' />
            <CommonInput label='Latitude' name='latitude' type='number' />
            <CommonInput label='Longitude' name='longitude' type='number' />
            <CommonInput label='Status Map' name='statusMap' type='select' />
            <CommonInput label='Luas Lahan / Lokasi' name='buildingLarge' />
            <CommonInput label='Jabodetabek / Outregion' name='jaboOut' type='select' />
          </Grid>
          <Typography className={classes.sectionTitle}>Detail Landlord</Typography>
          <Grid container spacing={5}>
            <CommonInput label='Nama Penanda Tangan LOO/ MOU' name='nameLandlord' />
            <CommonInput label='Nama Badan Usaha' name='corporateNameLandlord' />
            <CommonInput label='Alamat Email' name='emailLandlord' />
            <CommonInput label='No Telp' name='telephoneNumberLandlord' />
            <CommonInput label='Nama PIC Lokasi' name='namePicLocation' />
            <CommonInput label='No Telp PIC Lokasi' name='telephoneNumberPicLocation' />
            <CommonInput label='Email PIC Lokasi' name='emailPicLocation' />
            <CommonInput
              label='Rekening Bank'
              name='nameBank'
              type='select'
              options={bankList.map(({ title }) => ({ name: title, value: title }))}
            />
            <CommonInput label='Nomor Rekening' name='noRekeningPic' />
            <CommonInput label='Atas Nama' name='nameRekeningPic' />
          </Grid>
          <Typography className={classes.sectionTitle}>Detail Vendor</Typography>
          <Grid container spacing={5}>
            <CommonInput label='Pilihan Jarkom' name='providerName' type='select' />
            <CommonInput label='Vendor FLM' name='flmName' type='select' />
            <CommonInput label='Vendor SLM' name='slmName' type='select' />
            <CommonInput label='Nama Vendor Lokasi' name='locationBroker' />
            <CommonInput label='Vendor Kebersihan' name='janitorName' type='select' />
            <CommonInput label='Tempat Sampah' name='trashCan' type='select' />
            <CommonInput label='UPS' name='ups' />
            <CommonInput label='Vendor Listrik' name='electricityVendor' type='select' />
            <CommonInput label='No KWH / Pelanggan' name='kwhNumber' />
            <CommonInput label='Luas Ruangan (PxLxT)' name='roomArea' />
            <CommonInput label='Booth' name='boothModel' />
            <CommonInput label='Ukuran Booth (PxLxTxGKanxGKir)' name='boothSize' />
            <CommonInput label='Vendor CCTV' name='cctvName' type='select' />
            <CommonInput label='SN CCTV' name='snCctv' />
            <CommonInput label='SN DVR' name='snDvr' />
            <CommonInput label='Deep Skimming' name='deepSkimming' type='select' />
            <CommonInput label='PIN Cover' name='pinCover' type='select' />
            <CommonInput label='Vendor Pajak' name='taxName' type='select' />
            <CommonInput type='date' label='Pajak Akhir' name='endTaxDate' isUnix />
            <CommonInput label='Signage' name='signage' type='select' />
          </Grid>
          <Typography className={classes.photoSectionTitle}>Photo</Typography>
          <Grid container spacing={5} style={{ marginBottom: 80 }}>
            <ImageContainer title='Posisi Mesin' name='locationMachinePositionPhotos' />
            <ImageContainer title='Tampak Muka' name='locationFrontMachinePhoto' />
            <ImageContainer title='Layout' name='locationPhotosLayout' />
            <ImageContainer title='Posisi Neon Sign' name='locationPhotosPositionNeonSign' />
            <ImageContainer title='Posisi Atena VSAT' name='locationPhotosPositionAtenaVsat' />
          </Grid>
          <div
            style={{
              position: 'fixed',
              bottom: '0',
              width: '100%',
              left: '0',
              paddingLeft: '270px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                padding: 30,
              }}
            >
              <div>
                <ChkyButtons onClick={() => history.goBack()} buttonType='redOutlined'>
                  Cancel
                </ChkyButtons>
              </div>
              <div>
                <ChkyButtons onClick={handleSave}>Simpan</ChkyButtons>
              </div>
            </div>
          </div>
        </Paper>
        <ModalLoader isOpen={isLoading} />
      </div>
    </Provider>
  );
};

export default Edit;

const includesOpt = [
  { value: true, name: 'Include' },
  { value: false, name: 'Exclude' },
];
const acSugestions = [
  { value: '-', name: '- Pilih Jenis AC -' },
  { value: 'CIMB – Split', name: 'CIMB – Split' },
  { value: 'Landlord – Central', name: 'Landlord – Central' },
  { value: 'Landlord – Split', name: 'Landlord – Split' },
  { value: 'Landlord – Ruang Terbuka', name: 'Landlord – Ruang Terbuka' },
];

const jenisListrikSugestions = [
  { value: '-', name: '- Pilih Jenis Listrik -' },
  { value: 'CIMB - As per Usage - Token', name: 'CIMB - As per Usage - Token' },
  { value: 'CIMB - Vendor - Token', name: 'CIMB - Vendor - Token' },
  { value: 'CIMB - Vendor - Token - MCB', name: 'CIMB - Vendor - Token - MCB' },
  { value: 'CIMB - As per Usage - Pascabayar', name: 'CIMB - As per Usage - Pascabayar' },
  { value: 'CIMB - Vendor - Pascabayar', name: 'CIMB - Vendor - Pascabayar' },
  { value: 'CIMB - Vendor - Pascabayar - MCB', name: 'CIMB - Vendor - Pascabayar - MCB' },
  { value: 'Landlord - Lumpsum - Token', name: 'Landlord - Lumpsum - Token' },
  { value: 'Landlord - Include - Token', name: 'Landlord - Include - Token' },
  { value: 'Landlord - Lumpsum - Pascabayar', name: 'Landlord - Lumpsum - Pascabayar' },
  { value: 'Landlord - Include - Pascabayar', name: 'Landlord - Include - Pascabayar' },
];

const includesStrOpt = [
  { value: 'include', name: 'Include' },
  { value: 'exclude', name: 'Exclude' },
];

function valToNameArr(arr) {
  return arr.map((value) => ({ value, name: value }));
}
