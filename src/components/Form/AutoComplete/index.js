import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { AutoComplete } from 'antd';
import axios from 'axios';
import PropTypes from "prop-types";

const index = (props) => {
  const [options, setOptions] = React.useState([]);
  const [resData, setResData] = useState();
  const [value, setValue] = useState('');

  // useEffect(() => {
  const getList = () => {
    try {
      const url =
        props.fieldName === 'namaKota'
          ? `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getCities`
          : `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getAreas`;
      axios({
        url,
        method: props.fieldName === 'namaKota' ? 'GET' : 'POST',
        ...(props.fieldName !== 'namaKota' && {data:{"openingType" : props.openingType}})
      })
        .then((res) => {
          // console.log(res.data);
          const dataArray = Object.values(res.data.data);
          const cityNames = dataArray.map((val) => {
            return { value: val.name, id: val.id };
          });
          setResData(cityNames);
          // console.log(cityNames);
        })
        .catch((error) => {
          alert(error);
        });
    } catch {
      alert('Failed Get City');
    }
  };
  // },[]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onSearch = (searchText) => {
    const filtered = resData?.filter((val) => {
      return val.value.toLowerCase().includes(searchText.toLowerCase());
    });
    // console.log('search', searchText, filtered);
    setOptions(!searchText && filtered ? [] : filtered);
  };
  const onChange = (data) => {
    // console.log('<<<< CEK : ', props.keywordMaxLenght);
    let keyword = data;
    if (props.keywordMaxLenght !== undefined) {
      if (keyword.length > props.keywordMaxLenght) {
        keyword = keyword.slice(0, props.keywordMaxLenght);
      }
    }
    setValue(keyword);
    props.setNilai(keyword);
  };
  
  function onSelect(val, option){
    props.setNilaiId(option.id)
  }

  return (
    <>
      <Typography variant="p" component="p">
        <b>{props.label}</b>
      </Typography>
      <AutoComplete
        onFocus={getList}
        options={options}
        value={value}
        style={{
          paddingRight: 20,
          width: 170,
          //   borderRadius: 8,
          //   // height: 40
        }}
        // className={classes.inputAuto}
        onSelect={onSelect}
        onChange={onChange}
        onSearch={onSearch}
        disabled={props.disabled}
        dropdownClassName={props.dropdownClassName}
      />
    </>
  );
};

index.propTypes = {
  disabled: PropTypes.bool,
  openingType: PropTypes.string,
};
index.defaultProps = {
  disabled: false,
  openingType: "new",
  setNilaiId: ()=>{}
};

export default index;
