const isValidReqBody = (el) => {
    return Object.keys(el).length > 0;
};

const trimElement = (stringElement) =>{
    if(typeof(stringElement) == "object"){
        const n = stringElement.length;
        for(let i = 0; i<n; i++){
            if(stringElement[i].trim() == ""){
                return true;
            }
        }
        return;
    }
    return stringElement.trim() == "";
} 

module.exports.isValidReqBody = isValidReqBody;
module.exports.trimElement = trimElement;
