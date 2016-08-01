var allCodes = require('./codes');
let _ = require('lodash');
let CoreResponse = require('./CoreResponse');


class BarcodeTranslater {
    constructor() {
    }

    execute(zipcode) {
        return this.barcodeToZipcode(zipcode);
    }

    //barcode to zipcode条码 to 邮编
    barcodeToZipcode(barcode) {
        let checkedBarcode = this.checkBarcode(barcode);
        let zipcodeArray = this.barcodeTransformToZipcode(checkedBarcode);
        let recheckedZipcodeArray = this.recheckZipcodeArray(zipcodeArray);
        let zipcode = this.buildZipcode(recheckedZipcodeArray);
        return new CoreResponse(zipcode, recheckedZipcodeArray.recheckType);
        // return new CoreResponse(zipcode, checkedBarcode.type);
    }

//#1
    checkBarcode(barcode) {
        for (let i = 0; i < barcode.length; i++) {
            var onlyBarcode = _.isEqual(barcode[i], ':') || _.isEqual(barcode[i], '|');
            if (onlyBarcode === false) {
                break;
            }
        }


        let barcodeElementArray = barcode.split('');
        let bar = '|';
        // let onlyBar = barcodeElementArray.map(element => element === ':');
        let barcodesLength = (barcodeElementArray.length - bar.length * 2) / 5;
        let type = (barcodeElementArray[0] === bar && barcodeElementArray[barcodeElementArray.length - 1]
        && (barcodesLength === 6 || barcodesLength === 10) && onlyBarcode);
        return {barcode, type};
    }

//#2
    barcodeTransformToZipcode(checkedBarcode) {
        let formattedBarcode = this.formatBarcode(checkedBarcode);
        let barcodeArray = this.buildBarcodeArray(formattedBarcode);
        // let allCodes = loadAllCodes();
        let zipcodeArray = this.matchZipcode(barcodeArray, allCodes());
        return zipcodeArray;
    }


//#2-1
    formatBarcode(checkedBarcode) {
        return checkedBarcode.barcode.substring(1, checkedBarcode.barcode.length - 1);
    }

//#2-2
    buildBarcodeArray(formattedBarcode) {
        //debugger;
        let barcodeArray = [];
        for (let index = 0; index < formattedBarcode.length - 1; index += 5) {
            barcodeArray.push(formattedBarcode.substr(index, 5));
        }
        return barcodeArray;
    }

//#2-3
    matchZipcode(barcodeArray, allCodes) {
        //debugger;
        return barcodeArray.map(barcodeItem => allCodes.find(digit => digit.digit === barcodeItem).key);
    }

//#3
    recheckZipcodeArray(zipcodeArray) {
        let resultSum = zipcodeArray.map(codeItem => parseInt(codeItem)).reduce((a, b) => a + b);
        if ((resultSum % 10) === 0) {

            return {zipcodeArray, recheckType: true};
        } else {
            return {zipcodeArray, recheckType: false};
        }
    }

//#4
    buildZipcode(recheckedZipcodeArray) {
        // debugger;
        let resultSum = _.sum(recheckedZipcodeArray.zipcodeArray);
        let result = resultSum.substr(0, resultSum.length - 1);
        if (result.length != 5) {
            return result.substr(0, 5) + '-' + result.substr(5);
        }
        return result;
    }
}

module.exports = BarcodeTranslater;