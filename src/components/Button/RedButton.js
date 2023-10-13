import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import * as Colors from '../../assets/theme/colors';
import { PrimaryHard } from '../../assets/theme/colors';

const styles = () => ({
  root: {
    backgroundColor: PrimaryHard,
    textTransform: 'capitalize',
    color: Colors.White,
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '18px',
    boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
    borderRadius: '6px',
    padding: '12px 20px',
  },
});

const UploadButton = (props) => {
  const { label, ...other } = props;

  return (
    <Button variant='contained' {...other}>
      {label}
    </Button>
  );
};

UploadButton.defaultProps = {
  label: 'Submit',
};

export default withStyles(styles)(UploadButton);
