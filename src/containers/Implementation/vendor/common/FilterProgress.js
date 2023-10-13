import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, FormControl, MenuItem, ButtonGroup } from "@material-ui/core";
import PropTypes from "prop-types";
import { Typography, Select } from "antd";
import axios from "axios";
import MuiButton from "../../../../components/Button/MuiButton";
import ChkyButtons from '../../../../components/chky/ChkyButtons';
import constants from "../../../../helpers/constants";
import * as Colors from "../../../../assets/theme/colors";
import InputBase from "@material-ui/core/InputBase";
import constansts from "../../../../helpers/constants";
import BtnGroupItem from './BtnGroupItem';
import LoadingView from "../../../../components/Loading/LoadingView";
import SearchBar from "./searchBar";

const { Option } = Select;

const styles = () => ({
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px",
  },
  titleTextFilter: {
    fontWeight: "bold",
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "13px",
    lineHeight: "16px",
    color: "#2B2F3C",
  },
  label: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#2B2F3C",
  },
  select: {
    minWidth: 120,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  iconButton: {
    padding: 5,
    color: Colors.GrayMedium,
  },
  wrapperInputSearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // width: (width) => width,
    borderRadius: 6,
    backgroundColor: Colors.White,
    height: 35,
    border: `1px solid ${constansts.color.grayMedium}`,
    boxShadow: "none",
  },
  inputSearch: {
    marginLeft: 8,
    flex: 1,
    color: "#BCC8E7",
    fontSize: 13,
    width: 100,
    "& ::placeholder": {
      color: "#BCC8E7",
      opacity: 1,
      fontStyle: "italic",
    },
    border: 2,
    borderColor: constansts.color.grayMedium,
  },
  inputFieldSelect:{
    border: '1px solid #A8B6DB',
    borderRadius: '0px 6px 6px 0px',
    boxSizing: 'border-box',
    padding: '10px',
    // color: '#A8B6DB',
    fontFamily: 'Barlow',
    width: 320,
    height: '41px',
    '& ::placeholder': {
      color: '#A8B6DB'
    },
    '& ::selection': {
      background: '#FF6130'
    },
    '&:hover': {
      border: '1px solid #A8B6DB',
    },
  },
  selectKonven: {
    "& .ant-select-single .ant-select-selector": {
        height: '109%',
        border: '1px solid #BCC8E7',
        backgroundColor: "#DC241F",
        paddingTop: '5px',
        paddingBottom: '4px',
        color: "#FFFF",
        borderRadius: '6px 0px 0px 6px',
        minWidth: 150
    },
    "& .ant-select-single .ant-select-arrow": {
        color: "#FFFF",
        transition: 'transform 0.2s ease-in'
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
        transform: 'rotate(180deg)',
        transition: 'transform 0.2s ease-in'
    }
  },
});

const index = (props) => {
  const {
    onFilterSubmit,
    handleReset,
    classes,
    selectedSearch,
    setSelectedSearch,
    inputSearch,
    setInputSearch,
    setSelectedKebutuhan,
    isOpening,
    itemSearch
  } = props;

  const [isFilterActive, setIsFilterActive] = useState(false)
  const openings = ['All', 'Todo', 'Doing', 'Done'];
  const [openingType, setOpeningType] = useState('All');

  const onChangeSelectSearch = (e) => {
    const value = e;
    setSelectedSearch(value);
  };

  const onChangeInputSearch = (e) => {
    const value = e.target.value;
    setInputSearch(value);
  };

  function resetFilter(){
    setOpeningType('All')
    setSelectedSearch('All')
    setInputSearch('')
    setSelectedKebutuhan('All')
    setIsFilterActive(false)
    handleReset()
  }

  return (
    <Paper className={classes.filterSection}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Typography className={classes.titleTextFilter}>
                Show :{" "}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                <div style={{display: "flex"}}>
                  <FormControl className={classes.selectKonven}>
                    <Select
                      value={selectedSearch}
                      onChange={onChangeSelectSearch}
                    >
                      <Option value="All">All</Option>
                      {itemSearch.map((item) => {
                        return (
                          <Option value={item.value} onClick={() => setIsFilterActive(true)}>
                            {item.text}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <SearchBar
                      placeholder="Search... " 
                      width={233}
                      value={inputSearch}
                      onChange={onChangeInputSearch}
                  />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {isOpening ? <Grid item>
                <Grid container alignItems="center">
                    <Grid item>
                    <div style={{display: "flex"}}>
                    <ButtonGroup variant='contained' disableElevation style={{ margin: '0 0px', height: '41px' }}>
                        {openings.map((val, i) => (
                        <BtnGroupItem 
                            key={i} 
                            disabled={val === openingType}
                            style={{width: 80}}
                            onClick={() => {setOpeningType(val); setIsFilterActive(true);}}
                            >
                            {val}
                        </BtnGroupItem>
                        ))}
                    </ButtonGroup>
                    </div>
                    </Grid>
                </Grid>
            </Grid> : null}
          </Grid>
        </Grid>
        <Grid item>
                <Grid container justify='flex-end'>
                    <ChkyButtons
                        onClick={resetFilter}
                        height={41}
                        buttonType='redOutlined'
                        style={{ textTransform: "capitalize", visibility: isFilterActive ? 'visible' : 'hidden', marginTop: 11}}
                    >
                        Reset
                    </ChkyButtons>
                    <MuiButton 
                        label="Apply" 
                        style={{height: '41px'}} 
                        onClick={()=>{
                            onFilterSubmit();
                            setIsFilterActive(true)
                        }} 
                    />
                </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
index.propTypes = {
  classes: PropTypes.object.isRequired,
  captionD: PropTypes.string,
  onFilterSubmit: PropTypes.func,
  isOpening: PropTypes.bool
};

const itemSearch = [
  {
    text: 'ATM ID',
    value: 'atm'
  },
  {
    text: 'Tanggal Submit',
    value: 'submit_date'
  },
  {
    text: 'ID Submit',
    value: 'submit_id'
  },
  {
    text: 'Nama Lokasi',
    value: 'location_name'
  },
  {
    text: 'Type Mesin',
    value: 'type'
  },
  {
    text: 'PIC Request',
    value: 'request_pic'
  },
  {
    text: 'Tanggal Ready',
    value: 'ready_date'
  },
  {
    text: 'Tanggal Aktivasi',
    value: 'activation_date'
  },
  {
    text: 'SLA',
    value: 'sla'
  }
];

index.defaultProps = {
  captionD: "Status",
  isOpening: true,
  itemSearch,
  onFilterSubmit: ()=>{},
  handleReset: ()=>{}
};

export default withStyles(styles)(index);