/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Tab, Tabs } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import axios from 'axios';
import SelectWithCaptions from '../../../components/Selects/SelectWithCaptions';
import MuiButton from '../../../components/Button/MuiButton';
import constants from '../../../helpers/constants';
import LoadingView from '../../../components/Loading/LoadingView';

const styles = () => ({
  root: {
    padding: 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 'auto',
  },
  title: {
    fontWeight: 'bold',
    marginRight: 30,
  },
  filterSection: {
    padding: '10px 20px 10px 20px',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
});

const useTabsStyles = makeStyles({
  root: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
  },
  indicator: {
    display: 'none',
  },
});
const useTabItemStyles = makeStyles({
  root: {
    minHeight: 40,
    minWidth: 120,
    padding: '7px 10px',
  },
  selected: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapper: {
    textTransform: 'none',
  },
});

const defaultDistricts = [
  { value: '', nameId: 'All' },
]

const index = (props) => {
  const { onFilterSubmit, classes, withUpDown } = props;

  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataFilter, setDataFilter] = useState(null);
  const [dataFilterCity, setDataFilterCity] = useState([
    { value: '', nameId: 'All' },
  ]);
  const [dataFilterDistrict, setDataFilterDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectCity, setSelectCity] = useState('');
  const [medical, setMedical] = useState('')

  const [selectedTab, setSelectedTab] = useState("up");
  const tabsClasses = useTabsStyles();
  const tabItemClasses = useTabItemStyles();
  const tabsStyles = {
    root: tabsClasses.root,
    indicator: tabsClasses.indicator,
  };

  const tabItemStyles = {
    root: tabItemClasses.root,
    selected: tabItemClasses.selected,
    wrapper: tabItemClasses.wrapper,
  };

  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
  };

  const handleMedOnChange = (event) => {
    setMedical(event);
  };

  function handleDistrictChange(x){
    setSelectedDistrict(x)
  }

  const handleCityOnChange = (event) => {
  // console.log('ubah city', event);
    setSelectCity(event);
  };

  const changeDataFilter = () => {
    setDataFilter({
      cityId: selectCity === ' ' ? '' : selectCity + '',
      districtId: selectedDistrict,
      selectedTab,
      medical
    });
  };

  useEffect(() => {
    // console.log(`==> dari Filter Component ${JSON.stringify(dataFilter)}`);
    if (dataFilter!==null){
      onFilterSubmit(dataFilter);
    }
  }, [dataFilter]);

  useEffect(() => {
    getFilterCity();
  }, []);

  useEffect(() => {
    if(selectCity){
      getFilterDistrict()
    }
  }, [selectCity])

  const getFilterDistrict = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      setModalLoader(true);
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/districtByCity?cityId=${selectCity}`,
        config
      );

      const dataAreaNew = result.data.data;
      const mapped = dataAreaNew.map((item) => {
        return {
          id: item.id,
          value: item.id,
          nameEn: item.name,
          nameId: item.name,
        };
      });
      setDataFilterDistrict([...defaultDistricts, ...mapped]);
      setModalLoader(false);
    // console.log(`CITY AREA LIST ====> : ${JSON.stringify(dataArea)}`);
    } catch (error) {
      setModalLoader(false);
      setDataFilterDistrict([])
      console.log(`Error Fetching City List : \n ${error}`);
    }
  };

  const getFilterCity = async () => {
    const dataCity = [{ id: '', value: '', nameId: 'All', nameEn: 'All' }];
    try {
      setModalLoader(true);
      const result = await axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/cities`,
        method: 'POST',
        data: {openingType: "All"}
      });
      // console.log('---SELECT AREA---', selectArea);
      const dataCityNew = result.data.data;
      // console.log('CITY AREA LIST ====> : ', dataCityNew);
      dataCityNew.map((item) => {
        const newCity = {
          id: item.id,
          value: item.id,
          name: item.name,
          nameId: item.name,
        };
        return dataCity.push(newCity);
      });
      setDataFilterCity(dataCity);
      // setSelectCity(dataCity[0]);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      console.log(`Error Fetching Area List : \n ${error}`);
    }
  };

  return (
    <Paper className={classes.filterSection}>
      <div className={classes.root}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Typography style={{ marginRight: 10, fontSize: 13, fontWeight: 600 }}>Showing : </Typography>
              </Grid>
              {withUpDown&&<Grid item>
                <Tabs
                  classes={tabsStyles}
                  value={selectedTab}
                  onChange={handleSelectedTab}
                >
                  <Tab classes={tabItemStyles} value="up" label="Trend Up" />
                  <Tab classes={tabItemStyles} value="down" label="Trend Down" />
                </Tabs>
              </Grid>}
              {isOpenModalLoader? 
                <Grid item style={{marginLeft: 150}}>
                  <LoadingView height={40} width={40} />
                </Grid>
                : 
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <SelectWithCaptions
                        bordered
                        caption="City"
                        suggestions={dataFilterCity !== null ? dataFilterCity : []}
                        defaultValue={selectCity}
                        handleChange={handleCityOnChange}
                        width="150px"
                        // disabled={disableCity}
                      />
                    </Grid>
                    <Grid item>
                      <SelectWithCaptions
                        bordered
                        caption="Kecamatan"
                        suggestions={dataFilterDistrict !== null ? dataFilterDistrict : []}
                        defaultValue={''}
                        handleChange={handleDistrictChange}
                        width="150px"
                        disabled={!selectCity}
                      />
                    </Grid>
                    <Grid item>
                      <SelectWithCaptions
                        bordered
                        caption="Med"
                        suggestions={medOptions}
                        defaultValue={'Bad'}
                        handleChange={handleMedOnChange}
                        width="150px"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              
              }
              
            </Grid>
          </Grid>
          <Grid item>
            <MuiButton label="Apply Filter" onClick={changeDataFilter} />
          </Grid>
        </Grid>
      </div>
      {/* <ModalLoader isOpen={isOpenModalLoader} /> */}
    </Paper>
  );
};
index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  captionD: PropTypes.string,
  onFilterSubmit: PropTypes.func,
};

index.defaultProps = {
  captionD: 'Status',
};

export default withStyles(styles)(index);

const medOptions=[
  {
    id: 'Good',
    value: 'Good',
    name: 'Good',
    nameId: 'Good',
  },
  {
    id: 'Bad',
    value: 'Bad',
    name: 'Bad',
    nameId: 'Bad',
  },
]