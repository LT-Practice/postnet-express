var allCodes = require('./codes');
let _ = require('lodash');
let CoreResponse = require('./CoreResponse');


class ZipcodeTranslater {
    constructor() {

    }

    execute(zipcode) {
        return this.zipcodeToBarcode(zipcode);
    }

//#zipcode to barcode 邮编 to 条码
    zipcodeToBarcode(zipcode) {
        let checkedZipcode = this.checkZipcode(zipcode);
        let barcodeArray = this.zipcodeTransformToBarcode(checkedZipcode);
        let barcode = this.buildBarcode(barcodeArray);
        return new CoreResponse(barcode, checkedZipcode.type);
    }

// //#5
//     checkZipcode(zipcode) {
//
//         let hyphenPosition = zipcode.length === 10 ? zipcode.includes('-', 5) : true;
//         let onlyOneHyphen = zipcode.indexOf('-') === zipcode.lastIndexOf('-');
//
//         let formatCode = zipcode.replace(/-/g, '');
//         let temp = parseInt(formatCode).toString();
//         // let isNumber = (temp.length === formatCode.length) ? true:false;//!isNaN(temp);
//         formatCode = parseInt(formatCode).toString();
//
//         if (formatCode.length === 5 || formatCode.length === 9 && hyphenPosition && onlyOneHyphen) {
//             return {zipcode, type: true};
//         } else {
//             return {zipcode, type: false};
//         }
//     }
    //#5
    checkZipcode(zipcode) {

        let formatCode = zipcode.replace(/-/g, '');
        let hyphenPosition = zipcode.length === 10 ? zipcode.includes('-', 5) : true;

        let onlyOneHyphen = zipcode.indexOf('-') === zipcode.lastIndexOf('-');

        // let temp = parseInt(formatCode).toString();
        // // let isNumber = (temp.length === formatCode.length) ? true:false;//!isNaN(temp);
        let format = parseInt(formatCode).toString();
        if (format.length != formatCode.length) {
            return {zipcode, type: false};

        }

        if (formatCode.length === 5 || formatCode.length === 9 && hyphenPosition && onlyOneHyphen) {
            return {zipcode, type: true};
        } else {
            return {zipcode, type: false};
        }
    }

//#6
    zipcodeTransformToBarcode(checkedZipcode) {
        let formattedZipcode = this.formatZipcode(checkedZipcode);
        let zipcodeArray = this.buildZipcodeArray(formattedZipcode);
        let zipcodeArrayWithCheckDigit = this.addCheckDigit(zipcodeArray);
        let barcodeArray = this.matchBarcode(zipcodeArrayWithCheckDigit, allCodes());
        return barcodeArray;
    }

//#6-1
    formatZipcode(checkedZipcode) {
        return checkedZipcode.zipcode.replace(/-/g, '');
    }


//#6-2
    buildZipcodeArray(formattedZipcode) {
        return formattedZipcode.split('');
    }

//#6-3
    addCheckDigit(zipcodeArray) {
        let zipcodeNumbers = zipcodeArray.map(codeItem => parseInt(codeItem));
        let sumResult = _.sum(zipcodeNumbers);
        let checkDigit = sumResult % 10 != 0 ? (10 - sumResult % 10).toString() : (0).toString();
        zipcodeArray.push(checkDigit);
        return zipcodeArray;
    }

//#6-4
    matchBarcode(zipcodeArrayWithCheckDigit, allCodes) {
        return zipcodeArrayWithCheckDigit.map(zipcodeItem => allCodes.find(code =>code.key === zipcodeItem).digit);
    }

//#7
    buildBarcode(barcodeArray) {
        return '|' + _.sum(barcodeArray) + '|';

    }

}

module.exports = ZipcodeTranslater;