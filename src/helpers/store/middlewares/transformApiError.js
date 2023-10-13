const transformApiError = () => next => action => {
    return next(action);
};

export default transformApiError;
