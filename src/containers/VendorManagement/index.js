import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core";
import Overview from "./Overview/index"

function index(props) {
  return (
   /*<div>
      <Typography>Overview Vendor Management</Typography>
    </div>*/
   <Overview/>
  );
}

index.propTypes = {

};

export default index;

