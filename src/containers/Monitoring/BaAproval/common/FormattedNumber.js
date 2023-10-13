import React from 'react';
import NumberFormat from 'react-number-format';

const FormattedNumber = (props) => {
  return <NumberFormat thousandSeparator='.' decimalSeparator=',' decimalScale={0} {...props} />;
};

export function TextRupiah({ value }) {
  return <FormattedNumber prefix='Rp.' displayType='text' value={value} />;
}

export function TextFormatted({ value }) {
  return <FormattedNumber displayType='text' value={value} />;
}

export default FormattedNumber;
