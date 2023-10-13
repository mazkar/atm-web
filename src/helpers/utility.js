import numeral from 'numeral';

var util = {};
// other
numeral.register('locale', 'id', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'rb',
    million: 'jt',
    billion: 'M',
    trillion: 'T',
  },
  ordinal: function (number) {
    return 'ke';
  },
  currency: {
    symbol: 'Rp',
  },
});

numeral.locale('id');

util.numeral = numeral;

export default util;
