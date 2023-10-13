import React from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PrimaryHard } from '../../../../assets/theme/colors';

const LoadingOverlayWrapper = (props) => {
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {props.children}
      {props.open && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,.5)',
            width: '100%',
            height: '100%',
            top: 0,
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              textAlign: 'center',
            }}
          >
            {props.isReloadShown ? (
              <>
                <div style={{ color: 'white' }}>
                  {props.message ? props.message : 'Something is wrong.'}
                </div>
                <Button variant="contained" onClick={props.reloadBtnAction}>
                  Reload
                </Button>
              </>
            ) : (
              <CircularProgress style={{ color: PrimaryHard }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingOverlayWrapper;
