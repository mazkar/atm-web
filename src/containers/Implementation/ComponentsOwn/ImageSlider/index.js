/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import AtmLayoutImg from '../../../../assets/images/atmLayout.png';
import constants from '../../../../helpers/constants';
import NextIcon from '../../../../assets/icons/duotone-red/arrow-next.svg';
import PrevIcon from '../../../../assets/icons/duotone-red/arrow-prev.svg';

const useStyles = makeStyles({
  root: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: 180,
    '& .slick-next': {
      background: `url(${NextIcon}) center center no-repeat !important`,
      top: '45%',
    },
    '& .slick-next:before': {
      color: constants.color.primaryHard,
      display: 'none',
    },
    '& .slick-prev': {
      background: `url(${PrevIcon}) center center no-repeat !important`,
      top: '45%',
    },
    '& .slick-prev:before': {
      color: constants.color.primaryHard,
      display: 'none',
    },
  },
  
});
  
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
SamplePrevArrow.propTypes = {
  className: PropTypes.any.isRequired,
  style: PropTypes.any.isRequired,
  onClick: PropTypes.any.isRequired,
};

const settingsSlider = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const dataDummy =[
  {"img":AtmLayoutImg, "title":"Layout Penempatan Mesin"},
  {"img":AtmLayoutImg, "title":"Layout Penempatan Mesin 2"},
  {"img":AtmLayoutImg, "title":"Layout Penempatan Mesin 3"},
];
function SliderImage(props) {
  const classes = useStyles();
  const {dataImages} = props;

  return (
    <div className={classes.root}>
      <Slider {...settingsSlider}>
        {dataImages.map((image) => {
          return (
            <div style={{ textAlign: 'center', }}>
              <img src={image.img} alt="img" style={{width:'100%'}}/>
              <Typography style={{fontSize: 12, textAlign: 'center', marginTop: 10 }}>{image.title}</Typography>
            </div>);
        })}
      </Slider>
    </div>
  );
}

SliderImage.propTypes = {
  dataImages: PropTypes.array,
};
SliderImage.defaultProps = {
  dataImages: dataDummy,
};

export default SliderImage;

