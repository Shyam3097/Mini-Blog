const isValidReqBody = (el) => {
    return Object.keys(el).length > 0;
};

const trimElement = (stringElement) =>{
    return stringElement.trim() == "";
} 

module.exports.isValidReqBody = isValidReqBody;
module.exports.trimElement = trimElement;
