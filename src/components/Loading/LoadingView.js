import React from 'react';
import PropTypes from 'prop-types';
import ImageLoading from '../../assets/images/Spinner.gif';

const LoadingView = (props) => {
  const { maxheight, height, width, isTransparent } = props;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: maxheight !== undefined ? maxheight : 'calc( 100vh - 64px )',
        backgroundColor: isTransparent ? 'transparent': 'white',
        zIndex: 10,
        textAlign: 'center',
      }}
    >
      <img
        style={{
          maxheight: height,
          maxWidth: width
        }}
        src={ImageLoading}
        alt={'ImageLoading... '}
      />
    </div>
  );
};

LoadingView.propTypes = {
  maxheight: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  isTransparent: PropTypes.bool,
}

LoadingView.defaultProps = {
  maxheight: '100%',
  height: '90px',
  width: '90px',
  isTransparent: false,
}

export default LoadingView;
