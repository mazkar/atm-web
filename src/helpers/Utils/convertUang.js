import formatter from "../useThousandSeparator";
export default (value) => {
  let hasil = value;
  if (value) {
    const lengthValue = value.toString().length;
    if (lengthValue >= 6) {
      const sum = Math.abs(Number(value)) / 1.0e6;
      hasil = formatter(parseInt(sum)) + " ";
    } else if (lengthValue === 7) {
      // 1000000 = 1 juta - 9000000 = 9 juta
      const digit = String(value).charAt(1);
      if (digit == 0) {
        const sum = Math.abs(Number(value)) / 1.0e6;
        const sliceSum = sum.toString().slice(0, 1);
        hasil = sliceSum + " Million";
      } else {
        const sum = Math.abs(Number(value)) / 1.0e6;
        const sliceSum = sum.toString().slice(0, 3);
        hasil = sliceSum + " Million";
      }
    } else if (lengthValue === 8) {
      // 10000000 = 10 juta - 90000000 = 90 juta
      const digit = String(value).charAt(2);
      if (digit == 0) {
        const sum = Math.abs(Number(value)) / 1.0e6;
        const sliceSum = sum.toString().slice(0, 2);
        hasil = sliceSum + " Million";
      } else {
        const sum = Math.abs(Number(value)) / 1.0e6;
        const sliceSum = sum.toString().slice(0, 4);
        hasil = sliceSum + " Million";
      }
    } else if (lengthValue === 9) {
      // 100000000 = 100 juta - 900000000 = 900 juta
      const digit = String(value).charAt(3);
      if (digit == 0) {
        const sum = Math.abs(Number(value)) / 1.0e6;
        const sliceSum = sum.toString().slice(0, 3);
        hasil = sliceSum + " Million";
      } else {
        const sum = Math.abs(Number(value)) / 1.0e6;
        const sliceSum = sum.toString().slice(0, 5);
        hasil = sliceSum + " Million";
      }
    } else if (lengthValue === 10) {
      // 1000000000 = 1 milyar - 9000000000 = 9 milyar
      const digit = String(value).charAt(1);
      if (digit == 0) {
        const sum = Math.abs(Number(value)) / 1.0e9;
        const sliceSum = sum.toString().slice(0, 1);
        hasil = sliceSum + " Billion";
      } else {
        const sum = Math.abs(Number(value)) / 1.0e9;
        const sliceSum = sum.toString().slice(0, 3);
        hasil = sliceSum + " Billion";
      }
    } else if (lengthValue === 11) {
      // 10000000000 = 10 milyar - 90000000000 = 90 milyar
      const digit = String(value).charAt(2);
      if (digit == 0) {
        const sum = Math.abs(Number(value)) / 1.0e9;
        const sliceSum = sum.toString().slice(0, 2);
        hasil = sliceSum + " Billion";
      } else {
        const sum = Math.abs(Number(value)) / 1.0e9;
        const sliceSum = sum.toString().slice(0, 4);
        hasil = sliceSum + " Billion";
      }
    } else if (lengthValue === 12) {
      // 100000000000 = 100 milyar - 900000000000 = 900 milyar
      const digit = String(value).charAt(3);
      if (digit == 0) {
        const sum = Math.abs(Number(value)) / 1.0e9;
        const sliceSum = sum.toString().slice(0, 3);
        hasil = sliceSum + " Billion";
      } else {
        const sum = Math.abs(Number(value)) / 1.0e9;
        const sliceSum = sum.toString().slice(0, 5);
        hasil = sliceSum + " Billion";
      }
    } else if (lengthValue === 13) {
      // 1000000000000 = 1 triluin - 9000000000000 = 9 triliun
      const digit = String(value).charAt(1);
      if (digit == 0) {
        const sum = Math.abs(Number(value)) / 1.0e12;
        const sliceSum = sum.toString().slice(0, 1);
        hasil = sliceSum + " Trillion";
      } else {
        const sum = Math.abs(Number(value)) / 1.0e12;
        const sliceSum = sum.toString().slice(0, 3);
        hasil = sliceSum + " Trillion";
      }
    } else if (lengthValue === 14) {
      // 10000000000000 = 10 triluin - 90000000000000 = 90 triliun
      const digit = String(value).charAt(2);
      if (digit == 0) {
        const sum = Math.abs(Number(value)) / 1.0e12;
        const sliceSum = sum.toString().slice(0, 2);
        hasil = sliceSum + " Trillion";
      } else {
        const sum = Math.abs(Number(value)) / 1.0e12;
        const sliceSum = sum.toString().slice(0, 4);
        hasil = sliceSum + " Trillion";
      }
    } else if (lengthValue === 15) {
      // 100000000000000 = 100 triluin - 900000000000000 = 900 triliun
      const digit = String(value).charAt(3);
      if (digit == 0) {
        const sum = Math.abs(Number(value)) / 1.0e12;
        const sliceSum = sum.toString().slice(0, 3);
        hasil = sliceSum + " Trillion";
      } else {
        const sum = Math.abs(Number(value)) / 1.0e12;
        const sliceSum = sum.toString().slice(0, 5);
        hasil = sliceSum + " Trillion";
      }
    } else {
      hasil = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  } else {
    if (value == 0) {
      hasil = 0;
    } else {
      hasil = "N/A";
    }
  }

  return hasil;
};
