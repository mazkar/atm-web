/* eslint-disable react/forbid-prop-types */
import React from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./style.css";
// import { SearchOutlined } from '@ant-design/icons';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import * as Colors from "../../../../../../assets/theme/colors";

// const { Option } = Select;
// const { Search } = Input;

const styles = {
  iconButton: {
    padding: 5,
    color: Colors.GrayMedium,
  },
};

function SearchAtm(props) {
  const { classes, onChange, onActionClicked, atmID } = props;
  function onSubmitKeyword(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onActionClicked();
    }
  }
  // console.log("atm id on component search atm", atmID);
  return (
    <div>
      <div className="edit-new-atm-container">
        <div className="input-form">
          <div style={{ borderRadius: 8, height: 40 }}>
            <Input
              // style={{ height: 80 }}
              // type="number"
              value={atmID}
              addonBefore="ID"
              suffix={
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon onClick={onActionClicked} />
                </IconButton>
              }
              placeholder="ID"
              onKeyDown={onSubmitKeyword}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

SearchAtm.propTypes = {
  classes: PropTypes.object.isRequired,
  atmID: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onActionClicked: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchAtm);
