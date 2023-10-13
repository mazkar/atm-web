import React from "react";
import { TimePicker } from "antd";
import { Grid } from "@material-ui/core";

const PickerTime = (props) => {
  return (
    <Grid item>
      <TimePicker
        className="DateSelect"
        format="HH:mm"
        onChange={props.onChange}
        clearIcon
        placeholder="Hour : Minutes"
        suffixIcon={null}
        allowClear={false}
        style={{ height: 34, width: 150, marginTop: 5, marginRight: 5 }}
        getPopupContainer={(triggerNode) => {
          return triggerNode.parentNode;
        }}
      />
    </Grid>
  );
};

export default PickerTime;
