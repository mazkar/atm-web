import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Grid, Menu } from '@material-ui/core';
import { Typography } from 'antd';
import { EmailIcon, EmailShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { ReactComponent as IconShare } from '../../../assets/icons/general/share.svg';

function ShareLink(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const shareUrl = window.location.href;
    
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <ButtonBase aria-controls="share-menu" aria-haspopup="true" onClick={handleClick}>
        <IconShare/>
      </ButtonBase>
      <Menu
        id="share-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Grid container spacing={2} style={{paddingLeft: 10, paddingRight: 10}}>
          <Grid item>
            <WhatsappShareButton url={shareUrl}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </Grid>
          <Grid item>
            <TelegramShareButton url={shareUrl}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </Grid>
          <Grid item>
            <EmailShareButton
              url={shareUrl}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </Grid>
        </Grid>
      </Menu>
    </div>
  );
}

ShareLink.propTypes = {};

export default ShareLink;
