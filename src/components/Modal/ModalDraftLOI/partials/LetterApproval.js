/* eslint-disable import/no-useless-path-segments */
import { Grid, Typography } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { DatePicker } from "antd";
import moment from "moment";
import constansts from "../../../../helpers/constants";
import CommonSelect from "../../../../components/Selects/CommonSelect";
import DateSelect from "../../../../components/Selects/DateSelect";
import NumberInput from "../../../../components/chky/IdrNumberInput";
import RupiahConverter from "../../../../helpers/useRupiahConverter";
import { ReactComponent as CalendarIcon } from "../../../../assets/images/calendar-alt.svg";

const dateFormat = "DD/MM/YYYY";

const LetterApproval = (props) => {
  const {
    margin1,
    margin2,
    fontSize,
    input,
    price,
    priceList,
    flatCost,
    handlePrice,
    tenancies,
    valueTenancies,
    handleTenancy,
    periode,
    handlePeriode,
  } = props;
  const [priceListArray, setpriceListArray] = useState([]);
  useEffect(() => {
    if(priceList!==null){
      const dataPriceList = priceList;
      const arrayData = dataPriceList.replace("[", "").replace("]", "").split(",");
      setpriceListArray(arrayData);
    }
  }, [priceList]);
  const { t } = useTranslation();
  return (
    <div>
      <Grid item className={margin1}>
        <Typography className={fontSize}>
          {t("modal.rbbImplementation.LOI.letter.content.two")}
        </Typography>
      </Grid>
      <Grid container direction="row" className={margin2}>
        <Grid item>
          <Typography className={fontSize} style={{ marginBottom: 5 }}>
            {t("modal.rbbImplementation.LOI.letter.content.price")}
          </Typography>
          {/* {
            flatCost===false 
            ?
              <> */}
          {
            priceListArray.map((row,idx)=>{
              return(
                <Grid container direction="row" style={{marginTop:5}}>
                  {/* <input className={input} value={RupiahConverter(price)} onChange={handlePrice} /> */}
                  <Typography
                    className={fontSize}
                    style={{ marginTop: 12, marginLeft: 5, marginRight: 5 }}
                  >
                          Tahun ke - {(idx+1)}
                  </Typography>
                  <NumberInput
                    // onValueChange={handlePrice}
                    prefix="Rp."
                    className={input}
                    value={RupiahConverter(row)}
                    disabled
                  />
                  <Typography
                    className={fontSize}
                    style={{ marginTop: 12, marginLeft: 5, marginRight: 50 }}
                  >
                    {t("modal.rbbImplementation.LOI.letter.content.unit")}
                  </Typography>
                </Grid>
              );
            })
          }
          {/* </>
            :
              <Grid container direction="row">
                
                <NumberInput
                  onValueChange={handlePrice}
                  prefix={"Rp."}
                  className={input}
                  value={RupiahConverter(price)}
                  disabled={true}
                />
                <Typography
                  className={fontSize}
                  style={{ marginTop: 12, marginLeft: 5, marginRight: 106 }}
                >
                  {t("modal.rbbImplementation.LOI.letter.content.unit")}
                </Typography>
              </Grid>
          } */}
        </Grid>
        <Grid item style={{ marginRight: 20 }}>
          <Typography className={fontSize} style={{ marginBottom: 5 }}>
            {t("modal.rbbImplementation.LOI.letter.content.tenancy")}
          </Typography>
          {/* <CommonSelect bordered suggestions={tenancies} value={tenancies} width='140px' handleChange={handleTenancy} color={constansts.color.dark} /> */}
          <CommonSelect
            bordered
            suggestions={tenancies}
            width="140px"
            handleChange={handleTenancy}
            color={constansts.color.dark}
            value={valueTenancies}
            disable
          />
        </Grid>
        <Grid item>
          <Typography className={fontSize} style={{ marginBottom: 5 }}>
            {t("modal.rbbImplementation.LOI.letter.content.periode")}
          </Typography>
          {/* <DateSelect defaultValue={1516294800000} handleChange={handlePeriode} width='140px' popupStyle={{ zIndex: 1700 }} formatView='DD MMM YYYY' /> */}
          <DatePicker
            className="DateSelect"
            defaultValue={moment(periode, dateFormat)}
            format="DD MMM YYYY"
            onChange={handlePeriode}
            popupStyle={{ zIndex: 1700 }}
            style={{ width: "140px" }}
            clearIcon
            suffixIcon={<CalendarIcon className="DateSelect__icon" />}
            disabled
            allowClear={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default LetterApproval;
