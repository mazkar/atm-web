const usePercentage = (number1, number2) => {
    if(number1 === 0 && number2 === 0) {
        return '0.00%';
    } else {
        let number = number1/number2*100;
        return `${number.toFixed(2)}%`
    }
};

export default usePercentage;