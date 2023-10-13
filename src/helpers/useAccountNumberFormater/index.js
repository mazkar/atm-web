const useAccountNumberFormater = value => {
    let indexOfDash = value.lastIndexOf('-')
    let number = value.substr(indexOfDash + 1)
    if (number.length === 4) {
        value = value + '-'
    }
    return value
};

export default useAccountNumberFormater;