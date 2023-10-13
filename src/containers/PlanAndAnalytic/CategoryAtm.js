import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ComonSelect from "../../components/Selects/CommonSelect";

const useStyles = makeStyles({
  root: {
    padding: 2,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 10,
    marginLeft: 10,
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  col: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    marginRight: 2,
  },
});

const typeSugestions = [
  { id: 0, value: "Prominent", nameId: "Prominent", nameEn: "Prominent" },
  { id: 1, value: "Branding", nameId: "Branding", nameEn: "Branding" },
  { id: 2, value: "High SA", nameId: "High SA", nameEn: "High SA" },
  { id: 3, value: "Medium SA", nameId: "Medium SA", nameEn: "Medium SA" },
  { id: 4, value: "High Usage", nameId: "High Usage", nameEn: "High Usage" },
  {
    id: 5,
    value: "Medium Usage",
    nameId: "Medium Usage",
    nameEn: "Medium Usage",
  },
  {
    id: 6,
    value: "High Revenue",
    nameId: "High Revenue",
    nameEn: "High Revenue",
  },
  {
    id: 7,
    value: "Medium Revenue",
    nameId: "Medium Revenue",
    nameEn: "Medium Revenue",
  },
  {
    id: 8,
    value: "Low Performance",
    nameId: "Low Performance",
    nameEn: "Low Performance",
  },
  { id: 9, value: "Unrated", nameId: "Unrated", nameEn: "Unrated" },
];
const typeSugestionsOnpromises = [
  { id: 10, value: "Conventional", nameId: "Conventional", nameEn: "Conventional" },
  { id: 11, value: "Syariah", nameId: "Syariah", nameEn: "Syariah" },
];

const CategoryAtm = ({ onChangeModelType, locationMode, modelType }) => {
  const { root, col, title } = useStyles();
  const [valueCategory, setValueCategory] = useState("Conventional");

  const handleChange = (e) => {
    setValueCategory(e);
    onChangeModelType(e);
    console.log("CATEGORY CHECK", e);
  };

  useEffect(() => {
    if(locationMode == "OFF"){
      if(modelType){
        if(typeSugestions.find(obj => obj.value == modelType)){
          setValueCategory(modelType);
        }else{
          setValueCategory("Prominent");
          onChangeModelType("Prominent");
        }
      }
    }else{
      if(modelType){
        if(typeSugestionsOnpromises.find(obj => obj.value == modelType)){
          setValueCategory(modelType);
        }else{
          setValueCategory("Conventional");
          onChangeModelType("Conventional");
        }
      }
    };
  }, [locationMode, modelType]);

  useEffect(() => {
    var useGetDraft = localStorage.getItem("useGetDraft");
    if (useGetDraft) {
      var getItem = localStorage.getItem("dataGetDraftDetail");
      if (getItem) {
        var parseItem = JSON.parse(getItem);
        setValueCategory(
          parseItem.modelTeam !== null ? parseItem.modelTeam : "Conventional"
        );
        onChangeModelType(
          parseItem.modelTeam !== null ? parseItem.modelTeam : "Conventional"
        );
        localStorage.setItem("dataGetDraftDetail", JSON.stringify(parseItem));
      }
    }
  }, []);

  return (
    <div className={root}>
      <label style={{ fontSize: "13px", fontWeight: 400 }}>Category :</label>
      <div className={col}>
        <ComonSelect
          suggestions={
            locationMode == "OFF" ? typeSugestions : typeSugestionsOnpromises
          }
          defaultValue={valueCategory}
          value={valueCategory}
          width="230px"
          bordered
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};
CategoryAtm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  captionD: PropTypes.string,
};

CategoryAtm.defaultProps = {
  captionD: "Status",
};

export default CategoryAtm;
