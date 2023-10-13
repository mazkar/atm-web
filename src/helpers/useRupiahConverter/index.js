
const useRupiahConverter = (number, noRp) => {
  let rupiah = "";
  const angkarev = String(number)
    .split("")
    .reverse()
    .join("");
  if(angkarev[angkarev.length-1]==='-') {
    const angkarevmin = angkarev.slice(0, angkarev.length-1);
    for (let i = 0; i < angkarevmin.length; i++) if (i % 3 === 0) rupiah += `${angkarevmin.substr(i, 3)}.`;
    if(noRp) {
      return `-${rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")}`;
    } else {
      return `Rp -${rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")}`;
    }
  } else {
    for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += `${angkarev.substr(i, 3)}.`;
    if(noRp) {
      return `${rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")}`;
    } else {
      return `Rp ${rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")}`;
    }
  }
    // let angkades = ".00";
    // if (number.includes(".")) {
    //     angkarev = number
    //         .substr(0, number.indexOf("."))
    //         .split("")
    //         .reverse()
    //         .join("");
    //     angkades = number.substr(number.indexOf("."), number.length);
    //     if (angkades.length === 2) {
    //         angkades += "0";
    //     } else if (angkades.length > 2) {
    //         angkades = angkades.slice(0, 3);
    //     }
    // }

  // eslint-disable-next-line no-plusplus
};

export default useRupiahConverter;