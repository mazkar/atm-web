import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import SelectLeftCustomIcon from '../../../../../components/Selects/SelectItemsIcon';
import { ReactComponent as UserIcon } from "../../../../../assets/icons/linear-red/user.svg";
import { doGetVendors } from '../../../../UserManagement/ApiServicesUser';
import { GrayHard } from '../../../../../assets/theme/colors';

function SelectVendor({label = "PIC / Vendor", value = "-", onChange, disabled = false}) {

  const [vendorsOption, setVendorsOption] = useState([{value: '-', name: "-Pilih Vendor-"}]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);
  
  function loadVendorsHandler(bool){
    setIsLoadVendors(bool);
  }
  // GET OPTION VENDORS
  useEffect(() => {
    doGetVendors(loadVendorsHandler).then(response=>{
      // console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
      if(response?.length > 0){
        const options = [{value: '-', name: "-Pilih Vendor-"}];
        // eslint-disable-next-line array-callback-return
        response.map((item)=>{
          const newObj = {value: item.id, name: item.name};
          options.push(newObj);
        });
        setVendorsOption(options);
      }
    });
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography
          style={{
            fontWeight: '600',
            fontSize: '13px',
            lineHeight: '16px',
            color: GrayHard,
            marginBottom: 10,
          }}
        >
          {label}
        </Typography>
      </Grid>
      <Grid item>

        {isLoadVendors? (<Typography style={{padding: 10}}>Loading...</Typography>): (
          <SelectLeftCustomIcon
            disabled={disabled}
            leftIcon={<UserIcon style={{height: 20}}/>}
            selectOptionData={vendorsOption}
            selectedValue={value}
            onSelectValueChange={onChange}/>
        )}
      </Grid>
    </Grid>
  );
}

SelectVendor.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SelectVendor;

