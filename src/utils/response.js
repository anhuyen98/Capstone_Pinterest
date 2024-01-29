export const response = (state, message = '', data = '') => {
    return {
        stateCode: state,
        messageCode: message,
        data: data
    }
} 
/*
    statusCode --require
    message --option
    data --option
*/