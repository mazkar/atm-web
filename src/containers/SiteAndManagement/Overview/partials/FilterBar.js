import React, { useEffect, useState, useContext } from 'react';
import {
  Typography,
  Paper,
  Button,
  InputBase,
  ButtonGroup,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Axios from 'axios';

import { ReactComponent as DropDownIcon } from '../../../../assets/icons/general/dropdown_red.svg';
import { PrimaryHard } from '../../../../assets/theme/colors';
import BtnGroupItem from './BtnGroupItem';
import constants from '../../../../helpers/constants';
import { thisYear, SiteManOvContext } from '../index';
import { RootContext } from '../../../../router';
const { apiHost } = constants;

const useStyles = makeStyles((theme) => ({
  select: {
    padding: '0 10px',
    '& .MuiSelect-icon': {
      top: 'unset',
      right: 5,
    },
    '&:last-child': {
      paddingRight: 0,
    },
  },
  applyBtn: {
    marginLeft: 'auto',
    fontSize: 15,
    textTransform: 'capitalize',
    backgroundColor: PrimaryHard,
    color: 'white',
    padding: '11px 20px',
    visibility: 'hidden',
  },
  applyBtnLabel: {
    height: '18px',
  },
}));

const FilterBar = (props) => {
  const { isDetailMap } = props;
  const classes = useStyles();
  const { userAreas: contextUserAreas } = useContext(RootContext);
  const {
    areas,
    handleSelectArea,
    selectedArea,
    handleSelectPicSite,
    selectedPicSite,
  } = useContext(SiteManOvContext);
  const [openingType, setOpeningType] = useState('New');
  const [year, setYear] = useState(thisYear + '');
  const [city, setCity] = useState('All');
  const [cities, setCities] = useState(defaultCities);
  const [areaOptions, setAreaOptions] = useState([]);
  const [picSiteOptions, setPicSiteOptions] = useState([]);
  const [month, setMonth] = useState('All');

  const userAreas = contextUserAreas.length > 0 ? contextUserAreas : areas.map(({ id }) => id);
  const userAreasStr = userAreas.toString();

  function handleClickFilterBtn() {
    props.applyFilter({ openingType, year, month, cityId: city });
  }
  function handleChangeYear(e) {
    setYear(e.target.value);
  }
  function handleChangeMonth(e) {
    setMonth(e.target.value);
  }
  function handleChangeCity(e) {
    setCity(e.target.value);
  }
  useEffect(() => {
    // executed ketika filter berubah
    handleClickFilterBtn();
  }, [openingType, year, city, month]);
  useEffect(() => {
    if (!isDetailMap) {
      setCity('All');
    }
  }, [isDetailMap]);

  useEffect(() => {
    // console.log(userAreasStr, areas);
    if (userAreasStr.length > 0 && areas.length > 0) {
      const mapped = areas.filter(({ id }) => userAreas.includes(id));
      const allOption =
        userAreas.length === 1
          ? []
          : [
              {
                id: userAreasStr,
                name: 'All Area',
              },
            ];
      setAreaOptions([...allOption, ...mapped]);
    }
    if (areas.length > 0) {
      setPicSiteOptions([
        {
          id: 'All',
          name: 'All PIC Site',
        },
        ...areas,
      ]);
    }
  }, [userAreasStr, areas]);

  useEffect(() => {
    if (props.picAreaId) {
      Axios.get(`${apiHost}/citiesByPicArea?picAreaId=${props.picAreaId}`)
        .then((res) => {
          // console.log(res.data);
          if (res.data.statusCode === 200) {
            let { data = [] } = res.data ? res.data : [];
            setCities([...defaultCities, ...data]);
          } else {
            setCities(defaultCities);
          }
        })
        .catch((err) => {
          // console.log(err);
          setCities(defaultCities);
        });
    } else {
      setCities(defaultCities);
    }
  }, [props.picAreaId]);

  return (
    <Paper
      style={{
        padding: '10px 20px',
        fontSize: 13,
        boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: '1001',
      }}
    >
      <Typography component='b' style={{ fontWeight: 600 }}>
        Showing :
      </Typography>
      <ButtonGroup variant='contained' disableElevation style={{ margin: '0 10px' }}>
        {openings.map((val, i) => (
          <BtnGroupItem key={i} disabled={val === openingType} onClick={() => setOpeningType(val)}>
            {val}
          </BtnGroupItem>
        ))}
      </ButtonGroup>
      <CustomSelect onChange={handleChangeYear} value={year} options={tahuns} />
      <CustomSelect onChange={handleChangeMonth} value={month} options={bulans} />
      <CustomSelect
        onChange={handleSelectPicSite}
        value={selectedPicSite}
        options={picSiteOptions}
        disabled={!areas.length}
      />
      {!isDetailMap && (
        <CustomSelect
          onChange={handleSelectArea}
          value={selectedArea}
          options={areaOptions}
          disabled={areaOptions.length === 0}
        />
      )}
      {isDetailMap && (
        <>
          <span style={{ marginLeft: 10 }}>City:</span>
          <span>
            <CustomSelect onChange={handleChangeCity} value={city} options={cities} />
          </span>
        </>
      )}
      <Button
        variant='contained'
        disabled
        disableElevation
        classes={{ root: classes.applyBtn, label: classes.applyBtnLabel }}
        onClick={handleClickFilterBtn}
      >
        Apply Filter
      </Button>
    </Paper>
  );
};

export default FilterBar;

const openings = [/* 'All', */ 'New', 'Renewal', 'Termin', 'Replace'];

const sekarang = new Date();
const tahunIni = sekarang.getFullYear();
const tahuns = [];
for (let i = 0; i < 3; i++) {
  tahuns.push({ id: tahunIni - i + '', name: tahunIni - i + '' });
}

const bulans = [
  { id: 'All', name: 'Yearly', nameId: 'Tahunan', nameEn: 'Yearly' },
  { id: 1, name: 'Januari', nameId: 'Januari', nameEn: 'January' },
  { id: 2, name: 'Februari', nameId: 'Februari', nameEn: 'February' },
  { id: 3, name: 'Maret', nameId: 'Maret', nameEn: 'March' },
  { id: 4, name: 'April', nameId: 'April', nameEn: 'April' },
  { id: 5, name: 'Mei', nameId: 'Mei', nameEn: 'May' },
  { id: 6, name: 'Juni', nameId: 'Juni', nameEn: 'June' },
  { id: 7, name: 'Juli', nameId: 'Juli', nameEn: 'July' },
  { id: 8, name: 'Agustus', nameId: 'Agustus', nameEn: 'August' },
  { id: 9, name: 'September', nameId: 'September', nameEn: 'September' },
  { id: 10, name: 'Oktober', nameId: 'Oktober', nameEn: 'October' },
  { id: 11, name: 'November', nameId: 'November', nameEn: 'November' },
  { id: 12, name: 'Desember', nameId: 'Desember', nameEn: 'Desember' },
];

const defaultCities = [{ id: 'All', name: 'All' }];

export const CustomSelect = (props) => {
  const classes = useStyles();
  return (
    <FormControl className={clsx(classes.select, props.className)}>
      <Select
        value={props.value}
        input={<BootstrapInput />}
        IconComponent={DropDownIcon}
        onChange={props.onChange}
        style={props.style}
        disabled={props.disabled}
      >
        {props.options.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #BCC8E7',
    fontSize: 13,
    padding: '6px 12px 6px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 8,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
